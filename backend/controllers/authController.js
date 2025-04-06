import bcrypt from 'bcryptjs';
import { pool } from '../config/db.js';
import { generateToken } from '../utils/generateToken.js';

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    console.log('🚀 Registering user:', req.body);

    // Basic validations
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ message: 'Invalid phone number' });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    // Check if email already exists
    const emailExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (emailExists.rows.length > 0) {
      return res.status(409).json({ message: 'Email is already registered' }); // 409 Conflict
    }

    // Check if phone number already exists
    const phoneExists = await pool.query('SELECT * FROM users WHERE phone = $1', [phone]);
    if (phoneExists.rows.length > 0) {
      return res.status(409).json({ message: 'Phone number is already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user
    const newUser = await pool.query(
      'INSERT INTO users (name, email, phone, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, phone, hashedPassword]
    );

    console.log('✅ User registered:', newUser.rows[0]);

    res.status(201).json({
      success: true,
      user: {
        id: newUser.rows[0].id,
        name: newUser.rows[0].name,
        email: newUser.rows[0].email,
        phone: newUser.rows[0].phone,
        token: generateToken(newUser.rows[0].id),
      },
    });
  } catch (error) {
    console.error('❌ Error during user registration:', error);

    // Optional: Check for specific database errors (like unique constraint violations)
    if (error.code === '23505') { // PostgreSQL unique_violation error code
      return res.status(409).json({ message: 'User already exists with given email or phone' });
    }

    res.status(500).json({ message: 'Something went wrong, please try again later' });
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
        phone: user.rows[0].phone,
        token: generateToken(user.rows[0].id),
      },
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = req.user; // ✅ We already set req.user in middleware

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    next(error);
  }
};
     