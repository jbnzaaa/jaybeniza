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
    title: 'Mid UI/UX Designer',
    company: 'PCI Tech Center',
    dates: 'May 2024 - October 2026',
    bullets: [
      'Led end-to-end UI/UX design for 7 web and mobile projects, translating client requirements and usability testing findings into user flows, prototypes, and high-fidelity interfaces; used tester feedback to simplify a core flow from 5 steps to 3.',
      'Designed and built 3 web and mobile applications using Claude Code, collaborating with developers to resolve technical constraints and reducing feature development time by approximately 50%.',
      'Initiated centralized Figma design systems with 40+ reusable components after identifying inconsistent component use, standardizing UI patterns across projects.',
      'Turned around client-requested design revisions within 1-2 days, working closely with project managers to update web interfaces and hand them off to developers for implementation.',
    ],
  },
  {
    id: 'junior',
    title: 'Junior UI/UX Designer',
    company: 'PCI Tech Center',
    dates: 'March 2023 - May 2024',
    bullets: [
      'Designed 75+ screens and 25 user flows across 7 projects (5 web platforms, 2 mobile apps), delivering wireframes, prototypes, and high-fidelity interfaces, with 3 platforms launched to production.',
      'Collaborated with project managers and developers to clarify requirements, prepare implementation-ready design specifications, and review developed interfaces for visual consistency.',
      'Delivered developer-ready design handoffs within 1-2 days of requests, supporting Agile sprint delivery and contributing to a team that achieved 100% sprint completion.',
      "Contributed to a UI/UX knowledge-sharing workshop for the company's interns.",
    ],
  },
];

/**
 * Professional experience on the About page: a black section with one card per
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
            <Tag label='Professional Experience' id='animate-work-tag' />
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
                  tablet:p-6 tablet:gap-y-10
                  laptop:p-6 laptop:gap-y-12
                  laptop-lg:p-6 laptop-lg:gap-y-12
                  desktop:p-6 desktop:gap-y-16'>
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
                  text-caption
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
