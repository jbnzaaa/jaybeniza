import React, { useEffect, useRef } from 'react'
// scroll reveal
import { scrollRevealSequence } from '../../utils/scrollReveal'
// per-letter text split
import SplitText from './SplitText'

/**
 * A section's label: a small boxed tag over its content, in place of a
 * large section title. It reveals the way the buttons do - the box wipes
 * open from its bottom edge, then its letters rise - as it scrolls into
 * view (start state: .tag, App.scss).
 *
 * @param {string} label
 * @param {string} id - unique; the letters carry it
 * @param {string} [as] - the element to render (a heading where the tag is
 *   the page's title); a paragraph otherwise
 */
function Tag({ label, id, as: Element = 'p' }) {
  const fxTag = useRef();

  useEffect(() => {
    const tag = fxTag.current;
    const reveal = scrollRevealSequence([
      { targets: tag, vars: { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut' } },
      { targets: tag.querySelectorAll('.split-letter'), vars: { y: 0, stagger: .02, ease: 'power1.in' }, position: '<.2' },
    ], { trigger: tag });
    return () => reveal.kill();
  }, []);

  return (
    <Element className='tag text-caption' id={`tag-${id}`} ref={fxTag}>
      <SplitText text={label} id={id} />
    </Element>
  )
}

export default Tag
