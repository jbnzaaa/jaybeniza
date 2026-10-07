//
import React, { useCallback, useEffect } from 'react'
// icons
import {RiArrowRightDownLine} from 'react-icons/ri'
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
// scroll reveal
import { scrollReveal, scrollRevealSequence } from '../../../utils/scrollReveal'
// per-letter text split
import SplitText from '../../common/SplitText'
// contact section - same block the landing page ends on
import Contact from '../Contact'
gsap.registerPlugin(ScrollTrigger)

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

// the shared type sizes of the page's body text and its small labels
const BODY = 'mobile:text-[.9rem] tablet:text-[.9rem] laptop:text-[1rem] laptop-lg:text-[1rem] desktop:text-[1.1rem]';
const LABEL = 'font-semibold mobile:text-[.7rem] tablet:text-[.75rem] laptop:text-[.9rem] laptop-lg:text-[.9rem] desktop:text-[.9rem]';
// a detail's value sits a step below its label
const VALUE = `${BODY} text-muted`;
const BLOCK = 'last:mb-0 mobile:mb-4 tablet:mb-4 laptop:mb-5 laptop-lg:mb-5 desktop:mb-5';

/**
 * A project page: a one-screen overview - the project's name top left,
 * its description top right, the details (year, category, role,
 * technology) bottom left and the visit-site button bottom right - then
 * the screenshots, then the contact section. Return sits
 * in the top bar, in the Menu button's place (Navbar.jsx). One layout for
 * every project - the content comes from projects.js.
 */
