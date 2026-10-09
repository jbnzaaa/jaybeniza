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
 * Proto - interactive prototyping: two screens of one prototype, a button
 * on the first and a dashed link from it to the second. The pointer's x
 * runs the interaction: the button goes down, then the second screen
 * slides in beside the first. At rest the button is up and bright, the
 * second screen standing off. The slider is how far off it stands.
 */
const mount = scrubbed({
  S: 1.95, box: [0, 0, 148, 84], zt: 12, rest: 0.1,
  build({ slab, line, box, ln, clamp, lerp }) {
    const link = line("dash"), first = slab(), onFirst = line(), button = slab(), second = slab(), onSecond = line();
    first(0, 0, 50, 84, 9, 1.4, 0, 4);
    // the first screen: a header and a crossed picture box
    onFirst(ln(8, 10, 42, 10, 4) + box(8, 18, 42, 48, 3, 4) + ln(8, 18, 42, 48, 4) + ln(42, 18, 8, 48, 4));
    return {
      draw(t, v) {
        const press = clamp(t / 0.3, 0, 1), e = clamp((t - 0.25) / 0.75, 0, 1), x = lerp(60 + v, 60, e * e * (3 - 2 * e));
        button(10, 58, 40, 74, 8, 1.2, 4, lerp(9, 5.2, press));
        second(x, 0, x + 50, 84, 9, 1.4, 0, 4);
        // the second screen: a header, two cards, two lines
        onSecond(ln(x + 8, 10, x + 42, 10, 4) + box(x + 8, 18, x + 23, 46, 3, 4) + box(x + 27, 18, x + 42, 46, 3, 4)
          + ln(x + 8, 56, x + 42, 56, 4) + ln(x + 8, 64, x + 30, 64, 4));
        link(ln(50, 66, x, 66, 0));
        return e > 0.5 ? second : button;
      },
      name: (t) => (t < 0.3 ? "press" : "screen 2"),
    };
  },
});

hairline({
  name: "proto",
  means: "Two screens of a prototype: across, the button on the first goes down and the second screen slides in beside it.",
  rules: [3, 5, 8, 9],
  range: [18, 28, 38],
  mount,
});
