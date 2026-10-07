//
import React, { useEffect } from 'react'
// Components
import WorkExperience from './WorkExperience';
import CertificatesAwards from './CertificatesAwards';
import Footer from './Footer';
// icons
import {RiArrowRightDownLine} from 'react-icons/ri'
// Resume
import Resume from '../../assets/files/Jayson_Beniza.pdf'
// scroll reveal
import { scrollReveal } from '../../utils/scrollReveal'
// per-letter text split
import SplitText from '../common/SplitText'
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// the longer introduction. everything in it is drawn from the work
// experience entries below it - nothing here that they do not back up
const INTRO = [
  "I'm Jay Beniza, a UI/UX designer based in the Philippines with 3+ years designing web and mobile products. I work across the whole design process, from user flows and wireframes to prototypes and high-fidelity interfaces, and I build and maintain the design systems that keep those products consistent as they grow.",
  "At PCI Innovations Tech Center I've moved from Junior to Mid-Level UI/UX Designer, working alongside product, development and QA teams and presenting design rationale to stakeholders. I also write front-end code, so I can carry a design through to a working interface and hand over work that gets built the way it was designed.",
];

// what I do and what I do it with - one moving row each
const CAPABILITIES = [
  { id: 'design', title: 'Design', items: ['UX Design', 'User Flows', 'Wireframing', 'Prototyping', 'Usability Testing', 'High-Fidelity UI', 'Design Systems', 'Responsive Design', 'Design Handoff'] },
  { id: 'development', title: 'Development', items: ['HTML5', 'CSS3', 'SASS/SCSS', 'JavaScript', 'React', 'Tailwind CSS', 'Bootstrap', 'GSAP'] },
  { id: 'tools', title: 'Tools', items: ['Figma', 'Figma AI', 'Adobe Photoshop', 'Adobe Illustrator', 'Visual Studio Code', 'Git', 'Claude Code', 'NPM'] },
];

// a row's items are repeated this many times end to end, so the row is
// wider than any screen and its loop (one copy's width, App.scss) is seamless
const COPIES = [0, 1, 2, 3];

const RESUME_DESCRIPTION = 'Want the details before we talk? My resume lays out my experience, skills, certificates and awards in one file. Give it a read, and reach out if I look like a fit for your team.';
const RESUME_LINKS = [
  { label: 'Download resume', href: Resume, download: 'Jay-Beniza-Resume.pdf' },
  { label: 'Or email me', href: 'mailto:jaysonbeniza@gmail.com' },
];

const GUTTER = `
  mobile:px-[.9rem]
  tablet:px-[1rem]
  laptop:px-[2rem]
  laptop-lg:px-[3rem]
  desktop:px-[3rem]`;

/**
 * The About page, in order: introduction, experience, capabilities and
 * tools, education and certificates, awards and recognition, then the
 * closing résumé screen with the footer inside it. The landing page keeps
 * only a short introduction that links here. Return sits in the top bar
 * (Navbar.jsx).
 */
