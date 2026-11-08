// ---- section edges in pixels
// where a page's closing contact section (data-nav-cover) meets the one
// above it, the foot of that one breaks up into square pixels - in blocky
// steps of the contact section's own colour, a tint of it and a checker
// of that tint (see CELL, below) - so the page runs into the contact section in the
// site's pixels instead of meeting it at a hard line. drawn once a
// page is laid out, on a canvas a section,
// in room of its own: the section is given that much more padding at its
// foot, so the pixels never lie over what is in it

// each edge comes in as it comes up the screen, as everything on the site
// does: its pixels switching on one by one, at random, from the edge up -
// and off again, the other way, once it has dropped back below the screen
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
// (the page is measured again once they are in: the sections are taller)
import { refreshSoon, inPin, REVEAL_AT, REVERSE_AT } from './scrollReveal';
gsap.registerPlugin(ScrollTrigger);

// how long an edge takes to come in, and to go
const IN = .9;
const OUT = .5;
// how much of a pixel's turn is set by its row (the rest is chance)
const ORDER = .45;

// the edge is built as the reference (src/assets/reference) is: pixels
// about a hundredth of the screen's width, in three tones of the colour
// coming up - the colour itself (solid), a tint of it half way to the
// ground, and a fine checker of that tint (dither) - stepping out from
// the edge in that order. each tone's reach is set in runs of a few
// columns at a time, so the edge reads as blocks rather than noise, and
// the solid has a few holes of the ground near its ragged end
const CELL = () => Math.max(8, Math.min(20, Math.round(window.innerWidth / 96)));
// the checker's square, in CSS pixels
const DOT = 2;

// the designs, one picked at random each time an edge is laid. each says
// how far each tone reaches out from the edge (picked a run at a time),
// how many columns a run covers at most, and the chance of a hole of the
// ground (`hole`) or a pixel of tint (`speck`) in the solid's last two
// pixels. `scatter` lays the pixels one by one instead, by row: the share
// of each row's cells filled, from the edge out, each in the tone its row
// gives (solid nearest the edge, then tint, then dither)
const DESIGNS = [
  // the reference: blocky steps, solid then tint then dither
  { solid: [0, 1, 1, 2, 2, 3], tint: [0, 1, 1], dither: [0, 1, 1, 2], run: 5, hole: .08, speck: .05 },
  // a skyline: taller solid in wide runs, little else
  { solid: [1, 2, 3, 4, 4], tint: [0, 1], dither: [0, 0, 1], run: 8, hole: .05, speck: .03 },
  // a soft fade: thin solid, a long reach of tint and dither
  { solid: [0, 0, 1], tint: [1, 1, 2], dither: [1, 2, 3], run: 4, hole: .1, speck: .08 },
  // fine teeth: narrow runs of every height, full of holes
  { solid: [0, 1, 2, 3, 4], tint: [0, 1], dither: [0, 1], run: 2, hole: .18, speck: .1 },
  // a scatter: loose pixels, thinning out from the edge
  { scatter: [.85, .6, .42, .28, .16, .08] },
];
// the most rows a design's tones can reach
const rowsOf = (design) => (design.scatter
  ? design.scatter.length
  : Math.max(...design.solid) + Math.max(...design.tint) + Math.max(...design.dither));

// the page's blocks, in order: the outermost elements with a background
// of their own that run the screen's full width (a section, or the block
// around one). a pinned section's spacer has none, so the section in it
// is the block
function blocks(root) {
  const out = [];
  const walk = (el, depth) => {
    [...el.children].forEach((child) => {
      if (child.tagName === 'CANVAS' || child.classList.contains('pixel-edge')) return;
      const style = getComputedStyle(child);
      const solid = style.backgroundColor && !/rgba\(.*,\s*0\)$|transparent/.test(style.backgroundColor);
      const wide = child.offsetWidth >= window.innerWidth * .95;
      if (solid && wide && child.offsetHeight > 0) out.push(child);
      else if (depth < 5) walk(child, depth + 1);
    });
  };
  walk(root, 0);
  return out;
}

