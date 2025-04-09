import React from 'react'

function Plan() {
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
                  <a href="/plan" className="act">
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
            <div className="col-md-4 db-sec-com">
              <h2 className="db-tit">Plan details</h2>
              <div className="db-pro-stat">
                <h6 className="tit-top-curv">Current plan</h6>
                <div className="db-plan-card">
                  <img src="images/icon/plan.png" alt="" />
                </div>
                <div className="db-plan-detil">
                  <ul>
                    <li>
                      Plan name: <strong>Standard</strong>
                    </li>
                    <li>
                      Validity: <strong>6 Months</strong>
                    </li>
                    <li>
                      Valid till <strong>24 June 2024</strong>
                    </li>
                    <li>
                      <a href="" className="cta-3">
                        Upgrade now
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-8 db-sec-com">
              <h2 className="db-tit">All invoice</h2>
              <div className="db-invoice">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Plan type</th>
                      <th>Duration</th>
                      <th>Cost</th>
                      <th>Invoice</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Platinum</td>
                      <td>12 Months(May 2023 - June 2024)</td>
                      <td>$500</td>
                      <td>
                        <a href="#" className="cta-dark cta-sml" download="">
                          <span>Download</span>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>Standard</td>
                      <td>6 Months(Aug 2021 - Jan 2022)</td>
                      <td>$250</td>
                      <td>
                        <a href="#" className="cta-dark cta-sml" download="">
                          <span>Download</span>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>Standard</td>
                      <td>6 Months(Jan 2021 - July 2021)</td>
                      <td>$250</td>
                      <td>
                        <a href="#" className="cta-dark cta-sml" download="">
                          <span>Download</span>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-12 db-sec-com">
              <div className="alert alert-warning db-plan-canc">
                <p>
                  <strong>Plan cancellation:</strong>{" "}
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#plancancel"
                  >
                    Click here
                  </a>{" "}
                  to cancell the current plan.
                </p>
              </div>
            </div>
            <div className="col-md-12 db-sec-com">
              <div className="alert alert-warning db-plan-canc db-plan-canc-app">
                <p>
                  Your plan cancellation request has been successfully received
                  by the admin. Once the admin approves your cancellation, the
                  cost will be sent to you.
                </p>
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

export default Plan