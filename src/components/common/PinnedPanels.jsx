
import React, { useEffect, useRef, useState } from 'react';

// GSAP
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

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

gsap.registerPlugin(ScrollTrigger);

// Text animation helpers
const below = (i, el) => el.offsetHeight * 1.05;
const above = (i, el) => -el.offsetHeight * 1.05;

// Animation settings
const TURN = 1.2;
const HOLD = 0.6;

function PinnedPanels({ id, tag, items }) {
  const fxSection = useRef(null);

  // Tracks the currently displayed project
  const [activeIndex, setActiveIndex] = useState(0);

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
      }));

    const n = panels.length;

    if (!n) return undefined;

    // Keep background panels non-interactive.
    // The CTA is rendered separately above them.
    panels.forEach(({ article, picture }) => {
      article.style.pointerEvents = 'none';

      if (picture) {
        gsap.set(picture, {
          scale: 1.15,
          yPercent: 6,
        });
      }
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

    // Progress indicator
    const bars = [
      ...section.querySelectorAll('.pinned-bar'),
    ];

    const markBars = (turn) => {
      bars.forEach((bar, index) => {
        bar.classList.toggle(
          'pinned-bar-on',
          index <= turn
        );
      });
    };

    markBars(0);

    tl.to({}, { duration: 0 }, n - 1);

    // Current panel index
    let shown = 0;

    const updateActivePanel = (index) => {
      if (shown === index) return;

      shown = index;
      markBars(index);
      setActiveIndex(index);
    };

    // Pin section while scrolling through projects
    const pin =
      n > 1
        ? ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: () =>
              `+=${Math.round(
                window.innerHeight *
                  HOLD *
                  (n - 1)
              )}`,
            pin: true,
            invalidateOnRefresh: true,

            onUpdate: (self) => {
              const turn = Math.max(
                0,
                Math.min(
                  n - 1,
                  Math.floor(
                    self.progress * (n - 1) + 0.75
                  )
                )
              );

              if (turn === shown) return;

              const steps = Math.abs(
                turn - shown
              );

              updateActivePanel(turn);

              tl.tweenTo(`panel-${turn}`, {
                duration:
                  TURN * Math.min(steps, 2),
                ease: 'power1.inOut',
                overwrite: true,
              });
            },
          })
        : null;

    refreshSoon();

    // Cleanup
    return () => {
      opening.kill();
      pin?.kill();
      tl.revert();

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

  const activeItem = items[activeIndex];

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

              {/* Reserve space for the CTA */}
              <span className="shrink-0" />
            </div>
          </div>
        </article>
      ))}

      {/* Clickable CTA overlay above all panels */}
      {activeItem && (
        <div
          className="absolute inset-0 z-[70] pointer-events-none
            flex items-end justify-end
            mobile:px-[1rem] mobile:pb-[calc(1rem_+_4px)]
            tablet:px-[1rem] tablet:pb-[calc(1rem_+_4px)]
            laptop:px-[2rem] laptop:pb-[calc(2rem_+_4px)]
            laptop-lg:px-[3rem] laptop-lg:pb-[calc(3rem_+_4px)]
            desktop:px-[3rem] desktop:pb-[calc(3rem_+_4px)]"
        >
          <div className="pointer-events-auto">
            <Button
              key={activeItem.id}
              label={activeItem.cta || 'View work'}
              to={activeItem.to}
              reveal="mount"
              name={`View work: ${activeItem.title}`}
            />
          </div>
        </div>
      )}

      {/* Progress bars */}
      {items.length > 1 && (
        <div
          className="absolute left-0 bottom-0 w-full flex gap-x-1 z-[60] pointer-events-none"
          aria-hidden="true"
        >
          {items.map((item) => (
            <span
              className="pinned-bar flex-1"
              key={item.id}
            />
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
