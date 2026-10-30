//
import React, { useEffect } from 'react'
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

const QUESTION = 'Have a product to design or build?';
const SUPPORT = "Tell me what you need, and I'll reply with next steps.";

// the ways through
const LINKS = [
  // first, the way to start a project: the request form (ContactPage.jsx)
  { label: 'Start a project', to: '/get-in-touch' },
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
  { label: 'GuRover', to: '/gurover' },
  { label: 'Portfolio', to: '/portfolio-2026' },
  { label: 'ReGain', to: '/regain' },
];

// its third face, closing a project page: the next project, by name - the
// heading itself is the way to it - over a brief description of it (the
// first sentence of its own) and the ways on from here: to it, back to the
// project before this one (by name), the full case study on Behance when
// the project has one (its `behance`, projects.js), and all the work. (back
// to the top is the button in the corner; getting in touch and the CV are in
// the top bar)
const brief = (description) => description.match(/^.*?[.!?](?=s|$)/)?.[0] || description;
const nextLinks = (next, previous, current) => [
  { label: 'Next project', to: next.path },
  ...(previous ? [{ label: `Previous: ${previous.title}`, to: previous.path }] : []),
  ...(current?.behance ? [{ label: 'Full case study on Behance', href: current.behance }] : []),
  { label: 'All work', to: '/work' },
];

/**
 * The closing screen, on the base colour, with the footer inside it so the
 * two fill exactly one screen: "Drop a Message" very large on the left, and on the right a short invitation
 * over the links a recruiter looks for.
 *
 * @param {boolean} [projects] - the same screen as "View My Projects":
 *   the heading, the text and the links are to the work (ContactPage.jsx)
 * @param {object} [next] - the same screen leading on to this project
 *   (its entry in projects.js): its name as the heading, and a link to it
 *   (ProjectPage.jsx)
 * @param {object} [previous] - with `next`, the project before this one,
 *   for the link back to it
 * @param {object} [current] - with `next`, the project this page is about,
 *   for the link to its full case study on Behance
 * @param {boolean} [page] - true when this is the whole page
 *   rather than a page's closing section: it then starts under the top bar
 *   instead of sliding over it, so it leaves room for the bar and does not
 *   ask the bar to hide (data-nav-cover, Navbar.jsx)
 */
function Contact({ page = false, projects = false, next, previous, current }) {
  const heading = next ? next.title : projects ? PROJECTS_HEADING : 'Send Me a Message';
  const text = next ? brief(next.description) : projects ? PROJECTS_TEXT : `${QUESTION} ${SUPPORT}`;
  const links = next ? nextLinks(next, previous, current) : projects ? PROJECTS_LINKS : LINKS;
  useEffect(() => {
    // headline, text and links rise letter by letter
    const reveal = scrollReveal('#animate-contact', { y: 0, stagger: .02, ease: 'power1.in' }, { trigger: '#contact' });
    return () => reveal.kill();
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
          <h2 className='self-start flex flex-wrap font-flexible font-semibold leading-[.95] tracking-tight
            mobile:col-span-8 mobile:row-start-1 text-closing
            tablet:col-span-8 tablet:row-start-1
            laptop:col-span-5 laptop:row-start-1
            laptop-lg:col-span-5 laptop-lg:row-start-1
            desktop:col-span-5 desktop:row-start-1'>
            {/* (leading on to a project, the heading only names it: the
              way there is the "Next project" link beside it) */}
            <SplitText text={heading} id='animate-contact' />
          </h2>
          {/* invitation + links - right */}
          <div className='text-copy
            mobile:col-span-8 mobile:row-start-2
            tablet:col-span-6 tablet:row-start-2
            laptop:col-span-3 laptop:col-start-6 laptop:row-start-1
            laptop-lg:col-span-3 laptop-lg:col-start-6 laptop-lg:row-start-1
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
                      <a href={href} {...(download ? { download } : /^(mailto|#)/.test(href) ? {} : { target: '_blank', rel: 'noreferrer' })}>
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
