
import React, { useEffect, useRef } from 'react';

// GSAP
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';

// Components
import Tag from './Tag';
import SplitText from './SplitText';
import Button from './Button';
import HalftoneGif from './HalftoneGif';

// Animation utilities
import { pixelWipe } from '../../utils/pixels';
import {
  scrollRevealSequence,
  refreshSoon,
} from '../../utils/scrollReveal';

gsap.registerPlugin(ScrollTrigger, Observer);

// Text animation helpers
const below = (i, el) => el.offsetHeight * 1.05;
const above = (i, el) => -el.offsetHeight * 1.05;

// Animation settings
const TURN = 1.2;
const GESTURE_COOLDOWN = 0.45; // seconds after a panel finishes animating
const PIN_SCREENS_PER_PROJECT = 4; // generous guard against high-speed scroll jumps

function PinnedPanels({ id, tag, items }) {
  const fxSection = useRef(null);

  useEffect(() => {
    const section = fxSection.current;

    if (!section) return undefined;

    // Collect all project panels
    const panels = gsap.utils
      .toArray('.pinned-panel', section)
      .map((article) => ({
        article,
        letters: article.querySelectorAll(
          '.pinned-panel-copy .split-letter'
        ),
        media: article.querySelector(
          '.pinned-panel-media'
        ),
        picture: article.querySelector(
          '.pinned-panel-picture'
        ),
        cta: article.querySelector('.pinned-panel-cta'),
      }));

    const n = panels.length;
    const ctaWrappers = panels.map(({ cta }) => cta);

    if (!n) return undefined;

    // Keep background panels non-interactive; each CTA lives inside its panel.
    panels.forEach(({ article, picture }) => {
      article.style.pointerEvents = 'none';

      if (picture) {
        gsap.set(picture, {
          scale: 1.15,
          yPercent: 6,
        });
      }
    });

    // Keep each CTA mounted and animate it on the SAME GSAP timeline
    // as its project's title and description.
    ctaWrappers.forEach((wrapper, index) => {
      gsap.set(wrapper, { autoAlpha: index === 0 ? 1 : 0, y: 0, pointerEvents: index === 0 ? 'auto' : 'none' });
      const button = wrapper.querySelector('.cta-button');
      if (button) gsap.set(button, { clipPath: 'inset(0% 0% 0% 0%)' });
      gsap.set(wrapper.querySelectorAll('.split-letter, .menu-icon'), { y: 0 });
    });

    // First panel entrance animation
    const first = panels[0];
    const firstWipe = pixelWipe(first.media);

    const opening = scrollRevealSequence(
      [
        {
          targets: firstWipe.target,
          vars: {
            at: 1,
            duration: 1.2,
            onUpdate: firstWipe.onUpdate,
          },
        },
        {
          targets: first.picture,
          vars: {
            scale: 1,
            yPercent: 0,
            duration: 1.6,
          },
          position: '<',
        },
        {
          targets: first.letters,
          vars: {
            y: 0,
            stagger: 0.015,
          },
          position: 0.5,
        },
      ],
      {
        trigger: section,
        start: 'top 60%',
      }
    );

    // Timeline for changing projects
    const tl = gsap.timeline({
      paused: true,
      defaults: {
        ease: 'none',
      },
    });

    tl.addLabel('panel-0', 0);

    for (let k = 1; k < n; k += 1) {
      const at = k - 1;

      tl.addLabel(`panel-${k}`, k);

      const now = panels[k];
      const last = panels[k - 1];

      const wipe = pixelWipe(now.media);

      tl.to(
        wipe.target,
        {
          at: 1,
          duration: 0.8,
          ease: 'power1.inOut',
          onUpdate: wipe.onUpdate,
        },
        at
      )
        .to(
          now.picture,
          {
            scale: 1,
            yPercent: 0,
            duration: 1,
            ease: 'power2.out',
          },
          at
        )
        .fromTo(
          last.letters,
          {
            y: 0,
          },
          {
            y: above,
            duration: 0.3,
            stagger: {
              amount: 0.1,
            },
            ease: 'power2.in',
            immediateRender: false,
          },
          at
        )
        .to(ctaWrappers[k - 1], { autoAlpha: 0, duration: 0.2 }, at)
        .fromTo(
          ctaWrappers[k],
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out', immediateRender: false },
          at + 0.45
        )
        .fromTo(
          now.letters,
          {
            y: below,
          },
          {
            y: 0,
            duration: 0.3,
            stagger: {
              amount: 0.2,
            },
            ease: 'power2.out',
          },
          at + 0.45
        );
    }

    // Progress bars fill continuously while the project transition plays.
    // The first bar is filled when the first project is visible; subsequent
    // bars track the corresponding timeline segment in both directions.
    const bars = [...section.querySelectorAll('.pinned-bar')];
    const fills = [...section.querySelectorAll('.pinned-bar-fill')];

    const updateBars = (timelineTime = 0) => {
      fills.forEach((fill, index) => {
        const progress = index === 0
          ? 1
          : gsap.utils.clamp(0, 1, timelineTime - (index - 1));
        gsap.set(fill, { scaleX: progress, transformOrigin: 'left center' });
        bars[index]?.classList.toggle('pinned-bar-on', progress >= 1);
      });
    };

    updateBars(0);

    tl.to({}, { duration: 0 }, n - 1);

    // Current panel index
    let shown = 0;

    const updateActivePanel = (index) => {
      if (shown === index) return;

      shown = index;
      updateBars(tl.time());
      ctaWrappers.forEach((cta, i) => {
        gsap.set(cta, { pointerEvents: i === index ? 'auto' : 'none' });
      });
    };

    // Navigation is STEP-based, not tied to scroll progress. The long pin
    // range is only a safety buffer for fast mouse wheels and trackpads.
    let current = 0;
    let transitioning = false;
    let releasing = false;
    let active = false;
    let cooldownCall = null;
    let motion = null;
    let pin = null;

    const setPanelInstantly = (index) => {
      motion?.kill();
      tl.pause();
      tl.seek(`panel-${index}`);
      current = index;
      shown = index;
      updateBars(tl.time());
      ctaWrappers.forEach((cta, i) => {
        gsap.set(cta, { pointerEvents: i === index ? 'auto' : 'none' });
      });
    };

    const anchorScroll = () => {
      if (!pin) return;
      // Stay well inside the pin, away from either boundary.
      const anchor = pin.start + Math.min(window.innerHeight, (pin.end - pin.start) / 2);
      window.scrollTo(0, anchor);
    };

    const releaseSection = (direction) => {
      if (releasing || !pin) return;
      releasing = true;
      active = false;
      observer.disable();
      cooldownCall?.kill();
      // Only release after an EXTRA outward scroll on the boundary project.
      window.scrollTo(0, Math.max(0, direction > 0 ? pin.end + 3 : pin.start - 3));
      cooldownCall = gsap.delayedCall(0.5, () => {
        releasing = false;
        cooldownCall = null;
      });
    };

    const goToPanel = (direction) => {
      if (!active || transitioning || releasing) return;
      const next = current + direction;
      if (next < 0 || next >= n) {
        releaseSection(direction);
        return;
      }

      transitioning = true;
      // Disable CTA clicks while panels are transitioning.
      ctaWrappers.forEach((cta) => gsap.set(cta, { pointerEvents: 'none' }));
      // The current project changes only by ONE, even on a huge wheel delta.
      motion?.kill();
      motion = tl.tweenTo(`panel-${next}`, {
        duration: TURN,
        ease: 'power2.inOut',
        overwrite: true,
        onUpdate: () => updateBars(tl.time()),
        onComplete: () => {
          updateBars(tl.time());
          current = next;
          updateActivePanel(next);
          motion = null;
          cooldownCall = gsap.delayedCall(GESTURE_COOLDOWN, () => {
            transitioning = false;
            cooldownCall = null;
          });
        },
      });
    };

    const observer = Observer.create({
      target: window,
      type: 'wheel,touch',
      wheelSpeed: -1,
      tolerance: 24,
      preventDefault: true,
      onUp: () => goToPanel(1),
      onDown: () => goToPanel(-1),
      enabled: false,
    });

    const enterPinned = (fromBelow = false) => {
      if (releasing || active) return;
      active = true;
      cooldownCall?.kill();
      transitioning = false;
      setPanelInstantly(fromBelow ? n - 1 : 0);
      // Reposition BEFORE unlocking the observer; this prevents a large
      // scroll delta from crossing the pin's far edge on entry.
      anchorScroll();
      observer.enable();
    };

    const onKeyDown = (event) => {
      if (!active || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.target?.closest?.('input, textarea, select, [contenteditable="true"]')) return;
      if (['ArrowDown', 'PageDown', ' ', 'ArrowUp', 'PageUp'].includes(event.key)) {
        event.preventDefault();
        goToPanel(
          ['ArrowUp', 'PageUp'].includes(event.key) ||
          (event.key === ' ' && event.shiftKey) ? -1 : 1
        );
      }
    };
    window.addEventListener('keydown', onKeyDown, { passive: false });

    if (n > 1) {
      pin = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.max(window.innerHeight * n * PIN_SCREENS_PER_PROJECT, 2000)}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onEnter: () => enterPinned(false),
        onEnterBack: () => enterPinned(true),
        // Even if a massive scroll tries to cross the entire pin in one
        // frame, put the viewport back inside instead of skipping projects.
        onLeave: () => {
          if (active && !releasing) anchorScroll();
          else observer.disable();
        },
        onLeaveBack: () => {
          if (active && !releasing) anchorScroll();
          else observer.disable();
        },
      });
    }

    refreshSoon();

    // Cleanup
    return () => {
      opening.kill();
      motion?.kill();
      observer.kill();
      window.removeEventListener('keydown', onKeyDown);
      cooldownCall?.kill();
      pin?.kill();
      tl.revert();
      ctaWrappers.forEach((wrapper) => {
        gsap.set(wrapper, { clearProps: 'all' });
        const button = wrapper.querySelector('.cta-button');
        if (button) gsap.set(button, { clearProps: 'clipPath' });
        gsap.set(wrapper.querySelectorAll('.split-letter, .menu-icon'), { clearProps: 'transform' });
      });

      panels.forEach(
        ({ article, picture, media }) => {
          gsap.set(
            [picture, media].filter(Boolean),
            {
              clearProps: 'all',
            }
          );

          article.style.removeProperty(
            'pointer-events'
          );
        }
      );
    };
  }, [items]);

  return (
    <section
      id={id}
      data-pinned
      ref={fxSection}
      className="pinned-panels relative h-screen-safe overflow-hidden bg-black"
    >
      {/* Project panels */}
      {items.map((item, i) => (
        <article
          className="pinned-panel absolute inset-0 pointer-events-none"
          style={{ zIndex: i + 1 }}
          id={`${id}-${item.id}`}
          key={item.id}
        >
          {/* Full-screen project image */}
          <div className="pinned-panel-media absolute inset-0 overflow-hidden bg-black">
            <div className="pinned-panel-picture w-full h-full">
              {item.gif ? (
                <HalftoneGif
                  src={item.gif}
                  alt={item.alt || ''}
                  trim={item.trim}
                />
              ) : (
                <img
                  className="pinned-panel-image w-full h-full object-cover"
                  src={item.picture}
                  alt={item.alt || ''}
                  loading="lazy"
                />
              )}
            </div>

            {/* Image shade */}
            <div
              className="pinned-panel-shade absolute inset-0"
              aria-hidden="true"
            />
          </div>

          {/* Project information */}
          <div
            className="pinned-panel-copy relative z-[2] h-full flex flex-col justify-between pointer-events-none
              mobile:px-[1rem] mobile:pt-16 mobile:pb-[calc(1rem_+_4px)]
              tablet:px-[1rem] tablet:pt-16 tablet:pb-[calc(1rem_+_4px)]
              laptop:px-[2rem] laptop:pt-20 laptop:pb-[calc(2rem_+_4px)]
              laptop-lg:px-[3rem] laptop-lg:pt-24 laptop-lg:pb-[calc(3rem_+_4px)]
              desktop:px-[3rem] desktop:pt-28 desktop:pb-[calc(3rem_+_4px)]"
          >
            {/* Upper-right project metadata */}
            <div
              className="flex
                mobile:justify-start mobile:mt-9
                tablet:justify-start tablet:mt-9
                laptop:justify-end
                laptop-lg:justify-end
                desktop:justify-end"
            >
              <p
                className="flex flex-col text-caption
                  mobile:items-start mobile:text-left
                  tablet:items-start tablet:text-left
                  laptop:items-end laptop:text-right
                  laptop-lg:items-end laptop-lg:text-right
                  desktop:items-end desktop:text-right"
              >
                {(
                  Array.isArray(item.label)
                    ? item.label
                    : [item.label]
                ).map((line) => (
                  <span
                    className="flex flex-wrap whitespace-nowrap
                      mobile:justify-start
                      tablet:justify-start
                      laptop:justify-end
                      laptop-lg:justify-end
                      desktop:justify-end"
                    key={line}
                  >
                    <SplitText
                      text={line}
                      id={`animate-${id}-${item.id}`}
                    />
                  </span>
                ))}
              </p>
            </div>

            {/* Lower-left project title and description */}
            <div
              className="flex justify-between items-end gap-x-8
                mobile:flex-col mobile:items-start mobile:gap-y-6
                tablet:flex-col tablet:items-start tablet:gap-y-6"
            >
              <div
                className="flex flex-col gap-y-4
                  laptop:w-[52%]
                  laptop-lg:w-[48%]
                  desktop:w-[44%]"
              >
                <h3
                  className="flex flex-col font-flexible font-medium leading-[.95] tracking-tight text-project mobile:text-title tablet:text-title"
                >
                  {(item.titleLines || [item.title]).map(
                    (line) => (
                      <span
                        className="flex w-max whitespace-nowrap"
                        key={line}
                      >
                        <SplitText
                          text={line}
                          id={`animate-${id}-${item.id}`}
                          emphasis={item.emphasis}
                        />
                      </span>
                    )
                  )}
                </h3>

                <p
                  className="flex flex-wrap text-copy
                    mobile:w-full
                    tablet:w-[80%]
                    laptop:w-[86%]
                    laptop-lg:w-[80%]
                    desktop:w-[76%]"
                >
                  <SplitText
                    text={item.text}
                    id={`animate-${id}-${item.id}`}
                    by="word"
                  />
                </p>
              </div>

              {/* CTA belongs to this project, and shares its reveal timeline. */}
              <div
                className="pinned-panel-cta relative z-10 shrink-0 pointer-events-auto"
                style={{ visibility: i === 0 ? 'visible' : 'hidden' }}
              >
                <Button
                  label={item.cta || 'View work'}
                  to={item.to}
                  reveal="manual"
                  name={`View work: ${item.title}`}
                />
              </div>
            </div>
          </div>
        </article>
      ))}

      {/* Progress bars */}
      {items.length > 1 && (
        <div
          className="absolute left-0 bottom-0 w-full flex gap-x-1 z-[60] pointer-events-none"
          aria-hidden="true"
        >
          {items.map((item) => (
            <span
              className="pinned-bar relative flex-1 overflow-hidden"
              key={item.id}
            >
              <span
                className="pinned-bar-fill absolute inset-0 bg-current"
                style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
              />
            </span>
          ))}
        </div>
      )}

      {/* Section label */}
      <div
        className="absolute top-0 left-0 z-[60] pointer-events-none
          mobile:px-[1rem] mobile:pt-16
          tablet:px-[1rem] tablet:pt-16
          laptop:px-[2rem] laptop:pt-20
          laptop-lg:px-[3rem] laptop-lg:pt-24
          desktop:px-[3rem] desktop:pt-28"
      >
        <Tag
          label={tag}
          id={`animate-${id}-tag`}
        />
      </div>
    </section>
  );
}

export default PinnedPanels;
