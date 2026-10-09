import field from './field'

/**
 * Pegs - Tailwind CSS: a board of small pegs in rows, one to a utility,
 * some square and some round. The pegs stand as tall as the pointer is
 * near, a mound that follows it across the board. At rest the pegs make a
 * low dune and the peg at its top is bright. The slider is the radius.
 */
const parts = [];
for (let i = 0; i < 6; i++) for (let j = 0; j < 4; j++) {
  parts.push({
    s: [3 + i * 20, 3 + j * 20, 17 + i * 20, 17 + j * 20, (i + j) % 3 ? 3 : 7, 1],
    h: 2 + 8 * Math.exp(-((i - 1.5) ** 2 + (j - 1) ** 2) / 2.5),
  });
}

const mount = field({
  S: 2.05, box: [-6, -6, 126, 86], zt: 16, word: "peg", primary: 5, low: 1.5, amp: 13,
  base: [[-6, -6, 126, 86, 10, 2, -5, 0]],
  parts,
});

const figure = {
  name: "pegs",
  means: "A board of utility pegs: they stand taller the nearer the pointer is, a mound that follows it across the board.",
  rules: [1, 3, 5, 9],
  range: [24, 38, 56],
  mount,
};

export default figure;
