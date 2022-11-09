// 
import React, { useEffect } from 'react'
// GSAP
import gsap from 'gsap' 
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function AboutParagraph() {
  useEffect(() => {
    // about paragraph animation
    gsap.to('#about-paragraph', {
      duration: 1,
      y: 0,
      stagger: .05,
      ease: 'power1.in',
      scrollTrigger: { 
        trigger: '#about-paragraph', 
        start: 'bottom 100%'
      }
    });

  }, []);

  return (
    <>
    {/* animation broken */}
      <div>
        <div className='flex flex-wrap 
          mobile:text-[.9rem] 
          tablet:text-[.9rem] 
          laptop:text-[2rem] laptop:leading-tight
          laptop-lg:text-[2.1rem] laptop-lg:leading-tight
          desktop:text-[3rem] desktop:leading-tight'>
          <div id='content-container'>
            <p className='
              mobile:indent-10 mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:indent-10 tablett:translate-y-[30px] tablet:mr-[8px] 
              laptop:indent-20 laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:indent-20 laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:indent-20 desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                An
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                enthusiastic
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                self-taught
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                web
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                and
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                ui
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                designer
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                from
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                Philippines.
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                I
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                am
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                passionate
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                in
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                building
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                web
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                page
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                and
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                designing
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                user
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                friendly
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                interface.
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                When
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                I'm
            </p>
          </div>
          <div id="content-container">
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                not
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                typing
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                some
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                line
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                of
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                codes,
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                I'm
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                probably
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                playing
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                online
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                games
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                or
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                riding
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                my
            </p>
          </div>
          <div id='content-container'>
            <p className='
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='about-paragraph'>
                bicycle.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutParagraph