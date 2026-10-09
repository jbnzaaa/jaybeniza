import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// reveal-speed bounds, in seconds
const MIN_DURATION = 0.8;  // fast flick down the page -> quick reveal
const MAX_DURATION = 1;  // slow, deliberate scroll -> gentle reveal
// scroll speeds (px/s) at or beyond this are treated as "fastest"
const VELOCITY_RANGE = 3000;

function durationForVelocity(velocity) {
  const v = Math.min(Math.abs(velocity || 0), VELOCITY_RANGE);
  return MAX_DURATION - (v / VELOCITY_RANGE) * (MAX_DURATION - MIN_DURATION);
}

// bounds, in seconds, for a whole staggered reveal (first letter starting
// to last letter landing) at a slow scroll. setting a staggered tween's
// duration sets this total, so one fixed figure squeezed a long paragraph's
// few hundred letters into the same fraction of a second as a heading's
// dozen - they all landed at once and the per-letter stagger was lost.
// scaling the total to the amount of text keeps the ripple visible
// (the floor is one letter's own rise, so a short label is never
// stretched: only a very long text is squeezed, to the ceiling)
const MIN_TOTAL = 0.7;
const MAX_TOTAL = 3;
// a fast flick plays a reveal in this share of its slow-scroll time
// (1: how fast the page is scrolled no longer changes a reveal's speed -
// it made the same kind of text rise at different speeds)
const FASTEST = 1;
// one letter's own rise, in seconds, before any pacing (gsap's default)
const LETTER_DURATION = 0.7;

function totalForVelocity(natural, velocity) {
  const v = Math.min(Math.abs(velocity || 0), VELOCITY_RANGE);
  const base = Math.min(Math.max(natural, MIN_TOTAL), MAX_TOTAL);
  return base * (1 - (v / VELOCITY_RANGE) * (1 - FASTEST));
}

// when a reveal starts, everywhere on the site: once the thing has come
// 15% of the way up the screen - its top 85% of the way down. (it was
// 70%: with the smoothed scroll behind it, a component was a third of
// the way up the screen and still blank. the exceptions set a start of
// their own: what is on a page's first screen, and the footer, which is
// too near the page's end to come that high)
export const REVEAL_AT = 'top 85%';
// where a reveal on the default start really starts. something that is
// on a page's first screen when the page opens - an arrow button at the
// foot of a hero, say - is under that line, and would stay hidden until
// the page was scrolled; it starts as soon as it is on screen instead,
// which at the top of the page is at once
function startFor(el, start) {
  if (start !== REVEAL_AT) return start;
  const probe = ScrollTrigger.create({ trigger: el, start: 'top bottom' });
  const first = probe.start <= 0;
  probe.kill();
  return first ? 'top bottom' : start;
}
// a tall card opened at the default start is opening with only its top
// edge on screen. this start waits for 30% of the card's own height
export const CARD_AT = '30% bottom';
// every reveal starts at once and slows into place. (an ease that starts
// slowly reads as one more wait before anything shows; one at an even
// pace, start to finish, stops dead and reads as hurried)
const EASE = 'power2.out';

// ---- one reveal at a time, within a section
// a reveal that is triggered while another in its section is still
// playing waits for it to finish, so no two of a section's components are
// ever part way in together. they go in the order they were triggered -
// down the section, as it is scrolled. sections do not wait for each other
const queues = new WeakMap();
const queueOf = (el) => {
  // its section - or, where a part of a page is not marked up as one, the
  // nearest block around it that has a name
  const key = el?.closest?.('section') || el?.parentElement?.closest?.('[id]') || document.body;
  if (!queues.has(key)) queues.set(key, { waiting: [], current: null, guard: null });
  return queues.get(key);
};

// a reveal plays at its own speed whether or not others are waiting
// behind it (HURRY is 1) - text of one kind always rises at one speed.
// only if the next in line has meanwhile been scrolled this far up the
// screen (a share of its height, from the top) does the one playing go
// twice as fast, so what is well in view is never left blank
const OVERDUE = .6;
const HURRY = 1;
const RUSH = 2;
const busy = new Set();

