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
 *
 * `by='word'` reveals whole words instead of letters - for body copy,
 * where a per-letter stagger across a few hundred characters takes
 * seconds to finish and holds the reader up. Headings keep the default.
 *
 * `sentence` sets the text as written instead of in the site's capitals -
 * for anything read as a sentence (descriptions, paragraphs, quotes), so
 * capitals are left to headings, labels and buttons.
 *
 * The split spans are hidden from assistive tech (a screen reader would
 * otherwise announce them letter by letter) and the intact text is
 * exposed once through a visually-hidden span instead.
 */
function SplitText({ text, id, by = 'letter', sentence = false }) {
  return (
    <>
      <span className='sr-only'>{text}</span>
      {text.split(' ').filter(Boolean).map((word, wi) => (
        <span className={sentence ? 'split-word split-sentence' : 'split-word'} aria-hidden='true' key={wi}>
          {(by === 'word' ? [word] : word.split('')).map((unit, ui) => (
            <span className='split-letter-clip' key={ui}>
              <span className='split-letter' id={id}>{unit}</span>
            </span>
          ))}
        </span>
      ))}
    </>
  );
}

export default SplitText
