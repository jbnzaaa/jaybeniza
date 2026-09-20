//
import React, { useState, useEffect } from 'react'
// React Router DOM
import { useLocation } from 'react-router-dom'
// scroll reveal
import { scrollReveal } from '../../utils/scrollReveal'
// per-letter text split
import SplitText from '../common/SplitText'

function Footer() {
  const [showFooter] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // 'top bottom' (most lenient) instead of the shared 85% default: the
    // footer is the last, short element on the page, so 'top 85%' can
    // require scrolling past the page's actual max scroll extent to be
    // satisfied - confirmed directly (letters stuck at their fully hidden
    // offset, onEnter never firing, even at max scroll). unlike the
    // Hero/other sections this "unreachable trigger" risk was removed
    // from, the footer's position genuinely makes this unavoidable
    const reveal = scrollReveal('#animate-footer', {
      y: 0,
      stagger: .02,
      ease: 'power1.in',
    }, { start: 'top bottom' });
    return () => reveal.kill();
  }, []);

  return (
    <>
    { location.pathname === '/jaysonbeniza' ? showFooter !== false :
        location.pathname === '/dailydiscount' ? showFooter !== false : 
        location.pathname === '/jbnza' ? showFooter !== false :
        location.pathname === '/regain' ? showFooter !== false :
        <div className='grid gap-0 py-10 bg-black font-montserrat font-regular
          mobile:p-[.9rem] mobile:h-[15vh] mobile:grid-cols-8 mobile:text-[.9rem]
          tablet:p-[1rem] tablet:h-[15vh] tablet:grid-cols-8 tablet:text-[.9rem]
          laptop:p-[2rem] laptop:h-[15vh] laptop:grid-cols-8 laptop:text-[1rem]
          laptop-lg:p-[3rem] laptop-lg:h-[15vh] laptop-lg:grid-cols-8 laptop-lg:text-[1rem]
          desktop:p-[3rem] desktop:h-full desktop:grid-cols-8 desktop:text-[1.1rem]'>
          <section className='col-start-1 flex flex-row text-white
            mobile:col-span-8 mobile:h-[20px]
            tablet:col-span-3 tablet:h-[20px]
            laptop:col-span-3 laptop:h-[23px]
            laptop-lg:col-span-2 laptop-lg:h-[23px]
            desktop:col-span-2 desktop:h-[23px]'>
            <SplitText text={`© ${new Date().getFullYear()} Jayson Beniza`} id='animate-footer' />
          </section>
          <section className='flex flex-row text-white
            mobile:col-span-8 mobile:col-start-1 mobile:justify-start mobile:h-[20px]
            tablet:col-span-8 tablet:col-start-1 tablet:justify-start tablet:h-[20px]
            laptop:col-span-2 laptop:col-start-5 laptop:justify-end laptop:h-[23px]
            laptop-lg:col-span-2 laptop-lg:col-start-5 laptop-lg:justify-end laptop-lg:h-[23px]
            desktop:col-span-2 desktop:col-start-5 desktop:justify-end desktop:h-[23px]'>
            <SplitText text='Last Update September 2026' id='animate-footer' />
          </section>
          <section className='flex flex-row text-white
            mobile:col-span-8 mobile:col-start-1 mobile:justify-start mobile:h-[20px]
            tablet:col-span-8 tablet:col-start-1 tablet:justify-start tablet:h-[20px]
            laptop:col-span-2 laptop:col-start-7 laptop:justify-end laptop:h-[23px]
            laptop-lg:col-span-2 laptop-lg:col-start-7 laptop-lg:justify-end laptop-lg:h-[23px]
            desktop:col-span-2 desktop:col-start-7 desktop:justify-end desktop:h-[23px]'>
            <SplitText text='Design & Develop by Me' id='animate-footer' />
          </section>
        </div>
      }
    </>
  )
}

export default Footer