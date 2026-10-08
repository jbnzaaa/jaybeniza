//
import React, { useEffect, useRef } from 'react'
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
// section label
import Tag from '../common/Tag'
// per-letter text split
import SplitText from '../common/SplitText'
gsap.registerPlugin(ScrollTrigger)

// reviews from the people I work with, in their own words. `quote` is one
// entry per paragraph. add further reviews here - the stack spreads to fit
const TESTIMONIALS = [
  {
    id: 'sergio-ramos',
    quote: [
      'I’ve watched Jay grow from taking on design tasks to handling more complex systems and projects. He approaches his work with a lot of focus and care, and he doesn’t need to be the loudest person in the room to make an impact.',
      'When Jay takes ownership of something, we know it will get done well.',
    ],
    name: 'Sergio Ramos III',
    role: 'President, PCI Innovations Tech Center',
  },
  {
    id: 'paula-malupa',
    quote: [
      'Jay has always been someone the team can rely on. Over time, I’ve seen him take on bigger projects, build core systems, and continue to develop his skills.',
      'What stands out most is how thoughtful and steady he is. He takes the time to do things right and always finds a way to move the work forward.',
    ],
    name: 'Paula Malupa',
    role: 'Executive Assistant, PCI Innovations Tech Center',
  },
  {
    id: 'richard-ordinario',
    quote: [
      'Working with Jay, you can see how much thought he puts into the experience behind a design. He’s creative, detail-oriented, and always thinking about how to make something easier for the user.',
      'He’s also curious and open to learning, which makes him the kind of designer and collaborator you want on a project.',
    ],
    name: 'Richard Ordinario',
    role: 'Senior Full Stack Web Developer, PCI Innovations Tech Center',
  },
];

// how much pinned scroll (in screen heights) each card takes to arrive
const STEP_LENGTH = .7;
// how much of a card's width is on screen when its text starts to rise
const SHOWING = .3;

/**
 * Words from my team, on the light theme: dark cards that stack as the
 * page scrolls. The section pins; the first card slides in from the right
 * to the left gutter, then each next one slides in over the one before it
 * and stops a step further right, so the last card's right edge lands on
 * the right gutter and every earlier card stays part in view behind it.
 */
function Testimonials() {
  const fxSection = useRef();

  useEffect(() => {
    const section = fxSection.current;
    const cards = gsap.utils.toArray('.testimonial-card', section);

    // scroll-coupled. each card takes one step of the pinned scroll: it
    // travels in from beyond the right edge while its text rises, and the
    // last stretch holds the full stack before the page moves on.
    // the about section above pins too and is created first, so this is
    // measured after it
    const stack = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${cards.length * STEP_LENGTH * 100}%`,
        pin: true,
        scrub: ScrollTrigger.isTouch ? .5 : true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
    // where in a card's step SHOWING of its width has come on screen. the
    // card travels the screen's width on a power2.out ease (1 - (1 - t)^2),
    // so the moment its left edge still has a given distance to go is
    // t = 1 - sqrt(distance / width of screen). measured before the
    // timeline moves anything
    const screen = window.innerWidth;
    const starts = cards.map((card) => {
      const rect = card.getBoundingClientRect();
      const distance = Math.max(0, screen - rect.left - rect.width * SHOWING);
      return 1 - Math.sqrt(Math.min(distance / screen, 1));
    });
    cards.forEach((card, i) => {
      const from = i + starts[i];
      stack
        .fromTo(card, { x: () => window.innerWidth }, { x: 0, ease: 'power2.out', duration: 1 }, i)
        .to(card.querySelectorAll('.split-letter'), { y: 0, ease: 'power1.in', duration: .25, stagger: { amount: .35 } }, from)
        // their picture wipes open from its bottom edge, the way the cards do
        .to(card.querySelector('.testimonial-avatar'), { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut', duration: .35 }, from + .15);
    });
    stack.to({}, { duration: .4 });

    return () => {
      stack.scrollTrigger?.kill();
      stack.revert();
    };
  }, []);

  const last = TESTIMONIALS.length - 1;

  return (
    <>
      <section id='testimonials' className='theme-light flex flex-col h-screen-safe overflow-hidden
        mobile:px-[1rem] mobile:py-16
        tablet:px-[1rem] tablet:py-16
        laptop:px-[2rem] laptop:py-20
        laptop-lg:px-[3rem] laptop-lg:py-24
        desktop:px-[3rem] desktop:py-28'
        ref={fxSection}>
        <div className='shrink-0'>
          <Tag label='Words from my team' id='animate-testimonials-tag' />
        </div>
        {/* the stack, centred in the room under the label. every card sits
          in the one grid cell, so they are all as tall as the tallest;
          each is pushed right by its share of the
          room left over (--i / --last, App.scss), the last one all the way */}
        <div className='flex flex-1 min-h-0 items-center
          mobile:mt-6
          tablet:mt-8
          laptop:mt-8
          laptop-lg:mt-10
          desktop:mt-10'>
        <ul className='testimonial-stack grid w-full'>
          {TESTIMONIALS.map(({ id, quote, name, role }, i) => (
            <li className='testimonial-card theme-dark [grid-area:1/1] bg-card m-0'
              style={{ '--i': i, '--last': Math.max(last, 1) }}
              id={`testimonial-card-${id}`} key={id}>
              <figure className='h-full flex flex-col justify-between
                mobile:p-6 mobile:gap-y-8
                tablet:p-8 tablet:gap-y-12
                laptop:p-8 laptop:gap-y-12
                laptop-lg:p-10 laptop-lg:gap-y-16
                desktop:p-12 desktop:gap-y-20'>
                {/* the review - one paragraph, in quotation marks */}
                <blockquote>
                  <p className='flex flex-wrap font-medium text-subtitle leading-snug'>
                    <SplitText text={`“${quote.join(' ')}”`} id={`animate-testimonial-${id}`} by='word' />
                  </p>
                </blockquote>
                {/* who said it. the square is their profile picture - a
                  PLACEHOLDER panel until there is one. it is revealed with
                  the card (start state: .testimonial-avatar, App.scss) */}
                <figcaption className='flex items-center gap-x-4'>
                  <span className='testimonial-avatar project-placeholder shrink-0 w-12 h-12' aria-hidden='true'/>
                  <span className='flex flex-col gap-y-1'>
                    <span className='font-flexible font-medium leading-none text-subtitle'>
                      <SplitText text={name} id={`animate-testimonial-${id}`} />
                    </span>
                    <span className='flex flex-wrap text-caption text-muted'>
                      <SplitText text={role} id={`animate-testimonial-${id}`} />
                    </span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        </div>
      </section>
    </>
  )
}

export default Testimonials
