
import React, { useEffect, useRef } from 'react';

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
import { refreshSoon } from '../../utils/scrollReveal';

gsap.registerPlugin(ScrollTrigger);

// Text animation helpers
const below = (i, el) => el.offsetHeight * 1.05;
const above = (i, el) => -el.offsetHeight * 1.05;

// Short, natural scroll travel per project (in viewport heights).
// 0.65 means about 65% of a screen of scrolling reveals the next project.
const SCROLL_PER_PROJECT = 0.65;
// Small smoothing value; 0 for direct scroll tracking.

// Reveal the incoming project as soon as its progress bar starts filling.
// Reserve the first scroll segment for Project 01.
// Project 02 starts only AFTER the section is pinned and segment 01 is crossed.
const ENTRY_EPSILON = 0.00001;

function PinnedPanels({ id, tag, items }) {
  const fxSection = useRef(null);

  useEffect(() => {
    const section = fxSection.current;
    if (!section || !items.length) return undefined;

    const panels = gsap.utils.toArray('.pinned-panel', section).map((article) => ({
      article,
      letters: article.querySelectorAll('.pinned-panel-copy .split-letter'),
      media: article.querySelector('.pinned-panel-media'),
      picture: article.querySelector('.pinned-panel-picture'),
      cta: article.querySelector('.pinned-panel-cta'),
    }));
    const count = panels.length;
    const fills = gsap.utils.toArray('.pinned-bar-fill', section);
    const bars = gsap.utils.toArray('.pinned-bar', section);
    const clamp = gsap.utils.clamp;
    let revealedIndex = 0;

    // The pin tracks native scroll. Each project transition plays on its own
    // clock after entering the corresponding progress-bar segment.
    const wipes = panels.map(({ media }, index) => {
      const wipe = pixelWipe(media);
      wipe.target.at = index === 0 ? 1 : 0;
      wipe.onUpdate();
      return wipe;
    });

    panels.forEach(({ article, letters, picture, cta }, index) => {
      gsap.set(picture, {
        scale: index === 0 ? 1 : 1.12,
        yPercent: index === 0 ? 0 : 5,
      });
      gsap.set(letters, { y: index === 0 ? 0 : below });
      if (cta) {
        gsap.set(cta, { autoAlpha: index === 0 ? 1 : 0, y: index === 0 ? 0 : 14 });
        const button = cta.querySelector('.cta-button');
        if (button) gsap.set(button, { clipPath: 'inset(0% 0% 0% 0%)' });
        gsap.set(cta.querySelectorAll('.split-letter, .menu-icon'), { y: 0 });
      }
      article.style.pointerEvents = 'none';
    });

    const setInteractive = (index) => {
      panels.forEach(({ article, cta }, i) => {
        article.style.pointerEvents = i === index ? 'auto' : 'none';
        if (cta) cta.style.pointerEvents = i === index ? 'auto' : 'none';
      });
    };

    // Each project owns a scroll segment. The first segment belongs to
    // Project 01, preventing Project 02 from revealing at pin entry.
    const indexAt = (progress) => clamp(
      0,
      count - 1,
      Math.floor(Math.max(0, progress - ENTRY_EPSILON) * count)
    );

    // Progress fills continuously according to native scroll position.
    // Each bar represents one equal segment of the pinned scroll range.
    const updateProgress = (progress) => {
      fills.forEach((fill, i) => {
        const amount = clamp(0, 1, progress * count - i);
        gsap.set(fill, {
          scaleX: amount,
          transformOrigin: 'left center',
        });
        bars[i]?.classList.toggle('pinned-bar-on', amount >= 1);
      });
    };

    // Animate both the incoming cover and its content independently of scroll.
    // On reverse, wipe away the upper panel to reveal the completed lower panel.
    const transitionTo = (index) => {
      if (index === revealedIndex) return;
      revealedIndex = index;

      panels.forEach(({ letters, cta, picture }, i) => {
        const wipe = wipes[i];
        gsap.killTweensOf(wipe.target);
        gsap.killTweensOf(picture);
        gsap.killTweensOf(letters);
        if (cta) gsap.killTweensOf(cta);

        // Panels below the selected one remain fully revealed; panels above
        // it are hidden. Only the boundary panel needs an animated wipe.
        const shouldShow = i <= index;
        const isBoundary = i === Math.max(index, previousIndex);
        const duration = isBoundary ? 0.62 : 0;

        gsap.to(wipe.target, {
          at: shouldShow ? 1 : 0,
          duration,
          ease: 'power2.inOut',
          onUpdate: wipe.onUpdate,
          overwrite: true,
        });
        gsap.to(picture, {
          scale: shouldShow ? 1 : 1.12,
          yPercent: shouldShow ? 0 : 5,
          duration,
          ease: 'power2.out',
          overwrite: true,
        });

        if (i === index) {
          gsap.fromTo(letters, { y: below }, {
            y: 0, duration: 0.42, stagger: { amount: 0.16 },
            ease: 'power2.out', overwrite: true,
          });
          if (cta) gsap.fromTo(cta, { autoAlpha: 0, y: 14 }, {
            autoAlpha: 1, y: 0, duration: 0.42, delay: 0.10,
            ease: 'power2.out', overwrite: true,
          });
        } else {
          gsap.set(letters, { y: i < index ? above : below });
          if (cta) gsap.set(cta, { autoAlpha: 0, y: i < index ? -10 : 14 });
        }
      });
      setInteractive(index);
      previousIndex = index;
    };

    let previousIndex = 0;
    updateProgress(0);
    setInteractive(0);

    const pin = count > 1 ? ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${Math.round(window.innerHeight * SCROLL_PER_PROJECT * count)}`,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        updateProgress(self.progress);
        transitionTo(indexAt(self.progress));
      },
      onEnter: () => transitionTo(0),
      onEnterBack: (self) => {
        updateProgress(self.progress);
        transitionTo(indexAt(self.progress));
      },
      onLeaveBack: () => { updateProgress(0); transitionTo(0); },
      onLeave: () => { updateProgress(1); transitionTo(count - 1); },
    }) : null;

    refreshSoon();

    return () => {
      pin?.kill();
      panels.forEach(({ letters, cta, picture }, i) => {
        gsap.killTweensOf(wipes[i].target);
        gsap.killTweensOf(picture);
        gsap.killTweensOf(letters);
        if (cta) gsap.killTweensOf(cta);
      });
      panels.forEach(({ article, picture, media, letters, cta }) => {
        article.style.removeProperty('pointer-events');
        gsap.set([picture, media, letters, cta].filter(Boolean), { clearProps: 'all' });
        if (cta) {
          const button = cta.querySelector('.cta-button');
          if (button) gsap.set(button, { clearProps: 'clipPath' });
          gsap.set(cta.querySelectorAll('.split-letter, .menu-icon'), { clearProps: 'transform' });
        }
      });
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
