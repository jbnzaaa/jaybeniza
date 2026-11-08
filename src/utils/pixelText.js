import gsap from 'gsap';

// ---- how split text (SplitText) opens
// two ways, by what the text is:
// - a title (inside .font-flexible) opens behind solid blocks, one to each
//   line it is set on: a line's block grows across the whole line from
//   its left, in the colour opposite the section's ground (the site's
//   black on a light section, its white on a dark one), hiding it; then
//   the block shrinks toward the line's right end, and the line is
//   uncovered from the left as it goes. taken away, it runs the same way
//   and leaves the line empty. the lines follow one another down the
//   title. a line's letters hold still in it while it is blocked
//   (App.css .split-block): the block is the motion. its lines are found
//   where the words wrap, measured when it first runs and again if its
//   box has changed size since
// - everything else - body copy, the top bar, buttons, tags, labels -
//   simply rises into its lines, word by word (or letter by letter, for
//   a short label), out of its clip boxes: nothing is laid over it

// ---- the blocks (titles)
// switched off: every title now rises word by word out of its clip boxes,
// as body copy does. true brings the blocks back
const TITLE_BLOCKS = false;
// a title's blocks keep their own time, the same for every title on the
// site whatever reveal sets them off: started as the reveal starts (and
// taken away as it goes back), each line's block covers it over
// COVER_TIME and uncovers it, more slowly, over UNCOVER_TIME, each line
// LINE_STAGGER after the one above
const COVER_TIME = .4;
const UNCOVER_TIME = .75;
const LINE_STAGGER = .14;
// (the share of a line's turn its block takes to cover it)
const COVER = COVER_TIME / (COVER_TIME + UNCOVER_TIME);
const GROW = gsap.parseEase('power2.out');
const SHRINK = gsap.parseEase('power2.inOut');
const BLACK = '#1B1A1A';
const WHITE = '#E5E4E3';

/**
 * The block colour for what is set on some ground: the site's white for
 * light text, its black for dark - the colour opposite the ground.
 *
 * @param {Element} el - the text, or what it sits in
 * @returns {string}
 */
export function blockColour(el) {
  const [r, g, b] = (getComputedStyle(el).color.match(/[\d.]+/g) || [0, 0, 0]).map(Number);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > .5 ? WHITE : BLACK;
}

// a title's word can only be opened by one reveal at a time: two
// writing its block would fight over it
const claimed = new WeakSet();

// an element's place on the page as laid out - transforms (a card easing
// to size, the smoothed scroll) left out
function placeOf(el) {
  let x = 0;
  let y = 0;
  for (let at = el; at; at = at.offsetParent) {
    x += at.offsetLeft;
    y += at.offsetTop;
  }
  return { x, y };
}

// the element a line's block is laid in: the words' own box, or the
// nearest one around it that is not inline
function holderOf(el) {
  let at = el;
  while (at && getComputedStyle(at).display.startsWith('inline')) at = at.parentElement;
  return at || el;
}

