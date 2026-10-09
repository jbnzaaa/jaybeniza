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
import { scrollReveal, REVEAL_AT } from '../../utils/scrollReveal'
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

// the projects shown, newest year first (projects of one year keep this
// order). a project with no cover class shows its own `cover` picture, or its first screenshot; one
// with neither (the example case study) shows a plain panel that says so
const SHOWN = ['portfoliov3', 'tingi', 'stocknear', 'jaysonbeniza', 'jbnza', 'regain'];
const BY_YEAR = SHOWN.slice()
  .sort((a, b) => Number(PROJECTS[b].year) - Number(PROJECTS[a].year));

// unnamed cards for work still to come, after the projects (none now: the
// case studies in progress have pages of their own)
const UPCOMING = 0;

// a project's supporting label: year / category
const label = ({ year, category }) => [year, category.replace(' / ', ', ')].join(' / ');

const ITEMS = [
  ...BY_YEAR.map((id) => ({
    key: id,
    title: PROJECTS[id].title,
    label: label(PROJECTS[id]),
    to: PROJECTS[id].path,
    cover: COVERS[id],
    picture: COVERS[id] ? null : (PROJECTS[id].cover || PROJECTS[id].screenshots?.[0]?.src),
    note: PROJECTS[id].caseStudy ? 'Case study' : 'Project',
    // what the cursor says over the card: what pressing it opens
    action: PROJECTS[id].caseStudy || PROJECTS[id].inProgress ? 'View case study' : 'View project',
  })),
  ...Array.from({ length: UPCOMING }, (_, i) => ({
    key: `upcoming-${i}`,
    title: `Case study 0${i + 1}`,
    label: 'Soon / Case study in progress',
    note: 'Coming soon',
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

const DESCRIPTION = 'Every project shows the problem, the decisions I made, and what shipped.';

/**
 * The work page (route /work), in the landing page's layout: a first
 * screen with the headline and, along its foot, a short description
 * (lower left) and an arrow on to the projects (lower right),
 * then every project on a six column grid, newest year first - each in a
 * row of its own and in a different place across it. A project is its
 * card - the cover - with its name and its label (year / category)
 * under it, outside the card; they rise as the card scrolls into view.
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
      scrollTrigger: { trigger: item, start: REVEAL_AT, toggleActions: 'play none none reverse' },
    })
      .to(item.querySelector('.work-cover'), { ...open, duration: .9 }, 0)
      .to(item.querySelector('.work-cover-image'), { ...settle, duration: 1.1 }, 0));

    // its name and label rise on a trigger of their own: when they have
    // come on screen themselves - by which time the whole cover over them
    // is showing. (on the card's trigger they rose with the cover's first
    // edge, a screen before anyone had scrolled down to them)
    const texts = gsap.utils.toArray('.work-item-info', section).map((info) => {
      const rise = gsap.to(info.querySelectorAll('.split-letter'), { y: 0, duration: .5, stagger: { amount: .3 }, ease: 'power1.in', paused: true });
      const trigger = ScrollTrigger.create({ trigger: info, start: 'top 92%', onEnter: () => rise.play(), onLeaveBack: () => rise.reverse() });
      return { rise, trigger };
    });

    return () => {
      intro.kill();
      reveals.forEach((reveal) => {
        reveal.scrollTrigger?.kill();
        reveal.revert();
      });
      covers.revert();
      texts.forEach(({ rise, trigger }) => {
        trigger.kill();
        rise.revert();
      });
    };
  }, []);

  // the arrow scrolls on to the projects
  const toProjects = (e) => {
    e.preventDefault();
    ScrollSmoother.get()?.scrollTo('#work-projects', true);
  };

  return (
    <>
      {/* first screen - headline at the top; along the foot, the
        description in the lower left and the arrow on to the projects in
        the lower right, as on the landing page. top padding clears the
        nav bar */}
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
          {/* the landing hero's arrow - after the description */}
          <div className='shrink-0 order-2'>
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
          {ITEMS.map(({ key, title, label: text, to, cover, picture, note, action }, i) => {
            const item = (
              <>
                {/* the card - the cover. wipes open on scroll (start
                  state: .work-cover, App.scss) */}
                <div className='work-cover overflow-hidden aspect-[4/3]' data-cursor-anchor>
                  {cover && <div className={`work-cover-image w-full h-full bg-cover bg-center ${cover}`}/>}
                  {!cover && picture && <div className='work-cover-image w-full h-full bg-cover bg-left-top' style={{ backgroundImage: `url(${picture})` }}/>}
                  {/* nothing to show yet - says so */}
                  {!cover && !picture && (
                    <div className='work-cover-image theme-dark flex justify-center items-center w-full h-full bg-card'>
                      <p className='text-caption text-muted'>{note}</p>
                    </div>
                  )}
                </div>
                {/* under the card, outside it: name and label - they rise
                  once they are on screen themselves, the whole cover
                  showing over them (the effect above) */}
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
                  ? <TransitionLink to={to} className='block' data-cursor={action} data-no-hover-roll>{item}</TransitionLink>
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
