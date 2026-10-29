import React, { useEffect, useRef } from 'react'
// the site's halftone dots
import { halftone } from '../../utils/halftone'

// a frame with no length of its own is held this long, in ms
const HOLD = 100;
// the frames are kept this wide, in px: a few times finer than the dot
// grid, and small enough that a whole gif's worth costs little memory
const KEEP = 240;

/**
 * Every frame of the gif, decoded once, as small bitmaps, each with how
 * long it is held. Decoded here (ImageDecoder) rather than left to an
 * <img>: a browser only moves a gif on while it is painted, and the one
 * under the dots is covered. Where ImageDecoder is missing, `null` - the
 * <img> is read instead, and plays only as far as the browser lets it.
 */
async function decodeAll(src, alive) {
  if (typeof window.ImageDecoder === 'undefined') return null;
  const data = await (await fetch(src, { mode: 'cors' })).arrayBuffer();
  const decoder = new window.ImageDecoder({ data, type: 'image/gif' });
  await decoder.tracks.ready;
  const count = decoder.tracks.selectedTrack.frameCount;
  const list = [];
  for (let i = 0; i < count && alive(); i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const { image } = await decoder.decode({ frameIndex: i });
    const width = Math.min(KEEP, image.displayWidth);
    // eslint-disable-next-line no-await-in-loop
    const bitmap = await createImageBitmap(image, {
      resizeWidth: width,
      resizeHeight: Math.round(image.displayHeight * (width / image.displayWidth)),
    });
    list.push({ bitmap, hold: image.duration ? image.duration / 1000 : HOLD });
    image.close();
  }
  decoder.close();
  return list;
}

/**
 * A gif shown in halftone: light dots on the dark ground of whatever it
 * sits in, each as large as the picture under it is light (halftone.js).
 * Each frame is drawn as dots on a canvas covering the box. The dots are
 * drawn again only when the frame changes, and not at all while the box
 * is off the screen or the tab is hidden. The gif's host must allow it
 * to be read (Tenor's media does).
 *
 * @param {string} src
 * @param {string} alt - what is in it, said for the canvas
 * @param {number[]} [trim] - [top, bottom] shares of the clip to cut off:
 *   bars it was letterboxed in
 */
function HalftoneGif({ src, alt, trim }) {
  const fxBox = useRef();
  const fxCanvas = useRef();
  const fxImg = useRef();

  useEffect(() => {
    const box = fxBox.current;
    const canvas = fxCanvas.current;
    const dots = halftone(canvas, box);
    const img = fxImg.current;
    let alive = true;
    let list = null;
    let visible = false;
    let raf = 0;
    // which frame is up, since when, and what was last drawn
    let index = 0;
    let since = 0;
    let drawn = '';

    decodeAll(src, () => alive)
      .then((frames) => {
        if (!alive) { frames?.forEach(({ bitmap }) => bitmap.close()); return; }
        if (frames && frames.length) list = frames;
        // (none: the <img> goes on being read)
      })
      .catch(() => {});

    const tick = (now) => {
      raf = 0;
      if (!alive || !visible || document.hidden) return;
      raf = requestAnimationFrame(tick);
      const size = `${box.clientWidth}x${box.clientHeight}`;
      if (list) {
        // on to the frame whose turn it is, at each frame's own pace
        if (!since) since = now;
        while (now - since >= list[index].hold) {
          since += list[index].hold;
          index = (index + 1) % list.length;
          // (back from a long pause: start from here, not catch up)
          if (now - since > 1000) since = now;
        }
        const key = `${index}:${size}`;
        if (key === drawn) return;
        drawn = key;
        const { bitmap } = list[index];
        dots(bitmap, bitmap.width, bitmap.height, trim);
      } else if (img.complete && img.naturalWidth) {
        // (its frames not decoded yet, or not decodable here: the <img> as
        // it stands, ten times a second)
        const key = `${Math.floor(now / 100)}:${size}`;
        if (key === drawn) return;
        drawn = key;
        dots(img, img.naturalWidth, img.naturalHeight, trim);
      }
    };
    const start = () => {
      if (!raf && visible && !document.hidden) {
        since = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    // only while it is on screen
    const watch = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    watch.observe(box);
    document.addEventListener('visibilitychange', start);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      watch.disconnect();
      document.removeEventListener('visibilitychange', start);
      list?.forEach(({ bitmap }) => bitmap.close());
      dots.dispose();
    };
    // (trim is read once, with its gif)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return (
    <div className='halftone-gif' ref={fxBox}>
      <canvas ref={fxCanvas} role='img' aria-label={alt} />
      {/* the gif itself, under the dots: what they are read from where
        the frames cannot be decoded here */}
      <img src={src} alt='' aria-hidden='true' crossOrigin='anonymous' decoding='async' ref={fxImg} />
    </div>
  )
}

export default HalftoneGif
