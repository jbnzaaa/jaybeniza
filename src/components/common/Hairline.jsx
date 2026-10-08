import React, { useEffect, useRef } from 'react'
// the Hairline engine
import HL from '../../utils/hairline/kernel'

/**
 * One Hairline figure: an isometric line drawing that answers the pointer
 * (src/utils/hairline - the engine and the figures drawn on it). This is
 * the engine's host: a box of the figure's own 5:4 proportions holding its
 * svg, which the figure draws into and animates itself. It takes its
 * colours from the --hairline-* variables of whatever it sits in.
 *
 * @param {object} figure - a figure module's default export
 */
function Hairline({ figure }) {
  const fxStage = useRef();

  useEffect(() => {
    const stage = fxStage.current;
    // the engine's own styles, added to the page once
    HL.inject(document);
    const svg = HL.mk('svg', { viewBox: '0 0 400 320', 'aria-hidden': 'true' }, stage);
    // a figure names what is under the pointer; nothing here shows it
    const read = { textContent: '' };
    // mounted at the middle of its range, as the figure's own page does
    const handle = figure.mount({ stage, svg, read }, figure.range[1]);
    return () => {
      handle.destroy();
      svg.remove();
    };
  }, [figure]);

  return (
    <div data-hairline={figure.name} role='img' aria-label={figure.means} ref={fxStage}/>
  )
}

export default Hairline
