//
import React, { useEffect } from 'react'
// scroll reveal
import { scrollReveal, scrollRevealSequence } from '../../utils/scrollReveal'
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

function WorkExperience() {
  useEffect(() => {
    // section heading reveal
    const heading = scrollReveal('#animate-work-header', { y: 0, stagger: .02, ease: 'power1.in' });

    // each role gets its OWN trigger, tied to its own position, so its line
    // fully expands and then its content reveals as THAT row scrolls into
    // view - not all at once when the section's top is first reached
    const rows = ROLES.map((role) => scrollRevealSequence([
      { targets: `#work-line-${role.id}`, vars: { width: '100%', ease: 'power1.in' } },
      { targets: `#animate-work-${role.id}`, vars: { y: 0, stagger: .02, ease: 'power1.in' } },
    ], { trigger: `#work-line-${role.id}` }));

    return () => {
      heading.kill();
      rows.forEach((r) => r.kill());
    };
  }, []);

  return (
    <>
      <div id='work-experience'>
        <div className='grid grid-cols-8 gap-0
          mobile:py-16 mobile:px-[.9rem]
          tablet:py-16 tablet:px-[1rem]
          laptop:py-16 laptop:px-[2rem]
          laptop-lg:py-16 laptop-lg:px-[3rem]
          desktop:py-36 desktop:px-[3rem]'>
          {/* section header */}
          <section className='col-span-8'>
            <div className='section-header-container flex flex-wrap font-flexible font-medium leading-none tracking-tighter
              mobile:min-h-[35px] mobile:mb-6 mobile:text-[13vw]
              tablet:min-h-[60px] tablet:mb-8 tablet:text-[12vw]
              laptop:min-h-[90px] laptop:mb-10 laptop:text-[11vw]
              laptop-lg:min-h-[100px] laptop-lg:mb-10 laptop-lg:text-[11vw]
              desktop:min-h-[110px] desktop:mb-12 desktop:text-[11vw]'>
              <SplitText text='Work Experience' id='animate-work-header' />
            </div>
          </section>
          {/* roles */}
          <section className='col-span-8'>
            <ul className='grid grid-cols-8'>
              {ROLES.map((role) => (
                <React.Fragment key={role.id}>
                  <div className='col-span-8' id={`work-line-${role.id}`} />
                  <li className='col-span-8 grid py-6 gap-y-4
                    mobile:grid-cols-1
                    tablet:grid-cols-1
                    laptop:grid-cols-2
                    laptop-lg:grid-cols-2
                    desktop:grid-cols-2'>
                    {/* role meta */}
                    <div className='entry-container col-span-1
                      mobile:text-[1rem] mobile:mb-2
                      tablet:text-[1.3rem] tablet:mb-2
                      laptop:text-[1.4rem]
                      laptop-lg:text-[1.4rem]
                      desktop:text-[1.4rem]'>
                      <p className='entry-line font-medium'>
                        <SplitText text={role.title} id={`animate-work-${role.id}`} />
                      </p>
                      <p className='entry-line font-regular
                        mobile:text-[.9rem]
                        tablet:text-[.9rem]
                        laptop:text-[1rem]
                        laptop-lg:text-[1rem]
                        desktop:text-[1rem]'>
                        <SplitText text={role.company} id={`animate-work-${role.id}`} />
                      </p>
                      <p className='entry-line font-regular text-[#7a7a7a]
                        mobile:text-[.8rem]
                        tablet:text-[.8rem]
                        laptop:text-[.9rem]
                        laptop-lg:text-[.9rem]
                        desktop:text-[.9rem]'>
                        <SplitText text={role.dates} id={`animate-work-${role.id}`} />
                      </p>
                    </div>
                    {/* bullets */}
                    <ul className='col-span-1
                      mobile:text-[.9rem]
                      tablet:text-[.9rem]
                      laptop:text-[1rem]
                      laptop-lg:text-[1rem]
                      desktop:text-[1.1rem]'>
                      {role.bullets.map((bullet, i) => (
                        <li key={i} className='entry-container mb-3'>
                          <p className='entry-line text-muted'>
                            <SplitText text={bullet} id={`animate-work-${role.id}`} by='word' />
                          </p>
                        </li>
                      ))}
                    </ul>
                  </li>
                </React.Fragment>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  )
}

export default WorkExperience
