//
import React, { useRef, useEffect, useState } from 'react'
// React Router DOM
import { useLocation } from 'react-router-dom'
// page-to-page wipe
import { TransitionLink } from '../common/PageTransition'
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollSmoother from 'gsap/ScrollSmoother'
// the site's button
import Button from '../common/Button'
// per-letter text split
import SplitText from '../common/SplitText'
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

// every destination. from tablet width up they are all in the bar itself;
// on a phone, where there is no room for them, they are in the menu. the
// logo is the way home, and each route is named after its link
const NAV_LINKS = [
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'What I Do', to: '/what-i-do' },
];
const CONTACT = '/get-in-touch';
const MENU_LINKS = [...NAV_LINKS, { label: 'Get in touch', to: CONTACT }];

// the open page is in the full text colour, the others a step back
const NAV_ITEM = 'nav-item font-monolisa leading-none';
const NAV_ITEM_IDLE = `${NAV_ITEM} text-muted`;

// what is shown from tablet width up, and what only on a phone
const FROM_TABLET = 'mobile:hidden';
const PHONE_ONLY = 'tablet:hidden laptop:hidden laptop-lg:hidden desktop:hidden';

// the bar's padding, shared by its layers so they line up
const BAR = `
  mobile:px-[1rem] mobile:py-2
  tablet:px-[1rem] tablet:py-2
  laptop:px-[2rem] laptop:py-4
  laptop-lg:px-[3rem] laptop-lg:py-4
  desktop:px-[3rem] desktop:py-4`;

/**
 * The top bar: logo left, links centre, the contact button right. It sits
 * over light and dark sections alike, so it is drawn in one light colour
 * and blended with the page by difference: over a dark section it stays
 * light, over a light one it turns dark, and the change follows a
 * section's edge up through the bar as the page scrolls. The contact
 * button is part of that too: a filled box that inverts with the logo.
 *
 * On a phone the links and the contact button give way to one Menu
 * button, which opens a panel over the page with all four in it.
 */
function Navbar() {
  const fxBar = useRef();
  const fxAction = useRef();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // the bar's letters rise in once, on mount. this is a plain tween, not
    // the scroll reveal the sections use: the bar is fixed, so a scroll
    // trigger on it gets re-measured at whatever scroll position a refresh
    // happens to run, and scrolling back up past that point then reversed
    // the reveal - the bar's text vanished
    const reveal = gsap.to('#animate-nav', { y: 0, duration: .5, stagger: .01, ease: 'power1.in' });
    return () => reveal.revert();
  }, []);

  useEffect(() => {
    // the closing contact + footer screen is a full page of its own, and
    // the bar goes behind it: the bar itself never moves, it is clipped
    // away from the bottom in step with the section's top edge passing up
    // over it, so the section appears to slide over the bar. (the bar is
    // fixed outside the smooth-scrolled content and always paints above
    // it, so it cannot literally sit behind the section.) re-created per
    // page, since each page has its own contact block
    const bar = fxBar.current;
    // a page with no such closing screen (the contact page, which is one)
    // keeps the bar throughout
    if (!document.querySelector('[data-nav-cover]')) return undefined;
    const cover = gsap.fromTo([bar, fxAction.current],
      { clipPath: 'inset(0% 0% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 100% 0%)',
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-nav-cover]',
          start: () => `top ${bar.offsetHeight}px`,
          end: 'top top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    return () => {
      cover.scrollTrigger?.kill();
      cover.revert();
    };
  }, [pathname]);

  // the menu closes when the page changes - under the page wipe, which is
  // over it by then
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // the page does not scroll behind the open menu
  useEffect(() => {
    ScrollSmoother.get()?.paused(menuOpen);
  }, [menuOpen]);

  // a link to the page already open has nowhere to go - it takes the page
  // back to its top instead of running the page wipe over itself
  const toTopIfHere = (to) => (e) => {
    if (pathname !== to) return;
    e.preventDefault();
    setMenuOpen(false);
    ScrollSmoother.get()?.paused(false);
    ScrollSmoother.get()?.scrollTo(0, true);
  };

  return (
    <>
      {/* navbar container */}
      <div className='nav-blend fixed top-0 left-0 w-full z-20 mix-blend-difference' ref={fxBar}>
        <nav aria-label='Main' className={`grid grid-cols-[1fr_auto_1fr] items-center gap-x-4 ${BAR}`}>
          {/* logo - left */}
          <div className='logo-container justify-self-start'>
            <TransitionLink to='/' onClick={toTopIfHere('/')} aria-label='Jay Beniza, home'>
              <span className='logo block font-flexible font-medium leading-none cursor-pointer tracking-tighter
                text-logo'>
                <SplitText text='jaybeniza' id='animate-nav' />
              </span>
            </TransitionLink>
          </div>
          {/* nav items - centre. the page that is open is brighter. on a
            phone they are in the menu instead */}
          <ul className={`flex items-center text-caption ${FROM_TABLET}
            tablet:gap-x-8
            laptop:gap-x-10
            laptop-lg:gap-x-12
            desktop:gap-x-12`}>
            {NAV_LINKS.map(({ label, to }) => (
              <li className='m-0' key={label}>
                <TransitionLink to={to} onClick={toTopIfHere(to)}
                  className={pathname === to ? NAV_ITEM : NAV_ITEM_IDLE}
                  aria-current={pathname === to ? 'page' : undefined}>
                  <SplitText text={label} id='animate-nav' />
                </TransitionLink>
              </li>
            ))}
          </ul>
          {/* right - the way to the contact page: filled, and blended
            like the logo, so it inverts with the section under it
            (.nav-blend, App.scss). revealed on mount. on a phone its
            place is taken by the Menu button in the layer below; an
            unseen copy of that keeps the bar's height */}
          <div className='col-start-3 justify-self-end'>
            <div className={FROM_TABLET}>
              <Button label='Get in touch' to={CONTACT} onClick={toTopIfHere(CONTACT)} small reveal='mount' />
            </div>
            <div className={`invisible ${PHONE_ONLY}`} aria-hidden='true'>
              <span className='cta-button cta-button-small text-caption'>Menu</span>
            </div>
          </div>
        </nav>
      </div>
      {/* the phone's menu - a black panel that wipes down over the page
        (.nav-menu, App.scss), under the Menu button that opens it */}
      <div className={`nav-menu ${menuOpen ? 'nav-menu-open' : ''} fixed inset-0 z-[21] flex flex-col justify-end bg-black px-[1rem] pt-20 pb-8 ${PHONE_ONLY}`}
        id='nav-menu' inert={menuOpen ? undefined : ''}>
        <ul className='flex flex-col'>
          {MENU_LINKS.map(({ label, to }) => (
            <li className='border-t border-rule m-0' key={label}>
              <TransitionLink to={to} onClick={toTopIfHere(to)}
                className={`block py-4 font-flexible font-medium leading-none text-[15vw] ${pathname === to ? '' : 'text-muted'}`}
                aria-current={pathname === to ? 'page' : undefined} data-no-hover-roll>
                {label}
              </TransitionLink>
            </li>
          ))}
        </ul>
      </div>
      {/* the phone's Menu button - black on every section (.nav-action,
        App.scss) and over its own panel, so outside the blended bar */}
      <div className={`nav-action fixed top-0 right-0 z-[22] ${BAR} ${PHONE_ONLY}`} ref={fxAction}>
        <button type='button' className='nav-menu-button cta-button cta-button-small text-caption font-monolisa uppercase'
          aria-expanded={menuOpen} aria-controls='nav-menu'
          onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>
    </>
  )
}

export default Navbar
