//
import React, { useRef, useState, useEffect } from 'react'
// React Router DOM
import { useLocation } from 'react-router-dom'
// GSAP
import gsap from 'gsap' 
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function Footer() {
  const fxCopyright = useRef();
  const fxLastUpdate = useRef();
  const fxDate = useRef();
  const fxDevDes = useRef();
  const fxMe = useRef();
  const test = useRef();

  const [showFooter] = useState(true);
  const location = useLocation();

  useEffect(() => {
    gsap.to(fxCopyright.current ,{
      duration: 1,
      top: '0px',
      ease: 'expo.out',
      scrollTrigger: {
        trigger: fxCopyright.current,
        start: 'bottom 115%',
        toggleActions: "play none none reverse",
      }
    });

    gsap.to(fxLastUpdate.current ,{
      duration: 1.2,
      top: '0px',
      ease: 'expo.out',
      scrollTrigger: {
        trigger: fxLastUpdate.current,
        start: 'bottom 115%',
        toggleActions: "play none none reverse",
      }
    });

    gsap.to(fxDate.current ,{
      duration: 1.3,
      top: '0px',
      ease: 'expo.out',
      scrollTrigger: {
        trigger: fxDate.current,
        start: 'bottom 115%',
        toggleActions: "play none none reverse",
      }
    });

    gsap.to(fxDevDes.current ,{
      duration: 1.4,
      top: '0px',
      ease: 'expo.out',
      scrollTrigger: {
        trigger: fxDevDes.current,
        start: 'bottom 115%',
        toggleActions: "play none none reverse",
      }
    });

    gsap.to(fxMe.current ,{
      duration: 1.5,
      top: '0px',
      ease: 'expo.out',
      scrollTrigger: {
        trigger: fxMe.current,
        start: 'bottom 115%',
        toggleActions: "play none none reverse",
      }
    });
  }, []);

  return (
    <>
      { location.pathname === '/dailydiscount' ? showFooter !== false : 
        location.pathname === '/jbnza' ? showFooter !== false :
        location.pathname === '/regain' ? showFooter !== false :
        <div className="px-[3em]">
          <div className="grid grid-cols-4 gap-0 py-10 font-montserrat font-regular text-[1em]" ref={test}>
            <section className="col-start-1 flex flex-col" id='footer-container'>
              <span id='context' ref={fxCopyright}>© 2022 JAYSON BENIZA </span>
            </section>
            <section className="col-start-3 flex flex-col">
              <div id="footer-container">
                <span className='text-end' id='context' ref={fxLastUpdate}>LAST UPDATE</span>
              </div>
              <div id="footer-container">
                <span className='text-end' id='context' ref={fxDate}>OCTOBER 2022</span>
              </div>
            </section>
            <section className="col-start-4 flex flex-col">
              <div id="footer-container">
                <span className='text-end' id='context' ref={fxDevDes}>DEVELOP & DESIGN BY</span>
              </div>
              <div id="footer-container">
                <span className='text-end' id='context' ref={fxMe}>JAYSON BENIZA</span>
              </div>
            </section>
          </div>
        </div>
      }
    </>
  )
}

export default Footer