//
import React, { useEffect, useRef } from 'react'
// Components
import Process from './Process';
import WorkExperience from './WorkExperience';
import Skills from './Skills';
import CertificatesAwards from './CertificatesAwards';
import Footer from './Footer';
// GSAP
import gsap from 'gsap'
// project content - its screenshots are the pictures that trail the pointer
import { PROJECTS } from './projects/projects'
// Resume
import Resume from '../../assets/files/Jayson_Beniza_ReadOnly.pdf'
// scroll reveal
import { scrollReveal } from '../../utils/scrollReveal'
// section label
import Tag from '../common/Tag'
// per-letter text split
import SplitText from '../common/SplitText'

// the longer introduction. everything in it is drawn from the work
// experience entries below it - nothing here that they do not back up
const INTRO = [
  "I'm Jay Beniza, a UI/UX designer from the Philippines. I started out writing code for the web, and kept getting pulled toward the part that comes first: working out what people actually need, and why a screen feels easy or doesn't.",
  "Three years and many products later, that is still the job. I design web and mobile apps from the first user flow to the final pixel, build the design systems that hold them together, and still write front-end code, so nothing gets lost between the idea and what ships.",
];

// the pictures that follow the pointer over the first screen
const TRAIL = ['dailydiscount', 'jaysonbeniza', 'regain', 'jbnza']
  .flatMap((key) => PROJECTS[key].screenshots.slice(0, 2).map(({ src }) => src));
// how far the pointer travels before the next picture is laid down
const TRAIL_STEP = 120;
// how far down and right of the pointer a picture's corner sits
const TRAIL_OFFSET = 16;

const RESUME_DESCRIPTION = "Want the full story? It's all in my resume: experience, skills, certificates, and awards. Have a read, and say hello if I sound like a fit.";
const RESUME_LINKS = [
  { label: 'Download resume', href: Resume, download: 'Jay-Beniza-Resume.pdf' },
  { label: 'Or email me', href: 'mailto:jaysonbeniza@gmail.com' },
];

/**
 * The About page, laid out like the landing page - light and dark sections
 * in turn, each under a small boxed label: a first screen with the
 * introduction set large and centred (light), how I work (dark), experience
 * (light), skills and tools (dark), recognition (light), then the closing
 * resume screen with the footer inside it (darkest).
 */
