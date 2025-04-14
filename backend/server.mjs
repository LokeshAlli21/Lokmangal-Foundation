import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { loggerMiddleware } from './middlewares/loggerMiddleware.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
// importing routes
import authRoutes from './routes/authRoutes.js';
import noAuthRoutes from './routes/noAuthRoutes.js';
import testWithAuth from './routes/routes.js';
import profileRoute from './routes/profileRoute.js'



dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_ORIGIN_URL, credentials: true }));
app.use(express.json());
app.use(loggerMiddleware);
app.use(express.urlencoded({ extended: true }));``

// Routes

export const testRoute = (req, res) => {
  console.log('✅ Backend test route hit!');
  res.json({ message: 'Backend is connected successfully!' });
};

app.use('/api/auth', authRoutes);

app.get('/api/test', testRoute)
app.use('/api/test-with-auth', testWithAuth)


app.use('/api/no-auth', noAuthRoutes)

app.use('/api/profiles', profileRoute)

app.get('/', (req, res) =>{
  console.log("user hit a main route!");
  
  res.json({"message": "working fine!"})
})

// Error Middleware
app.use(errorMiddleware);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
