//
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
// GSAP
import gsap from 'gsap'
import ScrollSmoother from 'gsap/ScrollSmoother'
// the site's button, and the bug on it
import Button from './Button'
import PixelBug from './PixelBug'
// per-letter text split
import SplitText from './SplitText'
// the site's pixel wipe, from the page transitions
import { usePixelCover } from './PageTransition'

// the words to space - the trade's own, ten letters at most so each is
// one line on a phone. a game is ROUNDS of them, drawn at random, none twice
const BANK = [
  'WIREFRAME', 'USER FLOW', 'KEY VISUAL', 'AFFORDANCE', 'WAYFINDING', 'PROTOTYPE', 'MOCKUP', 'PERSONA',
  'JOURNEY', 'HEURISTIC', 'USABILITY', 'KERNING', 'LEADING', 'TRACKING', 'TYPEFACE', 'BASELINE',
  'GUTTER', 'MARGIN', 'PADDING', 'WHITESPACE', 'HIERARCHY', 'CONTRAST', 'ALIGNMENT', 'BALANCE',
  'RHYTHM', 'SPACING', 'LAYOUT', 'COMPONENT', 'VARIANT', 'ICON SET', 'PALETTE', 'GRADIENT',
  'OPACITY', 'SHADOW', 'ELEVATION', 'RADIUS', 'MODAL', 'TOOLTIP', 'DROPDOWN', 'CHECKBOX',
  'TOGGLE', 'SLIDER', 'STEPPER', 'NAVBAR', 'SIDEBAR', 'BREADCRUMB', 'TAB BAR', 'CAROUSEL',
  'ACCORDION', 'SKELETON', 'LOADER', 'FEEDBACK', 'ONBOARDING', 'CHECKOUT', 'SIGN UP', 'SEARCH BAR',
  'FILTER', 'PAGINATION', 'GESTURE', 'TAP TARGET', 'MICROCOPY', 'UX WRITING', 'CTA', 'HERO',
  'FOOTER', 'HEADER', 'VIEWPORT', 'BREAKPOINT', 'RESPONSIVE', 'FLUID GRID', 'PIXEL', 'VECTOR',
  'KEYFRAME', 'EASING', 'MOTION', 'TRANSITION', 'OVERLAY', 'SURVEY', 'INTERVIEW', 'CARD SORT',
  'AB TEST', 'INSIGHT', 'EMPATHY', 'IDEATION', 'SKETCH', 'STORYBOARD', 'USER STORY', 'PAIN POINT',
  'TASK FLOW', 'SITEMAP', 'TAXONOMY', 'BRANDING', 'LOGOTYPE', 'WORDMARK', 'GLYPH', 'SERIF',
  'SANS SERIF', 'LIGATURE', 'ASCENDER', 'DESCENDER', 'X HEIGHT', 'CAP HEIGHT', 'ITALIC', 'DARK MODE',
  'ALT TEXT', 'MOODBOARD', 'AVATAR', 'WAVY LINE', 'TYPOGRAPHY', 'LAYERS', 'FRAME', 'PLAYGROUND',
  'FLYOUT', 'TOAST', 'BADGE',
];
const ROUNDS = 5;
const draw = () => [...BANK].sort(() => Math.random() - .5).slice(0, ROUNDS);
// a letter that stays put: the first and the last, and a space between
// words
const isFixed = (word, i) => i === 0 || i === word.length - 1 || word[i] === ' ';
// how far a letter starts off its place, as a share of the type's size
const SHIFT = [.06, .16];
// a word whose letters sit this far off on average, as a share of the
// type's size, scores nothing
const ZERO_AT = .12;
// how long after it opens its text waits: until the pixels over it have
// mostly cleared (PageTransition.jsx)
const OPENED = 1.1;
// the site's letter rise - the hero's (Hero.jsx)
const RISE = { y: 0, stagger: .02, ease: 'power1.in' };

// every letter but the first and last moved off its place, to either side
const scatter = (word) => word.split('').map((_, i) => {
  if (isFixed(word, i)) return 0;
  const off = SHIFT[0] + Math.random() * (SHIFT[1] - SHIFT[0]);
  return Math.random() < .5 ? -off : off;
});

/**
 * The kerning test: a word set large, its inner letters knocked out of
 * place. Each is dragged (or moved with the arrow keys) until the spacing
 * looks even; Compare shows where the letters belong, faintly behind
 * them, and how close they came, out of 100. After the last word, the
 * average. Offsets are kept as a share of the type's size, so the test is
 * the same at any width. Its text rises in letter by letter as the
 * site's does, each time it changes.
 */
