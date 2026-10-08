//
import React, { useEffect, useRef } from 'react'
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
// the site's button and section label
import Button from '../common/Button'
import Tag from '../common/Tag'
// per-letter text split
import SplitText from '../common/SplitText'
gsap.registerPlugin(ScrollTrigger)

const PARAGRAPH = 'I design and build digital products with a focus on clarity, function, and user experience. Based in the Philippines, I bring 3+ years of UI/UX design and front-end development experience to every project, from user flows and design systems to responsive, production-ready interfaces.';

// how far up the screen the section's top has to come before its text
// starts to rise: 80% down from the top of the screen
const START = 'top 80%';

/**
 * The designer, on the light theme: one large paragraph and the button to
 * the full About page (AboutPage.jsx). The section scrolls with the page -
 * it is not pinned. When its top reaches 80% of the way down the screen
 * the paragraph rises out of its lines, letter by letter in reading order
 * - the site's text reveal - and drops back if the page is scrolled back
 * above that point. The button reveals itself as it comes into view.
 */
function About() {
  const fxSection = useRef();

  useEffect(() => {
    // the letters rise across a set time rather than a fixed step each,
    // so a long paragraph's last line is not seconds behind its first
    const reveal = gsap.to('#animate-about', {
      y: 0, duration: .6, ease: 'power2.out', stagger: { amount: 1.6 }, paused: true,
    });
    const trigger = ScrollTrigger.create({
      trigger: fxSection.current,
      start: START,
      onEnter: () => reveal.play(),
      onLeaveBack: () => reveal.reverse(),
    });

    return () => {
      trigger.kill();
      reveal.revert();
    };
  }, []);

  return (
    <>
      {/* about container - full width, at least one screen tall */}
      <div id='about'>
        <section className='theme-light flex flex-col justify-between min-h-screen-safe
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
          {/* button to the full about page */}
          <div className='flex justify-start shrink-0'>
            <Button label='More about me' to='/about' />
          </div>
        </section>
      </div>
    </>
  )
}

export default About
