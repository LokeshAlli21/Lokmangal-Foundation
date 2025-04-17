// socket.js
import { Server } from 'socket.io';
import { registerSocketEvents } from '../controllers/socketController.js';
import dotenv from 'dotenv';

dotenv.config();

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_ORIGIN_URL,
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('🔌 User connected:', socket.id);
    registerSocketEvents(socket, io); // 👈 Register custom socket events
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized. Call initSocket(server) first.');
  }
  return io;
};
