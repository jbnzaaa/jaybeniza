import React, { useEffect, useRef } from 'react'
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollSmoother from 'gsap/ScrollSmoother'
// the site's button
import Button, { BUTTON_PARTS } from './Button'
// the kerning game's button, held beside the arrow
import KerningGame from './KerningGame'
// its letters open in pixels as they rise
import { pixelText, withPixels } from '../../utils/pixelText'
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

/**
 * The way back to the top: the site's button, its arrow alone and
 * pointing up (the top bar's arrow, turned), held in
 * the screen's lower right corner whatever is scrolled under it. It is
 * drawn as the top bar is, light and blended with the page by difference
 * (.nav-blend, App.css), so it shows over light and dark sections alike.
 * The kerning game's button sits to its left and opens and shuts with it.
 * It opens once the page has been scrolled a screen down, and shuts again
 * nearer the top than that.
 */
function ToTop() {
  const fxBox = useRef();

  useEffect(() => {
    const buttons = fxBox.current.querySelectorAll('.cta-button');
    const parts = fxBox.current.querySelectorAll(BUTTON_PARTS);
    const mask = pixelText(parts);
    // its reveal, the one every button has (Button.jsx), played on and back
    const open = gsap.timeline({ paused: true })
      .fromTo(buttons, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut', duration: .5 })
      .to(parts, withPixels({ y: 0, ease: 'power1.in', duration: .4 }, mask), '<.15');
    const trigger = ScrollTrigger.create({
      start: () => window.innerHeight,
      end: 'max',
      onToggle: (self) => {
        // (shut, it is not there to be pressed)
        fxBox.current.style.pointerEvents = self.isActive ? 'auto' : 'none';
        if (self.isActive) open.play();
        else open.reverse();
      },
    });
    return () => {
      trigger.kill();
      open.revert();
      mask?.clear();
    };
  }, []);

  const toTop = () => {
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(0, true);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='nav-blend to-top-row fixed z-[22] flex items-center gap-x-2 mix-blend-difference pointer-events-none
      mobile:right-[1rem] mobile:bottom-[1rem]
      tablet:right-[1rem] tablet:bottom-[1rem]
      laptop:right-[2rem] laptop:bottom-[2rem]
      laptop-lg:right-[3rem] laptop-lg:bottom-[2rem]
      desktop:right-[3rem] desktop:bottom-[2rem]' ref={fxBox}>
      <KerningGame reveal='manual' id='kerning-open' />
      <Button label='Back to top' iconOnly arrow='up' onClick={toTop} reveal='manual' id='to-top' outline />
    </div>
  )
}

export default ToTop
