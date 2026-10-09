const {
  Cam, clamp, lerp, facing, fit, open, poly, prism, proj, ringAt, rings, rrect, seg,
  spring, stepS, disposer, mk, pointer, put, register, solid,
} = HL;

function scrubbed(def) {
  return function mount({ stage, svg, read }, value) {
    const bag = disposer();
    let amount = value;

    const C = Cam(45, 0.5, def.S);
    const [bx0, by0, bx1, by1] = def.box, zt = def.zt;
    fit(C, [[bx0, by0, -zt], [bx1, by1, -zt], [bx1, by0, -zt], [bx0, by1, -zt], [bx0, by0, zt], [bx1, by1, zt], [bx1, by0, zt], [bx0, by1, zt]], 200, 160);
    const P = proj(C), front = facing(C);

    const g = mk("g", {}, svg), slabs = [];
    const fig = def.build({
      clamp, lerp,
      /** A solid: call it with its box [x0, y0, x1, y1, r, b, z0, z1] to draw it there; hide() draws nothing. */
      slab() {
        const el = solid(g);
        const set = (x0, y0, x1, y1, r, b, z0, z1) => {
          const [ring, inner] = rings(x0, y0, x1, y1, r, b);
          put(el, prism(P, front, ring, inner, z0, z1));
        };
        set.el = el;
        set.hide = () => put(el, { sil: "", crease: "" });
        slabs.push(set);
        return set;
      },
      /** A path of lines: call it with a path string. */
      line(cls) {
        const el = mk("path", { class: cls || "nf lo" }, g);
        return (d) => el.setAttribute("d", d);
      },
      box: (u0, v0, u1, v1, r, z) => poly(ringAt(P, rrect(u0, v0, u1, v1, r, 4), z)),
      ln: (u0, v0, u1, v1, z) => seg(P(u0, v0, z), P(u1, v1, z)),
      path: (points) => open(points.map(([x, y, z]) => P(x, y, z))),
    });

    // softer than the engine's default spring, as the site's other figures are
    const sp = spring(def.rest, { k: 40, c: 13 });
    let drawn = NaN, with_ = NaN;

    function draw() {
      if (sp.x === drawn && amount === with_) return;
      drawn = sp.x;
      with_ = amount;
      const on = fig.draw(sp.x, amount);
      slabs.forEach((s) => s.el.sil.classList.toggle("hi", s === on));
    }

    const B = register(stage, (dt) => {
      const moving = stepS(sp, dt);
      draw();
      return moving;
    });
    bag.add(B.unregister);

    /** The pointer's x, across the frame, is the number; off the figure it goes back to rest. */
    function aim(pt) {
      sp.t = pt ? clamp((pt[0] - 70) / 260, 0, 1) : def.rest;
      read.textContent = pt ? fig.name(sp.t, amount) : "rest";
      B.wake();
    }

    draw();
    read.textContent = "rest";
    bag.add(pointer(stage, { move: aim, leave: () => aim(null) }));
    bag.add(() => svg.replaceChildren());

    return {
      set: (v) => { amount = v; B.wake(); },
      destroy: bag.dispose,
    };
  };
}

/**
 * Dock - developer handoff: the design, a thin plate with a screen drawn
 * on it in outline, and the build, a block with the same screen standing
 * on it as solids, a gap between them and two dashed guides across it.
 * The pointer's x closes the gap until the two meet edge to edge. At rest
 * they stand apart and the design is bright; closed, the build is. The
 * slider is the gap at its widest.
 */
// the one screen both carry: a header, a card, a button
const SCREEN = [[6, 6, 44, 16, 3], [6, 22, 44, 46, 3], [10, 52, 40, 64, 6]];

const mount = scrubbed({
  S: 2.1, box: [-74, 0, 74, 70], zt: 14, rest: 0.3,
  build({ slab, line, box, ln, lerp }) {
    const guide = line("dash"), plate = slab(), drawn = line(), block = slab(), built = SCREEN.map(() => slab());
    return {
      draw(t, v) {
        const gap = lerp(v, 0, t), xa = -51 - gap / 2, xb = 1 + gap / 2;
        guide(ln(xa + 50, 6, xb, 6, 0) + ln(xa + 50, 64, xb, 64, 0));
        plate(xa, 0, xa + 50, 70, 8, 1.3, 0, 2);
        drawn(SCREEN.map((q) => box(xa + q[0], q[1], xa + q[2], q[3], q[4], 2)).join(""));
        block(xb, 0, xb + 50, 70, 8, 1.3, 0, 7);
        SCREEN.forEach((q, i) => built[i](xb + q[0], q[1], xb + q[2], q[3], q[4], 1, 7, 9 + i));
        return t > 0.6 ? block : plate;
      },
      name: (t) => (t > 0.9 ? "docked" : "gap"),
    };
  },
});

hairline({
  name: "dock",
  means: "A design drawn on a plate and the same screen built on a block: across closes the gap until the two meet.",
  rules: [3, 5, 8, 9],
  range: [20, 32, 44],
  mount,
});
