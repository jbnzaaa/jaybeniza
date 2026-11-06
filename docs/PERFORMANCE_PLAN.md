# Performance Plan

A phased plan to raise the PageSpeed Insights scores of https://jaybeniza.vercel.app.
Each phase is shipped and measured before the next one starts.

## Baseline (2026-11-06)

Performance, 3 runs each (Phase 0):

| Run | Mobile | Desktop |
|---|---|---|
| 1 | 87 | 84 |
| 2 | 89 | 95 |
| 3 | 92 | 96 |
| **Median** | **89** | **95** |

Desktop run 1 was an outlier, probably a cold cache on the first request.
Desktop already meets the 90+ target. Mobile is 1 point short of it.

Run 1 in full:

| Category | Mobile | Desktop |
|---|---|---|
| Performance | 87 | 84 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |
| Agentic Browsing | 2/4 | 2/4 |

| Metric (weight) | Mobile | Desktop |
|---|---|---|
| First Contentful Paint (10%) | 1.9 s | 0.2 s |
| Speed Index (10%) | 6.1 s | 2.2 s |
| Largest Contentful Paint (25%) | 2.3 s | 0.2 s |
| Total Blocking Time (30%) | 250 ms | 290 ms |
| Cumulative Layout Shift (25%) | 0.034 | 0.002 |

The metric figures are from run 1 only. Use the median scores above as the baseline.

Screenshots: `src/assets/pagespeed-insights/`.

**Target:** 90+ Performance on both, 4/4 Agentic Browsing, other categories kept at 100.
A Performance score of 100 is not a goal: it would mean removing the loading screen and most of the scroll animation.

## Phase 0: Measure properly

PageSpeed scores move by about ±5 between runs.

1. Run PageSpeed Insights 3 times for each of mobile and desktop.
2. Record the middle (median) result of each.
3. After every phase, measure again the same way. Compare medians, not single runs.

## Phase 1: Quick wins, no visual change

**Status (2026-11-06): done locally, not yet measured.**

- `AyrGaron-Bold.otf` (54.8 KB) and `Gilgan-Regular.otf` (24.0 KB) were converted to WOFF2: 21.0 KB and 13.7 KB.
- The three first-screen faces now live in `public/fonts/`. They are declared and preloaded in `public/index.html`, and cached for a year (`vercel.json`).
- `public/llms.txt` was added.
- The ARD manifest was skipped.
- Measure after deploying (Phase 0 method).

Expected: mobile about 88–90, desktop about 85–86, Agentic Browsing 4/4.

1. **Convert fonts to WOFF2.** `AyrGaron-Bold.otf` and `Gilgan-Regular.otf` are uncompressed OpenType. WOFF2 is roughly half the size.
2. **Preload the hero fonts.** Add `<link rel="preload" as="font" type="font/woff2" crossorigin>` for Ayr Garon, Gilgan and Jersey 10 in `public/index.html`.
   - Without it, they are found only after the CSS loads (a chain of about 2.9 s on mobile).
   - The loading screen waits for these fonts (`Preloader.jsx`, up to 4 s). Faster fonts end the loader sooner, which improves Speed Index and FCP.
   - Preloading Jersey 10 also removes the small layout shift caused by the pixel letters swapping in.
3. **Add `public/llms.txt`.** Start it with a `# Jay Beniza` heading and a short summary of the site and its pages.
   - Today the request falls through to `index.html`, which fails the "missing H1" check.
4. **Agent manifest (ARD).** Either add a valid JSON manifest at the path the audit requests, or accept this check as failed.
   - Today the request also gets `index.html` back.

## Phase 2: Lighter JavaScript

**Status (2026-11-06): done locally, not yet measured.** `main.js` went from 601.7 KB to 442.0 KB minified (−27%), 151.8 KB gzipped.

