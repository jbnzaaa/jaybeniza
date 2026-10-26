// the landing page's selected projects (Project.jsx): one project per kind
// of work, in this order. `title` is the project's name; `category` is the
// kind of work and `meta` the year and my part in it, shown beside the
// title. `image` is a background class (see backgroundImage in
// tailwind.config.js) for the preview; a project with no such class gives
// an imported `picture` instead.
//
// a slot with no `image` previews as a plain panel
// Portfolio 2026's preview: a screen of this site
import v3_services from '../../assets/files/images/portfolio/portfolio-v3-2.webp'
// the mock-ups of the others
import bitewise_cover from '../../assets/files/images/bitewise/mockup-cover.webp'
import gurover_cover from '../../assets/files/images/gurover/mockup-cover.webp'

export const PROJECT_CARDS = [
  {
    id: 'tingi',
    title: 'BiteWise',
    to: '/bitewise',
    image: null,
    picture: bitewise_cover,
    category: 'UX Case Study / Personal Concept',
    meta: '2026 / UX Case Study / UI/UX Designer',
  },
  {
    id: 'portfoliov3',
    title: 'Portfolio 2026',
    to: '/portfolio-2026',
    image: null,
    picture: v3_services,
    category: 'Portfolio Website / Personal Project',
    meta: '2026 / Portfolio Website / UI/UX Designer',
  },
  {
    id: 'gurover',
    title: 'GuRover',
    to: '/gurover',
    image: null,
    picture: gurover_cover,
    category: 'Web/Mobile Platform / Team Project',
    meta: '2026 / Web/Mobile Platform / UI/UX Designer',
  },
];
