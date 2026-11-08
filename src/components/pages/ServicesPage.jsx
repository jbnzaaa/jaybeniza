import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Contact from './Contact'
// every service in full
import { ServiceDetails } from './Services'
// how I work, after the services
import Process from './Process'
// GSAP
import gsap from 'gsap'
import ScrollSmoother from 'gsap/ScrollSmoother'
// scroll reveal
import { scrollReveal, scrollRevealSequence, refreshSoon } from '../../utils/scrollReveal'
// per-letter text split
import SplitText from '../common/SplitText'
// the section label
import Tag from '../common/Tag'
// the way down to the services
import ScrollCue from '../common/ScrollCue'
// the browser tab's title
import { usePageTitle } from '../../utils/pageTitle'

// the headline, in two set lines
const HEADLINE_LINES = [
  'From first sketch',
  'to shipped product.',
];

const DESCRIPTION = 'Product design, design systems and AI-assisted front-end builds, handled by one designer from first research to release.';


// the questions a client asks before getting in touch, each answered from
// what the work and the project form already say
const FAQ = [
  {
    q: 'How long does a project take?',
    a: 'Most projects take one to two weeks, depending on scope. Larger products are planned in phases, with the timeline agreed before work starts.',
  },
  {
    q: 'What do you need from me to start?',
    a: 'A short brief: what you are building, who it is for, and anything you already have, such as a current site, a brand guide, or references you like. The project form asks for exactly that.',
  },
  {
    q: 'Can you build what you design?',
    a: 'Yes. Designs can be carried into a working React and Tailwind CSS front-end with Claude Code, as Rover and GuRover were.',
  },
  {
    q: 'Do you work with an existing development team?',
    a: 'Yes. Handoff comes with specs developers can build from, and I stay close through development, testing each role’s flow before launch.',
  },
  {
    q: 'What does a project cost?',
    a: 'It depends on scope, and smaller pieces of work start under ₱25,000. Share your budget on the project form and I will suggest what fits it.',
  },
  {
    q: 'Which tools do you use?',
    a: 'Figma for design and prototypes, Claude Code with React and Tailwind CSS for front-end builds, and GSAP for motion.',
  },
];

/**
 * Questions, answered: the section after the services, a screen tall -
 * its label and a heading in the upper left, and in the lower right the questions a client asks
 * before getting in touch, each a row that opens to its answer (one at a
 * time) and shuts again. The rows rise as they come on screen.
 */
