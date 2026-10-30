//
import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollSmoother from 'gsap/ScrollSmoother'
// the site's button and section label
import Button from '../../common/Button'
import Tag from '../../common/Tag'
// scroll reveal
import { scrollReveal, scrollRevealSequence } from '../../../utils/scrollReveal'
// a colleague's picture opens in pixels, as on the landing page's testimonials
import { pixelToggle } from '../../../utils/pixels'
// per-letter text split
import SplitText from '../../common/SplitText'
// every project's content - for the link to the next one
import { PROJECTS } from './projects'
// the archive's projects - which run in their own order
import { ARCHIVE } from './archive'
// the closing section - the landing page's contact block, here leading
// on to the next project
import Contact from '../Contact'
// the tab's title
import { usePageTitle } from '../../../utils/pageTitle'
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

// the order the projects run in, for "next project": the work page's own
// list, in its order (ProjectsPage.jsx) - newest first, and back to the
// first after the last. a project that is not on that list (DailyDiscount)
// is never offered as the next one, and leads on to the first
const ORDER = ['gurover', 'tingi', 'portfoliov3', 'comelec', 'psgs', 'pci', 'aaccup', 'arise', 'courseware', 'regain'];
// an archived project leads on to the next in the archive, and back to its
// first after its last
const ARCHIVE_ORDER = ARCHIVE.map(({ id }) => id).filter((key) => PROJECTS[key]);

// a project's screens (`start`, projects.js): one marked 'full' spans the
// width; the rest run in two columns from tablet width up, one on a phone.
// they are columns, not rows: a tall screen (a whole landing page) takes
// its own height in one column while the others stack beside it, so no
// screen is pushed below a gap. each run of them between full ones is
// balanced on its own
const SCREEN_GAP = 'mobile:mb-6 tablet:mb-6 laptop:mb-6 laptop-lg:mb-6 desktop:mb-6';
const SCREEN_RUN = 'mobile:columns-1 tablet:columns-2 laptop:columns-2 laptop-lg:columns-2 desktop:columns-2 gap-x-6';

function Screen({ src, alt, onLoad }) {
  return (
    <div className={`screenshot-container break-inside-avoid ${SCREEN_GAP}`}>
      <img src={src} alt={alt} className='screenshot-img' onLoad={onLoad}/>
    </div>
  );
}

// the screens, in order: a full one or a row of phones on its own, the
// others gathered into runs of columns
function Screens({ shots, onLoad }) {
  const blocks = [];
  shots.forEach((shot) => {
    const alone = shot.start === 'full' || shot.phones;
    const last = blocks[blocks.length - 1];
    if (!alone && last?.run) last.run.push(shot);
    else blocks.push(alone ? { shot } : { run: [shot] });
  });
  return blocks.map((block) => (block.run ? (
    <div className={SCREEN_RUN} key={block.run[0].alt}>
      {block.run.map((shot) => <Screen {...shot} onLoad={onLoad} key={shot.alt} />)}
    </div>
  ) : block.shot.phones ? (
    <div className={SCREEN_GAP} key={block.shot.alt}>
      <Shots items={block.shot.phones} layout='quad' onLoad={onLoad} />
    </div>
  ) : (
    <Screen {...block.shot} onLoad={onLoad} key={block.shot.alt} />
  )));
}

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

// every project is shown in its key parts only, so a page reads in a
// few screens: its key screens, at most this many (after the cover) and
// at most this many under a section; a case study's key sections (not
// `extra`); and a platform's problem, role, key decisions (at most
// KEY_DECISIONS), screens and results. the rest stays in projects.js -
// and, for a project with `behance`, in the full case study there
const KEY_SHOTS = 4;
const KEY_DECISIONS = 3;

// the two section themes the page alternates between, as on the landing page
const LIGHT = 'theme-light';
const DARK = 'bg-surface';

// the padding every section on the page shares - tighter than the
// landing page's: a case study runs to a dozen sections, and at the
// landing page's padding it was a long scroll
const SECTION = `
  mobile:px-[1rem] mobile:py-12
  tablet:px-[1rem] tablet:py-12
  laptop:px-[2rem] laptop:py-16
  laptop-lg:px-[3rem] laptop-lg:py-16
  desktop:px-[3rem] desktop:py-20`;

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

