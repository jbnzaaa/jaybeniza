//
import React from 'react'
// per-letter text split
import SplitText from '../../common/SplitText'

// who I am and how I work - no figures here (the facts under it carry
// those, About.jsx) and nothing the hero already says
const TEXT = "I'm a UI/UX designer based in the Philippines, currently Mid-Level at PCI Innovations Tech Center. I work side by side with product, development and QA teams, walk stakeholders through the reasoning behind every decision, and stay with a design until it is built the way it was designed.";

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
