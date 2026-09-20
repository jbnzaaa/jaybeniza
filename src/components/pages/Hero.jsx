//
import React, { useEffect } from 'react'
// scroll reveal - same helper every other section on the site uses
import { scrollReveal } from '../../utils/scrollReveal'
// per-letter text split
import SplitText from '../common/SplitText'

const HIGHLIGHT_TEXT = 'Designing and building digital products with the use of modern web technology.';

const PROFESSION_LINES = [
  'UI/UX Designer.',
  'Front-End Developer.',
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

    const profession = scrollReveal('#animate-hero-profession', {
      y: 0,
      stagger: .02,
      ease: 'power1.in',
    });

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
        mobile:min-h-screen mobile:py-20 mobile:px-[.9rem]
        tablet:min-h-screen tablet:py-20 tablet:px-[1rem]
        laptop:min-h-screen laptop:py-20 laptop:px-[2rem]
        laptop-lg:min-h-screen laptop-lg:py-20 laptop-lg:px-[3rem]
        desktop:min-h-screen desktop:py-28 desktop:px-[3rem]'>
        {/* highlight */}
        <div className='grid grid-cols-8 gap-0'>
          <section className='
            mobile:col-start-3 mobile:col-span-6 mobile:h-[90px]
            tablet:col-start-6 tablet:col-span-3 tablet:h-[70px]
            laptop:col-start-6 laptop:col-span-3 laptop:h-[60px]
            laptop-lg:col-start-7 laptop-lg:col-span-2 laptop-lg:h-[60px]
            desktop:col-start-7 desktop:col-span-2 desktop:h-[55px]'>
            <div className='flex flex-wrap
              mobile:text-[.9rem]
              tablet:text-[.9rem]
              laptop:text-[1rem]
              laptop-lg:text-[1rem]
              desktop:text-[1.1rem]'>
              <SplitText text={HIGHLIGHT_TEXT} id='animate-hero-highlight' />
            </div>
          </section>
        </div>
        {/* profession lines: "UI/UX Designer." / "Front-End Developer." -
          pinned to the bottom of the hero container */}
        <div id='hero-profession' className='grid grid-cols-8 gap-0'>
          {PROFESSION_LINES.map((line) => (
            <section key={line} className='hero-container col-start-1 col-span-8 flex flex-wrap items-baseline
              mobile:h-[70px]
              tablet:h-[100px]
              laptop:h-[115px]
              laptop-lg:h-[130px]
              desktop:h-[145px]'>
              <span className='hero-designerdev font-lexend font-bold leading-none tracking-tight
                mobile:text-[2.8rem]
                tablet:text-[4.2rem]
                laptop:text-[5.4rem]
                laptop-lg:text-[6.4rem]
                desktop:text-[7.2rem]'>
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
