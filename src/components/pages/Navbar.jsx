//
import React, { useRef, useEffect, useState } from 'react'
// React Router DOM
import { useLocation } from 'react-router-dom'
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
  const fxOpen = useRef();
  const fxMenuOpenAnimation = useRef();
  const fxClose = useRef();
  const fxMenuCloseAnimation = useRef();
  const fxLinkAnimation1 = useRef();
  const fxLinkAnimation2 = useRef();
  const fxLinkAnimation3 = useRef();
  const fxLinkAnimation4 = useRef();

  const [showNav] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // nav links animation
    gsap.to('#logo', { duration: 1, y: 0, ease: 'power1.in', });
    gsap.to('#link', {
      duration: 1,
      // delay: 1.2,
      y: 0,
      stagger: 0.1,
      ease: 'power1.in',
      scrollTrigger: { trigger: '#link', }
    });

    // open menu animation
    gsap.to(fxOpen.current, { duration: 1, y: 0, ease: 'power1.in', });
    gsap.to(fxMenuOpenAnimation.current, { duration: 1, height: '100vh', ease: 'power1.in',
      scrollTrigger: { trigger: fxMenuOpenAnimation.current, }
    });

    // close menu animation
    gsap.to(fxClose.current, { duration: 1, y: 0,  ease: 'power1.in', });
    gsap.to(fxMenuCloseAnimation.current, { duration: 1, height: '0vh', ease: 'power1.in',
      scrollTrigger: { trigger: fxMenuCloseAnimation.current, }
    });

    // nav menu link animation
    gsap.to(fxLinkAnimation1.current, { duration: 1, delay: 1, y: 0, ease: 'power1.in', });
    gsap.to(fxLinkAnimation2.current, { duration: 1, delay: 1.1, y: 0, ease: 'power1.in', });
    gsap.to(fxLinkAnimation3.current, { duration: 1, delay: 1.2, y: 0, ease: 'power1.in', });
    gsap.to(fxLinkAnimation4.current, { duration: 1, delay: 1.3, y: 0, ease: 'power1.in', });
  });

  return (
    <>
      {/* navbar container */}
      { location.pathname === '/dailydiscount' ? showNav !== false : 
        location.pathname === '/jbnza' ? showNav !== false :
        location.pathname === '/regain' ? showNav !== false :
        <div className='sticky top-0 z-10
          mobile:px-[.9rem]
          tablet:px-[1rem]
          laptop:px-[2rem]
          laptop-lg:px-[3rem]
          desktop:px-[3rem] '>
          {/* grid */}
          <div className='grid grid-cols-8 gap-0
            mobile:py-3
            tablet:py-3
            laptop:py-4
            laptop-lg:py-5
            desktop:py-5'>
            {/* Logo */}
            <section className='col-span-3 col-start-1'>
              <div id='logo-container'>
                <Link to='/#'>
                  <div className='font-lexend font-medium cursor-pointer tracking-tighter 
                    mobile:text-[1rem]
                    tablet:text-[1.1rem]
                    laptop:text-[1.2rem]
                    laptop-lg:text-[1.2rem]
                    desktop:text-[1.3rem]' 
                    id='logo'>
                    jaysonbeniza
                  </div>
                </Link>
              </div>
            </section>
            {/* Link */}
            <section className="col-span-1 col-start-7
              mobile:hidden 
              tablet:hidden 
              laptop:block
              laptop-lg:block
              desktop:block">
              <div className='flex justify-end' id='link-container'>
                <div id='link'>
                  <Link to='/#'>
                    <span className='flex items-center
                      mobile:text-[1rem]
                      tablet:text-[1.1rem]
                      laptop:text-[1.2rem] 
                      laptop-lg:text-[1.2rem]
                      desktop:text-[1.3rem]'>
                      Intro
                      <RiArrowRightDownLine id='icon' className='fill-black ml-1
                        mobile:text-xl
                        tablet:text-1xl
                        laptop:text-2xl
                        laptop-lg:text-2xl
                        desktop:text-3xl'/>
                    </span> 
                  </Link>
                </div>
              </div>
              <div className='flex justify-end' id='link-container'>
                <div id='link'>
                  <Link to='/#project'>
                    <span className='flex items-center
                      mobile:text-[1rem]
                      tablet:text-[1.1rem]
                      laptop:text-[1.2rem] 
                      laptop-lg:text-[1.2rem]
                      desktop:text-[1.3rem]'>
                      Project
                      <RiArrowRightDownLine id='icon' className='fill-black ml-1
                      mobile:text-xl
                      tablet:text-1xl
                      laptop:text-2xl
                      laptop-lg:text-2xl
                      desktop:text-3xl'/>
                    </span>
                  </Link> 
                </div>
              </div>
            </section>
            {/* Link */}
            <section className='col-span-1 col-start-8
              mobile:hidden 
              tablet:hidden 
              laptop:block
              laptop-lg:block
              desktop:block'>
              <div className='flex justify-end' id='link-container'>
                <div id='link'>
                  <Link to='/#contact'>
                    <span className='flex items-center
                      mobile:text-[1rem]
                      tablet:text-[1.1rem]
                      laptop:text-[1.2rem] 
                      laptop-lg:text-[1.2rem]
                      desktop:text-[1.3rem]'>
                      Contact
                      <RiArrowRightDownLine id='icon' className='fill-black ml-1
                      mobile:text-xl
                      tablet:text-1xl
                      laptop:text-2xl
                      laptop-lg:text-2xl
                      desktop:text-3xl'/>
                    </span> 
                  </Link>
                </div>
              </div>
              <div className='flex justify-end' id='link-container'>
                <div id='link'>
                  <Link to={Resume} target={Resume}>
                    <span className='flex items-center
                      mobile:text-[1rem]
                      tablet:text-[1.1rem]
                      laptop:text-[1.2rem] 
                      laptop-lg:text-[1.2rem]
                      desktop:text-[1.3rem]'>
                      Resume
                      <RiArrowRightDownLine id='icon' className='fill-black ml-1
                      mobile:text-xl
                      tablet:text-1xl
                      laptop:text-2xl
                      laptop-lg:text-2xl
                      desktop:text-3xl'/>
                    </span> 
                  </Link>
                </div>
              </div>
            </section>
            {/* mobile, tablet menu */}
            <section className='col-start-7 col-span-2
              mobile:block
              tablet:block 
              laptop:hidden
              laptop-lg:hidden
              desktop:hidden'>
              <div className='flex justify-end' id='link-container'>
                <div id='link' ref={fxOpen}>
                  <span className='font-lexend font-medium cursor-pointer tracking-tighter 
                    mobile:text-[1rem]
                    tablet:text-[1.1rem]'
                    onClick={() => setShowMenu(true)}>
                    Menu
                  </span> 
                </div>
              </div>
              {/* menu container */}
              {showMenu ? (
                <div className='flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 h-screen'>
                  <div className='relative flex flex-col w-screen h-[0vh] bg-black fixed
                    mobile:px-[1rem] mobile:py-3
                    tablet:px-[1.1rem] tablet:py-3'
                    ref={fxMenuOpenAnimation}>
                    {/* close button */}
                    <div id="menu-link">
                      <div className='flex w-full justify-end' ref={fxClose}>
                        <span className='font-lexend font-medium cursor-pointer tracking-tighter text-offwhite
                          mobile:text-[1rem]
                          tablet:text-[1.1rem]'
                          onClick={() => setShowMenu(false)}>
                          Close
                        </span> 
                      </div>
                    </div>
                    {/* menu nav links */}
                    <div className='flex flex-col w-full h-full justify-end'>
                      <div id='page-link'>
                        <Link to='/#'>
                          <div id='link' ref={fxLinkAnimation1}>
                            <span className='flex items-center text-[2.3rem] text-offwhite' onClick={() => setShowMenu(false)}>
                              Intro
                              <RiArrowRightDownLine id='icon' className='fill-offwhite ml-1 text-[60px]'/>
                            </span> 
                          </div>
                        </Link>
                      </div>
                      <div id='page-link'>
                        <Link to='/#project'>
                          <div id='link' ref={fxLinkAnimation2}>
                            <span className='flex items-center text-[2.3rem] text-offwhite' onClick={() => setShowMenu(false)}>
                              Project
                              <RiArrowRightDownLine id='icon' className='fill-offwhite ml-1 text-[60px]'/>
                            </span> 
                          </div>
                        </Link>
                      </div>
                      <div id='page-link'>
                        <Link to='/#contact'>
                          <div id='link' ref={fxLinkAnimation3}>
                            <span className='flex items-center text-[2.3rem] text-offwhite' onClick={() => setShowMenu(false)}>
                              Contact
                              <RiArrowRightDownLine id='icon' className='fill-offwhite ml-1 text-[60px]'/>
                            </span> 
                          </div>
                        </Link>
                      </div>
                      <div id='page-link'>
                        <Link to={Resume} target={Resume}>
                          <div id='link' ref={fxLinkAnimation4} >
                            <span className='flex items-center text-[2.3rem] text-offwhite'onClick={() => setShowMenu(false)}>
                              Resume
                              <RiArrowRightDownLine id='icon' className='fill-offwhite ml-1 text-[60px]'/>
                            </span> 
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </section>
          </div>
        </div>
      }
    </>
  )
}

export default Navbar