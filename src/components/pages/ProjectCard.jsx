//
import React, { useEffect } from 'react'
// GSAP
import gsap from 'gsap' 
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function ProjectCard() {
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
          mobile:gap-y-10
          tablet:gap-y-10
          laptop:gap-y-14
          laptop-lg:gap-y-20
          desktop:gap-y-20'>
          {/* portfolio v2 */}
          <div className='
            mobile:col-span-8 mobile:col-start-1
            tablet:col-span-8 tablet:col-start-1
            laptop:col-span-5 laptop:col-start-2
            laptop-lg:col-span-5 laptop-lg:col-start-2
            desktop:col-span-5 desktop:col-start-2'>
            <div className='project-card-container bg-black'>
              {/* <Link to='/dailydiscount' >
                <div className='bg-dailydiscount bg-cover object-cover opacity-40
                  mobile:h-[300px]
                  tablet:h-[400px]
                  laptop:h-[500px]
                  laptop-lg:h-[600px]
                  desktop:h-[600px]' 
                  id='project-image'/>
              </Link> */}
              <a href='https://jaysonbeniza.vercel.app/' target='https://jaysonbeniza.vercel.app/'>
                <div className='project-image bg-jaysonbeniza bg-cover object-cover opacity-40
                  mobile:h-[300px]
                  tablet:h-[400px]
                  laptop:h-[500px]
                  laptop-lg:h-[500px]
                  desktop:h-[500px]'/>
              </a>
            </div>
            <div className='project-content flex justify-between mt-1
              mobile:flex-col
              tablet:flex-col'>
              <span className='font-lexend font-medium leading-none tracking-tighter text-black
                mobile:text-[1.3rem] mobile:mb-2
                tablet:text-[1.3rem] tablet:mb-2
                laptop:text-[1.3rem]
                laptop-lg:text-[1.5rem]
                desktop:text-[2rem]'>
                Portfolio v2
              </span>
              <div className='flex flex-wrap justify-end text-[.8rem]
                mobile:text-[.5rem] mobile:justify-start
                tablet:text-[.5rem]'>
                <span className='ml-[10px] mobile:ml-0 mobile:mr-2'>2022</span>
                <span className='ml-[10px] mobile:ml-0 mobile:mr-2'>/</span>
                <span className='ml-[10px] mobile:ml-0 mobile:mr-2'>REACTJS</span>
                <span className='ml-[10px] mobile:ml-0 mobile:mr-2'>TAILWIND CSS</span>
                <span className='ml-[10px] mobile:ml-0 mobile:mr-2'>SASS</span>
                <span className='ml-[10px] mobile:ml-0 mobile:mr-2'>GSAP</span>
                <span className='ml-[10px] mobile:ml-0 mobile:mr-2'>VERCEL APP</span>
              </div>
            </div>
          </div>
          {/* daily discount */}
          <div className='
            mobile:col-span-8 mobile:col-start-1
            tablet:col-span-8 tablet:col-start-1
            laptop:col-span-4 laptop:col-start-5
            laptop-lg:col-span-4 laptop-lg:col-start-5
            desktop:col-span-4 desktop:col-start-5'>
            <div className='project-card-container bg-black'>
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
                <div className='project-image bg-dailydiscount bg-cover object-cover opacity-40
                  mobile:h-[300px]
                  tablet:h-[400px]
                  laptop:h-[400px]
                  laptop-lg:h-[400px]
                  desktop:h-[400px]'/>
              </a>
            </div>
            <div className='project-content flex justify-between mt-1
              mobile:flex-col
              tablet:flex-col'>
              <span className='font-lexend font-medium leading-none tracking-tighter text-black
                mobile:text-[1.3rem] mobile:mb-2
                tablet:text-[1.3rem] tablet:mb-2
                laptop:text-[1.3rem]
                laptop-lg:text-[1.5rem]
                desktop:text-[2rem]'>
                DailyDiscount
              </span>
              <div className='flex flex-wrap justify-end text-[.8rem]
                mobile:text-[.5rem] mobile:justify-start
                tablet:text-[.5rem]'>
                <span className='ml-[10px] mobile:ml-0 mobile:mr-2'>2022</span>
                <span className='ml-[10px] mobile:ml-0 mobile:mr-2'>/</span>
                <span className='ml-[10px] mobile:ml-0 mobile:mr-2'>REACTJS</span>
                <span className='ml-[10px] mobile:ml-0 mobile:mr-2'>TAILWIND CSS</span>
                <span className='ml-[10px] mobile:ml-0 mobile:mr-2'>SASS</span>
                <span className='ml-[10px] mobile:ml-0 mobile:mr-2'>VERCEL APP</span>
              </div>
            </div>
          </div>
          {/* portfolio v1 */}
          <div className='
            mobile:col-span-8 mobile:col-start-1
            tablet:col-span-8 tablet:col-start-1
            laptop:col-span-5 laptop:col-start-1
            laptop-lg:col-span-5 laptop-lg:col-start-1
            desktop:col-span-5 desktop:col-start-1'>
            <div className='project-card-container bg-black'>
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
                <div className='project-image bg-jbnza bg-cover object-cover opacity-40
                  mobile:h-[300px]
                  tablet:h-[400px]
                  laptop:h-[400px]
                  laptop-lg:h-[400px]
                  desktop:h-[400px]'/>
              </a>
            </div>
            <div className='project-content flex justify-between mt-1
              mobile:flex-col
              tablet:flex-col'>
              <span className='font-lexend font-medium leading-none tracking-tighter text-black
                mobile:text-[1.3rem] mobile:mb-2
                tablet:text-[1.3rem] tablet:mb-2
                laptop:text-[1.3rem]
                laptop-lg:text-[1.5rem]
                desktop:text-[2rem]'>
                Portfolio v1
              </span>
              <div className='flex flex-wrap justify-end text-[.8rem]
                mobile:text-[.5rem] mobile:justify-start
                tablet:text-[.5rem]'>
                <span className='ml-[10px] mobile:ml-0 mobile:mr-2'>2022</span>
                <span className='ml-[10px] mobile:ml-0 mobile:mr-2'>/</span>
                <span className='ml-[10px] mobile:ml-0 mobile:mr-2'>REACTJS</span>
                <span className='ml-[10px] mobile:ml-0 mobile:mr-2'>MATERIAL UI</span>
                <span className='ml-[10px] mobile:ml-0 mobile:mr-2'>SASS</span>
                <span className='ml-[10px] mobile:ml-0 mobile:mr-2'>VERCEL APP</span>
              </div>
            </div>
          </div>
          {/* regain */}
          <div className='
            mobile:col-span-8 mobile:col-start-1
            tablet:col-span-8 tablet:col-start-1
            laptop:col-span-5 laptop:col-start-3
            laptop-lg:col-span-5 laptop-lg:col-start-3
            desktop:col-span-5 desktop:col-start-3'>
            <div className='project-card-container bg-black'>
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
                <div className='project-image bg-regain bg-cover object-cover opacity-40
                  mobile:h-[300px]
                  tablet:h-[400px]
                  laptop:h-[400px]
                  laptop-lg:h-[400px]
                  desktop:h-[400px]'/>
              </a>
            </div>
            <div className='project-content flex justify-between mt-1
              mobile:flex-col
              tablet:flex-col'>
              <span className='font-lexend font-medium leading-none tracking-tighter text-black
                mobile:text-[1.3rem] mobile:mb-2
                tablet:text-[1.3rem] tablet:mb-2
                laptop:text-[1.3rem]
                laptop-lg:text-[1.5rem]
                desktop:text-[2rem]'>
                ReGain
              </span>
              <div className='flex flex-wrap justify-end text-[.8rem]
                mobile:text-[.5rem] mobile:justify-start
                tablet:text-[.5rem]'>
                <span className='ml-[10px] mobile:ml-0 mobile:mr-2'>2021</span>
                <span className='ml-[10px] mobile:ml-0 mobile:mr-2'>/</span>
                <span className='ml-[10px] mobile:ml-0 mobile:mr-2'>HTML</span>
                <span className='ml-[10px] mobile:ml-0 mobile:mr-2'>SASS</span>
                <span className='ml-[10px] mobile:ml-0 mobile:mr-2'>JAVASCRIPT</span>
                <span className='ml-[10px] mobile:ml-0 mobile:mr-2'>JQUERY</span>
                <span className='ml-[10px] mobile:ml-0 mobile:mr-2'>BOOTSTRAP</span>
                <span className='ml-[10px] mobile:ml-0 mobile:mr-2'>NODEJS</span>
                <span className='ml-[10px] mobile:ml-0 mobile:mr-2'>CLOUD FIREBASE</span>
                <span className='ml-[10px] mobile:ml-0 mobile:mr-2'>FIREBASE ADMIN</span>
                <span className='ml-[10px] mobile:ml-0 mobile:mr-2'>GOOGLE CLOUD STORAGE</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProjectCard