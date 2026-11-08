//
import React from 'react'
import { PROJECT_CARDS } from './ProjectCard'
// a screen at a time
import PinnedPanels from '../common/PinnedPanels'
// the part of a project's title set in the pixel face
import { titleEmphasis } from './projects/emphasis'
// the mock-ups at full size: each fills the screen
import gurover from '../../assets/files/images/gurover/mockup-cover.webp'
import aaccup from '../../assets/files/images/aaccup/mockup-cover.webp'
import comelec from '../../assets/files/images/comelec/mockup-cover.webp'
import pci from '../../assets/files/images/pci/mockup-cover.webp'

const COVERS = { gurover, aaccup, comelec, pci };

/**
 * Selected projects, a screen each (PinnedPanels): the project's mock-up
 * filling the screen, its year and kind in the upper
 * right, its name and what it is in the lower left, and the way to its
 * case study in the lower right. The section is held while they are
 * scrolled through, each opening over the last.
 */
function Project() {
  const items = PROJECT_CARDS.map((project) => ({
    id: project.id,
    title: project.title,
    titleLines: project.titleLines,
    emphasis: project.emphasis || titleEmphasis(project.title),
    text: project.text,
    label: project.meta,
    to: project.to,
    cta: 'View work',
    picture: COVERS[project.id] || project.picture,
    alt: `${project.title} mock-up`,
  }));
  return <PinnedPanels id='project' tag='Featured Work' items={items} />;
}

export default Project
