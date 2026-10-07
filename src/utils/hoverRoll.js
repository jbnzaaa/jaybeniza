import gsap from 'gsap';

/**
 * One hover animation for every text button on the site: when the pointer
 * enters a link or button whose label is built with SplitText, its letters
 * roll - each slides up out of its clip box and comes back in from below,
 * left to right. It reuses the clip boxes the scroll reveal already relies
 * on, and animates yPercent so it never touches the reveal's own `y`.
 *
 * Delegated from the document, so it covers buttons that mount later (the
 * menu overlay, other pages) without each component wiring it up.
 *
 * @returns {() => void} cleanup
 */
export function enableHoverRoll() {
  const rolling = new WeakSet();

  const onOver = (e) => {
    const button = e.target.closest?.('a, button');
    // ignore moves between the button's own children
    if (!button || button.contains(e.relatedTarget) || rolling.has(button)) return;

    const letters = button.querySelectorAll('.split-letter');
    // nothing to roll, or the label has not been revealed yet
    if (!letters.length || Math.abs(gsap.getProperty(letters[0], 'y')) > 1) return;

    rolling.add(button);
    gsap.timeline({ onComplete: () => rolling.delete(button) })
      .to(letters, { yPercent: -120, duration: .25, stagger: .012, ease: 'power2.in' })
      .fromTo(letters,
        { yPercent: 120 },
        { yPercent: 0, duration: .3, stagger: .012, ease: 'power2.out', immediateRender: false }, '>-.1');
  };

  document.addEventListener('mouseover', onOver);
  return () => document.removeEventListener('mouseover', onOver);
}
