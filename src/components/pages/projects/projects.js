// Project screenshots
import dd_landingpage from '../../../assets/files/images/dailydiscount/landing-page.png'
import dd_dashboard from '../../../assets/files/images/dailydiscount/dashboard-page.png'
import dd_heroes_skins from '../../../assets/files/images/dailydiscount/heroes-&-skins-page.png'
import dd_price from '../../../assets/files/images/dailydiscount/price-page.png'
import dd_order_details from '../../../assets/files/images/dailydiscount/order-details-page.png'
import dd_cart from '../../../assets/files/images/dailydiscount/cart-page.png'
import jaysonbeniza_hero from '../../../assets/files/images/portfolio/jaysonbeniza-landing-page-1.png'
import jaysonbeniza_about from '../../../assets/files/images/portfolio/jaysonbeniza-landing-page-2.png'
import jaysonbeniza_project from '../../../assets/files/images/portfolio/jaysonbeniza-landing-page-3.png'
import jaysonbeniza_contact from '../../../assets/files/images/portfolio/jaysonbeniza-landing-page-4.png'
import jbnza_hero from '../../../assets/files/images/portfolio/jbnza-landing-page-1.png'
import jbnza_about from '../../../assets/files/images/portfolio/jbnza-landing-page-2.png'
import jbnza_project from '../../../assets/files/images/portfolio/jbnza-landing-page-3.png'
import jbnza_contact from '../../../assets/files/images/portfolio/jbnza-landing-page-4.png'
import v3_home from '../../../assets/files/images/portfolio/portfolio-v3-1.jpg'
import v3_services from '../../../assets/files/images/portfolio/portfolio-v3-2.jpg'
import v3_about from '../../../assets/files/images/portfolio/portfolio-v3-3.jpg'
import v3_work from '../../../assets/files/images/portfolio/portfolio-v3-4.jpg'
import v3_contact from '../../../assets/files/images/portfolio/portfolio-v3-5.jpg'
import regain_landingpage from '../../../assets/files/images/regain/regain-landing-page.png'
import regain_login from '../../../assets/files/images/regain/student-login-page.png'
import regain_dashboard from '../../../assets/files/images/regain/student-dashboard-page.png'
import regain_assessment from '../../../assets/files/images/regain/student-assessment-page.png'
import regain_ejournal from '../../../assets/files/images/regain/student-e-journal-page.png'
import regain_message from '../../../assets/files/images/regain/student-message-page.png'
import regain_history from '../../../assets/files/images/regain/student-history-page.png'

