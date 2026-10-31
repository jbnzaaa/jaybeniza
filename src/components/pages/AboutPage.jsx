//
import React, { useEffect, useRef } from 'react'
// Components
import Process from './Process';
import WorkExperience from './WorkExperience';
import Skills from './Skills';
import CertificatesAwards from './CertificatesAwards';
import Testimonials from './Testimonials';
import Footer from './Footer';
// GSAP
import gsap from 'gsap'
// Resume
import Resume from '../../assets/files/Jayson Beniza 2026.pdf'
// scroll reveal
import { scrollReveal, scrollRevealSequence } from '../../utils/scrollReveal'
// my picture opens in pixels
import { pixelToggle } from '../../utils/pixels'
// the site's section label
import Tag from '../common/Tag'
// per-letter text split
import SplitText from '../common/SplitText'
// a link to another page, through the page wipe
import { TransitionLink } from '../common/PageTransition'
// the button down to what is below the first screen
import ScrollCue from '../common/ScrollCue'
// the tab's title
import { usePageTitle } from '../../utils/pageTitle'

// the longer introduction. everything in it is drawn from the work
// experience entries below it - nothing here that they do not back up
// the introduction: the page's first screen
const INTRO = [
  "I'm Jay Beniza, a UI/UX designer based in the Philippines with 3.5+ years of experience designing web and mobile products. I'm quiet by nature, so I listen closely and notice the details others pass over.",
  'I work from research to final interface and stay close to developers through handoff, so the design survives the build. I prefer careful decisions to loud ones, and products that serve both the people who use them and the teams who build them.',
];

