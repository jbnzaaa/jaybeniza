// 
import React, { useEffect } from 'react'
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function Hero() {
  useEffect(() => {
    // landing page paragraph
    gsap.to('#hero-p', {
      duration: 1,
      y: 0,
      stagger: .05,
      ease: 'power1.in',
      scrollTrigger: { trigger: '#hero-p', }
    });

    // first word
    gsap.to('#hero-aspiringweb', {
      duration: 1,
      y: 0,
      stagger: .05,
      ease: 'power1.in',
      scrollTrigger: { trigger: '#hero-aspiringweb', }
    });

    // second word
    gsap.to('#hero-designerdev', {
      duration: 1,
      y: 0,
      stagger: .08,
      ease: 'power1.in',
      scrollTrigger: { trigger: '#hero-designerdev', }
    });
  });

  return (
    <>
      {/* hero container */}
      {/* grid */}
      <div className='grid grid-cols-8 gap-0
        mobile:py-20 mobile:px-[.9rem]
        tablet:py-20 tablet:px-[1rem]
        laptop:py-20 laptop:px-[2rem]
        laptop-lg:py-20 laptop-lg:px-[3rem]
        desktop:py-28 desktop:px-[3rem]'>
        {/* highlight */}
        <section className='
          mobile:col-start-3 mobile:col-span-6 mobile:h-[500px]
          tablet:col-start-6 tablet:col-span-3 tablet:h-[300px]
          laptop:col-start-6 laptop:col-span-3 laptop:h-[350px]
          laptop-lg:col-start-7 laptop-lg:col-span-2 laptop-lg:h-[300px]
          desktop:col-start-7 desktop:col-span-2 desktop:h-[230px]'>
          <div className='flex flex-wrap h-[30px]
            mobile:text-[1rem]
            tablet:text-[1.1rem]
            laptop:text-[1.2rem] 
            laptop-lg:text-[1.2rem] 
            desktop:text-[1.3rem] '>
            <div id='p-container'><p id='hero-p'>Seeking</p></div>
            <div id='p-container'><p id='hero-p'>to</p></div>
            <div id='p-container'><p id='hero-p'>develop</p></div>
            <div id='p-container'><p id='hero-p'>and</p></div>
            <div id='p-container'><p id='hero-p'>create</p></div>
            <div id='p-container'><p id='hero-p'>design</p></div>
            <div id='p-container'><p id='hero-p'>interface</p></div>
            <div id='p-container'><p id='hero-p'>with</p></div>
            <div id='p-container'><p id='hero-p'>the</p></div>
            <div id='p-container'><p id='hero-p'>use</p></div>
            <div id='p-container'><p id='hero-p'>of</p></div>
            <div id='p-container'><p id='hero-p'>modern</p></div>
            <div id='p-container'><p id='hero-p'>web</p></div>
            <div id='p-container'><p id='hero-p'>technology.</p></div>
          </div>
        </section>
        {/* profession */}
        <section className='col-start-1 col-span-8 flex
          mobile:h-[45px] mobile:mt-30 mobile:text-[2rem] 
          tablet:h-[105px] tablet:mt-28 tablet:text-[2rem] 
          laptop:h-[50px] laptop:text-[2.5rem] 
          laptop-lg:h-[50px] laptop-lg:text-[3rem] 
          desktop:h-[75px] desktop:text-[3.5rem]'
          id='hero-container'>
          <span className=' font-lexend font-semibold leading-none tracking-tight flex flex-col justify-end h-full 
            mobile:translate-y-[45px]
            tablet:translate-y-[50px]
            laptop:translate-y-[55px]
            laptop-lg:translate-y-[60px]
            desktop:translate-y-[75px]' 
            id='hero-aspiringweb'>
            aspiring
          </span>
          <span className=' font-lexend font-semibold leading-none tracking-tight flex flex-col justify-end h-full 
            mobile:translate-y-[45px]
            tablet:translate-y-[50px]
            laptop:translate-y-[55px]
            laptop-lg:translate-y-[60px]
            desktop:translate-y-[75px]' 
            id='hero-aspiringweb'>
            web
          </span>
        </section>
        {/* profession */}
        <section className='col-start-1 col-span-8 
          mobile:h-[80px]
          tablet:h-[105px]
          laptop:h-[130px]
          laptop-lg:h-[160px]
          desktop:h-[175px]'
          id='hero-container'>
          <span className='font-lexend font-bold leading-none tracking-tight
            mobile:text-[5.7rem] mobile:right-2 mobile:translate-y-[80px]
            tablet:text-[7rem] tablet:right-2 tablet:translate-y-[105px]
            laptop:text-[9rem] laptop:right-4 laptop:translate-y-[160px]
            laptop-lg:text-[11rem] laptop-lg:right-4 laptop-lg:translate-y-[170px]
            desktop:text-[12rem] desktop:right-4 desktop:translate-y-[175px]'
            id='hero-designerdev'>
            Designer.
          </span>
        </section>
        {/* profession */}
        <section className='col-start-1
          mobile:h-[80px] mobile:col-span-8
          tablet:h-[105px] tablet:col-span-8
          laptop:h-[130px] laptop:col-span-8
          laptop-lg:h-[160px] laptop-lg:col-span-8
          desktop:h-[175px] desktop:col-span-7'
          id='hero-container'>
          <span className='font-lexend font-bold leading-none tracking-tight
            mobile:text-[5.7rem] mobile:right-2 mobile:translate-y-[80px]
            tablet:text-[7rem] tablet:right-2 tablet:translate-y-[105px]
            laptop:text-[9rem] laptop:right-4 laptop:translate-y-[160px]
            laptop-lg:text-[11rem] laptop-lg:right-4 laptop-lg:translate-y-[170px]
            desktop:text-[12rem] desktop:right-4 desktop:translate-y-[175px]'
            id='hero-designerdev'>
            Developer.
          </span>
        </section>
      </div>
    </>
  )
}

export default Hero