function ProjectPage({ project }) {
  // the screenshots have no size until they load, so the page grows after
  // it mounts and everything below them (later screenshots, the contact
  // section, the point where the top bar goes behind it) moves down.
  // re-measure the scroll triggers once the loads settle - one refresh
  // for a burst of images, not one each
  const remeasure = useCallback(() => {
    clearTimeout(remeasure.timer);
    remeasure.timer = setTimeout(() => ScrollTrigger.refresh(), 150);
  }, []);

  useEffect(() => {
    // project content animation - the landing page's per-letter reveal
    const reveal = scrollReveal('#animate-project-page', {
      y: 0,
      stagger: .02,
      ease: 'power1.in',
    });

    // each screenshot reveals as it scrolls into view, the way the landing
    // page's project cards do: the frame wipes up from its bottom edge
    // while the image inside eases down from slightly enlarged to its real
    // size, both at once
    const cards = gsap.utils.toArray('.screenshot-container').map((card) => scrollRevealSequence([
      { targets: card, vars: { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut' } },
      { targets: card.querySelector('.screenshot-img'), vars: { scale: 1, ease: 'power2.out' }, position: '<' },
    ], { trigger: card }));

    return () => {
      reveal.kill();
      cards.forEach((card) => card.kill());
    };
  }, [project]);

  const visitLink = (
    <div className='project-link'>
      <a href={project.link.href} target='_blank' rel='noreferrer' aria-label={`Visit the ${project.title} site`}
        className='inline-block'>
        <span className={`flex items-center ${BODY}`}>
          <SplitText text='Visit site' id='animate-project-page' />
          <span className='menu-icon-clip'>
            <span className='menu-icon' id='animate-project-page'>
              <RiArrowRightDownLine id='icon' className='fill-black ml-1
                mobile:text-xl
                tablet:text-1xl
                laptop:text-2xl
                laptop-lg:text-2xl
                desktop:text-2xl'/>
            </span>
          </span>
        </span>
      </a>
    </div>
  );

  return (
    <>
      <section className='px-0 pb-16 h-full
        mobile:px-[.9rem]
        tablet:px-[1rem]
        laptop:px-[2rem]
        laptop-lg:px-[3rem]
        desktop:px-[3rem]'>
        {/* overview - fills one screen (more if the content needs it): the
          title top left with the description top right, and the details
          pushed to the bottom left via justify-between. top padding clears
          the fixed nav bar */}
        <div className='project-container flex flex-col justify-between min-h-screen-safe gap-y-12 pt-24
          mobile:pb-8
          tablet:pb-8
          laptop:pb-8
          laptop-lg:pb-10
          desktop:pb-12'>
          {/* top - project title left, description right */}
          <div className='grid grid-cols-8 gap-x-5 gap-y-6'>
            <div className='col-start-1 flex flex-wrap
              mobile:col-span-8 mobile:text-[13vw]
              tablet:col-span-8 tablet:text-[12vw]
              laptop:col-span-5 laptop:text-[11vw]
              laptop-lg:col-span-5 laptop-lg:text-[11vw]
              desktop:col-span-5 desktop:text-[11vw]'>
              <h1 className='project-h1 font-flexible font-medium leading-none tracking-tighter'>
                <SplitText text={project.title} id='animate-project-page' />
              </h1>
            </div>
            <p className={`flex flex-wrap content-start ${BODY}
              mobile:col-span-8 mobile:col-start-1
              tablet:col-span-5 tablet:col-start-4
              laptop:col-span-3 laptop:col-start-6
              laptop-lg:col-span-2 laptop-lg:col-start-7
              desktop:col-span-2 desktop:col-start-7`}>
              <SplitText text={project.description} id='animate-project-page' />
            </p>
          </div>
          {/* bottom - details in the left corner, the visit-site button in
            the right. on a phone they stack: the button sits under the
            details, left-aligned */}
          <div className='flex justify-between items-end gap-x-5
            mobile:flex-col mobile:items-start mobile:gap-y-6'>
          {/* year, category, role, technology used */}
          <div className='
            mobile:w-full
            tablet:w-[62.5%]
            laptop:w-[37.5%]
            laptop-lg:w-[37.5%]
            desktop:w-[37.5%]'>
            {/* year */}
            <div className={BLOCK}>
              <div className={LABEL}>
                <SplitText text='Year' id='animate-project-page' />
              </div>
              <div className={VALUE}>
                <SplitText text={project.year} id='animate-project-page' />
              </div>
            </div>
            {/* category */}
            <div className={BLOCK}>
              <div className={LABEL}>
                <SplitText text='Category' id='animate-project-page' />
              </div>
              <div className={VALUE}>
                <SplitText text={project.category} id='animate-project-page' />
              </div>
            </div>
            {/* role */}
            <div className={BLOCK}>
              <div className={LABEL}>
                <SplitText text='Role' id='animate-project-page' />
              </div>
              <div className={`flex flex-wrap ${VALUE}`}>
                {project.roles.map((role) => (
                  <SplitText text={role} id='animate-project-page' key={role} />
                ))}
              </div>
            </div>
            {/* technology used */}
            <div className={BLOCK}>
              <div className={LABEL}>
                <SplitText text='Technology Used' id='animate-project-page' />
              </div>
              <div className={`flex flex-wrap ${VALUE}`}>
                {project.technologies.map((technology) => (
                  <SplitText text={technology} id='animate-project-page' key={technology} />
                ))}
              </div>
            </div>
          </div>
          {/* visit site */}
          <div className='shrink-0'>
            {visitLink}
          </div>
          </div>
        </div>
        {/* project container row 3 */}
        <div className='project-container grid grid-cols-8 gap-x-5
          mobile:mt-6
          tablet:mt-8
          laptop:mt-10
          laptop-lg:mt-10
          desktop:mt-10
          mobile:gap-y-5
          tablet:gap-y-10
          laptop:gap-y-14
          laptop-lg:gap-y-20
          desktop:gap-y-20'>
          {project.screenshots.map(({ src, alt, start }) => (
            <div className={`screenshot-container border border-black/[.14] ${SHOT_LAYOUT[start]}`} key={alt}>
              <img src={src} alt={alt} className='screenshot-img' onLoad={remeasure}/>
            </div>
          ))}
        </div>
      </section>
      <Contact/>
    </>
  )
}

export default ProjectPage
