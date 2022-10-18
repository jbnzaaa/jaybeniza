// 
import React, { useRef, useEffect } from 'react'
// React Router DOM
// import { BrowserRouter } from 'react-router-dom'
// import { HashLink as Link} from 'react-router-hash-link'
// icons
// import {RiArrowRightDownLine} from 'react-icons/ri'
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function Hero() {
  const fxVisible1 = useRef();
  const fxVisible2 = useRef();
  const fxVisible3 = useRef();
  const fxParagraph1 = useRef();
  const fxParagraph2 = useRef();
  const fxParagraph3 = useRef();
  const fxParagraph4 = useRef();
  const fxParagraph5 = useRef();
  const fxWord1 = useRef();
  const fxWord2 = useRef();
  const fxWord3 = useRef();
  const fxButton = useRef();

  useEffect(() => {

    // container overflow visible
    gsap.to(fxVisible1.current, {
      overflow: 'visible',
      scrollTrigger: {
        trigger: fxVisible1.current,
        start: 'bottom 300px',
      }
    });

    gsap.to(fxVisible2.current, {
      overflow: 'visible',
      scrollTrigger: {
        trigger: fxVisible2.current,
        start: 'bottom 350px',
      }
    });

    gsap.to(fxVisible3.current, {
      overflow: 'visible',
      scrollTrigger: {
        trigger: fxVisible3.current,
        start: 'bottom 400px',
      }
    });

    // landing page paragraph
    gsap.to(fxParagraph1.current , {
      duration: 1.1,
      top: '0px',
      ease: 'power1.inOut',
    });

    gsap.to(fxParagraph1.current , {
      duration: 1,
      opacity: 0,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxParagraph1.current,
        start: 'bottom 230px',
        scrub: true,
      }
    });

    gsap.to(fxParagraph2.current , {
      duration: 1.2,
      top: '0px',
      ease: 'power1.inOut',
    });

    gsap.to(fxParagraph2.current , {
      duration: 1,
      opacity: 0,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxParagraph2.current,
        start: 'bottom 220px',
        scrub: true,
      }
    });

    gsap.to(fxParagraph3.current , {
      duration: 1.3,
      top: '0px',
      ease: 'power1.inOut',
    });

    gsap.to(fxParagraph3.current , {
      duration: 1,
      opacity: 0,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxParagraph3.current,
        start: 'bottom 210px',
        scrub: true,
      }
    });

    gsap.to(fxParagraph4.current , {
      duration: 1.4,
      top: '0px',
      ease: 'power1.inOut',
    });

    gsap.to(fxParagraph4.current , {
      duration: 1,
      opacity: 0,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxParagraph4.current,
        start: 'bottom 200px',
        scrub: true,
      }
    });

    gsap.to(fxParagraph5.current , {
      duration: 1.5,
      top: '0px',
      ease: 'power1.inOut',
    });

    gsap.to(fxParagraph5.current , {
      duration: 1,
      opacity: 0,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxParagraph5.current,
        start: 'bottom 190px',
        scrub: true,
      }
    });

    // first word
    gsap.to(fxWord1.current , {
      duration: 1.1,
      top: '0px',
      ease: 'power1.inOut',
    });

    gsap.to(fxWord1.current , {
      duration: 1,
      left: '500px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxWord1.current,
        start: 'bottom 450px',
        scrub: true,
      }
    });
    
    // second word
    gsap.to(fxWord2.current , {
      duration: 1.3,
      top: '0px',
      ease: 'power1.inOut',
    });

    gsap.to(fxWord2.current , {
      duration: 1,
      left: '500px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxWord2.current,
        start: 'bottom 400px',
        scrub: true,
      }
    });

    // third word
    gsap.to(fxWord3.current , {
      duration: 1.5,
      top: '0px',
      ease: 'power1.inOut',
    });

    gsap.to(fxWord3.current , {
      duration: 1,
      left: '500px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxWord3.current,
        start: 'bottom 350px',
        scrub: true,
      }
    });

    gsap.to(fxButton.current , {
      duration: 1.1,
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxButton.current,
        // start: 'bottom 150px',
        // scrub: true,
      }
    });

  });

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-4 gap-0 py-20">
        <section className='col-span-1'>
          <div className='text-[1em]'>
            <div id="p-container">
              <p className='indent-20' id='p' ref={fxParagraph1}>I'm an passionate web and user</p>
            </div>
            <div id="p-container">
              <p id='p' ref={fxParagraph2}>interface designer based in Philippines.</p>
            </div>
            <div id="p-container">
              <p id='p' ref={fxParagraph3}>Striving to create and deliver design</p>
            </div>
            <div id="p-container">
              <p id='p' ref={fxParagraph4}>interface that go above and beyond </p>
            </div>
            <div id="p-container">
              <p id='p' ref={fxParagraph5}>what user expects.</p>
            </div>
          </div>
        </section>
        <section className="col-span-3" id='hero-container'>
          <div id='span-container' ref={fxVisible1}>
            <span className='font-teko font-semibold text-[10em] leading-none italic tracking-normal text-right' id='span' ref={fxWord1}>
              I create <span className='font-teko font-semibold leading-none italic tracking-normal text-right pr-7' id='highlight'>web</span>
            </span>
          </div>
        </section>
        <section className="col-span-4" id='hero-container'>
          <div id="span-container" ref={fxVisible2}>
            <span className='font-teko font-semibold text-[10em] leading-none italic tracking-tight' id='span' ref={fxWord2}>
              and <span className='font-teko font-semibold leading-none italic tracking-tight' id='highlight'>user interface</span>
            </span>
          </div>
        </section>
        <section className="col-span-3" id='hero-container'>
          <div id="span-container" ref={fxVisible3}>
            <span className='font-teko font-semibold text-[10em] leading-none italic tracking-tight' id='span' ref={fxWord3}>designs</span>
          </div>
        </section>
        <section className='col-start-4 flex items-end'>
          {/* <div className="flex justify-end" id='cta-container'>
            <Link to='/#about' className="flex items-center" id='cta' ref={fxButton}>
              <span className='text-black text-[1em] font-regular flex'>
                Keep scrolling
                <RiArrowRightDownLine id='icon' className='fill-black text-2xl ml-1'/>  
              </span>
            </Link>
          </div> */}
        </section>
      </div>
    </>
  )
}

export default Hero