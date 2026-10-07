//
import React, { useEffect } from 'react'
// scroll reveal
import { scrollReveal } from '../../utils/scrollReveal'
// per-letter text split
import SplitText from '../common/SplitText'

function Footer() {

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
      <div className='grid gap-0 py-10 bg-black font-monolisa font-regular
          mobile:p-[.9rem] mobile:py-8 mobile:gap-y-1 mobile:grid-cols-8 mobile:text-[.9rem]
          tablet:p-[1rem] tablet:py-8 tablet:gap-y-1 tablet:grid-cols-8 tablet:text-[.9rem]
          laptop:p-[2rem] laptop:h-auto laptop:grid-cols-8 laptop:text-[1rem]
          laptop-lg:p-[3rem] laptop-lg:h-auto laptop-lg:grid-cols-8 laptop-lg:text-[1rem]
          desktop:p-[3rem] desktop:h-full desktop:grid-cols-8 desktop:text-[1.1rem]'>
          <section className='col-start-1 flex flex-row text-white
            mobile:col-span-8 mobile:min-h-[20px]
            tablet:col-span-3 tablet:min-h-[20px]
            laptop:col-span-3 laptop:min-h-[23px]
            laptop-lg:col-span-2 laptop-lg:min-h-[23px]
            desktop:col-span-2 desktop:min-h-[23px]'>
            <SplitText text={`© ${new Date().getFullYear()} Jay Beniza`} id='animate-footer' />
          </section>
          <section className='flex flex-row text-white
            mobile:col-span-8 mobile:col-start-1 mobile:justify-start mobile:min-h-[20px]
            tablet:col-span-8 tablet:col-start-1 tablet:justify-start tablet:min-h-[20px]
            laptop:col-span-2 laptop:col-start-5 laptop:justify-end laptop:min-h-[23px]
            laptop-lg:col-span-2 laptop-lg:col-start-5 laptop-lg:justify-end laptop-lg:min-h-[23px]
            desktop:col-span-2 desktop:col-start-5 desktop:justify-end desktop:min-h-[23px]'>
            <SplitText text='Last updated October 2026' id='animate-footer' />
          </section>
          <section className='flex flex-row text-white
            mobile:col-span-8 mobile:col-start-1 mobile:justify-start mobile:min-h-[20px]
            tablet:col-span-8 tablet:col-start-1 tablet:justify-start tablet:min-h-[20px]
            laptop:col-span-2 laptop:col-start-7 laptop:justify-end laptop:min-h-[23px]
            laptop-lg:col-span-2 laptop-lg:col-start-7 laptop-lg:justify-end laptop-lg:min-h-[23px]
            desktop:col-span-2 desktop:col-start-7 desktop:justify-end desktop:min-h-[23px]'>
            <SplitText text='Designed & built by Jay Beniza' id='animate-footer' />
          </section>
        </div>
    </>
  )
}

export default Footer