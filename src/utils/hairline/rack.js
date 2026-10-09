import lifted from './lift'

/**
 * Rack - component libraries: a board of interface components, each built
 * as a solid - a card, a button, a toggle with its knob thrown, an input
 * with its caret, a radio beside a checkbox. The pointer picks one; it
 * lifts off the board, and the ones beside it rise a little. At rest the
 * button stands proud and bright. The slider is the lift.
 */
const mount = lifted({
  S: 2, box: [-6, -6, 124, 92], zt: 30, word: "part", primary: 1,
  base: [[-6, -6, 124, 92, 10, 2, -6, 0]],
  parts: [
    { r: [2, 2, 46, 58], near: [1, 2, 4], s: [[5, 5, 43, 55, 4, 1.3, 0, 4]],
      m: [[0, 10, 10, 38, 28, 2], [0, 10, 36, 38, 36], [0, 10, 43, 38, 43], [0, 10, 50, 28, 50]] },
    { r: [50, 2, 120, 28], near: [0, 2], s: [[56, 7, 104, 23, 8, 1.2, 0, 6]], m: [[0, 70, 15, 90, 15]] },
    { r: [50, 28, 120, 56], near: [0, 1, 3], s: [[56, 33, 90, 49, 8, 1.1, 0, 3.5], [74, 33, 90, 49, 8, 1.1, 3.5, 6.5]] },
    { r: [50, 56, 120, 88], near: [2, 4], s: [[56, 62, 116, 78, 3, 1.1, 0, 3]], m: [[0, 62, 66, 62, 74]] },
    { r: [2, 58, 50, 88], near: [0, 3], s: [[8, 64, 26, 82, 9, 1.1, 0, 3.5], [13, 69, 21, 77, 4, 0.8, 3.5, 6], [32, 66, 46, 80, 3, 1, 0, 3.5]] },
  ],
});

const figure = {
  name: "rack",
  means: "A board of interface components: the one under the pointer lifts off, and the ones beside it rise a little in turn.",
  rules: [1, 2, 5, 9],
  range: [8, 16, 24],
  mount,
};

export default figure;
