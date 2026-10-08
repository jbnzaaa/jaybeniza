//
import React, { useEffect } from 'react'
// Components
import Services from './Services';
import Process from './Process';
import Contact from './Contact';
// scroll reveal
import { scrollReveal } from '../../utils/scrollReveal'
// per-letter text split
import SplitText from '../common/SplitText'

const HEADLINE_LINES = [
  'What I do.',
  'How I can help.',
];

const DESCRIPTION = 'Three things I can take on for you: designing the product, building the system behind it, and writing the front-end that ships it.';

/**
 * The What I Do page (route /what-i-do), in the landing page's layout: a
 * light first screen with the headline and a short description, the three
 * services (Services.jsx, the landing page's own section), how I work
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

  return (
    <>
      {/* first screen - the landing hero's layout: headline at the top,
        description along the bottom. top padding clears the nav bar */}
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
        <p className='flex flex-wrap text-caption
          mobile:w-[78%]
          tablet:w-[52%]
          laptop:w-[34%]
          laptop-lg:w-[30%]
          desktop:w-[28%]'>
          <SplitText text={DESCRIPTION} id='animate-services-page' by='word' />
        </p>
      </section>
      {/* the three services */}
      <Services/>
      {/* how I work */}
      <Process light/>
      <Contact/>
    </>
  )
}

export default WhatIDoPage
