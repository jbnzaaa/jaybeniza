/**
 * Pages - design documentation: a booklet lying on its back cover, its
 * four pages hinged on the near edge and fanned open, each a little
 * steeper than the one under it, every page a heading, lines of copy and
 * a figure. The pointer picks a page; the booklet opens there - that page
 * and the ones over it swing up, one after another, and the gap under it
 * widens. At rest the top page is bright. The slider is how far it opens,
 * in degrees.
 *
 * The pattern: one of many. Tweens, a stagger by distance, and a hit test
 * on each page's rest pose, front page first, so a page swinging up
 * cannot hand the choice on.
 */
const {
  Cam, facing, fit, hull, poly, prism, proj, rad, rings, rrect, seg,
  tdone, tset, tval, tween, disposer, mk, pointer, put, register, solid,
} = HL;

const W = 76, L = 56, T = 1.2, N = 4, FAN = [8, 20, 32, 44], STAG = 45;
const OUT = rrect(0, 0, W, L, 3, 4), IN = rrect(1.2, 1.2, W - 1.2, L - 1.2, 2, 4);

/** What a page carries, drawn through F(u, v), a point of its face: a heading, three lines, a figure. */
function marks(F) {
  const ln = (u0, v0, u1, v1) => seg(F(u0, v0), F(u1, v1));
  return ln(8, 47, 34, 47) + ln(8, 38, 40, 38) + ln(8, 32, 40, 32) + ln(8, 26, 30, 26) + ln(8, 14, 40, 14) + ln(8, 8, 28, 8)
    + poly(rrect(46, 8, 68, 40, 2, 4).map((q) => F(q.u, q.v)));
}

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let open = value;

  // fitted to the booklet with its top page at the slider's steepest, and
  // as much room under it as over it, so it sits in the middle of its frame
  const C = Cam(45, 0.5, 2.2);
  const ZT = 46;
  fit(C, [[-4, -3, -ZT], [W + 4, L + 3, -ZT], [W + 4, -3, -ZT], [-4, L + 3, -ZT], [-4, -3, ZT], [W + 4, L + 3, ZT], [W + 4, -3, ZT], [-4, L + 3, ZT]], 200, 160);
  const P = proj(C), front = facing(C);

  /** A point of a page standing at th degrees: u along the spine, v up the page from it, w out of its face. */
  const at = (th) => {
    const c = Math.cos(rad(th)), s = Math.sin(rad(th));
    return (u, v, w) => P(u, L - v * c + w * s, v * s + w * c);
  };

  // the back cover, then the pages from the flattest to the steepest - the
  // steeper a page, the nearer it stands - so appending is painting back to front
  const g = mk("g", {}, svg);
  const [cr, ci] = rings(-4, -3, W + 4, L + 3, 5, 1.6);
  put(solid(g), prism(P, front, cr, ci, -3, 0));
  const pages = FAN.map((rest, id) => {
    const el = solid(g), F = at(rest);
    // its face at rest, as an origin and two edges: what the pointer is tested against
    const o = F(0, 0, T), eu = F(1, 0, T), ev = F(0, 1, T);
    return { id, el, rest, th: tween(rest), drawn: NaN, face: mk("path", { class: "nf lo" }, el.g), o, a: [eu[0] - o[0], eu[1] - o[1]], b: [ev[0] - o[0], ev[1] - o[1]] };
  });

  function draw(pg, th) {
    if (th === pg.drawn) return;
    pg.drawn = th;
    const F = at(th), ring = (r, w) => r.map((q) => F(q.u, q.v, w));
    put(pg.el, { sil: poly(hull(ring(OUT, 0).concat(ring(OUT, T)))), crease: poly(ring(IN, T)) });
    pg.face.setAttribute("d", marks((u, v) => F(u, v, T)));
  }

  const B = register(stage, (_dt, now) => {
    let moving = false;
    for (const pg of pages) { draw(pg, tval(pg.th, now)); if (!tdone(pg.th, now)) moving = true; }
    return moving;
  });
  bag.add(B.unregister);

  /** The nearest page whose resting face holds the pointer: the front page first, then the edges showing behind it. */
  function hit([sx, sy]) {
    for (let i = N - 1; i >= 0; i--) {
      const { o, a, b } = pages[i], dx = sx - o[0], dy = sy - o[1], det = a[0] * b[1] - a[1] * b[0];
      const u = (dx * b[1] - dy * b[0]) / det, v = (a[0] * dy - a[1] * dx) / det;
      if (u >= 0 && u <= W && v >= 0 && v <= L) return pages[i];
    }
    return null;
  }

  let act = null;
  /** Opens the booklet at page a (null lets it close). The pages over it follow it up, one after another. */
  function setActive(a) {
    if (a === act) return;
    const now = performance.now(), from = a || act;
    act = a;
    for (const pg of pages) {
      const over = pg.id - from.id;
      tset(pg.th, a && over >= 0 ? pg.rest + open : pg.rest, now, Math.abs(over) * STAG);
      pg.el.sil.classList.toggle("hi", a ? pg === a : pg.id === N - 1);
    }
    read.textContent = a ? `page ${a.id + 1}` : "rest";
    B.wake();
  }

  for (const pg of pages) {
    draw(pg, pg.rest);
    pg.el.sil.classList.toggle("hi", pg.id === N - 1);
  }
  read.textContent = "rest";
  bag.add(pointer(stage, { move: (pt) => setActive(hit(pt)), leave: () => setActive(null) }));
  bag.add(() => svg.replaceChildren());

  // for each page, a point of its resting face that is its own to the
  // pointer - not covered by a page standing in front of it
  const spots = pages.map((pg) => {
    const F = at(pg.rest);
    for (let v = L - 3; v > 0; v -= 5) for (let u = W - 4; u > 0; u -= 8) {
      const point = F(u, v, T);
      if (hit(point) === pg) return point;
    }
    return F(W / 2, L / 2, T);
  });

  return {
    set: (v) => { open = v; },
    destroy: bag.dispose,
    // where a pointer goes to pick each page in turn
    spots,
  };
}

hairline({
  name: "pages",
  means: "A booklet with its four pages fanned open: pick a page and the booklet opens there, the pages over it swinging up in turn.",
  rules: [1, 2, 5, 9],
  range: [16, 24, 32],
  mount,
});
