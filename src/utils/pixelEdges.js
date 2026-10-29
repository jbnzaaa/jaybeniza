// ---- section edges in pixels
// where a page's closing contact section (data-nav-cover) meets the one
// above it, the foot of that one breaks up into square pixels - scattered
// at random, thickest at the edge and thinning out upward, in the contact
// section's own black - so the page runs into the contact section in the
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

// a pixel's side, in CSS pixels, as the page wipe's (pixels.js)
const CELL = () => (window.innerWidth < 768 ? 16 : 24);
// how many rows of pixels, and how many of each row's cells are filled,
// from the edge up
const DENSITY = [.62, .34, .16, .06];

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

const band = () => DENSITY.length * CELL();

function draw(canvas, color) {
  const cell = CELL();
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const width = canvas.parentElement.offsetWidth;
  const rows = DENSITY.length;
  // (a pixel over the band, run past the section's foot and filled solid,
  // so no hairline of the section's own colour shows at the edge)
  canvas.style.height = `${rows * cell + 1}px`;
  canvas.width = Math.ceil(width * ratio);
  canvas.height = Math.ceil((rows * cell + 1) * ratio);
  const ctx = canvas.getContext('2d');
  const edge = (n) => Math.round(n * cell * ratio);
  const cols = Math.ceil(width / cell);
  // the pixels, each with its turn (the row against the edge first) and colour
  const cells = [];
  DENSITY.forEach((share, r) => {
    // (row 0 is the one against the edge: the canvas's bottom row)
    const y = rows - 1 - r;
    for (let c = 0; c < cols; c += 1) {
      if (Math.random() >= share) continue;
      const fill = color;
      const turn = (r / rows) * ORDER + Math.random() * (1 - ORDER);
      cells.push({ x: edge(c), y: edge(y), w: edge(c + 1) - edge(c), h: edge(y + 1) - edge(y), turn, fill });
    }
  });
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
      if (!next.matches('[data-nav-cover]') && !next.querySelector('[data-nav-cover]')) return;
      if (color === getComputedStyle(host).backgroundColor) return;
      const canvas = document.createElement('canvas');
      canvas.className = 'pixel-edge';
      canvas.setAttribute('aria-hidden', 'true');
      // (the canvas is laid against the section's foot, so the section is
      // where it is measured from)
      const was = getComputedStyle(host).position === 'static' ? host.style.position : null;
      if (was !== null) host.style.position = 'relative';
      // the room it takes, added to the section's own padding at its foot
      const pad = host.style.paddingBottom;
      host.style.paddingBottom = `${parseFloat(getComputedStyle(host).paddingBottom) + band()}px`;
      host.appendChild(canvas);
      const render = draw(canvas, color);
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
  // (once the page has had a moment to lay itself out)
  const timer = setTimeout(lay, 400);
  window.addEventListener('resize', onResize);
  return () => {
    clearTimeout(timer);
    window.removeEventListener('resize', onResize);
    clear();
  };
}
