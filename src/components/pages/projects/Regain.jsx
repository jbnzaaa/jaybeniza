// // 
// import React, { useRef, useEffect } from 'react'
// // 
// import { Link } from 'react-router-dom'
// // icons
// import {RiArrowRightDownLine} from 'react-icons/ri'
// // GSAP
// import gsap from 'gsap' 
// // import ScrollTrigger from 'gsap/ScrollTrigger'

// function Regain() {
//   const fxOnload = useRef();
//   const fxRevealImg = useRef();
//   const fxTitle1 = useRef();
//   const fxBack = useRef();
//   const fxParagraph1 = useRef();
//   const fxParagraph2 = useRef();
//   const fxParagraph3 = useRef();
//   const fxParagraph4 = useRef();
//   const fxCategory = useRef();
//   const fxCatCon = useRef();
//   const fxRole = useRef();
//   const fxRoleCon = useRef();
//   const fxTectStack = useRef();
//   const fxTectStackCon1 = useRef();
//   const fxTectStackCon2 = useRef();
//   const fxTectStackCon3 = useRef();
//   const fxLink = useRef();

//   useEffect(() => {
//     // onload animation
//     gsap.to(fxOnload.current, {
//       duration: 1, 
//       delay: .5,
//       top: '-100vh',
//       ease: 'power1.inOut',
//       scrollTrigger: {
//         trigger: fxOnload.current,
//         start: 'top 110%',
//       }
//     });

//     // image animation
//     gsap.to(fxRevealImg.current, {
//       duration: 1,
//       delay: 1, 
//       top: '0px',
//       // background: 'red',
//       ease: 'power1.inOut',
//       scrollTrigger: {
//         trigger: fxRevealImg.current,
//         start: 'top 100%',
//         // markers: true
//       }
//     });

//     // back button
//     gsap.to(fxBack.current, {
//       duration: 1,
//       delay: 1, 
//       top: '0px',
//       ease: 'power1.inOut',
//       scrollTrigger: {
//         trigger: fxBack.current,
//         // start: 'top 200%',
//       }
//     });
    
//     // project title
//     gsap.to(fxTitle1.current, {
//       duration: 1,
//       delay: 1.1,
//       top: '0px',
//       ease: 'power1.inOut',
//       scrollTrigger: {
//         trigger: fxTitle1.current,
//         // start: 'top 200%',
//       }
//     });

//     // paragraph
//     gsap.to(fxParagraph1.current, {
//       duration: 1,
//       delay: 1.2, 
//       top: '0px',
//       ease: 'power1.inOut',
//       scrollTrigger: {
//         trigger: fxParagraph1.current,
//         // start: 'top 200%',
//       }
//     });

//     gsap.to(fxParagraph2.current, {
//       duration: 1,
//       delay: 1.3, 
//       top: '0px',
//       ease: 'power1.inOut',
//       scrollTrigger: {
//         trigger: fxParagraph2.current,
//         // start: 'top 200%',
//       }
//     });

//     gsap.to(fxParagraph3.current, {
//       duration: 1,
//       delay: 1.4, 
//       top: '0px',
//       ease: 'power1.inOut',
//       scrollTrigger: {
//         trigger: fxParagraph3.current,
//         // start: 'top 200%',
//       }
//     });
    
//     // category 
//     gsap.to(fxCategory.current, {
//       duration: 1,
//       delay: 1.5, 
//       top: '0px',
//       ease: 'power1.inOut',
//       scrollTrigger: {
//         trigger: fxCategory.current,
//         // start: 'top 200%',
//       }
//     });
    
//     gsap.to(fxCatCon.current, {
//       duration: 1,
//       delay: 1.6, 
//       top: '0px',
//       ease: 'power1.inOut',
//       scrollTrigger: {
//         trigger: fxCatCon.current,
//         // start: 'top 200%',
//       }
//     });
    
//     // role
//     gsap.to(fxRole.current, {
//       duration: 1,
//       delay: 1.7, 
//       top: '0px',
//       ease: 'power1.inOut',
//       scrollTrigger: {
//         trigger: fxRole.current,
//         // start: 'top 200%',
//       }
//     });
    
//     gsap.to(fxRoleCon.current, {
//       duration: 1,
//       delay: 1.8, 
//       top: '0px',
//       ease: 'power1.inOut',
//       scrollTrigger: {
//         trigger: fxRoleCon.current,
//         // start: 'top 200%',
//       }
//     });

//     // tech stack
//     gsap.to(fxTectStack.current, {
//       duration: 1,
//       delay: 1.9, 
//       top: '0px',
//       ease: 'power1.inOut',
//       scrollTrigger: {
//         trigger: fxTectStack.current,
//         // start: 'top 200%',
//       }
//     });
    
//     gsap.to(fxTectStackCon1.current, {
//       duration: 1,
//       delay: 2, 
//       top: '0px',
//       ease: 'power1.inOut',
//       scrollTrigger: {
//         trigger: fxTectStackCon1.current,
//         // start: 'top 200%',
//       }
//     });
    
//     gsap.to(fxTectStackCon2.current, {
//       duration: 1,
//       delay: 2.1, 
//       top: '0px',
//       ease: 'power1.inOut',
//       scrollTrigger: {
//         trigger: fxTectStackCon2.current,
//         // start: 'top 200%',
//       }
//     });
    
