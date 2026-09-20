import React from 'react'

/**
 * Splits `text` into individual letters for a per-letter GSAP reveal,
 * keeping each word intact as an unbreakable unit so normal word-wrapping
 * still happens between words, never mid-word.
 *
 * Every letter is `display: inline-block` inside its own overflow-hidden
 * clip box - `transform` has no visual effect on `display: inline`
 * elements per the CSS spec, and a clip box shorter than the letter's
 * translate-y travel distance leaves it invisible for part of the tween,
 * so both are handled here once instead of per call site. The shared `id`
 * lands on every letter so scrollReveal()/scrollRevealSequence() can
 * target the whole block with one selector, same as the old per-word
 * pattern did.
 */
function SplitText({ text, id }) {
  return text.split(' ').filter(Boolean).map((word, wi) => (
    <span className='split-word' key={wi}>
      {word.split('').map((char, ci) => (
        <span className='split-letter-clip' key={ci}>
          <span className='split-letter' id={id}>{char}</span>
        </span>
      ))}
    </span>
  ));
}

export default SplitText
