//
import React from 'react'
// per-letter text split
import SplitText from '../../common/SplitText'

const TEXT = "I design digital products people understand at first glance, then help build them. Based in the Philippines, I bring 3+ years of UI/UX design and front-end development to every project, from design systems to shipped web applications.";

// the landing page's introduction paragraph. its letters share the
// greeting's id so About.jsx's scroll-coupled text fill runs through both
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
          <SplitText text={TEXT} id='animate-about-fill' />
        </p>
      </div>
    </>
  )
}

export default AboutParagraph
