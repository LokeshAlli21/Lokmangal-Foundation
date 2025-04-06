import React from 'react'

function Home() {
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
              <div className="ban-search chosenini">
                <form>
                  <ul>
                    <li className="sr-look">
                      <div className="form-group">
                        <label>I'm looking for</label>
                        <select className="chosen-select">
                          <option value="">I'm looking for</option>
                          <option value="Men">वर शोधत आहे (Looking for Groom)</option>
                          <option value="Women"> वधू शोधत आहे (Looking for Bride)</option>
                        </select>
                      </div>
                    </li>
                    <li className="sr-age">
                      <div className="form-group">
                        <label>वय (Age)</label>
                        <select className="chosen-select">
                          <option value="">वय (Age)</option>
                          <option value="">18 to 30</option>
                          <option value="">31 to 40</option>
                          <option value="">41 to 50</option>
                          <option value="">51 to 60</option>
                          <option value="">61 to 70</option>
                          <option value="">71 to 80</option>
                          <option value="">81 to 90</option>
                          <option value="">91 to 100</option>
                        </select>
                      </div>
                    </li>
                    <li className="sr-reli">
                      <div className="form-group">
                        <label>धर्म (Religion)</label>
                        <select className="chosen-select">
                          <option>धर्म (Religion)</option>
                          <option>Any</option>
                          <option>Hindu</option>
                          <option>Muslim</option>
                          <option>Jain</option>
                          <option>Christian</option>
                        </select>
                      </div>
                    </li>
                    <li className="sr-cit">
                      <div className="form-group">
                        <label>City</label>
                        <select className="chosen-select">
                          <option>स्थान (Location)</option>
                          <option>Any location</option>
                          <option>Chennai</option>
                          <option>New york</option>
                          <option>Perth</option>
                          <option>London</option>
                        </select>
                      </div>
                    </li>
                    <li className="sr-btn">
                      <input type="submit" defaultValue="Search" />
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
  {/* <section>
    <div className="str home-acces-main">
      <div className="container">
        <div className="row">
          
          <div className="wedd-shap">
            <span className="abo-shap-1" />
            <span className="abo-shap-4" />
          </div>
          
          <div className="home-tit">
            <p>Quick Access</p>
            <h2>
              <span>Our Services</span>
            </h2>
            <span className="leaf1" />
            <span className="tit-ani-" />
          </div>
          <div className="home-acces">
            <ul className="hom-qui-acc-sli">
              <li>
                <div className="wow fadeInUp hacc hacc1" data-wow-delay="0.1s">
                  <div className="con">
                    <img src="images/icon/user.png" alt="" loading="lazy" />
                    <h4>Browse Profiles</h4>
                    <p>1200+ Profiles</p>
                    <a href="all-profiles.html">View more</a>
                  </div>
                </div>
              </li>
              <li>
                <div className="wow fadeInUp hacc hacc2" data-wow-delay="0.2s">
                  <div className="con">
                    <img src="images/icon/gate.png" alt="" loading="lazy" />
                    <h4>Wedding</h4>
                    <p>1200+ Profiles</p>
                    <a href="wedding-video.html">View more</a>
                  </div>
                </div>
              </li>
              <li>
                <div className="wow fadeInUp hacc hacc3" data-wow-delay="0.3s">
                  <div className="con">
                    <img src="images/icon/couple.png" alt="" loading="lazy" />
                    <h4>All Services</h4>
                    <p>1200+ Profiles</p>
                    <a href="services.html">View more</a>
                  </div>
                </div>
              </li>
              <li>
                <div className="wow fadeInUp hacc hacc4" data-wow-delay="0.4s">
                  <div className="con">
                    <img src="images/icon/hall.png" alt="" loading="lazy" />
                    <h4>Join Now</h4>
                    <p>Start for free</p>
                    <a href="plans.html">Get started</a>
                  </div>
                </div>
              </li>
              <li>
                <div className="wow fadeInUp hacc hacc3" data-wow-delay="0.3s">
                  <div className="con">
                    <img
                      src="images/icon/photo-camera.png"
                      alt=""
                      loading="lazy"
                    />
                    <h4>Photo gallery</h4>
                    <p>1200+ Profiles</p>
                    <a href="photo-gallery.html">View more</a>
                  </div>
                </div>
              </li>
              <li>
                <div className="wow fadeInUp hacc hacc4" data-wow-delay="0.4s">
                  <div className="con">
                    <img src="images/icon/cake.png" alt="" loading="lazy" />
                    <h4>Blog &amp; Articles</h4>
                    <p>Start for free</p>
                    <a href="blog.html">Get started</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section> */}
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