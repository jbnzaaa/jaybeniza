import React, { useEffect, useRef } from 'react'
// GSAP
import gsap from 'gsap'

// what the square grows over: anything that can be pressed
const PRESSABLE = 'a, button, [role="button"], [data-hairline]';

/**
 * The site's cursor: a small square that follows the pointer in place of
 * the browser's arrow, and grows over anything that can be pressed. It is
 * blended with the page by difference, like the top bar, so it reads on
 * light and dark sections alike. Only where there is a pointer that
 * hovers - a touch screen keeps its own behaviour (.cursor, App.scss).
 */
function Cursor() {
  const fxCursor = useRef();

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    const cursor = fxCursor.current;
    document.documentElement.classList.add('has-cursor');
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    // it trails the pointer a touch, so it reads as a thing and not a dot
    const toX = gsap.quickTo(cursor, 'x', { duration: .25, ease: 'power3.out' });
    const toY = gsap.quickTo(cursor, 'y', { duration: .25, ease: 'power3.out' });
    let shown = false;

    const move = (e) => {
      toX(e.clientX);
      toY(e.clientY);
      if (!shown) {
        // first sight of the pointer: start where it is, not at the corner
        shown = true;
        gsap.set(cursor, { x: e.clientX, y: e.clientY });
        gsap.to(cursor, { autoAlpha: 1, duration: .2 });
      }
      const over = !!e.target.closest?.(PRESSABLE);
      gsap.to(cursor, { scale: over ? 2.5 : 1, duration: .3, ease: 'power2.out', overwrite: 'auto' });
    };
    const leave = () => {
      shown = false;
      gsap.to(cursor, { autoAlpha: 0, duration: .2 });
    };
    const press = () => gsap.to(cursor, { rotate: '+=90', duration: .4, ease: 'power2.out' });

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerdown', press);
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', press);
      document.documentElement.removeEventListener('pointerleave', leave);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  return <div className='cursor' ref={fxCursor} aria-hidden='true'/>
}

export default Cursor
