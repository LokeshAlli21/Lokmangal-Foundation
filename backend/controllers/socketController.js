import { supabase } from '../supabase/supabaseClient.js';

const userSocketMap = {}; // 🗺️ userId => socket.id

export const registerSocketEvents = (socket, io) => {
  console.log('📲 Registered socket:', socket.id);

  // 🧠 Step 1: Identify user and map their socket
  socket.on('join', ({ userId }) => {
    userSocketMap[userId] = socket.id;
    console.log(`👤 User ${userId} joined with socket ID: ${socket.id}`);
  });

  // 💬 Step 2: Handle sending messages
  socket.on('send-message', async ({ sender_id, receiver_id, message_content }) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([{ sender_id, receiver_id, message_content }])
        .select()
        .single(); // includes message_id, timestamp, etc.

      if (error) {
        console.error('❌ DB Insert Error:', error.message);
        socket.emit('error-message', { error: 'Message not sent' });
        return;
      }

      const receiverSocketId = userSocketMap[receiver_id]; // 🎯 Only that user

      if (receiverSocketId) {
        io.to(receiverSocketId).emit('receive-message', data);
        console.log(`📨 Message delivered to user ${receiver_id}`);
      } else {
        console.log(`📭 User ${receiver_id} is offline or not connected`);
      }

      console.log(`📤 Message sent from ${sender_id} to ${receiver_id}`);
    } catch (err) {
      console.error('🔥 send-message error:', err.message);
      socket.emit('error-message', { error: 'Something went wrong' });
    }
  });

  // 🔌 Step 3: Handle disconnection
  socket.on('disconnect', () => {
    for (const [userId, socketId] of Object.entries(userSocketMap)) {
      if (socketId === socket.id) {
        delete userSocketMap[userId];
        console.log(`❌ User ${userId} disconnected`);
        break;
      }
    }
  });
};
