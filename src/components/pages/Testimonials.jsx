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
import { inTurn, whenNear, refreshSoon, revealTrigger } from '../../utils/scrollReveal'
// the pictures open in pixels
import { pixelReveal } from '../../utils/pixels'
// their pictures - small square crops of the photographs in /reference
import sergio from '../../assets/files/images/team/sergio-ramos-iii.jpg'
import paula from '../../assets/files/images/team/paula-malupa.jpg'
import richard from '../../assets/files/images/team/richard-ordinario.jpg'
import prince from '../../assets/files/images/team/prince-bernard-diana.webp'
// their pictures, in the site's halftone dots
import HalftoneImage from '../common/HalftoneImage'
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
    role: 'President, PCI Tech Center',
  },
  {
    id: 'paula-malupa',
    quote: [
      'Jay has always been someone the team can rely on. Over time, I’ve seen him take on bigger projects, build core systems, and continue to develop his skills.',
      'What stands out most is how thoughtful and steady he is. He takes the time to do things right and always finds a way to move the work forward.',
    ],
    name: 'Paula Malupa',
    avatar: paula,
    role: 'Executive Assistant, PCI Tech Center',
  },
  {
    id: 'richard-ordinario',
    quote: [
      'Working with Jay, you can see how much thought he puts into the experience behind a design. He’s creative, detail-oriented, and always thinking about how to make something easier for the user.',
      'He’s also curious and open to learning, which makes him the kind of designer and collaborator you want on a project.',
    ],
    name: 'Richard Ordinario',
    avatar: richard,
    role: 'Senior Full Stack Developer, PCI Tech Center',
  },
  {
    id: 'prince-bernard-diana',
    quote: [
      'Jay quickly translates design requests and client feedback into updated web layouts, consistently delivering revisions within a day or two and preparing them for developer implementation.',
    ],
    name: 'Prince Bernard Diana',
    avatar: prince,
    role: 'Department Manager, PCI Tech Center',
  },
];

// when the first card comes in, by how much of the stack of cards is on
// screen: with 30% of its height above the bottom of the screen - so it
// is in, and can be read, by the time the section pins
const FIRST_AT = '30% bottom';
// the pinned scroll, in steps: how much scroll (in screen heights) each
// card holds the section for. a step's scroll only says which card is
// due: reaching it plays that card in on its own time, whatever the pace
// of the scroll, and scrolling back plays it out again
const STEP_LENGTH = .6;

/**
 * What my team says, on the light theme (or the dark surface, `dark`): dark cards, the full
 * height of the room under the label, that stack as the page scrolls. The
 * first card comes in by itself as the section comes up the screen, so it
 * is there to read when the section pins. Pinned, each stretch of
 * scrolling brings in the next card by itself - not tied to the scroll's
 * pace: it slides in over the card before and stops a step further right,
 * the last one's right edge landing on the right gutter, every earlier
 * card part in view behind the next, its text rising and its picture
 * opening as it lands. Scrolling back sends it out again.
 * Below laptop width the same happens top to bottom: the cards are full width,
 * come up from below, and each stops a step lower than the one before.
 */
