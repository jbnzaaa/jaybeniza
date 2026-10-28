//
import React, { useEffect } from 'react'
// Components
import Contact from './Contact';
import WorkGrid from './WorkGrid';
// the archive's projects
import { ARCHIVE } from './projects/archive'
import { PROJECTS, archivePictures } from './projects/projects'
// scroll reveal
import { scrollReveal } from '../../utils/scrollReveal'
// per-letter text split
import SplitText from '../common/SplitText'
// the button down to what is below the first screen
import ScrollCue from '../common/ScrollCue'
// the tab's title
import { usePageTitle } from '../../utils/pageTitle'

// the cards: the work page's. one with a page (projects.js) opens it, with
// its label (year / design exploration - none of these is client work) and its cover; one
// with no page yet opens nothing, its label is year / what it is, and its
// picture is the first in its folder, if it has one (archivePictures)
const ITEMS = ARCHIVE.map(({ id, title, year }) => {
  const project = PROJECTS[id];
  if (project) {
    return {
      key: `archive-${id}`,
      title: project.title,
      label: `${project.year} / Design exploration`,
      to: project.path,
      action: 'View project',
      picture: project.card || project.cover || project.screenshots?.[0]?.src,
      empty: [project.title, 'Preview coming soon'],
    };
  }
  return {
    key: `archive-${id}`,
    title,
    label: `${year} / Design exploration`,
    picture: (({ card, cover, screenshots }) => card || cover || screenshots[1]?.src || screenshots[1]?.phones?.[0].src)(archivePictures(id)),
    empty: [title, 'Preview coming soon'],
  };
});

const HEADLINE_LINES = [
  'Design explorations,',
  'outside client work.',
];

const DESCRIPTION = 'Concepts, redesigns, and visual studies I made on my own to explore layout, type, and interaction. Personal explorations, not client work.';

/**
 * The archive page (route /archive), in the work page's layout: a first
 * screen with the headline and, along its foot, a short description
 * (lower left), then every archived
 * project as a card on the six column grid (WorkGrid.jsx), with its name
 * and its label (year / Design exploration) under it.
 */
function ArchivePage() {
  usePageTitle('Archive');

  useEffect(() => {
    // the first screen is in view at load, so its reveal is triggered off
    // the section itself
    const intro = scrollReveal('#animate-archive-page', { y: 0, stagger: .02, ease: 'power1.in' },
      { trigger: '#archive-hero', start: 'top bottom' });
    return () => intro.kill();
  }, []);

  return (
    <>
      {/* first screen - headline at the top; along the foot, the
        description in the lower left. top padding clears the nav bar */}
      <section id='archive-hero' className='theme-light flex flex-col justify-between min-h-screen-safe
        mobile:px-[1rem] mobile:pt-20 mobile:pb-8 mobile:gap-y-16
        tablet:px-[1rem] tablet:pt-20 tablet:pb-8 tablet:gap-y-16
        laptop:px-[2rem] laptop:pt-24 laptop:pb-10 laptop:gap-y-16
        laptop-lg:px-[3rem] laptop-lg:pt-24 laptop-lg:pb-12 laptop-lg:gap-y-16
        desktop:px-[3rem] desktop:pt-28 desktop:pb-12 desktop:gap-y-16'>
        <h1>
          {HEADLINE_LINES.map((line) => (
            <span key={line} className='hero-designerdev flex flex-wrap font-flexible font-bold leading-[.95] tracking-tight
              text-hero'>
              <SplitText text={line} id='animate-archive-page' />
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
            <SplitText text={DESCRIPTION} id='animate-archive-page' by='word' />
          </p>
          {/* the way down to the projects, along the bottom on the right */}
          <div className='shrink-0'>
            <ScrollCue label='Scroll to explore' />
          </div>
        </div>
      </section>
      {/* the projects - the work page's grid. (pulled up a pixel over the
        first screen, as on the work page: one light ground, with no
        hairline between) */}
      <section id='archive-projects' className='theme-light relative -mt-px
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

export default ArchivePage
