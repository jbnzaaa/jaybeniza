import React, { useEffect, useRef } from 'react'
// GSAP
import gsap from 'gsap'

// what turns the square into a label: an element that says what pressing
// it does, as data-cursor='View project'
const LABELLED = '[data-cursor]';

/**
 * The site's cursor: a small square that follows the pointer in place of
 * the browser's arrow everywhere, one size throughout - it does not grow
 * over what can be pressed, or turn when pressed.
 *
 * Over an element with a `data-cursor` it opens into a small label with
 * that text (a project card's is "View project") while the pointer is
 * inside the card's picture, moving with it, and closes back to the
 * square on the way out.
 *
 * The square is blended with the page by difference, like the top bar, so
 * it reads on light and dark sections alike; so is the label, a light box
 * with a black word, which inverts like the top bar's button.
 * Only where there is a pointer that hovers - a touch screen keeps its own
 * behaviour (.cursor, App.css).
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
    const toX = gsap.quickTo(cursor, 'x', { duration: .6, ease: 'power3.out' });
    const toY = gsap.quickTo(cursor, 'y', { duration: .6, ease: 'power3.out' });
    // the square's own side, .5rem, in px (the page is scaled up on a
    // very wide screen, and it goes with it)
    const side = () => parseFloat(getComputedStyle(document.documentElement).fontSize) * .5;
    let shown = false;
    // the text the square is showing as a label, if any
    let text = null;

    // opens the square into a label, or (null) closes it back
    const setLabel = (next) => {
      if (next === text) return;
      text = next;
      cursor.classList.toggle('cursor-labelled', !!next);
      if (next) {
        label.textContent = next;
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
      // (it stays on the pointer everywhere - it no longer goes into a
      // button - and is always shown)
      toX(e.clientX);
      toY(e.clientY);
      // the label belongs to the picture it speaks for (the part marked
      // data-cursor-anchor): it is open, and moves with the pointer, while
      // the pointer is inside that picture; over the rest of the element
      // the square is a square again. (an element with no such part is
      // labelled all over)
      let labelled = e.target.closest?.(LABELLED);
      const anchor = labelled?.querySelector('[data-cursor-anchor]')?.getBoundingClientRect();
      if (anchor && (e.clientX < anchor.left || e.clientX > anchor.right || e.clientY < anchor.top || e.clientY > anchor.bottom)) labelled = null;
      setLabel(labelled ? labelled.dataset.cursor : null);
    };
    const leave = () => {
      shown = false;
      setLabel(null);
      gsap.to(cursor, { autoAlpha: 0, duration: .2, overwrite: 'auto' });
    };

    window.addEventListener('pointermove', move);
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
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
