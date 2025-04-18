// Import Supabase client instance
import { supabase } from '../supabase/supabaseClient.js';

// Map to track connected users and their socket IDs
const userSocketMap = {}; // Format: userId => socketId

// Main function to register socket events
export const registerSocketEvents = (socket, io) => {
  console.log('📲 Registered socket:', socket.id);

  // 🔗 Handle user joining the chat system
  socket.on('join', ({ userId }) => {
    userSocketMap[userId] = socket.id; // Map user to socket ID
    console.log(`👤 User ${userId} joined with socket ID: ${socket.id}`);
    io.emit('user-status', { userId, status: 'online' }); // Notify all users of online status
  });

  // ✉️ Handle sending a message
  socket.on('send-message', async ({ sender_id, receiver_id, message_content, is_read }) => {
    console.log('📨 Message received from', sender_id, 'to', receiver_id);
    console.log('message_content', message_content);
  
    try {
      // Check if conversation already exists between sender and receiver
      let { data: existingConversation, error: convError } = await supabase
        .from('conversations')
        .select('conversation_id')
        .or(
          `and(sender_id.eq.${sender_id},receiver_id.eq.${receiver_id}),and(sender_id.eq.${receiver_id},receiver_id.eq.${sender_id})`
        )
        .maybeSingle();
  
      let conversation_id;
  
      // 📌 If no conversation exists, create a new one
      if (!existingConversation && !convError) {
        const { data: newConv, error: newConvErr } = await supabase
          .from('conversations')
          .insert({
            sender_id,
            receiver_id,
            unread_count: 1,
          })
          .select('conversation_id')
          .single();
  
        if (newConvErr) {
          console.error('❌ Error creating conversation:', newConvErr.message);
          return socket.emit('error-message', { error: 'Could not create conversation' });
        }
  
        conversation_id = newConv.conversation_id;
      } else {
        console.log('🔍 Existing Conversation:', existingConversation);
        // ✅ Use existing conversation
        conversation_id = existingConversation?.conversation_id;
  
        // 🐞 DEBUG: Check if conversation_id was extracted properly
        if (!conversation_id) {
          console.warn('⚠️ No conversation_id found. Cannot increment unread count.');
        } else {
          console.log('✅ conversation_id to increment unread count for:', conversation_id);
        
          // Step 1: Get current unread_count
          const { data: conversationData, error: fetchErr } = await supabase
            .from('conversations')
            .select('unread_count')
            .eq('conversation_id', conversation_id)
            .single();
        
          if (fetchErr) {
            console.error('❌ Error fetching current unread_count:', fetchErr.message);
          } else {
            const newUnreadCount = (conversationData?.unread_count || 0) + 1;
        
            // Step 2: Update unread_count
            const { error: updateErr } = await supabase
              .from('conversations')
              .update({ unread_count: newUnreadCount })
              .eq('conversation_id', conversation_id);
        
            if (updateErr) {
              console.error('❌ Error updating unread_count:', updateErr.message);
            } else {
              console.log('✅ Unread count incremented to', newUnreadCount, 'for conversation_id:', conversation_id);
            }
          }
        }        
  
        // 🕰️ Update last_message_at timestamp
        function getISTTimestamp() {
          const nowUTC = new Date();
          const istOffset = 5.5 * 60 * 60 * 1000; // 19800000 ms
          const istDate = new Date(nowUTC.getTime() + istOffset);
          return istDate.toISOString().slice(0, 19).replace('T', ' ');
        }
  
        const currentTimestamp = getISTTimestamp();
  
        // Update last_message_at timestamp in the conversation
        const { data, error } = await supabase
          .from('conversations')
          .update({ last_message_at: currentTimestamp })
          .eq('conversation_id', conversation_id);
  
        if (error) {
          console.error("❌ Failed to update last_message_at:", error.message, error);
        } else {
          console.log("✅ last_message_at updated successfully:", data);
        }
      }
  
      // Insert new message into messages table
      const { data: insertedMessage, error: messageErr } = await supabase
        .from('messages')
        .insert({
          sender_id,
          receiver_id,
          message_content,
          conversation_id,
          is_read,
          status: 'delivered',
        })
        .select('*')
        .single();
  
      if (messageErr) {
        console.error('❌ DB Insert Error:', messageErr.message);
        return socket.emit('error-message', { error: 'Message not sent' });
      }
  
      // Prepare message to be sent to receiver
      const messageToSend = {
        ...insertedMessage,
        status: 'delivered',
        sender_id,
        receiver_id,
        message_content,
        conversation_id,
        created_at: insertedMessage.created_at,
      };
  
      // 🔔 Emit message to receiver if online
      const receiverSocketId = userSocketMap[receiver_id];
  
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('receive-message', messageToSend);
        console.log(`📬 Message delivered to user ${receiver_id}`);
      } else {
        console.log(`📭 User ${receiver_id} is offline or not connected`);
      }
  
    } catch (err) {
      console.error('🔥 send-message error:', err.message);
      socket.emit('error-message', { error: 'Something went wrong' });
    }
  });
  

  // ✅ Mark conversation as read by user
  socket.on('open-conversation', async ({ conversation_id, user_id }) => {
    try {
      console.log('open-conversation is called: ', conversation_id, user_id);

      // Use RPC to reset unread count to 0
      const { error } = await supabase.rpc('mark_conversation_as_read', {
        conv_id: conversation_id,
        user_id: user_id,
      });

      if (error) {
        console.error('❌ Failed to mark messages read:', error.message);
        socket.emit('error-message', { error: 'Failed to mark as read' });
        return;
      }

      console.log(`✅ Conversation ${conversation_id} marked as read by user ${user_id}`);
      socket.emit('conversation-read', { conversation_id });

      // Update all messages in that conversation as "seen"
      await supabase
        .from('messages')
        .update({ status: 'seen' })
        .eq('conversation_id', conversation_id)
        .eq('receiver_id', user_id);

    } catch (err) {
      console.error('🔥 open-conversation error:', err.message);
      socket.emit('error-message', { error: 'Something went wrong' });
    }
  });

  // 📥 Load paginated messages in a conversation
  socket.on('load-messages', async ({ conversation_id, page = 1, pageSize = 20 }) => {
    try {
      const offset = (page - 1) * pageSize;
  
      const { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversation_id)
        .order('created_at', { ascending: false })
        .range(offset, offset + pageSize - 1);
  
      if (error) {
        console.error('❌ load-messages error:', error.message);
        return socket.emit('error-message', { error: 'Could not load messages' });
      }
  
      // Get total count for pagination
      const { count, error: countError } = await supabase
        .from('messages')
        .select('id', { count: 'exact', head: true })
        .eq('conversation_id', conversation_id);
  
      socket.emit('messages-loaded', {
        messages,
        totalCount: count || 0,
      });
  
    } catch (err) {
      console.error('🔥 load-messages error:', err.message);
      socket.emit('error-message', { error: 'Something went wrong loading messages' });
    }
  });  

  // 📚 Load all conversations of a user
  socket.on('load-conversations', async ({ user_id }) => {
    try {
      const { data: conversations, error } = await supabase
    .from('conversations')
    .select(`
      conversation_id,
      last_message_at,
      unread_count,
      sender:sender_id (
        id,
        name,
        profiles (
          photo_url
        )
      ),
      receiver:receiver_id (
        id,
        name,
        profiles (
          photo_url
        )
      ),
      messages (
        message_content,
        created_at
      )
    `)
    .or(`sender_id.eq.${user_id},receiver_id.eq.${user_id}`)
    .order('last_message_at', { ascending: true }) // Order conversations by last_message_at
    .limit(1); // Only retrieve one message per conversation

      if (error) {
        console.error('❌ Error loading conversations:', error.message);
        return socket.emit('error-message', { error: 'Could not load conversations' });
      }

      socket.emit('conversations-loaded', { conversations });
    } catch (err) {
      console.error('🔥 load-conversations error:', err.message);
      socket.emit('error-message', { error: 'Something went wrong while loading conversations' });
    }
  });

  // 📖 Load full chat history between two users
  socket.on('load-chat-history', async ({ user1_id, user2_id }) => {
    try {
      // Get the conversation ID between the two users
      const { data: conversation, error: convError } = await supabase
        .from('conversations')
        .select('conversation_id')
        .or(
          `and(sender_id.eq.${user1_id},receiver_id.eq.${user2_id}),and(sender_id.eq.${user2_id},receiver_id.eq.${user1_id})`
        )
        .maybeSingle();

      if (convError || !conversation) {
        return socket.emit('chat-history', { messages: [], error: 'No conversation found' });
      }

      // Fetch all messages in order
      const { data: messages, error: messageError } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversation.conversation_id)
        .order('created_at', { ascending: true });

      if (messageError) {
        console.error('❌ Error fetching messages:', messageError.message);
        return socket.emit('error-message', { error: 'Could not load chat history' });
      }

      socket.emit('chat-history', {
        conversation_id: conversation.conversation_id,
        messages,
      });

    } catch (err) {
      console.error('🔥 load-chat-history error:', err.message);
      socket.emit('error-message', { error: 'Something went wrong loading chat history' });
    }
  });

  // 🔌 Handle user disconnection
  socket.on('disconnect', () => {
    for (const [userId, socketId] of Object.entries(userSocketMap)) {
      if (socketId === socket.id) {
        delete userSocketMap[userId]; // Remove user from map
        console.log(`❌ User ${userId} disconnected`);
        io.emit('user-status', { userId, status: 'offline' }); // Notify others
        break;
      }
    }
  });
};
