// React
import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
//
import './assets/styles/App.css';
// Pages
import Navbar from './components/pages/Navbar';
import Home from './components/pages/Home';
import AboutPage from './components/pages/AboutPage';
import ProjectsPage from './components/pages/ProjectsPage';
import ContactPage from './components/pages/ContactPage';
import WhatIDoPage from './components/pages/WhatIDoPage';
import DailyDiscount from './components/pages/projects/DailyDiscount';
import Jbnza from './components/pages/projects/Jbnza';
import Jaysonbeniza from './components/pages/projects/Jaysonbeniza';
import Regain from './components/pages/projects/Regain';
import ProjectPage from './components/pages/projects/ProjectPage';
import { PROJECTS } from './components/pages/projects/projects';
// loading screen + page-to-page wipe
import Preloader from './components/common/Preloader';
import { PageTransitionProvider } from './components/common/PageTransition';
// the square cursor
import Cursor from './components/common/Cursor';
// button hover
import { enableHoverRoll } from './utils/hoverRoll';
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
    // the phone's menu pauses the smoother while it is open, and a paused
    // smoother takes the new position without moving the page to it: the
    // new page then opened part way down, and jumped to the top at the
    // first touch. so it is un-paused first, sent to the top, and sent
    // again once the new page has been measured
    const smoother = ScrollSmoother.get();
    const toTop = () => {
      smoother?.paused(false);
      smoother?.scrollTo(0, true);
      smoother?.scrollTop(0);
      window.scrollTo(0, 0);
    };
    toTop();
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      toTop();
    });
    return () => cancelAnimationFrame(id);
  }, [location.pathname]);

  return null;
}

