//
import React, { useEffect } from 'react'
// scroll reveal
import { scrollRevealSequence } from '../../../utils/scrollReveal'
// per-letter text split
import SplitText from '../../common/SplitText'

const SKILLS = [
  'UI Design', 'UX Design', 'Wireframing', 'Prototyping', 'User Flows',
  'Design Systems', 'Usability Testing', 'Responsive Design', 'High-Fidelity UI',
  'Design Handoff',
];

function UiUxDesign() {
  useEffect(() => {
    const reveal = scrollRevealSequence([
      { targets: '#ui-ux-design-line', vars: { width: '100%', ease: 'power1.in' } },
      { targets: '#animate-uiuxdesign', vars: { y: 0, stagger: .02, ease: 'power1.in' } },
    ], { trigger: '#ui-ux-design-line' });
    return () => reveal.kill();
  }, []);

  return (
    <>
      <div className='col-span-8' id='ui-ux-design-line'/>
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
          <SplitText text='UI/UX Design' id='animate-uiuxdesign' />
        </div>
        {/* stacks */}
        <ul className='col-span-1 flex flex-wrap'>
          {SKILLS.map((skill, i) => (
            <li className='stacks h-[30px] text-muted
              text-body
              '
              key={i}>
              <SplitText text={skill} id='animate-uiuxdesign' />
            </li>
          ))}
        </ul>
      </li>
    </>
  )
}

export default UiUxDesign
