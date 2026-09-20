// 
import React, { useEffect } from 'react'
// 
import { Link } from 'react-router-dom'
// icons
import {RiArrowRightDownLine} from 'react-icons/ri'
// Project screenshot
import regain_landingpage from '../../../../src/assets/files/images/regain/regain-landing-page.png'
import regain_login from '../../../../src/assets/files/images/regain/student-login-page.png'
import regain_dashboard from '../../../../src/assets/files/images/regain/student-dashboard-page.png'
import regain_assessment from '../../../../src/assets/files/images/regain/student-assessment-page.png'
import regain_ejournal from '../../../../src/assets/files/images/regain/student-e-journal-page.png'
import regain_message from '../../../../src/assets/files/images/regain/student-message-page.png'
import regain_history from '../../../../src/assets/files/images/regain/student-history-page.png'
// GSAP
<<<<<<< HEAD
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
// scroll reveal
import { scrollReveal } from '../../../utils/scrollReveal'
gsap.registerPlugin(ScrollTrigger)

const DESCRIPTION_WORDS = [
  'Regain', 'is', 'a', 'web-based', 'self-assessment', 'and', 'E-journal',
  'system', 'with', 'chatbot', 'assistance', 'for', 'troubled', 'student',
  'in', 'STI', 'College', 'Novaliches.',
];