// the figures in Results & Impact, as many to a row as there are (up to
// four; four go two to a row at tablet width) - and the room between a
// figure and its label: more for a lone figure, which takes the full width
const FIGURES = {
  1: 'grid-cols-1',
  2: 'mobile:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-2 laptop-lg:grid-cols-2 desktop:grid-cols-2',
  3: 'mobile:grid-cols-1 tablet:grid-cols-3 laptop:grid-cols-3 laptop-lg:grid-cols-3 desktop:grid-cols-3',
  4: 'mobile:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 laptop-lg:grid-cols-4 desktop:grid-cols-4',
};
const FIGURE_ROOM = 'mobile:gap-y-8 tablet:gap-y-12 laptop:gap-y-16 laptop-lg:gap-y-20 desktop:gap-y-24';
const ONE_FIGURE_ROOM = 'mobile:gap-y-16 tablet:gap-y-20 laptop:gap-y-28 laptop-lg:gap-y-32 desktop:gap-y-40';

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
    <p className={`flex flex-wrap text-body leading-snug ${className}`}>
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
          <li className='flex flex-wrap border-t border-rule py-4 m-0 text-caption' key={item}>
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

// a colleague's words on the project, as a card: the quote, then who
// said it - their picture, name and role (as on the landing page's
// testimonials). its text rises with the card (.case-card, below)
function Quote({ text, name, role, avatar, className = '' }) {
  return (
    <figure className={`case-card ${CARD} flex flex-col gap-y-8 ${className}`}>
      <blockquote className='m-0'>
        <p className='flex flex-wrap text-body leading-snug'>
          <SplitText text={`“ ${text} ”`} id='animate-card' by='word' />
        </p>
      </blockquote>
      <figcaption className='flex items-center gap-x-4'>
        <img className='case-quote-avatar shrink-0 w-12 h-12 object-cover grayscale' src={avatar} alt='' loading='lazy'/>
        <span className='flex flex-col gap-y-1'>
          <span className='font-flexible font-medium leading-none text-subtitle'>
            <SplitText text={name} id='animate-card' />
          </span>
          <span className='flex flex-wrap text-caption leading-tight text-muted'>
            <SplitText text={role} id='animate-card' />
          </span>
        </span>
      </figcaption>
    </figure>
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
          <dd className='flex flex-wrap text-caption m-0'>
            <SplitText text={text} id={`animate-case-${id}`} by='word' />
          </dd>
        </div>
      ))}
    </dl>
  )
}

