import React, { createContext, forwardRef, useCallback, useContext, useRef } from 'react'
// React Router DOM
import { Link, useNavigate } from 'react-router-dom'
// GSAP
import gsap from 'gsap'
// the new page's reveals wait behind the panel
import { holdReveals, releaseReveals, releaseWhenLifted } from '../../utils/scrollReveal'

const PageTransitionContext = createContext(null);

// the two grounds of the site, and the panel colour that shows against each
const DARK = '#1B1A1A';
const LIGHT = '#F1F1F1';
const against = (ground) => (ground === 'light' ? DARK : LIGHT);

// whether the page is light or dark at a height of the screen (px from its
// top), read from what is actually there - the fixed layers over the page
// (the bar, the panels, the cursor) are looked past. the phone's open menu
// is a dark screen of its own
const groundAt = (y, x = window.innerWidth / 2) => {
  if (document.querySelector('.nav-menu-open')) return 'dark';
  const under = document.elementsFromPoint(x, y).find((el) => el.closest('#smooth-content'));
  return under?.closest('.theme-light') ? 'light' : 'dark';
};

// whether the page now mounted starts light or dark: its first section's
// own ground. read from the page itself and not from the screen, which
// under the panel may not have been scrolled back to the top yet
const groundOfHead = () => (document.querySelector('#smooth-content section')?.closest('.theme-light') ? 'light' : 'dark');

// a beat under the panel: time for the new page to be on screen and
// scrolled back to its top (the smooth scroller resets a tick after the
// route changes), so its head can be read
const settled = () => new Promise((resolve) => { setTimeout(resolve, 200); });

/**
 * The panel wipe between pages, in the same language as the loading screen
 * and the menu: a panel rises from the bottom edge to cover the page, the
 * route changes underneath it, then it collapses upward off the new page -
 * which mounts as the panel starts to lift, so its own reveals play in
 * view.
 *
 * The panel is always in the colour that shows against the page: dark over
 * a light screen, light over a dark one. When the page being left and the
 * page arrived at are on different grounds (the foot of a case study is
 * dark, the head of the next one light), a second panel in the other
 * colour rises over the first before they lift, so both halves of the
 * wipe are seen.
 *
 * Must sit inside the Router and outside the smooth-scroll wrapper (whose
 * transformed content breaks position: fixed).
 */
export function PageTransitionProvider({ children }) {
  const navigate = useNavigate();
  const fxPanel = useRef();
  const fxSecond = useRef();
  const busy = useRef(false);

  const go = useCallback(async (to, from) => {
    if (busy.current) return;
    busy.current = true;
    const first = fxPanel.current;
    const second = fxSecond.current;
    // where the wipe starts: the middle of whatever was pressed. the
    // panel opens out from that point - a box growing from it to the
    // edges of the screen, all four reached together - so the page is
    // covered from the link that was chosen, not from a fixed edge.
    // (asked for from nowhere in particular, it rises from the foot of
    // the screen, as it always did)
    const box = from?.getBoundingClientRect?.();
    const origin = box && box.width ? [box.left + box.width / 2, box.top + box.height / 2] : null;
    const rise = (panel, colour, duration) => {
      if (!origin) {
        gsap.set(panel, { top: 'auto', bottom: 0, height: 0, clipPath: 'none', backgroundColor: colour });
        return gsap.to(panel, { height: '100vh', duration, ease: 'power2.inOut' });
      }
      const [x, y] = origin, w = window.innerWidth, h = window.innerHeight;
      gsap.set(panel, {
        top: 0, bottom: 'auto', height: '100vh', backgroundColor: colour,
        clipPath: `inset(${y}px ${w - x}px ${h - y}px ${x}px)`,
      });
      return gsap.to(panel, { clipPath: 'inset(0px 0px 0px 0px)', duration, ease: 'power2.inOut' });
    };

    // cover the page. opened from a link, the panel is always the dark
    // one - the loading screen's own - wherever on the site the link is:
    // one wipe for every link. (it used to take the colour that showed
    // against the ground it started on, so a link in a dark section got a
    // light panel and then a dark one over it, where the same link in the
    // top bar got the dark one alone.) rising from the foot of the screen,
    // with no link to start from, it still goes by what is there
    const cover = origin ? DARK : against(groundAt(window.innerHeight - 8));
    await rise(first, cover, .6);
    // the new page's reveals wait behind the panel: they start when only
    // a fifth of it is still on screen (COVER_LEFT, scrollReveal.js)
    holdReveals();
    navigate(to);
    await settled();

    // lift off the new page, in the colour that shows against its head -
    // where the panel goes out. if that is not the colour already there,
    // the second panel brings it in first
    const lift = against(groundOfHead());
    let panel = first;
    if (lift !== cover) {
      await rise(second, lift, .5);
      gsap.set(first, { height: 0 });
      panel = second;
    }
    // (it leaves by its height, upward; whatever it opened through is taken off)
    gsap.set([first, second], { clipPath: 'none' });
    gsap.set(panel, { top: 0, bottom: 'auto' });
    await gsap.to(panel, { height: 0, duration: .7, ease: 'power2.inOut', delay: .1, onUpdate: () => releaseWhenLifted(panel) });
    releaseReveals();
    busy.current = false;
  }, [navigate]);

  return (
    <PageTransitionContext.Provider value={go}>
      {children}
      <div className='fixed left-0 w-full h-0 z-[44]' ref={fxPanel} aria-hidden='true'/>
      <div className='fixed left-0 w-full h-0 z-[44]' ref={fxSecond} aria-hidden='true'/>
    </PageTransitionContext.Provider>
  )
}

/**
 * A router Link that plays the panel wipe before changing page. Modified
 * clicks (new tab, new window) are left to the browser. A ref lands on the
 * link itself.
 */
export const TransitionLink = forwardRef(function TransitionLink({ to, onClick, children, ...rest }, ref) {
  const go = useContext(PageTransitionContext);

  const handleClick = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    // (the link itself is handed on: the wipe opens from its middle)
    go(to, e.currentTarget);
  };

  return <Link to={to} onClick={handleClick} ref={ref} {...rest}>{children}</Link>
})
