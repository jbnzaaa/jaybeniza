//
import React, { useEffect, useRef, useState } from 'react'
import { PROJECT_CARDS } from './ProjectCard'
// GSAP
import gsap from 'gsap'
// page-to-page wipe
import { TransitionLink } from '../common/PageTransition'
// scroll reveal
import { scrollReveal } from '../../utils/scrollReveal'
// the site's button and section label
import Button from '../common/Button'
import Tag from '../common/Tag'
// per-letter text split
import SplitText from '../common/SplitText'

const DESCRIPTION = 'A few projects I am proud of, with the part I played in each.';

/**
 * Selected projects, on the dark surface: a list of project names set very
 * large, one per line, each with its year and my part in it against the
 * right edge. Pointing at a row brings up that project's image level
 * with it, between the name and the label, and steps the other rows back.
 * Below laptop width (usually no pointer) each project's image sits under
 * its name instead.
 */
function Project() {
  const fxList = useRef();
  const fxPreview = useRef();
  // the project whose image the preview is showing
  const [shown, setShown] = useState(null);

  useEffect(() => {
    // each name and its details rise letter by letter as that row scrolls
    // into view; the description after the list does the same
    const rows = PROJECT_CARDS.map(({ id }) => scrollReveal(`#animate-project-${id}`,
      { y: 0, stagger: .02, ease: 'power1.in' }, { trigger: `#project-row-${id}`, start: 'top 88%' }));
    const description = scrollReveal('#animate-project', { y: 0, stagger: .02, ease: 'power1.in' });

    // the preview is placed across the row by its centre (left, App.scss)
    gsap.set(fxPreview.current, { xPercent: -50 });

    return () => {
      rows.forEach((row) => row.kill());
      description.kill();
    };
  }, []);

  // the preview moves level with the row under the pointer and wipes open
  // from its bottom edge, the way the cards do - the recognition list's
  // reveal. it keeps one place across the row; leaving the list closes it
  const show = (project) => (e) => {
    const preview = fxPreview.current;
    const row = e.currentTarget;
    setShown(project);
    gsap.to(preview, { y: row.offsetTop + row.offsetHeight / 2 - preview.offsetHeight / 2, duration: .5, ease: 'power3.out' });
    gsap.to(preview, { clipPath: 'inset(0% 0% 0% 0%)', duration: .4, ease: 'power2.out' });
  };
  const hide = () => {
    gsap.to(fxPreview.current, { clipPath: 'inset(100% 0% 0% 0%)', duration: .3, ease: 'power2.in' });
  };

  return (
    <>
      <section id='project' className='bg-surface
        mobile:px-[1rem] mobile:py-16
        tablet:px-[1rem] tablet:py-16
        laptop:px-[2rem] laptop:py-20
        laptop-lg:px-[3rem] laptop-lg:py-24
        desktop:px-[3rem] desktop:py-28'>
        <Tag label='Selected Projects' id='animate-project-tag' />
        {/* the list - and, over its middle, the preview */}
        <div className='relative
          mobile:mt-6
          tablet:mt-8
          laptop:mt-8
          laptop-lg:mt-10
          desktop:mt-10'
          ref={fxList}>
          <ul className='project-list' onMouseLeave={hide} data-no-hover-roll>
            {PROJECT_CARDS.map((project) => (
              <li className='m-0' id={`project-row-${project.id}`} key={project.id} onMouseEnter={show(project)}>
                <TransitionLink to={project.to} className='project-row block' aria-label={`${project.title}, ${project.meta}`}>
                  {/* name left, year and role right. on a phone the label
                    goes under the name, which then has the row to itself
                    and stays on one line */}
                  <span className='flex justify-between gap-x-6
                    mobile:flex-col mobile:items-start mobile:gap-y-2
                    tablet:items-end
                    laptop:items-end
                    laptop-lg:items-end
                    desktop:items-end'>
                    <span className='project-name font-flexible font-medium leading-[.92] tracking-tight whitespace-nowrap
                      text-project'>
                      <SplitText text={project.title} id={`animate-project-${project.id}`} />
                    </span>
                    <span className='project-label flex flex-wrap text-caption text-muted
                      mobile:justify-start mobile:text-left
                      tablet:justify-end tablet:text-right
                      laptop:justify-end laptop:text-right
                      laptop-lg:justify-end laptop-lg:text-right
                      desktop:justify-end desktop:text-right
                      mobile:pb-2
                      tablet:pb-3
                      laptop:pb-4
                      laptop-lg:pb-5
                      desktop:pb-6'>
                      <SplitText text={project.meta} id={`animate-project-${project.id}`} />
                    </span>
                  </span>
                  {/* below laptop width: the image under the name */}
                  <span className={`block bg-cover bg-center mt-2 mb-6
                    mobile:aspect-[16/9] tablet:aspect-[21/9]
                    laptop:hidden laptop-lg:hidden desktop:hidden
                    ${project.image || 'project-placeholder'}`}/>
                </TransitionLink>
              </li>
            ))}
          </ul>
          {/* hover preview, from laptop width up */}
          <div className={`project-preview bg-cover bg-center ${shown?.image || 'project-placeholder'}`} ref={fxPreview} aria-hidden='true'/>
        </div>
        {/* description + the way to every project */}
        <div className='flex flex-col items-start gap-y-6
          mobile:mt-10
          tablet:mt-12
          laptop:mt-12
          laptop-lg:mt-12
          desktop:mt-16'>
          <p className='flex flex-wrap text-caption
            mobile:w-[78%]
            tablet:w-[52%]
            laptop:w-[34%]
            laptop-lg:w-[30%]
            desktop:w-[28%]'>
            <SplitText text={DESCRIPTION} id='animate-project' by='word' />
          </p>
          <Button label='See more projects' to='/work' />
        </div>
      </section>
    </>
  )
}

export default Project
