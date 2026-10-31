//
import React, { useEffect } from 'react'
// Components
import Contact from './Contact';
import WorkGrid from './WorkGrid';
// project content
import { PROJECTS } from './projects/projects'
import { SHOWN } from './projects/shown'
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollSmoother from 'gsap/ScrollSmoother'
// scroll reveal
import { scrollReveal } from '../../utils/scrollReveal'
// per-letter text split
import SplitText from '../common/SplitText'
// the button down to what is below the first screen
import ScrollCue from '../common/ScrollCue'
// the tab's title
import { usePageTitle } from '../../utils/pageTitle'
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

// a project's cover given as a background class instead of a picture (none now)
const COVERS = {};

// the projects shown, newest year first (projects of one year keep this
// order). a project with no cover class shows its own `cover` picture, or its first screenshot; one
// with neither (the example case study) shows a plain panel that says so.
// (the list itself: shown.js)
const BY_YEAR = SHOWN.slice()
  .sort((a, b) => Number(PROJECTS[b].year) - Number(PROJECTS[a].year));

// unnamed cards for work still to come, after the projects (none now: the
// case studies in progress have pages of their own)
const UPCOMING = 0;

// a project's supporting label, as on the landing page: year / type / role
// (the type is the first part of its category, the role the first it lists)
const label = ({ year, category, roles }) => [year, category.split(' / ')[0], roles[0]].join(' / ');

const ITEMS = [
  ...BY_YEAR.map((id) => ({
    key: id,
    title: PROJECTS[id].title,
    label: label(PROJECTS[id]),
    to: PROJECTS[id].path,
    cover: COVERS[id],
    picture: COVERS[id] ? null : (PROJECTS[id].cover || PROJECTS[id].screenshots?.[0]?.src),
    // nothing to show yet: a case study not written up yet, or a preview to come
    empty: PROJECTS[id].inProgress ? ['Ongoing project', 'Case study in progress'] : [PROJECTS[id].title, 'Preview coming soon'],
    // what the cursor says over the card: what pressing it opens
    action: PROJECTS[id].caseStudy || PROJECTS[id].inProgress ? 'View case study' : 'View project',
  })),
  ...Array.from({ length: UPCOMING }, (_, i) => ({
    key: `upcoming-${i}`,
    title: `Case study 0${i + 1}`,
    label: 'Soon / Case study in progress',
    empty: [`Case study 0${i + 1}`, 'Preview coming soon'],
  })),
];

const HEADLINE_LINES = [
  'Design work,',
  'from brief to build.',
];

const DESCRIPTION = 'Shipped products and UX case studies: the problem, the decisions, and what came of them.';

/**
 * The work page (route /work), in the landing page's layout: a first
 * screen with the headline and, along its foot, a short description
 * (lower left),
 * then every project as a card on the six column grid (WorkGrid.jsx),
 * newest year first, with its name and its label (year / category)
 * under it.
 */
function ProjectsPage() {
  usePageTitle('Work', 'Selected UI/UX work by Jay Beniza: case studies and shipped web and mobile products for education, government and business clients.');

  useEffect(() => {
    // the first screen is in view at load, so its reveal is triggered off
    // the section itself
    const intro = scrollReveal('#animate-projects-page', { y: 0, stagger: .02, ease: 'power1.in' },
      { trigger: '#projects-hero', start: 'top bottom' });
    return () => intro.kill();
  }, []);

  return (
    <>
      {/* first screen - headline at the top; along the foot, the
        description in the lower left. top padding clears the nav bar */}
      <section id='projects-hero' className='theme-light flex flex-col justify-between min-h-screen-safe
        mobile:px-[1rem] mobile:pt-20 mobile:pb-8 mobile:gap-y-16
        tablet:px-[1rem] tablet:pt-20 tablet:pb-8 tablet:gap-y-16
        laptop:px-[2rem] laptop:pt-24 laptop:pb-10 laptop:gap-y-16
        laptop-lg:px-[3rem] laptop-lg:pt-24 laptop-lg:pb-12 laptop-lg:gap-y-16
        desktop:px-[3rem] desktop:pt-28 desktop:pb-12 desktop:gap-y-16'>
        <h1>
          {HEADLINE_LINES.map((line) => (
            <span key={line} className='hero-designerdev flex flex-wrap font-flexible font-bold leading-[.95] tracking-tight
              text-hero'>
              <SplitText text={line} id='animate-projects-page' />
            </span>
          ))}
        </h1>
        <div className='flex justify-between items-end gap-x-6
          mobile:flex-col mobile:items-start mobile:gap-y-8'>
          <p className='flex flex-wrap text-caption
            mobile:w-[78%]
            tablet:w-[52%]
            laptop:w-[34%]
            laptop-lg:w-[30%]
            desktop:w-[28%]'>
            <SplitText text={DESCRIPTION} id='animate-projects-page' by='word' />
          </p>
          {/* the way down to the projects, along the bottom on the right */}
          <div className='shrink-0'>
            <ScrollCue label='Scroll to explore' />
          </div>
        </div>
      </section>
      {/* the projects - six columns; each one's place on them is in
        WorkGrid.jsx (.work-grid, App.css) */}
      {/* (pulled up a pixel over the first screen: the two are one light
        ground, and a sub-pixel gap between them let the dark page show
        through as a hairline) */}
      <section id='work-projects' className='theme-light relative -mt-px
        mobile:px-[1rem] mobile:pt-8 mobile:pb-16
        tablet:px-[1rem] tablet:pt-8 tablet:pb-16
        laptop:px-[2rem] laptop:pt-8 laptop:pb-20
        laptop-lg:px-[3rem] laptop-lg:pt-8 laptop-lg:pb-24
        desktop:px-[3rem] desktop:pt-8 desktop:pb-28'>
        <WorkGrid items={ITEMS} />
      </section>
      <Contact/>
    </>
  )
}

export default ProjectsPage
