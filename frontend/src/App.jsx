import moment from 'moment';
window.moment = moment;

// import './css/style.css';
// import './js/jquery-ui';
// import './js/slick';
// import './js/select-opt';
// import './js/Chart';
// import './js/mail';
// import './js/custom';
// import 'animate.css';
// import './css/animate.min.css';

import { Outlet } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { login, logout} from './store/authSlice'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import authService from './backend-services/auth/auth';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login(userData))
      } else {
        dispatch(logout())
      }
      console.log("userData : ",userData);
    })
    .catch((error) => console.log("Login Error : ",error))
  }, [])

  return (
    <>
      <Header />
      <ToastContainer position="bottom-right" autoClose={5000}  />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;