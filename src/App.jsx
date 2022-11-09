// React 
import React, {useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// 
import './assets/styles/App.css';
// Pages
import Navbar from './components/pages/Navbar';
import Home from './components/pages/Home';
import Footer from './components/pages/Footer';
// import DailyDiscount from './components/pages/projects/DailyDiscount';
// import Jbnza from './components/pages/projects/Jbnza';
// import Regain from './components/pages/projects/Regain';
// import Scroll from './components/animation/SmoothScrollbar';
// GSAP
// import gsap from 'gsap' 
// import ScrollTrigger from 'gsap/ScrollTrigger'

function App() {
  useEffect(() => {
    // onload animation
    // gsap.to('#main-container', { duration: 1,  delay: .5, y: '-100vh', ease: 'power1.inOut',
    //   scrollTrigger: {
    //     trigger: '#main-container',
    //     start: 'bottom 250%',
    //   }
    // });
  }, []);

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
        <Routes>
          <Route path='/' element={<Home/>}/>
          {/* <Route path='/dailydiscount' element={<DailyDiscount/>}/>
          <Route path='/jbnza' element={<Jbnza/>}/>
          <Route path='/regain' element={<Regain/>}/> */}
        </Routes>
        {/* footer */}
        <Footer/>
      </Router>
    </>
  );
}

export default App;