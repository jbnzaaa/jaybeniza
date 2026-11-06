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
// when a reveal starts
import { REVEAL_AT, inTurn, revealTrigger } from '../../utils/scrollReveal'
// its text opens in pixels as it rises
import { pixelText, withPixels } from '../../utils/pixelText'
gsap.registerPlugin(ScrollTrigger)

// what to take away about me, set large
// (one paragraph per entry, each set under the one before)
const PARAGRAPHS = [
  'I pay attention to where digital experiences fall short, from confusing user flows to overlooked interaction details. I translate those challenges into intuitive interfaces and scalable design systems, then bridge design and development through AI-assisted tools.',
];

/**
 * The designer, on the light theme: one large statement, and along the
 * foot the button to the full About page (AboutPage.jsx). The tag reveals
 * first, then the statement rises into its lines in the muted text colour,
 * and its words turn to the full text colour one by one, in reading
 * order, as the page is scrolled - back again if it is scrolled up. The
 * button reveals itself as it comes into view.
 */
function About() {
  const fxSection = useRef();

  useEffect(() => {
    const section = fxSection.current;
    // (the first paragraph triggers the reveal; the words of both
    // paragraphs rise and darken, in reading order)
    const paragraph = section.querySelector('.about-statement');
    const words = section.querySelectorAll('.about-statement .split-letter');

    // the statement rises into its lines once the tag has revealed: in
    // its turn among the section's reveals (scrollReveal.js), which puts
    // it after the tag above it
    // (opening in pixels as it rises - pixelText.js)
    const mask = pixelText(words);
    const rise = gsap.to(words, withPixels({ y: 0, duration: .4, ease: 'power3.out', stagger: { amount: .6 }, paused: true }, mask));
    const turn = inTurn(rise, paragraph);
    const trigger = revealTrigger(paragraph, REVEAL_AT, turn);

    // each word darkens in its turn, tied to the scroll. (the text colour
    // is read from the section, which sets it for its theme)
    const darken = (scrollTrigger) => gsap.to(words, {
      color: getComputedStyle(section).getPropertyValue('--text').trim(),
      ease: 'none',
      stagger: 1,
      scrollTrigger: { ...scrollTrigger, scrub: true },
    });
    // the words turn as the statement scrolls up through the screen - from
    // its top a fifth of the way up to its foot just past the middle - with
    // nothing held: the page scrolls on as it does
    const held = darken({
      trigger: paragraph.parentElement,
      start: 'top 80%',
      end: 'bottom 45%',
      invalidateOnRefresh: true,
    });

    return () => {
      held.scrollTrigger?.kill();
      held.revert();
      trigger.kill();
      turn.kill();
      rise.revert();
      mask?.clear();
    };
  }, []);

  return (
    <>
      {/* about container - full width, at least one screen tall */}
      <div id='about'>
        <section className='theme-light flex flex-col justify-between min-h-screen-safe
          mobile:px-[1rem] mobile:pt-16 mobile:pb-4 mobile:gap-y-10
          tablet:px-[1rem] tablet:pt-16 tablet:pb-4 tablet:gap-y-12
          laptop:px-[2rem] laptop:pt-20 laptop:pb-8 laptop:gap-y-12
          laptop-lg:px-[3rem] laptop-lg:pt-24 laptop-lg:pb-8 laptop-lg:gap-y-12
          desktop:px-[3rem] desktop:pt-28 desktop:pb-8 desktop:gap-y-16'
          ref={fxSection}>
          <div>
            <Tag label='About the Designer' id='animate-about-tag' />
            {/* the statement - body face, at the lead step of the type scale
              (size: .about-paragraph, App.css). its letters start below
              their lines, like all text that reveals */}
            <div className='flex flex-col
              mobile:mt-6 mobile:w-full mobile:gap-y-6
              tablet:mt-8 tablet:w-[92%] tablet:gap-y-8
              laptop:mt-8 laptop:w-[86%] laptop:gap-y-8
              laptop-lg:mt-10 laptop-lg:w-[80%] laptop-lg:gap-y-10
              desktop:mt-10 desktop:w-[76%] desktop:gap-y-10'>
              {PARAGRAPHS.map((paragraph) => (
                <p className='about-paragraph about-statement flex flex-wrap font-monolisa
                  mobile:leading-snug
                  tablet:leading-tight
                  laptop:leading-tight
                  laptop-lg:leading-tight
                  desktop:leading-tight'
                  key={paragraph}>
                  <SplitText text={paragraph} id='animate-about' by='word' />
                </p>
              ))}
            </div>
          </div>
          {/* along the foot: the button to the full about page */}
          <div className='shrink-0'>
            <Button label='More about me' to='/about' />
          </div>
        </section>
      </div>
    </>
  )
}

export default About
