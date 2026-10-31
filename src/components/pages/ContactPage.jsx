//
import React from 'react'
// Components
import ProjectRequest from './ProjectRequest';
import Contact from './Contact';
// the tab's title
import { usePageTitle } from '../../utils/pageTitle'

/**
 * The contact page (route /get-in-touch): the project request - a form
 * for a client to set out a project - then the closing section and footer,
 * here pointing to the work ("View My Projects") since the page is itself
 * the way to get in touch.
 */
function ContactPage() {
  usePageTitle('Get in Touch', 'Start a project with Jay Beniza. Tell me about your website, web app or mobile app, and I will get back to you about design and build.');
  return (
    <>
      <ProjectRequest/>
      <Contact projects/>
    </>
  )
}

export default ContactPage
