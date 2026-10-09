import scrubbed from './scrub'

/**
 * Dock - developer handoff: the design, a thin plate with a screen drawn
 * on it in outline, and the build, a block with the same screen standing
 * on it as solids, a gap between them and two dashed guides across it.
 * The pointer's x closes the gap until the two meet edge to edge. At rest
 * they stand apart and the design is bright; closed, the build is. The
 * slider is the gap at its widest.
 */
// the one screen both carry: a header, a card, a button
const SCREEN = [[6, 6, 44, 16, 3], [6, 22, 44, 46, 3], [10, 52, 40, 64, 6]];

const mount = scrubbed({
  S: 2.1, box: [-74, 0, 74, 70], zt: 14, rest: 0.3,
  build({ slab, line, box, ln, lerp }) {
    const guide = line("dash"), plate = slab(), drawn = line(), block = slab(), built = SCREEN.map(() => slab());
    return {
      draw(t, v) {
        const gap = lerp(v, 0, t), xa = -51 - gap / 2, xb = 1 + gap / 2;
        guide(ln(xa + 50, 6, xb, 6, 0) + ln(xa + 50, 64, xb, 64, 0));
        plate(xa, 0, xa + 50, 70, 8, 1.3, 0, 2);
        drawn(SCREEN.map((q) => box(xa + q[0], q[1], xa + q[2], q[3], q[4], 2)).join(""));
        block(xb, 0, xb + 50, 70, 8, 1.3, 0, 7);
        SCREEN.forEach((q, i) => built[i](xb + q[0], q[1], xb + q[2], q[3], q[4], 1, 7, 9 + i));
        return t > 0.6 ? block : plate;
      },
      name: (t) => (t > 0.9 ? "docked" : "gap"),
    };
  },
});

const figure = {
  name: "dock",
  means: "A design drawn on a plate and the same screen built on a block: across closes the gap until the two meet.",
  rules: [3, 5, 8, 9],
  range: [20, 32, 44],
  mount,
};

export default figure;
