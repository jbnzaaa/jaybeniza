//
import React, { useEffect } from 'react'
// scroll reveal
import { scrollRevealSequence } from '../../utils/scrollReveal'
// section label
import Tag from '../common/Tag'
// per-letter text split
import SplitText from '../common/SplitText'

// everything I work with, grouped by the kind of work - design first
const GROUPS = [
  { id: 'product-design', title: 'Product Design', items: ['UX Design', 'User Flows', 'Wireframing', 'Prototyping', 'Usability Testing'] },
  { id: 'ui-design', title: 'UI Design', items: ['High-Fidelity UI', 'Design Systems', 'Responsive Design', 'Design Handoff'] },
  { id: 'design-tools', title: 'Design Tools', items: ['Figma', 'Figma AI', 'Adobe Photoshop', 'Adobe Illustrator'] },
  { id: 'development', title: 'Development', items: ['HTML5', 'CSS3', 'SASS/SCSS', 'JavaScript', 'React', 'Tailwind CSS', 'Bootstrap', 'GSAP'] },
  { id: 'development-tools', title: 'Development Tools', items: ['Visual Studio Code', 'Git', 'Claude Code', 'NPM'] },
];

/**
 * Skills on the About page: one plain list, laid out like the
 * certificates and awards under it (CertificatesAwards.jsx). Each row is
 * a category on the left and its skills on the right, with a rule under it
 * - the same row the certificates use.
 */
function Skills() {
  useEffect(() => {

    // each row gets its OWN trigger: its text reveals letter by letter,
    // then the rule under it draws across, as THAT row scrolls into view
    const rows = GROUPS.map(({ id }) => scrollRevealSequence([
      { targets: `#animate-skill-${id}`, vars: { y: 0, stagger: .02, ease: 'power1.in' } },
      { targets: `#cert-line-skill-${id}`, vars: { width: '100%', ease: 'power1.in' }, position: '<' },
    ], { trigger: `#skill-row-${id}` }));

    return () => {
      rows.forEach((row) => row.kill());
    };
  }, []);

  return (
    <>
      <div id='skills' className='bg-surface'>
        <div className='
          mobile:py-16 mobile:px-[1rem]
          tablet:py-16 tablet:px-[1rem]
          laptop:py-20 laptop:px-[2rem]
          laptop-lg:py-24 laptop-lg:px-[3rem]
          desktop:py-28 desktop:px-[3rem]'>
          <div className='mobile:mb-6 tablet:mb-8 laptop:mb-8 laptop-lg:mb-10 desktop:mb-10'>
            <Tag label='Skills & Tools' id='animate-skills-tag' />
          </div>
          {/* rows - category, its skills, and a rule under each (the rule's
            start state is the cert-line rule in App.scss) */}
          <ul data-no-hover-roll>
            {GROUPS.map((group) => (
              <li className='m-0' id={`skill-row-${group.id}`} key={group.id}>
                <div className='flex justify-between items-start gap-x-6 text-subtitle
                  mobile:py-4
                  tablet:py-6
                  laptop:py-6
                  laptop-lg:py-6
                  desktop:py-8'>
                  <p className='entry-line font-medium shrink-0'>
                    <SplitText text={group.title} id={`animate-skill-${group.id}`} />
                  </p>
                  <p className='entry-line flex flex-wrap justify-end text-right text-muted'>
                    <SplitText text={group.items.join(', ')} id={`animate-skill-${group.id}`} by='word' />
                  </p>
                </div>
                <div id={`cert-line-skill-${group.id}`}/>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Skills
