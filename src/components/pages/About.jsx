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
gsap.registerPlugin(ScrollTrigger)

// what to take away about me, set large
// (one paragraph per entry, each set under the one before)
const PARAGRAPHS = [
  'I listen more than I talk, and that shapes how I work. I watch how people use a product, find the real problem, and design the simplest interface that solves it. I also build what I designed, so the small details make it into the final product.',
];

/**
 * The designer, on the light theme: one large statement, and along the
 * foot the button to the full About page (AboutPage.jsx). The tag reveals
 * first, then the statement rises into its lines in the muted text colour,
 * and its words turn to the full text colour one by one, in reading
 * order, as the page is scrolled - back again if it is scrolled up. From
 * laptop width up the section is pinned to the screen until every word
 * has turned. The button reveals itself as it comes into view.
 */
function About() {
  const fxSection = useRef();

  useEffect(() => {
    const section = fxSection.current;
    const paragraph = section.querySelector('.about-statement');
    const words = paragraph.querySelectorAll('.split-letter');

    // the statement rises into its lines once the tag has revealed: in
    // its turn among the section's reveals (scrollReveal.js), which puts
    // it after the tag above it
    const rise = gsap.to(words, { y: 0, duration: .4, ease: 'power3.out', stagger: { amount: .6 }, paused: true });
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
    // at every width the section holds the screen for a screen and a half
    // of scrolling - the words turning over that stretch - then moves on.
    // it is held from when its top reaches the top; on a phone where it is
    // taller than the screen, from when its foot reaches the foot instead,
    // so all of it is on screen while it is held
    const held = darken({
      trigger: section,
      start: () => (section.offsetHeight > window.innerHeight ? 'bottom bottom' : 'top top'),
      end: '+=150%',
      pin: true,
      invalidateOnRefresh: true,
    });

    return () => {
      held.scrollTrigger?.kill();
      held.revert();
      trigger.kill();
      turn.kill();
      rise.revert();
    };
  }, []);

  return (
    <>
      {/* about container - full width, at least one screen tall: it holds
        the screen while it is pinned, at every width */}
      <div id='about'>
        <section data-pinned className='theme-light flex flex-col justify-between min-h-screen-safe
          mobile:px-[1rem] mobile:py-16 mobile:gap-y-10
          tablet:px-[1rem] tablet:py-16 tablet:gap-y-12
          laptop:px-[2rem] laptop:py-20 laptop:gap-y-12
          laptop-lg:px-[3rem] laptop-lg:py-24 laptop-lg:gap-y-12
          desktop:px-[3rem] desktop:py-28 desktop:gap-y-16'
          ref={fxSection}>
          <div>
            <Tag label='About the Designer' id='animate-about-tag' />
            {/* the statement, in its two paragraphs - body face, at the lead step of the type scale
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
