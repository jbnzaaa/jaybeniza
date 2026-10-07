import React, { useEffect, useLayoutEffect, useRef } from 'react'
// GSAP
import gsap from 'gsap'

// the local faces the page is set in, each with sample text. they are
// requested explicitly because the browser only fetches a font once
// something on screen uses it, and nothing but this screen is mounted
// while it is up. the heading family is two files - Flexible for letters
// and a numeral face for figures, % and & - and the sample text decides
// which get fetched, so it names a character from each
const FONTS = [
  ['1em Flexible', 'A0%&'],
  ['700 1em MonoLisa', 'A'],
];
// never hold the page hostage to a font that fails or stalls
const TIMEOUT_MS = 8000;

/**
 * Full-screen black loading screen with the loaded percentage in the
 * lower left, set at the hero headline's size. It moves the way the menu
 * overlay does: the figure rises out of a clip box, and on exit it drops
 * back down before the panel collapses upward off the page.
 *
 * @param {() => void} onExitStart - fired as the exit begins, so the page
 *   can mount underneath and play its own reveals while the panel lifts
 * @param {() => void} onDone - fired once the panel is fully gone
 */
function Preloader({ onExitStart, onDone }) {
  const fxPanel = useRef();
  const fxFigure = useRef();

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
    const counter = { value: 0 };
    const render = () => {
      figure.textContent = `${Math.round(counter.value)}%`;
    };

    let loaded = 0;
    let exiting = false;
    let exit;

    const leave = () => {
      if (exiting) return;
      exiting = true;
      onExitStart();
      // a fast load can finish while the figure is still rising
      gsap.killTweensOf(figure);
      exit = gsap.timeline({ onComplete: onDone })
        .to(figure, { yPercent: 110, duration: .6, ease: 'power1.in' })
        .to(panel, { height: 0, duration: .7, ease: 'power2.inOut' }, '-=.1');
    };

    // the figure eases toward the real share of fonts loaded, and the
    // screen only leaves once it has visibly reached 100
    const advance = () => {
      gsap.to(counter, {
        value: (loaded / FONTS.length) * 100,
        duration: .8,
        ease: 'power1.out',
        overwrite: true,
        onUpdate: render,
        onComplete: () => { if (loaded === FONTS.length) leave(); },
      });
    };

    const settle = () => { loaded += 1; advance(); };
    const loads = FONTS.map(([font, sample]) => document.fonts.load(font, sample).then(settle, settle));

    // the figure is set in Flexible, so it only rises into view once that
    // face has arrived - otherwise it would appear in a fallback and swap
    loads[0].then(() => {
      if (exiting) return;
      gsap.to(figure, { yPercent: 0, duration: .6, ease: 'power1.in' });
    });

    const timeout = setTimeout(() => { loaded = FONTS.length; advance(); }, TIMEOUT_MS);

    return () => {
      clearTimeout(timeout);
      gsap.killTweensOf([counter, figure, panel]);
      exit?.kill();
    };
  }, [onExitStart, onDone]);

  return (
    <div className='fixed top-0 left-0 w-full h-screen-safe z-[45] bg-black overflow-hidden' ref={fxPanel}>
      <div className='flex items-end h-screen-safe
        mobile:px-[.9rem] mobile:pb-[.9rem]
        tablet:px-[1rem] tablet:pb-[1rem]
        laptop:px-[2rem] laptop:pb-20
        laptop-lg:px-[3rem] laptop-lg:pb-20
        desktop:px-[3rem] desktop:pb-28'>
        <div className='overflow-hidden' role='status' aria-label='Loading'>
          <span className='inline-block font-flexible font-bold leading-none text-offwhite text-[14.5vw]'
            ref={fxFigure}>
            0%
          </span>
        </div>
      </div>
    </div>
  )
}

export default Preloader
