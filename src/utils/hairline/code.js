import HL from './kernel'

/**
 * Code: a browser window lying flat, its page a file of eight code lines,
 * each a bar as long as its line and set in by its indent. The pointer is
 * projected back onto the window, and each bar takes its height from its
 * distance to it, on its own spring. At rest the lines stand at uneven
 * heights; the tallest is bright. The line under the pointer takes the bright
 * edge, and its dot in the gutter lights. The slider is the radius, in lines.
 *
 * The pattern: a continuous field. Springs, a falloff by distance, and a hit
 * test on the window's own plane, which never moves.
 */
const {
  Cam, clamp, facing, fit, prism, proj, rings, seg, unproj, spring, stepS,
  flatDot, mk, place, pointer, put, register, disposer, solid,
} = HL;

const WX = 150, WY = 112, PB = 5, BAR = 14, N = 8, PITCH = 11, Y0 = 22, BH = 7, X0 = 24, HMAX = 30;
// each line: its indent and its length; and the height it rests at
const LINES = [[0, 70], [10, 90], [20, 60], [20, 84], [10, 40], [10, 76], [20, 50], [0, 30]];
const REST = [3, 5, 8.5, 6, 3, 4.5, 6, 2.5];

/** The share of full height at u radii from the pointer: 1 → .31 at 42% → .09 at the edge and beyond. */
const falloff = (u) =>
  u <= 0 ? 1 : u <= 0.417 ? 1 - (u / 0.417) * 0.6875 : u <= 1 ? 0.3125 - ((u - 0.417) / 0.583) * 0.2185 : 0.094;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let R = value * PITCH, over = null;

  const C = Cam(45, 0.5, 1.6);
  fit(C, [[0, 0, -PB], [WX, WY, -PB], [WX, 0, -PB], [0, WY, -PB], [0, 0, HMAX], [WX, WY, HMAX], [WX, 0, HMAX], [0, WY, HMAX]], 200, 166);
  const P = proj(C), front = facing(C);

  // the window: a slab, the rule under its title bar, and the gutter's rule
  const g = mk("g", {}, svg);
  const [wr, wi] = rings(0, 0, WX, WY, 10, 2);
  put(solid(g), prism(P, front, wr, wi, -PB, 0));
  mk("path", { d: seg(P(4, BAR, 0), P(WX - 4, BAR, 0)) + seg(P(17, BAR + 4, 0), P(17, WY - 6, 0)), class: "nf lo" }, g);
  // its three buttons, and a dot in the gutter for every line
  for (let k = 0; k < 3; k++) place(flatDot(g, C, 1.5, "dot m"), P(9 + k * 7, 7.5, 0));

  // the lines, far to near, so appending is painting back to front
  const lines = LINES.map(([ind, len], j) => {
    const y = Y0 + j * PITCH, x = X0 + ind;
    const dot = flatDot(g, C, 0.9, "dot off");
    place(dot, P(9.5, y + BH / 2, 0));
    const [ring, inner] = rings(x, y, x + len, y + BH, 2.5, 0.9);
    return { j, cx: x + len / 2, cy: y + BH / 2, half: len / 2, ring, inner, dot, sp: spring(REST[j], { k: 40, c: 13, eps: 0.04 }), el: null, drawn: NaN };
  });
  lines.forEach((l) => { l.el = solid(g); });
  const peak = lines.reduce((a, b) => (REST[b.j] > REST[a.j] ? b : a));
  let lit = null;

  // a bar whose spring hasn't moved keeps its paths
  function draw(l) {
    const h = Math.max(0.6, l.sp.x);
    if (h === l.drawn) return;
    l.drawn = h;
    put(l.el, prism(P, front, l.ring, l.inner, 0, h));
  }

  /** The bright edge and the lit dot: the line picked, or the tallest at rest. */
  function light(want) {
    if (want === lit) return;
    lit = want;
    for (const l of lines) {
      l.el.sil.classList.toggle("hi", l === want);
      l.dot.classList.toggle("off", l !== want);
    }
  }

  const B = register(stage, (dt) => {
    let m = false;
    for (const l of lines) { if (stepS(l.sp, dt)) m = true; draw(l); }
    return m;
  });
  bag.add(B.unregister);

  function retarget() {
    if (!over) {
      for (const l of lines) l.sp.t = REST[l.j];
      light(peak);
      read.textContent = "rest";
    } else {
      for (const l of lines) {
        // distance to the bar: across the lines in full, along the bar only past its ends
        const dx = Math.max(0, Math.abs(over[0] - l.cx) - l.half), dy = over[1] - l.cy;
        l.sp.t = HMAX * falloff(Math.hypot(dy, dx * 0.4) / R);
      }
      const j = clamp(Math.round((over[1] - Y0 - BH / 2) / PITCH), 0, N - 1);
      light(lines[j]);
      read.textContent = `line ${j + 1}`;
    }
    B.wake();
  }

  lines.forEach(draw);
  light(peak);
  read.textContent = "rest";
  bag.add(pointer(stage, {
    move: (p) => {
      const q = unproj(C, p[0], p[1], 0);
      // only the window answers: off it, the figure rests
      over = q[0] < -6 || q[0] > WX + 6 || q[1] < BAR || q[1] > WY + 6 ? null : q;
      retarget();
    },
    leave: () => { over = null; retarget(); },
  }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { R = v * PITCH; if (over) retarget(); },
    destroy: bag.dispose,
  };
}

const figure = {
  name: "code",
  means: "A browser window whose code lines are bars: they rise under the pointer and fall off with distance.",
  rules: [1, 3, 5, 9],
  range: [1.5, 3, 5],
  mount,
};

export default figure;
