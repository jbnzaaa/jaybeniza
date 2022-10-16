//
import React, { useRef, useState, useEffect } from 'react'
import SelectedProject from './SelectedProject'
// Project JSON
import project from '../../assets/files/data'
// icons
import {RiArrowRightDownLine} from 'react-icons/ri'
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
  const fxCardAnim1 = useRef();
  const fxProjTitle1 = useRef();
  const fxProjTimeline1 = useRef();
  const fxCardAnim2 = useRef();
  const fxProjTitle2 = useRef();
  const fxProjTimeline2 = useRef();
  const fxCardAnim3 = useRef();
  const fxProjTitle3 = useRef();
  const fxProjTimeline3 = useRef();
  const fxCardAnim4 = useRef();
  const fxProjTitle4 = useRef();
  const fxProjTitle5 = useRef();
  const fxLink1 = useRef();

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
    
    // dailydiscount
    // gsap.to(fxProjTitle1.current , {
    //   duration: 1,
    //   top: '0px',
    //   ease: 'power1.inOut',
    //   scrollTrigger: {
    //     trigger: fxProjTitle1.current,
    //     start: 'bottom 140%',
    //     toggleActions: "play none none reverse",
    //   }
    // });
    
    // gsap.to(fxProjTimeline1.current , {
    //   duration: 1,
    //   top: '0px',
    //   ease: 'power1.inOut',
    //   scrollTrigger: {
    //     trigger: fxProjTimeline1.current,
    //     start: 'bottom 140%',
    //     toggleActions: "play none none reverse",
    //   }
    // });
    
    // jbnza
    // gsap.to(fxProjTitle2.current , {
    //   duration: 1,
    //   top: '0px',
    //   ease: 'power1.inOut',
    //   scrollTrigger: {
    //     trigger: fxProjTitle2.current,
    //     start: 'bottom 140%',
    //     toggleActions: "play none none reverse",
    //   }
    // });
    
    // gsap.to(fxProjTimeline2.current , {
    //   duration: 1,
    //   top: '0px',
    //   ease: 'power1.inOut',
    //   scrollTrigger: {
    //     trigger: fxProjTimeline2.current,
    //     start: 'bottom 140%',
    //     toggleActions: "play none none reverse",
    //   }
    // });
    
    // regain
    // gsap.to(fxProjTitle3.current , {
    //   duration: 1,
    //   top: '0px',
    //   ease: 'power1.inOut',
    //   scrollTrigger: {
    //     trigger: fxProjTitle3.current,
    //     start: 'bottom 140%',
    //     toggleActions: "play none none reverse",
    //   }
    // });
    
    // gsap.to(fxProjTimeline3.current , {
    //   duration: 1,
    //   top: '0px',
    //   ease: 'power1.inOut',
    //   scrollTrigger: {
    //     trigger: fxProjTimeline3.current,
    //     start: 'bottom 140%',
    //     toggleActions: "play none none reverse",
    //   }
    // });

    // view more
    // gsap.to(fxProjTitle4.current , {
    //   duration: 1,
    //   top: '0px',
    //   ease: 'power1.inOut',
    //   scrollTrigger: {
    //     trigger: fxProjTitle4.current,
    //     start: 'bottom 140%',
    //     toggleActions: "play none none reverse",
    //   }
    // });

    // gsap.to(fxProjTitle5.current , {
    //   duration: 1,
    //   top: '0px',
    //   ease: 'power1.inOut',
    //   scrollTrigger: {
    //     trigger: fxProjTitle5.current,
    //     start: 'bottom 140%',
    //     toggleActions: "play none none reverse",
    //   }
    // });

    gsap.to(fxLink1.current, {
      duration: 1, 
      top: '0', 
      ease: 'power1.inOut',
    });
    
    // card animation
    gsap.to(fxCardAnim1.current , {
      duration: 1,
      marginTop: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxCardAnim1.current,
        // start: 'bottom 150%',
        toggleActions: "play none none reverse",
      }
    });
    
    gsap.to(fxCardAnim2.current , {
      duration: 1,
      marginTop: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxCardAnim2.current,
        // start: 'bottom 150%',
        toggleActions: "play none none reverse",
      }
    });

    // gsap.to(fxCardAnim3.current , {
    //   duration: 1,
    //   marginTop: '0px',
    //   ease: 'power1.inOut',
    //   scrollTrigger: {
    //     trigger: fxCardAnim3.current,
    //     // start: 'bottom 150%',
    //     toggleActions: "play none none reverse",
    //   }
    // });
    
    // gsap.to(fxCardAnim4.current , {
    //   duration: 1,
    //   marginTop: '0px',
    //   ease: 'power1.inOut',
    //   scrollTrigger: {
    //     trigger: fxCardAnim4.current,
    //     // start: 'bottom 150%',
    //     toggleActions: "play none none reverse",
    //   }
    // });

  }, []);

  return (
    <>
      <div className="px-[3em]" id='project'>
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
                    <p id='description' ref={fxDesc3}>self-taught front-end web developer</p>
                  </div>
                  <div id='description-container'>
                    <p id='description' ref={fxDesc4}>and user interface designer.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="grid grid-cols-4 grid-rows-8 grid-flow-col gap-5 py-20">
            {/* daily discount */}
            <div className="col-span-2 col-start-1 row-span-4 row-start-1">
              <div className="bg-[#0F0E17] h-[70vh] relative" id='card' ref={fxCardAnim1}>
                <div className="bg-dailydiscount bg-cover object-cover absolute mix-blend-overlay h-full w-full"/>
                <div className='flex flex-col justify-end h-full p-8'>
                  <div className="flex justify-between items-end">
                    <div className='flex flex-col w-full'>
                      <div id='project-container'>
                        {/*  id='project-title' ref={fxProjTitle1} */}
                        <span className='font-teko font-medium text-[5em] leading-none italic tracking-tight text-white'>DailyDiscount</span>
                      </div>
                      <div id='project-context'>
                        {/*  id='project-timeline' ref={fxProjTimeline1} */}
                        <span className='font-montserrat font-regular text-[1em] text-white'>Team / 2022 / Ongoing Web Development</span>
                      </div>
                    </div>
                    <div id='project-link'>
                      <a href='https://daily-discount.vercel.app/' target='https://daily-discount.vercel.app/' className='flex items-center p-2.5' ref={fxLink1}>
                        <RiArrowRightDownLine id='icon' className='fill-white text-5xl'/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* jbnza */}
            <div className="col-span-2 col-start-3 row-span-4 row-start-2">
              <div className="bg-[#0F0E17] h-[70vh] relative" id='card' ref={fxCardAnim2}>
                <div className="bg-jbnza bg-cover object-cover absolute mix-blend-overlay h-full w-full"/>
                <div className="flex justify-between items-end h-full p-8">
                  <div className='flex flex-col w-full'>
                    <div id='project-container'>
                      {/*  id='project-title' ref={fxProjTitle2} */}
                      <span className='font-teko font-medium text-[5em] leading-none italic tracking-tight text-white'>jbnza</span>
                    </div>
                    <div id='project-context'>
                      {/*  id='project-timeline' ref={fxProjTimeline2} */}
                      <span className='font-montserrat font-regular text-[1em] text-white'>Personal / 2022 / Web Development</span>
                    </div>
                  </div>
                  <div id='project-link'>
                    <a href='https://jbnza.vercel.app' target='https://jbnza.vercel.app' className='flex items-center p-2.5'>
                      <RiArrowRightDownLine id='icon' className='fill-white text-5xl'/>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* regain */}
            <div className="col-span-2 col-start-1 row-span-4 row-start-5">
              <div className="bg-[#0F0E17] h-[70vh] relative">
                <div className="bg-regain bg-cover object-cover absolute mix-blend-overlay h-full w-full"/>
                <div className="flex justify-between items-end h-full p-8">
                  <div className='flex flex-col w-full'>
                    <div id='project-container'>
                      {/* id='project-title' ref={fxProjTitle3} */}
                      <span className='font-teko font-medium text-[5em] leading-none italic tracking-tight text-white'>Regain</span>
                    </div>
                    <div id='project-context'>
                      {/*  id='project-timeline' ref={fxProjTimeline3} */}
                      <span className='font-montserrat font-regular text-[1em] text-white'>Team / 2021 / Web Development</span>
                    </div>
                  </div>
                  <div id='project-link'>
                    <a href='https://regain-caps.web.app/' target='https://regain-caps.web.app/' className='flex items-center p-2.5'>
                      <RiArrowRightDownLine id='icon' className='fill-white text-5xl'/>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* view more */}
            <div className="col-span-2 col-start-3 row-span-4 row-start-6">
              <div className="bg-[#0F0E17] h-[70vh] relative">
                <div className="absolute h-full w-full"/>
                <div className="flex justify-between items-end h-full p-8">
                  <div className="flex flex-col w-full">
                    <div id="project-container">
                      {/*  id='project-title' ref={fxProjTitle4} */}
                      <span className='font-teko font-medium text-[5em] leading-none italic tracking-tight text-white w-[60%]'>Take a look at</span>
                    </div>
                    <div id="project-container">
                      {/*  id='project-title' ref={fxProjTitle5} */}
                      <span className='font-teko font-medium text-[5em] leading-none italic tracking-tight text-white w-[60%]'>my UI designs</span>
                    </div>
                  </div>
                  <div id='project-link'>
                    <a href='https://www.behance.net/jbnza' target='https://www.behance.net/jbnza' className='flex items-center p-2.5'>
                      <RiArrowRightDownLine id='icon' className='fill-white text-5xl'/>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Project