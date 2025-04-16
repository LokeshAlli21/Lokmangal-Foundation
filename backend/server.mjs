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

import http from 'http';
import { initSocket } from './socket-io/socket.js';



dotenv.config();

const app = express();

const server = http.createServer(app); // <-- this wraps express



initSocket(server); // ⬅️ attach WebSocket to HTTP server

// const server = http.createServer(app);

// // Handle messages
// io.on("connection", (socket) => {
//   socket.on("send-message", async (data) => {
//     const { sender_id, receiver_id, message_content } = data;

//     // Insert into Supabase
//     const { error } = await supabase.from("messages").insert([
//       { sender_id, receiver_id, message_content },
//     ]);

//     if (!error) {
//       io.emit("receive-message", {
//         sender_id,
//         receiver_id,
//         message_content,
//         timestamp: new Date().toISOString(),
//       });
//     }
//   });
// });

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


export default app;