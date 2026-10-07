//
import React from 'react'
import Hero from './Hero'
import About from './About'
import Project from './Project';
import Testimonials from './Testimonials';
import Contact from './Contact';

function Home() {
  return (
    <>
      <div className='overflow-hidden'>
        <Hero/>
        <About/>
        <Project/>
        <Testimonials/>
        <Contact/>
      </div>
    </>
  )
}

export default Home
