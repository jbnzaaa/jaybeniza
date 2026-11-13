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
// the preview opens in pixels
import { wipeToggle } from '../../utils/pixels'
// certificate file
import certDataAnalytics from '../../assets/certificates-and-awards/Data Analytics Level III Training Program.jpg'
// pictures for the hover preview: the first page of each Coursera
// certificate as an image
import previewMsUxDesign from '../../assets/certificates-and-awards/previews/microsoft-ux-design.jpg'
import previewIbmGenAi from '../../assets/certificates-and-awards/previews/ibm-generative-ai-fundamentals.jpg'

// newest first. `file` is what the row's link opens: a local file or a URL.
// `preview`, where set, is the picture the hover preview shows
const ITEMS = [
  { id: 'data-analytics', title: 'Data Analytics Level III Training Program', kind: 'Completion', year: '2026', file: certDataAnalytics },
  { id: 'ms-ux-design', title: 'Microsoft UX Design Professional Certificate', kind: 'Professional Certificate', year: '2026', file: 'https://www.coursera.org/account/accomplishments/professional-cert/certificate/48UF54B6M2EQ', preview: previewMsUxDesign },
  { id: 'ibm-gen-ai-fundamentals', title: 'IBM Generative AI Fundamentals Specialization', kind: 'Specialization', year: '2025', file: 'https://www.coursera.org/account/accomplishments/specialization/certificate/MBQ9LTGI8IC8', preview: previewIbmGenAi },
  { id: 'award-innovation', title: 'Innovations in Action Award', kind: 'Award', year: '2025', file: null },
  { id: 'award-agility', title: 'Agility Award', kind: 'Award', year: '2025', file: null },
  { id: 'agile-101-scrum', title: 'Agile 101: Scrum Framework Fundamentals', kind: 'Completion', year: '2024', file: null },
  { id: 'civil-service-eligibility', title: 'Civil Service Honor Graduate Eligibility', kind: 'Credential', year: '2023', file: null },
];

/**
 * Certificates and awards on the About page, on the light theme: one plain
 * list. Each row is a title on the left and its year on the right, with a
 * rule under it. Pointing at a row steps the others back, the way the
 * landing page's selected projects do; where the row has a preview, it
 * opens in the middle of that row, between the title and the year.
 */
function CertificatesAwards({ dark = false }) {
  const fxPreview = useRef();
  // its pixel reveal (pixels.js), and the row it is open on
  const fxPixels = useRef(null);
  const fxOn = useRef(null);
  // the row whose certificate the preview is showing
  const [shown, setShown] = useState(null);

  useEffect(() => {
    // each row gets its OWN trigger: its text reveals letter by letter,
    // then the rule under it draws across, as THAT row scrolls into view
    const rows = ITEMS.map(({ id }) => scrollRevealSequence([
      { targets: `#animate-cert-${id}`, vars: { y: 0, stagger: .02, ease: 'power1.in' } },
      { targets: `#cert-line-${id}`, vars: { width: '100%', ease: 'power1.in' }, position: '<' },
    ], { trigger: `#cert-row-${id}` }));

    // the preview is centred on its left edge's position (left: 62%, App.css)
    gsap.set(fxPreview.current, { xPercent: -50 });
    // (it opens and shuts in pixels - pixels.js)
    fxPixels.current = wipeToggle(fxPreview.current);

    return () => {
      rows.forEach((row) => row.kill());
      fxPixels.current?.kill();
    };
  }, []);

  // the preview moves level with the row under the pointer and opens in
  // pixels from its bottom edge up, as Featured Work's does (Project.jsx).
  // moved on to the other certificate while it is open, it shuts in pixels
  // on the one, and opens again on the next; a row with nothing to show,
  // or leaving the list, closes it
  const show = (item) => (e) => {
    if (!item.preview) { hide(); return; }
    const preview = fxPreview.current;
    const pixels = fxPixels.current;
    const row = e.currentTarget;
    gsap.to(preview, { y: row.offsetTop + row.offsetHeight / 2 - preview.offsetHeight / 2, duration: .5, ease: 'power3.out' });
    const was = fxOn.current;
    fxOn.current = item;
    if (!was || was === item) {
      setShown(item);
      pixels?.show(.4);
      return;
    }
    // (only the last row pointed at is the one opened)
    pixels?.hide(.2).then(() => {
      if (fxOn.current !== item) return;
      setShown(item);
      pixels.show(.35);
    });
  };
  const hide = () => {
    fxOn.current = null;
    fxPixels.current?.hide(.3);
  };

  return (
    <>
      <div id='certificates-awards' className={dark ? 'bg-surface' : 'theme-light'}>
        <div className='
          mobile:py-16 mobile:px-[1rem]
          tablet:py-16 tablet:px-[1rem]
          laptop:py-20 laptop:px-[2rem]
          laptop-lg:py-24 laptop-lg:px-[3rem]
          desktop:py-28 desktop:px-[3rem]'>
          <div className='mobile:mb-6 tablet:mb-8 laptop:mb-8 laptop-lg:mb-10 desktop:mb-10'>
            <Tag label='Certificates & Awards' id='animate-certificates-tag' />
          </div>
          {/* the list - and, over its middle, the preview */}
          <div className='relative'>
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
                  <p className='entry-line text-copy text-muted shrink-0'>
                    {/* its year and what kind of recognition it is, as a
                      project's label reads: year / kind */}
                    <SplitText text={`${item.year} / ${item.kind}`} id={`animate-cert-${item.id}`} />
                  </p>
                </div>
                <div id={`cert-line-${item.id}`}/>
              </li>
            ))}
          </ul>
          {/* hover preview - the certificate's picture, filling the frame */}
          <figure className='cert-preview' ref={fxPreview} aria-hidden='true'>
            {shown && <img className='cert-preview-media' alt='' src={shown.preview} key={shown.id}/>}
          </figure>
          </div>
        </div>
      </div>
    </>
  )
}

export default CertificatesAwards
