/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        teko: ["Teko", "sans-serif"],
        space: ["Space Mono", "monospace"],
        bigshoulder: ["Big Shoulders Text", "cursive"],
        lexend: ["Lexend", "sans-serif"],
        flexible: ["Flexible", "Lexend", "sans-serif"],
        monolisa: ["MonoLisa", "ui-monospace", "monospace"],
      },
      colors: {
        'black': '#0F0E17',
        'white': '#f2f2f2',
        'offwhite': '#E5E4E3',
        'red': '#CC2525'
      },
      backgroundImage: {
        // // regain
        'regain': "url('/public/images/portfolio_mockup_1.png')",
        // // project screenshots
        // 'regain-landing-page': "url('/public/images/regain/regain-landing-page.png')",
        // 'regain-login': "url('/public/images/regain/student-login-page.png')",
        // 'regain-dashboard': "url('/public/images/regain/student-dashboard-page.png')",
        // 'regain-assessment': "url('/public/images/regain/student-assessment-page-1.png')",
        // 'regain-ejournal': "url('/public/images/regain/student-e-journal-page.png')",
        // 'regain-message': "url('/public/images/regain/student-message-page.png')",
        // 'regain-history': "url('/public/images/regain/student-history-page.png')",

        // // jbnza
        'jbnza': "url('/public/images/portfolio_mockup_2.png')",
        // // project screenshots
        // 'jbnza-hero': "url('/public/images/portfolio/jbnza-landing-page-1.png')",
        // 'jbnza-project': "url('/public/images/portfolio/jbnza-landing-page-2.png')",
        // 'jbnza-about': "url('/public/images/portfolio/jbnza-landing-page-3.png')",
        // 'jbnza-contact': "url('/public/images/portfolio/jbnza-landing-page-4.png')",
        
        // // dailydiscount
        'dailydiscount': "url('/public/images/portfolio_mockup_3.png')",
        // // project screenshots
        // 'dd-landing-page': "url('/public/images/dailydiscount/landing-page.png')",
        // 'dd-dashboard': "url('/public/images/dailydiscount/dashboard-page.png')",
        // 'dd-heroes-and-skins': "url('/public/images/dailydiscount/heroes-&-skins-page.png')",
        // 'dd-price': "url('/public/images/dailydiscount/price-page.png')",
        // 'dd-order-details': "url('/public/images/dailydiscount/order-details-page.png')",
        // 'dd-cart': "url('/public/images/dailydiscount/cart-page.png')",
        
        // // jaysonbeniza
        'jaysonbeniza': "url('/public/images/portfolio_mockup_4.png')",
        // // project screenshots
        // 'jaysonbeniza-hero': "url('/public/images/portfolio/jaysonbeniza-landing-page-1.png')",
        // 'jaysonbeniza-about': "url('/public/images/portfolio/jaysonbeniza-landing-page-2.png')",
        // 'jaysonbeniza-project': "url('/public/images/portfolio/jaysonbeniza-landing-page-3.png')",
        // 'jaysonbeniza-contact': "url('/public/images/portfolio/jaysonbeniza-landing-page-4.png')",
        
        // profile
        'profile': "url(/public/images/profile.JPG)",
      },
      screens: {
        //current
        // 'desktop': {'max': '4000px'},
        // 'laptop-lg': {'max': '1651px'},
        // 'laptop': {'max': '1024px'},
        // 'tablet': {'max': '769px'},
        // 'mobile': {'max': '426px'},
        
        // example 1
        // 'desktop': {'min': '1440px', 'max': '4000px'},
        // 'laptop-lg': {'min': '1025px', 'max': '1441px'},
        // 'laptop': {'min': '768px', 'max': '1024px'},
        // 'tablet': {'min': '425px', 'max': '769px'},
        // 'mobile': {'min': '320px', 'max': '426px'},
        
        // example 2
        'mobile': {'min': '0px', 'max': '767px'},
        'tablet': {'min': '768px', 'max': '1023px'},
        'laptop': {'min': '1024px', 'max': '1279px'},
        'laptop-lg': {'min': '1280px', 'max': '1535px'},
        'desktop': {'min': '1536px', 'max': '99999px'},
      },
    },
  },
  plugins: [],
}
