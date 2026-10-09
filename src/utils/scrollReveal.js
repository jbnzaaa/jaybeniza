import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// reveal-speed bounds, in seconds
const MIN_DURATION = 0.4;  // fast flick down the page -> quick reveal
const MAX_DURATION = 0.8;  // slow, deliberate scroll -> gentle reveal
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
const MIN_TOTAL = 0.6;
const MAX_TOTAL = 2.6;
// a fast flick plays a reveal in this share of its slow-scroll time
const FASTEST = 0.5;
// one letter's own rise, in seconds, before any pacing (gsap's default)
const LETTER_DURATION = 0.5;

function totalForVelocity(natural, velocity) {
  const v = Math.min(Math.abs(velocity || 0), VELOCITY_RANGE);
  const base = Math.min(Math.max(natural, MIN_TOTAL), MAX_TOTAL);
  return base * (1 - (v / VELOCITY_RANGE) * (1 - FASTEST));
}

// when a reveal starts, everywhere on the site: once the thing has come
// 30% of the way up the screen - its top 70% of the way down. (the
// exceptions set a start of their own: what is on a page's first screen,
// and the footer, which is too near the page's end to come that high)
export const REVEAL_AT = 'top 70%';

// ---- one reveal at a time, across the whole page
// a reveal that is triggered while another is still playing waits for it
// to finish, so no two components are ever part way in together. they go
// in the order they were triggered - down the page, as it is scrolled
const waiting = [];
let current = null;
let guard = null;
// the reveal that is playing runs this much faster for each one waiting
// behind it, so a quick scroll does not leave a screen of blanks
const HURRY = .75;

function pace() {
  if (current) current.anim.timeScale(current.rate * (1 + waiting.length * HURRY));
}

function begin(item) {
  // not there to be watched - scrolled off the top before its turn came,
  // or not drawn at this width: it is simply shown
  const box = item.el?.getBoundingClientRect?.();
  if (box && (box.bottom < 0 || (!box.width && !box.height))) {
    item.anim.timeScale(1).progress(1);
    return;
  }
  current = item;
  pace();
  item.anim.play();
  // never left waiting on a reveal that was cut short
  guard = gsap.delayedCall(item.anim.duration() / item.anim.timeScale() + .4, () => { if (current === item) advance(); });
}

function advance() {
  guard?.kill();
  guard = null;
  current = null;
  while (waiting.length && !current) begin(waiting.shift());
}

/**
 * Puts a paused reveal in the page's one queue: `play` starts it when
 * every reveal triggered before it has finished, `reverse` takes it back
 * at once (and out of the queue, if it was still waiting).
 *
 * @param {gsap.core.Animation} anim - a paused tween or timeline
 * @param {string|Element|Element[]} [el] - what it reveals (its first element is checked for being on screen)
 * @returns {{play: (rate?: number) => void, reverse: (rate?: number) => void, kill: () => void}}
 */
export function inTurn(anim, el) {
  const item = { anim, el: el ? gsap.utils.toArray(el)[0] : null, rate: 1 };
  anim.eventCallback('onComplete', () => { if (current === item) advance(); });
  const drop = () => {
    const i = waiting.indexOf(item);
    if (i >= 0) waiting.splice(i, 1);
  };
  return {
    play(rate = 1) {
      item.rate = rate;
      if (current === item) { pace(); return; }
      if (waiting.includes(item) || (anim.progress() === 1 && !anim.reversed())) return;
      if (current) { waiting.push(item); pace(); } else begin(item);
    },
    reverse(rate = 1) {
      drop();
      anim.timeScale(rate).reverse();
      if (current === item) advance();
    },
    kill() {
      drop();
      if (current === item) advance();
    },
  };
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
  const tween = gsap.to(targets, { ...vars, paused: true });
  // the reveal's own length at its authored stagger - grows with the text
  const natural = tween.duration();
  // it takes its turn among the page's reveals (inTurn, above)
  const turn = inTurn(tween, trigger || targets);

  const trig = ScrollTrigger.create({
    trigger: trigger || targets,
    start,
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
      tl.to(targets, { ...vars, duration: durationForVelocity(0) }, position);
      return;
    }
    const count = gsap.utils.toArray(targets).length;
    const natural = LETTER_DURATION + vars.stagger * Math.max(count - 1, 0);
    const pace = totalForVelocity(natural, 0) / natural;
    tl.to(targets, { ...vars, duration: LETTER_DURATION * pace, stagger: vars.stagger * pace }, position);
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
    start,
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
 * @returns {{kill: () => void}}
 */
export function scrollRevealCards(cards, { group, rowFrom = 1024, scrub = false } = {}) {
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
      ], { trigger: item.card, reverseStart: REVERSE_AT }));
  }

  return {
    kill() {
      reveals.forEach((reveal) => reveal.kill());
      gsap.set(inners, { clearProps: 'transform' });
    },
  };
}
