//
import React, { useCallback, useEffect } from 'react'
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollSmoother from 'gsap/ScrollSmoother'
// the site's button and section label
import Button from '../../common/Button'
import Tag from '../../common/Tag'
// scroll reveal
import { scrollReveal, scrollRevealSequence } from '../../../utils/scrollReveal'
// per-letter text split
import SplitText from '../../common/SplitText'
// every project's content - for the link to the next one
import { PROJECTS } from './projects'
// the closing section - the landing page's contact block, here leading
// on to the next project
import Contact from '../Contact'
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

// the order the projects run in, for "next project": the work page's own
// list, in its order (ProjectsPage.jsx) - newest first, and back to the
// first after the last. a project that is not on that list (DailyDiscount)
// is never offered as the next one, and leads on to the first
const ORDER = ['tingi', 'portfoliov3', 'gurover', 'comelec', 'psgs', 'pci', 'aaccup', 'arise', 'jaysonbeniza', 'jbnza', 'regain'];

// grid placement of a screenshot by its `start` (see projects.js)
const SHOT_LAYOUT = {
  full: `
    mobile:col-span-8 mobile:col-start-1
    tablet:col-span-8 tablet:col-start-1
    laptop:col-span-8 laptop:col-start-1
    laptop-lg:col-span-8 laptop-lg:col-start-1
    desktop:col-span-8 desktop:col-start-1`,
  1: `
    mobile:col-span-8 mobile:col-start-1
    tablet:col-span-8 tablet:col-start-1
    laptop:col-span-5 laptop:col-start-1
    laptop-lg:col-span-5 laptop-lg:col-start-1
    desktop:col-span-5 desktop:col-start-1`,
  2: `
    mobile:col-span-8 mobile:col-start-1
    tablet:col-span-8 tablet:col-start-1
    laptop:col-span-5 laptop:col-start-2
    laptop-lg:col-span-5 laptop-lg:col-start-2
    desktop:col-span-5 desktop:col-start-2`,
  3: `
    mobile:col-span-8 mobile:col-start-1
    tablet:col-span-8 tablet:col-start-1
    laptop:col-span-5 laptop:col-start-3
    laptop-lg:col-span-5 laptop-lg:col-start-3
    desktop:col-span-5 desktop:col-start-3`,
  4: `
    mobile:col-span-8 mobile:col-start-1
    tablet:col-span-8 tablet:col-start-1
    laptop:col-span-5 laptop:col-start-4
    laptop-lg:col-span-5 laptop-lg:col-start-4
    desktop:col-span-5 desktop:col-start-4`,
};

// what a case study that is still being written will cover, once it is:
// the parts of the finished layout, in order
const COMING = [
  'Challenge and my role',
  'Discovery and key insight',
  'User flow and design process',
  'Key design decisions',
  'Final product and design system',
  'Outcome and reflection',
];

// the two section themes the page alternates between, as on the landing page
const LIGHT = 'theme-light';
const DARK = 'bg-surface';

// the padding every section on the page shares
const SECTION = `
  mobile:px-[1rem] mobile:py-16
  tablet:px-[1rem] tablet:py-16
  laptop:px-[2rem] laptop:py-20
  laptop-lg:px-[3rem] laptop-lg:py-24
  desktop:px-[3rem] desktop:py-28`;

// the space under a block inside a section
const BELOW = 'mobile:mb-8 tablet:mb-10 laptop:mb-12 laptop-lg:mb-12 desktop:mb-16';

// the space over a full width run under a section's text
const ABOVE = 'mobile:mt-2 tablet:mt-2 laptop:mt-4 laptop-lg:mt-6 desktop:mt-6';

// the right-hand columns every section's content sits in
const CONTENT = `
  mobile:col-span-8
  tablet:col-span-8
  laptop:col-span-5 laptop:col-start-4
  laptop-lg:col-span-5 laptop-lg:col-start-4
  desktop:col-span-5 desktop:col-start-4`;

// a card inside a section: one shade up from it, with the dark theme's text
const CARD = `theme-dark bg-card m-0
  mobile:p-6
  tablet:p-6
  laptop:p-6
  laptop-lg:p-6
  desktop:p-6`;

