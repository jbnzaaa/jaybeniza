import field from './field'

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

const figure = {
  name: "ramp",
  means: "A ramp of five chips over three weights of type: they stand taller near the pointer, so the peak follows it.",
  rules: [1, 3, 5, 9],
  range: [30, 46, 66],
  mount,
};

export default figure;
