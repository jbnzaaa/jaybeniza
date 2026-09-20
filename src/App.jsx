<<<<<<< HEAD
// React
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
//
=======
// React 
import React, {useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
// 
>>>>>>> origin/master
import './assets/styles/App.css';
// Pages
import Navbar from './components/pages/Navbar';
import Home from './components/pages/Home';
import Footer from './components/pages/Footer';
import DailyDiscount from './components/pages/projects/DailyDiscount';
import Jbnza from './components/pages/projects/Jbnza';
import Jaysonbeniza from './components/pages/projects/Jaysonbeniza';
import Regain from './components/pages/projects/Regain';
<<<<<<< HEAD
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// re-measures every ScrollTrigger against the new route's content height,
// and resets scroll to the top, whenever the page changes
function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <>
      <Router>
        <ScrollManager/>
        <Navbar/>
=======
// import Scroll from './components/animation/SmoothScrollbar';
// GSAP
import gsap from 'gsap' 
import ScrollTrigger from 'gsap/ScrollTrigger'

function App() {
  // useEffect(() => {
  //   // onload animation
  //   gsap.to('#main-container', { duration: 1,  delay: .5, y: '-100vh', ease: 'power1.inOut',
  //     scrollTrigger: {
  //       trigger: '#main-container',
  //       start: 'bottom 250%',
  //     }
  //   });
  // }, []);



  return (
    <>
      {/* <div id="onload-container">
        <div id="sticky">
          <div className='bg-black w-full h-screen' id="main-container"/>
        </div>
      </div> */}
      {/* router */}
      <Router>
        {/* navbar */}
        <Navbar/>
        {/* routes */}
>>>>>>> origin/master
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/dailydiscount' element={<DailyDiscount/>}/>
          <Route path='/jbnza' element={<Jbnza/>}/>
          <Route path='/jaysonbeniza' element={<Jaysonbeniza/>}/>
          <Route path='/regain' element={<Regain/>}/>
        </Routes>
<<<<<<< HEAD
=======
        {/* footer */}
>>>>>>> origin/master
        <Footer/>
      </Router>
    </>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> origin/master
