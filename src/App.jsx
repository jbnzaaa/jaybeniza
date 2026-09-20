// React
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
//
import './assets/styles/App.css';
// Pages
import Navbar from './components/pages/Navbar';
import Home from './components/pages/Home';
import Footer from './components/pages/Footer';
import DailyDiscount from './components/pages/projects/DailyDiscount';
import Jbnza from './components/pages/projects/Jbnza';
import Jaysonbeniza from './components/pages/projects/Jaysonbeniza';
import Regain from './components/pages/projects/Regain';
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollSmoother from 'gsap/ScrollSmoother'
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

// re-measures every ScrollTrigger against the new route's content height,
// and resets scroll to the top, whenever the page changes. Goes through
// ScrollSmoother.get().scrollTo() (not window.scrollTo) so the smoother's
// own internal position - which is what actually drives the page - is
// reset too, not just the native scroll position it proxies
function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    ScrollSmoother.get()?.scrollTo(0, true);
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [location.pathname]);

  return null;
}

function App() {
  useEffect(() => {
    // smooth: how many seconds the scroll position takes to catch up to
    // the actual scroll input - higher is slower/more damped (default 1)
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.8,
      effects: true,
    });
    return () => smoother.kill();
  }, []);

  return (
    <>
      <Router>
        <ScrollManager/>
        <div id='smooth-wrapper'>
          <div id='smooth-content'>
            <Navbar/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/dailydiscount' element={<DailyDiscount/>}/>
              <Route path='/jbnza' element={<Jbnza/>}/>
              <Route path='/jaysonbeniza' element={<Jaysonbeniza/>}/>
              <Route path='/regain' element={<Regain/>}/>
            </Routes>
            <Footer/>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
