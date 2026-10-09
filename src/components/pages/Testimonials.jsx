//
import React, { useEffect, useRef } from 'react'
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
// section label
import Tag from '../common/Tag'
// per-letter text split
import SplitText from '../common/SplitText'
// the page's one queue of reveals
import { inTurn } from '../../utils/scrollReveal'
// their pictures - small square crops of the photographs in /reference
import sergio from '../../assets/files/images/team/sergio-ramos-iii.jpg'
import paula from '../../assets/files/images/team/paula-malupa.jpg'
import richard from '../../assets/files/images/team/richard-ordinario.jpg'
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
    avatar: sergio,
    role: 'President, PCI Innovations Tech Center',
  },
  {
    id: 'paula-malupa',
    quote: [
      'Jay has always been someone the team can rely on. Over time, I’ve seen him take on bigger projects, build core systems, and continue to develop his skills.',
      'What stands out most is how thoughtful and steady he is. He takes the time to do things right and always finds a way to move the work forward.',
    ],
    name: 'Paula Malupa',
    avatar: paula,
    role: 'Executive Assistant, PCI Innovations Tech Center',
  },
  {
    id: 'richard-ordinario',
    quote: [
      'Working with Jay, you can see how much thought he puts into the experience behind a design. He’s creative, detail-oriented, and always thinking about how to make something easier for the user.',
      'He’s also curious and open to learning, which makes him the kind of designer and collaborator you want on a project.',
    ],
    name: 'Richard Ordinario',
    avatar: richard,
    role: 'Senior Full Stack Web Developer, PCI Innovations Tech Center',
  },
];

// when the first card comes in, by how much of the stack of cards is on
// screen: with 30% of its height above the bottom of the screen - so it
// is in, and can be read, by the time the section pins
const FIRST_AT = '30% bottom';
// the pinned scroll, in steps: a card takes one step to arrive. the
// first card is fully in before the section pins, so the rest start as
// soon as it does, one straight after another; READ is how long the
// finished stack is held before the page moves on
const READ = .4;
// how much pinned scroll (in screen heights) one step is
const STEP_LENGTH = .7;
// how much of a card is on screen when its text starts to rise
const SHOWING = .3;

/**
 * What my team says, on the light theme: dark cards that stack as the
 * page scrolls. The first card comes in by itself as the section comes up
 * the screen, so it is fully there when the section pins. Pinned, each
 * next card slides in over it
 * and stops a step further right, the last one's right edge landing on
 * the right gutter, every earlier card part in view behind the next.
 * Below laptop width the same happens top to bottom: the cards are full width,
 * come up from below, and each stops a step lower than the one before.
 */
