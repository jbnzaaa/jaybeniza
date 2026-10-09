//
import React, { useCallback, useEffect } from 'react'
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollSmoother from 'gsap/ScrollSmoother'
// page-to-page wipe
import { TransitionLink } from '../../common/PageTransition'
// the site's button and section label
import Button from '../../common/Button'
import Tag from '../../common/Tag'
// scroll reveal
import { scrollReveal, scrollRevealSequence } from '../../../utils/scrollReveal'
// per-letter text split
import SplitText from '../../common/SplitText'
// every project's content - for the link to the next one
import { PROJECTS } from './projects'
// contact section - same block the landing page ends on
import Contact from '../Contact'
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

// the order the projects run in, for "next project"
const ORDER = ['portfoliov3', 'tingi', 'stocknear', 'dailydiscount', 'regain', 'jaysonbeniza', 'jbnza'];

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

// PLACEHOLDERS - what each section of the case study shows until a project
// supplies its own under `caseStudy` in projects.js, with the same keys
// (see the shape of each below). nothing here is a claim about a project:
// every line says it is a placeholder and what belongs in its place
const PLACEHOLDER = {
  challenge: 'Placeholder. Describe the problem this project set out to solve and the context around it: who had the problem, and why it mattered.',
  role: 'Placeholder. Describe what you were responsible for on this project and what you contributed to the team.',
  responsibilities: ['Placeholder responsibility one', 'Placeholder responsibility two', 'Placeholder responsibility three'],
  discovery: 'Placeholder. Describe how you researched the problem: who you talked to, what you looked at, and what you learned.',
  painPoints: ['Placeholder pain point one', 'Placeholder pain point two', 'Placeholder pain point three'],
  insight: 'Placeholder. State the one thing you discovered that shaped the whole design.',
  approach: 'Placeholder. Describe how you structured the product: the user flow and the information architecture behind it.',
  process: 'Placeholder. Describe how the design moved from wireframes, through iterations, to the final screens.',
  stages: [
    { title: 'Wireframes', text: 'Placeholder. Describe the first layouts and what they were meant to test.' },
    { title: 'Iterations', text: 'Placeholder. Describe what changed between rounds, and why.' },
    { title: 'Final', text: 'Placeholder. Describe the finished screens and what settled the design.' },
  ],
  decisionsIntro: 'Placeholder. Describe the decisions that shaped the design most, and what was at stake in each.',
  decisions: [
    { title: 'Decision one', text: 'Placeholder. Describe the decision, the options you weighed, and why this one won.' },
    { title: 'Decision two', text: 'Placeholder. Describe the decision, the options you weighed, and why this one won.' },
    { title: 'Decision three', text: 'Placeholder. Describe the decision, the options you weighed, and why this one won.' },
  ],
  final: 'Placeholder. Describe the major features of the finished product and what makes the interface work.',
  system: 'Placeholder. Describe the design system behind the product: its components and its visual language.',
  outcome: 'Placeholder. Describe the impact of the work: what changed for users and for the business.',
  metrics: [
    { value: '00', label: 'Placeholder metric one' },
    { value: '00', label: 'Placeholder metric two' },
    { value: '00', label: 'Placeholder metric three' },
  ],
  reflection: 'Placeholder. Describe what you learned on this project and what you would do differently next time.',
};

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
function Cards({ id, items }) {
  return (
    <ol className='grid gap-4
      mobile:grid-cols-1
      tablet:grid-cols-3
      laptop:grid-cols-3
      laptop-lg:grid-cols-3
      desktop:grid-cols-3'>
      {items.map((item, i) => (
        <li className='theme-dark bg-card m-0' key={item.title}>
          <div className='h-full flex flex-col justify-between
            mobile:p-6 mobile:gap-y-12
            tablet:p-6 tablet:gap-y-16
            laptop:p-6 laptop:gap-y-24
            laptop-lg:p-6 laptop-lg:gap-y-28
            desktop:p-6 desktop:gap-y-32'>
            <p className='text-caption text-muted'>
              <SplitText text={String(i + 1).padStart(2, '0')} id={`animate-case-${id}`} />
            </p>
            <div>
              <h3 className='flex flex-wrap font-flexible font-medium leading-none text-heading mb-4'>
                <SplitText text={item.title} id={`animate-case-${id}`} />
              </h3>
              <p className='flex flex-wrap text-caption text-muted'>
                <SplitText text={item.text} id={`animate-case-${id}`} by='word' />
              </p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}

// where an image will go: a pale panel that says what belongs in it
function Panel({ label, className = '' }) {
  return (
    <div className={`case-panel theme-light project-placeholder flex flex-col justify-between p-6 ${className}`}>
      <span className='text-caption text-muted'>Placeholder</span>
      <span className='font-flexible font-medium leading-none text-heading text-muted'>{label}</span>
    </div>
  )
}

/**
 * A project page, in one of three layouts.
 *
 * A case study in progress - a project with `inProgress` - is its hero,
 * its cover, and a note that the write-up is to come.
 *
 * A build - a project with no `caseStudy` in projects.js, which is every
 * web development project - is shown as what it is: the hero, the cover,
 * an overview of my role and what it was built with, then its screens,
 * and the link to the next project. No research or process sections it
 * has nothing to put in.
 *
 * A case study - a project that has a `caseStudy` - is laid out in thirteen parts - hero,
 * challenge, my role, discovery, key insight, approach, design process,
 * key design decisions, final product, design system, outcome, reflection
 * and a closing link to the next project and the contact section - in the
 * landing page's design: light and dark sections in turn, each under a
 * small boxed label, with the written content of every section in the
 * same right-hand columns. One layout for every project. The hero, role
 * details and screenshots come from the project's entry in projects.js;
 * the written parts come from its `caseStudy` and fall back to
 * PLACEHOLDER above until it has one.
 */
function ProjectPage({ project }) {
  // which of the two layouts: a case study, or a build
  const isStudy = !!project.caseStudy;
  const isDraft = !!project.inProgress;
  const study = { ...PLACEHOLDER, ...(project.caseStudy || {}) };
  // (a project may have no screenshots yet: panels stand in for them)
  const [hero, ...shots] = project.screenshots || [];
  const here = ORDER.findIndex((key) => PROJECTS[key] === project);
  const next = PROJECTS[ORDER[(here + 1) % ORDER.length]];

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
    const sections = gsap.utils.toArray('[id^="case-"]').map((section) => scrollReveal(
      `#animate-${section.id}`, { y: 0, stagger: .012, ease: 'power1.in' }, { trigger: section, start: 'top 80%' }));

    // each screenshot reveals as it scrolls into view: the frame wipes up
    // from its bottom edge while the image inside eases down to its real size
    const images = gsap.utils.toArray('.screenshot-container').map((card) => scrollRevealSequence([
      { targets: card, vars: { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut' } },
      { targets: card.querySelector('.screenshot-img'), vars: { scale: 1, ease: 'power2.out' }, position: '<' },
    ], { trigger: card }));

    // placeholder panels wipe up the same way
    const panels = gsap.utils.toArray('.case-panel').map((panel) => scrollReveal(
      panel, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut' }));

    return () => {
      [...sections, ...images, ...panels].forEach((reveal) => reveal.kill());
    };
  }, [project]);

  // the hero's arrow scrolls on to the cover
  const toCover = (e) => {
    e.preventDefault();
    ScrollSmoother.get()?.scrollTo('#case-visual', true);
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
              <Button label='See the project' href='#case-visual' onClick={toCover} iconOnly outline />
            </div>
          </div>
        </section>
        {/* hero visual - the whole section, edge to edge; a full screen
          from laptop width up (.case-visual, App.scss) */}
        <section className={DARK}>
          <div className='case-visual screenshot-container
            mobile:aspect-[4/3]
            tablet:aspect-[16/10]'
            id='case-visual'>
            {hero
              ? <img src={hero.src} alt={hero.alt} className='screenshot-img w-full h-full object-cover object-top' onLoad={remeasure}/>
              : <Panel label='Cover' className='w-full h-full' />}
          </div>
        </section>

        {isDraft ? (
        <>
        {/* a case study in progress: what is to come, and nothing made up
          in its place */}
        <CaseSection id='status' title='In progress' theme={LIGHT}>
          <Copy id='status' text={project.inProgress} />
        </CaseSection>
        </>
        ) : isStudy ? (
        <>
        {/* 02 challenge - problem, context */}
        <CaseSection id='challenge' title='Challenge' theme={LIGHT}>
          <Copy id='challenge' text={study.challenge} />
        </CaseSection>

        {/* 03 my role - responsibilities, contribution. the two lists one
          under the other, like discovery's */}
        <CaseSection id='role' title='My Role' theme={DARK}>
          <Copy id='role' text={study.role} className={BELOW} />
          <Points id='role' label='Responsibilities' items={study.responsibilities} className={BELOW} />
          {/* (the tools list only once there are tools to list) */}
          {project.technologies.length > 0 && <Points id='role' label='Tools' items={project.technologies} />}
        </CaseSection>

        {/* 04 discovery - research, pain points */}
        <CaseSection id='discovery' title='Discovery' theme={LIGHT}>
          <Copy id='discovery' text={study.discovery} className={BELOW} />
          <Points id='discovery' label='Pain points' items={study.painPoints} />
        </CaseSection>

        {/* 05 key insight - the one thing, in the same columns as the rest */}
        <CaseSection id='insight' title='Key Insight' theme={DARK}>
          <Copy id='insight' text={study.insight} />
        </CaseSection>

        {/* 06 approach - user flow / information architecture */}
        <CaseSection id='approach' title='Approach' theme={LIGHT}>
          <Copy id='approach' text={study.approach} className={BELOW} />
          <Panel label='User flow / IA' className='aspect-[16/9]' />
        </CaseSection>

        {/* 07 design process - wireframes, iterations, final: a card
          each, side by side */}
        <CaseSection id='process' title='Design Process' theme={DARK}>
          <Copy id='process' text={study.process} className={BELOW} />
          <Cards id='process' items={study.stages} />
        </CaseSection>

        {/* 08 key design decisions - an opening paragraph, then a card
          for each decision, side by side */}
        <CaseSection id='decisions' title='Key Design Decisions' theme={LIGHT}>
          <Copy id='decisions' text={study.decisionsIntro} className={BELOW} />
          <Cards id='decisions' items={study.decisions} />
        </CaseSection>

        {/* 09 final product - major features, polished UI */}
        <CaseSection id='final' title='Final Product' theme={DARK} below={(
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
        )}>
          <Copy id='final' text={study.final} />
        </CaseSection>

        {/* 10 design system - components, visual language. its three
          parts as three cards, side by side */}
        <CaseSection id='system' title='Design System' theme={LIGHT}>
          <Copy id='system' text={study.system} className={BELOW} />
          <div className='grid gap-4
            mobile:grid-cols-1
            tablet:grid-cols-3
            laptop:grid-cols-3
            laptop-lg:grid-cols-3
            desktop:grid-cols-3'>
            {['Colour', 'Typography', 'Components'].map((part) => (
              <Panel label={part} className='aspect-[4/3]' key={part} />
            ))}
          </div>
        </CaseSection>

        {/* 11 outcome - impact, results. one card per figure */}
        <CaseSection id='outcome' title='Outcome' theme={DARK}>
          <Copy id='outcome' text={study.outcome} className={BELOW} />
          <ul className='grid gap-4
            mobile:grid-cols-1
            tablet:grid-cols-3
            laptop:grid-cols-3
            laptop-lg:grid-cols-3
            desktop:grid-cols-3'>
            {study.metrics.map((metric) => (
              <li className={`${CARD} flex flex-col justify-between
                mobile:gap-y-8
                tablet:gap-y-12
                laptop:gap-y-16
                laptop-lg:gap-y-20
                desktop:gap-y-24`}
                key={metric.label}>
                <p className='font-flexible font-medium leading-none text-title'>
                  <SplitText text={metric.value} id='animate-case-outcome' />
                </p>
                <p className='flex flex-wrap text-caption text-muted'>
                  <SplitText text={metric.label} id='animate-case-outcome' by='word' />
                </p>
              </li>
            ))}
          </ul>
        </CaseSection>

        {/* 12 reflection - what I learned */}
        <CaseSection id='reflection' title='Reflection' theme={LIGHT}>
          <Copy id='reflection' text={study.reflection} />
        </CaseSection>

        </>
        ) : (
        <>
        {/* a build. overview - my role on it, and what it was built with */}
        <CaseSection id='overview' title='Overview' theme={LIGHT}>
          <Points id='overview' label='My role' items={project.roles} className={BELOW} />
          <Points id='overview' label='Built with' items={project.technologies} />
        </CaseSection>

        {/* its screens, under the label at full width */}
        <CaseSection id='screens' title='Screens' theme={DARK} wide>
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
        </>
        )}

        {/* 13 cta - next project: its name, a link to it that behaves like
          the top bar's links - its letters roll under the pointer
          (hoverRoll.js) and the cursor's square goes into it (Cursor.jsx)
          - in the full text colour, then the contact section. from laptop width up
          the name is against the right edge, beside the label; below
          that the two are one under the other, both from the left */}
        <CaseSection id='next' title='Next project' theme={isStudy || isDraft ? DARK : LIGHT}>
          <div className='flex
            mobile:justify-start
            tablet:justify-start
            laptop:justify-end
            laptop-lg:justify-end
            desktop:justify-end'>
            <TransitionLink to={next.path} className='nav-item' aria-label={`Next project: ${next.title}`} data-cursor-snap>
              <span className='flex flex-wrap font-flexible font-medium leading-[.92] tracking-tight text-next [color:inherit]
                mobile:justify-start
                tablet:justify-start
                laptop:justify-end
                laptop-lg:justify-end
                desktop:justify-end'>
                <SplitText text={next.title} id='animate-case-next' />
              </span>
            </TransitionLink>
          </div>
        </CaseSection>
      </article>
      <Contact/>
    </>
  )
}

export default ProjectPage