function KerningTest({ onClose }) {
  const fxTest = useRef();
  const fxWord = useRef();
  const [words, setWords] = useState(draw);
  const [index, setIndex] = useState(0);
  const [offsets, setOffsets] = useState(() => scatter(words[0]));
  const [scores, setScores] = useState([]);
  const [compared, setCompared] = useState(false);
  const drag = useRef(null);
  const word = words[index];
  const finished = scores.length === ROUNDS && compared;

  // the type's size, to turn a drag in px into a share of it
  const size = () => parseFloat(getComputedStyle(fxWord.current).fontSize);
  const score = (all) => {
    const inner = all.filter((_, i) => !isFixed(word, i));
    const off = inner.reduce((sum, x) => sum + Math.abs(x), 0) / inner.length;
    return Math.round(100 * Math.max(0, 1 - off / ZERO_AT));
  };

  const move = (i, x) => setOffsets((all) => all.map((offset, j) => (j === i ? Math.max(-.3, Math.min(.3, x)) : offset)));
  const onPointerDown = (i) => (event) => {
    if (compared) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { i, x: event.clientX, from: offsets[i], size: size() };
  };
  const onPointerMove = (event) => {
    if (!drag.current) return;
    const { i, x, from, size: px } = drag.current;
    move(i, from + (event.clientX - x) / px);
  };
  const onPointerUp = () => { drag.current = null; };
  // the arrow keys move a letter a pixel (ten with shift)
  const onKeyDown = (i) => (event) => {
    const step = { ArrowLeft: -1, ArrowRight: 1 }[event.key];
    if (!step || compared) return;
    event.preventDefault();
    move(i, offsets[i] + (step * (event.shiftKey ? 10 : 1)) / size());
  };

  const compare = () => {
    setScores((all) => [...all, score(offsets)]);
    setCompared(true);
  };
  const next = () => {
    const to = index + 1;
    setIndex(to);
    setOffsets(scatter(words[to]));
    setCompared(false);
  };
  const again = () => {
    const fresh = draw();
    setWords(fresh);
    setIndex(0);
    setOffsets(scatter(fresh[0]));
    setScores([]);
    setCompared(false);
  };

  // the first rise waits for the pixels to clear off the panel
  const first = useRef(true);
  useEffect(() => { first.current = false; }, []);

  // each word rises in as it comes up, letter by letter from under its
  // clip box
  useEffect(() => {
    const tween = gsap.fromTo(fxWord.current.querySelectorAll('.kerning-letter'), { yPercent: 110 },
      { yPercent: 0, duration: .6, stagger: .04, ease: 'power3.out', delay: index || finished ? 0 : OPENED });
    return () => tween.kill();
  }, [index, finished]);

  // the captions - label, count, what to do, Close - rise as the site's
  // text does whenever they change: only the letters still down, so the
  // ones already up stay put
  useEffect(() => {
    const letters = [...fxTest.current.querySelectorAll('.split-letter')]
      .filter((letter) => !letter.closest('.cta-button') && gsap.getProperty(letter, 'y') !== 0);
    const tween = gsap.to(letters, { ...RISE, delay: first.current ? OPENED + .2 : .3 });
    return () => tween.kill();
  }, [index, compared, finished]);

  const average = Math.round(scores.reduce((sum, x) => sum + x, 0) / (scores.length || 1));
  const last = scores[scores.length - 1];
  const counter = finished ? 'Result' : `${String(index + 1).padStart(2, '0')}/${String(ROUNDS).padStart(2, '0')}`;
  const note = finished
    ? `Your average across ${ROUNDS} words, out of 100`
    : compared
      ? `${last} out of 100 - the faint letters show where they belong`
      : 'Drag the letters until the spacing looks even';

  return (
    <div className='flex flex-col justify-between h-full' ref={fxTest}>
      {/* top: its label as the site's section tags are set - [Label] -
        and the way out, set as the nav bar's links are */}
      <div className='flex justify-between items-center gap-x-4 text-caption'>
        <p className='flex'>
          <SplitText text='[Kerning test]' id='kerning-text' />
        </p>
        <button type='button' className='nav-item flex text-caption text-muted leading-none bg-transparent border-0 p-0 cursor-pointer'
          onClick={onClose}>
          <SplitText text='Close' id='kerning-text' />
        </button>
      </div>

      {/* the word - or, at the end, the average */}
      <div className='flex flex-col items-center gap-y-8'>
        <div className='kerning-word relative flex font-flexible font-bold leading-none text-[16vw] tablet:text-[13vw] laptop:text-[10vw] laptop-lg:text-[10vw] desktop:text-[9vw]'
          ref={fxWord}>
          {finished ? (
            <span className='kerning-letter-clip'><span className='kerning-letter inline-block'>{average}</span></span>
          ) : (
            <>
              {/* where the letters belong, shown faintly once compared - set
                exactly as the word over it is (the same clip box, the same
                inline-block letters), from the same corner, so a letter
                in its place covers its ghost exactly */}
              {compared && (
                <span className='kerning-letter-clip kerning-ghost absolute left-0 top-0 pointer-events-none' aria-hidden='true'>
                  {word.split('').map((letter, i) => <span className='inline-block' key={i}>{letter === ' ' ? '\u00a0' : letter}</span>)}
                </span>
              )}
              <span className='kerning-letter-clip relative' aria-label={word}>
                {word.split('').map((letter, i) => {
                  const fixed = isFixed(word, i);
                  return (
                    <span className={`kerning-letter inline-block ${fixed || compared ? '' : 'kerning-movable'}`}
                      style={{ transform: `translateX(${offsets[i]}em)` }}
                      {...(fixed ? { 'aria-hidden': true } : {
                        role: 'slider', tabIndex: compared ? -1 : 0, 'aria-label': `Letter ${letter}`,
                        'aria-valuemin': -30, 'aria-valuemax': 30, 'aria-valuenow': Math.round(offsets[i] * 100),
                        onPointerDown: onPointerDown(i), onPointerMove, onPointerUp, onPointerCancel: onPointerUp,
                        onKeyDown: onKeyDown(i),
                      })}
                      key={`${index}-${i}`}>
                      {letter === ' ' ? '\u00a0' : letter}
                    </span>
                  );
                })}
              </span>
            </>
          )}
        </div>
        <p className='flex flex-wrap justify-center text-caption text-muted text-center' aria-live='polite'>
          <SplitText text={note} id='kerning-text' by='word' key={note} />
        </p>
      </div>

      {/* along the foot, as on the hero: the word's number (or the
        result) lower left, and the next step - the site's button, wiping
        open as it comes - lower right */}
      <div className='flex justify-between items-end gap-x-6'>
        <p className='flex text-caption text-muted' aria-live='polite'>
          <SplitText text={counter} id='kerning-text' key={counter} />
        </p>
        {finished
          ? <Button label='Play again' onClick={again} reveal='mount' key='again' />
          : compared
            ? <Button label='Next word' onClick={next} reveal='mount' key={`next-${index}`} />
            : <Button label='Compare' onClick={compare} reveal='mount' key={`compare-${index}`} />}
      </div>
    </div>
  )
}

