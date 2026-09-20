import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// reveal-speed bounds, in seconds
const MIN_DURATION = 0.25; // fast flick down the page -> quick reveal
const MAX_DURATION = 0.7;  // slow, deliberate scroll -> gentle reveal
// scroll speeds (px/s) at or beyond this are treated as "fastest"
const VELOCITY_RANGE = 3000;

function durationForVelocity(velocity) {
  const v = Math.min(Math.abs(velocity || 0), VELOCITY_RANGE);
  return MAX_DURATION - (v / VELOCITY_RANGE) * (MAX_DURATION - MIN_DURATION);
}

/**
 * A scroll-driven reveal whose playback speed matches how fast the visitor
 * is scrolling: a quick flick plays the reveal fast, a slow scroll plays it
 * slow, and an in-between scroll plays it at a normal pace. Reverses back to
 * the hidden state only when scrolling back up past the trigger's start
 * point - continuing to scroll further down never hides already-revealed
 * content.
 *
 * @param {string|Element|Element[]} targets - gsap target(s) to animate
 * @param {object} vars - gsap tween vars describing the revealed state
 * @param {object} [opts]
 * @param {string|Element} [opts.trigger] - ScrollTrigger trigger (defaults to `targets`)
 * @param {string} [opts.start] - ScrollTrigger start position (defaults to 'top 85%')
 * @returns {{kill: () => void}}
 */
export function scrollReveal(targets, vars, { trigger, start = 'top 85%' } = {}) {
  const tween = gsap.to(targets, { ...vars, paused: true });

  const trig = ScrollTrigger.create({
    trigger: trigger || targets,
    start,
    onEnter: (self) => {
      tween.duration(durationForVelocity(self.getVelocity()));
      tween.play();
    },
    onEnterBack: (self) => {
      tween.duration(durationForVelocity(self.getVelocity()));
      tween.play();
    },
    onLeaveBack: (self) => {
      tween.duration(durationForVelocity(self.getVelocity()));
      tween.reverse();
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
    tween.duration(durationForVelocity(0));
    tween.play();
  }

  return {
    // revert (not just kill) so GSAP's inline styles get cleared - this
    // matters most in dev with hot-reloading: without it, a component that
    // remounts after an edit can inherit a stale "already revealed" state
    // from the previous mount, making the reveal look like it never played
    kill() {
      trig.kill();
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
 * @param {{targets: string|Element|Element[], vars: object}[]} stages - played in order
 * @param {object} [opts]
 * @param {string|Element} [opts.trigger] - ScrollTrigger trigger (defaults to the first stage's targets)
 * @param {string} [opts.start] - ScrollTrigger start position (defaults to 'top 85%')
 * @returns {{kill: () => void}}
 */
export function scrollRevealSequence(stages, { trigger, start = 'top 85%' } = {}) {
  function build(velocity) {
    const duration = durationForVelocity(velocity);
    const timeline = gsap.timeline({ paused: true });
    stages.forEach(({ targets, vars }) => {
      timeline.to(targets, { ...vars, duration });
    });
    return timeline;
  }

  let tl = build(0);

  const trig = ScrollTrigger.create({
    trigger: trigger || stages[0].targets,
    start,
    onEnter: (self) => { tl.kill(); tl = build(self.getVelocity()); tl.play(); },
    onEnterBack: (self) => { tl.kill(); tl = build(self.getVelocity()); tl.play(); },
    onLeaveBack: (self) => { tl.kill(); tl = build(self.getVelocity()); tl.reverse(); },
  });

  // safety net: see scrollReveal() above for why trig.refresh() is needed
  // before this check
  trig.refresh();
  if (trig.isActive) {
    tl.kill();
    tl = build(0);
    tl.play();
  }

  return {
    // revert (not just kill) so GSAP's inline styles get cleared - see the
    // comment on scrollReveal()'s kill() above for why this matters
    kill() {
      trig.kill();
      tl.revert();
    },
  };
}
