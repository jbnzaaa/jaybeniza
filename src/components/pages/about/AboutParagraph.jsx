//
import React from 'react'
// per-letter text split
import SplitText from '../../common/SplitText'

const TEXT = 'A UI/UX designer and front-end developer from the Philippines with 3+ years building design systems and shipping web applications — combining user-centered design with hands-on development, accelerated by Figma AI and Claude Code.';

function AboutParagraph() {
  return (
    <>
      <div>
        <p className='about-paragraph flex flex-wrap
          mobile:text-[.9rem] mobile:indent-10
          tablet:text-[.9rem] tablet:indent-10
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
