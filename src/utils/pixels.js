import gsap from 'gsap';
// the block's colour, opposite the ground, as the titles' blocks
import { blockColour } from './pixelText';

// ---- the screen as square pixels
// the loading screen and the wipe between pages both cover the page with
// square pixels - the material a designer adjusts - and clear them again.
// each is drawn on one canvas, a rectangle a pixel, so a sweep costs a
// few hundred fills a frame and nothing for the page's layout

// a pixel's side, in CSS pixels: smaller on a phone so there are about as
// many across
const CELL = () => (window.innerWidth < 768 ? 12 : 20);
// the palette (tailwind.config.js): the pixels, and the edge being edited
const BLACK = '#1B1A1A';
const EDGE = '#E5E4E3';
// how far a pixel at the sweep's edge stays lit, as a share of the sweep
export const EDGE_SPAN = .05;
// how much of a pixel's turn is set by its place and how much is chance,
// so a sweep reads as edited pixel by pixel, not wiped
const ORDER = .6;

/**
 * Lays a canvas out as a grid of square pixels, each with its turn in a
 * sweep (0 to 1): from the top left, or outward from a point.
 *
 * @param {HTMLCanvasElement} canvas - sized to what it covers
 * @param {number[]} [origin] - [x, y] on the canvas the sweep spreads from
 * @returns {(sweep: number, covering: boolean) => void} draws the grid at a
 *   point of the sweep: covering, the pixels up to it are on (the newest
 *   lit); clearing, the pixels up to it are off (the next to go lit)
 */
export function pixelGrid(canvas, origin) {
  const size = CELL();
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = Math.ceil(width * ratio);
  canvas.height = Math.ceil(height * ratio);
  const ctx = canvas.getContext('2d');

  const cols = Math.ceil(width / size);
  const rows = Math.ceil(height / size);
  // (a cell's edges in the canvas's own pixels, on whole ones, so
  // neighbours meet exactly and no faint grid shows between them)
  const edge = (n) => Math.round(n * size * ratio);
  // (the farthest corner from the origin, for its distances to scale to)
  const far = origin && Math.max(...[[0, 0], [width, 0], [0, height], [width, height]]
    .map(([x, y]) => Math.hypot(x - origin[0], y - origin[1])));
  const cells = [];
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const place = origin
        ? Math.hypot((c + .5) * size - origin[0], (r + .5) * size - origin[1]) / far
        : (c / cols + r / rows) / 2;
      cells.push({ x: edge(c), y: edge(r), w: edge(c + 1) - edge(c), h: edge(r + 1) - edge(r), turn: place * ORDER + Math.random() * (1 - ORDER) });
    }
  }

  return (sweep, covering) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cells.forEach(({ x, y, w, h, turn }) => {
      const on = covering ? turn < sweep : turn >= sweep;
      if (!on) return;
      const lit = covering ? turn > sweep - EDGE_SPAN : turn < sweep + EDGE_SPAN;
      ctx.fillStyle = lit ? EDGE : BLACK;
      ctx.fillRect(x, y, w, h);
    });
  };
}

// ---- an element opened in pixels
// an image (a cover, a screenshot, a portrait) opens as square pixels of
// itself, switching on from its bottom edge up with some chance - where
// it used to wipe open from that edge. it is the element's own clip-path,
// a path of square cells, so nothing is drawn over the page around it:
// a picture floating over text (a hover preview) shows the text through
// its gaps. a pixel's side goes by the element's size, so a small picture
// is not one or two blocks and a large one is not hundreds
const SHUT = 'inset(100% 0% 0% 0%)';
const OPEN = 'inset(0% 0% 0% 0%)';
const cellFor = (width, height) => Math.max(6, Math.min(40, Math.round(Math.min(width, height) / 8)));

