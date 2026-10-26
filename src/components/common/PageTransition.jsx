import React, { createContext, forwardRef, useCallback, useContext, useRef } from 'react'
// React Router DOM
import { Link, useNavigate } from 'react-router-dom'
// the new page's reveals wait behind the pixels
import { holdReveals, releaseReveals, COVER_LEFT } from '../../utils/scrollReveal'
// the screen's pixels
import { pixelSweep } from '../../utils/pixels'

const PageTransitionContext = createContext(null);

// how long the pixels take to cover the page and to clear off the new
// one, in seconds - long enough to be watched, as on the loading screen
const COVER = 1;
const CLEAR = 1.2;

// a beat under the pixels: time for the new page to be on screen and
// scrolled back to its top (the smooth scroller resets a tick after the
// route changes)
const settled = () => new Promise((resolve) => { setTimeout(resolve, 250); });

/**
 * The wipe between pages, in the loading screen's pixels (pixels.js): the
 * page is covered by square pixels switching on outward from the link that
 * was pressed - or from the top left, asked for from nowhere in
 * particular - the route changes underneath, then the pixels clear off the
 * new page from the top left, as they do off the first one. The new page
 * mounts under them, and its own reveals start once only a fifth of the
 * pixels are left (COVER_LEFT, scrollReveal.js).
 *
 * Must sit inside the Router and outside the smooth-scroll wrapper (whose
 * transformed content breaks position: fixed).
 */
export function PageTransitionProvider({ children }) {
  const navigate = useNavigate();
  const fxCanvas = useRef();
  const busy = useRef(false);

  const go = useCallback(async (to, from) => {
    if (busy.current) return;
    busy.current = true;
    const canvas = fxCanvas.current;
    // (it takes the presses while it is up, so nothing under it is pressed)
    canvas.style.pointerEvents = 'auto';
    // the middle of whatever was pressed
    const box = from?.getBoundingClientRect?.();
    const origin = box && box.width ? [box.left + box.width / 2, box.top + box.height / 2] : undefined;

    await pixelSweep(canvas, { cover: true, origin, duration: COVER });
    holdReveals();
    navigate(to);
    await settled();

    await pixelSweep(canvas, {
      duration: CLEAR,
      onUpdate: (at) => { if (at >= 1 - COVER_LEFT) releaseReveals(); },
    });
    releaseReveals();
    canvas.style.pointerEvents = 'none';
    busy.current = false;
  }, [navigate]);

  return (
    <PageTransitionContext.Provider value={go}>
      {children}
      <canvas className='fixed top-0 left-0 w-full h-screen-safe z-[44] pointer-events-none' ref={fxCanvas} aria-hidden='true'/>
    </PageTransitionContext.Provider>
  )
}

/**
 * A router Link that plays the pixel wipe before changing page. Modified
 * clicks (new tab, new window) are left to the browser. A ref lands on the
 * link itself.
 */
export const TransitionLink = forwardRef(function TransitionLink({ to, onClick, children, ...rest }, ref) {
  const go = useContext(PageTransitionContext);

  const handleClick = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    // (the link itself is handed on: the pixels spread from its middle)
    go(to, e.currentTarget);
  };

  return <Link to={to} onClick={handleClick} ref={ref} {...rest}>{children}</Link>
})
