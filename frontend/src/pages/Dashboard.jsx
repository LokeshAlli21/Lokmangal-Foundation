import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import databaseService from "../backend-services/database/database"
import { useSelector } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import socket from '../socket';

function Dashboard() {
    const { photoUrl, userRole, isBlockedProfile } = useOutletContext();


    const navigate = useNavigate()

    const userData = useSelector((state) => state.auth.userData);

    const userId = userData?.id;
    
    const [conversationList, setConversationList] = useState([]);
    
    const [wishlist, setWishlist] = useState([]);

    const handleChat = (id) => {
        navigate(`/chat/${id}`)
      }

    useEffect(() => {
    if (userData.id) {
        databaseService.getUserWishlist(userData.id)
        .then((list) => {
            setWishlist(list)
        })
        .catch(console.error);
    }
    }, [userData]);

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
            console.log("isSender: ", isSender);
            
      
            if (!conv) return null; // Skip if conv is invalid
            
            const lastMessageObj = conv.last_message?.[conv.last_message.length - 1] || {};
      
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
              last_message: conv.last_message || '',
            };
          }).filter(Boolean); // Filter out any invalid ones
      
          setConversationList(transformed);
        });
      
        // Cleanup on unmount
        return () => {
          socket.off('conversations-loaded');
        };
      }, [userId]);  
      
  return (
    <section>
        <div className="db" style={{marginTop: '0px', paddingTop: '50px'}}>
            <div className="container">
            <div className="row">
                <div className="col-md-4 col-lg-3">
                <div className="db-nav">
                    <div className="db-nav-pro">
                    <img src={photoUrl} className="img-fluid" alt="Profile" />
                    </div>
                    <div className="db-nav-list">
                    <ul>
                        <li>
                        <a href="/dashboard" className="act">
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
                        {
                          (userRole === 'user') &&
                          <>
                            <li>
                            <a href="/interests">
                                <i className="fa fa-handshake-o" aria-hidden="true" />
                                Interests
                            </a>
                            </li>
                            <li>
                            <a href="/chat-list">
                                <i className="fa fa-commenting-o" aria-hidden="true" />
                                Chat list
                            </a>
                            </li>
                          </>
                        }
                        {
                          (userRole === 'super_admin') && 
                          <li>
                            <a href="/super-admin/view-all-profiles">
                                <i className="fa fa-users" aria-hidden="true" />
                                View All Profiles
                            </a>
                          </li>
                        }
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
                  {isBlockedProfile? 
                  <h2 style={{ color: 'red', textAlign: 'center' }}>
                    🚫 Your profile has been blocked by an administrator. Please contact support for further assistance.
                  </h2>
                  : 
                  <>
                <div className="db-inte-prof-list" style={{borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',backgroundColor: 'white',
    padding: '30px',}}>
                <h2 className="db-tit">
                <i className="fa fa-heart" aria-hidden="true"> <b>Liked Profiles</b></i> 
                     </h2>
                        <ul>
                          
                          {wishlist.length === 0 && 
                          <li>
                          <h2>No liked profiles</h2>
                        </li>
}


                        {wishlist.map((arrItem) => {
        const birthDate = new Date(arrItem.profiles.dob);
        const age = new Date().getFullYear() - birthDate.getFullYear();
        const requestDate = new Date().toLocaleString(); // Current date-time

        return (
          <li key={arrItem.profiles.id}>
            <div className="db-int-pro-1">
              <img
               src={arrItem.profiles.photo_url} alt={`${arrItem.profiles.first_name} ${arrItem.profiles.last_name}`} 
               style={{height: '150px'}}
               />
            </div>
            <div className="db-int-pro-2">
              <h5>{`${arrItem.profiles.first_name} ${arrItem.profiles.last_name}`}</h5>
              <ol className="poi">
                <li>
                  City: <strong>{arrItem.profiles.city}</strong>
                </li>
                <li>
                  Age: <strong>{age}</strong>
                </li>
                <li>
                  Height: <strong>{`${arrItem.profiles.height_feet}.${arrItem.profiles.height_inches}`}</strong>
                </li>
                <li>
                  Job: <strong>{arrItem.profiles.occupation}</strong>
                </li>
              </ol>
              <ol className="poi poi-date">
              <li>User since: {
                (() => {
                  const createdDate = new Date(arrItem.profiles.created_at);
                  const now = new Date();
                  const diffTime = Math.abs(now - createdDate);
                  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                  const diffMonths = Math.floor(diffDays / 30);
                  const diffYears = Math.floor(diffDays / 365);

                  if (diffYears > 0) return `${diffYears} year${diffYears > 1 ? 's' : ''} `;
                  if (diffMonths > 0) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} `;
                  return `${diffDays} day${diffDays > 1 ? 's' : ''} `;
                })()
              }</li>
              </ol>
              <a href={`/profile-details/${arrItem.profiles.id}`} className="cta-5" target="_blank" rel="noopener noreferrer">
                View full profile
              </a>
            </div>
            <div className="db-int-pro-3">
            <button
                type="button"
                className="btn btn-primary btn-md"
                style={{ color: 'white', padding: '6px 12px', backgroundColor: '#007bff', border: 'none', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}
                onClick={() => handleChat(arrItem.profiles.id)}
                >
                <i className="fa fa-comments" aria-hidden="true"></i> Chat
                </button>

            </div> 
          </li>
        );
      })}

                        </ul>
                      </div>

                <div className="row" style={{marginTop: '30px'}}>
                    <div className="col-lg-12 db-sec-com">
                    <h2 className="db-tit">Recent chat list</h2>
                    <div className="db-pro-stat">
                        <div className="db-inte-prof-list db-inte-prof-chat">
                        <ul>
                        {(conversationList.length === 0 ) && <h2>No chats are avalible</h2> }


{
    conversationList.map((conv) => {
        const lastMessageText = conv.last_message?.message_content?.trim() || '';
        // console.log("conv.last_message?.message_content: ", conv.last_message);
        
        // console.log(userId);
        // console.log(conv.last_sender_id);
        
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

            <li key={conv.conversation_id} onClick={() => navigate(`/chat/${otherUser.id}`)}>
                <div className="db-int-pro-1">
                    {" "}
                    <img src={photo} alt={name} />{" "}
                </div>
                <div className="db-int-pro-2">
                    <h5>{name}</h5> <span>{lastMessage}</span> 
                    {hasUnread && <span className="cont" style={{float: 'right',    fontSize: "14px",
    width: "20px",
    height: "20px",
    display: "inline-block",
    background: "#4CAF50",
    color: "#fff",
    fontWeight: "500",
    borderRadius: "50px",
    textAlign: "center", }}>{conv.unread_count}</span>}{" "}
                </div>
            </li>
            
          );
        })

}
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </>
                }
                </div>
            </div>
            </div>
        </div>
    </section>

  )
}

export default Dashboard