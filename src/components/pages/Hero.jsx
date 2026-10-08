//
import React, { useEffect } from 'react'
// GSAP
import ScrollSmoother from 'gsap/ScrollSmoother'
// scroll reveal - same helper every other section on the site uses
import { scrollReveal } from '../../utils/scrollReveal'
// the site's button
import Button from '../common/Button'
// per-letter text split
import SplitText from '../common/SplitText'

const HIGHLIGHT_TEXT = 'UI/UX designer with 3+ years shipping web and mobile apps, from first user flow to live front-end. Open to full-time roles.';

const PROFESSION_LINES = [
  'Designing the right experience.',
  'Building the right interface.',
];

/**
 * The landing page's first screen, on the light theme: the headline at the
 * top, and along the bottom a short description on the left and an arrow
 * on the right that carries on to the projects.
 */
function Hero() {
  useEffect(() => {
    // the whole hero is on screen at load, so both reveals are triggered
    // off the section itself: scrollReveal()'s isActive safety net plays
    // them at once. (triggered off its own letters, the headline's first
    // letter - dropped below its clip box - could sit past the trigger line)
    const profession = scrollReveal('#animate-hero-profession', { y: 0, stagger: .02, ease: 'power1.in' },
      { trigger: '#hero', start: 'top bottom' });
    const highlight = scrollReveal('#animate-hero-highlight', { y: 0, stagger: .02, ease: 'power1.in' },
      { trigger: '#hero', start: 'top bottom' });

    return () => {
      profession.kill();
      highlight.kill();
    };
  }, []);

  // the arrow scrolls on to the projects
  const toProjects = (e) => {
    e.preventDefault();
    ScrollSmoother.get()?.scrollTo('#project', true);
  };

  return (
    <>
      {/* hero container - one screen tall. top padding clears the nav bar */}
      <section id='hero' className='theme-light flex flex-col justify-between min-h-screen-safe
        mobile:px-[1rem] mobile:pt-20 mobile:pb-8 mobile:gap-y-16
        tablet:px-[1rem] tablet:pt-20 tablet:pb-8 tablet:gap-y-16
        laptop:px-[2rem] laptop:pt-24 laptop:pb-10 laptop:gap-y-16
        laptop-lg:px-[3rem] laptop-lg:pt-24 laptop-lg:pb-12 laptop-lg:gap-y-16
        desktop:px-[3rem] desktop:pt-28 desktop:pb-12 desktop:gap-y-16'>
        {/* headline */}
        <h1>
          {PROFESSION_LINES.map((line) => (
            <span key={line} className='hero-designerdev flex flex-wrap font-flexible font-bold leading-[.92] tracking-tight
              text-hero'>
              <SplitText text={line} id='animate-hero-profession' />
            </span>
          ))}
        </h1>
        {/* description left, arrow on to the projects right */}
        <div className='flex justify-between items-end gap-x-6'>
          <p className='flex flex-wrap text-caption
            mobile:w-[78%]
            tablet:w-[52%]
            laptop:w-[34%]
            laptop-lg:w-[30%]
            desktop:w-[28%]'>
            <SplitText text={HIGHLIGHT_TEXT} id='animate-hero-highlight' by='word' />
          </p>
          <div className='shrink-0'>
            <Button label='See selected projects' href='#project' onClick={toProjects} iconOnly outline />
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
