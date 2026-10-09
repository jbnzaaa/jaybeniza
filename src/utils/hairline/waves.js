import scrubbed from './scrub'

/**
 * Waves - Tailwind CSS: its mark, two waves one under the other, each
 * built as a slab standing over a base and facing the viewer. The
 * pointer's x slides the two against each other, the upper one way and
 * the lower the other. At rest they lie as the mark draws them and the
 * upper wave is bright. The slider is how far they slide.
 */
const K = Math.SQRT1_2, SCALE = 2.1, DEEP = 5;
// one wave of the mark, as the cubic curves it is drawn with (the other is the same, moved)
const CURVES = [
  [[27, 0], [19.8, 0], [15.3, 3.6], [13.5, 10.8]],
  [[13.5, 10.8], [16.2, 7.2], [19.35, 5.85], [22.95, 6.75]],
  [[22.95, 6.75], [25.004, 7.263], [26.472, 8.754], [28.097, 10.403]],
  [[28.097, 10.403], [30.744, 13.09], [33.808, 16.2], [40.5, 16.2]],
  [[40.5, 16.2], [47.7, 16.2], [52.2, 12.6], [54, 5.4]],
  [[54, 5.4], [51.3, 9], [48.15, 10.35], [44.55, 9.45]],
  [[44.55, 9.45], [42.496, 8.937], [41.028, 7.446], [39.403, 5.797]],
  [[39.403, 5.797], [36.756, 3.11], [33.692, 0], [27, 0]],
];
const WAVE = [];
for (const [p0, p1, p2, p3] of CURVES) for (let k = 0; k < 6; k++) {
  const t = k / 6, m = 1 - t;
  WAVE.push([0, 1].map((n) => m * m * m * p0[n] + 3 * m * m * t * p1[n] + 3 * m * t * t * p2[n] + t * t * t * p3[n]));
}

const mount = scrubbed({
  S: 2.1, box: [-40, -40, 40, 40], zt: 52, rest: 0.5,
  build({ slab, line, shape, path, lerp }) {
    const base = slab(), drop = line("dash");
    // a wave: its back, the sides between, its face
    const waves = [0, 1].map((n) => ({ back: line("sil"), sides: line("fo"), face: line(n ? "sil" : "hi") }));
    base(-34, -34, 34, 34, 12, 2, -52, -46);
    drop(path([[0, 0, -46], [0, 0, -36]]));
    return {
      draw(t, v) {
        const slide = lerp(-v, v, t);
        waves.forEach((wave, n) => {
          // the mark's own points, set in its plane - which stands facing the viewer - w out of it
          const put = (w) => WAVE.map(([x, y]) => {
            const a = (x - 13.5 * n - 20.25) * SCALE + (n ? -slide : slide), b = (16.2 - y - 16.2 * n) * SCALE;
            return [a * K + w * K, -a * K + w * K, b];
          });
          const far = put(0), near = put(DEEP);
          wave.back(shape(far));
          wave.sides(far.map((p, k) => { const q = (k + 1) % far.length; return shape([p, far[q], near[q], near[k]]); }).join(""));
          wave.face(shape(near));
        });
        return null;
      },
      name: (t, v) => `slide ${Math.round(lerp(-v, v, t))}`,
    };
  },
});

const figure = {
  name: "waves",
  means: "The Tailwind CSS mark, two waves one under the other: across slides them against each other, one each way.",
  rules: [3, 5, 8, 10],
  range: [5, 10, 15],
  mount,
};

export default figure;
