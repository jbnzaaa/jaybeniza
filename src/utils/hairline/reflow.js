import scrubbed from './scrub'

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

const figure = {
  name: "reflow",
  means: "One page at every width: across widens it from phone to desktop, and a column of cards comes in as it finds room.",
  rules: [3, 5, 8, 9],
  range: [104, 116, 128],
  mount,
};

export default figure;