function Questions() {
  const [open, setOpen] = useState(null);
  const fxList = useRef();

  useEffect(() => {
    const head = scrollReveal('#animate-services-faq-head', { y: 0, stagger: .015, ease: 'power1.in' }, { trigger: '#services-faq' });
    const rows = scrollReveal('#animate-services-faq', { y: 0, stagger: .01, ease: 'power1.in' }, { trigger: fxList.current });
    // the rules between the questions, drawn across from the left one
    // after another as the list comes in
    // and the plus beside each question snaps in from nothing, one after
    // another with its row (start state: .faq-mark-in, App.css)
    const marks = fxList.current.querySelectorAll('.faq-mark-in');
    const rules = scrollRevealSequence([
      { targets: fxList.current.querySelectorAll('.service-rule'), vars: { scaleX: 1, duration: .7, stagger: .08, ease: 'power3.out' } },
      { targets: marks, vars: { scale: 1, rotate: 0, duration: .5, stagger: .08, ease: 'back.out(2)' }, position: 0 },
    ], { trigger: fxList.current });
    return () => { head.kill(); rows.kill(); rules.kill(); };
  }, []);

  // the open one's answer eases open to its height; the others shut
  useEffect(() => {
    fxList.current.querySelectorAll('.faq-answer').forEach((answer, i) => {
      // (the page is measured again once it has: the sections after it moved)
      gsap.to(answer, { height: i === open ? 'auto' : 0, duration: .5, ease: 'power3.inOut', overwrite: true, onComplete: () => refreshSoon() });
    });
  }, [open]);

  return (
    <section id='services-faq' className='bg-surface grid gap-x-6 min-h-screen-safe-laptop
      mobile:grid-cols-1 mobile:px-[1rem] mobile:pt-16 mobile:pb-4 mobile:gap-y-10
      tablet:grid-cols-1 tablet:px-[1rem] tablet:pt-16 tablet:pb-4 tablet:gap-y-12
      laptop:grid-cols-2 laptop:px-[2rem] laptop:pt-20 laptop:pb-8
      laptop-lg:grid-cols-2 laptop-lg:px-[3rem] laptop-lg:pt-24 laptop-lg:pb-12
      desktop:grid-cols-2 desktop:px-[3rem] desktop:pt-28 desktop:pb-12'>
      <div className='flex flex-col gap-y-6 self-start'>
        <Tag label='Questions' id='animate-services-faq-tag' />
        <h2 className='flex flex-wrap font-flexible font-medium leading-[.95] tracking-tight text-title'>
          <SplitText text='Before we start' id='animate-services-faq-head' emphasis={['start']} />
        </h2>
      </div>
      {/* the questions, at the section's foot on the right */}
      <ul className='flex flex-col self-end' ref={fxList} data-no-hover-roll>
        {FAQ.map(({ q, a }, i) => (
          <li className='service-row relative m-0' key={q}>
            {/* the rule above it (not the first), drawn across as the list comes in */}
            {i > 0 && <span className='service-rule absolute top-0 left-0 w-full h-px bg-current opacity-20' aria-hidden='true' />}
            <button type='button' className='faq-question flex w-full items-start justify-between gap-x-6 py-5 text-left'
              aria-expanded={open === i} aria-controls={`faq-answer-${i}`} onClick={() => setOpen(open === i ? null : i)}>
              <span className='flex flex-wrap text-subtitle font-medium'>
                <SplitText text={q} id='animate-services-faq' sentence />
              </span>
              {/* a plus that turns to a cross while open */}
              <span className='faq-mark-in shrink-0 inline-flex' aria-hidden='true'>
                <span className={`faq-mark ${open === i ? 'faq-mark-open' : ''}`} />
              </span>
            </button>
            <div className='faq-answer overflow-hidden h-0' id={`faq-answer-${i}`} role='region'>
              <p className='text-copy text-muted pb-6 laptop:w-[86%]'>{a}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * The services page (route /services), in the work page's layout: a first
 * screen with the headline and, along its foot, a short description and
 * the way down; then every service in full, a section each
 * (ServiceDetails, Services.jsx). Arrived at from a service on the
 * landing page (/services#service-<id>), it goes straight on to that one.
 */
function ServicesPage() {
  usePageTitle('Services', 'UI/UX design, design systems, and AI-assisted front-end builds by Jay Beniza, with the case studies behind each.');
  const { hash } = useLocation();

  useEffect(() => {
    const intro = scrollReveal('#animate-services-page', { y: 0, stagger: .02, ease: 'power1.in' },
      { trigger: '#services-hero', start: 'top bottom' });
    return () => intro.kill();
  }, []);

  // straight on to the service asked for, once the page has been measured
  // (the page is first sent to its top as it changes - App.jsx)
  useEffect(() => {
    if (!hash) return undefined;
    const timer = setTimeout(() => {
      const target = document.querySelector(hash);
      if (!target) return;
      const smoother = ScrollSmoother.get();
      if (smoother) smoother.scrollTo(target, true, 'top top');
      else target.scrollIntoView({ behavior: 'smooth' });
    }, 900);
    return () => clearTimeout(timer);
  }, [hash]);

  return (
    <>
      {/* first screen - headline at the top; along the foot, the
        description in the lower left. top padding clears the nav bar */}
      <section id='services-hero' className='theme-light flex flex-col justify-between min-h-screen-safe
        mobile:px-[1rem] mobile:pt-20 mobile:pb-4 mobile:gap-y-16
        tablet:px-[1rem] tablet:pt-20 tablet:pb-4 tablet:gap-y-16
        laptop:px-[2rem] laptop:pt-24 laptop:pb-8 laptop:gap-y-16
        laptop-lg:px-[3rem] laptop-lg:pt-24 laptop-lg:pb-12 laptop-lg:gap-y-16
        desktop:px-[3rem] desktop:pt-28 desktop:pb-12 desktop:gap-y-16'>
        <h1>
          {HEADLINE_LINES.map((line) => (
            <span key={line} className='hero-designerdev flex flex-wrap font-flexible font-bold leading-[.95] tracking-tight
              text-hero'>
              <SplitText text={line} id='animate-services-page' emphasis={['sketch', 'shipped']} />
            </span>
          ))}
        </h1>
        <div className='flex justify-between items-end gap-x-6
          mobile:flex-col mobile:items-start mobile:gap-y-8'>
          <p className='flex flex-wrap text-copy
            mobile:w-[78%]
            tablet:w-[52%]
            laptop:w-[34%]
            laptop-lg:w-[30%]
            desktop:w-[28%]'>
            <SplitText text={DESCRIPTION} id='animate-services-page' by='word' />
          </p>
          <div className='shrink-0'>
            <ScrollCue label='Scroll' />
          </div>
        </div>
      </section>
      <ServiceDetails />
      <Process light />
      <Questions />
      <Contact/>
    </>
  )
}

export default ServicesPage
