import React, { useEffect, useRef } from 'react'
// GSAP
import gsap from 'gsap'
// the Hairline engine
import HL from '../../utils/hairline/kernel'

/**
 * One Hairline figure: an isometric line drawing that answers the pointer
 * (src/utils/hairline - the engine and the figures drawn on it). This is
 * the engine's host: a box of the figure's own 5:4 proportions holding its
 * svg, which the figure draws into and animates itself. It takes its
 * colours from the --hairline-* variables of whatever it sits in.
 *
 * @param {object} figure - a figure module's default export
 * @param {boolean} [play] - move the figure as a pointer would, with none
 *   on it: for as long as this is set, a point travels over the drawing -
 *   from part to part, or a slow figure of eight - and the figure
 *   answers it
 */
function Hairline({ figure, play = false }) {
  const fxStage = useRef();
  // what the mounted figure handed back
  const fxHandle = useRef();

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
    return () => {
      motion.removeEventListener('change', keepMoving);
      handle.destroy();
      svg.remove();
    };
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
    let path;
    if (spots) {
      // a figure of parts: the point goes from part to part, in their
      // order, and stops on each long enough for it to answer
      const at = { x: spots[0][0], y: spots[0][1] };
      path = gsap.timeline({ repeat: -1, onUpdate: () => tell('pointermove', at.x, at.y) });
      spots.forEach(([x, y], i) => path.to(at, { x, y, duration: i ? .45 : .01, ease: 'power2.inOut' }).to(at, { duration: .75 }));
    } else {
      // any other: a slow figure of eight, wide enough to run a figure
      // that is scrubbed from one side of its frame to the other
      const at = { turn: 0 };
      path = gsap.to(at, {
        turn: Math.PI * 2,
        duration: 7,
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
