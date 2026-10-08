//
import React, { useEffect, useRef } from 'react'
// Components
import Contact from './Contact';
// project content
import { PROJECTS } from './projects/projects'
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollSmoother from 'gsap/ScrollSmoother'
// the site's button
import Button from '../common/Button'
// page-to-page wipe
import { TransitionLink } from '../common/PageTransition'
// scroll reveal
import { scrollReveal } from '../../utils/scrollReveal'
// per-letter text split
import SplitText from '../common/SplitText'
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

// each project's cover - the mock-up picture of the project (a background
// class, see backgroundImage in tailwind.config.js)
const COVERS = {
  dailydiscount: 'bg-dailydiscount',
  jaysonbeniza: 'bg-jaysonbeniza',
  jbnza: 'bg-jbnza',
  regain: 'bg-regain',
};

// the projects, newest year first (projects of one year keep this order)
const BY_YEAR = Object.keys(COVERS)
  .sort((a, b) => Number(PROJECTS[b].year) - Number(PROJECTS[a].year));

// case studies still being written - empty cards, marked as such, after
// the finished projects
const UPCOMING = 3;

// a project's one supporting label: year / role / category
const label = ({ year, roles, category }) => [year, roles.join(', '), category.replace(' / ', ', ')].join(' / ');

const ITEMS = [
  ...BY_YEAR.map((id) => ({
    key: id,
    title: PROJECTS[id].title,
    label: label(PROJECTS[id]),
    to: PROJECTS[id].path,
    cover: COVERS[id],
  })),
  ...Array.from({ length: UPCOMING }, (_, i) => ({
    key: `upcoming-${i}`,
    title: `Case study 0${i + 1}`,
    label: 'Soon / Case study in progress',
  })),
];

// where each project sits on the six column grid, in turn: the column it
// starts on and how many it spans. every project has a grid row to
// itself, so no card reaches into another's. on a phone every project is
// the full width (.work-item, App.scss)
const PLACES = [
  '1 / span 3',
  '4 / span 3',
  '2 / span 3',
  '1 / span 2',
  '3 / span 3',
  '5 / span 2',
  '2 / span 3',
];
const place = (i) => ({
  '--col': PLACES[i % PLACES.length],
  gridRow: i + 1,
});

const HEADLINE_LINES = [
  'Every project.',
  'Start to finish.',
];

const DESCRIPTION = 'Every project so far, from first sketch to live product. Pick one to see the screens and the part I played.';

/**
 * The work page (route /work), in the landing page's layout: a first
 * screen with the headline and, along its foot, an arrow on to the
 * projects (lower left) and a short description (lower right),
 * then every project on a six column grid, newest year first - each in a
 * row of its own and in a different place across it. A project is its
 * card - the cover; its name and its label (year / role / category) come
 * up under the card, outside it, only while the pointer is on the card
 * (and are always there on a touch screen, which has no pointer).
 */
function ProjectsPage() {
  const fxGrid = useRef();

  useEffect(() => {
    const section = fxGrid.current;
    const open = { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut' };
    // a cover's picture settling into its frame as the frame opens
    const settle = { yPercent: 0, scale: 1, ease: 'power2.out' };
    // the pictures start slightly large and low in their frames
    const covers = gsap.set(gsap.utils.toArray('.work-cover-image', section), { yPercent: 14, scale: 1.15 });

    // the first screen is in view at load, so its reveal is triggered off
    // the section itself
    const intro = scrollReveal('#animate-projects-page', { y: 0, stagger: .02, ease: 'power1.in' },
      { trigger: '#projects-hero', start: 'top bottom' });

    // each project as it comes up the screen: the card wipes open from
    // its bottom edge, the picture easing down to size inside it
    const reveals = gsap.utils.toArray('.work-item', section).map((item) => gsap.timeline({
      scrollTrigger: { trigger: item, start: 'top 88%', toggleActions: 'play none none reverse' },
    })
      .to(item.querySelector('.work-cover'), { ...open, duration: .9 }, 0)
      .to(item.querySelector('.work-cover-image'), { ...settle, duration: 1.1 }, 0));

    // a project's name and label rise out of their lines, letter by
    // letter, while the pointer is on the project (or its link has the
    // keyboard's focus), and drop back when it leaves. a touch screen has
    // no pointer, so there they rise once the card has opened
    const touch = window.matchMedia('(hover: none)').matches;
    const items = gsap.utils.toArray('.work-item', section);
    const texts = items.map((item) => gsap.to(item.querySelectorAll('.work-item-info .split-letter'),
      { y: 0, duration: .45, stagger: { amount: .25 }, ease: 'power2.out', paused: true }));
    const shows = texts.map((text) => () => text.play());
    const hides = texts.map((text) => () => text.reverse());
    const triggers = [];
    items.forEach((item, i) => {
      if (touch) {
        triggers.push(ScrollTrigger.create({ trigger: item, start: 'top 70%', onEnter: shows[i], onLeaveBack: hides[i] }));
        return;
      }
      item.addEventListener('mouseenter', shows[i]);
      item.addEventListener('focusin', shows[i]);
      item.addEventListener('mouseleave', hides[i]);
      item.addEventListener('focusout', hides[i]);
    });

    return () => {
      intro.kill();
      reveals.forEach((reveal) => {
        reveal.scrollTrigger?.kill();
        reveal.revert();
      });
      covers.revert();
      triggers.forEach((trigger) => trigger.kill());
      items.forEach((item, i) => {
        item.removeEventListener('mouseenter', shows[i]);
        item.removeEventListener('focusin', shows[i]);
        item.removeEventListener('mouseleave', hides[i]);
        item.removeEventListener('focusout', hides[i]);
      });
      texts.forEach((text) => text.revert());
    };
  }, []);

  // the arrow scrolls on to the projects
  const toProjects = (e) => {
    e.preventDefault();
    ScrollSmoother.get()?.scrollTo('#work-projects', true);
  };

  return (
    <>
      {/* first screen - headline at the top; along the foot, the arrow on
        to the projects in the lower left and the description in the lower
        right. top padding clears the nav bar */}
      <section id='projects-hero' className='theme-light flex flex-col justify-between min-h-screen-safe
        mobile:px-[1rem] mobile:pt-20 mobile:pb-8 mobile:gap-y-16
        tablet:px-[1rem] tablet:pt-20 tablet:pb-8 tablet:gap-y-16
        laptop:px-[2rem] laptop:pt-24 laptop:pb-10 laptop:gap-y-16
        laptop-lg:px-[3rem] laptop-lg:pt-24 laptop-lg:pb-12 laptop-lg:gap-y-16
        desktop:px-[3rem] desktop:pt-28 desktop:pb-12 desktop:gap-y-16'>
        <h1>
          {HEADLINE_LINES.map((line) => (
            <span key={line} className='hero-designerdev flex flex-wrap font-flexible font-bold leading-[.92] tracking-tight
              text-hero'>
              <SplitText text={line} id='animate-projects-page' />
            </span>
          ))}
        </h1>
        <div className='flex justify-between items-end gap-x-6'>
          {/* the landing hero's arrow */}
          <div className='shrink-0'>
            <Button label='See the projects' href='#work-projects' onClick={toProjects} iconOnly outline />
          </div>
          <p className='flex flex-wrap text-caption
            mobile:w-[78%]
            tablet:w-[52%]
            laptop:w-[34%]
            laptop-lg:w-[30%]
            desktop:w-[28%]'>
            <SplitText text={DESCRIPTION} id='animate-projects-page' by='word' />
          </p>
        </div>
      </section>
      {/* the projects - six columns; each one's place on them is in
        PLACES above (.work-grid, App.scss) */}
      {/* (pulled up a pixel over the first screen: the two are one light
        ground, and a sub-pixel gap between them let the dark page show
        through as a hairline) */}
      <section id='work-projects' className='theme-light relative -mt-px
        mobile:px-[1rem] mobile:pt-8 mobile:pb-16
        tablet:px-[1rem] tablet:pt-8 tablet:pb-16
        laptop:px-[2rem] laptop:pt-8 laptop:pb-20
        laptop-lg:px-[3rem] laptop-lg:pt-8 laptop-lg:pb-24
        desktop:px-[3rem] desktop:pt-8 desktop:pb-28'
        ref={fxGrid}>
        <ul className='work-grid'>
          {ITEMS.map(({ key, title, label: text, to, cover }, i) => {
            const item = (
              <>
                {/* the card - the cover. wipes open on scroll (start
                  state: .work-cover, App.scss) */}
                <div className='work-cover overflow-hidden aspect-[4/3]'>
                  {cover
                    ? <div className={`work-cover-image w-full h-full bg-cover bg-center ${cover}`}/>
                    // nothing to show yet - says so
                    : (
                      <div className='work-cover-image theme-dark flex justify-center items-center w-full h-full bg-card'>
                        <p className='text-caption text-muted'>Coming soon</p>
                      </div>
                    )}
                </div>
                {/* under the card, outside it: name and label - they rise
                  on hover (the effect above) */}
                <div className='work-item-info pt-4'>
                  <h2 className='flex flex-wrap font-flexible font-medium leading-none text-heading'>
                    <SplitText text={title} id={`animate-work-${key}`} />
                  </h2>
                  <p className='flex flex-wrap text-caption text-muted mt-2'>
                    <SplitText text={text} id={`animate-work-${key}`} by='word' />
                  </p>
                </div>
              </>
            );
            return (
              <li className='work-item m-0' style={place(i)} key={key}>
                {to
                  // over a project the cursor says what pressing it does (Cursor.jsx)
                  ? <TransitionLink to={to} className='block' data-cursor='View project' data-no-hover-roll>{item}</TransitionLink>
                  : item}
              </li>
            );
          })}
        </ul>
      </section>
      <Contact/>
    </>
  )
}

export default ProjectsPage
