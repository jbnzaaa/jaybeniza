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
 * Reflow - responsive layouts: one page, a header over columns of cards.
 * The pointer's x sets its width, from a phone's to a desktop's; a column
 * of cards comes in as the page gets wide enough to hold it, one column
 * on a phone, two on a tablet, three on a desktop. At rest it is a tablet
 * and its edge is bright. The slider is the widest the page goes.
 */
const mount = scrubbed({
  S: 2.2, box: [-64, 0, 64, 80], zt: 10, rest: 0.5,
  build({ slab, clamp, lerp }) {
    const page = slab(), head = slab(), cards = [0, 1, 2, 3, 4, 5].map(() => slab());
    const width = (t, v) => lerp(38, v, t);
    return {
      draw(t, v) {
        const w = width(t, v), x0 = -w / 2;
        page(x0, 0, x0 + w, 80, 7, 1.4, -4, 0);
        head(x0 + 5, 5, x0 + w - 5, 14, 3, 1, 0, 2);
        // two cards to a column; a column is as wide as the page has room for
        cards.forEach((card, i) => {
          const col = i >> 1, x = x0 + 5 + col * 33, cw = clamp(w - 10 - col * 33, 0, 28);
          if (cw < 7) card.hide();
          else card(x, i % 2 ? 54 : 19, x + cw, i % 2 ? 75 : 50, 3, 1, 0, 4);
        });
        return page;
      },
      name: (t, v) => { const w = width(t, v); return w < 62 ? "phone" : w < 95 ? "tablet" : "desktop"; },
    };
  },
});

hairline({
  name: "reflow",
  means: "One page at every width: across widens it from phone to desktop, and a column of cards comes in as it finds room.",
  rules: [3, 5, 8, 9],
  range: [104, 116, 128],
  mount,
});
