// ---- pictures in halftone dots
// the site's halftone: a picture drawn as light dots on the dark ground of
// whatever it sits in, each as large as the picture under it is light. the
// services' gifs (HalftoneGif.jsx) and its still pictures - the people in
// the testimonials, the portrait, the featured work's preview
// (HalftoneImage.jsx) - are all drawn with this

// a cell's side in CSS pixels, and the dots' colour (the site's light text)
export const CELL = 5;
const INK = '#E5E4E3';
// how far the picture's tones are pulled apart before they are dotted
const CONTRAST = 1.3;
// and bent down (a gamma): mid tones get small dots and the dark ground
// shows between them, so only the light parts of the picture are bright
const GAMMA = 1.8;
// the canvas is drawn at no more than this many device pixels a CSS pixel
const MAX_RATIO = 1.5;

/**
 * Something to draw a picture's dots with, onto one canvas covering a box:
 * `draw(picture, width, height)` crops the picture to the box's
 * proportions from its middle, as object-fit: cover would, reads it onto a
 * grid one sample a cell, and draws a dot a cell. The picture has to be
 * readable (the site's own, or from a host that allows it).
 *
 * @param {HTMLCanvasElement} canvas
 * @param {Element} box - what the canvas covers, for its size
 * @param {number} [cell] - a cell's side in CSS pixels
 * @returns {(picture: CanvasImageSource, width: number, height: number) => void}
 */
export function halftone(canvas, box, cell = CELL) {
  const ctx = canvas.getContext('2d');
  const sample = document.createElement('canvas');
  const sctx = sample.getContext('2d', { willReadFrequently: true });

  return (picture, pw, ph) => {
    const ratio = Math.min(window.devicePixelRatio || 1, MAX_RATIO);
    const width = box.clientWidth;
    const height = box.clientHeight;
    if (!width || !height || !pw || !ph) return;
    if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
    }
    const cols = Math.ceil(width / cell);
    const rows = Math.ceil(height / cell);
    if (sample.width !== cols || sample.height !== rows) {
      sample.width = cols;
      sample.height = rows;
    }
    const scale = Math.max(cols / pw, rows / ph);
    const sw = cols / scale;
    const sh = rows / scale;
    let data;
    try {
      sctx.drawImage(picture, (pw - sw) / 2, (ph - sh) / 2, sw, sh, 0, 0, cols, rows);
      ({ data } = sctx.getImageData(0, 0, cols, rows));
    } catch (e) {
      return;
    }
    const step = cell * ratio;
    const most = step * .56;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = INK;
    ctx.beginPath();
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        const i = (r * cols + c) * 4;
        // its lightness, 0 to 1, pulled apart round the middle so the
        // picture holds its shapes
        const grey = (data[i] * .299 + data[i + 1] * .587 + data[i + 2] * .114) / 255;
        const light = Math.min(1, Math.max(0, (grey - .5) * CONTRAST + .5));
        const radius = most * light ** GAMMA;
        if (radius < .3) continue;
        const x = (c + .5) * step;
        const y = (r + .5) * step;
        ctx.moveTo(x + radius, y);
        ctx.arc(x, y, radius, 0, Math.PI * 2);
      }
    }
    ctx.fill();
  };
}
