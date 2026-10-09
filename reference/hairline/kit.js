/**
 * Kit: an open drawer of five compartments, each holding one part of a
 * design system built as solids - components, colour chips beside a type
 * specimen, three frames from desktop down to phone, a booklet of
 * documentation, and a handoff plate with a block lifted out of its slot.
 * The pointer picks a compartment; what it holds lifts out, and what is in
 * the compartments beside it rises a little, staggered outwards on the
 * 700ms lift curve. At rest the components stand proud and bright. The
 * slider is the lift, in world units.
 *
 * The pattern: one of many. Tweens, a stagger by distance, and a hit test
 * on each compartment's own rest top, so a part rising cannot hand the
 * choice on.
 */
const {
  Cam, facing, fit, poly, prism, proj, ringAt, rings, rrect, seg, unproj,
  tdone, tset, tval, tween, disposer, mk, pointer, put, register, solid,
} = HL;

const DW = 150, DL = 90, M = 6, TB = 7, STAG = 45, PROUD = 5, PRIMARY = 0;

// each compartment: its floor r [x0, y0, x1, y1]; the compartments beside
// it; its solids [x0, y0, x1, y1, r, b, z0, z1], far to near; and what is
// drawn on a solid's top - a line [solid, u0, v0, u1, v1] or, with a
// radius after it, a rounded box
const PARTS = [
  // components: a card, a button, a toggle with its knob thrown
  { r: [0, 0, 66, 44], near: [1, 2],
    s: [[6, 6, 30, 38, 3, 1.2, 0, 4], [36, 7, 60, 19, 6, 1.1, 0, 6], [36, 25, 60, 37, 6, 1, 0, 3.5], [48, 25, 60, 37, 6, 1, 3.5, 6]],
    m: [[0, 11, 13, 25, 13], [0, 11, 19, 25, 19], [0, 11, 25, 19, 25], [1, 43, 13, 53, 13]] },
  // colour and type: three chips stepping up a ramp, and a specimen bar
  { r: [66, 0, 150, 44], near: [0, 2, 3, 4],
    s: [[73, 7, 89, 23, 8, 1.1, 0, 3], [95, 7, 111, 23, 8, 1.1, 0, 5], [117, 7, 133, 23, 8, 1.1, 0, 7], [73, 28, 143, 39, 2.5, 1, 0, 3]],
    m: [[3, 78, 33.5, 112, 33.5], [3, 118, 33.5, 128, 33.5]] },
  // responsive layouts: one screen at three sizes, standing on one line
  { r: [0, 44, 84, 90], near: [0, 1, 3],
    s: [[5, 51, 41, 83, 3, 1.1, 0, 2.5], [47, 57, 65, 83, 3, 1, 0, 2.5], [70, 65, 80, 83, 2.5, 0.9, 0, 2.5]],
    m: [[0, 9, 57, 37, 57], [0, 9, 62, 21, 78, 2], [0, 25, 62, 37, 78, 2], [1, 50, 62, 62, 62], [1, 50, 66, 62, 79, 2], [2, 72.5, 69, 77.5, 69]] },
  // documentation: a booklet, its spine and three lines
  { r: [84, 44, 117, 90], near: [1, 2, 4],
    s: [[89, 50, 112, 84, 2.5, 1, 0, 4]],
    m: [[0, 93, 52, 93, 82], [0, 97, 58, 108, 58], [0, 97, 64, 108, 64], [0, 97, 70, 104, 70]] },
  // handoff: a plate, a block lifted out of it, and the slot it came from
  { r: [117, 44, 150, 90], near: [1, 3],
    s: [[121, 50, 146, 84, 3, 1, 0, 3], [126, 54, 141, 65, 2.5, 0.9, 3, 8]],
    m: [[0, 126, 70, 141, 80, 2.5]] },
];

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let lift = value;

  // fitted to the drawer with a part at the slider's highest lift, and as
  // much room under it as over it, so the drawer at rest sits in the
  // middle of its frame
  const C = Cam(45, 0.5, 1.5);
  const X1 = DW + M, Y1 = DL + M, YF = Y1 + 11, ZT = 26 + 8;
  fit(C, [[-M, -M, -ZT], [X1, YF, -ZT], [X1, -M, -ZT], [-M, YF, -ZT], [-M, -M, ZT], [X1, YF, ZT], [X1, -M, ZT], [-M, YF, ZT]], 200, 160);
  const P = proj(C), front = facing(C);
  const block = (parent, x0, y0, x1, y1, r, b, z0, z1) => {
    const [ring, inner] = rings(x0, y0, x1, y1, r, b);
    put(solid(parent), prism(P, front, ring, inner, z0, z1));
  };

  // the drawer, then its compartments drawn on its floor
  const g = mk("g", {}, svg);
  block(g, -M, -M, X1, Y1, 9, 2, -TB, 0);
  mk("path", { d: PARTS.map((p) => poly(ringAt(P, rrect(p.r[0] + 2, p.r[1] + 2, p.r[2] - 2, p.r[3] - 2, 4, 4), 0))).join(""), class: "nf lo" }, g);

  // what it holds, from the far corner to the near one, so appending is painting back to front
  const parts = PARTS.map((p, id) => ({ ...p, id })).sort((a, b) => a.r[0] + a.r[1] - (b.r[0] + b.r[1])).map((p) => {
    const grp = mk("g", {}, g);
    const solids = p.s.map((q) => ({ rings: rings(q[0], q[1], q[2], q[3], q[4], q[5]), z0: q[6], z1: q[7], el: solid(grp) }));
    const rest = p.id === PRIMARY ? PROUD : 0;
    return { ...p, solids, face: mk("path", { class: "nf lo" }, grp), top: Math.max(...p.s.map((q) => q[7])), rest, z: tween(rest), drawn: NaN };
  });

  // the drawer's front and its pull, nearest of all
  block(g, -M - 3, Y1 - 1, X1 + 3, Y1 + 6, 3, 1.2, -TB - 3, 3);
  block(g, DW / 2 - 20, Y1 + 6, DW / 2 + 20, Y1 + 11, 2.5, 0.9, -5, -1.5);

  function draw(p, z) {
    if (z === p.drawn) return;
    p.drawn = z;
    p.solids.forEach((s) => put(s.el, prism(P, front, s.rings[0], s.rings[1], z + s.z0, z + s.z1)));
    p.face.setAttribute("d", p.m.map(([k, u0, v0, u1, v1, r]) => {
      const zt = z + p.s[k][7];
      return r ? poly(ringAt(P, rrect(u0, v0, u1, v1, r, 4), zt)) : seg(P(u0, v0, zt), P(u1, v1, zt));
    }).join(""));
  }

  const B = register(stage, (_dt, now) => {
    let moving = false;
    for (const p of parts) { draw(p, tval(p.z, now)); if (!tdone(p.z, now)) moving = true; }
    return moving;
  });
  bag.add(B.unregister);

  /** The compartment holding the pointer, tested on its own rest top; null on the drawer's rim or off it. */
  function hit([sx, sy]) {
    let best = null, bd = Infinity;
    for (const p of parts) {
      const [x, y] = unproj(C, sx, sy, p.top + p.rest);
      if (x < p.r[0] || x > p.r[2] || y < p.r[1] || y > p.r[3]) continue;
      const d = Math.hypot(x - (p.r[0] + p.r[2]) / 2, y - (p.r[1] + p.r[3]) / 2);
      if (d < bd) { bd = d; best = p; }
    }
    return best;
  }

  let act = null;
  /** Lifts compartment a (null puts them all back). The stagger spreads out from the one picked, or the one let go. */
  function setActive(a) {
    if (a === act) return;
    const now = performance.now(), from = a || act;
    act = a;
    for (const p of parts) {
      const dist = p === from ? 0 : from.near.includes(p.id) ? 1 : 2;
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

hairline({
  name: "kit",
  means: "A drawer of design system parts: what the compartment under the pointer holds lifts out, and its neighbours rise in turn.",
  rules: [1, 2, 5, 9],
  range: [8, 16, 26],
  mount,
});
