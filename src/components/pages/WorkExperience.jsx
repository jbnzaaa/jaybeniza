//
import React, { useEffect } from 'react'
// scroll reveal
import { scrollRevealCards } from '../../utils/scrollReveal'
// section label
import Tag from '../common/Tag'
// per-letter text split
import SplitText from '../common/SplitText'
// a gif, drawn in halftone dots
import HalftoneGif from '../common/HalftoneGif'

const TENOR = 'https://media1.tenor.com/m/';

const ROLES = [
  {
    id: 'mid',
    title: 'Mid UI/UX Designer',
    company: 'PCI Tech Center',
    dates: 'May 2024 – October 2026',
    // a clip beside it, in halftone: stepping up
    gif: TENOR + 'vPeTGrwEZrEAAAAM/iron-man-armor.gif',
    alt: 'Iron Man suiting up in the Mark 5 armor',
    bullets: [
      'Led end-to-end UI/UX design for 10 web and mobile products, including enhancement phases for 2 platforms first designed in 2023–2024, turning client requirements into user flows, prototypes, and developer-ready interfaces within 1–2 days of each request.',
      'Ran moderated usability and role-based testing across 4 platforms and redesigned key workflows to cut task steps by up to 60%, including class setup reduced from 5 steps to 2.',
      'Designed and built front-end interfaces for 2 applications with Claude Code, supporting one production launch and one client pilot with teachers and school administrators.',
      'Built a Figma design system from scratch with 40+ documented components in light and dark modes, standardizing UI patterns across 100+ screens.',
      'Delivered 100+ wireframe screens as one interactive prototype, plus brand guidelines, for a 3D election training game within 3 days, 1–2 days ahead of the deadline.',
    ],
  },
  {
    id: 'junior',
    title: 'Junior UI/UX Designer',
    company: 'PCI Tech Center',
    dates: 'March 2023 – May 2024',
    // putting in the work
    gif: TENOR + 'LiDD5Bl5AXEAAAAM/spongebob-the.gif',
    alt: 'SpongeBob writing his essay',
    bullets: [
      'Designed 1,000+ screens across 16 client products, from wireframes and prototypes to high-fidelity web and mobile interfaces.',
      'Redesigned an accreditation platform end to end, with 100+ screens across its public website and workspaces for 9 user roles.',
      'Designed 3 government science education products: a learning portal built on 22 reusable components, 5 mobile courseware lessons, and 6 biology modules for a virtual laboratory.',
      'Took each courseware lesson from storyboard to working prototype in 2–3 days, and delivered developer-ready handoffs within 1–2 days of requests.',
      'Worked with project managers and developers to clarify requirements, write implementation-ready specs, and review built interfaces; co-facilitated a UI/UX workshop introducing interns to design workflows and tools.',
    ],
  },
];

/**
 * Professional experience on the About page: one card per role, a row
 * each, one under another with the same gap between them. In each card,
 * the role and what was done in it on the left, and on the right a clip
 * in halftone, its side of the card edge to edge (under the text below
 * laptop width).
 */
function WorkExperience({ dark = false }) {
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
      <div id='work-experience' className={dark ? 'bg-surface' : 'theme-light'}>
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
          {/* (every row as tall as the tallest, so the cards match) */}
          <ul id='work-cards' className='grid grid-cols-1 auto-rows-fr gap-6'>
            {ROLES.map((role) => (
              <li className='reveal-card theme-dark overflow-hidden bg-card m-0'
                id={`work-card-${role.id}`} key={role.id}>
                <div className='reveal-card-inner h-full grid
                  mobile:grid-cols-1 tablet:grid-cols-1 laptop:grid-cols-2 laptop-lg:grid-cols-2 desktop:grid-cols-2'>
                {/* the role at the top, what was done in it at the foot */}
                <div className='flex flex-col justify-between
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
                {/* the clip, its side of the card edge to edge */}
                <div className='work-gif relative bg-black mobile:aspect-[4/3] tablet:aspect-[16/9]'>
                  <HalftoneGif src={role.gif} alt={role.alt} />
                </div>
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
