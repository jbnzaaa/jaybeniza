//
import React, { useEffect, useRef, useState } from 'react'
import { PROJECT_CARDS } from './ProjectCard'
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
// page-to-page wipe
import { TransitionLink } from '../common/PageTransition'
// scroll reveal
import { scrollReveal, REVEAL_AT, inTurn, revealTrigger } from '../../utils/scrollReveal'
// the site's button and section label
import Button from '../common/Button'
import Tag from '../common/Tag'
// per-letter text split
import SplitText from '../common/SplitText'
// the pictures open in pixels
import { pixelReveal, pixelToggle } from '../../utils/pixels'

gsap.registerPlugin(ScrollTrigger)

const DESCRIPTION = 'Products I’ve taken from problem to shipped interface: research, design, and front-end build.';

/**
 * Selected projects, on the dark surface: a list of project names set very
 * large, one per line, each with its year and my part in it against the
 * right edge. Pointing at a row brings up that project's image level
 * with it, between the name and the label, and steps the other rows back.
 * Below laptop width (usually no pointer) each project is the work
 * page's card instead: its cover, opening as it scrolls into view, with
 * its name and label under it.
 */
function Project() {
  const fxList = useRef();
  const fxPreview = useRef();
  // the project whose image the preview is showing
  const [shown, setShown] = useState(null);
  // the preview opens and shuts in pixels (pixels.js)
  const fxPixels = useRef(null);

  useEffect(() => {
    // each name and its details rise letter by letter as that row scrolls
    // into view; the description after the list does the same
    const rows = PROJECT_CARDS.map(({ id }) => scrollReveal(`#animate-project-${id}`,
      { y: 0, stagger: .02, ease: 'power1.in' }, { trigger: `#project-row-${id}` }));
    const description = scrollReveal('#animate-project', { y: 0, stagger: .02, ease: 'power1.in' });

    // the preview is placed across the row by its centre (left, App.css)
    gsap.set(fxPreview.current, { xPercent: -50 });
    fxPixels.current = pixelToggle(fxPreview.current);


    // below laptop width, each row's cover as it comes up the screen: its
    // frame opens in pixels from its bottom edge up while the picture inside,
    // which starts slightly large and low, eases down to size - the work
    // page's card reveal
    const pictures = gsap.set(gsap.utils.toArray('.project-cover-image', fxList.current), { yPercent: 14, scale: 1.15 });
    // (each in its turn among the page's reveals - scrollReveal.js)
    const covers = gsap.utils.toArray('.project-cover', fxList.current).map((cover) => {
      const open = gsap.timeline({ paused: true })
        .add(pixelReveal(cover, { duration: 1 }), 0)
        .to(cover.firstElementChild, { yPercent: 0, scale: 1, ease: 'power2.out', duration: 1.2 }, 0);
      const turn = inTurn(open, cover);
      const trigger = revealTrigger(cover, REVEAL_AT, turn);
      return { open, turn, trigger };
    });

    return () => {
      rows.forEach((row) => row.kill());
      description.kill();
      covers.forEach(({ open, turn, trigger }) => {
        trigger.kill();
        turn.kill();
        open.revert();
      });
      pictures.revert();
      fxPixels.current?.kill();
    };
  }, []);

  // the preview moves level with the row under the pointer and opens in
  // pixels from its bottom edge up, the way the site's pictures do. it
  // keeps one place across the row, and one size. moved on to another row
  // while it is open, it shuts in pixels on the one project, and opens
  // again on the next; leaving the list closes it
  const fxOn = useRef(null);
  const show = (project) => (e) => {
    const preview = fxPreview.current;
    const pixels = fxPixels.current;
    const row = e.currentTarget;
    gsap.to(preview, { y: row.offsetTop + row.offsetHeight / 2 - preview.offsetHeight / 2, duration: .5, ease: 'power3.out' });
    const was = fxOn.current;
    fxOn.current = project;
    if (!was || was === project) {
      setShown(project);
      pixels?.show(.4);
      return;
    }
    // (only the last row pointed at is the one opened)
    pixels?.hide(.2).then(() => {
      if (fxOn.current !== project) return;
      setShown(project);
      pixels.show(.35);
    });
  };
  const hide = () => {
    fxOn.current = null;
    fxPixels.current?.hide(.3);
  };

  return (
    <>
      <section id='project' className='bg-surface
        mobile:px-[1rem] mobile:py-16
        tablet:px-[1rem] tablet:py-16
        laptop:px-[2rem] laptop:py-20
        laptop-lg:px-[3rem] laptop-lg:py-24
        desktop:px-[3rem] desktop:py-28'>
        <Tag label='Featured Work' id='animate-project-tag' />
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
              <li className='m-0 mobile:mb-10 tablet:mb-12 laptop:py-3 laptop-lg:py-4 desktop:py-5' id={`project-row-${project.id}`} key={project.id} onMouseEnter={show(project)}>
                <TransitionLink to={project.to} className='project-row block mobile:flex mobile:flex-col tablet:flex tablet:flex-col' aria-label={`${project.title}, ${project.meta}`}>
                  {/* name left, year and role right. on a phone the label
                    goes under the name, which then has the row to itself
                    and stays on one line */}
                  <span className='flex justify-between gap-x-6
                    mobile:flex-col mobile:items-start mobile:gap-y-2
                    tablet:items-end
                    laptop:items-end
                    laptop-lg:items-end
                    desktop:items-end'>
                    <span className='project-name font-flexible font-medium leading-[.95] tracking-tight whitespace-nowrap
                      text-project mobile:text-title tablet:text-title'>
                      <SplitText text={project.title} id={`animate-project-${project.id}`} />
                    </span>
                    <span className='project-label flex flex-wrap text-copy text-muted
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
                      {/* year / kind, slashes and all */}
                      <SplitText text={project.meta} id={`animate-project-${project.id}`} />
                    </span>
                  </span>
                  {/* below laptop width: the cover, first in the card, in
                    a frame that wipes open on scroll (start state:
                    .project-cover, App.css) */}
                  <span className='project-cover block overflow-hidden mb-4
                    mobile:order-first tablet:order-first
                    mobile:aspect-[4/3] tablet:aspect-[16/9]
                    laptop:hidden laptop-lg:hidden desktop:hidden'>
                    {project.picture || project.image ? (
                      <span className={`project-cover-image block w-full h-full bg-cover ${project.picture ? 'bg-center' : `bg-center ${project.image}`}`}
                        style={project.picture ? { backgroundImage: `url(${project.picture})` } : undefined}/>
                    ) : (
                      /* nothing to picture yet: the empty card (.project-empty, App.css) */
                      <span className='project-cover-image project-empty w-full h-full'>
                        <span className='text-caption'>Ongoing project</span>
                        <span className='text-caption text-muted'>Case study in progress</span>
                      </span>
                    )}
                  </span>
                </TransitionLink>
              </li>
            ))}
          </ul>
          {/* hover preview, from laptop width up */}
          <div className={`project-preview bg-cover ${shown?.picture ? 'bg-center' : shown?.image ? `bg-center ${shown.image}` : 'project-empty'}`}
            style={shown?.picture ? { backgroundImage: `url(${shown.picture})` } : undefined}
            ref={fxPreview} aria-hidden='true'>
            {/* a project with nothing to picture yet previews as the empty
              card, which says so */}
            {shown && !shown.picture && !shown.image && (
              <>
                <span className='text-caption'>Ongoing project</span>
                <span className='text-caption text-muted'>Case study in progress</span>
              </>
            )}
          </div>
        </div>
        {/* description + the way to every project */}
        <div className='flex flex-col items-start gap-y-6
          mobile:mt-10
          tablet:mt-12
          laptop:mt-12
          laptop-lg:mt-12
          desktop:mt-16'>
          <p className='flex flex-wrap text-copy
            mobile:w-[78%]
            tablet:w-[52%]
            laptop:w-[34%]
            laptop-lg:w-[30%]
            desktop:w-[28%]'>
            <SplitText text={DESCRIPTION} id='animate-project' by='word' />
          </p>
          <Button label='See all work' to='/work' />
        </div>
      </section>
    </>
  )
}

export default Project