// content for the project pages (ProjectPage.jsx). a screenshot's `start` is
// the grid column it begins on from laptop width up, where it spans five
// of the eight columns; 'full' spans all eight. below laptop every
// screenshot is full width
// `category` is always 'what it is / the setting it was made in', from one
// short list: UX Case Study, Web Application, Portfolio Website; Mobile
// App, Team Project, Personal Project.
// a project with a `caseStudy` is laid out as a case study; one without
// is laid out as a build (ProjectPage.jsx). one with `inProgress` - a case
// study not written up yet - shows its summary and that note, and nothing
// it has no content for. `link` and `screenshots` may
// be left out. `short` is the project in a few words, the last part of
// its label on the work page. `cover` is the picture for its card on the work page, where
// it has no cover class there (ProjectsPage.jsx)
export const PROJECTS = {
  // this site
  portfoliov3: {
    path: '/portfolio-2026',
    title: 'Portfolio 2026',
    short: 'Personal portfolio, designed and developed end to end',
    year: '2026',
    description: 'Portfolio 2026 is this site: my third portfolio, designed and built to show my UI/UX and front-end work, with scroll-driven motion and line figures that answer the pointer.',
    category: 'Portfolio Website / Personal Project',
    roles: ['UI/UX Designer', 'Front-End Developer'],
    technologies: ['React', 'Tailwind CSS', 'SASS', 'GSAP (ScrollTrigger, ScrollSmoother)', 'Hairline', 'Figma', 'Claude Code'],
    // its card on the work page: a dark screen, which stands out on the
    // page's light ground where the light landing screen would not
    cover: v3_services,
    screenshots: [
      { src: v3_home, alt: 'Portfolio 2026 landing page', start: 'full' },
      { src: v3_services, alt: 'Portfolio 2026 what I do section', start: 2 },
      { src: v3_about, alt: 'Portfolio 2026 about page', start: 4 },
      { src: v3_work, alt: 'Portfolio 2026 work page', start: 1 },
      { src: v3_contact, alt: 'Portfolio 2026 contact page', start: 3 },
    ],
  },
  // case studies still to be written up: the summary is real; every
  // section under it shows its PLACEHOLDER (ProjectPage.jsx) until the
  // project's own text is put in `caseStudy`, key by key
  tingi: {
    path: '/tingi',
    title: 'Tingi',
    short: 'Grocery ordering tailored to dietary needs',
    year: '2026',
    description: 'Tingi is a grocery shopping app designed to help busy individuals conveniently purchase everyday groceries based on their dietary needs and preferences. It simplifies the shopping experience by making it easier to discover, select, and order food that fits their lifestyle.',
    category: 'UX Case Study / Mobile App',
    roles: ['UI/UX Designer'],
    technologies: [],
    caseStudy: {},
  },
  stocknear: {
    path: '/stocknear',
    title: 'StockNear',
    short: 'Local store inventory, searchable by shoppers',
    year: '2026',
    description: 'StockNear is a mobile application that connects shoppers with nearby sari-sari and convenience stores. Users can quickly find products in stock nearby, while store owners manage inventory and attract more local customers.',
    category: 'UX Case Study / Mobile App',
    roles: ['UI/UX Designer'],
    technologies: [],
    caseStudy: {
      // what is planned next, in the one section it belongs to
      reflection: 'Placeholder. Describe what you learned on this project and what you would do differently next time. Next, I plan to build a mobile app version of this design with Claude Code.',
    },
  },
  dailydiscount: {
    path: '/dailydiscount',
    title: 'DailyDiscount',
    short: 'E-commerce web app for discounted game credits',
    year: '2022',
    description: 'DailyDiscount is a web app that helps small online businesses sell discounted game credits.',
    category: 'Web Application / Team Project',
    roles: ['UI Designer', 'Front-End Web Developer'],
    technologies: ['React JS', 'Tailwind CSS', 'SASS', 'Figma', 'Vercel App'],
    link: { href: 'https://daily-discount.vercel.app/' },
    screenshots: [
      { src: dd_landingpage, alt: 'DailyDiscount landing page', start: 'full' },
      { src: dd_dashboard, alt: 'DailyDiscount dashboard', start: 2 },
      { src: dd_heroes_skins, alt: 'DailyDiscount heroes and skins', start: 4 },
      { src: dd_price, alt: 'DailyDiscount pricing', start: 1 },
      { src: dd_order_details, alt: 'DailyDiscount order details', start: 3 },
      { src: dd_cart, alt: 'DailyDiscount cart', start: 4 },
    ],
  },
  jaysonbeniza: {
    path: '/jaysonbeniza',
    title: 'Portfolio 2022',
    short: 'Second-generation portfolio site',
    year: '2022',
    description: 'Portfolio 2022 is my second portfolio site, showing my UI and web design projects along with the languages, frameworks, and software I use.',
    category: 'Portfolio Website / Personal Project',
    roles: ['UI Designer', 'Web Developer'],
    technologies: ['React JS', 'Tailwind CSS', 'SASS', 'GSAP', 'Figma', 'Vercel App'],
    link: { href: 'https://jaysonbeniza.vercel.app' },
    screenshots: [
      { src: jaysonbeniza_hero, alt: 'Portfolio 2022 hero section', start: 'full' },
      { src: jaysonbeniza_about, alt: 'Portfolio 2022 about section', start: 3 },
      { src: jaysonbeniza_project, alt: 'Portfolio 2022 projects section', start: 2 },
      { src: jaysonbeniza_contact, alt: 'Portfolio 2022 contact section', start: 4 },
    ],
  },
  jbnza: {
    path: '/jbnza',
    title: 'Portfolio 2022 (First Edition)',
    short: 'First portfolio site',
    year: '2022',
    description: 'Portfolio 2022 (First Edition) is my first portfolio site, built to show my early projects, the languages and software I use, and a bit about me.',
    category: 'Portfolio Website / Personal Project',
    roles: ['UI Designer', 'Web Developer'],
    technologies: ['React JS', 'Material UI', 'SASS', 'Figma', 'Vercel App'],
    link: { href: 'https://jbnza.vercel.app' },
    screenshots: [
      { src: jbnza_hero, alt: 'Portfolio 2022 (First Edition) hero section', start: 'full' },
      { src: jbnza_project, alt: 'Portfolio 2022 (First Edition) projects section', start: 2 },
      { src: jbnza_about, alt: 'Portfolio 2022 (First Edition) about section', start: 4 },
      { src: jbnza_contact, alt: 'Portfolio 2022 (First Edition) contact section', start: 1 },
    ],
  },
  regain: {
    path: '/regain',
    title: 'ReGain',
    short: 'Student self-assessment and e-journal platform',
    year: '2021',
    description: 'ReGain is a web-based self-assessment and e-journal system with chatbot assistance, built to support students of STI College Novaliches.',
    category: 'Web Application / Team Project',
    roles: ['Lead Programmer'],
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Bootstrap', 'NodeJS', 'Dialogflow', 'Firebase Realtime Database', 'Cloud Firestore', 'Firebase Admin', 'Google Cloud Storage'],
    link: { href: 'https://regain-caps.web.app/' },
    screenshots: [
      { src: regain_landingpage, alt: 'ReGain landing page', start: 'full' },
      { src: regain_login, alt: 'ReGain student login', start: 3 },
      { src: regain_dashboard, alt: 'ReGain student dashboard', start: 1 },
      { src: regain_assessment, alt: 'ReGain self-assessment', start: 4 },
      { src: regain_ejournal, alt: 'ReGain e-journal', start: 2 },
      { src: regain_message, alt: 'ReGain messages', start: 1 },
      { src: regain_history, alt: 'ReGain history', start: 4 },
    ],
  },
};