function pace(q) {
  if (!q.current) return;
  let speed = q.waiting.length ? HURRY : 1;
  const next = q.waiting[0]?.el?.getBoundingClientRect?.();
  if (next && next.top < window.innerHeight * OVERDUE) speed = RUSH;
  q.current.anim.timeScale(q.current.rate * speed);
}

// while anything is waiting, its place on screen is watched as the page scrolls
function watch() {
  busy.forEach((q) => {
    if (!q.waiting.length) busy.delete(q);
    else pace(q);
  });
  if (!busy.size) gsap.ticker.remove(watch);
}

function hold(q) {
  if (!busy.size) gsap.ticker.add(watch);
  busy.add(q);
}

function begin(item) {
  const q = item.q;
  // not there to be watched - scrolled off the top before its turn came,
  // or not drawn at this width: it is simply shown
  const box = item.el?.getBoundingClientRect?.();
  if (box && (box.bottom < 0 || (!box.width && !box.height))) {
    item.anim.timeScale(1).progress(1);
    return;
  }
  q.current = item;
  pace(q);
  item.anim.play();
  // never left waiting on a reveal that was cut short
  q.guard = gsap.delayedCall(item.anim.duration() / item.anim.timeScale() + .15, () => { if (q.current === item) advance(q); });
}

function advance(q) {
  q.guard?.kill();
  q.guard = null;
  q.current = null;
  while (q.waiting.length && !q.current) begin(q.waiting.shift());
}

// ---- held behind a cover
// while a full-screen panel is over the page (the loading screen, the
// wipe between pages) the page's reveals are held: they would play out
// unseen behind it. the panel lets them go once it has lifted far enough
// that only COVER_LEFT of it is still on screen
export const COVER_LEFT = .2;
// what it lets go does not queue: each starts this long after the one
// before, at its own speed, so a first screen comes in as one movement
const OVERLAP = .15;
let held = false;
let release = null;
const due = [];

/** Holds every reveal that is asked to play from now on. */
export function holdReveals() {
  held = true;
  release?.kill();
  // (never for long: a cover that fails to lift does not leave the page blank)
  release = gsap.delayedCall(4, releaseReveals);
}

/** Lets the held reveals go, in the order they were asked for. */
export function releaseReveals() {
  if (!held) return;
  held = false;
  release?.kill();
  release = null;
  due.splice(0).forEach(({ turn, rate }, i) => turn.start(rate, i * OVERLAP));
}

/**
 * For a cover's own lift: call it as the panel's height changes, and the
 * reveals are let go once the panel is down to COVER_LEFT of the screen.
 *
 * @param {Element} panel
 */
export function releaseWhenLifted(panel) {
  if (held && panel.getBoundingClientRect().height <= window.innerHeight * COVER_LEFT) releaseReveals();
}

/**
 * Puts a paused reveal in its section's queue: `play` starts it when
 * every reveal triggered before it there has finished, `reverse` takes it back
 * at once (and out of the queue, if it was still waiting).
 *
 * @param {gsap.core.Animation} anim - a paused tween or timeline
 * @param {string|Element|Element[]} [el] - what it reveals (its first element is checked for being on screen)
 * @returns {{play: (rate?: number) => void, reverse: (rate?: number) => void, kill: () => void}}
 */
