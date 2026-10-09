import scrubbed from './scrub'

/**
 * Key - JavaScript: its mark, a square with the two letters in its lower
 * right corner, built as a thick plate standing over a base and facing
 * the viewer. The pointer's x turns the plate on its upright axis, one
 * way and the other, so its edge shows. At rest it faces the viewer and
 * its letters are bright. The slider is how far it turns, in degrees.
 */
const DEG = Math.PI / 180, HALF = 40, DEEP = 4;
// the plate's outline: a square of the mark's own corners, barely rounded
const SQUARE = [];
for (const [cx, cy, from] of [[1, 1, 0], [-1, 1, 90], [-1, -1, 180], [1, -1, 270]]) for (let k = 0; k <= 4; k++) {
  const th = (from + k * 22.5) * DEG;
  SQUARE.push([cx * (HALF - 5) + 5 * Math.cos(th), cy * (HALF - 5) + 5 * Math.sin(th)]);
}
// the letters, as the strokes they are written with, on the mark's own grid of 100 (y down)
const LETTERS = [
  [[62, 56], [62, 79], [61, 83], [58, 86], [54, 86], [51, 83]],
  [[88, 61], [84, 57], [78, 56], [73, 58], [72, 63], [74, 68], [80, 71], [86, 74], [88, 79], [86, 84], [80, 87], [74, 86], [70, 82]],
].map((stroke) => stroke.map(([x, y]) => [(x - 50) * 0.8, (50 - y) * 0.8]));

const mount = scrubbed({
  S: 2, box: [-40, -40, 40, 40], zt: 56, rest: 0.5,
  build({ slab, line, shape, hullOf, path, lerp }) {
    const base = slab(), drop = line("dash"), plate = line("sil"), face = line("nf lo"), letters = line("nf hi");
    base(-34, -34, 34, 34, 12, 2, -62, -56);
    drop(path([[0, 0, -56], [0, 0, -HALF]]));
    return {
      draw(t, v) {
        // the plate's plane, turned from facing the viewer: a across it, b up it, w out of it
        const f = (45 + lerp(-v, v, t)) * DEG, c = Math.cos(f), s = Math.sin(f);
        const at = (a, b, w) => [a * c + w * s, -a * s + w * c, b];
        const ring = (w, inset) => SQUARE.map(([a, b]) => at(a * inset, b * inset, w));
        plate(hullOf(ring(-DEEP, 1).concat(ring(DEEP, 1))));
        face(shape(ring(DEEP, 0.95)));
        letters(LETTERS.map((stroke) => path(stroke.map(([a, b]) => at(a, b, DEEP)))).join(""));
        return null;
      },
      name: (t, v) => `turn ${Math.round(lerp(-v, v, t))}`,
    };
  },
});

const figure = {
  name: "key",
  means: "The JavaScript mark, a square with its two letters in one corner: across turns the plate on its upright axis.",
  rules: [3, 5, 8, 10],
  range: [20, 35, 50],
  mount,
};

export default figure;
