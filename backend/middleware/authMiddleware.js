import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const protect = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    token = token.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token failed' });
  }
};
