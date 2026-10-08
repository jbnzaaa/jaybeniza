import HL from './kernel'

/**
 * Tray: a parts tray of six wells, each holding one interface component built
 * as a solid - a card, a toggle, a radio, a button, an input and a slider.
 * The pointer picks a well; its part lifts out, the parts beside it rise a
 * little, staggered outwards from it on the 700ms lift curve. At rest the
 * button stands proud and bright. The slider is the lift, in world units.
 *
 * The pattern: one of many. Tweens, a stagger by distance, and a hit test on
 * each part's own rest top, so a part rising cannot hand the choice on.
 */
const {
  Cam, facing, fit, poly, prism, proj, ringAt, rings, rrect, seg, unproj,
  tdone, tset, tval, tween, disposer, mk, pointer, put, register, solid,
} = HL;

const CW = 46, CH = 40, NX = 3, NY = 2, M = 6, TB = 6, STAG = 45, PROUD = 5, PRIMARY = 3;

// each part: its well [i, j]; its solids [x0, y0, x1, y1, r, b, z0, z1] in the
// well's own coordinates; and the lines on its first solid's top, as [u0, v0, u1, v1]
const PARTS = [
  // a card: a slab with a heading and two lines
  { c: [0, 0], s: [[8, 6, 38, 34, 4, 1.4, 0, 5]], m: [[13, 13, 33, 13], [13, 19, 33, 19], [13, 25, 26, 25]] },
  // a toggle: a pill with its knob thrown to one end
  { c: [1, 0], s: [[7, 12, 39, 28, 8, 1.2, 0, 4], [23, 12, 39, 28, 8, 1.2, 4, 7]], m: [] },
  // a radio: a disc with its centre raised
  { c: [2, 0], s: [[13, 10, 33, 30, 10, 1.2, 0, 4], [19, 16, 27, 24, 4, 0.8, 4, 6.5]], m: [] },
  // a button: a tall pill with its label's line
  { c: [0, 1], s: [[5, 11, 41, 29, 9, 1.4, 0, 7]], m: [[15, 20, 31, 20]] },
  // an input: a low bar with a caret
  { c: [1, 1], s: [[4, 12, 42, 28, 3, 1.2, 0, 3]], m: [[10, 16, 10, 24]] },
  // a slider: a rail with its knob
  { c: [2, 1], s: [[4, 17, 42, 23, 3, 0.9, 0, 2.5], [20, 13, 34, 27, 7, 1.1, 2.5, 6]], m: [] },
];

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let lift = value;

  // fitted to the tray with a part at the slider's highest lift
  const C = Cam(45, 0.5, 1.78);
  const X1 = NX * CW + M, Y1 = NY * CH + M, ZT = 26 + 8;
  // (as much room allowed under the tray as over it, so the tray at rest
  // sits in the middle of its frame)
  fit(C, [[-M, -M, -ZT], [X1, Y1, -ZT], [X1, -M, -ZT], [-M, Y1, -ZT], [-M, -M, ZT], [X1, Y1, ZT], [X1, -M, ZT], [-M, Y1, ZT]], 200, 155.9);
  const P = proj(C), front = facing(C);

  // the tray, then its wells drawn on its top
  const g = mk("g", {}, svg);
  const [tr, ti] = rings(-M, -M, X1, Y1, 10, 2);
  put(solid(g), prism(P, front, tr, ti, -TB, 0));
  let wells = "";
  for (let i = 0; i < NX; i++) for (let j = 0; j < NY; j++) {
    wells += poly(ringAt(P, rrect(i * CW + 2, j * CH + 2, (i + 1) * CW - 2, (j + 1) * CH - 2, 5, 4), 0));
  }
  mk("path", { d: wells, class: "nf lo" }, g);

  // the parts, from the far corner to the near one, so appending is painting back to front
  const parts = PARTS.map((p, id) => ({ ...p, id })).sort((a, b) => a.c[0] + a.c[1] - (b.c[0] + b.c[1])).map((p) => {
    const ox = p.c[0] * CW, oy = p.c[1] * CH, grp = mk("g", {}, g);
    const solids = p.s.map((q) => ({ rings: rings(ox + q[0], oy + q[1], ox + q[2], oy + q[3], q[4], q[5]), z0: q[6], z1: q[7], el: solid(grp) }));
    const rest = p.id === PRIMARY ? PROUD : 0;
    return { ...p, ox, oy, solids, face: mk("path", { class: "nf lo" }, grp), top: Math.max(...p.s.map((q) => q[7])), rest, z: tween(rest), drawn: NaN };
  });

  function draw(p, z) {
    if (z === p.drawn) return;
    p.drawn = z;
    p.solids.forEach((s) => put(s.el, prism(P, front, s.rings[0], s.rings[1], z + s.z0, z + s.z1)));
    const zt = z + p.s[0][7];
    p.face.setAttribute("d", p.m.map((l) => seg(P(p.ox + l[0], p.oy + l[1], zt), P(p.ox + l[2], p.oy + l[3], zt))).join(""));
  }

  const B = register(stage, (_dt, now) => {
    let moving = false;
    for (const p of parts) { draw(p, tval(p.z, now)); if (!tdone(p.z, now)) moving = true; }
    return moving;
  });
  bag.add(B.unregister);

  /** The part whose well holds the pointer, tested on that part's own rest top; null on the tray or off it. */
  function hit([sx, sy]) {
    let best = null, bd = Infinity;
    for (const p of parts) {
      const [x, y] = unproj(C, sx, sy, p.top + p.rest);
      const dx = x - (p.ox + CW / 2), dy = y - (p.oy + CH / 2);
      if (Math.abs(dx) > CW / 2 || Math.abs(dy) > CH / 2) continue;
      const d = Math.hypot(dx, dy);
      if (d < bd) { bd = d; best = p; }
    }
    return best;
  }

  let act = null;
  /** Lifts part a (null puts them all back). The stagger spreads out from the part picked, or the one let go. */
  function setActive(a) {
    if (a === act) return;
    const now = performance.now(), from = a || act;
    act = a;
    for (const p of parts) {
      const dist = Math.abs(p.c[0] - from.c[0]) + Math.abs(p.c[1] - from.c[1]);
      const to = !a ? p.rest : dist === 0 ? lift : dist === 1 ? lift * 0.22 : 0;
      tset(p.z, to, now, dist * STAG);
      const on = a ? p === a : p.id === PRIMARY;
      p.solids.forEach((s) => s.el.sil.classList.toggle("hi", on));
    }
    read.textContent = a ? `part ${a.id + 1}` : "rest";
    B.wake();
  }

  for (const p of parts) {
    draw(p, p.rest);
    p.solids.forEach((s) => s.el.sil.classList.toggle("hi", p.id === PRIMARY));
  }
  read.textContent = "rest";
  bag.add(pointer(stage, { move: (pt) => setActive(hit(pt)), leave: () => setActive(null) }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { lift = v; },
    destroy: bag.dispose,
  };
}

const figure = {
  name: "tray",
  means: "A tray of interface parts: the one under the pointer lifts out, and the parts beside it rise a little in turn.",
  rules: [1, 2, 5, 9],
  range: [8, 16, 26],
  mount,
};

export default figure;
