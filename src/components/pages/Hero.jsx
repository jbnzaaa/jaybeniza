<<<<<<< HEAD
//
import React, { useEffect } from 'react'
// scroll reveal
import { scrollReveal } from '../../utils/scrollReveal'

const HIGHLIGHT_WORDS = [
  'Designing', 'and', 'building', 'digital', 'products', 'with', 'the', 'use',
  'of', 'modern', 'web', 'technology.',
];

// each line is two words sharing the same bold treatment ("UI/UX Designer.")
const PROFESSION_LINES = [
  ['UI/UX', 'Designer.'],
  ['Front-End', 'Developer.'],
];

function Hero() {
  useEffect(() => {
    // the whole hero (highlight + profession lines) fits within one
    // viewport, so unlike the tall multi-row sections elsewhere on the
    // page, there's no "spread out over a long scroll" problem here - both
    // groups are visible on load and should just reveal immediately,
    // using the default (very lenient) trigger position
    const highlight = scrollReveal('#animate-hero-highlight', {
      y: 0,
      delay: .3,
      stagger: .05,
      ease: 'power1.in',
    }, { start: 'top bottom' });

    const profession = scrollReveal('#animate-hero-profession', {
      y: 0,
      delay: .5,
      stagger: .1,
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
              {HIGHLIGHT_WORDS.map((word, i) => (
                <div className='p-container' key={i}>
                  <p className='hero-p' id='animate-hero-highlight'>{word}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        {/* profession lines: "UI/UX Designer." / "Front-End Developer." -
          single line each, both words sharing the same bold treatment,
          pinned to the bottom of the hero container */}
        <div id='hero-profession' className='grid grid-cols-8 gap-0'>
          {PROFESSION_LINES.map(([prefix, role]) => (
            <section key={role} className='hero-container col-start-1 col-span-8 flex flex-wrap items-baseline
              mobile:h-[70px]
              tablet:h-[100px]
              laptop:h-[115px]
              laptop-lg:h-[130px]
              desktop:h-[145px]'>
              <div className='hero-word-container mr-4'>
                <span className='hero-designerdev font-lexend font-bold leading-none tracking-tight
                  mobile:text-[2.8rem] mobile:translate-y-[65px]
                  tablet:text-[4.2rem] tablet:translate-y-[92px]
                  laptop:text-[5.4rem] laptop:translate-y-[105px]
                  laptop-lg:text-[6.4rem] laptop-lg:translate-y-[120px]
                  desktop:text-[7.2rem] desktop:translate-y-[135px]'
                  id='animate-hero-profession'>
                  {prefix}
                </span>
              </div>
              <div className='hero-word-container'>
                <span className='hero-designerdev font-lexend font-bold leading-none tracking-tight
                  mobile:text-[2.8rem] mobile:translate-y-[65px]
                  tablet:text-[4.2rem] tablet:translate-y-[92px]
                  laptop:text-[5.4rem] laptop:translate-y-[105px]
                  laptop-lg:text-[6.4rem] laptop-lg:translate-y-[120px]
                  desktop:text-[7.2rem] desktop:translate-y-[135px]'
                  id='animate-hero-profession'>
                  {role}
                </span>
              </div>
            </section>
          ))}
        </div>
=======
// 
import React, { useEffect } from 'react'
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function Hero() {
  useEffect(() => {
    // hero content animation
    gsap.to('#animate-hero', {
      duration: 1,
      y: 0,
      stagger: .05,
      ease: 'power1.in',
      scrollTrigger: { trigger: '#animate-hero', }
    });
  });

  return (
    <>
      {/* hero container */}
      {/* grid */}
      <div className='grid grid-cols-8 gap-0
        mobile:py-20 mobile:px-[.9rem]
        tablet:py-20 tablet:px-[1rem]
        laptop:py-20 laptop:px-[2rem]
        laptop-lg:py-20 laptop-lg:px-[3rem]
        desktop:py-28 desktop:px-[3rem]'>
        {/* highlight */}
        <section className='
          mobile:col-start-3 mobile:col-span-6 mobile:h-[500px]
          tablet:col-start-6 tablet:col-span-3 tablet:h-[300px]
          laptop:col-start-6 laptop:col-span-3 laptop:h-[350px]
          laptop-lg:col-start-7 laptop-lg:col-span-2 laptop-lg:h-[300px]
          desktop:col-start-7 desktop:col-span-2 desktop:h-[230px]'>
          <div className='flex flex-wrap h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem] 
            laptop-lg:text-[1rem] 
            desktop:text-[1.1rem] '>
            <div className='p-container'><p className='hero-p' id='animate-hero'>Seeking</p></div>
            <div className='p-container'><p className='hero-p' id='animate-hero'>to</p></div>
            <div className='p-container'><p className='hero-p' id='animate-hero'>develop</p></div>
            <div className='p-container'><p className='hero-p' id='animate-hero'>and</p></div>
            <div className='p-container'><p className='hero-p' id='animate-hero'>create</p></div>
            <div className='p-container'><p className='hero-p' id='animate-hero'>design</p></div>
            <div className='p-container'><p className='hero-p' id='animate-hero'>interface</p></div>
            <div className='p-container'><p className='hero-p' id='animate-hero'>with</p></div>
            <div className='p-container'><p className='hero-p' id='animate-hero'>the</p></div>
            <div className='p-container'><p className='hero-p' id='animate-hero'>use</p></div>
            <div className='p-container'><p className='hero-p' id='animate-hero'>of</p></div>
            <div className='p-container'><p className='hero-p' id='animate-hero'>modern</p></div>
            <div className='p-container'><p className='hero-p' id='animate-hero'>web</p></div>
            <div className='p-container'><p className='hero-p' id='animate-hero'>technology.</p></div>
          </div>
        </section>
        {/* profession */}
        <section className='hero-container col-start-1 col-span-8 flex
          mobile:h-[45px] mobile:mt-18 mobile:text-[1.8rem] 
          tablet:h-[105px] tablet:mt-20 tablet:text-[2rem] 
          laptop:h-[50px] laptop:text-[2.5rem] 
          laptop-lg:h-[50px] laptop-lg:text-[3rem] 
          desktop:h-[75px] desktop:text-[3.5rem]'>
          <span className='hero-aspiringweb font-lexend font-semibold leading-none tracking-tight flex flex-col justify-end h-full 
            mobile:translate-y-[45px]
            tablet:translate-y-[50px]
            laptop:translate-y-[55px]
            laptop-lg:translate-y-[60px]
            desktop:translate-y-[75px]' 
            id='animate-hero'>
            aspiring
          </span>
          <span className='hero-aspiringweb font-lexend font-semibold leading-none tracking-tight flex flex-col justify-end h-full 
            mobile:translate-y-[45px]
            tablet:translate-y-[50px]
            laptop:translate-y-[55px]
            laptop-lg:translate-y-[60px]
            desktop:translate-y-[75px]' 
            id='animate-hero'>
            web
          </span>
        </section>
        {/* profession */}
        <section className='hero-container col-start-1 col-span-8 
          mobile:h-[60px]
          tablet:h-[105px]
          laptop:h-[130px]
          laptop-lg:h-[160px]
          desktop:h-[175px]'>
          <span className='hero-designerdev font-lexend font-bold leading-none tracking-tight
            mobile:text-[4rem] mobile:right-2 mobile:translate-y-[80px]
            tablet:text-[7rem] tablet:right-2 tablet:translate-y-[105px]
            laptop:text-[9rem] laptop:right-4 laptop:translate-y-[160px]
            laptop-lg:text-[11rem] laptop-lg:right-4 laptop-lg:translate-y-[170px]
            desktop:text-[12rem] desktop:right-4 desktop:translate-y-[175px]'
            id='animate-hero'>
            Designer.
          </span>
        </section>
        {/* profession */}
        <section className='hero-container col-start-1
          mobile:h-[60px] mobile:col-span-8
          tablet:h-[105px] tablet:col-span-8
          laptop:h-[130px] laptop:col-span-8
          laptop-lg:h-[160px] laptop-lg:col-span-8
          desktop:h-[175px] desktop:col-span-7'>
          <span className='hero-designerdev font-lexend font-bold leading-none tracking-tight
            mobile:text-[4rem] mobile:right-2 mobile:translate-y-[80px]
            tablet:text-[7rem] tablet:right-2 tablet:translate-y-[105px]
            laptop:text-[9rem] laptop:right-4 laptop:translate-y-[160px]
            laptop-lg:text-[11rem] laptop-lg:right-4 laptop-lg:translate-y-[170px]
            desktop:text-[12rem] desktop:right-4 desktop:translate-y-[175px]'
            id='animate-hero'>
            Developer.
          </span>
        </section>
>>>>>>> origin/master
      </div>
    </>
  )
}

<<<<<<< HEAD
export default Hero
=======
export default Hero
>>>>>>> origin/master
