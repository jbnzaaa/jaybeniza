//
import React, { useEffect, useRef } from 'react'
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
// the site's button and section label
import Button, { BUTTON_PARTS } from '../common/Button'
import Tag from '../common/Tag'
// per-letter text split
import SplitText from '../common/SplitText'
gsap.registerPlugin(ScrollTrigger)

const PARAGRAPH = 'I design and build digital products with a focus on clarity, function, and user experience. Based in the Philippines, I bring 3+ years of UI/UX design and front-end development experience to every project, from user flows and design systems to responsive, production-ready interfaces.';

// share of the pinned scroll the text's reveal takes; the rest opens the
// button and holds the finished screen
const FILL_END = .7;

/**
 * The designer, on the light theme: one large paragraph revealed as the
 * page scrolls. The section pins while its text rises out of its lines,
 * letter by letter in reading order - the site's text reveal, tied to the
 * scroll; then the button to the full About page (AboutPage.jsx) opens.
 */
function About() {
  const fxSection = useRef();

  useEffect(() => {
    const section = fxSection.current;

    // scroll-coupled. the only pinned section on the page, so it needs no
    // refresh priority
    const fill = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=120%',
        pin: true,
        scrub: ScrollTrigger.isTouch ? .5 : true,
        anticipatePin: 1,
      },
    })
      .to('#animate-about', { y: 0, ease: 'power1.out', duration: .06, stagger: { amount: FILL_END - .06 } }, 0)
      .to('#about-cta', { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut', duration: .1 }, FILL_END)
      .to(`#about-cta :is(${BUTTON_PARTS})`, { y: 0, ease: 'power1.in', duration: .06, stagger: { amount: .08 } }, FILL_END + .04)
      .to({}, { duration: .1 });

    return () => {
      fill.scrollTrigger?.kill();
      fill.revert();
    };
  }, []);

  return (
    <>
      {/* about container - full width, one screen tall */}
      <div id='about'>
        <section className='theme-light flex flex-col justify-between h-screen-safe overflow-hidden
          mobile:px-[1rem] mobile:py-16 mobile:gap-y-10
          tablet:px-[1rem] tablet:py-16 tablet:gap-y-12
          laptop:px-[2rem] laptop:py-20 laptop:gap-y-12
          laptop-lg:px-[3rem] laptop-lg:py-24 laptop-lg:gap-y-12
          desktop:px-[3rem] desktop:py-28 desktop:gap-y-16'
          ref={fxSection}>
          <div>
            <Tag label='The Designer' id='animate-about-tag' />
            {/* paragraph - body face, at the lead step of the type scale
              (size: .about-paragraph, App.scss). its letters start below
              their lines, like all text that reveals */}
            <p className='about-paragraph flex flex-wrap font-monolisa
              mobile:mt-6 mobile:w-full mobile:leading-snug
              tablet:mt-8 tablet:w-[94%] tablet:leading-tight
              laptop:mt-8 laptop:w-[90%] laptop:leading-tight
              laptop-lg:mt-10 laptop-lg:w-[88%] laptop-lg:leading-tight
              desktop:mt-10 desktop:w-[84%] desktop:leading-tight'>
              <SplitText text={PARAGRAPH} id='animate-about' />
            </p>
          </div>
          {/* button to the full about page - opened by the timeline above */}
          <div className='flex justify-start shrink-0'>
            <Button label='More about me' to='/about' reveal='manual' id='about-cta' />
          </div>
        </section>
      </div>
    </>
  )
}

export default About
