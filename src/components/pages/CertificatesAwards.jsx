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

const ITEMS = [
  { id: 'data-analytics', title: 'Data Analytics Level III Training Program', year: '2026', file: certDataAnalytics, type: 'image' },
  { id: 'ms-ux-design', title: 'Microsoft UX Design Professional Certificate', year: '2026', file: certMsUxDesign, type: 'pdf' },
  { id: 'ibm-gen-ai-fundamentals', title: 'IBM Generative AI Fundamentals Specialization', year: '2025', file: certIbmGenAiFundamentals, type: 'pdf' },
  { id: 'award-innovation', title: 'Innovations in Action Award', year: '2025', file: null, type: null },
  { id: 'award-agility', title: 'Agility Award', year: '2025', file: null, type: null },
  { id: 'agile-101-scrum', title: 'Agile 101: Scrum Framework Fundamentals', year: '2024', file: null, type: null },
];

function CertificatesAwards() {
  useEffect(() => {
    // section heading reveal
    const heading = scrollReveal('#animate-cert-header', { y: 0, stagger: .02, ease: 'power1.in' });

    // each item gets its OWN trigger, tied to its own position, so its line
    // fully expands and then its title reveals as THAT row scrolls into
    // view - not all at once when the section's top is first reached
    const rows = ITEMS.map((item) => scrollRevealSequence([
      { targets: `#cert-line-${item.id}`, vars: { width: '100%', ease: 'power1.in' } },
      { targets: `#animate-cert-${item.id}`, vars: { y: 0, stagger: .02, ease: 'power1.in' } },
    ], { trigger: `#cert-line-${item.id}` }));

    return () => {
      heading.kill();
      rows.forEach((r) => r.kill());
    };
  }, []);

  return (
    <>
      <div id='certificates-awards'>
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
              <SplitText text='Certificates & Awards' id='animate-cert-header' />
            </div>
          </section>
          {/* one row per item, hover to preview */}
          <section className='col-span-8'>
            <ul className='grid grid-cols-8'>
              {ITEMS.map((item) => (
                <React.Fragment key={item.id}>
                  <div className='col-span-8' id={`cert-line-${item.id}`} />
                  <li className='cert-row col-span-8 py-5'>
                    <div className='entry-container
                      mobile:text-[1rem]
                      tablet:text-[1.2rem]
                      laptop:text-[1.4rem]
                      laptop-lg:text-[1.5rem]
                      desktop:text-[1.6rem]'>
                      <p className='entry-line font-medium'>
                        <SplitText text={item.title} id={`animate-cert-${item.id}`} />
                        {item.year && (
                          <span className='text-[#7a7a7a]'>
                            <SplitText text={`· ${item.year}`} id={`animate-cert-${item.id}`} />
                          </span>
                        )}
                      </p>
                    </div>
                    {/* hover preview - certificate/award image or PDF only */}
                    <a
                      href={item.file || undefined}
                      target={item.file ? '_blank' : undefined}
                      rel='noreferrer'
                      className='cert-popover bg-black
                        aspect-[792/612]
                        mobile:w-[min(280px,80vw)]
                        tablet:w-[360px]
                        laptop:w-[420px]
                        laptop-lg:w-[480px]
                        desktop:w-[540px]'
                      onClick={(e) => { if (!item.file) e.preventDefault(); }}
                    >
                      {item.type === 'image' && (
                        <img src={item.file} alt={item.title} className='cert-preview-media' />
                      )}
                      {item.type === 'pdf' && (
                        <iframe src={`${item.file}#view=Fit&toolbar=0&navpanes=0&scrollbar=0`} title={item.title} className='cert-preview-media' />
                      )}
                      {!item.type && (
                        <p className='cert-preview-placeholder text-offwhite
                          mobile:text-[.75rem]
                          tablet:text-[.8rem]
                          laptop:text-[.85rem]'>
                          {item.title}
                        </p>
                      )}
                    </a>
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

export default CertificatesAwards
