//
import React, { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
// React Router DOM
import { useLocation } from 'react-router-dom'
import { HashLink as Link} from 'react-router-hash-link'
// page-to-page wipe
import { TransitionLink } from '../common/PageTransition'
// project pages
import { PROJECTS } from './projects/projects'
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
// the logo and the Menu button, at every breakpoint
const MENU_LINKS = [
  { label: 'Home', to: '/#' },
  { label: 'Work', to: '/#project' },
  { label: 'Experience', to: '/#work-experience' },
  { label: 'Certificates', to: '/#certificates-awards' },
  { label: 'Contact', to: '/#contact' },
  { label: 'Resume', to: Resume, external: true },
];

const PROJECT_PATHS = Object.values(PROJECTS).map((project) => project.path);

// the bar's right-hand button - Menu, or Return on a project page
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
  // on a project page the Menu button's place is taken by Return
  const onProject = PROJECT_PATHS.includes(pathname);

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
          trigger: '#contact',
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
    tl.to(fxMenuOpenAnimation.current, { height: '106vh', duration: .7, ease: 'power2.inOut' })
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
                <div className='flex overflow-x-hidden overflow-y-auto fixed inset-0 h-screen z-40'>
                  <div className='flex flex-col w-screen h-[0vh] bg-black fixed overflow-hidden'
                    ref={fxMenuOpenAnimation}>
                    <div className='h-[100vh]
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
                      <div className='flex flex-col w-full h-full justify-end pb-10'>
                        {MENU_LINKS.map(({ label, to, external }) => (
                          <div className='page-link' key={label}>
                            <Link to={to} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                              <div className='link'>
                                <span className='flex items-center text-[2.3rem] text-offwhite' onClick={closeMenu}>
                                  <SplitText text={label} id='mobile-nav-animate' />
                                  <span className='menu-icon-clip'>
                                    <span className='menu-icon' id='mobile-nav-animate'>
                                      <RiArrowRightDownLine id='icon' className='fill-offwhite ml-1 text-[60px]'/>
                                    </span>
                                  </span>
                                </span>
                              </div>
                            </Link>
                          </div>
                        ))}
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
