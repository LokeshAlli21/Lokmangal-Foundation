import React from 'react'
import { useOutletContext } from 'react-router-dom'

function Setting() {

  const {photoUrl} = useOutletContext()

  return (
    <section>
  <div className="db" style={{marginTop: 0, padding: "40px"}}>
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-lg-3">
          <div className="db-nav">
            <div className="db-nav-pro">
              <img src={photoUrl} className="img-fluid" alt="" />
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
                  <a href="/chat">
                    <i className="fa fa-commenting-o" aria-hidden="true" />
                    Chat list
                  </a>
                </li>
                <li>
                  <a href="/setting" className="act">
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
              <h2 className="db-tit">Profile settings</h2>
              <div className="col7 fol-set-rhs">
                {/*START*/}
                <div
                  className="ms-write-post fol-sett-sec sett-rhs-pro"
                  style={{}}
                >
                  <div className="foll-set-tit fol-pro-abo-ico">
                    <h4>Profile</h4>
                  </div>
                  <div className="fol-sett-box">
                    <ul>
                      <li>
                        <div className="sett-lef">
                          <div className="auth-pro-sm sett-pro-wid">
                            <div className="auth-pro-sm-img">
                              <img src="images/profiles/15.jpg" alt="" />
                            </div>
                            <div className="auth-pro-sm-desc">
                              <h5>Anna Jaslin</h5>
                              <p>Premium user | Illunois</p>
                            </div>
                          </div>
                        </div>
                        <div className="sett-rig">
                          <a href="/log-out" className="set-sig-out">
                            Sign Out
                          </a>
                        </div>
                      </li>
                      <li>
                        <div className="sett-lef">
                          <div className="sett-rad-left">
                            <h5>Profile visible</h5>
                            <p>
                              You can set-up who can able to view your profile.
                            </p>
                          </div>
                        </div>
                        <div className="sett-rig">
                          <div className="sett-select-drop">
                            <select>
                              <option value="All users">All users</option>
                              <option value="Premium">Premium</option>
                              <option value="Free">Free</option>
                              <option value="Free">
                                No-more visible(You can't visible, so no one can
                                view your profile)
                              </option>
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="sett-lef">
                          <div className="sett-rad-left">
                            <h5>Who can send you Interest requests?</h5>
                            <p>
                              You can set-up who can able to make Interest
                              request here.
                            </p>
                          </div>
                        </div>
                        <div className="sett-rig">
                          <div className="sett-select-drop">
                            <select>
                              <option value="All users">All users</option>
                              <option value="Premium">Premium</option>
                              <option value="Free">Free</option>
                            </select>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                {/*END*/}
                {/*START*/}
                <div
                  className="ms-write-post fol-sett-sec sett-rhs-acc"
                  style={{}}
                >
                  <div className="foll-set-tit fol-pro-abo-ico">
                    <h4>Account</h4>
                    <a href="#!" className="sett-edit-btn sett-acc-edit-eve">
                      <i className="fa fa-edit" aria-hidden="true" /> Edit
                    </a>
                  </div>
                  <div className="fol-sett-box sett-acc-view sett-two-tab">
                    <ul>
                      <li>
                        <div>Full name</div>
                        <div>Anna Jaslin</div>
                      </li>
                      <li>
                        <div>Mobile</div>
                        <div>+01 4343 53553</div>
                      </li>
                      <li>
                        <div>Email id</div>
                        <div>loremipsum@gmail.com</div>
                      </li>
                      <li>
                        <div>Password</div>
                        <div>**********</div>
                      </li>
                      <li>
                        <div>Profile type</div>
                        <div>Platinum</div>
                      </li>
                    </ul>
                  </div>
                  <div className="sett-acc-edit">
                    <form className="form-com sett-pro-form">
                      <ul>
                        <li>
                          <div className="fm-lab">Full name</div>
                          <div className="fm-fie">
                            <input type="text" defaultValue="vijaya kumar" />
                          </div>
                        </li>
                        <li>
                          <div className="fm-lab">Email id</div>
                          <div className="fm-fie">
                            <input
                              type="text"
                              defaultValue="vijaykumar@gmail.com"
                            />
                          </div>
                        </li>
                        <li>
                          <div className="fm-lab">Password</div>
                          <div className="fm-fie">
                            <input type="password" defaultValue="dfght3d34" />
                          </div>
                        </li>
                        <li>
                          <div className="fm-lab">Confirm password</div>
                          <div className="fm-fie">
                            <input type="password" defaultValue="asg235sf" />
                          </div>
                        </li>
                        <li>
                          <div className="fm-lab">Profile type</div>
                          <div className="fm-fie">
                            <select>
                              <option value="volvo">General</option>
                              <option value="opel">Bloger</option>
                              <option value="saab">Business</option>
                              <option value="saab">Marketer</option>
                            </select>
                          </div>
                        </li>
                        <li>
                          <input
                            type="submit"
                            defaultValue="Update"
                            className=""
                          />
                          <input
                            type="reset"
                            defaultValue="Cancel"
                            className="sett-acc-edi-can"
                          />
                        </li>
                      </ul>
                    </form>
                  </div>
                </div>
                {/*END*/}
                {/*START*/}
                <div
                  className="ms-write-post fol-sett-sec sett-rhs-not"
                  style={{}}
                >
                  <div className="foll-set-tit fol-pro-abo-ico">
                    <h4>Notifications</h4>
                  </div>
                  <div className="fol-sett-box">
                    <ul>
                      <li>
                        <div className="sett-lef">
                          <div className="sett-rad-left">
                            <h5>Interest request</h5>
                            <p>Interest request email notificatios</p>
                          </div>
                        </div>
                        <div className="sett-rig">
                          <div className="checkboxes-and-radios">
                            <input
                              type="checkbox"
                              name="checkbox-cats"
                              id="sett-not-mail"
                              defaultValue={1}
                              defaultChecked=""
                            />
                            <label htmlFor="sett-not-mail" />
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="sett-lef">
                          <div className="sett-rad-left">
                            <h5>Chat</h5>
                            <p>New chat notificatios</p>
                          </div>
                        </div>
                        <div className="sett-rig">
                          <div className="checkboxes-and-radios">
                            <input
                              type="checkbox"
                              name="checkbox-cats"
                              id="sett-not-fri"
                              defaultValue={1}
                              defaultChecked=""
                            />
                            <label htmlFor="sett-not-fri" />
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="sett-lef">
                          <div className="sett-rad-left">
                            <h5>Profile views</h5>
                            <p>
                              If any one view your profile means you get the
                              notifications at end of the day
                            </p>
                          </div>
                        </div>
                        <div className="sett-rig">
                          <div className="checkboxes-and-radios">
                            <input
                              type="checkbox"
                              name="checkbox-cats"
                              id="sett-not-fol"
                              defaultValue={1}
                              defaultChecked=""
                            />
                            <label htmlFor="sett-not-fol" />
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="sett-lef">
                          <div className="sett-rad-left">
                            <h5>New profile match</h5>
                            <p>You get the profile match emails</p>
                          </div>
                        </div>
                        <div className="sett-rig">
                          <div className="checkboxes-and-radios">
                            <input
                              type="checkbox"
                              name="checkbox-cats"
                              id="sett-not-mes"
                              defaultValue={1}
                              defaultChecked=""
                            />
                            <label htmlFor="sett-not-mes" />
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                {/*END*/}
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

export default Setting