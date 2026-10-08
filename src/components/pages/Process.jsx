//
import React, { useEffect } from 'react'
// scroll reveal
import { scrollRevealCards } from '../../utils/scrollReveal'
// section label
import Tag from '../common/Tag'
// per-letter text split
import SplitText from '../common/SplitText'

// how a project runs with me, start to finish
const STEPS = [
  { id: 'understand', number: '01', title: 'Understand', text: 'I start with the people and the problem: who it is for, what they need, and what the business wants out of it.' },
  { id: 'explore', number: '02', title: 'Explore', text: 'I map user flows and sketch wireframes, trying several directions quickly before committing to one.' },
  { id: 'design', number: '03', title: 'Design', text: 'I turn the strongest direction into high-fidelity screens and a prototype, built on a consistent design system.' },
  { id: 'build', number: '04', title: 'Build & Refine', text: 'I work with developers through handoff and build, test with users, and keep refining until it works as well as it looks.' },
];

/**
 * How I work: four cards side by side from laptop width up, two by two on
 * a tablet, stacked on a phone. Each card is a step - its number at the
 * top, its name and one sentence at the bottom. On the dark surface, or
 * the light theme with `light` (the cards are dark either way).
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
            <Tag label='How I work' id='animate-process-tag' />
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
                  mobile:p-6 mobile:gap-y-12
                  tablet:p-8 tablet:gap-y-16
                  laptop:p-8 laptop:gap-y-24
                  laptop-lg:p-10 laptop-lg:gap-y-28
                  desktop:p-12 desktop:gap-y-32'>
                  <p className='text-caption text-muted'>
                    <SplitText text={step.number} id={`animate-process-${step.id}`} />
                  </p>
                  <div>
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
