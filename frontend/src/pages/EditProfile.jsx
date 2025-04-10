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
    firstName: '',
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
    emailVerified: emailVerified,
    phoneVerified: phoneVerified,
    heightFeet: '',
    heightInches: '',
    weight: '',
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
    setEmailCooldown(60); // 30 seconds cooldown
    toast.success(`OTP sent to email! (for test: ${otp})`);
  };

  const verifyEmailOtp = () => {
    if (emailOtp === generatedEmailOtp) {
      setEmailVerified(true);
      setFormData(p => ({emailVerified : true, ...p }))
      // console.log(formData.emailVerified);
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
    setPhoneCooldown(60); // 30 seconds cooldown
    toast.success(`OTP sent to phone! (for test: ${otp})`);
  };

  const verifyPhoneOtp = () => {
    if (phoneOtp === generatedPhoneOtp) {
      setPhoneVerified(true);
      setFormData(p => ({phoneVerified: true, ...p}))
      // console.log(phoneVerified);
      toast.success('Phone verified successfully!');
    } else {
      toast.error('Invalid OTP');
    }
  };

const validateForm = () => {
  const {
    firstName, middleName, lastName, gender, dob,
    maritalStatus, religion, caste, subCaste, state,
    city, pincode, mobile, altMobile, email,
    education, occupation, income, fatherName,
    motherName, familyStatus, familyType,
    preferredAgeRange, preferredReligionCaste,
    preferredLocation, otherPreferences, emailVerified, phoneVerified, 
    heightFeet,
    heightInches,
    weight,
  } = formData;

  // Helper regex
  const pincodeRegex = /^\d{6}$/;
  const mobileRegex = /^\d{10}$/;
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  // Required fields list
  const requiredFields = [
    { value: firstName.trim(), message: "Please enter First Name / कृपया प्रथम नाव भरा" },
    // { value: middleName.trim(), message: "Please enter Middle Name / कृपया मध्य नाव भरा" },
    { value: lastName.trim(), message: "Please enter Last Name / कृपया आडनाव भरा" },
    { value: gender, message: "Please select Gender / कृपया लिंग निवडा" },
    { value: dob, message: "Please enter Date of Birth / कृपया जन्मतारीख भरा" },
    { value: heightFeet, message: "Please select Height (Feet) / कृपया फूट मध्ये उंची निवडा" },
    { value: heightInches, message: "Please select Height (Inches) / कृपया इंच मध्ये उंची निवडा" },
    { value: weight, message: "Please enter Weight / कृपया वजन भरा" },
    { value: maritalStatus, message: "Please select Marital Status / कृपया वैवाहिक स्थिती निवडा" },
    { value: religion, message: "Please select Religion / कृपया धर्म निवडा" },
    { value: caste.trim(), message: "Please enter Caste / कृपया जात भरा" },
    // { value: subCaste.trim(), message: "Please enter Sub-Caste / कृपया उपजात भरा" },
    { value: state.trim(), message: "Please enter State / कृपया राज्य भरा" },
    { value: city.trim(), message: "Please enter City / कृपया शहर भरा" },
    { value: education.trim(), message: "Please enter Education Qualification / शैक्षणिक पात्रता भरा" },
    { value: occupation.trim(), message: "Please enter Occupation / कृपया व्यवसाय भरा" },
    // { value: income.trim(), message: "Please enter Income / कृपया उत्पन्न भरा" },
    // { value: fatherName.trim(), message: "Please enter Father's Name / कृपया वडिलांचे नाव भरा" },
    // { value: motherName.trim(), message: "Please enter Mother's Name / कृपया आईचे नाव भरा" },
    // { value: familyStatus.trim(), message: "Please select Family Status / कृपया कौटुंबिक स्थिती निवडा" },
    // { value: familyType.trim(), message: "Please select Family Type / कृपया कुटुंबाचा प्रकार निवडा" },
    { value: preferredAgeRange.trim(), message: "Please enter Preferred Age Range / कृपया वय श्रेणी भरा" },
    { value: preferredReligionCaste.trim(), message: "Please enter Preferred Religion & Caste / कृपया पसंतीचा धर्म आणि जात भरा" },
    { value: preferredLocation.trim(), message: "Please enter Preferred Location / कृपया पसंतीचे ठिकाण भरा" }
  ];

  
  
  // Validate required fields
  for (let field of requiredFields) {
    if (!field.value) {
      toast.error(field.message);
      return false;
    }
  }

  // ✅ Verifications
  if (!phoneVerified) return toast.error("Please verify your Mobile Number / कृपया मोबाईल नंबर सत्यापित करा");
  if (!emailVerified) return toast.error("Please verify your Email / कृपया ईमेल सत्यापित करा");
  
  if (!dob) return toast.error("Please enter Date of Birth / कृपया जन्मतारीख भरा");

  // DOB validation
  const today = new Date();
  const birthDate = new Date(dob);
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (
    age < 18 ||
    (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))
  ) {
    return toast.error("You must be at least 18 years old / आपली वय किमान १८ वर्षे असावी");
  }

  if (age > 60) {
    return toast.error("Age must be below 60 years / वय ६० वर्षांपेक्षा कमी असावे");
  }

  // Validate formats
  if (!pincodeRegex.test(pincode)) {
    toast.error("Please enter valid 6-digit Pincode / वैध 6 अंकी पिनकोड भरा");
    return false;
  }

  if (!mobileRegex.test(mobile)) {
    toast.error("Please enter valid 10-digit Mobile Number / वैध 10 अंकी मोबाईल नंबर भरा");
    return false;
  }

  if (altMobile && !mobileRegex.test(altMobile)) {
    toast.error("Please enter valid 10-digit Alternate Mobile Number / वैध पर्यायी मोबाईल नंबर भरा");
    return false;
  }

  if (!emailRegex.test(email)) {
    toast.error("Please enter valid Email / वैध ई-मेल पत्ता भरा");
    return false;
  }

  // If everything is valid
  return true;
};


  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return; // Stop submission if invalid
    }
  
    // Proceed with submission (API call, etc.)
    console.log("Form is valid, submitting...");
    console.log("formData: ", formData);
    
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
                        <h4>Edit my profile / माझा प्रोफाइल संपादित करा</h4>
                        {/* <h4>Section 1:</h4> */}
                        <h1>👤 Personal Information (वैयक्तिक माहिती) </h1>
                      </div>
                      <div className="form-group">
                        <label className="lb">First Name (प्रथम नाव):</label>
                        <input type="text" name="firstName" className="form-control" placeholder="Enter your First Name / आपले प्रथम नाव भरा" value={formData.firstName} onChange={handleChange} />
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
                      <input
                        type="date"
                        name="dob"
                        className="form-control"
                        value={formData.dob}
                        onChange={handleChange}
                        min={`${new Date(new Date().setFullYear(new Date().getFullYear() - 60)).toISOString().split('T')[0]}`}
                        max={`${new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}`}
                      />
                    </div>



