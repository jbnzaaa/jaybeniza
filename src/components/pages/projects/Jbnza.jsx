// // 
// import React, { useRef, useEffect } from 'react'
// // 
// import { Link } from 'react-router-dom'
// // icons
// import {RiArrowRightDownLine} from 'react-icons/ri'
// // GSAP
// import gsap from 'gsap' 
// // import ScrollTrigger from 'gsap/ScrollTrigger'

// function Jbnza() {
//   useEffect(() => {
//     // onload animation
//     gsap.to('#project-card', {
//       duration: 1, 
//       delay: .5,
//       y: '-100vh',
//       stagger: .05,
//       ease: 'power1.out',
//       scrollTrigger: {
//         trigger: '#project-card',
//         start: 'top 110%',
//       }
//     });

//     // image animation
//     gsap.to('#project-img', {
//       duration: 1,
//       delay: 1, 
//       y: 0,
//       ease: 'power1.out',
//       scrollTrigger: {
//         trigger: '#project-img',
//         start: 'top 150%',
//         // markers: true
//       }
//     });

//     // back button
//     gsap.to('#back', {
//       duration: 1,
//       delay: 1, 
//       y: 0,
//       stagger: .05,
//       ease: 'power1.out',
//       scrollTrigger: {
//         trigger: '#back',
//       }
//     });
    
//     // project title
//     gsap.to('#title', {
//       duration: 1,
//       delay: 1.1,
//       y: 0,
//       stagger: .05,
//       ease: 'power1.out',
//       scrollTrigger: {
//         trigger: '#title',
//       }
//     });

//     // paragraph
//     gsap.to('#project-p', {
//       duration: 1,
//       delay: 1.2, 
//       y: 0,
//       stagger: .05,
//       ease: 'power1.out',
//       scrollTrigger: {
//         trigger: '#project-p',
//       }
//     });

//     // project link
//     gsap.to('#visit', {
//       duration: 1,
//       delay: 1.6, 
//       y: 0,
//       stagger: .05,
//       ease: 'power1.out',
//       scrollTrigger: {
//         trigger: '#visit',
//       }
//     });
//   }, []);

