//
import React, { useEffect, useRef } from 'react'
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
// page-to-page wipe
import { TransitionLink } from '../common/PageTransition'
// scroll reveal
import { REVEAL_AT, inTurn } from '../../utils/scrollReveal'
// per-letter text split
import SplitText from '../common/SplitText'
gsap.registerPlugin(ScrollTrigger)

// where each card sits on the six column grid, in turn: the column it
// starts on and how many it spans. every card has a grid row to itself,
// so no card reaches into another's. on a phone every card is the full
// width (.work-item, App.css)
const PLACES = [
  '1 / span 3',
  '4 / span 3',
  '2 / span 3',
  '1 / span 2',
  '3 / span 3',
  '5 / span 2',
  '2 / span 3',
];
const place = (i) => ({
  '--col': PLACES[i % PLACES.length],
  gridRow: i + 1,
});

/**
 * The work page's list of cards (ProjectsPage.jsx, and the archive's):
 * every item on a six column grid, each in a row of its own and in a
 * different place across it. An item is its card - the cover - with its
 * name and label under it, outside the card; the card wipes open as it
 * scrolls into view, then they rise.
 *
 * An item: `key`, `title`, `label`, and any of `to` (the page it opens),
 * `action` (what the cursor says over it), `cover` (a background class),
 * `picture` (an image), and, with neither, `empty` - the two lines its
 * plain panel shows.
 */
function WorkGrid({ items }) {
  const fxGrid = useRef();

  useEffect(() => {
    const section = fxGrid.current;
    // a cover's picture settling into its frame as the frame opens
    const settle = { yPercent: 0, scale: 1, ease: 'power2.out' };
    // the pictures start slightly large and low in their frames
    const covers = gsap.set(gsap.utils.toArray('.work-cover-image', section), { yPercent: 14, scale: 1.15 });

    // each card as it comes up the screen: it wipes open from its bottom
    // edge, the picture easing down to size inside it
    // (each in its turn among the page's reveals - scrollReveal.js)
    const reveals = gsap.utils.toArray('.work-item', section).map((item) => {
      const wipe = gsap.timeline({ paused: true })
        .to(item.querySelector('.work-cover'), { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.out', duration: 1 }, 0)
        .to(item.querySelector('.work-cover-image'), { ...settle, duration: 1.2 }, 0);
      const turn = inTurn(wipe, item);
      const trigger = ScrollTrigger.create({ trigger: item, start: REVEAL_AT, onEnter: () => turn.play(), onLeaveBack: () => turn.reverse() });
      return { wipe, turn, trigger };
    });

    // its name and label rise on a trigger of their own: when they have
    // come on screen themselves - by which time the whole cover over them
    // is showing. (on the card's trigger they rose with the cover's first
    // edge, a screen before anyone had scrolled down to them)
    const texts = gsap.utils.toArray('.work-item-info', section).map((info) => {
      const rise = gsap.to(info.querySelectorAll('.split-letter'), { y: 0, duration: .7, stagger: { amount: .35 }, ease: 'power2.out', paused: true });
      const turn = inTurn(rise, info);
      const trigger = ScrollTrigger.create({ trigger: info, start: 'top 92%', onEnter: () => turn.play(), onLeaveBack: () => turn.reverse() });
      return { rise, turn, trigger };
    });

    return () => {
      reveals.forEach(({ wipe, turn, trigger }) => {
        trigger.kill();
        turn.kill();
        wipe.revert();
      });
      covers.revert();
      texts.forEach(({ rise, turn, trigger }) => {
        trigger.kill();
        turn.kill();
        rise.revert();
      });
    };
  }, [items]);

  return (
    <ul className='work-grid' ref={fxGrid}>
      {items.map(({ key, title, label, to, action, cover, picture, empty }, i) => {
        const item = (
          <>
            {/* the card - the cover. wipes open on scroll (start state:
              .work-cover, App.css) */}
            <div className='work-cover overflow-hidden aspect-[4/3]' data-cursor-anchor>
              {cover && <div className={`work-cover-image w-full h-full bg-cover bg-center ${cover}`}/>}
              {!cover && picture && <div className='work-cover-image w-full h-full bg-cover bg-left-top' style={{ backgroundImage: `url(${picture})` }}/>}
              {/* nothing to show yet - says so */}
              {!cover && !picture && (
                <div className='work-cover-image theme-dark project-empty w-full h-full'>
                  <p className='text-caption'>{empty[0]}</p>
                  <p className='text-caption text-muted'>{empty[1]}</p>
                </div>
              )}
            </div>
            {/* under the card, outside it: name and label - they rise once
              they are on screen themselves, the whole cover showing over
              them (the effect above) */}
            <div className='work-item-info pt-4'>
              <h2 className='flex flex-wrap font-flexible font-medium leading-none text-heading'>
                <SplitText text={title} id={`animate-work-${key}`} />
              </h2>
              <p className='flex flex-wrap text-caption text-muted mt-2'>
                <SplitText text={label} id={`animate-work-${key}`} by='word' />
              </p>
            </div>
          </>
        );
        return (
          <li className='work-item m-0' style={place(i)} key={key}>
            {to
              // over a card the cursor says what pressing it does (Cursor.jsx)
              ? <TransitionLink to={to} className='block' data-cursor={action} data-no-hover-roll>{item}</TransitionLink>
              : item}
          </li>
        );
      })}
    </ul>
  )
}

export default WorkGrid
