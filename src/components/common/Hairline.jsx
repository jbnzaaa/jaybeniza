import React, { useEffect, useRef } from 'react'
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
// when a reveal starts
import { REVEAL_AT, CARD_AT } from '../../utils/scrollReveal'
// the Hairline engine
import HL from '../../utils/hairline/kernel'
gsap.registerPlugin(ScrollTrigger)

// a figure's reveal: every line of it drawn along its length, in seconds
// each, the first to the last starting across SPREAD
const DRAW = 1.5;
const SPREAD = .3;

/**
 * One Hairline figure: an isometric line drawing that answers the pointer
 * (src/utils/hairline - the engine and the figures drawn on it). This is
 * the engine's host: a box of the figure's own 5:4 proportions holding its
 * svg, which the figure draws into and animates itself. It takes its
 * colours from the --hairline-* variables of whatever it sits in.
 *
 * @param {object} figure - a figure module's default export
 * @param {boolean} [reveal] - draw the figure in, line by line, when it
 *   comes up the screen, and take the lines up again when the page is
 *   scrolled back above it (the default); unset, it is simply there
 * @param {boolean} [play] - move the figure as a pointer would, with none
 *   on it: for as long as this is set, a point travels over the drawing -
 *   from part to part, or a slow figure of eight - and the figure
 *   answers it
 */
