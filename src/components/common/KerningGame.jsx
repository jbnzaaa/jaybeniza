//
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
// GSAP
import gsap from 'gsap'
import ScrollSmoother from 'gsap/ScrollSmoother'
// the site's button, and the bug on it
import Button from './Button'
import PixelBug from './PixelBug'
// per-letter text split
import SplitText from './SplitText'
// the modal opens and shuts in pixels
import { pixelToggle } from '../../utils/pixels'
// its letters open in pixels as they rise
import { pixelText, withPixels } from '../../utils/pixelText'

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
// how far a letter starts off its place, as a share of the type's size -
// small: further, and neighbouring letters overlap
const SHIFT = [.015, .04];
// the least a word can start off by, as its spacing error (below): a word
// that happened to start nearly right still has a scale to be scored on
const MIN_START = .02;

// how far a word's spacing is off. what is judged is spacing - the gaps
// between neighbouring letters - not where each letter is: a run of
// letters moved together is spaced as before inside it, and only the two
// gaps at its ends are wrong. each gap's error is how far it is from the
// type's own, as a share of the type's size, less `slack` (half a screen
// pixel, which no one can place a letter closer than); the word's is the
// average over its gaps. (gaps either side of a space are counted as any
// other: the space is a fixed letter)
const spacingError = (word, all, slack = 0) => {
  const gaps = all.slice(1).map((x, i) => Math.max(0, Math.abs(x - all[i]) - slack));
  return gaps.reduce((sum, gap) => sum + gap, 0) / (gaps.length || 1);
};
// how long after it opens its text waits: until the modal's pixels have
// mostly switched on (KerningGame, below)
const OPENED = .5;
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
  // where this word's letters started, for its score's scale
  const [start, setStart] = useState(offsets);
  const [scores, setScores] = useState([]);
  const [compared, setCompared] = useState(false);
  const drag = useRef(null);
  const word = words[index];
  const finished = scores.length === ROUNDS && compared;

  // the type's size, to turn a drag in px into a share of it
  const size = () => parseFloat(getComputedStyle(fxWord.current).fontSize);
  // out of 100: 100 with every gap right (to within half a pixel), 0 with
  // the spacing as far off as it started - or further. so leaving the word
  // as it came scores nothing, and the score is the share of its error put
  // right
  const score = (all) => {
    const slack = .5 / size();
    const from = Math.max(MIN_START, spacingError(word, start, slack));
    return Math.round(100 * Math.max(0, 1 - spacingError(word, all, slack) / from));
  };

  const move = (i, x) => setOffsets((all) => all.map((offset, j) => (j === i ? Math.max(-.15, Math.min(.15, x)) : offset)));
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

  // (once a word: Compare is only offered before it is compared)
  const compare = () => {
    if (compared) return;
    setScores((all) => [...all, score(offsets)]);
    setCompared(true);
  };
  const next = () => {
    const to = index + 1;
    const scattered = scatter(words[to]);
    setIndex(to);
    setOffsets(scattered);
    setStart(scattered);
    setCompared(false);
  };
  const again = () => {
    const fresh = draw();
    const scattered = scatter(fresh[0]);
    setWords(fresh);
    setIndex(0);
    setOffsets(scattered);
    setStart(scattered);
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
    const mask = pixelText(letters);
    const tween = gsap.to(letters, withPixels({ ...RISE, delay: first.current ? OPENED + .2 : .3 }, mask));
    return () => { tween.kill(); mask?.clear(); };
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
        <div className='kerning-word relative flex font-flexible font-bold leading-none text-[15vw] tablet:text-[12vw] laptop:text-[9vw] laptop-lg:text-[8vw] desktop:text-[7vw]'
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
 * on it, that opens the kerning test in a modal - a dark box over the
 * page, which dims behind it. The box opens in square pixels from its
 * bottom edge up and shuts the same way. While it is open the page stops
 * scrolling under it; Escape, Close or a click outside the box shuts it.
 */
function KerningGame() {
  const [open, setOpen] = useState(false);
  const fxBackdrop = useRef();
  const fxModal = useRef();
  const toggle = useRef(null);

  const show = () => setOpen(true);
  const close = useCallback(() => {
    if (!toggle.current) return;
    gsap.to(fxBackdrop.current, { autoAlpha: 0, duration: .4, ease: 'power2.in' });
    toggle.current.hide(.4).eventCallback('onComplete', () => setOpen(false));
  }, []);

  // as it opens: the page behind dims and the box switches on in pixels
  useLayoutEffect(() => {
    if (!open) return undefined;
    toggle.current = pixelToggle(fxModal.current);
    gsap.fromTo(fxBackdrop.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: .4, ease: 'power2.out' });
    toggle.current.show(.6);
    return () => {
      toggle.current?.kill();
      toggle.current = null;
    };
  }, [open]);

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
      <span className='inline-flex'>
        <Button label='Test your eye' onClick={show} icon={PixelBug} outline />
      </span>
      {open && createPortal(
        // the page dimmed behind, and the box centred on it
        <div className='kerning-backdrop fixed inset-0 z-[40] flex items-center justify-center
          mobile:p-[1rem] tablet:p-[1rem] laptop:p-[2rem] laptop-lg:p-[3rem] desktop:p-[3rem]'
          ref={fxBackdrop} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
          <div className='kerning-panel bg-black w-full max-w-[72rem]
            mobile:h-[80svh] tablet:h-[70svh] laptop:h-[min(80svh,44rem)] laptop-lg:h-[min(80svh,44rem)] desktop:h-[min(80svh,48rem)]
            mobile:p-4 tablet:p-6 laptop:p-6 laptop-lg:p-8 desktop:p-8'
            ref={fxModal} role='dialog' aria-modal='true' aria-label='Kerning test'>
            <KerningTest onClose={close} />
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}

export default KerningGame
