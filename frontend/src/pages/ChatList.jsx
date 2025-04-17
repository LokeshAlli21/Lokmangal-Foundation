import React from 'react'
import { useOutletContext } from 'react-router-dom';

function ChatList() {
  const { photoUrl } = useOutletContext();

  
  return (
    <section>
  <div className="db" style={{marginTop: 0, padding: "50px"}}>
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-lg-3">
          <div className="db-nav">
            <div className="db-nav-pro">
              <img src={photoUrl} className="img-fluid" alt="profile" />
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
                  <a href="/interests">
                    <i className="fa fa-handshake-o" aria-hidden="true" />
                    Interests
                  </a>
                </li>
                <li>
                  <a href="/chat-list" className="act">
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
              <h2 className="db-tit">Chat list</h2>
              <div className="db-pro-stat">
                <div className="db-chat">
                  <ul>
                    <li className="db-chat-trig">
                      <div className="db-chat-pro">
                        {" "}
                        <img src="images/profiles/1.jpg" alt="" />{" "}
                      </div>
                      <div className="db-chat-bio">
                        <h5>Ashley emyy</h5>
                        <span>Hi Anna, How are you?</span>
                      </div>
                      <div className="db-chat-info">
                        <div className="time new">
                          <span className="timer">9:00 PM</span>
                          <span className="cont">3</span>
                        </div>
                      </div>
                    </li>
                    <li className="db-chat-trig">
                      <div className="db-chat-pro">
                        {" "}
                        <img src="images/profiles/16.jpg" alt="" />{" "}
                      </div>
                      <div className="db-chat-bio">
                        <h5>Julia Ann</h5>
                        <span>Hi Anna, How are you?</span>
                      </div>
                      <div className="db-chat-info">
                        <div className="time new">
                          <span className="timer">9:00 PM</span>
                          <span className="cont">2</span>
                        </div>
                      </div>
                    </li>
                    <li className="db-chat-trig">
                      <div className="db-chat-pro">
                        {" "}
                        <img src="images/profiles/12.jpg" alt="" />{" "}
                      </div>
                      <div className="db-chat-bio">
                        <h5>Elizabeth Taylor</h5>
                        <span>Hi Anna, How are you?</span>
                      </div>
                      <div className="db-chat-info">
                        <div className="time new">
                          <span className="timer">8:00 PM</span>
                          <span className="cont">3</span>
                        </div>
                      </div>
                    </li>
                    <li className="db-chat-trig">
                      <div className="db-chat-pro">
                        {" "}
                        <img src="images/profiles/13.jpg" alt="" />{" "}
                      </div>
                      <div className="db-chat-bio">
                        <h5>Angelina Jolie</h5>
                        <span>Hi Anna, How are you?</span>
                      </div>
                      <div className="db-chat-info">
                        <div className="time">
                          <span className="timer">3:00 PM</span>
                        </div>
                      </div>
                    </li>
                    <li className="db-chat-trig">
                      <div className="db-chat-pro">
                        {" "}
                        <img src="images/profiles/14.jpg" alt="" />{" "}
                      </div>
                      <div className="db-chat-bio">
                        <h5>Olivia mia</h5>
                        <span>Hi Anna, How are you?</span>
                      </div>
                      <div className="db-chat-info">
                        <div className="time">
                          <span className="timer">5:00 PM</span>
                        </div>
                      </div>
                    </li>
                    <li className="db-chat-trig">
                      <div className="db-chat-pro">
                        {" "}
                        <img src="images/profiles/1.jpg" alt="" />{" "}
                      </div>
                      <div className="db-chat-bio">
                        <h5>Ashley emyy</h5>
                        <span>Hi Anna, How are you?</span>
                      </div>
                      <div className="db-chat-info">
                        <div className="time new">
                          <span className="timer">9:00 PM</span>
                        </div>
                      </div>
                    </li>
                    <li className="db-chat-trig">
                      <div className="db-chat-pro">
                        {" "}
                        <img src="images/profiles/16.jpg" alt="" />{" "}
                      </div>
                      <div className="db-chat-bio">
                        <h5>Julia Ann</h5>
                        <span>Hi Anna, How are you?</span>
                      </div>
                      <div className="db-chat-info">
                        <div className="time new">
                          <span className="timer">9:00 PM</span>
                        </div>
                      </div>
                    </li>
                    <li className="db-chat-trig">
                      <div className="db-chat-pro">
                        {" "}
                        <img src={photoUrl} alt="Profile" />{" "}
                      </div>
                      <div className="db-chat-bio">
                        <h5>Elizabeth Taylor</h5>
                        <span>Hi Anna, How are you?</span>
                      </div>
                      <div className="db-chat-info">
                        <div className="time new">
                          <span className="timer">8:00 PM</span>
                        </div>
                      </div>
                    </li>
                    <li className="db-chat-trig">
                      <div className="db-chat-pro">
                        {" "}
                        <img src="images/profiles/13.jpg" alt="" />{" "}
                      </div>
                      <div className="db-chat-bio">
                        <h5>Angelina Jolie</h5>
                        <span>Hi Anna, How are you?</span>
                      </div>
                      <div className="db-chat-info">
                        <div className="time">
                          <span className="timer">3:00 PM</span>
                        </div>
                      </div>
                    </li>
                    <li className="db-chat-trig">
                      <div className="db-chat-pro">
                        {" "}
                        <img src="images/profiles/14.jpg" alt="" />{" "}
                      </div>
                      <div className="db-chat-bio">
                        <h5>Olivia mia</h5>
                        <span>Hi Anna, How are you?</span>
                      </div>
                      <div className="db-chat-info">
                        <div className="time">
                          <span className="timer">5:00 PM</span>
                        </div>
                      </div>
                    </li>
                  </ul>
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

export default ChatList