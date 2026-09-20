//
import React, { useEffect } from 'react'
// scroll reveal
import { scrollReveal } from '../../utils/scrollReveal'

const DROP_MESSAGE_WORDS = ['Drop', 'a', 'Message'];

const DESCRIPTION_WORDS = [
  'Do', 'you', 'have', 'any', 'ideas', 'in', 'mind?', 'Feel', 'free', 'to',
  'message', 'me,', 'I’m', 'willing', 'to', 'help', 'you', 'turn', 'your',
  'web', 'design', 'ideas', 'into', 'reality.',
];

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
      stagger: .05,
      ease: 'power1.in',
    });
    return () => reveal.kill();
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
            laptop-lg:p-[3rem] laptop-lg:h-[60vh] laptop-lg:grid-flow-col
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
                {DROP_MESSAGE_WORDS.map((word, i) => (
                  <div className='drop-message-container' key={i}>
                    <p className={`context text-white ${i === 1 ? 'ml-2' : ''}
                      mobile:translate-y-[100px]
                      tablet:translate-y-[100px]
                      laptop:translate-y-[150px]
                      laptop-lg:translate-y-[160px]
                      desktop:translate-y-[160px]`}
                      id='animate-contact'>
                      {word}
                    </p>
                  </div>
                ))}
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
                mobile:text-[.9rem] mobile:mb-20
                tablet:text-[.9rem] tablet:mb-20
                laptop:text-[1rem] laptop:mb-28
                laptop-lg:text-[1rem] laptop-lg:mb-24
                desktop:text-[1.1rem] desktop:mb-28'>
                {DESCRIPTION_WORDS.map((word, i) => (
                  <div className='contact-description-container' key={i}>
                    <p className='context text-white' id='animate-contact'>{word}</p>
                  </div>
                ))}
              </div>
              {/* email accounts content */}
              <div className='flex justify-between w-full font-montserrat h-[20px]
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
                          <div className='accounts mb-2' id='animate-contact'>
                            <a href={href} {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})} className='text-white'>
                              {label}
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
      </div>
    </>
  )
}

export default Contact
