//
import React, { useEffect, useRef } from 'react'
// Resume
import Resume from '../../assets/files/Jayson Beniza 2026.pdf'
// scroll reveal
import { scrollReveal } from '../../utils/scrollReveal'
// per-letter text split
import SplitText from '../common/SplitText'
// footer
import Footer from './Footer'
// page-to-page wipe
import { TransitionLink } from '../common/PageTransition'

const EMAIL = 'mailto:jaysonbeniza@gmail.com';

const QUESTION = 'Have a product or a role in mind?';
const SUPPORT = "Tell me about it, and I'll reply by email.";

// the ways through
const LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jaybeniza/' },
  { label: 'Behance', href: 'https://www.behance.net/jbnza' },
  { label: 'Email', href: EMAIL },
  { label: 'Download CV', href: Resume, download: 'Jay-Beniza-CV.pdf' },
];

// the section's other face, on the contact page - which is itself the way
// to get in touch, so it closes on the work instead: `to` is a route
const PROJECTS_HEADING = 'View My Projects';
const PROJECTS_TEXT = 'Not sure yet? Take your time with the work first.';
const PROJECTS_LINKS = [
  { label: 'All work', to: '/work' },
  { label: 'BiteWise', to: '/bitewise' },
  { label: 'StockNear', to: '/stocknear' },
  { label: 'Portfolio 2026', to: '/portfolio-2026' },
  { label: 'ReGain', to: '/regain' },
];

// its third face, closing a project page: the contact screen as it is on
// the landing page, with a band over the footer leading on to the next
// project - its name is the way to it, beside a line on what it is
const nextLinks = (next) => [
  { label: 'View project', to: next.path },
  { label: 'All work', to: '/work' },
];

/**
 * The closing screen, on the base colour, with the footer inside it so the
 * two fill exactly one screen: "Drop a Message" very large on the left, and on the right a short invitation
 * over the links a recruiter looks for.
 *
 * @param {boolean} [projects] - the same screen as "View My Projects":
 *   the heading, the text and the links are to the work (ContactPage.jsx)
 * @param {object} [next] - the project to lead on to (its entry in
 *   projects.js): a band over the footer with its name, linked, and a
 *   line on what it is (ProjectPage.jsx)
 * @param {boolean} [page] - true when this is the whole page
 *   rather than a page's closing section: it then starts under the top bar
 *   instead of sliding over it, so it leaves room for the bar and does not
 *   ask the bar to hide (data-nav-cover, Navbar.jsx)
 */