//   return (
//     <>
//       <div id='card-container'>
//         <div id='sticky'>
//           <div className='bg-black w-full h-screen' id='project-card'/>
//         </div>
//         <div className='grid 
//           mobile:p-[.9rem] mobile:gap-3 mobile:grid-cols-1
//           tablet:p-[1rem] tablet:gap-3 tablet:grid-cols-1
//           laptop:p-[2rem] laptop:gap-5 laptop:grid-cols-8
//           laptop-lg:p-[3rem] laptop-lg:gap-5 laptop-lg:grid-cols-8
//           desktop:p-[3rem] desktop:gap-5 desktop:grid-cols-8'>
//           {/* project header */}
//           <section className='col-start-1 flex justify-between mb-10
//             mobile:col-span-1
//             tablet:col-span-1
//             laptop:col-span-8
//             laptop-lg:col-span-8
//             desktop:col-span-8'>
//             <div className='flex flex-col' id='title-container'>
//               <p className='font-lexend font-semibold leading-none tracking-tighter text-black w-[600px]
//               mobile:translate-y-[20px] mobile:text-[2.3rem]
//               tablet:translate-y-[20px] tablet:text-[3rem]
//               laptop:translate-y-[45px] laptop:text-[3.5rem]
//               laptop-lg:translate-y-[45px] laptop-lg:text-[4rem]
//               desktop:translate-y-[45px] desktop:text-[4rem]'
//               id='title'>
//                 jbnza
//               </p>
//             </div>
//             <div id='span-container'>
//               <Link to='/'>
//                 <p className='font-montserrat text-black
//                   mobile:text-[.5rem]
//                   tablet:text-[.5rem]
//                   laptop:text-[.5rem]
//                   laptop-lg:text-[.9rem]
//                   desktop:text-[.9rem]' 
//                   id='back'>
//                   Back
//                 </p>
//               </Link>
//             </div>
//           </section>
//           {/*  */}
//           <section className='grid grid-cols-8 grid-rows-3 gap-y-5
//             mobile:col-span-1 mobile:my-10
//             tablet:col-span-1 tablet:my-10
//             laptop:col-span-8 laptop:my-20
//             laptop-lg:col-span-8 laptop-lg:my-20
//             desktop:col-span-8 desktop:my-20'>
//             <div className='col-start-1 row-span-1 row-start-1
//               mobile:col-span-2
//               tablet:col-span-2
//               laptop:col-span-1
//               laptop-lg:col-span-1
//               desktop:col-span-1'>
//               <div className='flex flex-col' id='title-container'>
//                 <span className='font-lexend text-black text-[.9rem]
//                   mobile:translate-y-[20px]
//                   tablet:translate-y-[20px]
//                   laptop:translate-y-[15px]
//                   laptop-lg:translate-y-[15px]
//                   desktop:translate-y-[15px]'
//                   id='title'>
//                   2022
//                 </span>
//               </div>
//             </div>
//             <div className='row-span-3 row-start-1
//               mobile:col-span-6 mobile:col-start-3 mobile:mb-16 mobile:h-[auto]
//               tablet:col-span-5 tablet:col-start-3 tablet:mb-10 tablet:h-[auto]
//               laptop:col-span-2 laptop:col-start-2 laptop:mb-3 laptop:h-[auto]
//               laptop-lg:col-span-2 laptop-lg:col-start-2 laptop-lg:mb-3 laptop-lg:h-[auto]
//               desktop:col-span-2 desktop:col-start-2 desktop:mb-3 desktop:h-[auto]'>
//               <div className='flex flex-wrap leading-none
//                 mobile:text-[.5rem]
//                 tablet:text-[.5rem]
//                 laptop:text-[.5em]
//                 laptop-lg:text-[.9rem]
//                 desktop:text-[.9rem]'>
//                 <div id='p-container'><p id='project-p'>jbnza</p></div>
//                 <div id='p-container'><p id='project-p'>is</p></div>
//                 <div id='p-container'><p id='project-p'>a</p></div>
//                 <div id='p-container'><p id='project-p'>web-based</p></div>
//                 <div id='p-container'><p id='project-p'>portfolio</p></div>
//                 <div id='p-container'><p id='project-p'>designed</p></div>
//                 <div id='p-container'><p id='project-p'>to</p></div>
//                 <div id='p-container'><p id='project-p'>showcase</p></div>
//                 <div id='p-container'><p id='project-p'>my</p></div>
//                 <div id='p-container'><p id='project-p'>most</p></div>
//                 <div id='p-container'><p id='project-p'>recent</p></div>
//                 <div id='p-container'><p id='project-p'>projects,</p></div>
//                 <div id='p-container'><p id='project-p'>tech</p></div>
//                 <div id='p-container'><p id='project-p'>stacks</p></div>
//                 <div id='p-container'><p id='project-p'>I</p></div>
//                 <div id='p-container'><p id='project-p'>use</p></div>
//                 <div id='p-container'><p id='project-p'>and</p></div>
//                 <div id='p-container'><p id='project-p'>a</p></div>
//                 <div id='p-container'><p id='project-p'>bit</p></div>
//                 <div id='p-container'><p id='project-p'>information</p></div>
//                 <div id='p-container'><p id='project-p'>about</p></div>
//                 <div id='p-container'><p id='project-p'>myself.</p></div>
//               </div>
//             </div>
//             <div className='
//               mobile:col-span-6 mobile:col-start-3
//               tablet:col-span-3 tablet:col-start-3
//               laptop:col-span-2 laptop:col-start-5
//               laptop-lg:col-span-2 laptop-lg:col-start-5
//               desktop:col-span-2 desktop:col-start-5'>
//               <div className='flex flex-col leading-none
//                 mobile:text-[.5rem]
//                 tablet:text-[.5rem]
//                 laptop:text-[.5rem]
//                 laptop-lg:text-[.9rem]
//                 desktop:text-[.9rem]'>
//                 <div id='span-container'>
//                   <p className='font-semibold mb-1
//                     mobile:translate-y-[30px] mobile:text-[.5rem]
//                     tablet:translate-y-[30px] tablet:text-[.5rem]
//                     laptop:translate-y-[45px] laptop:text-[.5rem]
//                     laptop-lg:translate-y-[45px] laptop-lg:text-[.5rem]
//                     desktop:translate-y-[45px] desktop:text-[.5rem]' 
//                     id='project-p'>Category</p>
//                 </div>
//                 <div id='span-container'>
//                   <p className='font-normal
//                     mobile:translate-y-[30px]
//                     tablet:translate-y-[30px]
//                     laptop:translate-y-[45px]
//                     laptop-lg:translate-y-[45px]
//                     desktop:translate-y-[45px]' 
//                     id='project-p'>Personal / Web Development</p>
//                 </div>
//               </div>
//             </div>
//             <div className='
//               mobile:col-span-6 mobile:col-start-3
//               tablet:col-span-3 tablet:col-start-6
//               laptop:col-span-2 laptop:col-start-7
//               laptop-lg:col-span-2 laptop-lg:col-start-7
//               desktop:col-span-2 desktop:col-start-7'>
//               <div className='flex flex-col leading-none
//                 mobile:text-[.5rem]
//                 tablet:text-[.5rem]
//                 laptop:text-[.5rem]
//                 laptop-lg:text-[.9rem]
//                 desktop:text-[.9rem]'>
//                 <div id='span-container'>
//                   <p className='font-semibold mb-1
//                     mobile:translate-y-[30px] mobile:text-[.5rem]
//                     tablet:translate-y-[30px] tablet:text-[.5rem]
//                     laptop:translate-y-[45px] laptop:text-[.5rem]
//                     laptop-lg:translate-y-[45px] laptop-lg:text-[.9rem]
//                     desktop:translate-y-[45px] desktop:text-[.9rem]' 
//                     id='project-p'>Role</p>
//                 </div>
//                 <ul>
//                   <li id='span-container'>
//                     <p className='font-normal
//                       mobile:translate-y-[30px]
//                       tablet:translate-y-[30px]
//                       laptop:translate-y-[45px]
//                       laptop-lg:translate-y-[45px]
//                       desktop:translate-y-[45px]' 
//                       id='project-p'>Web Developer</p>
//                   </li>
//                   <li id='span-container'>
//                     <p className='font-normal
//                       mobile:translate-y-[30px]
//                       tablet:translate-y-[30px]
//                       laptop:translate-y-[45px]
//                       laptop-lg:translate-y-[45px]
//                       desktop:translate-y-[45px]' 
//                       id='project-p'>UI Designer</p>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//             <div className='
//               mobile:col-span-6 mobile:col-start-3
//               tablet:col-span-3 tablet:col-start-3
//               laptop:col-span-2 laptop:col-start-5
//               laptop-lg:col-span-2 laptop-lg:col-start-5
//               desktop:col-span-2 desktop:col-start-5'>
//               <div className='flex flex-col leading-none
//                 mobile:text-[.5rem]
//                 tablet:text-[.5rem]
//                 laptop:text-[.5rem]
//                 laptop-lg:text-[.9rem]
//                 desktop:text-[.9rem]'>
//                 <div id='span-container'>
//                   <p className='font-semibold mb-1
//                     mobile:translate-y-[20px] mobile:text-[.5rem]
//                     tablet:translate-y-[30px] tablet:text-[.5rem]
//                     laptop:translate-y-[45px] laptop:text-[.5rem]
//                     laptop-lg:translate-y-[45px] laptop-lg:text-[.9rem]
//                     desktop:translate-y-[45px] desktop:text-[.9rem]' 
//                     id='project-p'>Technology Used</p>
//                 </div>
//                 <ul className='flex flex-row flex-wrap'>
//                   <li id='span-container'>
//                     <p className='font-normal
//                       mobile:translate-y-[30px]
//                       tablet:translate-y-[30px]
//                       laptop:translate-y-[45px]
//                       laptop-lg:translate-y-[45px]
//                       desktop:translate-y-[45px]' 
//                       id='project-p'>React JS</p>
//                   </li>
//                   <li id='span-container'>
//                     <p className='font-normal
//                       mobile:translate-y-[30px]
//                       tablet:translate-y-[20px]
//                       laptop:translate-y-[45px]
//                       laptop-lg:translate-y-[45px]
//                       desktop:translate-y-[45px]' 
//                       id='project-p'>Material UI</p>
//                   </li>
//                   <li id='span-container'>
//                     <p className='font-normal
//                       mobile:translate-y-[30px]
//                       tablet:translate-y-[30px]
//                       laptop:translate-y-[45px]
//                       laptop-lg:translate-y-[45px]
//                       desktop:translate-y-[45px]' 
//                       id='project-p'>Vercel</p>
//                   </li>
//                   <li id='span-container'>
//                     <p className='font-normal
//                       mobile:translate-y-[30px]
//                       tablet:translate-y-[30px]
//                       laptop:translate-y-[45px]
//                       laptop-lg:translate-y-[45px]
//                       desktop:translate-y-[45px]' 
//                       id='project-p'>Figma</p>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//             <div className='
//               mobile:col-span-6 mobile:col-start-3
//               tablet:col-span-3 tablet:col-start-6
//               laptop:col-span-2 laptop:col-start-7
//               laptop-lg:col-span-2 laptop-lg:col-start-7
//               desktop:col-span-2 desktop:col-start-7'>
//               <div className='flex flex-col leading-none
//                 mobile:text-[.5rem]
//                 tablet:text-[.5rem]
//                 laptop:text-[.5rem]
//                 laptop-lg:text-[.9rem]
//                 desktop:text-[.9rem]'>
//                 <div className='flex flex-col justify-center mt-3' id='project-link'>
//                   <a href='https://jbnza.vercel.app' target='https://jbnza.vercel.app' className='flex items-center' id='button-container'>
//                     <p className='text-black flex items-center
//                       mobile:text-[.5rem]
//                       tablet:text-[.5rem]
//                       laptop:text-[.5rem]
//                       laptop-lg:text-[.9rem]
//                       desktop:text-[.9rem]' id='visit'>
//                       visit website
//                       <RiArrowRightDownLine id='icons' className='fill-black text-2xl ml-2'/>
//                     </p>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </section>
//           <section className='
//             mobile:col-span-1 mobile:col-start-1
//             tablet:col-span-1 tablet:col-start-1
//             laptop:col-span-8 laptop:col-start-1
//             laptop-lg:col-span-8 laptop-lg:col-start-1
//             desktop:col-span-8 desktop:col-start-1' id='img-container'>
//             <div className='bg-jbnza bg-cover w-full
//               mobile:translate-y-[350px] mobile:h-[350px]
//               tablet:translate-y-[450px] tablet:h-[450px]
//               laptop:translate-y-[550px] laptop:h-[550px]
//               laptop-lg:translate-y-[550px] laptop-lg:h-[550px]
//               desktop:translate-y-[550px] desktop:h-[550px]'
//               id='project-img'/>
//           </section>
//         </div>
//       </div>

      
//     </>
//   )
// }

// export default Jbnza