function App() {
  // the page mounts when the loading screen starts to leave, so its
  // reveals play as the panel lifts instead of unseen behind it
  const [entered, setEntered] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleExitStart = useCallback(() => setEntered(true), []);
  const handleDone = useCallback(() => setLoading(false), []);

  useEffect(() => {
    // smooth: how many seconds the scroll position takes to catch up to
    // the actual scroll input - higher is slower/more damped (default 1).
    // speed: how far one notch of wheel or swipe travels (default 1) -
    // below 1 covers less page per gesture, so sections pass slowly enough
    // for their text reveals to play out while they are on screen
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      // how long the page takes to catch up with the wheel, in seconds:
      // long enough that the steps of a mouse wheel run together into
      // one glide. (at 1 each step could be felt, and the page arrived
      // abruptly; the reveals no longer need it short - they start
      // earlier on the screen now, scrollReveal.js)
      smooth: 1.2,
      // touch screens get a light version of the same easing (off by
      // default there) - short, so the page still follows the finger
      smoothTouch: .1,
      // how far the page moves for a turn of the wheel, against the
      // browser's own distance: under it, so the page is drawn past
      // rather than thrown. (at .85 a turn of the wheel went too far too
      // quickly)
      speed: .8,
      effects: true,
    });

    // phones and tablets. a touch browser scrolls on its own thread and
    // tells the page afterwards, so anything positioned from scroll (the
    // pinned projects section, scroll-coupled animation) lands a frame
    // late and shudders; and its address bar sliding in and out resizes
    // the window mid-scroll, which re-measures every trigger and makes the
    // page jump. normalizeScroll moves touch scrolling onto the page's own
    // thread (it also keeps the address bar from resizing the page), and
    // ignoreMobileResize skips the re-measure for whatever resizes remain
    // the wheel has a top speed. however hard it is spun, the page is
    // asked to move no faster than WHEEL_MAX (px a second, before the
    // smoother's own speed is applied): what the wheel asks for is kept
    // as a distance still to go, and paid out at that rate, so a flick
    // carries on at the top speed instead of jumping down the page.
    // (not while the menu holds the page still, not for a pinch or
    // ctrl + wheel, which zoom, and not over something that scrolls by
    // itself - a long text box, an open list - which keeps the wheel)
    const WHEEL_MAX = 2400;
    let owed = 0;
    const scrollsItself = (el) => {
      for (let node = el; node && node !== document.body; node = node.parentElement) {
        if (node.scrollHeight > node.clientHeight + 1 && /auto|scroll/.test(getComputedStyle(node).overflowY)) return true;
      }
      return false;
    };
    const onWheel = (e) => {
      if (e.ctrlKey || smoother.paused() || scrollsItself(e.target)) return;
      e.preventDefault();
      // lines and pages, as some mice report the wheel, in px
      const unit = e.deltaMode === 1 ? 16 * 2.5 : e.deltaMode === 2 ? window.innerHeight : 1;
      owed += e.deltaY * unit;
      // (no more than a screen and a half in hand: a long spin stops soon after the wheel does)
      owed = gsap.utils.clamp(-window.innerHeight * 1.5, window.innerHeight * 1.5, owed);
    };
    const pay = (_time, delta) => {
      if (!owed) return;
      const most = WHEEL_MAX * delta / 1000;
      const step = gsap.utils.clamp(-most, most, owed);
      owed -= step;
      if (Math.abs(owed) < .5) owed = 0;
      window.scrollBy(0, step);
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    gsap.ticker.add(pay);

    let normalizer;
    if (ScrollTrigger.isTouch) {
      ScrollTrigger.config({ ignoreMobileResize: true });
      normalizer = ScrollTrigger.normalizeScroll({ type: 'touch', allowNestedScroll: true });
    }

    return () => {
      window.removeEventListener('wheel', onWheel);
      gsap.ticker.remove(pay);
      normalizer?.kill();
      smoother.kill();
    };
  }, []);

  // letter-roll hover on every text link and button
  useEffect(() => enableHoverRoll(), []);

  // the height of the screen that is actually visible, measured here and
  // handed to the stylesheet as --screen-h (see .h-screen-safe). css's own
  // units cannot be trusted for this on phones: 100vh includes the area
  // behind the browser's address bar, and the newer 100svh is missing or
  // wrong in older browsers and in the browsers built into apps. it is
  // re-measured when the screen's width changes (rotation, window resize)
  // but not on height-only changes, which on a phone are just the address
  // bar sliding and would make every full-height section jump mid-scroll
  useEffect(() => {
    let width = 0;
    const measure = () => {
      if (window.innerWidth === width) return;
      width = window.innerWidth;
      document.documentElement.style.setProperty('--screen-h', `${window.innerHeight}px`);
      ScrollTrigger.refresh();
    };
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('orientationchange', measure);
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('orientationchange', measure);
    };
  }, []);

  // the content only exists once the loading screen leaves - re-measure
  // every trigger against its real height
  useEffect(() => {
    if (!entered) return;
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [entered]);

  return (
    <>
      <Router>
        <PageTransitionProvider>
        <ScrollManager/>
        <Cursor/>
        {loading && <Preloader onExitStart={handleExitStart} onDone={handleDone}/>}
        {/* outside the smoother: its transformed content would make
          position: fixed scroll away with the page */}
        {entered && <Navbar/>}
        <div id='smooth-wrapper'>
          <div id='smooth-content'>
            {entered && (
              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/about' element={<AboutPage/>}/>
                <Route path='/work' element={<ProjectsPage/>}/>
                <Route path='/get-in-touch' element={<ContactPage/>}/>
                {/* the routes' earlier names */}
                <Route path='/projects' element={<Navigate to='/work' replace/>}/>
                <Route path='/contact' element={<Navigate to='/get-in-touch' replace/>}/>
                <Route path='/what-i-do' element={<WhatIDoPage/>}/>
                <Route path='/dailydiscount' element={<DailyDiscount/>}/>
                <Route path='/jbnza' element={<Jbnza/>}/>
                <Route path='/jaysonbeniza' element={<Jaysonbeniza/>}/>
                <Route path='/regain' element={<Regain/>}/>
                <Route path='/portfolio-2026' element={<ProjectPage project={PROJECTS.portfoliov3}/>}/>
                {/* case studies in progress */}
                <Route path='/tingi' element={<ProjectPage project={PROJECTS.tingi}/>}/>
                <Route path='/stocknear' element={<ProjectPage project={PROJECTS.stocknear}/>}/>
              </Routes>
            )}
          </div>
        </div>
        </PageTransitionProvider>
      </Router>
    </>
  );
}

export default App;
