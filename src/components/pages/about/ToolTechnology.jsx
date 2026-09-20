//
import React, { useEffect } from 'react'
// scroll reveal
import { scrollRevealSequence } from '../../../utils/scrollReveal'

const TOOLS = [
  'Figma', 'Figma AI', 'Adobe Photoshop', 'Adobe Illustrator', 'Visual Studio Code',
  'Git', 'Claude Code', 'Microsoft Office', 'NPM',
];

function ToolTechnology() {
  useEffect(() => {
    const reveal = scrollRevealSequence([
      { targets: '#tools-and-tech-line', vars: { width: '100%', stagger: .05, ease: 'power1.in' } },
      { targets: '#animate-tooltechnology', vars: { y: 0, stagger: .04, ease: 'power1.in' } },
    ], { trigger: '#tools-and-tech-line' });
    return () => reveal.kill();
  }, []);

  return (
    <>
      <div className='col-span-8' id='tools-and-tech-line'/>
      <li className='col-span-8 grid py-6
        mobile:grid-cols-1 mobile:h-full
        tablet:grid-cols-1 tablet:h-full
        laptop:grid-cols-2 laptop:h-full
        laptop-lg:grid-cols-2 laptop-lg:h-[97px]
        desktop:grid-cols-2 desktop:h-[97px]'>
        {/* title */}
        <div className='stack-container col-span-1 flex flex-wrap
          mobile:h-[25px] mobile:mb-1 mobile:text-[1rem]
          tablet:h-[30px] tablet:text-[1.1rem]
          laptop:h-[40px] laptop:text-[1.4rem]
          laptop-lg:h-[40px] laptop-lg:text-[1.4rem]
          desktop:h-[50px] desktop:text-[1.4em]'>
          <span className='stack-context font-medium
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[50px]
            laptop-lg:translate-y-[50px]
            desktop:translate-y-[50px]'
            id='animate-tooltechnology'>
            Design
          </span>
          <span className='stack-context font-medium
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[50px]
            laptop-lg:translate-y-[50px]
            desktop:translate-y-[50px]'
            id='animate-tooltechnology'>
            &
          </span>
          <span className='stack-context font-medium
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[50px]
            laptop-lg:translate-y-[50px]
            desktop:translate-y-[50px]'
            id='animate-tooltechnology'>
            Development
          </span>
          <span className='stack-context font-medium
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[50px]
            laptop-lg:translate-y-[50px]
            desktop:translate-y-[50px]'
            id='animate-tooltechnology'>
            Tools
          </span>
        </div>
        {/* stacks */}
        <ul className='col-span-1 flex flex-wrap'>
          {TOOLS.map((tool, i) => (
            <li className='stacks h-[30px]
              mobile:text-[.9rem]
              tablet:text-[.9rem]
              laptop:text-[1rem]
              laptop-lg:text-[1rem]
              desktop:text-[1.1rem]'
              key={i}>
              <p className='stack-context
                mobile:translate-y-[28px]
                tablet:translate-y-[30px]
                laptop:translate-y-[50px]
                laptop-lg:translate-y-[50px]
                desktop:translate-y-[50px]'
                id='animate-tooltechnology'>
                {tool}
              </p>
            </li>
          ))}
        </ul>
      </li>
      <div className='col-span-8' id='tools-and-tech-line'/>
    </>
  )
}

export default ToolTechnology
