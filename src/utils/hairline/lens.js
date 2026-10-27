import scrubbed from './scrub'

/**
 * Lens - understanding: three cards on a desk, one for each thing a
 * project starts from - who it is for (a portrait over two lines), what
 * they need (a checklist) and what the business wants (bars climbing) -
 * and a magnifying glass held over them. The pointer's x slides the glass
 * along the row; the card under it rises toward the lens, the others less
 * with distance. At rest the glass is over the first card, which is
 * bright. The slider is how far a card rises.
 */
// each card's marks, in its own units (40 by 52): a box when it has a
// radius, a line when it has none
const MARKS = [
  [[12, 8, 28, 24, 1], [8, 32, 32, 32], [12, 40, 28, 40]],
  [[6, 8, 12, 14, 1], [16, 11, 34, 11], [6, 22, 12, 28, 1], [16, 25, 30, 25], [6, 36, 12, 42, 1], [16, 39, 32, 39]],
  [[8, 30, 14, 44, 1], [17, 22, 23, 44, 1], [26, 12, 32, 44, 1], [6, 47, 34, 47]],
];
const WORDS = ["user", "need", "goal"];
const STEP = 48, CY = 26, R = 22, ZL = 26, N = 40;

const mount = scrubbed({
  S: 1.75, box: [-10, -10, 146, 84], zt: 32, rest: 0.1,
  build({ slab, line, box, ln, path, shape, clamp, lerp }) {
    const desk = slab(), cards = MARKS.map(() => [slab(), line()]);
    const rim = line("nf"), glint = line(), collar = slab(), grip = slab();
    // a circle round the lens's middle, at height z, from angle a0 to a1
    const arc = (x, r, z, a0, a1) => Array.from({ length: N + 1 }, (_, k) => {
      const a = lerp(a0, a1, k / N);
      return [x + r * Math.cos(a), CY + r * Math.sin(a), z];
    });
    return {
      draw(t, v) {
        const lx = lerp(20, 20 + 2 * STEP, t);
        let near = 0;
        desk(-10, -10, 146, 62, 0, 1.4, -4, 0);
        cards.forEach(([card, marks], i) => {
          const x0 = i * STEP, d = Math.abs(x0 + 20 - lx), z = v * clamp(1 - d / 44, 0.09, 1);
          if (d < Math.abs(near * STEP + 20 - lx)) near = i;
          card(x0, 0, x0 + 40, 52, 0, 1, z, z + 1.5);
          marks(MARKS[i].map(([u0, v0, u1, v1, r]) => (r
            ? box(x0 + u0, v0, x0 + u1, v1, r, z + 1.5)
            : ln(x0 + u0, v0, x0 + u1, v1, z + 1.5))).join(""));
        });
        // the lens: its rim's top, the inside of it, the near half of its
        // foot and the two sides joining them; a glint on the glass
        const q = Math.PI / 4;
        rim(shape(arc(lx, R, ZL + 2.5, 0, 2 * Math.PI)) + shape(arc(lx, R - 3, ZL + 2.5, 0, 2 * Math.PI))
          + path(arc(lx, R, ZL, -q, 3 * q))
          + path([[lx + R * Math.cos(-q), CY + R * Math.sin(-q), ZL], [lx + R * Math.cos(-q), CY + R * Math.sin(-q), ZL + 2.5]])
          + path([[lx + R * Math.cos(3 * q), CY + R * Math.sin(3 * q), ZL], [lx + R * Math.cos(3 * q), CY + R * Math.sin(3 * q), ZL + 2.5]]));
        glint(path(arc(lx, R - 7, ZL + 2.5, 3.6, 4.4)));
        collar(lx - 3.5, CY + R - 1, lx + 3.5, CY + R + 5, 0, 0.8, ZL - 1, ZL + 4);
        grip(lx - 2.5, CY + R + 5, lx + 2.5, CY + R + 30, 0, 0.8, ZL - 0.5, ZL + 3.5);
        return cards[near][0];
      },
      name: (t) => WORDS[Math.round(t * 2)],
    };
  },
});

const figure = {
  name: "lens",
  means: "Three cards for who it is for, what they need and what the business wants: across slides the glass, and the card under it rises.",
  rules: [3, 5, 8, 10],
  range: [5, 9, 13],
  mount,
};

export default figure;