// no word is left on its own at a line's end or start: a short word (I,
// I'm, a, to...) is held to the word after it, and a paragraph's last two
// words are held together, by a no-break space - SplitText keeps a word
// whole, and splits only at plain spaces
const SHORT = /^(I'm|I|a|an|to|so|of|in|on|at|by|is|it|my|we|or|and|the|for|with)$/i;
const tidy = (text) => {
  const words = text.split(' ').filter(Boolean);
  return words.reduce((out, word, i) => {
    if (i === 0) return word;
    const held = SHORT.test(words[i - 1]) || i === words.length - 1;
    return `${out}${held ? ' ' : ' '}${word}`;
  }, '');
};

// the introduction's first paragraph opens on my name: the words before
// it, the name (which shows my picture under the pointer), and the rest
// of that paragraph. the paragraphs after it are set whole
const NAME = 'Jay Beniza';
// (the comma after the name is set on its own, outside the underline)
const [BEFORE, AFTER] = INTRO[0].split(NAME + ',').map((part) => part.trim());
// my picture (public/images)
const PORTRAIT = `${process.env.PUBLIC_URL}/images/profile.webp`;

const RESUME_DESCRIPTION = 'Have a product to design or build? Start a project and tell me about it. My CV covers my experience, skills, certificates, and awards in full, or email me about a project or a role.';
const RESUME_LINKS = [
  // first, the way to start a project: the request form (ContactPage.jsx)
  { label: 'Start a project', to: '/get-in-touch' },
  { label: 'Download CV', href: Resume, download: 'Jay-Beniza-CV.pdf' },
  { label: 'Email me', href: 'mailto:jaysonbeniza@gmail.com' },
];

/**
 * The About page, laid out like the landing page - light and dark sections
 * in turn, each under a small boxed label: a first screen with the
 * introduction set large and centred (light), how I work (dark), experience
 * (light), skills and tools (dark), recognition (light), what my team
 * says (dark), then the closing screen - start a project, or the CV - with
 * the footer inside it (darkest).
 */
function AboutPage() {
  usePageTitle('About', 'About Jay Beniza, a UI/UX designer and front-end developer in the Philippines: how I work, my experience, skills, tools, and what teammates say.');
  const fxHero = useRef();

  useEffect(() => {
    // my picture, shown while the pointer is on my name, centred on the
    // pointer and following it. it opens with the site's image reveal -
    // the frame opens in pixels from its bottom edge up while the picture
    // inside eases down from slightly large - and shuts the same way when
    // the pointer leaves. on a touch screen, or from the keyboard, the
    // name is pressed instead and the picture opens under it
    const hero = fxHero.current;
    const name = hero.querySelector('.about-name');
    const portrait = hero.querySelector('.about-portrait');
    const picture = portrait.firstElementChild;
    // it trails the pointer a touch, like the cursor
    const toX = gsap.quickTo(portrait, 'x', { duration: .35, ease: 'power3.out' });
    const toY = gsap.quickTo(portrait, 'y', { duration: .35, ease: 'power3.out' });
    let open = false;
    // (it opens and shuts in pixels - pixels.js)
    const pixels = pixelToggle(portrait);

    // its middle on a point of the screen (`jump`: there at once, for
    // when it opens)
    const place = (clientX, clientY, jump) => {
      const rect = hero.getBoundingClientRect();
      const x = clientX - rect.left - portrait.offsetWidth / 2;
      const y = clientY - rect.top - portrait.offsetHeight / 2;
      if (jump) gsap.set(portrait, { x, y });
      toX(x);
      toY(y);
    };
    const show = (clientX, clientY) => {
      if (open) return;
      open = true;
      place(clientX, clientY, true);
      pixels.show(.5);
      gsap.fromTo(picture, { scale: 1.15 }, { scale: 1, duration: .7, ease: 'power2.out', overwrite: 'auto' });
    };
    const hide = () => {
      if (!open) return;
      open = false;
      pixels.hide(.4);
    };
    // (pressed rather than pointed at: under the name, clear of it)
    const under = () => {
      const rect = name.getBoundingClientRect();
      return [rect.left + rect.width / 2, rect.bottom + portrait.offsetHeight / 2 + 8];
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
      pixels.kill();
    };
  }, []);

  useEffect(() => {
    // the first screen is in view at load, so its reveals are triggered
    // off the section itself; the resume screen reveals as it scrolls in
    // (the introduction is long: its letters rise in reading order across
    // a set time, rather than a fixed step each, so the last line is not
    // seconds behind the first)
    // the words up to my name rise first; as the name's last letters land,
    // the line under it draws across from the left, at the letters' own
    // pace and ease, while the rest of the introduction rises after it
    const intro = scrollRevealSequence([
      { targets: '#animate-about-intro-lead', vars: { y: 0, stagger: .012, ease: 'power1.in' } },
      { targets: '#about-hero .about-name-line', vars: { scaleX: 1, duration: .6 }, position: '-=.3' },
      { targets: '#animate-about-intro', vars: { y: 0, stagger: .012, ease: 'power1.in' }, position: '<.15' },
    ], { trigger: '#about-hero', start: 'top bottom' });
    const resume = scrollReveal('#animate-about-page-resume', { y: 0, stagger: .02, ease: 'power1.in' },
      { trigger: '#resume' });

    return () => {
      intro.kill();
      resume.kill();
    };
  }, []);

  return (
    <>
      {/* first screen - the introduction itself, with no headline over it:
        its label, then the two paragraphs at the lead step of the type
        scale (size: .about-paragraph, App.css), from the left edge. top
        padding clears the nav bar */}
      <section id='about-hero' className='theme-light relative flex flex-col justify-between min-h-screen-safe overflow-hidden
        mobile:px-[1rem] mobile:pt-20 mobile:pb-8 mobile:gap-y-12
        tablet:px-[1rem] tablet:pt-20 tablet:pb-8 tablet:gap-y-12
        laptop:px-[2rem] laptop:pt-24 laptop:pb-10 laptop:gap-y-12
        laptop-lg:px-[3rem] laptop-lg:pt-24 laptop-lg:pb-12 laptop-lg:gap-y-12
        desktop:px-[3rem] desktop:pt-28 desktop:pb-12 desktop:gap-y-16'
        ref={fxHero}>
        {/* my picture - opened by my name in the introduction (the effect
          above; start state: .about-portrait, App.css) */}
        <div className='about-portrait' aria-hidden='true'>
          <img src={PORTRAIT} alt='' loading='lazy'/>
        </div>
        <div className='relative z-10'>
          <Tag label='Meet the Designer' id='animate-about-intro-tag' as='h1' />
          <div className='flex flex-col
            mobile:mt-6 mobile:w-full mobile:gap-y-6
            tablet:mt-8 tablet:w-[94%] tablet:gap-y-8
            laptop:mt-8 laptop:w-[90%] laptop:gap-y-8
            laptop-lg:mt-10 laptop-lg:w-[88%] laptop-lg:gap-y-10
            desktop:mt-10 desktop:w-[84%] desktop:gap-y-10'
            id='about-intro-text'>
            <p className='about-paragraph flex flex-wrap
              mobile:leading-snug
              tablet:leading-tight
              laptop:leading-tight
              laptop-lg:leading-tight
              desktop:leading-tight'>
              {/* "I'm", my name and its comma, held on one line */}
              <span className='inline-flex flex-nowrap whitespace-nowrap'>
                <SplitText text={BEFORE} id='animate-about-intro-lead' />
                {/* my name - point at it (or press it) to see my picture */}
                <span className='about-name' role='button' tabIndex={0} aria-label='Jay Beniza - show my picture'>
                  <SplitText text={NAME} id='animate-about-intro-lead' />
                  {/* the underline, drawn in by the introduction's reveal */}
                  <span className='about-name-line' aria-hidden='true'/>
                </span>
                <SplitText text=',' id='animate-about-intro' />
              </span>
              <SplitText text={tidy(AFTER)} id='animate-about-intro' />
            </p>
            {INTRO.slice(1).map((paragraph) => (
              <p className='about-paragraph flex flex-wrap
                mobile:leading-snug
                tablet:leading-tight
                laptop:leading-tight
                laptop-lg:leading-tight
                desktop:leading-tight'
                key={paragraph}>
                <SplitText text={tidy(paragraph)} id='animate-about-intro' />
              </p>
            ))}
          </div>
        </div>
        {/* the way down to my process, the next section, along the bottom
          on the right */}
        <div className='relative z-10 flex justify-end'>
          <ScrollCue label='Scroll to explore' />
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
      {/* what the people I work with say, on the dark surface - the light
        sections and dark in turn - just before the way to start a project */}
      <Testimonials dark/>
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
          <h2 className='self-start flex flex-wrap font-flexible font-semibold leading-[.95] tracking-tight
            mobile:col-span-8 mobile:row-start-1 text-closing
            tablet:col-span-8 tablet:row-start-1
            laptop:col-span-5 laptop:row-start-1
            laptop-lg:col-span-5 laptop-lg:row-start-1
            desktop:col-span-5 desktop:row-start-1'>
            <SplitText text='Work With Me' id='animate-about-page-resume' />
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
              {RESUME_LINKS.map(({ label, to, ...link }) => (
                <li className='account-container m-0' key={label}>
                  <div className='accounts'>
                    {to ? (
                      <TransitionLink to={to}>
                        <SplitText text={label} id='animate-about-page-resume' />
                      </TransitionLink>
                    ) : (
                      <a {...link}>
                        <SplitText text={label} id='animate-about-page-resume' />
                      </a>
                    )}
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
