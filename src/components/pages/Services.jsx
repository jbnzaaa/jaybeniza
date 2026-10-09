//
import React, { useEffect, useState } from 'react'
// scroll reveal
import { scrollRevealCards } from '../../utils/scrollReveal'
// section label
import Tag from '../common/Tag'
// per-letter text split
import SplitText from '../common/SplitText'
// the drawing beside each service, and the figures drawn for them - one
// for each thing a service covers
import Hairline from '../common/Hairline'
import route from '../../utils/hairline/route'
import wire from '../../utils/hairline/wire'
import finish from '../../utils/hairline/finish'
import proto from '../../utils/hairline/proto'
import tasks from '../../utils/hairline/tasks'
import rack from '../../utils/hairline/rack'
import ramp from '../../utils/hairline/ramp'
import reflow from '../../utils/hairline/reflow'
import pages from '../../utils/hairline/pages'
import dock from '../../utils/hairline/dock'
import atom from '../../utils/hairline/atom'
import waves from '../../utils/hairline/waves'
import markup from '../../utils/hairline/markup'
import key from '../../utils/hairline/key'
import ease from '../../utils/hairline/ease'

// what I do, in three parts: a service's name, what I do in it, and
// `includes` - what it covers. Each thing it covers has a drawing of its
// own, an isometric line figure that answers the pointer: a flow as tiles
// on a board, a screen in bare blocks, a finished phone, two linked
// screens, a test script; a board of components, a ramp of chips over
// type, a page at every width, a booklet, a design meeting its build;
// and the front-end stack as itself - React's orbits, Tailwind's waves,
// a page in HTML, CSS and Sass, the JavaScript square, a puck on one of
// GSAP's ease curves
const SERVICES = [
  {
    id: 'product-design',
    title: 'UI/UX Design',
    text: 'I turn user needs into clear, intuitive digital experiences. From mapping user flows to building interactive prototypes, I validate ideas and refine the experience before moving to final UI.',
    includes: [
      { label: 'User flows', figure: route },
      { label: 'Wireframing', figure: wire },
      { label: 'High-fidelity UI', figure: finish },
      { label: 'Interactive prototyping', figure: proto },
      { label: 'Usability testing', figure: tasks },
    ],
  },
  {
    id: 'design-systems',
    title: 'Design Systems',
    text: 'I build scalable design systems that keep interfaces consistent and make collaboration easier. From reusable components to clear documentation, I create a shared foundation that helps designers and developers work more efficiently.',
    includes: [
      { label: 'Component libraries', figure: rack },
      { label: 'Color and typography styles', figure: ramp },
      { label: 'Responsive layouts', figure: reflow },
      { label: 'Design documentation', figure: pages },
      { label: 'Developer handoff', figure: dock },
    ],
  },
  {
    id: 'development',
    title: 'Front-End Development',
    text: 'I bring designs to life with responsive, production-ready code. Working with React, Tailwind CSS, and JavaScript, I bridge the gap between design and development while preserving the details that make each interface feel polished.',
    includes: [
      { label: 'React', figure: atom },
      { label: 'Tailwind CSS', figure: waves },
      { label: 'HTML5, CSS3, and Sass', figure: markup },
      { label: 'JavaScript', figure: key },
      { label: 'GSAP animations', figure: ease },
    ],
  },
];

/**
 * One service: its name and a short description on the left half, a line
 * figure on the right, which moves under the pointer. The figure is the
 * drawing of one of the things the service covers - the first, until
 * another row of the list is pointed at, focused or pressed, which shows
 * that row's drawing in its place and plays it for as long as the row is
 * pointed at.
 */
function ServiceCard({ id, title, text, includes, detailed }) {
  // which of the things it covers is drawn
  const [shown, setShown] = useState(0);
  // whether that drawing is being played: while its row is pointed at or
  // focused, it moves by itself, as it would under a pointer
  const [playing, setPlaying] = useState(false);
  // whether the drawing has been changed for another. the first one is
  // drawn in, line by line, as the card is revealed; one that takes its
  // place afterwards is simply there
  const [swapped, setSwapped] = useState(false);
  const { figure } = includes[shown];
  const show = (i) => {
    if (i !== shown) setSwapped(true);
    setShown(i);
    setPlaying(true);
  };

  return (
    <li className='reveal-card overflow-hidden bg-black m-0' id={`service-card-${id}`}>
      <div className='reveal-card-inner grid
        mobile:grid-cols-1
        tablet:grid-cols-1
        laptop:grid-cols-2
        laptop-lg:grid-cols-2
        desktop:grid-cols-2'>
        {/* name + description */}
        <div className='flex flex-col justify-between
          mobile:p-6 mobile:gap-y-8
          tablet:p-6 tablet:gap-y-10
          laptop:p-6 laptop:gap-y-16
          laptop-lg:p-6 laptop-lg:gap-y-20
          desktop:p-6 desktop:gap-y-24'>
          <h3 className='flex flex-wrap font-flexible font-medium leading-none text-heading'>
            <SplitText text={title} id={`animate-service-${id}`} />
          </h3>
          <div className='flex flex-col gap-y-4'>
            <p className='flex flex-wrap text-caption'>
              <SplitText text={text} id={`animate-service-${id}`} by='word' />
            </p>
            {detailed && (
              /* what it covers - ruled rows, each a button that shows its
                drawing; the row whose drawing is up is the one at full
                strength (.service-item, App.scss) */
              <ul className='flex flex-col mt-4'>
                {includes.map(({ label }, i) => (
                  <li className={`service-item border-t border-white/20 m-0 ${i === shown ? 'service-item-on' : ''}`} key={label}>
                    <button className='flex flex-wrap w-full py-3 text-left text-caption' type='button' aria-pressed={i === shown} data-cursor-free
                      onMouseEnter={() => show(i)} onFocus={() => show(i)} onClick={() => show(i)}
                      onMouseLeave={() => setPlaying(false)} onBlur={() => setPlaying(false)}>
                      {/* by the letter, so the label rolls on hover like every
                        other text button (hoverRoll.js) */}
                      <SplitText text={label} id={`animate-service-${id}`} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {/* the figure - on the dark base, in the site's greys
          (.service-art, App.scss). the first is drawn in, line by line,
          with the card; keyed, so another takes its place whole */}
        <div className='service-art bg-black flex items-center justify-center
          mobile:py-4
          tablet:py-6
          laptop:py-8
          laptop-lg:py-10
          desktop:py-12'>
          <Hairline figure={figure} play={playing} reveal={!swapped} key={figure.name} />
        </div>
      </div>
    </li>
  )
}

/**
 * What I do, on the dark surface: one wide card per service (ServiceCard).
 * Stacked (figure under text) below laptop width. The figure sets the
 * card's height.
 *
 * @param {boolean} [detailed] - each service in full: with the list of
 *   what it covers (the landing page and the What I Do page both ask
 *   for it)
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
          {SERVICES.map((service) => (
            <ServiceCard {...service} detailed={detailed} key={service.id} />
          ))}
        </ul>
      </section>
    </>
  )
}

export default Services