function Hairline({ figure, play = false, reveal = true }) {
  const fxStage = useRef();
  // what the mounted figure handed back
  const fxHandle = useRef();
  // when its reveal will have finished (ms, performance.now's clock)
  const fxReady = useRef(0);

  useEffect(() => {
    const stage = fxStage.current;
    // the engine's own styles, added to the page once
    HL.inject(document);
    const svg = HL.mk('svg', { viewBox: '0 0 400 320', 'aria-hidden': 'true' }, stage);
    // a figure names what is under the pointer; nothing here shows it
    const read = { textContent: '' };
    // mounted at the middle of its range, as the figure's own page does
    const handle = figure.mount({ stage, svg, read }, figure.range[1]);
    fxHandle.current = handle;
    // the engine lands every spring and tween at once when the system
    // asks for less motion (Windows: Animation effects off), which showed
    // as a figure snapping back the moment the pointer left it. the rest
    // of the site animates whatever that setting is, so the figures do
    // too - said again whenever the setting changes, after the engine's
    // own listener has read it
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const keepMoving = () => HL.setReducedMotion(false);
    keepMoving();
    motion.addEventListener('change', keepMoving);

    // its reveal - the site's line reveal: nothing of it shows until it
    // has come up the screen as far as anything else does before it is
    // revealed, then each of its lines is drawn along its own length.
    // (the dashes this is done with are taken off again at the end: the
    // figure redraws its lines as it moves, and their lengths change)
    let drawing = null;
    let wait = null;
    let back = null;
    let shown = !reveal;
    if (reveal) gsap.set(stage, { autoAlpha: 0 });
    // its lines, each with its length as a dash. the engine's strokes do
    // not scale with the drawing, so their dashes are measured on screen,
    // not in the drawing's own units: a line's length is scaled to the
    // size the figure is shown at (and a little over). without this a
    // line was drawn only part of the way and jumped to its full length
    // when the dashes came off
    const measure = () => {
      const scale = (svg.getBoundingClientRect().width / 400 || 1) * 1.05;
      return [...svg.querySelectorAll('path')]
        .filter((line) => !line.classList.contains('dash') && line.getAttribute('d'))
        .map((line) => ({ line, length: line.getTotalLength() * scale }));
    };
    const draw = () => {
      if (shown) return;
      shown = true;
      drawing?.kill();
      const lines = measure();
      lines.forEach(({ line, length }) => gsap.set(line, { strokeDasharray: length, strokeDashoffset: length }));
      gsap.set(stage, { autoAlpha: 1 });
      fxReady.current = performance.now() + (DRAW + SPREAD) * 1000;
      drawing = gsap.to(lines.map(({ line }) => line), {
        strokeDashoffset: 0,
        duration: DRAW,
        ease: 'power2.out',
        stagger: { amount: SPREAD },
        onComplete: () => gsap.set(lines.map(({ line }) => line), { clearProps: 'strokeDasharray,strokeDashoffset' }),
      });
    };
    // and back: the lines are taken up again, last drawn first, and the
    // figure is gone - as the card it is in closes
    const undraw = () => {
      if (!shown) return;
      shown = false;
      drawing?.kill();
      const lines = measure();
      lines.forEach(({ line, length }) => {
        // (a line caught part way through being drawn goes back from there)
        if (line.style.strokeDasharray) gsap.set(line, { strokeDasharray: length });
        else gsap.set(line, { strokeDasharray: length, strokeDashoffset: 0 });
      });
      drawing = gsap.to(lines.map(({ line }) => line), {
        strokeDashoffset: (i) => lines[i].length,
        duration: DRAW * .7,
        ease: 'none',
        stagger: { amount: SPREAD, from: 'end' },
        onComplete: () => gsap.set(stage, { autoAlpha: 0 }),
      });
    };
    if (!reveal) fxReady.current = 0;
    else {
      // drawn when it has come up the screen as far as anything does
      // before it is revealed; undone where its card closes again on the
      // way back up (scrollRevealCards, scrollReveal.js), and drawn again
      // from there if the page is scrolled back down
      // (in a card, it goes by the card: drawn as the card opens)
      const card = stage.closest('.reveal-card');
      wait = ScrollTrigger.create({ trigger: card || stage, start: card ? CARD_AT : REVEAL_AT, onEnter: draw });
      back = ScrollTrigger.create({ trigger: card || stage, start: 'top 55%', onEnter: draw, onLeaveBack: undraw });
      const box = (card || stage).getBoundingClientRect();
      if ((card ? box.top + box.height * .3 : box.top + window.innerHeight * .15) < window.innerHeight) draw();
    }

    return () => {
      wait?.kill();
      back?.kill();
      drawing?.kill();
      motion.removeEventListener('change', keepMoving);
      handle.destroy();
      svg.remove();
    };
    // (reveal is read once, as the figure mounts: it is what this figure
    // does on arriving, not something to redo if it changes later)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [figure]);

  useEffect(() => {
    if (!play) return undefined;
    const stage = fxStage.current;
    // the engine reads the pointer from the stage's own pointer events,
    // so it is given them. (not bubbled: the page's own pointer handlers
    // never hear of it)
    const tell = (type, x = 0, y = 0) => {
      const box = stage.getBoundingClientRect();
      stage.dispatchEvent(new PointerEvent(type, {
        pointerType: 'mouse',
        clientX: box.left + x / 400 * box.width,
        clientY: box.top + y / 320 * box.height,
      }));
    };
    const spots = fxHandle.current?.spots;
    // not before the figure has been drawn in
    const delay = Math.max(0, (fxReady.current - performance.now()) / 1000);
    let path;
    if (spots) {
      // a figure of parts: the point goes from part to part, in their
      // order, and stops on each long enough for it to answer
      const at = { x: spots[0][0], y: spots[0][1] };
      path = gsap.timeline({ delay, repeat: -1, onUpdate: () => tell('pointermove', at.x, at.y) });
      spots.forEach(([x, y], i) => path.to(at, { x, y, duration: i ? .45 : .01, ease: 'power2.inOut' }).to(at, { duration: .75 }));
    } else {
      // any other: a slow figure of eight, wide enough to run a figure
      // that is scrubbed from one side of its frame to the other
      const at = { turn: 0 };
      path = gsap.to(at, {
        turn: Math.PI * 2,
        duration: 7,
        delay,
        ease: 'none',
        repeat: -1,
        onUpdate: () => tell('pointermove', 200 + 135 * Math.sin(at.turn), 160 + 55 * Math.sin(at.turn * 2)),
      });
    }
    return () => {
      path.kill();
      // and the figure goes back to rest
      tell('pointerleave');
    };
  }, [figure, play]);

  return (
    <div data-hairline={figure.name} role='img' aria-label={figure.means} ref={fxStage}/>
  )
}

export default Hairline
