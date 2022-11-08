//
import React, { useRef, useEffect } from 'react'
import ProjectCard from './ProjectCard'
// icons
import {RiArrowRightDownLine} from 'react-icons/ri'
// GSAP
import gsap from 'gsap' 
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function Project() {
  const fxOverflow1 = useRef();
  const fxOverflow2 = useRef();

  useEffect(() => {
    // overflow visible
    gsap.to(fxOverflow1.current, {
      overflow: 'visible',
      scrollTrigger: {
        trigger: fxOverflow1.current,
      }
    });

    gsap.to(fxOverflow2.current, {
      overflow: 'visible',
      scrollTrigger: {
        trigger: fxOverflow2.current,
      }
    });

    // selected projects
    gsap.to('#selected', {
      duration: 1,
      left: '30px',
      ease: 'power1.out',
      scrollTrigger: { 
        trigger: '#selected', 
        start: 'top 100%',
        scrub: true,
      }
    });

    gsap.to('#projects', {
      duration: 1,
      right: '80px',
      ease: 'power1.out',
      scrollTrigger: { 
        trigger: '#projects', 
        start: 'top 150%',
        scrub: true,
      }
    });
    
    // description
    gsap.to('#description-p', {
      duration: 1,
      delay: 1.1,
      y: 0,
      stagger: .05,
      ease: 'power1.out',
      scrollTrigger: { 
        trigger: '#description-p', 
        start: 'bottom 120%',
      }
    });

    // behance link
    gsap.to('#behance-link', {
      duration: 1,
      // delay: 1,
      y: 0,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '#behance-link',
        start: 'top 100%',
      }
    });

  }, []);

  return (
    <>
      {/* project container */}
      <div id='project'>
        {/* grid */}
        <div className='grid grid-cols-1 gap-0 px-0 py-20'>
          <section className='col-span-8 bg-black
            mobile:px-[.9rem] mobile:h-[100vh]
            tablet:px-[1rem] tablet:h-[100vh]
            laptop:px-[2rem] tablet:h-[120vh]
            laptop-lg:px-[3rem] laptop:h-[130vh]
            desktop:px-[3rem] desktop:h-[130vh]'>
            {/* grid container */}
            <div className='grid grid-cols-8 grid-rows-5 gap-0 h-full
              mobile:py-[1rem]
              tablet:py-[3rem]
              laptop:py-[3rem]
              laptop-lg:py-[3rem]
              desktop:py-[3rem]'>
              <div className='row-start-1 row-span-1
                mobile:col-span-6 mobile:col-start-3
                tablet:col-span-5 tablet:col-start-4
                laptop:col-span-4 laptop:col-start-5
                laptop-lg:col-span-2 laptop-lg:col-start-7
                desktop:col-span-2 desktop:col-start-7'>
                <div className='flex flex-wrap
                  mobile:h-[18px] mobile:text-[.5rem]
                  tablet:h-[18px] tablet:text-[.5rem]
                  laptop:h-[20px] laptop:text-[.8rem]
                  laptop-lg:h-[20px] laptop-lg:text-[.8rem]
                  desktop:h-[20px] desktop:text-[.8rem]'>
                  <div id='description'><p className='text-white' id='description-p'>A</p></div>
                  <div id='description'><p className='text-white' id='description-p'>collection</p></div>
                  <div id='description'><p className='text-white' id='description-p'>of</p></div>
                  <div id='description'><p className='text-white' id='description-p'>projects</p></div>
                  <div id='description'><p className='text-white' id='description-p'>I've</p></div>
                  <div id='description'><p className='text-white' id='description-p'>worked</p></div>
                  <div id='description'><p className='text-white' id='description-p'>on</p></div>
                  <div id='description'><p className='text-white' id='description-p'>throughout</p></div>
                  <div id='description'><p className='text-white' id='description-p'>my</p></div>
                  <div id='description'><p className='text-white' id='description-p'>journey</p></div>
                  <div id='description'><p className='text-white' id='description-p'>as</p></div>
                  <div id='description'><p className='text-white' id='description-p'>self-taught</p></div>
                  <div id='description'><p className='text-white' id='description-p'>front-end</p></div>
                  <div id='description'><p className='text-white' id='description-p'>web</p></div>
                  <div id='description'><p className='text-white' id='description-p'>developer</p></div>
                  <div id='description'><p className='text-white' id='description-p'>and</p></div>
                  <div id='description'><p className='text-white' id='description-p'>user</p></div>
                  <div id='description'><p className='text-white' id='description-p'>interface</p></div>
                  <div id='description'><p className='text-white' id='description-p'>designer.</p></div>
                </div>
              </div>
              {/* page header */}
              <div className='col-span-8 col-start-1 w-full flex flex-col row-start-2 row-span-3 flex justify-center'>
                <div className='
                  mobile:h-[90px]
                  tablet:h-[130px]
                  laptop:h-[250px]
                  laptop-lg:h-[250px]
                  desktop:h-[250px]' 
                  id='selected-project-header' ref={fxOverflow1}>
                  <span className='font-lexend font-medium leading-none tracking-tight text-white
                    mobile:text-[5rem] mobile:left-[-30px]
                    tablet:text-[9rem] tablet:left-[-30px]
                    laptop:text-[12rem] laptop:left-[-100px]
                    laptop-lg:text-[17rem] laptop-lg:left-[-100px]
                    desktop:text-[18rem] desktop:left-[-100px]'
                    id='selected'>
                    Selected
                  </span>
                </div>
                <div className='
                  mobile:h-[90px]
                  tablet:h-[130px]
                  laptop:h-[250px]
                  laptop-lg:h-[250px]
                  desktop:h-[250px]' 
                  id='selected-project-header' ref={fxOverflow2}>
                  <span className='font-lexend font-medium leading-none tracking-tight text-white
                    mobile:text-[5rem] mobile:right-[-30px]
                    tablet:text-[9rem] tablet:right-[-30px]
                    laptop:text-[12rem] laptop:right-[-100px]
                    laptop-lg:text-[17rem] laptop-lg:right-[-100px]
                    desktop:text-[18rem] desktop:right-[-100px]'
                    id='projects'>
                    Projects
                  </span>
                </div>
              </div>
              {/* page links */}
              <span className='col-span-8 col-start-1 flex items-end row-start-5 row-span-1
                mobile:text-[.5rem]
                tablet:text-[.5rem]
                laptop:text-[.8rem]
                laptop-lg:text-[.8rem]
                desktop:text-[.8rem]'>
                <div className='
                  mobile:h-[30px]
                  tablet:h-[32px]
                  laptop:h-[34px]
                  laptop-lg:h-[43px]
                  desktop:h-[43px]' 
                  id='behance-link-container'>
                  <a href='https://www.behance.net/jbnza' target='https://www.behance.net/jbnza' 
                    className='flex items-center p-2.5
                    mobile:translate-y-[30px]
                    tablet:translate-y-[32px]
                    laptop:translate-y-[34px]
                    laptop-lg:translate-y-[43px]
                    desktop:translate-y-[43px]' 
                    id='behance-link'>
                    <span className='flex items-center text-white'>
                      Look at my UI Designs 
                      <RiArrowRightDownLine id='icon' className='fill-white text-2xl ml-1'/>
                    </span>
                  </a>
                </div>
              </span>
            </div>
          </section>
          <ProjectCard/>
        </div>
      </div>
    </>
  )
}

export default Project