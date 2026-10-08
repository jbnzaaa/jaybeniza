//
import React, { useEffect } from 'react'
// scroll reveal
import { scrollRevealCards } from '../../utils/scrollReveal'
// section label
import Tag from '../common/Tag'
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

    // the cards rise in one after another, each followed by its text
    const cards = scrollRevealCards(ROLES.map((role) => ({
      card: `#work-card-${role.id}`,
      text: `#animate-work-${role.id}`,
    })), { group: '#work-cards' });

    return () => {
      cards.kill();
    };
  }, []);

  return (
    <>
      <div id='work-experience' className='theme-light'>
        <div className='
          mobile:py-16 mobile:px-[1rem]
          tablet:py-16 tablet:px-[1rem]
          laptop:py-20 laptop:px-[2rem]
          laptop-lg:py-24 laptop-lg:px-[3rem]
          desktop:py-28 desktop:px-[3rem]'>
          <div className='mobile:mb-6 tablet:mb-8 laptop:mb-8 laptop-lg:mb-10 desktop:mb-10'>
            <Tag label='Experience' id='animate-work-tag' />
          </div>
          {/* one card per role */}
          <ul id='work-cards' className='grid gap-6
            mobile:grid-cols-1
            tablet:grid-cols-1
            laptop:grid-cols-2
            laptop-lg:grid-cols-2
            desktop:grid-cols-2'>
            {ROLES.map((role) => (
              <li className='reveal-card theme-dark overflow-hidden bg-card m-0'
                id={`work-card-${role.id}`} key={role.id}>
                <div className='reveal-card-inner h-full flex flex-col
                  mobile:p-6 mobile:gap-y-8
                  tablet:p-8 tablet:gap-y-10
                  laptop:p-8 laptop:gap-y-12
                  laptop-lg:p-10 laptop-lg:gap-y-12
                  desktop:p-12 desktop:gap-y-16'>
                {/* role meta */}
                <div className='entry-container'>
                  <p className='entry-line font-medium
                    text-subtitle
                    '>
                    <SplitText text={role.title} id={`animate-work-${role.id}`} />
                  </p>
                  <p className='entry-line font-regular mt-1
                    text-body
                    '>
                    <SplitText text={role.company} id={`animate-work-${role.id}`} />
                  </p>
                  <p className='entry-line font-regular text-muted
                    text-caption
                    '>
                    <SplitText text={role.dates} id={`animate-work-${role.id}`} />
                  </p>
                </div>
                {/* bullets */}
                <ul className='flex flex-col gap-y-4
                  text-body
                  '>
                  {role.bullets.map((bullet, i) => (
                    <li key={i} className='entry-container m-0'>
                      <p className='entry-line text-muted'>
                        <SplitText text={bullet} id={`animate-work-${role.id}`} by='word' sentence />
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
