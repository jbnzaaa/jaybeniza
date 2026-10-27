import scrubbed from './scrub'

/**
 * Compose - designing on a system: a tray holding a design system's parts
 * - a header, a card with its picture, a button - and a phone beside it,
 * its screen marked where each part goes. The pointer's x carries the
 * parts across, one after another, each arcing over the gap and settling
 * into its place on the screen. At rest the header is on its way and
 * bright. The slider is how high a part arcs.
 */
// the parts, in the screen's units (the phone is 54 by 86): a part's box,
// and its marks - [u0, v0, u1, v1, radius], a box when it has a radius
const PARTS = [
  { q: [6, 6, 48, 16], m: [[10, 11, 24, 11], [40, 9, 44, 13, 1]] },
  { q: [6, 22, 48, 58], m: [[10, 26, 44, 44, 1], [10, 49, 38, 49], [10, 53, 30, 53]] },
  { q: [12, 66, 42, 78], m: [[20, 72, 34, 72]] },
];
const WORDS = ["header", "card", "button"];
const TRAY = -50, PHONE = 30, DX = PHONE - TRAY - 4;

const mount = scrubbed({
  S: 1.9, box: [-50, -4, 84, 90], zt: 26, rest: 0.3,
  build({ slab, line, box, ln, clamp, lerp }) {
    const tray = slab(), well = line(), phone = slab(), glass = line(), slots = line("dash");
    const parts = PARTS.map(() => [slab(), line()]);
    return {
      draw(t, v) {
        // the tray and its well; the phone, its glass and its speaker
        tray(TRAY, 0, TRAY + 50, 86, 0, 1.2, 0, 3);
        well(box(TRAY + 2.5, 2.5, TRAY + 47.5, 83.5, 1, 3));
        phone(PHONE, -4, PHONE + 54, 90, 0, 1.4, 0, 5);
        glass(box(PHONE + 3, 2, PHONE + 51, 84, 1, 5) + ln(PHONE + 20, -1, PHONE + 34, -1, 5));
        slots(PARTS.map(({ q }) => box(PHONE + q[0], q[1], PHONE + q[2], q[3], 1, 5)).join(""));
        let on = t >= 1 ? phone : tray, mid = 1;
        PARTS.forEach(({ q, m }, i) => {
          const s = clamp((t - i * 0.2) / 0.6, 0, 1), x = TRAY - 2 + s * DX;
          const z = lerp(3, 5, s) + 4 * s * (1 - s) * v;
          const [part, marks] = parts[i];
          part(x + q[0], q[1], x + q[2], q[3], 0, 1, z, z + 2);
          marks(m.map(([u0, v0, u1, v1, r]) => (r
            ? box(x + u0, v0, x + u1, v1, r, z + 2)
            : ln(x + u0, v0, x + u1, v1, z + 2))).join(""));
          if (s > 0 && s < 1 && Math.abs(s - 0.5) < mid) { mid = Math.abs(s - 0.5); on = part; }
        });
        return on;
      },
      name(t) {
        if (t <= 0) return "system";
        if (t >= 1) return "screen";
        return WORDS[clamp(Math.floor((t - 0.1) / 0.2), 0, 2)];
      },
    };
  },
});

const figure = {
  name: "compose",
  means: "A design system's parts and a phone: across carries each part over and settles it into its place on the screen.",
  rules: [3, 5, 6, 8],
  range: [8, 14, 20],
  mount,
};

export default figure;
