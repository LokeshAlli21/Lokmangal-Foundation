import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { loggerMiddleware } from './middlewares/loggerMiddleware.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
// Importing routes
import authRoutes from './routes/authRoutes.js';
import noAuthRoutes from './routes/noAuthRoutes.js';
import testWithAuth from './routes/routes.js';
import profileRoute from './routes/profileRoute.js';
import blockRoutes from './routes/blockRoutes.js';
import superAdminRoutes from './routes/superAdminRoutes.js';

import http from 'http';
import { initSocket } from './socket-io/socket.js';



dotenv.config();

const app = express();

// Create HTTP server and attach Express app to it
const server = http.createServer(app);

// Initialize WebSocket with the server
initSocket(server);

// Middleware
app.use(cors({ origin: process.env.FRONTEND_ORIGIN_URL, credentials: true }));
app.use(express.json());
app.use(loggerMiddleware);
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/api/test', (req, res) => {
  console.log('✅ Backend test route hit!');
  res.json({ message: 'Backend is connected successfully!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/test-with-auth', testWithAuth);
app.use('/api/no-auth', noAuthRoutes);
app.use('/api/profiles', profileRoute);
app.use('/api/block', blockRoutes);
app.use('/api/super-admin', superAdminRoutes);

// Main route
app.get('/', (req, res) => {
  console.log("User hit a main route!");
  res.json({ message: 'working fine!' });
});

// Error Middleware
app.use(errorMiddleware);

// Start the server and WebSocket
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server + WebSocket listening at http://localhost:${PORT}`);
});

export default app;