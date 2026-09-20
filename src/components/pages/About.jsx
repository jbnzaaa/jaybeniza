<<<<<<< HEAD
//
=======
// 
>>>>>>> origin/master
import React, { useEffect } from 'react'
// Components
import AboutParagraph from './about/AboutParagraph';
import WhatIUse from './about/WhatIUse';
<<<<<<< HEAD
import UiUxDesign from './about/UiUxDesign';
import WebDev from './about/WebDev';
import FrameworkLibrary from './about/FrameworkLibrary';
import ToolTechnology from './about/ToolTechnology';
// scroll reveal
import { scrollReveal } from '../../utils/scrollReveal'
=======
import WebDev from './about/WebDev';
import FrameworkLibrary from './about/FrameworkLibrary';
import ToolTechnology from './about/ToolTechnology';
// GSAP
import gsap from 'gsap' 
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
>>>>>>> origin/master

function About() {
  useEffect(() => {
    // greeting container animation
<<<<<<< HEAD
    const reveal = scrollReveal('#animate-about', {
      y: 0,
      stagger: .05,
      ease: 'power1.in',
    });

    return () => reveal.kill();
=======
    gsap.to('#animate-about', {
      duration: 1,
      y: 0,
      stagger: .05,
      ease: 'power1.in',
      scrollTrigger: { 
        trigger: '#animate-about', 
        start: 'bottom 100%'
      }
    });

    // const timeline = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: fxText.current,
    //     start: 'bottom 100%',
    //     end: 'bottom 90%',
    //     toggleActions: "play none none reverse",
    //   }
    // });
    
    // timeline.to(fxText.current, {
    //   duration: 1,
    //   // delay: 0.1,
    //   top: '0px',
    //   ease: 'power1.inOut',
    // })
    // .set(fxText.current, {
    //   innerHTML: 'Responsible',
    //   scrollTrigger: {
    //     trigger: fxText.current,
    //     start: 'bottom 95%',
    //     end: 'bottom 90%',
    //     toggleActions: "play complete reverse reset",
    //     // markers: true
    //   }
    // })
    // .set(fxText.current, {
    //   innerHTML: 'Hard-Working',
    //   scrollTrigger: {
    //     trigger: fxText.current,
    //     start: 'bottom 90%',
    //     end: 'bottom 85%',
    //     toggleActions: "play complete reverse reset",
    //     // markers: true
    //   }
    // })
    // .set(fxText.current, {
    //   innerHTML: 'Jayson',
    //   scrollTrigger: {
    //     trigger: fxText.current,
    //     start: 'bottom 85%',
    //     end: 'bottom 80%',
    //     toggleActions: "play complete reverse reset",
    //     // markers: true
    //   }
    // })
>>>>>>> origin/master
  }, []);

  return (
    <>
      {/* about container */}
      <div className='flex flex-col justify-center
        mobile:h-[130vh]
        tablet:h-[150vh]
        laptop:h-[180vh]
        laptop-lg:h-[180vh]
        desktop:h-[200vh]'>
        {/* grid */}
        <div className='grid grid-cols-8 gap-0 
          mobile:py-16 mobile:px-[.9rem] 
          tablet:py-16 tablet:px-[1rem] 
          laptop:py-16 laptop:px-[2rem]
          laptop-lg:py-16 laptop-lg:px-[3rem]
          desktop:py-36 desktop:px-[3rem]'>
          {/* greeting */}
          <section className="col-span-8">
            <div className='about-container flex flex-wrap
              mobile:h-[35px] mobile:mb-2 mobile:text-[2rem]
              tablet:h-[60px] tablet:mb-2 tablet:text-[3rem]
              laptop:h-[90px] laptop:mb-3 laptop:text-[5rem]
              laptop-lg:h-[100px] laptop-lg:mb-3 laptop-lg:text-[5.3rem]
              desktop:h-[110px] desktop:mb-3 desktop:text-[5.5rem]'>
              <span className='about-greetings font-lexend font-medium leading-none tracking-tighter
                mobile:translate-y-[35px]
                tablet:translate-y-[80px]
                laptop:translate-y-[110px]
                laptop-lg:translate-y-[110px]
                desktop:translate-y-[120px]'
                id='animate-about'>
                Hello,
              </span>
              <span className='about-greetings font-lexend font-medium leading-none tracking-tighter
                mobile:translate-y-[35px]
                tablet:translate-y-[80px]
                laptop:translate-y-[110px]
                laptop-lg:translate-y-[110px]
                desktop:translate-y-[120px]'
                id='animate-about'>
                I'm
              </span>
              <span className='about-greetings font-lexend font-medium leading-none tracking-tighter
                mobile:translate-y-[35px]
                tablet:translate-y-[80px]
                laptop:translate-y-[110px]
                laptop-lg:translate-y-[110px]
                desktop:translate-y-[120px]'
                id='animate-about'>
                Jayson
              </span>
              {/* <ul className='
                mobile:left-[168px] mobile:h-[34px]
                tablet:left-[250px] tablet:h-[55px]
                laptop:left-[420px] laptop:h-[90px]
                laptop-lg:left-[490px] laptop-lg:h-[100px]
                desktop:left-[520px] desktop:h-[110px]' 
                id='about-container'>
                <li className='font-lexend font-medium leading-none tracking-tighter
                  mobile:text-[2rem]
                  tablet:text-[3rem]
                  laptop:text-[5rem]
                  laptop-lg:text-[6rem]
                  desktop:text-[6.3rem]'
                  id='text' ref={fxText}>
                  Dedicated
                </li>
              </ul> */}
            </div>
          </section>
          {/* about me */}
          <section className='
            mobile:col-span-8 mobile:mb-4
            tablet:col-span-7 tablet:mb-6
            laptop:col-span-7 laptop:mb-8
            laptop-lg:col-span-7 laptop-lg:mb-8
            desktop:col-span-7 desktop:mb-8'>
            <AboutParagraph/>
          </section>
          {/* skills */}
          <section className='col-span-8'>
            {/* skills container */}
            <ul className='grid 
              mobile:grid-cols-1
              tablet:grid-cols-4
              laptop:grid-cols-8
              laptop-lg:grid-cols-8
              desktop:grid-cols-8'>
              {/* what i use? */}
              <WhatIUse/>
<<<<<<< HEAD
              {/* ui/ux design */}
              <UiUxDesign/>
=======
>>>>>>> origin/master
              {/* web development */}
              <WebDev/>
              {/* framework & library */}
              <FrameworkLibrary/>
<<<<<<< HEAD
              {/* design & development tools */}
=======
              {/* tools & technologies */}
>>>>>>> origin/master
              <ToolTechnology/>
            </ul>
          </section>
        </div>
      </div>
    </>
  )
}

export default About