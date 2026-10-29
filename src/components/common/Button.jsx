import React, { useEffect, useRef } from 'react'
// icons
import {RiArrowRightDownLine} from 'react-icons/ri'
// GSAP
import gsap from 'gsap'
// page-to-page wipe
import { TransitionLink } from './PageTransition'
// scroll reveal
import { scrollRevealSequence } from '../../utils/scrollReveal'
// per-letter text split
import SplitText from './SplitText'

// the moving parts inside a button: its label's letters and its arrow
export const BUTTON_PARTS = '.split-letter, .menu-icon';

/**
 * The site's one button: a small box with its label and an arrow. Every
 * button uses it, so they share one layout, one style and one reveal - the
 * box wipes open from its bottom edge, then the label rises letter by
 * letter and the arrow after it. It is filled in the section's text colour
 * (App.css decides, from the section's theme), or an outline with
 * `outline`; on hover its colours swap, the new fill sweeping up from the bottom.
 *
 * It is a page link (`to`), an ordinary link (`href`), or, with
 * neither, a button that runs `onClick`.
 *
 * @param {string} label - also the accessible name when `iconOnly`
 * @param {string} [to] - a route; goes through the page wipe
 * @param {string} [href] - an address, file or mailto
 * @param {boolean} [external] - open `href` in a new tab
 * @param {string} [download] - download `href` under this name
 * @param {boolean} [small] - marks the top bar's button, which drops its
 *   arrow on a phone
 * @param {boolean} [iconOnly] - the arrow alone, in a square box
 * @param {Function} [icon] - the icon in place of the arrow (a react-icons
 *   component); it wiggles on hover instead of passing through
 * @param {boolean} [outline] - a bordered box with no fill, for the top bar
 *   and the landing hero
 * @param {'scroll'|'mount'|'manual'} [reveal] - when it reveals: as it
 *   scrolls into view (default); once, on mount (for fixed elements, which
 *   a scroll trigger mis-measures); or left to the parent, which animates
 *   `#id` (the box's clip-path) and the BUTTON_PARTS inside it
 * @param {string} [id] - needed for `reveal='manual'`
 */
function Button({ label, to, href, external = false, download, small = false, iconOnly = false, outline = false, icon: Icon, reveal = 'scroll', id, onClick }) {
  const fxButton = useRef();

  useEffect(() => {
    if (reveal === 'manual') return undefined;
    const button = fxButton.current;
    const parts = button.querySelectorAll(BUTTON_PARTS);
    const frame = { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut' };
    const rise = { y: 0, stagger: .02, ease: 'power1.in' };

    if (reveal === 'mount') {
      const tl = gsap.timeline()
        .to(button, { ...frame, duration: .6 })
        .to(parts, { ...rise, duration: .5 }, '<.2');
      return () => tl.revert();
    }

    const sequence = scrollRevealSequence([
      { targets: button, vars: frame },
      { targets: parts, vars: rise, position: '<.2' },
    ], { trigger: button });
    return () => sequence.kill();
  }, [reveal]);

  const className = ['cta-button text-copy', small ? 'cta-button-small' : '', iconOnly ? 'cta-button-icon' : '', outline ? 'cta-button-outline' : '']
    .filter(Boolean).join(' ');
  const content = (
    <>
      {iconOnly ? <span className='sr-only'>{label}</span> : <SplitText text={label} id='button-letter' />}
      {/* the arrow, in a box of its own at the button's end (App.css) */}
      <span className='button-icon-box' aria-hidden='true'>
        <span className='menu-icon-clip'>
          <span className='menu-icon'>
            {Icon
              ? <Icon className='button-glyph text-base'/>
              : <RiArrowRightDownLine className='button-arrow text-base'/>}
          </span>
        </span>
      </span>
    </>
  );

  if (!to && !href) {
    return (
      <button type='button' className={className} id={id} ref={fxButton} onClick={onClick}>{content}</button>
    );
  }
  if (to) {
    return (
      <TransitionLink to={to} onClick={onClick} className={className} id={id} ref={fxButton}>{content}</TransitionLink>
    );
  }
  return (
    <a href={href} className={className} id={id} ref={fxButton} onClick={onClick}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      {...(download ? { download } : {})}>
      {content}
    </a>
  );
}

export default Button
