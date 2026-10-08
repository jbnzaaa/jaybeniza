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
  "I'm Jay Beniza, a UI/UX designer from the Philippines with 3+ years of experience. I started in web design, then moved into UI/UX.",
  "I design web and mobile apps, from research and user flows to interfaces and design systems. I also write some code, and build most of my projects with modern technologies.",
];

// the introduction opens on my name: the words before it, the name (which
// shows my picture under the pointer), and everything after
const NAME = 'Jay Beniza';
// (the comma after the name is set on its own, outside the underline)
const [BEFORE, AFTER] = INTRO.join(' ').split(NAME + ',').map((part) => part.trim());
// my picture (public/images)
const PORTRAIT = `${process.env.PUBLIC_URL}/images/profile.JPG`;
// how far down and right of the pointer its corner sits, px at the page's
// usual scale
const PORTRAIT_OFFSET = 24;

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
    // my picture, shown while the pointer is on my name: it wipes open
    // from its bottom edge at the pointer's lower right and follows the
    // pointer; it closes when the pointer leaves. on a touch screen, or
    // from the keyboard, the name is pressed instead and the picture
    // opens under it
    const hero = fxHero.current;
    const name = hero.querySelector('.about-name');
    const portrait = hero.querySelector('.about-portrait');
    const picture = portrait.firstElementChild;
    // (the page is scaled up on a very wide screen - html's font size,
    // App.scss - and the offset goes with it)
    const offset = () => PORTRAIT_OFFSET * parseFloat(getComputedStyle(document.documentElement).fontSize) / 16;
    const toX = gsap.quickTo(portrait, 'x', { duration: .4, ease: 'power3.out' });
    const toY = gsap.quickTo(portrait, 'y', { duration: .4, ease: 'power3.out' });
    let open = false;

    // where it goes: down and right of a point of the screen, kept inside
    // the section
    const place = (clientX, clientY, jump) => {
      const rect = hero.getBoundingClientRect();
      const x = Math.min(clientX - rect.left + offset(), rect.width - portrait.offsetWidth - offset());
      const y = Math.min(clientY - rect.top + offset(), rect.height - portrait.offsetHeight - offset());
      if (jump) gsap.set(portrait, { x, y });
      toX(x);
      toY(y);
    };
    const show = (clientX, clientY) => {
      if (open) return;
      open = true;
      place(clientX, clientY, true);
      gsap.to(portrait, { clipPath: 'inset(0% 0% 0% 0%)', duration: .5, ease: 'power2.inOut', overwrite: 'auto' });
      gsap.fromTo(picture, { scale: 1.15 }, { scale: 1, duration: .7, ease: 'power2.out', overwrite: 'auto' });
    };
    const hide = () => {
      if (!open) return;
      open = false;
      gsap.to(portrait, { clipPath: 'inset(100% 0% 0% 0%)', duration: .4, ease: 'power2.in', overwrite: 'auto' });
    };
    const under = () => {
      const rect = name.getBoundingClientRect();
      return [rect.left, rect.bottom];
    };

    const onEnter = (e) => { if (e.pointerType === 'mouse') show(e.clientX, e.clientY); };
    const onMove = (e) => { if (open && e.pointerType === 'mouse') place(e.clientX, e.clientY, false); };
    const onLeave = (e) => { if (e.pointerType === 'mouse') hide(); };
    const onClick = () => (open ? hide() : show(...under()));
    const onKey = (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      onClick();
    };
    name.addEventListener('pointerenter', onEnter);
    name.addEventListener('pointermove', onMove);
    name.addEventListener('pointerleave', onLeave);
    name.addEventListener('click', onClick);
    name.addEventListener('keydown', onKey);
    name.addEventListener('blur', hide);
    return () => {
      name.removeEventListener('pointerenter', onEnter);
      name.removeEventListener('pointermove', onMove);
      name.removeEventListener('pointerleave', onLeave);
      name.removeEventListener('click', onClick);
      name.removeEventListener('keydown', onKey);
      name.removeEventListener('blur', hide);
      gsap.killTweensOf([portrait, picture]);
    };
  }, []);

  useEffect(() => {
    // the first screen is in view at load, so its reveals are triggered
    // off the section itself; the resume screen reveals as it scrolls in
    // (the introduction is long: its letters rise in reading order across
    // a set time, rather than a fixed step each, so the last line is not
    // seconds behind the first)
    const intro = ['#animate-about-page'].map((target) => scrollReveal(
      target, { y: 0, duration: .6, stagger: { amount: 1.6 }, ease: 'power2.out' }, { trigger: '#about-hero', start: 'top bottom' }));
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
        {/* my picture - opened by my name in the introduction (the effect
          above; start state: .about-portrait, App.scss) */}
        <div className='about-portrait' aria-hidden='true'>
          <img src={PORTRAIT} alt='' loading='lazy'/>
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
            <SplitText text={BEFORE} id='animate-about-page' />
            {/* my name - point at it (or press it) to see my picture */}
            <span className='about-name' role='button' tabIndex={0} aria-label='Jay Beniza - show my picture'>
              <SplitText text={NAME} id='animate-about-page' />
            </span>
            <SplitText text=',' id='animate-about-page' />
            <SplitText text={AFTER} id='animate-about-page' />
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
