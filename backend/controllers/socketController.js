import { supabase } from '../supabase/supabaseClient.js';

const userSocketMap = {}; // userId => socket.id

export const registerSocketEvents = (socket, io) => {
  console.log('📲 Registered socket:', socket.id);

  // 🧠 JOIN - User joins the socket and stores their socket ID for communication
  socket.on('join', ({ userId }) => {
    userSocketMap[userId] = socket.id;
    console.log(`👤 User ${userId} joined with socket ID: ${socket.id}`);
    io.emit('user-status', { userId, status: 'online' }); // Notify other users of the online status
  });

  // 🧠 SEND MESSAGE - Handling sending messages and storing them in DB
  socket.on('send-message', async ({ sender_id, receiver_id, message_content }) => {
    console.log('📨 Message received on socket from', sender_id, 'to', receiver_id);

    try {
      let { data: existingConversation, error: convError } = await supabase
        .from('conversations')
        .select('conversation_id')
        .or(`and(sender_id.eq.${sender_id},receiver_id.eq.${receiver_id}),and(sender_id.eq.${receiver_id},receiver_id.eq.${sender_id})`)
        .maybeSingle();

      let conversation_id;

      // Creating new conversation if not exists
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

        // Increment unread count if conversation exists
        const { error: incrementErr } = await supabase.rpc('increment_unread_count', {
          conv_id: conversation_id,
        });

        if (incrementErr) {
          console.error('❌ Error incrementing unread count:', incrementErr.message);
        }

        // Update last message timestamp
        await supabase
          .from('conversations')
          .update({ last_message_at: new Date() })
          .eq('conversation_id', conversation_id);
      }

      // Insert message into the database
      const { data: insertedMessage, error: messageErr } = await supabase
        .from('messages')
        .insert({
          sender_id,
          receiver_id,
          message_content,
          conversation_id,
          status: 'delivered' // Initially set the message as delivered
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

  // 🧠 MARK AS READ - Mark a conversation as read when user opens it
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

      // Change the message status to 'seen' when conversation is opened
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

  // 🧠 LOAD PAST MESSAGES WITH PAGINATION - Load older messages for the conversation
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

// 🧠 LOAD USER CONVERSATIONS - Fetch all chats the user is part of
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
      .order('last_message_at', { ascending: false });

    if (error) {
      console.error('❌ Error loading conversations:', error.message);
      return socket.emit('error-message', { error: 'Could not load conversations' });
    }

    socket.emit('conversations-loaded', { conversations: conversations });
  } catch (err) {
    console.error('🔥 Unexpected error in load-conversations:', err.message);
    socket.emit('error-message', { error: 'Something went wrong while loading conversations' });
  }
});

  // 🧠 DISCONNECT - Handle user disconnection and notify other users
  socket.on('disconnect', () => {
    for (const [userId, socketId] of Object.entries(userSocketMap)) {
      if (socketId === socket.id) {
        delete userSocketMap[userId];
        console.log(`❌ User ${userId} disconnected`);
        io.emit('user-status', { userId, status: 'offline' }); // Notify other users of the offline status
        break;
      }
    }
  });
};
