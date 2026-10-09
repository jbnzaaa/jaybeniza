const {
  Cam, facing, fit, poly, prism, proj, ringAt, rings, rrect, seg, unproj,
  tdone, tset, tval, tween, disposer, mk, pointer, put, register, solid,
} = HL;

function lifted(def) {
  return function mount({ stage, svg, read }, value) {
    const bag = disposer(), O = [0, 0, 0], STAG = 45;
    let far = value;
    const move = def.move || ((v) => [0, 0, v]);

    const C = Cam(45, 0.5, def.S);
    const [bx0, by0, bx1, by1] = def.box, zt = def.zt;
    fit(C, [[bx0, by0, -zt], [bx1, by1, -zt], [bx1, by0, -zt], [bx0, by1, -zt], [bx0, by0, zt], [bx1, by1, zt], [bx1, by0, zt], [bx0, by1, zt]], 200, 160);
    const P = proj(C), front = facing(C);
    const at = (q, o) => {
      const [ring, inner] = rings(q[0] + o[0], q[1] + o[1], q[2] + o[0], q[3] + o[1], q[4], q[5]);
      return prism(P, front, ring, inner, q[6] + o[2], q[7] + o[2]);
    };
    const ink = ([u0, v0, u1, v1, r], z, o) => (r
      ? poly(ringAt(P, rrect(u0 + o[0], v0 + o[1], u1 + o[0], v1 + o[1], r, 4), z))
      : seg(P(u0 + o[0], v0 + o[1], z), P(u1 + o[0], v1 + o[1], z)));

    // the base, what is drawn on it, then the parts from the far corner to
    // the near one, so appending is painting back to front
    const g = mk("g", {}, svg);
    (def.base || []).forEach((q) => put(solid(g), at(q, O)));
    if (def.lines) mk("path", { d: def.lines.map((l) => ink(l, 0, O)).join(""), class: "nf lo" }, g);
    const parts = def.parts.map((p, id) => ({ ...p, id })).sort((a, b) => a.r[0] + a.r[1] - (b.r[0] + b.r[1])).map((p) => {
      const grp = mk("g", {}, g), rest = p.rest ?? (p.id === def.primary && !def.flip ? 0.3 : 0);
      return { ...p, els: p.s.map(() => solid(grp)), face: mk("path", { class: "nf lo" }, grp), top: Math.max(...p.s.map((q) => q[7])), rest, t: tween(rest), drawn: NaN };
    });

    function draw(p, t) {
      if (t === p.drawn) return;
      p.drawn = t;
      const o = move(far).map((n) => n * t);
      p.s.forEach((q, k) => put(p.els[k], at(q, q[8] ? O : o)));
      p.face.setAttribute("d", (p.m || []).map(([k, ...l]) => {
        const oo = p.s[k][8] ? O : o;
        return ink(l, p.s[k][7] + oo[2], oo);
      }).join(""));
    }

    const B = register(stage, (_dt, now) => {
      let moving = false;
      for (const p of parts) { draw(p, tval(p.t, now)); if (!tdone(p.t, now)) moving = true; }
      return moving;
    });
    bag.add(B.unregister);

    /** The part holding the pointer, tested on its own rest top - the smallest, when one sits in another; null off them all. */
    function hit([sx, sy]) {
      let best = null, ba = Infinity;
      const vz = move(far)[2];
      for (const p of parts) {
        const [x, y] = unproj(C, sx, sy, p.top + p.rest * vz), [x0, y0, x1, y1] = p.r;
        if (x < x0 || x > x1 || y < y0 || y > y1) continue;
        const area = (x1 - x0) * (y1 - y0);
        if (area <= ba) { ba = area; best = p; }
      }
      return best;
    }

    const beside = (a, p) => (p === a ? [1, 0] : (a.near ? a.near.includes(p.id) : Math.abs(a.id - p.id) === 1) ? [0.22, 1] : [0, 2]);
    let act = null;
    /** Moves part a (null puts them all back). The stagger spreads out from the part picked, or the one let go. */
    function setActive(a) {
      if (a === act) return;
      const now = performance.now(), from = a || act;
      act = a;
      for (const p of parts) {
        const [share, steps] = (def.reach || beside)(from, p);
        const to = !a ? p.rest : def.flip ? p.rest + (1 - 2 * p.rest) * share : share;
        tset(p.t, to, now, steps * STAG);
        const on = a ? (def.lit ? def.lit(a, p) : p === a) : p.id === def.primary;
        p.els.forEach((el) => el.sil.classList.toggle("hi", on));
      }
      read.textContent = a ? `${def.word} ${a.id + 1}` : "rest";
      B.wake();
    }

    for (const p of parts) {
      draw(p, p.rest);
      p.els.forEach((el) => el.sil.classList.toggle("hi", p.id === def.primary));
    }
    read.textContent = "rest";
    bag.add(pointer(stage, { move: (pt) => setActive(hit(pt)), leave: () => setActive(null) }));
    bag.add(() => svg.replaceChildren());

    return {
      set: (v) => { far = v; parts.forEach((p) => { p.drawn = NaN; }); B.wake(); },
      destroy: bag.dispose,
      // the middle of each part's rest top, in the frame, in the parts' own
      // order: where a pointer goes to pick each in turn
      spots: [...parts].sort((a, b) => a.id - b.id).map((p) => P((p.r[0] + p.r[2]) / 2, (p.r[1] + p.r[3]) / 2, p.top + p.rest * move(far)[2])),
    };
  };
}

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

hairline({
  name: "route",
  means: "A user flow as tiles on a board: pick a step and every step on the way to it, from the start, rises in turn.",
  rules: [1, 2, 5, 9],
  range: [8, 14, 22],
  mount,
});
