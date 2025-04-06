import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import env from '../env/env';
import authService from '../backend-services/auth/auth';

function SignUp() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  useEffect(() => {
    const testBackendConnection = async () => {
      try {
        const response = await fetch(`${env.backendUrl}/api/test`);
        const data = await response.json();
        console.log('🚀 Backend Test Success:', data);
      } catch (error) {
        console.error('❌ Backend Test Failed:', error);
      }
    };
  
    testBackendConnection();
  }, []);

  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
  };

  const create = async () => {
    setError('');
    try {
      const userData = await authService.createAccount(formData);
      if (userData) {
        console.log(userData);
        // const userData = await authService.getCurrentUser()
        //     // if(userData) dispatch(login(userData))
        navigate('/login')
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    const data = await authService.logout();
    console.log(data);
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone, password, agree } = formData;

    if (!name || !email || !phone || !password || !agree) {
      alert('Please fill in all fields and accept the terms.');
      return;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!validatePhone(phone)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }

    create()

    // If all validations pass
    console.log('Form Submitted:', formData);
    alert('Form submitted successfully!');
  };

  return (
    <>
      <section>
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="inn">
                <div className="lhs">
                  <div className="tit">
                    <h2>
                      Now <b>Find your life partner</b> Easy and fast.
                    </h2>
                  </div>
                  <div className="im">
                    <img src="images/login-couple.png" alt="" />
                  </div>
                  <div className="log-bg">&nbsp;</div>
                </div>
                <div className="rhs">
                  <div>
                    <div className="form-tit">
                    <button type="button" className=' rounded m-5 px-5 py-6 outline-none' onClick={handleLogout}>Logout</button>
                      <h4>Start for free</h4>
                      <h1>Sign up to Matrimony</h1>
                      <p>
                        Already a member? <a href="login.html">Login</a>
                      </p>
                    </div>
                    <div className="form-login">
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label className="lb">Name:</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your full name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="lb">Email:</label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="lb">Phone:</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter phone number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="lb">Password:</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group form-check">
                          <label className="form-check-label">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="agree"
                              checked={formData.agree}
                              onChange={handleChange}
                            />{" "}
                            Creating an account means you’re okay with our{" "}
                            <a href="#!">Terms of Service</a>, Privacy Policy,
                            and our default Notification Settings.
                          </label>
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Create Account
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignUp;
