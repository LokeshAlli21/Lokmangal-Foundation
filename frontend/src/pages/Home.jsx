import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import databaseService from "../backend-services/database/database"

function Home() {
  const [isWide, setIsWide] = useState(window.innerWidth > 1050);
  const [profiles, setProfiles] = useState();


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




  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    // Duplicate the content
    slider.innerHTML += slider.innerHTML;

    let scrollPos = 0;
    const scrollSpeed = 1; // pixels per frame

    const scroll = () => {
      if (!slider) return;

      scrollPos += scrollSpeed;
      slider.scrollLeft = scrollPos;

      if (scrollPos >= slider.scrollWidth / 2) {
        // Reset without visible jump
        scrollPos = 0;
        slider.scrollLeft = 0;
      }

      requestAnimationFrame(scroll);
    };

    requestAnimationFrame(scroll);
  }, []);

  const listStyle = {
    display: 'flex',
    // whiteSpace: 'nowrap',
    height:'450px',
    overflow: 'hidden',
  };

  const slideStyle = {
    minWidth: '350px',
    height: '400px',
    // marginRight: '10px',
    // background: '#ddd',
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // fontSize: '24px',
    // borderRadius: '8px',
    flexShrink: 0,
  };













  const listRef = useRef(null);

  useEffect(() => {
    const slider = listRef.current;
    if (!slider) return;

    // Duplicate the content
    slider.innerHTML += slider.innerHTML;

    let scrollPos = 0;
    const scrollSpeed = 1; // Adjust scroll speed here

    const scroll = () => {
      if (!slider) return;

      scrollPos += scrollSpeed;
      slider.scrollLeft = scrollPos;

      if (scrollPos >= slider.scrollWidth / 2) {
        scrollPos = 0;
        slider.scrollLeft = 0;
      }

      requestAnimationFrame(scroll);
    };

    requestAnimationFrame(scroll);
  }, []);

  const coupleListStyle = {
    display: 'flex',
    overflowX: 'hidden',
    overflowY: 'hidden',
    whiteSpace: 'nowrap',
  };

  const itemStyle = {
    minWidth: '300px', // adjust as needed
    height: '400px',
    marginRight: '10px',
    
    // background: '#f2f2f2',
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // fontSize: '18px',
    // borderRadius: '20px',
    flexShrink: 0,
  };


  const [isHovered, setIsHovered] = useState(false);

  const imageStyle = {
    maxWidth: '300px',
    height: '500px',
    objectFit: 'cover',
    transition: 'transform 300ms',
    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
  };

  

  const [searchTerm, setSearchTerm] = useState('');

  const casteOptions = formData.religion
    ? religionCasteMap[formData.religion]?.caste || []
    : [];

    const [isOpen, setIsOpen] = useState(false); // State to control dropdown visibility
  
    // Toggle dropdown visibility
    const toggleDropdown = () => {
      setIsOpen((prevState) => !prevState);
    };
  
    const handleOptionSelect = (casteValue) => {
      handleChange({ target: { name: 'caste', value: casteValue } });
      setIsOpen(false); // Close dropdown after selecting an option
    };





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
      <div className="hom-head" style={{marginTop: '0px'}}>
        <div className="container">
          <div className="row">
            <div className="hom-ban">
              <div className="ban-tit">
                <span>
                  लोकमंगल फाउंडेशन
                </span>
                <h1>
                तुमच्या मनासारखा जोडीदार येथे शोधा,</h1>
                  <h1><b>प्रेम आणि विश्वासाच्या नव्या प्रवासाला</b> सुरुवात करा!
                </h1>
                <p>"मिलनाचे नवसपूर्त स्थळ – हजारो मन जुळले आहेत इथे!</p>
              </div>
              <div
                className="ban-search chosenini"
                style={{ marginLeft: "0", marginRight: "0", width: "100%",zIndex: '100' }}
              >
                <form onSubmit={handleSubmit} >


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





