//
import React from 'react'
// Components
import ProjectRequest from './ProjectRequest';
import Contact from './Contact';

/**
 * The contact page (route /get-in-touch): the project request - a form
 * for a client to set out a project - then the closing section and footer,
 * here pointing to the work ("View My Projects") since the page is itself
 * the way to get in touch.
 */
function ContactPage() {
  return (
    <>
      <ProjectRequest/>
      <Contact projects/>
    </>
  )
}

export default ContactPage
