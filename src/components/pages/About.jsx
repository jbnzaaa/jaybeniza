//
import React, { useEffect } from 'react'
// Components
import AboutParagraph from './about/AboutParagraph';
import WhatIUse from './about/WhatIUse';
import UiUxDesign from './about/UiUxDesign';
import WebDev from './about/WebDev';
import FrameworkLibrary from './about/FrameworkLibrary';
import ToolTechnology from './about/ToolTechnology';
// scroll reveal
import { scrollReveal } from '../../utils/scrollReveal'
// per-letter text split
import SplitText from '../common/SplitText'

function About() {
  useEffect(() => {
    // greeting container animation
    const reveal = scrollReveal('#animate-about', {
      y: 0,
      stagger: .02,
      ease: 'power1.in',
    });

    return () => reveal.kill();
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
              <span className='about-greetings font-lexend font-medium leading-none tracking-tighter'>
                <SplitText text="Hello, I'm Jayson" id='animate-about' />
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
              {/* ui/ux design */}
              <UiUxDesign/>
              {/* web development */}
              <WebDev/>
              {/* framework & library */}
              <FrameworkLibrary/>
              {/* design & development tools */}
              <ToolTechnology/>
            </ul>
          </section>
        </div>
      </div>
    </>
  )
}

export default About