//
import React, { useEffect } from 'react'
// scroll reveal - the parts open on the site's card reveal
import { scrollReveal, scrollRevealCards, scrollRevealSequence } from '../../utils/scrollReveal'
// section label
import Tag from '../common/Tag'
// per-letter text split
import SplitText from '../common/SplitText'
// the way to every service
import Button from '../common/Button'
// page-to-page wipe, for the services and the case studies they show in
import { TransitionLink } from '../common/PageTransition'
// the mock-ups shown after each service on the services page
import aaccupMockup from '../../assets/files/images/aaccup/mockup-cover.webp'
import pciMockup from '../../assets/files/images/pci/mockup-cover.webp'
import roverMockup from '../../assets/files/images/rover/mockup-cover.webp'
// what I do, in three parts: a service's name, what it is (`text`), its
// highlights in short (`meta`), the four things it covers (`includes`) -
// each with a line on it (`blurb`) and a clip in halftone (`gif`, from
// Tenor at its small `AAAAM` size, `alt` saying what is in it)
const TENOR = 'https://media1.tenor.com/m/';
// the line under the landing page's list
const OVERVIEW = 'From understanding the problem to shaping the interface and bringing it into code, my work connects the decisions that make digital products usable, consistent, and ready to build.';

export const SERVICES = [
  {
    id: 'product-design',
    // its highlights, in short, beside its name on the landing page
    meta: 'Product & Experience Design',
    // the mock-up of the project that shows it best, on the services page
    mockup: { src: aaccupMockup, alt: 'AACCUP accreditation platform mock-up' },
    title: 'UI/UX Design',
    emphasis: ['UI/UX'],
    text: 'Complex products demand more than polished screens. I untangle user journeys, clarify competing requirements, and shape interfaces that make demanding workflows easier to understand and navigate.',
    includes: [
      { label: 'Research and journey mapping', blurb: 'Understand who uses the product, what they need to accomplish, and where the current experience creates friction.', gif: `${TENOR}4LvAD8hD5tcAAAAM/charlie-day.gif`, alt: 'Charlie Day explaining a conspiracy board' },
      { label: 'Wireframes and high-fidelity UI', blurb: 'Establish the structure before refining the visual experience, from early layouts to developer-ready screens.', gif: `${TENOR}JtzTo08HZY4AAAAM/jarvis-iron-man.gif`, alt: 'Tony Stark giving JARVIS commands' },
      { label: 'Prototyping and interaction design', blurb: 'Make important user journeys tangible through interactive prototypes that reveal how the product should behave.', gif: `${TENOR}WwvFH4SrFCIAAAAM/dexters-lab-dexters-laboratory.gif`, alt: 'Dee Dee wondering what a button does' },
      { label: 'Usability and role-based testing', blurb: 'Evaluate workflows with relevant users, uncover points of confusion, and refine the experience before implementation.', gif: `${TENOR}PNbVvwHpi6kAAAAM/mr-bean-takes-an-exam-mister-bean-takes-an-exam.gif`, alt: 'Mr. Bean taking an exam' },
    ],
  },
  {
    id: 'design-systems',
    meta: 'Design Systems & UI Foundations',
    // the mock-up of the project that shows it best, on the services page
    mockup: { src: pciMockup, alt: 'Central App design system mock-up' },
    title: 'Design Systems',
    emphasis: ['Systems'],
    text: "Consistency shouldn't depend on remembering how the last screen was designed. I establish shared components, visual foundations, and clear usage rules that help teams maintain a coherent product as its interface grows.",
    includes: [
      { label: 'Component libraries and variants', blurb: 'Reusable components with defined states and variations, reducing repeated decisions across screens.', gif: `${TENOR}2YH2HLiOdB4AAAAM/legal-eagle-puts-on-glasses.gif`, alt: 'Putting on glasses, ready to get started' },
      { label: 'Color, type and spacing foundations', blurb: 'A connected system of typography, color, spacing, and visual rules that gives every interface a shared foundation.', gif: `${TENOR}5lLcKZgmIhgAAAAM/american-psycho-patrick-bateman.gif`, alt: 'Patrick Bateman admiring a business card' },
      { label: 'Documentation and usage guidance', blurb: '	Practical guidance that clarifies when, where, and how components should be used.', gif: `${TENOR}LiDD5Bl5AXEAAAAM/spongebob-the.gif`, alt: 'SpongeBob writing his essay' },
      { label: 'Specs and developer handoff', blurb: 'Clear interaction states and implementation details that reduce ambiguity between design and development.', gif: `${TENOR}EfuLzvwuJlMAAAAM/documents.gif`, alt: 'Handing over a stack of documents' },
    ],
  },
  {
    id: 'development',
    meta: 'Design-Led Front-End Development',
    // the mock-up of the project that shows it best, on the services page
    mockup: { src: roverMockup, alt: 'Rover SIS mock-up' },
    title: 'Design to Code',
    emphasis: ['Code'],
    text: 'A design should hold up beyond the prototype. I use React, Tailwind CSS, and AI-assisted development to translate interface decisions into functional front ends, preserving the details, interactions, and visual consistency established in Figma.',
    includes: [
      { label: 'React and Tailwind CSS front-ends', blurb: 'Responsive interfaces developed from established designs, with attention to layout, hierarchy, and component structure.', gif: `${TENOR}fTor6GW-vvoAAAAM/bumblebee-transformer.gif`, alt: 'Bumblebee transforming', trim: [.14, .14] },
      { label: 'AI-assisted development with Claude Code', blurb: 'Claude Code supports implementation and refinement, helping move from design decisions to working interfaces..', gif: `${TENOR}XgaU95K_XiwAAAAM/kermit-typing.gif`, alt: 'Kermit typing furiously' },
      { label: 'Figma-to-code translation', blurb: 'Carry typography, spacing, component states, and responsive behavior from Figma into the browser.', gif: `${TENOR}31K0izlbI5cAAAAM/phineas-and-ferb-heinz-doofenschmirtz.gif`, alt: 'Doofenschmirtz building an invention, laughing' },
      { label: 'Scroll and interaction motion', blurb: 'Purposeful motion using GSAP to communicate transitions, hierarchy, and feedback without distracting from the experience.', gif: `${TENOR}hPdjxM-fcegAAAAM/gif.gif`, alt: 'Michael Jackson leaning in Smooth Criminal' },
    ],
  },
];

