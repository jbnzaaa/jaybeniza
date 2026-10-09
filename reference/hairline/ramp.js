const {
  Cam, clamp, facing, fit, poly, prism, proj, ringAt, rings, rrect, seg, unproj,
  spring, stepS, disposer, mk, pointer, put, register, solid,
} = HL;

function field(def) {
  return function mount({ stage, svg, read }, value) {
    const bag = disposer();
    let radius = value;

    const C = Cam(45, 0.5, def.S);
    const [bx0, by0, bx1, by1] = def.box, zt = def.zt;
    fit(C, [[bx0, by0, -zt], [bx1, by1, -zt], [bx1, by0, -zt], [bx0, by1, -zt], [bx0, by0, zt], [bx1, by1, zt], [bx1, by0, zt], [bx0, by1, zt]], 200, 160);
    const P = proj(C), front = facing(C);

    // the base, then the blocks from the far corner to the near one, so
    // appending is painting back to front
    const g = mk("g", {}, svg);
    (def.base || []).forEach((q) => {
      const [ring, inner] = rings(q[0], q[1], q[2], q[3], q[4], q[5]);
      put(solid(g), prism(P, front, ring, inner, q[6], q[7]));
    });
    const parts = def.parts.map((p, id) => ({ ...p, id })).sort((a, b) => a.s[0] + a.s[1] - (b.s[0] + b.s[1])).map((p) => {
      const el = solid(g), [x0, y0, x1, y1, r, b] = p.s;
      return {
        ...p, el, rg: rings(x0, y0, x1, y1, r, b), cx: (x0 + x1) / 2, cy: (y0 + y1) / 2,
        face: p.m ? mk("path", { class: "nf lo" }, el.g) : null,
        // softer than the engine's default spring, as the site's other figures are
        sp: spring(p.h, { k: 40, c: 13 }), drawn: NaN,
      };
    });

    function draw(p) {
      const h = p.sp.x;
      if (h === p.drawn) return;
      p.drawn = h;
      put(p.el, prism(P, front, p.rg[0], p.rg[1], 0, h));
      if (p.face) {
        p.face.setAttribute("d", p.m.map(([u0, v0, u1, v1, r]) => (r
          ? poly(ringAt(P, rrect(u0, v0, u1, v1, r, 4), h))
          : seg(P(u0, v0, h), P(u1, v1, h)))).join(""));
      }
    }

    const B = register(stage, (dt) => {
      let moving = false;
      for (const p of parts) { if (stepS(p.sp, dt)) moving = true; draw(p); }
      return moving;
    });
    bag.add(B.unregister);

    let over = null;
    /** Every block's height from where the pointer is on the ground; the nearest takes the bright edge. */
    function retarget() {
      let best = null, bd = Infinity;
      for (const p of parts) {
        if (!over) { p.sp.t = p.h; continue; }
        const d = Math.hypot(over[0] - p.cx, over[1] - p.cy), f = clamp(1 - d / radius, 0, 1);
        p.sp.t = def.low + def.amp * f * f * (3 - 2 * f);
        if (d < bd) { bd = d; best = p; }
      }
      if (!over) best = parts.find((p) => p.id === def.primary);
      parts.forEach((p) => p.el.sil.classList.toggle("hi", p === best));
      read.textContent = over ? `${def.word} ${best.id + 1}` : "rest";
      B.wake();
    }

    parts.forEach(draw);
    retarget();
    bag.add(pointer(stage, {
      move: (pt) => { over = unproj(C, pt[0], pt[1], 0); retarget(); },
      leave: () => { over = null; retarget(); },
    }));
    bag.add(() => svg.replaceChildren());

    return {
      set: (v) => { radius = v; if (over) retarget(); },
      destroy: bag.dispose,
    };
  };
}

/**
 * Ramp - colour and typography styles: a row of five round chips, a ramp
 * of one colour stepping up, over three bars of type - heavy, regular and
 * light. Chips and bars stand as tall as the pointer is near, so the peak
 * of the ramp goes where the pointer is. At rest the ramp climbs to its
 * last chip, which is bright. The slider is the radius.
 */
const mount = field({
  S: 2, box: [-6, -6, 130, 84], zt: 17, word: "tone", primary: 4, low: 1.5, amp: 14,
  base: [[-6, -6, 130, 84, 10, 2, -5, 0]],
  parts: [
    ...[0, 1, 2, 3, 4].map((i) => ({ s: [4 + i * 25, 4, 24 + i * 25, 24, 10, 1.1], h: 2 + i * 2 })),
    { s: [4, 34, 124, 46, 2.5, 1], h: 5 },
    { s: [4, 52, 96, 60, 2, 0.9], h: 3.5 },
    { s: [4, 66, 70, 71, 1.5, 0.7], h: 2 },
  ],
});

hairline({
  name: "ramp",
  means: "A ramp of five chips over three weights of type: they stand taller near the pointer, so the peak follows it.",
  rules: [1, 3, 5, 9],
  range: [30, 46, 66],
  mount,
});
