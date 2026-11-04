//
import React from 'react'
// GSAP
import ScrollSmoother from 'gsap/ScrollSmoother'
// the site's button
import Button from './Button'

/**
 * A first screen's scroll cue: the site's button, outlined, its label
 * saying what is below (`label`). Pressing it scrolls the page smoothly
 * to the section after the one it is in. It reveals as every button does
 * (Button.jsx).
 */
function ScrollCue({ label }) {
  const toNext = (event) => {
    const next = event.currentTarget.closest('section')?.nextElementSibling;
    if (!next) return;
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(next, true, 'top top');
    else next.scrollIntoView({ behavior: 'smooth' });
  };

  return <Button label={label} onClick={toNext} outline />;
}

export default ScrollCue
