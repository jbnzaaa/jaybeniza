import React, { forwardRef, useEffect, useRef } from 'react'
// the site's halftone dots
import { halftone, CELL } from '../../utils/halftone'

/**
 * A still picture in the site's halftone (halftone.js), as the services'
 * gifs are: light dots on a dark ground, on a canvas that fills the box
 * it is given (`className` sizes it). Drawn once the picture has loaded,
 * and again when the box changes size. A ref lands on the box, so a
 * reveal can be played on it as on the picture it stands for.
 *
 * @param {string} src - the site's own picture
 * @param {string} [alt] - what is in it; none, and it is left unsaid
 * @param {number} [cell] - the dots' spacing, in CSS pixels: smaller for a
 *   small picture, so there are enough dots to make it out
 * @param {string} [className]
 */
const HalftoneImage = forwardRef(function HalftoneImage({ src, alt = '', cell = CELL, className = '', ...rest }, ref) {
  const fxBox = useRef();
  const fxCanvas = useRef();

  useEffect(() => {
    const box = fxBox.current;
    const dots = halftone(fxCanvas.current, box, cell);
    const img = new Image();
    let loaded = false;
    const draw = () => loaded && dots(img, img.naturalWidth, img.naturalHeight);
    img.decoding = 'async';
    img.onload = () => { loaded = true; draw(); };
    img.src = src;
    const resize = new ResizeObserver(draw);
    resize.observe(box);
    return () => {
      img.onload = null;
      resize.disconnect();
    };
  }, [src, cell]);

  const setBox = (el) => {
    fxBox.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) ref.current = el;
  };

  return (
    <div className={`halftone-image ${className}`} ref={setBox} {...rest}>
      <canvas ref={fxCanvas} role={alt ? 'img' : undefined} aria-label={alt || undefined} aria-hidden={alt ? undefined : 'true'} />
    </div>
  )
})

export default HalftoneImage
