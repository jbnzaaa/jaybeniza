//
import React, { useEffect } from 'react'
// GSAP
import gsap from 'gsap' 
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function Contact() {
  useEffect(() => {
    // drop a message animation
    // contact description animation
    gsap.to('#context', {
      duration: 1,
      y: 0,
      stagger: .05,
      ease: 'power1.in',
      scrollTrigger: { 
        trigger: '#context', 
        start: 'bottom 100%',
      }
    });

    // contact email links animation
    gsap.to('#accounts', {
      duration: 1,
      delay: 1.3,
      y: 0,
      stagger: .05,
      ease: 'power1.in',
      scrollTrigger: { 
        trigger: '#accounts', 
        start: 'bottom 100%',
      }
    });
  },[]);

  return (
    <>
      {/* contact container */}
      <div id='contact'>
        {/*  */}
        <div className='grid grid-cols-8 gap-0'>
          <section className='col-span-8 bg-black grid grid-cols-8 grid-rows-2 gap-0
            mobile:p-[.9rem] mobile:h-[80vh] mobile:grid-flow-row
            tablet:p-[1rem] tablet:h-[90vh] tablet:grid-flow-row
            laptop:p-[2rem] laptop:h-[60vh] laptop:grid-flow-col
            laptop-lg:p-[3rem] laptop:h-[60vh] laptop-lg:grid-flow-col
            desktop:p-[3rem] desktop:h-[60vh] desktop:grid-flow-col'>
            {/* drop a message */}
            <div className='
              mobile:col-span-8 mobile:row-span-1 mobile:row-start-1
              tablet:col-span-8 tablet:row-span-1 tablet:row-start-1
              laptop:col-span-5 laptop:row-span-1 laptop:row-start-1
              laptop-lg:col-span-5 laptop-lg:row-span-1 laptop-lg:row-start-1
              desktop:col-span-5 desktop:row-span-1 desktop:row-start-1'>
              <div className='flex flex-wrap font-lexend font-semibold leading-none tracking-tight
                mobile:h-[100px] mobile:text-[4.5rem] mobile:mt-10
                tablet:h-[100px] tablet:text-[6rem] tablet:mt-14
                laptop:h-[150px] laptop:text-[7rem]
                laptop-lg:h-[150px] laptop-lg:text-[10rem]
                desktop:h-[150px] desktop:text-[10rem]'>
                <div id='drop-message-container'>
                  <p className='text-white 
                  mobile:translate-y-[100px]
                  tablet:translate-y-[100px]
                  laptop:translate-y-[150px]
                  laptop-lg:translate-y-[150px]
                  desktop:translate-y-[150px]' 
                  id="context">Drop</p>
                </div>
                <div id="drop-message-container">
                  <p className='text-white ml-2
                  mobile:translate-y-[100px]
                  tablet:translate-y-[100px]
                  laptop:translate-y-[150px]
                  laptop-lg:translate-y-[150px]
                  desktop:translate-y-[150px]' 
                  id="context">a</p>
                </div>
                <div id="drop-message-container">
                  <p className='text-white 
                  mobile:translate-y-[100px]
                  tablet:translate-y-[100px]
                  laptop:translate-y-[150px]
                  laptop-lg:translate-y-[150px]
                  desktop:translate-y-[150px]' 
                  id="context">Message</p>
                </div>
              </div>
            </div>
            {/* contact description content */}
            <div className='
              mobile:col-span-6 mobile:col-start-3 mobile:row-span-1 mobile:row-start-2
              tablet:col-span-5 tablet:col-start-4 tablet:row-span-1 tablet:row-start-2
              laptop:col-span-3 laptop:col-start-6 laptop:row-span-2 laptop:row-start-1
              laptop-lg:col-span-2 laptop-lg:col-start-7 laptop-lg:row-span-2 laptop-lg:row-start-1
              desktop:col-span-2 desktop:col-start-7 desktop:row-span-2 desktop:row-start-1'>
              {/* description content */}
              <div className='flex flex-wrap font-montserrat font-regular
                mobile:text-[1rem] mobile:mb-20
                tablet:text-[1.1rem] tablet:mb-20
                laptop:text-[1.2rem] laptop:mb-28
                laptop-lg:text-[1.2rem] laptop-lg:mb-24
                desktop:text-[1.3rem] desktop:mb-28'>
                <div id='contact-description-container'><p className='text-white' id="context">Do</p></div>
                <div id='contact-description-container'><p className='text-white' id="context">you</p></div>
                <div id='contact-description-container'><p className='text-white' id="context">have</p></div>
                <div id='contact-description-container'><p className='text-white' id="context">any</p></div>
                <div id='contact-description-container'><p className='text-white' id="context">ideas</p></div>
                <div id='contact-description-container'><p className='text-white' id="context">in</p></div>
                <div id='contact-description-container'><p className='text-white' id="context">mind?</p></div>
                <div id='contact-description-container'><p className='text-white' id="context">I’m</p></div>
                <div id='contact-description-container'><p className='text-white' id="context">willing</p></div>
                <div id='contact-description-container'><p className='text-white' id="context">to</p></div>
                <div id='contact-description-container'><p className='text-white' id="context">help</p></div>
                <div id='contact-description-container'><p className='text-white' id="context">you</p></div>
                <div id='contact-description-container'><p className='text-white' id="context">turn</p></div>
                <div id='contact-description-container'><p className='text-white' id="context">your</p></div>
                <div id='contact-description-container'><p className='text-white' id="context">web</p></div>
                <div id='contact-description-container'><p className='text-white' id="context">design</p></div>
                <div id='contact-description-container'><p className='text-white' id="context">ideas</p></div>
                <div id='contact-description-container'><p className='text-white' id="context">into</p></div>
                <div id='contact-description-container'><p className='text-white' id="context">reality.</p></div>
              </div>
              {/* email accounts content */}
              <div className='flex justify-between w-full font-montserrat h-[20px]
                mobile:text-[1rem]
                tablet:text-[1.1rem]
                laptop:text-[1.2rem]
                laptop-lg:text-[1.2rem]
                desktop:text-[1.3rem]'>
                <div className='w-[50%]'>
                  <div id='account-container'>
                    <div className='mb-2' id='accounts'>
                      <a href='mailto:jaysonbeniza@gmail.com' target='mailto:jaysonbeniza@gmail.com' 
                        className='text-white'>Email</a>
                    </div>
                  </div>
                  <div id='account-container'>
                    <div className='mb-2' id='accounts'>
                      <a href='https://www.facebook.com/jbnzaaa' target='https://www.facebook.com/jbnzaaa' 
                        className='text-white'>Facebook</a>
                    </div>
                  </div>
                  <div id='account-container'>
                    <div className='mb-2' id='accounts'>
                      <a href='https://www.instagram.com/jbnza_/' target='https://www.instagram.com/jbnza_/' 
                        className='text-white'>Instagram</a>
                    </div>
                  </div>
                </div>
                <div className='w-[50%]'>
                  <div id='account-container'>
                    <div className='mb-2' id='accounts'>
                      <a href='https://github.com/jbnzaaa' target='https://github.com/jbnzaaa' 
                        className='text-white'>Github</a>
                    </div>
                  </div>
                  <div id='account-container'>
                    <div className='mb-2' id='accounts'>
                      <a href='https://www.behance.net/jbnza' target='https://www.behance.net/jbnza' 
                        className='text-white'>Behance</a>
                    </div>
                  </div>
                  <div id='account-container'>
                    <div className='mb-2' id='accounts'>
                      <a href='https://www.linkedin.com/in/jaybeniza/' target='https://www.linkedin.com/in/jaybeniza/' 
                        className='text-white'>Linked In</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Contact