function Testimonials() {
  const fxSection = useRef();

  useEffect(() => {
    const section = fxSection.current;
    const cards = gsap.utils.toArray('.testimonial-card', section);

    // (below laptop width the cards travel up the screen instead)
    const vertical = window.matchMedia('(max-width: 1023px)').matches;
    const away = vertical ? { y: () => window.innerHeight } : { x: () => window.innerWidth };
    const home = vertical ? { y: 0 } : { x: 0 };
    const frame = { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut' };

    // the first card, on its own time: it slides to its place, its text
    // rises, and its picture wipes open from its bottom edge. it plays
    // when the stack has come far enough up the screen, and goes back if
    // the page is scrolled back above that
    const first = gsap.timeline({ paused: true })
      .fromTo(cards[0], away, { ...home, ease: 'power2.out', duration: .9 }, 0)
      .to(cards[0].querySelectorAll('.split-letter'), { y: 0, ease: 'power1.in', duration: .5, stagger: { amount: .5 } }, .3)
      .to(cards[0].querySelector('.testimonial-avatar'), { ...frame, duration: .5 }, .5);
    // (in its turn among the page's reveals - scrollReveal.js)
    const turn = inTurn(first, section.querySelector('.testimonial-stack'));
    const arrive = ScrollTrigger.create({
      trigger: section.querySelector('.testimonial-stack'),
      start: FIRST_AT,
      onEnter: () => turn.play(),
      onLeaveBack: () => turn.reverse(),
    });

    // where in a later card's step SHOWING of it has come on screen. the
    // card travels the screen on a power2.out ease (1 - (1 - t)^2), so the
    // moment its leading edge still has a given distance to go is
    // t = 1 - sqrt(distance / screen). measured before anything moves
    const screen = vertical ? window.innerHeight : window.innerWidth;
    const top = section.getBoundingClientRect().top;
    const starts = cards.map((card) => {
      const rect = card.getBoundingClientRect();
      const distance = Math.max(0, vertical
        ? screen - (rect.top - top) - rect.height * SHOWING
        : screen - rect.left - rect.width * SHOWING);
      return 1 - Math.sqrt(Math.min(distance / screen, 1));
    });

    // the rest, scroll-coupled, while the section is pinned: a step each,
    // from the moment it pins
    const later = cards.slice(1);
    const stack = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${(later.length + READ) * STEP_LENGTH * 100}%`,
        pin: true,
        scrub: ScrollTrigger.isTouch ? .5 : true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
    later.forEach((card, i) => {
      const at = i;
      const from = at + starts[i + 1];
      stack
        .fromTo(card, away, { ...home, ease: 'power2.out', duration: 1 }, at)
        .to(card.querySelectorAll('.split-letter'), { y: 0, ease: 'power1.in', duration: .25, stagger: { amount: .35 } }, from)
        .to(card.querySelector('.testimonial-avatar'), { ...frame, duration: .35 }, from + .15);
    });
    // the finished stack is held a moment before the page moves on
    stack.to({}, { duration: READ });

    return () => {
      arrive.kill();
      turn.kill();
      first.revert();
      stack.scrollTrigger?.kill();
      stack.revert();
    };
  }, []);

  const last = TESTIMONIALS.length - 1;

  return (
    <>
      <section id='testimonials' className='theme-light flex flex-col h-screen-safe overflow-hidden
        mobile:px-[1rem] mobile:pt-16 mobile:pb-4
        tablet:px-[1rem] tablet:pt-16 tablet:pb-8
        laptop:px-[2rem] laptop:pt-20 laptop:pb-10
        laptop-lg:px-[3rem] laptop-lg:pt-20 laptop-lg:pb-12
        desktop:px-[3rem] desktop:pt-20 desktop:pb-12'
        ref={fxSection}>
        <div className='shrink-0'>
          <Tag label='What my team says' id='animate-testimonials-tag' />
        </div>
        {/* (the section's padding is kept short, top and bottom, so that on
          a low screen the cards still clear the label above them) */}
        {/* the stack, centred in the room under the label - on a phone it
          fills that room instead, and every card is the one fixed height
          (.testimonial-stack, App.scss). every card sits
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
          {TESTIMONIALS.map(({ id, quote, name, role, avatar }, i) => (
            <li className='testimonial-card theme-dark [grid-area:1/1] bg-card m-0'
              style={{ '--i': i, '--last': Math.max(last, 1) }}
              id={`testimonial-card-${id}`} key={id}>
              <figure className='h-full flex flex-col justify-between
                mobile:p-6 mobile:gap-y-8
                tablet:p-6 tablet:gap-y-12
                laptop:p-6 laptop:gap-y-10
                laptop-lg:p-6 laptop-lg:gap-y-10
                desktop:p-6 desktop:gap-y-12'>
                {/* the review - one paragraph, in quotation marks */}
                <blockquote>
                  <p className='testimonial-quote flex flex-wrap font-medium leading-snug
                    mobile:text-body
                    tablet:text-subtitle
                    laptop:text-subtitle
                    laptop-lg:text-subtitle
                    desktop:text-subtitle'>
                    <SplitText text={`“${quote.join(' ')}”`} id={`animate-testimonial-${id}`} by='word' />
                  </p>
                </blockquote>
                {/* who said it. the square is their profile picture. it is revealed with
                  the card (start state: .testimonial-avatar, App.scss) */}
                <figcaption className='flex items-center gap-x-4'>
                  <img className='testimonial-avatar shrink-0 w-12 h-12 object-cover' src={avatar} alt='' loading='lazy'/>
                  {/* centred on the picture. the nudge down is optical: the
                    heading face sits high in its line, which left the
                    pair looking above the picture's middle */}
                  <span className='testimonial-who flex flex-col justify-center gap-y-1'>
                    <span className='font-flexible font-medium leading-none text-subtitle'>
                      <SplitText text={name} id={`animate-testimonial-${id}`} />
                    </span>
                    <span className='flex flex-wrap text-caption leading-tight text-muted'>
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
