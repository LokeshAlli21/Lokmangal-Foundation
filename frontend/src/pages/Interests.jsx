import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import databaseService from "../backend-services/database/database"
import { useSelector } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';

function Interests() {

  const { photoUrl } = useOutletContext();

  const navigate = useNavigate()

  const userData = useSelector(state => state.auth.userData);
  const [profiles, setProfiles] = useState([])



  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const religionCasteMap = {
    any: {
      label: "कोणताही (Any)"
    },
    Hindu: {
      label: "हिंदू (Hindu)",
      caste: [
        { value: "Brahmin", label: "ब्राह्मण (Brahmin)" },
        { value: "Chitpavan", label: "चित्पावन (Chitpavan)" },
        { value: "Deshastha", label: "देशस्थ (Deshastha)" },
        { value: "Karhade", label: "कर्‍हाडे (Karhade)" },
        { value: "Daivajna", label: "दैवज्ञ (Daivajna)" },
        { value: "Saraswat", label: "सारस्वत (Saraswat)" },
        { value: "Maratha", label: "मराठा (Maratha)" },
        { value: "KulwadiMaratha", label: "कुळवाडी मराठा (Kulwadi Maratha)" },
        { value: "96KuliMaratha", label: "96 कुळी मराठा (96 Kuli Maratha)" },
        { value: "Patil", label: "पाटील (Patil)" },
        { value: "DeshasthaMaratha", label: "देशस्थ मराठा (Deshastha Maratha)" },
        { value: "Kunbi", label: "कुणबी (Kunbi)" },
        { value: "TiloriKunbi", label: "तिलोरी कुणबी (Tilori Kunbi)" },
        { value: "MarathaKunbi", label: "मराठा कुणबी (Maratha Kunbi)" },
        { value: "DhangarKunbi", label: "धानगर कुणबी (Dhangar Kunbi)" },
        { value: "Mali", label: "माळी (Mali)" },
        { value: "KulwadiMali", label: "कुळवाडी माळी (Kulwadi Mali)" },
        { value: "HaldiMali", label: "हळदी माळी (Haldi Mali)" },
        { value: "Dhangar", label: "धनगर (Dhangar)" },
        { value: "SheliDhangar", label: "शेळीपालक धनगर (Sheli Dhangar)" },
        { value: "GaiDhangar", label: "गायपालक धनगर (Gai Dhangar)" },
        { value: "KurubaDhangar", label: "कुरोबा धनगर (Kuruba Dhangar)" },
        { value: "AgriKoli", label: "आगरी-कोळी (Agri-Koli)" },
        { value: "Agri", label: "आगरी (Agri)" },
        { value: "Koli", label: "कोळी (Koli)" },
        { value: "Bhandari", label: "भंडारी (Bhandari)" },
        { value: "KshetriyaBhandari", label: "क्षेत्रीय भंडारी (Kshetriya Bhandari)" },
        { value: "NadgaondaBhandari", label: "नाडगौंडा भंडारी (Nadgaonda Bhandari)" },
        { value: "Koshti", label: "कोष्टी (Koshti)" },
        { value: "DevangKoshti", label: "देवांग कोष्टी (Devang Koshti)" },
        { value: "HalwaiKoshti", label: "हलवाई कोष्टी (Halwai Koshti)" },

        { value: "Sonar", label: "सोनार (Sonar)" },
        { value: "Lohar", label: "लोहार (Lohar)" },
        { value: "Sutar", label: "सुतार (Sutar)" },
        { value: "Mahar", label: "महार (Mahar)" },
        { value: "Matang", label: "मातंग (Matang)" },
        { value: "Teli", label: "तेली (Teli)" },
        { value: "Lohari", label: "लोहारी (Lohari)" }
      ]
    },
    Muslim: {
      label: "मुस्लिम (Muslim)",
      caste: [
        { value: "Sunni", label: "सुन्नी (Sunni)" },
        { value: "Qureshi", label: "कुरेशी (Qureshi)" },
        { value: "Sayyad", label: "सय्यद (Sayyad)" },
        { value: "Pathan", label: "पठाण (Pathan)" },
        { value: "Shaikh", label: "शेख (Shaikh)" },
        { value: "Shia", label: "शिया (Shia)" },
        { value: "IthnaAshari", label: "इथना अशरी (Ithna Ashari)" },
        { value: "Bohra", label: "बोहरा (Bohra)" },
        { value: "KonkaniMuslim", label: "कोकणी मुसलमान (Konkani Muslim)" },

        { value: "Malla", label: "मल्ला (Malla)" },
        { value: "Mansuri", label: "मंसुरी (Mansuri)" },
        { value: "Ansari", label: "अंसारी (Ansari)" },
        { value: "Chikligar", label: "चिकलीगर (Chikligar)" }
      ]
    },
    Buddhist: {
      label: "बौद्ध (Buddhist)",
      caste: [
        { value: "Mahayana", label: "महायान (Mahayana)" },
        { value: "Theravada", label: "थेरवाद (Theravada)" },
        { value: "NavBuddha", label: "नवबौद्ध (NavBuddha)" }
      ]
    },
    Jain: {
      label: "जैन (Jain)",
      caste: [
        { value: "DigambarJain", label: "दिगंबर जैन (Digambar Jain)" },
        { value: "Koshti", label: "कोष्टी (Koshti)" },
        { value: "Porwal", label: "पोरवाल (Porwal)" },
        { value: "Khandelwal", label: "खंडेलवाल (Khandelwal)" },
        { value: "ShwetambarJain", label: "श्वेतांबर जैन (Shwetambar Jain)" },
        { value: "Oswal", label: "ओसवाल (Oswal)" },
        { value: "Mutha", label: "मुथा (Mutha)" },
        { value: "Lodha", label: "लोढा (Lodha)" }
      ]
    },
    Christian: {
      label: "ख्रिश्चन (Christian)",
      caste: [
        { value: "RomanCatholic", label: "रोमन कॅथोलिक (Roman Catholic)" },
        { value: "GoanChristian", label: "गोवन ख्रिश्चन (Goan Christian)" },
        { value: "EastIndianChristian", label: "ईस्ट इंडियन ख्रिश्चन (East Indian Christian)" },
        { value: "Protestant", label: "प्रोटेस्टंट (Protestant)" },
        { value: "MarathaChristian", label: "मराठा ख्रिश्चन (Maratha Christian)" },
        { value: "AdivasiChristian", label: "आदिवासी ख्रिश्चन (Adivasi Christian)" }
      ]
    },
    Sikh: {
      label: "शीख (Sikh)",
      caste: [
        { value: "JatSikh", label: "जाट शीख (Jat Sikh)" },
        { value: "MazhabiSikh", label: "मजहबी शीख (Mazhabi Sikh)" },
        { value: "KhatriSikh", label: "खत्री शीख (Khatri Sikh)" },
        { value: "AroraSikh", label: "अरोरा शीख (Arora Sikh)" }
      ]
    },
    Parsi: {
      label: "पारशी (Parsi/Zoroastrian)",
      caste: [
        { value: "IraniParsi", label: "इराणी पारशी (Irani Parsi)" },
        { value: "BaghdadiParsi", label: "बगदादी पारशी (Baghdadi Parsi)" }
      ]
    },
    Jewish: {
      label: "ज्यू (Jewish)",
      caste: [
        { value: "BeneIsraeli", label: "बेने इस्रायली (Bene Israeli)" },
        { value: "BaghdadiJew", label: "बगदादी ज्यू (Baghdadi Jew)" }
      ]
    },
    Other: {
      label: "इतर (Other - Tribal/Indigenous)",
      caste: [
        { value: "Gond", label: "गोंड (Gond)" },
        { value: "Warli", label: "वारली (Warli)" },
        { value: "Korku", label: "कोरकू (Korku)" },
        { value: "Bhil", label: "भील (Bhil)" }
      ]
    }
  };



    const [formData, setFormData] = useState({
      lookingFor: "",
      age: "",
      religion: "",
      caste: "",
      city: "",
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const casteOptions = formData.religion
    ? religionCasteMap[formData.religion]?.caste || []
    : [];

        const [isOpen, setIsOpen] = useState(false); // State to control dropdown visibility
      
        // Toggle dropdown visibility
        const toggleDropdown = () => {
          setIsOpen((prevState) => !prevState);
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
              toast("No profile matches your filter.", { type: 'info' });
            } else {
              setProfiles(p);
            }
          })
          .catch(error => {
            console.error('Error fetching profiles:', error);
            toast("Error fetching profiles. Please try again.", { type: 'error' });
          });
          console.log("see profiles from profiles state; ", profiles);
  
      
  
  
    };

    const handleFilterToggle = () => {
      setIsFilterOpen(p => !p)
    }







  const handleLikes = (likedProfileId) => {
    if (!likedProfileId) {
      toast.info("❌ No profile ID provided");
      return;
    }
  
    databaseService.addToWishlist(userData.id, likedProfileId)
      .then(() => {
        toast.success("✅ Profile added to your wishlist!");
      })
      .catch((error) => {
        toast.error(`❌ Failed to add to wishlist: ${error.message}`);
      });
  };
  



