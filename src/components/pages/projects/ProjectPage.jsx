//
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollSmoother from 'gsap/ScrollSmoother'
// the site's button and section label
import Button from '../../common/Button'
import Tag from '../../common/Tag'
// scroll reveal
import { scrollReveal, scrollRevealSequence, scrollRevealCards, REVEAL_AT, REVERSE_AT } from '../../../utils/scrollReveal'
// a colleague's picture opens in pixels, as on the landing page's testimonials
import { wipeToggle, pixelWipe } from '../../../utils/pixels'
// per-letter text split
import SplitText from '../../common/SplitText'
// every project's content - for the link to the next one
import { PROJECTS, titleEmphasis } from './projects'
// the archive's projects - which run in their own order
import { ARCHIVE } from './archive'
// the closing section - the landing page's contact block, here leading
// on to the next project
import Contact from '../Contact'
// the tab's title
import { usePageTitle } from '../../../utils/pageTitle'
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

// the order the projects run in, for "next project": the work page's own
// list, in its order (ProjectsPage.jsx) - newest first, and back to the
// first after the last. a project that is not on that list (DailyDiscount)
// is never offered as the next one, and leads on to the first
const ORDER = ['gurover', 'tingi', 'portfoliov3', 'comelec', 'psgs', 'pci', 'aaccup', 'arise', 'courseware', 'regain'];
// an archived project leads on to the next in the archive, and back to its
// first after its last
const ARCHIVE_ORDER = ARCHIVE.map(({ id }) => id).filter((key) => PROJECTS[key]);

// the placeholder screens of a project with none yet: two columns from
// tablet width up, one on a phone (its real screens are a bento - Bento)
const SCREEN_GAP = 'mobile:mb-6 tablet:mb-6 laptop:mb-6 laptop-lg:mb-6 desktop:mb-6';
const SCREEN_RUN = 'mobile:columns-1 tablet:columns-2 laptop:columns-2 laptop-lg:columns-2 desktop:columns-2 gap-x-6';

// what a case study that is still being written will cover, once it is:
// the parts of the finished layout, in order
const COMING = [
  'Challenge and my role',
  'Discovery and key insight',
  'User flow and design process',
  'Key design decisions',
  'Final product and design system',
  'Outcome and reflection',
];

// every project is shown in its key parts only, so a page reads in a
// few screens: its key screens, at most this many (after the cover) and
// at most this many under a section; a case study's key sections (not
// `extra`); and a platform's problem, role, key decisions (at most
// KEY_DECISIONS), screens and results. the rest stays in projects.js -
// and, for a project with `behance`, in the full case study there
const KEY_SHOTS = 4;
const KEY_DECISIONS = 3;

// the two section themes the page alternates between, as on the landing page
const LIGHT = 'theme-light';
const DARK = 'bg-surface';

// the padding every section on the page shares - tighter than the
// landing page's: a case study runs to a dozen sections, and at the
// landing page's padding it was a long scroll
const SECTION = `
  mobile:px-[1rem] mobile:py-12
  tablet:px-[1rem] tablet:py-12
  laptop:px-[2rem] laptop:py-16
  laptop-lg:px-[3rem] laptop-lg:py-16
  desktop:px-[3rem] desktop:py-20`;

// the space under a block inside a section
const BELOW = 'mobile:mb-8 tablet:mb-10 laptop:mb-12 laptop-lg:mb-12 desktop:mb-16';

// the space over a full width run under a section's text
const ABOVE = 'mobile:mt-2 tablet:mt-2 laptop:mt-4 laptop-lg:mt-6 desktop:mt-6';

// the right-hand columns every section's content sits in
const CONTENT = `
  mobile:col-span-8
  tablet:col-span-8
  laptop:col-span-6 laptop:col-start-3
  laptop-lg:col-span-6 laptop-lg:col-start-3
  desktop:col-span-6 desktop:col-start-3`;

// cards side by side (a section's cards, and the figures in Results &
// Impact), never narrower than about 260px: they sit in the right-hand
// columns (CONTENT, six of the eight), which hold two such cards up to laptop-lg width
// (about 710-1070px) and three from desktop width. four never fit,
// so four go two by two; three go three across on desktop only. one
// under another on a phone
const FIGURES = {
  1: 'grid-cols-1',
  2: 'mobile:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-2 laptop-lg:grid-cols-2 desktop:grid-cols-2',
  3: 'mobile:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-2 laptop-lg:grid-cols-2 desktop:grid-cols-3',
  4: 'mobile:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-2 laptop-lg:grid-cols-2 desktop:grid-cols-2',
};
// the last of an odd number, where they go two to a row, takes the row
// to itself rather than leave a gap beside it (three are a row of their
// own on desktop)
const lastAlone = (i, count) => {
  if (count < 3 || count % 2 === 0 || i !== count - 1) return '';
  return count === 3
    ? 'tablet:col-span-2 laptop:col-span-2 laptop-lg:col-span-2'
    : 'tablet:col-span-2 laptop:col-span-2 laptop-lg:col-span-2 desktop:col-span-2';
};
// the room between a card's top and its foot: more for a lone card,
// which takes the full width
const FIGURE_ROOM = 'mobile:gap-y-8 tablet:gap-y-12 laptop:gap-y-16 laptop-lg:gap-y-20 desktop:gap-y-24';
const ONE_FIGURE_ROOM = 'mobile:gap-y-16 tablet:gap-y-20 laptop:gap-y-28 laptop-lg:gap-y-32 desktop:gap-y-40';

// a card inside a section: one shade up from it, with the dark theme's text
const CARD = `theme-dark bg-card m-0
  mobile:p-6
  tablet:p-6
  laptop:p-6
  laptop-lg:p-6
  desktop:p-6`;

/**
 * One section of the case study: its boxed label in the left columns,
 * its content in the right - stacked below
 * laptop width. `wide` puts the content under the label at full width
 * instead; `below` is a full width run (of images, say) under a section
 * that keeps its text beside the label.
 */
function CaseSection({ id, title, theme, wide = false, below, children }) {
  return (
    <section className={`${theme} grid grid-cols-8 gap-x-6 ${SECTION}
      mobile:gap-y-6
      tablet:gap-y-8
      laptop:gap-y-8
      laptop-lg:gap-y-10
      desktop:gap-y-10`}
      id={`case-${id}`}>
      <div className={wide ? 'col-span-8' : `
        mobile:col-span-8
        tablet:col-span-8
        laptop:col-span-2
        laptop-lg:col-span-2
        desktop:col-span-2`}>
        <Tag label={title} id={`animate-case-tag-${id}`} />
      </div>
      <div className={wide ? 'col-span-8' : CONTENT}>
        {children}
      </div>
      {below && <div className={`col-span-8 ${ABOVE}`}>{below}</div>}
    </section>
  )
}

// a paragraph of the case study
function Copy({ id, text, className = '' }) {
  return (
    <p className={`flex flex-wrap text-body leading-snug ${className}`}>
      <SplitText text={text} id={`animate-case-${id}`} by='word' />
    </p>
  )
}

// a short list under a small label
function Points({ id, label, items, className = '' }) {
  return (
    <div className={className}>
      <p className='text-caption text-muted mb-4'>
        <SplitText text={label} id={`animate-case-${id}`} />
      </p>
      <ul className='flex flex-col'>
        {items.map((item) => (
          <li className='relative flex flex-wrap py-4 m-0 text-caption' key={item}>
            <span className='case-rule' aria-hidden='true' />
            <SplitText text={item} id={`animate-case-${id}`} by='word' />
          </li>
        ))}
      </ul>
    </div>
  )
}

