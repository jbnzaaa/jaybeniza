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

// (what the headline does not say: how long, what kind of work, and that I am available)
const HIGHLIGHT_TEXT = 'A UI/UX designer with 3.5+ years of experience crafting digital experiences for web and mobile products. Open to freelance and full-time roles.';

// the headline, broken into two set lines from tablet width up. on a
// phone it is one sentence left to wrap where the screen ends it: set as
// the two lines there, "what" was pushed onto a line of its own and the
// second line still started fresh under it
const PROFESSION_LINES = [
  'I pay attention to what',
  'others might overlook.',
];
const PROFESSION = PROFESSION_LINES.join(' ');

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
        {/* headline - the two lines, or on a phone the one sentence */}
        <h1 aria-label={PROFESSION}>
          {PROFESSION_LINES.map((line) => (
            <span key={line} aria-hidden='true' className='hero-designerdev flex flex-wrap font-flexible font-bold leading-[.92] tracking-tight
              text-hero mobile:hidden'>
              <SplitText text={line} id='animate-hero-profession' />
            </span>
          ))}
          <span aria-hidden='true' className='hero-designerdev hidden mobile:flex flex-wrap font-flexible font-bold leading-[.92] tracking-tight
            text-hero'>
            <SplitText text={PROFESSION} id='animate-hero-profession' />
          </span>
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
