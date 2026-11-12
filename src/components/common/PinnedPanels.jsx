
import React, { useEffect, useRef } from 'react';

// GSAP
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Components
import Tag from './Tag';
import SplitText from './SplitText';
import { TransitionLink } from './PageTransition';
import HalftoneGif from './HalftoneGif';

// Animation utilities
import { edgeWipe } from '../../utils/pixels';
import { refreshSoon } from '../../utils/scrollReveal';

gsap.registerPlugin(ScrollTrigger);

// Text animation helpers
const below = (i, el) => el.offsetHeight * 1.05;

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
      copy: article.querySelector('.pinned-panel-copy'),
      letters: article.querySelectorAll('.pinned-panel-copy .split-letter'),
      media: article.querySelector('.pinned-panel-media'),
      picture: article.querySelector('.pinned-panel-picture'),
    }));
    const count = panels.length;
    const fills = gsap.utils.toArray('.pinned-bar-fill', section);
    const clamp = gsap.utils.clamp;
    let revealedIndex = 0;

    // The pin tracks native scroll. Each project transition plays on its own
    // clock after entering the corresponding progress-bar segment.
    const wipes = panels.map(({ media }, index) => {
      const wipe = edgeWipe(media);
      wipe.target.at = index === 0 ? 1 : 0;
      wipe.onUpdate();
      return wipe;
    });

    panels.forEach(({ article, letters, picture }, index) => {
      gsap.set(picture, {
        scale: index === 0 ? 1 : 1.12,
        yPercent: index === 0 ? 0 : 5,
      });
      gsap.set(letters, { y: index === 0 ? 0 : below });
      gsap.set(article.querySelector('.pinned-panel-copy'), { autoAlpha: index === 0 ? 1 : 0 });
      article.style.pointerEvents = 'none';
    });

    const setInteractive = (index) => {
      panels.forEach(({ article }, i) => {
        article.style.pointerEvents = i === index ? 'auto' : 'none';
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
      });
    };

    // One transition at a time, and the copy only once the picture is in.
    // Scrolling down, the next picture builds over the last from its foot
    // up; scrolling back, the earlier one builds back over it from the top
    // down (raised above it while it does, then the later ones put away
    // under it). Every other panel's copy is hidden outright, so a fast
    // scroll that skips through several projects never leaves two sets of
    // copy on screen - the running transition is killed before the next
    // starts, and the next sets every panel where it should be.
    let current = null;
    const WIPE = 0.62;
    const transitionTo = (index) => {
      if (index === revealedIndex) return;
      revealedIndex = index;
      const back = index < previousIndex;
      current?.kill();
      current = gsap.timeline();

      panels.forEach(({ article, copy, letters, picture }, i) => {
        const wipe = wipes[i];
        gsap.killTweensOf([wipe.target, picture, letters]);
        article.style.zIndex = i + 1;
        // the copy waits, hidden, until the picture is all there
        gsap.set(letters, { y: below });
        gsap.set(copy, { autoAlpha: i === index ? 1 : 0 });

        if (i === index) {
          // the picture coming in: from its foot (down) or its top (back)
          wipe.target.dir = back ? 'down' : 'up';
          if (back) {
            article.style.zIndex = count + 1;
            wipe.target.at = 0;
            gsap.set(picture, { scale: 1.12, yPercent: -5 });
          }
          current.to(wipe.target, { at: 1, duration: WIPE, ease: 'power2.inOut', onUpdate: wipe.onUpdate }, 0);
          current.to(picture, { scale: 1, yPercent: 0, duration: WIPE, ease: 'power2.out' }, 0);
          return;
        }
        // the rest: those under it shown, those over it put away - going
        // back, only once the earlier picture has covered them
        const show = i < index;
        const settle = () => {
          wipe.target.at = show ? 1 : 0;
          wipe.onUpdate();
          gsap.set(picture, { scale: show ? 1 : 1.12, yPercent: show ? 0 : 5 });
        };
        if (back && !show) current.add(settle, WIPE);
        else settle();
      });
      if (back) current.add(() => { panels[index].article.style.zIndex = index + 1; }, WIPE);

      current.to(panels[index].letters, {
        y: 0, duration: 0.42, stagger: { amount: 0.16 }, ease: 'power2.out',
      }, WIPE);
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
      current?.kill();
      pin?.kill();
      panels.forEach(({ letters, picture }, i) => {
        gsap.killTweensOf(wipes[i].target);
        wipes[i].kill();
        gsap.killTweensOf(picture);
        gsap.killTweensOf(letters);
      });
      panels.forEach(({ article, picture, media, letters, copy }, i) => {
        article.style.removeProperty('pointer-events');
        article.style.zIndex = i + 1;
        gsap.set([picture, media, copy, ...letters].filter(Boolean), { clearProps: 'all' });
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

          {/* Project information - at the foot: its title and
            description in the lower left, its year and kind in the lower
            right (under the description on a phone or tablet). the
            section label, shared by every panel, is in the upper left -
            below */}
          <div
            className="pinned-panel-copy relative z-[2] h-full flex flex-col justify-end pointer-events-none
              mobile:px-[1rem] mobile:pt-16 mobile:pb-[calc(1rem_+_2px)]
              tablet:px-[1rem] tablet:pt-16 tablet:pb-[calc(1rem_+_2px)]
              laptop:px-[2rem] laptop:pt-20 laptop:pb-[calc(2rem_+_2px)]
              laptop-lg:px-[3rem] laptop-lg:pt-24 laptop-lg:pb-[calc(3rem_+_2px)]
              desktop:px-[3rem] desktop:pt-28 desktop:pb-[calc(3rem_+_2px)]"
          >
            <div
              className="flex justify-between items-end gap-x-8
                mobile:flex-col mobile:items-start mobile:gap-y-6
                tablet:flex-col tablet:items-start tablet:gap-y-6"
            >
              {/* Lower-left project title and description */}
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

              {/* Lower-right: its year and kind */}
              <p
                className="shrink-0 flex flex-col text-caption
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
                    className="flex flex-wrap whitespace-nowrap"
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
          </div>

          {/* The whole panel opens its project; over it the cursor says so,
            as over the work page's cards (Cursor.jsx). Under the copy,
            which lets the pointer through; clickable only while its panel
            is the one up (setInteractive). */}
          {item.to && (
            <TransitionLink
              to={item.to}
              className="absolute inset-0 z-[1] block"
              data-cursor={item.action || 'View'}
              data-no-hover-roll
              aria-label={`View ${item.title}`}
            />
          )}
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

      {/* Section label - upper left */}
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
