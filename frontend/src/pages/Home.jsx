import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import databaseService from "../backend-services/database/database"

function Home() {
  const [isWide, setIsWide] = useState(window.innerWidth > 1050);
  const [profiles, setProfiles] = useState();

  const [formData, setFormData] = useState({
    lookingFor: "",
    age: "",
    religion: "",
    caste: "",
    city: "",
  });

  useEffect(() => {
    const handleResize = () => {
      setIsWide(window.innerWidth > 1050);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const style = {
    width: "100%",
    display: 'flex',
    flexWrap: isWide ? 'nowrap' : 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const $ = window.$;
  
    const lookingFor = $("select[name='lookingFor']").val();
    const age = $("select[name='age']").val();
    const religion = $("select[name='religion']").val();
    const caste = $("select[name='caste']").val();
    const city = $("select[name='city']").val();
  
    setFormData({
      lookingFor,
      age,
      religion,
      caste,
      city
    })
  
    console.log("formData: \n as category:",formData);

    databaseService.getAllProfiles(formData)
    .then(p => {
      if (!p || p.length === 0) {
        // Show toast when there are no profiles
        toast("No profile matches your filter.", { type: 'info' });
      } else {
        setProfiles(p);
        console.log('profiles: ', p);
      }
    })
    .catch(error => {
      // Handle any errors that occur during the fetch
      console.error('Error fetching profiles:', error);
      toast("Error fetching profiles. Please try again.", { type: 'error' });
    });

    console.log("see profiles from profiles state; ", profiles);
    


  };


  // const callTestWithAuth = async () => {
  //   try {
  //     console.log('📤 Sending request to /api/test-with-auth');
  
  //     const token = localStorage.getItem('authToken');
  
  //     if (!token) {
  //       console.error('No token found in localStorage');
  //       toast.error('Authentication token not found. Please login again.');
  //       return; // ✅ Important: Stop function execution
  //     }
  
  //     const response = await fetch('http://localhost:5000/api/test-with-auth', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       },
  //       body: JSON.stringify({})
  //     });
  
  //     const data = await response.json();
  
  //     console.log('📥 Response received:', response);
  
  //     if (!response.ok) {
  //       console.error('Server responded with error:', data.message);
  //       toast.error(data.message || 'Server error occurred');
  //       return; // ✅ Stop here
  //     }
  
  //     console.log('✅ Data from backend:', data);
  //     toast.success(data.message || 'Request successful!');
  
  //   } catch (error) {
  //     console.error('❌ Network/Error:', error);
  //     toast.error(`Network Error: ${error.message}`);
  //   }
  // };
  


  useEffect(() => {
    const $ = window.$;
    $(".chosen-select").chosen();
  
    // Attach change event
    $(".chosen-select").on("change", function (e) {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    });

    // callTestWithAuth()
  
    // Cleanup to prevent memory leaks
    return () => {
      $(".chosen-select").off("change");
    };
    
  }, []);
  
  

  return (
    <>
  {/* END USER PROFILE MENU POPUP */}
  {/* BANNER & SEARCH */}
  <section>
    <div className="str">
      <div className="hom-head">
        <div className="container">
          <div className="row">
            <div className="hom-ban">
              <div className="ban-tit">
                <span>
                  लोकमंगल फाउंडेशन
                </span>
                <h1>
                तुमच्या मनासारखा जोडीदार येथे शोधा,
                  <br />
                  <b>प्रेम आणि विश्वासाच्या नव्या प्रवासाला</b> सुरुवात करा!
                </h1>
                <p>"मिलनाचे नवसपूर्त स्थळ – हजारो मन जुळले आहेत इथे!</p>
              </div>
              <div
                className="ban-search chosenini"
                style={{ marginLeft: "0", marginRight: "0", width: "100%" }}
              >
                <form onSubmit={handleSubmit}>
                  <ul style={style}>
                    <li className="sr-look">
                      <div className="form-group">
                        <label>I'm looking for</label>
                        <select
                          className="chosen-select"
                          name="lookingFor"
                          value={formData.lookingFor}
                          onChange={handleChange}
                        >
                          <option value="">I'm looking for</option>
                          <option value="Male">
                            वर शोधत आहे (Looking for Groom)
                          </option>
                          <option value="Female">
                            वधू शोधत आहे (Looking for Bride)
                          </option>
                        </select>
                      </div>
                    </li>

                    <li className="sr-age">
                      <div className="form-group">
                        <label>वय (Age)</label>
                        <select
                          className="chosen-select"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                        >
                          <option value="">वय (Age)</option>
                          <option value="18 to 30">18 to 30</option>
                          <option value="31 to 40">31 to 40</option>
                          <option value="41 to 50">41 to 50</option>
                          <option value="51 to 60">51 to 60</option>
                          <option value="61 to 70">61 to 70</option>
                          <option value="71 to 80">71 to 80</option>
                          <option value="81 to 90">81 to 90</option>
                          <option value="91 to 100">91 to 100</option>
                        </select>
                      </div>
                    </li>

                    <li className="sr-reli">
                      <div className="form-group">
                        <label>धर्म (Religion)</label>
                        <select
                          className="chosen-select"
                          name="religion"
                          value={formData.religion}
                          onChange={handleChange}
                        >
                          <option value="">धर्म (Religion)</option>
                          <option value="Any">Any</option>
                          <option value="Hinduism">Hindu</option>
                          <option value="Islam">Muslim</option>
                          <option value="Jain">Jain</option>
                          <option value="Christianity">Christian</option>
                        </select>
                      </div>
                    </li>

                    <li className="sr-reli">
                      <div className="form-group">
                        <label>Caste/Sub Caste</label>
                        <select
                          className="chosen-select"
                          name="caste"
                          value={formData.caste}
                          onChange={handleChange}
                        >
                          <option value="">Caste/Sub Caste</option>
                          <option value="Any">Any</option>
                          <option value="Hindu">Hindu</option>
                          <option value="Muslim">Muslim</option>
                          <option value="Jain">Jain</option>
                          <option value="Christian">Christian</option>
                        </select>
                      </div>
                    </li>

                    <li className="sr-cit">
                      <div className="form-group">
                        <label>City</label>
                        <select
                          className="chosen-select"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                        >
                          <option value="">स्थान (Location)</option>
                          <option value="Any location">Any location</option>
                          <option value="Chennai">Chennai</option>
                          <option value="New york">New york</option>
                          <option value="Perth">Perth</option>
                          <option value="London">London</option>
                        </select>
                      </div>
                    </li>

                    <li className="sr-btn">
                      <input type="submit" value="Search" />
                    </li>
                  </ul>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* END */}
  {/* BANNER SLIDER */}
  <section>
    <div className="hom-ban-sli">
      <div>
        <ul className="ban-sli">
          <li>
            <div className="image">
              <img src="images/ban-bg.jpg" alt="" loading="lazy" />
            </div>
          </li>
          <li>
            <div className="image">
              <img src="images/banner.jpg" alt="" loading="lazy" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>


  {/* END */}
  {/* QUICK ACCESS */}
  {profiles && <section>
    <div className="str home-acces-main">
      <div className="container">
        <div className="row">
          
          <div className="wedd-shap">
            <span className="abo-shap-1" />
            <span className="abo-shap-4" />
          </div>
          
          <div className="home-tit" style={{'paddingTop': "30px"}}>
            <p>Quick Access</p>
            <h2>
              <span>Find your matches</span>
            </h2>
            <span className="leaf1" />
            <span className="tit-ani-" />
          </div>

      
          <div className="home-acces">
            <ul className="hom-qui-acc-sli" style={{display: 'flex', flexWrap: 'wrap', rowGap: '50px'}}>

            {/* <li>
                <div className="wow fadeInUp hacc hacc1" data-wow-delay="0.1s">
                  <div className="con">
                    <img src="images/icon/user.png" alt="" loading="lazy" />
                    <h4>Browse Profiles</h4>
                    <p>1200+ Profiles</p>
                    <a href="all-profiles.html">View more</a>
                  </div>
                </div>
              </li> */}

            {profiles && profiles.map((profile) => (
              <li
                key={profile.id}
              >
                <div className="wow fadeInUp hacc hacc1" 
                style={{
                  backgroundImage:`url(${profile.photo_url})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100%',
                  float: 'left',
                  width: '100%',
                  position: 'relative',
                  borderRadius: '8px',
                  height: "500px",
                  transition: 'all 0.5s ease-in-out 0s',
                  overflow: 'hidden',
                  maxHeight: '100vh',
                }}data-wow-delay="0.1s">
                <div className="con" style={{"textAlign": "start", "position": 'absolute', bottom: '0'}}>
                  <h4>
                  {profile.middle_name} {profile.last_name}
                  </h4>
                  <p className="text-gray-600 mb-1">
                    {profile.gender},{" "}
                    {
                      Math.floor(
                        (new Date() - new Date(profile.dob)) / (365.25 * 24 * 60 * 60 * 1000)
                      )
                    }{" "}
                    years
                  </p>
                  <p className="text-gray-600 mb-1">📍 {profile.city}, {profile.state}</p>
                  <p className="text-gray-600 mb-1">🎓 {profile.education}</p>
                  <p className="text-gray-600 mb-1">💼 {profile.occupation}</p>
                  <p className="text-gray-600 mb-1">💰 Income: {profile.income}</p>
                  <p className="text-gray-600 mb-1">🛐 Religion: {profile.religion}</p>
                  <p className="text-gray-600 mb-1">🧩 Caste: {profile.caste}</p>
                  <p className="text-gray-600 mb-1">
                    🧍 Height: {profile.height_feet}ft {profile.height_inches}in
                  </p>
                </div>
                </div>
              </li>
            ))}


              
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section> }
  {/* END */}
  {/* TRUST BRANDS */}
  <section>
    <div className="hom-cus-revi" style={{ backgroundColor: '#fefcf4'}}>
      <div className="container">
        <div className="row">
          <div className="home-tit">
            <p>Trusted By</p>
            <h2>
              <span> 
              <b className="num">१५००+</b>प्रेमकथा, एका क्लिकवर सुरू झालेल्या!
              </span>
            </h2>
            <span className="leaf1" />
            <span className="tit-ani-" />
          </div>
          <div className="slid-inn cus-revi">
            <ul className="slider3">
              <li>
                <div className="cus-revi-box">
                  <div className="revi-im">
                    <img src="images/user/1.jpg" alt="" loading="lazy" />
                    <i className="cir-com cir-1" />
                    <i className="cir-com cir-2" />
                    <i className="cir-com cir-3" />
                  </div>
                  <p>
साईटवरील उत्कृष्ट मॅचमेकिंग सुविधांमुळे आम्हाला आमचा परिपूर्ण जोडीदार मिळाला. संपूर्ण प्रक्रियेत पारदर्शकता आणि सोपी संवाद प्रणाली होती.
                  </p>
                  <h5>Akshay & Snehal Deshmukh</h5>
                  <span>सोलापूर (Solapur)</span>
                </div>
              </li>
              <li>
                <div className="cus-revi-box">
                  <div className="revi-im">
                    <img src="images/user/2.jpg" alt="" loading="lazy" />
                    <i className="cir-com cir-1" />
                    <i className="cir-com cir-2" />
                    <i className="cir-com cir-3" />
                  </div>
                  <p>
                  Our family recommended this website, and now we are happily married! It’s a reliable and safe option, perfect for the entire family.
                  </p>
                  <h5>Prathamesh & Pooja Patil</h5>
                  <span>नाशिक (Nashik)</span>
                </div>
              </li>
              <li>
                <div className="cus-revi-box">
                  <div className="revi-im">
                    <img src="images/user/3.jpg" alt="" loading="lazy" />
                    <i className="cir-com cir-1" />
                    <i className="cir-com cir-2" />
                    <i className="cir-com cir-3" />
                  </div>
                  <p>
                  आम्ही वेगवेगळ्या वेबसाइट्स ट्राय केल्या होत्या, पण ही सर्वोत्तम ठरली. प्रामाणिक प्रोफाइल्स आणि उत्कृष्ट जोड्या जुळवण्याची पद्धत!
                  </p>
                  <h5>Rohit & Swati Jadhav</h5>
                  <span>कोल्हापूर (Kolhapur)</span>
                </div>
              </li>
              <li>
                <div className="cus-revi-box">
                  <div className="revi-im">
                    <img src="images/user/5.jpg" alt="" loading="lazy" />
                    <i className="cir-com cir-1" />
                    <i className="cir-com cir-2" />
                    <i className="cir-com cir-3" />
                  </div>
                  <p>
                  Our wedding journey started here. The entire experience was wonderful, and the platform was extremely helpful.
                  </p>
                  <h5>Samarth & Aditi More</h5>
                  <span>पुणे (Pune)</span>
                </div>
              </li>
              <li>
                <div className="cus-revi-box">
                  <div className="revi-im">
                    <img src="images/user/5.jpg" alt="" loading="lazy" />
                    <i className="cir-com cir-1" />
                    <i className="cir-com cir-2" />
                    <i className="cir-com cir-3" />
                  </div>
                  <p>
                  आमच्या लग्नाचा प्रवास इथेच सुरू झाला. संपूर्ण अनुभव उत्कृष्ट होता आणि प्लॅटफॉर्म अत्यंत मदतीचा ठरला.
                  </p>
                  <h5>Tejas & Manasi Kulkarni</h5>
                  <span>औरंगाबाद (Aurangabad)</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="cta-full-wid">
            <a href="#!" className="cta-dark">
              More customer reviews
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* END */}
  {/* BANNER */}
  <section>
    <div className="str">
      <div className="ban-inn ban-home">
        <div className="container">
          <div className="row">
            <div className="hom-ban">
              <div className="ban-tit">
                <span>
                  <i className="no1">#1</i> Wedding Website
                </span>
                <h2>आम्हाला का निवडावे?</h2>
                <p>आईवडिलांच्या पसंतीस पात्र, तरुणाईच्या मनाजोगते!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* END */}
  {/* START */}
  <section>
    <div className="ab-sec2">
      <div className="container">
        <div className="row">
          <ul>
            <li>
              <div
                className="animate animate__animated animate__slower"
                data-ani="animate__flipInX"
                data-dely="0.1"
              >
                <img src="images/icon/prize.png" alt="" loading="lazy" />
                <h4>खरे प्रोफाइल्स</h4>
                <p>Contact genuine profiles with 100% verified mobile</p>
              </div>
            </li>
            <li>
              <div
                className="animate animate__animated animate__slower"
                data-ani="animate__flipInX"
                data-dely="0.3"
              >
                <img src="images/icon/trust.png" alt="" loading="lazy" />
                <h4> र्वात विश्वासार्ह</h4>
                <p>The most trusted wedding matrimony brand lorem</p>
              </div>
            </li>
            <li>
              <div
                className="animate animate__animated animate__slower"
                data-ani="animate__flipInX"
                data-dely="0.6"
              >
                <img src="images/icon/rings.png" alt="" loading="lazy" />
                <h4>१५००+ जोडप्यांचा विश्वास</h4>
                <p>1500+ stories that started with just one click!</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  {/* END */}
  {/* ABOUT START */}
  <section>
    <div className="ab-wel">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="ab-wel-lhs">
              <span className="ab-wel-3" />
              <img
                src="images/about/1.jpg"
                alt=""
                loading="lazy"
                className="ab-wel-1"
              />
              <img
                src="images/couples/20.jpg"
                alt=""
                loading="lazy"
                className="ab-wel-2"
              />
              <span className="ab-wel-4" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="ab-wel-rhs">
              <div className="ab-wel-tit">
                <h2>स्वागत आहे! लोकमंगल</h2>
                <h2>
                 फाउंडेशन मॅट्रिमोनीमध्ये<em>जिथे परंपरा आणि प्रेम जुळते!</em>
                </h2>
                <p>
                आतापर्यंत हजारो मन जुळवणारा महाराष्ट्राचं सर्वोत्तम विवाह मंच! येथे तुमच्या स्वप्नातील जोडीदार शोधा आणि नव्या आयुष्याच्या प्रवासाला सुरूवात करा!
                </p>
                <p>
                  {" "}
                  <a href="plans.html">Click here to</a> Start you matrimony
                  service now.
                </p>
              </div>
              <div className="ab-wel-tit-1">
                <p>
                Begin a new chapter of marriage with us. Every profile here is verified and trustworthy. Find a partner as per your preferences and create the perfect match!
                </p>
              </div>
              <div className="ab-wel-tit-2">
                <ul>
                  <li>
                    <div>
                      <i className="fa fa-phone" aria-hidden="true" />
                      <h4>
                        Enquiry <em>+01 2242 3366</em>
                      </h4>
                    </div>
                  </li>
                  <li>
                    <div>
                      <i className="fa fa-envelope-o" aria-hidden="true" />
                      <h4>
                        Get Support <em>info@example.com</em>
                      </h4>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* END */}
  {/* COUNTS START */}
  <section>
    <div className="ab-cont">
      <div className="container">
        <div className="row">
          <ul>
            <li>
              <div className="ab-cont-po">
                <i className="fa fa-heart-o" aria-hidden="true" />
                <div>
                  <h4>2K</h4>
                  <span>Couples pared</span>
                </div>
              </div>
            </li>
            <li>
              <div className="ab-cont-po">
                <i className="fa fa-users" aria-hidden="true" />
                <div>
                  <h4>4000+</h4>
                  <span>Registerents</span>
                </div>
              </div>
            </li>
            <li>
              <div className="ab-cont-po">
                <i className="fa fa-male" aria-hidden="true" />
                <div>
                  <h4>1600+</h4>
                  <span>Mens</span>
                </div>
              </div>
            </li>
            <li>
              <div className="ab-cont-po">
                <i className="fa fa-female" aria-hidden="true" />
                <div>
                  <h4>2000+</h4>
                  <span>Womens</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  {/* END */}
  {/* MOMENTS START */}
  <section>
    <div className="wedd-tline">
      <div className="container">
        <div className="row">
          <div className="home-tit">
            <p>Moments</p>
            <h2>
              <span>ही प्रक्रिया कशी कार्य करते?</span>
            </h2>
            <span className="leaf1" />
            <span className="tit-ani-" />
          </div>
          <div className="inn">
            <ul>
              <li>
                <div className="tline-inn">
                  <div
                    className="tline-im animate animate__animated animate__slower"
                    data-ani="animate__fadeInUp"
                  >
                    <img src="images/icon/rings.png" alt="" loading="lazy" />
                  </div>
                  <div
                    className="tline-con animate animate__animated animate__slow"
                    data-ani="animate__fadeInUp"
                  >
                    <h5>नोंदणी करा (Register)</h5>
                    <span>Timing: 7:00 PM</span>
                    <p>
                    तुमच्या स्वप्नातील जोडीदार शोधण्यासाठी पहिली पाहिरी  – मोफत नोंदणी!"
                    (First step to your dream partner – Register for free!)
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="tline-inn tline-inn-reve">
                  <div
                    className="tline-con animate animate__animated animate__slower"
                    data-ani="animate__fadeInUp"
                  >
                    <h5>तुमचा जोडीदार शोधा (Find Your Match)</h5>
                    <span>Timing: 7:00 PM</span>
                    <p>
                    तुमच्या आवडीनुसार प्रोफाइल्स ब्राउज करा आणि योग्य जोडीदार निवडा.
(Browse profiles based on your preferences and find the right match!)
                    </p>
                  </div>
                  <div
                    className="tline-im animate animate__animated animate__slow"
                    data-ani="animate__fadeInUp"
                  >
                    <img
                      src="images/icon/wedding-2.png"
                      alt=""
                      loading="lazy"
                    />
                  </div>
                </div>
              </li>
              <li>
                <div className="tline-inn">
                  <div
                    className="tline-im animate animate__animated animate__slower"
                    data-ani="animate__fadeInUp"
                  >
                    <img
                      src="images/icon/love-birds.png"
                      alt=""
                      loading="lazy"
                    />
                  </div>
                  <div
                    className="tline-con animate animate__animated animate__slow"
                    data-ani="animate__fadeInUp"
                  >
                    <h5>आवड दर्शवा (Send Interest)</h5>
                    <span>Timing: 7:00 PM</span>
                    <p>
                    तुमच्या आवडीनुसार जोडीदार निवडा आणि संवाद सुरू करा.
(Express interest in a suitable match and start a conversation!)
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="tline-inn tline-inn-reve">
                  <div
                    className="tline-con animate animate__animated animate__slower"
                    data-ani="animate__fadeInUp"
                  >
                    <h5>प्रोफाइल माहिती अद्यतनित करा (Get Profile Information)</h5>
                    <span>Timing: 7:00 PM</span>
                    <p>
                    तुमचे प्रोफाइल पूर्ण करा आणि जुळवणीसाठी अधिक संधी मिळवा.
                    (Complete your profile to increase your chances of getting the best matches!)
                    </p>
                  </div>
                  <div
                    className="tline-im animate animate__animated animate__slow"
                    data-ani="animate__fadeInUp"
                  >
                    <img src="images/icon/network.png" alt="" loading="lazy" />
                  </div>
                </div>
              </li>
              <li>
                <div className="tline-inn">
                  <div
                    className="tline-im animate animate__animated animate__slower"
                    data-ani="animate__fadeInUp"
                  >
                    <img src="images/icon/chat.png" alt="" loading="lazy" />
                  </div>
                  <div
                    className="tline-con animate animate__animated animate__slow"
                    data-ani="animate__fadeInUp"
                  >
                    <h5>संवाद वाढवा आणि भेटी घ्या (Start Meetups)</h5>
                    <span>Timing: 7:00 PM</span>
                    <p>
                    ऑनलाइन संवाद साधा, फोनवर बोला आणि प्रत्यक्ष भेटी घ्या.
                    (Connect online, talk over the phone, and plan personal meetings)
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="tline-inn tline-inn-reve">
                  <div
                    className="tline-con animate animate__animated animate__slower"
                    data-ani="animate__fadeInUp"
                  >
                    <h5>लग्नाची गाठ बांधा! (Getting Married)</h5>
                    <span>Timing: 7:00 PM</span>
                    <p>
                    एकमेकांना जाणून घ्या, कुटुंबांचा आशीर्वाद घ्या आणि नवीन प्रवास सुरू करा!
(Get to know each other, seek family blessings, and start your new journey!)
                    </p>
                  </div>
                  <div
                    className="tline-im animate animate__animated animate__slow"
                    data-ani="animate__fadeInUp"
                  >
                    <img
                      src="images/icon/wedding-couple.png"
                      alt=""
                      loading="lazy"
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* END */}
  {/* RECENT COUPLES */}
  <section>
    <div className="hom-couples-all">
      <div className="container">
        <div className="row">
          <div className="home-tit">
            <p>trusted brand</p>
            <h2>
              <span>Recent Couples</span>
            </h2>
            <span className="leaf1" />
            <span className="tit-ani-" />
          </div>
        </div>
      </div>
      <div className="hom-coup-test">
        <ul className="couple-sli">
          <li>
            <div className="hom-coup-box">
              <span className="leaf" />
              <img src="images/couples/6.jpg" alt="" loading="lazy" />
              <div className="bx">
                <h4>
                  Dany &amp; July <span>New York</span>
                </h4>
                <a href="wedding-video.html" className="sml-cta cta-dark">
                  View more
                </a>
              </div>
            </div>
          </li>
          <li>
            <div className="hom-coup-box">
              <span className="leaf" />
              <img src="images/couples/7.jpg" alt="" loading="lazy" />
              <div className="bx">
                <h4>
                  Dany &amp; July <span>New York</span>
                </h4>
                <a href="wedding-video.html" className="sml-cta cta-dark">
                  View more
                </a>
              </div>
            </div>
          </li>
          <li>
            <div className="hom-coup-box">
              <span className="leaf" />
              <img src="images/couples/8.jpg" alt="" loading="lazy" />
              <div className="bx">
                <h4>
                  Dany &amp; July <span>New York</span>
                </h4>
                <a href="wedding-video.html" className="sml-cta cta-dark">
                  View more
                </a>
              </div>
            </div>
          </li>
          <li>
            <div className="hom-coup-box">
              <span className="leaf" />
              <img src="images/couples/9.jpg" alt="" loading="lazy" />
              <div className="bx">
                <h4>
                  Dany &amp; July <span>New York</span>
                </h4>
                <a href="wedding-video.html" className="sml-cta cta-dark">
                  View more
                </a>
              </div>
            </div>
          </li>
          <li>
            <div className="hom-coup-box">
              <span className="leaf" />
              <img src="images/couples/10.jpg" alt="" loading="lazy" />
              <div className="bx">
                <h4>
                  Dany &amp; July <span>New York</span>
                </h4>
                <a href="wedding-video.html" className="sml-cta cta-dark">
                  View more
                </a>
              </div>
            </div>
          </li>
          <li>
            <div className="hom-coup-box">
              <span className="leaf" />
              <img src="images/couples/3.jpg" alt="" loading="lazy" />
              <div className="bx">
                <h4>
                  Dany &amp; July <span>New York</span>
                </h4>
                <a href="wedding-video.html" className="sml-cta cta-dark">
                  View more
                </a>
              </div>
            </div>
          </li>
          <li>
            <div className="hom-coup-box">
              <span className="leaf" />
              <img src="images/couples/4.jpg" alt="" loading="lazy" />
              <div className="bx">
                <h4>
                  Dany &amp; July <span>New York</span>
                </h4>
                <a href="wedding-video.html" className="sml-cta cta-dark">
                  View more
                </a>
              </div>
            </div>
          </li>
          <li>
            <div className="hom-coup-box">
              <span className="leaf" />
              <img src="images/couples/5.jpg" alt="" loading="lazy" />
              <div className="bx">
                <h4>
                  Dany &amp; July <span>New York</span>
                </h4>
                <a href="wedding.html" className="sml-cta cta-dark">
                  View more
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
  {/* END */}
  {/* TEAM START */}
  {/* <section>
    <div className="ab-team">
      <div className="container">
        <div className="row">
          <div className="home-tit">
            <p>OUR PROFESSIONALS</p>
            <h2>
              <span>Meet Our Team</span>
            </h2>
            <span className="leaf1" />
          </div>
          <ul>
            <li>
              <div>
                <img src="images/profiles/6.jpg" alt="" loading="lazy" />
                <h4>Ashley Jen</h4>
                <p>Marketing Manager</p>
                <ul className="social-light">
                  <li>
                    <a href="#!">
                      <i className="fa fa-facebook" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#!">
                      <i className="fa fa-twitter" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#!">
                      <i className="fa fa-whatsapp" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#!">
                      <i className="fa fa-linkedin" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#!">
                      <i className="fa fa-instagram" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div>
                <img src="images/profiles/7.jpg" alt="" loading="lazy" />
                <h4>Ashley Jen</h4>
                <p>Marketing Manager</p>
                <ul className="social-light">
                  <li>
                    <a href="#!">
                      <i className="fa fa-facebook" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#!">
                      <i className="fa fa-twitter" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#!">
                      <i className="fa fa-whatsapp" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#!">
                      <i className="fa fa-linkedin" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#!">
                      <i className="fa fa-instagram" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div>
                <img src="images/profiles/8.jpg" alt="" loading="lazy" />
                <h4>Emily Arrov</h4>
                <p>Creative Manager</p>
                <ul className="social-light">
                  <li>
                    <a href="#!">
                      <i className="fa fa-facebook" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#!">
                      <i className="fa fa-twitter" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#!">
                      <i className="fa fa-whatsapp" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#!">
                      <i className="fa fa-linkedin" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#!">
                      <i className="fa fa-instagram" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div>
                <img src="images/profiles/9.jpg" alt="" loading="lazy" />
                <h4>Julia sear</h4>
                <p>Client Coordinator</p>
                <ul className="social-light">
                  <li>
                    <a href="#!">
                      <i className="fa fa-facebook" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#!">
                      <i className="fa fa-twitter" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#!">
                      <i className="fa fa-whatsapp" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#!">
                      <i className="fa fa-linkedin" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a href="#!">
                      <i className="fa fa-instagram" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section> */}
  {/* END */}
  {/* GALLERY START */}
  <section>
    <div className="wedd-gall home-wedd-gall">
      <div className="">
        <div className="gall-inn">
          <div className="home-tit">
            <p>collections</p>
            <h2>
              <span>Photo gallery</span>
            </h2>
            <span className="leaf1" />
            <span className="tit-ani-" />
          </div>
          <div className="col-sm-6 col-md-2">
            <div
              className="gal-im animate animate__animated animate__slow"
              data-ani="animate__flipInX"
            >
              <img
                src="images/gallery/1.jpg"
                className="gal-siz-1"
                alt=""
                loading="lazy"
              />
              <div className="txt">
                <span>Wedding</span>
                <h4>Bride &amp; Groom</h4>
              </div>
            </div>
            <div
              className="gal-im animate animate__animated animate__slower"
              data-ani="animate__flipInX"
            >
              <img
                src="images/gallery/9.jpg"
                className="gal-siz-2"
                alt=""
                loading="lazy"
              />
              <div className="txt">
                <span>Wedding</span>
                <h4>Bride &amp; Groom</h4>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div
              className="gal-im animate animate__animated animate__slower"
              data-ani="animate__flipInX"
            >
              <img
                src="images/gallery/3.jpg"
                className="gal-siz-2"
                alt=""
                loading="lazy"
              />
              <div className="txt">
                <span>Wedding</span>
                <h4>Bride &amp; Groom</h4>
              </div>
            </div>
            <div
              className="gal-im animate animate__animated animate__slower"
              data-ani="animate__flipInX"
            >
              <img
                src="images/gallery/4.jpg"
                className="gal-siz-1"
                alt=""
                loading="lazy"
              />
              <div className="txt">
                <span>Wedding</span>
                <h4>Bride &amp; Groom</h4>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-2">
            <div
              className="gal-im animate animate__animated animate__slower"
              data-ani="animate__flipInX"
            >
              <img
                src="images/gallery/5.jpg"
                className="gal-siz-1"
                alt=""
                loading="lazy"
              />
              <div className="txt">
                <span>Wedding</span>
                <h4>Bride &amp; Groom</h4>
              </div>
            </div>
            <div
              className="gal-im animate animate__animated animate__slower"
              data-ani="animate__flipInX"
            >
              <img
                src="images/gallery/6.jpg"
                className="gal-siz-2"
                alt=""
                loading="lazy"
              />
              <div className="txt">
                <span>Wedding</span>
                <h4>Bride &amp; Groom</h4>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div
              className="gal-im animate animate__animated animate__slower"
              data-ani="animate__flipInX"
            >
              <img
                src="images/gallery/7.jpg"
                className="gal-siz-2"
                alt=""
                loading="lazy"
              />
              <div className="txt">
                <span>Wedding</span>
                <h4>Bride &amp; Groom</h4>
              </div>
            </div>
            <div
              className="gal-im animate animate__animated animate__slower"
              data-ani="animate__flipInX"
            >
              <img
                src="images/gallery/8.jpg"
                className="gal-siz-1"
                alt=""
                loading="lazy"
              />
              <div className="txt">
                <span>Wedding</span>
                <h4>Bride &amp; Groom</h4>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div
              className="gal-im animate animate__animated animate__slower"
              data-ani="animate__flipInX"
            >
              <img
                src="images/couples/9.jpg"
                className="gal-siz-2"
                alt=""
                loading="lazy"
              />
              <div className="txt">
                <span>Wedding</span>
                <h4>Bride &amp; Groom</h4>
              </div>
            </div>
            <div
              className="gal-im animate animate__animated animate__slower"
              data-ani="animate__flipInX"
            >
              <img
                src="images/couples/11.jpg"
                className="gal-siz-1"
                alt=""
                loading="lazy"
              />
              <div className="txt">
                <span>Wedding</span>
                <h4>Bride &amp; Groom</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* END */}
  {/* BLOG POSTS START */}
  <section>
    <div className="hom-blog">
      <div className="container">
        <div className="row">
          <div className="home-tit">
            <p>Blog posts</p>
            <h2>
              <span>Blog &amp; Articles</span>
            </h2>
            <span className="leaf1" />
            <span className="tit-ani-" />
          </div>
          <div className="blog">
            <ul>
              <li>
                <div className="blog-box">
                  <img src="images/blog/1.jpg" alt="" loading="lazy" />
                  <span>Wedding - Johnny</span>
                  <h2>Wedding arrangements</h2>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content.
                  </p>
                  <a href="blog-details.html" className="cta-dark">
                    <span>Read more</span>
                  </a>
                </div>
              </li>
              <li>
                <div className="blog-box">
                  <img src="images/blog/2.jpg" alt="" loading="lazy" />
                  <span>Wedding - Johnny</span>
                  <h2>Wedding arrangements</h2>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content.
                  </p>
                  <a href="blog-details.html" className="cta-dark">
                    <span>Read more</span>
                  </a>
                </div>
              </li>
              <li>
                <div className="blog-box">
                  <img src="images/blog/3.jpg" alt="" loading="lazy" />
                  <span>Wedding - Johnny</span>
                  <h2>Invitation cards</h2>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content.
                  </p>
                  <a href="blog-details.html" className="cta-dark">
                    <span>Read more</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* END */}
  {/* FIND YOUR MATCH BANNER */}
  <section>
    <div className="str count">
      <div className="container">
        <div className="row">
          <div className="fot-ban-inn">
            <div className="lhs">
              <h2>Find your perfect Match now</h2>
              <p>
                lacinia viverra lectus. Fusce imperdiet ullamcorper metus eu
                fringilla.Lorem Ipsum is simply dummy text of the printing and
                typesetting industry.
              </p>
              <a href="sign-up.html" className="cta-3">
                Register Now
              </a>
              <a href="sign-up.html" className="cta-4">
                Help &amp; Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* END */}

  {/* END */}
  {/* Optional JavaScript */}
  {/* jQuery first, then Popper.js, then Bootstrap JS */}
    {/* <script type="module" src="js/jquery.min.js"></script>
    <script type="module" src="js/popper.min.js"></script>
    <script type="module" src="js/bootstrap.min.js"></script>
    <script type="module" src="js/select-opt.js"></script>
    <script type="module" src="js/slick.js"></script>
    <script type="module" src="../js/custom.js"></script> */}
    
    </>
  )
}

export default Home