export function inTurn(anim, el) {
  const item = { anim, el: el ? gsap.utils.toArray(el)[0] : null, rate: 1 };
  const q = queueOf(item.el);
  item.q = q;
  anim.eventCallback('onComplete', () => { if (q.current === item) advance(q); });
  const turn = {
    play(rate = 1) {
      // behind a cover: kept for when it has lifted
      if (held) {
        const waitingFor = due.find((entry) => entry.turn === turn);
        if (waitingFor) waitingFor.rate = rate;
        else due.push({ turn, rate });
        return;
      }
      item.rate = rate;
      if (q.current === item) { pace(q); return; }
      if (q.waiting.includes(item) || (anim.progress() === 1 && !anim.reversed())) return;
      if (q.current) { q.waiting.push(item); pace(q); hold(q); } else begin(item);
    },
    // played outside the queue, after a delay: for what a cover lets go
    start(rate = 1, delay = 0) {
      later?.kill();
      later = gsap.delayedCall(delay, () => anim.timeScale(rate).play());
    },
    reverse(rate = 1) {
      drop();
      anim.timeScale(rate).reverse();
      if (q.current === item) advance(q);
    },
    kill() {
      drop();
      if (q.current === item) advance(q);
    },
  };
  let later = null;
  // (dropped from the queue, from what a cover is holding, and from what it let go)
  const drop = () => {
    later?.kill();
    const i = q.waiting.indexOf(item);
    if (i >= 0) q.waiting.splice(i, 1);
    const j = due.findIndex((entry) => entry.turn === turn);
    if (j >= 0) due.splice(j, 1);
  };
  return turn;
}

/**
 * A scroll-driven reveal whose playback speed matches how fast the visitor
 * is scrolling: a quick flick plays the reveal fast, a slow scroll plays it
 * slow, and an in-between scroll plays it at a normal pace. Its length also
 * scales with how much text it covers (see totalForVelocity). Reverses back to
 * the hidden state only when scrolling back up past the trigger's start
 * point - continuing to scroll further down never hides already-revealed
 * content.
 *
 * @param {string|Element|Element[]} targets - gsap target(s) to animate
 * @param {object} vars - gsap tween vars describing the revealed state
 * @param {object} [opts]
 * @param {string|Element} [opts.trigger] - ScrollTrigger trigger (defaults to `targets`)
 * @param {string} [opts.start] - ScrollTrigger start position (defaults to REVEAL_AT)
 * @returns {{kill: () => void}}
 */
export function scrollReveal(targets, vars, { trigger, start = REVEAL_AT } = {}) {
  // every letter rises over the same time here as in a sequence
  const tween = gsap.to(targets, { duration: LETTER_DURATION, ...vars, ease: EASE, paused: true });
  // the reveal's own length at its authored stagger - grows with the text
  const natural = tween.duration();
  // it takes its turn among the page's reveals (inTurn, above)
  const turn = inTurn(tween, trigger || targets);

  const trig = ScrollTrigger.create({
    trigger: trigger || targets,
    start: startFor(trigger || targets, start),
    onEnter: (self) => {
      tween.duration(totalForVelocity(natural, self.getVelocity()));
      turn.play();
    },
    onEnterBack: (self) => {
      tween.duration(totalForVelocity(natural, self.getVelocity()));
      turn.play();
    },
    onLeaveBack: (self) => {
      tween.duration(totalForVelocity(natural, self.getVelocity()));
      turn.reverse();
    },
  });

  // safety net: if the trigger's condition is ALREADY satisfied the instant
  // it's created (e.g. above-the-fold content visible without scrolling),
  // don't rely on onEnter firing asynchronously on a later refresh pass -
  // play it right now so it's never stuck in its hidden starting state.
  // trig.refresh() is called explicitly first because isActive/start/end
  // aren't guaranteed to be fully computed synchronously the instant
  // ScrollTrigger.create() returns - without forcing it, this check can
  // read stale/default values and silently never fire.
  trig.refresh();
  if (trig.isActive) {
    tween.duration(totalForVelocity(natural, 0));
    turn.play();
  }

  return {
    // revert (not just kill) so GSAP's inline styles get cleared - this
    // matters most in dev with hot-reloading: without it, a component that
    // remounts after an edit can inherit a stale "already revealed" state
    // from the previous mount, making the reveal look like it never played
    kill() {
      trig.kill();
      turn.kill();
      tween.revert();
    },
  };
}

