//
import React, { useEffect, useRef } from 'react'
// scroll reveal
import { scrollReveal } from '../../utils/scrollReveal'
// per-letter text split
import SplitText from '../common/SplitText'
// the kerning game, opened from the footer
import KerningGame from '../common/KerningGame'
// the smoothed scroll, for the way back to the top
import ScrollSmoother from 'gsap/ScrollSmoother'

// back to the top, through the smoothed scroll where there is one
const toTop = () => {
  const smoother = ScrollSmoother.get();
  if (smoother) smoother.scrollTo(0, true);
  else window.scrollTo({ top: 0, behavior: 'smooth' });
};

// the footer sits inside the closing screen (Contact.jsx, and the about
// page's resume screen), so it takes that screen's colour
function Footer() {
  const fxFooter = useRef();

  useEffect(() => {
    // 'top bottom' (most lenient) instead of the shared default: the
    // footer is the last, short element on the page, so the default can
    // require scrolling past the page's actual max scroll extent to be
    // satisfied - letters stuck at their hidden offset, onEnter never firing
    const reveal = scrollReveal('#animate-footer', {
      y: 0,
      stagger: .02,
      ease: 'power1.in',
    }, { trigger: fxFooter.current, start: 'top bottom' });
    return () => reveal.kill();
  }, []);

  return (
    <>
      <footer ref={fxFooter} className='flex justify-between gap-x-6 font-monolisa text-caption
        mobile:px-[1rem] mobile:pt-6 mobile:pb-4 mobile:flex-col mobile:gap-y-1
        tablet:px-[1rem] tablet:pt-6 tablet:pb-4
        laptop:px-[2rem] laptop:pt-6 laptop:pb-8
        laptop-lg:px-[3rem] laptop-lg:pt-8 laptop-lg:pb-12
        desktop:px-[3rem] desktop:pt-8 desktop:pb-12'>
        <p className='flex flex-wrap'>
          <SplitText text={`© ${new Date().getFullYear()} Jay Beniza`} id='animate-footer' />
        </p>
        {/* across from the copyright: the kerning game, then the way back to
          the top, both text buttons */}
        <div className='flex flex-wrap gap-x-6 gap-y-1'>
          <KerningGame text id='animate-footer' />
          <button type='button' className='flex flex-wrap self-start text-left' onClick={toTop}>
            <SplitText text='Back to top' id='animate-footer' />
          </button>
        </div>
      </footer>
    </>
  )
}

export default Footer
