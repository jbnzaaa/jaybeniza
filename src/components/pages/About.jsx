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
import { REVEAL_AT, inTurn, scrollReveal } from '../../utils/scrollReveal'
gsap.registerPlugin(ScrollTrigger)

// what to take away about me, set large
// (one paragraph per entry, each set under the one before)
const PARAGRAPHS = [
  'I listen more than I talk, and that shapes how I work. I watch how people use a product, find the real problem, and design the simplest interface that solves it. I also build what I design, so the small details make it into the final product.',
];

// what someone deciding whether to get in touch looks for, each under a small label
const FACTS = [
  ['Based in', 'The Philippines'],
  ['Experience', '3.5+ years in UI/UX'],
  ['Status', 'Open to freelance and full-time roles'],
];

// when its text starts to rise: the site's one rule (scrollReveal.js) -
// with 30% of the section on screen

/**
 * The designer, on the light theme: one large statement, and along the
 * foot three facts - where I am, how long I have
 * done this, whether I am available - and the button to the full About
 * page (AboutPage.jsx). The section scrolls with the page -
 * it is not pinned. When 30% of it is showing
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
      y: 0, duration: .5, ease: 'power2.out', stagger: { amount: .8 }, paused: true,
    });
    // in its turn among the section's reveals (scrollReveal.js). its
    // trigger is the paragraph itself, which is under the tag: the tag
    // has come far enough up the screen first, so it is revealed first
    const paragraph = fxSection.current.querySelector('.about-paragraph');
    const turn = inTurn(reveal, paragraph);
    const trigger = ScrollTrigger.create({
      trigger: paragraph,
      start: REVEAL_AT,
      onEnter: () => turn.play(),
      onLeaveBack: () => turn.reverse(),
    });

    // the facts rise as they come up the screen
    const facts = scrollReveal('#animate-about-facts', { y: 0, stagger: .02 }, { trigger: '#about-facts' });

    return () => {
      trigger.kill();
      turn.kill();
      reveal.revert();
      facts.kill();
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
            <Tag label='About the Designer' id='animate-about-tag' />
            {/* the statement, in its two paragraphs - body face, at the lead step of the type scale
              (size: .about-paragraph, App.scss). its letters start below
              their lines, like all text that reveals */}
            <div className='flex flex-col
              mobile:mt-6 mobile:w-full mobile:gap-y-6
              tablet:mt-8 tablet:w-[94%] tablet:gap-y-8
              laptop:mt-8 laptop:w-[90%] laptop:gap-y-8
              laptop-lg:mt-10 laptop-lg:w-[88%] laptop-lg:gap-y-10
              desktop:mt-10 desktop:w-[84%] desktop:gap-y-10'>
              {PARAGRAPHS.map((paragraph) => (
                <p className='about-paragraph flex flex-wrap font-monolisa
                  mobile:leading-snug
                  tablet:leading-tight
                  laptop:leading-tight
                  laptop-lg:leading-tight
                  desktop:leading-tight'
                  key={paragraph}>
                  <SplitText text={paragraph} id='animate-about' />
                </p>
              ))}
            </div>
          </div>
          {/* along the foot: the facts on the left, the button to the full
            about page on the right (under them on a phone) */}
          <div className='flex justify-between gap-x-6 shrink-0
            mobile:flex-col mobile:items-start mobile:gap-y-8
            tablet:items-end
            laptop:items-end
            laptop-lg:items-end
            desktop:items-end'>
            {/* (on a phone: a list, one fact to a row) */}
            <dl className='flex gap-x-12 gap-y-4
              mobile:flex-col mobile:w-full
              tablet:flex-wrap
              laptop:flex-wrap
              laptop-lg:flex-wrap
              desktop:flex-wrap' id='about-facts'>
              {FACTS.map(([label, value]) => (
                <div key={label}>
                  <dt className='flex flex-wrap text-caption text-muted mb-1'>
                    <SplitText text={label} id='animate-about-facts' />
                  </dt>
                  <dd className='flex flex-wrap text-body m-0'>
                    <SplitText text={value} id='animate-about-facts' />
                  </dd>
                </div>
              ))}
            </dl>
            <Button label='More about me' to='/about' />
          </div>
        </section>
      </div>
    </>
  )
}

export default About
