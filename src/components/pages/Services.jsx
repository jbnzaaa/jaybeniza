//
import React, { useEffect, useRef, useState } from 'react'
// GSAP
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
// scroll reveal - the card opens on the site's card reveal
import { scrollRevealSequence, refreshSoon, CARD_AT, REVERSE_AT } from '../../utils/scrollReveal'
// section label
import Tag from '../common/Tag'
// per-letter text split
import SplitText from '../common/SplitText'
// the drawing beside each service, and the figures drawn for them - one
// for each thing a service covers
import Hairline from '../common/Hairline'
// or a gif, drawn in halftone dots
import HalftoneGif from '../common/HalftoneGif'
import route from '../../utils/hairline/route'
import wire from '../../utils/hairline/wire'
import proto from '../../utils/hairline/proto'
import tasks from '../../utils/hairline/tasks'
import rack from '../../utils/hairline/rack'
import ramp from '../../utils/hairline/ramp'
import reflow from '../../utils/hairline/reflow'
import pages from '../../utils/hairline/pages'
import dock from '../../utils/hairline/dock'
import atom from '../../utils/hairline/atom'
import waves from '../../utils/hairline/waves'
import markup from '../../utils/hairline/markup'
import key from '../../utils/hairline/key'
import ease from '../../utils/hairline/ease'

// what I do, in three parts: a service's name, what I do in it, and
// `includes` - what it covers. Each thing it covers has a drawing of its
// own, an isometric line figure that answers the pointer: a flow as tiles
// on a board, a screen in bare blocks, two linked
// screens, a test script; a board of components, a ramp of chips over
// type, a page at every width, a booklet, a design meeting its build;
// and the front-end stack as itself - React's orbits, Tailwind's waves,
// a page in HTML, CSS and Sass, the JavaScript square, a puck on one of
// GSAP's ease curves
//
// a thing it covers can show a `gif` in place of its drawing - a clip from
// Tenor at its small size (the `AAAAM` variant: a fraction of the full
// one, and still finer than the halftone it is drawn in), with `alt`
// saying what is in it.
// one without
// a gif keeps its drawing
const TENOR = 'https://media1.tenor.com/m/';
const SERVICES = [
  {
    id: 'product-design',
    title: 'UI/UX Design',
    text: 'I design web and mobile products from research to final interface. Mapping the user flows, prototyping the key screens, and testing them with users, so problems surface before development begins.',
    includes: [
      { label: 'User flows', figure: route, gif: `${TENOR}4LvAD8hD5tcAAAAM/charlie-day.gif`, alt: 'Charlie Day explaining a conspiracy board' },
      { label: 'Low to high-fidelity UI wireframes', figure: wire, gif: `${TENOR}JtzTo08HZY4AAAAM/jarvis-iron-man.gif`, alt: 'Tony Stark giving JARVIS commands' },
      { label: 'Interactive prototypes', figure: proto, gif: `${TENOR}WwvFH4SrFCIAAAAM/dexters-lab-dexters-laboratory.gif`, alt: 'Dee Dee wondering what a button does' },
      { label: 'Usability testing', figure: tasks, gif: `${TENOR}PNbVvwHpi6kAAAAM/mr-bean-takes-an-exam-mister-bean-takes-an-exam.gif`, alt: 'Mr. Bean taking an exam' },
    ],
  },
  {
    id: 'design-systems',
    title: 'Design Systems',
    text: 'I build design systems that teams can actually use: component libraries with clear states and rules, documented color and type styles, and handoff files developers can build from without guessing.',
    includes: [
      { label: 'Component libraries', figure: rack, gif: `${TENOR}YPt4M0iV1gsAAAAM/lego-movie-lego-movie-master-builder.gif`, alt: 'A Lego Movie master builder at work' },
      { label: 'Color and typography styles', figure: ramp, gif: `${TENOR}5lLcKZgmIhgAAAAM/american-psycho-patrick-bateman.gif`, alt: 'Patrick Bateman admiring a business card' },
      { label: 'Responsive layouts', figure: reflow, gif: `${TENOR}fTs0jGLUu44AAAAM/taking-measurements-daniel-labelle.gif`, alt: 'Daniel LaBelle taking measurements' },
      { label: 'Design documentation', figure: pages, gif: `${TENOR}LiDD5Bl5AXEAAAAM/spongebob-the.gif`, alt: 'SpongeBob writing his essay' },
      { label: 'Developer handoff', figure: dock, gif: `${TENOR}EfuLzvwuJlMAAAAM/documents.gif`, alt: 'Handing over a stack of documents' },
    ],
  },
  {
    id: 'development',
    title: 'Front-End Development',
    text: 'I build what I design. This keeps my designs realistic and lets me test and interact in the browser when a static mockup is not enough.',
    includes: [
      { label: 'HTML5 and CSS3', figure: markup, gif: `${TENOR}31K0izlbI5cAAAAM/phineas-and-ferb-heinz-doofenschmirtz.gif`, alt: 'Doofenschmirtz building an invention, laughing' },
      { label: 'Tailwind CSS and SASS', figure: waves, gif: `${TENOR}vPeTGrwEZrEAAAAM/iron-man-armor.gif`, alt: 'Iron Man suiting up in the Mark 5 armor' },
      { label: 'JavaScript', figure: key, gif: `${TENOR}XgaU95K_XiwAAAAM/kermit-typing.gif`, alt: 'Kermit typing furiously' },
      { label: 'React JS', figure: atom, gif: `${TENOR}fTor6GW-vvoAAAAM/bumblebee-transformer.gif`, alt: 'Bumblebee transforming' },
      { label: 'GSAP animations', figure: ease, gif: `${TENOR}hPdjxM-fcegAAAAM/gif.gif`, alt: 'Michael Jackson leaning in Smooth Criminal' },
    ],
  },
];

