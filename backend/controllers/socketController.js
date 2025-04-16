// socketController.js
import { supabase } from '../supabase/supabaseClient.js';



export const registerSocketEvents = (socket, io) => {
  console.log('📲 Registered socket:', socket.id);

  // Handle sending messages
  socket.on('send-message', async ({ sender_id, receiver_id, message_content }) => {
    try {
      const { error } = await supabase.from('messages').insert([
        {
          sender_id,
          receiver_id,
          message_content,
        },
      ]);

      if (error) {
        console.error('❌ DB Insert Error:', error.message);
        socket.emit('error-message', { error: 'Message not sent' });
        return;
      }

      // Emit the message to the receiver (can be improved using rooms if needed)
      io.emit('receive-message', {
        sender_id,
        receiver_id,
        message_content,
        timestamp: new Date().toISOString(),
      });

      console.log(`📤 Message sent from ${sender_id} to ${receiver_id}`);
    } catch (err) {
      console.error('🔥 send-message error:', err.message);
      socket.emit('error-message', { error: 'Something went wrong' });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('❌ Disconnected:', socket.id);
  });
};
