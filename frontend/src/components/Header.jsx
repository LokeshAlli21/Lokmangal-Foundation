import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

function Header({photoUrl}) {

  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const authStatusFromStore = useSelector((state) => state.auth.status);
  const [userId, setUserid] = useState(null);

  const [authStatus, setAuthStatus] = useState(authStatusFromStore);
  
  useEffect(() => {
    if (userData != null) {
      setUserid(userData.id || null);
      setAuthStatus(true);
    } else {
      setAuthStatus(false);
    }
  }, [userData]);
  
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthStatus(token && true)
  },[])

  useEffect(() => {
      if (authStatus === null) {
          console.log('Auth status is still loading...');
          return;
      }
  
      console.log('Final auth status:', authStatus);
  }, [userData]);

  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const [isMobileFixed, setIsMobileFixed] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      const isMobile = window.innerWidth <= 900;
      setIsMobileFixed(isFixed && isMobile);
    };

    checkWidth(); // Initial check
    window.addEventListener("resize", checkWidth);

    return () => window.removeEventListener("resize", checkWidth);
  }, [isFixed]);

  const dynamicStyle = {
    position: isFixed ? (isMobileFixed ? "fixed" : "fixed") : "relative",
    top: isFixed ? 0 : "auto",
    zIndex: isFixed ? 200 : "auto",
    padding: '15px 0px',
    animation: isFixed ? "menuact 0.3s ease-in-out" : "none",
  };


  const handleLogOut = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      navigate('/log-out')
    }
  }



  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 767);
    };

    // Add event listener on mount
    window.addEventListener('resize', handleResize);

    // Call it initially
    handleResize();

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  

  return (
    <>
    {/* PRELOADER */}
  <div id="preloader">
    <div className="plod">
      <span className="lod1">
        <img src="../images/loder/1.png" alt="" loading="lazy" />
      </span>
      <span className="lod2">
        <img src="../images/loder/2.png" alt="" loading="lazy" />
      </span>
      <span className="lod3">
        <img src="../images/loder/3.png" alt="" loading="lazy" />
      </span>
    </div>
  </div>
  <div className="pop-bg" />
  {/* END PRELOADER */}
  {/* SEARCH */}
  <div className="pop-search">
    <span className="ser-clo">+</span>
    <div className="inn">
      <form>
        <input type="text" placeholder="Search here..." />
      </form>
      <div className="rel-sear">
        <h4>Top searches:</h4>
        <a href="all-profiles.html">Browse all profiles</a>
        <a href="all-profiles.html">Mens profile</a>
        <a href="all-profiles.html">Female profile</a>
        <a href="all-profiles.html">New profiles</a>
      </div>
    </div>
  </div>
  {/* END PRELOADER */}
  {/* HEADER & MENU */}
  <div className="head-top">
    <div className="container">
      <div className="row">
        <div className="lhs">
          {/* <ul>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li></li>
          </ul> */}
        </div>
        <div className="rhs">
          <ul style={{flexWrap: 'nowrap', display: 'flex'}}>
            <li style={{whiteSpace: 'nowrap'}}>
              <a href="tel:+919923404583">
                <i className="fa fa-phone" aria-hidden="true" />
                &nbsp;+91 9923404583
              </a>
            </li>
            <li style={{whiteSpace: 'nowrap'}}>
              <a href="lokmangalgroups@gmail.com">
                <i className="fa fa-envelope-o" aria-hidden="true" />
                &nbsp; lokmangalgroups@gmail.com
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/lokmangalfoundation/">
                <i className="fa fa-facebook" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/LokmangalFound">
                <i className="fa fa-twitter" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href="https://shadi.lokmangal.website/+919923404583">
                <i className="fa fa-whatsapp" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  {/* END HEADER & MENU */}
  {/* HEADER & MENU */}
  <div className="menu-pop menu-pop1" style={{zIndex: '250'}}>
    <span className="menu-pop-clo">
      <i className="fa fa-times" aria-hidden="true" />
    </span>
    <div className="inn">
      <img
        src="../images/logo-b.png"
        alt=""
        loading="lazy"
        className="logo-brand-only"
      />
      <p>
        <strong>Best Wedding Matrimony</strong> lacinia viverra lectus. Fusce
        imperdiet ullamcorper metus eu fringilla.Lorem Ipsum is simply dummy
        text of the printing and typesetting industry.
      </p>
      <ul className="menu-pop-info">
        <li>
          <a href="#!">
            <i className="fa fa-phone" aria-hidden="true" />
            +92 (8800) 68 - 8960
          </a>
        </li>
        <li>
          <a href="#!">
            <i className="fa fa-whatsapp" aria-hidden="true" />
            +92 (8800) 68 - 8960
          </a>
        </li>
        <li>
          <a href="#!">
            <i className="fa fa-envelope-o" aria-hidden="true" />
            help@company.com
          </a>
        </li>
        <li>
          <a href="#!">
            <i className="fa fa-map-marker" aria-hidden="true" />
            3812 Lena Lane City Jackson Mississippi
          </a>
        </li>
      </ul>
      <div className="menu-pop-help">
        <h4>Support Team</h4>
        <div className="user-pro">
          <img src="../images/profiles/1.jpg" alt="" loading="lazy" />
        </div>
        <div className="user-bio">
          <h5>Ashley emyy</h5>
          <span>Senior personal advisor</span>
          <a href="enquiry.html" className="btn btn-primary btn-sm">
            Ask your doubts
          </a>
        </div>
      </div>
      <div className="menu-pop-soci">
        <ul>
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
              <i className="fa fa-youtube-play" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a href="#!">
              <i className="fa fa-instagram" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  {/* END HEADER & MENU */}
  {/* HEADER & MENU */}

  {/* END HEADER & MENU */}
  {/* HEADER & MENU */}
  <div className="hom-top" style={dynamicStyle} >
    <div className="container">
      <div className="row">
        <div className="hom-nav" style={{display: 'flex', alignItems: 'center'}}>
          {/* LOGO */}
          <div className="logo"  style={{display: 'flex', alignItems: 'center'}}>
            {/* <span className="menu desk-menu">
              <i />
              <i />
              <i />
            </span> */}
            <a href="/" className="logo-brand">
              <img
                src="../images/logo-b.png"
                alt=""
                loading="lazy"
                className="ic-logo"
              />
            </a>
          </div>
          {/* TOP MENU */}
          <div className="bl" style={{padding: '0 40px', flex:'1'}}>
            <ul style={{float: 'right'}}>
              
              <li>
                <a href="/">Home</a>
              </li>
              {!authStatus &&
             <>
              <li>
              <a href="/signup">Register</a>
              </li>
              <li>
              <a href="/login">Login</a>
              </li></>
            }
            {authStatus &&
              <>
              
              
              
              <li className="smenu-pare">
                <span className="smenu">Dashboard</span>
                <div className="smenu-open smenu-single" style={{zIndex: "150"}}>
                  <ul>
                    <li>
                      <a href="/dashboard">Dashboard</a>
                    </li>
                    {userId && <li>
                      <a href={`/profile`}>My profile</a>
                    </li>}
                    <li>
                      <a href="/interests">Interests</a>
                    </li>
                    <li>
                      <a href="/chat-list">Chat lists</a>
                    </li>
                    <li>
                      <a href="/setting">Profile settings</a>
                    </li>
                    <li>
                      <a href="/edit-profile">Edit full profile</a>
                    </li>
                    
                    {authStatus? "" :
                    <li>
                      <a href="/login">Sign in</a>
                    </li>
                    }
                  </ul>
                </div>
              </li>

              <li style={{marginLeft: '25px'}}>
              <a  onClick={handleLogOut}>Logout</a>
              </li>
              
              </>
            }
              
              
            </ul>
          </div>
          {/* USER PROFILE */}
          <div style={{display: isLargeScreen ? 'flex' : 'none' , flexWrap:'nowrap', alignItems: 'center', columnGap: '15px' }}>
           <div style={{display: 'flex' , flexWrap:'nowrap', alignItems: 'center', columnGap: '5px' }}>

           <img
            style={{height: '50px', width: '50px', objectFit: 'cover',
               border: '1px solid rgb(118, 69, 8)',
               borderRadius: '50%'
              }}
             src="../images/subhash bapu deshmukh.png" alt="subhash bapu deshmukh" /> 
             <div style={{display: 'flex' , flexDirection: 'column', alignItems: 'start', columnGap: '0px', rowGap: '0px', height: '35px' }}>
              <h5 style={{fontSize: '12px',whiteSpace: 'nowrap'}}><b>श्री. सुभाष (बापू) <br /> देशमुख</b></h5>
              {/* <h6 style={{fontSize: '10px'}}><b>BJP: </b>आमदार (सोलपूर)</h6> */}
             </div>
           </div>
            <div style={{display: 'flex' , flexWrap:'nowrap', alignItems: 'center', columnGap: '5px' }}>
            <img
            style={{height: '50px', width: '50px', objectFit: 'cover',
               border: '1px solid rgb(118, 69, 8)',
               borderRadius: '50%'
              }}
             src="../images/rohan deshmukh.png" alt="subhash bapu deshmukh" />
             <div style={{display: 'flex' , flexDirection: 'column', alignItems: 'start', columnGap: '0px', rowGap: '0px' ,height: '35px'  }}>
              <h5 style={{fontSize: '12px',  whiteSpace: 'nowrap'}}><b>श्री. रोहन सुभाष <br />   देशमुख</b></h5>
              {/* <h6 style={{fontSize: '10px'}}><b>BJP: </b>कार्यकर्ता</h6> */}
             </div>
            </div>
          </div>
          {/* <div className="al">
            <div className="head-pro">
              <img src="images/profiles/1.jpg" alt="" loading="lazy" />
              <b>Advisor</b>
              <br />
              <h4>Ashley emyy</h4>
              <span className="fclick" />
            </div>
          </div> */}
          {/*MOBILE MENU*/}
          <div className="mob-menu">
            <div className="mob-me-ic">
              {/* <span className="mobile-exprt" data-mob="dashbord">
                <img src="images/icon/users.svg" alt="" />
              </span> */}
              <span className="mobile-menu" data-mob="mobile">
                <img src="../images/icon/menu.svg" alt="" />
              </span>
            </div>
          </div>
          {/*END MOBILE MENU*/}
        </div>
      </div>
    </div>
  </div>
  {/* END HEADER & MENU */}
  {/* MOBILE MENU POPUP */}
  <div className="mob-me-all mobile_menu" style={{zIndex: '200'}}>
    <div className="mob-me-clo">
      <img src="../images/icon/close.svg" alt="" />
    </div>
        <div style={{display: isLargeScreen ? 'none' : 'flex' , flexWrap:'nowrap', alignItems: 'center', columnGap: '15px' }}>
           <div style={{display: 'flex' , flexWrap:'nowrap', alignItems: 'center', columnGap: '5px' }}>

           <img
            style={{height: '50px', width: '50px', objectFit: 'cover',
               border: '1px solid rgb(118, 69, 8)',
               borderRadius: '50%'
              }}
             src="../images/subhash bapu deshmukh.png" alt="subhash bapu deshmukh" /> 
             <div style={{display: 'flex' , flexDirection: 'column', alignItems: 'start', columnGap: '0px', rowGap: '0px', height: '35px' }}>
              <h5 style={{fontSize: '12px',whiteSpace: 'nowrap'}}><b>श्री. सुभाष (बापू) <br /> देशमुख</b></h5>
              {/* <h6 style={{fontSize: '10px'}}><b>BJP: </b>आमदार (सोलपूर)</h6> */}
             </div>
           </div>
            <div style={{display: 'flex' , flexWrap:'nowrap', alignItems: 'center', columnGap: '5px' }}>
            <img
            style={{height: '50px', width: '50px', objectFit: 'cover',
               border: '1px solid rgb(118, 69, 8)',
               borderRadius: '50%'
              }}
             src="../images/rohan deshmukh.png" alt="subhash bapu deshmukh" />
             <div style={{display: 'flex' , flexDirection: 'column', alignItems: 'start', columnGap: '0px', rowGap: '0px' ,height: '35px'  }}>
              <h5 style={{fontSize: '12px',  whiteSpace: 'nowrap'}}><b>श्री. रोहन सुभाष <br />   देशमुख</b></h5>
              {/* <h6 style={{fontSize: '10px'}}><b>BJP: </b>कार्यकर्ता</h6> */}
             </div>
            </div>
          </div>
    <div className="mv-bus">
      {/* <h4>
        <i className="fa fa-globe" aria-hidden="true" /> EXPLORE CATEGORY
      </h4>
      <ul>
        <li>
          <a href="all-profiles.html">Browse profiles</a>
        </li>
        <li>
          <a href="wedding.html">Wedding page</a>
        </li>
        <li>
          <a href="services.html">All Services</a>
        </li>
        <li>
          <a href="plans.html">Join Now</a>
        </li>
      </ul> */}
      <h4>
        <i className="fa fa-align-center" aria-hidden="true" /> See more
      </h4>
      <ul>
        <li>
          <a href="/interests">See other profiles</a>
        </li>
        <li>
          <a href="/dashboard">Dashboard</a>
        </li>
        <li>
          <a href="/profile">Profile details</a>
        </li>

        {!authStatus && 
        <>
        <li>
        <a href="/signup">Sign Up</a>
      </li>
      <li>
      <a href="/login">Login</a>
    </li></>
        }
        
        
        
        <li>
          <a href="/contact">Contact</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
      </ul>
      {/* <div className="menu-pop-help">
        <h4>Support Team</h4>
        <div className="user-pro">
          <img src="images/profiles/1.jpg" alt="" loading="lazy" />
        </div>
        <div className="user-bio">
          <h5>Ashley emyy</h5>
          <span>Senior personal advisor</span>
          <a href="enquiry.html" className="btn btn-primary btn-sm">
            Ask your doubts
          </a>
        </div>
      </div>
      <div className="menu-pop-soci">
        <ul>
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
              <i className="fa fa-youtube-play" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a href="#!">
              <i className="fa fa-instagram" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
      <div className="late-news">
        <h4>Latest news</h4>
        <ul>
          <li>
            <div className="rel-pro-img">
              <img src="images/couples/1.jpg" alt="" loading="lazy" />
            </div>
            <div className="rel-pro-con">
              <h5>Long established fact that a reader distracted</h5>
              <span className="ic-date">12 Dec 2023</span>
            </div>
            <a href="blog-detail.html" className="fclick" />
          </li>
          <li>
            <div className="rel-pro-img">
              <img src="images/couples/3.jpg" alt="" loading="lazy" />
            </div>
            <div className="rel-pro-con">
              <h5>Long established fact that a reader distracted</h5>
              <span className="ic-date">12 Dec 2023</span>
            </div>
            <a href="blog-detail.html" className="fclick" />
          </li>
          <li>
            <div className="rel-pro-img">
              <img src="images/couples/4.jpg" alt="" loading="lazy" />
            </div>
            <div className="rel-pro-con">
              <h5>Long established fact that a reader distracted</h5>
              <span className="ic-date">12 Dec 2023</span>
            </div>
            <a href="blog-detail.html" className="fclick" />
          </li>
        </ul>
      </div>
      <div className="prof-rhs-help">
        <div className="inn">
          <h3>Tell us your Needs</h3>
          <p>Tell us what kind of service you are looking for.</p>
          <a href="enquiry.html">Register for free</a>
        </div>
      </div> */}
    </div>
  </div>
  {/* END MOBILE MENU POPUP */}
  {/* MOBILE USER PROFILE MENU POPUP */}
  <div className="mob-me-all dashbord_menu" style={{zIndex: '200'}}>
    <div className="mob-me-clo">
      <img src="images/icon/close.svg" alt="" />
    </div>
    <div className="mv-bus">
      <div className="head-pro">
        <img src="images/profiles/1.jpg" alt="" loading="lazy" />
        <b>user profile</b>
        <br />
        <h4>Ashley emyy</h4>
      </div>
      <ul>
        <li>
          <a href="/login">Login</a>
        </li>
        <li>
          <a href="/signup">Sign-up</a>
        </li>
        <li>
          <a href="plans.html">Pricing plans</a>
        </li>
        <li>
          <a href="all-profiles.html">Browse profiles</a>
        </li>
      </ul>
    </div>
  </div></>
  )
}

export default Header