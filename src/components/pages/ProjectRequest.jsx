//
import React, { useEffect, useRef, useState } from 'react'
// icons
import { RiArrowDownSLine, RiArrowRightDownLine } from 'react-icons/ri'
// GSAP
import gsap from 'gsap'
// scroll reveal
import { scrollRevealSequence } from '../../utils/scrollReveal'
// per-letter text split
import SplitText from '../common/SplitText'

// where a request is sent
const EMAIL = 'jaysonbeniza@gmail.com';

// Vite: set VITE_WEB3FORMS_KEY in .env.local and your hosting environment.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY?.trim();

const HEADLINE = 'Start a Project';
const INTRO = 'Tell me what you’re building. These details let me come back with a plan and the right questions, not just a hello.';

// what is said under the button, for each state of the request
const STATUS_TEXT = {
  '': '',
  sending: 'Sending your request…',
  sent: 'Thank you, your request is in. I’ll reply by email.',
  failed: `Your request couldn’t be sent. Please email me at ${EMAIL} instead.`,
};

// what the project is
// the three ways to work with me (the landing page's Areas of Expertise),
// each a 1 to 2 week project
const TYPES = ['Website design and build', 'App UI design', 'Design system', 'Something else'];
// what is wanted from me - any number of them
const SERVICES = ['UX research', 'UI design', 'Interactive prototype', 'Design system', 'AI-assisted front-end'];
const TIMELINES = ['As soon as possible', 'Within 1–3 months', 'Within 3–6 months', 'Flexible'];
// in Philippine pesos
const BUDGETS = ['Under ₱25,000', '₱25,000 to ₱75,000', '₱75,000 to ₱150,000', '₱150,000 to ₱300,000', 'Over ₱300,000', 'Not sure yet'];

const EMPTY = {
  name: '', email: '', company: '', type: TYPES[0], services: [],
  about: '', users: '', materials: '', timeline: TIMELINES[0], budget: BUDGETS[BUDGETS.length - 1],
};

// one labelled field: its label over whatever is put in it, and under it
// its `hint` - what to write there - in the open, so it is read before the
// field is filled in (inside the label, a screen reader reads it with it)
// (`group` is for a field that is not one input - a dropdown: it is then a
// plain block whose label has an id for the dropdown to be named by, not
// a <label>, which would pass a press on any option back to the button)
function Field({ label, hint, required = false, wide = false, group, children }) {
  const Box = group ? 'div' : 'label';
  return (
    <Box className={wide ? 'form-field form-field-wide' : 'form-field'}>
      <span className='form-label text-caption text-muted' id={group}>
        <SplitText text={label} by='word' />{required && <span className='form-required' aria-hidden='true'>*</span>}
      </span>
      {children}
      {hint && <span className='form-hint text-muted'><SplitText text={hint} by='word' /></span>}
    </Box>
  )
}

/**
 * A dropdown in the site's own shapes, in place of the browser's: a box
 * like the other fields that shows the choice, and under it a list that
 * wipes open, each option filling under the pointer. Works from the
 * keyboard as a select does - up and down move, Enter or Space picks,
 * Escape closes - and closes on a press anywhere else.
 *
 * @param {string} labelId - the id of the label that names it
 */
