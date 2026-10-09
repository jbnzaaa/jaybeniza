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
 * Waves - Tailwind CSS: its mark, two waves one under the other, each
 * built as a slab standing over a base and facing the viewer. The
 * pointer's x slides the two against each other, the upper one way and
 * the lower the other. At rest they lie as the mark draws them and the
 * upper wave is bright. The slider is how far they slide.
 */
const K = Math.SQRT1_2, SCALE = 2.1, DEEP = 5;
// one wave of the mark, as the cubic curves it is drawn with (the other is the same, moved)
const CURVES = [
  [[27, 0], [19.8, 0], [15.3, 3.6], [13.5, 10.8]],
  [[13.5, 10.8], [16.2, 7.2], [19.35, 5.85], [22.95, 6.75]],
  [[22.95, 6.75], [25.004, 7.263], [26.472, 8.754], [28.097, 10.403]],
  [[28.097, 10.403], [30.744, 13.09], [33.808, 16.2], [40.5, 16.2]],
  [[40.5, 16.2], [47.7, 16.2], [52.2, 12.6], [54, 5.4]],
  [[54, 5.4], [51.3, 9], [48.15, 10.35], [44.55, 9.45]],
  [[44.55, 9.45], [42.496, 8.937], [41.028, 7.446], [39.403, 5.797]],
  [[39.403, 5.797], [36.756, 3.11], [33.692, 0], [27, 0]],
];
const WAVE = [];
for (const [p0, p1, p2, p3] of CURVES) for (let k = 0; k < 6; k++) {
  const t = k / 6, m = 1 - t;
  WAVE.push([0, 1].map((n) => m * m * m * p0[n] + 3 * m * m * t * p1[n] + 3 * m * t * t * p2[n] + t * t * t * p3[n]));
}

const mount = scrubbed({
  S: 2.1, box: [-40, -40, 40, 40], zt: 52, rest: 0.5,
  build({ slab, line, shape, path, lerp }) {
    const base = slab(), drop = line("dash");
    // a wave: its back, the sides between, its face
    const waves = [0, 1].map((n) => ({ back: line("sil"), sides: line("fo"), face: line(n ? "sil" : "hi") }));
    base(-34, -34, 34, 34, 12, 2, -52, -46);
    drop(path([[0, 0, -46], [0, 0, -36]]));
    return {
      draw(t, v) {
        const slide = lerp(-v, v, t);
        waves.forEach((wave, n) => {
          // the mark's own points, set in its plane - which stands facing the viewer - w out of it
          const put = (w) => WAVE.map(([x, y]) => {
            const a = (x - 13.5 * n - 20.25) * SCALE + (n ? -slide : slide), b = (16.2 - y - 16.2 * n) * SCALE;
            return [a * K + w * K, -a * K + w * K, b];
          });
          const far = put(0), near = put(DEEP);
          wave.back(shape(far));
          wave.sides(far.map((p, k) => { const q = (k + 1) % far.length; return shape([p, far[q], near[q], near[k]]); }).join(""));
          wave.face(shape(near));
        });
        return null;
      },
      name: (t, v) => `slide ${Math.round(lerp(-v, v, t))}`,
    };
  },
});

hairline({
  name: "waves",
  means: "The Tailwind CSS mark, two waves one under the other: across slides them against each other, one each way.",
  rules: [3, 5, 8, 10],
  range: [5, 10, 15],
  mount,
});
