//
import React, { useEffect, useRef } from 'react'
// Components
import AboutParagraph from './about/AboutParagraph';
// icons
import {RiArrowRightDownLine} from 'react-icons/ri'
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
// page-to-page wipe
import { TransitionLink } from '../common/PageTransition'
// per-letter text split
import SplitText from '../common/SplitText'
gsap.registerPlugin(ScrollTrigger)

// share of the pinned scroll the text fill takes; the rest holds the
// filled text in place while the link reveals
const FILL_END = .7;

/**
 * The landing page's introduction: a full-width black screen that pins
 * while its text fills in. Where the hero is a statement of what I do,
 * this is who I am - a small greeting, a career paragraph
 * and a link through to the full About page (AboutPage.jsx).
 */
function About() {
  const fxSection = useRef();

  useEffect(() => {
    const section = fxSection.current;

    // the link - the page's letter-by-letter reveal. held back until
    // the paragraph has filled, and taken away again if the page is
    // scrolled back above that point
    const details = gsap.timeline({ paused: true })
      .to('#animate-about-link', { y: 0, duration: .5, stagger: .02, ease: 'power1.in' });
    let filled = false;
    const showDetails = (show) => {
      if (show === filled) return;
      filled = show;
      if (show) details.timeScale(1).play();
      else details.timeScale(2).reverse();
    };

    // text fill - scroll-coupled. the section pins at the top of the screen
    // with its greeting and paragraph on the page but faded right back, and
    // scrolling brings each letter up to full strength in reading order.
    // refreshPriority puts this pin ahead of everything below it (it is
    // also above the projects section's pin, which uses 1)
    const fill = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: ScrollTrigger.isTouch ? .5 : true,
        anticipatePin: 1,
        refreshPriority: 2,
        onUpdate: (self) => showDetails(self.progress >= FILL_END),
      },
    })
      .fromTo('#animate-about-fill',
        { opacity: .14 },
        { opacity: 1, duration: .06, stagger: { amount: FILL_END - .06 } }, 0)
      .to({}, { duration: 1 - FILL_END }, FILL_END);

    return () => {
      fill.scrollTrigger?.kill();
      fill.revert();
      details.revert();
    };
  }, []);

  return (
    <>
      {/* about container - full width, one screen tall, black */}
      <div id='about'>
        <section className='flex flex-col justify-between h-screen-safe bg-black overflow-hidden pt-[6rem]
          mobile:px-[.9rem] mobile:pb-8
          tablet:px-[1rem] tablet:pb-10
          laptop:px-[2rem] laptop:pb-10
          laptop-lg:px-[3rem] laptop-lg:pb-12
          desktop:px-[3rem] desktop:pb-14'
          ref={fxSection}>
          {/* greeting + paragraph - the text that fills in */}
          <div className='about-fill'>
            {/* greeting - a label for the paragraph, not a second headline */}
            <div className='flex flex-wrap
              mobile:mb-4 mobile:text-[8vw]
              tablet:mb-5 tablet:text-[6vw]
              laptop:mb-6 laptop:text-[4vw]
              laptop-lg:mb-6 laptop-lg:text-[3.6vw]
              desktop:mb-8 desktop:text-[3.6vw]'>
              <span className='font-flexible font-medium leading-none text-offwhite'>
                <SplitText text="Hello, I'm Jay" id='animate-about-fill' />
              </span>
            </div>
            {/* about me */}
            <div className='
              mobile:w-full
              tablet:w-[92%]
              laptop:w-[88%]
              laptop-lg:w-[86%]
              desktop:w-[82%]'>
              <AboutParagraph/>
            </div>
          </div>
          {/* link to the full about page - at the end of the section, on
            the left */}
          <div className='flex justify-start'>
            {/* the menu links' markup - their hover is the one made for a
              dark background */}
            <div className='page-link selected-link shrink-0'>
              <TransitionLink to='/about' className='inline-block'>
                <div className='link'>
                  <span className='flex items-center text-offwhite
                    mobile:text-[.9rem]
                    tablet:text-[.9rem]
                    laptop:text-[1rem]
                    laptop-lg:text-[1rem]
                    desktop:text-[1.1rem]'>
                    <SplitText text='More about me' id='animate-about-link' />
                    <span className='menu-icon-clip'>
                      <span className='menu-icon' id='animate-about-link'>
                        <RiArrowRightDownLine id='icon' className='fill-offwhite ml-1 text-2xl'/>
                      </span>
                    </span>
                  </span>
                </div>
              </TransitionLink>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default About
