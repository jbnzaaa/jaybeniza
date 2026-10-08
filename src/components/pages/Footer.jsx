//
import React, { useEffect } from 'react'
// scroll reveal
import { scrollReveal } from '../../utils/scrollReveal'
// per-letter text split
import SplitText from '../common/SplitText'

// the footer sits inside the closing screen (Contact.jsx, and the about
// page's resume screen), so it takes that screen's colour
function Footer() {

  useEffect(() => {
    // 'top bottom' (most lenient) instead of the shared 85% default: the
    // footer is the last, short element on the page, so 'top 85%' can
    // require scrolling past the page's actual max scroll extent to be
    // satisfied - letters stuck at their hidden offset, onEnter never firing
    const reveal = scrollReveal('#animate-footer', {
      y: 0,
      stagger: .02,
      ease: 'power1.in',
    }, { start: 'top bottom' });
    return () => reveal.kill();
  }, []);

  return (
    <>
      <footer className='flex justify-between gap-x-6 font-monolisa text-caption
        mobile:px-[1rem] mobile:py-6 mobile:flex-col mobile:gap-y-1
        tablet:px-[1rem] tablet:py-6
        laptop:px-[2rem] laptop:py-6
        laptop-lg:px-[3rem] laptop-lg:py-8
        desktop:px-[3rem] desktop:py-8'>
        <p className='flex flex-wrap'>
          <SplitText text={`© ${new Date().getFullYear()} Jay Beniza`} id='animate-footer' />
        </p>
        <p className='flex flex-wrap'>
          <SplitText text='Last updated October 2026' id='animate-footer' />
        </p>
      </footer>
    </>
  )
}

export default Footer
