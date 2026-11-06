//
import React, { useEffect, useState } from 'react'
import Hero from './Hero'
import Project from './Project';
import About from './About'
import Services from './Services';
import Testimonials from './Testimonials';
import Contact from './Contact';
// the tab's title
import { usePageTitle } from '../../utils/pageTitle'
// the page's triggers measured again once the rest is on it
import { refreshSoon } from '../../utils/scrollReveal'

// how long after the hero the rest of the page is put on it, in ms: long
// enough for the hero's title to be shown (its first line's block covers
// it in about .4s, pixelText.js), and then once the browser is idle
const REST_AFTER = 700;

/**
 * The sections under the first screen, put on the page a moment after the
 * hero. Set up all at once, every section's split text and animations
 * held the hero's title back: on a phone the page spent close to three
 * seconds of work before the title could be drawn. They are below the
 * fold, so nobody sees them arrive.
 */
function useRestOfPage() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let idle;
    const timer = setTimeout(() => {
      if (window.requestIdleCallback) idle = window.requestIdleCallback(() => setReady(true), { timeout: 1000 });
      else setReady(true);
    }, REST_AFTER);
    return () => {
      clearTimeout(timer);
      if (idle) window.cancelIdleCallback(idle);
    };
  }, []);
  return ready;
}

// the landing page, light and dark sections in turn: hero (light), the
// work (dark), the designer (light), what I do (dark), words from the
// team (light), then the closing contact screen (darkest)
function Home() {
  usePageTitle();
  const rest = useRestOfPage();
  // (the page is taller now: every trigger measured against it again)
  useEffect(() => {
    if (rest) refreshSoon();
  }, [rest]);
  return (
    <>
      <div className='overflow-hidden'>
        <Hero/>
        {rest && (
          <>
            <Project/>
            <About/>
            <Services detailed/>
            <Testimonials/>
            <Contact/>
          </>
        )}
      </div>
    </>
  )
}

export default Home
