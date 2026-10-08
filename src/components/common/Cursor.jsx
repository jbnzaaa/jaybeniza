import React, { useEffect, useRef } from 'react'
// GSAP
import gsap from 'gsap'

// the site's button: the square goes into it
const BUTTON = '.cta-button';
// what turns the square into a label: an element that says what pressing
// it does, as data-cursor='View project'
const LABELLED = '[data-cursor]';
// what the square grows over: anything else that can be pressed or hovered
const PRESSABLE = 'a, button, [role="button"], [data-hairline]';

/**
 * The site's cursor: a small square that follows the pointer in place of
 * the browser's arrow, and grows over anything that can be pressed.
 *
 * Over one of the site's buttons it snaps into the button instead: from
 * where the pointer is, it travels to the button's middle, shrinking away
 * to nothing as it goes, and leaves the button's own hover to stand for
 * it; it comes back at the pointer when the pointer leaves.
 *
 * Over an element with a `data-cursor` it opens into a small label with
 * that text (a project card's is "View project"), and closes back to the
 * square on the way out.
 *
 * The square is blended with the page by difference, like the top bar, so
 * it reads on light and dark sections alike; the label is a solid box.
 * Only where there is a pointer that hovers - a touch screen keeps its own
 * behaviour (.cursor, App.scss).
 */
function Cursor() {
  const fxCursor = useRef();
  const fxLabel = useRef();

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    const cursor = fxCursor.current;
    const label = fxLabel.current;
    document.documentElement.classList.add('has-cursor');
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    // it trails the pointer a touch, so it reads as a thing and not a dot
    const toX = gsap.quickTo(cursor, 'x', { duration: .25, ease: 'power3.out' });
    const toY = gsap.quickTo(cursor, 'y', { duration: .25, ease: 'power3.out' });
    // its size: 1 at rest, larger over something pressable, nothing once
    // it has gone into a button
    const size = (scale) => gsap.to(cursor, { scale, duration: .3, ease: 'power2.out', overwrite: 'auto' });
    // the square's own side, .75rem, in px (the page is scaled up on a
    // very wide screen, and it goes with it)
    const side = () => parseFloat(getComputedStyle(document.documentElement).fontSize) * .75;
    let shown = false;
    // the button the square has gone into, if any
    let snapped = null;
    // the text the square is showing as a label, if any
    let text = null;

    // opens the square into a label, or (null) closes it back
    const setLabel = (next) => {
      if (next === text) return;
      text = next;
      cursor.classList.toggle('cursor-labelled', !!next);
      if (next) {
        label.textContent = next;
        // upright, whatever turns a press has left on the square
        gsap.set(cursor, { rotate: 0 });
        // the label's own size, whatever the square is clipped to
        gsap.to(cursor, { width: label.offsetWidth, height: label.offsetHeight, duration: .35, ease: 'power3.out', overwrite: 'auto' });
        gsap.to(label, { autoAlpha: 1, duration: .2, delay: .1, overwrite: 'auto' });
      } else {
        gsap.to(cursor, { width: side(), height: side(), duration: .3, ease: 'power3.out', overwrite: 'auto' });
        gsap.to(label, { autoAlpha: 0, duration: .1, overwrite: 'auto' });
      }
    };

    const move = (e) => {
      if (!shown) {
        // first sight of the pointer: start where it is, not at the corner
        shown = true;
        gsap.set(cursor, { x: e.clientX, y: e.clientY });
        gsap.to(cursor, { autoAlpha: 1, duration: .2, overwrite: 'auto' });
      }
      const button = e.target.closest?.(BUTTON);
      if (button) {
        if (button === snapped) return;
        // into the button: to its middle, and away
        snapped = button;
        setLabel(null);
        const rect = button.getBoundingClientRect();
        toX(rect.left + rect.width / 2);
        toY(rect.top + rect.height / 2);
        size(0);
        return;
      }
      snapped = null;
      toX(e.clientX);
      toY(e.clientY);
      const labelled = e.target.closest?.(LABELLED);
      setLabel(labelled ? labelled.dataset.cursor : null);
      size(!labelled && e.target.closest?.(PRESSABLE) ? 2.5 : 1);
    };
    const leave = () => {
      shown = false;
      snapped = null;
      setLabel(null);
      gsap.to(cursor, { autoAlpha: 0, duration: .2, overwrite: 'auto' });
    };
    // a press turns the square a quarter - and leaves no turn behind: a
    // square a quarter round looks the same, so it is put back to 0, or
    // the turns would add up and a label opened later would be on its side
    // or upside down
    const press = () => {
      if (snapped || text) return;
      gsap.fromTo(cursor, { rotate: 0 }, { rotate: 90, duration: .4, ease: 'power2.out', overwrite: 'auto', onComplete: () => gsap.set(cursor, { rotate: 0 }) });
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerdown', press);
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', press);
      document.documentElement.removeEventListener('pointerleave', leave);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  return (
    <div className='cursor' ref={fxCursor} aria-hidden='true'>
      <span className='cursor-label text-caption' ref={fxLabel}/>
    </div>
  )
}

export default Cursor