function clipper(el) {
  let cells = null;
  let measured = '';
  const measure = () => {
    const width = el.offsetWidth;
    const height = el.offsetHeight;
    if (cells && measured === `${width}x${height}`) return;
    measured = `${width}x${height}`;
    const size = cellFor(width, height);
    const cols = Math.ceil(width / size);
    const rows = Math.ceil(height / size);
    cells = [];
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        const place = 1 - (r + .5) / rows;
        // (rects as path commands, a hair over a cell so no seam shows)
        cells.push({ d: `M${c * size} ${r * size}h${size + .5}v${size + .5}h${-(size + .5)}z`, turn: place * ORDER + Math.random() * (1 - ORDER) });
      }
    }
  };
  return (at) => {
    if (at <= 0) { el.style.clipPath = SHUT; return; }
    if (at >= 1) { el.style.clipPath = OPEN; return; }
    measure();
    const d = cells.filter(({ turn }) => turn < at).map((cell) => cell.d).join('');
    // (no cell on yet: shut, since an empty path() shows the whole box)
    el.style.clipPath = d ? `path('${d}')` : SHUT;
  };
}

/**
 * An element opening in pixels, as a tween to put in a timeline or play:
 * from shut (its start state, set at once) to open, and back when it is
 * reversed. Fit for scroll-scrubbed timelines too.
 *
 * @param {Element} el
 * @param {object} [opts]
 * @param {number} [opts.duration] - in seconds
 * @param {string} [opts.ease]
 * @returns {gsap.core.Tween}
 */
export function pixelReveal(el, { duration = 1, ease = 'power1.inOut' } = {}) {
  const set = clipper(el);
  const sweep = { at: 0 };
  set(0);
  return gsap.to(sweep, { at: 1, duration, ease, onUpdate: () => set(sweep.at) });
}

/**
 * An element that opens and shuts in pixels on demand - a picture shown
 * under the pointer. Each call turns it from wherever it has got to.
 *
 * @param {Element} el
 * @returns {{show: (duration?: number) => void, hide: (duration?: number) => void, kill: () => void}}
 */
export function pixelToggle(el) {
  const set = clipper(el);
  const sweep = { at: 0 };
  const to = (at, duration) => gsap.to(sweep, { at, duration, ease: 'power1.inOut', overwrite: true, onUpdate: () => set(sweep.at) });
  return {
    show: (duration = .5) => to(1, duration),
    hide: (duration = .4) => to(0, duration),
    kill: () => gsap.killTweensOf(sweep),
  };
}

// ---- a picture wiped open
// the covers (Featured Work, Work, Archive), the Areas of Expertise gifs
// and the hover previews (Featured Work, certificates, the About
// portrait) open with a plain wipe from their bottom edge up - no pixels
const WIPE_SHUT = 'inset(100% 0% 0% 0%)';
const WIPE_OPEN = 'inset(0% 0% 0% 0%)';
const wipeAt = (el, at) => {
  el.style.clipPath = at >= 1 ? WIPE_OPEN : `inset(${(1 - at) * 100}% 0% 0% 0%)`;
};

/**
 * A picture wiping open from its bottom edge up, as a tween to put in a
 * timeline or play: from shut (set at once) to open, and back when it is
 * reversed.
 *
 * @param {Element} el
 * @param {object} [opts]
 * @param {number} [opts.duration] - in seconds
 * @param {string} [opts.ease]
 * @returns {gsap.core.Tween}
 */
export function wipeReveal(el, { duration = 1, ease = 'power2.inOut' } = {}) {
  const sweep = { at: 0 };
  wipeAt(el, 0);
  return gsap.to(sweep, { at: 1, duration, ease, onUpdate: () => wipeAt(el, sweep.at) });
}

/**
 * A picture that wipes open and shut on demand - a preview shown under the
 * pointer. Each call turns it from wherever it has got to.
 *
 * @param {Element} el
 * @returns {{show: (duration?: number) => gsap.core.Tween, hide: (duration?: number) => gsap.core.Tween, kill: () => void}}
 */
