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
    gsap.to('#animate-footer', {
      duration: 1,
      y: 0,
      stagger: .05,
      ease: 'power1.in',
      scrollTrigger: { 
        trigger: '#animate-footer', 
        start: 'bottom 120%',
      }
    });
  }, []);

  return (
    <>
      <div className='grid gap-0 py-10 bg-black font-montserrat font-regular
        mobile:p-[.9rem] mobile:h-[15vh] mobile:grid-cols-8 mobile:text-[.9rem]
        tablet:p-[1rem] tablet:h-[15vh] tablet:grid-cols-8 tablet:text-[.9rem]
        laptop:p-[2rem] laptop:h-[15vh] laptop:grid-cols-8 laptop:text-[1rem]
        laptop-lg:p-[3rem] laptop-lg:h-[15vh] laptop-lg:grid-cols-8 laptop-lg:text-[1rem]
        desktop:p-[3rem] desktop:h-full desktop:grid-cols-8 desktop:text-[1.1rem]'>
        <section className='col-start-1 flex flex-row
          mobile:col-span-8 mobile:h-[20px]
          tablet:col-span-3 tablet:h-[20px]
          laptop:col-span-3 laptop:h-[23px]
          laptop-lg:col-span-2 laptop-lg:h-[23px]
          desktop:col-span-2 desktop:h-[23px]'>
          <div className='footer-container'>
            <p className='footer text-white' id='animate-footer'>&copy;</p>
          </div>
          <div className='footer-container'>
            <p className='footer text-white' id='animate-footer'>2022</p>
          </div>
          <div className='footer-container'>
            <p className='footer text-white' id='animate-footer'>Jayson</p>
          </div>
          <div className='footer-container'>
            <p className='footer text-white' id='animate-footer'>Beniza</p>
          </div>
        </section>
        <section className='flex flex-row
          mobile:col-span-8 mobile:col-start-1 mobile:justify-start mobile:h-[20px]
          tablet:col-span-8 tablet:col-start-1 tablet:justify-start tablet:h-[20px]
          laptop:col-span-2 laptop:col-start-5 laptop:justify-end laptop:h-[23px]
          laptop-lg:col-span-2 laptop-lg:col-start-5 laptop-lg:justify-end laptop-lg:h-[23px]
          desktop:col-span-2 desktop:col-start-5 desktop:justify-end desktop:h-[23px]'>
          <div className='footer-container'>
            <p className='footer text-white' id='animate-footer'>Last</p>
          </div>
          <div className='footer-container'>
            <p className='footer text-white' id='animate-footer'>Update</p>
          </div>
          <div className='footer-container'>
            <p className='footer text-white' id='animate-footer'>November</p>
          </div>
          <div className='footer-container'>
            <p className='footer text-white' id='animate-footer'>2022</p>
          </div>
        </section>
        <section className='flex flex-row
          mobile:col-span-8 mobile:col-start-1 mobile:justify-start mobile:h-[20px]
          tablet:col-span-8 tablet:col-start-1 tablet:justify-start tablet:h-[20px]
          laptop:col-span-2 laptop:col-start-7 laptop:justify-end laptop:h-[23px]
          laptop-lg:col-span-2 laptop:col-start-7 laptop-lg:justify-end l laptop-lg:h-[23px]
          desktop:col-span-2 desktop:col-start-7 desktop:justify-end desktop:h-[23px]'>
          <div className='footer-container'>
            <p className='footer text-white' id='animate-footer'>Design</p>
          </div>
          <div className='footer-container'>
            <p className='footer text-white' id='animate-footer'>&</p>
          </div>
          <div className='footer-container'>
            <p className='footer text-white' id='animate-footer'>Develop</p>
          </div>
          <div className='footer-container'>
            <p className='footer text-white' id='animate-footer'>by</p>
          </div>
          <div className='footer-container'>
            <p className='footer text-white' id='animate-footer'>Me</p>
          </div>
        </section>
      </div>
      {/* { location.pathname === '/jaysonbeniza' ? showFooter !== false :
        location.pathname === '/dailydiscount' ? showFooter !== false : 
        location.pathname === '/jbnza' ? showFooter !== false :
        location.pathname === '/regain' ? showFooter !== false :
      } */}
    </>
  )
}

export default Footer