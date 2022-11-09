// 
import React, { useEffect } from 'react'
// GSAP
import gsap from 'gsap' 
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function ToolTechnology() {
  useEffect(() => {
    // title and description animation 
    gsap.to('#stack-context', {
      duration: 1,
      y: 0,
      stagger: .05,
      ease: 'power1.in',
      scrollTrigger: { 
        trigger: '#stack-context', 
        start: 'bottom 100%'
      }
    });
  }, []);

  return (
  <>
      {/* title */}
      <div className='col-span-1 flex flex-wrap
         mobile:h-[25px] mobile:mb-1 mobile:text-[1rem]
         tablet:h-[30px] tablet:text-[1.1rem]
         laptop:h-[40px] laptop:text-[1.4rem]
         laptop-lg:h-[40px] laptop-lg:text-[1.4rem]
         desktop:h-[50px] desktop:text-[1.4em]'
        id='stack-container'>
        <span className='font-medium
          mobile:translate-y-[25px]
          tablet:translate-y-[30px]
          laptop:translate-y-[50px]
          laptop-lg:translate-y-[50px]
          desktop:translate-y-[50px]'
          id='stack-context'>
          Tools 
        </span>
        <span className='font-medium
          mobile:translate-y-[25px]
          tablet:translate-y-[30px]
          laptop:translate-y-[50px]
          laptop-lg:translate-y-[50px]
          desktop:translate-y-[50px]'
          id='stack-context'>
          &
        </span>
        <span className='font-medium
          mobile:translate-y-[25px]
          tablet:translate-y-[30px]
          laptop:translate-y-[50px]
          laptop-lg:translate-y-[50px]
          desktop:translate-y-[50px]'
          id='stack-context'>
          Technologies
        </span>
      </div>
      {/* stacks */}
      <ul className='col-span-1 flex flex-wrap'>
        <li className='h-[30px]
          mobile:text-[.9rem]
          tablet:text-[.9rem]
          laptop:text-[1rem]
          laptop-lg:text-[1rem]
          desktop:text-[1.1rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[50px]
            laptop-lg:translate-y-[50px]
            desktop:translate-y-[50px]'  
            id='stack-context'>
            VS Code
          </p>
        </li>
        <li className='h-[30px]
          mobile:text-[.9rem]
          tablet:text-[.9rem]
          laptop:text-[1rem]
          laptop-lg:text-[1rem]
          desktop:text-[1.1rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[50px]
            laptop-lg:translate-y-[50px]
            desktop:translate-y-[50px]'  
            id='stack-context'>
            NPM
          </p>
        </li>
        <li className='h-[30px]
          mobile:text-[.9rem]
          tablet:text-[.9rem]
          laptop:text-[1rem]
          laptop-lg:text-[1rem]
          desktop:text-[1.1rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[50px]
            laptop-lg:translate-y-[50px]
            desktop:translate-y-[50px]'  
            id='stack-context'>
            Figma
          </p>
        </li>
        <li className='h-[30px]
          mobile:text-[.9rem]
          tablet:text-[.9rem]
          laptop:text-[1rem]
          laptop-lg:text-[1rem]
          desktop:text-[1.1rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[50px]
            laptop-lg:translate-y-[50px]
            desktop:translate-y-[50px]'  
            id='stack-context'>
            Adobe Photoshop
          </p>
        </li>
        <li className='h-[30px]
          mobile:text-[.9rem]
          tablet:text-[.9rem]
          laptop:text-[1rem]
          laptop-lg:text-[1rem]
          desktop:text-[1.1rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[50px]
            laptop-lg:translate-y-[50px]
            desktop:translate-y-[50px]'  
            id='stack-context'>
            Adobe Illustrator
          </p>
        </li>
      </ul>
    </>
  )
}

export default ToolTechnology