/**
 * Like scrollReveal, but plays multiple stages IN SEQUENCE instead of all at
 * once - e.g. a divider line finishes expanding before its text starts
 * revealing, so text content never becomes visible while the line above it
 * is still mid-animation. Each stage still uses the same scroll-velocity
 * based pacing as scrollReveal.
 *
 * @param {{targets: string|Element|Element[], vars: object, position?: string|number}[]} stages - played
 *   in order; a stage's optional `position` is a gsap timeline position ('<' starts it with the
 *   stage before it instead of after)
 * @param {object} [opts]
 * @param {string|Element} [opts.trigger] - ScrollTrigger trigger (defaults to the first stage's targets)
 * @param {string} [opts.start] - ScrollTrigger start position (defaults to REVEAL_AT)
 * @param {string} [opts.reverseStart] - where scrolling back up reverses the reveal, when that
 *   should happen higher up the screen than `start` (defaults to `start`)
 * @returns {{kill: () => void}}
 */
export function scrollRevealSequence(stages, { trigger, start = REVEAL_AT, reverseStart } = {}) {
  // a stage with a stagger (text) is paced like scrollReveal: its whole
  // length scales with how many letters it covers, so a long row reads as
  // a ripple instead of landing at once and a short one is not rushed. a
  // stage without one (a divider line) keeps the plain velocity duration
  //
  // the timeline is built ONCE, at its slow-scroll pace, while everything
  // is still in its hidden state, and scroll speed only changes how fast
  // it is played. it used to be rebuilt on every trigger event - which
  // broke scrolling back up: a timeline built while its targets are
  // already revealed records "revealed" as its starting point too, so
  // reversing it went nowhere and the row just stayed on screen
  const tl = gsap.timeline({ paused: true });
  stages.forEach(({ targets, vars, position }) => {
    if (!vars.stagger) {
      tl.to(targets, { ...vars, ease: EASE, duration: durationForVelocity(0) }, position);
      return;
    }
    const count = gsap.utils.toArray(targets).length;
    const natural = LETTER_DURATION + vars.stagger * Math.max(count - 1, 0);
    const pace = totalForVelocity(natural, 0) / natural;
    tl.to(targets, { ...vars, ease: EASE, duration: LETTER_DURATION * pace, stagger: vars.stagger * pace }, position);
  });

  // playback rate for a scroll speed: 1 at a slow scroll, rising to
  // 1 / FASTEST (twice as fast) at a fast flick
  const rate = (velocity) => {
    const v = Math.min(Math.abs(velocity || 0), VELOCITY_RANGE);
    return 1 / (1 - (v / VELOCITY_RANGE) * (1 - FASTEST));
  };

  // it takes its turn among the page's reveals (inTurn, above)
  const turn = inTurn(tl, trigger || stages[0].targets);

  const trig = ScrollTrigger.create({
    trigger: trigger || stages[0].targets,
    start: startFor(trigger || stages[0].targets, start),
    onEnter: (self) => turn.play(rate(self.getVelocity())),
    onEnterBack: (self) => turn.play(rate(self.getVelocity())),
    // scrolling back up past the start: text goes first, then the line -
    // the reveal in reverse, like the section titles
    onLeaveBack: (self) => { if (!reverseStart) turn.reverse(rate(self.getVelocity())); },
  });

  // a tall block (a card) that only reversed at `start` would be all but
  // off the bottom of the screen by then, and its reversal never seen. with
  // reverseStart it goes while most of it is still in view, and comes back
  // at the same line if the page is scrolled down again
  const back = reverseStart ? ScrollTrigger.create({
    trigger: trigger || stages[0].targets,
    start: reverseStart,
    onEnter: (self) => turn.play(rate(self.getVelocity())),
    onLeaveBack: (self) => turn.reverse(rate(self.getVelocity())),
  }) : null;

  // safety net: see scrollReveal() above for why trig.refresh() is needed
  // before this check
  trig.refresh();
  if (trig.isActive) turn.play();

  return {
    // revert (not just kill) so GSAP's inline styles get cleared - see the
    // comment on scrollReveal()'s kill() above for why this matters
    kill() {
      trig.kill();
      back?.kill();
      turn.kill();
      tl.revert();
    },
  };
}

