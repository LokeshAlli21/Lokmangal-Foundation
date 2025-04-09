import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditProfile() {
  
  
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [emailOtp, setEmailOtp] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [generatedEmailOtp, setGeneratedEmailOtp] = useState('');
  const [generatedPhoneOtp, setGeneratedPhoneOtp] = useState('');
  const [emailCooldown, setEmailCooldown] = useState(0);
  const [phoneCooldown, setPhoneCooldown] = useState(0);

  const [formData, setFormData] = useState({
    fullName: '',
    middleName: '',
    lastName: '',
    gender: '',
    dob: '',
    maritalStatus: '',
    religion: '',
    caste: '',
    subCaste: '',
    state: '',
    city: '',
    pincode: '',
    mobile: '',
    altMobile: '',
    email: '',
    education: '',
    occupation: '',
    income: '',
    fatherName: '',
    motherName: '',
    familyStatus: '',
    familyType: '',
    preferredAgeRange: '',
    preferredReligionCaste: '',
    preferredLocation: '',
    otherPreferences: '',
  });

 
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Reset verification if user edits fields
    if (name === 'email') {
      setEmailVerified(false);
      setEmailOtpSent(false);
      setEmailOtp('');
    }
    if (name === 'mobile') {
      setPhoneVerified(false);
      setPhoneOtpSent(false);
      setPhoneOtp('');
    }
  };



  
  // Cooldown timer for resend OTP (email and phone)
  useEffect(() => {
    let interval = null;
    if (emailCooldown > 0) {
      interval = setInterval(() => {
        setEmailCooldown((prev) => prev - 1);
      }, 1000);
    }
    if (phoneCooldown > 0) {
      interval = setInterval(() => {
        setPhoneCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [emailCooldown, phoneCooldown]);

  // Utility to generate random 6-digit OTP
  const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

  const sendEmailOtp = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return toast.error('Please enter a valid email');
    }
    const otp = generateOtp();
    setGeneratedEmailOtp(otp);
    setEmailOtpSent(true);
    setEmailCooldown(30); // 30 seconds cooldown
    toast.success(`OTP sent to email! (for test: ${otp})`);
  };

  const verifyEmailOtp = () => {
    if (emailOtp === generatedEmailOtp) {
      setEmailVerified(true);
      toast.success('Email verified successfully!');
    } else {
      toast.error('Invalid OTP');
    }
  };

  const sendPhoneOtp = () => {
    if (!/^\d{10}$/.test(formData.mobile)) {
      return toast.error('Please enter valid 10-digit phone number');
    }
    const otp = generateOtp();
    setGeneratedPhoneOtp(otp);
    setPhoneOtpSent(true);
    setPhoneCooldown(30); // 30 seconds cooldown
    toast.success(`OTP sent to phone! (for test: ${otp})`);
  };

  const verifyPhoneOtp = () => {
    if (phoneOtp === generatedPhoneOtp) {
      setPhoneVerified(true);
      toast.success('Phone verified successfully!');
    } else {
      toast.error('Invalid OTP');
    }
  };

  const validateForm = () => {
    const {
      fullName, gender, dob, maritalStatus, religion,
      caste, state, city, pincode, mobile, email,
      education, occupation
    } = formData;

    if (!fullName.trim()) return toast.error("Please enter Full Name / कृपया पूर्ण नाव भरा");
    if (!gender) return toast.error("Please select Gender / कृपया लिंग निवडा");
    if (!dob) return toast.error("Please enter Date of Birth / कृपया जन्मतारीख भरा");
    if (!maritalStatus) return toast.error("Please select Marital Status / कृपया वैवाहिक स्थिती निवडा");
    if (!religion) return toast.error("Please select Religion / कृपया धर्म निवडा");
    if (!caste) return toast.error("Please enter Caste / कृपया जात भरा");
    if (!state) return toast.error("Please enter State / कृपया राज्य भरा");
    if (!city) return toast.error("Please enter City / कृपया शहर भरा");
    if (!pincode.match(/^\d{6}$/)) return toast.error("Please enter valid 6-digit Pincode / वैध 6 अंकी पिनकोड भरा");
    if (!mobile.match(/^\d{10}$/)) return toast.error("Please enter valid 10-digit Mobile Number / वैध 10 अंकी मोबाईल नंबर भरा");
    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) return toast.error("Please enter valid Email / वैध ई-मेल पत्ता भरा");
    if (!education) return toast.error("Please enter Education Qualification / शैक्षणिक पात्रता भरा");
    if (!occupation) return toast.error("Please enter Occupation / व्यवसाय भरा");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success("Profile updated successfully! / प्रोफाइल यशस्वीरित्या अपडेट झाला!");
      console.log(formData);
    }
  };

  return (
    <section>
      <div className="login pro-edit-update">
        <div className="container">
          <div className="row">
            <div className="inn">
              <div className="rhs">
                <div className="form-login">
                  <form onSubmit={handleSubmit}>
                    {/* Personal Info */}
                    <div className="edit-pro-parti">
                      <div className="form-tit">
                        <h4>Basic Info / वैयक्तिक माहिती</h4>
                        <h1>Edit my profile / माझा प्रोफाइल संपादित करा</h1>
                      </div>
                      <div className="form-group">
                        <label className="lb">Full Name (पूर्ण नाव):</label>
                        <input type="text" name="fullName" className="form-control" placeholder="Enter your full name / आपले पूर्ण नाव भरा" value={formData.fullName} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label className="lb">Middle Name (मध्य नाव):</label>
                        <input type="text" name="middleName" className="form-control" placeholder="Middle name (optional) / मध्य नाव (ऐच्छिक)" value={formData.middleName} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label className="lb">Last Name (आडनाव):</label>
                        <input type="text" name="lastName" className="form-control" placeholder="Last name / आडनाव" value={formData.lastName} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label className="lb">Gender (लिंग):</label>
                        <select name="gender" className="form-select chosen-select" value={formData.gender} onChange={handleChange}>
                          <option value="">Select Gender / लिंग निवडा</option>
                          <option value="Male">Male / पुरुष</option>
                          <option value="Female">Female / महिला</option>
                          <option value="Other">Other / इतर</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="lb">Date of Birth (जन्मतारीख):</label>
                        <input type="date" name="dob" className="form-control" value={formData.dob} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label className="lb">Marital Status (वैवाहिक स्थिती):</label>
                        <select name="maritalStatus" className="form-select chosen-select" value={formData.maritalStatus} onChange={handleChange}>
                          <option value="">Select Marital Status / वैवाहिक स्थिती निवडा</option>
                          <option value="Single">Single / अविवाहित</option>
                          <option value="Divorced">Divorced / घटस्फोटित</option>
                          <option value="Widow/Widower">Widow/Widower / विधवा/विधुर</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="lb">Religion (धर्म):</label>
                        <input type="text" name="religion" className="form-control" placeholder="Religion / धर्म" value={formData.religion} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label className="lb">Caste (जात):</label>
                        <input type="text" name="caste" className="form-control" placeholder="Caste / जात" value={formData.caste} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label className="lb">Sub-Caste (उपजात): (Optional)</label>
                        <input type="text" name="subCaste" className="form-control" placeholder="Sub-caste (optional) / उपजात (ऐच्छिक)" value={formData.subCaste} onChange={handleChange} />
                      </div>

                      {/* Location Info */}
                      <div className="form-group">
                        <label className="lb">State (राज्य):</label>
                        <input type="text" name="state" className="form-control" placeholder="State / राज्य" value={formData.state} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label className="lb">City (शहर):</label>
                        <input type="text" name="city" className="form-control" placeholder="City / शहर" value={formData.city} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label className="lb">Pincode (पिनकोड):</label>
                        <input type="text" name="pincode" className="form-control" placeholder="Pincode / पिनकोड" value={formData.pincode} onChange={handleChange} />
                      </div>

                      {/* Contact Info */}
                      <div className="form-group">
                        <label className="lb">Mobile Number (मोबाईल नंबर):</label>
                        <input type="text" name="mobile" className="form-control" placeholder="Mobile number / मोबाईल नंबर" value={formData.mobile} onChange={handleChange} />
                       
                        
                        {!phoneVerified && formData.mobile.length === 10 && (
          <div>
            <button
              onClick={sendPhoneOtp}
              disabled={phoneOtpSent && phoneCooldown > 0}
            >
              {phoneOtpSent && phoneCooldown > 0 ? `Resend OTP in ${phoneCooldown}s` : 'Send OTP'}
            </button>
            {phoneOtpSent && (
              <div>
                <input
                  type="text"
                  placeholder="Enter Phone OTP"
                  value={phoneOtp}
                  onChange={(e) => setPhoneOtp(e.target.value)}
                />
                <button onClick={verifyPhoneOtp}>Verify Phone</button>
              </div>
            )}
          </div>
        )}
        {phoneVerified && <span style={{ color: 'green' }}>✅ Verified</span>}


                      </div>
                      <div className="form-group">
                        <label className="lb">Alternate Mobile (पर्यायी मोबाईल नंबर): (Optional)</label>
                        <input type="text" name="altMobile" className="form-control" placeholder="Alternate mobile (optional) / पर्यायी मोबाईल नंबर" value={formData.altMobile} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label className="lb">Email (ई-मेल पत्ता):</label>
                        <input type="email" name="email" className="form-control" placeholder="Email / ई-मेल पत्ता" value={formData.email} onChange={handleChange} />



                        {!emailVerified && formData.email.includes('@') && (
          <div>
            <button
              onClick={sendEmailOtp}
              disabled={emailOtpSent && emailCooldown > 0}
            >
              {emailOtpSent && emailCooldown > 0 ? `Resend OTP in ${emailCooldown}s` : 'Send OTP'}
            </button>
            {emailOtpSent && (
              <div>
                <input
                  type="text"
                  placeholder="Enter Email OTP"
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                />
                <button onClick={verifyEmailOtp}>Verify Email</button>
              </div>
            )}
          </div>
        )}
        {emailVerified && <span style={{ color: 'green' }}>✅ Verified</span>}

      <br /><br />

                      </div>

                      {/* Education & Profession */}
                      <div className="form-group">
                        <label className="lb">Education (शिक्षण):</label>
                        <input type="text" name="education" className="form-control" placeholder="Education / शिक्षण" value={formData.education} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label className="lb">Occupation (व्यवसाय):</label>
                        <input type="text" name="occupation" className="form-control" placeholder="Occupation / व्यवसाय" value={formData.occupation} onChange={handleChange} />
                      </div>

                      {/* Add rest of the fields as same pattern */}
                      {/* I can give you full form ready if you want! */}

                    </div>

                    <button type="submit" className="btn btn-primary">Update Profile / प्रोफाइल अपडेट करा</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditProfile;




//   Basic Registration Form Fields:

// 👤 Personal Information (वैयक्तिक माहिती)  
// 1. Full Name (पूर्ण नाव) – (First Name, Middle Name, Last Name)  
// 2. Gender (लिंग) – (Male | Female | Other)  
// 3. Date of Birth (जन्मतारीख) – (DD/MM/YYYY)  
// 4. Marital Status (वैवाहिक स्थिती) – (Single | Divorced | Widow/Widower)  
// 5. Religion (धर्म) – (Hindu, Muslim, Sikh, Christian, Jain, etc.)  
// 6. Caste (जात) – (As per user's background)  
// 7. Sub-caste (उपजात) (Optional)  

// 📍 Location Details (ठिकाणाची माहिती)    
// 9. State (राज्य)  
// 10. City (शहर)  
// 11. Pincode (पिनकोड)  

// 📞 Contact Information (संपर्क माहिती)  
// 12. Mobile Number (मोबाईल नंबर)  
// 13. Alternate Mobile Number (पर्यायी मोबाईल नंबर) (Optional)  
// 14. Email Address (ई-मेल पत्ता)  

// 🎓 Education & Profession (शिक्षण आणि व्यवसाय)  
// 15. Education Qualification (शैक्षणिक पात्रता) – (Graduate, Postgraduate, Diploma, etc.)  
// 16. Occupation (व्यवसाय) – (Job, Business, Government Employee, etc.)  
// 17. Annual Income (वार्षिक उत्पन्न) – (Optional)  

// 🏠 Family Information (कौटुंबिक माहिती) (Optional but recommended)  
// 18. Father’s Name (वडिलांचे नाव)  
// 19. Mother’s Name (आईचे नाव)  
// 20. Family Status (कौटुंबिक स्थिती) – (Middle Class | Upper Middle Class | Affluent)  
// 21. Family Type (कुटुंब प्रकार) – (Nuclear | Joint Family)  

// 💑 Partner Preferences (पार्टनर प्राधान्ये) (For better matchmaking)  
// 22. Preferred Age Range (प्राधान्य वयोगट)  
// 23. Preferred Religion & Caste (प्राधान्य धर्म व जात)  
// 24. Preferred Location (प्राधान्य शहर/राज्य)  
// 25. Other Preferences (इतर प्राधान्ये) – (Height, Lifestyle, Hobbies, etc.)