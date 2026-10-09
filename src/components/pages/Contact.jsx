//
import React, { useEffect } from 'react'
// Resume
import Resume from '../../assets/files/Jayson_Beniza_ReadOnly.pdf'
// scroll reveal
import { scrollReveal } from '../../utils/scrollReveal'
// per-letter text split
import SplitText from '../common/SplitText'
// footer
import Footer from './Footer'
// page-to-page wipe
import { TransitionLink } from '../common/PageTransition'

const EMAIL = 'mailto:jaysonbeniza@gmail.com';

const QUESTION = 'Have a product that needs better design?';
const SUPPORT = "Let's create something useful, and make it feel great to use.";

// the ways through
const LINKS = [
  { label: 'Linked In', href: 'https://www.linkedin.com/in/jaybeniza/' },
  { label: 'Behance', href: 'https://www.behance.net/jbnza' },
  { label: 'Email', href: EMAIL },
  { label: 'Resume', href: Resume },
];

// the section's other face, on the contact page - which is itself the way
// to get in touch, so it closes on the work instead: `to` is a route
const PROJECTS_HEADING = 'View My Projects';
const PROJECTS_TEXT = 'Not ready to send a request? See what I have designed and built first.';
const PROJECTS_LINKS = [
  { label: 'All work', to: '/work' },
  { label: 'Portfolio 2026', to: '/portfolio-2026' },
  { label: 'Tingi', to: '/tingi' },
  { label: 'StockNear', to: '/stocknear' },
  { label: 'ReGain', to: '/regain' },
];

/**
 * The closing screen, on the base colour, with the footer inside it so the
 * two fill exactly one screen: "Drop a Message" very large on the left, and on the right a short invitation
 * over the links a recruiter looks for.
 *
 * @param {boolean} [projects] - the same screen as "View My Projects":
 *   the heading, the text and the links are to the work (ContactPage.jsx)
 * @param {boolean} [page] - true when this is the whole page
 *   rather than a page's closing section: it then starts under the top bar
 *   instead of sliding over it, so it leaves room for the bar and does not
 *   ask the bar to hide (data-nav-cover, Navbar.jsx)
 */
function Contact({ page = false, projects = false }) {
  const heading = projects ? PROJECTS_HEADING : 'Drop a Message';
  const text = projects ? PROJECTS_TEXT : `${QUESTION} ${SUPPORT}`;
  const links = projects ? PROJECTS_LINKS : LINKS;

  useEffect(() => {
    // headline, text and links rise letter by letter
    const reveal = scrollReveal('#animate-contact', { y: 0, stagger: .02, ease: 'power1.in' }, { trigger: '#contact', start: 'top 60%' });
    return () => reveal.kill();
  },[]);

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
              {links.map(({ label, href, to }) => (
                <li className='account-container m-0' key={label}>
                  <div className='accounts'>
                    {to ? (
                      <TransitionLink to={to}>
                        <SplitText text={label} id='animate-contact' />
                      </TransitionLink>
                    ) : (
                      <a href={href} {...(href.startsWith('mailto') ? {} : { target: '_blank', rel: 'noreferrer' })}>
                        <SplitText text={label} id='animate-contact' />
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

export default Contact
