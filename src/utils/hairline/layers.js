import HL from './kernel'

/**
 * Layers: a phone lying flat, taken apart into four plates - the body, the
 * wireframe, the layout and the glass. Each plate carries what is drawn at
 * that stage of a design. The pointer's x scrubs the gap between the plates
 * on one spring; its y picks a plate, which takes the bright edge and goes to
 * the read-out. At rest the phone is a little apart and the glass is bright.
 * The slider is the widest gap, in world units.
 *
 * The pattern: scrub and pick. One spring for a continuous value, a choice
 * made on fixed bands of the frame, so a plate moving cannot flip it.
 */
const {
  Cam, clamp, lerp, extremes, facing, fit, poly, prism, proj, ringAt, rings, rrect, seg,
  spring, stepS, disposer, mk, pointer, put, register, solid,
} = HL;

const W = 64, L = 118, RAD = 13, N = 4, T = [7, 2.4, 2.4, 2.4];
const REST = 17, GMIN = 3, GTOP = 42;
// the pick bands, top to bottom of the frame, and the scrub's run across it
const BY0 = 58, BY1 = 266, BX0 = 70, BX1 = 330;

/** What plate k has drawn on its top face, at height z: one path string. */
function marks(P, k, z) {
  const box = (u0, v0, u1, v1, r) => poly(ringAt(P, rrect(u0, v0, u1, v1, r, 4), z));
  const ln = (u0, v0, u1, v1) => seg(P(u0, v0, z), P(u1, v1, z));
  // the body: a camera island and the battery's well
  if (k === 0) return box(9, 8, 27, 24, 5) + box(9, 32, W - 9, L - 12, 4);
  // the wireframe: a crossed picture box, two lines of copy, two blocks
  if (k === 1) {
    return box(8, 10, W - 8, 46, 3) + ln(8, 10, W - 8, 46) + ln(W - 8, 10, 8, 46)
      + ln(8, 56, W - 8, 56) + ln(8, 64, W - 22, 64) + box(8, 76, W - 8, 90, 3) + box(8, 96, W - 8, 110, 3);
  }
  // the layout: a header, four cards, a bar of tabs
  if (k === 2) {
    return box(8, 8, W - 8, 18, 3) + box(8, 24, 29, 58, 3) + box(35, 24, W - 8, 58, 3)
      + box(8, 64, 29, 98, 3) + box(35, 64, W - 8, 98, 3) + ln(8, 107, W - 8, 107);
  }
  // the glass: the speaker's slot and the bar at its foot
  return box(22, 5, 42, 10, 2.5) + ln(22, L - 7, 42, L - 7);
}

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let gmax = value;

  // fitted to the phone at its widest gap, so nothing leaves the frame
  const C = Cam(45, 0.5, 1.55);
  const ZT = T.reduce((a, b) => a + b, 0) + (N - 1) * GTOP;
  // the plates part about the middle of the stack, up and down alike, so
  // the phone at rest sits in the middle of its frame and stays there
  const HZ = ZT / 2;
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
    const z0 = -(T.reduce((a, b) => a + b, 0) + (N - 1) * gp) / 2;
    let z = z0, top = z0;
    plates.forEach((p, k) => {
      put(p.el, prism(P, front, ring, inner, z, z + T[k]));
      p.face.setAttribute("d", marks(P, k, z + T[k]));
      top = z;
      z += T[k] + gp;
    });
    guide.setAttribute("d", seg(P(eL.u, eL.v, z0 + T[0]), P(eL.u, eL.v, top)) + seg(P(eR.u, eR.v, z0 + T[0]), P(eR.u, eR.v, top)));
  }

  /** The bright edge: the plate picked, or the glass at rest. */
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
  name: "layers",
  means: "A phone taken apart into body, wireframe, layout and glass: across scrubs the gap, up and down picks a plate.",
  rules: [1, 3, 5, 9],
  range: [20, 32, 42],
  mount,
};

export default figure;
