import lifted from './lift'

/**
 * Route - user flows: six step tiles on a board, joined by a path that
 * forks after the second. The pointer picks a tile; every tile on the way
 * to it, from the start, rises in turn. The start is a tile with a round
 * on it, the fork a round tile, the two ends tiles with a frame. At rest
 * the start stands a little proud and bright. The slider is the lift.
 */
// the tile each tile is reached from, and the way to a tile from the start
const UP = [-1, 0, 1, 1, 2, 3];
const way = (id) => { const out = []; for (let i = id; i >= 0; i = UP[i]) out.unshift(i); return out; };
const tile = (x, y, r) => [x, y, x + 26, y + 20, r, 1.2, 0, 3];

const mount = lifted({
  S: 1.65, box: [-8, -8, 162, 104], zt: 30, word: "step", primary: 0,
  base: [[-8, -8, 162, 104, 10, 2, -5, 0]],
  // the path: start to fork, the fork's two arms, each arm to its end
  lines: [[30, 48, 44, 48], [70, 48, 77, 48], [77, 22, 77, 74], [77, 22, 84, 22], [77, 74, 84, 74], [110, 22, 124, 22], [110, 74, 124, 74]],
  parts: [
    { r: [4, 38, 30, 58], s: [tile(4, 38, 4)], m: [[0, 12, 43, 22, 53, 5]] },
    { r: [44, 36, 70, 60], s: [[44, 36, 70, 60, 12, 1.2, 0, 3]], m: [[0, 52, 48, 62, 48]] },
    { r: [84, 12, 110, 32], s: [tile(84, 12, 4)], m: [[0, 90, 19, 104, 19], [0, 90, 25, 99, 25]] },
    { r: [84, 64, 110, 84], s: [tile(84, 64, 4)], m: [[0, 90, 71, 104, 71], [0, 90, 77, 99, 77]] },
    { r: [124, 12, 150, 32], s: [tile(124, 12, 4)], m: [[0, 129, 16, 145, 28, 3]] },
    { r: [124, 64, 150, 84], s: [tile(124, 64, 4)], m: [[0, 129, 68, 145, 80, 3]] },
  ],
  // everything on the way to the tile picked, one step later each
  reach: (a, p) => { const i = way(a.id).indexOf(p.id); return i < 0 ? [0, 0] : [1, i]; },
});

const figure = {
  name: "route",
  means: "A user flow as tiles on a board: pick a step and every step on the way to it, from the start, rises in turn.",
  rules: [1, 2, 5, 9],
  range: [8, 14, 22],
  mount,
};

export default figure;