// a list of named notes as cards - the site's own card, as in "How I
// work" (Process.jsx): its number at the top, its name and note at the
// bottom. laid out as Results & Impact's figures are, side by side, as
// many to a row as fit at a readable width (FIGURES)
// (the cards of a section open together, in order, as the site's cards
// do - .case-cards, revealed in ProjectPage below with scrollRevealCards)
// the name is sized to its own card (the card is a size container), not
// to the screen: set in capitals, the longest single word in a card name
// (PERSONALIZATION, 15 letters) runs about 11em wide, so at 6.5% of the
// card's width it always fits inside the card's padding - where a size
// set by the screen ran past the edge of a card two to a row and was cut
// off. never under 1rem, never over the section heading's 1.875rem
const CARD_NAME = 'text-[length:clamp(1rem,6.5cqi,1.875rem)]';
// the room under a card's number: more for a lone card, which takes the
// full width (as FIGURE_ROOM and ONE_FIGURE_ROOM)
const NUMBER_ROOM = 'mobile:mb-8 tablet:mb-12 laptop:mb-16 laptop-lg:mb-20 desktop:mb-24';
const ONE_NUMBER_ROOM = 'mobile:mb-16 tablet:mb-20 laptop:mb-28 laptop-lg:mb-32 desktop:mb-40';
// a card's number, name and note each sit on a row line shared with the
// cards beside it (subgrid): a name that wraps to two lines moves every
// name's note down with it, so names line up with names and notes with
// notes across a row
const LINED = 'grid row-span-3 [grid-template-rows:subgrid] gap-y-0';
function Cards({ id, items }) {
  return (
    <ol className={`case-cards grid gap-4 ${FIGURES[Math.min(items.length, 4)]}`} id={`case-cards-${id}`}>
      {items.map((item, i) => (
        <li className={`reveal-card theme-dark bg-card m-0 [container-type:inline-size] ${LINED} ${lastAlone(i, items.length)}`} id={`case-card-${id}-${i}`} key={item.title}>
          <div className={`reveal-card-inner ${LINED} p-6`}>
            <p className={`text-caption text-muted ${items.length > 1 ? NUMBER_ROOM : ONE_NUMBER_ROOM}`}>
              <SplitText text={String(i + 1).padStart(2, '0')} id='animate-card' />
            </p>
            {/* (a one-line name sits at the foot of its row, by its note) */}
            <h3 className={`self-end flex flex-wrap font-flexible font-medium leading-none ${CARD_NAME} mb-4`}>
              <SplitText text={item.title} id='animate-card' emphasis='letters' />
            </h3>
            <p className='self-start flex flex-wrap text-caption text-muted'>
              <SplitText text={item.text} id='animate-card' by='word' />
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}

// a case study's lead - the one line a section turns on, set large
function Lead({ id, text, className = '' }) {
  return (
    <h3 className={`flex flex-wrap font-flexible font-medium leading-[.95] tracking-tight text-heading ${className}`}>
      <SplitText text={text} id={`animate-case-${id}`} emphasis='letters' />
    </h3>
  )
}

// notes under small labels, one under another: a decision's challenge,
// solution and rationale
function Notes({ id, items, className = '' }) {
  return (
    <dl className={`flex flex-col ${className}`}>
      {items.map(({ label, text }) => (
        <div className='relative py-4' key={label}>
          <span className='case-rule' aria-hidden='true' />
          <dt className='text-caption text-muted mb-2'>
            <SplitText text={label} id={`animate-case-${id}`} />
          </dt>
          <dd className='flex flex-wrap text-caption m-0'>
            <SplitText text={text} id={`animate-case-${id}`} by='word' />
          </dd>
        </div>
      ))}
    </dl>
  )
}

// a decision's screens as a bento box, in the section's content column
// (under its notes, the same width). they are set in rows - how many to a
// row chosen so every screen stays large enough to read (rowsOf, clearest:
// the same every visit, seeded by the decision's name) - and each row is
// justified: every screen keeps its own proportions, uncut, and takes a
// share of the row's width by how wide it is for its height, so the
// screens of a row stand one height and the row fills the column. on a
// phone, two to a row, the first alone when there is an odd one out
const PHONE = '(max-width: 767px)';
// a string's own steady random numbers (mulberry32, seeded by its hash)
function seeded(text) {
  let seed = [...text].reduce((hash, char) => Math.imul(hash ^ char.charCodeAt(0), 16777619), 2166136261) >>> 0;
  return () => {
    seed = (seed + 0x6D2B79F5) >>> 0;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
// the rows, the clearest (clearest, below) of every way of setting the
// screens out that keeps each one large enough to read, in the bento's
// own width: no screen narrower than ROWS.least (a phone screen, taller
// than wide, can be narrower than a wide one), no row taller than
// ROWS.tallest of the window, nor wider for its height than ROWS.max (a
// strip). on a phone, wide screens go one to a row and phone screens two.
// where no way keeps to all of that, the rules give way one at a time:
// the height first, then the widths
// (the gap between screens)
const BENTO_GAP = 16;
const ROWS = {
  least: { wide: 320, tall: 140 },
  tallest: .9,
  max: 4.4,
};
const PHONE_ROWS = { min: .4, max: 2.4, share: .4 };
// how readable a way of setting the screens out is: each screen's width
// against the width of the screen it was taken from (a phone's narrower
// than a desktop's, READ_WIDTH), its smallest - and how tall it stands in
// all. the clearest way is the one whose smallest screen reads the
// largest; of the ways within READ_SLACK of it, the shortest, then one at
// random (the same every visit)
const READ_WIDTH = { wide: 1440, tall: 400 };
const READ_SLACK = .9;
function clearest(ways, ratios, width, seed) {
  const measure = (way) => {
    let at = 0;
    let least = Infinity;
    let height = 0;
    way.forEach((size) => {
      const row = ratios.slice(at, at += size);
      const total = row.reduce((sum, ratio) => sum + ratio, 0);
      const tall = (width - (size - 1) * BENTO_GAP) / total;
      height += tall;
      row.forEach((ratio) => { least = Math.min(least, (tall * ratio) / READ_WIDTH[ratio < 1 ? 'tall' : 'wide']); });
    });
    return { least, height };
  };
  const measured = ways.map((way) => ({ way, ...measure(way) }));
  const best = Math.max(...measured.map(({ least }) => least));
  const near = measured.filter(({ least }) => least >= best * READ_SLACK);
  const shortest = Math.min(...near.map(({ height }) => height));
  const picks = near.filter(({ height }) => height <= shortest * 1.05);
  return picks[Math.floor(seeded(seed)() * picks.length)].way;
}
// a decision's rows, of the kind GuRover's second decision has: rows of
// one screen at the full width and rows of two side by side, in an order
// drawn at random for each decision (the same every visit, seeded by its
// name) - never two full-width rows one after another. a phone screen
// (taller than wide) is never left alone in a row: it takes the last
// screen of a pair before it as its partner, or else joins the row before
// it (or, first of all, the one after)
function alternating(ratios, seed) {
  const random = seeded(seed);
  const rows = [];
  for (let at = 0; at < ratios.length;) {
    const lastAlone = rows.length > 0 && rows[rows.length - 1].length === 1;
    const size = Math.min(lastAlone || random() < .5 ? 2 : 1, ratios.length - at);
    rows.push(ratios.slice(at, at + size).map((_, k) => at + k));
    at += size;
  }
  const kept = [];
  rows.forEach((row, i) => {
    const lonePhone = row.length === 1 && ratios[row[0]] < 1 && rows.length > 1;
    const before = kept[kept.length - 1];
    if (lonePhone && before?.length === 2) { kept.push([before.pop(), ...row]); }
    else if (lonePhone && before) before.push(...row);
    else if (lonePhone) rows[i + 1].unshift(...row);
    else kept.push(row);
  });
  return kept.map((row) => row.length);
}
function rowsOf(ratios, seed, phone, width = 1000, height = 900) {
  const count = ratios.length;
  const tries = phone ? [{ phone: true }, { phone: true, loose: true }] : [
    { singles: Infinity, tall: true, least: true },
    { singles: Infinity, least: true },
    { singles: Infinity },
  ];
  for (const rule of tries) {
    const fits = (from, size) => {
      const row = ratios.slice(from, from + size);
      const total = row.reduce((sum, ratio) => sum + ratio, 0);
      if (rule.phone) return rule.loose ? size <= 2 : total >= PHONE_ROWS.min && total <= PHONE_ROWS.max && row.every((ratio) => ratio / total >= PHONE_ROWS.share);
      const room = width - (size - 1) * BENTO_GAP;
      if (total > ROWS.max) return false;
      if (rule.tall && room / total > height * ROWS.tallest) return false;
      return !rule.least || row.every((ratio) => room * ratio / total >= ROWS.least[ratio < 1 ? 'tall' : 'wide']);
    };
    // every way, from a screen on (with how many rows of one it takes)
    const ways = [];
    const walk = (at, rows, singles) => {
      if (ways.length >= 500) return;
      if (at === count) { ways.push(rows); return; }
      for (let size = 1; size <= Math.min(6, count - at); size++) {
        const single = size === 1 ? 1 : 0;
        if (singles + single <= (rule.singles ?? Infinity) && fits(at, size)) walk(at + size, [...rows, size], singles + single);
      }
    };
    walk(0, [], 0);
    if (!ways.length) continue;
    // (kept to the height, any of them; past it, the one whose tallest
    // row is the least tall)
    if (rule.phone && !rule.loose) return ways[Math.floor(seeded(seed)() * ways.length)];
    // (kept to the height: the way that shows its smallest screen the
    // largest, so no screen is too small to read; among those near it, the
    // shortest)
    if (rule.tall) return clearest(ways, ratios, width, seed);
    const tallestOf = (way) => {
      let at = 0;
      return Math.max(...way.map((size) => {
        const total = ratios.slice(at, at += size).reduce((sum, ratio) => sum + ratio, 0);
        return (width - (size - 1) * BENTO_GAP) / total;
      }));
    };
    return ways.reduce((best, way) => (tallestOf(way) < tallestOf(best) ? way : best));
  }
  // (none at all: one to a row)
  return Array(count).fill(1);
}
function usePhone() {
  const [phone, setPhone] = useState(() => window.matchMedia(PHONE).matches);
  useEffect(() => {
    const query = window.matchMedia(PHONE);
    const change = () => setPhone(query.matches);
    query.addEventListener('change', change);
    return () => query.removeEventListener('change', change);
  }, []);
  return phone;
}
function Bento({ items, seed, steady = false, turn = 0, grid = false, onLoad, className = ABOVE }) {
  const phone = usePhone();
  // how wide it is for the window's height: no row is let stand taller
  // than the window (read again as either changes)
  const fxBox = useRef();
  const [room, setRoom] = useState({ width: 1000, height: 900 });
  useEffect(() => {
    const box = fxBox.current;
    const read = () => setRoom((was) => (was.width === box.clientWidth && was.height === window.innerHeight ? was : { width: box.clientWidth, height: window.innerHeight }));
    read();
    const watch = new ResizeObserver(read);
    watch.observe(box);
    window.addEventListener('resize', read);
    return () => { watch.disconnect(); window.removeEventListener('resize', read); };
  }, []);
  // each screen's proportions, read before it is shown (wide until then).
  // the screens are one run, not rows of their own: a row is only the
  // widths they are given, so they stay the same elements - and keep
  // their reveals - when the rows are drawn again
  const [ratios, setRatios] = useState({});
  useEffect(() => {
    let live = true;
    items.forEach(({ src, alt }) => {
      const image = new Image();
      image.onload = () => {
        if (!live) return;
        const ratio = image.naturalWidth / image.naturalHeight;
        setRatios((known) => (known[alt] === ratio ? known : { ...known, [alt]: ratio }));
      };
      image.src = src;
    });
    return () => { live = false; };
  }, [items]);
  useEffect(() => { onLoad?.(); }, [ratios, phone, room, onLoad]);
  const shape = items.map(({ alt }) => ratios[alt] || 16 / 9);
  // (not on a phone: its window grows and shrinks with the address bar)
  // (a decision's - steady - in turn, as alternating sets out, where it
  // has a wide screen; otherwise, and on a phone, rowsOf's)
  // (a decision whose shots are a `grid` - DOST Courseware - two to a
  // row, every screen the same size)
  const rows = grid && !phone
    ? Array.from({ length: Math.ceil(shape.length / 2) }, (_, k) => Math.min(2, shape.length - k * 2))
    : steady && !phone && shape.some((ratio) => ratio >= 1)
    ? alternating(shape, seed)
    : rowsOf(shape, seed, phone, room.width, room.height);
  // each screen's width: its share of its row, after the row's gaps
  const widths = [];
  // where each screen stands: in its row's order, or - a decision's
  // (steady) - every other row of several set right to left, starting
  // from the other side on every other decision (turn), so the smaller
  // screens do not all fall on the same side
  const order = [];
  let at = 0;
  rows.forEach((size, r) => {
    const row = shape.slice(at, at + size);
    const total = row.reduce((sum, ratio) => sum + ratio, 0);
    const back = steady && size > 1 && (turn + r) % 2 === 1;
    row.forEach((ratio, k) => {
      widths.push(`calc((100% - ${(size - 1) * BENTO_GAP}px) * ${ratio / total} - .5px)`);
      order.push(at + (back ? size - 1 - k : k));
    });
    at += size;
  });
  // a grid of five: the first screen large, two rows tall, and the other
  // four two by two beside it - an odd one out would otherwise stand
  // alone, full width, under the rest
  if (grid && !phone && items.length === 5) {
    const side = (turn % 2) === 1;
    return (
      <div ref={fxBox} className={`grid grid-cols-4 ${className}`} style={{ gap: BENTO_GAP }}>
        {items.map(({ src, alt }, i) => (
          <div className='screenshot-container bg-card' key={alt}
            style={i === 0
              ? { gridColumn: side ? '3 / span 2' : '1 / span 2', gridRow: '1 / span 2' }
              : { aspectRatio: shape[i] }}>
            <img src={src} alt={alt} className='screenshot-img w-full h-full object-cover' loading='lazy' onLoad={onLoad}/>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div ref={fxBox} className={`flex flex-wrap justify-between ${className}`} style={{ rowGap: BENTO_GAP }}>
      {items.map(({ src, alt }, i) => (
        <div className='screenshot-container bg-card' style={{ width: widths[i], aspectRatio: shape[i], order: order[i] }} key={alt}>
          <img src={src} alt={alt} className='screenshot-img h-full' loading='lazy' onLoad={onLoad}/>
        </div>
      ))}
    </div>
  )
}

// where an image will go: the site's image placeholder - a pale panel
// crossed corner to corner, as a picture box is drawn in a wireframe
// (.project-placeholder, App.css) - that says what belongs in it
function Panel({ label, className = '' }) {
  return (
    <div className={`case-panel theme-light project-placeholder flex flex-col justify-between p-6 ${className}`}>
      <span className='flex flex-wrap text-caption text-muted'><SplitText text='Image in progress' /></span>
      <span className='flex flex-wrap font-flexible font-medium leading-none text-heading text-muted'><SplitText text={label} /></span>
    </div>
  )
}

/**
 * A project page, in one of four layouts.
 *
 * A platform - a project with `platform` in projects.js, a product made
 * for a client or company - is its hero, its cover, then the challenge it
 * answered (or, without one, an overview), my role and contributions, the
 * design approach, its screens, the design system, and what it achieved -
 * each only when its `platform` has it written, so no part shows a
 * placeholder, and each in its key parts (KEY_SHOTS, KEY_DECISIONS). The sections it has turn light and dark in turn.
 *
 * A case study in progress - a project with `inProgress` - is its hero,
 * its cover, and a note that the write-up is to come.
 *
 * A build - a project with no `caseStudy` in projects.js, which is every
 * web development project - is shown as what it is: the hero, the cover,
 * an overview (what it is, when it has an `overview`, then my role and
 * what it was built with), then its screens,
 * and the link to the next project. No research or process sections it
 * has nothing to put in.
 *
 * A case study - a project that has a `caseStudy` - is its hero, its
 * cover, then its own sections in the order it gives them, and the link to
 * the next project - in the landing page's design: light and dark
 * sections in turn, each under a small boxed label, with its written
 * content in the same right-hand columns and its screens full width under
 * it. A section (projects.js) has a `title` for its label and any of: a
 * `lead` line set large, `text` (a paragraph, or a list of them),
 * `notes` (labelled paragraphs), `cards` (side by side, up to four to a row), `points` (a labelled list) and
 * `shots` (its screens, and their `layout`).
 *
 * The project is given whole, or by its key in PROJECTS as `id` - the
 * routes give the key, so projects.js stays out of the first download
 * (App.jsx).
 */
function ProjectPage({ project: given, id }) {
  const project = given || PROJECTS[id];
  usePageTitle(project.title, project.description);
  // which layout: a case study, a platform, or a build
  const isStudy = !!project.caseStudy;
  const isDraft = !!project.inProgress;
  const isPlatform = !!project.platform;
  const platform = project.platform || {};
  // (a project may have no screenshots yet: panels stand in for them)
  // (with its full case study on Behance, the page closes on the link to it)
  const short = !!project.behance;
  const [hero, ...allShots] = project.screenshots || [];
  const shots = allShots.slice(0, KEY_SHOTS);
  // (the same list from one render to the next, for the bento to read once)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const screens = useMemo(() => shots.flatMap((shot) => shot.phones || [shot]), [project]);
  // (a row of six cut to four is set four to a row)
  const keyShots = ({ items, layout }) => ({
    items: items.slice(0, KEY_SHOTS),
    layout: layout === 'six' && items.length > KEY_SHOTS ? 'quad' : layout,
  });
  const studyParts = (project.caseStudy || [])
    .filter((part) => !part.extra)
    .map((part) => (part.shots ? { ...part, shots: keyShots(part.shots) } : part));
  // a platform's sections: only those it has written, light and dark in turn
  // (the overview only where there is no challenge: the hero's summary
  // already says what it is. its features are in its contributions and
  // decisions, and are left out)
  // (what it achieved comes first, under the cover: the proof before the
  // story. what colleagues said - `quote` - is not shown)
  // a platform whose decisions each have a `challenge` sets them out as
  // a case study does (BiteWise): a section to each - its name, then the
  // challenge, the solution (`text`) and the rationale, with its screens
  // (`shots`) under it. a decision's screens take the place of the
  // screens section
  const decisions = [].concat(platform.approach || []).slice(0, KEY_DECISIONS);
  const asDecisions = decisions.length > 0 && decisions.every((decision) => decision.challenge);
  const shotsInDecisions = asDecisions && decisions.some((decision) => decision.shots);
  const platformParts = [
    (platform.outcome || platform.metrics) && 'outcome',
    platform.overview && !platform.challenge && 'overview',
    platform.challenge && 'challenge',
    (platform.role || platform.contributions) && 'role',
    ...(asDecisions ? decisions.map((_, i) => `decision-${i}`) : [platform.approach && 'approach']),
    shots.length > 0 && !shotsInDecisions && 'screens',
    platform.system && 'system',
  ].filter(Boolean);
  const themeOf = (part) => (platformParts.indexOf(part) % 2 ? DARK : LIGHT);
  const has = (part) => platformParts.includes(part);
  // a build's overview: what it is, a paragraph to each entry
  const overview = [].concat(project.overview || []);
  // (a design with no build - an archived project - has no tools to list,
  // and leaves the section out: its role is in the hero)
  const hasOverview = overview.length > 0 || project.technologies.length > 0;
  // the link to the full case study closes the page, after the sections
  // before it, in the next theme in turn
  const sectionCount = isDraft ? 1 : isStudy ? studyParts.length : isPlatform ? platformParts.length : hasOverview ? 2 : 1;
  const order = ARCHIVE_ORDER.some((key) => PROJECTS[key] === project) ? ARCHIVE_ORDER : ORDER;
  const here = order.findIndex((key) => PROJECTS[key] === project);
  const next = PROJECTS[order[(here + 1) % order.length]];
  // (and the one before it, the last for the first - or for a project not on the list)
  const previous = PROJECTS[order[((here < 0 ? 0 : here) - 1 + order.length) % order.length]];

  // the screenshots have no size until they load, so the page grows after
  // it mounts and everything below them moves down. re-measure the scroll
  // triggers once the loads settle - one refresh for a burst of images
  const remeasure = useCallback(() => {
    clearTimeout(remeasure.timer);
    remeasure.timer = setTimeout(() => ScrollTrigger.refresh(), 150);
  }, []);

  // the name keeps the heroes' shared size - unless a word of it is wider
  // than its column (a word never breaks: SplitText), when the name is set
  // just small enough for that word to fit. again on every resize
  const fxTitle = useRef();
  useLayoutEffect(() => {
    const title = fxTitle.current;
    const fit = () => {
      title.style.fontSize = '';
      const widest = Math.max(...[...title.querySelectorAll('.split-word')].map((word) => word.scrollWidth));
      if (widest > title.clientWidth) {
        title.style.fontSize = `${parseFloat(getComputedStyle(title).fontSize) * title.clientWidth / widest * .98}px`;
      }
    };
    fit();
    document.fonts?.ready.then(fit);
    window.addEventListener('resize', fit);
    return () => {
      window.removeEventListener('resize', fit);
      title.style.fontSize = '';
    };
  }, [project]);

  useEffect(() => {
    // every section's text - the landing page's per-letter reveal, each
    // section on its own trigger
    // (only the sections that have text: the cover and the screens are
    // pictures, and asking for their letters found none)
    // the text goes on its own first line, not on the section: the
    // section's top is a padding above its tag, so the text set off first
    // and the tag - one reveal at a time in a section (scrollReveal.js) -
    // waited until every line under it was in
    const sections = gsap.utils.toArray('[id^="case-"]').filter((section) => document.querySelector(`#animate-${section.id}`)).map((section) => scrollReveal(
      `#animate-${section.id}`, { y: 0, stagger: .012, ease: 'power1.in' }));

    // each screenshot reveals as it scrolls into view: the frame wipes up
    // from its bottom edge while the image inside eases down to its real size
    // - slowly, the image settling a little longer than its frame takes to
    // open (from slightly large and low), so it eases in rather than lands
    const images = gsap.utils.toArray('.screenshot-container').map((card) => {
      // (its frame opening in square pixels from its bottom edge up - pixels.js)
      const img = card.querySelector('.screenshot-img');
      const wipe = pixelWipe(card);
      gsap.set(img, { yPercent: 6 });
      return scrollRevealSequence([
        { targets: wipe.target, vars: { at: 1, duration: 1.2, onUpdate: wipe.onUpdate } },
        { targets: img, vars: { scale: 1, yPercent: 0, duration: 1.6 }, position: '<' },
      ], { trigger: card });
    });

    // placeholder panels wipe up the same way
    // each quote card (.case-card) is a component of its own: its frame
    // wipes up from its bottom edge, then its words rise, as it comes up
    // the screen
    // (a colleague's picture on a quote card wipes open as its name
    // rises, as on the landing page's testimonials, and goes again with
    // the card scrolled back above it)
    const toggles = [];
    const cards = gsap.utils.toArray('.case-card').map((card) => {
      const avatar = card.querySelector('.case-quote-avatar');
      const toggle = avatar && wipeToggle(avatar);
      if (toggle) toggles.push({ avatar, toggle });
      return scrollRevealSequence([
        { targets: card, vars: { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut' } },
        { targets: card.querySelectorAll('.split-letter'), vars: { y: 0, stagger: .012, ease: 'power1.in' }, position: '<.3' },
        ...(toggle ? [{
          targets: avatar,
          vars: { duration: .6, onStart: () => toggle.show(.8), onReverseComplete: () => toggle.hide(.8) },
          position: '<',
        }] : []),
      ], { trigger: card });
    });
    const avatars = toggles.map(({ avatar, toggle }) => ({
      kill: () => { toggle.kill(); gsap.set(avatar, { clearProps: 'clipPath,opacity' }); },
    }));

    // a section's cards and its figures (.case-cards) open as the site's
    // other cards do (scrollRevealCards): side by side, from tablet width,
    // on one trigger, one after another in reading order - each frame
    // wiping up while what is inside settles, then its text rising - and
    // stacked on a phone, each in its own turn
    const cardGroups = gsap.utils.toArray('.case-cards').map((group) => scrollRevealCards(
      [...group.children].map((card) => ({ card: `#${card.id}`, text: `#${card.id} .split-letter` })),
      { group: `#${group.id}`, rowFrom: 768 }));

    // (each opens, then its words come in by their blocks)
    const panels = gsap.utils.toArray('.case-panel').map((panel) => scrollRevealSequence([
      { targets: panel, vars: { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut' } },
      { targets: panel.querySelectorAll('.split-letter'), vars: { y: 0, stagger: .012, ease: 'power1.in' }, position: '<.3' },
    ], { trigger: panel }));

    // each rule over a note or a list row is drawn across from the left as
    // it comes up the screen, and taken up again with the page scrolled
    // back above it - as the landing page's service rules are
    const rules = gsap.utils.toArray('.case-rule').map((rule) => {
      const draw = gsap.to(rule, { scaleX: 1, duration: .8, ease: 'power2.inOut', paused: true });
      const on = ScrollTrigger.create({ trigger: rule, start: REVEAL_AT, onEnter: () => draw.play() });
      const off = ScrollTrigger.create({ trigger: rule, start: REVERSE_AT, onLeaveBack: () => draw.reverse() });
      if (rule.getBoundingClientRect().top < window.innerHeight * .85) draw.play();
      return { kill: () => { on.kill(); off.kill(); draw.kill(); gsap.set(rule, { clearProps: 'transform' }); } };
    });

    return () => {
      [...sections, ...images, ...cards, ...avatars, ...cardGroups, ...panels, ...rules].forEach((reveal) => reveal.kill());
    };
  }, [project]);

  // a case study still being written has no cover yet, and shows none
  const hasCover = !!hero || !isDraft;

  return (
    <>
      <article className='project-container'>
        {/* 01 hero - the project's name top left with its summary top
          right; year, role, category and the link to the live site along
          the bottom. top padding clears the fixed nav bar */}
        <section id='case-hero' className={`${LIGHT} flex flex-col justify-between min-h-screen-safe
          mobile:px-[1rem] mobile:pt-20 mobile:pb-4 mobile:gap-y-16
          tablet:px-[1rem] tablet:pt-20 tablet:pb-4 tablet:gap-y-16
          laptop:px-[2rem] laptop:pt-24 laptop:pb-8 laptop:gap-y-16
          laptop-lg:px-[3rem] laptop-lg:pt-24 laptop-lg:pb-8 laptop-lg:gap-y-16
          desktop:px-[3rem] desktop:pt-28 desktop:pb-8 desktop:gap-y-16`}>
          <div className='grid grid-cols-8 gap-x-6 gap-y-8'>
            <h1 ref={fxTitle} className='project-h1 hero-designerdev flex flex-wrap content-start font-flexible font-bold leading-[.95] tracking-tight
              mobile:col-span-8 text-case
              tablet:col-span-8
              laptop:col-span-5
              laptop-lg:col-span-5
              desktop:col-span-5'>
              <SplitText text={project.title} id='animate-case-hero' emphasis={titleEmphasis(project.title)} />
            </h1>
            {/* summary - upper right */}
            <p className='flex flex-wrap content-start text-caption
              mobile:col-span-8
              tablet:col-span-6
              laptop:col-span-2 laptop:col-start-7 laptop:pt-4
              laptop-lg:col-span-2 laptop-lg:col-start-7 laptop-lg:pt-4
              desktop:col-span-2 desktop:col-start-7 desktop:pt-6'>
              <SplitText text={project.description} id='animate-case-hero' by='word' />
            </p>
          </div>
          <div className='flex justify-between items-end gap-x-6 gap-y-8
            mobile:flex-col mobile:items-start
            tablet:flex-col tablet:items-start'>
            {/* the facts, one under the other: year, then role, then
              category - each a small label with its value under it */}
            <dl className='flex flex-col gap-y-6'>
              {[
                ['Year', project.year],
                ['Role', project.roles.join(', ')],
                ['Category', project.category],
                ...(project.status ? [['Status', project.status]] : []),
                ...(project.details || []),
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className='text-caption text-muted mb-2'>
                    <SplitText text={label} id='animate-case-hero' />
                  </dt>
                  <dd className='flex flex-wrap text-caption'>
                    <SplitText text={value} id='animate-case-hero' by='word' />
                  </dd>
                </div>
              ))}
            </dl>
            {/* lower right: the link to the live site, where there is one */}
            {project.link && (
              <div className='flex items-end shrink-0'>
                <Button label={project.link.label || 'Visit site'} href={project.link.href} external />
              </div>
            )}
          </div>
        </section>
        {/* hero visual - the whole section, edge to edge; a full screen
          from laptop width up (.case-visual, App.css) */}
        {hasCover && (
        <section className={DARK}>
          <div className='case-visual screenshot-container
            mobile:aspect-[4/3]
            tablet:aspect-[16/10]'
            id='case-visual'>
            {hero
              ? <img src={hero.src} alt={hero.alt} className='screenshot-img w-full h-full object-cover object-center' onLoad={remeasure}/>
              : <Panel label='Cover' className='w-full h-full pt-24' />}
          </div>
        </section>
        )}

        {isDraft ? (
        <>
        {/* a case study in progress: what is to come, and nothing made up
          in its place */}
        <CaseSection id='status' title='Case Study in Progress' theme={LIGHT}>
          <Copy id='status' text={project.inProgress} className={BELOW} />
          <Points id='status' label='Coming in this case study' items={COMING} />
        </CaseSection>
        </>
        ) : isStudy ? (
        <>
        {/* a case study: its own sections, light and dark in turn */}
        {studyParts.map((part, i) => (
          <CaseSection id={part.id} title={part.title} theme={i % 2 ? DARK : LIGHT} key={part.id}
>
            {part.lead && <Lead id={part.id} text={part.lead} className={part.text || part.notes || part.cards || part.points ? BELOW : ''} />}
            {[].concat(part.text || []).map((paragraph, j, all) => (
              <Copy id={part.id} text={paragraph} key={paragraph}
                className={j < all.length - 1 || part.notes || part.cards || part.points ? BELOW : ''} />
            ))}
            {part.notes && <Notes id={part.id} items={part.notes} className={part.cards || part.points ? BELOW : ''} />}
            {part.cards && <Cards id={part.id} items={part.cards} />}
            {part.points && <Points id={part.id} label={part.points.label} items={part.points.items} className={part.cards ? 'mt-8' : ''} />}
            {/* (its screens as they are written, every one: the bento sets them) */}
            {part.shots && <Bento items={(project.caseStudy.find(({ id }) => id === part.id) || part).shots.items} seed={part.title} steady turn={i} onLoad={remeasure} />}
          </CaseSection>
        ))}
        </>
        ) : isPlatform ? (
        <>
        {/* a platform. first, under the cover, results and impact - what
          it achieved, then one card per figure */}
        {has('outcome') && (
        <CaseSection id='outcome' title='Results & Impact' theme={themeOf('outcome')}>
          {/* one paragraph, then the figures */}
          {platform.outcome && <Copy id='outcome' text={platform.outcome} className={platform.metrics ? BELOW : ''} />}
          {platform.metrics && (
          <ul className={`case-cards grid gap-4 ${FIGURES[Math.min(platform.metrics.length, 4)]}`} id='case-cards-outcome'>
            {platform.metrics.map((metric, i) => (
              <li className={`reveal-card ${CARD} ${lastAlone(i, platform.metrics.length)}`} id={`case-card-outcome-${i}`}
                key={metric.label}>
                <div className={`reveal-card-inner h-full flex flex-col justify-between ${platform.metrics.length > 1 ? FIGURE_ROOM : ONE_FIGURE_ROOM}`}>
                  <p className='font-flexible font-medium leading-none text-title'>
                    <SplitText text={metric.value} id='animate-card' />
                  </p>
                  <p className='flex flex-wrap text-caption text-muted'>
                    <SplitText text={metric.label} id='animate-card' by='word' />
                  </p>
                </div>
              </li>
            ))}
          </ul>
          )}
        </CaseSection>
        )}

        {/* overview - what it is, a paragraph to each entry */}
        {has('overview') && (
        <CaseSection id='overview' title='Project Overview' theme={themeOf('overview')}>
          {[].concat(platform.overview).map((paragraph, i, all) => (
            <Copy id='overview' text={paragraph} className={i < all.length - 1 ? BELOW : ''} key={paragraph} />
          ))}
        </CaseSection>
        )}

        {/* the challenge - what the project had to solve */}
        {has('challenge') && (
        <CaseSection id='challenge' title='The Challenge' theme={themeOf('challenge')}>
          {/* (a line set large, then the paragraphs under it - or the
            paragraphs alone) */}
          {platform.challenge.lead && <Lead id='challenge' text={platform.challenge.lead} className={BELOW} />}
          {[].concat(platform.challenge.text || platform.challenge).map((paragraph, i, all) => (
            <Copy id='challenge' text={paragraph} className={i < all.length - 1 ? BELOW : ''} key={paragraph} />
          ))}
        </CaseSection>
        )}

        {/* my role - what I owned, and the tools, once there are any */}
        {has('role') && (
        <CaseSection id='role' title='My Role & Contributions' theme={themeOf('role')}>
          {platform.role && <Copy id='role' text={platform.role} className={platform.contributions || project.technologies.length > 0 ? BELOW : ''} />}
          {platform.contributions && <Points id='role' label='Contributions' items={platform.contributions} className={project.technologies.length > 0 ? BELOW : ''} />}
          {project.technologies.length > 0 && <Points id='role' label='Tools' items={project.technologies} />}
        </CaseSection>
        )}

        {/* design approach - structure and user flows */}
        {has('approach') && (
        <CaseSection id='approach' title='Design Approach' theme={themeOf('approach')}>
          {/* each decision a card of its own, side by side - or paragraphs */}
          {[].concat(platform.approach)[0]?.title
            ? <Cards id='approach' items={platform.approach.slice(0, KEY_DECISIONS)} />
            : [].concat(platform.approach).map((paragraph, i, all) => (
              <Copy id='approach' text={paragraph} className={i < all.length - 1 ? BELOW : ''} key={paragraph} />
            ))}
        </CaseSection>
        )}

        {/* or the decisions one to a section, as a case study's (BiteWise):
          the decision's name set large, a sentence on what it is
          (`summary`), its challenge, solution and rationale, and the
          screens that show it under them */}
        {asDecisions && decisions.map((decision, i) => has(`decision-${i}`) && (
        <CaseSection id={`decision-${i}`} title={`Decision ${String(i + 1).padStart(2, '0')}`} theme={themeOf(`decision-${i}`)}
          key={decision.title}>
          <Lead id={`decision-${i}`} text={decision.title} className={decision.summary ? 'mb-4' : BELOW} />
          {decision.summary && <Copy id={`decision-${i}`} text={decision.summary} className={BELOW} />}
          <Notes id={`decision-${i}`} items={[
            { label: 'The challenge', text: decision.challenge },
            { label: 'What I did', text: decision.text },
            ...(decision.rationale ? [{ label: 'Why it works', text: decision.rationale }] : []),
          ]} />
          {decision.shots && <Bento items={decision.shots.items} seed={decision.title} steady turn={i} grid={decision.shots.layout === 'grid'} onLoad={remeasure} />}
        </CaseSection>
        ))}

        {/* its screens, under the label at full width */}
        {has('screens') && (
        <CaseSection id='screens' title='Screens' theme={themeOf('screens')}>
          <Bento items={screens} seed={project.title} onLoad={remeasure} className='' />
        </CaseSection>
        )}

        {/* design system - what the platform is built from */}
        {has('system') && (
        <CaseSection id='system' title='Design System' theme={themeOf('system')}>
          <Copy id='system' text={platform.system} />
        </CaseSection>
        )}

        </>
        ) : (
        <>
        {/* a build. overview - what it is, when it says, then my role on it
          and what it was built with */}
        {hasOverview && (
        <CaseSection id='overview' title={overview.length ? 'Project Overview' : 'Role & Tech Stack'} theme={LIGHT}>
          {overview.map((paragraph) => (
            <Copy id='overview' text={paragraph} className={BELOW} key={paragraph} />
          ))}
          <Points id='overview' label='My role' items={project.roles} className={BELOW} />
          <Points id='overview' label='Built with' items={project.technologies} />
        </CaseSection>
        )}

        {/* its screens, under the label at full width - light when they
          follow the cover directly, so the two are not one dark run */}
        <CaseSection id='screens' title='Screens' theme={hasOverview ? DARK : LIGHT}>
          {/* (a row of phone screens - `phones` - spans the width, four
            to a row from tablet width up) */}
          {screens.length > 0 && <Bento items={screens} seed={project.title} onLoad={remeasure} className='' />}
          {!shots.length && (
            <div className={SCREEN_RUN}>
              {['Screen one', 'Screen two', 'Screen three'].map((name) => (
                <Panel label={name} className={`aspect-[16/10] break-inside-avoid ${SCREEN_GAP}`} key={name} />
              ))}
            </div>
          )}
        </CaseSection>
        </>
        )}

        {/* the full case study, on Behance - after the short version here */}
        {short && !isDraft && (
        <CaseSection id='full' title='Full Case Study' theme={sectionCount % 2 ? DARK : LIGHT}>
          <Copy id='full' text='These are the key parts. The full case study, with the complete process and every screen, is on Behance.' className={BELOW} />
          <Button label='View on Behance' href={project.behance} external />
        </CaseSection>
        )}

      </article>
      {/* the close: the next project, in the contact section's layout */}
      <Contact next={next} previous={previous} current={project}/>
    </>
  )
}

export default ProjectPage
