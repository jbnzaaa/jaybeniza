//
import React from 'react'
// Components
import Contact from './Contact';

/**
 * The contact page (route /get-in-touch): the contact section and footer as a
 * page of their own, one screen tall. Reached from "Drop a Message" in the
 * menu. Return sits in the top bar (Navbar.jsx).
 */
function ContactPage() {
  return (
    <>
      <Contact page/>
    </>
  )
}

export default ContactPage
