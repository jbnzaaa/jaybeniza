import lifted from './lift'

/**
 * Sketch - exploring: three sketches of one screen laid out on a desk
 * beside a pencil, each a different direction - a picture over copy, a
 * list, a grid of cards. The pointer picks a sketch; it lifts off the
 * desk, and the ones beside it rise a little. At rest the middle one -
 * the direction settled on - stands proud and bright. The slider is the
 * lift.
 */
// a sketch at x0, y0 (40 by 56), and what is drawn on it: [u0, v0, u1,
// v1, radius], a box when it has a radius and a line when it has none
const sheet = (x0, y0, marks) => ({
  r: [x0 - 2, y0 - 2, x0 + 42, y0 + 58],
  s: [[x0, y0, x0 + 40, y0 + 56, 0, 1, 0, 1.2]],
  m: marks.map(([u0, v0, u1, v1, r]) => [0, x0 + u0, y0 + v0, x0 + u1, y0 + v1, r]),
});

const row = (v) => [[4, v, 12, v + 8, 1], [16, v + 2, 36, v + 2], [16, v + 6, 30, v + 6]];

const mount = lifted({
  S: 1.85, box: [-20, -8, 148, 70], zt: 24, word: "direction", primary: 1,
  base: [
    [-20, -8, 148, 70, 0, 1.6, -5, 0],
    // the pencil, from its eraser to its point
    [-14, 0, -9, 3, 0, 0.6, 0, 4.5],
    [-14.4, 3, -8.6, 7, 0, 0.6, 0, 5],
    [-14, 7, -9, 52, 0, 0.6, 0, 4.5],
    [-13, 52, -10, 58, 0, 0.5, 0, 3],
  ],
  parts: [
    sheet(0, 10, [[4, 4, 36, 24, 1], [4, 4, 36, 24], [36, 4, 4, 24], [4, 31, 36, 31], [4, 37, 26, 37], [4, 44, 22, 51, 1]]),
    sheet(48, 0, [...row(6), ...row(20), ...row(34), [4, 46, 36, 52, 1]]),
    sheet(96, 10, [[4, 4, 36, 10, 1], [4, 14, 19, 30, 1], [21, 14, 36, 30, 1], [4, 33, 19, 49, 1], [21, 33, 36, 49, 1]]),
  ],
});

const figure = {
  name: "sketch",
  means: "Three sketches of one screen, each a different direction: the one under the pointer lifts off the desk.",
  rules: [1, 2, 5, 9],
  range: [6, 10, 16],
  mount,
};

export default figure;
