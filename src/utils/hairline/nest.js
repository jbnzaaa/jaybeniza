import lifted from './lift'

/**
 * Nest - React: an interface as components inside components - a root
 * block, three blocks standing on it, and three more on those. The
 * pointer picks a block; it lifts with everything inside it, the inner
 * ones a step later, and takes the bright edge with them. At rest one
 * innermost block stands a little proud and bright. The slider is the
 * lift.
 */
// the block each block sits in, and how many levels p is inside a (-1: not inside)
const IN = [-1, 0, 0, 0, 1, 1, 2];
const inside = (a, p) => { let d = 0; for (let i = p; i >= 0; i = IN[i], d++) if (i === a) return d; return -1; };
const block = (x0, y0, x1, y1, level, m) => ({
  r: [x0, y0, x1, y1], s: [[x0, y0, x1, y1, 7 - level * 1.5, 1.6 - level * 0.25, level * 4, level * 4 + (level < 2 ? 4 : 3)]], m,
});

const mount = lifted({
  S: 2, box: [-6, -6, 116, 96], zt: 34, word: "node", primary: 6,
  base: [[-6, -6, 116, 96, 9, 2, -4, 0]],
  parts: [
    block(0, 0, 110, 90, 0),
    block(6, 6, 52, 84, 1),
    block(58, 6, 104, 50, 1),
    block(58, 56, 104, 84, 1, [[0, 66, 70, 96, 70]]),
    block(11, 11, 47, 40, 2, [[0, 18, 25, 40, 25]]),
    block(11, 46, 47, 79, 2, [[0, 18, 57, 40, 57], [0, 18, 66, 32, 66]]),
    block(63, 11, 99, 45, 2, [[0, 70, 20, 92, 36, 2]]),
  ],
  // the block picked and all inside it, a level at a time
  reach: (a, p) => { const d = inside(a.id, p.id); return d < 0 ? [0, 0] : [1, d]; },
  lit: (a, p) => inside(a.id, p.id) >= 0,
});

const figure = {
  name: "nest",
  means: "Components inside components: the block under the pointer lifts with everything inside it, a level at a time.",
  rules: [1, 2, 5, 9],
  range: [8, 14, 22],
  mount,
};

export default figure;