- The title emphasis settings moved from `projects.js` to `projects/emphasis.js`. The landing page and the Work grid no longer load every case study's content (74 KB) or the archive image index (10 KB).
- `.env` sets `IMAGE_INLINE_SIZE_LIMIT=0`. Three testimonial portraits (26 KB of base64) were inlined into `main.js`; they are now separate files.
- `SplitText.jsx` no longer uses `\p{L}`-style regexes. Babel expanded them into about 30 KB of character tables.
- What remains is mostly `react-dom` (130 KB) and GSAP with ScrollTrigger and ScrollSmoother (126 KB). The site needs both.

Expected: a small Total Blocking Time gain. About 63 KB of `main.js` is unused on the home page.

1. Inspect the bundle with `source-map-explorer` to see what `main.js` contains.
2. Move data the home page does not need out of the main bundle. For example, `ARCHIVE` is imported eagerly in `App.jsx`.
3. Pages are already loaded on demand (`lazy()` in `App.jsx`). Check that no page module is also imported statically somewhere else.

## Phase 3: Less main-thread work

**Status (2026-11-06): done locally.** Measured with local Lighthouse 12 on a production build (`serve -s build`), 2 runs each. These are not PageSpeed numbers; PageSpeed runs on other hardware.

| | Mobile | Desktop |
|---|---|---|
| Before Phase 3 (Phases 1 and 2 in) | 87, LCP 3.8 s, TBT 110 ms, CLS 0.025 | 98, CLS 0.079 |
| After | 92–93, LCP 3.0 s, TBT 70 ms, CLS 0 | 100, CLS 0.005 |

- **Title blocks** now animate with `transform: scaleX` instead of `left` and `width`. Chrome had counted each frame of those as a layout shift; transforms also cost no layout. This applies to `pixelText.js` and to `blockToggle` in `pixels.js`.
- **Landing page sections:** the sections below the hero mount 700 ms after it, then when the browser is idle (`Home.jsx`). The hero's title no longer waits for every section's split text and animation setup.
- **Other pages' code** is fetched in the background 3 s after the page is up, then when idle (`App.jsx`). Before, it was fetched at the first idle moment, so every page's code, all project content included, ran before the hero was drawn.
- **Still open:** mobile LCP (3.0 s, simulated). It is mostly render delay: the loading screen, then the hero's reveal. Shortening it means changing the loading screen (Phase 4).

Expected: Total Blocking Time under 150 ms. Desktop about 90–94, mobile about 90–93.

1. **Batch layout reads.** Lighthouse reports forced reflow (about 140–230 ms). Cause: GSAP setup reads sizes (`offsetHeight`, `getBoundingClientRect`) between style writes. Read all sizes first, then write.
2. **Defer below-the-fold animation setup.** Set up the hero first. Create the ScrollTriggers for lower sections in an idle callback (`requestIdleCallback`), before the visitor can scroll to them.
3. **Fewer split elements.** Per-letter splitting creates thousands of elements, which drives the about 800 ms of style and layout work. Keep per-letter splitting for titles. Use per-word or per-line splitting for longer text.
4. Measure the startup cost of `pixelEdges` and `enableHoverRoll`. Defer them if they are significant.

## Phase 4: Loading screen (design decision)

**Status (2026-11-06): skipped by decision.** The loading screen stays as it is, on every visit, as part of the brand experience (option C).

Expected: mobile and desktop about 95–98. Needs the designer's approval before any change.

Speed Index is high because the page is not mounted until the loading screen starts leaving. Options:

- **A. First visit only:** remember the visit in `sessionStorage` and skip the loader on reloads and return visits. Lighthouse still sees it, so the gain shows mostly for real visitors.
- **B. Render under the loader:** mount the hero behind the loading screen so it paints straight away. This helps the measured score most.
- **C. Keep as is:** accept a lower mobile Speed Index as part of the brand experience.

## Phase 5: Verify

1. `npm run build` must pass.
2. Visually check every animated section on a phone and a desktop, especially the hero, the Areas of Expertise pin and the page transitions.
3. Run Phase 0 again and record the results in this file.

## Not worth fixing

- **Source-map warning:** the `.map` files are not deployed, so the HTML page comes back instead. It does not affect any score.
- **Render-blocking CSS:** 13 KB, an estimated 300 ms on mobile. Inlining it adds complexity for little gain.
