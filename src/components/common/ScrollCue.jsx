//
import React from 'react'
// GSAP
import ScrollSmoother from 'gsap/ScrollSmoother'
// the site's button
import Button from './Button'

/**
 * A first screen's scroll cue, as a button: its label says what is below
 * (`label`), and pressing it scrolls the page smoothly to the section
 * after the one it is in. It carries the site's own arrow, as the nav
 * bar's button does.
 */
function ScrollCue({ label }) {
  const toNext = (event) => {
    const next = event.currentTarget.closest('section')?.nextElementSibling;
    if (!next) return;
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(next, true, 'top top');
    else next.scrollIntoView({ behavior: 'smooth' });
  };

  return <Button label={label} onClick={toNext} outline />
}

export default ScrollCue
