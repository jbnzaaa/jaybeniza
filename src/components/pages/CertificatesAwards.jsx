//
import React, { useEffect, useRef, useState } from 'react'
// GSAP
import gsap from 'gsap'
// scroll reveal
import { scrollRevealSequence } from '../../utils/scrollReveal'
// section label
import Tag from '../common/Tag'
// per-letter text split
import SplitText from '../common/SplitText'
// certificate files
import certDataAnalytics from '../../assets/certificates-and-awards/Data Analytics Level III Training Program.jpg'
import certMsUxDesign from '../../assets/certificates-and-awards/Microsoft - UX Design.pdf'
import certIbmGenAiFundamentals from '../../assets/certificates-and-awards/IBM - Generative AI Fundamentals.pdf'
// small copy of the (5 MB) certificate photo, for the hover preview
import previewDataAnalytics from '../../assets/certificates-and-awards/previews/data-analytics-level-iii.jpg'

// newest first. `file` is what the row's link opens and, with `preview`
// (an image to show in its place), what the hover preview shows
const ITEMS = [
  { id: 'data-analytics', title: 'Data Analytics Level III Training Program', year: '2026', file: certDataAnalytics, preview: previewDataAnalytics },
  { id: 'ms-ux-design', title: 'Microsoft UX Design Professional Certificate', year: '2026', file: certMsUxDesign },
  { id: 'ibm-gen-ai-fundamentals', title: 'IBM Generative AI Fundamentals Specialization', year: '2025', file: certIbmGenAiFundamentals },
  { id: 'award-innovation', title: 'Innovations in Action Award', year: '2025', file: null },
  { id: 'award-agility', title: 'Agility Award', year: '2025', file: null },
  { id: 'agile-101-scrum', title: 'Agile 101: Scrum Framework Fundamentals', year: '2024', file: null },
  { id: 'civil-service-eligibility', title: 'Civil Service Honor Graduate Eligibility', year: '2023', file: null },
];

const isPdf = (file) => /\.pdf($|\?)/i.test(file);

/**
 * Certificates and awards on the About page, on the light theme: one plain
 * list. Each row is a title on the left and its year on the right, with a
 * rule under it. Pointing at a row steps the others back, the way the
 * landing page's selected projects do; where the row has a certificate to
 * show, its preview opens in the middle of that row, between the title
 * and the year.
 */
function CertificatesAwards() {
  const fxList = useRef();
  const fxPreview = useRef();
  // the row whose certificate the preview is showing
  const [shown, setShown] = useState(null);

  useEffect(() => {
    // each row gets its OWN trigger: its text reveals letter by letter,
    // then the rule under it draws across, as THAT row scrolls into view
    const rows = ITEMS.map(({ id }) => scrollRevealSequence([
      { targets: `#animate-cert-${id}`, vars: { y: 0, stagger: .02, ease: 'power1.in' } },
      { targets: `#cert-line-${id}`, vars: { width: '100%', ease: 'power1.in' }, position: '<' },
    ], { trigger: `#cert-row-${id}` }));

    // the preview is centred on its left edge's position (left: 50%, App.scss)
    gsap.set(fxPreview.current, { xPercent: -50 });

    return () => {
      rows.forEach((row) => row.kill());
    };
  }, []);

  // the preview moves level with the row under the pointer and wipes open
  // from its bottom edge, the way the cards do. it closes when the pointer
  // moves to a row with nothing to show, or leaves the list
  const hide = () => gsap.to(fxPreview.current, { clipPath: 'inset(100% 0% 0% 0%)', duration: .3, ease: 'power2.in' });
  const show = (item) => (e) => {
    if (!item.file) { hide(); return; }
    const preview = fxPreview.current;
    const row = e.currentTarget;
    setShown(item);
    gsap.to(preview, { y: row.offsetTop + row.offsetHeight / 2 - preview.offsetHeight / 2, duration: .5, ease: 'power3.out' });
    gsap.to(preview, { clipPath: 'inset(0% 0% 0% 0%)', duration: .4, ease: 'power2.out' });
  };

  return (
    <>
      <div id='certificates-awards' className='theme-light'>
        <div className='
          mobile:py-16 mobile:px-[1rem]
          tablet:py-16 tablet:px-[1rem]
          laptop:py-20 laptop:px-[2rem]
          laptop-lg:py-24 laptop-lg:px-[3rem]
          desktop:py-28 desktop:px-[3rem]'>
          <div className='mobile:mb-6 tablet:mb-8 laptop:mb-8 laptop-lg:mb-10 desktop:mb-10'>
            <Tag label='Recognition' id='animate-certificates-tag' />
          </div>
          {/* the list - and, over its middle, the preview */}
          <div className='relative' ref={fxList}>
            {/* rows - title, year, and a rule under each. on a phone the
              year goes under its title */}
            <ul className='project-list' onMouseLeave={hide} data-no-hover-roll>
              {ITEMS.map((item) => (
                <li className='project-row m-0' id={`cert-row-${item.id}`} key={item.id} onMouseEnter={show(item)}>
                  <div className='flex gap-x-6 text-subtitle
                  mobile:flex-col mobile:gap-y-2
                  tablet:justify-between tablet:items-start
                  laptop:justify-between laptop:items-start
                  laptop-lg:justify-between laptop-lg:items-start
                  desktop:justify-between desktop:items-start
                    mobile:py-4
                    tablet:py-6
                    laptop:py-6
                    laptop-lg:py-6
                    desktop:py-8'>
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
            {/* hover preview - an image, or the PDF's first page */}
            <figure className='cert-preview' ref={fxPreview} aria-hidden='true'>
              {shown && (isPdf(shown.file) ? (
                <iframe className='cert-preview-media' title={`${shown.title} preview`} tabIndex={-1} key={shown.id}
                  src={`${shown.file}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}/>
              ) : (
                <img className='cert-preview-media' alt='' src={shown.preview || shown.file} key={shown.id}/>
              ))}
            </figure>
          </div>
        </div>
      </div>
    </>
  )
}

export default CertificatesAwards
