//
import React, { useEffect, useRef } from 'react'
import ProjectCard, { ProjectCaption, PROJECT_CARDS } from './ProjectCard'
// icons
import {RiArrowRightDownLine} from 'react-icons/ri'
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
// per-letter text split
import SplitText from '../common/SplitText'
gsap.registerPlugin(ScrollTrigger)

// the pinned scroll is cut into equal steps: one for the heading to settle
// into place, then one per project card
const STEPS = 1 + PROJECT_CARDS.length;
// how much scroll (in screen heights) each step takes
const STEP_LENGTH = .8;

function Project() {
  const fxSection = useRef();
  const fxHeading = useRef();
  const fxStage = useRef();
  const fxCursor = useRef();

  useEffect(() => {
    const section = fxSection.current;
    const heading = fxHeading.current;
    // how tightly the scroll-coupled animation follows the scroll: exactly
    // on desktop (the smoother already eases it), a beat behind on touch
    // screens, where raw finger input is too jumpy to follow frame for frame
    const scrub = ScrollTrigger.isTouch ? .5 : true;

    // where the heading sits while it is blown up: centred on the section,
    // as large as fits. measured from its resting place in the layout, so
    // these are re-read (function values) on every refresh
    const toCentreX = () => section.clientWidth / 2 - (heading.offsetLeft + heading.offsetWidth / 2);
    const toCentreY = () => section.clientHeight / 2 - (heading.offsetTop + heading.offsetHeight / 2);
    const fullScale = () => Math.min(
      (section.clientWidth * .86) / heading.offsetWidth,
      (section.clientHeight * .62) / heading.offsetHeight
    );

    // heading letters - the page's standard per-letter rise. the heading
    // waits blown up in the centre of the section (see the pinned timeline
    // below); its letters rise as the section comes up the screen, and
    // drop away again if the page is scrolled back above that point
    const rise = gsap.to('#animate-selected', { y: 0, duration: .6, stagger: .03, ease: 'power1.in', paused: true });
    let risen = false;
    const showHeading = (show) => {
      if (show === risen) return;
      risen = show;
      if (show) rise.timeScale(1).play();
      else rise.timeScale(2).reverse();
    };

    // 1. entry - from the section's top reaching the bottom of the screen
    // to it reaching the top. nothing moves with it; it only times the
    // heading's reveal to the section being well on its way in (early
    // enough that the incoming section is not an empty stretch of page)
    const entry = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'top top',
      onUpdate: (self) => showHeading(self.progress >= .4),
    });

    // description and behance button - the same letter-by-letter reveal
    // every other button on the site uses (label first, arrow after it).
    // held back until the heading has settled, and taken away again if the
    // page is scrolled back above that point
    const details = gsap.timeline({ paused: true })
      .to('#animate-project', { y: 0, duration: .5, stagger: .02, ease: 'power1.in' })
      .to('#animate-link', { y: 0, duration: .6, stagger: .02, ease: 'power1.in' }, '<');
    let settled = false;
    const showDetails = (show) => {
      if (show === settled) return;
      settled = show;
      if (show) details.timeScale(1).play();
      else details.timeScale(2).reverse();
    };

    // 2. pinned - scroll-coupled. step one scales the heading down from
    // the centre into its place in the top left corner; each step after
    // that brings in the
    // next project: the card wipes up from its bottom edge over the one
    // before it while its image eases up into position behind the wipe.
    // the pin releases after the last card. refreshPriority puts the pin
    // ahead of the triggers below it, so they are measured with its
    // spacing in place
    const pinned = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${STEPS * STEP_LENGTH * 100}%`,
        pin: true,
        scrub,
        anticipatePin: 1,
        refreshPriority: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => showDetails(self.progress >= .95 / STEPS),
      },
    })
      .fromTo(heading,
        { x: toCentreX, y: toCentreY, scale: fullScale },
        { x: 0, y: 0, scale: 1, ease: 'power2.inOut', duration: 1 }, 0);
    // image and text move separately. the image wipes up over the one
    // before it (its clip covers the image area only) while the picture
    // eases up into position behind the wipe. the text changes underneath
    // with the site's per-letter reveal: the previous project's title and
    // details lift out letter by letter, then this project's rise in the
    // same way, title first. the stagger is spread so each caption's
    // letters, however many, take the same share of the scroll
    PROJECT_CARDS.forEach(({ id }, i) => {
      pinned
        .fromTo(`#selected-card-${id}`,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut', duration: .7 }, 1 + i)
        .fromTo(`#selected-card-${id} .selected-card-image`,
          { yPercent: 14, scale: 1.15 },
          { yPercent: 0, scale: 1, ease: 'power2.out', duration: .7 }, 1 + i)
        .to(`#animate-caption-${id}`,
          { y: 0, ease: 'power1.in', duration: .22, stagger: { amount: .3 } }, 1 + i + .28);
      const previous = PROJECT_CARDS[i - 1];
      if (previous) {
        pinned.fromTo(`#animate-caption-${previous.id}`,
          { yPercent: 0 },
          { yPercent: -130, ease: 'power1.in', duration: .14, stagger: { amount: .14 }, immediateRender: false }, 1 + i);
      }
    });
    // hold the last card for the remainder of its step before releasing
    pinned.to({}, { duration: .3 }, STEPS - .3);

    // "View" cursor - a label that follows the pointer over a project card
    // in place of the normal cursor, wiping up into view the way the cards
    // do. positioned inside the stage (not fixed), because the pinned,
    // smooth-scrolled content is transformed
    const stage = fxStage.current;
    const cursor = fxCursor.current;
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    const moveX = gsap.quickTo(cursor, 'x', { duration: .35, ease: 'power3.out' });
    const moveY = gsap.quickTo(cursor, 'y', { duration: .35, ease: 'power3.out' });
    const onMove = (e) => {
      const rect = stage.getBoundingClientRect();
      moveX(e.clientX - rect.left);
      moveY(e.clientY - rect.top);
    };
    // over = entering a card (or moving between stacked cards), out =
    // leaving the last one
    const onOver = (e) => {
      if (e.target.closest('.selected-card')) gsap.to(cursor, { clipPath: 'inset(0% 0% 0% 0%)', duration: .3, ease: 'power2.out' });
    };
    const onOut = (e) => {
      if (!e.relatedTarget?.closest?.('.selected-card')) gsap.to(cursor, { clipPath: 'inset(100% 0% 0% 0%)', duration: .25, ease: 'power2.in' });
    };
    stage.addEventListener('mousemove', onMove);
    stage.addEventListener('mouseover', onOver);
    stage.addEventListener('mouseout', onOut);

    return () => {
      entry.kill();
      pinned.scrollTrigger?.kill();
      pinned.revert();
      details.revert();
      rise.revert();
      stage.removeEventListener('mousemove', onMove);
      stage.removeEventListener('mouseover', onOver);
      stage.removeEventListener('mouseout', onOut);
      gsap.killTweensOf(cursor);
    };
  }, []);

  return (
    <>
      {/* project container */}
      <div id='project'>
        <div className='py-20'>
          <section className='relative h-screen-safe overflow-hidden' ref={fxSection}>
            {/* content - top padding clears the fixed nav bar */}
            <div className='relative h-full grid grid-cols-8 gap-x-5 pt-[6rem] pb-[2rem]
              mobile:grid-rows-[auto_auto_minmax(0,1fr)] mobile:gap-y-5 mobile:px-[.9rem] mobile:pt-[5rem] mobile:pb-[calc(1.75rem+env(safe-area-inset-bottom))]
              tablet:grid-rows-[auto_minmax(0,1fr)_auto] tablet:gap-y-6 tablet:px-[1rem]
              laptop:grid-rows-[1fr_auto] laptop:px-[2rem]
              laptop-lg:grid-rows-[1fr_auto] laptop-lg:px-[3rem]
              desktop:grid-rows-[1fr_auto] desktop:px-[3rem]'>
              {/* heading + description */}
              <div className='col-start-1
                mobile:col-span-8 mobile:row-start-1
                tablet:col-span-8 tablet:row-start-1
                laptop:col-span-3 laptop:row-start-1
                laptop-lg:col-span-3 laptop-lg:row-start-1
                desktop:col-span-3 desktop:row-start-1'>
                {/* one line. the last word's trailing gap is dropped so the
                  line is exactly as wide as its letters - it is centred by
                  measurement. sized to fit this column once it has settled */}
                <h2 className='inline-block font-flexible font-medium leading-none whitespace-nowrap [&_.split-word:last-child]:mr-0
                  mobile:text-[8vw]
                  tablet:text-[6vw]
                  laptop:text-[4vw]
                  laptop-lg:text-[3.6vw]
                  desktop:text-[3.6vw]'
                  ref={fxHeading}>
                  <SplitText text='Selected Projects' id='animate-selected' />
                </h2>
                <p className='flex flex-wrap
                  mobile:mt-4 mobile:text-[.8rem]
                  tablet:mt-4 tablet:text-[.9rem] tablet:max-w-[60%]
                  laptop:mt-6 laptop:text-[1rem]
                  laptop-lg:mt-8 laptop-lg:text-[1rem] laptop-lg:max-w-[85%]
                  desktop:mt-8 desktop:text-[1.1rem] desktop:max-w-[80%]'>
                  <SplitText text='Selected work, from interface design in Figma to the shipped front-end — with the part I played in each.' id='animate-project' by='word' />
                </p>
              </div>
              {/* project stage - an image area with a text area under it;
                each project's image and text reveal one at a time, separately */}
              <div ref={fxStage} className='relative min-h-0 flex flex-col
                mobile:col-span-8 mobile:col-start-1 mobile:row-start-3
                tablet:col-span-8 tablet:col-start-1 tablet:row-start-2
                laptop:col-span-5 laptop:col-start-4 laptop:row-start-1 laptop:row-span-2
                laptop-lg:col-span-5 laptop-lg:col-start-4 laptop-lg:row-start-1 laptop-lg:row-span-2
                desktop:col-span-5 desktop:col-start-4 desktop:row-start-1 desktop:row-span-2'>
                {/* image area - the images stack here, each exactly this size */}
                <div className='relative flex-1 min-h-0'>
                  {PROJECT_CARDS.map((project) => (
                    <ProjectCard project={project} key={project.id}/>
                  ))}
                </div>
                {/* text area - the captions stack here */}
                <div className='grid shrink-0 pt-3 mobile:pt-4'>
                  {PROJECT_CARDS.map((project) => (
                    <ProjectCaption project={project} key={project.id}/>
                  ))}
                </div>
                <div className='selected-cursor' ref={fxCursor} aria-hidden='true'>
                  <span className='leading-none text-offwhite
                    mobile:text-[.9rem]
                    tablet:text-[.9rem]
                    laptop:text-[1rem]
                    laptop-lg:text-[1rem]
                    desktop:text-[1.1rem]'>View</span>
                  <RiArrowRightDownLine className='fill-offwhite ml-1 text-2xl'/>
                </div>
              </div>
              {/* behance button - the buttons' markup for a light background,
                so it reveals and hovers exactly like them. on a phone it sits directly under
                the description, above the project stage; from tablet up it
                is in the bottom left corner */}
              <div className='col-start-1 flex items-end
                mobile:col-span-8 mobile:row-start-2
                tablet:col-span-8 tablet:row-start-3
                laptop:col-span-3 laptop:row-start-2
                laptop-lg:col-span-3 laptop-lg:row-start-2
                desktop:col-span-3 desktop:row-start-2'>
                <div className='project-container'>
                  <a href='https://www.behance.net/jbnza' target='_blank' rel='noreferrer' className='inline-block'>
                    <div className='project-link'>
                      <span className='flex items-center
                        mobile:text-[.9rem]
                        tablet:text-[.9rem]
                        laptop:text-[1rem]
                        laptop-lg:text-[1rem]
                        desktop:text-[1.1rem]'>
                        <SplitText text='More UI design on Behance' id='animate-link' />
                        <span className='menu-icon-clip'>
                          <span className='menu-icon' id='animate-link'>
                            <RiArrowRightDownLine id='icon' className='fill-black ml-1 text-2xl'/>
                          </span>
                        </span>
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Project
