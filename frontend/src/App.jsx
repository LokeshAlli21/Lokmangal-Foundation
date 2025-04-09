import moment from 'moment';
window.moment = moment;

import './css/style.css';
import './js/jquery-ui';
// import './js/slick';         // Problem is found here while deploying on vercel 
                                // index-DiNQ4MbH.js:402 Uncaught ReferenceError: require is not defined
                                //     at index-DiNQ4MbH.js:402:6013
                                //     at index-DiNQ4MbH.js:402:6045
                                //     at index-DiNQ4MbH.js:1:23
                                //     at index-DiNQ4MbH.js:515:50793
                                
import './js/select-opt';
import './js/Chart';
import './js/mail';
import './js/custom';
import 'animate.css';
import './css/animate.min.css';

import store from './store/store';

import { Outlet } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { login, logout} from './store/authSlice'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import authService from './backend-services/auth/auth';

import 'slick-carousel';
                                import "slick-carousel/slick/slick.css"; 
                                import "slick-carousel/slick/slick-theme.css";

function App() {
  const dispatch = useDispatch();


console.log('Initial State:', store.getState());
  
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