import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import databaseService from "../backend-services/database/database"
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';

function Interests() {

  const { photoUrl } = useOutletContext();

  const userData = useSelector(state => state.auth.userData);
  const [profiles, setProfiles] = useState([])

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
  
  

  useEffect(() => {
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
                  <a href="/chat">
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
                <div className="dropdown">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    data-bs-toggle="dropdown"
                  >
                    <i className="fa fa-ellipsis-h" aria-hidden="true" />
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Edid profile
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        View profile
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Plan change
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Download invoice now
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="db-inte-main">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-bs-toggle="tab"
                        href="#home"
                      >
                        find more profiles
                      </a>
                    </li>
                    {/* <li className="nav-item">
                      <a
                        className="nav-link"
                        data-bs-toggle="tab"
                        href="#menu1"
                      >
                        Accept request
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-bs-toggle="tab"
                        href="#menu2"
                      >
                        Denay request
                      </a>
                    </li> */}
                  </ul>
                  {/* Tab panes */}
                  {/* Tab panes */}
                  <div className="tab-content">
                    <div id="home" className="container tab-pane active">
                      <br />
                      <div className="db-inte-prof-list">
                        <ul>
                          




                        {profiles.map((profile) => {
        const birthDate = new Date(profile.dob);
        const age = new Date().getFullYear() - birthDate.getFullYear();
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
            <div className="db-int-pro-3">
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
                className="btn btn-danger btn-sm"
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