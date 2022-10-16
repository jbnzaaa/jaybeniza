//
import React, { useRef, useState, useEffect } from 'react'
// icons
import {RiArrowRightDownLine} from 'react-icons/ri'
// GSAP
import gsap from 'gsap' 
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function SelectedProject() {
  const panels = useRef([]);
  const panelsContainer = useRef();

  const createPanelsRefs = (panel, index) => {
    panels.current[index] = panel;
  };

  useEffect(() => {
    const totalPanels = panels.current.length;

    gsap.to(panels.current, {
      xPercent: -78 * (totalPanels - 1),
      ease: "none",
      scrollTrigger: {
        trigger: panelsContainer.current,
        pin: true,
        scrub: true,
        // markers: true
      }
    });
  }, []);

  return (
    <>
      {/* project section */}
      <div className="grid grid-cols-4 gap-0 pt-5" >
        <div className='col-span-4' >
          {/* daily discount */}
          <div id="panel-container" ref={panelsContainer}>
            <div className='flex items-center px-[3em]' id="panel" ref={(e) => createPanelsRefs(e, 0)}>
              {/* daily discount */}
              <div className="flex flex-col justify-end bg-dailydiscount h-[95vh] w-full p-10">
                {/* Header */}
                <div className="flex flex-col w-[50%]">
                  <span className='font-montserrat font-regular text-[1em] text-white'>Team / 2022 / Ongoing Web Development</span>
                  <span className='font-teko font-medium text-[5em] leading-none italic tracking-tight text-white'>Daily Discount</span>
                </div>
                {/* Context */}
                <ul className="flex flex-col w-[40%]">
                  <li className='flex flex-col mt-5 font-montserrat'>
                    <span className='font-semibold text-[1em] text-white'>Description</span>
                    <span className='font-regular text-[1em] text-white'>A WEB-BASED APPLICATION THAT OFFERS ONLINE-TRANSACTIONS FOR DISCOUNTED MOBILE GAME CREDITS.</span>
                  </li>
                  <li className='flex flex-col mt-5'>
                    <span className='font-semibold text-[1em] text-white'>Role</span>
                      <ul className="flex-wrap" id='data-list'>
                        <span className='font-regular text-[1em] text-white'>Front-End Developer</span>
                      </ul>
                  </li>
                  <li className='flex flex-col mt-5'>
                    <span className='font-semibold text-[1em] text-white'>Technologies used</span>
                    <ul className="flex-wrap" id='data-list'>
                      <li className='font-regular text-[1em] text-white'>React JS</li>
                      <li className='font-regular text-[1em] text-white'>Tailwind CSS</li>
                      <li className='font-regular text-[1em] text-white'>Vercel</li>
                      <li className='font-regular text-[1em] text-white'>Figma</li>
                    </ul>
                  </li>
                  <li className=' mt-5'>
                    <div className="flex justify-start">
                      <a href='https://daily-discount.vercel.app/' target='https://daily-discount.vercel.app/' className='flex items-center py-3 px-7 bg-white'>
                        <span className='mr-3 text-black text-[1em] font-medium'>Lauch App</span>
                        <RiArrowRightDownLine className='fill-black text-2xl'/>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/* jbnza */}
            <div className='flex items-center px-[3em]' id="panel" ref={(e) => createPanelsRefs(e, 1)}>
              {/* project card */}
              <div className="flex flex-col justify-end bg-jbnza h-[95vh] w-full p-10">
                {/* Header */}
                <div className="flex flex-col w-[50%]">
                  <span className='font-montserrat font-regular text-[1em] text-white'>Personal / 2022 / Web Development</span>
                  <span className='font-teko font-medium text-[5em] leading-none italic tracking-tight text-white'>jbnza</span>
                </div>
                {/* Context */}
                <ul className="flex flex-col w-[40%]">
                  <li className='flex flex-col mt-5 font-montserrat'>
                    <span className='font-semibold text-[1em] text-white'>Description</span>
                    <span className='font-regular text-[1em] text-white'>A WEB-BASED PORTFOLIO THAT SHOWCASES MY MOST CURRENT PROJECTS AS WELL AS AN OVERVIEW OF MY PERSONAL INFORMATION.</span>
                  </li>
                  <li className='flex flex-col mt-5'>
                    <span className='font-semibold text-[1em] text-white'>Role</span>
                    <ul className="flex-wrap" id='data-list'>
                      <li className='font-regular text-[1em] text-white'>Web Developer</li>
                      <li className='font-regular text-[1em] text-white'>UI Designer</li>
                    </ul>
                  </li>
                  <li className='flex flex-col mt-5'>
                    <span className='font-semibold text-[1em] text-white'>Technologies used</span>
                    <ul className="flex-wrap" id='data-list'>
                      <li className='font-regular text-[1em] text-white'>React JS</li>
                      <li className='font-regular text-[1em] text-white'>Material UI</li>
                      <li className='font-regular text-[1em] text-white'>Vercel</li>
                      <li className='font-regular text-[1em] text-white'>Figma</li>
                    </ul>
                  </li>
                  <li className=' mt-5'>
                    <div className="flex justify-start">
                      <a href='https://jbnza.vercel.app' target='https://jbnza.vercel.app' className='flex items-center py-3 px-7 bg-white'>
                        <span className='mr-3 text-black text-[1em] font-medium'>Lauch App</span>
                        <RiArrowRightDownLine className='fill-black text-2xl'/>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/* regain */}
            <div className='flex items-center px-[3em]' id="panel" ref={(e) => createPanelsRefs(e, 2)}>
              {/* project card */}
              <div className="flex flex-col justify-end bg-regain h-[95vh] w-full p-10">
                {/* Header */}
                <div className="flex flex-col w-[50%]">
                  <span className='font-montserrat font-regular text-[1em] text-white'>Team / 2021 / Web Development</span>
                  <span className='font-teko font-medium text-[5em] leading-none italic tracking-tight text-white'>Regain</span>
                </div>
                {/* Context */}
                <ul className="flex flex-col w-[40%]">
                  <li className='flex flex-col mt-5 font-montserrat'>
                    <span className='font-semibold text-[1em] text-white'>Description</span>
                    <span className='font-regular text-[1em] text-white'>A WEB-BASED SELF-ASSESSMENT AND E-JOURNAL SYSTEM WITH CHATBOT AND STUDENT COUNSELOR ASSISTANCE FOR TROUBLED STUDENT IN STI COLLEGE NOVALICHES.</span>
                  </li>
                  <li className='flex flex-col mt-5'>
                    <span className='font-semibold text-[1em] text-white'>Role</span>
                    <ul className="flex-wrap" id='data-list'>
                      <li className='font-regular text-[1em] text-white'>Lead Programmer</li>
                    </ul>
                  </li>
                  <li className='flex flex-col mt-5'>
                    <span className='font-semibold text-[1em] text-white'>Technologies used</span>
                    <ul className="flex flex-wrap" id='data-list'>
                      <li className='font-regular text-[1em] text-white'>HTML</li>
                      <li className='font-regular text-[1em] text-white'>CSS</li>
                      <li className='font-regular text-[1em] text-white'>SASS</li>
                      <li className='font-regular text-[1em] text-white'>JavaScript</li>
                      <li className='font-regular text-[1em] text-white'>JQuery</li>
                      <li className='font-regular text-[1em] text-white'>Bootstrap</li>
                      <li className='font-regular text-[1em] text-white'>NodeJS</li>
                      <li className='font-regular text-[1em] text-white'>Cloud Firestore</li>
                      <li className='font-regular text-[1em] text-white'>Firebase Admin</li>
                      <li className='font-regular text-[1em] text-white'>Google Cloud Storage</li>
                    </ul>
                  </li>
                  <li className=' mt-5'>
                    <div className="flex justify-start">
                      <a href='https://regain-caps.web.app/' target='https://regain-caps.web.app/' className='flex items-center py-3 px-7 bg-white'>
                        <span className='mr-3 text-black text-[1em] font-medium'>Lauch App</span>
                        <RiArrowRightDownLine className='fill-black text-2xl'/>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className='flex items-center px-[3em]' id="panel" ref={(e) => createPanelsRefs(e, 3)}>
              <div className="flex flex-col justify-between h-[95vh] w-[30%] p-7 bg-black">
                <span className='font-teko font-medium text-[6.3em] text-white leading-none italic tracking-tight'>Take a look at my UI designs</span>
                <div className="flex justify-start">
                  <a href='https://www.behance.net/jbnza' target='https://www.behance.net/jbnza' className='flex items-center py-3 px-7 bg-white'>
                    <span className='mr-3 text-black text-[1em] font-medium'>VIEW MORE</span>
                    <RiArrowRightDownLine className='fill-black text-2xl'/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SelectedProject

// css
// #selected-project{
//   height: 95px;
//   position: relative;
//   overflow: hidden;
//   width: 100%;

//   #projects{
//     position: absolute;
//     height: 95px;
//     width: 100%;
//     top: 100px;
//   }
// }

// #proj-container{
//   height: 20px;
//   width: 100%;
//   overflow: hidden; 
//   position: relative;

//   #description {
//     position: absolute;
//     width: 100%;
//     top: 100px;
//   }
// }

// #panel-container{
//   width: 400%;
//   height: 100vh;
//   display: flex;
//   flex-wrap: nowrap;

//   #panel{
//     height: 100%;
//     width: 100%;

//     #data-list{
//       display: flex;
//       flex-wrap: wrap;

//       li{
//         margin-right: 10px;
//       }
//     }
//   }
// }