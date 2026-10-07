//
import React, { useEffect } from 'react'
// scroll reveal
import { scrollRevealSequence } from '../../../utils/scrollReveal'
// per-letter text split
import SplitText from '../../common/SplitText'

const SKILLS = ['HTML5', 'CSS3', 'SASS/SCSS', 'JavaScript', 'React'];

function WebDev() {
  useEffect(() => {
    const reveal = scrollRevealSequence([
      { targets: '#web-dev-line', vars: { width: '100%', ease: 'power1.in' } },
      { targets: '#animate-webdev', vars: { y: 0, stagger: .02, ease: 'power1.in' } },
    ], { trigger: '#web-dev-line' });
    return () => reveal.kill();
  }, []);

  return (
    <>
      <div className='col-span-8' id='web-dev-line'/>
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
          <SplitText text='Web Development' id='animate-webdev' />
        </div>
        {/* stacks */}
        <ul className='col-span-1 flex flex-wrap'>
          {SKILLS.map((skill, i) => (
            <li className='stacks h-[30px]
              mobile:text-[.9rem]
              tablet:text-[.9rem]
              laptop:text-[1rem]
              laptop-lg:text-[1rem]
              desktop:text-[1.1rem]'
              key={i}>
              <SplitText text={skill} id='animate-webdev' />
            </li>
          ))}
        </ul>
      </li>
    </>
  )
}

export default WebDev
