//
import React, { useEffect } from 'react'
// scroll reveal
import { scrollReveal } from '../../utils/scrollReveal'
// per-letter text split
import SplitText from '../common/SplitText'
// footer
import Footer from './Footer'

const DESCRIPTION = 'Do you have any ideas in mind? Feel free to message me, I’m willing to help you turn your web design ideas into reality.';

const ACCOUNTS = [
  [
    { label: 'Email', href: 'mailto:jaysonbeniza@gmail.com' },
    { label: 'Facebook', href: 'https://www.facebook.com/jbnzaaa' },
    { label: 'Instagram', href: 'https://www.instagram.com/jbnza_/' },
  ],
  [
    { label: 'Github', href: 'https://github.com/jbnzaaa' },
    { label: 'Behance', href: 'https://www.behance.net/jbnza' },
    { label: 'Linked In', href: 'https://www.linkedin.com/in/jaybeniza/' },
  ],
];

function Contact() {
  useEffect(() => {
    // drop a message + contact description reveal
    const reveal = scrollReveal('#animate-contact', {
      y: 0,
      stagger: .02,
      ease: 'power1.in',
    });
    return () => reveal.kill();
  },[]);

  return (
    <>
      {/* contact container - with the footer inside it, the two fill
        exactly one screen: the contact block takes whatever height the
        footer leaves */}
      <div id='contact' className='flex flex-col min-h-screen-safe bg-black'>
        {/*  */}
        <div className='grid grid-cols-8 gap-0 flex-1'>
          <section className='col-span-8 bg-black grid grid-cols-8 grid-rows-[auto_1fr] gap-0
            mobile:p-[.9rem] mobile:pb-10 mobile:min-h-[80svh] mobile:gap-y-16 mobile:grid-flow-row
            tablet:p-[1rem] tablet:pb-12 tablet:min-h-[70svh] tablet:gap-y-20 tablet:grid-flow-row
            laptop:p-[2rem] laptop:min-h-[60vh] laptop:grid-flow-col
            laptop-lg:p-[3rem] laptop-lg:min-h-[60vh] laptop-lg:grid-flow-col
            desktop:p-[3rem] desktop:min-h-[60vh] desktop:grid-flow-col'>
            {/* drop a message */}
            <div className='
              mobile:col-span-8 mobile:row-span-1 mobile:row-start-1
              tablet:col-span-8 tablet:row-span-1 tablet:row-start-1
              laptop:col-span-5 laptop:row-span-1 laptop:row-start-1
              laptop-lg:col-span-5 laptop-lg:row-span-1 laptop-lg:row-start-1
              desktop:col-span-5 desktop:row-span-1 desktop:row-start-1'>
              <div className='flex flex-wrap font-flexible font-semibold leading-none tracking-tight text-white
                mobile:text-[24vw] mobile:mt-10
                tablet:text-[24vw] tablet:mt-14
                laptop:text-[15vw]
                laptop-lg:text-[15vw]
                desktop:text-[15vw]'>
                <SplitText text='Drop a Message' id='animate-contact' />
              </div>
            </div>
            {/* contact description content */}
            <div className='
              mobile:col-span-8 mobile:col-start-1 mobile:row-span-1 mobile:row-start-2
              tablet:col-span-8 tablet:col-start-1 tablet:row-span-1 tablet:row-start-2
              laptop:col-span-3 laptop:col-start-6 laptop:row-span-2 laptop:row-start-1
              laptop-lg:col-span-2 laptop-lg:col-start-7 laptop-lg:row-span-2 laptop-lg:row-start-1
              desktop:col-span-2 desktop:col-start-7 desktop:row-span-2 desktop:row-start-1'>
              {/* description content */}
              <div className='flex flex-wrap font-monolisa font-regular text-white
                mobile:text-[.9rem] mobile:mb-20
                tablet:text-[.9rem] tablet:mb-20
                laptop:text-[1rem] laptop:mb-28
                laptop-lg:text-[1rem] laptop-lg:mb-24
                desktop:text-[1.1rem] desktop:mb-28'>
                <SplitText text={DESCRIPTION} id='animate-contact' by='word' />
              </div>
              {/* email accounts content */}
              <div className='flex justify-between w-full font-monolisa
                mobile:text-[.9rem]
                tablet:text-[.9rem]
                laptop:text-[1rem]
                laptop-lg:text-[1rem]
                desktop:text-[1.1rem]'>
                {ACCOUNTS.map((column, colIndex) => (
                  <div className='w-[50%]' key={colIndex}>
                    {column.map(({ label, href }) => {
                      const isExternal = href.startsWith('http');
                      return (
                        <div className='account-container' key={label}>
                          <div className='accounts mb-2'>
                            <a href={href} {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})} className='text-white'>
                              <SplitText text={label} id='animate-contact' />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
        <Footer/>
      </div>
    </>
  )
}

export default Contact
