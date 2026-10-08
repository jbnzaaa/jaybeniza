//
import React, { useEffect } from 'react'
// scroll reveal
import { scrollRevealCards } from '../../utils/scrollReveal'
// section label
import Tag from '../common/Tag'
// per-letter text split
import SplitText from '../common/SplitText'

// the line drawings beside each service. one stroke weight, no fills, in
// the light text colour on a dark panel - each a plain picture of the work it stands for
const ART = { viewBox: '0 0 400 240', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'square', role: 'img' };

// product design - two screens of a flow, wireframed, and the step between them
const ProductDesignArt = () => (
  <svg {...ART} aria-label='Two wireframed screens joined by an arrow'>
    <rect x='60' y='30' width='110' height='180'/>
    <path d='M60 56h110'/>
    <rect x='76' y='72' width='78' height='46'/>
    <path d='M76 72l78 46M154 72l-78 46'/>
    <path d='M76 134h78M76 150h52'/>
    <rect x='76' y='172' width='78' height='22'/>
    <path d='M186 120h28M204 110l10 10-10 10'/>
    <rect x='230' y='30' width='110' height='180'/>
    <path d='M230 56h110'/>
    <path d='M246 76h78M246 92h78M246 108h44'/>
    <rect x='246' y='128' width='34' height='34'/>
    <rect x='290' y='128' width='34' height='34'/>
    <rect x='246' y='172' width='78' height='22'/>
  </svg>
);

// design systems - a sheet of parts: swatches, type sizes, a button, a field, a switch
const DesignSystemsArt = () => (
  <svg {...ART} aria-label='A sheet of interface components'>
    <rect x='60' y='30' width='280' height='180'/>
    <path d='M200 30v180M60 120h280'/>
    <circle cx='96' cy='75' r='16'/>
    <circle cx='130' cy='75' r='16'/>
    <circle cx='164' cy='75' r='16'/>
    <path d='M226 100l16-48 16 48M232 84h20'/>
    <path d='M280 100l10-30 10 30M284 90h12'/>
    <rect x='80' y='146' width='100' height='24'/>
    <path d='M104 158h52'/>
    <rect x='80' y='180' width='100' height='14'/>
    <rect x='224' y='146' width='48' height='24' rx='12'/>
    <circle cx='260' cy='158' r='7'/>
    <rect x='224' y='180' width='14' height='14'/>
    <path d='M250 187h66'/>
  </svg>
);

// development - an editor window: its bar, indented lines of code, the angle brackets of a tag
const DevelopmentArt = () => (
  <svg {...ART} aria-label='A code editor window'>
    <rect x='60' y='30' width='280' height='180'/>
    <path d='M60 56h280'/>
    <circle cx='78' cy='43' r='4'/>
    <circle cx='94' cy='43' r='4'/>
    <circle cx='110' cy='43' r='4'/>
    <path d='M84 82h70M100 100h110M100 118h64M116 136h90M100 154h48M84 172h36'/>
    <path d='M262 104l-22 24 22 24M292 104l22 24-22 24M284 96l-14 64'/>
  </svg>
);

// what I do, in three parts
const SERVICES = [
  {
    id: 'product-design',
    title: 'Product Design',
    text: 'I design web and mobile apps from the first user flow to the final screen. That covers UI/UX design for web apps, mobile app design, and prototypes tested with real users before anything is built.',
    Art: ProductDesignArt,
  },
  {
    id: 'design-systems',
    title: 'Design Systems',
    text: 'I create design systems that keep products consistent as they grow, and I prepare clear handoff files so developers build exactly what was designed.',
    Art: DesignSystemsArt,
  },
  {
    id: 'development',
    title: 'Development',
    text: 'I write front-end code in React, Tailwind, HTML, CSS, and JavaScript, from full interfaces to landing pages and portfolio sites.',
    Art: DevelopmentArt,
  },
];

/**
 * What I do, on the dark surface: one wide card per service - its name and
 * a short description on the left half, a line drawing of the work on the
 * right. Stacked (drawing under text) below laptop width.
 */
function Services() {
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
          {SERVICES.map(({ id, title, text, Art }) => (
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
                  <p className='flex flex-wrap text-caption'>
                    <SplitText text={text} id={`animate-service-${id}`} by='word' />
                  </p>
                </div>
                {/* line drawing - on the dark base, in the light text colour */}
                <div className='service-art bg-black flex items-center justify-center
                  mobile:aspect-[16/9]
                  tablet:aspect-[16/9]
                  laptop:min-h-[16rem]
                  laptop-lg:min-h-[18rem]
                  desktop:min-h-[22rem]'>
                  <Art/>
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
