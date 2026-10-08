//
import React from 'react'
import Hero from './Hero'
import Project from './Project';
import About from './About'
import Services from './Services';
import Testimonials from './Testimonials';
import Contact from './Contact';

// the landing page, light and dark sections in turn: hero (light), the
// work (dark), the designer (light), what I do (dark), words from the
// team (light), then the closing contact screen (darkest)
function Home() {
  return (
    <>
      <div className='overflow-hidden'>
        <Hero/>
        <Project/>
        <About/>
        <Services detailed/>
        <Testimonials/>
        <Contact/>
      </div>
    </>
  )
}

export default Home
