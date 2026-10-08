//
import React from 'react'
// per-letter text split
import SplitText from '../../common/SplitText'

const TEXT = "I'm a UI/UX designer from the Philippines. For 3+ years I've designed web and mobile products, from user flows and wireframes to polished interfaces and the design systems behind them. I also write front-end code, so my designs are made to be built.";

// the landing page's introduction paragraph. its letters share the
// greeting's id so About.jsx's reveal runs through both
function AboutParagraph() {
  return (
    <>
      <div>
        {/* size: .about-paragraph (App.scss) */}
        <p className='about-paragraph flex flex-wrap text-offwhite
          mobile:leading-snug
          tablet:leading-tight
          laptop:leading-tight
          laptop-lg:leading-tight
          desktop:leading-tight'>
          <SplitText text={TEXT} id='animate-about' />
        </p>
      </div>
    </>
  )
}

export default AboutParagraph
