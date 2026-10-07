//
import React from 'react'
// per-letter text split
import SplitText from '../../common/SplitText'

const TEXT = 'A UI/UX designer from the Philippines with 3+ years designing web and mobile products. I build the design systems behind them, present the reasoning to stakeholders, and carry the work into front-end code so what ships matches what was designed.';

function AboutParagraph() {
  return (
    <>
      <div>
        <p className='about-paragraph flex flex-wrap
          mobile:text-[1rem] mobile:leading-snug mobile:indent-10
          tablet:text-[1.5rem] tablet:leading-tight tablet:indent-16
          laptop:text-[2rem] laptop:leading-tight laptop:indent-20
          laptop-lg:text-[2.1rem] laptop-lg:leading-tight laptop-lg:indent-20
          desktop:text-[3rem] desktop:leading-tight desktop:indent-20'>
          <SplitText text={TEXT} id='animate-about' />
        </p>
      </div>
    </>
  )
}

export default AboutParagraph