// a section's screens, full width under it, tops level: three, four or
// two, or six to a row (`layout`) from tablet width up, two or three on a
// phone - kept in
// rows so the result is seen without a long scroll. the screens are drawn
// at 402px wide, so each row is held to the width that shows them at that
// size or under, never stretched past it. each screen opens with the
// screenshots' reveal (ProjectPage, below)
const SHOTS = {
  trio: 'grid items-start gap-4 mx-auto max-w-[1238px] mobile:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-3 laptop-lg:grid-cols-3 desktop:grid-cols-3',
  quad: 'grid items-start gap-4 mx-auto max-w-[1656px] mobile:grid-cols-2 tablet:grid-cols-4 laptop:grid-cols-4 laptop-lg:grid-cols-4 desktop:grid-cols-4',
  pair: 'grid items-start gap-4 mx-auto max-w-[820px] grid-cols-2',
  six: 'grid items-start gap-4 mx-auto max-w-[2492px] mobile:grid-cols-3 tablet:grid-cols-3 laptop:grid-cols-6 laptop-lg:grid-cols-6 desktop:grid-cols-6',
};
function Shots({ items, layout = 'trio', onLoad }) {
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
// (.project-placeholder, App.css) - that says what belongs in it
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
 * for a client or company - is its hero, its cover, then the challenge it
 * answered (or, without one, an overview), my role and contributions, the
 * design approach, its screens, the design system, and what it achieved -
 * each only when its `platform` has it written, so no part shows a
 * placeholder, and each in its key parts (KEY_SHOTS, KEY_DECISIONS). The sections it has turn light and dark in turn.
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
  usePageTitle(project.title);
  // which layout: a case study, a platform, or a build
  const isStudy = !!project.caseStudy;
  const isDraft = !!project.inProgress;
  const isPlatform = !!project.platform;
  const platform = project.platform || {};
  // (a project may have no screenshots yet: panels stand in for them)
  // (with its full case study on Behance, the page closes on the link to it)
  const short = !!project.behance;
  const [hero, ...allShots] = project.screenshots || [];
  const shots = allShots.slice(0, KEY_SHOTS);
  // (a row of six cut to four is set four to a row)
  const keyShots = ({ items, layout }) => ({
    items: items.slice(0, KEY_SHOTS),
    layout: layout === 'six' && items.length > KEY_SHOTS ? 'quad' : layout,
  });
  const studyParts = (project.caseStudy || [])
    .filter((part) => !part.extra)
    .map((part) => (part.shots ? { ...part, shots: keyShots(part.shots) } : part));
  // a platform's sections: only those it has written, light and dark in turn
  // (the overview only where there is no challenge: the hero's summary
  // already says what it is. its features are in its contributions and
  // decisions, and are left out)
  const platformParts = [
    platform.overview && !platform.challenge && 'overview',
    platform.challenge && 'challenge',
    (platform.role || platform.contributions) && 'role',
    platform.approach && 'approach',
    shots.length > 0 && 'screens',
    platform.system && 'system',
    (platform.outcome || platform.metrics || platform.quote) && 'outcome',
  ].filter(Boolean);
  const themeOf = (part) => (platformParts.indexOf(part) % 2 ? DARK : LIGHT);
  const has = (part) => platformParts.includes(part);
  // a build's overview: what it is, a paragraph to each entry
  const overview = [].concat(project.overview || []);
  // (a design with no build - an archived project - has no tools to list,
  // and leaves the section out: its role is in the hero)
  const hasOverview = overview.length > 0 || project.technologies.length > 0;
  // the link to the full case study closes the page, after the sections
  // before it, in the next theme in turn
  const sectionCount = isDraft ? 1 : isStudy ? studyParts.length : isPlatform ? platformParts.length : hasOverview ? 2 : 1;
  const order = ARCHIVE_ORDER.some((key) => PROJECTS[key] === project) ? ARCHIVE_ORDER : ORDER;
  const here = order.findIndex((key) => PROJECTS[key] === project);
  const next = PROJECTS[order[(here + 1) % order.length]];
  // (and the one before it, the last for the first - or for a project not on the list)
  const previous = PROJECTS[order[((here < 0 ? 0 : here) - 1 + order.length) % order.length]];

  // the screenshots have no size until they load, so the page grows after
  // it mounts and everything below them moves down. re-measure the scroll
  // triggers once the loads settle - one refresh for a burst of images
  const remeasure = useCallback(() => {
    clearTimeout(remeasure.timer);
    remeasure.timer = setTimeout(() => ScrollTrigger.refresh(), 150);
  }, []);

  // the name keeps the heroes' shared size - unless a word of it is wider
  // than its column (a word never breaks: SplitText), when the name is set
  // just small enough for that word to fit. again on every resize
  const fxTitle = useRef();
  useLayoutEffect(() => {
    const title = fxTitle.current;
    const fit = () => {
      title.style.fontSize = '';
      const widest = Math.max(...[...title.querySelectorAll('.split-word')].map((word) => word.scrollWidth));
      if (widest > title.clientWidth) {
        title.style.fontSize = `${parseFloat(getComputedStyle(title).fontSize) * title.clientWidth / widest * .98}px`;
      }
    };
    fit();
    document.fonts?.ready.then(fit);
    window.addEventListener('resize', fit);
    return () => {
      window.removeEventListener('resize', fit);
      title.style.fontSize = '';
    };
  }, [project]);

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
    // (a colleague's picture on a quote card opens in pixels as its name
    // rises, as on the landing page's testimonials, and shuts again with
    // the card scrolled back above it)
    const toggles = [];
    const cards = gsap.utils.toArray('.case-card').map((card) => {
      const avatar = card.querySelector('.case-quote-avatar');
      const toggle = avatar && pixelToggle(avatar);
      if (toggle) {
        gsap.set(avatar, { clipPath: 'inset(100% 0% 0% 0%)' });
        toggles.push({ avatar, toggle });
      }
      return scrollRevealSequence([
        { targets: card, vars: { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut' } },
        { targets: card.querySelectorAll('.split-letter'), vars: { y: 0, stagger: .012, ease: 'power1.in' }, position: '<.3' },
        ...(toggle ? [{
          targets: avatar,
          vars: { opacity: 1, duration: .6, onStart: () => toggle.show(.6), onReverseComplete: () => toggle.hide(.35) },
          position: '<',
        }] : []),
      ], { trigger: card });
    });
    const avatars = toggles.map(({ avatar, toggle }) => ({
      kill: () => { toggle.kill(); gsap.set(avatar, { clearProps: 'clipPath' }); },
    }));

    const panels = gsap.utils.toArray('.case-panel').map((panel) => scrollReveal(
      panel, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut' }));

    return () => {
      [...sections, ...images, ...cards, ...avatars, ...panels].forEach((reveal) => reveal.kill());
    };
  }, [project]);

  // a case study still being written has no cover yet, and shows none
  const hasCover = !!hero || !isDraft;

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
            <h1 ref={fxTitle} className='project-h1 hero-designerdev flex flex-wrap content-start font-flexible font-bold leading-[.95] tracking-tight
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
            {/* lower right: the link to the live site, where there is one */}
            {project.link && (
              <div className='flex items-end shrink-0'>
                <Button label={project.link.label || 'Visit site'} href={project.link.href} external />
              </div>
            )}
          </div>
        </section>
        {/* hero visual - the whole section, edge to edge; a full screen
          from laptop width up (.case-visual, App.css) */}
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
        {studyParts.map((part, i) => (
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

        {/* the challenge - what the project had to solve */}
        {has('challenge') && (
        <CaseSection id='challenge' title='The Challenge' theme={themeOf('challenge')}>
          {/* (a line set large, then the paragraphs under it - or the
            paragraphs alone) */}
          {platform.challenge.lead && <Lead id='challenge' text={platform.challenge.lead} className={BELOW} />}
          {[].concat(platform.challenge.text || platform.challenge).map((paragraph, i, all) => (
            <Copy id='challenge' text={paragraph} className={i < all.length - 1 ? BELOW : ''} key={paragraph} />
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

        {/* design approach - structure and user flows */}
        {has('approach') && (
        <CaseSection id='approach' title='Design Approach' theme={themeOf('approach')}>
          {/* each decision a card of its own, one to a row - or paragraphs */}
          {[].concat(platform.approach)[0]?.title
            ? <Cards id='approach' items={platform.approach.slice(0, KEY_DECISIONS)} rows />
            : [].concat(platform.approach).map((paragraph, i, all) => (
              <Copy id='approach' text={paragraph} className={i < all.length - 1 ? BELOW : ''} key={paragraph} />
            ))}
        </CaseSection>
        )}

        {/* its screens, under the label at full width */}
        {has('screens') && (
        <CaseSection id='screens' title='Platform Screens' theme={themeOf('screens')} wide>
          <Screens shots={shots} onLoad={remeasure} />
        </CaseSection>
        )}

        {/* design system - what the platform is built from */}
        {has('system') && (
        <CaseSection id='system' title='Design System' theme={themeOf('system')}>
          <Copy id='system' text={platform.system} />
        </CaseSection>
        )}

        {/* results and impact - what it achieved, then one card per figure */}
        {has('outcome') && (
        <CaseSection id='outcome' title='Results & Impact' theme={themeOf('outcome')}>
          {/* one paragraph, then the figures */}
          {platform.outcome && <Copy id='outcome' text={platform.outcome} className={platform.metrics || platform.quote ? BELOW : ''} />}
          {platform.metrics && (
          <ul className={`grid gap-4 ${FIGURES[Math.min(platform.metrics.length, 4)]}`}>
            {platform.metrics.map((metric) => (
              <li className={`case-card ${CARD} flex flex-col justify-between ${platform.metrics.length > 1 ? FIGURE_ROOM : ONE_FIGURE_ROOM}`}
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
          {/* and what colleagues said of the work, under the figures */}
          {platform.quote && [].concat(platform.quote).map((quote, i) => (
            <Quote {...quote} key={quote.name} className={platform.metrics || i > 0 ? 'mt-4' : ''} />
          ))}
        </CaseSection>
        )}
        </>
        ) : (
        <>
        {/* a build. overview - what it is, when it says, then my role on it
          and what it was built with */}
        {hasOverview && (
        <CaseSection id='overview' title={overview.length ? 'Project Overview' : 'Role & Tech Stack'} theme={LIGHT}>
          {overview.map((paragraph) => (
            <Copy id='overview' text={paragraph} className={BELOW} key={paragraph} />
          ))}
          <Points id='overview' label='My role' items={project.roles} className={BELOW} />
          <Points id='overview' label='Built with' items={project.technologies} />
        </CaseSection>
        )}

        {/* its screens, under the label at full width - light when they
          follow the cover directly, so the two are not one dark run */}
        <CaseSection id='screens' title='Project Screens' theme={hasOverview ? DARK : LIGHT} wide>
          {/* (a row of phone screens - `phones` - spans the width, four
            to a row from tablet width up) */}
          <Screens shots={shots} onLoad={remeasure} />
          {!shots.length && (
            <div className={SCREEN_RUN}>
              {['Screen one', 'Screen two', 'Screen three'].map((name) => (
                <Panel label={name} className={`aspect-[16/10] break-inside-avoid ${SCREEN_GAP}`} key={name} />
              ))}
            </div>
          )}
        </CaseSection>
        </>
        )}

        {/* the full case study, on Behance - after the short version here */}
        {short && !isDraft && (
        <CaseSection id='full' title='Full Case Study' theme={sectionCount % 2 ? DARK : LIGHT}>
          <Copy id='full' text='These are the key parts. The full case study, with the complete process and every screen, is on Behance.' className={BELOW} />
          <Button label='View on Behance' href={project.behance} external />
        </CaseSection>
        )}

      </article>
      {/* the close: the next project, in the contact section's layout */}
      <Contact next={next} previous={previous} current={project}/>
    </>
  )
}

export default ProjectPage