/**
 * One section of the case study: its boxed label in the left columns,
 * its content in the right - stacked below
 * laptop width. `wide` puts the content under the label at full width
 * instead; `below` is a full width run (of images, say) under a section
 * that keeps its text beside the label.
 */
function CaseSection({ id, title, theme, wide = false, below, children }) {
  return (
    <section className={`${theme} grid grid-cols-8 gap-x-6 ${SECTION}
      mobile:gap-y-6
      tablet:gap-y-8
      laptop:gap-y-8
      laptop-lg:gap-y-10
      desktop:gap-y-10`}
      id={`case-${id}`}>
      <div className={wide ? 'col-span-8' : `
        mobile:col-span-8
        tablet:col-span-8
        laptop:col-span-3
        laptop-lg:col-span-3
        desktop:col-span-3`}>
        <Tag label={title} id={`animate-case-tag-${id}`} />
      </div>
      <div className={wide ? 'col-span-8' : CONTENT}>
        {children}
      </div>
      {below && <div className={`col-span-8 ${ABOVE}`}>{below}</div>}
    </section>
  )
}

// a paragraph of the case study
function Copy({ id, text, className = '' }) {
  return (
    <p className={`flex flex-wrap text-subtitle leading-snug ${className}`}>
      <SplitText text={text} id={`animate-case-${id}`} by='word' />
    </p>
  )
}

// a short list under a small label
function Points({ id, label, items, className = '' }) {
  return (
    <div className={className}>
      <p className='text-caption text-muted mb-4'>
        <SplitText text={label} id={`animate-case-${id}`} />
      </p>
      <ul className='flex flex-col'>
        {items.map((item) => (
          <li className='flex flex-wrap border-t border-rule py-4 m-0 text-body' key={item}>
            <SplitText text={item} id={`animate-case-${id}`} by='word' />
          </li>
        ))}
      </ul>
    </div>
  )
}

