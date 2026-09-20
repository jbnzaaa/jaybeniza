//
import React, { useEffect } from 'react'
// scroll reveal
import { scrollReveal, scrollRevealSequence } from '../../utils/scrollReveal'

const ROLES = [
  {
    id: 'mid',
    title: 'Mid UI/UX Designer',
    company: 'PCI Innovations Tech Center',
    dates: 'May 2024 — Present',
    bullets: [
      'Collaborated with product, development, and QA teams across 8 projects, presenting UX/UI solutions and design rationale to stakeholders.',
      'Created and managed a project-wide design system of 15+ reusable UI components, ensuring visual consistency and scalable design.',
      'Leveraged Claude Code and front-end technologies to develop 2 end-to-end web applications, shortening development cycles.',
    ],
  },
  {
    id: 'junior',
    title: 'Junior UI/UX Designer',
    company: 'PCI Innovations Tech Center',
    dates: 'March 2023 — May 2024',
    bullets: [
      'Developed wireframes, prototypes, and high-fidelity interfaces for 6 web and mobile projects.',
      'Governed localized asset libraries of 15+ reusable UI components and structured version-controlled shared directories.',
      'Improved layout consistency and cut front-end implementation bugs by 70% prior to deployment.',
    ],
  },
];

function WorkExperience() {
  useEffect(() => {
    // section heading reveal
    const heading = scrollReveal('#animate-work-header', { y: 0, stagger: .05, ease: 'power1.in' });

    // each role gets its OWN trigger, tied to its own position, so its line
    // fully expands and then its content reveals as THAT row scrolls into
    // view - not all at once when the section's top is first reached
    const rows = ROLES.map((role) => scrollRevealSequence([
      { targets: `#work-line-${role.id}`, vars: { width: '100%', ease: 'power1.in' } },
      { targets: `#animate-work-${role.id}`, vars: { y: 0, opacity: 1, stagger: .04, ease: 'power1.in' } },
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
            <div className='section-header-container flex flex-wrap
              mobile:h-[35px] mobile:mb-6 mobile:text-[2rem]
              tablet:h-[60px] tablet:mb-8 tablet:text-[3rem]
              laptop:h-[90px] laptop:mb-10 laptop:text-[5rem]
              laptop-lg:h-[100px] laptop-lg:mb-10 laptop-lg:text-[5.3rem]
              desktop:h-[110px] desktop:mb-12 desktop:text-[5.5rem]'>
              <span className='section-header-word font-lexend font-medium leading-none tracking-tighter
                mobile:translate-y-[35px]
                tablet:translate-y-[80px]
                laptop:translate-y-[110px]
                laptop-lg:translate-y-[110px]
                desktop:translate-y-[120px]'
                id='animate-work-header'>
                Work
              </span>
              <span className='section-header-word font-lexend font-medium leading-none tracking-tighter
                mobile:translate-y-[35px]
                tablet:translate-y-[80px]
                laptop:translate-y-[110px]
                laptop-lg:translate-y-[110px]
                desktop:translate-y-[120px]'
                id='animate-work-header'>
                Experience
              </span>
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
                      <p className='entry-line opacity-0 font-medium
                        mobile:translate-y-[25px]
                        tablet:translate-y-[30px]
                        laptop:translate-y-[50px]
                        laptop-lg:translate-y-[50px]
                        desktop:translate-y-[50px]'
                        id={`animate-work-${role.id}`}>
                        {role.title}
                      </p>
                      <p className='entry-line opacity-0 font-regular
                        mobile:text-[.9rem] mobile:translate-y-[25px]
                        tablet:text-[.9rem] tablet:translate-y-[30px]
                        laptop:text-[1rem] laptop:translate-y-[50px]
                        laptop-lg:text-[1rem] laptop-lg:translate-y-[50px]
                        desktop:text-[1rem] desktop:translate-y-[50px]'
                        id={`animate-work-${role.id}`}>
                        {role.company}
                      </p>
                      <p className='entry-line opacity-0 font-regular text-[#7a7a7a]
                        mobile:text-[.8rem] mobile:translate-y-[25px]
                        tablet:text-[.8rem] tablet:translate-y-[30px]
                        laptop:text-[.9rem] laptop:translate-y-[50px]
                        laptop-lg:text-[.9rem] laptop-lg:translate-y-[50px]
                        desktop:text-[.9rem] desktop:translate-y-[50px]'
                        id={`animate-work-${role.id}`}>
                        {role.dates}
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
                          <p className='entry-line opacity-0
                            mobile:translate-y-[30px]
                            tablet:translate-y-[30px]
                            laptop:translate-y-[30px]
                            laptop-lg:translate-y-[30px]
                            desktop:translate-y-[30px]'
                            id={`animate-work-${role.id}`}>
                            {bullet}
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
