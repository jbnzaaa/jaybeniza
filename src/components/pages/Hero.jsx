//
import React, { useEffect } from 'react'
// scroll reveal - same helper every other section on the site uses
import { scrollReveal } from '../../utils/scrollReveal'
// per-letter text split
import SplitText from '../common/SplitText'

const HIGHLIGHT_TEXT = 'I design user-centered digital products and bring them to life through front-end development, working from early concepts and user flows to polished, production-ready interfaces.';

const PROFESSION_LINES = [
  'Designing the right experience.',
  'Building the right interface.',
];

function Hero() {
  useEffect(() => {
    // both reveals use the shared helper with its default start ('top
    // 85%') and velocity-based duration, same as every other section -
    // this is now safe for content that's visible on load without any
    // scrolling (the whole hero) because scrollReveal()'s isActive safety
    // net plays it immediately when the trigger condition is already met
    const highlight = scrollReveal('#animate-hero-highlight', {
      y: 0,
      stagger: .02,
      ease: 'power1.in',
    });

    // triggered off the lines' container, from the moment it is on screen:
    // the letters themselves start dropped below their clip boxes, and on
    // a tall, narrow screen (phone, tablet) that drop carried the first
    // letter past the default trigger line - so the headline, pinned to
    // the bottom of the hero, stayed hidden until the page was scrolled
    const profession = scrollReveal('#animate-hero-profession', {
      y: 0,
      stagger: .02,
      ease: 'power1.in',
    }, { trigger: '#hero-profession', start: 'top bottom' });

    return () => {
      highlight.kill();
      profession.kill();
    };
  }, []);

  return (
    <>
      {/* hero container - fills the viewport below the nav, highlight up
        top, profession lines pinned to the bottom via justify-between */}
      <div className='flex flex-col justify-between
        mobile:min-h-[100svh] mobile:pt-20 mobile:pb-6 mobile:px-[.9rem]
        tablet:min-h-[100svh] tablet:pt-20 tablet:pb-6 tablet:px-[1rem]
        laptop:min-h-screen laptop:pt-20 laptop:pb-6 laptop:px-[2rem]
        laptop-lg:min-h-screen laptop-lg:pt-20 laptop-lg:pb-6 laptop-lg:px-[3rem]
        desktop:min-h-screen desktop:pt-28 desktop:pb-8 desktop:px-[3rem]'>
        {/* highlight */}
        <div className='grid grid-cols-8 gap-0'>
          <section className='
            mobile:col-start-3 mobile:col-span-6 mobile:min-h-[90px]
            tablet:col-start-6 tablet:col-span-3 tablet:min-h-[70px]
            laptop:col-start-6 laptop:col-span-3 laptop:min-h-[60px]
            laptop-lg:col-start-7 laptop-lg:col-span-2 laptop-lg:min-h-[60px]
            desktop:col-start-7 desktop:col-span-2 desktop:min-h-[55px]'>
            <div className='flex flex-wrap
              mobile:text-[.9rem]
              tablet:text-[.9rem]
              laptop:text-[1rem]
              laptop-lg:text-[1rem]
              desktop:text-[1.1rem]'>
              <SplitText text={HIGHLIGHT_TEXT} id='animate-hero-highlight' by='word' />
            </div>
          </section>
        </div>
        {/* profession lines: "UI/UX Designer." / "Front-End Developer." -
          pinned to the bottom of the hero container */}
        <div id='hero-profession' className='grid grid-cols-8 gap-0'>
          {PROFESSION_LINES.map((line) => (
            <section key={line} className='hero-container col-start-1 col-span-8 flex flex-wrap items-baseline'>
              <span className='hero-designerdev font-flexible font-bold leading-none tracking-tight
                text-[12.4vw]'>
                <SplitText text={line} id='animate-hero-profession' />
              </span>
            </section>
          ))}
        </div>
      </div>
    </>
  )
}

export default Hero
