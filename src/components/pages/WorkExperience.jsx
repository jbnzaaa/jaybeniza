//
import React, { useEffect } from 'react'
// scroll reveal
import { scrollReveal, scrollRevealCards } from '../../utils/scrollReveal'
// per-letter text split
import SplitText from '../common/SplitText'

const ROLES = [
  {
    id: 'mid',
    title: 'Mid-Level UI/UX Designer',
    company: 'PCI Innovations Tech Center',
    dates: 'May 2024 — Present',
    bullets: [
      'Designed across 8 projects alongside product, development, and QA teams, presenting solutions and design rationale to stakeholders.',
      'Created and maintain a project-wide design system of 15+ reusable components that keeps interfaces consistent as products scale.',
      'Built 2 end-to-end web applications with Claude Code and front-end technologies, shortening development cycles.',
    ],
  },
  {
    id: 'junior',
    title: 'Junior UI/UX Designer',
    company: 'PCI Innovations Tech Center',
    dates: 'March 2023 — May 2024',
    bullets: [
      'Produced wireframes, prototypes, and high-fidelity interfaces for 6 web and mobile projects.',
      'Managed asset libraries of 15+ reusable components in structured, version-controlled shared directories.',
      'Improved layout consistency, cutting front-end implementation bugs by 70% before deployment.',
    ],
  },
];

/**
 * Work experience on the About page: a black section with one card per
 * role, side by side from laptop width up and stacked below that.
 */
function WorkExperience() {
  useEffect(() => {
    // section heading reveal
    const heading = scrollReveal('#animate-work-header', { y: 0, stagger: .02, ease: 'power1.in' });

    // the cards rise in one after another, each followed by its text
    const cards = scrollRevealCards(ROLES.map((role) => ({
      card: `#work-card-${role.id}`,
      text: `#animate-work-${role.id}`,
    })), { group: '#work-cards' });

    return () => {
      heading.kill();
      cards.kill();
    };
  }, []);

  return (
    <>
      <div id='work-experience' data-section-reveal className='bg-black'>
        <div className='flex flex-col justify-between min-h-screen-safe
          mobile:py-16 mobile:px-[.9rem]
          tablet:py-16 tablet:px-[1rem]
          laptop:py-20 laptop:px-[2rem]
          laptop-lg:py-24 laptop-lg:px-[3rem]
          desktop:py-28 desktop:px-[3rem]'>
          {/* section header */}
          <div className='section-header-container flex flex-wrap font-flexible font-medium leading-none text-offwhite
            mobile:mb-6 mobile:text-[8vw]
            tablet:mb-8 tablet:text-[6vw]
            laptop:mb-10 laptop:text-[4vw]
            laptop-lg:mb-10 laptop-lg:text-[3.6vw]
            desktop:mb-12 desktop:text-[3.6vw]'>
            <SplitText text='Work Experience' id='animate-work-header' />
          </div>
          {/* one card per role */}
          <ul id='work-cards' className='grid gap-5
            mobile:grid-cols-1
            tablet:grid-cols-1
            laptop:grid-cols-2
            laptop-lg:grid-cols-2
            desktop:grid-cols-2'>
            {ROLES.map((role) => (
              <li className='reveal-card overflow-hidden bg-offwhite m-0'
                id={`work-card-${role.id}`} key={role.id}>
                <div className='reveal-card-inner h-full flex flex-col
                  mobile:p-5 mobile:gap-y-8
                  tablet:p-8 tablet:gap-y-10
                  laptop:p-8 laptop:gap-y-12
                  laptop-lg:p-10 laptop-lg:gap-y-14
                  desktop:p-12 desktop:gap-y-16'>
                {/* role meta */}
                <div className='entry-container'>
                  <p className='entry-line font-medium
                    mobile:text-[1.1rem]
                    tablet:text-[1.4rem]
                    laptop:text-[1.4rem]
                    laptop-lg:text-[1.6rem]
                    desktop:text-[1.8rem]'>
                    <SplitText text={role.title} id={`animate-work-${role.id}`} />
                  </p>
                  <p className='entry-line font-regular mt-1
                    mobile:text-[.9rem]
                    tablet:text-[.9rem]
                    laptop:text-[1rem]
                    laptop-lg:text-[1rem]
                    desktop:text-[1rem]'>
                    <SplitText text={role.company} id={`animate-work-${role.id}`} />
                  </p>
                  <p className='entry-line font-regular text-muted
                    mobile:text-[.8rem]
                    tablet:text-[.8rem]
                    laptop:text-[.9rem]
                    laptop-lg:text-[.9rem]
                    desktop:text-[.9rem]'>
                    <SplitText text={role.dates} id={`animate-work-${role.id}`} />
                  </p>
                </div>
                {/* bullets */}
                <ul className='flex flex-col gap-y-4
                  mobile:text-[.9rem]
                  tablet:text-[.9rem]
                  laptop:text-[1rem]
                  laptop-lg:text-[1rem]
                  desktop:text-[1.1rem]'>
                  {role.bullets.map((bullet, i) => (
                    <li key={i} className='entry-container m-0'>
                      <p className='entry-line text-muted'>
                        <SplitText text={bullet} id={`animate-work-${role.id}`} by='word' />
                      </p>
                    </li>
                  ))}
                </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default WorkExperience
