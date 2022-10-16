//
import React, { useRef, useState, useEffect } from 'react'
// icons
import {RiArrowRightDownLine} from 'react-icons/ri'
// GSAP
import gsap from 'gsap' 
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function Contact() {
  const fxEmailContainer = useRef();
  const fxDrop = useRef();
  const fxMessage = useRef();
  const fxContext1 = useRef();
  const fxContext2 = useRef();
  const fxContext3 = useRef();
  const fxContext4 = useRef();
  const fxAccounts1 = useRef();
  const fxAccounts2 = useRef();
  const fxAccounts3 = useRef();
  const fxAccounts4 = useRef();
  const fxAccounts5 = useRef();
  const fxAccounts6 = useRef();

  useEffect(() => {
    gsap.to(fxEmailContainer.current, {
      scrollTrigger: {
        trigger: fxEmailContainer.current,
        // pin: true,
        // start: "bottom 600px",
        // end: "bottom 500px",
      }
    });
    
    gsap.to(fxDrop.current, {
      duration: 1,
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxDrop.current,
        start: 'bottom 125%',
        toggleActions: "play none none reverse",
      }
    });
    
    gsap.to(fxMessage.current, {
      duration: 1,
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxMessage.current,
        start: 'bottom 125%',
        toggleActions: "play none none reverse",
      }
    });
    
    //
    gsap.to(fxContext1.current, {
      duration: 1.1,
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxContext1.current,
        start: 'bottom 100%',
        toggleActions: "play none none reverse",
      }
    });
    
    gsap.to(fxContext2.current, {
      duration: 1.2,
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxContext2.current,
        start: 'bottom 100%',
        toggleActions: "play none none reverse",
      }
    });
    
    gsap.to(fxContext3.current, {
      duration: 1.3,
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxContext3.current,
        start: 'bottom 100%',
        toggleActions: "play none none reverse",
      }
    });
    
    gsap.to(fxContext4.current, {
      duration: 1.4,
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxContext4.current,
        start: 'bottom 100%',
        toggleActions: "play none none reverse",
      }
    });
    
    //
    gsap.to(fxAccounts1.current, {
      duration: 1.4,
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxAccounts1.current,
        start: 'bottom 100%',
        toggleActions: "play none none reverse",
      }
    });

    gsap.to(fxAccounts2.current, {
      duration: 1.4,
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxAccounts2.current,
        start: 'bottom 100%',
        toggleActions: "play none none reverse",
      }
    });

    gsap.to(fxAccounts3.current, {
      duration: 1.4,
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxAccounts3.current,
        start: 'bottom 100%',
        toggleActions: "play none none reverse",
      }
    });

    gsap.to(fxAccounts4.current, {
      duration: 1.4,
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxAccounts4.current,
        start: 'bottom 100%',
        toggleActions: "play none none reverse",
      }
    });

    gsap.to(fxAccounts5.current, {
      duration: 1.4,
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxAccounts5.current,
        start: 'bottom 100%',
        toggleActions: "play none none reverse",
      }
    });

    gsap.to(fxAccounts6.current, {
      duration: 1.4,
      top: '0px',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: fxAccounts6.current,
        start: 'bottom 100%',
        toggleActions: "play none none reverse",
      }
    });
  },[]);

  return (
    <>
      <div className="px-[3em]" id='contact'>
        {/*  */}
        <div className="grid grid-cols-4 gap-0 pt-20" ref={fxEmailContainer}>
          {/*  */}
          <div className="col-span-3 h-[90vh] flex flex-col justify-end py-10">
            <div id='email-container'>
              <span className='font-teko font-medium text-[15em] leading-none italic tracking-tight' id='drop' ref={fxDrop}>Drop a</span>
            </div>
            <div id='email-container'>
              <span className='font-teko font-medium text-[15em] leading-none italic tracking-tight' id='message' ref={fxMessage}>Message</span>
            </div>
          </div>
          <div className="col-span-1 col-start-4 h-[85vh] flex flex-col justify-end py-10">
            <div className='font-montserrat font-regular text-[1em]'>
              <div id="contact-container">
                <p className='indent-20' id='context' ref={fxContext1}>DO YOU HAVE ANY IDEAS IN MIND?</p>
              </div>
              <div id="contact-container">
                <p id='context' ref={fxContext2}>FEEL FREE TO GET IN TOUCH IN ME. I’M ALWAYS</p>
              </div>
              <div id="contact-container">
                <p id='context' ref={fxContext3}>WILLING TO HELP YOU TURN YOUR CREATIVE</p>
              </div>
              <div id="contact-container">
                <p id='context' ref={fxContext4}>IDEAS INTO REALITY.</p>
              </div>
            </div>
            <div className="flex flex-col flew-wrap font-montserrat text-[1em] pt-10">
              <div id='account-container'>
                <a className='my-2' href='' target='' id='accounts' ref={fxAccounts1}>Email</a>
              </div>
              <div id='account-container'>
                <a className='my-2' href='https://www.facebook.com/jbnzaaa' target='https://www.facebook.com/jbnzaaa' id='accounts' ref={fxAccounts2}>Facebook</a>
              </div>
              <div id='account-container'>
                <a className='my-2' href='https://www.instagram.com/jbnza_/?hl=en' target='https://www.instagram.com/jbnza_/?hl=en' id='accounts' ref={fxAccounts3}>Instagram</a>
              </div>
              <div id='account-container'>
                <a className='my-2' href='https://github.com/jbnzaaa' target='https://github.com/jbnzaaa' id='accounts' ref={fxAccounts4}>Github</a>
              </div>
              <div id='account-container'>
                <a className='my-2' href='https://www.behance.net/jbnza' target='https://www.behance.net/jbnza' id='accounts' ref={fxAccounts5}>Behance</a>
              </div>
              <div id='account-container'>
                <a className='my-2' href='https://www.linkedin.com/in/jaybeniza/' target='https://www.linkedin.com/in/jaybeniza/' id='accounts' ref={fxAccounts6}>LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact