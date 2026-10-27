import HL from './kernel'

const {
  Cam, clamp, lerp, rad, facing, fit, open, poly, prism, proj, rings, seg,
  spring, stepS, disposer, mk, pointer, put, register, solid,
} = HL;

/**
 * Versions - refining: one screen in four versions, stacked, the first at
 * the bottom and the latest on top, each cleaner than the one under it -
 * a rough sketch whose parts lean and wander, a layout still out of line,
 * one lined up but unevenly spaced, and the finished screen. The older a
 * version, the further it is turned off the latest's line, so the stack
 * winds up like a stair. The pointer's x unwinds it, until every version
 * lies square on the one under it; its y picks a version, which takes the
 * bright edge. At rest the stack is wound part way and the latest is
 * bright. The slider is how far the oldest is turned, in degrees.
 */
const W = 64, L = 100, N = 4, T = [5, 2.4, 2.4, 2.4], GAP = 14, CX = W / 2, CY = L / 2;
// the pick bands, top to bottom of the frame, and the run across it
const BY0 = 50, BY1 = 270, BX0 = 70, BX1 = 330;

/** What version k carries: [u0, v0, u1, v1, d] boxes, d a hand-drawn lean (0: drawn true), and [u0, v, u1, wave] lines. */
const MARKS = [
  { b: [[8, 8, 52, 20, 2], [12, 28, 58, 58, 3], [20, 82, 48, 94, 2]], l: [[10, 66, 48, 1], [14, 74, 40, 1]] },
  { b: [[6, 8, 54, 18, 0], [12, 25, 58, 56, 0], [18, 82, 50, 93, 0]], l: [[8, 64, 46, 0], [14, 71, 42, 0]] },
  { b: [[8, 8, 56, 18, 0], [8, 22, 56, 56, 0], [8, 84, 56, 94, 0]], l: [[8, 64, 48, 0], [8, 68, 36, 0]] },
  { b: [[7, 7, 57, 17, 0], [7, 24, 57, 58, 0], [12, 29, 52, 48, 0], [7, 82, 57, 93, 0]], l: [[12, 53, 40, 0], [7, 67, 50, 0], [7, 73, 36, 0], [24, 87.5, 40, 0]] },
];

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let most = value;

  // fitted to a version turned any way at all: a circle round the middle
  const C = Cam(45, 0.5, 2.05);
  const RR = Math.hypot(CX, CY), TS = T.reduce((a, b) => a + b, 0), HZ = (TS + (N - 1) * GAP) / 2;
  fit(C, [[CX - RR, CY - RR, -HZ], [CX + RR, CY + RR, -HZ], [CX + RR, CY - RR, -HZ], [CX - RR, CY + RR, -HZ],
    [CX - RR, CY - RR, HZ], [CX + RR, CY + RR, HZ], [CX + RR, CY - RR, HZ], [CX - RR, CY + RR, HZ]], 200, 160);
  const P = proj(C), front = facing(C);
  const [ring0, inner0] = rings(0, 0, W, L, 0, 1.6);

  // a point, and a ring of samples with their normals, turned by a about the middle
  const turn = (u, v, a) => [CX + (u - CX) * Math.cos(a) - (v - CY) * Math.sin(a), CY + (u - CX) * Math.sin(a) + (v - CY) * Math.cos(a)];
  const turned = (ring, a) => ring.map((q) => {
    const [u, v] = turn(q.u, q.v, a);
    return { u, v, nu: q.nu * Math.cos(a) - q.nv * Math.sin(a), nv: q.nu * Math.sin(a) + q.nv * Math.cos(a) };
  });

  // the plates, bottom to top, so each covers the one under it
  const g = mk("g", {}, svg);
  const plates = T.map(() => {
    const el = solid(g);
    return { el, face: mk("path", { class: "nf lo" }, el.g) };
  });

  // how wound the stack is, 0 to 1, on the site's softer spring
  const wind = spring(0.75, { k: 40, c: 13 });
  let act = -1, drawn = NaN, with_ = NaN;

  function draw() {
    if (wind.x === drawn && most === with_) return;
    drawn = wind.x;
    with_ = most;
    let z = -(TS + (N - 1) * GAP) / 2;
    plates.forEach((p, k) => {
      const a = rad(most * wind.x * (N - 1 - k) / (N - 1)), zt = z + T[k];
      const at = (u, v) => P(...turn(u, v, a), zt);
      put(p.el, prism(P, front, turned(ring0, a), turned(inner0, a), z, zt));
      const { b, l } = MARKS[k];
      p.face.setAttribute("d", b.map(([u0, v0, u1, v1, d]) => poly([at(u0 + d, v0), at(u1, v0 + d), at(u1 - d, v1), at(u0, v1 - d)])).join("")
        + l.map(([u0, v, u1, w]) => (w
          ? open(Array.from({ length: 9 }, (_, i) => at(lerp(u0, u1, i / 8), v + (i % 2 ? 1.2 : -1.2))))
          : seg(at(u0, v), at(u1, v)))).join(""));
      z += T[k] + GAP;
    });
  }

  /** The bright edge: the version picked, or the latest at rest. */
  function light() {
    const on = act < 0 ? N - 1 : act;
    plates.forEach((p, k) => p.el.sil.classList.toggle("hi", k === on));
    read.textContent = act < 0 ? "rest" : `version ${act + 1}`;
  }

  const B = register(stage, (dt) => {
    const moving = stepS(wind, dt);
    draw();
    return moving;
  });
  bag.add(B.unregister);

  // y picks, on bands that never move; x unwinds, wound at the left and square at the right
  function aim(pt) {
    if (pt) {
      act = N - 1 - clamp(Math.floor(((pt[1] - BY0) / (BY1 - BY0)) * N), 0, N - 1);
      wind.t = 1 - clamp((pt[0] - BX0) / (BX1 - BX0), 0, 1);
    } else { act = -1; wind.t = 0.75; }
    light();
    B.wake();
  }

  draw();
  light();
  bag.add(pointer(stage, { move: aim, leave: () => aim(null) }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { most = v; B.wake(); },
    destroy: bag.dispose,
  };
}

const figure = {
  name: "versions",
  means: "One screen in four versions, the older turned further off line: across unwinds them square, up and down picks a version.",
  rules: [1, 3, 5, 9],
  range: [26, 38, 50],
  mount,
};

export default figure;
