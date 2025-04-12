import bcrypt from 'bcryptjs';
import { pool } from '../config/db.js';
import { generateToken } from '../utils/generateToken.js';

import { supabase } from '../supabase/supabaseClient.js'

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
    const { data: existingEmail, error: emailError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email);
  
    if (emailError) throw emailError;
  
    if (existingEmail.length > 0) {
      return res.status(409).json({ message: 'Email is already registered' }); // 409 Conflict
    }
  
    // Check if phone number already exists
    const { data: existingPhone, error: phoneError } = await supabase
      .from('users')
      .select('*')
      .eq('phone', phone);
  
    if (phoneError) throw phoneError;
  
    if (existingPhone.length > 0) {
      return res.status(409).json({ message: 'Phone number is already registered' }); // 409 Conflict
    }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
  
    // Insert new user
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([{ name, email, phone, password: hashedPassword }])
      .select()
      .single();
  
    if (insertError) throw insertError;
  
    console.log('✅ User registered successfully:', newUser);
    return res.status(201).json({ message: 'User registered successfully', user: newUser });
  
  } catch (err) {
    console.error('❌ Error registering user:', err.message);
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
  
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log('🚀 Logging in user:', email);

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Fetch user from Supabase
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    console.log('✅ User logged in:', user);

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        token: generateToken(user.id),
      },
      message: 'User logged in successfully',
    });
  } catch (error) {
    console.error('Login Error:', error);
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
     