<div className="form-group">
  <label className="lb">Height (उंची):</label>
  <div className="d-flex gap-2">
    <select
      name="heightFeet"
      className="form-control"
      value={formData.heightFeet}
      onChange={handleChange}
    >
      <option value="">Feet / फूट निवडा</option>
      {[...Array(8)].map((_, i) => (
        <option key={i + 3} value={i + 3}>{i + 3} ft</option>
      ))}
    </select>

    <select
      name="heightInches"
      className="form-control"
      value={formData.heightInches}
      onChange={handleChange}
    >
      <option value="">Inches / इंच निवडा</option>
      {[...Array(12)].map((_, i) => (
        <option key={i} value={i}>{i} in</option>
      ))}
    </select>
  </div>
</div>

<div className="form-group">
  <label className="lb">Weight (वजन):</label>
  <input
    type="number"
    name="weight"
    className="form-control"
    placeholder="Weight in kg / वजन किलोग्राम मध्ये भरा"
    value={formData.weight}
    onChange={handleChange}
    min="20"
    max="300"
    step="1"
  />
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

                      <br />
                      <div className="form-tit" >
                        {/* <h4>Section 2:</h4> */}
                        <h1>📍 Location Details (ठिकाणाची माहिती) </h1>
                      </div>
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

                      <br />
                      <div className="form-tit" >
                        {/* <h4>Section 2:</h4> */}
                        <h1>📞 Contact Information (संपर्क माहिती) </h1>
                      </div>

                      <div className="form-group">
                        <label className="lb">Mobile Number (मोबाईल नंबर):</label>
                        <input type="text" name="mobile" className="form-control" placeholder="Mobile number / मोबाईल नंबर" value={formData.mobile} onChange={handleChange} />
                       
                        
                        {!phoneVerified && formData.mobile.length === 10 && (
                        <>
                          <button
                          type="button" className="btn btn-primary mt-2"
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
                                className="form-control mt-2" 
                                value={phoneOtp}
                                onChange={(e) => setPhoneOtp(e.target.value)}
                              />
                              <button type="button" className="btn btn-success mt-2" onClick={verifyPhoneOtp}>Verify Phone</button>
                            </div>
                          )}
                        </>
                      )}
                      {phoneVerified && <p className="text-success">Phone number Verified ✅</p>}


                      </div>
                      
                      <div className="form-group">
                        <label className="lb">Alternate Mobile (पर्यायी मोबाईल नंबर): (Optional)</label>
                        <input type="text" name="altMobile" className="form-control" placeholder="Alternate mobile (optional) / पर्यायी मोबाईल नंबर" value={formData.altMobile} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label className="lb">Email (ई-मेल पत्ता):</label>
                        <input type="email" name="email" className="form-control" placeholder="Email / ई-मेल पत्ता" value={formData.email} onChange={handleChange} />



                        {!emailVerified && formData.email.includes('@') && (
                          <>
                            <button type="button" className="btn btn-primary mt-2"
                            onClick={sendEmailOtp}  disabled={emailOtpSent && emailCooldown > 0}>
                              {emailOtpSent && emailCooldown > 0 ? `Resend OTP in ${emailCooldown}s` : 'Send OTP'}
                            </button>
                            {emailOtpSent && (
                              <div>
                                <input  type="text" className="form-control mt-2"  placeholder="Enter Email OTP" value={emailOtp}  onChange={(e) => setEmailOtp(e.target.value)}
                                />
                                <button type="button" className="btn btn-success mt-2" onClick={verifyEmailOtp}>Verify Email</button>
                              </div>
                            )}
                          </>
                        )}
                        {emailVerified && <p className="text-success">Email Verified ✅</p>}

                       

                      

                      </div>

                      <br />