function Contact({ page = false, projects = false, next }) {
  const heading = projects ? PROJECTS_HEADING : 'Send Me a Message';
  const text = projects ? PROJECTS_TEXT : `${QUESTION} ${SUPPORT}`;
  const links = projects ? PROJECTS_LINKS : LINKS;
  const fxNext = useRef();

  useEffect(() => {
    // headline, text and links rise letter by letter
    const reveal = scrollReveal('#animate-contact', { y: 0, stagger: .02, ease: 'power1.in' }, { trigger: '#contact' });
    // the next project's band, as it comes up over the footer
    const band = next && scrollReveal('#animate-contact-next', { y: 0, stagger: .02, ease: 'power1.in' },
      { trigger: fxNext.current, start: 'top bottom' });
    return () => {
      reveal.kill();
      band?.kill();
    };
  },[next]);

  return (
    <>
      <div id='contact' {...(page ? {} : { 'data-nav-cover': '' })} className='flex flex-col min-h-screen-safe bg-black'>
        {/* room for the fixed top bar when this is the page itself */}
        {page && <div className='shrink-0 h-12'/>}
        <section className='flex-1 grid grid-cols-8 content-start gap-x-6
          mobile:px-[1rem] mobile:py-16 mobile:gap-y-10
          tablet:px-[1rem] tablet:py-16 tablet:gap-y-12
          laptop:px-[2rem] laptop:py-20 laptop:gap-y-12
          laptop-lg:px-[3rem] laptop-lg:py-24 laptop-lg:gap-y-12
          desktop:px-[3rem] desktop:py-28 desktop:gap-y-16'>
          {/* drop a message - left, its top level with the text on the right */}
          <h2 className='self-start flex flex-wrap font-flexible font-semibold leading-[.92] tracking-tight
            mobile:col-span-8 mobile:row-start-1 text-closing
            tablet:col-span-8 tablet:row-start-1
            laptop:col-span-5 laptop:row-start-1
            laptop-lg:col-span-5 laptop-lg:row-start-1
            desktop:col-span-5 desktop:row-start-1'>
            <SplitText text={heading} id='animate-contact' />
          </h2>
          {/* invitation + links - right */}
          <div className='text-caption
            mobile:col-span-8 mobile:row-start-2
            tablet:col-span-6 tablet:row-start-2
            laptop:col-span-2 laptop:col-start-7 laptop:row-start-1
            laptop-lg:col-span-2 laptop-lg:col-start-7 laptop-lg:row-start-1
            desktop:col-span-2 desktop:col-start-7 desktop:row-start-1'>
            <p className='flex flex-wrap mb-8'>
              <SplitText text={text} id='animate-contact' by='word' />
            </p>
            <ul className='flex flex-col gap-y-2'>
              {links.map(({ label, href, to, download }) => (
                <li className='account-container m-0' key={label}>
                  <div className='accounts'>
                    {to ? (
                      <TransitionLink to={to}>
                        <SplitText text={label} id='animate-contact' />
                      </TransitionLink>
                    ) : (
                      <a href={href} {...(download ? { download } : href.startsWith('mailto') ? {} : { target: '_blank', rel: 'noreferrer' })}>
                        <SplitText text={label} id='animate-contact' />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
        {/* the next project: label left, its name (the link to it) in the
          middle, what it is and the ways on right. (its name's letters
          roll under the pointer and the cursor's square goes into it,
          like the top bar's links) */}
        {next && (
          <div ref={fxNext} className='grid grid-cols-8 gap-x-6 items-end border-t border-rule
            mobile:mx-[1rem] mobile:pt-6 mobile:gap-y-4
            tablet:mx-[1rem] tablet:pt-6 tablet:gap-y-4
            laptop:mx-[2rem] laptop:pt-8
            laptop-lg:mx-[3rem] laptop-lg:pt-8
            desktop:mx-[3rem] desktop:pt-10'>
            <p className='flex flex-wrap text-caption self-start
              mobile:col-span-8
              tablet:col-span-8
              laptop:col-span-2
              laptop-lg:col-span-2
              desktop:col-span-2'>
              <SplitText text='Next project' id='animate-contact-next' />
            </p>
            <h3 className='flex flex-wrap font-flexible font-semibold leading-[.92] tracking-tight text-heading
              mobile:col-span-8
              tablet:col-span-8
              laptop:col-span-4
              laptop-lg:col-span-4
              desktop:col-span-4'>
              <TransitionLink to={next.path} className='nav-item flex flex-wrap font-flexible font-semibold [color:inherit]' aria-label={`Next project: ${next.title}`} data-cursor-snap>
                <SplitText text={next.title} id='animate-contact-next' />
              </TransitionLink>
            </h3>
            <div className='text-caption
              mobile:col-span-8
              tablet:col-span-6
              laptop:col-span-2
              laptop-lg:col-span-2
              desktop:col-span-2'>
              <p className='flex flex-wrap mb-4'>
                <SplitText text={`${next.short}.`} id='animate-contact-next' by='word' sentence />
              </p>
              <ul className='flex flex-wrap gap-x-6 gap-y-2'>
                {nextLinks(next).map(({ label, to }) => (
                  <li className='account-container m-0' key={label}>
                    <div className='accounts'>
                      <TransitionLink to={to}>
                        <SplitText text={label} id='animate-contact-next' />
                      </TransitionLink>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <Footer/>
      </div>
    </>
  )
}

export default Contact