// how far the page scrolls, while the section is pinned, for each
// service: a share of the screen's height
const STEP_SCROLL = .8;
// a service's text going out, and the most its letters take to rise in
const OUT = .4;
const IN_SPREAD = 1.4;
// how long a figure takes to draw (Hairline's DRAW + SPREAD)
const FIGURE_DRAW = 1.3;

// the letters and words of one service, and its figure's column
const lettersOf = (id) => `#animate-service-${id}`;
const artOf = (id) => `#service-panel-${id} .service-art`;
// the rules between the rows of what it covers
const rulesOf = (id) => `#service-panel-${id} .service-rule`;
// a letter's way out of its clip box, above or below
const above = (i, el) => -el.offsetHeight * 1.05;
const below = (i, el) => el.offsetHeight * 1.05;

/**
 * One service, as a panel of the services card: its name and a short
 * description on the left half, a line figure on the right, which moves
 * under the pointer. The figure is the drawing of one of the things the
 * service covers - the first, until another row of the list is pointed
 * at, focused or pressed, which shows that row's drawing in its place and
 * plays it for as long as the row is pointed at. The panels sit one over
 * another in the card; only the one whose turn it is (`active`) is shown,
 * and its first figure is drawn in when `drawn` says so.
 */
function ServicePanel({ id, title, text, includes, detailed, active, drawn }) {
  // which of the things it covers is drawn
  const [shown, setShown] = useState(0);
  // whether that drawing is being played: while its row is pointed at or
  // focused, it moves by itself, as it would under a pointer
  const [playing, setPlaying] = useState(false);
  // whether the drawing has been changed for another. the first one is
  // drawn in, line by line, as the card is revealed; one that takes its
  // place afterwards is simply there
  const [swapped, setSwapped] = useState(false);
  const { figure, gif, alt } = includes[shown];
  const show = (i) => {
    if (i !== shown) setSwapped(true);
    setShown(i);
    setPlaying(true);
  };
  // once its turn is over it goes back to its first drawing, to be drawn
  // in again next time
  useEffect(() => {
    if (active) return;
    setShown(0);
    setSwapped(false);
    setPlaying(false);
  }, [active]);

  return (
    <div className={`col-start-1 row-start-1 ${active ? 'visible' : 'invisible'}`} id={`service-panel-${id}`}
      aria-hidden={!active} inert={active ? undefined : ''}>
      <div className='grid h-full
        mobile:grid-cols-1
        tablet:grid-cols-1
        laptop:grid-cols-2
        laptop-lg:grid-cols-2
        desktop:grid-cols-2'>
        {/* name + description */}
        <div className='flex flex-col justify-between
          mobile:p-6 mobile:gap-y-8
          tablet:p-6 tablet:gap-y-10
          laptop:p-6 laptop:gap-y-16
          laptop-lg:p-6 laptop-lg:gap-y-20
          desktop:p-6 desktop:gap-y-24'>
          <h3 className='flex flex-wrap font-flexible font-medium leading-none text-heading'>
            <SplitText text={title} id={`animate-service-${id}`} />
          </h3>
          <div className='flex flex-col gap-y-4'>
            <p className='flex flex-wrap text-copy'>
              <SplitText text={text} id={`animate-service-${id}`} by='word' />
            </p>
            {detailed && (
              /* what it covers - ruled rows, each a button that shows its
                drawing; the row whose drawing is up is the one at full
                strength (.service-item, App.css) */
              <ul className='flex flex-col mt-4'>
                {includes.map(({ label }, i) => (
                  <li className={`service-item relative m-0 ${i === shown ? 'service-item-on' : ''}`} key={label}>
                    {/* the row's rule, drawn across as the service comes in */}
                    <span className='service-rule absolute top-0 left-0 w-full h-px bg-white/20' aria-hidden='true' />
                    <button className='flex flex-wrap w-full py-3 text-left text-copy' type='button' aria-pressed={i === shown} data-cursor-free
                      onMouseEnter={() => show(i)} onFocus={() => show(i)} onClick={() => show(i)}
                      onMouseLeave={() => setPlaying(false)} onBlur={() => setPlaying(false)}>
                      {/* by the letter, so the label rolls on hover like every
                        other text button (hoverRoll.js) */}
                      <SplitText text={label} id={`animate-service-${id}`} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {/* the figure - on the dark base, in the site's greys
          (.service-art, App.css). the first is drawn in, line by line,
          when the panel's text is rising; keyed, so another takes its
          place whole */}
        <div className={gif ? 'service-art service-art-gif bg-black relative' : `service-art bg-black flex items-center justify-center
          mobile:py-4
          tablet:py-6
          laptop:py-8
          laptop-lg:py-10
          desktop:py-12`}>
          {gif ? (
            /* or its gif - the card's full height, edge to edge, in
              halftone dots; faded in with the panel's text, and only
              fetched while its service is the one on screen (.service-gif,
              App.css) */
            <div className={`service-gif ${drawn || swapped ? 'service-gif-on' : ''}`}>
              {active && <HalftoneGif src={gif} alt={alt} key={gif} />}
            </div>
          ) : (
            <Hairline figure={figure} play={playing} reveal={!swapped} drawn={drawn} key={figure.name} />
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * What I do, on the dark surface: one wide card, with the services in it
 * one at a time (ServicePanel). Stacked (figure under text) below laptop
 * width. The card is as tall as its tallest service, so it keeps its size
 * as they change.
 *
 * The card opens as it comes up the screen; then the section is pinned,
 * and scrolling on moves through the services - STEP_SCROLL of the
 * screen's height each. The scroll only says whose turn it is: a service
 * comes in at its own pace (its text rising, its figure drawn), and the
 * next only takes its place once all of it is in, however fast the page
 * is scrolled. Scrolled back up, the change runs the other way: the text
 * drops out and the one before comes down into its lines.
 *
 * @param {boolean} [detailed] - each service in full: with the list of
 *   what it covers (the landing page asks for it)
 */
function Services({ detailed = false }) {
  const fxSection = useRef();
  const fxCard = useRef();
  // whether the card has opened, and whose turn it is
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  // the service on screen, and whose figure is drawn. it changes only once
  // the one before has gone out - `active` changes as soon as the scroll
  // moves on, and hiding the panel then cut its way out short, so the
  // change read as a snap. until the card opens, the first is there
  const [drawnId, setDrawnId] = useState(null);
  const onScreen = drawnId ?? SERVICES[0].id;
  // the service shown last, which goes out as the next comes in
  const fxShown = useRef(null);
  // the service the scroll has got to, and whether one is still coming in
  const fxTarget = useRef(0);
  const fxBusy = useRef(false);
  const fxOpen = useRef(false);
  // whose turn it is once the one coming in is all in
  const catchUp = () => {
    if (fxOpen.current && !fxBusy.current) setActive(fxTarget.current);
  };

  useEffect(() => {
    const section = fxSection.current;
    const card = fxCard.current;
    const inner = '#service-card .reveal-card-inner';
    gsap.set(inner, { yPercent: 14, scale: 1.15 });
    // the card opens like every card on the site - its frame wipes up
    // while its inside settles - once 60% of it is on screen, and slowly:
    // it is the page's largest. a third of the way in, the first service
    // starts coming in (`open`); scrolled back below the screen, the card
    // closes again and the services start over
    const WIPE = 1.1;
    const opening = scrollRevealSequence([
      { targets: card, vars: { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut', duration: WIPE } },
      { targets: inner, vars: { yPercent: 0, scale: 1, ease: 'power2.out', duration: WIPE }, position: '<' },
      { targets: card, vars: { duration: .01, onComplete: () => setOpen(true), onReverseComplete: () => setOpen(false) }, position: WIPE * .35 },
    ], { trigger: card, start: CARD_AT, reverseStart: REVERSE_AT });
    // the section is held at the top of the screen while the services
    // are scrolled through: the scroll picks whose turn it is
    const n = SERVICES.length;
    const pin = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${Math.round(window.innerHeight * STEP_SCROLL * n)}`,
      pin: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const target = Math.min(n - 1, Math.floor(self.progress * n));
        if (target === fxTarget.current) return;
        fxTarget.current = target;
        catchUp();
      },
    });
    refreshSoon();
    return () => {
      opening.kill();
      pin.kill();
      gsap.set(inner, { clearProps: 'transform' });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // the services' turns
  useEffect(() => {
    fxOpen.current = open;
    if (!open) {
      // closed: every service's text is back out of sight, ready to rise
      // again from the first
      SERVICES.forEach(({ id }) => {
        gsap.killTweensOf([lettersOf(id), rulesOf(id)]);
        gsap.set(lettersOf(id), { y: below });
        gsap.set(rulesOf(id), { scaleX: 0 });
      });
      fxShown.current = null;
      fxBusy.current = false;
      setActive(0);
      return undefined;
    }
    // opened with the page already scrolled on: straight to that service
    if (fxShown.current === null && active !== fxTarget.current) {
      setActive(fxTarget.current);
      return undefined;
    }
    const prev = fxShown.current;
    const next = SERVICES[active].id;
    fxShown.current = next;
    fxBusy.current = true;
    // any other caught part way is put straight out of sight
    SERVICES.forEach(({ id }) => {
      if (id === prev || id === next) return;
      gsap.killTweensOf([lettersOf(id), rulesOf(id)]);
      gsap.set(lettersOf(id), { y: below });
      gsap.set(rulesOf(id), { scaleX: 0 });
    });
    gsap.killTweensOf([lettersOf(next), artOf(next), rulesOf(next)]);
    const tl = gsap.timeline();
    // scrolling on, text leaves upward and the next rises from below;
    // scrolling back, it all runs the other way - the text drops out, last
    // letter first, and the one before comes down into its lines
    const back = prev && SERVICES.findIndex(({ id }) => id === prev) > active;
    const leave = back ? below : above;
    const arrive = back ? above : below;
    // the one before goes out of its clip boxes, its figure faded and its
    // rules drawn off - to the right scrolling on, back to the left
    // scrolling back
    if (prev && prev !== next) {
      gsap.killTweensOf([lettersOf(prev), artOf(prev), rulesOf(prev)]);
      tl.to(lettersOf(prev), { y: leave, duration: OUT, ease: 'power2.in', stagger: { amount: OUT * .5, from: back ? 'end' : 'start' } })
        .to(artOf(prev), { autoAlpha: 0, duration: OUT }, 0)
        .to(rulesOf(prev), {
          scaleX: 0,
          transformOrigin: back ? 'left center' : 'right center',
          duration: OUT,
          ease: 'power2.in',
          stagger: { amount: OUT * .3, from: back ? 'end' : 'start' },
        }, 0);
    }
    // then this one comes in: its text rising letter by letter while its
    // figure is drawn (Hairline's `drawn`, set by `drawnId` below)
    const at = tl.duration();
    const count = gsap.utils.toArray(lettersOf(next)).length;
    tl.call(() => setDrawnId(next), null, at)
      .set(artOf(next), { autoAlpha: 1 }, at)
      .fromTo(lettersOf(next), { y: arrive }, {
        y: 0,
        duration: .4,
        ease: 'power1.in',
        stagger: { each: Math.min(.02, IN_SPREAD / Math.max(count, 1)), from: back ? 'end' : 'start' },
      }, at)
      // and its rules drawn across from the left, one after another, as
      // the rows' labels rise
      .fromTo(rulesOf(next), { scaleX: 0 }, {
        scaleX: 1,
        transformOrigin: 'left center',
        duration: .7,
        ease: 'power3.out',
        stagger: { each: .08, from: back ? 'end' : 'start' },
      }, at + .15);
    // and only once all of it is in can the next take its place - the
    // one the scroll has got to meanwhile, if it has moved on
    const done = Math.max(tl.duration(), at + FIGURE_DRAW);
    tl.call(() => {
      fxBusy.current = false;
      catchUp();
    }, null, done);
    return () => {
      tl.kill();
      fxBusy.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, active]);

  useEffect(() => {
    if (!open) setDrawnId(null);
  }, [open]);

  return (
    <>
      <section id='what-i-do' data-pinned ref={fxSection} className='bg-surface
        mobile:px-[1rem] mobile:py-16
        tablet:px-[1rem] tablet:py-16
        laptop:px-[2rem] laptop:py-20
        laptop-lg:px-[3rem] laptop-lg:py-24
        desktop:px-[3rem] desktop:py-28'>
        <Tag label='Areas of Expertise' id='animate-services-tag' />
        <div className='reveal-card overflow-hidden bg-black
          mobile:mt-6
          tablet:mt-8
          laptop:mt-8
          laptop-lg:mt-10
          desktop:mt-10' id='service-card' ref={fxCard}>
          <div className='reveal-card-inner'>
            <div className='grid'>
              {SERVICES.map((service) => (
                <ServicePanel {...service} detailed={detailed} active={onScreen === service.id}
                  drawn={drawnId === service.id} key={service.id} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Services
