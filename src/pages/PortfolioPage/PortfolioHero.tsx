// src/components/PortfolioHero.tsx

import React from 'react';

// --- Color Palette ---
const COLORS = {
  primary: '#001F5C',      // Deep Blue
  accent: '#FFD700',       // Gold
  background: '#F0F8FF',   // Sparkling White
};

const SKILLS = [
  "UX Design & Strategy",
  "Frontend Development (React/TS)",
  "Data Analysis & Reporting",
  "Technical Writing & Content",
  "Project Management",
  "Branding & Visual Identity",
  // Repeat a few to ensure a seamless loop
  "UX Design & Strategy",
  "Frontend Development (React/TS)",
];

// --- CSS Keyframes for Sliding Animation ---
// Note: In a real Next.js/Tailwind project, you'd place this in global CSS, 
// but for a standalone component, we define a quick style block.
const sliderKeyframes = `
@keyframes slide-to-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); } /* Slides exactly half the content */
}
`;

export const PortfolioHero: React.FC = () => {
  return (
    <section 
      className="relative overflow-hidden py-32 md:py-48 flex items-center justify-center text-center"
      style={{ 
        backgroundColor: COLORS.background, 
        borderBottom: `8px solid ${COLORS.accent}` // Strong Gold separation line
      }}
    >
      <style>{sliderKeyframes}</style>

      {/* === 1. Transparent Animated Background (The "Greenhouse" Effect) === */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {/* Placeholder for a complex, subtly moving animation or particle effect. 
            Here, we use rotating, semi-transparent shapes. */}
        <div 
          className="absolute w-72 h-72 rounded-full"
          style={{ 
            backgroundColor: COLORS.primary, 
            opacity: 0.1, 
            animation: 'spin 30s linear infinite', 
            top: '10%', left: '5%', filter: 'blur(50px)' 
          }}
        ></div>
        <div 
          className="absolute w-96 h-96 rounded-full"
          style={{ 
            backgroundColor: COLORS.accent, 
            opacity: 0.1, 
            animation: 'spin-reverse 40s linear infinite', 
            bottom: '15%', right: '10%', filter: 'blur(60px)' 
          }}
        ></div>
      </div>
      
      {/* === 2. Main Content & CTA === */}
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-4"
          style={{ color: COLORS.primary }}
        >
          I Build <span style={{ color: COLORS.accent }}>Digital Excellence</span>.
        </h1>
        <p className="text-xl sm:text-2xl mb-10 font-medium"
          style={{ color: COLORS.primary, opacity: 0.8 }}
        >
          A Multi-Skilled Creator: From **React Code** to **UX Strategy** and **Data-Driven Narratives**.
        </p>

        <a 
          href="#contact" 
          className="inline-block px-10 py-4 rounded-lg text-xl font-bold shadow-2xl transition duration-300 transform hover:scale-[1.03]"
          style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
        >
          Let's Discuss Your Project
        </a>
      </div>

      {/* === 3. Skills Slider (Moves Right-to-Left) === */}
      <div 
        className="absolute bottom-0 w-full overflow-hidden py-4 border-t-2" 
        style={{ backgroundColor: COLORS.primary, borderColor: COLORS.accent }}
      >
        <div 
          className="flex flex-nowrap w-[200%] md:w-[150%]" // Double/triple width to allow sliding
          style={{ animation: 'slide-to-left 25s linear infinite' }}
        >
          {SKILLS.map((skill, index) => (
            <div 
              key={index} 
              className="px-8 py-1.5 whitespace-nowrap text-lg font-mono tracking-wider"
              style={{ color: COLORS.background, minWidth: 'fit-content', opacity: 0.8 }}
            >
              <span style={{ color: COLORS.accent }}>//</span> {skill} <span style={{ opacity: 0.4 }}>—</span>
            </div>
          ))}
        </div>
      </div>

      {/* Basic spin keyframes for the background (requires global CSS or style tag) */}
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes spin-reverse { 0% { transform: rotate(360deg); } 100% { transform: rotate(0deg); } }
      `}</style>
    </section>
  );
};