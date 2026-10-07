//
import React from 'react'
// per-letter text split
import SplitText from '../../common/SplitText'

const TEXT = 'I design and build digital products with a focus on clarity, function, and user experience. Based in the Philippines, I bring 3+ years of UI/UX design and front-end development experience to every project, from user flows and design systems to responsive, production-ready interfaces.';

// the landing page's introduction paragraph. its letters share the
// greeting's id so About.jsx's reveal runs through both
function AboutParagraph() {
  return (
    <>
      <div>
        <p className='about-paragraph flex flex-wrap text-offwhite
          mobile:text-[1.05rem] mobile:leading-snug
          tablet:text-[1.6rem] tablet:leading-tight
          laptop:text-[2.1rem] laptop:leading-tight
          laptop-lg:text-[2.5rem] laptop-lg:leading-tight
          desktop:text-[3rem] desktop:leading-tight'>
          <SplitText text={TEXT} id='animate-about' />
        </p>
      </div>
    </>
  )
}

export default AboutParagraph
