import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// Assets
import heroVideo from "../../assets/VID-20251211-WA0026.mp4"; // Ensure you have a high-res video here
import grantImg from "../../assets/download.jpg";
import greenhouseImg from "../../assets/download (1).jpg";
import humanitarianImg from "../../assets/download.jfif";
import scholarshipImg from "../../assets/baby-1839565_1280.jpg";

const slides = [
  { title: "Grants & Empowerment", img: grantImg, path: "/grants" },
  { title: "Greenhouse", img: greenhouseImg, path: "/greenhouse" },
  { title: "Humanitarian Aids", img: humanitarianImg, path: "/humanitarian" },
  { title: "Scholarships & Skills", img: scholarshipImg, path: "/scholarships" },
];

const CharityHero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 🎬 HIGH-DEFINITION VIDEO BACKGROUND */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* VANGUARD OVERLAY: Cinematic Darkening & Radial Glow */}
      <div className="absolute inset-0 z-[1] bg-black/60 backdrop-blur-[2px]" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.1),transparent_80%)]" />

      <div className="relative z-[2] text-center max-w-[70rem] px-6">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-2xl md:text-6xl mt-8 font-black text-white italic uppercase tracking-tighter">
            Building a <span className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">Brighter</span> Future
          </h1>

          <div className="overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"> {/* Container to clip the sliding text */}
  <motion.p 
    animate={{ x: ["100%", "-100%"] }} // Slides from far right to far left
    transition={{ 
      repeat: Infinity, 
      duration: 12, // Increase for slower speed, decrease for faster
      ease: "linear" 
    }}
    className="whitespace-nowrap text-sm md:text-lg mt-4 text-slate-300 tracking-[0.3em] uppercase font-bold md:animate-none md:translate-x-0 md:text-center"
  >
    Empowering communities through sustainability and education
  </motion.p>
