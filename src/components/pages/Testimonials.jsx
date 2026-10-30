//
import React, { useEffect, useRef, useState } from 'react'
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
// the arrow for the way back: the top bar's, turned round
import { RiArrowLeftUpLine } from 'react-icons/ri'
// section label
import Tag from '../common/Tag'
// the site's button, for the review before and after
import Button, { BUTTON_PARTS } from '../common/Button'
// per-letter text split
import SplitText from '../common/SplitText'
// the site's reveals: in their turn, from where everything is revealed
import { inTurn, revealTrigger, REVEAL_AT } from '../../utils/scrollReveal'
// the pictures open in pixels
import { pixelToggle } from '../../utils/pixels'
// and the reviews open in pixels as their words rise
import { pixelText, withPixels } from '../../utils/pixelText'
// their pictures - small square crops of the photographs in /reference
import sergio from '../../assets/files/images/team/sergio-ramos-iii.jpg'
import paula from '../../assets/files/images/team/paula-malupa.jpg'
import richard from '../../assets/files/images/team/richard-ordinario.jpg'
import prince from '../../assets/files/images/team/prince-bernard-diana.webp'
import adrian from '../../assets/files/images/team/adrian-tolentino.webp'
gsap.registerPlugin(ScrollTrigger)

// reviews from the people I work with, in their own words. `quote` is one
// entry per paragraph, shown one review after another
const TESTIMONIALS = [
  {
    id: 'sergio-ramos',
    quote: [
      'I’ve watched Jay grow from taking on design tasks to handling more complex systems and projects. He approaches his work with a lot of focus and care, and he doesn’t need to be the loudest person in the room to make an impact.',
      'When Jay takes ownership of something, we know it will get done well.',
    ],
    name: 'Sergio Ramos III',
    avatar: sergio,
    role: 'President, PCI Tech Center',
  },
  {
    id: 'paula-malupa',
    quote: [
      'Jay has always been someone the team can rely on. Over time, I’ve seen him take on bigger projects, build core systems, and continue to develop his skills.',
      'What stands out most is how thoughtful and steady he is. He takes the time to do things right and always finds a way to move the work forward.',
    ],
    name: 'Paula Malupa',
    avatar: paula,
    role: 'Executive Assistant, PCI Tech Center',
  },
  {
    id: 'richard-ordinario',
    quote: [
      'Working with Jay, you can see how much thought he puts into the experience behind a design. He’s creative, detail-oriented, and always thinking about how to make something easier for the user.',
      'He’s also curious and open to learning, which makes him the kind of designer and collaborator you want on a project.',
    ],
    name: 'Richard Ordinario',
    avatar: richard,
    role: 'Senior Full Stack Developer, PCI Tech Center',
  },
  {
    id: 'prince-bernard-diana',
    quote: [
      'Jay quickly translates design requests and client feedback into updated web layouts, consistently delivering revisions within a day or two and preparing them for developer implementation.',
    ],
    name: 'Prince Bernard Diana',
    avatar: prince,
    role: 'Department Manager, PCI Tech Center',
  },
  {
    id: 'adrian-tolentino',
    quote: [
      'He consistently demonstrates a strong work ethic, adaptability, and user-centered thinking. He delivers high-quality, purposeful designs efficiently, communicates design decisions clearly, and quickly adapts to new tools and technologies.',
      'His collaborative and approachable nature makes him a valuable asset to any team.',
    ],
    name: 'Adrian Tolentino',
    avatar: adrian,
    role: 'Project Manager, PCI Tech Center',
  },
];

// how long a review is held before the next comes in by itself, in
// seconds: a reading time for its words, and a beat over
const READ = .3;
const HOLD = 2;
// a word's way out of its line, above or below (its clip box, SplitText)
const up = (i, el) => -el.offsetHeight * 1.05;
const down = (i, el) => el.offsetHeight * 1.05;

/**
 * What collaborators say, set as About the designer is: one review at a
 * time, large, in the full text colour, and under it who said it: their
 * picture (opening in pixels), name and role; along the foot - where
 * About has its button - the buttons to the review before and after. Not
 * tied to the scroll: once the section is up the screen the first rises
 * in, and after its reading time it goes up out of its lines as the next
 * rises in with its own name - on round to the first again. The buttons
 * go back or on at once (going back, the one before comes down into its
 * lines). It waits while the section is off the screen or the pointer is
 * over it.
 * On the light theme, or the dark surface with `dark`.
 */
