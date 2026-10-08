//
import React, { useRef, useEffect } from 'react'
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
// icons
import { RiArrowRightDownLine } from 'react-icons/ri'
// per-letter text split
import SplitText from '../common/SplitText'
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

// every destination is in the bar itself - nothing is behind a menu. the
// logo is the way home, and each route is named after its link. a
// `compact` link is left out on a phone, where there is no room for it
// beside the button
const NAV_LINKS = [
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'What I Do', to: '/what-i-do', compact: true },
];
const CONTACT = '/get-in-touch';

// the open page is in the full text colour, the others a step back
const NAV_ITEM = 'nav-item font-monolisa leading-none';
const NAV_ITEM_IDLE = `${NAV_ITEM} text-muted`;

/**
 * The top bar: logo left, links centre, the contact button right. It sits
 * over light and dark sections alike, so it is drawn in one light colour
 * and blended with the page by difference: over a dark section it stays
 * light, over a light one it turns dark, and the change follows a
 * section's edge up through the bar as the page scrolls. The button is
 * not part of that: it is always black, so it sits in a layer of its
 * own, over the bar and not blended.
 */
function Navbar() {
  const fxBar = useRef();
  const fxAction = useRef();
  const { pathname } = useLocation();

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

  // a link to the page already open has nowhere to go - it takes the page
  // back to its top instead of running the page wipe over itself
  const toTopIfHere = (to) => (e) => {
    if (pathname !== to) return;
    e.preventDefault();
    ScrollSmoother.get()?.scrollTo(0, true);
  };

  return (
    <>
      {/* navbar container */}
      <div className='nav-blend fixed top-0 left-0 w-full z-20 mix-blend-difference' ref={fxBar}>
        <nav aria-label='Main' className='grid grid-cols-[1fr_auto_1fr] items-center gap-x-4
          mobile:px-[1rem] mobile:py-2
          tablet:px-[1rem] tablet:py-2
          laptop:px-[2rem] laptop:py-4
          laptop-lg:px-[3rem] laptop-lg:py-4
          desktop:px-[3rem] desktop:py-4'>
          {/* logo - left */}
          <div className='logo-container justify-self-start'>
            <TransitionLink to='/' onClick={toTopIfHere('/')} aria-label='Jay Beniza, home'>
              <span className='logo block font-flexible font-medium leading-none cursor-pointer tracking-tighter
                mobile:text-[1.4rem]
                tablet:text-[1.6rem]
                laptop:text-[1.6rem]
                laptop-lg:text-[1.6rem]
                desktop:text-[1.8rem]'>
                <SplitText text='jaybeniza' id='animate-nav' />
              </span>
            </TransitionLink>
          </div>
          {/* nav items - centre. the page that is open is brighter */}
          <ul className='flex items-center text-caption
            mobile:gap-x-4
            tablet:gap-x-8
            laptop:gap-x-10
            laptop-lg:gap-x-12
            desktop:gap-x-12'>
            {NAV_LINKS.map(({ label, to, compact }) => (
              <li className={compact ? 'm-0 mobile:hidden' : 'm-0'} key={label}>
                <TransitionLink to={to} onClick={toTopIfHere(to)}
                  className={pathname === to ? NAV_ITEM : NAV_ITEM_IDLE}
                  aria-current={pathname === to ? 'page' : undefined}>
                  <SplitText text={label} id='animate-nav' />
                </TransitionLink>
              </li>
            ))}
          </ul>
          {/* right - the button's place: an unseen copy of it, which
            gives the bar its height and keeps the links clear of the
            real button in the layer below */}
          <div className='justify-self-end invisible' aria-hidden='true'>
            <span className='cta-button cta-button-small text-caption'>
              Get in touch
              <span className='menu-icon-clip'>
                <RiArrowRightDownLine className='ml-2 text-base'/>
              </span>
            </span>
          </div>
        </nav>
      </div>
      {/* the way to the contact page - black on every section (.nav-action,
        App.scss), so outside the blended bar. revealed on mount */}
      <div className='nav-action fixed top-0 right-0 z-20
        mobile:px-[1rem] mobile:py-2
        tablet:px-[1rem] tablet:py-2
        laptop:px-[2rem] laptop:py-4
        laptop-lg:px-[3rem] laptop-lg:py-4
        desktop:px-[3rem] desktop:py-4'
        ref={fxAction}>
        <Button label='Get in touch' to={CONTACT} onClick={toTopIfHere(CONTACT)} small reveal='mount' />
      </div>
    </>
  )
}

export default Navbar
