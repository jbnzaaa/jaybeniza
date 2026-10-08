//
import React, { useEffect } from 'react'
// Components
import Services from './Services';
import Process from './Process';
import Contact from './Contact';
// GSAP
import gsap from 'gsap'
import ScrollSmoother from 'gsap/ScrollSmoother'
// the site's button
import Button from '../common/Button'
// scroll reveal
import { scrollReveal } from '../../utils/scrollReveal'
// per-letter text split
import SplitText from '../common/SplitText'

gsap.registerPlugin(ScrollSmoother)

const HEADLINE_LINES = [
  'One hire.',
  'Design through front-end.',
];

const DESCRIPTION = 'What I can own on your team from day one: product design, the design system, and the front-end that ships it.';

/**
 * The What I Do page (route /what-i-do), in the landing page's layout: a
 * light first screen with the headline and, along its foot, a short
 * description (lower left) and an arrow on to the services (lower right), the three services (Services.jsx, the landing page's own
 * section, here with each service set out in full), how I work
 * (Process.jsx), then the contact section.
 */
function WhatIDoPage() {
  useEffect(() => {
    // the first screen is in view at load, so its reveal is triggered off
    // the section itself
    const intro = scrollReveal('#animate-services-page', { y: 0, stagger: .02, ease: 'power1.in' },
      { trigger: '#services-hero', start: 'top bottom' });
    return () => intro.kill();
  }, []);

  // the arrow scrolls on to the services
  const toServices = (e) => {
    e.preventDefault();
    ScrollSmoother.get()?.scrollTo('#what-i-do', true);
  };

  return (
    <>
      {/* first screen - headline at the top, description in the lower
        right. top padding clears the nav bar */}
      <section id='services-hero' className='theme-light flex flex-col justify-between min-h-screen-safe
        mobile:px-[1rem] mobile:pt-20 mobile:pb-8 mobile:gap-y-16
        tablet:px-[1rem] tablet:pt-20 tablet:pb-8 tablet:gap-y-16
        laptop:px-[2rem] laptop:pt-24 laptop:pb-10 laptop:gap-y-16
        laptop-lg:px-[3rem] laptop-lg:pt-24 laptop-lg:pb-12 laptop-lg:gap-y-16
        desktop:px-[3rem] desktop:pt-28 desktop:pb-12 desktop:gap-y-16'>
        <h1>
          {HEADLINE_LINES.map((line) => (
            <span key={line} className='hero-designerdev flex flex-wrap font-flexible font-bold leading-[.92] tracking-tight
              text-hero'>
              <SplitText text={line} id='animate-services-page' />
            </span>
          ))}
        </h1>
        {/* along the foot: description lower left, the landing hero's
          arrow on to the services lower right */}
        <div className='flex justify-between items-end gap-x-6'>
          <p className='flex flex-wrap text-caption
            mobile:w-[78%]
            tablet:w-[52%]
            laptop:w-[34%]
            laptop-lg:w-[30%]
            desktop:w-[28%]'>
            <SplitText text={DESCRIPTION} id='animate-services-page' by='word' />
          </p>
          <div className='shrink-0'>
            <Button label='See what I do' href='#what-i-do' onClick={toServices} iconOnly outline />
          </div>
        </div>
      </section>
      {/* the three services, in full */}
      <Services detailed/>
      {/* how I work */}
      <Process light/>
      <Contact/>
    </>
  )
}

export default WhatIDoPage
