//
import React, { useEffect, useRef, useCallback } from 'react'
// Components
import Contact from './Contact';
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
// scroll reveal
import { scrollReveal, scrollRevealSequence } from '../../utils/scrollReveal'
// per-letter text split
import SplitText from '../common/SplitText'
// the tab's title
import { usePageTitle } from '../../utils/pageTitle'
gsap.registerPlugin(ScrollTrigger)

// every picture in the archive folder, found at build time: drop a .jpg,
// .png, .webp, .avif or .gif into src/assets/files/images/archive and it
// is on the page. they are shown in the order of their file names, so a
// number in front (01-, 02-) sets the order. the file name, without its
// number and extension, is the picture's description
const FOLDER = require.context('../../assets/files/images/archive', false, /\.(jpe?g|png|webp|avif|gif)$/i);
const IMAGES = FOLDER.keys().sort().map((file) => ({
  src: FOLDER(file),
  alt: file.replace(/^\.\//, '').replace(/\.[^.]+$/, '').replace(/^\d+[-_ ]*/, '').replace(/[-_]+/g, ' '),
}));

const HEADLINE_LINES = [
  'Moments outside',
  'the case studies.',
];

const DESCRIPTION = 'Snapshots of the work, the events and the people around it.';

/**
 * The archive page (route /archive): a first screen like the work page's,
 * with the headline and, along its foot, a short description (lower left)
 * and the scroll cue (lower right), then every picture in the archive
 * folder in columns, each at its own height. A picture wipes up from its
 * bottom edge as it scrolls into view.
 */
function ArchivePage() {
  usePageTitle('Archive');
  const fxGrid = useRef();

  // a picture that loads late changes the page's height: the triggers
  // under it are measured again, once the pictures have settled
  const remeasure = useCallback(() => {
    clearTimeout(remeasure.timer);
    remeasure.timer = setTimeout(() => ScrollTrigger.refresh(), 150);
  }, []);

  useEffect(() => {
    // the first screen is in view at load, so its reveal is triggered off
    // the section itself
    const intro = scrollReveal('#animate-archive-page', { y: 0, stagger: .02, ease: 'power1.in' },
      { trigger: '#archive-hero', start: 'top bottom' });

    // each picture: the frame wipes up from its bottom edge while the
    // picture inside eases down to its real size (start state:
    // .archive-item, App.css)
    const images = gsap.utils.toArray('.archive-item', fxGrid.current).map((item) => scrollRevealSequence([
      { targets: item, vars: { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut' } },
      { targets: item.querySelector('img'), vars: { scale: 1, ease: 'power2.out' }, position: '<' },
    ], { trigger: item }));

    return () => {
      intro.kill();
      images.forEach((reveal) => reveal.kill());
    };
  }, []);

  return (
    <>
      {/* first screen - headline at the top; along the foot, the
        description in the lower left and the scroll cue in the lower
        right. top padding clears the nav bar */}
      <section id='archive-hero' className='theme-light flex flex-col justify-between min-h-screen-safe
        mobile:px-[1rem] mobile:pt-20 mobile:pb-8 mobile:gap-y-16
        tablet:px-[1rem] tablet:pt-20 tablet:pb-8 tablet:gap-y-16
        laptop:px-[2rem] laptop:pt-24 laptop:pb-10 laptop:gap-y-16
        laptop-lg:px-[3rem] laptop-lg:pt-24 laptop-lg:pb-12 laptop-lg:gap-y-16
        desktop:px-[3rem] desktop:pt-28 desktop:pb-12 desktop:gap-y-16'>
        <h1>
          {HEADLINE_LINES.map((line) => (
            <span key={line} className='hero-designerdev flex flex-wrap font-flexible font-bold leading-[.92] tracking-tight
              text-hero'>
              <SplitText text={line} id='animate-archive-page' />
            </span>
          ))}
        </h1>
        <div className='flex justify-between items-end gap-x-6'>
          <p className='flex flex-wrap text-caption
            mobile:w-[78%]
            tablet:w-[52%]
            laptop:w-[34%]
            laptop-lg:w-[30%]
            desktop:w-[28%]'>
            <SplitText text={DESCRIPTION} id='animate-archive-page' by='word' />
          </p>
          {/* scroll cue, along the bottom on the right */}
          <p className='flex flex-wrap shrink-0 text-caption'>
            <SplitText text='Scroll down' id='animate-archive-page' by='word' />
          </p>
        </div>
      </section>
      {/* the pictures - in columns, each at its own height. (pulled up a
        pixel over the first screen, as on the work page: one light
        ground, with no hairline between) */}
      <section className='theme-light relative -mt-px
        mobile:px-[1rem] mobile:pt-8 mobile:pb-16
        tablet:px-[1rem] tablet:pt-8 tablet:pb-16
        laptop:px-[2rem] laptop:pt-8 laptop:pb-20
        laptop-lg:px-[3rem] laptop-lg:pt-8 laptop-lg:pb-24
        desktop:px-[3rem] desktop:pt-8 desktop:pb-28'
        ref={fxGrid}>
        {IMAGES.length ? (
          <ul className='gap-x-6
            mobile:columns-1
            tablet:columns-2
            laptop:columns-3
            laptop-lg:columns-3
            desktop:columns-4'>
            {IMAGES.map(({ src, alt }) => (
              <li className='archive-item m-0 mb-6 break-inside-avoid' key={src}>
                <img src={src} alt={alt} loading='lazy' className='block w-full h-auto' onLoad={remeasure}/>
              </li>
            ))}
          </ul>
        ) : (
          // nothing in the folder yet - says so
          <p className='text-caption text-muted'>No pictures yet.</p>
        )}
      </section>
      <Contact/>
    </>
  )
}

export default ArchivePage
