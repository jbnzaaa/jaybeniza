import HL from './kernel'

/**
 * Stack: a browser window lying flat, taken apart into the five plates a
 * front end is built from - the markup's bare boxes, the styled layout,
 * the script's switches, the components nested in one another, and the
 * motion's curve on top. The pointer's x scrubs the gap between the plates
 * on one spring; its y picks a plate, which takes the bright edge and goes
 * to the read-out. At rest the window is a little apart and the top plate
 * is bright. The slider is the widest gap, in world units.
 *
 * The pattern: scrub and pick. One spring for a continuous value, a choice
 * made on fixed bands of the frame, so a plate moving cannot flip it.
 */
const {
  Cam, clamp, lerp, extremes, facing, fit, open, poly, prism, proj, ringAt, rings, rrect, seg,
  spring, stepS, disposer, mk, pointer, put, register, solid,
} = HL;

const W = 84, L = 116, RAD = 8, N = 5, T = [6, 2.4, 2.4, 2.4, 2.4];
const REST = 12, GMIN = 3, GTOP = 32;
// the pick bands, top to bottom of the frame, and the scrub's run across it
const BY0 = 50, BY1 = 270, BX0 = 70, BX1 = 330;

/** What plate k has drawn on its top face, at height z: one path string. */
function marks(P, k, z) {
  const box = (u0, v0, u1, v1, r) => poly(ringAt(P, rrect(u0, v0, u1, v1, r, 4), z));
  const ln = (u0, v0, u1, v1) => seg(P(u0, v0, z), P(u1, v1, z));
  // the markup: bare boxes - a header, a column, the body
  if (k === 0) return box(7, 8, W - 7, 22, 1) + box(7, 28, 27, L - 8, 1) + box(33, 28, W - 7, L - 8, 1);
  // the styles: the same page dressed - a rounded header, cards, a button
  if (k === 1) {
    return box(7, 8, W - 7, 22, 5) + box(7, 30, 39, 70, 5) + box(45, 30, W - 7, 70, 5)
      + ln(13, 80, W - 13, 80) + ln(13, 88, 55, 88) + box(7, 97, 43, 108, 5.5);
  }
  // the script: three switches, each thrown its own way
  if (k === 2) {
    return [[24, 1], [56, 0], [88, 1]].map(([v, on]) => box(10, v - 8, 42, v + 8, 8)
      + box(on ? 28 : 12, v - 6, on ? 40 : 24, v + 6, 6) + ln(50, v, W - 10, v)).join("");
  }
  // the components: boxes inside boxes
  if (k === 3) {
    return box(7, 8, W - 7, L - 8, 4) + box(13, 15, W - 13, 52, 3) + box(19, 22, 39, 45, 2) + box(45, 22, W - 19, 45, 2)
      + box(13, 59, W - 13, L - 15, 3) + box(19, 66, W - 19, 80, 2) + box(19, 86, W - 19, L - 22, 2);
  }
  // the motion: the window's own bar, and an ease curve between two keys
  const curve = [];
  for (let i = 0; i <= 24; i++) {
    const t = i / 24, e = t * t * (3 - 2 * t);
    curve.push(P(lerp(14, W - 14, e), lerp(L - 16, 34, t), z));
  }
  return ln(7, 20, W - 7, 20) + [10, 18, 26].map((u) => box(u - 2.5, 9, u + 2.5, 14, 2.5)).join("")
    + open(curve) + box(10, L - 20, 18, L - 12, 4) + box(W - 18, 30, W - 10, 38, 4);
}

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let gmax = value;

  // fitted to the window at its widest gap, so nothing leaves the frame
  const C = Cam(45, 0.5, 1.4);
  const TS = T.reduce((a, b) => a + b, 0);
  // the plates part about the middle of the stack, up and down alike, so
  // the window at rest sits in the middle of its frame and stays there
  const HZ = (TS + (N - 1) * GTOP) / 2;
  fit(C, [[0, 0, -HZ], [W, L, -HZ], [W, 0, -HZ], [0, L, -HZ], [0, 0, HZ], [W, L, HZ], [W, 0, HZ], [0, L, HZ]], 200, 160);
  const P = proj(C), front = facing(C);
  const [ring, inner] = rings(0, 0, W, L, RAD, 1.6);
  const [eL, eR] = extremes(P, ring);

  // the guides first, so every plate is painted over them; then the plates, bottom to top
  const g = mk("g", {}, svg);
  const guide = mk("path", { class: "dash" }, g);
  const plates = [];
  for (let k = 0; k < N; k++) {
    const el = solid(g);
    plates.push({ el, face: mk("path", { class: "nf lo" }, el.g) });
  }

  // softer than the engine's default spring (k 100, c 18): the plates
  // drift apart and settle without a snap
  const gap = spring(REST, { k: 40, c: 13 });
  let act = -1, drawn = NaN;

  function draw() {
    const gp = gap.x;
    if (gp === drawn) return;
    drawn = gp;
    // from half the stack's height below the middle
    const z0 = -(TS + (N - 1) * gp) / 2;
    let z = z0, top = z0;
    plates.forEach((p, k) => {
      put(p.el, prism(P, front, ring, inner, z, z + T[k]));
      p.face.setAttribute("d", marks(P, k, z + T[k]));
      top = z;
      z += T[k] + gp;
    });
    guide.setAttribute("d", seg(P(eL.u, eL.v, z0 + T[0]), P(eL.u, eL.v, top)) + seg(P(eR.u, eR.v, z0 + T[0]), P(eR.u, eR.v, top)));
  }

  /** The bright edge: the plate picked, or the top one at rest. */
  function light() {
    const on = act < 0 ? N - 1 : act;
    plates.forEach((p, k) => p.el.sil.classList.toggle("hi", k === on));
    read.textContent = act < 0 ? "rest" : `layer ${act + 1}`;
  }

  const B = register(stage, (dt) => {
    const moving = stepS(gap, dt);
    draw();
    return moving;
  });
  bag.add(B.unregister);

  let over = null;
  function retarget() {
    if (over) {
      // y picks, on bands that never move; x scrubs
      const band = clamp(Math.floor(((over[1] - BY0) / (BY1 - BY0)) * N), 0, N - 1);
      act = N - 1 - band;
      gap.t = lerp(GMIN, gmax, clamp((over[0] - BX0) / (BX1 - BX0), 0, 1));
    } else { act = -1; gap.t = REST; }
    light();
    B.wake();
  }

  draw();
  light();
  bag.add(pointer(stage, {
    move: (p) => { over = p; retarget(); },
    leave: () => { over = null; retarget(); },
  }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { gmax = v; if (over) retarget(); },
    destroy: bag.dispose,
  };
}

const figure = {
  name: "stack",
  means: "A browser window taken apart into markup, styles, script, components and motion: across scrubs the gap, up and down picks a plate.",
  rules: [1, 3, 5, 9],
  range: [16, 24, 32],
  mount,
};

export default figure;
