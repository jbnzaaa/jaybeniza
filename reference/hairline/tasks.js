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
 * Tasks - usability testing: a test script on a screen, four tasks, each
 * a round and a bar. The pointer picks a task; its round stands up out of
 * the screen - the task tried - and the rounds above and below rise a
 * little. At rest the first task's round is up a little and bright. The
 * slider is how far a round stands.
 */
const task = (y) => ({
  r: [4, y - 1, 66, y + 19],
  // the round, then the bar beside it, which stays where it is
  s: [[8, y + 2, 22, y + 16, 7, 1.1, 0, 3], [27, y + 4, 62, y + 14, 3, 1, 0, 2, 1]],
  m: [[1, 32, y + 9, 56, y + 9]],
});

const mount = lifted({
  S: 2.4, box: [0, 0, 70, 104], zt: 26, word: "task", primary: 0,
  base: [[0, 0, 70, 104, 11, 1.6, -5, 0]],
  lines: [[8, 11, 38, 11]],
  parts: [20, 40, 60, 80].map(task),
});

hairline({
  name: "tasks",
  means: "A test script, four tasks down a screen: the round of the task under the pointer stands up, and its neighbours follow.",
  rules: [1, 2, 5, 9],
  range: [8, 14, 22],
  mount,
});
