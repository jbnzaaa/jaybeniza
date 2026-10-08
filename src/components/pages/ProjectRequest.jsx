//
import React, { useEffect, useState } from 'react'
// icons
import { RiArrowRightDownLine, RiInformationLine } from 'react-icons/ri'
// scroll reveal
import { scrollReveal } from '../../utils/scrollReveal'
// per-letter text split
import SplitText from '../common/SplitText'

// where a request is sent
const EMAIL = 'jaysonbeniza@gmail.com';

const INTRO = 'Tell me what you are building. These are the things I need to know to scope, design, and build a project.';

// what the project is
const TYPES = ['Website', 'Web application', 'Mobile app', 'Design system', 'UX audit or redesign', 'Something else'];
// what is wanted from me - any number of them
const SERVICES = ['UX research', 'UI design', 'Interactive prototype', 'Design system', 'Front-end development'];
const TIMELINES = ['As soon as possible', 'Within 1 to 3 months', 'Within 3 to 6 months', 'Flexible'];
// in Philippine pesos
const BUDGETS = ['Under ₱25,000', '₱25,000 to ₱75,000', '₱75,000 to ₱150,000', '₱150,000 to ₱300,000', 'Over ₱300,000', 'Not sure yet'];

const EMPTY = {
  name: '', email: '', company: '', type: TYPES[0], services: [],
  about: '', users: '', materials: '', timeline: TIMELINES[0], budget: BUDGETS[BUDGETS.length - 1],
};

// one labelled field: its label over whatever is put in it. a `hint` -
// what to write there - is kept in a tooltip: an info mark beside the
// label, which shows it under the pointer or when reached by keyboard
function Field({ label, hint, required = false, wide = false, children }) {
  return (
    <label className={wide ? 'form-field form-field-wide' : 'form-field'}>
      <span className='form-label text-caption text-muted'>
        {label}{required ? ' *' : ''}
        {hint && (
          <span className='form-tip' tabIndex={0} aria-label={hint}>
            <RiInformationLine aria-hidden='true'/>
            <span className='form-tip-box text-caption' role='tooltip'>{hint}</span>
          </span>
        )}
      </span>
      {children}
    </label>
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
 * There is no server behind the site, so the form does not send anything
 * itself: on submit it opens the visitor's own email app with the request
 * written out, addressed to me, for them to send.
 */
function ProjectRequest() {
  const [form, setForm] = useState(EMPTY);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    // heading and introduction rise letter by letter, like every section's
    const reveal = scrollReveal('#animate-request', { y: 0, stagger: .02, ease: 'power1.in' }, { trigger: '#project-request', start: 'top bottom' });
    return () => reveal.kill();
  }, []);

  const set = (key) => (e) => setForm((now) => ({ ...now, [key]: e.target.value }));
  const toggle = (service) => () => setForm((now) => ({
    ...now,
    services: now.services.includes(service) ? now.services.filter((s) => s !== service) : [...now.services, service],
  }));

  // the request as an email, opened in the visitor's own email app
  const submit = (e) => {
    e.preventDefault();
    const lines = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company || '-'}`,
      '',
      `Project type: ${form.type}`,
      `Services needed: ${form.services.join(', ') || '-'}`,
      `Timeline: ${form.timeline}`,
      `Budget: ${form.budget}`,
      '',
      'About the project:',
      form.about,
      '',
      'Who it is for:',
      form.users || '-',
      '',
      'Existing materials:',
      form.materials || '-',
    ];
    const subject = `Project request: ${form.type} from ${form.name}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    setSent(true);
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
        <h1 className='self-start flex flex-wrap font-flexible font-semibold leading-[.92] tracking-tight text-closing
          mobile:col-span-8
          tablet:col-span-8
          laptop:col-span-4
          laptop-lg:col-span-4
          desktop:col-span-4'>
          <SplitText text='Start a Project' id='animate-request' />
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
            <Field label='Company or organisation'>
              <input type='text' name='company' autoComplete='organization' value={form.company} onChange={set('company')} />
            </Field>
            <Field label='Project type' required>
              <select name='type' value={form.type} onChange={set('type')}>
                {TYPES.map((type) => <option key={type}>{type}</option>)}
              </select>
            </Field>
            {/* what is wanted from me - a group of its own, not one field */}
            <fieldset className='form-field form-field-wide'>
              <legend className='form-label text-caption text-muted'>What you need from me</legend>
              <div className='form-checks'>
                {/* each a box like a section label, filled when picked.
                  the checkbox itself is kept for the keyboard and for
                  screen readers, out of sight */}
                {SERVICES.map((service) => (
                  <label className={form.services.includes(service) ? 'form-check form-check-on text-caption' : 'form-check text-caption'} key={service}>
                    <input type='checkbox' checked={form.services.includes(service)} onChange={toggle(service)} />
                    <span>{service}</span>
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
            <Field label='Timeline'>
              <select name='timeline' value={form.timeline} onChange={set('timeline')}>
                {TIMELINES.map((timeline) => <option key={timeline}>{timeline}</option>)}
              </select>
            </Field>
            <Field label='Budget'>
              <select name='budget' value={form.budget} onChange={set('budget')}>
                {BUDGETS.map((budget) => <option key={budget}>{budget}</option>)}
              </select>
            </Field>
            <div className='form-field form-field-wide form-foot'>
              {/* the site's button, as a real button */}
              <button type='submit' className='form-submit cta-button text-caption font-monolisa uppercase'>
                Send request
                <RiArrowRightDownLine className='button-arrow ml-2 text-base' aria-hidden='true'/>
              </button>
              {/* after sending only. said aloud to a screen reader when it appears */}
              <p className='text-caption text-muted' role='status'>
                {sent ? 'Your email app should have opened with the request written out. Send it from there.' : ''}
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default ProjectRequest
