import React, { useEffect, useRef } from 'react'
// scroll reveal
import { scrollRevealSequence } from '../../utils/scrollReveal'
// per-letter text split
import SplitText from './SplitText'

/**
 * A section's label: a small tag in brackets over its content - [Label] -
 * in place of a large section title. It wipes open from its bottom edge,
 * then its letters rise, as it scrolls into view (start state: .tag,
 * App.css).
 *
 * @param {string} label
 * @param {string} id - unique; the letters carry it
 * @param {string} [as] - the element to render: the section's heading, a
 *   level 2 heading unless the tag is the page's title (h1)
 */
function Tag({ label, id, as: Element = 'h2' }) {
  const fxTag = useRef();

  useEffect(() => {
    const tag = fxTag.current;
    // quick, and on set times: the tag is the first reveal in its section,
    // and the section's content waits for it to finish (scrollReveal.js).
    // at the usual pace it took 0.9s, and the content under it was
    // halfway up the screen before it began
    const reveal = scrollRevealSequence([
      { targets: tag, vars: { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.out', duration: .3 } },
      { targets: tag.querySelectorAll('.split-letter'), vars: { y: 0, duration: .3, stagger: { amount: .15 }, ease: 'power2.out' }, position: '<.1' },
    ], { trigger: tag });
    return () => reveal.kill();
  }, []);

  return (
    <Element className='tag text-caption' id={`tag-${id}`} ref={fxTag}>
      <Bracket mark='[' id={id} />
      <SplitText text={label} id={id} />
      <Bracket mark=']' id={id} />
    </Element>
  )
}

// a bracket around the label: a letter of its own, so it rises and rolls
// with the rest, but not read out
function Bracket({ mark, id }) {
  return (
    <span className='split-letter-clip' aria-hidden='true'>
      <span className='split-letter' id={id}>{mark}</span>
    </span>
  );
}

export default Tag