// the sections' spacing: the same each side, and at the foot
const SIDES = `mobile:px-[1rem] tablet:px-[1rem] laptop:px-[2rem] laptop-lg:px-[3rem] desktop:px-[3rem]`;

/**
 * Every service in full, for the services page (ServicesPage.jsx): a
 * section each, as tall as its content, light and dark in turn - its label, its
 * name and, close under it, what it is on the left; then, in a row of
 * its own below, the four things it covers, numbered 01 to 04 between
 * rules, on the right - all
 * rising as they come on screen. After each, a
 * section of its own: the mock-up of the project that shows it best
 * (`mockup`), the screen's width, wiping open as it comes up the screen
 * while the picture inside eases down to size.
 */
export function ServiceDetails() {
  useEffect(() => {
    const heads = SERVICES.map(({ id }) => scrollReveal(`#animate-service-head-${id}`,
      { y: 0, stagger: .015, ease: 'power1.in' }, { trigger: `#service-head-${id}` }));
    const expects = SERVICES.map(({ id }) => scrollReveal(`#animate-service-expect-${id}`,
      { y: 0, stagger: .015, ease: 'power1.in' }, { trigger: `#service-expect-${id}` }));
    const lists = SERVICES.map(({ id }) => scrollReveal(`#animate-service-list-${id}`,
      { y: 0, stagger: .015, ease: 'power1.in' }, { trigger: `#service-list-${id}` }));
    // the rules between each list's items, drawn across from the left one
    // after another as the list comes in
    const rules = SERVICES.map(({ id }) => scrollRevealSequence([
      { targets: `#service-list-${id} .service-rule`, vars: { scaleX: 1, duration: .7, stagger: .08, ease: 'power3.out' } },
    ], { trigger: `#service-list-${id}` }));
    const mockups = scrollRevealCards(SERVICES.map(({ id }) => ({ card: `#service-mockup-${id}`, text: `#animate-service-mockup-${id}` })));
    return () => {
      heads.forEach((reveal) => reveal.kill());
      expects.forEach((reveal) => reveal.kill());
      lists.forEach((reveal) => reveal.kill());
      rules.forEach((reveal) => reveal.kill());
      mockups.kill();
    };
  }, []);

  return (
    <>
      {SERVICES.map((service, i) => (
        <React.Fragment key={service.id}>
          <section id={`service-${service.id}`} className={`${i % 2 ? 'theme-light' : 'bg-surface'} grid grid-cols-12 gap-x-6 ${SIDES}
            mobile:pt-16 mobile:pb-4 mobile:gap-y-12
            tablet:pt-16 tablet:pb-4 tablet:gap-y-14
            laptop:pt-20 laptop:pb-8
            laptop-lg:pt-24 laptop-lg:pb-12
            desktop:pt-28 desktop:pb-12`}>
            {/* first row, on the left: its label, name and what it is */}
            <div className='row-start-1 flex flex-col
              mobile:col-span-12 tablet:col-span-10 laptop:col-span-6 laptop-lg:col-span-6 desktop:col-span-5'>
              <div className='flex flex-col gap-y-6' id={`service-head-${service.id}`}>
                <Tag label={`Service 0${i + 1}`} id={`animate-service-tag-${service.id}`} />
                <h2 className='flex flex-wrap font-flexible font-medium leading-[.95] tracking-tight text-title'>
                  <SplitText text={service.title} id={`animate-service-head-${service.id}`} emphasis={service.emphasis} />
                </h2>
              </div>
              {/* (close under its name: what it is) */}
              <div className='mobile:mt-4 tablet:mt-5 laptop:mt-6 laptop-lg:mt-6 desktop:mt-6' id={`service-expect-${service.id}`}>
                <p className='flex flex-wrap text-copy'>
                  <SplitText text={service.text} id={`animate-service-expect-${service.id}`} by='word' />
                </p>
              </div>
            </div>
            {/* a row of its own under it, on the right: the four things it
              covers, numbered */}
            <ul className='flex flex-col row-start-2
              mobile:col-span-12 tablet:col-span-12
              laptop:col-span-5 laptop:col-start-8 laptop:mt-16 laptop-lg:col-span-5 laptop-lg:col-start-8 laptop-lg:mt-20 desktop:col-span-4 desktop:col-start-9 desktop:mt-20' id={`service-list-${service.id}`}>
              {service.includes.map(({ label, blurb }, j) => (
                <li className='service-row relative flex items-start gap-x-2 m-0 py-4' key={label}>
                  {/* the rule above it (not the first), drawn across as the list comes in */}
                  {j > 0 && <span className='service-rule absolute top-0 left-0 w-full h-px bg-current opacity-20' aria-hidden='true' />}
                  {/* (a set width, so the names line up whatever the digits; not a
                    flex box, which squeezed the number's clip box and cut it) */}
                  <span className='service-num shrink-0 w-10 whitespace-nowrap text-caption text-muted'>
                    <SplitText text={`0${j + 1}`} id={`animate-service-list-${service.id}`} />
                  </span>
                  <div className='flex min-w-0 flex-col gap-y-2'>
                    <span className='flex flex-wrap text-copy'>
                      <SplitText text={label} id={`animate-service-list-${service.id}`} />
                    </span>
                    <p className='text-caption text-muted leading-relaxed'>{blurb}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          {/* after it: the mock-up that shows it, the screen's width */}
          <section className='bg-black' aria-label={service.mockup.alt}>
            <div className='reveal-card overflow-hidden w-full
              mobile:aspect-[4/3] tablet:aspect-[16/10] laptop:h-[90vh] laptop-lg:h-[90vh] desktop:h-[90vh]' id={`service-mockup-${service.id}`}>
              <div className='reveal-card-inner w-full h-full'>
                <img className='w-full h-full object-cover' src={service.mockup.src} alt={service.mockup.alt} loading='lazy' />
              </div>
            </div>
          </section>
        </React.Fragment>
      ))}
    </>
  )
}

/**
 * What I do, on the landing page, laid out as Featured Work once was: the
 * services' names set very large, one per line, each with its highlights
 * in short against the right edge; pointing at a row steps the others
 * back. A row leads to that service on the services page.
 */
function Services() {
  useEffect(() => {
    // each name and its label rise letter by letter as its row scrolls in;
    // the description after the list does the same
    const rows = SERVICES.map(({ id }) => scrollReveal(`#animate-service-row-${id}`,
      { y: 0, stagger: .02, ease: 'power1.in' }, { trigger: `#service-row-${id}` }));
    const description = scrollReveal('#animate-services-overview', { y: 0, stagger: .02, ease: 'power1.in' });
    return () => {
      rows.forEach((row) => row.kill());
      description.kill();
    };
  }, []);

  return (
    <section id='what-i-do' className={`bg-surface flex flex-col min-h-screen-safe-laptop ${SIDES}
      mobile:pt-16 mobile:pb-4
      tablet:pt-16 tablet:pb-4
      laptop:pt-20 laptop:pb-8
      laptop-lg:pt-24 laptop-lg:pb-12
      desktop:pt-28 desktop:pb-12`}>
      <Tag label='Areas of Expertise' id='animate-services-tag' />
      <ul className='project-list mobile:mt-6 tablet:mt-8 laptop:mt-8 laptop-lg:mt-10 desktop:mt-10' data-no-hover-roll>
        {SERVICES.map((service) => (
          <li className='m-0 mobile:mb-10 tablet:mb-12 laptop:py-3 laptop-lg:py-4 desktop:py-5' id={`service-row-${service.id}`} key={service.id}>
            <TransitionLink to={`/services#service-${service.id}`} className='project-row block' aria-label={`${service.title}, ${service.meta}`}>
              <span className='flex justify-between gap-x-6
                mobile:flex-col mobile:items-start mobile:gap-y-4
                tablet:flex-col tablet:items-start tablet:gap-y-4
                laptop:items-end laptop-lg:items-end desktop:items-end'>
                <span className='project-name font-flexible font-medium leading-[.95] tracking-tight whitespace-nowrap
                  text-project mobile:text-title tablet:text-title'>
                  <SplitText text={service.title} id={`animate-service-row-${service.id}`} emphasis={service.emphasis} />
                </span>
                {/* its highlights, in short */}
                <span className='project-label shrink-0 flex flex-wrap text-copy text-muted
                  mobile:justify-start mobile:text-left tablet:justify-start tablet:text-left
                  laptop:justify-end laptop:text-right laptop-lg:justify-end laptop-lg:text-right desktop:justify-end desktop:text-right
                  laptop:pb-4 laptop-lg:pb-5 desktop:pb-6'>
                  <SplitText text={service.meta} id={`animate-service-row-${service.id}`} />
                </span>
              </span>
            </TransitionLink>
          </li>
        ))}
      </ul>
      {/* description + the way to every service */}
      {/* (at the section's foot: the section is a screen tall) */}
      <div className='flex flex-col items-start gap-y-6 mt-auto mobile:pt-10 tablet:pt-12 laptop:pt-12 laptop-lg:pt-12 desktop:pt-16'>
        <p className='flex flex-wrap text-copy mobile:w-[78%] tablet:w-[52%] laptop:w-[34%] laptop-lg:w-[30%] desktop:w-[28%]'>
          <SplitText text={OVERVIEW} id='animate-services-overview' by='word' />
        </p>
        <Button label='All services' to='/services' />
      </div>
    </section>
  )
}

export default Services
