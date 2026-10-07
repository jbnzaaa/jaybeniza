//
import React, { useEffect } from 'react'
// scroll reveal
import { scrollReveal, scrollRevealCards } from '../../utils/scrollReveal'
// per-letter text split
import SplitText from '../common/SplitText'

// reviews from the people I work with, in their own words. `quote` is one
// entry per paragraph. add further reviews here - one fills the row, two
// or three share it
const TESTIMONIALS = [
  {
    id: 'sergio-ramos',
    quote: [
      'Jay is an invaluable asset to PCI. What began as design work has grown into developing robust systems and carrying greater responsibility, and he approaches all of it with quiet focus and an exceptional work ethic.',
      'He is someone we depend on, and his results speak for themselves.',
    ],
    name: 'Sergio Ramos III',
    role: 'President, PCI Innovations Tech Center',
  },
  {
    id: 'paula-malupa',
    quote: [
      'Jay continues to grow with us, moving from his first design tasks to managing larger projects and building our core systems.',
      'He brings a grounded, thoughtful approach to everything he takes on, and we can always rely on him to deliver.',
    ],
    name: 'Paula Malupa',
    role: 'Executive Assistant, PCI Innovations Tech Center',
  },
  {
    id: 'richard-ordinario',
    quote: [
      'I highly recommend Jay for any UI/UX role. He consistently delivers thoughtful, user-friendly designs and brings creativity and attention to detail to every project.',
      'He’s also eager to learn and grow, making him a valuable and adaptable member of any team.',
    ],
    name: 'Richard Ordinario',
    role: 'Senior Full Stack Web Developer',
  },
];

// columns from laptop width up, by how many reviews there are
const COLUMNS = {
  1: 'laptop:grid-cols-1 laptop-lg:grid-cols-1 desktop:grid-cols-1',
  2: 'laptop:grid-cols-2 laptop-lg:grid-cols-2 desktop:grid-cols-2',
};
const COLUMNS_MANY = 'laptop:grid-cols-3 laptop-lg:grid-cols-3 desktop:grid-cols-3';
// a review on its own has the row to itself, so it is set larger
const QUOTE_SOLO = `
  mobile:text-[1rem] mobile:leading-snug
  tablet:text-[1.3rem] tablet:leading-snug
  laptop:text-[1.7rem] laptop:leading-snug
  laptop-lg:text-[2rem] laptop-lg:leading-snug
  desktop:text-[2.4rem] desktop:leading-snug`;
const QUOTE = `
  mobile:text-[1rem] mobile:leading-snug
  tablet:text-[1.2rem] tablet:leading-snug
  laptop:text-[1.1rem] laptop:leading-snug
  laptop-lg:text-[1.3rem] laptop-lg:leading-snug
  desktop:text-[1.5rem] desktop:leading-snug`;

/**
 * What the people I work with say - on the landing page between the
 * selected projects and the contact section. One card per review.
 */
function Testimonials() {
  useEffect(() => {
    // section heading reveal
    const heading = scrollReveal('#animate-testimonials-header', { y: 0, stagger: .02, ease: 'power1.in' });

    // the cards rise in one after another, each followed by its text
    const cards = scrollRevealCards(TESTIMONIALS.map(({ id }) => ({
      card: `#testimonial-card-${id}`,
      text: `#animate-testimonial-${id}`,
    })), { group: '#testimonial-cards' });

    return () => {
      heading.kill();
      cards.kill();
    };
  }, []);

  const solo = TESTIMONIALS.length === 1;

  return (
    <>
      <div id='testimonials'>
        <section className='
          mobile:py-16 mobile:px-[.9rem]
          tablet:py-16 tablet:px-[1rem]
          laptop:py-20 laptop:px-[2rem]
          laptop-lg:py-24 laptop-lg:px-[3rem]
          desktop:py-28 desktop:px-[3rem]'>
          {/* section header - the size of the selected projects heading */}
          <div className='section-header-container flex flex-wrap font-flexible font-medium leading-none
            mobile:mb-6 mobile:text-[8vw]
            tablet:mb-8 tablet:text-[6vw]
            laptop:mb-10 laptop:text-[4vw]
            laptop-lg:mb-10 laptop-lg:text-[3.6vw]
            desktop:mb-12 desktop:text-[3.6vw]'>
            <SplitText text='Testimonials' id='animate-testimonials-header' />
          </div>
          {/* one card per review */}
          <ul id='testimonial-cards' className={`grid gap-5
            mobile:grid-cols-1
            tablet:grid-cols-1
            ${COLUMNS[TESTIMONIALS.length] || COLUMNS_MANY}`}>
            {TESTIMONIALS.map(({ id, quote, name, role }) => (
              <li className='reveal-card overflow-hidden bg-black m-0'
                id={`testimonial-card-${id}`} key={id}>
                <figure className='reveal-card-inner h-full flex flex-col justify-between
                  mobile:p-5 mobile:gap-y-10
                  tablet:p-8 tablet:gap-y-12
                  laptop:p-8 laptop:gap-y-16
                  laptop-lg:p-10 laptop-lg:gap-y-20
                  desktop:p-12 desktop:gap-y-24'>
                  {/* the review */}
                  <blockquote className={`entry-container flex flex-col gap-y-[1em] ${solo ? QUOTE_SOLO : QUOTE}
                    ${solo ? 'laptop:max-w-[85%] laptop-lg:max-w-[80%] desktop:max-w-[75%]' : ''}`}>
                    {/* one paragraph, in quotation marks */}
                    <p className='entry-line font-medium text-offwhite'>
                      <SplitText text={`“${quote.join(' ')}”`} id={`animate-testimonial-${id}`} by='word' />
                    </p>
                  </blockquote>
                  {/* who said it */}
                  <figcaption className='entry-container
                    mobile:text-[.9rem]
                    tablet:text-[.9rem]
                    laptop:text-[1rem]
                    laptop-lg:text-[1rem]
                    desktop:text-[1.1rem]'>
                    <p className='entry-line font-medium text-offwhite'>
                      <SplitText text={name} id={`animate-testimonial-${id}`} />
                    </p>
                    <p className='entry-line text-offwhite/60'>
                      <SplitText text={role} id={`animate-testimonial-${id}`} />
                    </p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}

export default Testimonials
