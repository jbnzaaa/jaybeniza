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
      },
      colors: {
        'black': '#0F0E17',
        'white': '#f2f2f2',
        'offwhite': '#E5E4E3',
        'red': '#CC2525'
      },
      backgroundImage: {
        // projects
        'regain': "url('/public/images/portfolio_mockup_1.png')",
        'jbnza': "url('/public/images/portfolio_mockup_2.png')",
        'dailydiscount': "url('/public/images/portfolio_mockup_3.png')",
        'jaysonbeniza': "url('/public/images/portfolio_mockup_4.png')",
        // profile
        'profile': "url(/public/images/profile.JPG)"
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
        'mobile': {'min': '320px', 'max': '767px'},
        'tablet': {'min': '768px', 'max': '1023px'},
        'laptop': {'min': '1024px', 'max': '1279px'},
        'laptop-lg': {'min': '1280px', 'max': '1535px'},
        'desktop': {'min': '1536px', 'max': '4000px'},
      },
    },
  },
  plugins: [],
}