//     gsap.to(fxTectStackCon3.current, {
//       duration: 1,
//       delay: 2.2, 
//       top: '0px',
//       ease: 'power1.inOut',
//       scrollTrigger: {
//         trigger: fxTectStackCon3.current,
//         // start: 'top 200%',
//       }
//     });
    
//     // project link
//     gsap.to(fxLink.current, {
//       duration: 1,
//       delay: 2.3, 
//       top: '0px',
//       ease: 'power1.inOut',
//       scrollTrigger: {
//         trigger: fxLink.current,
//         // start: 'top 200%',
//       }
//     });
//   }, []);
  
//   return (
//     <>
//       <div id="card-container">
//         <div id="sticky">
//           <div className='bg-black w-full h-screen' id="project-card" ref={fxOnload}/>
//         </div>
//         <div className="grid grid-cols-4 gap-x-10 p-[3em] h-screen">
//           {/* contet */}
//           <section className="col-span-1 col-start-1 flex flex-col justify-between">
//             <div className='w-full flex justify-start' id='span-container'>
//               <Link to='/'>
//                 <span className='font-montserrat text-[.9em] text-black' ref={fxBack}>back</span>
//               </Link>
//             </div>
//             <div>
//               <div className="flex flex-col pb-5">
//                 <div id="title-container">
//                   <span className='font-teko font-medium text-[3em] leading-none italic tracking-tight text-black' id='title' ref={fxTitle1}>Regain <span className='font-teko font-normal text-black text-[.5em]'>/ 2021</span></span>
//                 </div>
//                 <div id='p-container'>
//                   <p className='font-regular text-[.9em] text-black' ref={fxParagraph1}>A WEB-BASED SELF-ASSESSMENT AND E-</p>
//                 </div>
//                 <div id='p-container'>
//                   <p className='font-regular text-[.9em] text-black' ref={fxParagraph2}>JOURNAL SYSTEM WITH CHATBOT AND STUDENT</p>
//                 </div>
//                 <div id='p-container'>
//                   <p className='font-regular text-[.9em] text-black' ref={fxParagraph3}>COUNSELOR ASSISTANCE FOR TROUBLED</p>
//                 </div>
//                 <div id='p-container'>
//                   <p className='font-regular text-[.9em] text-black' ref={fxParagraph4}>STUDENT IN STI COLLEGE NOVALICHES.</p>
//                 </div>
//               </div>
//               <div className="flex flex-col pb-5">
//                 <div id="span-container">
//                   <span className='font-semibold text-[.5em] text-black' ref={fxCategory}>Category</span>
//                 </div>
//                 <div id="span-container">
//                   <span className='font-regular text-[.9em] text-black' ref={fxCatCon}>Team / Web Development</span>
//                 </div>
//               </div>
//               <div className="flex flex-col pb-5">
//                 <div id="span-container">
//                   <span className='font-semibold text-[.5em] text-black' ref={fxRole}>Role</span>
//                 </div>
//                 <div id="span-container">
//                   <ul className="flex flex-wrap" id='data-list' ref={fxRoleCon}>
//                     <li className='font-regular text-[.9em] text-black'>Lead Programmer</li>
//                   </ul>
//                 </div>
//               </div>
//               <div className="flex flex-col pb-10">
//                 <div id="span-container">
//                   <span className='font-semibold text-[.5em] text-black' ref={fxTectStack}>Technologies Used</span>
//                 </div>
//                 <div id="span-container">
//                   <ul className="flex flex-wrap" id='data-list' ref={fxTectStackCon1}>
//                     <li className='font-regular text-[.9em] text-black'>HTML</li>
//                     <li className='font-regular text-[.9em] text-black'>CSS</li>
//                     <li className='font-regular text-[.9em] text-black'>SASS</li>
//                     <li className='font-regular text-[.9em] text-black'>JavaScript</li>
//                     <li className='font-regular text-[.9em] text-black'>JQuery</li>
//                   </ul>
//                 </div>
//                 <div id="span-container">
//                   <ul className="flex flex-wrap" id='data-list' ref={fxTectStackCon2}>
//                     <li className='font-regular text-[.9em] text-black'>Bootstrap</li>
//                     <li className='font-regular text-[.9em] text-black'>NodeJS</li>
//                     <li className='font-regular text-[.9em] text-black'>Cloud Firestore</li>
//                   </ul>
//                 </div>
//                 <div id="span-container">
//                   <ul className="flex flex-wrap" id='data-list' ref={fxTectStackCon3}>
//                     <li className='font-regular text-[.9em] text-black'>Firebase Admin</li>
//                     <li className='font-regular text-[.9em] text-black'>Google Cloud Storage</li>
//                   </ul>
//                 </div>
//               </div>
//               <div id='project-link'>
//                 <a href='https://regain-caps.web.app/' target='https://regain-caps.web.app/' className='flex items-center' id='button-container'>
//                   <span className='font-montserrat text-[.9em] text-black flex' ref={fxLink}>
//                     visit website
//                     <RiArrowRightDownLine id='icons' className='fill-black text-2xl ml-2'/>
//                   </span>
//                 </a>
//               </div>
//             </div>
//           </section>
//           <section className="col-span-3 col-start-2" id='img-container'>
//             <div className='col-span-3 bg-regain bg-cover h-full w-full' id='project-img' ref={fxRevealImg}/>
//           </section>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Regain