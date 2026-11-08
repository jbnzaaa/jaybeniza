import React, { useEffect, useRef } from 'react'
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
// the section label, the split text, the button
import Tag from './Tag'
import SplitText from './SplitText'
import Button, { BUTTON_PARTS } from './Button'
// a gif, drawn in halftone dots
import HalftoneGif from './HalftoneGif'
// the pictures wipe open
import { pixelWipe } from '../../utils/pixels'
// the first panel comes in as the section does; the page is measured again
import { scrollRevealSequence, refreshSoon } from '../../utils/scrollReveal'

gsap.registerPlugin(ScrollTrigger)

// a letter's way out of its clip box, below and above
const below = (i, el) => el.offsetHeight * 1.05;
const above = (i, el) => -el.offsetHeight * 1.05;
// how long the change from one item to the next takes, in seconds
const TURN = 1.2;
// how far the page scrolls for each item while the section is held: a
// share of the screen's height. (a whole screen each, with the change
// half way through it, was a long scroll before anything moved)
const HOLD = .6;
const OPEN = 'inset(0% 0% 0% 0%)';
const SHUT = 'inset(100% 0% 0% 0%)';

/**
 * A run of items shown one whole screen at a time (Featured Work, Areas of
 * Expertise): the section is held while the page scrolls through them,
 * and each next item opens over the last. Each item fills the screen with
 * its picture - a cover, or a gif in halftone dots -
 * under a shade:
 * the section's label in the upper left (one for the run), the item's
 * label in the upper right, its name and a short paragraph in the lower
 * left, and the way to it in the lower right.
 *
 * The first item comes in as the section comes up the screen: its picture
 * wiping open from its foot, then its words rising. While
 * the section is held, scrolling on into the next one's share opens it -
 * playing out at its own pace: its picture wiping open over the last, the last
 * one's words going up and the next one's rising in; scrolled back, in reverse.
 *
 * @param {string} id - the section's id
 * @param {string} tag - the section's label
 * @param {{id: string, title: string, emphasis?: any, text: string, label: string|string[], to: string, cta: string, picture?: string, gif?: string, alt?: string, trim?: number[]}[]} items
 */