/**
 * Reveal for cards (work experience, testimonials) - the project cards'
 * reveal: the card's frame wipes open from its bottom edge while what is
 * inside eases down from slightly enlarged and low to its real size and
 * place, both at once, and the text then rises letter by letter. Where the
 * cards sit side by side they share one trigger and open one after another,
 * left to right; where they are stacked each waits for its own turn on
 * screen. A card is `.reveal-card` with one `.reveal-card-inner` in it.
 *
 * @param {{card: string, text: string}[]} cards - selectors, in order
 * @param {object} [opts]
 * @param {string} [opts.group] - the cards' container, used as the shared trigger
 * @param {number} [opts.rowFrom] - viewport width from which the cards are in a row
 * @param {boolean} [opts.scrub] - open the cards with the scroll instead of on a trigger
 * @param {string} [opts.start] - where a card opens, when not at the default start (stacked cards only)
 * @returns {{kill: () => void}}
 */
export function scrollRevealCards(cards, { group, rowFrom = 1024, scrub = false, start } = {}) {
  const frame = { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut' };
  const settle = { yPercent: 0, scale: 1, ease: 'power2.out' };
  const text = { y: 0, stagger: .02, ease: 'power1.in' };
  // how long after one card the next starts, and how far into a card's
  // wipe its text begins
  const STEP = .25;
  const TEXT_DELAY = .28;
  // scrolling back up, a card closes again once its top edge is this far
  // down the screen - while most of it can still be seen closing
  const REVERSE_AT = 'top 55%';

  const inner = (card) => `${card} .reveal-card-inner`;
  const inners = cards.map(({ card }) => inner(card));
  gsap.set(inners, { yPercent: 14, scale: 1.15 });

  const inRow = group && cards.length > 1 && window.innerWidth >= rowFrom;

  // `scrub` ties the reveal to the scroll itself, the way the selected
  // projects' cards open: each card's frame wipes up and its content
  // settles over one step of the scroll, its text rising through the
  // second half of that step, and scrolling back runs it in reverse
  const scrubbed = (group_, start, end, list) => {
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: group_, start, end, scrub: ScrollTrigger.isTouch ? .5 : true },
    });
    list.forEach((item, i) => {
      tl.to(item.card, { ...frame, duration: .7 }, i)
        .to(inner(item.card), { ...settle, duration: .7 }, i)
        .to(item.text, { y: 0, ease: 'power1.in', duration: .2, stagger: { amount: .4 } }, i + .3);
    });
    return { kill() { tl.scrollTrigger?.kill(); tl.revert(); } };
  };

  let reveals;
  if (scrub) {
    reveals = inRow
      ? [scrubbed(group, REVEAL_AT, 'top 15%', cards)]
      : cards.map((item) => scrubbed(item.card, REVEAL_AT, 'top 30%', [item]));
  } else {
    reveals = inRow
      ? [scrollRevealSequence([
        { targets: cards.map(({ card }) => card), vars: { ...frame, stagger: STEP } },
        { targets: inners, vars: { ...settle, stagger: STEP }, position: 0 },
        ...cards.map((item, i) => ({ targets: item.text, vars: text, position: i * STEP + TEXT_DELAY })),
      ], { trigger: group, reverseStart: REVERSE_AT })]
      : cards.map((item) => scrollRevealSequence([
        { targets: item.card, vars: frame },
        { targets: inner(item.card), vars: settle, position: '<' },
        { targets: item.text, vars: text, position: TEXT_DELAY },
      ], { trigger: item.card, start, reverseStart: REVERSE_AT }));
  }

  return {
    kill() {
      reveals.forEach((reveal) => reveal.kill());
      gsap.set(inners, { clearProps: 'transform' });
    },
  };
}