<div className="form-tit">
  <h1>🎓 Education & Profession (शिक्षण आणि व्यवसाय)</h1>
</div>

<div className="form-group">
  <label className="lb">Education Qualification (शैक्षणिक पात्रता):</label>
  <select name="education" className="form-control" value={formData.education} onChange={handleChange}>
    <option value="">Select Education / शिक्षण निवडा</option>
    <option value="Below 10th">Below 10th</option>
    <option value="10th Pass">10th Pass</option>
    <option value="12th Pass">12th Pass</option>
    <option value="ITI">ITI</option>
    <option value="Diploma">Diploma</option>
    <option value="UG">Undergraduate (UG)</option>
    <option value="Graduate">Graduate</option>
    <option value="Postgraduate">Postgraduate</option>
    <option value="PhD">PhD</option>
    <option value="Other">Other</option>
  </select>
</div>


<div className="form-group">
  <label className="lb">Occupation (व्यवसाय):</label>
  <select name="occupation" className="form-control" value={formData.occupation} onChange={handleChange}>
    <option value="">Select Occupation / व्यवसाय निवडा</option>
    <option value="Job">Job</option>
    <option value="Business">Business</option>
    <option value="Government Employee">Government Employee</option>
    <option value="Self Employed">Self Employed</option>
    <option value="Student">Student</option>
    <option value="Other">Other</option>
  </select>
