// 
import React, { useEffect } from 'react'
// GSAP
import gsap from 'gsap' 
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function FrameworkLibrary() {
  useEffect(() => {
    // title and description animation 
    gsap.to('#stack-context', {
      duration: 1,
      y: 0,
      stagger: .05,
      ease: 'power1.out',
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
        tablet:h-[30px] tablet:text-[1.3rem]
        laptop:h-[40px] laptop:text-[1.5rem]
        laptop-lg:h-[40px] laptop-lg:text-[1.5rem]
        desktop:h-[50px] desktop:text-[1.5rem]'
        id='stack-container'>
        <span className='font-medium leading-none
          mobile:translate-y-[25px]
          tablet:translate-y-[30px]
          laptop:translate-y-[50px]
          laptop-lg:translate-y-[50px]
          desktop:translate-y-[50px]'
          id='stack-context'>
          Framework 
        </span>
        <span className='font-medium leading-none
          mobile:translate-y-[25px]
          tablet:translate-y-[30px]
          laptop:translate-y-[50px]
          laptop-lg:translate-y-[50px]
          desktop:translate-y-[50px]'
          id='stack-context'>
          &
        </span>
        <span className='font-medium leading-none
          mobile:translate-y-[25px]
          tablet:translate-y-[30px]
          laptop:translate-y-[50px]
          laptop-lg:translate-y-[50px]
          desktop:translate-y-[50px]'
          id='stack-context'>
          Library
        </span>
      </div>
      {/* stacks */}
      <ul className='col-span-1 flex flex-wrap leading-none'>
        <li className='h-[20px]
          mobile:text-[.5rem]
          tablet:text-[.5rem]
          laptop:text-[.8rem]
          laptop-lg:text-[.8rem]
          desktop:text-[.8rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[20px]
            laptop-lg:translate-y-[20px]
            desktop:translate-y-[20px]' 
            id='stack-context'>
            BootStrap
          </p>
        </li>
        <li className='h-[20px]
          mobile:text-[.5rem]
          tablet:text-[.5rem]
          laptop:text-[.8rem]
          laptop-lg:text-[.8rem]
          desktop:text-[.8rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[20px]
            laptop-lg:translate-y-[20px]
            desktop:translate-y-[20px]' 
            id='stack-context'>
            Tailwind CSS
          </p>
        </li>
        <li className='h-[20px]
          mobile:text-[.5rem]
          tablet:text-[.5rem]
          laptop:text-[.8rem]
          laptop-lg:text-[.8rem]
          desktop:text-[.8rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[20px]
            laptop-lg:translate-y-[20px]
            desktop:translate-y-[20px]' 
            id='stack-context'>
            GSAP
          </p>
        </li>
      </ul>
    </>
  )
}

export default FrameworkLibrary