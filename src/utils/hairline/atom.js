import scrubbed from './scrub'

/**
 * Atom - React: its mark, built standing over a base and facing the
 * viewer - three orbits crossed at sixty degrees round a core, an
 * electron on each. The pointer's x turns the orbits about the core and
 * runs the electrons round them. At rest the orbits lie as the mark draws
 * them and the core is bright. The slider is how far they turn, in
 * degrees.
 */
const DEG = Math.PI / 180, K = Math.SQRT1_2, TURN = Math.PI * 2;
// a point of the mark's own plane, which stands facing the viewer: a across it, b up it
const at = (a, b) => [a * K, -a * K, b];
// a point of orbit i, the orbits turned by spin degrees: th round an ellipse of half-axes a and b
const on = (i, spin, th, a, b) => {
  const f = (spin + i * 60) * DEG, x = a * Math.cos(th), y = b * Math.sin(th);
  return at(x * Math.cos(f) - y * Math.sin(f), x * Math.sin(f) + y * Math.cos(f));
};

const mount = scrubbed({
  S: 2.1, box: [-40, -40, 40, 40], zt: 62, rest: 0.5,
  build({ slab, line, shape, path, lerp }) {
    const base = slab(), drop = line("dash");
    const orbits = [0, 1, 2].map(() => line("nf sil")), electrons = [0, 1, 2].map(() => line("sil")), core = line("hi");
    const round = (c, r, n) => {
      const points = [];
      for (let k = 0; k < n; k++) points.push([c[0] + r * K * Math.cos(k / n * TURN), c[1] - r * K * Math.cos(k / n * TURN), c[2] + r * Math.sin(k / n * TURN)]);
      return shape(points);
    };
    base(-34, -34, 34, 34, 12, 2, -62, -56);
    drop(path([[0, 0, -56], [0, 0, -9]]));
    core(round([0, 0, 0], 8, 28));
    return {
      draw(t, v) {
        const spin = lerp(-v, v, t);
        orbits.forEach((orbit, i) => {
          // an orbit is a band: its outer edge and its inner
          orbit([[52, 20], [47, 15.5]].map(([a, b]) => {
            const points = [];
            for (let k = 0; k < 56; k++) points.push(on(i, spin, k / 56 * TURN, a, b));
            return shape(points);
          }).join(""));
          electrons[i](round(on(i, spin, t * TURN * 1.5 + i * 2.1, 49.5, 17.75), 4, 16));
        });
        return null;
      },
      name: (t, v) => `spin ${Math.round(lerp(-v, v, t))}`,
    };
  },
});

const figure = {
  name: "atom",
  means: "The React mark, three orbits round a core: across turns the orbits about it and runs an electron round each.",
  rules: [3, 5, 8, 10],
  range: [30, 60, 90],
  mount,
};

export default figure;
