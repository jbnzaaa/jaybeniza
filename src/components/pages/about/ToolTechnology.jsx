// 
import React, { useEffect } from 'react'
// GSAP
import gsap from 'gsap' 
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function ToolTechnology() {
  useEffect(() => {
    // line animation
    gsap.to('#tools-and-tech-line', {
      duration: 1,
      // delay: 3,
      stagger: .05,
      width: '100%',
      ease: 'power1.in',
      scrollTrigger: { 
        trigger: '#tools-and-tech-line', 
        start: 'bottom 100%'
      }
    });
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
            id='animate-about'>
            Tools 
          </span>
          <span className='stack-context font-medium
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[50px]
            laptop-lg:translate-y-[50px]
            desktop:translate-y-[50px]'
            id='animate-about'>
            &
          </span>
          <span className='stack-context font-medium
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[50px]
            laptop-lg:translate-y-[50px]
            desktop:translate-y-[50px]'
            id='animate-about'>
            Technologies
          </span>
        </div>
        {/* stacks */}
        <ul className='col-span-1 flex flex-wrap'>
          <li className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[50px]
              laptop-lg:translate-y-[50px]
              desktop:translate-y-[50px]'  
              id='animate-about'>
              VS Code
            </p>
          </li>
          <li className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[50px]
              laptop-lg:translate-y-[50px]
              desktop:translate-y-[50px]'  
              id='animate-about'>
              NPM
            </p>
          </li>
          <li className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[50px]
              laptop-lg:translate-y-[50px]
              desktop:translate-y-[50px]'  
              id='animate-about'>
              Figma
            </p>
          </li>
          <li className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[50px]
              laptop-lg:translate-y-[50px]
              desktop:translate-y-[50px]'  
              id='animate-about'>
              Adobe Photoshop
            </p>
          </li>
          <li className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[50px]
              laptop-lg:translate-y-[50px]
              desktop:translate-y-[50px]'  
              id='animate-about'>
              Adobe Illustrator
            </p>
          </li>
        </ul>
      </li>
      <div className='col-span-8' id='tools-and-tech-line'/>
    </>
  )
}

export default ToolTechnology