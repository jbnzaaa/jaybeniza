// React
import React, { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom'
//
import './assets/styles/App.css';
// Pages
import Navbar from './components/pages/Navbar';
import Home from './components/pages/Home';
// the archive's list, for its projects' routes
import { ARCHIVE } from './components/pages/projects/archive';
// loading screen + page-to-page wipe
import Preloader from './components/common/Preloader';
import { PageTransitionProvider } from './components/common/PageTransition';
// the square cursor
import Cursor from './components/common/Cursor';
// the way back to the top, in the screen's lower right corner
import ToTop from './components/common/ToTop';
// button hover
import { enableHoverRoll } from './utils/hoverRoll';
// one re-measure of the page a frame, however many ask
import { refreshSoon } from './utils/scrollReveal';
// the pixels where one section meets the next
import { pixelEdges } from './utils/pixelEdges';
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollSmoother from 'gsap/ScrollSmoother'
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

// every page but the landing page is its own file, fetched when it is
// first needed - so the first visit downloads only what the landing page
// uses. once the landing page is up they are all fetched in the
// background (below), so moving to one never waits on the network
const PAGES = {
  about: () => import('./components/pages/AboutPage'),
  work: () => import('./components/pages/ProjectsPage'),
  contact: () => import('./components/pages/ContactPage'),
  archive: () => import('./components/pages/ArchivePage'),
  project: () => import('./components/pages/projects/ProjectPage'),
  dailydiscount: () => import('./components/pages/projects/DailyDiscount'),
  jaysonbeniza: () => import('./components/pages/projects/Jaysonbeniza'),
  jbnza: () => import('./components/pages/projects/Jbnza'),
  regain: () => import('./components/pages/projects/Regain'),
};
const AboutPage = lazy(PAGES.about);
const ProjectsPage = lazy(PAGES.work);
const ContactPage = lazy(PAGES.contact);
const ArchivePage = lazy(PAGES.archive);
const ProjectPage = lazy(PAGES.project);
const DailyDiscount = lazy(PAGES.dailydiscount);
const Jaysonbeniza = lazy(PAGES.jaysonbeniza);
const Jbnza = lazy(PAGES.jbnza);
const Regain = lazy(PAGES.regain);

// an archived project's page (/archive/<key>): the project page, for a key
// on the archive's list with a page (archive.js); any other sends to the
// archive
function ArchiveProject() {
  const { id } = useParams();
  return ARCHIVE.some((item) => item.id === id && !item.title)
    ? <ProjectPage id={id} key={id}/>
    : <Navigate to='/archive' replace/>;
}

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
    // (the refresh is shared with anything else asking for one this frame -
    // refreshSoon, scrollReveal.js)
    let live = true;
    refreshSoon(() => { if (live) toTop(); });
    return () => { live = false; };
  }, [location.pathname]);

  return null;
}

// where one section meets the next in another colour, the edge in pixels
// (pixelEdges.js) - laid again on each page
function PixelEdges() {
  const location = useLocation();
  useEffect(() => {
    const root = document.getElementById('smooth-content');
    return root ? pixelEdges(root) : undefined;
  }, [location.pathname]);
  return null;
}

function App() {
  // the page mounts when the loading screen starts to leave, so its
  // reveals play as the pixels clear instead of unseen behind them. the
  // loading screen plays on every load of the site, a reload included
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
      speed: .55,
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
    const WHEEL_MAX = 1800;
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
    // (what is owed is paid a share at a time - most of it within a
    // quarter of a second - so one light turn of the wheel starts gently
    // and tails off, instead of arriving all in the next frame)
    const SHARE = 6;
    const pay = (_time, delta) => {
      if (!owed) return;
      const most = WHEEL_MAX * delta / 1000;
      const step = gsap.utils.clamp(-most, most, owed * (1 - Math.exp(-SHARE * delta / 1000)));
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

  // the other pages, fetched in the background once the page is up and
  // the browser is idle (PAGES, above)
  useEffect(() => {
    if (!entered) return undefined;
    const fetchAll = () => Object.values(PAGES).forEach((page) => page().catch(() => {}));
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 1500));
    const cancel = window.cancelIdleCallback || clearTimeout;
    const id = idle(fetchAll);
    return () => cancel(id);
  }, [entered]);

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
      refreshSoon();
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
    if (entered) refreshSoon();
  }, [entered]);

  return (
    <>
      <Router>
        <PageTransitionProvider>
        <ScrollManager/>
        {entered && <PixelEdges/>}
        <Cursor/>
        {loading && <Preloader onExitStart={handleExitStart} onDone={handleDone}/>}
        {/* outside the smoother: its transformed content would make
          position: fixed scroll away with the page */}
        {entered && <Navbar/>}
        {entered && <ToTop/>}
        <div id='smooth-wrapper'>
          <div id='smooth-content'>
            {entered && (
              /* (a page not fetched yet shows nothing for the moment it takes) */
              <Suspense fallback={null}>
              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/about' element={<AboutPage/>}/>
                <Route path='/work' element={<ProjectsPage/>}/>
                <Route path='/archive' element={<ArchivePage/>}/>
                <Route path='/archive/:id' element={<ArchiveProject/>}/>
                <Route path='/get-in-touch' element={<ContactPage/>}/>
                {/* the routes' earlier names */}
                <Route path='/projects' element={<Navigate to='/work' replace/>}/>
                <Route path='/contact' element={<Navigate to='/get-in-touch' replace/>}/>
                {/* the What I Do page is gone: its services are on the landing page */}
                <Route path='/what-i-do' element={<Navigate to='/' replace/>}/>
                <Route path='/dailydiscount' element={<DailyDiscount/>}/>
                <Route path='/jbnza' element={<Jbnza/>}/>
                <Route path='/jaysonbeniza' element={<Jaysonbeniza/>}/>
                <Route path='/regain' element={<Regain/>}/>
                <Route path='/portfolio-2026' element={<ProjectPage id='portfoliov3'/>}/>
                {/* work shown with permission (projects.js) */}
                <Route path='/gurover' element={<ProjectPage id='gurover'/>}/>
                <Route path='/comelec-acm' element={<ProjectPage id='comelec'/>}/>
                <Route path='/psgs' element={<ProjectPage id='psgs'/>}/>
                <Route path='/pci-central-app' element={<ProjectPage id='pci'/>}/>
                <Route path='/aaccup' element={<ProjectPage id='aaccup'/>}/>
                <Route path='/dost-arise' element={<ProjectPage id='arise'/>}/>
                {/* case studies in progress */}
                {/* (the project's key is still its first name, tingi; so is
                  its old address, which is sent on) */}
                <Route path='/bitewise' element={<ProjectPage id='tingi'/>}/>
                <Route path='/tingi' element={<Navigate to='/bitewise' replace/>}/>
                {/* (StockNear is hidden for now; its case study stays in projects.js) */}
                <Route path='/stocknear' element={<Navigate to='/work' replace/>}/>
                {/* anything else: back to the landing page */}
                <Route path='*' element={<Navigate to='/' replace/>}/>
              </Routes>
              </Suspense>
            )}
          </div>
        </div>
        </PageTransitionProvider>
      </Router>
    </>
  );
}

export default App;
