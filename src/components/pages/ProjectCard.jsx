// the landing page's selected projects (Project.jsx): one project per kind
// of work, in this order. `title` is the project's name; `category` is the
// kind of work and `meta` the year and my part in it, shown beside the
// title. `image` is a background class (see backgroundImage in
// tailwind.config.js) for the preview.
//
// the UX case study slot is still a PLACEHOLDER - give it a real project's
// `title`, `meta`, `image` and `to`. a slot with no `image` previews as a
// plain panel
export const PROJECT_CARDS = [
  {
    id: 'ux-case-study',
    title: 'Coming Soon',
    to: '/work',
    image: null,
    category: 'UX Case Study',
    meta: 'Placeholder',
  },
  {
    id: 'dailydiscount',
    title: 'DailyDiscount',
    to: '/dailydiscount',
    image: 'bg-dailydiscount',
    category: 'Real-World Product',
    meta: '2022 / UI Design, Front-End',
  },
  {
    id: 'jaysonbeniza',
    title: 'Portfolio v2',
    to: '/jaysonbeniza',
    image: 'bg-jaysonbeniza',
    category: 'Product / UI Design',
    meta: '2022 / UI Design, Web Development',
  },
  {
    id: 'regain',
    title: 'ReGain',
    to: '/regain',
    image: 'bg-regain',
    category: 'Development / Design Collaboration',
    meta: '2021 / Lead Programmer',
  },
];
