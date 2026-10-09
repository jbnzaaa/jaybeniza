import lifted from './lift'

/**
 * Switches - JavaScript: four switches on a board, each a slot with a
 * knob in it. The pointer picks a switch; its knob is thrown to the other
 * end of the slot, and the knobs beside it start after it, part of the
 * way. At rest one switch is on and bright, the others off. The slider is
 * a knob's travel.
 */
const flick = (x, i) => ({
  r: [x - 3, 2, x + 23, 62], rest: i === 1 ? 1 : 0,
  // the slot, which stays where it is, then its knob
  s: [[x, 6, x + 20, 58, 10, 1.2, 0, 3, 1], [x + 2, 8, x + 18, 24, 8, 1, 3, 7]],
});

const mount = lifted({
  S: 2.3, box: [-6, -6, 114, 70], zt: 12, word: "switch", primary: 1, flip: true,
  // along its slot
  move: (v) => [0, v, 0],
  base: [[-6, -6, 114, 70, 10, 2, -5, 0]],
  parts: [4, 32, 60, 88].map(flick),
});

const figure = {
  name: "switches",
  means: "Four switches on a board: the knob under the pointer is thrown to the other end, and the ones beside it start after.",
  rules: [1, 2, 5, 9],
  range: [22, 28, 34],
  mount,
};

export default figure;
