//
import React, { useEffect } from 'react'
// scroll reveal
import { scrollRevealCards } from '../../utils/scrollReveal'
// section label
import Tag from '../common/Tag'
// per-letter text split
import SplitText from '../common/SplitText'
// the drawing beside each service, and the three figures drawn for them
import Hairline from '../common/Hairline'
import layers from '../../utils/hairline/layers'
import tray from '../../utils/hairline/tray'
import code from '../../utils/hairline/code'

// what I do, in three parts. `detail` and `includes` are the longer
// account of a service - how it goes and what it covers. `figure` is the service's drawing: an
// isometric line figure that answers the pointer -
// a phone taken apart into its layers, a tray of interface parts, a
// browser window of code lines
const SERVICES = [
  {
    id: 'product-design',
    title: 'Product Design',
    text: 'I design web and mobile apps from the first user flow to the final screen. That covers UI/UX design for web apps, mobile app design, and prototypes tested with real users before anything is built.',
    detail: 'I start with who the product is for and what they need to get done, map the flow, then wireframe, prototype, and test before drawing the final screens. What you get is an interface real users have already tried.',
    includes: ['User flows', 'Wireframes', 'High-fidelity UI', 'Interactive prototypes', 'Usability testing'],
    figure: layers,
  },
  {
    id: 'design-systems',
    title: 'Design Systems',
    text: 'I create design systems that keep products consistent as they grow, and I prepare clear handoff files so developers build exactly what was designed.',
    detail: 'I build the component library and the rules around it: colour, type, spacing, and states, documented in Figma. Every new screen starts from the same parts, and developers get specs they can build from without guessing.',
    includes: ['Component libraries', 'Colour and type styles', 'Responsive layouts', 'Documentation', 'Developer handoff'],
    figure: tray,
  },
  {
    id: 'development',
    title: 'Development',
    text: 'I write front-end code in React, Tailwind, HTML, CSS, and JavaScript, from full interfaces to landing pages and portfolio sites.',
    detail: 'I turn designs into responsive, production-ready front-end, with the motion and the small details kept intact. Because I design as well, what ships matches what was designed.',
    includes: ['React', 'Tailwind CSS', 'HTML5, CSS3, SASS', 'JavaScript', 'GSAP animation'],
    figure: code,
  },
];

/**
 * What I do, on the dark surface: one wide card per service - its name and
 * a short description on the left half, a line figure of the work on the
 * right, which moves under the pointer. Stacked (figure under text) below
 * laptop width. The figure sets the card's height.
 *
 * @param {boolean} [detailed] - each service in full: a second paragraph
 *   on how it goes, and a list of what it covers (the landing page and
 *   the What I Do page both ask for it)
 */
function Services({ detailed = false }) {
  useEffect(() => {
    // each card gets its own turn: its frame wipes open as it scrolls
    // into view, then its text rises
    const cards = scrollRevealCards(SERVICES.map(({ id }) => ({
      card: `#service-card-${id}`,
      text: `#animate-service-${id}`,
    })));
    return () => cards.kill();
  }, []);

  return (
    <>
      <section id='what-i-do' className='bg-surface
        mobile:px-[1rem] mobile:py-16
        tablet:px-[1rem] tablet:py-16
        laptop:px-[2rem] laptop:py-20
        laptop-lg:px-[3rem] laptop-lg:py-24
        desktop:px-[3rem] desktop:py-28'>
        <Tag label='What I Do' id='animate-services-tag' />
        <ul className='flex flex-col gap-y-4
          mobile:mt-6
          tablet:mt-8
          laptop:mt-8
          laptop-lg:mt-10
          desktop:mt-10'>
          {SERVICES.map(({ id, title, text, detail, includes, figure }) => (
            <li className='reveal-card overflow-hidden bg-card m-0' id={`service-card-${id}`} key={id}>
              <div className='reveal-card-inner grid
                mobile:grid-cols-1
                tablet:grid-cols-1
                laptop:grid-cols-2
                laptop-lg:grid-cols-2
                desktop:grid-cols-2'>
                {/* name + description */}
                <div className='flex flex-col justify-between
                  mobile:p-6 mobile:gap-y-8
                  tablet:p-8 tablet:gap-y-10
                  laptop:p-8 laptop:gap-y-16
                  laptop-lg:p-10 laptop-lg:gap-y-20
                  desktop:p-12 desktop:gap-y-24'>
                  <h3 className='flex flex-wrap font-flexible font-medium leading-none text-heading'>
                    <SplitText text={title} id={`animate-service-${id}`} />
                  </h3>
                  <div className='flex flex-col gap-y-4'>
                    <p className='flex flex-wrap text-caption'>
                      <SplitText text={text} id={`animate-service-${id}`} by='word' />
                    </p>
                    {detailed && (
                      <>
                        <p className='flex flex-wrap text-caption text-muted'>
                          <SplitText text={detail} id={`animate-service-${id}`} by='word' />
                        </p>
                        {/* what it covers - ruled rows */}
                        <ul className='flex flex-col mt-4'>
                          {includes.map((item) => (
                            <li className='flex flex-wrap border-t border-white/20 py-3 m-0 text-caption' key={item}>
                              <SplitText text={item} id={`animate-service-${id}`} by='word' />
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
                {/* the figure - on the dark base, in the site's greys
                  (.service-art, App.scss) */}
                <div className='service-art bg-black flex items-center justify-center
                  mobile:py-4
                  tablet:py-6
                  laptop:py-8
                  laptop-lg:py-10
                  desktop:py-12'>
                  <Hairline figure={figure} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default Services
