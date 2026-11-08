//
import React, { useEffect, useRef, useState } from 'react'
// GSAP
import gsap from 'gsap'
// scroll reveal
import { scrollReveal } from '../../utils/scrollReveal'
// section label
import Tag from '../common/Tag'
// per-letter text split
import SplitText from '../common/SplitText'
// each step's gif, in halftone, brought up under the pointer
import HalftoneGif from '../common/HalftoneGif'
// it wipes open and shut
import { wipeToggle } from '../../utils/pixels'

// Tenor's small size (the AAAAM variant), `alt` saying what is in each
const TENOR = 'https://media1.tenor.com/m/';

// how a project runs with me, start to finish. `emphasis` is the part of
// its title set in the pixel face (SplitText): STAND in UNDERSTAND, PLORE
// in EXPLORE, SIGN in DESIGN, FINE in REFINE
const EMPHASIS = {
  understand: { letters: [5, 6, 7, 8, 9] },
  explore: { letters: [2, 3, 4, 5, 6] },
  design: { letters: [2, 3, 4, 5] },
  build: { letters: [2, 3, 4, 5] },
};
const STEPS = [
  { id: 'understand', title: 'Understand', text: 'I start with the brief, the storyboard, or the people who’ll use it, and learn what each role needs before drawing anything.', gif: TENOR + 'QS_ZPNPtKjsAAAAM/star-atlas-solana.gif', alt: 'A clip from Star Atlas' },
  { id: 'explore', title: 'Explore', text: 'I map the flow for each role first, from the most powerful user to a first-time guest, before drawing a single screen.', gif: TENOR + 'pKaWNBpzW68AAAAM/run-lord-of-the-rings.gif', alt: 'Bilbo running off on an adventure' },
  { id: 'design', title: 'Design', text: 'I design on a system of shared components and styles, so screen 100 stays as consistent as screen 1.', gif: TENOR + 'bCUkRcXp8JYAAAAM/painting-bob-ross.gif', alt: 'Bob Ross painting' },
  { id: 'build', title: 'Refine', text: 'I stay close to developers through handoff, and test every role’s flow for consistent data and UX issues before launch.', gif: TENOR + 'KVABpmsCXRAAAAAM/smoothening-edges-teddy-safarian.gif', alt: 'Sanding the edges of wood smooth' },
];

/**
 * How I work, laid out as Areas of Expertise is (Services.jsx): the
 * steps' names set very large, one per line, each with its sentence
 * against the right edge (under it on a phone or tablet), rising as its
 * row scrolls in; pointing at a row steps the others back and brings up
 * that step's gif in halftone level with it, between the name and the
 * sentence, wiping open (from laptop width up, where there is a pointer). On the dark
 * surface, or the light theme with `light`.
 */
function Process({ light = false }) {
  const fxList = useRef();
  const fxPreview = useRef();
  // the step whose gif the preview is showing, and the one pointed at
  const [shown, setShown] = useState(null);
  const fxOn = useRef(null);
  const fxWipe = useRef(null);

  useEffect(() => {
    const rows = STEPS.map(({ id }) => scrollReveal(`#animate-process-${id}`,
      { y: 0, stagger: .015, ease: 'power1.in' }, { trigger: `#process-step-${id}` }));
    // the preview wipes open from its foot, and shut again (pixels.js)
    fxWipe.current = wipeToggle(fxPreview.current);
    return () => {
      rows.forEach((row) => row.kill());
      fxWipe.current?.kill();
    };
  }, []);

  // where the preview goes without covering a name or a sentence: the
  // space right of the longest name and left of the sentences, its width
  // filling that space up to its own; no room, no preview
  const fit = () => {
    const list = fxList.current;
    const preview = fxPreview.current;
    const box = list.getBoundingClientRect();
    const right = Math.max(...[...list.querySelectorAll('.project-name')].map((el) => el.getBoundingClientRect().right));
    const left = Math.min(...[...list.querySelectorAll('.project-label')].map((el) => el.getBoundingClientRect().left));
    const gutter = 24;
    const room = left - right - gutter * 2;
    const width = Math.min(window.innerWidth * .22, room);
    if (width < 160) return false;
    preview.style.width = `${width}px`;
    preview.style.left = `${right - box.left + gutter + (room - width) / 2}px`;
    return true;
  };
  // level with the row pointed at; moved on to another, it shuts on the
  // one and opens on the next; leaving the list closes it
  const show = (step) => (e) => {
    const preview = fxPreview.current;
    const wipe = fxWipe.current;
    const row = e.currentTarget;
    if (!fit()) return;
    gsap.to(preview, { y: row.offsetTop + row.offsetHeight / 2 - preview.offsetHeight / 2, duration: .5, ease: 'power3.out' });
    const was = fxOn.current;
    fxOn.current = step;
    if (!was || was === step) {
      setShown(step);
      wipe?.show(.5);
      return;
    }
    wipe?.hide(.2).then(() => {
      if (fxOn.current !== step) return;
      setShown(step);
      wipe.show(.4);
    });
  };
  const hide = () => {
    fxOn.current = null;
    fxWipe.current?.hide(.3);
  };

  return (
    <section id='process' className={`${light ? 'theme-light' : 'bg-surface'}
      mobile:px-[1rem] mobile:py-16
      tablet:px-[1rem] tablet:py-16
      laptop:px-[2rem] laptop:py-20
      laptop-lg:px-[3rem] laptop-lg:py-24
      desktop:px-[3rem] desktop:py-28`}>
      <Tag label='How I Work' id='animate-process-tag' />
      {/* the list - and, over its middle, the preview */}
      <div className='relative mobile:mt-6 tablet:mt-8 laptop:mt-8 laptop-lg:mt-10 desktop:mt-10' ref={fxList}>
      <ol className='project-list' onMouseLeave={hide} data-no-hover-roll>
        {STEPS.map((step) => (
          <li className='project-row m-0 mobile:mb-10 tablet:mb-12 laptop:py-3 laptop-lg:py-4 desktop:py-5' id={`process-step-${step.id}`} key={step.id} onMouseEnter={show(step)}>
            <div className='flex justify-between gap-x-10
              mobile:flex-col mobile:items-start mobile:gap-y-3
              tablet:flex-col tablet:items-start tablet:gap-y-3
              laptop:items-end laptop-lg:items-end desktop:items-end'>
              <h3 className='project-name font-flexible font-medium leading-[.95] tracking-tight whitespace-nowrap
                text-project mobile:text-title tablet:text-title'>
                <SplitText text={step.title} id={`animate-process-${step.id}`} emphasis={EMPHASIS[step.id]} />
              </h3>
              {/* its sentence, against the right edge, the full width of its column */}
              <p className='project-label flex flex-wrap text-copy text-muted
                mobile:w-full tablet:w-[80%] laptop:w-[34%] laptop-lg:w-[30%] desktop:w-[28%]
                laptop:pb-4 laptop-lg:pb-5 desktop:pb-6'>
                <SplitText text={step.text} id={`animate-process-${step.id}`} by='word' />
              </p>
            </div>
          </li>
        ))}
      </ol>
      {/* hover preview, from laptop width up: the step's gif in halftone
        (.project-preview, App.css) */}
      <div className='project-preview service-preview' ref={fxPreview} aria-hidden='true'>
        {shown && <HalftoneGif src={shown.gif} alt={shown.alt} key={shown.id} />}
      </div>
      </div>
    </section>
  )
}

export default Process
