//
import React, { useEffect } from 'react'
//
import { Link } from 'react-router-dom'
// icons
import {RiArrowRightDownLine} from 'react-icons/ri'
// Project screenshot
import jaysonbeniza_hero from '../../../../src/assets/files/images/portfolio/jaysonbeniza-landing-page-1.png'
import jaysonbeniza_about from '../../../../src/assets/files/images/portfolio/jaysonbeniza-landing-page-2.png'
import jaysonbeniza_project from '../../../../src/assets/files/images/portfolio/jaysonbeniza-landing-page-3.png'
import jaysonbeniza_contact from '../../../../src/assets/files/images/portfolio/jaysonbeniza-landing-page-4.png'
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
// scroll reveal
import { scrollReveal } from '../../../utils/scrollReveal'
// per-letter text split
import SplitText from '../../common/SplitText'
gsap.registerPlugin(ScrollTrigger)

const DESCRIPTION = "Jaysonbeniza is a web-based portfolio showcasing my current user interface and web design projects, information about myself, programming language, frameworks, and software's I have used.";

function Jaysonbeniza() {
  useEffect(() => {
    // project content animation
    const reveal = scrollReveal('#animate-dailydiscount', {
      delay: .8,
      y: 0,
      stagger: .02,
      ease: 'power1.in',
    });

    gsap.to('#animate-screenshot', {
      delay: .8,
      duration: 1,
      stagger: .05,
      y: 0,
      ease: 'power1.in'
    });

    window.scrollTo(0, 0)

    return () => reveal.kill();
  }, []);

  return (
    <>
      <section className='px-0 py-3 h-full
        mobile:px-[.9rem]
        tablet:px-[1rem]
        laptop:px-[2rem]
        laptop-lg:px-[3rem]
        desktop:px-[3rem]'>
        <div className='project-container grid grid-cols-8 gap-x-5
          mobile:gap-y-10
          tablet:gap-y-10
          laptop:gap-y-14
          laptop-lg:gap-y-20
          desktop:gap-y-20'>
          {/* project container row 1 */}
          <div className='col-start-1
            mobile:col-span-6
            tablet:col-span-6
            tablet:col-span-4
            laptop:col-span-4
            laptop-lg:col-span-4
            desktop:col-span-4'>
            <div className='flex flex-wrap
              mobile:h-[35px] mobile:mb-2 mobile:text-[2rem]
              tablet:h-[60px] tablet:mb-2 tablet:text-[3rem]
              laptop:h-[90px] laptop:mb-3 laptop:text-[4rem]
              laptop-lg:h-[100px] laptop-lg:mb-3 laptop-lg:text-[5.3rem]
              desktop:h-[110px] desktop:mb-3 desktop:text-[5.5rem]'>
              <span className='project-h1 font-lexend font-medium leading-none tracking-tighter'>
                <SplitText text='Portfolio v2' id='animate-dailydiscount' />
              </span>
            </div>
          </div>
          <div className='col-span-2 col-start-7'>
            <div className='font-lexend font-medium cursor-pointer tracking-tighter text-right
              mobile:text-[.9rem] mobile:h-[20px]
              tablet:text-[.9rem] tablet:h-[20px]
              laptop:text-[1rem] laptop:h-[30px]
              laptop-lg:text-[1rem] laptop-lg:h-[30px]
              desktop:text-[1.1rem] desktop:h-[30px]'>
              <Link to='/'>
                <SplitText text='Return' id='animate-dailydiscount' />
              </Link>
            </div>
          </div>
          {/* project container row 2 */}
          <div className='col-start-1
            mobile:col-span-2
            tablet:col-span-1
            laptop:col-span-1
            laptop-lg:col-span-1
            desktop:col-span-1'>
            <div className='
              mobile:text-[.9rem] mobile:h-[20px]
              tablet:text-[.9rem] tablet:h-[20px]
              laptop:text-[1rem] laptop:h-[30px]
              laptop-lg:text-[1rem] laptop-lg:h-[30px]
              desktop:text-[1.1rem] desktop:h-[30px]'>
              <SplitText text='2022' id='animate-dailydiscount' />
            </div>
          </div>
          <div className='col-start-2
            mobile:col-span-6
            tablet:col-span-6
            laptop:col-span-2
            laptop-lg:col-span-2
            desktop:col-span-2'>
            <p className='flex flex-wrap
              mobile:text-[.9rem]
              tablet:text-[.9rem]
              laptop:text-[1rem]
              laptop-lg:text-[1rem]
              desktop:text-[1.1rem] '>
              <SplitText text={DESCRIPTION} id='animate-dailydiscount' />
            </p>
          </div>
          <div className='
            mobile:col-span-6 mobile:col-start-3
            tablet:col-span-6 tablet:col-start-2
            laptop:col-span-4 laptop:col-start-4
            laptop-lg:col-span-4 laptop-lg:col-start-5
            desktop:col-span-4 desktop:col-start-5'>
            {/* category */}
            <div className='
              mobile:mb-2
              tablet:mb-2
              laptop:mb-5
              laptop-lg:mb-5
              desktop:mb-5'>
              <div className='h-[20px] font-semibold
                mobile:text-[.5rem]
                tablet:text-[.5rem]
                laptop:text-[.9rem]
                laptop-lg:text-[.9rem]
                desktop:text-[.9rem] '>
                <SplitText text='Category' id='animate-dailydiscount' />
              </div>
              <div className='
                mobile:text-[.9rem] mobile:h-[20px]
                tablet:text-[.9rem] tablet:h-[20px]
                laptop:text-[1rem] laptop:h-[30px]
                laptop-lg:text-[1rem] laptop-lg:h-[30px]
                desktop:text-[1.1rem] desktop:h-[30px]'>
                <SplitText text='Personal / Web Development' id='animate-dailydiscount' />
              </div>
            </div>
            {/* role */}
            <div className='
              mobile:mb-2
              tablet:mb-2
              laptop:mb-5
              laptop-lg:mb-5
              desktop:mb-5'>
              <div className='h-[20px] font-semibold
                mobile:text-[.5rem]
                tablet:text-[.5rem]
                laptop:text-[.9rem]
                laptop-lg:text-[.9rem]
                desktop:text-[.9rem] '>
                <SplitText text='Role' id='animate-dailydiscount' />
              </div>
              <div className='flex flex-wrap
                mobile:text-[.9rem] mobile:h-[20px]
                tablet:text-[.9rem] tablet:h-[20px]
                laptop:text-[1rem] laptop:h-[30px]
                laptop-lg:text-[1rem] laptop-lg:h-[30px]
                desktop:text-[1.1rem] desktop:h-[30px]'>
                <SplitText text='UI Designer' id='animate-dailydiscount' />
                <SplitText text='Web Developer' id='animate-dailydiscount' />
              </div>
            </div>
            {/* technology used */}
            <div className='
              mobile:mb-2
              tablet:mb-2
              laptop:mb-5
              laptop-lg:mb-5
              desktop:mb-5'>
              <div className='h-[20px] font-semibold
                mobile:text-[.5rem]
                tablet:text-[.5rem]
                laptop:text-[.9rem]
                laptop-lg:text-[.9rem]
                desktop:text-[.9rem] '>
                <SplitText text='Technology Used' id='animate-dailydiscount' />
              </div>
              <div className='flex flex-wrap
                mobile:text-[.9rem]
                tablet:text-[.9rem]
                laptop:text-[1rem]
                laptop-lg:text-[1rem]
                desktop:text-[1.1rem]'>
                <SplitText text='React JS' id='animate-dailydiscount' />
                <SplitText text='Tailwind CSS' id='animate-dailydiscount' />
                <SplitText text='SASS' id='animate-dailydiscount' />
                <SplitText text='GSAP' id='animate-dailydiscount' />
                <SplitText text='FIGMA' id='animate-dailydiscount' />
                <SplitText text='VERCEL APP' id='animate-dailydiscount' />
              </div>
            </div>
            {/* project link */}
            <div className='
              mobile:mb-2
              tablet:mb-2
              laptop:mb-5
              laptop-lg:mb-5
              desktop:mb-5'>
              <div className='h-[20px] font-semibold
                mobile:text-[.5rem]
                tablet:text-[.5rem]
                laptop:text-[.9rem]
                laptop-lg:text-[.9rem]
                desktop:text-[.9rem] '>
                <SplitText text='Visit site' id='animate-dailydiscount' />
              </div>
              <div className='flex flex-wrap
                mobile:text-[.9rem]
                tablet:text-[.9rem]
                laptop:text-[1rem]
                laptop-lg:text-[1rem]
                desktop:text-[1.1rem] '>
                <div className='project-link'>
                  <a href='https://jaysonbeniza.vercel.app' target='_blank' rel='noreferrer'>
                    <span className='flex items-center
                      mobile:text-[.9rem]
                      tablet:text-[.9rem]
                      laptop:text-[1rem]
                      laptop-lg:text-[1rem]
                      desktop:text-[1.1rem]'>
                      <SplitText text='jaysonbeniza' id='animate-dailydiscount' />
                      <RiArrowRightDownLine id='icon' className='fill-black ml-1
                      mobile:text-xl
                      tablet:text-1xl
                      laptop:text-2xl
                      laptop-lg:text-2xl
                      desktop:text-2xl'/>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* project container row 3 */}
        <div className='project-container grid grid-cols-8 gap-x-5 mt-10
          mobile:gap-y-5
          tablet:gap-y-10
          laptop:gap-y-14
          laptop-lg:gap-y-20
          desktop:gap-y-20'>
          {/* hero section */}
          <div className='screenshot-container
            mobile:col-span-8 mobile:col-start-1
            tablet:col-span-8 tablet:col-start-1
            laptop:col-span-8 laptop:col-start-1
            laptop-lg:col-span-8 laptop-lg:col-start-1
            desktop:col-span-8 desktop:col-start-1'>
            <img src={jaysonbeniza_hero} alt="jaysonbeniza-hero-section" className='screenshot-img border border-black' id='animate-screenshot'/>
          </div>
          {/* about */}
          <div className='screenshot-container
            mobile:col-span-8 mobile:col-start-1
            tablet:col-span-8 tablet:col-start-1
            laptop:col-span-5 laptop:col-start-3
            laptop-lg:col-span-5 laptop-lg:col-start-3
            desktop:col-span-5 desktop:col-start-3'>
            <img src={jaysonbeniza_about} alt="jaysonbeniza-hero-about" className='screenshot-img border border-black' id='animate-screenshot'/>
          </div>
          {/* project */}
          <div className='screenshot-container
            mobile:col-span-8 mobile:col-start-1
            tablet:col-span-8 tablet:col-start-1
            laptop:col-span-5 laptop:col-start-2
            laptop-lg:col-span-5 laptop-lg:col-start-2
            desktop:col-span-5 desktop:col-start-2'>
            <img src={jaysonbeniza_project} alt="jaysonbeniza-hero-project" className='screenshot-img border border-black' id='animate-screenshot'/>
          </div>
          {/* contact */}
          <div className='screenshot-container
            mobile:col-span-8 mobile:col-start-1
            tablet:col-span-8 tablet:col-start-1
            laptop:col-span-5 laptop:col-start-4
            laptop-lg:col-span-5 laptop-lg:col-start-4
            desktop:col-span-5 desktop:col-start-4'>
            <img src={jaysonbeniza_contact} alt="jaysonbeniza-hero-contact" className='screenshot-img border border-black' id='animate-screenshot'/>
          </div>
        </div>
      </section>
      {/* <Contact/> */}
    </>
  )
}

export default Jaysonbeniza
