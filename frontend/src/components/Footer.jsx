import React from 'react'

function Footer() {
  return (
    <>
      {/* FOOTER */}
  <section className="wed-hom-footer">
    <div className="container">
      <div className="row foot-supp">
        <h2>
          <span>Free support:</span> +91 9923404583
          &nbsp;&nbsp;|&nbsp;&nbsp; <span>Email:</span>
          lokmangalgroups@gmail.com
        </h2>
      </div>
      <div className="row wed-foot-link wed-foot-link-1">
        <div className="col-md-4">
          <h4>Get In Touch</h4>
          <p>Address: Lokmangal Foundation \n 13-A, Sahyadri Nagar, Near Old Hotagi Naka, Vikas Nagar, Solapur - 413003</p>
          <p>
            Phone: <a href="tel:+919923404583">+91 9923404583</a>
          </p>
          <p>
            Email: <a href="mailto:lokmangalgroups@gmail.com">lokmangalgroups@gmail.com</a>
          </p>
        </div>
        <div className="col-md-4">
          <h4>HELP &amp; SUPPORT</h4>
          <ul>
            <li>
              <a href="/about">About company</a>
            </li>
            <li>
              <a href="/contact">Contact us</a>
            </li>
            <li>
              <a href="#">Feedback</a>
            </li>
          </ul>
        </div>
        <div className="col-md-4 fot-soc">
          <h4>SOCIAL MEDIA</h4>
          <ul>
            <li>
              <a href="https://www.linkedin.com/company/lokmangalfoundation/">
                <img src="images/social/1.png" alt="" loading="lazy" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/LokmangalFound">
                <img src="images/social/2.png" alt="" loading="lazy" />
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/lokmangalfoundation/">
                <img src="images/social/3.png" alt="" loading="lazy" />
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/channel/UCk4QgXC_Qr6UtkHx9Tbm8yA?view_as=subscriberv">
                <img src="images/social/5.png" alt="" loading="lazy" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="row foot-count">
        <p>
          Company name Site - Trusted by over thousands of Boys &amp; Girls for
          successfull marriage.{" "}
          <a href="/signup" className="btn btn-primary btn-sm">
            Join us today !
          </a>
        </p>
      </div>
    </div>
  </section>
  {/* END */}
  {/* COPYRIGHTS */}
  <section>
    <div className="cr">
      <div className="container">
        <div className="row">
          <p>
            Copyright © <span id="">2025</span>{" "}
            <a href="#!" target="_blank">
            https://shadi.lokmangal.website/
            </a>{" "}
            All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </section></>
  )
}

export default Footer