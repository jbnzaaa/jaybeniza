import React, { useEffect, useLayoutEffect, useRef } from 'react'
// GSAP
import gsap from 'gsap'
// the page's reveals wait behind this screen
import { holdReveals, releaseReveals, COVER_LEFT } from '../../utils/scrollReveal'
// the screen's pixels
import { pixelSweep } from '../../utils/pixels'

// the local faces the page is set in, each with sample text. they are
// requested explicitly because the browser only fetches a font once
// something on screen uses it, and nothing but this screen is mounted
// while it is up: Ayr Garon for headlines, Gilgan for the rest
const FONTS = [
  ['700 1em "Ayr Garon"', 'A0%&'],
  ['1em Gilgan', 'a'],
];
// never hold the page hostage to a font that fails or stalls
const TIMEOUT_MS = 4000;

// the screen is given time to be seen, however fast the fonts arrive: the
// count runs for at least COUNT seconds, and rests at 100 for HOLD before
// the screen goes. kept short - with the figure's drop (DROP) and the
// pixels' sweep (SWEEP) the whole screen is gone in under a second on a
// cached visit, so a visitor is never kept waiting on it
const COUNT = .35;
const HOLD = .05;
// how long the figure takes to drop out, and the pixels to clear, in seconds
const DROP = .2;
const SWEEP = .35;

/**
 * Full-screen black loading screen, made of pixels - the material a
 * designer adjusts. In the lower left the loaded percentage, at the hero
 * headline's size, rising out of a clip box. On exit the figure drops
 * back down, then
 * the screen breaks into square pixels that switch off in a sweep from
 * the top left - each lit for a moment, like a pixel being edited, before
 * it goes - and the page shows through.
 *
 * Drawn on one canvas, a rectangle a pixel, so the exit costs a few
 * hundred fills a frame and nothing for the page's layout.
 *
 * @param {() => void} onExitStart - fired as the exit begins, so the page
 *   can mount underneath and play its own reveals while the pixels clear
 * @param {() => void} onDone - fired once the screen is fully gone
 */
function Preloader({ onExitStart, onDone }) {
  const fxPanel = useRef();
  const fxFigure = useRef();
  const fxCanvas = useRef();

  // index.html paints a static black cover so nothing light flashes before
  // React mounts - this screen takes over from it. the figure starts
  // below its clip box, set before first paint so it never shows early
  useLayoutEffect(() => {
    gsap.set(fxFigure.current, { yPercent: 110 });
    document.getElementById('boot-cover')?.remove();
  }, []);

  useEffect(() => {
    const panel = fxPanel.current;
    const figure = fxFigure.current;
    const canvas = fxCanvas.current;
    const counter = { value: 0 };
    const render = () => {
      figure.textContent = `${Math.round(counter.value)}%`;
    };

    let loaded = 0;
    let exiting = false;
    let exit;
    let rest;
    let sweep;
    const started = performance.now();

    const leave = () => {
      if (exiting) return;
      exiting = true;
      // the page mounts under the screen now, but its reveals wait: they
      // start when only a fifth of the pixels are still on (COVER_LEFT,
      // scrollReveal.js)
      holdReveals();
      onExitStart();
      // a fast load can finish while the figure is still rising
      gsap.killTweensOf(figure);
      exit = gsap.timeline()
        .to(figure, { yPercent: 110, duration: DROP, ease: 'power3.in' })
        // the solid panel hands over to its pixels, drawn the same black
        // (pixels.js), which clear from the top left
        .add(() => {
          sweep = pixelSweep(canvas, {
            duration: SWEEP,
            onUpdate: (at) => { if (at >= 1 - COVER_LEFT) releaseReveals(); },
          });
          sweep.eventCallback('onComplete', () => { releaseReveals(); onDone(); });
          panel.style.background = 'transparent';
          panel.firstElementChild.style.visibility = 'hidden';
        });
    };

    // at 100: the screen rests there a moment, once it has been up long
    // enough to be seen (COUNT, HOLD)
    const finish = () => {
      const wait = Math.max(0, COUNT - (performance.now() - started) / 1000) + HOLD;
      rest = gsap.delayedCall(wait, leave);
    };

    // the figure eases toward the real share of fonts loaded, and the
    // screen only leaves once it has visibly reached 100
    const advance = () => {
      // (paced so the whole count takes COUNT seconds, wherever it is)
      const value = (loaded / FONTS.length) * 100;
      gsap.to(counter, {
        value,
        duration: Math.max(.15, ((value - counter.value) / 100) * COUNT),
        ease: 'power1.inOut',
        overwrite: true,
        onUpdate: render,
        onComplete: () => { if (loaded === FONTS.length && !rest) finish(); },
      });
    };

    const settle = () => { loaded += 1; advance(); };
    const loads = FONTS.map(([font, sample]) => document.fonts.load(font, sample).then(settle, settle));

    // the figure is set in Ayr Garon, so it only rises into view once that
    // face has arrived - otherwise it would appear in a fallback and swap
    loads[0].then(() => {
      if (exiting) return;
      gsap.to(figure, { yPercent: 0, duration: .3, ease: 'power3.out' });
    });

    const timeout = setTimeout(() => { loaded = FONTS.length; advance(); }, TIMEOUT_MS);

    return () => {
      clearTimeout(timeout);
      gsap.killTweensOf([counter, figure, panel]);
      rest?.kill();
      exit?.kill();
      sweep?.kill();
    };
  }, [onExitStart, onDone]);

  return (
    <div className='fixed top-0 left-0 w-full h-screen-safe z-[45] bg-black overflow-hidden' ref={fxPanel}>
      {/* the figure sits the same distance from the foot of the screen as
        from its side */}
      <div className='flex items-end h-screen-safe
        mobile:px-[1rem] mobile:pb-[1rem]
        tablet:px-[1rem] tablet:pb-[1rem]
        laptop:px-[2rem] laptop:pb-[2rem]
        laptop-lg:px-[3rem] laptop-lg:pb-[3rem]
        desktop:px-[3rem] desktop:pb-[3rem]'>
        <div className='overflow-hidden' role='status' aria-label='Loading'>
          <span className='inline-block font-flexible font-bold leading-none text-offwhite text-[8vw]'
            ref={fxFigure}>
            0%
          </span>
        </div>
      </div>
      {/* the screen's pixels, drawn on the way out */}
      <canvas className='absolute inset-0 w-full h-full pointer-events-none' aria-hidden='true' ref={fxCanvas}/>
    </div>
  )
}

export default Preloader
