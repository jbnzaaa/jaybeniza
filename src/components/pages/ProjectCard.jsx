//
import React, { useRef, useEffect } from 'react'
// 
import { Link } from 'react-router-dom'
// icons
import {RiArrowRightDownLine} from 'react-icons/ri'
// images
import regain from '../../assets/files/images/portfolio_mockup_1.png'
import jbnza from '../../assets/files/images/portfolio_mockup_2.png'
import dailydiscount from '../../assets/files/images/portfolio_mockup_3.png'
// GSAP
import gsap from 'gsap' 
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function ProjectCard() {
  // const fxCardAnim1 = useRef();
  // const fxCardAnim2 = useRef();
  // const fxCardAnim3 = useRef();
  // const fxCardAnim4 = useRef();
  // const fxLink1 = useRef();
  // const fxCard = useRef();
  // const fxProjTitle = useRef();

  useEffect(() => {
    // gsap.to(fxCard.current , {
    //   duration: 1,
    //   y: 0,
    //   ease: 'power1.inOut',
    //   scrollTrigger: {
    //     trigger: fxCard.current,
    //     // start: 'bottom 150%',
    //   }
    // });

    // gsap.to(fxProjTitle.current , {
    //   duration: 1,
    //   delay: .8,
    //   top: '0px',
    //   ease: 'power1.inOut',
    //   scrollTrigger: {
    //     trigger: fxProjTitle.current,
    //     // start: 'bottom 140%',
    //     // toggleActions: "play none none reverse",
    //   }
    // });

    // gsap.to(fxLink1.current, {
    //   duration: 1, 
    //   top: '0', 
    //   ease: 'power1.inOut',
    // });
    
    // // card animation
    // gsap.to(fxCardAnim1.current , {
    //   duration: 1,
    //   delay: 1,
    //   // marginTop: '0px',
    //   ease: 'power1.inOut',
    //   scrollTrigger: {
    //     trigger: fxCardAnim1.current,
    //     // start: 'bottom 150%',
    //     toggleActions: "play none none reverse",
    //   }
    // });
    
    // gsap.to(fxCardAnim2.current , {
    //   duration: 1,
    //   delay: 1.1,
    //   // marginTop: '0px',
    //   ease: 'power1.inOut',
    //   scrollTrigger: {
    //     trigger: fxCardAnim2.current,
    //     // start: 'bottom 150%',
    //     toggleActions: "play none none reverse",
    //   }
    // });

    // gsap.to(fxCardAnim3.current , {
    //   duration: 1,
    //   delay: 1.2,
    //   // marginTop: '0px',
    //   ease: 'power1.inOut',
    //   scrollTrigger: {
    //     trigger: fxCardAnim3.current,
    //     // start: 'bottom 150%',
    //     toggleActions: "play none none reverse",
    //   }
    // });
    
    // gsap.to(fxCardAnim4.current , {
    //   duration: 1,
    //   delay: 1.3,
    //   marginTop: '0px',
    //   ease: 'power1.inOut',
    //   scrollTrigger: {
    //     trigger: fxCardAnim4.current,
    //     // start: 'bottom 150%',
    //     toggleActions: "play none none reverse",
    //   }
    // });
  },[]);

  return (
    <>
      <section className='px-0 py-10 h-full
        mobile:px-[.9rem]
        tablet:px-[1rem]
        laptop:px-[2rem]
        laptop-lg:px-[3rem]
        desktop:px-[3rem]'>
        <div className='grid grid-cols-8 gap-x-5
          mobile:gap-y-5
          tablet:gap-y-10
          laptop:gap-y-14
          laptop-lg:gap-y-20
          desktop:pgap-y-20'>
          {/* daily discount */}
          <div className='
            mobile:col-span-8 mobile:col-start-1
            tablet:col-span-8 tablet:col-start-1
            laptop:col-span-5 laptop:col-start-2
            laptop-lg:col-span-5 laptop-lg:col-start-2
            desktop:col-span-5 desktop:col-start-2'>
            <div className='bg-black' id='project-card-container'>
              {/* <Link to='/dailydiscount' >
                <div className='bg-dailydiscount bg-cover object-cover opacity-40
                  mobile:h-[300px]
                  tablet:h-[400px]
                  laptop:h-[500px]
                  laptop-lg:h-[600px]
                  desktop:h-[600px]' 
                  id='project-image'/>
              </Link> */}
              <a href='https://daily-discount.vercel.app/' target='https://daily-discount.vercel.app/'>
                <div className='bg-dailydiscount bg-cover object-cover opacity-40
                  mobile:h-[300px]
                  tablet:h-[400px]
                  laptop:h-[500px]
                  laptop-lg:h-[600px]
                  desktop:h-[600px]' 
                  id='project-image'/>
              </a>
            </div>
            <div className='flex justify-between mt-1'>
              <span className='font-lexend font-medium leading-none tracking-tighter text-black
                mobile:text-[1.3rem]
                tablet:text-[1.3rem]
                laptop:text-[1.3rem]
                laptop-lg:text-[1.5rem]
                desktop:text-[1.5rem]'>
                DailyDiscount
              </span>
              <span className='
                mobile:text-[.5rem]
                tablet:text-[.5rem]
                laptop:text-[.8rem]
                laptop-lg:text-[.8rem]
                desktop:text-[.8rem]'>
                2022
              </span>
            </div>
          </div>
          {/* jbnza */}
          <div className='
            mobile:col-span-8 mobile:col-start-1
            tablet:col-span-8 tablet:col-start-1
            laptop:col-span-4 laptop:col-start-5
            laptop-lg:col-span-4 laptop-lg:col-start-5
            desktop:col-span-4 desktop:col-start-5'>
            <div className='bg-black' id='project-card-container'>
              {/* <Link to='/jbnza'>
                <div className='bg-jbnza bg-cover object-cover opacity-40
                mobile:h-[300px]
                tablet:h-[400px]
                laptop:h-[400px]
                laptop-lg:h-[400px]
                desktop:h-[400px]' 
                id='project-image'/>
              </Link> */}
              <a href='https://jbnza.vercel.app' target='https://jbnza.vercel.app'>
                <div className='bg-jbnza bg-cover object-cover opacity-40
                  mobile:h-[300px]
                  tablet:h-[400px]
                  laptop:h-[400px]
                  laptop-lg:h-[400px]
                  desktop:h-[400px]' 
                  id='project-image'/>
              </a>
            </div>
            <div className='flex justify-between mt-1'>
              <span className='font-lexend font-medium leading-none tracking-tighter text-black
                mobile:text-[1.3rem]
                tablet:text-[1.3rem]
                laptop:text-[1.3rem]
                laptop-lg:text-[1.5rem]
                desktop:text-[1.5rem]'>
                jbnza
              </span>
              <span className='
                mobile:text-[.5rem]
                tablet:text-[.5rem]
                laptop:text-[.8rem]
                laptop-lg:text-[.8rem]
                desktop:text-[.8rem]'>
                2022
              </span>
            </div>
          </div>
          {/* regain */}
          <div className='
            mobile:col-span-8 mobile:col-start-1
            tablet:col-span-8 tablet:col-start-1
            laptop:col-span-5 laptop:col-start-1
            laptop-lg:col-span-5 laptop-lg:col-start-1
            desktop:col-span-5 desktop:col-start-1'>
            <div className='bg-black' id='project-card-container'>
              {/* <Link to='/regain'>
                <div className='bg-regain bg-cover object-cover opacity-40
                mobile:h-[300px]
                tablet:h-[400px]
                laptop:h-[400px]
                laptop-lg:h-[400px]
                desktop:h-[400px]' 
                id='project-image'/>
              </Link> */}
              <a href='https://regain-caps.web.app/' target='https://regain-caps.web.app/' >
                <div className='bg-regain bg-cover object-cover opacity-40
                  mobile:h-[300px]
                  tablet:h-[400px]
                  laptop:h-[400px]
                  laptop-lg:h-[400px]
                  desktop:h-[400px]' 
                  id='project-image'/>
              </a>
            </div>
            <div className='flex justify-between mt-1'>
              <span className='font-lexend font-medium leading-none tracking-tighter text-black
                mobile:text-[1.3rem]
                tablet:text-[1.3rem]
                laptop:text-[1.3rem]
                laptop-lg:text-[1.5rem]
                desktop:text-[1.5rem]'>
                ReGain
              </span>
              <span className='
                mobile:text-[.5rem]
                tablet:text-[.5rem]
                laptop:text-[.8rem]
                laptop-lg:text-[.8rem]
                desktop:text-[.8rem]'>
                2021
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProjectCard