// src/socket.js
import { io } from 'socket.io-client';
import env from './env/env';

const socket = io(env.backendUrl, {
  transports: ['websocket'],
});

export default socket;
