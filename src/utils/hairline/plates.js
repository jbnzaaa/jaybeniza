import HL from './kernel'

const {
  Cam, clamp, lerp, extremes, facing, fit, open, poly, prism, proj, ringAt, rings, rrect, seg,
  spring, stepS, disposer, mk, pointer, put, register, solid,
} = HL;

/**
 * Scrub and pick: one flat object taken apart into plates, each carrying
 * what is drawn at that layer. The pointer's x scrubs the gap between the
 * plates on one spring; its y picks a plate, on fixed bands of the frame,
 * so a plate moving cannot flip the choice. The plate picked takes the
 * bright edge; at rest the top one has it. The slider is the widest gap.
 *
 * def: S, W and L and RAD (a plate's footprint), T (each plate's
 * thickness, bottom to top), REST and GMIN and GTOP (the gap at rest, at
 * its narrowest, and the widest the slider allows), word (the read-out's),
 * and marks(k, box, ln, curve), giving plate k's drawing as a path string.
 */
export default function plated(def) {
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
