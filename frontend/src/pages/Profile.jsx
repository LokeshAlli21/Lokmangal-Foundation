import React, { useEffect, useState } from 'react'
import databaseService from '../backend-services/database/database';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';

function Profile() {

  const { photoUrl } = useOutletContext();
  
  const userData = useSelector(state => state.auth.userData);
  // console.log("getting userData : ", userData);
  
  
  const [email, setEmail] = useState(userData.email)
  const [myProfile, setMyProfile] = useState({})
  // console.log('see my profile in state: ', myProfile);
  useEffect(() => {
    databaseService.getCurrentUserProfileByEmail(email)
    .then(data => {
      if (!data || data.length === 0) {
        // Show toast when there are no profiles
        toast("No profil is found.", { type: 'info' });
      } else {
        setMyProfile(data);
        console.log('see my profile: ', data);
      }
    })
    .catch(error => {
      // Handle any errors that occur during the fetch
      console.error('Error fetching profiles:', error);
      toast("Error fetching your profile.", { type: 'error' });
    });
  },[])

  return (
    <section>
  <div className="db">
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
                  <a href="/profile" className="act">
                    <i className="fa fa-male" aria-hidden="true" />
                    Profile
                  </a>
                </li>
                <li>
                  <a href="/interests">
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
                  <a href="/plan">
                    <i className="fa fa-money" aria-hidden="true" />
                    Plan
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
            <div className="col-md-12 col-lg-6 col-xl-8 db-sec-com">
              <h2 className="db-tit">Profiles status</h2>
              <div className="db-profile">
                <div className="img">
                  <img src={photoUrl} loading="lazy" style={{maxHeight: '500px'}} alt="Profile" />
                </div>
                <div className="edit">
                  <a
                    href="/edit-profile"
                    className="cta-dark"
                    target="_blank"
                  >
                    Edit profile
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6 col-xl-4 db-sec-com">
              <h2 className="db-tit">Profiles status</h2>
              <div className="db-pro-stat">
                <h6>Profile completion</h6>
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
                        Profile visibility settings
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="db-pro-pgog">
                  <span>
                    <b className="count">90</b>%
                  </span>
                </div>
                <ul className="pro-stat-ic">
                  <li>
                    <span>
                      <i className="fa fa-heart-o like" aria-hidden="true" />
                      <b>12</b>Likes
                    </span>
                  </li>
                  <li>
                    <span>
                      <i className="fa fa-eye view" aria-hidden="true" />
                      <b>12</b>Views
                    </span>
                  </li>
                  <li>
                    <span>
                      <i
                        className="fa fa-handshake-o inte"
                        aria-hidden="true"
                      />
                      <b>12</b>Interests
                    </span>
                  </li>
                  <li>
                    <span>
                      <i
                        className="fa fa-hand-pointer-o clic"
                        aria-hidden="true"
                      />
                      <b>12</b>Clicks
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 db-sec-com db-pro-stat-pg">
              <h2 className="db-tit">Profiles views</h2>
              <div className="db-pro-stat-view-filter cho-round-cor chosenini">
                <div>
                  <select className="chosen-select">
                    <option value="">Current month</option>
                    <option value="">Jan 2024</option>
                    <option value="">Fan 2024</option>
                    <option value="">Mar 2024</option>
                    <option value="">Apr 2024</option>
                    <option value="">May 2024</option>
                    <option value="">Jun 2024</option>
                  </select>
                </div>
              </div>
              <div className="chartin">
                <canvas id="Chart_leads" />
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

export default Profile