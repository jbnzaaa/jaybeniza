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
 * Ease - GSAP animations: an ease curve laid out on a board as a track,
 * from one post to another, three keys marked along it. A puck rides the
 * track; the pointer's x is its place in the animation, and it lifts off
 * the board on the way, highest at the middle, a dashed drop under it. At
 * rest it is part way along and bright. The slider is how high it lifts.
 */
const mount = scrubbed({
  S: 1.9, box: [-8, -8, 142, 88], zt: 26, rest: 0.3,
  build({ slab, line, box, path, lerp }) {
    // the track: across at an even pace, down the board on a smooth step
    const at = (s) => [lerp(26, 110, s), lerp(68, 12, s * s * (3 - 2 * s))];
    const base = slab(), track = line(), from = slab(), drop = line("dash"), puck = slab(), to = slab();
    base(-8, -8, 142, 88, 10, 2, -5, 0);
    const curve = [];
    for (let i = 0; i <= 28; i++) curve.push([...at(i / 28), 0]);
    track(path(curve) + [0.25, 0.5, 0.75].map((s) => { const [x, y] = at(s); return box(x - 2.5, y - 2.5, x + 2.5, y + 2.5, 2.5, 0); }).join(""));
    from(4, 61, 16, 75, 6, 1, 0, 9);
    to(122, 5, 134, 19, 6, 1, 0, 9);
    return {
      draw(t, v) {
        const [x, y] = at(t), z = v * 4 * t * (1 - t);
        drop(path([[x, y, 0], [x, y, z]]));
        puck(x - 9, y - 9, x + 9, y + 9, 9, 1.2, z, z + 6);
        return puck;
      },
      name: (t) => `t ${Math.round(t * 100)}`,
    };
  },
});

hairline({
  name: "ease",
  means: "An ease curve as a track between two posts: across moves the puck along it, lifting off the board on the way.",
  rules: [3, 5, 8, 9],
  range: [8, 15, 22],
  mount,
});
