<<<<<<< HEAD
//
import React, { useEffect } from 'react'
// scroll reveal
import { scrollRevealSequence } from '../../../utils/scrollReveal'

function WebDev() {
  useEffect(() => {
    const reveal = scrollRevealSequence([
      { targets: '#web-dev-line', vars: { width: '100%', ease: 'power1.in' } },
      { targets: '#animate-webdev', vars: { y: 0, stagger: .04, ease: 'power1.in' } },
    ], { trigger: '#web-dev-line' });
    return () => reveal.kill();
=======
// 
import React, { useEffect } from 'react'
// GSAP
import gsap from 'gsap' 
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function WebDev() {
  useEffect(() => {
    // line animation
    gsap.to('#web-dev-line', {
      duration: 1,
      // delay: 3,
      width: '100%',
      ease: 'power1.in',
      scrollTrigger: { 
        trigger: '#web-dev-line', 
        start: 'bottom 100%'
      }
    });
>>>>>>> origin/master
  }, []);

  return (
    <>
      <div className='col-span-8' id='web-dev-line'/>
      <li className='col-span-8 grid py-6
        mobile:grid-cols-1 mobile:h-full
        tablet:grid-cols-1 tablet:h-full
        laptop:grid-cols-2 laptop:h-full
        laptop-lg:grid-cols-2 laptop-lg:h-[97px]
        desktop:grid-cols-2 desktop:h-[97px]'>
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
<<<<<<< HEAD
            id='animate-webdev'>
=======
            id='animate-about'>
>>>>>>> origin/master
            Web 
          </span>
          <span className='stack-context font-medium
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[50px]
            laptop-lg:translate-y-[50px]
            desktop:translate-y-[50px]'
<<<<<<< HEAD
            id='animate-webdev'>
=======
            id='animate-about'>
>>>>>>> origin/master
            Development
          </span>
        </div>
        {/* stacks */}
        <ul className='col-span-1 flex flex-wrap h-[30px]'>
          <li className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]'  
<<<<<<< HEAD
              id='animate-webdev'>
              HTML5
=======
              id='animate-about'>
              HTML
>>>>>>> origin/master
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
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]'  
<<<<<<< HEAD
              id='animate-webdev'>
=======
              id='animate-about'>
>>>>>>> origin/master
              CSS3
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
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]'  
<<<<<<< HEAD
              id='animate-webdev'>
              SASS/SCSS
=======
              id='animate-about'>
              SASS
>>>>>>> origin/master
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
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]'   
<<<<<<< HEAD
              id='animate-webdev'>
=======
              id='animate-about'>
>>>>>>> origin/master
              JavaScript
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
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]' 
<<<<<<< HEAD
              id='animate-webdev'>
=======
              id='animate-about'>
>>>>>>> origin/master
              React JS
            </p>
          </li>
        </ul>
      </li>
    </>
  )
}

export default WebDev