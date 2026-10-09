import plated from './plates'

/**
 * Markup - HTML5, CSS3 and Sass: one page taken apart into three plates -
 * the structure, bare boxes; the style, the same page rounded and
 * dressed; and the nested style, rules inside rules inside rules. The
 * pointer's x scrubs the gap between the plates; its y picks a plate,
 * which takes the bright edge. At rest the page is a little apart and
 * the top plate is bright. The slider is the widest gap.
 */
const W = 84, L = 116;

const mount = plated({
  S: 1.9, W, L, RAD: 8, T: [6, 2.4, 2.4], REST: 18, GMIN: 4, GTOP: 42, word: "layer",
  marks(k, box, ln) {
    // the structure: a header, a column, the body
    if (k === 0) return box(7, 8, W - 7, 22, 1) + box(7, 28, 27, L - 8, 1) + box(33, 28, W - 7, L - 8, 1);
    // the style: a rounded header, two cards, two lines, a button
    if (k === 1) {
      return box(7, 8, W - 7, 22, 5) + box(7, 30, 39, 70, 5) + box(45, 30, W - 7, 70, 5)
        + ln(13, 80, W - 13, 80) + ln(13, 88, 55, 88) + box(7, 97, 43, 108, 5.5);
    }
    // the nested style: the window's bar, and four rules one inside another
    return ln(7, 20, W - 7, 20) + [10, 18, 26].map((u) => box(u - 2.5, 9, u + 2.5, 14, 2.5)).join("")
      + [0, 1, 2, 3].map((n) => box(7 + n * 7, 27 + n * 7, W - 7 - n * 7, L - 8 - n * 7 - n * 6, 5 - n)).join("");
  },
});

const figure = {
  name: "markup",
  means: "One page as three plates, its markup, its look and its nested rules: across scrubs the gap, up and down picks a plate.",
  rules: [1, 3, 5, 9],
  range: [22, 32, 42],
  mount,
};

export default figure;
