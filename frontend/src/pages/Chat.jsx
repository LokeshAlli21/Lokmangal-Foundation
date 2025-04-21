import React, { useEffect, useState, useRef } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import socket from "../socket";
import databaseService from "../backend-services/database/database";

function Chat() {

  const { photoUrl } = useOutletContext();
  const [isDarkMode, setIsDarkMode] = useState(false);

// Example of toggling dark mode
useEffect(() => {
  const savedMode = localStorage.getItem("theme");
  if (savedMode === "dark") {
    setIsDarkMode(true);
  }
}, []);

const toggleDarkMode = () => {
  console.log("called");
  setIsDarkMode((prevMode) => {
    const newMode = !prevMode;
    localStorage.setItem("theme", newMode ? "dark" : "light");
    return newMode;
  });
  
};

  const [isOnline, setIsOnline] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const userId = userData?.id;
  const { id: receiverId } = useParams();

  const [receiverProfile, setReceiverProfile] = useState(null)

  const [conversationId, setConversationId] = useState(null);
  const [messageContent, setMessageContent] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalMessages, setTotalMessages] = useState(0);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    const chatScreen = document.getElementById("chat-scroll");
    if (messagesEndRef.current && chatScreen) {
      chatScreen.scrollTo({
        top: messagesEndRef.current.offsetTop,
        behavior: "smooth"
      });
    }
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

     // Listen to status changes
    socket.on('user-status', ({ userId:id, status }) => {
      if (userId === id) {
        setIsOnline(status === 'online');
      }
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
      socket.off("user-status");
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

  useEffect(() => {
    if (receiverId) {
        databaseService.getChatReceiverNameAndPhotoById(receiverId)
        .then((data) => {
            setReceiverProfile(data)
        })
        .catch(console.error);
    }
    
    
    }, [receiverId]);


    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
      const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
      };
  
      document.addEventListener("fullscreenchange", handleFullscreenChange);
      return () => {
        document.removeEventListener("fullscreenchange", handleFullscreenChange);
      };
    }, []);
  
    const toggleFullscreen = () => {
      const elem = document.getElementById("chat-screen");
      if (!document.fullscreenElement && elem?.requestFullscreen) {
        elem.requestFullscreen();
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    };


    


  return (
    <div id="chat-screen"
  style={{
    maxWidth: "600px",
    margin: "100px auto 20px",
    padding: "20px",
    borderRadius: "16px",
    backgroundColor: isDarkMode ? "#1f1f1f" : "#ffffff",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    height: "80vh",
    color: isDarkMode ? "#f5f5f5" : "#111",
    transition: "all 0.3s ease",
    position: "relative"
  }}
>
<div
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        display: "flex",
        gap: "10px",
      }}
    >
      

      {/* Fullscreen Toggle */}
      <div
        onClick={toggleFullscreen}
        style={{
          padding: "8px 14px",
          backgroundColor: isDarkMode?"#555": '#fff',
          color: isDarkMode?"#fff": '#555',
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          gap: "6px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
        }}
      >
        {isFullscreen ? "❌" : "🖥️"} 
        {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
      </div>
      {/* Theme Toggle */}
      <div
        onClick={toggleDarkMode}
        style={{
          padding: "8px 14px",
          backgroundColor: isDarkMode ? "#555" : "#fff",
          color: "#fff",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          gap: "6px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
        }}
      >
        {isDarkMode ? "🌞" : "🌙"} 
      </div>
      {/* <p>{isOnline ? "🟢 Online" : "⚪ Offline"}</p> */}

    </div>



  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "20px",
      padding: "10px",
      backgroundColor: isDarkMode ? "#2c2c2c" : "#f1f5f9",
      borderRadius: "15px",
      marginBottom: "16px"
    }}
  >
    <img
      src={receiverProfile?.photo_url}
      alt="Profile"
      style={{
        height: "80px",
        width: "80px",
        borderRadius: "50%",
        objectFit: "cover",
        border: `2px solid ${isDarkMode? 'rgb(229, 70, 89) ' : 'rgb(112, 171, 233)'}`
      }}
    />
    <h2
      style={{
        fontSize: "28px",
        fontWeight: "600",
        color: isDarkMode ? "#fff" : "#111827"
      }}
    >
      {receiverProfile?.first_name} {receiverProfile?.last_name}
    </h2>
  </div>

  <div
  id="chat-scroll"
    ref={messagesContainerRef}
    onScroll={handleScroll}
    style={{
      flex: 1,
      overflowY: "auto",
      padding: "10px",
      backgroundColor: isDarkMode ? "#1a1a1a" : "#f9fafb",
      borderRadius: "12px",
      marginBottom: "20px",
      transition: "background-color 0.3s ease"
    }}
  >
    {loading && (
      <p style={{ textAlign: "center", color: "#888", fontSize: "14px" }}>
        Loading more messages...
      </p>
    )}

    {messages.length === 0 ? (
      <p style={{ textAlign: "center", color: "#888", fontSize: "14px" }}>
        No messages yet
      </p>
    ) : (
      messages.map((msg, index) => {
        const isSender = msg.sender_id === userId;

        return (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: isSender ? "flex-end" : "flex-start",
              marginBottom: "16px",
              alignItems: "flex-end",
              gap: "5px"
            }}
          >
            <img
              src={isSender ? photoUrl : receiverProfile?.photo_url}
              alt="Avatar"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover"
              }}
            />

            <div
              style={{
                backgroundColor: isSender
                  ? "#4f46e5"
                  : isDarkMode
                  ? "#2f2f2f"
                  : "#ffffff",
                color: isSender ? "#fff" : isDarkMode ? "#f5f5f5" : "#111827",
                padding: "12px 16px",
                borderRadius: "24px",
                maxWidth: "70%",
                fontSize: "15px",
                lineHeight: "1.5",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease"
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  marginBottom: "4px",
                  color: isDarkMode ? "#bbb" : "#555"
                }}
              >
                {isSender ? "You" : `${receiverProfile.first_name}`}
              </div>

              <div>{msg.message_content}</div>

              <div
                style={{
                  fontSize: "11px",
                  marginTop: "6px",
                  textAlign: "right",
                  color: isSender ? "#dbeafe" : "#6b7280"
                }}
              >
                {new Date(msg.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit"
                })}
                {isSender && (
                  <div
                    style={{
                      fontSize: "10px",
                      color: msg.is_read ? "#34d399" : "#9ca3af"
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
        padding: "12px",
        fontSize: "16px",
        borderRadius: "12px",
        border: isDarkMode ? "1px solid #444" : "1px solid #ccc",
        backgroundColor: isDarkMode ? "#2b2b2b" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
        resize: "none"
      }}
    />
    <button
      onClick={handleSend}
      style={{
        backgroundColor: "#4f46e5",
        color: "#fff",
        border: "none",
        padding: "12px 20px",
        borderRadius: "12px",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background-color 0.2s ease-in-out"
      }}
    >
      Send
    </button>
  </div>
</div>

  );
}

export default Chat;
