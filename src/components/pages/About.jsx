// 
import React, { useRef, useEffect } from 'react'
// icons
import {RiArrowRightDownLine} from 'react-icons/ri'
// GSAP
import gsap from 'gsap' 
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function About() {
  const effectContainer = useRef();
  const fxGreet = useRef();
  const fxText = useRef();
  const fxAbout1 = useRef();
  const fxAbout2 = useRef();
  const fxAbout3 = useRef();
  const fxAbout4 = useRef();
  const fxAbout5 = useRef();
  const fxImg = useRef();
  const fxUse = useRef();
  const fxContext1 = useRef();
  const fxContext2 = useRef();
  const fxContext3 = useRef();
  const fxWebDev = useRef();
  const fxStackWeb = useRef();
  const fxFrameworkLibrary = useRef();
  const fxStackFrameworkLibrary = useRef();
  const fxToolsnTech = useRef();
  const fxStackToolsnTech = useRef();
  
  useEffect(() => {
    gsap.to(effectContainer.current, {
      scrollTrigger: {
        trigger: effectContainer.current,
        // pin: true,
        // start: "bottom 800px",
      }
    });

    gsap.to(fxGreet.current, {
      duration: 1,
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxGreet.current,
        start: 'bottom 105%',
        end: 'bottom 100%',
        toggleActions: "play none none reverse",
        // markers: true
      },
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: fxText.current,
        start: 'bottom 100%',
        end: 'bottom 90%',
        toggleActions: "play none none reverse",
      }
    });
    
    timeline.to(fxText.current, {
      duration: 1,
      // delay: 0.1,
      top: '0px',
      ease: 'power1.inOut',
    })
    .set(fxText.current, {
      innerHTML: 'Responsible',
      scrollTrigger: {
        trigger: fxText.current,
        start: 'bottom 95%',
        end: 'bottom 90%',
        toggleActions: "play complete reverse reset",
        // markers: true
      }
    })
    .set(fxText.current, {
      innerHTML: 'Hard-Working',
      scrollTrigger: {
        trigger: fxText.current,
        start: 'bottom 90%',
        end: 'bottom 85%',
        toggleActions: "play complete reverse reset",
        // markers: true
      }
    })
    .set(fxText.current, {
      innerHTML: 'Jayson',
      scrollTrigger: {
        trigger: fxText.current,
        start: 'bottom 85%',
        end: 'bottom 80%',
        toggleActions: "play complete reverse reset",
        // markers: true
      }
    })

    // about content
    gsap.to(fxAbout1.current , {
      duration: 1, 
      ease: 'power1.inOut',
      top: '0px',
      scrollTrigger: {
        trigger: fxAbout1.current,
        start: 'top 90%',
        toggleActions: "play none none reverse",
      }
    });

    gsap.to(fxAbout2.current , {
      duration: 1, 
      ease: 'power1.inOut',
      top: '0px',
      scrollTrigger: {
        trigger: fxAbout2.current,
        start: 'top 95%',
        toggleActions: "play none none reverse",
      }
    });

    gsap.to(fxAbout3.current , {
      duration: 1, 
      ease: 'power1.inOut',
      top: '0px',
      scrollTrigger: {
        trigger: fxAbout3.current,
        start: 'top 100%',
        toggleActions: "play none none reverse",
      }
    });

    gsap.to(fxAbout4.current , {
      duration: 1, 
      ease: 'power1.inOut',
      top: '0px',
      scrollTrigger: {
        trigger: fxAbout4.current,
        start: 'top 105%',
        toggleActions: "play none none reverse",
      }
    });

    gsap.to(fxAbout5.current , {
      duration: 1, 
      ease: 'power1.inOut',
      top: '0px',
      scrollTrigger: {
        trigger: fxAbout5.current,
        start: 'top 110%',
        // end: 'top 300px',
        toggleActions: "play none none reverse",
      }
    });

    // profile image
    gsap.to(fxImg.current, {
      duration: 1,
      // width: '400px',
      // top: '1300px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxImg.current,
        start: 'bottom 120%',
        toggleActions: "play none none reverse",
      }
    });

    // what i use
    gsap.to(fxUse.current, {
      duration: 1,
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxUse.current,
        start: 'bottom 100%',
        toggleActions: "play none none reverse",
      }
    });

    gsap.to(fxContext1.current, {
      duration: 1,
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxContext1.current,
        start: 'bottom 90%',
        toggleActions: "play none none reverse",
      }
    });

    gsap.to(fxContext2.current, {
      duration: 1,
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxContext2.current,
        start: 'bottom 90%',
        toggleActions: "play none none reverse",
      }
    });

    gsap.to(fxContext3.current, {
      duration: 1,
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxContext3.current,
        start: 'bottom 90%',
        toggleActions: "play none none reverse",
      }
    });

    // web dev stack
    gsap.to(fxWebDev.current, {
      duration: 1,
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxWebDev.current,
        start: 'bottom 100%',
        toggleActions: "play none none reverse",
      }
    });

    gsap.to(fxStackWeb.current, {
      duration: 1,
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxStackWeb.current,
        start: 'bottom 90%',
        toggleActions: "play none none reverse",
      }
    });

    // framework & library
    gsap.to(fxFrameworkLibrary.current, {
      duration: 1,
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxFrameworkLibrary.current,
        start: 'bottom 100%',
        toggleActions: "play none none reverse",
      }
    });

    gsap.to(fxStackFrameworkLibrary.current, {
      duration: 1,
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxStackFrameworkLibrary.current,
        start: 'bottom 90%',
        toggleActions: "play none none reverse",
      }
    });

    // tools & tech
    gsap.to(fxToolsnTech.current, {
      duration: 1,
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxToolsnTech.current,
        start: 'bottom 100%',
        toggleActions: "play none none reverse",
      }
    });

    gsap.to(fxStackToolsnTech.current, {
      duration: 1,
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxStackToolsnTech.current,
        start: 'bottom 90%',
        toggleActions: "play none none reverse",
      }
    });

  }, []);

  return (
    <>
      <div className="px-[3em]" id='about'>
        {/* first grid */}
        <div className="grid grid-cols-4 gap-0 py-40" ref={effectContainer}>
          {/*  */}
          <section className="col-span-4 pb-10">
            {/*  */}
            <div id='about-container'>
              <span className='font-teko font-medium text-[6.3em] leading-none italic tracking-tight' id='greet' ref={fxGreet}>Hello, I'm</span>
              <ul className='flex flex-col' id='about-container'>
                <li className='font-teko font-medium text-[6.3em] leading-none italic trackng-tight' id='text' ref={fxText}>Dedicated</li>
              </ul>
            </div>
          </section>
          <section className="col-span-4 pb-20">
            {/*  */}
            <div className='font-montserrat font-regular text-[3.2em] leading-none'>
              <div id='content-container'>
                <p className='indent-20' id='about' ref={fxAbout1}>An enthusiastic self-taught web </p>
              </div>
              <div id='content-container'>
                <p id='about' ref={fxAbout2}>and ui designer from Philippines. I am </p>
              </div>
              <div id='content-container'>
                <p id='about' ref={fxAbout3}>passionate in building and designing </p>
              </div>
              <div id='content-container'>
                <p id='about' ref={fxAbout4}>website interface with the use of </p>
              </div>
              <div id='content-container'>
                <p id='about' ref={fxAbout5}>modern web technology.</p>
              </div>
            </div>
          </section>
          <section className="col-span-4">
            {/*  */}
            <ul className="grid grid-cols-4">
              <li id="list" className='col-span-4 grid grid-cols-4 py-3 h-[100px]'>
                <div className='col-span-2' id='stack-container'>
                  <span className='text-[2em] font-medium' id='stack-header' ref={fxUse}>What I use?</span>
                </div>
                <div className='col-span-2'>
                  <div id='stacks'>
                    <span className='text-[1em]' id='stack-context' ref={fxContext1}>I've been utilizing in producing UI Design, Wireframing, Prototyping,</span>
                  </div>
                  <div id='stacks'>
                    <span className='text-[1em]' id='stack-context' ref={fxContext2}>Visual Design, and Develop Website. The tools and technologies listed </span>
                  </div>
                  <div id='stacks'>
                    <span className='text-[1em]' id='stack-context' ref={fxContext3}>below are those that I have used and am familiar with.</span>
                  </div>
                </div>
              </li>
              <li id="list" className="col-span-4 grid grid-cols-4 py-3 h-[100px]">
                <div className='col-span-2' id='stack-container'>
                  <span className='text-[2em] font-medium' id='stack-header' ref={fxWebDev}>
                    Web Development
                  </span>
                </div>
                <div className='col-span-2' id='stacks'>
                  <ul className='text-[1em] flex flex-wrap' id='stack-context' ref={fxStackWeb}>
                    <li>HTML5</li>
                    <li>CSS3</li>
                    <li>SASS</li>
                    <li>JavaScript</li>
                    <li>React JS</li>
                  </ul>
                </div>
              </li>
              <li id="list" className="col-span-4 grid grid-cols-4 py-3 h-[100px]">
                <div className='col-span-2' id='stack-container'>
                  <span className='text-[2em] font-medium' id='stack-header' ref={fxFrameworkLibrary}>
                    Framework & Library
                  </span>
                </div>
                <div className='col-span-2' id='stacks'>
                  <ul className='text-[1em] flex flex-wrap' id='stack-context' ref={fxStackFrameworkLibrary}>
                    <li>BootStrap</li>
                    <li>Tailwind CSS</li>
                    <li>GSAP</li>
                  </ul>
                </div>
              </li>
              <li id="list" className="col-span-4 grid grid-cols-4 py-3 h-[100px]">
                <div className='col-span-2' id='stack-container'>
                  <span className='text-[2em] font-medium' id='stack-header' ref={fxToolsnTech}>
                    Tools & Technologies
                  </span>
                </div>
                <div className='col-span-2' id='stacks'>
                  <ul className='text-[1em] flex flex-wrap' id='stack-context' ref={fxStackToolsnTech}>
                    <li>VS Code</li>
                    {/* <li>Git</li> */}
                    <li>NPM</li>
                    <li>Figma</li>
                    <li>Adobe Photoshop</li>
                    <li>Adobe Illustrator</li>
                  </ul>
                </div>
              </li>
            </ul>
          </section>
          {/*  */}
          {/* <section className="col-span-1 col-start-4" id='reveal' ref={fxReveal}>
            <div className="bg-profile bg-cover bg-center" id='img' ref={fxImg}/>
          </section> */}
        </div>
      </div>
    </>
  )
}

export default About