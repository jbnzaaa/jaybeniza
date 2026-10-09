// the landing page's selected projects (Project.jsx): one project per kind
// of work, in this order. `title` is the project's name; `category` is the
// kind of work and `meta` the year and my part in it, shown beside the
// title. `image` is a background class (see backgroundImage in
// tailwind.config.js) for the preview; a project with no such class gives
// an imported `picture` instead.
//
// a slot with no `image` previews as a plain panel
// Portfolio 2026's preview: a screen of this site
import v3_services from '../../assets/files/images/portfolio/portfolio-v3-2.jpg'

export const PROJECT_CARDS = [
  {
    id: 'portfoliov3',
    title: 'Portfolio 2026',
    to: '/portfolio-2026',
    image: null,
    picture: v3_services,
    category: 'Portfolio Website / Personal Project',
    meta: '2026 / Portfolio Website, Design & Development',
  },
  {
    id: 'tingi',
    title: 'Tingi',
    to: '/tingi',
    image: null,
    category: 'UX Case Study / Mobile App',
    meta: '2026 / UX Case Study, Mobile App',
  },
  {
    id: 'stocknear',
    title: 'StockNear',
    to: '/stocknear',
    image: null,
    category: 'UX Case Study / Mobile App',
    meta: '2026 / UX Case Study, Mobile App',
  },
  {
    id: 'regain',
    title: 'ReGain',
    to: '/regain',
    image: 'bg-regain',
    category: 'Web Application / Team Project',
    meta: '2021 / Web Application, Lead Developer',
  },
];
