import gsap from 'gsap';

// ---- text opened in pixels
// every piece of split text (SplitText) - a headline, a paragraph, a
// button's label, a tag, a link - opens as square pixels of itself while
// its letters rise into their lines, as the pictures and the loading
// screen do (pixels.js). the rise is untouched - it is the motion; the
// pixels are laid over it, one mask to a word: the word's own clip box
// (.split-letter-clip) takes a clip-path of square cells, switched on
// from left to right with some chance as the word's letters rise. it is
// the word's box and not the block's, so a button or a tag - whose own
// box has a wipe of its own - opens the same way as a paragraph

// a pixel's side, as a share of the text's size - a few to a letter's
// height - and never under or over these, in CSS pixels
const CELL_SHARE = 1 / 2.6;
const CELL_MIN = 4;
const CELL_MAX = 36;
// how much of a pixel's turn is set by its place and how much is chance
const ORDER = .55;
// how far into the reveal a word's pixels take to open, past its own
// share of the letters - about the time one letter takes to rise, so a
// word is all open just as its last letter is in
const SPREAD = .25;
const SHUT = 'inset(100% 0% 0% 0%)';

// a word can only be opened by one reveal at a time: two writing its
// clip-path would fight over it
const claimed = new WeakSet();
const reduced = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// a word's pixels, at a point of its opening (0 shut, 1 open)
function wordClipper(el) {
  let rows = null;
  let measured = '';
  let size = 0;
  const measure = () => {
    const width = el.offsetWidth;
    const height = el.offsetHeight;
    if (rows && measured === `${width}x${height}`) return;
    measured = `${width}x${height}`;
    const font = parseFloat(getComputedStyle(el).fontSize) || 16;
    size = Math.round(gsap.utils.clamp(CELL_MIN, CELL_MAX, font * CELL_SHARE));
    // (a cell over each edge, for the letters that reach past the box)
    const cols = Math.ceil(width / size) + 2;
    const count = Math.ceil(height / size) + 2;
    rows = [];
    for (let r = 0; r < count; r += 1) {
      const row = [];
      // left to right, as the word is read and its letters rise
      for (let c = 0; c < cols; c += 1) row.push((c / cols) * ORDER + Math.random() * (1 - ORDER));
      rows.push(row);
    }
  };
  return (at) => {
    if (at >= 1) { el.style.clipPath = ''; return; }
    if (at <= 0) { el.style.clipPath = SHUT; return; }
    measure();
    // the cells that are on, a row at a time, each run of them one rect
    let d = '';
    rows.forEach((row, r) => {
      const y = (r - 1) * size;
      let start = -1;
      for (let c = 0; c <= row.length; c += 1) {
        const on = c < row.length && row[c] < at;
        if (on && start < 0) start = c;
        if (!on && start >= 0) {
          // (a hair over a cell so no seam shows)
          const w = (c - start) * size + .5;
          d += `M${(start - 1) * size} ${y}h${w}v${size + .5}h${-w}z`;
          start = -1;
        }
      }
    });
    el.style.clipPath = d ? `path('${d}')` : SHUT;
  };
}

/**
 * The pixels for some split letters (SplitText): one mask on each word
 * they are in, opened as that word's letters rise - each over its own
 * share of the reveal, so the pixels run through a line with the rise.
 *
 * @param {string|Element|Element[]|NodeList} targets - the letters
 * @returns {{set: (progress: number) => void, clear: () => void} | null} -
 *   `set` takes how far the letters' reveal is (0 to 1); `clear` takes the
 *   pixels off. null when there are no words to open (or motion is reduced)
 */
export function pixelText(targets) {
  if (reduced()) return null;
  // (only split letters: a reveal of anything else is left as it is)
  const letters = gsap.utils.toArray(targets).filter((el) => el.classList?.contains('split-letter'));
  const n = letters.length;
  const words = new Map();
  letters.forEach((letter, i) => {
    const word = letter.closest('.split-letter-clip');
    if (!word) return;
    const span = words.get(word);
    if (span) span.last = i;
    else if (!claimed.has(word)) words.set(word, { first: i, last: i });
  });
  if (!words.size) return null;
  const masks = [...words].map(([word, { first, last }]) => {
    claimed.add(word);
    return { word, set: wordClipper(word), from: first / n, span: (last + 1 - first) / n + SPREAD };
  });
  const set = (progress) => masks.forEach((mask) => {
    // (the reveal's whole length is stretched by the spread, so the last
    // word is all open by its end too)
    mask.set(gsap.utils.clamp(0, 1, (progress * (1 + SPREAD) - mask.from) / mask.span));
  });
  set(0);
  return {
    set,
    clear() {
      masks.forEach((mask) => {
        mask.set(1);
        claimed.delete(mask.word);
      });
    },
  };
}

/**
 * A tween's vars with its letters' pixels laid over it: the mask follows
 * the tween's progress, forward and back. With `out`, the tween takes the
 * letters away, and the pixels shut as it plays.
 *
 * @param {object} vars - the tween's vars
 * @param {{set: Function} | null} mask - from pixelText
 * @param {boolean} [out]
 * @returns {object}
 */
export function withPixels(vars, mask, out = false) {
  if (!mask) return vars;
  const own = vars.onUpdate;
  return {
    ...vars,
    onUpdate(...args) {
      mask.set(out ? 1 - this.progress() : this.progress());
      own?.apply(this, args);
    },
  };
}
