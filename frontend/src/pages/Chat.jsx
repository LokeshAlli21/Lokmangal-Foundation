import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import socket from '../socket';
import { useSelector } from 'react-redux';

function Chat() {
  const userData = useSelector((state) => state.auth.userData);
  const userId = userData.id;
  const { id: receiverId } = useParams();

  const [messageContent, setMessageContent] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit('join', { userId });

    socket.on('receive-message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('receive-message');
    };
  }, [userId]);

  const handleSend = () => {
    if (!receiverId || !messageContent.trim()) return;

    const newMessage = {
      sender_id: userId,
      receiver_id: parseInt(receiverId),
      message_content: messageContent,
      timestamp: new Date().toISOString(),
    };

    socket.emit('send-message', newMessage);
    setMessages((prev) => [...prev, newMessage]);
    setMessageContent('');
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '20px auto',
        padding: '20px',
        borderRadius: '16px',
        backgroundColor: '#ffffff',
        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        height: '80vh',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: '700',
          marginBottom: '20px',
          color: '#333',
        }}
      >
        Chat with User {receiverId}
      </h2>

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '10px',
          marginBottom: '20px',
          border: '1px solid #eee',
          borderRadius: '10px',
          backgroundColor: '#fafafa',
        }}
      >
        {messages.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>No messages yet</p>
        ) : (
          messages.map((msg, index) => {
            const isSender = msg.sender_id === userId;
            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isSender ? 'flex-end' : 'flex-start',
                  marginBottom: '12px',
                }}
              >
                <div
                  style={{
                    backgroundColor: isSender ? '#007bff' : '#e1f3d8',
                    color: isSender ? '#fff' : '#000',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    maxWidth: '75%',
                    wordBreak: 'break-word',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                  }}
                >
                  <strong style={{ fontSize: '13px' }}>
                    {isSender ? 'You' : `User ${msg.sender_id}`}
                  </strong>
                  <div style={{ marginTop: '4px', fontSize: '15px' }}>
                    {msg.message_content}
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      marginTop: '6px',
                      textAlign: 'right',
                      color: isSender ? '#dcdcdc' : '#666',
                    }}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <textarea
          rows="2"
          placeholder="Type your message..."
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          style={{
            flex: 1,
            padding: '10px',
            fontSize: '16px',
            borderRadius: '10px',
            border: '1px solid #ccc',
            resize: 'none',
          }}
        />
        <button
          onClick={handleSend}
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            padding: '10px 16px',
            fontSize: '16px',
            borderRadius: '10px',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
