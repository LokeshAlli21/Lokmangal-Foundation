import React from 'react';

const ProfileDetails = () => {
  const formData = {
    firstName: 'John',
    middleName: 'M.',
    lastName: 'Doe',
    gender: 'Male',
    dob: '1990-05-15',
    maritalStatus: 'Single',
    religion: 'Christianity',
    caste: 'Catholic',
    subCaste: 'Roman Catholic',
    state: 'California',
    city: 'Los Angeles',
    pincode: '90001',
    education: 'Masters in Computer Science',
    occupation: 'Software Engineer',
    income: '$100,000',
    fatherName: 'Robert Doe',
    motherName: 'Maria Doe',
    familyStatus: 'Middle Class',
    familyType: 'Nuclear Family',
    preferredAgeRange: '25-30',
    preferredReligionCaste: 'Christianity - Catholic',
    preferredLocation: 'California, USA',
    otherPreferences: 'Well-educated, family-oriented',
    heightFeet: '5',
    heightInches: '11',
    weight: '75kg',
  };

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
    border: '5px solid rgb(255, 126, 126)',
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
            <div style={headerStyle}>💖 Profile Details</div>
            <div style={profileSection}>
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="Profile"
                style={imageStyle}
              />
              <div style={detailsSection}>
                <div style={detailRow}>
                  <span style={emojiStyle}>🧑‍💼</span>
                  <span style={labelStyle}>Name:</span>
                  <span style={valueStyle}>
                    {formData.firstName} {formData.middleName} {formData.lastName}
                  </span>
                </div>
                <div style={detailRow}>
                  <span style={emojiStyle}>⚧️</span>
                  <span style={labelStyle}>Gender:</span>
                  <span style={valueStyle}>{formData.gender}</span>
                </div>
                <div style={detailRow}>
                  <span style={emojiStyle}>🎂</span>
                  <span style={labelStyle}>Date of Birth:</span>
                  <span style={valueStyle}>{formData.dob}</span>
                </div>
                <div style={detailRow}>
                  <span style={emojiStyle}>💍</span>
                  <span style={labelStyle}>Marital Status:</span>
                  <span style={valueStyle}>{formData.maritalStatus}</span>
                </div>
                <div style={detailRow}>
                  <span style={emojiStyle}>📏</span>
                  <span style={labelStyle}>Height:</span>
                  <span style={valueStyle}>
                    {formData.heightFeet} ft {formData.heightInches} in
                  </span>
                </div>
                <div style={detailRow}>
                  <span style={emojiStyle}>⚖️</span>
                  <span style={labelStyle}>Weight:</span>
                  <span style={valueStyle}>{formData.weight}</span>
                </div>
              </div>
            </div>

            <div style={sectionTitle}>🙏 Personal & Religious Details</div>
            <div style={detailRow}>
              <span style={emojiStyle}>🛐</span>
              <span style={labelStyle}>Religion:</span>
              <span style={valueStyle}>{formData.religion}</span>
            </div>
            <div style={detailRow}>
              <span style={emojiStyle}>🧬</span>
              <span style={labelStyle}>Caste:</span>
              <span style={valueStyle}>
                {formData.caste} ({formData.subCaste})
              </span>
            </div>
            <div style={detailRow}>
              <span style={emojiStyle}>📍</span>
              <span style={labelStyle}>Location:</span>
              <span style={valueStyle}>
                {formData.city}, {formData.state} - {formData.pincode}
              </span>
            </div>

            <div style={sectionTitle}>🎓 Education & Profession</div>
            <div style={detailRow}>
              <span style={emojiStyle}>🎓</span>
              <span style={labelStyle}>Education:</span>
              <span style={valueStyle}>{formData.education}</span>
            </div>
            <div style={detailRow}>
              <span style={emojiStyle}>💼</span>
              <span style={labelStyle}>Occupation:</span>
              <span style={valueStyle}>{formData.occupation}</span>
            </div>
            <div style={detailRow}>
              <span style={emojiStyle}>💰</span>
              <span style={labelStyle}>Income:</span>
              <span style={valueStyle}>{formData.income}</span>
            </div>

            <div style={sectionTitle}>👨‍👩‍👧‍👦 Family Details</div>
            <div style={detailRow}>
              <span style={emojiStyle}>👨</span>
              <span style={labelStyle}>Father's Name:</span>
              <span style={valueStyle}>{formData.fatherName}</span>
            </div>
            <div style={detailRow}>
              <span style={emojiStyle}>👩</span>
              <span style={labelStyle}>Mother's Name:</span>
              <span style={valueStyle}>{formData.motherName}</span>
            </div>
            <div style={detailRow}>
              <span style={emojiStyle}>🏡</span>
              <span style={labelStyle}>Family Status:</span>
              <span style={valueStyle}>
                {formData.familyStatus} ({formData.familyType})
              </span>
            </div>

            <div style={sectionTitle}>💞 Partner Preferences</div>
            <div style={detailRow}>
              <span style={emojiStyle}>🎂</span>
              <span style={labelStyle}>Preferred Age Range:</span>
              <span style={valueStyle}>{formData.preferredAgeRange}</span>
            </div>
            <div style={detailRow}>
              <span style={emojiStyle}>🛐</span>
              <span style={labelStyle}>Preferred Religion/Caste:</span>
              <span style={valueStyle}>{formData.preferredReligionCaste}</span>
            </div>
            <div style={detailRow}>
              <span style={emojiStyle}>📍</span>
              <span style={labelStyle}>Preferred Location:</span>
              <span style={valueStyle}>{formData.preferredLocation}</span>
            </div>
            <div style={detailRow}>
              <span style={emojiStyle}>💡</span>
              <span style={labelStyle}>Other Preferences:</span>
              <span style={valueStyle}>{formData.otherPreferences}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default ProfileDetails;