const band = (design) => rowsOf(design) * CELL();

const pick = (list) => list[Math.floor(Math.random() * list.length)];
// a reach for every column, set a run of up to `run` columns at a time
const runs = (cols, list, run) => {
  const out = [];
  while (out.length < cols) {
    const value = pick(list);
    const length = 1 + Math.floor(Math.random() * run);
    for (let i = 0; i < length && out.length < cols; i += 1) out.push(value);
  }
  return out;
};
// two colours mixed, half and half
const mix = (a, b) => {
  const [r1, g1, b1] = (a.match(/[\d.]+/g) || [0, 0, 0]).map(Number);
  const [r2, g2, b2] = (b.match(/[\d.]+/g) || [255, 255, 255]).map(Number);
  return `rgb(${Math.round((r1 + r2) / 2)}, ${Math.round((g1 + g2) / 2)}, ${Math.round((b1 + b2) / 2)})`;
};

function draw(canvas, color, ground, design) {
  const cell = CELL();
  const rows = rowsOf(design);
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const width = canvas.parentElement.offsetWidth;
  // (a pixel over the band, run past the section's foot and filled solid,
  // so no hairline of the section's own colour shows at the edge)
  canvas.style.height = `${rows * cell + 1}px`;
  canvas.width = Math.ceil(width * ratio);
  canvas.height = Math.ceil((rows * cell + 1) * ratio);
  const ctx = canvas.getContext('2d');
  const edge = (n) => Math.round(n * cell * ratio);
  const cols = Math.ceil(width / cell);
  const tint = mix(color, ground);
  // the dither: a checker of the tint and the ground, laid as a pattern
  const tile = document.createElement('canvas');
  const dot = Math.max(1, Math.round(DOT * ratio));
  tile.width = dot * 2;
  tile.height = dot * 2;
  const tctx = tile.getContext('2d');
  tctx.fillStyle = tint;
  tctx.fillRect(0, 0, dot, dot);
  tctx.fillRect(dot, dot, dot, dot);
  const dither = ctx.createPattern(tile, 'repeat');
  // the pixels, each with its turn (those against the edge first) and fill
  const cells = [];
  const add = (c, r, fill) => {
    // (row 0 is the one against the edge: the canvas's bottom row)
    const y = rows - 1 - r;
    const turn = (r / rows) * ORDER + Math.random() * (1 - ORDER);
    cells.push({ x: edge(c), y: edge(y), w: edge(c + 1) - edge(c), h: edge(y + 1) - edge(y), turn, fill });
  };
  if (design.scatter) {
    // loose pixels: solid in the first third of the rows, tint in the
    // next, dither beyond
    design.scatter.forEach((share, r) => {
      const fill = r < rows / 3 ? color : r < (rows * 2) / 3 ? tint : dither;
      for (let c = 0; c < cols; c += 1) if (Math.random() < share) add(c, r, fill);
    });
  } else {
    // each tone's reach, column by column, in runs
    const solid = runs(cols, design.solid, design.run);
    const tints = runs(cols, design.tint, design.run);
    const dithers = runs(cols, design.dither, design.run);
    for (let c = 0; c < cols; c += 1) {
      const s = solid[c];
      const t = s ? tints[c] : Math.min(tints[c], 1);
      for (let r = 0; r < s; r += 1) {
        // near the solid's end, the odd hole of the ground, or pixel of tint
        const nearEnd = r >= Math.max(1, s - 2);
        const roll = Math.random();
        if (nearEnd && roll < design.hole) continue;
        add(c, r, nearEnd && roll < design.hole + design.speck ? tint : color);
      }
      for (let r = s; r < s + t; r += 1) add(c, r, tint);
      for (let r = s + t; r < s + t + dithers[c]; r += 1) add(c, r, dither);
    }
  }
  const strip = Math.ceil(ratio * 2);
  // drawn as far as `at` (0 to 1) of the way in
  return (at) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (at <= 0) return;
    ctx.fillStyle = color;
    ctx.fillRect(0, canvas.height - strip, canvas.width, strip);
    cells.forEach(({ x, y, w, h, turn, fill }) => {
      if (turn >= at) return;
      ctx.fillStyle = fill;
      ctx.fillRect(x, y, w, h);
    });
  };
}

