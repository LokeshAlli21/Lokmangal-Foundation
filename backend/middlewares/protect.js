import jwt from 'jsonwebtoken';
import { supabase } from '../supabase/supabaseClient.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Supabase query to get the user by id
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', decoded.id)
        .single();

      if (error) {
        console.error('Supabase Error:', error);
        return res.status(401).json({ message: 'User not found' });
      }

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      req.user = user; // ✅ Now you have full user info in req.user
      next();
    } else {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
