//
import React, { useRef, useEffect } from 'react'
// React Router DOM
import { BrowserRouter } from 'react-router-dom'
import { HashLink as Link} from 'react-router-hash-link'
// icons
import {RiArrowRightDownLine} from 'react-icons/ri'
// Resume
import Resume from '../../assets/files/Jayson_Beniza.pdf'
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function Navbar() {
  const fxLogo = useRef();
  const fxLink1 = useRef();
  const fxLink2 = useRef();
  const fxLink3 = useRef();
  const fxLink4 = useRef();

  useEffect(() => {
    gsap.to(fxLogo.current, {
      duration: 1, 
      top: '0', 
      ease: 'power1.inOut',
    });

    gsap.to(fxLink1.current, {
      duration: 1.1, 
      top: '0', 
      ease: 'power1.inOut',
    });
    
    gsap.to(fxLink2.current, {
      duration: 1.2, 
      top: '0', 
      ease: 'power1.inOut',
    });

    gsap.to(fxLink3.current, {
      duration: 1.3, 
      top: '0', 
      ease: 'power1.inOut',
    });

    gsap.to(fxLink4.current, {
      duration: 1.3, 
      top: '0', 
      ease: 'power1.inOut',
    });
  });

  return (
    <BrowserRouter>
      <div className="grid grid-cols-4 gap-0 py-5 px-[3em] sticky top-0 z-10">
        {/* Logo */}
        <section className="col-span-1 col-start-1">
          <div id='logo-container'>
            <Link to='#' className='font-teko text-3xl italic text-[2em] cursor-pointer' id='logo' ref={fxLogo}>
              jaysonbeniza
            </Link>
          </div>
        </section>
        {/* Link */}
        <section className="col-span-1 col-start-3">
          <div className='flex justify-end' id='link-container'>
            <Link to='/#' id='link' ref={fxLink1}>
              <span className='flex items-center'>
                Intro
                <RiArrowRightDownLine id='icon' className='fill-black text-2xl ml-2'/>
              </span> 
            </Link>
          </div>
          <div className='flex justify-end' id='link-container'>
            <Link to='/#project' id='link' ref={fxLink2}>
              <span className='flex items-center'>
                Project
                <RiArrowRightDownLine id='icon' className='fill-black text-2xl ml-2'/>
              </span> 
            </Link>
          </div>
        </section>
        <section className='col-span-1 col-start-4'>
          <div className='flex justify-end' id='link-container'>
            <Link to='/#contact' id='link' ref={fxLink3}>
              <span className='flex items-center'>
                Contact
                <RiArrowRightDownLine id='icon' className='fill-black text-2xl ml-2'/>
              </span> 
            </Link>
          </div>
          <div className='flex justify-end' id='link-container'>
            <Link to={Resume} target={Resume} id='link' ref={fxLink4}>
              <span className='flex items-center'>
                Resume
                <RiArrowRightDownLine id='icon' className='fill-black text-2xl ml-2'/>
              </span> 
            </Link>
          </div>
        </section>
      </div>
    </BrowserRouter>
  )
}

export default Navbar