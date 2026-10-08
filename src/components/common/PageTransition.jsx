import React, { createContext, forwardRef, useCallback, useContext, useRef } from 'react'
// React Router DOM
import { Link, useNavigate } from 'react-router-dom'
// GSAP
import gsap from 'gsap'

const PageTransitionContext = createContext(null);

/**
 * Black panel wipe between pages, in the same language as the loading
 * screen and the menu: the panel rises from the bottom edge to cover the
 * page, the route changes underneath it, then it collapses upward off the
 * new page - which mounts as the panel starts to lift, so its own reveals
 * play in view. Must sit inside the Router and outside the smooth-scroll
 * wrapper (whose transformed content breaks position: fixed).
 */
export function PageTransitionProvider({ children }) {
  const navigate = useNavigate();
  const fxPanel = useRef();
  const busy = useRef(false);

  const go = useCallback((to) => {
    if (busy.current) return;
    busy.current = true;
    const panel = fxPanel.current;
    gsap.timeline({ onComplete: () => { busy.current = false; } })
      .set(panel, { top: 'auto', bottom: 0, height: 0 })
      .to(panel, { height: '100vh', duration: .6, ease: 'power2.inOut' })
      .call(() => navigate(to))
      .set(panel, { top: 0, bottom: 'auto' })
      .to(panel, { height: 0, duration: .7, ease: 'power2.inOut' }, '+=.1');
  }, [navigate]);

  return (
    <PageTransitionContext.Provider value={go}>
      {children}
      <div className='fixed left-0 w-full h-0 bg-black z-[44]' ref={fxPanel} aria-hidden='true'/>
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
    go(to);
  };

  return <Link to={to} onClick={handleClick} ref={ref} {...rest}>{children}</Link>
})
