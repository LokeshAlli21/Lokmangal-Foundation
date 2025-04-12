import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import databaseService from '../backend-services/database/database';
import { useSelector } from 'react-redux';


const ProfileDetails = () => {

  const userData = useSelector(state => state.auth.userData);

  const [isOwner, setIsOwner] = useState(false)

  const [profileData, setProfileData] = useState({})

  const { id } = useParams()
  console.log(id);
  

  useEffect(() => {
    databaseService.getProfileById(id)
  .then(p => {
    if (!p) {
      // Show toast when profile not found
      toast("Profile not found.", { type: 'info' });
    } else {
      setProfileData(p);
      console.log('profile: ', p);
    }
  })
  .catch(error => {
    // Handle any errors that occur during the fetch
    console.error('Error fetching profile:', error);
    toast("Error fetching profile. Please try again.", { type: 'error' });
  });

  if(userData.email === profileData.email){
    setIsOwner(true)
  } else {
    setIsOwner(false)
  }

  },[])


  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: '#f9f9f9',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    maxWidth: '900px',
    margin: 'auto',
    color: '#333',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#E91E63',
    fontSize: '28px',
    fontWeight: 'bold',
  };

  const profileSection = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '20px',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: '30px',
  };

  const imageStyle = {
    width: '200px',
    height: '200px',
    borderRadius: '20%',
    objectFit: 'cover',
    border: '5px solid rgb(210, 118, 84)',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
  };

  const detailsSection = {
    // flex: 1,
    minWidth: '50%',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  };

  const sectionTitle = {
    fontSize: '20px',
    color: '#3F51B5',
    borderBottom: '2px solid #E91E63',
    paddingBottom: '5px',
    marginTop: '20px',
  };

  const detailRow = {
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
    color: '#555',
  };

  const emojiStyle = {
    marginRight: '8px',
    fontSize: '18px',
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginRight: '5px',
  };

  const valueStyle = {
    color: '#333',
  };

  return (
    <section>
      <div className="db" style={{ paddingTop: "40px" }}>
        <div className="container">
          <div style={containerStyle}>
          {isOwner && (
  <a
    href="/edit-profile"
    style={{
      backgroundColor: '#616e82', // bg-blue-500
      color: '#fff', // text-white
      display: 'flex',
      alignItems: 'center',
      padding: '8px 16px', // px-4 py-2
      borderRadius: '0.5rem', // rounded-lg
      textDecoration: 'none', // Remove underline
      width: 'fit-content',
      alignSelf: 'end',
      textAlign: 'center', // text-center
      cursor: 'pointer', // Indicates clickable
      transition: 'background-color 300ms ease', // transition duration-300
    }}
    onMouseEnter={(e) => e.target.style.backgroundColor = 'gray'} // hover:bg-blue-600
    onMouseLeave={(e) => e.target.style.backgroundColor = '#616e82'} // bg-blue-500
  >
    <span style={{ marginRight: '8px' }}>🔧</span> Edit your profile
  </a>
)}

            <div style={headerStyle}>💖 Profile Details</div>
            <div style={profileSection}>
              <img
                src={profileData.photo_url}
                alt="Profile"
                style={imageStyle}
              />
              <div style={detailsSection}>
                <div style={detailRow}>
                  <span style={emojiStyle}>🧑‍💼</span>
                  <span style={labelStyle}>Name:</span>
                  <span style={valueStyle}>
                    {profileData.first_name} {profileData.middle_name} {profileData.last_name}
                  </span>
                </div>
                <div style={detailRow}>
                  <span style={emojiStyle}>⚧️</span>
                  <span style={labelStyle}>Gender:</span>
                  <span style={valueStyle}>{profileData.gender}</span>
                </div>
                <div style={detailRow}>
                  <span style={emojiStyle}>🗓️</span>
                  <span style={labelStyle}>Age:</span>
                  <span style={valueStyle}>
                    {new Date().getFullYear() - new Date(profileData.dob).getFullYear() -
                      (new Date().getMonth() < new Date(profileData.dob).getMonth() ||
                      (new Date().getMonth() === new Date(profileData.dob).getMonth() &&
                      new Date().getDate() < new Date(profileData.dob).getDate()) ? 1 : 0)} years
                  </span>
                </div>
                <div style={detailRow}>
                  <span style={emojiStyle}>💍</span>
                  <span style={labelStyle}>Marital Status:</span>
                  <span style={valueStyle}>{profileData.marital_status}</span>
                </div>
                <div style={detailRow}>
                  <span style={emojiStyle}>📏</span>
                  <span style={labelStyle}>Height:</span>
                  <span style={valueStyle}>
                    {profileData.height_feet} ft {profileData.height_inches} in
                  </span>
                </div>
                <div style={detailRow}>
                  <span style={emojiStyle}>⚖️</span>
                  <span style={labelStyle}>Weight:</span>
                  <span style={valueStyle}>{profileData.weight}</span>
                </div>
              </div>
            </div>

            <div style={sectionTitle}>🙏 Personal & Religious Details</div>
            <div style={detailRow}>
              <span style={emojiStyle}>🛐</span>
              <span style={labelStyle}>Religion:</span>
              <span style={valueStyle}>{profileData.religion}</span>
            </div>
            <div style={detailRow}>
              <span style={emojiStyle}>🧬</span>
              <span style={labelStyle}>Caste:</span>
              <span style={valueStyle}>
                {profileData.caste} <b>sub caste:</b>({profileData.sub_caste})
              </span>
            </div>
            <div style={detailRow}>
              <span style={emojiStyle}>📍</span>
              <span style={labelStyle}>Location:</span>
              <span style={valueStyle}>
                {profileData.city}, {profileData.state} - {profileData.pincode}
              </span>
            </div>

            <div style={sectionTitle}>🎓 Education & Profession</div>
            <div style={detailRow}>
              <span style={emojiStyle}>🎓</span>
              <span style={labelStyle}>Education:</span>
              <span style={valueStyle}>{profileData.education}</span>
            </div>
            <div style={detailRow}>
              <span style={emojiStyle}>💼</span>
              <span style={labelStyle}>Occupation:</span>
              <span style={valueStyle}>{profileData.occupation}</span>
            </div>
            <div style={detailRow}>
              <span style={emojiStyle}>💰</span>
              <span style={labelStyle}>Income:</span>
              <span style={valueStyle}>{profileData.income}</span>
            </div>

            <div style={sectionTitle}>👨‍👩‍👧‍👦 Family Details</div>
            <div style={detailRow}>
              <span style={emojiStyle}>👨</span>
              <span style={labelStyle}>Father's Name:</span>
              <span style={valueStyle}>{profileData.father_name}</span>
            </div>
            <div style={detailRow}>
              <span style={emojiStyle}>👩</span>
              <span style={labelStyle}>Mother's Name:</span>
              <span style={valueStyle}>{profileData.mother_name}</span>
            </div>
            <div style={detailRow}>
              <span style={emojiStyle}>🏡</span>
              <span style={labelStyle}>Family Status:</span>
              <span style={valueStyle}>
                {profileData.family_status} ({profileData.family_type})
              </span>
            </div>

            <div style={sectionTitle}>💞 Partner Preferences</div>
            <div style={detailRow}>
              <span style={emojiStyle}>🎂</span>
              <span style={labelStyle}>Preferred Age Range:</span>
              <span style={valueStyle}>{profileData.preferred_age_range}</span>
            </div>
            <div style={detailRow}>
              <span style={emojiStyle}>🛐</span>
              <span style={labelStyle}>Preferred Religion/Caste:</span>
              <span style={valueStyle}>{profileData.preferred_religion_caste}</span>
            </div>
            <div style={detailRow}>
              <span style={emojiStyle}>📍</span>
              <span style={labelStyle}>Preferred Location:</span>
              <span style={valueStyle}>{profileData.preferred_location}</span>
            </div>
            <div style={detailRow}>
              <span style={emojiStyle}>💡</span>
              <span style={labelStyle}>Other Preferences:</span>
              <span style={valueStyle}>{profileData.other_preferences}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default ProfileDetails;
