/**
 * Flow: five phone screens in a row on a board, one for each step of a
 * design - the flow map, the wireframe, the finished interface, the
 * prototype and the test. Each is hinged on its near edge and leans back a
 * little. The pointer picks a screen; it stands up, and the ones beside it
 * rise part of the way, staggered outwards on the 700ms lift curve. At rest
 * the finished interface stands half up and bright. The slider is how far a
 * picked screen stands, in degrees.
 *
 * The pattern: one of many. Tweens, a stagger by distance, and a hit test
 * on each screen's rest pose, so a screen standing up cannot hand the
 * choice on.
 */
const {
  Cam, facing, fit, hull, poly, prism, proj, rad, rings, rrect, seg,
  tdone, tset, tval, tween, disposer, mk, pointer, put, register, solid,
} = HL;

const W = 30, L = 50, GAP = 8, N = 5, T = 2.4, M = 9, TB = 5, STEP = W + GAP;
const LEAN = 16, HALF = 46, PRIMARY = 2, STAG = 45, REACH = 46;
const OUT = rrect(0, 0, W, L, 5, 4), IN = rrect(1.4, 1.4, W - 1.4, L - 1.4, 3.6, 4);

/** What screen k shows, drawn through F(u, v), a point of its face: one path string. */
function marks(k, F) {
  const box = (u0, v0, u1, v1, r) => poly(rrect(u0, v0, u1, v1, r, 4).map((q) => F(q.u, q.v)));
  const ln = (u0, v0, u1, v1) => seg(F(u0, v0), F(u1, v1));
  // the flow map: three steps, joined
  if (k === 0) {
    return box(5, 36, 14, 44, 2) + box(16, 22, 25, 30, 2) + box(5, 8, 14, 16, 2)
      + ln(14, 40, 20.5, 40) + ln(20.5, 40, 20.5, 30) + ln(16, 26, 9.5, 26) + ln(9.5, 26, 9.5, 16);
  }
  // the wireframe: a crossed picture box, two lines of copy, a block
  if (k === 1) {
    return box(5, 26, 25, 44, 2) + ln(5, 26, 25, 44) + ln(25, 26, 5, 44)
      + ln(5, 19, 25, 19) + ln(5, 13, 19, 13) + box(5, 4, 25, 9, 2);
  }
  // the finished interface: a header, two cards, a button
  if (k === 2) return box(5, 39, 25, 45, 2) + box(5, 19, 14, 35, 2) + box(16, 19, 25, 35, 2) + box(5, 5, 25, 13, 4);
  // the prototype: a button, and a press rippling out over the screen
  if (k === 3) return ln(5, 45, 25, 45) + box(11, 26, 19, 34, 4) + box(7, 22, 23, 38, 8) + box(7, 6, 23, 14, 4);
  // the test: a list of tasks, a round and a line each
  return [37.5, 26, 14.5].map((v) => box(5, v - 2.5, 10, v + 2.5, 2.5) + ln(13, v, 25, v)).join("");
}

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let stand = value;

  // fitted to the board with a screen at the slider's steepest, and as
  // much room under the board as over it, so the row at rest sits in the
  // middle of its frame
  const C = Cam(45, 0.5, 1.5);
  const X1 = N * W + (N - 1) * GAP + M, Y1 = L + M, ZT = L + T;
  fit(C, [[-M, -M, -ZT], [X1, Y1, -ZT], [X1, -M, -ZT], [-M, Y1, -ZT], [-M, -M, ZT], [X1, Y1, ZT], [X1, -M, ZT], [-M, Y1, ZT]], 200, 160);
  const P = proj(C), front = facing(C);

  // the board, then the screens from the far end of the row to the near
  // one, so appending is painting back to front
  const g = mk("g", {}, svg);
  const [br, bi] = rings(-M, -M, X1, Y1, 8, 2);
  put(solid(g), prism(P, front, br, bi, -TB, 0));

  /** A point of a screen standing at th degrees: u across it, v up it from its hinge, w out of its face. */
  const at = (x, th) => {
    const c = Math.cos(rad(th)), s = Math.sin(rad(th));
    return (u, v, w) => P(x + u, L - v * c + w * s, v * s + w * c);
  };

  const screens = [];
  for (let id = 0; id < N; id++) {
    const el = solid(g), rest = id === PRIMARY ? HALF : LEAN;
    screens.push({
      id, x: id * STEP, el, rest, th: tween(rest), drawn: NaN,
      face: mk("path", { class: "nf lo" }, el.g),
      // the middle of its face at rest: what the pointer is tested against
      mid: at(id * STEP, rest)(W / 2, L / 2, T),
    });
  }

  function draw(sc, th) {
    if (th === sc.drawn) return;
    sc.drawn = th;
    const F = at(sc.x, th), ring = (r, w) => r.map((q) => F(q.u, q.v, w));
    put(sc.el, { sil: poly(hull(ring(OUT, 0).concat(ring(OUT, T)))), crease: poly(ring(IN, T)) });
    sc.face.setAttribute("d", marks(sc.id, (u, v) => F(u, v, T)));
  }

  const B = register(stage, (_dt, now) => {
    let moving = false;
    for (const sc of screens) { draw(sc, tval(sc.th, now)); if (!tdone(sc.th, now)) moving = true; }
    return moving;
  });
  bag.add(B.unregister);

  /** The screen whose resting face is nearest the pointer; null when none is near. */
  function hit([sx, sy]) {
    let best = null, bd = REACH;
    for (const sc of screens) {
      const d = Math.hypot(sx - sc.mid[0], sy - sc.mid[1]);
      if (d < bd) { bd = d; best = sc; }
    }
    return best;
  }

  let act = null;
  /** Stands screen a up (null lets them all back). The stagger spreads out from the screen picked, or the one let go. */
  function setActive(a) {
    if (a === act) return;
    const now = performance.now(), from = a || act;
    act = a;
    for (const sc of screens) {
      const dist = Math.abs(sc.id - from.id);
      const to = !a ? sc.rest : dist === 0 ? stand : dist === 1 ? LEAN + (stand - LEAN) * 0.3 : LEAN;
      tset(sc.th, to, now, dist * STAG);
      sc.el.sil.classList.toggle("hi", a ? sc === a : sc.id === PRIMARY);
    }
    read.textContent = a ? `step ${a.id + 1}` : "rest";
    B.wake();
  }

  for (const sc of screens) {
    draw(sc, sc.rest);
    sc.el.sil.classList.toggle("hi", sc.id === PRIMARY);
  }
  read.textContent = "rest";
  bag.add(pointer(stage, { move: (pt) => setActive(hit(pt)), leave: () => setActive(null) }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { stand = v; },
    destroy: bag.dispose,
  };
}

hairline({
  name: "flow",
  means: "Five screens of a design, flow map to test: the one under the pointer stands up, and the ones beside it rise in turn.",
  rules: [1, 2, 5, 9],
  range: [52, 64, 76],
  mount,
});
