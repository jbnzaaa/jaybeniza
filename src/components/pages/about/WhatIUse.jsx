//
import React, { useEffect } from 'react'
// scroll reveal
import { scrollRevealSequence } from '../../../utils/scrollReveal'
// per-letter text split
import SplitText from '../../common/SplitText'

const DESCRIPTION = "I've been utilizing these skills in designing, prototyping, and shipping user-centered digital products — from wireframes to production-ready front-end.";

function WhatIUse() {
  useEffect(() => {
    // line fully expands before the title/description text reveals, and
    // this reveal is tied to THIS row's own position, not the whole
    // (much taller) About section, so it plays while actually visible
    const reveal = scrollRevealSequence([
      { targets: '#what-i-use-line', vars: { width: '100%', ease: 'power1.in' } },
      { targets: '#animate-whatiuse', vars: { y: 0, stagger: .02, ease: 'power1.in' } },
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
        <div className='stack-container col-span-1 flex flex-wrap font-medium
          mobile:min-h-[25px] mobile:mb-1 mobile:text-[1rem]
          tablet:min-h-[30px] tablet:text-[1.3rem]
          laptop:min-h-[30px] laptop:text-[1.4rem]
          laptop-lg:min-h-[30px] laptop-lg:text-[1.4rem]
          desktop:min-h-[30px] desktop:text-[1.4em]'>
          <SplitText text='Overview' id='animate-whatiuse' />
        </div>
        {/* description */}
        <div className='col-span-1 flex flex-wrap text-muted
          text-body
          '>
          <SplitText text={DESCRIPTION} id='animate-whatiuse' />
        </div>
      </li>
    </>
  )
}

export default WhatIUse
