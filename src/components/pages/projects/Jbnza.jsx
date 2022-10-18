// 
import React, { useRef, useEffect } from 'react'
// 
import { Link } from 'react-router-dom'
// icons
import {RiArrowRightDownLine} from 'react-icons/ri'
// GSAP
import gsap from 'gsap' 
// import ScrollTrigger from 'gsap/ScrollTrigger'

function Jbnza() {
  const fxOnload = useRef();
  const fxRevealImg = useRef();
  const fxTitle1 = useRef();
  const fxBack = useRef();
  const fxParagraph1 = useRef();
  const fxParagraph2 = useRef();
  const fxParagraph3 = useRef();
  const fxCategory = useRef();
  const fxCatCon = useRef();
  const fxRole = useRef();
  const fxRoleCon = useRef();
  const fxTectStack = useRef();
  const fxTectStackCon = useRef();
  const fxLink = useRef();

  useEffect(() => {
    // onload animation
    gsap.to(fxOnload.current, {
      duration: 1, 
      delay: .5,
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxOnload.current,
        start: 'bottom 250%',
      }
    });

    // image animation
    gsap.to(fxRevealImg.current, {
      duration: 1,
      delay: 1.2, 
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxRevealImg.current,
        start: 'top 200%',
      }
    });

    // project title
    gsap.to(fxTitle1.current, {
      duration: 1,
      delay: 1.5, 
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxTitle1.current,
        start: 'top 200%',
      }
    });

    // back button
    gsap.to(fxBack.current, {
      duration: 1,
      delay: 1.5, 
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxBack.current,
        start: 'top 200%',
      }
    });

    // paragraph
    gsap.to(fxParagraph1.current, {
      duration: 1,
      delay: 1.8, 
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxParagraph1.current,
        start: 'top 200%',
      }
    });

    gsap.to(fxParagraph2.current, {
      duration: 1,
      delay: 1.8, 
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxParagraph2.current,
        start: 'top 200%',
      }
    });

    gsap.to(fxParagraph3.current, {
      duration: 1,
      delay: 1.8, 
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxParagraph3.current,
        start: 'top 200%',
      }
    });
    
    // category 
    gsap.to(fxCategory.current, {
      duration: 1,
      delay: 1.8, 
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxCategory.current,
        start: 'top 200%',
      }
    });
    
    gsap.to(fxCatCon.current, {
      duration: 1,
      delay: 1.8, 
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxCatCon.current,
        start: 'top 200%',
      }
    });
    
    // role
    gsap.to(fxRole.current, {
      duration: 1,
      delay: 1.8, 
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxRole.current,
        start: 'top 200%',
      }
    });
    
    gsap.to(fxRoleCon.current, {
      duration: 1,
      delay: 1.8, 
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxRoleCon.current,
        start: 'top 200%',
      }
    });

    // tech stack
    gsap.to(fxTectStack.current, {
      duration: 1,
      delay: 1.8, 
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxTectStack.current,
        start: 'top 200%',
      }
    });
    
    gsap.to(fxTectStackCon.current, {
      duration: 1,
      delay: 1.8, 
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxTectStackCon.current,
        start: 'top 200%',
      }
    });
    
    gsap.to(fxLink.current, {
      duration: 1,
      delay: 1.8, 
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxLink.current,
        start: 'top 200%',
      }
    });
  }, []);

  return (
    <>
      <div className="fixed">
        <div className='h-screen w-screen' id="card-container">
          <div className="p-[3em] bg-black h-screen w-full" id='project-card' ref={fxOnload}>
            <div className="grid grid-cols-4 gap-x-10">
              {/* contet */}
              <section className="col-span-1 col-start-1 flex flex-col justify-between h-[90vh]">
                <div className='w-full flex justify-start' id='span-container'>
                  <Link to='/'>
                    <span className='font-montserrat text-[.9em] text-white' ref={fxBack}>back</span>
                  </Link>
                </div>
                <div>
                  <div className="flex flex-col pb-5">
                    <div id="title-container">
                      <span className='font-teko font-medium text-[3em] leading-none italic tracking-tight text-white' id='title' ref={fxTitle1}>jbnza <span className='font-teko font-normal text-white text-[.5em]'>/ 2022</span></span>
                    </div>
                    <div id='p-container'>
                      <p className='font-regular text-[.9em] text-white' ref={fxParagraph1}>A WEB-BASED PORTFOLIO THAT SHOWCASES</p>
                    </div>
                    <div id='p-container'>
                      <p className='font-regular text-[.9em] text-white' ref={fxParagraph2}>MY MOST CURRENT PROJECTS AS WELL AS AN</p>
                    </div>
                    <div id='p-container'>
                      <p className='font-regular text-[.9em] text-white' ref={fxParagraph3}>OVERVIEW OF MY PERSONAL INFORMATION.</p>
                    </div>
                  </div>
                  <div className="flex flex-col pb-5">
                    <div id="span-container">
                      <span className='font-semibold text-[.5em] text-white' ref={fxCategory}>Category</span>
                    </div>
                    <div id="span-container">
                      <span className='font-regular text-[.9em] text-white' ref={fxCatCon}>Personal / Web Development</span>
                    </div>
                  </div>
                  <div className="flex flex-col pb-5">
                    <div id="span-container">
                      <span className='font-semibold text-[.5em] text-white' ref={fxRole}>Role</span>
                    </div>
                    <div id="span-container">
                      <ul className="flex flex-wrap" id='data-list' ref={fxRoleCon}>
                        <li className='font-regular text-[.9em] text-white'>Web Developer</li>
                        <li className='font-regular text-[.9em] text-white'>UI Designer</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-col pb-14">
                    <div id="span-container">
                      <span className='font-semibold text-[.5em] text-white' ref={fxTectStack}>Technologies Used</span>
                    </div>
                    <div id="span-container">
                      <ul className="flex flex-wrap" id='data-list' ref={fxTectStackCon}>
                        <li className='font-regular text-[.9em] text-white'>React JS</li>
                        <li className='font-regular text-[.9em] text-white'>Material UI</li>
                        <li className='font-regular text-[.9em] text-white'>Vercel</li>
                        <li className='font-regular text-[.9em] text-white'>Figma</li>
                      </ul>
                    </div>
                  </div>
                  <div id='project-link'>
                    <a href='https://jbnza.vercel.app' target='https://jbnza.vercel.app' className='flex items-center' id='button-container'>
                      <span className='font-montserrat text-[.9em] text-white flex' ref={fxLink}>
                        visit website
                        <RiArrowRightDownLine id='icon' className='fill-white text-2xl ml-2'/>
                      </span>
                    </a>
                  </div>
                </div>
              </section>
              <section className="col-span-3 col-start-2" id='img-container'>
                <div className='col-span-3 bg-jbnza bg-cover h-full w-full' id='project-img' ref={fxRevealImg}/>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Jbnza