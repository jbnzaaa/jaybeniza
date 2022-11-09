//
import React, { useState, useEffect } from 'react'
// React Router DOM
import { useLocation } from 'react-router-dom'
// GSAP
import gsap from 'gsap' 
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function Footer() {
  const [showFooter] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // footer animation
    gsap.to('#footer', {
      duration: 1,
      y: 0,
      stagger: .05,
      ease: 'power1.in',
      scrollTrigger: { 
        trigger: '#footer', 
        start: 'bottom 100%',
      }
    });
  }, []);

  return (
    <>
      { location.pathname === '/dailydiscount' ? showFooter !== false : 
        location.pathname === '/jbnza' ? showFooter !== false :
        location.pathname === '/regain' ? showFooter !== false :
        <div className='grid gap-0 py-10 bg-black font-montserrat font-regular
          mobile:p-[.9rem] mobile:h-[15vh] mobile:grid-cols-8 mobile:text-[1rem]
          tablet:p-[1rem] tablet:h-[15vh] tablet:grid-cols-8 tablet:text-[1.1rem]
          laptop:p-[2rem] laptop:h-[15vh] laptop:grid-cols-8 laptop:text-[1.2rem]
          laptop-lg:p-[3rem] laptop-lg:h-[15vh] laptop-lg:grid-cols-8 laptop-lg:text-[1.2rem]
          desktop:p-[3rem] desktop:h-full desktop:grid-cols-8 desktop:text-[1.3rem]'>
          <section className='col-start-1 flex flex-row h-[35px]
            mobile:col-span-8 
            tablet:col-span-3
            laptop:col-span-3
            laptop-lg:col-span-2
            desktop:col-span-2'>
            <div id='footer-container'>
              <p className='text-white' id='footer'>&copy;</p>
            </div>
            <div id='footer-container'>
              <p className='text-white' id='footer'>2022</p>
            </div>
            <div id='footer-container'>
              <p className='text-white' id='footer'>Jayson</p>
            </div>
            <div id='footer-container'>
              <p className='text-white' id='footer'>Beniza</p>
            </div>
          </section>
          <section className='flex flex-row justify-end h-[35px]
            mobile:col-span-8 mobile:col-start-1 mobile:justify-start
            tablet:col-span-8 tablet:col-start-1 tablet:justify-start
            laptop:col-span-2 laptop:col-start-5 laptop:justify-end
            laptop-lg:col-span-2 laptop-lg:col-start-5 laptop-lg:justify-end
            desktop:col-span-2 desktop:col-start-5 desktop:justify-end'>
            <div id='footer-container'>
              <p className='text-white' id='footer'>Last</p>
            </div>
            <div id='footer-container'>
              <p className='text-white' id='footer'>Update</p>
            </div>
            <div id='footer-container'>
              <p className='text-white' id='footer'>November</p>
            </div>
            <div id='footer-container'>
              <p className='text-white' id='footer'>2022</p>
            </div>
          </section>
          <section className='flex flex-row justify-end h-[35px] leading-none
            mobile:col-span-8 mobile:col-start-1 mobile:justify-start
            tablet:col-span-8 tablet:col-start-1 tablet:justify-start
            laptop:col-span-2 laptop:col-start-7 laptop:justify-end
            laptop-lg:col-span-2 laptop:col-start-7 laptop-lg:justify-end
            desktop:col-span-2 desktop:col-start-7 desktop:justify-end'>
            <div id='footer-container'>
              <p className='text-white' id='footer'>Design</p>
            </div>
            <div id='footer-container'>
              <p className='text-white' id='footer'>&</p>
            </div>
            <div id='footer-container'>
              <p className='text-white' id='footer'>Develop</p>
            </div>
            <div id='footer-container'>
              <p className='text-white' id='footer'>by</p>
            </div>
            <div id='footer-container'>
              <p className='text-white' id='footer'>Me</p>
            </div>
          </section>
        </div>
      }
    </>
  )
}

export default Footer