function Select({ labelId, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  // the option the keyboard or pointer is on, while the list is open
  const [active, setActive] = useState(0);
  const fxBox = useRef();

  useEffect(() => {
    if (!open) return undefined;
    const outside = (e) => { if (!fxBox.current.contains(e.target)) setOpen(false); };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [open]);

  const show = () => { setActive(Math.max(0, options.indexOf(value))); setOpen(true); };
  const pick = (option) => { onChange(option); setOpen(false); };
  const onKey = (e) => {
    if (e.key === 'Escape') { setOpen(false); return; }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) { show(); return; }
      setActive((i) => (i + (e.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length);
      return;
    }
    if ((e.key === 'Enter' || e.key === ' ') && open) { e.preventDefault(); pick(options[active]); }
  };

  return (
    <div className={open ? 'form-select form-select-open' : 'form-select'} ref={fxBox}>
      <button type='button' className='form-select-button text-caption' aria-haspopup='listbox' aria-expanded={open}
        aria-labelledby={labelId} onClick={() => (open ? setOpen(false) : show())} onKeyDown={onKey}>
        <span>{value}</span>
        <RiArrowDownSLine className='form-select-arrow' aria-hidden='true'/>
      </button>
      <ul className='form-select-list' role='listbox' aria-labelledby={labelId}>
        {options.map((option, i) => (
          <li className={i === active ? 'form-select-option form-select-option-on text-caption' : 'form-select-option text-caption'}
            role='option' aria-selected={option === value} key={option}
            onClick={() => pick(option)} onMouseEnter={() => setActive(i)}>
            <span>{option}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * The project request, on the contact page (ContactPage.jsx): the closing
 * contact section's layout - a very large heading on the left, the matter
 * on the right - on the light ground, with a form for a client to set out
 * a project: who they are, what it is, what they need from me, who it is
 * for, what already exists, when, and for how much. Its fields are boxes
 * like the section labels, its choices are boxes that fill when picked,
 * and it is sent with the site's button.
 *
 * There is no server behind the site: the request is sent through
 * Web3Forms, which emails it to me once its access key is configured.
 * Submission errors are displayed inline; the browser never redirects.
 */
function ProjectRequest() {
  const [form, setForm] = useState(EMPTY);
  // Request status: idle, sending, sent, or failed.
  const [status, setStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const submittingRef = useRef(false);

  useEffect(() => {
    // each field rises a little into place as it fades in, then its words
    // (label, hint, choices) come in by their blocks
    const fields = gsap.utils.toArray('.project-form > .form-field');
    const lowered = gsap.set(fields, { y: 24, autoAlpha: 0 });
    const wordsOf = (list) => list.flatMap((field) => [...field.querySelectorAll('.split-letter')]);
    const TEXT = { y: 0, stagger: .01, ease: 'power1.in' };
    // heading and introduction rise letter by letter, like every section's,
    // and the fields on the first screen follow them in one sequence, in
    // reading order. revealed apart, a field (in a single fade) was seen
    // before the heading's first letters had risen
    const first = fields.filter((field) => field.getBoundingClientRect().top < window.innerHeight);
    const reveal = scrollRevealSequence([
      { targets: '#animate-request', vars: { y: 0, stagger: .02, ease: 'power1.in' } },
      ...(first.length ? [
        { targets: first, vars: { y: 0, autoAlpha: 1, duration: .5, stagger: .08 }, position: '-=.3' },
        { targets: wordsOf(first), vars: TEXT, position: '<.2' },
      ] : []),
    ], { trigger: '#project-request', start: 'top bottom' });
    // the rest one at a time, as each comes up the screen (each in its
    // turn among the section's reveals - scrollReveal.js)
    const rises = fields.filter((field) => !first.includes(field)).map((field) => scrollRevealSequence([
      { targets: field, vars: { y: 0, autoAlpha: 1 } },
      ...(wordsOf([field]).length ? [{ targets: wordsOf([field]), vars: TEXT, position: '<.2' }] : []),
    ], { trigger: field }));
    return () => {
      reveal.kill();
      rises.forEach((rise) => rise.kill());
      lowered.revert();
    };
  }, []);

  const set = (key) => (e) => setForm((now) => ({ ...now, [key]: e.target.value }));
  // (a dropdown hands over the choice itself, not an event)
  const choose = (key) => (choice) => setForm((now) => ({ ...now, [key]: choice }));
  const toggle = (service) => () => setForm((now) => ({
    ...now,
    services: now.services.includes(service) ? now.services.filter((s) => s !== service) : [...now.services, service],
  }));

  // Submit via Web3Forms without navigating away from the contact page.
  const submit = async (e) => {
    e.preventDefault();
    if (submittingRef.current) return;

    setErrorMessage('');
    if (!WEB3FORMS_KEY) {
      console.error('Missing VITE_WEB3FORMS_KEY. Configure it in .env.local and in your hosting environment.');
      setErrorMessage('The contact form is not configured yet. Please email me directly.');
      setStatus('failed');
      return;
    }

    const name = form.name.trim();
    const email = form.email.trim();
    const about = form.about.trim();
    if (!name || !email || !about) {
      setErrorMessage('Please complete your name, email, and project description.');
      setStatus('failed');
      return;
    }

    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${form.company.trim() || '-'}`,
      '',
      `Project type: ${form.type}`,
      `Services needed: ${form.services.join(', ') || '-'}`,
      `Preferred start: ${form.timeline}`,
      `Budget: ${form.budget}`,
      '',
      'About the project:',
      about,
      '',
      'Who it is for:',
      form.users.trim() || '-',
      '',
      'Existing materials:',
      form.materials.trim() || '-',
    ];

    submittingRef.current = true;
    setStatus('sending');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Project request: ${form.type} from ${name}`,
          from_name: name,
          email,
          replyto: email,
          message: lines.join('\n'),
          botcheck: '',
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || `Request failed (${response.status})`);
      }

      setStatus('sent');
      setForm({ ...EMPTY, services: [] });
    } catch (error) {
      console.error('Web3Forms submission error:', error);
      setErrorMessage('Please try again or contact me directly by email.');
      setStatus('failed');
    } finally {
      submittingRef.current = false;
    }
  };

  return (
    <>
      {/* top padding clears the fixed nav bar: this is the page's first screen */}
      <section id='project-request' className='theme-light grid grid-cols-8 content-start gap-x-6 min-h-screen-safe
        mobile:px-[1rem] mobile:pt-20 mobile:pb-16 mobile:gap-y-10
        tablet:px-[1rem] tablet:pt-20 tablet:pb-16 tablet:gap-y-12
        laptop:px-[2rem] laptop:pt-24 laptop:pb-20 laptop:gap-y-12
        laptop-lg:px-[3rem] laptop-lg:pt-24 laptop-lg:pb-24 laptop-lg:gap-y-12
        desktop:px-[3rem] desktop:pt-28 desktop:pb-28 desktop:gap-y-16'>
        {/* start a project - left */}
        <h1 className='self-start flex flex-wrap font-flexible font-semibold leading-[.95] tracking-tight text-closing
          mobile:col-span-8
          tablet:col-span-8
          laptop:col-span-4
          laptop-lg:col-span-4
          desktop:col-span-4'>
          <SplitText text={HEADLINE} id='animate-request' emphasis={['Project']} />
        </h1>
        {/* introduction + the form - right */}
        <div className='
          mobile:col-span-8
          tablet:col-span-8
          laptop:col-span-4 laptop:col-start-5
          laptop-lg:col-span-4 laptop-lg:col-start-5
          desktop:col-span-4 desktop:col-start-5'>
          <p className='flex flex-wrap text-caption mb-8'>
            <SplitText text={INTRO} id='animate-request' by='word' />
          </p>
          <form className='project-form' onSubmit={submit}>
            <Field label='Your name' required>
              <input type='text' name='name' autoComplete='name' required value={form.name} onChange={set('name')} />
            </Field>
            <Field label='Email' required>
              <input type='email' name='email' autoComplete='email' required value={form.email} onChange={set('email')} />
            </Field>
            <Field label='Company or organization'>
              <input type='text' name='company' autoComplete='organization' value={form.company} onChange={set('company')} />
            </Field>
            <Field label='Project type' required group='request-type' hint='Most projects take 1–2 weeks.'>
              <Select labelId='request-type' options={TYPES} value={form.type} onChange={choose('type')} />
            </Field>
            {/* what is wanted from me - a group of its own, not one field */}
            <fieldset className='form-field form-field-wide'>
              <legend className='form-label text-caption text-muted'><SplitText text='What you need from me (choose any)' by='word' /></legend>
              <div className='form-checks'>
                {/* each a box like a section label, filled when picked.
                  the checkbox itself is kept for the keyboard and for
                  screen readers, out of sight */}
                {SERVICES.map((service) => (
                  <label className={form.services.includes(service) ? 'form-check form-check-on text-caption' : 'form-check text-caption'} key={service}>
                    <input type='checkbox' checked={form.services.includes(service)} onChange={toggle(service)} />
                    <span><SplitText text={service} by='word' /></span>
                  </label>
                ))}
              </div>
            </fieldset>
            <Field label='About the project' required wide hint='What it is, the problem it solves, and what success looks like.'>
              <textarea name='about' rows='4' required value={form.about} onChange={set('about')} />
            </Field>
            <Field label='Who it is for' wide hint='The people who will use it, and anything you already know about them.'>
              <textarea name='users' rows='2' value={form.users} onChange={set('users')} />
            </Field>
            <Field label='Existing materials' wide hint='Links to a current site or app, brand guide, designs, or references you like.'>
              <textarea name='materials' rows='2' value={form.materials} onChange={set('materials')} />
            </Field>
            <Field label='When do you want to start?' group='request-timeline'>
              <Select labelId='request-timeline' options={TIMELINES} value={form.timeline} onChange={choose('timeline')} />
            </Field>
            <Field label='Budget' group='request-budget'>
              <Select labelId='request-budget' options={BUDGETS} value={form.budget} onChange={choose('budget')} />
            </Field>
            <div className='form-field form-field-wide form-foot'>
              {/* the site's button, as a real button */}
              <button type='submit' className='form-submit cta-button text-caption font-monolisa' disabled={status === 'sending'} aria-busy={status === 'sending'}>
                {status === 'sending' ? 'Sending' : 'Send request'}
                <span className='button-icon-box' aria-hidden='true'>
                  <RiArrowRightDownLine className='button-arrow text-base'/>
                </span>
              </button>
              {/* after sending only. said aloud to a screen reader when it appears */}
              <p className='text-caption text-muted' role='status' aria-live='polite'>
                {status === 'failed' ? errorMessage || STATUS_TEXT.failed : STATUS_TEXT[status]}
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default ProjectRequest
