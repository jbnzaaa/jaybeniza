//
import React, { useRef, useEffect } from 'react'
import ProjectCard from './ProjectCard'
// GSAP
import gsap from 'gsap' 
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function Project() {
  const fxDesc1 = useRef();
  const fxDesc2 = useRef();
  const fxDesc3 = useRef();
  const fxDesc4 = useRef();
  const fxProjCont = useRef();
  const fxProjects = useRef();

  useEffect(() => {
    gsap.to(fxProjCont.current, {
      scrollTrigger: {
        trigger: fxProjCont.current,
        // pin: true,
        // start: "bottom 700px",
        // markers: true
      }
    });

    // selected projects
    gsap.to(fxProjects.current, {
      duration: 1,
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxProjects.current,
        start: 'bottom 105%',
        end: 'bottom 100%',
        toggleActions: "play none none reverse",
      }
    });
  
    // description
    gsap.to(fxDesc1.current , {
      duration: 1,
      top: '0px', 
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxDesc1.current,
        start: 'bottom 100%',
        end: 'bottom 90%',
        toggleActions: "play none none reverse",
      }
    });

    gsap.to(fxDesc2.current , {
      duration: 1,
      top: '0px', 
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxDesc2.current,
        start: 'bottom 100%',
        end: 'bottom 90%',
        toggleActions: "play none none reverse",
      }
    });

    gsap.to(fxDesc3.current , {
      duration: 1,
      top: '0px', 
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxDesc3.current,
        start: 'bottom 100%',
        end: 'bottom 90%',
        toggleActions: "play none none reverse",
      }
    });

    gsap.to(fxDesc4.current , {
      duration: 1,
      top: '0px', 
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxDesc4.current,
        start: 'bottom 100%',
        end: 'bottom 90%',
        toggleActions: "play none none reverse",
      }
    });

  }, []);

  return (
    <>
      <div id='project'>
        {/*  */}
        <div className="grid grid-rows-1 gap-0 py-40" ref={fxProjCont}>
          {/* h-[85vh] flex flex-col justify-end py-10 */}
          <section className="row-span-1">
            <div className="grid grid-cols-4">
              {/* title */}
              <div className="col-span-2" id='selected-project'>
                <span className='font-teko font-medium text-[6.3em] leading-none italic tracking-tight' id='projects' ref={fxProjects}>Selected Projects</span>
              </div>
              {/* description */}
              <div className="col-span-1 col-start-3">
                <div className='font-montserrat font-regular text-[1em]'>
                  <div id='description-container'>
                    <p className='indent-20' id='description' ref={fxDesc1}>A collection of projects I've</p>
                  </div>
                  <div id='description-container'>
                    <p id='description' ref={fxDesc2}>worked on throughout my journey as</p>
                  </div>
                  <div id='description-container'>
                    <p id='description' ref={fxDesc3}>self-taught front-end web dev</p>
                  </div>
                  <div id='description-container'>
                    <p id='description' ref={fxDesc4}>and user interface designer.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <ProjectCard/>
        </div>
      </div>
    </>
  )
}

export default Project