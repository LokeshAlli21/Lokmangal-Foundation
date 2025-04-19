import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import socket from '../socket';

function ChatList() {
  const { photoUrl } = useOutletContext();

  const navigate = useNavigate()

  const userData = useSelector((state) => state.auth.userData);
  const userId = userData?.id;
  
  const [conversationList, setConversationList] = useState([]);

  useEffect(() => {
    if (!userId) return;
  
    // Request conversations for the current user
    socket.emit('load-conversations', { user_id: userId });
  
    // Listen for the loaded conversations
    socket.on('conversations-loaded', ({ conversations }) => {
      console.log('conversations: ', conversations);
  
      const transformed = conversations.map((conv) => {
        // Determine if current user is sender or receiver
        const isSender = conv.sender?.id === userId;
  
        if (!conv) return null; // Skip if conv is invalid
  
        // Get the latest message (assuming messages are sorted or just pick the last)
        console.log("see messages: ", conv.messages);
        
        const lastMessageObj = conv.messages?.[conv.messages.length - 1] || {};
  
        return {
          isSender: isSender,
          conversation_id: conv.conversation_id,
          last_message_at: conv.last_message_at,
          last_sender_id: conv.last_sender_id,
          unread_count: conv.unread_count || 0,
          sender: {
            id: conv.sender.id,
            name: conv.sender.name,
            photo_url: conv.sender.profiles?.[0]?.photo_url || '', // Safely access profile photo
          },
          receiver: {
            id: conv.receiver.id,
            name: conv.receiver.name,
            photo_url: conv.receiver.profiles?.[0]?.photo_url || '', // Safely access profile photo
          },
          last_message: lastMessageObj.message_content || '',
        };
      }).filter(Boolean); // Filter out any invalid ones
  
      setConversationList(transformed);
    });
  
    // Cleanup on unmount
    return () => {
      socket.off('conversations-loaded');
    };
  }, [userId]);  
  
  console.log(conversationList);
  return (
    <section>
  <div className="db" style={{marginTop: 0, padding: "50px"}}>
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-lg-3">
          <div className="db-nav">
            <div className="db-nav-pro">
              <img src={photoUrl} className="img-fluid" alt="profile" />
            </div>
            <div className="db-nav-list">
              <ul>
                <li>
                  <a href="/dashboard">
                    <i className="fa fa-tachometer" aria-hidden="true" />
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="/profile">
                    <i className="fa fa-male" aria-hidden="true" />
                    Profile
                  </a>
                </li>
                <li>
                  <a href="/interests">
                    <i className="fa fa-handshake-o" aria-hidden="true" />
                    Interests
                  </a>
                </li>
                <li>
                  <a href="/chat-list" className="act">
                    <i className="fa fa-commenting-o" aria-hidden="true" />
                    Chat list
                  </a>
                </li>
                <li>
                  <a href="/setting">
                    <i className="fa fa-cog" aria-hidden="true" />
                    Setting
                  </a>
                </li>
                <li>
                  <a href="/log-out">
                    <i className="fa fa-sign-out" aria-hidden="true" />
                    Log out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-8 col-lg-9">
          <div className="row">
            <div className="col-md-12 db-sec-com">
              <h2 className="db-tit">Chat list</h2>
              <div className="db-pro-stat">
                <div className="db-chat">
                  <ul>

{(conversationList.length === 0 ) && <h2>No chats are avalible</h2> }

                
{conversationList.map((conv) => {
  const lastMessageText = conv.last_message?.trim() || '';
  const isCurrentUserSender = conv.last_sender_id === userId;

  // Determine the other user (to display name & photo)
  const otherUser = conv.sender.id === userId ? conv.receiver : conv.sender;
  const name = otherUser?.name || 'Unknown';
  const photo = otherUser?.photo_url || 'images/profiles/default.jpg';

  // Show unread count only if message was sent by the other user
  const hasUnread = conv.unread_count > 0 && !isCurrentUserSender;

  // Last message display
  const lastMessage = lastMessageText
    ? isCurrentUserSender
      ? `You: ${lastMessageText}`
      : lastMessageText
    : 'No messages yet';

  // Date formatting
  const messageDate = new Date(conv.last_message_at);
  const now = new Date();
  const isToday = messageDate.toDateString() === now.toDateString();
  const timeLabel = isToday
    ? messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : messageDate.toLocaleDateString([], { day: '2-digit', month: 'short' });

  return (
    <li
      key={conv.conversation_id}
      className="db-chat-trig"
      onClick={() => navigate(`/chat/${otherUser.id}`)}
    >
      <div className="db-chat-pro">
        <img src={photo} alt={name} />
      </div>

      <div className="db-chat-bio">
        <h5>{name}</h5>
        <span style={{ fontWeight: hasUnread ? 'bold' : 'normal' }}>
          {lastMessage}
        </span>
      </div>

      <div className="db-chat-info">
        <div className={`time ${hasUnread ? 'new' : ''}`}>
          <span className="timer">{timeLabel}</span>
          {hasUnread && <span className="cont">{conv.unread_count}</span>}
        </div>
      </div>
    </li>
  );
})}


                    
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default ChatList