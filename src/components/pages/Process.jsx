//
import React, { useEffect } from 'react'
// scroll reveal
import { scrollRevealCards } from '../../utils/scrollReveal'
// section label
import Tag from '../common/Tag'
// per-letter text split
import SplitText from '../common/SplitText'
// the gif at the top of each card, in the site's halftone dots - Tenor's
// small size (the AAAAM variant), with `alt` saying what is in it
import HalftoneGif from '../common/HalftoneGif'
const TENOR = 'https://media1.tenor.com/m/';

// how a project runs with me, start to finish
const STEPS = [
  { id: 'understand', title: 'Understand', text: 'I start by listening. I learn who the product is for, what they need, and what the business wants from it.', gif: `${TENOR}QS_ZPNPtKjsAAAAM/star-atlas-solana.gif`, alt: 'A clip from Star Atlas' },
  { id: 'explore', title: 'Explore', text: 'I map user flows and sketch wireframes, trying a few directions before settling on one.', gif: `${TENOR}pKaWNBpzW68AAAAM/run-lord-of-the-rings.gif`, alt: 'Bilbo running off on an adventure' },
  { id: 'design', title: 'Design', text: 'I turn the strongest direction into high-fidelity screens and a prototype, built on a consistent design system.', gif: `${TENOR}bCUkRcXp8JYAAAAM/painting-bob-ross.gif`, alt: 'Bob Ross painting' },
  { id: 'build', title: 'Refine', text: 'I stay close to developers through handoff, test with users, and keep refining until it works as well as it looks.', gif: `${TENOR}KVABpmsCXRAAAAAM/smoothening-edges-teddy-safarian.gif`, alt: 'Sanding the edges of wood smooth' },
];

/**
 * How I work: four cards side by side from laptop width up, two by two on
 * a tablet, stacked on a phone. Each card is a step - a line figure of
 * it at the top, in halftone dots, and its name and one sentence at the
 * bottom.
 * On the dark surface, or the light theme with `light` (the cards are
 * dark either way).
 */
function Process({ light = false }) {
  useEffect(() => {
    // the cards open one after another, each followed by its text
    const cards = scrollRevealCards(STEPS.map(({ id }) => ({
      card: `#process-step-${id}`,
      text: `#animate-process-${id}`,
    })), { group: '#process-steps' });
    return () => cards.kill();
  }, []);

  return (
    <>
      <div id='process' className={light ? 'theme-light' : 'bg-surface'}>
        <div className='
          mobile:py-16 mobile:px-[1rem]
          tablet:py-16 tablet:px-[1rem]
          laptop:py-20 laptop:px-[2rem]
          laptop-lg:py-24 laptop-lg:px-[3rem]
          desktop:py-28 desktop:px-[3rem]'>
          <div className='mobile:mb-6 tablet:mb-8 laptop:mb-8 laptop-lg:mb-10 desktop:mb-10'>
            <Tag label='How We’ll Work Together' id='animate-process-tag' />
          </div>
          {/* the steps */}
          <ol id='process-steps' className='grid gap-4
            mobile:grid-cols-1
            tablet:grid-cols-2
            laptop:grid-cols-4
            laptop-lg:grid-cols-4
            desktop:grid-cols-4'>
            {STEPS.map((step) => (
              <li className='reveal-card theme-dark overflow-hidden bg-card m-0' id={`process-step-${step.id}`} key={step.id}>
                <div className='reveal-card-inner h-full flex flex-col justify-between
                  mobile:gap-y-6
                  tablet:gap-y-6
                  laptop:gap-y-8
                  laptop-lg:gap-y-8
                  desktop:gap-y-10'>
                  {/* the step's gif, in halftone, edge to edge at the card's top
                    (.process-gif, App.css); the padding is the text's alone */}
                  <div className='process-gif'>
                    <HalftoneGif src={step.gif} alt={step.alt} />
                  </div>
                  <div className='p-6 pt-0'>
                    <h3 className='flex flex-wrap font-flexible font-medium leading-none text-heading mb-4'>
                      <SplitText text={step.title} id={`animate-process-${step.id}`} />
                    </h3>
                    <p className='flex flex-wrap text-caption text-muted'>
                      <SplitText text={step.text} id={`animate-process-${step.id}`} by='word' />
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  )
}

export default Process
