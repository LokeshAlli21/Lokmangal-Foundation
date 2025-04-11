import React, { useState } from 'react'

function Interests() {

  const [profiles, setProfiles] = useState([ // date of  user created
    {
      id: 44,
      middle_name: "Rose",
      last_name: "Davis",
      gender: "Female",
      dob: "1994-08-18T18:30:00.000Z",
      marital_status: "Single",
      religion: "Christianity",
      caste: "SC",
      sub_caste: "Chamar",
      state: "Florida",
      city: "Miami",
      pincode: "33101",
      education: "B.A. in Literature",
      occupation: "Content Writer",
      income: "60000",
      family_status: "Middle Class",
      height_feet: 5,
      date_of_user_created: "2025-04-02T00:00:00.000Z",
      height_inches: 4,
      photo_url: "https://randomuser.me/api/portraits/women/34.jpg",
      family_type: "Joint",
      preferred_age_range: "26-31",
    },
    {
      id: 46,
      middle_name: "Marie",
      date_of_user_created: "2025-04-08T00:00:00.000Z",
      last_name: "Moore",
      gender: "Female",
      dob: "1993-12-04T18:30:00.000Z",
      marital_status: "Single",
      religion: "Christianity",
      caste: "OBC",
      sub_caste: "None",
      state: "Texas",
      city: "Houston",
      pincode: "77001",
      education: "M.A. in History",
      occupation: "Teacher",
      income: "55000",
      family_status: "Upper Middle Class",
      height_feet: 5,
      height_inches: 6,
      photo_url: "https://randomuser.me/api/portraits/women/45.jpg",
      family_type: "Nuclear",
      preferred_age_range: "27-32",
    },
  ])

  
  return (
    <section>
  <div className="db">
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-lg-3">
          <div className="db-nav">
            <div className="db-nav-pro">
              <img src="images/profiles/12.jpg" className="img-fluid" alt="" />
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
              <img src={profile.photo_url} alt={`${profile.middle_name} ${profile.last_name}`} />
            </div>
            <div className="db-int-pro-2">
              <h5>{`${profile.middle_name} ${profile.last_name}`}</h5>
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
                  const createdDate = new Date(profile.date_of_user_created);
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
              <a href="profile-details.html" className="cta-5" target="_blank" rel="noopener noreferrer">
                View full profile
              </a>
            </div>
            <div className="db-int-pro-3">
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={() => console.log('Liked profile ID:', profile.id)}
              >
                👍 Like
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