function AboutPage() {
  useEffect(() => {
    // each heading and the introduction reveal on their own as they
    // scroll in - the landing page's per-letter reveal
    const reveals = [
      '#animate-about-page-title',
      '#animate-about-page',
      '#animate-about-page-resume',
    ].map((target) => scrollReveal(target, { y: 0, stagger: .02, ease: 'power1.in' }));

    // the moving rows wipe up from their bottom edge, one after another
    const rows = scrollReveal('.marquee-row', { clipPath: 'inset(0% 0% 0% 0%)', stagger: .15, ease: 'power2.inOut' },
      { trigger: '#capabilities-rows' });

    // the black sections come up like a panel being raised - scroll-coupled.
    // as one enters, its top edge starts well below where it belongs and
    // climbs faster than the page scrolls, meeting its place by mid-screen.
    // only the edge is clipped, so nothing inside moves or re-measures.
    // not on phones or touch screens: there the page's height keeps
    // changing under the triggers (address bar, late reflow), and a clip
    // left part-way in cuts into the section's own content
    const usePanels = window.innerWidth >= 768 && !ScrollTrigger.isTouch;
    const panels = (usePanels ? gsap.utils.toArray('[data-section-reveal]') : []).map((panel) => gsap.fromTo(panel,
      { clipPath: () => `inset(${Math.round(window.innerHeight * .45)}px 0px 0px 0px)` },
      {
        clipPath: 'inset(0px 0px 0px 0px)',
        ease: 'none',
        scrollTrigger: {
          trigger: panel,
          start: 'top bottom',
          end: 'top 45%',
          scrub: true,
          invalidateOnRefresh: true,
        },
      }));

    return () => {
      reveals.forEach((reveal) => reveal.kill());
      rows.kill();
      panels.forEach((panel) => {
        panel.scrollTrigger?.kill();
        panel.revert();
      });
    };
  }, []);

  return (
    <>
      {/* intro - top padding clears the fixed nav bar */}
      <section className={`grid grid-cols-8 grid-rows-[auto_1fr] gap-x-5 pt-24 min-h-screen-safe ${GUTTER}
        mobile:pb-16 mobile:gap-y-6
        tablet:pb-16 tablet:gap-y-8
        laptop:pb-20 laptop:gap-y-10
        laptop-lg:pb-24 laptop-lg:gap-y-10
        desktop:pb-28 desktop:gap-y-12`}>
        <div className='col-span-8 flex flex-wrap
          mobile:text-[8vw]
          tablet:text-[6vw]
          laptop:text-[4vw]
          laptop-lg:text-[3.6vw]
          desktop:text-[3.6vw]'>
          <h1 className='font-flexible font-medium leading-none'>
            <SplitText text='About me' id='animate-about-page-title' />
          </h1>
        </div>
        <div className='flex flex-col self-end
          mobile:col-span-8 mobile:gap-y-5
          tablet:col-span-7 tablet:gap-y-6
          laptop:col-span-6 laptop:col-start-3 laptop:gap-y-8
          laptop-lg:col-span-5 laptop-lg:col-start-4 laptop-lg:gap-y-8
          desktop:col-span-5 desktop:col-start-4 desktop:gap-y-10'>
          {INTRO.map((paragraph) => (
            <p className='flex flex-wrap
              mobile:text-[1rem] mobile:leading-snug
              tablet:text-[1.2rem] tablet:leading-snug
              laptop:text-[1.4rem] laptop:leading-snug
              laptop-lg:text-[1.5rem] laptop-lg:leading-snug
              desktop:text-[1.7rem] desktop:leading-snug'
              key={paragraph}>
              <SplitText text={paragraph} id='animate-about-page' by='word' />
            </p>
          ))}
        </div>
      </section>
      {/* experience */}
      <WorkExperience/>
      {/* capabilities and tools - three rows that never stop moving, each
        the opposite way to the one above it */}
      <section className='flex flex-col justify-center min-h-screen-safe overflow-hidden
        mobile:py-16
        tablet:py-16
        laptop:py-20
        laptop-lg:py-24
        desktop:py-28'>
        <h2 className='sr-only'>Capabilities & Tools</h2>
        <div className='flex flex-col gap-y-3' id='capabilities-rows'>
          {CAPABILITIES.map((row, i) => (
            <div className='marquee-row' key={row.id}>
              {/* the moving strip. only the first copy is read out */}
              <div className={`marquee-track ${i % 2 ? 'marquee-track-reverse' : ''}`}>
                {COPIES.map((copy) => (
                  <ul className='marquee-set' aria-hidden={copy > 0} key={copy}>
                    {row.items.map((item) => (
                      <li className='marquee-chip bg-black text-offwhite font-medium
                        mobile:px-4 mobile:py-3 mobile:text-[1rem]
                        tablet:px-5 tablet:py-4 tablet:text-[1.3rem]
                        laptop:px-6 laptop:py-4 laptop:text-[1.5rem]
                        laptop-lg:px-7 laptop-lg:py-5 laptop-lg:text-[1.7rem]
                        desktop:px-8 desktop:py-6 desktop:text-[2rem]'
                        key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* education / certificates, awards and recognition */}
      <CertificatesAwards/>
      {/* download resume - this page's closing screen, laid out like the
        contact section (Contact.jsx) with the footer inside it. the top
        bar goes behind it the same way (data-nav-cover, Navbar.jsx) */}
      <div id='resume' data-nav-cover data-section-reveal className='flex flex-col min-h-screen-safe bg-black'>
        <section className='flex-1 bg-black grid grid-cols-8 grid-rows-[auto_1fr] gap-0
          mobile:p-[.9rem] mobile:pb-10 mobile:gap-y-16 mobile:grid-flow-row
          tablet:p-[1rem] tablet:pb-12 tablet:gap-y-20 tablet:grid-flow-row
          laptop:p-[2rem] laptop:grid-flow-col
          laptop-lg:p-[3rem] laptop-lg:grid-flow-col
          desktop:p-[3rem] desktop:grid-flow-col'>
          {/* heading - the contact section's size */}
          <div className='
            mobile:col-span-8 mobile:row-start-1
            tablet:col-span-8 tablet:row-start-1
            laptop:col-span-5 laptop:row-start-1
            laptop-lg:col-span-5 laptop-lg:row-start-1
            desktop:col-span-5 desktop:row-start-1'>
            <div className='flex flex-wrap font-flexible font-semibold leading-none tracking-tight text-white
              mobile:text-[24vw] mobile:mt-10
              tablet:text-[24vw] tablet:mt-14
              laptop:text-[15vw]
              laptop-lg:text-[15vw]
              desktop:text-[15vw]'>
              <SplitText text='Grab My Resume' id='animate-about-page-resume' />
            </div>
          </div>
          {/* description + links */}
          <div className='
            mobile:col-span-8 mobile:col-start-1 mobile:row-start-2
            tablet:col-span-8 tablet:col-start-1 tablet:row-start-2
            laptop:col-span-3 laptop:col-start-6 laptop:row-span-2 laptop:row-start-1
            laptop-lg:col-span-2 laptop-lg:col-start-7 laptop-lg:row-span-2 laptop-lg:row-start-1
            desktop:col-span-2 desktop:col-start-7 desktop:row-span-2 desktop:row-start-1'>
            <div className='flex flex-wrap font-monolisa font-regular text-white
              mobile:text-[.9rem] mobile:mb-20
              tablet:text-[.9rem] tablet:mb-20
              laptop:text-[1rem] laptop:mb-28
              laptop-lg:text-[1rem] laptop-lg:mb-24
              desktop:text-[1.1rem] desktop:mb-28'>
              <SplitText text={RESUME_DESCRIPTION} id='animate-about-page-resume' by='word' />
            </div>
            {/* the menu links' markup - their hover is the one made for a
              dark background - at the contact links' spacing */}
            <div className='font-monolisa
              mobile:text-[.9rem]
              tablet:text-[.9rem]
              laptop:text-[1rem]
              laptop-lg:text-[1rem]
              desktop:text-[1.1rem]'>
              {RESUME_LINKS.map(({ label, ...link }) => (
                <div className='page-link resume-link mb-2' key={label}>
                  <a {...link} className='inline-block'>
                    <div className='link'>
                      <span className='flex items-center text-offwhite'>
                        <SplitText text={label} id='animate-about-page-resume' />
                        <span className='menu-icon-clip'>
                          <span className='menu-icon' id='animate-about-page-resume'>
                            <RiArrowRightDownLine id='icon' className='fill-offwhite ml-1 text-2xl'/>
                          </span>
                        </span>
                      </span>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer/>
      </div>
    </>
  )
}

export default AboutPage
