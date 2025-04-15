import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authService from '../backend-services/auth/auth';
import { login as authLogin } from '../store/authSlice';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error
    setError('');

    // Basic Validation
    if (!email || !password) {
      setError('All fields are required');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    try {
      setLoading(true);

      const session = await authService.login({ email, password });
      console.log("session: ",session);

      if (session) {

        const userData = await authService.getCurrentUser()
        // if(userData){
        //   dispatch(authLogin(userData))
        // }

        console.log('✅ Login Success:', userData);

        alert('Login successful!');
        navigate('/'); 
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.error('❌ Login Failed:', error);

      // Proper error handling
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'An error occurred during login';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* LOGIN */}
      <section>
        <div className="login"  style={{marginTop: 0, padding: "40px"}}>
          <div className="container">
            <div className="row">
              <div className="inn">
                <div className="lhs">
                  <div className="tit">
                    <h2>
                      Now <b>Find <br /> your life partner</b> Easy and fast.
                    </h2>
                  </div>
                  <div className="im">
                    <img src="images/login-couple.png" alt="Login visual" />
                  </div>
                  <div className="log-bg">&nbsp;</div>
                </div>
                <div className="rhs">
                  <div>
                    <div className="form-tit">
                      <h4>Start for free</h4>
                      <h1>Sign in to Matrimony</h1>
                      <p>
                        Not a member? <a href="/signup">Sign up now</a>
                      </p>
                    </div>
                    <div className="form-login">
                      <form onSubmit={handleSubmit}>
                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        <div className="form-group">
                          <label className="lb">Email:</label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        <div className="form-group">
                          <label className="lb">Password:</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={loading}
                        >
                          {loading ? 'Signing in...' : 'Sign in'}
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
      {/* END */}
    </>
  );
}

export default Login;
