const {
  Cam, clamp, lerp, extremes, facing, fit, open, poly, prism, proj, ringAt, rings, rrect, seg,
  spring, stepS, disposer, mk, pointer, put, register, solid,
} = HL;

function plated(def) {
  return function mount({ stage, svg, read }, value) {
    const bag = disposer(), { W, L, T } = def, N = T.length;
    let gmax = value;
    // the pick bands, top to bottom of the frame, and the scrub's run across it
    const BY0 = 50, BY1 = 270, BX0 = 70, BX1 = 330;

    // fitted to the widest gap, so nothing leaves the frame. the plates
    // part about the middle of the stack, up and down alike, so the object
    // at rest sits in the middle of its frame and stays there
    const C = Cam(45, 0.5, def.S);
    const TS = T.reduce((a, b) => a + b, 0), HZ = (TS + (N - 1) * def.GTOP) / 2;
    fit(C, [[0, 0, -HZ], [W, L, -HZ], [W, 0, -HZ], [0, L, -HZ], [0, 0, HZ], [W, L, HZ], [W, 0, HZ], [0, L, HZ]], 200, 160);
    const P = proj(C), front = facing(C);
    const [ring, inner] = rings(0, 0, W, L, def.RAD, 1.6);
    const [eL, eR] = extremes(P, ring);

    // the guides first, so every plate is painted over them; then the plates, bottom to top
    const g = mk("g", {}, svg);
    const guide = mk("path", { class: "dash" }, g);
    const plates = [];
    for (let k = 0; k < N; k++) {
      const el = solid(g);
      plates.push({ el, face: mk("path", { class: "nf lo" }, el.g) });
    }

    // softer than the engine's default spring, as the site's other figures are
    const gap = spring(def.REST, { k: 40, c: 13 });
    let act = -1, drawn = NaN;

    function draw() {
      const gp = gap.x;
      if (gp === drawn) return;
      drawn = gp;
      const z0 = -(TS + (N - 1) * gp) / 2;
      let z = z0, top = z0;
      plates.forEach((p, k) => {
        const zt = z + T[k];
        put(p.el, prism(P, front, ring, inner, z, zt));
        p.face.setAttribute("d", def.marks(
          k,
          (u0, v0, u1, v1, r) => poly(ringAt(P, rrect(u0, v0, u1, v1, r, 4), zt)),
          (u0, v0, u1, v1) => seg(P(u0, v0, zt), P(u1, v1, zt)),
          (points) => open(points.map(([u, v]) => P(u, v, zt))),
        ));
        top = z;
        z += T[k] + gp;
      });
      guide.setAttribute("d", seg(P(eL.u, eL.v, z0 + T[0]), P(eL.u, eL.v, top)) + seg(P(eR.u, eR.v, z0 + T[0]), P(eR.u, eR.v, top)));
    }

    /** The bright edge: the plate picked, or the top one at rest. */
    function light() {
      const on = act < 0 ? N - 1 : act;
      plates.forEach((p, k) => p.el.sil.classList.toggle("hi", k === on));
      read.textContent = act < 0 ? "rest" : `${def.word} ${act + 1}`;
    }

    const B = register(stage, (dt) => {
      const moving = stepS(gap, dt);
      draw();
      return moving;
    });
    bag.add(B.unregister);

    let over = null;
    function retarget() {
      if (over) {
        // y picks, on bands that never move; x scrubs
        const band = clamp(Math.floor(((over[1] - BY0) / (BY1 - BY0)) * N), 0, N - 1);
        act = N - 1 - band;
        gap.t = lerp(def.GMIN, gmax, clamp((over[0] - BX0) / (BX1 - BX0), 0, 1));
      } else { act = -1; gap.t = def.REST; }
      light();
      B.wake();
    }

    draw();
    light();
    bag.add(pointer(stage, {
      move: (p) => { over = p; retarget(); },
      leave: () => { over = null; retarget(); },
    }));
    bag.add(() => svg.replaceChildren());

    return {
      set: (v) => { gmax = v; if (over) retarget(); },
      destroy: bag.dispose,
    };
  };
}

/**
 * Markup - HTML5, CSS3 and Sass: one page taken apart into three plates,
 * each written in its own language - the HTML, elements between angle
 * brackets, some inside others; the CSS, two rules, each a selector and
 * its declarations between braces; and the Sass, rules nested inside
 * rules. The pointer's x scrubs the gap between the plates; its y picks
 * a plate, which takes the bright edge. At rest the page is a little
 * apart and the top plate is bright. The slider is the widest gap.
 */
const W = 84, L = 116;

const mount = plated({
  S: 1.9, W, L, RAD: 8, T: [6, 2.4, 2.4], REST: 18, GMIN: 4, GTOP: 42, word: "layer",
  marks(k, box, ln, curve) {
    // a brace, opening or closing, its point at (u, v)
    const brace = (u, v, d) => curve([[u + 4 * d, v - 6], [u + 2 * d, v - 5], [u + 2 * d, v - 1.5], [u, v], [u + 2 * d, v + 1.5], [u + 2 * d, v + 5], [u + 4 * d, v + 6]]);
    // a declaration: a property and its value
    const says = (u, v) => ln(u, v, u + 10, v) + ln(u + 14, v, u + 40, v);
    // the HTML: four elements, each a box between angle brackets, the middle two inside the first
    if (k === 0) {
      return [[20, 0, 40], [44, 8, 28], [68, 8, 34], [92, 0, 40]].map(([v, indent, long]) => {
        const u = 10 + indent, end = u + 16 + long;
        return ln(u + 5, v - 5, u, v) + ln(u, v, u + 5, v + 5) + box(u + 10, v - 4, u + 10 + long, v + 4, 1)
          + ln(end, v - 5, end + 5, v) + ln(end + 5, v, end, v + 5);
      }).join("");
    }
    // the CSS: two rules, a selector, a brace, two declarations, a brace
    if (k === 1) {
      return [14, 66].map((v) => ln(10, v, 34, v) + brace(38, v, 1) + says(18, v + 12) + says(18, v + 22) + brace(14, v + 34, -1)).join("");
    }
    // the Sass: a rule, a rule inside it, a rule inside that, each a step further in
    return [0, 1, 2].map((n) => {
      const u = 10 + n * 8, v = 14 + n * 26;
      return ln(u, v, u + 20 - n * 2, v) + brace(u + 24 - n * 2, v, 1) + says(u + 8, v + 12) + brace(u + 4, 106 - n * 10, -1);
    }).join("");
  },
});

hairline({
  name: "markup",
  means: "One page as three plates, its HTML, its CSS and its Sass, each in its own brackets: across scrubs the gap, up and down picks one.",
  rules: [1, 3, 5, 9],
  range: [22, 32, 42],
  mount,
});