/**
 * The landing hero's game: a button in its lower right, with a pixel bug
 * on it, that opens the kerning test over the whole screen - in the
 * site's own pixel wipe, as a change of page is (usePixelCover): the
 * pixels spread from the button, the test opens under them, and they
 * clear off it; closing runs the same back to the hero. While it is open
 * the page stops scrolling under it; Escape or Close shuts it.
 */
function KerningGame() {
  const [open, setOpen] = useState(false);
  const cover = usePixelCover();
  const fxOpener = useRef();

  // (the pixels spread from what was pressed: the button to open, and to
  // close, the button it is back on)
  const show = (event) => cover(() => setOpen(true), event.currentTarget);
  const close = useCallback(() => cover(() => setOpen(false), fxOpener.current), [cover]);

  useEffect(() => {
    if (!open) return undefined;
    const smoother = ScrollSmoother.get();
    smoother?.paused(true);
    const onKey = (event) => { if (event.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      smoother?.paused(false);
    };
  }, [open, close]);

  return (
    <>
      <span className='inline-flex' ref={fxOpener}>
        <Button label='Test your eye' onClick={show} icon={PixelBug} outline />
      </span>
      {open && createPortal(
        // the phone menu's ground and margins; its top bar sits where the
        // nav bar's does
        <div className='kerning-panel bg-black fixed inset-0 z-[40]
          mobile:px-[1rem] mobile:pt-6 mobile:pb-8
          tablet:px-[1rem] tablet:pt-6 tablet:pb-8
          laptop:px-[2rem] laptop:pt-6 laptop:pb-10
          laptop-lg:px-[3rem] laptop-lg:pt-8 laptop-lg:pb-12
          desktop:px-[3rem] desktop:pt-8 desktop:pb-12'
          role='dialog' aria-modal='true' aria-label='Kerning test'>
          <KerningTest onClose={close} />
        </div>,
        document.body,
      )}
    </>
  )
}

export default KerningGame
