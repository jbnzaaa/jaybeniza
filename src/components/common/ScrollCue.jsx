//
import React, { useEffect, useRef } from 'react'
// GSAP
import ScrollSmoother from 'gsap/ScrollSmoother'
// scroll reveal
import { scrollReveal } from '../../utils/scrollReveal'
// per-letter text split
import SplitText from './SplitText'

/**
 * A first screen's scroll cue, as text alone - no box, no arrow: its
 * label says what is below (`label`), and pressing it scrolls the page
 * smoothly to the section after the one it is in. Its letters rise as it
 * comes into view, like all text, and roll under the pointer like every
 * text button (hoverRoll.js).
 */
function ScrollCue({ label }) {
  const fxCue = useRef();

  useEffect(() => {
    const cue = fxCue.current;
    const reveal = scrollReveal(cue.querySelectorAll('.split-letter'), { y: 0, stagger: .02, ease: 'power1.in' }, { trigger: cue });
    return () => reveal.kill();
  }, []);

  const toNext = (event) => {
    const next = event.currentTarget.closest('section')?.nextElementSibling;
    if (!next) return;
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(next, true, 'top top');
    else next.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button type='button' className='scroll-cue flex text-caption' onClick={toNext} ref={fxCue}>
      <SplitText text={label} id='scroll-cue' />
    </button>
  )
}

export default ScrollCue
