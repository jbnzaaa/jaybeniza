const {
  Cam, clamp, lerp, facing, fit, hull, open, poly, prism, proj, ringAt, rings, rrect, seg,
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
      // a closed outline through world points, and the outline round them all
      shape: (points) => poly(points.map(([x, y, z]) => P(x, y, z))),
      hullOf: (points) => poly(hull(points.map(([x, y, z]) => P(x, y, z)))),
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
 * Atom - React: its mark, built standing over a base and facing the
 * viewer - three orbits crossed at sixty degrees round a core, an
 * electron on each. The pointer's x turns the orbits about the core and
 * runs the electrons round them. At rest the orbits lie as the mark draws
 * them and the core is bright. The slider is how far they turn, in
 * degrees.
 */
const DEG = Math.PI / 180, K = Math.SQRT1_2, TURN = Math.PI * 2;
// a point of the mark's own plane, which stands facing the viewer: a across it, b up it
const at = (a, b) => [a * K, -a * K, b];
// a point of orbit i, the orbits turned by spin degrees: th round an ellipse of half-axes a and b
const on = (i, spin, th, a, b) => {
  const f = (spin + i * 60) * DEG, x = a * Math.cos(th), y = b * Math.sin(th);
  return at(x * Math.cos(f) - y * Math.sin(f), x * Math.sin(f) + y * Math.cos(f));
};

const mount = scrubbed({
  S: 2.1, box: [-40, -40, 40, 40], zt: 62, rest: 0.5,
  build({ slab, line, shape, path, lerp }) {
    const base = slab(), drop = line("dash");
    const orbits = [0, 1, 2].map(() => line("nf sil")), electrons = [0, 1, 2].map(() => line("sil")), core = line("hi");
    const round = (c, r, n) => {
      const points = [];
      for (let k = 0; k < n; k++) points.push([c[0] + r * K * Math.cos(k / n * TURN), c[1] - r * K * Math.cos(k / n * TURN), c[2] + r * Math.sin(k / n * TURN)]);
      return shape(points);
    };
    base(-34, -34, 34, 34, 12, 2, -62, -56);
    drop(path([[0, 0, -56], [0, 0, -9]]));
    core(round([0, 0, 0], 8, 28));
    return {
      draw(t, v) {
        const spin = lerp(-v, v, t);
        orbits.forEach((orbit, i) => {
          // an orbit is a band: its outer edge and its inner
          orbit([[52, 20], [47, 15.5]].map(([a, b]) => {
            const points = [];
            for (let k = 0; k < 56; k++) points.push(on(i, spin, k / 56 * TURN, a, b));
            return shape(points);
          }).join(""));
          electrons[i](round(on(i, spin, t * TURN * 1.5 + i * 2.1, 49.5, 17.75), 4, 16));
        });
        return null;
      },
      name: (t, v) => `spin ${Math.round(lerp(-v, v, t))}`,
    };
  },
});

hairline({
  name: "atom",
  means: "The React mark, three orbits round a core: across turns the orbits about it and runs an electron round each.",
  rules: [3, 5, 8, 10],
  range: [30, 60, 90],
  mount,
});
