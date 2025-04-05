
import moment from 'moment';
window.moment = moment;

import '../css/style.css';
import '../js/jquery-ui';
import '../js/slick';
import '../js/select-opt';
import '../js/Chart';
import '../js/mail';
import '../js/custom';
import 'animate.css';
import '../css/animate.min.css';

import { Outlet } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';



function App() {

  return (
    <>
    <Header />
    <Outlet />
    <Footer />
    </>

  )
}

export default App
