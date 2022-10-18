//
import React, { useRef, useEffect } from 'react'
// 
import { Link } from 'react-router-dom'
// icons
import {RiArrowRightDownLine} from 'react-icons/ri'
// GSAP
import gsap from 'gsap' 
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function ProjectCard() {
  const fxCardAnim1 = useRef();
  // const fxProjTitle1 = useRef();
  // const fxProjTimeline1 = useRef();
  const fxCardAnim2 = useRef();
  // const fxProjTitle2 = useRef();
  // const fxProjTimeline2 = useRef();
  const fxCardAnim3 = useRef();
  // const fxProjTitle3 = useRef();
  // const fxProjTimeline3 = useRef();
  const fxCardAnim4 = useRef();
  // const fxProjTitle4 = useRef();
  // const fxProjTitle5 = useRef();
  const fxLink1 = useRef();

  useEffect(() => {
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

    gsap.to(fxCardAnim3.current , {
      duration: 1,
      marginTop: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxCardAnim3.current,
        // start: 'bottom 150%',
        toggleActions: "play none none reverse",
      }
    });
    
    gsap.to(fxCardAnim4.current , {
      duration: 1,
      marginTop: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxCardAnim4.current,
        // start: 'bottom 150%',
        toggleActions: "play none none reverse",
      }
    });
  },[]);

  return (
    <>
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
                  <Link to='/dailydiscount'>
                    <div className='flex items-center p-2.5'>
                      <RiArrowRightDownLine id='icon' className='fill-white text-5xl'/>
                    </div>
                  </Link>
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
                <Link to='/jbnza'>
                  <div className='flex items-center p-2.5'>
                    <RiArrowRightDownLine id='icon' className='fill-white text-5xl'/>
                  </div>
                </Link>
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
                <Link to='/regain'>
                  <div className='flex items-center p-2.5'>
                    <RiArrowRightDownLine id='icon' className='fill-white text-5xl'/>
                  </div>
                </Link>
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
    </>
  )
}

export default ProjectCard