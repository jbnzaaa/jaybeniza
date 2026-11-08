//
import React, { useEffect, useRef } from 'react'
// GSAP
import ScrollSmoother from 'gsap/ScrollSmoother'
// per-letter text split, and its reveal
import SplitText from './SplitText'
import { scrollReveal } from '../../utils/scrollReveal'

/**
 * A first screen's scroll cue: a text button, "Scroll" (`label`), rising
 * word by word as the screen comes in. Pressing it scrolls the page
 * smoothly to the section after the one it is in.
 */
function ScrollCue({ label = 'Scroll' }) {
  const fxCue = useRef();
  const id = useRef(`animate-scroll-cue-${Math.random().toString(36).slice(2, 8)}`).current;

  useEffect(() => {
    const reveal = scrollReveal(`#${id}`, { y: 0, stagger: .02, ease: 'power1.in' }, { trigger: fxCue.current, start: 'top bottom' });
    return () => reveal.kill();
  }, [id]);

  const toNext = (event) => {
    const next = event.currentTarget.closest('section')?.nextElementSibling;
    if (!next) return;
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(next, true, 'top top');
    else next.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button type='button' className='flex flex-wrap text-copy text-left' onClick={toNext} ref={fxCue}>
      <SplitText text={label} id={id} />
    </button>
  );
}

export default ScrollCue
