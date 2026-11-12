//
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
// it wipes open and shut
import { wipeToggle } from '../../utils/pixels'

/**
 * The hover preview of a list of large names (Process.jsx, Services.jsx):
 * pointing at a row brings up a preview level with it, in the clear space
 * between the longest name (.project-name) and the labels
 * (.project-label), wiping open; moved on to another row, it shuts on the
 * one and opens on the next; leaving the list closes it. No room for it
 * (a phone or tablet, where the labels sit under the names), no preview.
 *
 * `fxList` goes on the positioned box holding the rows and the preview,
 * `fxPreview` on the preview; `show(item)` is each row's onMouseEnter,
 * `hide` the list's onMouseLeave, and `shown` the item to preview.
 */
function useRowPreview() {
  const fxList = useRef();
  const fxPreview = useRef();
  // the item the preview is showing, and the one pointed at
  const [shown, setShown] = useState(null);
  const fxOn = useRef(null);
  const fxWipe = useRef(null);

  useEffect(() => {
    // the preview wipes open from its foot, and shut again (pixels.js)
    fxWipe.current = wipeToggle(fxPreview.current);
    return () => fxWipe.current?.kill();
  }, []);

  // where the preview goes without covering a name or a label: the space
  // right of the longest name and left of the labels, its width filling
  // that space up to its own; no room, no preview
  const fit = () => {
    const list = fxList.current;
    const preview = fxPreview.current;
    const box = list.getBoundingClientRect();
    const right = Math.max(...[...list.querySelectorAll('.project-name')].map((el) => el.getBoundingClientRect().right));
    const left = Math.min(...[...list.querySelectorAll('.project-label')].map((el) => el.getBoundingClientRect().left));
    const gutter = 24;
    const room = left - right - gutter * 2;
    const width = Math.min(window.innerWidth * .22, room);
    if (width < 160) return false;
    preview.style.width = `${width}px`;
    preview.style.left = `${right - box.left + gutter + (room - width) / 2}px`;
    return true;
  };

  const show = (item) => (e) => {
    const preview = fxPreview.current;
    const wipe = fxWipe.current;
    const row = e.currentTarget;
    if (!fit()) return;
    gsap.to(preview, { y: row.offsetTop + row.offsetHeight / 2 - preview.offsetHeight / 2, duration: .5, ease: 'power3.out' });
    const was = fxOn.current;
    fxOn.current = item;
    if (!was || was === item) {
      setShown(item);
      wipe?.show(.5);
      return;
    }
    wipe?.hide(.2).then(() => {
      if (fxOn.current !== item) return;
      setShown(item);
      wipe.show(.4);
    });
  };

  const hide = () => {
    fxOn.current = null;
    fxWipe.current?.hide(.3);
  };

  return { fxList, fxPreview, shown, show, hide };
}

export default useRowPreview
