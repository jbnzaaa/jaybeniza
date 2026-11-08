import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
// the site's halftone dots
import { halftone } from '../../utils/halftone'

// how long the dots take to build up (`build`), in seconds
const BUILD = 1.1;

// a frame with no length of its own is held this long, in ms
const HOLD = 100;
// the frames are kept this wide, in px: a few times finer than the dot
// grid, and small enough that a whole gif's worth costs little memory
const KEEP = 240;
// how far ahead of the screen a gif starts to download: a screen's height,
// so it is ready by the time it scrolls in, and not fetched with the page
const AHEAD = '100% 0px';

/**
 * Every frame of the gif, decoded once, as small bitmaps, each with how
 * long it is held. Decoded here (ImageDecoder) rather than left to an
 * <img>: a browser only moves a gif on while it is painted, and the one
 * under the dots is covered. Where ImageDecoder is missing, `null` - the
 * <img> is read instead, and plays only as far as the browser lets it.
 */
async function decodeAll(data, alive) {
  if (typeof window.ImageDecoder === 'undefined') return null;
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
 * @param {boolean} [build] - the dots build up when it first shows, each
 *   coming in at its own random moment and growing to size, over BUILD
 */
function HalftoneGif({ src, alt, trim, build = false }) {
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
    let loading = false;
    let url = '';
    let visible = false;
    let raf = 0;
    // which frame is up, since when, and what was last drawn
    let index = 0;
    let since = 0;
    let drawn = '';

    // the gif is downloaded once, as it nears the screen: the same bytes
    // go to the <img> (read while the frames decode) and to the decoder.
    // (the <img> fetching it as well as fetch() had it downloaded twice)
    const load = () => {
      if (loading) return;
      loading = true;
      fetch(src, { mode: 'cors' })
        .then((response) => response.arrayBuffer())
        .then((data) => {
          if (!alive) return null;
          url = URL.createObjectURL(new Blob([data], { type: 'image/gif' }));
          img.src = url;
          return decodeAll(data, () => alive);
        })
        .then((frames) => {
          if (!alive) { frames?.forEach(({ bitmap }) => bitmap.close()); return; }
          if (frames && frames.length) list = frames;
          // (none: the <img> goes on being read)
        })
        // (it could not be read: the <img> fetches it itself)
        .catch(() => { if (alive && !url) img.src = src; });
    };

    // building up: from the first frame drawn, over BUILD seconds
    let builtFrom = 0;
    const tick = (now) => {
      raf = 0;
      if (!alive || !visible || document.hidden) return;
      raf = requestAnimationFrame(tick);
      let size = `${box.clientWidth}x${box.clientHeight}`;
      if (build && (list || (img.complete && img.naturalWidth))) {
        if (!builtFrom) builtFrom = now;
        const amount = Math.min(1, (now - builtFrom) / (BUILD * 1000));
        dots.build(gsap.parseEase('power1.out')(amount));
        // (redrawn every frame while it builds)
        if (amount < 1) size += `:${now}`;
      }
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

    // downloaded as it nears the screen
    const near = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      near.disconnect();
      load();
    }, { rootMargin: AHEAD });
    near.observe(box);

    // drawn only while it is on screen
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
      near.disconnect();
      if (url) URL.revokeObjectURL(url);
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
      {/* the gif itself, under the dots: what they are read from while
        the frames decode, or where they cannot be decoded here. its
        source is set once the gif is downloaded (above) */}
      <img alt='' aria-hidden='true' crossOrigin='anonymous' decoding='async' ref={fxImg} />
    </div>
  )
}

export default HalftoneGif
