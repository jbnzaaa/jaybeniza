// 
import React from 'react'
// GSAP
import gsap from 'gsap' 
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function AboutParagraph() {
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
          <div className='content-container'>
            <p className='about-paragraph
              mobile:indent-10 mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:indent-10 tablett:translate-y-[30px] tablet:mr-[8px] 
              laptop:indent-20 laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:indent-20 laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:indent-20 desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                An
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                enthusiastic
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                self-taught
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                web
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                and
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                ui
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                designer
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                from
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                Philippines.
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                I
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                am
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                passionate
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                in
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                building
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                web
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                page
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                and
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                designing
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                user
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                friendly
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                interface.
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                When
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                I'm
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                not
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                adjusting
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                pixels
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                and
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                typing
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                some
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                line
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                of
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                codes,
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                I'm
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                probably
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                spending
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                my
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                time
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                playing
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                online
            </p>
          </div>
          <div className='content-container'>
            <p className='about-paragraph
              mobile:translate-y-[20px] mobile:mr-[5px] 
              tablet:translate-y-[30px] tablet:mr-[8px] 
              laptop:translate-y-[60px] laptop:mr-[15px]
              laptop-lg:translate-y-[60px] laptop-lg:mr-[18px] 
              desktop:translate-y-[60px] desktop:mr-[20px]' 
              id='animate-about'>
                games.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutParagraph