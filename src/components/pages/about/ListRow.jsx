//
import React, { useEffect } from 'react'
// scroll reveal
import { scrollRevealSequence } from '../../../utils/scrollReveal'
// per-letter text split
import SplitText from '../../common/SplitText'

/**
 * One row of a list on the About page: a divider line, a title on the
 * left and its items on the right (capabilities, tools). The line draws
 * across, then the title and items reveal letter by letter, as the row
 * scrolls into view.
 *
 * @param {string} id - short unique name for this row, used in its ids
 * @param {string} title
 * @param {string[]} items
 */
function ListRow({ id, title, items }) {
  useEffect(() => {
    // line fully expands before the text reveals, and the reveal is tied
    // to THIS row's own position so it plays while actually visible
    const reveal = scrollRevealSequence([
      { targets: `#row-line-${id}`, vars: { width: '100%', ease: 'power1.in' } },
      { targets: `#animate-row-${id}`, vars: { y: 0, stagger: .02, ease: 'power1.in' } },
    ], { trigger: `#row-line-${id}` });
    return () => reveal.kill();
  }, [id]);

  return (
    <>
      <div className='col-span-8' id={`row-line-${id}`}/>
      <li className='col-span-8 grid py-6
        mobile:grid-cols-1 mobile:h-full
        tablet:grid-cols-1 tablet:h-full
        laptop:grid-cols-2 laptop:h-full
        laptop-lg:grid-cols-2 laptop-lg:h-full
        desktop:grid-cols-2 desktop:h-full'>
        {/* title */}
        <div className='stack-container col-span-1 flex flex-wrap font-medium
          mobile:min-h-[25px] mobile:mb-1 mobile:text-[1rem]
          tablet:min-h-[30px] tablet:text-[1.3rem]
          laptop:min-h-[30px] laptop:text-[1.4rem]
          laptop-lg:min-h-[30px] laptop-lg:text-[1.4rem]
          desktop:min-h-[30px] desktop:text-[1.4em]'>
          <SplitText text={title} id={`animate-row-${id}`} />
        </div>
        {/* items */}
        <ul className='col-span-1 flex flex-wrap'>
          {items.map((item) => (
            <li className='stacks h-[30px] text-muted
              mobile:text-[.9rem]
              tablet:text-[.9rem]
              laptop:text-[1rem]
              laptop-lg:text-[1rem]
              desktop:text-[1.1rem]'
              key={item}>
              <SplitText text={item} id={`animate-row-${id}`} />
            </li>
          ))}
        </ul>
      </li>
    </>
  )
}

export default ListRow
