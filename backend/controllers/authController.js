import bcrypt from 'bcryptjs';
import { pool } from '../config/db.js';
import { generateToken } from '../utils/generateToken.js';

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, mobile, password } = req.body;

    console.log('🚀 Registering user:', req.body);

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!/^\d{10}$/.test(mobile)) {
      return res.status(400).json({ message: 'Invalid mobile number' });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      'INSERT INTO users (name, email, mobile, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, mobile, hashedPassword]
    );

    console.log('✅ User registered:', newUser.rows[0]);

    res.status(201).json({
      success: true,
      user: {
        id: newUser.rows[0].id,
        name: newUser.rows[0].name,
        email: newUser.rows[0].email,
        mobile: newUser.rows[0].mobile,
        token: generateToken(newUser.rows[0].id),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log('🚀 Logging in user:', email);

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    console.log('✅ User logged in:', user.rows[0]);

    res.json({
      success: true,
      user: {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        mobile: user.rows[0].mobile,
        token: generateToken(user.rows[0].id),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const testRoute = (req, res) => {
  console.log('🚀 Test route hit');
  res.send('✅ API is working!');
};
 