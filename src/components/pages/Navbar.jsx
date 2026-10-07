//
import React, { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
// React Router DOM
import { useLocation } from 'react-router-dom'
import { HashLink as Link} from 'react-router-hash-link'
// page-to-page wipe
import { TransitionLink } from '../common/PageTransition'
// icons
import {RiArrowRightDownLine} from 'react-icons/ri'
// Resume
import Resume from '../../assets/files/Jayson_Beniza.pdf'
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
// per-letter text split
import SplitText from '../common/SplitText'
gsap.registerPlugin(ScrollTrigger)

// every destination lives in the menu overlay - the bar itself only shows
// the logo and the Menu button, at every breakpoint. two groups: the
// site's own destinations, in the order the landing page runs (About
// opens its own page - which is also where the work experience and
// certificates live), then the links that leave the site
const MENU_LINKS = [
  { label: 'Home', to: '/#' },
  { label: 'About Me', to: '/about' },
  { label: 'Selected Projects', to: '/#project' },
  { label: 'Testimonials', to: '/#testimonials' },
  { label: 'Drop a Message', to: '/#contact' },
];
const MENU_EXTERNAL = [
  { label: 'Resume', href: Resume },
  { label: 'Behance', href: 'https://www.behance.net/jbnza' },
  { label: 'Linked In', href: 'https://www.linkedin.com/in/jaybeniza/' },
  { label: 'Github', href: 'https://github.com/jbnzaaa' },
];

// the bar's right-hand button - Menu, or Return on any other page
const NAV_BUTTON = `flex items-center font-flexible font-medium leading-none cursor-pointer tracking-tighter text-offwhite
  mobile:text-[1.6rem]
  tablet:text-[1.6rem]
  laptop:text-[1.8rem]
  laptop-lg:text-[1.8rem]
  desktop:text-[2rem]`;

function Navbar() {
  const fxMenuOpenAnimation = useRef();
  const fxMenuTimeline = useRef(null);
  const fxBar = useRef();

  const [showMenu, setShowMenu] = useState(false);
  const { pathname } = useLocation();
  // on every page but the landing page (a project, the about page) the
  // Menu button's place is taken by Return
  const onProject = pathname !== '/';

  useEffect(() => {
    // the bar's letters rise in once, on mount (and again when the
    // right-hand button swaps - its letters are new elements). this is a
    // plain tween, not the scroll reveal the sections use: the bar is
    // fixed, so a scroll trigger on it gets re-measured at whatever scroll
    // position a refresh happens to run, and scrolling back up past that
    // point then reversed the reveal - the bar's text vanished
    const reveal = gsap.to('#animate-nav', { y: 0, duration: .5, stagger: .02, ease: 'power1.in' });
    return () => reveal.revert();
  }, [onProject]);

  useEffect(() => {
    // the closing contact + footer screen is a full page of its own, and
    // the bar goes behind it: the bar itself never moves, it is clipped
    // away from the bottom in step with the section's top edge passing up
    // over it, so the section appears to slide over the bar. (the bar is
    // fixed outside the smooth-scrolled content and always paints above
    // it, so it cannot literally sit behind the section.) re-created per
    // page, since each page has its own contact block
    const bar = fxBar.current;
    const cover = gsap.fromTo(bar,
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

  useEffect(() => {
    // the menu overlay (and everything inside it, including the
    // #mobile-nav-animate links) only exists in the DOM while showMenu is
    // true, so skip entirely when it's closed - otherwise these target
    // nothing on every mount and log "GSAP target not found" warnings
    if (!showMenu) return;

    // one timeline for both directions: the panel drops in, then every
    // label and its arrow rise out of their clip boxes with the same
    // per-letter reveal the old nav buttons used (stagger .02, power1.in).
    // closing plays it backwards and only unmounts the overlay when the
    // reverse has finished
    const tl = gsap.timeline({ onReverseComplete: () => setShowMenu(false) });
    tl.to(fxMenuOpenAnimation.current, { height: '100%', duration: .7, ease: 'power2.inOut' })
      .to('#mobile-nav-animate', { y: 0, duration: .6, stagger: .02, ease: 'power1.in' }, '-=.1');
    fxMenuTimeline.current = tl;

    return () => {
      tl.kill();
      fxMenuTimeline.current = null;
    };
  }, [showMenu]);

  const closeMenu = () => {
    const tl = fxMenuTimeline.current;
    if (!tl) return setShowMenu(false);
    tl.timeScale(1.6).reverse();
  };

  return (
    <>
      {/* navbar container */}
      <div className='fixed top-0 left-0 w-full z-20 mix-blend-difference' ref={fxBar}>
      <div className='
          mobile:px-[.9rem]
          tablet:px-[1rem]
          laptop:px-[2rem]
          laptop-lg:px-[3rem]
          desktop:px-[3rem] '>
          {/* grid */}
          <div className='grid grid-cols-8 gap-0
            mobile:py-3
            tablet:py-3
            laptop:py-4
            laptop-lg:py-4
            desktop:py-4'>
            {/* Logo */}
            <section className='col-span-3 col-start-1'>
              <div className='logo-container'>
                <Link to='/#'>
                  <h1 className='logo font-flexible font-medium leading-none cursor-pointer tracking-tighter text-offwhite
                    mobile:text-[1.6rem]
                    tablet:text-[1.6rem]
                    laptop:text-[1.8rem]
                    laptop-lg:text-[1.8rem]
                    desktop:text-[2rem]'>
                    <SplitText text='jaybeniza' id='animate-nav' />
                  </h1>
                </Link>
              </div>
            </section>
            {/* menu button */}
            <section className='col-start-7 col-span-2'>
              <div className='flex justify-end' key={onProject ? 'return' : 'menu'}>
                {onProject ? (
                  <TransitionLink to='/' className={NAV_BUTTON}>
                    <SplitText text='Return' id='animate-nav' />
                  </TransitionLink>
                ) : (
                  <button type='button' aria-expanded={showMenu} className={NAV_BUTTON}
                    onClick={() => setShowMenu(true)}>
                    <SplitText text='Menu' id='animate-nav' />
                  </button>
                )}
              </div>
              {/* menu container - portalled to <body> so `fixed` is
                relative to the viewport: inside #smooth-content it would be
                relative to ScrollSmoother's transformed content instead,
                and open at the top of the page rather than over the screen */}
              {showMenu ? createPortal(
                <div className='fixed inset-0 overflow-hidden z-40'>
                  {/* the panel grows to the height of the fixed box above,
                    which is the part of the screen actually visible - not
                    100vh, which on a phone includes the area behind the
                    address bar and pushed the last link off the bottom */}
                  <div className='absolute top-0 left-0 w-full h-0 bg-black overflow-hidden'
                    ref={fxMenuOpenAnimation}>
                    {/* full visible height from the start, so the links hold
                      their place while the panel opens over them */}
                    <div className='flex flex-col h-screen-safe
                      mobile:px-[.9rem] mobile:py-3
                      tablet:px-[1rem] tablet:py-3
                      laptop:px-[2rem] laptop:py-4
                      laptop-lg:px-[3rem] laptop-lg:py-4
                      desktop:px-[3rem] desktop:py-4'>
                      {/* close button */}
                      <div className="menu-link">
                        <div className='flex w-full justify-end'>
                          <button type='button'
                            className='flex items-center font-flexible font-medium leading-none cursor-pointer tracking-tighter text-offwhite text-[1.6rem]'
                            onClick={closeMenu} >
                            <SplitText text='Close' id='mobile-nav-animate' />
                          </button>
                        </div>
                      </div>
                      {/* menu nav links */}
                      {/* takes the height left under the close button and
                        stacks the links at its bottom. their size is set on
                        .menu-row (App.scss) from the screen, so all six fit */}
                      <div className='flex flex-col flex-1 min-h-0 w-full justify-end pb-6'>
                        {MENU_LINKS.map(({ label, to }) => (
                          <div className='page-link menu-row' key={label}>
                            <Link to={to}>
                              <div className='link'>
                                <span className='flex items-center text-offwhite' onClick={closeMenu}>
                                  <SplitText text={label} id='mobile-nav-animate' />
                                  <span className='menu-icon-clip'>
                                    <span className='menu-icon' id='mobile-nav-animate'>
                                      <RiArrowRightDownLine id='icon' className='fill-offwhite ml-1 text-[1.5em]'/>
                                    </span>
                                  </span>
                                </span>
                              </div>
                            </Link>
                          </div>
                        ))}
                        {/* links that leave the site - a quieter row under
                          the destinations */}
                        <div className='menu-external flex flex-wrap gap-x-6 gap-y-1 mt-5 pt-4 font-monolisa
                          mobile:text-[.9rem]
                          tablet:text-[.9rem]
                          laptop:text-[1rem]
                          laptop-lg:text-[1rem]
                          desktop:text-[1.1rem]'>
                          {MENU_EXTERNAL.map(({ label, href }) => (
                            <div className='account-container' key={label}>
                              <div className='accounts'>
                                <a href={href} target='_blank' rel='noreferrer' className='text-offwhite' onClick={closeMenu}>
                                  <SplitText text={label} id='mobile-nav-animate' />
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>,
                document.body
              ) : null}
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
