// import 
// // React, 
// { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const ScrollToTop = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   // Show button when page is scrolled down 400px
//   useEffect(() => {
//     const toggleVisibility = () => {
//       if (window.scrollY > 400) {
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//       }
//     };

//     window.addEventListener('scroll', toggleVisibility);
//     return () => window.removeEventListener('scroll', toggleVisibility);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   return (
//     <AnimatePresence>
//       {isVisible && (
//         <motion.button
//           initial={{ opacity: 0, scale: 0.5 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.5 }}
//           onClick={scrollToTop}
//           className="fixed bottom-8 right-8 z-[90] p-4 rounded-full bg-[#FFD700] text-[#001F5C] shadow-2xl hover:bg-white transition-colors duration-300 group"
//           aria-label="Scroll to top"
//         >
//           {/* UP ARROW ICON */}
//           <svg 
//             xmlns="http://www.w3.org/2000/svg" 
//             className="h-6 w-6 group-hover:-translate-y-1 transition-transform duration-300" 
//             fill="none" 
//             viewBox="0 0 24 24" 
//             stroke="currentColor"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
//           </svg>
//         </motion.button>
//       )}
//     </AnimatePresence>
//   );
// };

// export default ScrollToTop;