function Testimonials({ dark = false }) {
  const fxSection = useRef();

  useEffect(() => {
    const section = fxSection.current;
    // the stack's timeline is built only once the section is near
    // (whenNear, scrollReveal.js): tied to the scroll, it is re-rendered -
    // every card's words read again - each time the page is re-measured,
    // and the page is re-measured several times as it loads
    // (pinning adds the stack's scroll length to the page: what is below is
    // measured again once it is in - refreshSoon, scrollReveal.js)
    const build = () => {
      const cards = gsap.utils.toArray('.testimonial-card', section);

      // (below laptop width the cards travel up the screen instead)
      const vertical = window.matchMedia('(max-width: 1023px)').matches;
      const away = vertical ? { y: () => window.innerHeight } : { x: () => window.innerWidth };
      const home = vertical ? { y: 0 } : { x: 0 };

      // the first card, on its own time: it slides to its place, its text
      // rises, and its picture opens in pixels from its bottom edge up. it plays
      // when the stack has come far enough up the screen (in its turn among
      // the section's reveals - scrollReveal.js), and goes back if the page
      // is scrolled back above that
      const first = gsap.timeline({ paused: true })
        .fromTo(cards[0], away, { ...home, ease: 'power3.out', duration: 1.4 }, 0)
        .to(cards[0].querySelectorAll('.split-letter'), { y: 0, ease: 'power2.out', duration: .7, stagger: { amount: .5 } }, .55)
        .add(pixelReveal(cards[0].querySelector('.testimonial-avatar'), { duration: .7 }), .7);
      const turn = inTurn(first, section.querySelector('.testimonial-stack'));
      const arrive = revealTrigger(section.querySelector('.testimonial-stack'), FIRST_AT, turn);

      // the rest, each with its own entrance on its own time: it slides to
      // its place, its text rising and its picture opening as it lands
      const later = cards.slice(1).map((card) => gsap.timeline({ paused: true })
        .fromTo(card, away, { ...home, ease: 'power3.out', duration: 1 }, 0)
        .to(card.querySelectorAll('.split-letter'), { y: 0, ease: 'power2.out', duration: .5, stagger: { amount: .35 } }, .4)
        .add(pixelReveal(card.querySelector('.testimonial-avatar'), { duration: .5 }), .5));
      // the section pinned for a step of scroll a later card, and one more
      // to read the last. each card due by the scroll comes in; any past
      // it (scrolled back) goes out
      const pin = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${(later.length + 1) * STEP_LENGTH * 100}%`,
        pin: true,
        anticipatePin: 1,
        // scrolling back up out of the pin, the first card goes out too,
        // as the later ones have - and comes back on the way down
        onLeaveBack: () => turn.reverse(),
        onEnter: () => turn.play(),
        onUpdate: ({ progress }) => {
          const due = Math.floor(progress * (later.length + 1));
          later.forEach((entrance, i) => {
            if (i < due) entrance.play();
            else entrance.reverse();
          });
        },
      });

      refreshSoon();

      return {
        kill() {
          arrive.kill();
          turn.kill();
          first.revert();
          pin.kill();
          later.forEach((entrance) => entrance.revert());
        },
      };
    };
    return whenNear(section, build).kill;
  }, []);

  const last = TESTIMONIALS.length - 1;

  return (
    <>
      <section id='testimonials' data-pinned className={`${dark ? 'bg-surface' : 'theme-light'} flex flex-col h-screen-safe overflow-hidden
        mobile:px-[1rem] mobile:pt-16 mobile:pb-4
        tablet:px-[1rem] tablet:pt-16 tablet:pb-8
        laptop:px-[2rem] laptop:pt-20 laptop:pb-10
        laptop-lg:px-[3rem] laptop-lg:pt-20 laptop-lg:pb-12
        desktop:px-[3rem] desktop:pt-20 desktop:pb-12`}
        ref={fxSection}>
        <div className='shrink-0'>
          <Tag label='What Collaborators Say' id='animate-testimonials-tag' />
        </div>
        {/* (the section's padding is kept short, top and bottom, so that on
          a low screen the cards still clear the label above them) */}
        {/* the stack, centred in the room under the label - on a phone it
          fills that room instead, and every card is the one fixed height
          (.testimonial-stack, App.css). every card sits
          in the one grid cell, so they are all as tall as the tallest;
          each is pushed right by its share of the
          room left over (--i / --last, App.css), the last one all the way */}
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
                    {/* a thin space inside each mark, so neither sits
                      against the letter beside it */}
                    <SplitText text={`“ ${quote.join(' ')} ”`} id={`animate-testimonial-${id}`} by='word' />
                  </p>
                </blockquote>
                {/* who said it. the square is their profile picture, in halftone. it is revealed with
                  the card (start state: .testimonial-avatar, App.css) */}
                <figcaption className='flex items-center gap-x-4'>
                  <HalftoneImage className='testimonial-avatar shrink-0 w-12 h-12' src={avatar} cell={2} />
                  {/* centred on the picture. the nudge down is optical: the
                    heading face sits high in its line, which left the
                    pair looking above the picture's middle */}
                  <span className='testimonial-who flex flex-col justify-center gap-y-1'>
                    <span className='font-flexible font-medium leading-none text-subtitle'>
                      <SplitText text={name} id={`animate-testimonial-${id}`} />
                    </span>
                    <span className='flex flex-wrap text-copy leading-tight text-muted'>
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
