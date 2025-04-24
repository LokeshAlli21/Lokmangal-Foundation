import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import databaseService from '../backend-services/database/database';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';

function ViewAllProfiles() {
  const { photoUrl } = useOutletContext();

  const userData = useSelector((state) => state.auth.userData);
  const userId = userData?.id;

  const [profiles, setProfiles] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notAllowed, setNotAllowed] = useState(false);

  useEffect(() => {
    const fetchProfiles = async () => {
      if (!userId) return;

      try {
        const data = await databaseService.getProfilesForSuperAdmin(userId);
        setProfiles(data.data);
      } catch (error) {
        if (error.message.includes("Access denied")) {
          setNotAllowed(true);
        } else {
          console.error("❌ Error fetching profiles:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchBlockedUsers = async () => {
      try {
        const blocked = await databaseService.getBlockedUsersByAdmin();
        console.log("list: ", blocked);
        
        setBlockedUsers(blocked); // assumes the function returns an array
      } catch (error) {
        console.error("❌ Error fetching blocked users:", error);
        toast.error("Failed to load blocked users.");
      }
    };

    fetchProfiles();
    fetchBlockedUsers();
  }, [userId]);
  

  const handleBlockByAdmin = async (targetUserId) => {
    try {

      await databaseService.blockUserByAdmin({
        adminId: userId,
        userId: targetUserId,
      });

      toast.success(`✅ User ${targetUserId} has been blocked!`);

      setBlockedUsers(prev => [...prev, { user_id: targetUserId }]);
    } catch (err) {
      toast.error(`🚨 Failed to block user: ${err.message}`);
      console.error("Error blocking user:", err);
    }
  };

  const handleUnblockByAdmin = async (targetUserId) => {
    try {
      await databaseService.unBlockUserByAdmin({
        adminId: userId,
        userId: targetUserId,
      });
  
      toast.success(`✅ User ${targetUserId} has been unblocked!`);
  
      setBlockedUsers(prev => prev.filter(user => user.user_id !== targetUserId));
    } catch (err) {
      toast.error(`🚨 Failed to unblock user: ${err.message}`);
      console.error("Error unblocking user:", err);
    }
  };

  if (loading) return <p>Loading profiles...</p>;

  if (notAllowed) {
    return (
      <div className="p-4 text-red-600 font-semibold">
        🚫 You are not authorized to view this page.
      </div>
    );
  }

  return (
    <>
      {profiles.length === 0 ? (
        <p>No profiles found.</p>
      ) : (
<section>
  <div className="db" style={{marginTop: 0, padding: "50px"}}>
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
                  <a href="/super-admin/view-all-profiles">
                      <i className="fa fa-users" aria-hidden="true" />
                      View All Profiles
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
              <h2 className="db-tit">See all the user profiles</h2>
              <div className="db-pro-stat">
                <div className="db-inte-main">
                  
                  <div className="tab-content">
                    <div id="home" className="container tab-pane active">
                      <br />
                      <div className="db-inte-prof-list">
                        <ul>
                          




                        {profiles.map((profile) => {
        const birthDate = profile.dob && new Date(profile.dob)
        const age = profile.dob && new Date().getFullYear() - birthDate.getFullYear();
        const requestDate = new Date().toLocaleString(); // Current date-time

        return (
          <li key={profile.id}>
            <div className="db-int-pro-1">
              <img
               src={profile.photo_url} alt={`${profile.first_name} ${profile.last_name}`} 
               style={{height: '150px'}}
               />
            </div>
            <div className="db-int-pro-2">
              <h5>{`${profile.first_name} ${profile.last_name}`}</h5>
              <ol className="poi">
                <li>
                  City: <strong>{profile.city}</strong>
                </li>
                <li>
                  Age: <strong>{age}</strong>
                </li>
                <li>
                  Height: <strong>{`${profile.height_feet}.${profile.height_inches}`}</strong>
                </li>
                <li>
                  Job: <strong>{profile.occupation}</strong>
                </li>
              </ol>
              <ol className="poi poi-date">
              <li>User since: {
                (() => {
                  const createdDate = new Date(profile.created_at);
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
              <a href={`/profile-details/${profile.id}`} className="cta-5" target="_blank" rel="noopener noreferrer">
                View full profile
              </a>
            </div>
            <div className="db-int-pro-3" style={{display: 'flex', flexDirection: 'column',height: '100%', rowGap: '10px', alignContent: 'center', alignItems: 'center'}}>
            {blockedUsers.some((blocked) => blocked.user_id === profile.id) ? (
            <button
              type="button"
              className="btn btn-warning btn-md"
              style={{ color: 'white', padding: '5px 10px' }}
              onClick={() => handleUnblockByAdmin(profile.id)}
            >
              <i className="fa fa-unlock-alt" aria-hidden="true"></i> Unblock
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-danger btn-md"
              style={{ color: 'white', padding: '5px 10px', marginRight: '8px' }}
              onClick={() => handleBlockByAdmin(profile.id)}
            >
              <i className="fa fa-ban" aria-hidden="true"></i> Block
            </button>
          )}


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
      </div>
    </div>
  </div>
</section>

      )}
    </>
  );
}

export default ViewAllProfiles;