{formData.religion !== "Any" && (
        <li className="">
          <div className="form-group">
            <label>Caste/Sub Caste</label>

            {/* Hidden native select */}
            {/* <select
              className="chosen-select"
              name="caste"
              value={formData.caste}
              onChange={(e) => {
                handleChange(e); // Pass event to handleChange for form handling
                handleCasteDropDownelect(); // Custom function call
              }}
              style={{ display: "none" }}
            >
              <option value="">Caste/Sub Caste</option>
              {casteOptions.map((caste) => (
                <option key={caste.value} value={caste.value}>
                  {caste.label}
                </option>
              ))}
            </select> */}

            {/* Custom dropdown */}
            <div
              className="chosen-container chosen-container-single chosen-with-drop"
              style={{ width: 168 }}
            >
              <a
                className="chosen-single"
                onClick={toggleDropdown} // Toggle dropdown on click
              >
                <span>
                  {casteOptions.find((option) => option.value === formData.caste)?.label || "Caste/Sub Caste"}
                </span>
                <div><b /></div>
              </a>

              {/* Dropdown body */}
              {isOpen && (
                <div className="chosen-drop">
                  <div className="chosen-search">
                    <input
                      className="chosen-search-input"
                      type="text"
                      autoComplete="off"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)} // Handle search input change
                      placeholder="Search Caste..."
                    />
                  </div>

                  <ul className="chosen-results">
                    {casteOptions
                      .filter((caste) =>
                        caste.label.toLowerCase().includes(searchTerm.toLowerCase()) // Filter based on search term
                      )
                      .map((caste) => (
                        <li
                          key={caste.value}
                          className={`active-result ${formData.caste === caste.value ? 'result-selected highlighted' : ''}`}
                          onClick={() => handleOptionSelect(caste.value)} // Handle option selection
                        >
                          {caste.label}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </li>
      )}













{/* {formData.religion !== "Any" &&
  <li className="sr-cit">
  <div className="form-group">
    <label>Caste/Sub Caste</label>
    <select
      className="chosen-select"
      name="caste"
      value={formData.caste}
      style={{display: "none"}} 
      onChange={() => {
        handleChange()
        handleCasteDropDownelect()
      }}
    >
      <option value="" >Caste/Sub Caste</option>
      {casteOptions.map((caste) => (
        <option key={caste.value} value={caste.value}>
          {caste.label}
        </option>
      ))}
    </select>


    <div
      className="chosen-container chosen-container-single chosen-with-drop chosen-container-active"
      title=""
      style={{ width: 168, }}
    >
      <a className="chosen-single">
        <span>
          {casteOptions.find(option => option.value === formData.caste)?.label || "Caste/Sub Caste"}
        </span>
        <div>
          <b />
        </div>
      </a>
      <div className="chosen-drop">
        <div className="chosen-search">
          <input className="chosen-search-input" type="text" autoComplete="off" />
        </div>
        <ul className="chosen-results">
          {casteOptions.map((caste) => (
            <li
              key={caste.value}
              className={`active-result ${formData.caste === caste.value ? 'result-selected highlighted' : ''}`}
              onClick={() => handleChange({ target: { name: 'caste', value: caste.value } })}
            >
              {caste.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</li>
} */}

{/* Render Caste/Sub Caste only if the selected religion is not "Any" */}
{/* {formData.religion !== "Any" && (
  <li className="sr-cit">
    <div className="form-group">
      <label>Caste/Sub Caste</label>
      <select
        className="chosen-select"
        name="caste"
        value={formData.caste}
        onChange={handleChange}
      >
        <option value="">Caste/Sub Caste</option>
        {formData.religion && religionCasteMap[formData.religion]?.caste?.map((caste) => (
          <option key={caste.value} value={caste.value}>
            {caste.label}
          </option>
        ))}
      </select>


<div
  className="chosen-container chosen-container-single chosen-with-drop chosen-container-active"
  title=""
  style={{ width: 168 }}
>
  <a className="chosen-single">
    <span>Caste/Sub Caste</span>
    <div>
      <b />
    </div>
  </a>
  <div className="chosen-drop">
    <div className="chosen-search">
      <input className="chosen-search-input" type="text" autoComplete="off" />
    </div>
    <ul className="chosen-results">
      <li 
        className="active-result result-selected highlighted"
        data-option-array-index={0}
      >
        caste1
      </li>
      <li className="active-result" data-option-array-index={1}>
      caste2
      </li>

    </ul>
  </div>
</div>

    </div>
  </li>
)} */}


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
      <option value="Sindhudurg">Sindhudurg</option>
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
                  height: "400px",
                  transition: 'all 0.5s ease-in-out 0s',
                  overflow: 'hidden',
                  maxHeight: '100vh',
                }}data-wow-delay="0.1s">
                <div className="con" style={{"textAlign": "start", "position": 'absolute', bottom: '0'}}>
                  <h4>
                  {profile.first_name} {profile.last_name}
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
                  {/* <p className="text-gray-600 mb-1">🎓 {profile.education}</p> */}
                  <p className="text-gray-600 mb-1">💼 {profile.occupation}</p>
                  <p className="text-gray-600 mb-1">💰 Income: {profile.income}</p>
                  {/* <p className="text-gray-600 mb-1">🛐 Religion: {profile.religion}</p> */}
                  {/* <p className="text-gray-600 mb-1">🧩 Caste: {profile.caste}</p> */}
                  <p className="text-gray-600 mb-1">
                    🧍 Height: {profile.height_feet}ft {profile.height_inches}in
                  </p>
                  {/* <a href="">
                    see full profile
                  </a> */}
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
          <div className="slid-inn cus-revi flexslider" style={{ overflow: 'hidden', width: '100%' }}>
            <ul className="slides" ref={sliderRef} style={listStyle}>
              <li style={slideStyle}>
                <div className="cus-revi-box" style={{boxShadow: "7px 6px 0px 3px lightgray", padding: '35px', height: '100%'}} >
                  <div className="revi-im" style={{position: 'relative', top:'-20px'}}>
                    <img src="images/user/1.jpg" style={{clipPath: 'none', borderRadius: '50%', boxShadow: '#aeaeae 2px 8px 12px 0px'}} alt="" loading="lazy" />
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
              <li style={slideStyle}>
                <div className="cus-revi-box"  style={{boxShadow: "7px 6px 0px 3px lightgray", padding: '35px', height: '100%'}} >
                  <div className="revi-im"  style={{position: 'relative', top:'-20px'}}>
                    <img src="images/user/2.jpg" style={{clipPath: 'none', borderRadius: '50%', boxShadow: '#aeaeae 2px 8px 12px 0px'}} alt="" loading="lazy" />
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
              <li style={slideStyle}>
                <div className="cus-revi-box" style={{boxShadow: "7px 6px 0px 3px lightgray", padding: '35px', height: '100%'}} >
                  <div className="revi-im"  style={{position: 'relative', top:'-20px'}}>
                    <img src="images/user/3.jpg" style={{clipPath: 'none', borderRadius: '50%', boxShadow: '#aeaeae 2px 8px 12px 0px'}} alt="" loading="lazy" />
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
              <li style={slideStyle}>
                <div className="cus-revi-box" style={{boxShadow: "7px 6px 0px 3px lightgray", padding: '35px', height: '100%'}} >
                  <div className="revi-im"  style={{position: 'relative', top:'-20px'}}>
                    <img src="images/user/5.jpg" style={{clipPath: 'none', borderRadius: '50%', boxShadow: '#aeaeae 2px 8px 12px 0px'}} alt="" loading="lazy" />
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
              <li style={slideStyle}>
                <div className="cus-revi-box" style={{boxShadow: "7px 6px 0px 3px lightgray", padding: '35px', height: '100%'}} >
                  <div className="revi-im"  style={{position: 'relative', top:'-20px'}}>
                    <img src="images/user/5.jpg" style={{clipPath: 'none', borderRadius: '50%', boxShadow: '#aeaeae 2px 8px 12px 0px'}}  alt="" loading="lazy" />
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
          {/* <div className="cta-full-wid">
            <a href="#!" className="cta-dark">
              More customer reviews
            </a>
          </div> */}
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
                <h2 style={{fontSize:'50px'}}>स्वागत आहे! लोकमंगल</h2>
                <h2 style={{fontSize:'50px'}}>
                 फाउंडेशन मॅट्रिमोनीमध्ये<em>जिथे परंपरा आणि प्रेम जुळते!</em>
                </h2>
                <p>
                आतापर्यंत हजारो मन जुळवणारा महाराष्ट्राचं सर्वोत्तम विवाह मंच! येथे तुमच्या स्वप्नातील जोडीदार शोधा आणि नव्या आयुष्याच्या प्रवासाला सुरूवात करा!
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
                        Enquiry <em>+91 9923404583</em>
                      </h4>
                    </div>
                  </li>
                  <li>
                    <div>
                      <i className="fa fa-envelope-o" aria-hidden="true" />
                      <h4>
                        Get Support <em>lokmangalgroups@gmail.com</em>
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
      <div className="hom-coup-test" style={{ overflow: 'hidden', width: '100%' }}>
        <ul className="couple-sli" ref={listRef} style={coupleListStyle}>
          <li style={itemStyle} className='overflow-hidden rounded-md'>
              <img src="images/couples/6.jpg" alt="" loading="lazy" style={imageStyle} />
          </li>
          <li style={itemStyle} className='overflow-hidden rounded-md'>
              <img src="images/couples/7.jpg" alt="" loading="lazy"  style={imageStyle}  className='w-full h-full object-cover transition-transform duration-300 hover:scale-110' />
          </li>
          <li style={itemStyle} className='overflow-hidden rounded-md'>
              <img src="images/couples/8.jpg" alt="" loading="lazy"  style={imageStyle}  className='w-full h-full object-cover transition-transform duration-300 hover:scale-110' />
          </li>
          <li style={itemStyle} className='overflow-hidden rounded-md'>
              <img src="images/couples/9.jpg" alt="" loading="lazy"  style={imageStyle}  className='w-full h-full object-cover transition-transform duration-300 hover:scale-110' />
          </li>
          <li style={itemStyle} className='overflow-hidden rounded-md'>
              <img src="images/couples/10.jpg" alt="" loading="lazy"  style={imageStyle}  className='w-full h-full object-cover transition-transform duration-300 hover:scale-110' />
          </li>
          <li style={itemStyle} className='overflow-hidden rounded-md'>
              <img src="images/couples/3.jpg" alt="" loading="lazy"  style={imageStyle}  className='w-full h-full object-cover transition-transform duration-300 hover:scale-110' />
          </li>
          <li style={itemStyle} className='overflow-hidden rounded-md'>
              <img src="images/couples/4.jpg" alt="" loading="lazy"  style={imageStyle}  className='w-full h-full object-cover transition-transform duration-300 hover:scale-110' />
          </li>
          <li style={itemStyle} className='overflow-hidden rounded-md'>
              <img src="images/couples/5.jpg" alt="" loading="lazy"  style={imageStyle}  className='w-full h-full object-cover transition-transform duration-300 hover:scale-110' />
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
              <a href="/signup" className="cta-3">
                Register Now
              </a>
              <a href="/signup" className="cta-4">
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

const styles = {
  form: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  ul: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
  li: {
    flex: '1 1 250px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontWeight: '600',
    marginBottom: '4px',
    color: '#333',
    fontSize: '14px',
  },
  selectWrapper: {
    position: 'relative',
  },
  select: {
    width: '100%',
    padding: '10px 40px 10px 12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    appearance: 'none',
    backgroundColor: '#fff',
    fontSize: '14px',
    color: '#333',
    cursor: 'pointer',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  },
  arrow: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    color: '#666',
    fontSize: '12px',
  },
  button: {
    marginTop: '20px',
    width: '100%',
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};