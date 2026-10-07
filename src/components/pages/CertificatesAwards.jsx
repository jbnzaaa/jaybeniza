//
import React, { useEffect, useRef, useState } from 'react'
// icons
import {RiArrowRightDownLine} from 'react-icons/ri'
// GSAP
import gsap from 'gsap'
// scroll reveal
import { scrollReveal, scrollRevealSequence } from '../../utils/scrollReveal'
// per-letter text split
import SplitText from '../common/SplitText'
// certificate files
import certDataAnalytics from '../../assets/certificates-and-awards/Data Analytics Level III Training Program.jpg'
import certMsUxDesign from '../../assets/certificates-and-awards/Microsoft - UX Design.pdf'
import certIbmGenAiFundamentals from '../../assets/certificates-and-awards/IBM - Generative AI Fundamentals.pdf'
// small copy of the (5 MB) certificate photo, for the hover preview
import previewDataAnalytics from '../../assets/certificates-and-awards/previews/data-analytics-level-iii.jpg'

// `file` is what a click opens. `preview` is what the hover panel shows:
// an image, or the pdf itself (desktop browsers can display one inline)
const ITEMS = [
  { id: 'data-analytics', title: 'Data Analytics Level III Training Program', year: '2026', file: certDataAnalytics, preview: previewDataAnalytics, type: 'image' },
  { id: 'ms-ux-design', title: 'Microsoft UX Design Professional Certificate', year: '2026', file: certMsUxDesign, preview: certMsUxDesign, type: 'pdf' },
  { id: 'ibm-gen-ai-fundamentals', title: 'IBM Generative AI Fundamentals Specialization', year: '2025', file: certIbmGenAiFundamentals, preview: certIbmGenAiFundamentals, type: 'pdf' },
  { id: 'award-innovation', title: 'Innovations in Action Award', year: '2025', file: null },
  { id: 'award-agility', title: 'Agility Award', year: '2025', file: null },
  { id: 'agile-101-scrum', title: 'Agile 101: Scrum Framework Fundamentals', year: '2024', file: null },
];

// gap between the pointer and the preview panel's corner
const OFFSET = 24;

function CertificatesAwards() {
  const fxList = useRef();
  const fxPreview = useRef();
  // the item whose certificate the preview panel is showing. it stays set
  // after the pointer leaves, so the panel still has its content while it
  // wipes shut
  const [shown, setShown] = useState(null);

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

  useEffect(() => {
    // hover preview - only where there is a pointer that can hover. on a
    // touch screen there is no hover to follow, and a phone cannot show a
    // pdf inline anyway: there a tap simply opens the certificate
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const list = fxList.current;
    const preview = fxPreview.current;
    // the panel follows the pointer, offset down and to the right. it never
    // takes pointer events, so it cannot sit between the pointer and the
    // rows underneath it. positioned inside the list (not fixed), because
    // the smooth-scrolled content is transformed
    const moveX = gsap.quickTo(preview, 'x', { duration: .4, ease: 'power3.out' });
    const moveY = gsap.quickTo(preview, 'y', { duration: .4, ease: 'power3.out' });
    const onMove = (e) => {
      const rect = list.getBoundingClientRect();
      // keep the panel inside the list's width
      moveX(Math.min(e.clientX - rect.left + OFFSET, rect.width - preview.offsetWidth));
      moveY(e.clientY - rect.top + OFFSET);
    };
    // over a row that has a certificate: show it. anywhere else: wipe shut
    const onOver = (e) => {
      const id = e.target.closest('[data-cert]')?.dataset.cert;
      if (id) {
        setShown(id);
        gsap.to(preview, { clipPath: 'inset(0% 0% 0% 0%)', duration: .35, ease: 'power2.out' });
      } else {
        gsap.to(preview, { clipPath: 'inset(100% 0% 0% 0%)', duration: .25, ease: 'power2.in' });
      }
    };
    const onLeave = () => gsap.to(preview, { clipPath: 'inset(100% 0% 0% 0%)', duration: .25, ease: 'power2.in' });

    list.addEventListener('mousemove', onMove);
    list.addEventListener('mouseover', onOver);
    list.addEventListener('mouseleave', onLeave);
    return () => {
      list.removeEventListener('mousemove', onMove);
      list.removeEventListener('mouseover', onOver);
      list.removeEventListener('mouseleave', onLeave);
      gsap.killTweensOf(preview);
    };
  }, []);

  const shownItem = ITEMS.find((item) => item.id === shown);

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
          {/* one row per item. a row with a certificate is a link to it
            (with the buttons' arrow); hovering it shows the preview panel */}
          <section className='col-span-8'>
            <ul className='relative grid grid-cols-8' ref={fxList}>
              {ITEMS.map((item) => {
                const title = (
                  <p className='entry-line font-medium'>
                    <SplitText text={item.title} id={`animate-cert-${item.id}`} />
                    {item.year && (
                      <span className='text-[#7a7a7a]'>
                        <SplitText text={`· ${item.year}`} id={`animate-cert-${item.id}`} />
                      </span>
                    )}
                  </p>
                );
                return (
                  <React.Fragment key={item.id}>
                    <div className='col-span-8' id={`cert-line-${item.id}`} />
                    <li className='cert-row col-span-8
                      mobile:text-[1rem]
                      tablet:text-[1.2rem]
                      laptop:text-[1.4rem]
                      laptop-lg:text-[1.5rem]
                      desktop:text-[1.6rem]'>
                      {item.file ? (
                        <a href={item.file} target='_blank' rel='noreferrer' data-cert={item.id}
                          className='cert-link flex items-center justify-between gap-x-4 py-5'>
                          {title}
                          <span className='menu-icon-clip shrink-0'>
                            <span className='menu-icon' id={`animate-cert-${item.id}`}>
                              <RiArrowRightDownLine id='icon' className='fill-black text-[1.2em]'/>
                            </span>
                          </span>
                        </a>
                      ) : (
                        <div className='py-5'>{title}</div>
                      )}
                    </li>
                  </React.Fragment>
                );
              })}
              {/* hover preview - one panel for the whole list */}
              <li className='cert-preview bg-black
                aspect-[792/612]
                laptop:w-[420px]
                laptop-lg:w-[480px]
                desktop:w-[540px]'
                ref={fxPreview} aria-hidden='true'>
                {shownItem?.type === 'image' && (
                  <img src={shownItem.preview} alt='' className='cert-preview-media' />
                )}
                {shownItem?.type === 'pdf' && (
                  <iframe src={`${shownItem.preview}#view=Fit&toolbar=0&navpanes=0&scrollbar=0`} title={shownItem.title}
                    className='cert-preview-media' tabIndex={-1} key={shownItem.id} />
                )}
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  )
}

export default CertificatesAwards
