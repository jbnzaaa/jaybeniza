import field from './field'

/**
 * Wire - wireframing: one screen laid out in bare blocks - a crossed
 * picture box, two bars of copy, two blocks under them. The blocks stand
 * as tall as the pointer is near, tallest under it. At rest the picture
 * box stands highest and bright. The slider is the radius.
 */
const mount = field({
  S: 2.3, box: [0, 0, 76, 112], zt: 17, word: "block", primary: 0, low: 1.2, amp: 15,
  base: [[0, 0, 76, 112, 11, 1.6, -5, 0]],
  parts: [
    { s: [8, 8, 68, 44, 3, 1.1], h: 6, m: [[10, 10, 66, 42], [66, 10, 10, 42]] },
    { s: [8, 50, 68, 58, 2, 0.9], h: 2 },
    { s: [8, 62, 48, 70, 2, 0.9], h: 2 },
    { s: [8, 76, 36, 104, 3, 1.1], h: 3.5 },
    { s: [40, 76, 68, 104, 3, 1.1], h: 3.5 },
  ],
});

const figure = {
  name: "wire",
  means: "A screen in bare blocks, a crossed picture box and bars of copy: the blocks stand taller the nearer the pointer is.",
  rules: [1, 3, 5, 9],
  range: [28, 44, 64],
  mount,
};

export default figure;
