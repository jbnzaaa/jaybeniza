import plated from './plates'

/**
 * Markup - HTML5, CSS3 and Sass: one page taken apart into three plates,
 * each written in its own language - the HTML, elements between angle
 * brackets, some inside others; the CSS, two rules, each a selector and
 * its declarations between braces; and the Sass, rules nested inside
 * rules. The pointer's x scrubs the gap between the plates; its y picks
 * a plate, which takes the bright edge. At rest the page is a little
 * apart and the top plate is bright. The slider is the widest gap.
 */
const W = 84, L = 116;

const mount = plated({
  S: 1.9, W, L, RAD: 8, T: [6, 2.4, 2.4], REST: 18, GMIN: 4, GTOP: 42, word: "layer",
  marks(k, box, ln, curve) {
    // a brace, opening or closing, its point at (u, v)
    const brace = (u, v, d) => curve([[u + 4 * d, v - 6], [u + 2 * d, v - 5], [u + 2 * d, v - 1.5], [u, v], [u + 2 * d, v + 1.5], [u + 2 * d, v + 5], [u + 4 * d, v + 6]]);
    // a declaration: a property and its value
    const says = (u, v) => ln(u, v, u + 10, v) + ln(u + 14, v, u + 40, v);
    // the HTML: four elements, each a box between angle brackets, the middle two inside the first
    if (k === 0) {
      return [[20, 0, 40], [44, 8, 28], [68, 8, 34], [92, 0, 40]].map(([v, indent, long]) => {
        const u = 10 + indent, end = u + 16 + long;
        return ln(u + 5, v - 5, u, v) + ln(u, v, u + 5, v + 5) + box(u + 10, v - 4, u + 10 + long, v + 4, 1)
          + ln(end, v - 5, end + 5, v) + ln(end + 5, v, end, v + 5);
      }).join("");
    }
    // the CSS: two rules, a selector, a brace, two declarations, a brace
    if (k === 1) {
      return [14, 66].map((v) => ln(10, v, 34, v) + brace(38, v, 1) + says(18, v + 12) + says(18, v + 22) + brace(14, v + 34, -1)).join("");
    }
    // the Sass: a rule, a rule inside it, a rule inside that, each a step further in
    return [0, 1, 2].map((n) => {
      const u = 10 + n * 8, v = 14 + n * 26;
      return ln(u, v, u + 20 - n * 2, v) + brace(u + 24 - n * 2, v, 1) + says(u + 8, v + 12) + brace(u + 4, 106 - n * 10, -1);
    }).join("");
  },
});

const figure = {
  name: "markup",
  means: "One page as three plates, its HTML, its CSS and its Sass, each in its own brackets: across scrubs the gap, up and down picks one.",
  rules: [1, 3, 5, 9],
  range: [22, 32, 42],
  mount,
};

export default figure;