/**
 * Lays the pixel edge over the page's block in `root` that comes before
 * its contact section (where their colours differ), and lays it again if the
 * screen's width changes. Returns what takes them off again.
 *
 * @param {Element} root - the page's content
 * @returns {() => void}
 */
export function pixelEdges(root) {
  let laid = [];
  const clear = () => {
    laid.forEach(({ canvas, host, was, pad, show, hide, sweep }) => {
      show.kill();
      hide.kill();
      gsap.killTweensOf(sweep);
      canvas.remove();
      if (was !== null) host.style.position = was;
      host.style.paddingBottom = pad;
    });
    laid = [];
  };
  const lay = () => {
    clear();
    const list = blocks(root);
    list.forEach((host, i) => {
      const next = list[i + 1];
      if (!next) return;
      const color = getComputedStyle(next).backgroundColor;
      // (only at the contact section)
      const EDGED = '[data-nav-cover]';
      if (!next.matches(EDGED) && !next.querySelector(EDGED)) return;
      if (color === getComputedStyle(host).backgroundColor) return;
      const canvas = document.createElement('canvas');
      canvas.className = 'pixel-edge';
      canvas.setAttribute('aria-hidden', 'true');
      // (the canvas is laid against the section's foot, so the section is
      // where it is measured from)
      const was = getComputedStyle(host).position === 'static' ? host.style.position : null;
      if (was !== null) host.style.position = 'relative';
      // (a design of its own, picked at random each time it is laid)
      const design = pick(DESIGNS);
      // the room it takes, added to the section's own padding at its foot
      const pad = host.style.paddingBottom;
      host.style.paddingBottom = `${parseFloat(getComputedStyle(host).paddingBottom) + band(design)}px`;
      host.appendChild(canvas);
      const ground = getComputedStyle(host).backgroundColor;
      const render = draw(canvas, color, ground, design);
      const sweep = { at: 0 };
      render(0);
      const to = (at, duration) => gsap.to(sweep, { at, duration, ease: 'none', overwrite: true, onUpdate: () => render(sweep.at) });
      // in as the edge comes up the screen; out once it is below it again
      const show = ScrollTrigger.create({ trigger: canvas, start: REVEAL_AT, onEnter: () => to(1, IN), ...inPin(canvas) });
      const hide = ScrollTrigger.create({ trigger: canvas, start: REVERSE_AT, onLeaveBack: () => to(0, OUT), ...inPin(canvas) });
      // (already on screen when laid: in at once)
      if (canvas.getBoundingClientRect().top < window.innerHeight * .85) to(1, IN);
      laid.push({ canvas, host, was, pad, show, hide, sweep });
    });
    if (laid.length) refreshSoon();
  };

  let width = window.innerWidth;
  const onResize = () => {
    if (window.innerWidth === width) return;
    width = window.innerWidth;
    lay();
  };
  // (once the page has had a moment to lay itself out - and again, a few
  // times, while it has no edge yet: a page fetched on the way to it, as a
  // project page is, is not there at the first try, and its contact
  // section was left with a hard line)
  let timer;
  let tries = 0;
  const attempt = () => {
    lay();
    tries += 1;
    if (!laid.length && tries < 10) timer = setTimeout(attempt, 400);
  };
  timer = setTimeout(attempt, 400);
  window.addEventListener('resize', onResize);
  return () => {
    clearTimeout(timer);
    window.removeEventListener('resize', onResize);
    clear();
  };
}