export function wipeToggle(el) {
  const sweep = { at: 0 };
  el.style.clipPath = WIPE_SHUT;
  const to = (at, duration) => gsap.to(sweep, { at, duration, ease: 'power2.inOut', overwrite: true, onUpdate: () => wipeAt(el, sweep.at) });
  return {
    show: (duration = .5) => to(1, duration),
    hide: (duration = .4) => to(0, duration),
    kill: () => gsap.killTweensOf(sweep),
  };
}

// ---- a colleague's picture, opened by a block
// the pictures of the people who speak for my work (the landing page's
// testimonials, the case studies' quotes) open as the titles do: a block
// in the colour opposite the ground grows across the picture from its
// left, the picture is switched on under it, and the block shrinks toward
// its right, uncovering it. taken away, it runs the same way and leaves
// the place empty. the block is laid beside the picture, in its box
const COVER = .4;
const GROW = gsap.parseEase('power2.out');
const SHRINK = gsap.parseEase('power2.inOut');

/**
 * A picture opened and taken away by a block, on demand.
 *
 * @param {Element} el - the picture (an <img> will do)
 * @returns {{show: (duration?: number) => gsap.core.Tween, hide: (duration?: number) => gsap.core.Tween, kill: () => void}}
 */
export function blockToggle(el) {
  const box = el.parentElement;
  if (getComputedStyle(box).position === 'static') box.style.position = 'relative';
  const block = document.createElement('span');
  block.className = 'split-line-block';
  block.setAttribute('aria-hidden', 'true');
  box.appendChild(block);
  el.style.clipPath = 'none';
  el.style.opacity = 0;
  let shown = false;
  const state = { k: 0 };
  // k: how far through its move (0 to 1); showing or taking away
  const draw = (showing) => {
    const { k } = state;
    el.style.opacity = (showing ? k >= COVER : k < COVER) ? 1 : 0;
    if (k <= 0 || k >= 1) { block.style.display = 'none'; return; }
    // (scaled, not resized: no layout shift, no layout)
    const covering = k < COVER;
    Object.assign(block.style, {
      display: 'block',
      background: blockColour(box),
      top: `${el.offsetTop}px`,
      height: `${el.offsetHeight}px`,
      left: `${el.offsetLeft}px`,
      width: `${el.offsetWidth}px`,
      transformOrigin: covering ? 'left center' : 'right center',
      transform: `scaleX(${covering ? GROW(k / COVER) : 1 - SHRINK((k - COVER) / (1 - COVER))})`,
    });
  };
  const run = (showing, duration) => {
    if (shown === showing) return gsap.to({}, { duration: 0 });
    shown = showing;
    gsap.killTweensOf(state);
    state.k = 0;
    return gsap.to(state, { k: 1, duration: Math.max(duration, .8), ease: 'none', onUpdate: () => draw(showing) });
  };
  return {
    show: (duration = .8) => run(true, duration),
    hide: (duration = .8) => run(false, duration),
    kill: () => {
      gsap.killTweensOf(state);
      block.remove();
      el.style.opacity = '';
    },
  };
}

/**
 * Plays a sweep over a canvas: its pixels switching on (`cover`) or off.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {object} opts
 * @param {boolean} [opts.cover] - switch the pixels on rather than off
 * @param {number[]} [opts.origin] - [x, y] the sweep spreads from (else the top left)
 * @param {number} opts.duration - in seconds
 * @param {(sweep: number) => void} [opts.onUpdate] - each frame, with how far it is (0 to 1)
 * @returns {gsap.core.Tween}
 */
export function pixelSweep(canvas, { cover = false, origin, duration, onUpdate }) {
  const draw = pixelGrid(canvas, origin);
  // (from before the first pixel's turn to past the last one's, edge and all)
  const sweep = { at: -EDGE_SPAN };
  draw(sweep.at, cover);
  return gsap.to(sweep, {
    at: 1 + EDGE_SPAN,
    duration,
    ease: 'power1.inOut',
    onUpdate: () => {
      draw(sweep.at, cover);
      onUpdate?.(sweep.at);
    },
  });
}