// the blocks for a title's words: one to a line
function lineBlocks(words) {
  words.forEach((_, word) => {
    word.classList.add('split-block');
    word.style.setProperty('--letters', 0);
  });

  // the lines: the words grouped by the box they are laid in and how far
  // down it they sit
  let lines = null;
  let measured = '';
  const measure = () => {
    const first = words.keys().next().value;
    const holder = holderOf(first.parentElement);
    const key = `${holder.offsetWidth}x${holder.offsetHeight}`;
    if (lines && key === measured) return;
    measured = key;
    const old = lines;
    const byBox = new Map();
    words.forEach(({ first: a, last: b }, word) => {
      const box = holderOf(word.parentElement);
      const place = placeOf(word);
      const id = Math.round(place.y);
      if (!byBox.has(box)) byBox.set(box, new Map());
      const rows = byBox.get(box);
      const row = rows.get(id) || { words: [], first: a, last: b, left: Infinity, right: -Infinity, top: Infinity, bottom: -Infinity };
      row.words.push(word);
      row.first = Math.min(row.first, a);
      row.last = Math.max(row.last, b);
      row.left = Math.min(row.left, place.x);
      row.right = Math.max(row.right, place.x + word.offsetWidth);
      row.top = Math.min(row.top, place.y);
      row.bottom = Math.max(row.bottom, place.y + word.offsetHeight);
      rows.set(id, row);
    });
    lines = [];
    byBox.forEach((rows, box) => {
      if (getComputedStyle(box).position === 'static') box.style.position = 'relative';
      const origin = placeOf(box);
      rows.forEach((row) => {
        const block = document.createElement('span');
        block.className = 'split-line-block';
        block.setAttribute('aria-hidden', 'true');
        Object.assign(block.style, {
          top: `${row.top - origin.y - box.clientTop}px`,
          left: `${row.left - origin.x - box.clientLeft}px`,
          width: `${row.right - row.left}px`,
          height: `${row.bottom - row.top}px`,
          background: blockColour(row.words[0]),
        });
        box.appendChild(block);
        lines.push({
          words: row.words,
          block,
          shown: null,
        });
      });
    });
    old?.forEach((line) => line.block.remove());
  };

  // a line's block at a point of its turn. opening (t, 0 shut to 1 open)
  // and taking away (u, 0 shown to 1 gone) run the same way: the block
  // grows across the line from its left, then shrinks toward its right -
  // uncovering the line when opening, leaving it empty when taking it
  // away. (played backwards, an opening ran its block back from the right)
  const draw = (line, t, hiding = false, u = 0) => {
    const k = hiding ? u : t;
    const shown = hiding ? u < COVER : t >= COVER;
    if (shown !== line.shown) {
      line.words.forEach((word) => word.style.setProperty('--letters', shown ? 1 : 0));
      line.shown = shown;
    }
    if (k <= 0 || k >= 1) {
      line.block.style.display = 'none';
      return;
    }
    // covering, it grows from the line's left end; uncovering, it shrinks
    // into its right end. (scaled, not resized: a transform moves nothing
    // else on the page and costs no layout - its left and width, changed
    // each frame, counted as layout shifts)
    const covering = k < COVER;
    Object.assign(line.block.style, {
      display: 'block',
      transformOrigin: covering ? 'left center' : 'right center',
      transform: `scaleX(${covering ? GROW(k / COVER) : 1 - SHRINK((k - COVER) / (1 - COVER))})`,
    });
  };

  // the blocks played on their own time: opening, or taking away - the
  // lines in reading order either way, the first first
  let mode = 'hidden';
  let tl = null;
  const play = (showing) => {
    measure();
    tl?.kill();
    mode = showing ? 'showing' : 'hiding';
    tl = gsap.timeline({ onComplete: () => { mode = showing ? 'shown' : 'hidden'; } });
    lines.forEach((line, i) => {
      const turn = { k: 0 };
      tl.to(turn, {
        k: 1,
        duration: COVER_TIME + UNCOVER_TIME,
        ease: 'none',
        onUpdate: () => (showing ? draw(line, turn.k) : draw(line, 0, true, turn.k)),
      }, i * LINE_STAGGER);
    });
  };

  // which way the reveal is going: on toward open starts the opening, back
  // toward shut the taking away
  let last = 0;
  return {
    set(progress) {
      const was = last;
      last = progress;
      if (!lines && progress <= 0) {
        // (nothing to show before it starts: the words are hidden already)
        words.forEach((_, word) => word.style.setProperty('--letters', 0));
        return;
      }
      if (progress > was && (mode === 'hidden' || mode === 'hiding')) play(true);
      else if (progress < was && (mode === 'shown' || mode === 'showing')) play(false);
    },
    clear() {
      tl?.kill();
      lines?.forEach((line) => line.block.remove());
      lines = null;
      words.forEach((_, word) => {
        word.classList.remove('split-block');
        word.style.removeProperty('--letters');
      });
    },
  };
}

/**
 * How some split letters (SplitText) open: a title's by blocks, a line at
 * a time, each line over its own share of the reveal, so they run down the
 * title in order. Any other text is left to its rise.
 *
 * @param {string|Element|Element[]|NodeList} targets - the letters
 * @returns {{set: (progress: number) => void, clear: () => void, slow: boolean} | null} -
 *   `set` takes how far the letters' reveal is (0 to 1); `clear` takes the
 *   blocks off; `slow` says a title is among them, whose blocks want a
 *   longer reveal (scrollReveal.js). null when there is no title to open
 */
export function pixelText(targets) {
  // (the blocks are off: titles rise word by word like all other text)
  if (!TITLE_BLOCKS) return null;
  // (only split letters: a reveal of anything else is left as it is)
  const letters = gsap.utils.toArray(targets).filter((el) => el.classList?.contains('split-letter'));
  const titles = new Map();
  letters.forEach((letter, i) => {
    const word = letter.closest('.split-letter-clip');
    if (!word || !word.closest('.font-flexible') || word.closest('.cta-button')) return;
    const span = titles.get(word);
    if (span) span.last = i;
    else if (!claimed.has(word)) titles.set(word, { first: i, last: i });
  });
  if (!titles.size) return null;
  titles.forEach((_, word) => claimed.add(word));
  const blocks = lineBlocks(titles);
  blocks.set(0);
  return {
    set: blocks.set,
    slow: true,
    clear() {
      blocks.clear();
      titles.forEach((_, word) => claimed.delete(word));
    },
  };
}

/**
 * A tween's vars with its letters' blocks run by it: the blocks follow
 * the tween's progress, forward and back. With `out`, the tween takes the
 * letters away, and the blocks cover them again as it plays.
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