const handleChat = (id) => {
  navigate(`/chat/${id}`)
}

  
  

  useEffect(() => {
    if (!userData?.id) return
    databaseService.getAllProfilesWithAuth(userData.id)
    .then(p => {
      if (!p || p.length === 0) {
        // Show toast when there are no profiles
        toast("No profils.", { type: 'info' });
      } else {
        setProfiles(p);
        console.log('profiles from interests page: ', p);
      }
    })
    .catch(error => {
      // Handle any errors that occur during the fetch
      console.error('Error fetching profiles:', error);
      toast("Error fetching profiles. Please try again.", { type: 'error' });
    });
  },[userData])
  
  return (
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
                  <a href="/interests" className="act">
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
              <h2 className="db-tit">Interest request</h2>
              <div className="db-pro-stat">
                <div className="db-inte-main">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-bs-toggle="tab"
                      >
                        find more profiles
                      </a>
                    </li>
                    <li className="nav-item" onClick={() => handleFilterToggle()}>
                      <a
                        className="nav-link"
                      >
                        Find poeple by filter
                      </a>
                    </li>
                  </ul>
                  {isFilterOpen && <div >
<form onSubmit={handleSubmit} style={{ padding: '0px', margin: '0 auto' , width: '100%'}}>
  <ul style={{ listStyle: 'none', paddingBottom: '10px',paddingTop: '20px', margin: '0', display: 'flex', alignContent: 'center', alignItems: "center", columnGap: '20px', width: '100%', overflow: 'scroll visible', flexWrap: 'nowrap' }}>
    {/* Looking For */}
    <li style={{ marginBottom: '15px' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <select
          name="lookingFor"
          value={formData.lookingFor}
          onChange={handleChange}
          style={{ padding: '8px', fontSize: '14px' , width: '200px', outline: 'none', backgroundColor: 'rgb(219 233 239)', borderRadius: "10px"}}
        >
          <option value="">I'm looking for</option>
          <option value="Male">वर शोधत आहे (Looking for Groom)</option>
          <option value="Female">वधू शोधत आहे (Looking for Bride)</option>
        </select>
      </div>
    </li>

    {/* Age */}
    <li style={{ marginBottom: '15px' , marginTop: '0px', display: 'flex', alignItems: 'center'}}>
      <div style={{ display: 'flex', flexDirection: 'column' , alignItems: 'center'}}>
        <select
          name="age"
          value={formData.age}
          onChange={handleChange}
          style={{ padding: '8px', fontSize: '14px', width: '200px', outline: 'none', backgroundColor: 'rgb(219 233 239)', borderRadius: "10px"}}
        >
          <option value="">वय (Age)</option>
          <option value="18 to 22">18 to 22</option>
          <option value="22 to 25">22 to 25</option>
          <option value="25 to 30">25 to 30</option>
          <option value="30 to 35">30 to 35</option>
          <option value="35 to 40">35 to 40</option>
          <option value="40 to 45">40 to 45</option>
          <option value="45 to 50">45 to 50</option>
          <option value="50 to 55">50 to 55</option>
        </select>
      </div>
    </li>

    {/* Religion */}
    <li style={{ marginBottom: '15px' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <select
          name="religion"
          value={formData.religion}
          onChange={handleChange}
          style={{ padding: '8px', fontSize: '14px' , width: '200px', outline: 'none', backgroundColor: 'rgb(219 233 239)', borderRadius: "10px"}}
        >
          <option value="">धर्म (Religion)</option>
          <option value="Any">कोणताही (Any)</option>
          <option value="Hindu">हिंदू (Hindu)</option>
          <option value="Muslim">मुस्लिम (Muslim)</option>
          <option value="Buddhist">बौद्ध (Buddhist)</option>
          <option value="Jain">जैन (Jain)</option>
          <option value="Christian">ख्रिश्चन (Christian)</option>
          <option value="Sikh">शीख (Sikh)</option>
          <option value="Parsi">पारशी (Parsi/Zoroastrian)</option>
          <option value="Jewish">ज्यू (Jewish)</option>
          <option value="Other">इतर (Other - Tribal/Indigenous)</option>
        </select>
      </div>
    </li>

    {/* Caste/Sub Caste - only show when religion is not Any */}
    {formData.religion !== "Any" && (
      <li style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <select
            name="caste"
            value={formData.caste}
            onChange={(e) => {
              handleChange(e);
              // handleCasteDropDownelect();
            }}
            style={{ padding: '8px', fontSize: '14px', width: '200px' , outline: 'none', backgroundColor: 'rgb(219 233 239)', borderRadius: "10px"}}
          >
            <option value="">Caste/Sub Caste</option>
            {casteOptions.map((caste) => (
              <option key={caste.value} value={caste.value}>
                {caste.label}
              </option>
            ))}
          </select>
        </div>
      </li>
    )}

    {/* City */}
    <li style={{ marginBottom: '15px' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          style={{ padding: '8px', fontSize: '14px', width: '200px' , outline: 'none', backgroundColor: 'rgb(219 233 239)', borderRadius: "10px"}}
        >
          <option value="">स्थान (Location)</option>
          <option value="Any">Any location</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Pune">Pune</option>
          <option value="Nagpur">Nagpur</option>
          <option value="Nashik">Nashik</option>
          <option value="Aurangabad">Aurangabad</option>
          <option value="Solapur">Solapur</option>
          <option value="Thane">Thane</option>
          <option value="Akola">Akola</option>
          <option value="Kolhapur">Kolhapur</option>
          <option value="Chandrapur">Chandrapur</option>
          <option value="Amravati">Amravati</option>
          <option value="Sangli">Sangli</option>
          <option value="Satara">Satara</option>
          <option value="Jalgaon">Jalgaon</option>
          <option value="Kalyan">Kalyan</option>
          <option value="Ulhasnagar">Ulhasnagar</option>
          <option value="Nanded">Nanded</option>
          <option value="Bhusawal">Bhusawal</option>
          <option value="Ratnagiri">Ratnagiri</option>
          <option value="Latur">Latur</option>
          <option value="Parbhani">Parbhani</option>
          <option value="Chinchwad">Chinchwad</option>
          <option value="Jalna">Jalna</option>
          <option value="Dombivli">Dombivli</option>
          <option value="Panvel">Panvel</option>
          <option value="Vasai-Virar">Vasai-Virar</option>
          <option value="Khopoli">Khopoli</option>
          <option value="Miraj">Miraj</option>
          <option value="Bhandara">Bhandara</option>
          <option value="Yavatmal">Yavatmal</option>
          <option value="Wardha">Wardha</option>
          <option value="Sindhudurg">Sindhudurg</option>
          <option value="Rajasthan">Rajasthan</option>
        </select>
      </div>
    </li>

    {/* Submit Button */}
    <li style={{ marginTop: '-12px', width: '200px', display: 'flex', alignItems: 'center' }}>
      <input
        type="submit"
        value="Search"
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          
        }}
      />
    </li>
  </ul>
</form>





























                  </div>}
                  
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
              <button
                type="button"
                className="btn btn-success btn-md"
                style={{ color:'white',padding:'5px 10px' }}
                onClick={() => handleLikes(profile.id)} 
              >
                <i className="fa fa-heart-o " aria-hidden="true"></i> Like
                
              </button>
              <button
                type="button"
                className="btn btn-primary btn-md"
                style={{ color: 'white', padding: '6px 12px', backgroundColor: '#007bff', border: 'none', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}
                onClick={() => handleChat(profile.id)}
                >
                <i className="fa fa-comments" aria-hidden="true"></i> Chat
                </button>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                style={{alignSelf: 'flex-end', bottom: '0px',}}
                onClick={() => setProfiles(prev => prev.filter(p => p.id !== profile.id))}
              >
                🚫 Not Interested
              </button>
            </div>
          </li>
        );
      })}

                        </ul>
                      </div>
                    </div>
                    {/* <div id="menu1" className="container tab-pane fade">
                      <br />
                      <div className="db-inte-prof-list">
                        <ul>
                          <li>
                            <div className="db-int-pro-1">
                              {" "}
                              <img src="images/profiles/men5.jpg" alt="" />{" "}
                            </div>
                            <div className="db-int-pro-2">
                              <h5>John Smith</h5>
                              <ol className="poi">
                                <li>
                                  City: <strong>Illunois</strong>
                                </li>
                                <li>
                                  Age: <strong>21</strong>
                                </li>
                                <li>
                                  Height: <strong>5.7</strong>
                                </li>
                                <li>
                                  Job: <strong>Working</strong>
                                </li>
                              </ol>
                              <ol className="poi poi-date">
                                <li>Request on: 10:30 AM, 18 August 2024</li>
                                <li>Accept on: 3:000 PM, 21 August 2024</li>
                              </ol>
                              <a
                                href="profile-details.html"
                                className="cta-5"
                                target="_blank"
                              >
                                View full profile
                              </a>
                            </div>
                            <div className="db-int-pro-3">
                              <button
                                type="button"
                                className="btn btn-outline-danger btn-sm"
                              >
                                Denay
                              </button>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div id="menu2" className="container tab-pane fade">
                      <br />
                      <div className="db-inte-prof-list">
                        <ul>
                          <li>
                            <div className="db-int-pro-1">
                              {" "}
                              <img src="images/profiles/men1.jpg" alt="" />{" "}
                            </div>
                            <div className="db-int-pro-2">
                              <h5>John Smith</h5>
                              <ol className="poi">
                                <li>
                                  City: <strong>Illunois</strong>
                                </li>
                                <li>
                                  Age: <strong>21</strong>
                                </li>
                                <li>
                                  Height: <strong>5.7</strong>
                                </li>
                                <li>
                                  Job: <strong>Working</strong>
                                </li>
                              </ol>
                              <ol className="poi poi-date">
                                <li>Request on: 10:30 AM, 18 August 2024</li>
                                <li>Denay on: 3:000 PM, 21 August 2024</li>
                              </ol>
                              <a
                                href="profile-details.html"
                                className="cta-5"
                                target="_blank"
                              >
                                View full profile
                              </a>
                            </div>
                            <div className="db-int-pro-3">
                              <button
                                type="button"
                                className="btn btn-success btn-sm"
                              >
                                Accept
                              </button>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div> */}
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

  )
}

export default Interests