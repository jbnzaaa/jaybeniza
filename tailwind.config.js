/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // the type scale. every step is fluid - it grows with the screen's
      // width between a floor and a ceiling, so there are no jumps between
      // breakpoints - and each step is clearly apart from the next: small
      // quiet text against large headings. the hero and closing headlines
      // sit above this scale, sized to the screen's width where they are set
      fontSize: {
        caption: 'clamp(.8125rem, .7rem + .15vw, .875rem)',
        body: 'clamp(.9375rem, .8rem + .25vw, 1.125rem)',
        subtitle: 'clamp(1.125rem, .9rem + .6vw, 1.75rem)',
        heading: 'clamp(2.25rem, 1.5rem + 1.6vw, 3.5rem)',
        title: 'clamp(2.75rem, 1.4rem + 2.4vw, 4.5rem)',
        // the display sizes - headlines set against the screen's width.
        // each is one line from a phone to a wide screen, so it grows
        // evenly as the window does, with no step at a breakpoint
        logo: 'clamp(1.4rem, 1.25rem + .6vw, 1.8rem)',
        hero: 'calc(3rem + 6.67vw)',
        // (the work list is set below the hero: the hero is the louder line)
        project: 'calc(1rem + 5vw)',
        case: 'calc(2.3rem + 9.43vw)',
        next: 'calc(2.625rem + 6.1vw)',
        closing: 'calc(3rem + 11.6vw)',
      },
      fontFamily: {
        flexible: ["Flexible", "sans-serif"],
        monolisa: ["MonoLisa", "ui-monospace", "monospace"],
      },
      colors: {
        // the palette, on the 60/30/10 rule.
        // 60 - the base: the page's background
        'black': '#1B1A1A',
        // 30 - the secondary: alternate sections, cards and overlays
        // (surface) and the rules and borders between things (line)
        'surface': '#2A2828',
        'line': '#444141',
        // (no accent colours: the site is black, white and the greys between)
        // text. light on every background above; muted is the same light
        // at 60%, for supporting text one step below titles
        'white': '#f2f2f2',
        'offwhite': '#E5E4E3',
        // muted and rule follow the section's theme (App.scss): supporting
        // text and hairlines, light on the dark sections, dark on the light
        'muted': 'var(--muted)',
        'rule': 'var(--rule)',
        // a card or panel: one shade up from the section it sits on
        'card': 'var(--card)',
        // the light sections' background
        'paper': '#F1F1F1'
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