</div>

          {/* <motion.p 
  // 1. Start off-screen to the right (100% of viewport width)
  initial={{ x: "100%", opacity: 0 }} 
  // 2. Animate to its natural position
  animate={{ x: 0, opacity: 1 }} 
  // 3. Control the speed and feel
  transition={{ 
    type: "spring", 
    stiffness: 50, 
    damping: 20, 
    duration: 1,
    delay: 0.5 // Wait slightly so the video background loads first
  }}
  className="text-sm md:text-lg mt-4 text-slate-300 tracking-[0.3em] uppercase font-bold"
>
  Empowering communities through sustainability and education
</motion.p> */}

          {/* <p className="text-sm md:text-lg mt-4 text-slate-300 tracking-[0.3em] uppercase font-bold">
            Empowering communities through sustainability and education
          </p> */}
        </motion.div>

        {/* INFINITE INTERACTIVE SLIDER */}
        <div className="relative w-full overflow-hidden mt-16 group">
          <div className="flex w-max gap-6 animate-[scroll_40s_linear_infinite] group-hover:[animation-play-state:paused] py-10">
            {[...slides, ...slides].map((slide, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -10 }}
                onClick={() => navigate(slide.path)}
                className="relative flex-none w-[250px] h-[350px] md:w-[320px] md:h-[400px] rounded-[2rem] overflow-hidden cursor-pointer border border-white/10 shadow-2xl group/card"
              >
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-0 w-full p-6 text-left">
                  <p className="text-yellow-400 text-xs font-black tracking-widest uppercase mb-2">Program</p>
                  <h3 className="text-white font-bold text-xl leading-tight">
                    {slide.title}
                  </h3>
                  <div className="mt-4 w-10 h-1 bg-yellow-400 transition-all group-hover/card:w-20" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default CharityHero;


















// import React from "react";
// // 1. Import each image at the top
// import grantImg from "../../../public/download.jpg";
// import greenhouseImg from "../../../public/download (1).jpg";
// import humanitarianImg from "../../../public/download.jfif";
// import scholarshipImg from "../../../public/baby-1839565_1280.jpg";
// import heroBg from "../../../public/bird-8788491_1280.jpg";

// const slides = [
//   { title: "Grants & Empowerment", img: grantImg},
//   { title: "Greenhouse", img: greenhouseImg},
//   { title: "Humanitarian Aids", img: humanitarianImg },
//   { title: "Scholarships & Skill-Acquisition", img: scholarshipImg },
// ];

// const CharityHero: React.FC = () => {
//   return (
//     <section style={{ backgroundImage: `linear-gradient(rgba(10,25,47,0.7),rgba(10,25,47,0.7)), url(${heroBg})`}}
//     className="relative w-full h-screen flex items-center justify-center overflow-hidden text-white 
//       bg-center bg-cover bg-no-repeat animate-[backgroundMove_20s_ease-in-out_infinite_alternate]">
      
//       {/* Gold Radial Overlay */}
//       <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top_left,rgba(255,215,0,0.2),transparent_70%)]" />

//       <div className="relative z-[2] text-center max-w-[60rem] p-4">
//         <h1 className="text-3xl md:text-6xl font-extrabold text-[#fdfdfd] [text-shadow:0_0_10px_gold]">
//           Building a <span className="text-[#1e90ff] [text-shadow:0_0_15px_white]">Brighter</span> Future
//         </h1>
//         <p className="text-lg md:text-xl mt-4 text-[#e6e6e6] tracking-widest">
//           Empowering communities through sustainability and education
//         </p>

//         {/* Slider Section */}
//         <div className="relative w-full overflow-hidden mt-10 group">
//           <div className="flex w-max gap-4 animate-[scroll_30s_linear_infinite] group-hover:[animation-play-state:paused]">
//             {/* Double the slides for a seamless infinite loop */}
//             {[...slides, ...slides].map((slide, index) => (
//               <div 
//                 key={index} 
//                 className="relative flex-none w-[220px] h-[140px] md:w-[300px] md:h-[200px] rounded-xl overflow-hidden shadow-[0_0_15px_rgba(255,215,0,0.4)]"
//               >
//                 <img 
//                   src={slide.img} 
//                   alt={slide.title} 
//                   className="w-full h-full object-cover opacity-85 transition-opacity duration-300 hover:opacity-100" 
//                 />
//                 <div className="absolute bottom-0 w-full p-2 bg-[rgba(10,25,47,0.6)] text-[#ffd700] font-semibold text-sm md:text-lg [text-shadow:0_0_5px_white]">
//                   {slide.title}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Tailwind Custom Animations - Note: These go in your tailwind.config.js usually, 
//           but for this code to work immediately, ensure your global CSS has these @keyframes */}
//       <style>{`
//         @keyframes backgroundMove {
//           0% { background-position: center top; }
//           100% { background-position: center bottom; }
//         }
//         @keyframes scroll {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default CharityHero;






// import React, { useEffect, useRef } from "react";
// import "./CharityHero.css";

// const slides = [
//   {
//     title: "Grants & Empowerment",
//     img: "/src/assets/download.jpg",
//   },
//   {
//     title: "Greenhouse",
//     img: "/src/assets/download (1).jpg",
//   },
//   {
//     title: "Humanitarian Aids",
//     img: "/src/assets/download.jfif",
//   },
//   {
//     title: "Scholarships/Intenships & Education/Skill-Acquisition",
//     img: "/src/assets/baby-1839565_1280.jpg",
//   },
// ];

// const CharityHero: React.FC = () => {
//   const sliderRef = useRef<HTMLDivElement>(null);

//   // Auto-scroll effect
//   useEffect(() => {
//     const slider = sliderRef.current;
//     if (!slider) return;

//     let scrollAmount = 0;
//     const scrollStep = 1;
//     const scrollInterval = 20; // ms

//     const scroll = setInterval(() => {
//       if (!slider) return;
//       scrollAmount += scrollStep;
//       if (scrollAmount >= slider.scrollWidth / 2) {
//         scrollAmount = 0;
//         slider.scrollLeft = 0;
//       } else {
//         slider.scrollLeft = scrollAmount;
//       }
//     }, scrollInterval);

//     return () => clearInterval(scroll);
//   }, []);

//   return (
//     <section className="hero-container">
//       <div className="hero-overlay" />
//       <div className="hero-content">
//         <h1 className="hero-title">
//           Building a <span>Brighter</span> Future
//         </h1>
//         <p className="hero-subtitle">
//           Empowering communities through sustainability and education
//         </p>

//         <div className="slider-wrapper" ref={sliderRef}>
//           <div className="slider">
//             {[...slides, ...slides].map((slide, index) => (
//               <div className="slide" key={index}>
//                 <img src={slide.img} alt={slide.title} />
//                 <div className="slide-caption">{slide.title}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CharityHero;
