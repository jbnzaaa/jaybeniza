//
import React, { useEffect } from 'react'
// scroll reveal
import { scrollReveal } from '../../utils/scrollReveal'
// section label
import Tag from '../common/Tag'
// per-letter text split
import SplitText from '../common/SplitText'
// each step's gif, in halftone, brought up under the pointer
import HalftoneGif from '../common/HalftoneGif'
// the gif brought up level with the row pointed at
import useRowPreview from '../common/useRowPreview'

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
  { id: 'understand', title: 'Understand', text: "Before exploring solutions, I clarify the product's purpose, its users, and the constraints shaping the work. The goal is to distinguish what is being requested from what actually needs solving.", gif: TENOR + 'QS_ZPNPtKjsAAAAM/star-atlas-solana.gif', alt: 'A clip from Star Atlas' },
  { id: 'explore', title: 'Explore', text: 'I map user roles, key journeys, and information structures to understand how the experience connects before committing to the interface.', gif: TENOR + 'pKaWNBpzW68AAAAM/run-lord-of-the-rings.gif', alt: 'Bilbo running off on an adventure' },
  { id: 'design', title: 'Design', text: 'I move from wireframes to refined interfaces, establishing interaction patterns and reusable components that keep the experience clear and consistent.', gif: TENOR + 'bCUkRcXp8JYAAAAM/painting-bob-ross.gif', alt: 'Bob Ross painting' },
  { id: 'build', title: 'Refine', text: 'I review important workflows, test interactions where possible, and collaborate through implementation to address the details that only become visible when a product starts taking shape.', gif: TENOR + 'KVABpmsCXRAAAAAM/smoothening-edges-teddy-safarian.gif', alt: 'Sanding the edges of wood smooth' },
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
  const { fxList, fxPreview, shown, show, hide } = useRowPreview();

  useEffect(() => {
    const rows = STEPS.map(({ id }) => scrollReveal(`#animate-process-${id}`,
      { y: 0, stagger: .015, ease: 'power1.in' }, { trigger: `#process-step-${id}` }));
    return () => rows.forEach((row) => row.kill());
  }, []);

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