</div>

<div className="form-group">
  <label className="lb">Annual Income (वार्षिक उत्पन्न):</label>
  <select name="annualIncome" className="form-control" value={formData.annualIncome} onChange={handleChange}>
    <option value="">Select Income Range / उत्पन्न श्रेणी निवडा</option>
    <option value="Below 2 Lakh">Below 2 Lakh</option>
    <option value="2 - 5 Lakh">2 - 5 Lakh</option>
    <option value="5 - 10 Lakh">5 - 10 Lakh</option>
    <option value="10 - 20 Lakh">10 - 20 Lakh</option>
    <option value="Above 20 Lakh">Above 20 Lakh</option>
  </select>
</div>

<br />
<div className="form-tit">
  <h1>🏠 Family Information (कौटुंबिक माहिती)</h1>
  <h4>(Optional but recommended) </h4>
</div>

<div className="form-group">
  <label className="lb">Father’s Name (वडिलांचे नाव):</label>
  <input type="text" name="fatherName" className="form-control" placeholder="Father’s Name / वडिलांचे नाव" value={formData.fatherName} onChange={handleChange} />
</div>

<div className="form-group">
  <label className="lb">Mother’s Name (आईचे नाव):</label>
  <input type="text" name="motherName" className="form-control" placeholder="Mother’s Name / आईचे नाव" value={formData.motherName} onChange={handleChange} />
</div>

<div className="form-group">
  <label className="lb">Family Status (कौटुंबिक स्थिती):</label>
  <input type="text" name="familyStatus" className="form-control" placeholder="Family Status / कौटुंबिक स्थिती" value={formData.familyStatus} onChange={handleChange} />
</div>

<div className="form-group">
  <label className="lb">Family Type (कुटुंब प्रकार):</label>
  <select name="familyType" className="form-control" value={formData.familyType} onChange={handleChange}>
    <option value="">Select Family Type / कुटुंब प्रकार निवडा</option>
    <option value="Nuclear">Nuclear Family</option>
    <option value="Joint Family">Joint Family</option>
  </select>
</div>

<br />
<div className="form-tit">
  <h1>💑 Partner Preferences (पार्टनर प्राधान्ये)</h1>
</div>

<div className="form-group">
  <label className="lb">Preferred Age Range (प्राधान्य वयोगट):</label>
  <select name="preferredAgeRange" className="form-control" value={formData.preferredAgeRange} onChange={handleChange}>
    <option value="">Select Age Range / वयोगट निवडा</option>
    <option value="18 to 30">18 to 30</option>
    <option value="31 to 40">31 to 40</option>
    <option value="41 to 50">41 to 50</option>
    <option value="51 to 60">51 to 60</option>
    {/* <option value="61 to 70">61 to 70</option>
    <option value="71 to 80">71 to 80</option>
    <option value="81 to 90">81 to 90</option>
    <option value="91 to 100">91 to 100</option> */}
  </select>
</div>

<div className="form-group">
  <label className="lb">Preferred Religion & Caste (प्राधान्य धर्म व जात):</label>
  <input type="text" name="preferredReligionCaste" className="form-control" placeholder="Preferred Religion & Caste / प्राधान्य धर्म व जात" value={formData.preferredReligionCaste} onChange={handleChange} />
</div>

<div className="form-group">
  <label className="lb">Preferred Location (प्राधान्य शहर/राज्य):</label>
  <input type="text" name="preferredLocation" className="form-control" placeholder="Preferred Location / प्राधान्य शहर/राज्य" value={formData.preferredLocation} onChange={handleChange} />
</div>

<div className="form-group">
  <label className="lb">Other Preferences (इतर प्राधान्ये):</label>
  <input type="text" name="otherPreferences" className="form-control" placeholder="Other Preferences / इतर प्राधान्ये" value={formData.otherPreferences} onChange={handleChange} />
</div>

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