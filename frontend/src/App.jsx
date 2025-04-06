import moment from 'moment';
window.moment = moment;

import './css/style.css';
import './js/jquery-ui';
import './js/slick';
import './js/select-opt';
import './js/Chart';
import './js/mail';
import './js/custom';
import 'animate.css';
import './css/animate.min.css';

import { Outlet } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';

import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from './store/authSlice';
import { useEffect } from 'react';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const { user, loading, error, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      console.log("Token found, fetching current user...");
      dispatch(getCurrentUser());
    } else {
      console.log("No token found. User not logged in.");
    }
  }, [dispatch, token]);

  return (
    <>
      <div>
        {loading ? "Loading..." : <h1>Welcome {user ? user.name : 'No user'}!</h1>}
        {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      </div>
      <Header />
      <ToastContainer position="bottom-right" autoClose={5000}  />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;