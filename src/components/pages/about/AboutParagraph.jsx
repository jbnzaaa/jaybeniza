//
import React from 'react'
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const WORDS = [
  'A', 'UI/UX', 'designer', 'and', 'front-end', 'developer', 'from', 'the',
  'Philippines', 'with', '3+', 'years', 'building', 'design', 'systems', 'and',
  'shipping', 'web', 'applications', '—', 'combining', 'user-centered', 'design',
  'with', 'hands-on', 'development,', 'accelerated', 'by', 'Figma', 'AI', 'and',
  'Claude', 'Code.',
];

function AboutParagraph() {
  return (
    <>
    {/* animation broken */}
      <div>
        <div className='flex flex-wrap
          mobile:text-[.9rem]
          tablet:text-[.9rem]
          laptop:text-[2rem] laptop:leading-tight
          laptop-lg:text-[2.1rem] laptop-lg:leading-tight
          desktop:text-[3rem] desktop:leading-tight'>
          {WORDS.map((word, i) => (
            <div className='content-container' key={i}>
              <p className={`about-paragraph
                ${i === 0 ? 'mobile:indent-10' : ''} mobile:translate-y-[20px] mobile:mr-[5px]
                ${i === 0 ? 'tablet:indent-10' : ''} tablet:translate-y-[30px] tablet:mr-[8px]
                ${i === 0 ? 'laptop:indent-20' : ''} laptop:translate-y-[60px] laptop:mr-[15px]
                ${i === 0 ? 'laptop-lg:indent-20' : ''} laptop-lg:translate-y-[60px] laptop-lg:mr-[18px]
                ${i === 0 ? 'desktop:indent-20' : ''} desktop:translate-y-[60px] desktop:mr-[20px]`}
                id='animate-about'>
                  {word}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default AboutParagraph
