// 
import React, { useEffect } from 'react'
// GSAP
import gsap from 'gsap' 
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function WhatIUse() {
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
        tablet:h-[30px] tablet:text-[1.3rem]
        laptop:h-[40px] laptop:text-[1.5rem]
        laptop-lg:h-[40px] laptop-lg:text-[1.5rem]
        desktop:h-[50px] desktop:text-[1.5em]'
        id='stack-container'>
        <span className='font-medium
          mobile:translate-y-[25px]
          tablet:translate-y-[30px]
          laptop:translate-y-[50px]
          laptop-lg:translate-y-[50px]
          desktop:translate-y-[50px]'
          id='stack-context'>
          What
        </span>
        <span className='font-medium
          mobile:translate-y-[25px]
          tablet:translate-y-[30px]
          laptop:translate-y-[50px]
          laptop-lg:translate-y-[50px]
          desktop:translate-y-[50px]'
          id='stack-context'>
          I
        </span>
        <span className='font-medium
          mobile:translate-y-[25px]
          tablet:translate-y-[30px]
          laptop:translate-y-[50px]
          laptop-lg:translate-y-[50px]
          desktop:translate-y-[50px]'
          id='stack-context'>
          Use?
        </span>
      </div>
      {/* description */}
      <div className='col-span-1 flex flex-wrap'>
        <div className='h-[30px]
          mobile:text-[1rem]
          tablet:text-[1.1rem]
          laptop:text-[1.2rem]
          laptop-lg:text-[1.2rem]
          desktop:text-[1.3rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[30px]
            laptop-lg:translate-y-[30px]
            desktop:translate-y-[30px]' 
            id='stack-context'>
            I've
          </p>
        </div>
        <div className='h-[30px]
          mobile:text-[1rem]
          tablet:text-[1.1rem]
          laptop:text-[1.2rem]
          laptop-lg:text-[1.2rem]
          desktop:text-[1.3rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[30px]
            laptop-lg:translate-y-[30px]
            desktop:translate-y-[30px]' 
            id='stack-context'>
            been
          </p>
        </div>
        <div className='h-[30px]
          mobile:text-[1rem]
          tablet:text-[1.1rem]
          laptop:text-[1.2rem]
          laptop-lg:text-[1.2rem]
          desktop:text-[1.3rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[30px]
            laptop-lg:translate-y-[30px]
            desktop:translate-y-[30px]' 
            id='stack-context'>
            utilizing
          </p>
        </div>
        <div className='h-[30px]
          mobile:text-[1rem]
          tablet:text-[1.1rem]
          laptop:text-[1.2rem]
          laptop-lg:text-[1.2rem]
          desktop:text-[1.3rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[30px]
            laptop-lg:translate-y-[30px]
            desktop:translate-y-[30px]' 
            id='stack-context'>
            in
          </p>
        </div>
        <div className='h-[30px]
          mobile:text-[1rem]
          tablet:text-[1.1rem]
          laptop:text-[1.2rem]
          laptop-lg:text-[1.2rem]
          desktop:text-[1.3rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[30px]
            laptop-lg:translate-y-[30px]
            desktop:translate-y-[30px]' 
            id='stack-context'>
            producing
          </p>
        </div>
        <div className='h-[30px]
          mobile:text-[1rem]
          tablet:text-[1.1rem]
          laptop:text-[1.2rem]
          laptop-lg:text-[1.2rem]
          desktop:text-[1.3rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[30px]
            laptop-lg:translate-y-[30px]
            desktop:translate-y-[30px]' 
            id='stack-context'>
            ui
          </p>
        </div>
        <div className='h-[30px]
          mobile:text-[1rem]
          tablet:text-[1.1rem]
          laptop:text-[1.2rem]
          laptop-lg:text-[1.2rem]
          desktop:text-[1.3rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[30px]
            laptop-lg:translate-y-[30px]
            desktop:translate-y-[30px]' 
            id='stack-context'>
            design,
          </p>
        </div>
        <div className='h-[30px]
          mobile:text-[1rem]
          tablet:text-[1.1rem]
          laptop:text-[1.2rem]
          laptop-lg:text-[1.2rem]
          desktop:text-[1.3rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[30px]
            laptop-lg:translate-y-[30px]
            desktop:translate-y-[30px]' 
            id='stack-context'>
            wireframing,
          </p>
        </div>
        <div className='h-[30px]
          mobile:text-[1rem]
          tablet:text-[1.1rem]
          laptop:text-[1.2rem]
          laptop-lg:text-[1.2rem]
          desktop:text-[1.3rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[30px]
            laptop-lg:translate-y-[30px]
            desktop:translate-y-[30px]' 
            id='stack-context'>
            prototyping,
          </p>
        </div>
        <div className='h-[30px]
          mobile:text-[1rem]
          tablet:text-[1.1rem]
          laptop:text-[1.2rem]
          laptop-lg:text-[1.2rem]
          desktop:text-[1.3rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[30px]
            laptop-lg:translate-y-[30px]
            desktop:translate-y-[30px]' 
            id='stack-context'>
            visual design,
          </p>
        </div>
        <div className='h-[30px]
          mobile:text-[1rem]
          tablet:text-[1.1rem]
          laptop:text-[1.2rem]
          laptop-lg:text-[1.2rem]
          desktop:text-[1.3rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[30px]
            laptop-lg:translate-y-[30px]
            desktop:translate-y-[30px]' 
            id='stack-context'>
            and
          </p>
        </div>
        <div className='h-[30px]
          mobile:text-[1rem]
          tablet:text-[1.1rem]
          laptop:text-[1.2rem]
          laptop-lg:text-[1.2rem]
          desktop:text-[1.3rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[30px]
            laptop-lg:translate-y-[30px]
            desktop:translate-y-[30px]' 
            id='stack-context'>
            develop
          </p>
        </div>
        <div className='h-[30px]
          mobile:text-[1rem]
          tablet:text-[1.1rem]
          laptop:text-[1.2rem]
          laptop-lg:text-[1.2rem]
          desktop:text-[1.3rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[30px]
            laptop-lg:translate-y-[30px]
            desktop:translate-y-[30px]' 
            id='stack-context'>
            website.
          </p>
        </div>
        <div className='h-[30px]
          mobile:text-[1rem]
          tablet:text-[1.1rem]
          laptop:text-[1.2rem]
          laptop-lg:text-[1.2rem]
          desktop:text-[1.3rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[30px]
            laptop-lg:translate-y-[30px]
            desktop:translate-y-[30px]' 
            id='stack-context'>
            The
          </p>
        </div>
        <div className='h-[30px]
          mobile:text-[1rem]
          tablet:text-[1.1rem]
          laptop:text-[1.2rem]
          laptop-lg:text-[1.2rem]
          desktop:text-[1.3rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[30px]
            laptop-lg:translate-y-[30px]
            desktop:translate-y-[30px]' 
            id='stack-context'>
            tools
          </p>
        </div>
        <div className='h-[30px]
          mobile:text-[1rem]
          tablet:text-[1.1rem]
          laptop:text-[1.2rem]
          laptop-lg:text-[1.2rem]
          desktop:text-[1.3rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[30px]
            laptop-lg:translate-y-[30px]
            desktop:translate-y-[30px]' 
            id='stack-context'>
            and
          </p>
        </div>
        <div className='h-[30px]
          mobile:text-[1rem]
          tablet:text-[1.1rem]
          laptop:text-[1.2rem]
          laptop-lg:text-[1.2rem]
          desktop:text-[1.3rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[30px]
            laptop-lg:translate-y-[30px]
            desktop:translate-y-[30px]' 
            id='stack-context'>
            technologies
          </p>
        </div>
        <div className='h-[30px]
          mobile:text-[1rem]
          tablet:text-[1.1rem]
          laptop:text-[1.2rem]
          laptop-lg:text-[1.2rem]
          desktop:text-[1.3rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[30px]
            laptop-lg:translate-y-[30px]
            desktop:translate-y-[30px]' 
            id='stack-context'>
            listed
          </p>
        </div>
        <div className='h-[30px]
          mobile:text-[1rem]
          tablet:text-[1.1rem]
          laptop:text-[1.2rem]
          laptop-lg:text-[1.2rem]
          desktop:text-[1.3rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[30px]
            laptop-lg:translate-y-[30px]
            desktop:translate-y-[30px]' 
            id='stack-context'>
            below
          </p>
        </div>
        <div className='h-[30px]
          mobile:text-[1rem]
          tablet:text-[1.1rem]
          laptop:text-[1.2rem]
          laptop-lg:text-[1.2rem]
          desktop:text-[1.3rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[30px]
            laptop-lg:translate-y-[30px]
            desktop:translate-y-[30px]' 
            id='stack-context'>
            are
          </p>
        </div>
        <div className='h-[30px]
          mobile:text-[1rem]
          tablet:text-[1.1rem]
          laptop:text-[1.2rem]
          laptop-lg:text-[1.2rem]
          desktop:text-[1.3rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[30px]
            laptop-lg:translate-y-[30px]
            desktop:translate-y-[30px]' 
            id='stack-context'>
            those
          </p>
        </div>
        <div className='h-[30px]
          mobile:text-[1rem]
          tablet:text-[1.1rem]
          laptop:text-[1.2rem]
          laptop-lg:text-[1.2rem]
          desktop:text-[1.3rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[30px]
            laptop-lg:translate-y-[30px]
            desktop:translate-y-[30px]' 
            id='stack-context'>
            that
          </p>
        </div>
        <div className='h-[30px]
          mobile:text-[1rem]
          tablet:text-[1.1rem]
          laptop:text-[1.2rem]
          laptop-lg:text-[1.2rem]
          desktop:text-[1.3rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[30px]
            laptop-lg:translate-y-[30px]
            desktop:translate-y-[30px]' 
            id='stack-context'>
            I
          </p>
        </div>
        <div className='h-[30px]
          mobile:text-[1rem]
          tablet:text-[1.1rem]
          laptop:text-[1.2rem]
          laptop-lg:text-[1.2rem]
          desktop:text-[1.3rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[30px]
            laptop-lg:translate-y-[30px]
            desktop:translate-y-[30px]' 
            id='stack-context'>
            have
          </p>
        </div>
        <div className='h-[30px]
          mobile:text-[1rem]
          tablet:text-[1.1rem]
          laptop:text-[1.2rem]
          laptop-lg:text-[1.2rem]
          desktop:text-[1.3rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[30px]
            laptop-lg:translate-y-[30px]
            desktop:translate-y-[30px]' 
            id='stack-context'>
            used
          </p>
        </div>
        <div className='h-[30px]
          mobile:text-[1rem]
          tablet:text-[1.1rem]
          laptop:text-[1.2rem]
          laptop-lg:text-[1.2rem]
          desktop:text-[1.3rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[30px]
            laptop-lg:translate-y-[30px]
            desktop:translate-y-[30px]' 
            id='stack-context'>
            and
          </p>
        </div>
        <div className='h-[30px]
          mobile:text-[1rem]
          tablet:text-[1.1rem]
          laptop:text-[1.2rem]
          laptop-lg:text-[1.2rem]
          desktop:text-[1.3rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[30px]
            laptop-lg:translate-y-[30px]
            desktop:translate-y-[30px]' 
            id='stack-context'>
            am
          </p>
        </div>
        <div className='h-[30px]
          mobile:text-[1rem]
          tablet:text-[1.1rem]
          laptop:text-[1.2rem]
          laptop-lg:text-[1.2rem]
          desktop:text-[1.3rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[30px]
            laptop-lg:translate-y-[30px]
            desktop:translate-y-[30px]' 
            id='stack-context'>
            familiar
          </p>
        </div>
        <div className='h-[30px]
          mobile:text-[1rem]
          tablet:text-[1.1rem]
          laptop:text-[1.2rem]
          laptop-lg:text-[1.2rem]
          desktop:text-[1.3rem]'
          id='stacks'>
          <p className='
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[30px]
            laptop-lg:translate-y-[30px]
            desktop:translate-y-[30px]' 
            id='stack-context'>
            with.
          </p>
        </div>
      </div>
    </>
  )
}

export default WhatIUse