//
import React from 'react'
// page-to-page wipe
import { TransitionLink as Link } from '../common/PageTransition'
// per-letter text split
import SplitText from '../common/SplitText'

// each card shows my part in the project, not the tech stack - the stack
// lives on the project's own page
export const PROJECT_CARDS = [
  {
    id: 'dailydiscount',
    title: 'DailyDiscount',
    to: '/dailydiscount',
    image: 'bg-dailydiscount',
    meta: ['2022', '/', 'UI Design', 'Front-End', 'Team', 'Web App'],
  },
  {
    id: 'regain',
    title: 'ReGain',
    to: '/regain',
    image: 'bg-regain',
    meta: ['2021', '/', 'Lead Programmer', 'Team', 'Web App'],
  },
  {
    id: 'jaysonbeniza',
    title: 'Portfolio v2',
    to: '/jaysonbeniza',
    image: 'bg-jaysonbeniza',
    meta: ['2022', '/', 'UI Design', 'Web Development', 'Personal', 'Website'],
  },
];

/**
 * A project's image on the Selected Projects stage. The images are stacked
 * on top of each other, each exactly the size of the image area, and start
 * clipped away; the section's scroll timeline (Project.jsx) wipes them in
 * one at a time, each over the one before. The text for a project is a
 * separate piece (ProjectCaption) so the two can move independently.
 */
function ProjectCard({ project }) {
  return (
    <article className='selected-card absolute inset-0 overflow-hidden bg-black cursor-none [&_a]:cursor-none' id={`selected-card-${project.id}`}>
      <Link to={project.to} aria-label={`${project.title} case study`} className='block w-full h-full'>
        <div className={`selected-card-image ${project.image} bg-cover bg-center w-full h-full`}/>
      </Link>
    </article>
  )
}

/**
 * A project's title and details, under the image area. The captions are
 * stacked in one grid cell (so the row is as tall as the tallest of them).
 * Both lines are split into letters like the rest of the site's text: the
 * scroll timeline (Project.jsx) raises a caption's letters into view as its
 * image arrives and lifts the previous caption's letters out.
 */
export function ProjectCaption({ project }) {
  return (
    <div className='[grid-area:1/1] flex justify-between items-end
      mobile:flex-col mobile:items-start
      tablet:flex-col tablet:items-start'>
      <span className='font-flexible font-medium leading-none text-white
        mobile:text-[2rem] mobile:mb-2
        tablet:text-[2.4rem] tablet:mb-2
        laptop:text-[2.4rem]
        laptop-lg:text-[2.8rem]
        desktop:text-[3.4rem]'>
        <SplitText text={project.title} id={`animate-caption-${project.id}`} />
      </span>
      <div className='flex flex-wrap justify-end text-[.8rem]
        mobile:text-[.7rem] mobile:justify-start mobile:gap-y-1
        tablet:text-[.75rem] tablet:justify-start tablet:gap-y-1'>
        {project.meta.map((item) => (
          <span key={item} className='text-white/60 ml-[10px] mobile:ml-0 mobile:mr-2 tablet:ml-0 tablet:mr-2'>
            <SplitText text={item} id={`animate-caption-${project.id}`} />
          </span>
        ))}
      </div>
    </div>
  )
}

export default ProjectCard