function Regain() {
  useEffect(() => {
    // project content animation
    const reveal = scrollReveal('#animate-dailydiscount', {
      y: 0,
      stagger: .05,
      ease: 'power1.in',
    });

=======
import gsap from 'gsap' 
import ScrollTrigger from 'gsap/ScrollTrigger'
import Contact from '../Contact'
gsap.registerPlugin(ScrollTrigger)

function Regain() {
  useEffect(() => {
    // project content animation
    gsap.to('#animate-dailydiscount', {
      duration: 1,
      y: 0,
      stagger: .05,
      ease: 'power1.in',
      scrollTrigger: { 
        trigger: '#animate-dailydiscount', 
        // start: 'bottom 100%',
        // markers: true
      }
    });
    
>>>>>>> origin/master
    gsap.to('#animate-screenshot', {
      delay: .8,
      duration: 1,
      stagger: .05,
      y: 0,
      ease: 'power1.in'
    });

    window.scrollTo(0, 0)
<<<<<<< HEAD

    return () => reveal.kill();
=======
>>>>>>> origin/master
  }, []);

  return (
    <>
      <section className='px-0 py-3 h-full
        mobile:px-[.9rem]
        tablet:px-[1rem]
        laptop:px-[2rem]
        laptop-lg:px-[3rem]
        desktop:px-[3rem]'>
        <div className='project-container grid grid-cols-8 gap-x-5
          mobile:gap-y-10
          tablet:gap-y-10
          laptop:gap-y-14
          laptop-lg:gap-y-20
          desktop:gap-y-20'>
          {/* project container row 1 */}
          <div className='col-start-1
            mobile:col-span-6
            tablet:col-span-6
            tablet:col-span-4
            laptop:col-span-4
            laptop-lg:col-span-4
            desktop:col-span-4'>
            <div className='p-container flex flex-wrap
              mobile:h-[35px] mobile:mb-2 mobile:text-[2rem]
              tablet:h-[60px] tablet:mb-2 tablet:text-[3rem]
              laptop:h-[90px] laptop:mb-3 laptop:text-[4rem]
              laptop-lg:h-[100px] laptop-lg:mb-3 laptop-lg:text-[5.3rem]
              desktop:h-[110px] desktop:mb-3 desktop:text-[5.5rem]'>
              <span className='project-h1 font-lexend font-medium leading-none tracking-tighter
                mobile:translate-y-[35px]
                tablet:translate-y-[80px]
                laptop:translate-y-[110px]
                laptop-lg:translate-y-[110px]
                desktop:translate-y-[110px]'
                id='animate-dailydiscount'>
                Regain
              </span>
            </div>
          </div>
          <div className='col-span-2 col-start-7'>
            <div className='font-lexend font-medium cursor-pointer tracking-tighter text-right
              mobile:text-[.9rem] mobile:h-[20px] 
              tablet:text-[.9rem] tablet:h-[20px] 
              laptop:text-[1rem] laptop:h-[30px] 
              laptop-lg:text-[1rem] laptop-lg:h-[30px] 
              desktop:text-[1.1rem] desktop:h-[30px]'>
              <Link to='/'>
                <div className='p-container'><p className='project-p' id='animate-dailydiscount'>Return</p></div>
              </Link>
            </div>
          </div>
          {/* project container row 2 */}
          <div className='col-start-1
            mobile:col-span-2
            tablet:col-span-1
            laptop:col-span-1
            laptop-lg:col-span-1
            desktop:col-span-1'>
            <div className='h-[30px]
              mobile:text-[.9rem] mobile:h-[20px] 
              tablet:text-[.9rem] tablet:h-[20px] 
              laptop:text-[1rem] laptop:h-[30px] 
              laptop-lg:text-[1rem] laptop-lg:h-[30px]
              desktop:text-[1.1rem] desktop:h-[30px]'>
              <div className='p-container'><p className='project-p' id='animate-dailydiscount'>2021</p></div>
            </div>
          </div>
          <div className='col-start-2
            mobile:col-span-6
            tablet:col-span-6
            laptop:col-span-2
            laptop-lg:col-span-2
            desktop:col-span-2'>
            <div className='flex flex-wrap
              mobile:text-[.9rem]
              tablet:text-[.9rem]
              laptop:text-[1rem] 
              laptop-lg:text-[1rem]
              desktop:text-[1.1rem] '>
<<<<<<< HEAD
              {DESCRIPTION_WORDS.map((word, i) => (
                <div className='p-container h-[30px] mobile:h-[20px] tablet:h-[20px]' key={i}>
                  <p className='project-p' id='animate-dailydiscount'>{word}</p>
                </div>
              ))}
=======
              <div className='p-container h-[30px] mobile:h-[20px] tablet:h-[20px]'><p className='project-p' id='animate-dailydiscount'>Regain</p></div>
              <div className='p-container h-[30px] mobile:h-[20px] tablet:h-[20px]'><p className='project-p' id='animate-dailydiscount'>is</p></div>
              <div className='p-container h-[30px] mobile:h-[20px] tablet:h-[20px]'><p className='project-p' id='animate-dailydiscount'>a</p></div>
              <div className='p-container h-[30px] mobile:h-[20px] tablet:h-[20px]'><p className='project-p' id='animate-dailydiscount'>web-based</p></div>
              <div className='p-container h-[30px] mobile:h-[20px] tablet:h-[20px]'><p className='project-p' id='animate-dailydiscount'>self-assessment</p></div>
              <div className='p-container h-[30px] mobile:h-[20px] tablet:h-[20px]'><p className='project-p' id='animate-dailydiscount'>and</p></div>
              <div className='p-container h-[30px] mobile:h-[20px] tablet:h-[20px]'><p className='project-p' id='animate-dailydiscount'>E-journal</p></div>
              <div className='p-container h-[30px] mobile:h-[20px] tablet:h-[20px]'><p className='project-p' id='animate-dailydiscount'>system</p></div>
              <div className='p-container h-[30px] mobile:h-[20px] tablet:h-[20px]'><p className='project-p' id='animate-dailydiscount'>with</p></div>
              <div className='p-container h-[30px] mobile:h-[20px] tablet:h-[20px]'><p className='project-p' id='animate-dailydiscount'>chatbot</p></div>
              <div className='p-container h-[30px] mobile:h-[20px] tablet:h-[20px]'><p className='project-p' id='animate-dailydiscount'>assistance</p></div>
              <div className='p-container h-[30px] mobile:h-[20px] tablet:h-[20px]'><p className='project-p' id='animate-dailydiscount'>for</p></div>
              <div className='p-container h-[30px] mobile:h-[20px] tablet:h-[20px]'><p className='project-p' id='animate-dailydiscount'>troubled</p></div>
              <div className='p-container h-[30px] mobile:h-[20px] tablet:h-[20px]'><p className='project-p' id='animate-dailydiscount'>student</p></div>
              <div className='p-container h-[30px] mobile:h-[20px] tablet:h-[20px]'><p className='project-p' id='animate-dailydiscount'>in</p></div>
              <div className='p-container h-[30px] mobile:h-[20px] tablet:h-[20px]'><p className='project-p' id='animate-dailydiscount'>STI</p></div>
              <div className='p-container h-[30px] mobile:h-[20px] tablet:h-[20px]'><p className='project-p' id='animate-dailydiscount'>College</p></div>
              <div className='p-container h-[30px] mobile:h-[20px] tablet:h-[20px]'><p className='project-p' id='animate-dailydiscount'>Novaliches.</p></div>
>>>>>>> origin/master
            </div>
          </div>
          <div className='
            mobile:col-span-6 mobile:col-start-3
            tablet:col-span-6 tablet:col-start-2
            laptop:col-span-4 laptop:col-start-4
            laptop-lg:col-span-4 laptop-lg:col-start-5
            desktop:col-span-4 desktop:col-start-5'>
            {/* category */}
            <div className='
              mobile:mb-2
              tablet:mb-2
              laptop:mb-5
              laptop-lg:mb-5
              desktop:mb-5'>
              <div className='h-[20px]
                mobile:text-[.5rem]
                tablet:text-[.5rem]
                laptop:text-[.9rem] 
                laptop-lg:text-[.9rem] 
                desktop:text-[.9rem] '>
                <div className='p-container'><p className='project-ps font-semibold' id='animate-dailydiscount'>Category</p></div>
              </div>
              <div className='h-[30px]
                mobile:text-[.9rem]
                tablet:text-[.9rem]
                laptop:text-[1rem] 
                laptop-lg:text-[1rem] 
                desktop:text-[1.1rem] '>
                <div className='p-container'><p className='project-ps' id='animate-dailydiscount'>Team / Web Development</p></div>
              </div>
            </div>
            {/* role */}
            <div className='
              mobile:mb-2
              tablet:mb-2
              laptop:mb-5
              laptop-lg:mb-5
              desktop:mb-5'>
              <div className='h-[20px]
                mobile:text-[.5rem]
                tablet:text-[.5rem]
                laptop:text-[.9rem] 
                laptop-lg:text-[.9rem] 
                desktop:text-[.9rem] '>
                <div className='p-container'><p className='project-ps font-semibold' id='animate-dailydiscount'>Role</p></div>
              </div>
              <div className='flex flex-wrap h-[30px]
                mobile:text-[.9rem]
                tablet:text-[.9rem]
                laptop:text-[1rem] 
                laptop-lg:text-[1rem] 
                desktop:text-[1.1rem] '>
                <div className='p-container'><p className='project-ps' id='animate-dailydiscount'>Lead Programmer</p></div>
              </div>
            </div>
            {/* technology used */}
            <div className='
              mobile:mb-2
              tablet:mb-2
              laptop:mb-5
              laptop-lg:mb-5
              desktop:mb-5'>
              <div className='h-[20px]
                mobile:text-[.5rem]
                tablet:text-[.5rem]
                laptop:text-[.9rem] 
                laptop-lg:text-[.9rem] 
                desktop:text-[.9rem] '>
                <div className='p-container'><p className='project-ps font-semibold' id='animate-dailydiscount'>Technology Used</p></div>
              </div>
              <div className='flex flex-wrap
                mobile:text-[.9rem]
                tablet:text-[.9rem]
                laptop:text-[1rem] 
                laptop-lg:text-[1rem] 
                desktop:text-[1.1rem] '>
                <div className='p-container h-[30px] mobile:h-[20px] tablet:h-[20px]'><p className='project-ps' id='animate-dailydiscount'>HTML</p></div>
                <div className='p-container h-[30px] mobile:h-[20px] tablet:h-[20px]'><p className='project-ps' id='animate-dailydiscount'>CSS</p></div>
                <div className='p-container h-[30px] mobile:h-[20px] tablet:h-[20px]'><p className='project-ps' id='animate-dailydiscount'>JavaScript</p></div>
                <div className='p-container h-[30px] mobile:h-[20px] tablet:h-[20px]'><p className='project-ps' id='animate-dailydiscount'>JQUERY</p></div>
                <div className='p-container h-[30px] mobile:h-[20px] tablet:h-[20px]'><p className='project-ps' id='animate-dailydiscount'>Bootstrap</p></div>
                <div className='p-container h-[30px] mobile:h-[20px] tablet:h-[20px]'><p className='project-ps' id='animate-dailydiscount'>NodeJS</p></div>
                <div className='p-container h-[30px] mobile:h-[20px] tablet:h-[20px]'><p className='project-ps' id='animate-dailydiscount'>Dialogflow</p></div>
                <div className='p-container h-[30px] mobile:h-[20px] tablet:h-[20px]'><p className='project-ps' id='animate-dailydiscount'>Firebase Realtime Database</p></div>
                <div className='p-container h-[30px] mobile:h-[20px] tablet:h-[20px]'><p className='project-ps' id='animate-dailydiscount'>Cloud Firestore</p></div>
                <div className='p-container h-[30px] mobile:h-[20px] tablet:h-[20px]'><p className='project-ps' id='animate-dailydiscount'>Firebase Admin</p></div>
                <div className='p-container h-[30px] mobile:h-[20px] tablet:h-[20px]'><p className='project-ps' id='animate-dailydiscount'>Google Cloud Storage</p></div>
              </div>
            </div>
            {/* project link */}
            <div className='
              mobile:mb-2
              tablet:mb-2
              laptop:mb-5
              laptop-lg:mb-5
              desktop:mb-5'>
              <div className='h-[20px]
                mobile:text-[.5rem]
                tablet:text-[.5rem]
                laptop:text-[.9rem] 
                laptop-lg:text-[.9rem] 
                desktop:text-[.9rem] '>
                <div className='p-container'><p className='project-ps font-semibold' id='animate-dailydiscount'>Visit site</p></div>
              </div>
              <div className='flex flex-wrap h-[30px]
                mobile:text-[.9rem]
                tablet:text-[.9rem]
                laptop:text-[1rem] 
                laptop-lg:text-[1rem] 
                desktop:text-[1.1rem] '>
                <div className="p-container">
                  <div className='project-link' id='animate-dailydiscount'>
<<<<<<< HEAD
                    <a href='https://regain-caps.web.app/' target='_blank' rel='noreferrer'>
=======
                    <a href='https://regain-caps.web.app/' target='https://regain-caps.web.app/'>
>>>>>>> origin/master
                      <span className='flex items-center
                        mobile:text-[.9rem]
                        tablet:text-[.9rem]
                        laptop:text-[1rem]
                        laptop-lg:text-[1rem]
                        desktop:text-[1.1rem]'>
                        Regain
                        <RiArrowRightDownLine id='icon' className='fill-black ml-1
                        mobile:text-xl
                        tablet:text-1xl
                        laptop:text-2xl
                        laptop-lg:text-2xl
                        desktop:text-2xl'/>
                      </span> 
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* project container row 3 */}
        <div className='project-container grid grid-cols-8 gap-x-5 mt-10
            mobile:gap-y-5
            tablet:gap-y-10
            laptop:gap-y-14
            laptop-lg:gap-y-20
            desktop:gap-y-20'>
            {/* landing page */}
            <div className='screenshot-container
              mobile:col-span-8 mobile:col-start-1
              tablet:col-span-8 tablet:col-start-1
              laptop:col-span-8 laptop:col-start-1
              laptop-lg:col-span-8 laptop-lg:col-start-1
              desktop:col-span-8 desktop:col-start-1'>
              <img src={regain_landingpage} alt="regain-landingpage" className='screenshot-img border border-black' id='animate-screenshot'/>
            </div>
            {/* login */}
            <div className='screenshot-container
              mobile:col-span-8 mobile:col-start-1
              tablet:col-span-8 tablet:col-start-1
              laptop:col-span-5 laptop:col-start-3
              laptop-lg:col-span-5 laptop-lg:col-start-3
              desktop:col-span-5 desktop:col-start-3'>
              <img src={regain_login} alt="regain-login" className='screenshot-img border border-black' id='animate-screenshot'/>
            </div>
            {/* dashboard */}
            <div className='screenshot-container
              mobile:col-span-8 mobile:col-start-1
              tablet:col-span-8 tablet:col-start-1
              laptop:col-span-5 laptop:col-start-1
              laptop-lg:col-span-5 laptop-lg:col-start-1
              desktop:col-span-5 desktop:col-start-1'>
              <img src={regain_dashboard} alt="regain-dashboard" className='screenshot-img border border-black' id='animate-screenshot'/>
            </div>
            {/* assessment */}
            <div className='screenshot-container
              mobile:col-span-8 mobile:col-start-1
              tablet:col-span-8 tablet:col-start-1
              laptop:col-span-5 laptop:col-start-4
              laptop-lg:col-span-5 laptop-lg:col-start-4
              desktop:col-span-5 desktop:col-start-4'>
              <img src={regain_assessment} alt="regain-assessment" className='screenshot-img border border-black' id='animate-screenshot'/>
            </div>
            {/* ejournal */}
            <div className='screenshot-container
              mobile:col-span-8 mobile:col-start-1
              tablet:col-span-8 tablet:col-start-1
              laptop:col-span-5 laptop:col-start-2
              laptop-lg:col-span-5 laptop-lg:col-start-2
              desktop:col-span-5 desktop:col-start-2'>
              <img src={regain_ejournal} alt="regain-ejournal" className='screenshot-img border border-black' id='animate-screenshot'/>
            </div>
            {/* message */}
            <div className='screenshot-container
              mobile:col-span-8 mobile:col-start-1
              tablet:col-span-8 tablet:col-start-1
              laptop:col-span-5 laptop:col-start-1
              laptop-lg:col-span-5 laptop-lg:col-start-1
              desktop:col-span-5 desktop:col-start-1'>
              <img src={regain_message} alt="regain-message" className='screenshot-img border border-black' id='animate-screenshot'/>
            </div>
            {/* history */}
            <div className='screenshot-container
              mobile:col-span-8 mobile:col-start-1
              tablet:col-span-8 tablet:col-start-1
              laptop:col-span-5 laptop:col-start-4
              laptop-lg:col-span-5 laptop-lg:col-start-4
              desktop:col-span-5 desktop:col-start-4'>
              <img src={regain_history} alt="regain-history" className='screenshot-img border border-black' id='animate-screenshot'/>
            </div>
          </div>
      </section>
      {/* <Contact/> */}
    </>
  )
}

export default Regain