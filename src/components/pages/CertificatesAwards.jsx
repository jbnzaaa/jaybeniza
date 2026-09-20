//
import React, { useEffect } from 'react'
// scroll reveal
import { scrollReveal, scrollRevealSequence } from '../../utils/scrollReveal'
// certificate files
import certDataAnalytics from '../../assets/certificates-and-awards/Data Analytics Level III Training Program.jpg'
import certGoogleGenAiIntro from '../../assets/certificates-and-awards/Google - Introduction to Generative AI.pdf'
import certIbmGenAiIntro from '../../assets/certificates-and-awards/IBM - Generative AI Introduction and Applications.pdf'
import certIbmGenAiPrompt from '../../assets/certificates-and-awards/IBM Generative AI Prompt Engineering Basics.pdf'
import certIbmGenAiFoundation from '../../assets/certificates-and-awards/IBM Generative AI Foundation Models and Platforms.pdf'
import certIbmGenAiEthics from '../../assets/certificates-and-awards/IBM Generative AI Impact, Considerations, and Ethical Issues.pdf'
import certIbmGenAiBusiness from '../../assets/certificates-and-awards/IBM Generative AI Business Transformation and Career Growth.pdf'
import certMsUiUx from '../../assets/certificates-and-awards/Microsoft - Fundamentals of UI UX Design.pdf'
import certMsUx from '../../assets/certificates-and-awards/Microsoft - Designing for User Experience.pdf'

const ITEMS = [
  { id: 'data-analytics', title: 'Data Analytics Level III Training Program', file: certDataAnalytics, type: 'image' },
  { id: 'gen-ai-intro-google', title: 'Introduction to Generative AI', file: certGoogleGenAiIntro, type: 'pdf' },
  { id: 'gen-ai-intro-ibm', title: 'Generative AI: Introduction and Applications', file: certIbmGenAiIntro, type: 'pdf' },
  { id: 'gen-ai-prompt', title: 'Generative AI: Prompt Engineering Basics', file: certIbmGenAiPrompt, type: 'pdf' },
  { id: 'gen-ai-foundation', title: 'Generative AI: Foundation Models and Platforms', file: certIbmGenAiFoundation, type: 'pdf' },
  { id: 'gen-ai-ethics', title: 'Generative AI: Impact, Considerations, and Ethical Issues', file: certIbmGenAiEthics, type: 'pdf' },
  { id: 'gen-ai-business', title: 'Generative AI: Business Transformation and Career Growth', file: certIbmGenAiBusiness, type: 'pdf' },
  { id: 'ms-uiux', title: 'Fundamentals of UI/UX Design', file: certMsUiUx, type: 'pdf' },
  { id: 'ms-ux', title: 'Designing for User Experience', file: certMsUx, type: 'pdf' },
  { id: 'award-innovation', title: 'Innovations in Action Award', file: null, type: null },
  { id: 'award-agility', title: 'Agility Award', file: null, type: null },
];

function CertificatesAwards() {
  useEffect(() => {
    // section heading reveal
    const heading = scrollReveal('#animate-cert-header', { y: 0, stagger: .05, ease: 'power1.in' });

    // each item gets its OWN trigger, tied to its own position, so its line
    // fully expands and then its title reveals as THAT row scrolls into
    // view - not all at once when the section's top is first reached
    const rows = ITEMS.map((item) => scrollRevealSequence([
      { targets: `#cert-line-${item.id}`, vars: { width: '100%', ease: 'power1.in' } },
      { targets: `#animate-cert-${item.id}`, vars: { y: 0, opacity: 1, ease: 'power1.in' } },
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
                id='animate-cert-header'>
                Certificates
              </span>
              <span className='section-header-word font-lexend font-medium leading-none tracking-tighter
                mobile:translate-y-[35px]
                tablet:translate-y-[80px]
                laptop:translate-y-[110px]
                laptop-lg:translate-y-[110px]
                desktop:translate-y-[120px]'
                id='animate-cert-header'>
                &
              </span>
              <span className='section-header-word font-lexend font-medium leading-none tracking-tighter
                mobile:translate-y-[35px]
                tablet:translate-y-[80px]
                laptop:translate-y-[110px]
                laptop-lg:translate-y-[110px]
                desktop:translate-y-[120px]'
                id='animate-cert-header'>
                Awards
              </span>
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
                      <p className='entry-line opacity-0 font-medium
                        mobile:translate-y-[25px]
                        tablet:translate-y-[30px]
                        laptop:translate-y-[50px]
                        laptop-lg:translate-y-[50px]
                        desktop:translate-y-[50px]'
                        id={`animate-cert-${item.id}`}>
                        {item.title}
                      </p>
                    </div>
                    {/* hover preview - certificate/award image or PDF only */}
                    <a
                      href={item.file || undefined}
                      target={item.file ? '_blank' : undefined}
                      rel='noreferrer'
                      className='cert-popover bg-black
                        mobile:w-[170px] mobile:h-[120px]
                        tablet:w-[210px] tablet:h-[148px]
                        laptop:w-[250px] laptop:h-[176px]
                        laptop-lg:w-[270px] laptop-lg:h-[190px]
                        desktop:w-[300px] desktop:h-[212px]'
                      onClick={(e) => { if (!item.file) e.preventDefault(); }}
                    >
                      {item.type === 'image' && (
                        <img src={item.file} alt={item.title} className='cert-preview-media' />
                      )}
                      {item.type === 'pdf' && (
                        <iframe src={`${item.file}#view=Fit&toolbar=0`} title={item.title} className='cert-preview-media' />
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
