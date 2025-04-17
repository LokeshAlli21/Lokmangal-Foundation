import { supabase } from '../supabase/supabaseClient.js';

const userSocketMap = {}; // userId => socket.id

export const registerSocketEvents = (socket, io) => {
  console.log('📲 Registered socket:', socket.id);

  // 🧠 JOIN
  socket.on('join', ({ userId }) => {
    userSocketMap[userId] = socket.id;
    console.log(`👤 User ${userId} joined with socket ID: ${socket.id}`);
  });

  // 🧠 SEND MESSAGE
  socket.on('send-message', async ({ sender_id, receiver_id, message_content }) => {
    console.log('📨 Message received on socket from', sender_id, 'to', receiver_id);

    try {
      let { data: existingConversation, error: convError } = await supabase
        .from('conversations')
        .select('conversation_id')
        .or(`and(sender_id.eq.${sender_id},receiver_id.eq.${receiver_id}),and(sender_id.eq.${receiver_id},receiver_id.eq.${sender_id})`)
        .maybeSingle();

      let conversation_id;

      if (!existingConversation && !convError) {
        const { data: newConv, error: newConvErr } = await supabase
          .from('conversations')
          .insert({
            sender_id,
            receiver_id,
            last_message_at: new Date(),
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
        conversation_id = existingConversation?.conversation_id;

        const { error: incrementErr } = await supabase.rpc('increment_unread_count', {
          conv_id: conversation_id,
        });

        if (incrementErr) {
          console.error('❌ Error incrementing unread count:', incrementErr.message);
        }

        await supabase
          .from('conversations')
          .update({ last_message_at: new Date() })
          .eq('conversation_id', conversation_id);
      }

      const { data: insertedMessage, error: messageErr } = await supabase
        .from('messages')
        .insert({
          sender_id,
          receiver_id,
          message_content,
          conversation_id,
        })
        .select()
        .single();

      if (messageErr) {
        console.error('❌ DB Insert Error:', messageErr.message);
        return socket.emit('error-message', { error: 'Message not sent' });
      }

      const receiverSocketId = userSocketMap[receiver_id];
      const messageWithConversationId = {
        ...insertedMessage,
        conversation_id,
      };

      if (receiverSocketId) {
        io.to(receiverSocketId).emit('receive-message', messageWithConversationId);
        console.log(`📬 Message delivered to user ${receiver_id}`);
      } else {
        console.log(`📭 User ${receiver_id} is offline or not connected`);
      }

    } catch (err) {
      console.error('🔥 send-message error:', err.message);
      socket.emit('error-message', { error: 'Something went wrong' });
    }
  });

  // 🧠 MARK AS READ
  socket.on('open-conversation', async ({ conversation_id, user_id }) => {
    try {
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

    } catch (err) {
      console.error('🔥 open-conversation error:', err.message);
      socket.emit('error-message', { error: 'Something went wrong' });
    }
  });

  // 🧠 LOAD PAST MESSAGES WITH PAGINATION
  socket.on('load-messages', async ({ conversation_id, page = 1, pageSize = 20 }) => {
    try {
      const offset = (page - 1) * pageSize;

      console.log(`📥 Loading messages for conversation ${conversation_id} | Page: ${page} | Offset: ${offset}`);

      const { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversation_id)
        .order('created_at', { ascending: false })
        .range(offset, offset + pageSize - 1);

      const { count: totalCount, error: countError } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('conversation_id', conversation_id);

      if (error || countError) {
        console.error('❌ Error loading messages or count:', error?.message || countError?.message);
        return socket.emit('error-message', { error: 'Could not load messages' });
      }

      socket.emit('messages-loaded', {
        conversation_id,
        messages,
        totalCount,
        currentPage: page,
        pageSize,
      });

      console.log(`📜 Sent page ${page} of messages for conversation ${conversation_id} (Total: ${totalCount})`);

    } catch (err) {
      console.error('🔥 load-messages error:', err.message);
      socket.emit('error-message', { error: 'Something went wrong while loading messages' });
    }
  });

  // 🧠 DISCONNECT
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
