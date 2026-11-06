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
    dates: 'May 2024 – October 2026',
    bullets: [
      'Led end-to-end UI/UX design for 10 web and mobile products, including enhancement phases for 2 platforms first designed in 2023–2024, translating client requirements into user flows, prototypes, and development-ready interfaces delivered within 1–2 days of each request.',
      'Conducted moderated usability and role-based testing across 4 platforms, redesigning key workflows to reduce task steps by up to 60%.',
      'Designed and built front-end interfaces for 2 applications using Claude Code, supporting one production launch and one client pilot.',
      'Established a Figma design system with 40+ documented components and light/dark variants, standardizing UI patterns across 100+ screens.',
      'Delivered a 3D training game’s UI/UX design package, interactive prototype, and brand guidelines within 3 days, ahead of schedule.',
    ],
  },
  {
    id: 'junior',
    title: 'Junior UI/UX Designer',
    company: 'PCI Tech Center',
    dates: 'March 2023 – May 2024',
    bullets: [
      'Designed 1,000+ screens across 16 client products, producing wireframes, prototypes, and high-fidelity web and mobile interfaces.',
      'Collaborated with project managers and developers to clarify requirements, prepare implementation-ready specifications, and review developed interfaces.',
      'Delivered developer-ready handoffs within 1–2 days of requests; co-facilitated a UI/UX workshop introducing interns to design workflows and tools.',
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
                  text-copy
                  '>
                  {role.bullets.map((bullet, i) => (
                    <li key={i} className='entry-container m-0 flex gap-x-3'>
                      {/* the bullet marker, shown as the line reveals beside it */}
                      <span aria-hidden='true' className='shrink-0 text-muted'>•</span>
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
