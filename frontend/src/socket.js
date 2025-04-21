// src/socket.js
import { io } from 'socket.io-client';
import env from './env/env';

const socket = io(env.backendUrl, {
  transports: ['websocket'],
  autoConnect: false, // important for controlled connection
});

export default socket;
