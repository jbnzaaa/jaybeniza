import React from 'react'

/**
 * Splits `text` into individual letters for a per-letter GSAP reveal,
 * keeping each word intact as an unbreakable unit so normal word-wrapping
 * still happens between words, never mid-word.
 *
 * Every letter is `display: inline-block` inside its word's overflow-hidden
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
 * seconds to finish and holds the reader up. Left unset, all text -
 * titles, body copy, labels, tags, the top bar, buttons - goes by the
 * word, whatever its length, so all of it rises the same way, word by
 * word. Pass by='letter' to split by the letter anyway.
 *
 * `sentence` sets the text as written instead of in the site's capitals -
 * for anything read as a sentence (descriptions, paragraphs, quotes), so
 * capitals are left to headings, labels and buttons.
 *
 * The split spans are hidden from assistive tech (a screen reader would
 * otherwise announce them letter by letter) and the intact text is
 * exposed once through a visually-hidden span instead.
 */

// a word as it is matched against `emphasis`: lower case, its punctuation
// dropped ("Interactions." matches "interactions")
// (letters told by their case, not by Unicode property escapes: Babel
// spells a \p{L} out for older browsers as a class of every letter there
// is, about 30 KB of every page's script)
const isLetter = (unit) => unit.toLowerCase() !== unit.toUpperCase();
const isWordUnit = (unit) => isLetter(unit) || (unit >= '0' && unit <= '9');
const isUpper = (unit) => isLetter(unit) && unit === unit.toUpperCase();
const isLower = (unit) => isLetter(unit) && unit === unit.toLowerCase();
const bare = (word) => word.toLowerCase().split('').filter((unit) => isWordUnit(unit) || unit === '-').join('');

// the places of the words to emphasise: each phrase ("design systems")
// is found where its words run in order, so a word it shares with the
// rest of the text ("design") is picked out only there
const stressedAt = (words, phrases) => {
  const bareWords = words.map(bare);
  const at = new Set();
  phrases.forEach((phrase) => {
    const parts = phrase.split(' ').filter(Boolean).map(bare);
    for (let i = 0; i + parts.length <= bareWords.length; i++) {
      if (parts.every((part, j) => bareWords[i + j] === part)) parts.forEach((_, j) => at.add(i + j));
    }
  });
  return at;
};

// for a title given no emphasis of its own, picked as if at random but
// from the title itself, so a title shows the same on every visit: a
// whole word where the title has one worth it (four letters or more, not
// a small word), and in a title of one word, its first or last part -
// never letters cut out of its middle, which read as a misprint
const SMALL = /^(the|and|for|with|from|into|that|this|your|what|were|was|are|our|its|of|on|in|to|a|an|by|or|at|as|is|it)$/i;
const seedOf = (words) => {
  let seed = [...words.join(' ')].reduce((h, ch) => (h * 31 + ch.codePointAt(0)) >>> 0, 7);
  return () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32;
};
// the word to stress, by its place - or -1 for a title of one word
const pickedWord = (words) => {
  if (words.length < 2) return -1;
  const next = seedOf(words);
  const worth = words.map((word, wi) => wi).filter((wi) => {
    const plain = bare(words[wi]);
    return plain.length >= 4 && !SMALL.test(plain);
  });
  const from = worth.length ? worth : words.map((_, wi) => wi);
  return from[Math.floor(next() * from.length)];
};
// in a title of one word, its first or last part, about half of it:
// returns their places as "word:letter"
const pickedLetters = (words) => {
  const next = seedOf(words);
  const word = words[0] || '';
  const at = word.split('').map((unit, ui) => ui).filter((ui) => isWordUnit(word[ui]));
  // a name made of two (StockNear, iScan) parts where its inner capital is
  // - a capital after a small letter, so a word in capitals (COMELEC)
  // is not split at its second letter
  const inner = word.split('').findIndex((unit, ui) => ui > 0 && isUpper(unit) && isLower(word[ui - 1]));
  const length = inner > 0 ? at.indexOf(inner) : Math.max(1, Math.ceil(at.length / 2));
  const run = next() < 0.5 ? at.slice(0, length) : at.slice(inner > 0 ? length : at.length - length);
  return new Set(run.map((ui) => `0:${ui}`));
};

// the places ("word:letter") of letters given by their place in the text,
// counting letters only, from 0 (the logo's "jay": 0, 1 and 2)
const placedLetters = (words, at) => {
  const places = new Set();
  let n = 0;
  words.forEach((word, wi) => word.split('').forEach((unit, ui) => {
    if (isWordUnit(unit) && at.includes(n++)) places.add(`${wi}:${ui}`);
  }));
  return places;
};

// a pixel letter's glyph, in its own span inside the letter (.split-pixel,
// App.css)
const pixelGlyph = (unit) => <span className='split-pixel-glyph'>{unit}</span>;

/*
 * `emphasis` lists the words or phrases of a title set in the pixel face
 * (.split-emphasis, App.css): the words that say what I do.
 * `emphasis={{ letters: [0, 1, 2] }}` sets those letters so instead
 * (.split-pixel): part of a name ("Guro" in GuRover).
 * `emphasis='letters'` picks for itself: a word, or in a title of one
 * word, its first or last part.
 */
function SplitText({ text, id, by: asked, sentence = false, emphasis = [] }) {
  // (titles go by the word too now: one simple word reveal across the site)
  const by = asked || 'word';
  const words = text.split(' ').filter(Boolean);
  const auto = emphasis === 'letters';
  const autoWord = auto ? pickedWord(words) : -1;
  const stressed = Array.isArray(emphasis) ? stressedAt(words, emphasis)
    : autoWord >= 0 ? new Set([autoWord]) : new Set();
  const pixels = auto && autoWord < 0 ? pickedLetters(words)
    : emphasis?.letters ? placedLetters(words, emphasis.letters) : new Set();
  // a word split as a whole keeps its pixel letters inside it
  const wholeWord = (word, wi) => (word.split('').some((_, ui) => pixels.has(`${wi}:${ui}`))
    ? word.split('').map((unit, ui) => (pixels.has(`${wi}:${ui}`)
      // (marked where it starts or ends its word: the spacing at a word's
      // edge is the title's own - .split-pixel-start/-end, App.css)
      ? <span className={`split-pixel${ui === 0 ? ' split-pixel-start' : ''}${ui === word.length - 1 ? ' split-pixel-end' : ''}`} key={ui}>{pixelGlyph(unit)}</span>
      : unit))
    : word);
  return (
    <>
      <span className='sr-only'>{text}</span>
      {/* the word is the clip box, for its letters as for a whole word:
        letters side by side clip the same in one box as in one each, at
        half the elements */}
      {words.map((word, wi) => (
        <span className={`${sentence ? 'split-word split-sentence' : 'split-word'} split-letter-clip${stressed.has(wi) ? ' split-emphasis' : ''}`} aria-hidden='true' key={wi}>
          {by === 'word'
            // (an emphasised word slants inside the span that rises, so it
            // rises straight up: slanted around it, the rise ran diagonally)
            ? <span className='split-letter' id={id}>{stressed.has(wi) ? <span className='split-slant'>{wholeWord(word, wi)}</span> : wholeWord(word, wi)}</span>
            : word.split('').map((unit, ui) => (pixels.has(`${wi}:${ui}`)
              // (the letter rises as the others do)
              ? <span className='split-letter split-pixel' id={id} key={ui}>{pixelGlyph(unit)}</span>
              : <span className='split-letter' id={id} key={ui}>{unit}</span>
            ))}
        </span>
      ))}
    </>
  );
}

export default SplitText
