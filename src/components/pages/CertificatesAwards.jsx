//
import React, { useEffect } from 'react'
// scroll reveal
import { scrollReveal, scrollRevealSequence } from '../../utils/scrollReveal'
// per-letter text split
import SplitText from '../common/SplitText'
// certificate files
import certDataAnalytics from '../../assets/certificates-and-awards/Data Analytics Level III Training Program.jpg'
import certMsUxDesign from '../../assets/certificates-and-awards/Microsoft - UX Design.pdf'
import certIbmGenAiFundamentals from '../../assets/certificates-and-awards/IBM - Generative AI Fundamentals.pdf'

// newest first. `file` is what the row's link opens
const ITEMS = [
  { id: 'data-analytics', title: 'Data Analytics Level III Training Program', year: '2026', file: certDataAnalytics },
  { id: 'ms-ux-design', title: 'Microsoft UX Design Professional Certificate', year: '2026', file: certMsUxDesign },
  { id: 'ibm-gen-ai-fundamentals', title: 'IBM Generative AI Fundamentals Specialization', year: '2025', file: certIbmGenAiFundamentals },
  { id: 'award-innovation', title: 'Innovations in Action Award', year: '2025', file: null },
  { id: 'award-agility', title: 'Agility Award', year: '2025', file: null },
  { id: 'agile-101-scrum', title: 'Agile 101: Scrum Framework Fundamentals', year: '2024', file: null },
  { id: 'civil-service-eligibility', title: 'Civil Service Honor Graduate Eligibility', year: '2023', file: null },
];

/**
 * Certificates and awards on the About page: one plain list. Each row is
 * a title on the left and its year on the right, with a rule under it.
 */
function CertificatesAwards() {
  useEffect(() => {
    // section heading reveal
    const heading = scrollReveal('#animate-certificates-header', { y: 0, stagger: .02, ease: 'power1.in' });

    // each row gets its OWN trigger: its text reveals letter by letter,
    // then the rule under it draws across, as THAT row scrolls into view
    const rows = ITEMS.map(({ id }) => scrollRevealSequence([
      { targets: `#animate-cert-${id}`, vars: { y: 0, stagger: .02, ease: 'power1.in' } },
      { targets: `#cert-line-${id}`, vars: { width: '100%', ease: 'power1.in' }, position: '<' },
    ], { trigger: `#cert-row-${id}` }));

    return () => {
      heading.kill();
      rows.forEach((row) => row.kill());
    };
  }, []);

  return (
    <>
      <div id='certificates-awards'>
        <div className='
          mobile:py-16 mobile:px-[.9rem]
          tablet:py-16 tablet:px-[1rem]
          laptop:py-20 laptop:px-[2rem]
          laptop-lg:py-24 laptop-lg:px-[3rem]
          desktop:py-28 desktop:px-[3rem]'>
          {/* section header */}
          <div className='section-header-container flex flex-wrap font-flexible font-medium leading-none
            mobile:mb-2 mobile:text-[8vw]
            tablet:mb-4 tablet:text-[6vw]
            laptop:mb-4 laptop:text-[4vw]
            laptop-lg:mb-4 laptop-lg:text-[3.6vw]
            desktop:mb-6 desktop:text-[3.6vw]'>
            <SplitText text='Certificates & Awards' id='animate-certificates-header' />
          </div>
          {/* rows - title, year, and a rule under each */}
          <ul data-no-hover-roll>
            {ITEMS.map((item) => (
              <li className='m-0' id={`cert-row-${item.id}`} key={item.id}>
                <div className='flex justify-between items-start gap-x-5
                  mobile:py-4 mobile:text-[1rem]
                  tablet:py-5 tablet:text-[1.3rem]
                  laptop:py-6 laptop:text-[1.4rem]
                  laptop-lg:py-6 laptop-lg:text-[1.4rem]
                  desktop:py-7 desktop:text-[1.4rem]'>
                  <p className='entry-line font-medium'>
                    {item.file ? (
                      <a href={item.file} target='_blank' rel='noreferrer'>
                        <SplitText text={item.title} id={`animate-cert-${item.id}`} by='word' />
                      </a>
                    ) : (
                      <SplitText text={item.title} id={`animate-cert-${item.id}`} by='word' />
                    )}
                  </p>
                  <p className='entry-line text-muted shrink-0'>
                    <SplitText text={item.year} id={`animate-cert-${item.id}`} />
                  </p>
                </div>
                <div id={`cert-line-${item.id}`}/>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default CertificatesAwards
