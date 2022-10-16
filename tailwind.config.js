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
        bigshoulder: ["Big Shoulders Text", "cursive"]
       },
       color: {
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
        // profile
        'profile': "url(/public/images/profile.JPG)"
      }
    },
  },
  plugins: [],
}