function AboutPage() {
  const fxHero = useRef();

  useEffect(() => {
    // image trail - only where there is a pointer. every TRAIL_STEP the
    // pointer moves, the next picture is laid down at its lower right, on
    // top of the ones before, grows to size and fades away again shortly after
    if (!window.matchMedia('(any-hover: hover)').matches) return undefined;
    const hero = fxHero.current;
    const pictures = gsap.utils.toArray('.image-trail-item', hero);
    // (each is placed by its top left corner, TRAIL_OFFSET down and right
    // of the pointer)
    let last = null;
    let next = 0;
    let layer = 1;
    const onMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (last && Math.hypot(x - last.x, y - last.y) < TRAIL_STEP) return;
      last = { x, y };
      const picture = pictures[next % pictures.length];
      next += 1;
      layer += 1;
      gsap.killTweensOf(picture);
      gsap.set(picture, { x: x + TRAIL_OFFSET, y: y + TRAIL_OFFSET, zIndex: layer, opacity: 1, scale: .6, transformOrigin: 'left top' });
      gsap.to(picture, { scale: 1, duration: .5, ease: 'power3.out' });
      gsap.to(picture, { opacity: 0, scale: .9, duration: .4, ease: 'power2.in', delay: .8 });
    };
    hero.addEventListener('mousemove', onMove);
    return () => {
      hero.removeEventListener('mousemove', onMove);
      gsap.killTweensOf(pictures);
    };
  }, []);

  useEffect(() => {
    // the first screen is in view at load, so its reveals are triggered
    // off the section itself; the resume screen reveals as it scrolls in
    const intro = ['#animate-about-page'].map((target) => scrollReveal(
      target, { y: 0, stagger: .02, ease: 'power1.in' }, { trigger: '#about-hero', start: 'top bottom' }));
    const resume = scrollReveal('#animate-about-page-resume', { y: 0, stagger: .02, ease: 'power1.in' },
      { trigger: '#resume', start: 'top 60%' });

    return () => {
      intro.forEach((reveal) => reveal.kill());
      resume.kill();
    };
  }, []);

  return (
    <>
      {/* first screen. top padding clears the nav bar */}
      <section id='about-hero' className='theme-light relative flex flex-col justify-center min-h-screen-safe overflow-hidden
        mobile:px-[1rem] mobile:pt-20 mobile:pb-8 mobile:gap-y-16
        tablet:px-[1rem] tablet:pt-20 tablet:pb-8 tablet:gap-y-16
        laptop:px-[2rem] laptop:pt-24 laptop:pb-10 laptop:gap-y-16
        laptop-lg:px-[3rem] laptop-lg:pt-24 laptop-lg:pb-12 laptop-lg:gap-y-16
        desktop:px-[3rem] desktop:pt-28 desktop:pb-12 desktop:gap-y-16'
        ref={fxHero}>
        {/* pictures that follow the pointer, stacking one on another, in
          front of the text */}
        <div className='image-trail' aria-hidden='true'>
          {TRAIL.map((src) => (
            <img className='image-trail-item' src={src} alt='' key={src}/>
          ))}
        </div>
        {/* the label and the introduction, centred on the screen */}
        <div className='relative z-10 flex flex-col items-center text-center
          mobile:gap-y-6
          tablet:gap-y-8
          laptop:gap-y-8
          laptop-lg:gap-y-10
          desktop:gap-y-10'>
          <Tag label='Meet the designer' id='animate-about-page-title' as='h1' />
          {/* at the lead step of the type scale (size: .about-paragraph, App.scss) */}
          <p className='about-paragraph flex flex-wrap justify-center
            mobile:w-full mobile:leading-snug
            tablet:w-[94%] tablet:leading-tight
            laptop:w-[90%] laptop:leading-tight
            laptop-lg:w-[88%] laptop-lg:leading-tight
            desktop:w-[84%] desktop:leading-tight'>
            <SplitText text={INTRO.join(' ')} id='animate-about-page' by='word' />
          </p>
        </div>
      </section>
      {/* how I work */}
      <Process/>
      {/* experience */}
      <WorkExperience/>
      {/* skills */}
      <Skills/>
      {/* certificates and awards */}
      <CertificatesAwards/>
      {/* download resume - this page's closing screen, laid out like the
        contact section (Contact.jsx) with the footer inside it. the top
        bar goes behind it the same way (data-nav-cover, Navbar.jsx) */}
      <div id='resume' data-nav-cover className='flex flex-col min-h-screen-safe bg-black'>
        <section className='flex-1 grid grid-cols-8 content-start gap-x-6
          mobile:px-[1rem] mobile:pt-12 mobile:pb-10 mobile:gap-y-10
          tablet:px-[1rem] tablet:pt-12 tablet:pb-12 tablet:gap-y-12
          laptop:px-[2rem] laptop:pt-20 laptop:pb-12
          laptop-lg:px-[3rem] laptop-lg:pt-20 laptop-lg:pb-16
          desktop:px-[3rem] desktop:pt-24 desktop:pb-16'>
          {/* heading - left, its top level with the text on the right */}
          <h2 className='self-start flex flex-wrap font-flexible font-semibold leading-[.92] tracking-tight
            mobile:col-span-8 mobile:row-start-1 text-closing
            tablet:col-span-8 tablet:row-start-1
            laptop:col-span-5 laptop:row-start-1
            laptop-lg:col-span-5 laptop-lg:row-start-1
            desktop:col-span-5 desktop:row-start-1'>
            <SplitText text='Grab My Resume' id='animate-about-page-resume' />
          </h2>
          {/* description + links - right */}
          <div className='text-caption
            mobile:col-span-8 mobile:row-start-2
            tablet:col-span-6 tablet:row-start-2
            laptop:col-span-2 laptop:col-start-7 laptop:row-start-1
            laptop-lg:col-span-2 laptop-lg:col-start-7 laptop-lg:row-start-1
            desktop:col-span-2 desktop:col-start-7 desktop:row-start-1'>
            <p className='flex flex-wrap mb-8'>
              <SplitText text={RESUME_DESCRIPTION} id='animate-about-page-resume' by='word' />
            </p>
            <ul className='flex flex-col gap-y-2'>
              {RESUME_LINKS.map(({ label, ...link }) => (
                <li className='account-container m-0' key={label}>
                  <div className='accounts'>
                    <a {...link}>
                      <SplitText text={label} id='animate-about-page-resume' />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <Footer/>
      </div>
    </>
  )
}

export default AboutPage