function PinnedPanels({ id, tag, items }) {
  const fxSection = useRef();

  useEffect(() => {
    const section = fxSection.current;
    const panels = gsap.utils.toArray('.pinned-panel', section).map((panel) => ({
      letters: panel.querySelectorAll('.pinned-panel-copy .split-letter'),
      button: panel.querySelector('.cta-button'),
      parts: panel.querySelectorAll(`.cta-button :is(${BUTTON_PARTS})`),
      media: panel.querySelector('.pinned-panel-media'),
      picture: panel.querySelector('.pinned-panel-picture'),
    }));
    const n = panels.length;
    // every picture starts slightly large and low, every button shut
    panels.forEach(({ button, picture }) => {
      gsap.set(picture, { scale: 1.15, yPercent: 6 });
      gsap.set(button, { clipPath: SHUT });
    });

    // the first comes in as the section comes up the screen
    const first = panels[0];
    const firstWipe = pixelWipe(first.media);
    const opening = scrollRevealSequence([
      { targets: firstWipe.target, vars: { at: 1, duration: 1.2, onUpdate: firstWipe.onUpdate } },
      { targets: first.picture, vars: { scale: 1, yPercent: 0, duration: 1.6 }, position: '<' },
      { targets: first.letters, vars: { y: 0, stagger: .015 }, position: .5 },
      { targets: first.button, vars: { clipPath: OPEN, duration: .5 }, position: .8 },
      { targets: first.parts, vars: { y: 0, duration: .4 }, position: 1 },
    ], { trigger: section, start: 'top 60%' });

    // the rest, while the section is held: one step for
    // each, in which its picture opens over the last in pixels and settles,
    // the last one's words go up out of their lines and its button shuts,
    // and this one's words rise in and its button opens
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } });
    tl.addLabel('panel-0', 0);
    for (let k = 1; k < n; k += 1) {
      const at = k - 1;
      tl.addLabel(`panel-${k}`, k);
      const now = panels[k];
      const last = panels[k - 1];
      const wipe = pixelWipe(now.media);
      tl.to(wipe.target, { at: 1, duration: .8, ease: 'power1.inOut', onUpdate: wipe.onUpdate }, at)
        .to(now.picture, { scale: 1, yPercent: 0, duration: 1, ease: 'power2.out' }, at)
        // (from-to, not drawn at once: drawn as the timeline is built, every
        // later item's words were put in their lines, and showed through)
        .fromTo(last.letters, { y: 0 }, { y: above, duration: .3, stagger: { amount: .1 }, ease: 'power2.in', immediateRender: false }, at)
        .fromTo(last.button, { autoAlpha: 1 }, { autoAlpha: 0, duration: .15, immediateRender: false }, at)
        .fromTo(now.letters, { y: below }, { y: 0, duration: .3, stagger: { amount: .2 }, ease: 'power2.out' }, at + .45)
        .fromTo(now.button, { clipPath: SHUT }, { clipPath: OPEN, duration: .2, ease: 'power2.inOut' }, at + .6)
        .fromTo(now.parts, { y: below }, { y: 0, duration: .2, ease: 'power2.out' }, at + .7);
    }
    // the indicator along the section's foot: a bar for each item, those
    // up to the one on screen filled - each filling as its item comes in
    const bars = [...section.querySelectorAll('.pinned-bar')];
    const markBars = (turn) => bars.forEach((bar, i) => bar.classList.toggle('pinned-bar-on', i <= turn));
    markBars(0);

    // (each step ends where the next starts: its label)
    tl.to({}, { duration: 0 }, n - 1);

    // the scroll only says which item's turn it is: as it passes into the
    // next item's share of the hold, the change to it plays out on its
    // own, at its own pace, however fast or slowly the page is scrolled -
    // and back again, scrolled back
    let shown = 0;
    const pin = n > 1 ? ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${Math.round(window.innerHeight * HOLD * (n - 1))}`,
      pin: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // (the next one's turn a quarter of the way into its share)
        const turn = Math.min(n - 1, Math.floor(self.progress * (n - 1) + .75));
        if (turn === shown) return;
        const steps = Math.abs(turn - shown);
        shown = turn;
        markBars(turn);
        tl.tweenTo(`panel-${turn}`, { duration: TURN * Math.min(steps, 2), ease: 'power1.inOut', overwrite: true });
      },
    }) : null;
    refreshSoon();

    return () => {
      opening.kill();
      pin?.kill();
      tl.revert();
      panels.forEach(({ button, picture, media }) => gsap.set([button, picture, media], { clearProps: 'all' }));
    };
  }, [items]);

  return (
    <section id={id} data-pinned ref={fxSection} className='pinned-panels relative h-screen-safe overflow-hidden bg-black'>
      {items.map((item, i) => (
        <article className='pinned-panel absolute inset-0' style={{ zIndex: i + 1 }} id={`${id}-${item.id}`} key={item.id}>
          {/* the picture, the whole screen (start state: .pinned-panel-media, App.css) */}
          <div className='pinned-panel-media absolute inset-0 overflow-hidden bg-black'>
            <div className='pinned-panel-picture w-full h-full'>
              {item.gif
                ? <HalftoneGif src={item.gif} alt={item.alt || ''} trim={item.trim} />
                : <img className='pinned-panel-image w-full h-full object-cover' src={item.picture} alt={item.alt || ''} loading='lazy' />}
            </div>
            {/* a shade over it, so the words read */}
            <div className='pinned-panel-shade absolute inset-0' aria-hidden='true' />
          </div>
          {/* its words, at the corners */}
          <div className='pinned-panel-copy relative z-[2] h-full flex flex-col justify-between pointer-events-none
            mobile:px-[1rem] mobile:pt-16 mobile:pb-[calc(1rem_+_4px)]
            tablet:px-[1rem] tablet:pt-16 tablet:pb-[calc(1rem_+_4px)]
            laptop:px-[2rem] laptop:pt-20 laptop:pb-[calc(2rem_+_4px)]
            laptop-lg:px-[3rem] laptop-lg:pt-24 laptop-lg:pb-[calc(3rem_+_4px)]
            desktop:px-[3rem] desktop:pt-28 desktop:pb-[calc(3rem_+_4px)]'>
            {/* upper right: its label (the upper left is the section's) */}
            {/* (on a phone or tablet, under the section's label on the left
              instead: beside it there was no room, and it wrapped word by word) */}
            <div className='flex
              mobile:justify-start mobile:mt-9 tablet:justify-start tablet:mt-9
              laptop:justify-end laptop-lg:justify-end desktop:justify-end'>
              <p className='flex flex-col text-caption
                mobile:items-start mobile:text-left tablet:items-start tablet:text-left
                laptop:items-end laptop:text-right laptop-lg:items-end laptop-lg:text-right desktop:items-end desktop:text-right'>
                {(Array.isArray(item.label) ? item.label : [item.label]).map((line) => (
                  <span className='flex flex-wrap whitespace-nowrap
                    mobile:justify-start tablet:justify-start laptop:justify-end laptop-lg:justify-end desktop:justify-end' key={line}>
                    <SplitText text={line} id={`animate-${id}-${item.id}`} />
                  </span>
                ))}
              </p>
            </div>
            {/* lower left: its name and a short paragraph; lower right: the way to it */}
            <div className='flex justify-between items-end gap-x-8
              mobile:flex-col mobile:items-start mobile:gap-y-6
              tablet:flex-col tablet:items-start tablet:gap-y-6'>
              <div className='flex flex-col gap-y-4
                laptop:w-[52%] laptop-lg:w-[48%] desktop:w-[44%]'>
                <h3 className='flex flex-col font-flexible font-medium leading-[.95] tracking-tight text-project mobile:text-title tablet:text-title'>
                  {/* (on set lines where it gives them - `titleLines`) */}
                  {(item.titleLines || [item.title]).map((line) => (
                    <span className='flex w-max whitespace-nowrap' key={line}>
                      <SplitText text={line} id={`animate-${id}-${item.id}`} emphasis={item.emphasis} />
                    </span>
                  ))}
                </h3>
                <p className='flex flex-wrap text-copy
                  mobile:w-full tablet:w-[80%] laptop:w-[86%] laptop-lg:w-[80%] desktop:w-[76%]'>
                  <SplitText text={item.text} id={`animate-${id}-${item.id}`} by='word' />
                </p>
              </div>
              {/* (only the button itself takes the pointer: the other items'
                hidden buttons sit in this same spot, and their boxes caught
                the pointer, so the one on screen never showed its hover) */}
              <span className='pinned-panel-cta shrink-0'>
                <Button label={item.cta} to={item.to} reveal='manual' />
              </span>
            </div>
          </div>
        </article>
      ))}
      {/* along the foot: a bar for each item, the indicator of which is on screen */}
      {items.length > 1 && (
        <div className='absolute left-0 bottom-0 w-full flex gap-x-1 z-[60] pointer-events-none' aria-hidden='true'>
          {items.map((item) => <span className='pinned-bar flex-1' key={item.id} />)}
        </div>
      )}
      {/* upper left: the section's label, over every item */}
      <div className='absolute top-0 left-0 z-[60] pointer-events-none
        mobile:px-[1rem] mobile:pt-16
        tablet:px-[1rem] tablet:pt-16
        laptop:px-[2rem] laptop:pt-20
        laptop-lg:px-[3rem] laptop-lg:pt-24
        desktop:px-[3rem] desktop:pt-28'>
        <Tag label={tag} id={`animate-${id}-tag`} />
      </div>
    </section>
  )
}

export default PinnedPanels
