import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COLORS = {
  primary: '#001F5C',      // Deep Blue
  accent: '#FFD700',       // Gold
  background: '#F0F8FF',   // Sparkling White
  space: '#000814',        // Deep Space Black
};

const SKILLS = [
  "UX Design & Strategy",
  "Frontend Development (React/TS)",
  "Data Analysis & Reporting",
  "Technical Writing & Content",
  "Project Management",
  "Branding & Visual Identity",
  "UX Design & Strategy",
  "Frontend Development (React/TS)",
];

export const PortfolioHero: React.FC = () => {
  const [isNightOps, setIsNightOps] = useState(false);

  // 1. GENERATE HIGH-FIDELITY STARS
  const [stars] = useState(() =>
    Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      // Random sizes: 1px to 5px
      size: Math.random() * 4 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      // Drift velocity (different directions)
      moveX: (Math.random() - 0.5) * 80,
      moveY: (Math.random() - 0.5) * 80,
      // Twinkle speed: some fast (0.8s), some slow (3s)
      twinkleSpeed: Math.random() * 2.5 + 0.5,
      driftDuration: Math.random() * 15 + 15,
    }))
  );

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 6) setIsNightOps(true);
  }, []);

  return (
    <section 
      className="relative overflow-hidden py-32 md:py-48 flex  items-center justify-center text-center transition-colors duration-1000"
      style={{ 
        backgroundColor: isNightOps ? COLORS.space : COLORS.background, 
        borderBottom: `8px solid ${COLORS.accent}`,
        minHeight: '80vh'
      }}
    >
      {/* === STAR FIELD (Night Ops Only) === */}
      <AnimatePresence>
        {isNightOps && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            {stars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute rounded-full bg-white"
                style={{
                  width: star.size,
                  height: star.size,
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  boxShadow: `0 0 ${star.size * 2}px white, 0 0 ${star.size * 4}px ${COLORS.accent}44`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [1, 1.2, 1],
                  x: [0, star.moveX],
                  y: [0, star.moveY],
                }}
                transition={{
                  x: { duration: star.driftDuration, repeat: Infinity, ease: "linear" },
                  y: { duration: star.driftDuration, repeat: Infinity, ease: "linear" },
                  opacity: { duration: star.twinkleSpeed, repeat: Infinity, ease: "easeInOut" },
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* === BACKGROUND DECORATION === */}
      <div className="absolute inset-0 opacity-20 pointer-events-none ">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute w-96 h-96 rounded-full blur-[80px]"
          style={{ 
            backgroundColor: isNightOps ? COLORS.accent : COLORS.primary, 
            opacity: 0.15, top: '5%', left: '10%' 
          }}
        />
      </div>

      {/* === MAIN CONTENT === */}
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl sm:text-6xl lg:text-8xl font-black leading-tight mb-6 tracking-tighter"
          style={{ color: isNightOps ? '#fff' : COLORS.primary }}
        >
          I Build <span style={{ color: COLORS.accent }}>Digital Excellence</span>.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl sm:text-2xl mb-12 font-medium max-w-2xl mx-auto"
          style={{ color: isNightOps ? '#cbd5e1' : COLORS.primary }}
        >
          A Multi-Skilled Creator: From **React Code** to **UX Strategy** and **Data-Driven Narratives**.
        </motion.p>

        {/* === CONTINUOUSLY GLOWING CTA === */}
        <motion.a 
          href="#contact" 
          animate={{ 
            boxShadow: [
              `0 0 10px ${COLORS.accent}66`, 
              `0 0 30px ${COLORS.accent}`, 
              `0 0 10px ${COLORS.accent}66`
            ] 
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block px-12 py-5 rounded-2xl text-xl font-black shadow-2xl transition duration-300 transform hover:scale-105 uppercase tracking-widest"
          style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
        >
          Let's Discuss
        </motion.a>
      </div>

      {/* === SKILLS SLIDER === */}
      <div 
        className="absolute bottom-0 w-full overflow-hidden py-5 border-t-2" 
        style={{ 
          backgroundColor: isNightOps ? '#000' : COLORS.primary, 
          borderColor: COLORS.accent 
        }}
      >
        <div className="flex whitespace-nowrap overflow-hidden">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex flex-nowrap"
          >
            {[...SKILLS, ...SKILLS].map((skill, index) => (
              <div 
                key={index} 
                className="px-12 text-sm md:text-base font-black tracking-[0.2em] uppercase flex items-center"
                style={{ color: isNightOps ? '#fff' : COLORS.background }}
              >
                <span className="text-yellow-400 mr-4">//</span> {skill}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};







// // src/components/PortfolioHero.tsx

// import React from 'react';

// // --- Color Palette ---
// const COLORS = {
//   primary: '#001F5C',      // Deep Blue
//   accent: '#FFD700',       // Gold
//   background: '#F0F8FF',   // Sparkling White
// };

// const SKILLS = [
//   "UX Design & Strategy",
//   "Frontend Development (React/TS)",
//   "Data Analysis & Reporting",
//   "Technical Writing & Content",
//   "Project Management",
//   "Branding & Visual Identity",
//   // Repeat a few to ensure a seamless loop
//   "UX Design & Strategy",
//   "Frontend Development (React/TS)",
// ];

// // --- CSS Keyframes for Sliding Animation ---
// // Note: In a real Next.js/Tailwind project, you'd place this in global CSS, 
// // but for a standalone component, we define a quick style block.
// const sliderKeyframes = `
// @keyframes slide-to-left {
//   0% { transform: translateX(0); }
//   100% { transform: translateX(-50%); } /* Slides exactly half the content */
// }
// `;

// export const PortfolioHero: React.FC = () => {
//   return (
//     <section 
//       className="relative overflow-hidden py-32 md:py-48 flex items-center justify-center text-center"
//       style={{ 
//         backgroundColor: COLORS.background, 
//         borderBottom: `8px solid ${COLORS.accent}` // Strong Gold separation line
//       }}
//     >
//       <style>{sliderKeyframes}</style>

//       {/* === 1. Transparent Animated Background (The "Greenhouse" Effect) === */}
//       <div className="absolute inset-0 opacity-10 pointer-events-none">
//         {/* Placeholder for a complex, subtly moving animation or particle effect. 
//             Here, we use rotating, semi-transparent shapes. */}
//         <div 
//           className="absolute w-72 h-72 rounded-full"
//           style={{ 
//             backgroundColor: COLORS.primary, 
//             opacity: 0.1, 
//             animation: 'spin 30s linear infinite', 
//             top: '10%', left: '5%', filter: 'blur(50px)' 
//           }}
//         ></div>
//         <div 
//           className="absolute w-96 h-96 rounded-full"
//           style={{ 
//             backgroundColor: COLORS.accent, 
//             opacity: 0.1, 
//             animation: 'spin-reverse 40s linear infinite', 
//             bottom: '15%', right: '10%', filter: 'blur(60px)' 
//           }}
//         ></div>
//       </div>
      
//       {/* === 2. Main Content & CTA === */}
//       <div className="relative z-10 max-w-4xl mx-auto px-4">
//         <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-4"
//           style={{ color: COLORS.primary }}
//         >
//           I Build <span style={{ color: COLORS.accent }}>Digital Excellence</span>.
//         </h1>
//         <p className="text-xl sm:text-2xl mb-10 font-medium"
//           style={{ color: COLORS.primary, opacity: 0.8 }}
//         >
//           A Multi-Skilled Creator: From **React Code** to **UX Strategy** and **Data-Driven Narratives**.
//         </p>

//         <a 
//           href="#contact" 
//           className="inline-block px-10 py-4 rounded-lg text-xl font-bold shadow-2xl transition duration-300 transform hover:scale-[1.03]"
//           style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
//         >
//           Let's Discuss Your Project
//         </a>
//       </div>

//       {/* === 3. Skills Slider (Moves Right-to-Left) === */}
//       <div 
//         className="absolute bottom-0 w-full overflow-hidden py-4 border-t-2" 
//         style={{ backgroundColor: COLORS.primary, borderColor: COLORS.accent }}
//       >
//         <div 
//           className="flex flex-nowrap w-[200%] md:w-[150%]" // Double/triple width to allow sliding
//           style={{ animation: 'slide-to-left 25s linear infinite' }}
//         >
//           {SKILLS.map((skill, index) => (
//             <div 
//               key={index} 
//               className="px-8 py-1.5 whitespace-nowrap text-lg font-mono tracking-wider"
//               style={{ color: COLORS.background, minWidth: 'fit-content', opacity: 0.8 }}
//             >
//               <span style={{ color: COLORS.accent }}>//</span> {skill} <span style={{ opacity: 0.4 }}>—</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Basic spin keyframes for the background (requires global CSS or style tag) */}
//       <style>{`
//         @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//         @keyframes spin-reverse { 0% { transform: rotate(360deg); } 100% { transform: rotate(0deg); } }
//       `}</style>
//     </section>
//   );
// };