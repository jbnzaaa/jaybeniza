//
import React, { useEffect } from 'react'
// scroll reveal
import { scrollRevealSequence } from '../../../utils/scrollReveal'

const DESCRIPTION_WORDS = [
  "I've", 'been', 'utilizing', 'these', 'skills', 'in', 'designing,', 'prototyping,',
  'and', 'shipping', 'user-centered', 'digital', 'products', '—', 'from', 'wireframes',
  'to', 'production-ready', 'front-end.',
];

function WhatIUse() {
  useEffect(() => {
    // line fully expands before the title/description text reveals, and
    // this reveal is tied to THIS row's own position, not the whole
    // (much taller) About section, so it plays while actually visible
    const reveal = scrollRevealSequence([
      { targets: '#what-i-use-line', vars: { width: '100%', ease: 'power1.in' } },
      { targets: '#animate-whatiuse', vars: { y: 0, stagger: .04, ease: 'power1.in' } },
    ], { trigger: '#what-i-use-line' });
    return () => reveal.kill();
  }, []);

  return (
    <>
      <div className='col-span-8' id='what-i-use-line'/>
      <li className='col-span-8 grid py-6
        mobile:grid-cols-1 mobile:h-full
        tablet:grid-cols-1 tablet:h-full
        laptop:grid-cols-2 laptop:h-full
        laptop-lg:grid-cols-2 laptop-lg:h-full
        desktop:grid-cols-2 desktop:h-full'>
        {/* title */}
        <div className='stack-container col-span-1 flex flex-wrap
          mobile:h-[25px] mobile:mb-1 mobile:text-[1rem]
          tablet:h-[30px] tablet:text-[1.3rem]
          laptop:h-[30px] laptop:text-[1.4rem]
          laptop-lg:h-[30px] laptop-lg:text-[1.4rem]
          desktop:h-[30px] desktop:text-[1.4em]'>
          <span className='stack-context font-medium
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[50px]
            laptop-lg:translate-y-[50px]
            desktop:translate-y-[50px]'
            id='animate-whatiuse'>
            What
          </span>
          <span className='stack-context font-medium
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[50px]
            laptop-lg:translate-y-[50px]
            desktop:translate-y-[50px]'
            id='animate-whatiuse'>
            I
          </span>
          <span className='stack-context font-medium
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[50px]
            laptop-lg:translate-y-[50px]
            desktop:translate-y-[50px]'
            id='animate-whatiuse'>
            Use?
          </span>
        </div>
        {/* description */}
        <div className='col-span-1 flex flex-wrap'>
          {DESCRIPTION_WORDS.map((word, i) => (
            <div className='stacks h-[30px]
              mobile:text-[.9rem]
              tablet:text-[.9rem]
              laptop:text-[1rem]
              laptop-lg:text-[1rem]
              desktop:text-[1.1rem]'
              key={i}>
              <p className='stack-context
                mobile:translate-y-[28px]
                tablet:translate-y-[30px]
                laptop:translate-y-[30px]
                laptop-lg:translate-y-[30px]
                desktop:translate-y-[30px]'
                id='animate-whatiuse'>
                {word}
              </p>
            </div>
          ))}
        </div>
      </li>
    </>
  )
}

export default WhatIUse
