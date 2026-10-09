import scrubbed from './scrub'

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

const figure = {
  name: "proto",
  means: "Two screens of a prototype: across, the button on the first goes down and the second screen slides in beside it.",
  rules: [3, 5, 8, 9],
  range: [18, 28, 38],
  mount,
};

export default figure;
