//
import React, { useEffect } from 'react'
//
import { Link } from 'react-router-dom'
// icons
import {RiArrowRightDownLine} from 'react-icons/ri'
// Project screenshot
import dd_landingpage from '../../../../src/assets/files/images/dailydiscount/landing-page.png'
import dd_dashboard from '../../../../src/assets/files/images/dailydiscount/dashboard-page.png'
import dd_heroes_skins from '../../../../src/assets/files/images/dailydiscount/heroes-&-skins-page.png'
import dd_price from '../../../../src/assets/files/images/dailydiscount/price-page.png'
import dd_order_details from '../../../../src/assets/files/images/dailydiscount/order-details-page.png'
import dd_cart from '../../../../src/assets/files/images/dailydiscount/cart-page.png'
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
// scroll reveal
import { scrollReveal } from '../../../utils/scrollReveal'
// per-letter text split
import SplitText from '../../common/SplitText'
gsap.registerPlugin(ScrollTrigger)

const DESCRIPTION = 'Dailydiscount is a web-based application developed to help small online business sell discounted game credits.';

function DailyDiscount() {
  useEffect(() => {
    // project content animation
    const reveal = scrollReveal('#animate-dailydiscount', {
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
                <SplitText text='Dailydiscount' id='animate-dailydiscount' />
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
                mobile:text-[.9rem]
                tablet:text-[.9rem]
                laptop:text-[1rem]
                laptop-lg:text-[1rem]
                desktop:text-[1.1rem]'>
                <SplitText text='Team / Ongoing Web Development' id='animate-dailydiscount' />
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
                mobile:text-[.9rem]
                tablet:text-[.9rem]
                laptop:text-[1rem]
                laptop-lg:text-[1rem]
                desktop:text-[1.1rem]'>
                <SplitText text='UI Designer' id='animate-dailydiscount' />
                <SplitText text='Front-End Web Developer' id='animate-dailydiscount' />
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
                  <a href='https://daily-discount.vercel.app/' target='_blank' rel='noreferrer'>
                    <span className='flex items-center
                      mobile:text-[.9rem]
                      tablet:text-[.9rem]
                      laptop:text-[1rem]
                      laptop-lg:text-[1rem]
                      desktop:text-[1.1rem]'>
                      <SplitText text='Dailydiscount' id='animate-dailydiscount' />
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
          {/* landing page */}
          <div className='screenshot-container
            mobile:col-span-8 mobile:col-start-1
            tablet:col-span-8 tablet:col-start-1
            laptop:col-span-8 laptop:col-start-1
            laptop-lg:col-span-8 laptop-lg:col-start-1
            desktop:col-span-8 desktop:col-start-1'>
            <img src={dd_landingpage} alt="dailydiscount-landing-page" className='screenshot-img border border-black' id='animate-screenshot'/>
          </div>
          {/* dashboard */}
          <div className='screenshot-container
            mobile:col-span-8 mobile:col-start-1
            tablet:col-span-8 tablet:col-start-1
            laptop:col-span-5 laptop:col-start-2
            laptop-lg:col-span-5 laptop-lg:col-start-2
            desktop:col-span-5 desktop:col-start-2'>
            <img src={dd_dashboard} alt="dailydiscount-dashboard" className='screenshot-img border border-black' id='animate-screenshot'/>
          </div>
          {/* heroes and skins */}
          <div className='screenshot-container
            mobile:col-span-8 mobile:col-start-1
            tablet:col-span-8 tablet:col-start-1
            laptop:col-span-5 laptop:col-start-4
            laptop-lg:col-span-5 laptop-lg:col-start-4
            desktop:col-span-5 desktop:col-start-4'>
            <img src={dd_heroes_skins} alt="dailydiscount-heroes-and-skins" className='screenshot-img border border-black' id='animate-screenshot'/>
          </div>
          {/* price */}
          <div className='screenshot-container
            mobile:col-span-8 mobile:col-start-1
            tablet:col-span-8 tablet:col-start-1
            laptop:col-span-5 laptop:col-start-1
            laptop-lg:col-span-5 laptop-lg:col-start-1
            desktop:col-span-5 desktop:col-start-1'>
            <img src={dd_price} alt="dailydiscount-price" className='screenshot-img border border-black' id='animate-screenshot'/>
          </div>
          {/* order details */}
          <div className='screenshot-container
            mobile:col-span-8 mobile:col-start-1
            tablet:col-span-8 tablet:col-start-1
            laptop:col-span-5 laptop:col-start-3
            laptop-lg:col-span-5 laptop-lg:col-start-3
            desktop:col-span-5 desktop:col-start-3'>
            <img src={dd_order_details} alt="dailydiscount-order-details" className='screenshot-img border border-black' id='animate-screenshot'/>
          </div>
          {/* cart */}
          <div className='screenshot-container
            mobile:col-span-8 mobile:col-start-1
            tablet:col-span-8 tablet:col-start-1
            laptop:col-span-5 laptop:col-start-4
            laptop-lg:col-span-5 laptop-lg:col-start-4
            desktop:col-span-5 desktop:col-start-4'>
            <img src={dd_cart} alt="dailydiscount-card" className='screenshot-img border border-black' id='animate-screenshot'/>
          </div>
        </div>
      </section>
      {/* <Contact/> */}
    </>
  )
}

export default DailyDiscount
