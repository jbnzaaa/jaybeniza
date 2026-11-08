// the landing page's selected projects (Project.jsx): one project per kind
// of work, in this order - the team products first, then the personal
// ones. `title` is the project's name; `category` is the
// kind of work and `meta` the year and the kind of project, shown beside the
// title, and `text` a sentence on it (its case study's description).
// `image` is a background class (see backgroundImage in
// tailwind.config.js) for the preview; a project with no such class gives
// an imported `picture` instead.
//
// a slot with no `image` previews as a plain panel
// the mock-ups, at card size (1200px; the project pages use the full ones)
import aaccup_cover from '../../assets/files/images/aaccup/mockup-cover-card.webp'
import comelec_cover from '../../assets/files/images/comelec/mockup-cover-card.webp'
import gurover_cover from '../../assets/files/images/gurover/mockup-cover-card.webp'
import pci_cover from '../../assets/files/images/pci/mockup-cover-card.webp'

export const PROJECT_CARDS = [
  {
    id: 'gurover',
    title: 'GuRover',
    to: '/gurover',
    image: null,
    picture: gurover_cover,
    category: 'Web/Mobile Platform / Team Project',
    meta: '2026 / Web/Mobile Platform',
    text: 'An AI-assisted, offline-first workspace that lifts the record-keeping load off Philippine teachers, from public school classrooms to college lecture halls.',
  },
  {
    id: 'aaccup',
    title: 'AACCUP',
    to: '/aaccup',
    image: null,
    picture: aaccup_cover,
    category: 'Web Platform / Client Project',
    meta: '2023 / Web Platform',
    text: "A full redesign of AACCUP's accreditation platform, from the public website to the workspace where nine roles run accreditation for the Philippines' state universities and colleges.",
  },
  {
    id: 'comelec',
    title: 'COMELEC',
    // (ELEC, for elections: the card's short title has no word to stress)
    emphasis: { letters: [3, 4, 5, 6] },
    to: '/comelec-acm',
    image: null,
    picture: comelec_cover,
    category: '3D Training Game / Client Project',
    meta: '2025 / 3D Training Game',
    text: 'A 3D training game that teaches COMELEC election personnel to set up and operate the Automated Counting Machine (ACM), from opening its hard case to inserting the smart card.',
  },
  {
    id: 'pci',
    title: 'Central App Design System',
    // (set on two lines where it is shown large)
    titleLines: ['Central App', 'Design System'],
    to: '/pci-central-app',
    image: null,
    picture: pci_cover,
    category: 'Design System / Team Project',
    meta: '2024 / Design System',
    text: 'A design system started for the Central App and built from scratch in Figma, so each screen is designed and developed from one set of 40+ components.',
  },
];