function Testimonials({ dark = false }) {
  const fxSection = useRef();
  // the step back or on, for the buttons
  const fxGo = useRef(() => {});
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const section = fxSection.current;
    const quotes = gsap.utils.toArray('.testimonial-statement', section);
    const captions = gsap.utils.toArray('.testimonial-caption', section);
    const words = quotes.map((quote) => quote.querySelectorAll('.split-letter'));
    const people = captions.map((caption) => caption.querySelectorAll('.split-letter'));
    const masks = words.map((list) => pixelText(list));
    const nameMasks = people.map((list) => pixelText(list));
    // their pictures open and shut in pixels, as the site's pictures do
    // (pixels.js) - each shut until its review comes in
    const pictures = captions.map((caption) => caption.querySelector('.testimonial-avatar'));
    gsap.set(pictures, { clipPath: 'inset(100% 0% 0% 0%)' });
    const avatars = pictures.map((picture) => pixelToggle(picture));
    const count = quotes.length;
    // (who said the first is there with it; the rest wait out of sight)
    gsap.set(captions.slice(1), { autoAlpha: 0 });

    let current = 0;
    let change = null;
    let timer = null;
    const stops = { away: false, pointer: false };
    let rise = null;
    // it waits while the section is off the screen, the pointer is on it,
    // or the first has not come in yet
    const sync = () => {
      timer?.paused(!rise || rise.progress() < 1 || rise.reversed() || stops.away || stops.pointer);
    };
    // the review's own time on screen, before the next comes in by itself
    const wait = () => {
      timer?.kill();
      // eslint-disable-next-line no-use-before-define
      timer = gsap.delayedCall(words[current].length * READ + HOLD, () => go(current + 1, 1));
      sync();
    };

    // to review `to`: the one up goes out of its lines - upward going on,
    // downward going back - and `to` comes in from the other side
    const go = (to, dir) => {
      const next = (to + count) % count;
      if (next === current || !rise || rise.progress() < 1) return;
      const from = current;
      current = next;
      setShown(next);
      timer?.kill();
      change?.progress(1);
      const leave = dir > 0 ? up : down;
      const arrive = dir > 0 ? down : up;
      const order = dir > 0 ? 'start' : 'end';
      change = gsap.timeline({ onComplete: wait })
        .to(words[from], withPixels({ y: leave, duration: .4, ease: 'power2.in', stagger: { amount: .25, from: order } }, masks[from], true), 0)
        .to(people[from], withPixels({ y: leave, duration: .4, ease: 'power2.in', stagger: { amount: .1, from: order } }, nameMasks[from], true), 0)
        // its picture shuts in pixels as its name goes, and the next one's
        // opens as its own name comes in
        .call(() => avatars[from].hide(.35), null, 0)
        .set(captions[from], { autoAlpha: 0 }, .55)
        .set(captions[next], { autoAlpha: 1 }, .55)
        .call(() => avatars[next].show(.6), null, .6)
        .fromTo(words[next], { y: arrive }, withPixels({ y: 0, duration: .5, ease: 'power3.out', stagger: { amount: .3, from: order } }, masks[next]), .55)
        .fromTo(people[next], { y: arrive }, withPixels({ y: 0, duration: .5, ease: 'power3.out', stagger: { amount: .15, from: order } }, nameMasks[next]), .6);
    };
    fxGo.current = (dir) => go(current + dir, dir);

    // the first review and who said it rise into their lines, in their
    // turn among the section's reveals; its time on screen starts from
    // there. (called from inside the timeline: inTurn takes its onComplete
    // for itself.) scrolled back out of sight, it goes back to the first
    rise = gsap.timeline({
      paused: true,
      onReverseComplete: () => {
        timer?.kill();
        change?.kill();
        avatars.forEach((avatar) => avatar.hide(0));
        if (current === 0) return;
        gsap.set([...words[current], ...people[current]], { y: down });
        masks[current]?.set(0);
        nameMasks[current]?.set(0);
        gsap.set(captions[current], { autoAlpha: 0 });
        gsap.set(captions[0], { autoAlpha: 1 });
        current = 0;
        setShown(0);
      },
    })
      .to(words[0], withPixels({ y: 0, duration: .4, ease: 'power3.out', stagger: { amount: .6 } }, masks[0]))
      .to(people[0], withPixels({ y: 0, duration: .4, ease: 'power3.out', stagger: { amount: .3 } }, nameMasks[0]), '-=.3')
      // and with who said it, the counter and the buttons - their frames
      // wiping open as every button's does (Button.jsx)
      .call(() => avatars[0].show(.6), null, '<')
      .to(['#testimonial-back', '#testimonial-next'], { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut', duration: .5, stagger: .08 }, '<')
      .to(section.querySelectorAll(`#testimonial-back :is(${BUTTON_PARTS}), #testimonial-next :is(${BUTTON_PARTS})`), { y: 0, ease: 'power1.in', duration: .4, stagger: .02 }, '<.2')
      .call(() => wait());
    const turn = inTurn(rise, quotes[0]);
    const trigger = revealTrigger(quotes[0], REVEAL_AT, turn);

    const onScreen = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => { stops.away = !self.isActive; sync(); },
    });
    const enter = (e) => { if (e.pointerType === 'mouse') { stops.pointer = true; sync(); } };
    const leave = () => { stops.pointer = false; sync(); };
    section.addEventListener('pointerenter', enter);
    section.addEventListener('pointerleave', leave);

    return () => {
      fxGo.current = () => {};
      timer?.kill();
      change?.kill();
      trigger.kill();
      turn.kill();
      onScreen.kill();
      section.removeEventListener('pointerenter', enter);
      section.removeEventListener('pointerleave', leave);
      rise.revert();
      gsap.set([...words, ...people].flatMap((list) => [...list]), { clearProps: 'transform' });
      gsap.set(captions, { clearProps: 'opacity,visibility' });
      avatars.forEach((avatar) => avatar.kill());
      [...masks, ...nameMasks].forEach((mask) => mask?.clear());
      gsap.set(pictures, { clearProps: 'clipPath' });
    };
  }, []);

  return (
    <>
      <section id='testimonials' ref={fxSection} className={`${dark ? 'bg-surface' : 'theme-light'} flex flex-col justify-between min-h-screen-safe
        mobile:px-[1rem] mobile:py-16 mobile:gap-y-10
        tablet:px-[1rem] tablet:py-16 tablet:gap-y-12
        laptop:px-[2rem] laptop:py-20 laptop:gap-y-12
        laptop-lg:px-[3rem] laptop-lg:py-24 laptop-lg:gap-y-12
        desktop:px-[3rem] desktop:py-28 desktop:gap-y-16`}>
        <div>
          <Tag label='What Collaborators Say' id='animate-testimonials-tag' />
          {/* the reviews, one over another in one grid cell, so the room is
            the longest's - in About's face, a step smaller (.testimonial-paragraph,
            App.css), in quotation marks */}
          <div className='grid
            mobile:mt-6 mobile:w-full
            tablet:mt-8 tablet:w-[92%]
            laptop:mt-8 laptop:w-[86%]
            laptop-lg:mt-10 laptop-lg:w-[80%]
            desktop:mt-10 desktop:w-[76%]'>
            {TESTIMONIALS.map(({ id, quote }, i) => (
              <blockquote className='[grid-area:1/1] m-0' key={id} aria-hidden={i !== shown}>
                <p className='testimonial-statement testimonial-paragraph flex flex-wrap font-monolisa
                  mobile:leading-snug
                  tablet:leading-tight
                  laptop:leading-tight
                  laptop-lg:leading-tight
                  desktop:leading-tight'>
                  <SplitText text={`“ ${quote.join(' ')} ”`} id={`animate-testimonial-${id}`} by='word' />
                </p>
              </blockquote>
            ))}
          </div>
          {/* under the review: who said it - their picture, name and role,
            one over another as the reviews are */}
          <div className='grid
            mobile:mt-8
            tablet:mt-10
            laptop:mt-10
            laptop-lg:mt-12
            desktop:mt-12'>
            {TESTIMONIALS.map(({ id, name, role, avatar }, i) => (
              <div className='testimonial-caption [grid-area:1/1] flex items-center gap-x-4' key={id} aria-hidden={i !== shown}>
                <img className='testimonial-avatar shrink-0 w-12 h-12 object-cover' src={avatar} alt='' loading='lazy'/>
                {/* centred on the picture. the nudge down is optical: the
                  heading face sits high in its line */}
                <span className='testimonial-who flex flex-col justify-center gap-y-1'>
                  <span className='font-flexible font-medium leading-none text-subtitle'>
                    <SplitText text={name} id={`animate-testimonial-${id}`} />
                  </span>
                  <span className='flex flex-wrap text-copy leading-tight text-muted'>
                    <SplitText text={role} id={`animate-testimonial-${id}`} />
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* along the foot, where About has its button: the buttons to the
          review before and after - arrows as the top bar's button has */}
        <div className='flex items-center gap-x-2 shrink-0'>
          <Button label='Previous' icon={RiArrowLeftUpLine} onClick={() => fxGo.current(-1)} reveal='manual' id='testimonial-back' />
          <Button label='Next' onClick={() => fxGo.current(1)} reveal='manual' id='testimonial-next' />
        </div>
      </section>
    </>
  )
}

export default Testimonials
