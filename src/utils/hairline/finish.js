import lifted from './lift'

/**
 * Finish - high-fidelity UI: a phone with the finished interface on it,
 * each part a solid - a header with its avatar, two cards with a picture
 * and copy, a list row, a button. The pointer picks a part; it lifts off
 * the screen, and the parts above and below it rise a little. At rest the
 * button stands proud and bright. The slider is the lift.
 */
const card = (x) => ({
  r: [x - 2, 24, x + 26, 64], s: [[x, 26, x + 24, 62, 4, 1.1, 0, 4]],
  m: [[0, x + 4, 30, x + 20, 44, 2], [0, x + 4, 50, x + 20, 50], [0, x + 4, 56, x + 14, 56]],
});

const mount = lifted({
  S: 2.3, box: [0, 0, 64, 116], zt: 28, word: "part", primary: 4,
  base: [[0, 0, 64, 116, 13, 1.6, -6, 0]],
  parts: [
    { r: [4, 4, 60, 23], s: [[6, 6, 58, 20, 4, 1.1, 0, 3]], m: [[0, 11, 13, 30, 13], [0, 48, 10.5, 53, 15.5, 2.5]] },
    card(6),
    card(34),
    { r: [4, 66, 60, 89], s: [[6, 68, 58, 86, 4, 1.1, 0, 2.5]], m: [[0, 10, 72, 20, 82, 5], [0, 25, 74, 52, 74], [0, 25, 80, 42, 80]] },
    { r: [4, 90, 60, 112], s: [[10, 93, 54, 107, 7, 1.2, 0, 5]], m: [[0, 24, 100, 40, 100]] },
  ],
});

const figure = {
  name: "finish",
  means: "A phone with the finished interface built on it: the part under the pointer lifts off, and the ones beside it rise a little.",
  rules: [1, 2, 5, 9],
  range: [8, 14, 22],
  mount,
};

export default figure;
