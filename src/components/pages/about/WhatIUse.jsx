<<<<<<< HEAD
//
import React, { useEffect } from 'react'
// scroll reveal
import { scrollRevealSequence } from '../../../utils/scrollReveal'

const DESCRIPTION_WORDS = [
  "I've", 'been', 'utilizing', 'these', 'skills', 'in', 'designing,', 'prototyping,',
  'and', 'shipping', 'user-centered', 'digital', 'products', '—', 'from', 'wireframes',
  'to', 'production-ready', 'front-end.',
];

function WhatIUse() {
  useEffect(() => {
    // line fully expands before the title/description text reveals, and
    // this reveal is tied to THIS row's own position, not the whole
    // (much taller) About section, so it plays while actually visible
    const reveal = scrollRevealSequence([
      { targets: '#what-i-use-line', vars: { width: '100%', ease: 'power1.in' } },
      { targets: '#animate-whatiuse', vars: { y: 0, stagger: .04, ease: 'power1.in' } },
    ], { trigger: '#what-i-use-line' });
    return () => reveal.kill();
=======
// 
import React, { useEffect } from 'react'
// GSAP
import gsap from 'gsap' 
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function WhatIUse() {
  useEffect(() => {
    // line animation
    gsap.to('#what-i-use-line', {
      duration: 1,
      // delay: 3,
      width: '100%',
      ease: 'power1.in',
      scrollTrigger: { 
        trigger: '#what-i-use-line', 
        start: 'bottom 100%'
      }
    });
>>>>>>> origin/master
  }, []);

  return (
    <>
      <div className='col-span-8' id='what-i-use-line'/>
      <li className='col-span-8 grid py-6
        mobile:grid-cols-1 mobile:h-full
        tablet:grid-cols-1 tablet:h-full
        laptop:grid-cols-2 laptop:h-full
        laptop-lg:grid-cols-2 laptop-lg:h-full
        desktop:grid-cols-2 desktop:h-full'>
        {/* title */}
        <div className='stack-container col-span-1 flex flex-wrap
          mobile:h-[25px] mobile:mb-1 mobile:text-[1rem]
          tablet:h-[30px] tablet:text-[1.3rem]
          laptop:h-[30px] laptop:text-[1.4rem]
          laptop-lg:h-[30px] laptop-lg:text-[1.4rem]
          desktop:h-[30px] desktop:text-[1.4em]'>
          <span className='stack-context font-medium
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[50px]
            laptop-lg:translate-y-[50px]
            desktop:translate-y-[50px]'
<<<<<<< HEAD
            id='animate-whatiuse'>
=======
            id='animate-about'>
>>>>>>> origin/master
            What
          </span>
          <span className='stack-context font-medium
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[50px]
            laptop-lg:translate-y-[50px]
            desktop:translate-y-[50px]'
<<<<<<< HEAD
            id='animate-whatiuse'>
=======
            id='animate-about'>
>>>>>>> origin/master
            I
          </span>
          <span className='stack-context font-medium
            mobile:translate-y-[25px]
            tablet:translate-y-[30px]
            laptop:translate-y-[50px]
            laptop-lg:translate-y-[50px]
            desktop:translate-y-[50px]'
<<<<<<< HEAD
            id='animate-whatiuse'>
=======
            id='animate-about'>
>>>>>>> origin/master
            Use?
          </span>
        </div>
        {/* description */}
        <div className='col-span-1 flex flex-wrap'>
<<<<<<< HEAD
          {DESCRIPTION_WORDS.map((word, i) => (
            <div className='stacks h-[30px]
              mobile:text-[.9rem]
              tablet:text-[.9rem]
              laptop:text-[1rem]
              laptop-lg:text-[1rem]
              desktop:text-[1.1rem]'
              key={i}>
              <p className='stack-context
                mobile:translate-y-[28px]
                tablet:translate-y-[30px]
                laptop:translate-y-[30px]
                laptop-lg:translate-y-[30px]
                desktop:translate-y-[30px]'
                id='animate-whatiuse'>
                {word}
              </p>
            </div>
          ))}
=======
          <div className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]' 
              id='animate-about'>
              I've
            </p>
          </div>
          <div className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]' 
              id='animate-about'>
              been
            </p>
          </div>
          <div className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]' 
              id='animate-about'>
              utilizing
            </p>
          </div>
          <div className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]' 
              id='animate-about'>
              in
            </p>
          </div>
          <div className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]' 
              id='animate-about'>
              producing
            </p>
          </div>
          <div className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]' 
              id='animate-about'>
              ui
            </p>
          </div>
          <div className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]' 
              id='animate-about'>
              design,
            </p>
          </div>
          <div className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]' 
              id='animate-about'>
              wireframing,
            </p>
          </div>
          <div className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]' 
              id='animate-about'>
              prototyping,
            </p>
          </div>
          <div className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]' 
              id='animate-about'>
              visual design,
            </p>
          </div>
          <div className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]' 
              id='animate-about'>
              and
            </p>
          </div>
          <div className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]' 
              id='animate-about'>
              develop
            </p>
          </div>
          <div className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]' 
              id='animate-about'>
              website.
            </p>
          </div>
          <div className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]' 
              id='animate-about'>
              The
            </p>
          </div>
          <div className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]' 
              id='animate-about'>
              tools
            </p>
          </div>
          <div className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]' 
              id='animate-about'>
              and
            </p>
          </div>
          <div className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]' 
              id='animate-about'>
              technologies
            </p>
          </div>
          <div className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]' 
              id='animate-about'>
              listed
            </p>
          </div>
          <div className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]' 
              id='animate-about'>
              below
            </p>
          </div>
          <div className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]' 
              id='animate-about'>
              are
            </p>
          </div>
          <div className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]' 
              id='animate-about'>
              those
            </p>
          </div>
          <div className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]' 
              id='animate-about'>
              that
            </p>
          </div>
          <div className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]' 
              id='animate-about'>
              I
            </p>
          </div>
          <div className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]' 
              id='animate-about'>
              have
            </p>
          </div>
          <div className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]' 
              id='animate-about'>
              used
            </p>
          </div>
          <div className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]' 
              id='animate-about'>
              and
            </p>
          </div>
          <div className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]' 
              id='animate-about'>
              am
            </p>
          </div>
          <div className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]' 
              id='animate-about'>
              familiar
            </p>
          </div>
          <div className='stacks h-[30px]
            mobile:text-[.9rem]
            tablet:text-[.9rem]
            laptop:text-[1rem]
            laptop-lg:text-[1rem]
            desktop:text-[1.1rem]'>
            <p className='stack-context
              mobile:translate-y-[28px]
              tablet:translate-y-[30px]
              laptop:translate-y-[30px]
              laptop-lg:translate-y-[30px]
              desktop:translate-y-[30px]' 
              id='animate-about'>
              with.
            </p>
          </div>
>>>>>>> origin/master
        </div>
      </li>
    </>
  )
}

<<<<<<< HEAD
export default WhatIUse
=======
export default WhatIUse
>>>>>>> origin/master
