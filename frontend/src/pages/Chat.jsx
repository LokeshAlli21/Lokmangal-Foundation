import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import socket from "../socket";

function Chat() {
  const userData = useSelector((state) => state.auth.userData);
  const userId = userData?.id;
  const { id: receiverId } = useParams();

  const [conversationId, setConversationId] = useState(null);
  const [messageContent, setMessageContent] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalMessages, setTotalMessages] = useState(0);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (!receiverId || !messageContent.trim()) return;

    const newMessage = {
      sender_id: userId,
      receiver_id: parseInt(receiverId),
      message_content: messageContent,
      created_at: new Date().toISOString(), // saves in full UTC format
      is_read: false,
    };

    socket.emit("send-message", newMessage);
    setMessageContent("");
    setMessages((prev) => [...prev, newMessage]);
    setTimeout(scrollToBottom, 100);
  };

  const handleScroll = (e) => {
    if (e.target.scrollTop === 0 && messages.length < totalMessages && !loading) {
      const nextPage = page + 1;
      setLoading(true);
      setPage(nextPage);
      socket.emit("load-messages", {
        conversation_id: conversationId,
        page: nextPage,
        pageSize: 20,
      });
    }
  };

  const markAsRead = () => {
    if (conversationId) {
      socket.emit("open-conversation", {
        conversation_id: conversationId,
        user_id: userId,
      });
    }
  };

  useEffect(() => {
    socket.emit("join", { userId });
    socket.emit("load-chat-history", {
      user1_id: userId,
      user2_id: receiverId,
    });

    const handleChatHistory = ({ conversation_id }) => {
      setConversationId(conversation_id);
      setPage(1);
      if(conversation_id){
        socket.emit("load-messages", {
          conversation_id,
          page: 1,
          pageSize: 20,
        });
      }else{
        console.log(`conversation between user ${userId} and user ${receiverId} doesn't exists!`);
        
      }
    };

    socket.on("chat-history", handleChatHistory);

    return () => {
      socket.off("chat-history", handleChatHistory);
    };
  }, [userId, receiverId]);

  useEffect(() => {
    const handleMessagesLoaded = ({ messages: newMessages, totalCount }) => {
      setMessages(newMessages.reverse());
      setTotalMessages(totalCount);
      setLoading(false);
    };

    socket.on("messages-loaded", handleMessagesLoaded);

    return () => socket.off("messages-loaded", handleMessagesLoaded);
  }, [conversationId]);

  useEffect(() => {
    const handleReceiveMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      setTimeout(scrollToBottom, 100);
    };
  
    socket.on("receive-message", handleReceiveMessage);
    return () => socket.off("receive-message", handleReceiveMessage);
  }, []);  

  useEffect(() => {
    if (conversationId) {
      markAsRead();
      scrollToBottom();
    }
  }, [conversationId, messages]);

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        borderRadius: "16px",
        backgroundColor: "#ffffff",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        height: "80vh",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "700",
          marginBottom: "20px",
          color: "#333",
        }}
      >
        Chat with User {receiverId}
      </h2>

      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "10px",
          marginBottom: "20px",
          border: "1px solid #eee",
          borderRadius: "10px",
          backgroundColor: "#fafafa",
        }}
      >
        {loading && (
          <p style={{ textAlign: "center", color: "#888" }}>
            Loading more messages...
          </p>
        )}

        {messages.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888" }}>No messages yet</p>
        ) : (
          messages?.map((msg, index) => {
            const isSender = msg.sender_id === userId;
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isSender ? "flex-end" : "flex-start",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    backgroundColor: isSender ? "#007bff" : "#e1f3d8",
                    color: isSender ? "#fff" : "#000",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    maxWidth: "75%",
                    wordBreak: "break-word",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  <strong style={{ fontSize: "13px" }}>
                    {isSender ? "You" : `User ${msg.sender_id}`}
                  </strong>
                  <div style={{ marginTop: "4px", fontSize: "15px" }}>
                    {msg.message_content}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      marginTop: "6px",
                      textAlign: "right",
                      color: isSender ? "#dcdcdc" : "#666",
                    }}
                  >
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {isSender && (
                      <div
                        style={{
                          fontSize: "10px",
                          marginTop: "2px",
                          textAlign: "right",
                          color: msg.is_read ? "#28a745" : "#999",
                        }}
                      >
                        {msg.is_read ? "Seen" : "Sent"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <textarea
          rows="2"
          placeholder="Type your message..."
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          style={{
            flex: 1,
            padding: "10px",
            fontSize: "16px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            resize: "none",
          }}
        />
        <button
          onClick={handleSend}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
