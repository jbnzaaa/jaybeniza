import scrubbed from './scrub'

/**
 * Ease - GSAP animations: an ease curve laid out on a board as a track,
 * from one post to another, three keys marked along it. A puck rides the
 * track; the pointer's x is its place in the animation, and it lifts off
 * the board on the way, highest at the middle, a dashed drop under it. At
 * rest it is part way along and bright. The slider is how high it lifts.
 */
const mount = scrubbed({
  S: 1.9, box: [-8, -8, 142, 88], zt: 26, rest: 0.3,
  build({ slab, line, box, path, lerp }) {
    // the track: across at an even pace, down the board on a smooth step
    const at = (s) => [lerp(26, 110, s), lerp(68, 12, s * s * (3 - 2 * s))];
    const base = slab(), track = line(), from = slab(), drop = line("dash"), puck = slab(), to = slab();
    base(-8, -8, 142, 88, 10, 2, -5, 0);
    const curve = [];
    for (let i = 0; i <= 28; i++) curve.push([...at(i / 28), 0]);
    track(path(curve) + [0.25, 0.5, 0.75].map((s) => { const [x, y] = at(s); return box(x - 2.5, y - 2.5, x + 2.5, y + 2.5, 2.5, 0); }).join(""));
    from(4, 61, 16, 75, 6, 1, 0, 9);
    to(122, 5, 134, 19, 6, 1, 0, 9);
    return {
      draw(t, v) {
        const [x, y] = at(t), z = v * 4 * t * (1 - t);
        drop(path([[x, y, 0], [x, y, z]]));
        puck(x - 9, y - 9, x + 9, y + 9, 9, 1.2, z, z + 6);
        return puck;
      },
      name: (t) => `t ${Math.round(t * 100)}`,
    };
  },
});

const figure = {
  name: "ease",
  means: "An ease curve as a track between two posts: across moves the puck along it, lifting off the board on the way.",
  rules: [3, 5, 8, 9],
  range: [8, 15, 22],
  mount,
};

export default figure;
