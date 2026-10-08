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
export const PROJECTS = {
  dailydiscount: {
    path: '/dailydiscount',
    title: 'DailyDiscount',
    year: '2022',
    description: 'DailyDiscount is a web app that helps small online businesses sell discounted game credits.',
    category: 'Team / Ongoing Web Development',
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
    title: 'Portfolio v2',
    year: '2022',
    description: 'Portfolio v2 is my second portfolio site, showing my UI and web design projects along with the languages, frameworks, and software I use.',
    category: 'Personal / Web Development',
    roles: ['UI Designer', 'Web Developer'],
    technologies: ['React JS', 'Tailwind CSS', 'SASS', 'GSAP', 'Figma', 'Vercel App'],
    link: { href: 'https://jaysonbeniza.vercel.app' },
    screenshots: [
      { src: jaysonbeniza_hero, alt: 'Portfolio v2 hero section', start: 'full' },
      { src: jaysonbeniza_about, alt: 'Portfolio v2 about section', start: 3 },
      { src: jaysonbeniza_project, alt: 'Portfolio v2 projects section', start: 2 },
      { src: jaysonbeniza_contact, alt: 'Portfolio v2 contact section', start: 4 },
    ],
  },
  jbnza: {
    path: '/jbnza',
    title: 'Portfolio v1',
    year: '2022',
    description: 'Portfolio v1 is my first portfolio site, built to show my early projects, the languages and software I use, and a bit about me.',
    category: 'Personal / Web Development',
    roles: ['UI Designer', 'Web Developer'],
    technologies: ['React JS', 'Material UI', 'SASS', 'Figma', 'Vercel App'],
    link: { href: 'https://jbnza.vercel.app' },
    screenshots: [
      { src: jbnza_hero, alt: 'Portfolio v1 hero section', start: 'full' },
      { src: jbnza_project, alt: 'Portfolio v1 projects section', start: 2 },
      { src: jbnza_about, alt: 'Portfolio v1 about section', start: 4 },
      { src: jbnza_contact, alt: 'Portfolio v1 contact section', start: 1 },
    ],
  },
  regain: {
    path: '/regain',
    title: 'ReGain',
    year: '2021',
    description: 'ReGain is a web-based self-assessment and e-journal system with chatbot assistance, built to support students of STI College Novaliches.',
    category: 'Team / Web Development',
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