// a list of named notes as cards - the site's own card, as in "How I
// work" (Process.jsx): its number at the top, its name and note at the
// bottom, three to a row (one under another on a phone)
// (`rows`: one card to a row, each a band - number, then name and note)
// (each card opens as it comes up the screen, then its own text rises -
// .case-card, revealed in ProjectPage below; `id` is no longer needed by
// the text, which is the card's own)
// eslint-disable-next-line no-unused-vars
function Cards({ id, items, rows = false }) {
  return (
    <ol className={rows ? 'grid grid-cols-1 gap-4' : `grid gap-4
      mobile:grid-cols-1
      tablet:grid-cols-3
      laptop:grid-cols-3
      laptop-lg:grid-cols-3
      desktop:grid-cols-3`}>
      {items.map((item, i) => (
        <li className='case-card theme-dark bg-card m-0' key={item.title}>
          <div className={rows ? 'h-full flex flex-col justify-between p-6 gap-y-8' : `h-full flex flex-col justify-between
            mobile:p-6 mobile:gap-y-12
            tablet:p-6 tablet:gap-y-16
            laptop:p-6 laptop:gap-y-24
            laptop-lg:p-6 laptop-lg:gap-y-28
            desktop:p-6 desktop:gap-y-32`}>
            <p className='text-caption text-muted'>
              <SplitText text={String(i + 1).padStart(2, '0')} id='animate-card' />
            </p>
            <div>
              <h3 className='flex flex-wrap font-flexible font-medium leading-none text-heading mb-4'>
                <SplitText text={item.title} id='animate-card' />
              </h3>
              <p className='flex flex-wrap text-caption text-muted'>
                <SplitText text={item.text} id='animate-card' by='word' />
              </p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}

// a case study's lead - the one line a section turns on, set large
function Lead({ id, text, className = '' }) {
  return (
    <h3 className={`flex flex-wrap font-flexible font-medium leading-[.95] tracking-tight text-heading ${className}`}>
      <SplitText text={text} id={`animate-case-${id}`} />
    </h3>
  )
}

// notes under small labels, one under another: a decision's challenge,
// solution and rationale
function Notes({ id, items, className = '' }) {
  return (
    <dl className={`flex flex-col ${className}`}>
      {items.map(({ label, text }) => (
        <div className='border-t border-rule py-4' key={label}>
          <dt className='text-caption text-muted mb-2'>
            <SplitText text={label} id={`animate-case-${id}`} />
          </dt>
          <dd className='flex flex-wrap text-body m-0'>
            <SplitText text={text} id={`animate-case-${id}`} by='word' />
          </dd>
        </div>
      ))}
    </dl>
  )
}

// a section's screens, full width under it, tops level: three, four or
// two to a row (`layout`) from tablet width up, two on a phone - kept in
// rows so the result is seen without a long scroll. the screens are drawn
// at 402px wide, so each row is held to the width that shows them at that
// size or under, never stretched past it. each screen opens with the
// screenshots' reveal (ProjectPage, below)
const SHOTS = {
  trio: 'grid items-start gap-4 mx-auto max-w-[1238px] mobile:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-3 laptop-lg:grid-cols-3 desktop:grid-cols-3',
  quad: 'grid items-start gap-4 mx-auto max-w-[1656px] mobile:grid-cols-2 tablet:grid-cols-4 laptop:grid-cols-4 laptop-lg:grid-cols-4 desktop:grid-cols-4',
  pair: 'grid items-start gap-4 mx-auto max-w-[820px] grid-cols-2',
};
// `stagger`: Portfolio 2026's screens, at a phone screen's size. its
// screens step across the width as that page's do, two to a row on a
// twelve-column grid, the second set lower than the first - so a row is a
// pair of screens offset from each other, and each row starts somewhere
// else, a zigzag down the page. the grid is held to the width that shows
// a screen at its own 402px or under
const STAGGER_GRID = `grid grid-cols-12 gap-x-6 mx-auto max-w-[1656px] items-start
  mobile:gap-y-8
  tablet:gap-y-12
  laptop:gap-y-14
  laptop-lg:gap-y-20
  desktop:gap-y-20`;
// each screen's place by its turn: the rows' pairs of columns, in turn
const STAGGER_PLACES = [
  // the first of a row
  [`mobile:col-span-6 mobile:col-start-1
    tablet:col-span-4 tablet:col-start-1
    laptop:col-span-3 laptop:col-start-1
    laptop-lg:col-span-3 laptop-lg:col-start-1
    desktop:col-span-3 desktop:col-start-1`,
  `mobile:col-span-6 mobile:col-start-1
    tablet:col-span-4 tablet:col-start-3
    laptop:col-span-3 laptop:col-start-4
    laptop-lg:col-span-3 laptop-lg:col-start-4
    desktop:col-span-3 desktop:col-start-4`,
  `mobile:col-span-6 mobile:col-start-1
    tablet:col-span-4 tablet:col-start-2
    laptop:col-span-3 laptop:col-start-2
    laptop-lg:col-span-3 laptop-lg:col-start-2
    desktop:col-span-3 desktop:col-start-2`],
  // the second, set lower
  [`mobile:col-span-6 mobile:col-start-7
    tablet:col-span-4 tablet:col-start-7
    laptop:col-span-3 laptop:col-start-7
    laptop-lg:col-span-3 laptop-lg:col-start-7
    desktop:col-span-3 desktop:col-start-7`,
  `mobile:col-span-6 mobile:col-start-7
    tablet:col-span-4 tablet:col-start-9
    laptop:col-span-3 laptop:col-start-10
    laptop-lg:col-span-3 laptop-lg:col-start-10
    desktop:col-span-3 desktop:col-start-10`,
  `mobile:col-span-6 mobile:col-start-7
    tablet:col-span-4 tablet:col-start-8
    laptop:col-span-3 laptop:col-start-8
    laptop-lg:col-span-3 laptop-lg:col-start-8
    desktop:col-span-3 desktop:col-start-8`],
];
const STAGGER_DROP = 'mobile:mt-12 tablet:mt-20 laptop:mt-24 laptop-lg:mt-32 desktop:mt-40';
const staggerPlace = (i) => {
  const second = i % 2;
  const row = Math.floor(i / 2) % STAGGER_PLACES[0].length;
  return `${STAGGER_PLACES[second][row]} ${second ? STAGGER_DROP : ''}`;
};

function Shots({ items, layout = 'trio', onLoad }) {
  if (layout === 'stagger') {
    return (
      <div className={STAGGER_GRID}>
        {items.map(({ src, alt }, i) => (
          <div className={`screenshot-container ${staggerPlace(i)}`} key={alt}>
            <img src={src} alt={alt} className='screenshot-img' onLoad={onLoad}/>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className={SHOTS[layout]}>
      {items.map(({ src, alt }) => (
        <div className='screenshot-container' key={alt}>
          <img src={src} alt={alt} className='screenshot-img' onLoad={onLoad}/>
        </div>
      ))}
    </div>
  )
}

// where an image will go: the site's image placeholder - a pale panel
// crossed corner to corner, as a picture box is drawn in a wireframe
// (.project-placeholder, App.scss) - that says what belongs in it
function Panel({ label, className = '' }) {
  return (
    <div className={`case-panel theme-light project-placeholder flex flex-col justify-between p-6 ${className}`}>
      <span className='text-caption text-muted'>Image in progress</span>
      <span className='font-flexible font-medium leading-none text-heading text-muted'>{label}</span>
    </div>
  )
}

/**
 * A project page, in one of four layouts.
 *
 * A platform - a project with `platform` in projects.js, a product made
 * for a client or company - is its hero, its cover, then an overview of
 * the platform, my role and contributions, its key features, the design
 * approach, its screens, the design system, and where it stands and what
 * it achieved - each only when its `platform` has it written, so no part
 * shows a placeholder. The sections it has turn light and dark in turn.
 *
 * A case study in progress - a project with `inProgress` - is its hero,
 * its cover, and a note that the write-up is to come.
 *
 * A build - a project with no `caseStudy` in projects.js, which is every
 * web development project - is shown as what it is: the hero, the cover,
 * an overview (what it is, when it has an `overview`, then my role and
 * what it was built with), then its screens,
 * and the link to the next project. No research or process sections it
 * has nothing to put in.
 *
 * A case study - a project that has a `caseStudy` - is its hero, its
 * cover, then its own sections in the order it gives them, and the link to
 * the next project - in the landing page's design: light and dark
 * sections in turn, each under a small boxed label, with its written
 * content in the same right-hand columns and its screens full width under
 * it. A section (projects.js) has a `title` for its label and any of: a
 * `lead` line set large, `text` (a paragraph, or a list of them),
 * `notes` (labelled paragraphs), `cards` (`cardRows`: one to a row), `points` (a labelled list) and
 * `shots` (its screens, and their `layout`).
 *
 * The project is given whole, or by its key in PROJECTS as `id` - the
 * routes give the key, so projects.js stays out of the first download
 * (App.jsx).
 */
function ProjectPage({ project: given, id }) {
  const project = given || PROJECTS[id];
  // which layout: a case study, a platform, or a build
  const isStudy = !!project.caseStudy;
  const isDraft = !!project.inProgress;
  const isPlatform = !!project.platform;
  const platform = project.platform || {};
  // (a project may have no screenshots yet: panels stand in for them)
  const [hero, ...shots] = project.screenshots || [];
  // a platform's sections: only those it has written, light and dark in turn
  const platformParts = [
    platform.overview && 'overview',
    (platform.role || platform.contributions) && 'role',
    platform.features && 'features',
    platform.approach && 'approach',
    shots.length > 0 && 'screens',
    platform.system && 'system',
    (platform.outcome || platform.metrics) && 'outcome',
  ].filter(Boolean);
  const themeOf = (part) => (platformParts.indexOf(part) % 2 ? DARK : LIGHT);
  const has = (part) => platformParts.includes(part);
  // a build's overview: what it is, a paragraph to each entry
  const overview = [].concat(project.overview || []);
  const here = ORDER.findIndex((key) => PROJECTS[key] === project);
  const next = PROJECTS[ORDER[(here + 1) % ORDER.length]];
  // (and the one before it, the last for the first - or for a project not on the list)
  const previous = PROJECTS[ORDER[((here < 0 ? 0 : here) - 1 + ORDER.length) % ORDER.length]];

  // the screenshots have no size until they load, so the page grows after
  // it mounts and everything below them moves down. re-measure the scroll
  // triggers once the loads settle - one refresh for a burst of images
  const remeasure = useCallback(() => {
    clearTimeout(remeasure.timer);
    remeasure.timer = setTimeout(() => ScrollTrigger.refresh(), 150);
  }, []);

  useEffect(() => {
    // every section's text - the landing page's per-letter reveal, each
    // section on its own trigger
    // (only the sections that have text: the cover and the screens are
    // pictures, and asking for their letters found none)
    // the text goes on its own first line, not on the section: the
    // section's top is a padding above its tag, so the text set off first
    // and the tag - one reveal at a time in a section (scrollReveal.js) -
    // waited until every line under it was in
    const sections = gsap.utils.toArray('[id^="case-"]').filter((section) => document.querySelector(`#animate-${section.id}`)).map((section) => scrollReveal(
      `#animate-${section.id}`, { y: 0, stagger: .012, ease: 'power1.in' }));

    // each screenshot reveals as it scrolls into view: the frame wipes up
    // from its bottom edge while the image inside eases down to its real size
    const images = gsap.utils.toArray('.screenshot-container').map((card) => scrollRevealSequence([
      { targets: card, vars: { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut' } },
      { targets: card.querySelector('.screenshot-img'), vars: { scale: 1, ease: 'power2.out' }, position: '<' },
    ], { trigger: card }));

    // placeholder panels wipe up the same way
    // each card - the case study's, a platform's features and results - is
    // a component of its own: its frame wipes up from its bottom edge, then
    // its number, name and note rise, as that card comes up the screen
    const cards = gsap.utils.toArray('.case-card').map((card) => scrollRevealSequence([
      { targets: card, vars: { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut' } },
      { targets: card.querySelectorAll('.split-letter'), vars: { y: 0, stagger: .012, ease: 'power1.in' }, position: '<.3' },
    ], { trigger: card }));

    const panels = gsap.utils.toArray('.case-panel').map((panel) => scrollReveal(
      panel, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut' }));

    return () => {
      [...sections, ...images, ...cards, ...panels].forEach((reveal) => reveal.kill());
    };
  }, [project]);

  // a case study still being written has no cover yet, and shows none
  const hasCover = !!hero || !isDraft;
  // the hero's arrow scrolls on to the cover - or, without one, to the
  // section that says where the write-up stands
  const onward = hasCover ? '#case-visual' : '#case-status';
  const toCover = (e) => {
    e.preventDefault();
    ScrollSmoother.get()?.scrollTo(onward, true);
  };

  return (
    <>
      <article className='project-container'>
        {/* 01 hero - the project's name top left with its summary top
          right; year, role, category and the link to the live site along
          the bottom. top padding clears the fixed nav bar */}
        <section id='case-hero' className={`${LIGHT} flex flex-col justify-between min-h-screen-safe
          mobile:px-[1rem] mobile:pt-20 mobile:pb-8 mobile:gap-y-16
          tablet:px-[1rem] tablet:pt-20 tablet:pb-8 tablet:gap-y-16
          laptop:px-[2rem] laptop:pt-24 laptop:pb-10 laptop:gap-y-16
          laptop-lg:px-[3rem] laptop-lg:pt-24 laptop-lg:pb-12 laptop-lg:gap-y-16
          desktop:px-[3rem] desktop:pt-28 desktop:pb-12 desktop:gap-y-16`}>
          <div className='grid grid-cols-8 gap-x-6 gap-y-8'>
            <h1 className='project-h1 hero-designerdev flex flex-wrap content-start font-flexible font-bold leading-[.92] tracking-tight
              mobile:col-span-8 text-case
              tablet:col-span-8
              laptop:col-span-5
              laptop-lg:col-span-5
              desktop:col-span-5'>
              <SplitText text={project.title} id='animate-case-hero' />
            </h1>
            {/* summary - upper right */}
            <p className='flex flex-wrap content-start text-caption
              mobile:col-span-8
              tablet:col-span-6
              laptop:col-span-2 laptop:col-start-7 laptop:pt-4
              laptop-lg:col-span-2 laptop-lg:col-start-7 laptop-lg:pt-4
              desktop:col-span-2 desktop:col-start-7 desktop:pt-6'>
              <SplitText text={project.description} id='animate-case-hero' by='word' />
            </p>
          </div>
          <div className='flex justify-between items-end gap-x-6 gap-y-8
            mobile:flex-col mobile:items-start
            tablet:flex-col tablet:items-start'>
            {/* the facts, one under the other: year, then role, then
              category - each a small label with its value under it */}
            <dl className='flex flex-col gap-y-6'>
              {[
                ['Year', project.year],
                ['Role', project.roles.join(', ')],
                ['Category', project.category],
                ...(project.status ? [['Status', project.status]] : []),
                ...(project.details || []),
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className='text-caption text-muted mb-2'>
                    <SplitText text={label} id='animate-case-hero' />
                  </dt>
                  <dd className='flex flex-wrap text-caption'>
                    <SplitText text={value} id='animate-case-hero' by='word' />
                  </dd>
                </div>
              ))}
            </dl>
            {/* lower right: the link to the live site, where there is one,
              and the landing hero's arrow, on to the cover. below laptop
              width the row is the full width, the arrow still at its
              right end */}
            <div className='shrink-0 flex items-center gap-x-4
              mobile:w-full mobile:justify-between
              tablet:w-full tablet:justify-between'>
              {project.link ? <Button label='Visit site' href={project.link.href} external /> : <span/>}
              <Button label='See the project' href={onward} onClick={toCover} iconOnly outline />
            </div>
          </div>
        </section>
        {/* hero visual - the whole section, edge to edge; a full screen
          from laptop width up (.case-visual, App.scss) */}
        {hasCover && (
        <section className={DARK}>
          <div className='case-visual screenshot-container
            mobile:aspect-[4/3]
            tablet:aspect-[16/10]'
            id='case-visual'>
            {hero
              ? <img src={hero.src} alt={hero.alt} className='screenshot-img w-full h-full object-cover object-center' onLoad={remeasure}/>
              : <Panel label='Cover' className='w-full h-full pt-24' />}
          </div>
        </section>
        )}

        {isDraft ? (
        <>
        {/* a case study in progress: what is to come, and nothing made up
          in its place */}
        <CaseSection id='status' title='Case Study in Progress' theme={LIGHT}>
          <Copy id='status' text={project.inProgress} className={BELOW} />
          <Points id='status' label='Coming in this case study' items={COMING} />
        </CaseSection>
        </>
        ) : isStudy ? (
        <>
        {/* a case study: its own sections, light and dark in turn */}
        {project.caseStudy.map((part, i) => (
          <CaseSection id={part.id} title={part.title} theme={i % 2 ? DARK : LIGHT} key={part.id}
            below={part.shots && <Shots {...part.shots} onLoad={remeasure} />}>
            {part.lead && <Lead id={part.id} text={part.lead} className={part.text || part.notes || part.cards || part.points ? BELOW : ''} />}
            {[].concat(part.text || []).map((paragraph, j, all) => (
              <Copy id={part.id} text={paragraph} key={paragraph}
                className={j < all.length - 1 || part.notes || part.cards || part.points ? BELOW : ''} />
            ))}
            {part.notes && <Notes id={part.id} items={part.notes} className={part.cards || part.points ? BELOW : ''} />}
            {part.cards && <Cards id={part.id} items={part.cards} rows={part.cardRows} />}
            {part.points && <Points id={part.id} label={part.points.label} items={part.points.items} className={part.cards ? 'mt-8' : ''} />}
          </CaseSection>
        ))}
        </>
        ) : isPlatform ? (
        <>
        {/* a platform. overview - what it is, a paragraph to each entry */}
        {has('overview') && (
        <CaseSection id='overview' title='Project Overview' theme={themeOf('overview')}>
          {[].concat(platform.overview).map((paragraph, i, all) => (
            <Copy id='overview' text={paragraph} className={i < all.length - 1 ? BELOW : ''} key={paragraph} />
          ))}
        </CaseSection>
        )}

        {/* my role - what I owned, and the tools, once there are any */}
        {has('role') && (
        <CaseSection id='role' title='My Role & Contributions' theme={themeOf('role')}>
          {platform.role && <Copy id='role' text={platform.role} className={platform.contributions || project.technologies.length > 0 ? BELOW : ''} />}
          {platform.contributions && <Points id='role' label='Contributions' items={platform.contributions} className={project.technologies.length > 0 ? BELOW : ''} />}
          {project.technologies.length > 0 && <Points id='role' label='Tools' items={project.technologies} />}
        </CaseSection>
        )}

        {/* key features - a card each, side by side */}
        {has('features') && (
        <CaseSection id='features' title='Key Features' theme={themeOf('features')}>
          {platform.featuresIntro && <Copy id='features' text={platform.featuresIntro} className={BELOW} />}
          <Cards id='features' items={platform.features} />
        </CaseSection>
        )}

        {/* design approach - structure and user flows */}
        {has('approach') && (
        <CaseSection id='approach' title='Design Approach' theme={themeOf('approach')}>
          <Copy id='approach' text={platform.approach} />
        </CaseSection>
        )}

        {/* its screens, under the label at full width */}
        {has('screens') && (
        <CaseSection id='screens' title='Platform Screens' theme={themeOf('screens')} wide>
          <div className='grid grid-cols-8 gap-x-6
            mobile:gap-y-6
            tablet:gap-y-10
            laptop:gap-y-12
            laptop-lg:gap-y-20
            desktop:gap-y-20'>
            {shots.map(({ src, alt, start }) => (
              <div className={`screenshot-container ${SHOT_LAYOUT[start]}`} key={alt}>
                <img src={src} alt={alt} className='screenshot-img' onLoad={remeasure}/>
              </div>
            ))}
          </div>
        </CaseSection>
        )}

        {/* design system - what the platform is built from */}
        {has('system') && (
        <CaseSection id='system' title='Design System' theme={themeOf('system')}>
          <Copy id='system' text={platform.system} />
        </CaseSection>
        )}

        {/* status and impact - where it stands, then one card per figure */}
        {has('outcome') && (
        <CaseSection id='outcome' title='Status & Impact' theme={themeOf('outcome')}>
          {platform.outcome && <Copy id='outcome' text={platform.outcome} className={platform.metrics ? BELOW : ''} />}
          {platform.metrics && (
          <ul className='grid gap-4
            mobile:grid-cols-1
            tablet:grid-cols-3
            laptop:grid-cols-3
            laptop-lg:grid-cols-3
            desktop:grid-cols-3'>
            {platform.metrics.map((metric) => (
              <li className={`case-card ${CARD} flex flex-col justify-between
                mobile:gap-y-8
                tablet:gap-y-12
                laptop:gap-y-16
                laptop-lg:gap-y-20
                desktop:gap-y-24`}
                key={metric.label}>
                <p className='font-flexible font-medium leading-none text-title'>
                  <SplitText text={metric.value} id='animate-card' />
                </p>
                <p className='flex flex-wrap text-caption text-muted'>
                  <SplitText text={metric.label} id='animate-card' by='word' />
                </p>
              </li>
            ))}
          </ul>
          )}
        </CaseSection>
        )}
        </>
        ) : (
        <>
        {/* a build. overview - what it is, when it says, then my role on it
          and what it was built with */}
        <CaseSection id='overview' title={overview.length ? 'Project Overview' : 'Role & Tech Stack'} theme={LIGHT}>
          {overview.map((paragraph) => (
            <Copy id='overview' text={paragraph} className={BELOW} key={paragraph} />
          ))}
          <Points id='overview' label='My role' items={project.roles} className={BELOW} />
          <Points id='overview' label='Built with' items={project.technologies} />
        </CaseSection>

        {/* its screens, under the label at full width */}
        <CaseSection id='screens' title='Project Screens' theme={DARK} wide>
          <div className='grid grid-cols-8 gap-x-6
            mobile:gap-y-6
            tablet:gap-y-10
            laptop:gap-y-12
            laptop-lg:gap-y-20
            desktop:gap-y-20'>
            {shots.map(({ src, alt, start }) => (
              <div className={`screenshot-container ${SHOT_LAYOUT[start]}`} key={alt}>
                <img src={src} alt={alt} className='screenshot-img' onLoad={remeasure}/>
              </div>
            ))}
            {!shots.length && [['Screen one', 1], ['Screen two', 4], ['Screen three', 2]].map(([name, start]) => (
              <Panel label={name} className={`aspect-[16/10] ${SHOT_LAYOUT[start]}`} key={name} />
            ))}
          </div>
        </CaseSection>
        </>
        )}

      </article>
      {/* the close: the next project, in the contact section's layout */}
      <Contact next={next} previous={previous} current={project}/>
    </>
  )
}

export default ProjectPage
