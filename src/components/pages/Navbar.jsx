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
  const fxMenuOpenAnimation = useRef();

  const [showNav] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // nav links animation
    gsap.to('#animate-nav', {
      duration: 1,
      y: 0,
      stagger: .05,
      ease: 'power1.in',
      scrollTrigger: { trigger: '#animate-nav', }
    });
  }, []);

  useEffect(() => {
    // the mobile menu overlay (and everything inside it, including the
    // #mobile-nav-animate links) only exists in the DOM while showMenu is
    // true, so skip entirely when it's closed - otherwise these target
    // nothing on every mount and log "GSAP target not found" warnings.
    // Closing itself needs no animation here: React just unmounts the
    // overlay when showMenu flips back to false.
    if (!showMenu) return;

    // mobile nav link animation
    gsap.to('#mobile-nav-animate', {
      duration: 1,
      delay: 1,
      y: 0,
      stagger: .05,
      ease: 'power1.in',
    });

    // open menu animation
    gsap.to(fxMenuOpenAnimation.current, {
      duration: 1,
      height: '106vh',
      ease: 'power1.in',
      padding: '12px 14.4px 12px 14.4px',
      scrollTrigger: { trigger: fxMenuOpenAnimation.current, }
    });
  }, [showMenu]);

  return (
    <>
      {/* navbar container */}
      { location.pathname === '/jaysonbeniza' ? showNav !== false :
        location.pathname === '/dailydiscount' ? showNav !== false :
        location.pathname === '/jbnza' ? showNav !== false :
        location.pathname === '/regain' ? showNav !== false :
        <div className='sticky top-0 z-20
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
            laptop-lg:py-4
            desktop:py-4'>
            {/* Logo */}
            <section className='col-span-3 col-start-1'>
              <div className='logo-container'>
                <Link to='/#'>
                  <h1 className='logo font-lexend font-medium cursor-pointer tracking-tighter
                    mobile:text-[.9rem]
                    tablet:text-[.9rem]
                    laptop:text-[1.1rem]
                    laptop-lg:text-[1.1rem]
                    desktop:text-[1.3rem]'
                    id='animate-nav'>
                    jaysonbeniza
                  </h1>
                </Link>
              </div>
            </section>
            {/* Link */}
            <section className="col-span-1 col-start-6
              mobile:hidden
              tablet:hidden
              laptop:block
              laptop-lg:block
              desktop:block">
              <div className='link-container flex justify-end
                mobile:h-[20px]
                tablet:h-[23px]
                laptop:h-[32px]
                laptop-lg:h-[32px]
                desktop:h-[32px]'>
                <div className='link' id='animate-nav'>
                  <Link to='/#'>
                    <span className='flex items-center
                      mobile:text-[.9rem]
                      tablet:text-[.9rem]
                      laptop:text-[1rem]
                      laptop-lg:text-[1rem]
                      desktop:text-[1.1rem]'>
                      Intro
                      <RiArrowRightDownLine id='icon' className='fill-black ml-1
                        mobile:text-xl
                        tablet:text-1xl
                        laptop:text-2xl
                        laptop-lg:text-2xl
                        desktop:text-2xl'/>
                    </span>
                  </Link>
                </div>
              </div>
              <div className='link-container flex justify-end
                mobile:h-[20px]
                tablet:h-[23px]
                laptop:h-[32px]
                laptop-lg:h-[32px]
                desktop:h-[32px]' >
                <div className='link' id='animate-nav'>
                  <Link to='/#work-experience'>
                    <span className='flex items-center
                      mobile:text-[.9rem]
                      tablet:text-[.9rem]
                      laptop:text-[1rem]
                      laptop-lg:text-[1rem]
                      desktop:text-[1.1rem]'>
                      Work
                      <RiArrowRightDownLine id='icon' className='fill-black ml-1
                      mobile:text-xl
                      tablet:text-1xl
                      laptop:text-2xl
                      laptop-lg:text-2xl
                      desktop:text-2xl'/>
                    </span>
                  </Link>
                </div>
              </div>
            </section>
            {/* Link */}
            <section className="col-span-1 col-start-7
              mobile:hidden
              tablet:hidden
              laptop:block
              laptop-lg:block
              desktop:block">
              <div className='link-container flex justify-end
                mobile:h-[20px]
                tablet:h-[23px]
                laptop:h-[32px]
                laptop-lg:h-[32px]
                desktop:h-[32px]'>
                <div className='link' id='animate-nav'>
                  <Link to='/#certificates-awards'>
                    <span className='flex items-center
                      mobile:text-[.9rem]
                      tablet:text-[.9rem]
                      laptop:text-[1rem]
                      laptop-lg:text-[1rem]
                      desktop:text-[1.1rem]'>
                      Certificates
                      <RiArrowRightDownLine id='icon' className='fill-black ml-1
                        mobile:text-xl
                        tablet:text-1xl
                        laptop:text-2xl
                        laptop-lg:text-2xl
                        desktop:text-2xl'/>
                    </span>
                  </Link>
                </div>
              </div>
              <div className='link-container flex justify-end
                mobile:h-[20px]
                tablet:h-[23px]
                laptop:h-[32px]
                laptop-lg:h-[32px]
                desktop:h-[32px]' >
                <div className='link' id='animate-nav'>
                  <Link to='/#project'>
                    <span className='flex items-center
                      mobile:text-[.9rem]
                      tablet:text-[.9rem]
                      laptop:text-[1rem]
                      laptop-lg:text-[1rem]
                      desktop:text-[1.1rem]'>
                      Project
                      <RiArrowRightDownLine id='icon' className='fill-black ml-1
                      mobile:text-xl
                      tablet:text-1xl
                      laptop:text-2xl
                      laptop-lg:text-2xl
                      desktop:text-2xl'/>
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
              <div className='link-container flex justify-end
                mobile:h-[20px]
                tablet:h-[23px]
                laptop:h-[32px]
                laptop-lg:h-[32px]
                desktop:h-[32px]'>
                <div className='link' id='animate-nav'>
                  <Link to='/#contact'>
                    <span className='flex items-center
                      mobile:text-[.9rem]
                      tablet:text-[.9rem]
                      laptop:text-[1rem]
                      laptop-lg:text-[1rem]
                      desktop:text-[1.1rem]'>
                      Contact
                      <RiArrowRightDownLine id='icon' className='fill-black ml-1
                      mobile:text-xl
                      tablet:text-1xl
                      laptop:text-2xl
                      laptop-lg:text-2xl
                      desktop:text-2xl'/>
                    </span>
                  </Link>
                </div>
              </div>
              <div className='link-container flex justify-end
                mobile:h-[20px]
                tablet:h-[23px]
                laptop:h-[32px]
                laptop-lg:h-[32px]
                desktop:h-[32px]'>
                <div className='link' id='animate-nav'>
                  <Link to={Resume} target='_blank' rel='noreferrer'>
                    <span className='flex items-center
                      mobile:text-[.9rem]
                      tablet:text-[.9rem]
                      laptop:text-[1rem]
                      laptop-lg:text-[1rem]
                      desktop:text-[1.1rem]'>
                      Resume
                      <RiArrowRightDownLine id='icon' className='fill-black ml-1
                      mobile:text-xl
                      tablet:text-1xl
                      laptop:text-2xl
                      laptop-lg:text-2xl
                      desktop:text-2xl'/>
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
              <div className='link-container flex justify-end
                mobile:h-[20px]
                tablet:h-[23px]
                laptop:h-[32px]
                laptop-lg:h-[32px]
                desktop:h-[32px]'
                id='animate-nav'>
                <div className='link' id='animate-nav'>
                  <span className='font-lexend font-medium cursor-pointer tracking-tighter text-[.9rem]'
                    onClick={() => setShowMenu(true)}>
                    Menu
                  </span>
                </div>
              </div>
              {/* menu container */}
              {showMenu ? (
                <div className='flex overflow-x-hidden overflow-y-auto fixed inset-0 h-screen'>
                  <div className='relative flex flex-col w-screen h-[0vh] bg-black fixed'
                    ref={fxMenuOpenAnimation}>
                    <div className='h-[100vh]'>
                      {/* close button */}
                      <div className="menu-link">
                        <div className='flex w-full justify-end' id='mobile-nav-animate'>
                          <span className='font-lexend font-medium cursor-pointer tracking-tighter text-offwhite text-[.9rem]'
                            onClick={() => setShowMenu(false)} >
                            Close
                          </span>
                        </div>
                      </div>
                      {/* menu nav links */}
                      <div className='flex flex-col w-full h-full justify-end'>
                        <div className='page-link'>
                          <Link to='/#'>
                            <div className='link' id='mobile-nav-animate'>
                              <span className='flex items-center text-[2.3rem] text-offwhite' onClick={() => setShowMenu(false)}>
                                Intro
                                <RiArrowRightDownLine id='icon' className='fill-offwhite ml-1 text-[60px]'/>
                              </span>
                            </div>
                          </Link>
                        </div>
                        <div className='page-link'>
                          <Link to='/#work-experience'>
                            <div className='link' id='mobile-nav-animate'>
                              <span className='flex items-center text-[2.3rem] text-offwhite' onClick={() => setShowMenu(false)}>
                                Work
                                <RiArrowRightDownLine id='icon' className='fill-offwhite ml-1 text-[60px]'/>
                              </span>
                            </div>
                          </Link>
                        </div>
                        <div className='page-link'>
                          <Link to='/#certificates-awards'>
                            <div className='link' id='mobile-nav-animate'>
                              <span className='flex items-center text-[2.3rem] text-offwhite' onClick={() => setShowMenu(false)}>
                                Certificates
                                <RiArrowRightDownLine id='icon' className='fill-offwhite ml-1 text-[60px]'/>
                              </span>
                            </div>
                          </Link>
                        </div>
                        <div className='page-link'>
                          <Link to='/#project'>
                            <div className='link' id='mobile-nav-animate'>
                              <span className='flex items-center text-[2.3rem] text-offwhite' onClick={() => setShowMenu(false)}>
                                Project
                                <RiArrowRightDownLine id='icon' className='fill-offwhite ml-1 text-[60px]'/>
                              </span>
                            </div>
                          </Link>
                        </div>
                        <div className='page-link'>
                          <Link to='/#contact'>
                            <div className='link' id='mobile-nav-animate'>
                              <span className='flex items-center text-[2.3rem] text-offwhite' onClick={() => setShowMenu(false)}>
                                Contact
                                <RiArrowRightDownLine id='icon' className='fill-offwhite ml-1 text-[60px]'/>
                              </span>
                            </div>
                          </Link>
                        </div>
                        <div className='page-link'>
                          <Link to={Resume} target='_blank' rel='noreferrer'>
                            <div className='link' id='mobile-nav-animate'>
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
