//
import React, { useEffect } from 'react'
// Components
import AboutParagraph from './about/AboutParagraph';
// icons
import {RiArrowRightDownLine} from 'react-icons/ri'
// scroll reveal
import { scrollRevealSequence } from '../../utils/scrollReveal'
// page-to-page wipe
import { TransitionLink } from '../common/PageTransition'
// per-letter text split
import SplitText from '../common/SplitText'

/**
 * The landing page's introduction: a full-width black screen. Where the
 * hero is a statement of what I do, this is who I am - a small greeting,
 * a career paragraph and a link through to the full About page
 * (AboutPage.jsx).
 */
function About() {
  useEffect(() => {
    // the page's letter-by-letter reveal, as the section comes up the
    // screen: greeting and paragraph first, the link once they have landed.
    // scrolling back above that point takes them away again
    const reveal = scrollRevealSequence([
      { targets: '#animate-about', vars: { y: 0, stagger: .012, ease: 'power1.in' } },
      { targets: '#animate-about-link', vars: { y: 0, stagger: .02, ease: 'power1.in' }, position: '-=.3' },
    ], { trigger: '#about', start: 'top 60%' });

    return () => reveal.kill();
  }, []);

  return (
    <>
      {/* about container - full width, one screen tall, black */}
      <div id='about'>
        <section className='flex flex-col justify-between h-screen-safe bg-black overflow-hidden pt-[6rem]
          mobile:px-[.9rem] mobile:pb-8
          tablet:px-[1rem] tablet:pb-10
          laptop:px-[2rem] laptop:pb-10
          laptop-lg:px-[3rem] laptop-lg:pb-12
          desktop:px-[3rem] desktop:pb-14'>
          {/* greeting + paragraph */}
          <div>
            {/* greeting - a label for the paragraph, not a second headline */}
            <div className='flex flex-wrap
              mobile:mb-4 mobile:text-[8vw]
              tablet:mb-5 tablet:text-[6vw]
              laptop:mb-6 laptop:text-[4vw]
              laptop-lg:mb-6 laptop-lg:text-[3.6vw]
              desktop:mb-8 desktop:text-[3.6vw]'>
              <span className='font-flexible font-medium leading-none text-offwhite'>
                <SplitText text="Hello, I'm Jay" id='animate-about' />
              </span>
            </div>
            {/* about me */}
            <div className='
              mobile:w-full
              tablet:w-[92%]
              laptop:w-[88%]
              laptop-lg:w-[86%]
              desktop:w-[82%]'>
              <AboutParagraph/>
            </div>
          </div>
          {/* link to the full about page - at the end of the section, on
            the left */}
          <div className='flex justify-start'>
            {/* the menu links' markup - their hover is the one made for a
              dark background */}
            <div className='page-link selected-link shrink-0'>
              <TransitionLink to='/about' className='inline-block'>
                <div className='link'>
                  <span className='flex items-center text-offwhite
                    mobile:text-[.9rem]
                    tablet:text-[.9rem]
                    laptop:text-[1rem]
                    laptop-lg:text-[1rem]
                    desktop:text-[1.1rem]'>
                    <SplitText text='More about me' id='animate-about-link' />
                    <span className='menu-icon-clip'>
                      <span className='menu-icon' id='animate-about-link'>
                        <RiArrowRightDownLine id='icon' className='fill-offwhite ml-1 text-2xl'/>
                      </span>
                    </span>
                  </span>
                </div>
              </TransitionLink>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default About
