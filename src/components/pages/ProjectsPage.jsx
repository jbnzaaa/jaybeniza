//
import React, { useCallback, useEffect } from 'react'
// Components
import Contact from './Contact';
// project content
import { PROJECTS } from './projects/projects'
// GSAP
import ScrollTrigger from 'gsap/ScrollTrigger'
// page-to-page wipe
import { TransitionLink } from '../common/PageTransition'
// scroll reveal
import { scrollReveal, scrollRevealSequence } from '../../utils/scrollReveal'
// per-letter text split
import SplitText from '../common/SplitText'

// every project, in the order shown - the landing page's three first
const ORDER = ['dailydiscount', 'regain', 'jaysonbeniza', 'jbnza'];

const DESCRIPTION = 'Everything I have designed and built, from interface design in Figma to the shipped front-end. Open a project for the details and the part I played in it.';

/**
 * The projects page (route /projects): every project as a card - its
 * first screenshot, name, year and my role - each opening the project's
 * own page. Reached from the "More projects" button in the landing page's
 * selected projects section. Return sits in the top bar (Navbar.jsx).
 */
function ProjectsPage() {
  // the images have no size until they load, so re-measure the scroll
  // triggers once the loads settle - one refresh for a burst of images
  const remeasure = useCallback(() => {
    clearTimeout(remeasure.timer);
    remeasure.timer = setTimeout(() => ScrollTrigger.refresh(), 150);
  }, []);

  useEffect(() => {
    // title and description - the landing page's per-letter reveal
    const intro = scrollReveal('#animate-projects-page', { y: 0, stagger: .02, ease: 'power1.in' });

    // each card reveals as it scrolls into view, the way the project
    // pages' screenshots do: the frame wipes up from its bottom edge while
    // the image inside eases down to its real size, then its text rises
    const cards = ORDER.map((id) => scrollRevealSequence([
      { targets: `#projects-card-${id}`, vars: { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut' } },
      { targets: `#projects-card-${id} .screenshot-img`, vars: { scale: 1, ease: 'power2.out' }, position: '<' },
      { targets: `#animate-projects-${id}`, vars: { y: 0, stagger: .02, ease: 'power1.in' }, position: '<.28' },
    ], { trigger: `#projects-card-${id}` }));

    return () => {
      intro.kill();
      cards.forEach((card) => card.kill());
    };
  }, []);

  return (
    <>
      {/* top padding clears the fixed nav bar */}
      <section className='pt-24
        mobile:px-[.9rem] mobile:pb-16
        tablet:px-[1rem] tablet:pb-16
        laptop:px-[2rem] laptop:pb-20
        laptop-lg:px-[3rem] laptop-lg:pb-24
        desktop:px-[3rem] desktop:pb-28'>
        {/* title left, description right */}
        <div className='grid grid-cols-8 gap-x-5 gap-y-4
          mobile:mb-10
          tablet:mb-12
          laptop:mb-16
          laptop-lg:mb-20
          desktop:mb-24'>
          <h1 className='col-start-1 flex flex-wrap font-flexible font-medium leading-none
            mobile:col-span-8 mobile:text-[8vw]
            tablet:col-span-8 tablet:text-[6vw]
            laptop:col-span-4 laptop:text-[4vw]
            laptop-lg:col-span-4 laptop-lg:text-[3.6vw]
            desktop:col-span-4 desktop:text-[3.6vw]'>
            <SplitText text='Projects' id='animate-projects-page' />
          </h1>
          <p className='flex flex-wrap content-start
            mobile:col-span-8 mobile:col-start-1 mobile:text-[.9rem]
            tablet:col-span-6 tablet:col-start-1 tablet:text-[.9rem]
            laptop:col-span-3 laptop:col-start-6 laptop:text-[1rem]
            laptop-lg:col-span-3 laptop-lg:col-start-6 laptop-lg:text-[1rem]
            desktop:col-span-3 desktop:col-start-6 desktop:text-[1.1rem]'>
            <SplitText text={DESCRIPTION} id='animate-projects-page' by='word' />
          </p>
        </div>
        {/* one card per project */}
        <ul className='project-container grid gap-x-5
          mobile:grid-cols-1 mobile:gap-y-10
          tablet:grid-cols-2 tablet:gap-y-12
          laptop:grid-cols-2 laptop:gap-y-16
          laptop-lg:grid-cols-2 laptop-lg:gap-y-20
          desktop:grid-cols-2 desktop:gap-y-24'>
          {ORDER.map((id) => {
            const project = PROJECTS[id];
            return (
              <li className='m-0' key={id}>
                <TransitionLink to={project.path} aria-label={`${project.title} case study`} className='block'>
                  {/* image - the project's first screenshot, cropped to one shape */}
                  <div className='screenshot-container aspect-[16/10] border border-black/[.14]' id={`projects-card-${id}`}>
                    <img src={project.screenshots[0].src} alt={project.screenshots[0].alt}
                      className='screenshot-img h-full object-cover object-left-top' onLoad={remeasure}/>
                  </div>
                  {/* name left, year and role right - stacked where a card
                    is too narrow to hold both on one line */}
                  <div className='flex justify-between items-end gap-x-5 pt-3
                    mobile:flex-col mobile:items-start mobile:gap-y-1
                    tablet:flex-col tablet:items-start tablet:gap-y-1
                    laptop:flex-col laptop:items-start laptop:gap-y-1'>
                    <span className='font-flexible font-medium leading-none
                      mobile:text-[2rem]
                      tablet:text-[2rem]
                      laptop:text-[2.4rem]
                      laptop-lg:text-[2.8rem]
                      desktop:text-[3.4rem]'>
                      <SplitText text={project.title} id={`animate-projects-${id}`} />
                    </span>
                    <span className='flex flex-wrap text-muted
                      mobile:text-[.7rem]
                      tablet:text-[.75rem]
                      laptop:text-[.8rem]
                      laptop-lg:text-[.8rem] laptop-lg:justify-end
                      desktop:text-[.8rem] desktop:justify-end'>
                      <SplitText text={`${project.year} / ${project.roles.join(', ')}`} id={`animate-projects-${id}`} by='word' />
                    </span>
                  </div>
                </TransitionLink>
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
