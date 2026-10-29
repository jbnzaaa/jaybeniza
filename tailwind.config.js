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
        // the small and body steps are near one size, and grow together
        // from a phone (390px) to a laptop (1440px): caption 13 to 14px,
        // copy 14 to 15px, subtitle 16 to 20px. above 1536px every step
        // grows with the screen, together (html's font-size, App.css), so
        // they stay that close there too
        caption: 'clamp(.8125rem, .789rem + .095vw, .875rem)',
        // a section's own text - descriptions, lists, the invitation to get
        // in touch
        body: 'clamp(.875rem, .852rem + .095vw, .9375rem)',
        copy: 'clamp(.875rem, .852rem + .095vw, .9375rem)',
        subtitle: 'clamp(1rem, .907rem + .381vw, 1.25rem)',
        heading: 'clamp(1.5rem, 1.1rem + 1.5vw, 2.875rem)',
        title: 'clamp(1.875rem, 1.05rem + 2.2vw, 3.75rem)',
        // the display sizes - headlines set against the screen's width.
        // each is one line from a phone to a wide screen, so it grows
        // evenly as the window does, with no step at a breakpoint
        logo: 'clamp(1.1rem, 1rem + .4vw, 1.4rem)',
        // the hero headline, sized to the screen's width - never under 2.5rem,
        // so on a phone it is still the page's largest line
        hero: 'max(2.5rem, calc(7.5vw - .4rem))',
        // (the work list is set below the hero: the hero is the louder line)
        project: 'calc(1.25rem + 5.6vw)',
        case: 'calc(1.9rem + 7.8vw)',
        next: 'calc(2.2rem + 5vw)',
        closing: 'calc(2rem + 6.5vw)',
      },
      fontFamily: {
        // headlines - Ayr Garon; text - Gilgan (the classes keep their
        // old names)
        flexible: ["Ayr Garon", "serif"],
        monolisa: ["Gilgan", "sans-serif"],
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
        // muted and rule follow the section's theme (App.css): supporting
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
