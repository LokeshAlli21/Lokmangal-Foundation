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

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { login, logout} from './store/authSlice'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import authService from './backend-services/auth/auth';

import 'slick-carousel';
                                import "slick-carousel/slick/slick.css"; 
                                import "slick-carousel/slick/slick-theme.css";
import databaseService from './backend-services/database/database';

import { SocketProvider } from './context/SocketContext';
import { toast } from 'react-toastify';

function App() {
  const dispatch = useDispatch();
  const storeData = useSelector(state => state.auth); 
  const [photoUrl, setPhotoUrl] = useState(null)  

  const [userRole, setUserRole] = useState('user');

  const userData = useSelector((state) => state.auth.userData);

  const userId = userData?.id;

  const [isBlockedProfile, setIsBlockedProfile] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const role = await databaseService.getUserRole(userId);
        setUserRole(role); // set user role
        toast(`checked user role: ${role}`)
      } catch (err) {
        console.log(err.message);
        setUserRole('user'); // default to 'user' role
      }
    };

    if (userId) {
      fetchUserRole();
    }
  }, [userId]);
  

  useEffect(() => {
    const checkUserBlockedStatus = async () => {
      try {
        const isBlocked = await databaseService.checkIfUserBlocked(userId);
        setIsBlockedProfile(isBlocked);  // Set the status whether the user is blocked or not
        if (isBlocked) {
          toast.warning('🚫 This user is blocked by the admin.');
        } else {
          toast.info('✅ User is not blocked.');
        }
      } catch (err) {
        console.error(err.message);
        toast.error('🚨 Failed to check user block status');
      }
    };

    if (userId) {
      checkUserBlockedStatus();
    }
  }, [userId]); // Run the effect whenever `userId` changes

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login(userData))
      } else {
        dispatch(logout())
      }
      // console.log("userData : ",userData);
    })
    .catch((error) => console.log("Login Error : ",error))
  }, [])

useEffect(() => {
  if (storeData.status) {
    databaseService.getProfilePhotoById(storeData.userData.id)
      .then(profilePhoto => {
        // console.log('✅ Profile photo data:', profilePhoto);
        setPhotoUrl(profilePhoto.photo_url)
      })
      .catch(error => {
        console.error('❌ Failed to load profile photo:', error);
        toast.error(`❌ Failed to load profile photo: ${error.message}`);
      });
  }
}, [storeData])

  

  return (
    <SocketProvider userId={storeData?.userData?.id}>
    <>
      <Header photoUrl={photoUrl && photoUrl} userRole={userRole}/>
      <ToastContainer position="bottom-right" autoClose={5000}  />
      <Outlet context={{ photoUrl, userRole, isBlockedProfile}}   />
      <Footer />
    </>
    </SocketProvider>
  );
}

export default App;