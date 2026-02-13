import React from "react";

const slides = [
  { title: "Grants & Empowerment", img: "/src/assets/download.jpg" },
  { title: "Greenhouse", img: "/src/assets/download (1).jpg" },
  { title: "Humanitarian Aids", img: "/src/assets/download.jfif" },
  { title: "Scholarships & Skill-Acquisition", img: "/src/assets/baby-1839565_1280.jpg" },
];

const CharityHero: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden text-white 
      bg-[linear-gradient(rgba(10,25,47,0.7),rgba(10,25,47,0.7)),url('/src/assets/bird-8788491_1280.jpg')] 
      bg-center bg-cover bg-no-repeat animate-[backgroundMove_20s_ease-in-out_infinite_alternate]">
      
      {/* Gold Radial Overlay */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top_left,rgba(255,215,0,0.2),transparent_70%)]" />

      <div className="relative z-[2] text-center max-w-[60rem] p-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#fdfdfd] [text-shadow:0_0_10px_gold]">
          Building a <span className="text-[#1e90ff] [text-shadow:0_0_15px_white]">Brighter</span> Future
        </h1>
        <p className="text-lg md:text-xl mt-4 text-[#e6e6e6] tracking-widest">
          Empowering communities through sustainability and education
        </p>

        {/* Slider Section */}
        <div className="relative w-full overflow-hidden mt-10 group">
          <div className="flex w-max gap-4 animate-[scroll_30s_linear_infinite] group-hover:[animation-play-state:paused]">
            {/* Double the slides for a seamless infinite loop */}
            {[...slides, ...slides].map((slide, index) => (
              <div 
                key={index} 
                className="relative flex-none w-[220px] h-[140px] md:w-[300px] md:h-[200px] rounded-xl overflow-hidden shadow-[0_0_15px_rgba(255,215,0,0.4)]"
              >
                <img 
                  src={slide.img} 
                  alt={slide.title} 
                  className="w-full h-full object-cover opacity-85 transition-opacity duration-300 hover:opacity-100" 
                />
                <div className="absolute bottom-0 w-full p-2 bg-[rgba(10,25,47,0.6)] text-[#ffd700] font-semibold text-sm md:text-lg [text-shadow:0_0_5px_white]">
                  {slide.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tailwind Custom Animations - Note: These go in your tailwind.config.js usually, 
          but for this code to work immediately, ensure your global CSS has these @keyframes */}
      <style>{`
        @keyframes backgroundMove {
          0% { background-position: center top; }
          100% { background-position: center bottom; }
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default CharityHero;






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
