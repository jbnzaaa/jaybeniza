//
import React, { useEffect } from 'react'
import ProjectCard from './ProjectCard'
// icons
import {RiArrowRightDownLine} from 'react-icons/ri'
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
// scroll reveal
import { scrollReveal } from '../../utils/scrollReveal'
// per-letter text split
import SplitText from '../common/SplitText'
gsap.registerPlugin(ScrollTrigger)

function Project() {
  useEffect(() => {
    const reveals = [];

    // overflow visible
    reveals.push(scrollReveal('#animate-project-header', { overflow: 'visible' }));

    // selected/projects parallax - continuously scroll-coupled, not a reveal
    const selected = gsap.to('#selected', {
      duration: .5,
      left: '30px',
      ease: 'power1.in',
      scrollTrigger: {
        trigger: '#selected',
        start: 'top 100%',
        scrub: true,
      }
    });

    const projects = gsap.to('#projects', {
      duration: .5,
      right: '30px',
      ease: 'power1.in',
      scrollTrigger: {
        trigger: '#projects',
        start: 'top 150%',
        scrub: true,
      }
    });

    // description
    reveals.push(scrollReveal('#animate-project', { y: 0, stagger: .02, ease: 'power1.in' }));

    // behance link
    reveals.push(scrollReveal('#animate-link', { y: 0, stagger: .02, ease: 'power1.in' }));

    return () => {
      reveals.forEach((r) => r.kill());
      [selected, projects].forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
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
            <div className='grid grid-cols-8 grid-rows-5 gap-0 h-full py-[3rem]'>
              <div className='row-start-1 row-span-1
                mobile:col-span-6 mobile:col-start-3
                tablet:col-span-5 tablet:col-start-4
                laptop:col-span-4 laptop:col-start-5
                laptop-lg:col-span-2 laptop-lg:col-start-7
                desktop:col-span-2 desktop:col-start-7'>
                <p className='flex flex-wrap text-white
                  mobile:h-[25px] mobile:text-[.9rem]
                  tablet:h-[30px] tablet:text-[.9rem]
                  laptop:h-[50px] laptop:text-[1rem]
                  laptop-lg:h-[50px] laptop-lg:text-[1rem]
                  desktop:h-[50px] desktop:text-[1.1rem]'>
                  <SplitText text="A collection of projects I've worked on throughout my journey as self-taught web developer and user interface designer." id='animate-project' />
                </p>
              </div>
              {/* page header */}
              <div className='col-span-8 col-start-1 w-full flex flex-col row-start-2 row-span-3 flex justify-center'>
                <div className='selected-project-header
                  mobile:h-[190px]
                  tablet:h-[150px]
                  laptop:h-[250px]
                  laptop-lg:h-[250px]
                  desktop:h-[250px]' 
                  id='animate-project-header'>
                  <span className='font-lexend font-medium leading-none tracking-tight text-white
                    mobile:text-[15rem] mobile:left-[-200px]
                    tablet:text-[17rem] tablet:left-[-80px]
                    laptop:text-[20rem] laptop:left-[-110px]
                    laptop-lg:text-[20rem] laptop-lg:left-[-120px]
                    desktop:text-[20rem] desktop:left-[-250px]'
                    id='selected'>
                    Selected
                  </span>
                </div>
                <div className='selected-project-header
                  mobile:h-[190px]
                  tablet:h-[150px]
                  laptop:h-[250px]
                  laptop-lg:h-[250px]
                  desktop:h-[250px]' 
                  id='animate-project-header'>
                  <span className='font-lexend font-medium leading-none tracking-tight text-white
                    mobile:text-[15rem] mobile:right-[-200px]
                    tablet:text-[17rem] tablet:right-[-80px]
                    laptop:text-[20rem] laptop:right-[-110px]
                    laptop-lg:text-[20rem] laptop-lg:right-[-120px]
                    desktop:text-[20rem] desktop:right-[-250px]'
                    id='projects'>
                    Projects
                  </span>
                </div>
              </div>
              {/* page links */}
              <span className='col-span-8 col-start-1 flex items-end row-start-5 row-span-1'>
                <div className='behance-link-container
                  mobile:h-[28px]
                  tablet:h-[35px]
                  laptop:h-[50px]
                  laptop-lg:h-[50px]
                  desktop:h-[50px]'>
                  <a href='https://www.behance.net/jbnza' target='_blank' rel='noreferrer'
                    className='behance-link flex items-center p-2.5'>
                    <span className='flex items-center text-white
                      mobile:text-[.9rem]
                      tablet:text-[.9rem]
                      laptop:text-[1rem]
                      laptop-lg:text-[1rem]
                      desktop:text-[1.1rem]'>
                      <SplitText text='Look at my UI Designs' id='animate-link' />
                      <RiArrowRightDownLine id='icon' className='fill-white ml-1
                      mobile:text-xl
                      tablet:text-1xl
                      laptop:text-2xl
                      laptop-lg:text-2xl
                      desktop:text-3xl'/>
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