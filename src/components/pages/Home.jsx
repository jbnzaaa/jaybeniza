// 
import React from 'react'
import Hero from './Hero'
import About from './About'
import WorkExperience from './WorkExperience'
import CertificatesAwards from './CertificatesAwards'
import Project from './Project';
import Contact from './Contact';

function Home() {
  return (
    <>
      <div className='overflow-hidden'>
        <Hero/>
        <About/>
        <WorkExperience/>
        <CertificatesAwards/>
        <Project/>
        <Contact/>
      </div>
    </>
  )
}

export default Home