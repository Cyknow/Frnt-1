import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COLORS = {
  primary: '#001F5C',
  accent: '#FFD700',
  background: '#F0F8FF',
  space: '#000814',
};

const PROJECTS = [
  { id: 1, title: 'E-Commerce Redesign', skills: ['UX Design', 'React/TS', 'Data'], category: 'design' },
  { id: 2, title: 'Serverless API Backend', skills: ['React/TS', 'Development'], category: 'development' },
  { id: 3, title: 'Mobile App Wireframes', skills: ['UX Design', 'Design'], category: 'design' },
  { id: 4, title: 'Q3 Analytics Dashboard', skills: ['Data', 'Development'], category: 'data' },
  { id: 5, title: 'Brand Identity Guide', skills: ['Design'], category: 'design' },
];

export const ProjectPortfolioPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'design' | 'development' | 'data'>('all');
  const [isNightOps, setIsNightOps] = useState(false);

  // 1. STAR GENERATION LOGIC
  const [stars] = useState(() =>
    Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      moveX: (Math.random() - 0.5) * 60,
      moveY: (Math.random() - 0.5) * 60,
      twinkleSpeed: Math.random() * 2 + 0.5,
      driftDuration: Math.random() * 20 + 20,
    }))
  );

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 6) setIsNightOps(true);
  }, []);

  const filteredProjects = PROJECTS.filter(p => filter === 'all' || p.category === filter);

  const filterButton = (label: string, value: 'all' | 'design' | 'development' | 'data') => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setFilter(value)}
      className="px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 backdrop-blur-md"
      style={{
        backgroundColor: filter === value ? COLORS.accent : 'transparent',
        color: filter === value ? COLORS.primary : (isNightOps ? '#fff' : COLORS.primary),
        border: `2px solid ${filter === value ? COLORS.accent : (isNightOps ? 'rgba(255,255,255,0.2)' : COLORS.primary)}`,
        boxShadow: filter === value ? `0 0 15px ${COLORS.accent}66` : 'none',
      }}
    >
      {label}
    </motion.button>
  );

  return (
    <div 
      className="min-h-screen pt-24 relative overflow-hidden transition-colors duration-1000" 
      id="portfolio" 
      style={{ backgroundColor: isNightOps ? COLORS.space : COLORS.background }}
    >
      
      {/* === STAR FIELD LAYER === */}
      <AnimatePresence>
        {isNightOps && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
                  boxShadow: `0 0 ${star.size * 2}px white, 0 0 ${star.size * 4}px ${COLORS.accent}33`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* === HEADER & FILTER === */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl font-black mb-4 tracking-tighter"
            style={{ color: isNightOps ? '#fff' : COLORS.primary }}
          >
            Case Studies & <span style={{ color: COLORS.accent }}>Projects</span>
          </motion.h1>
          <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: isNightOps ? '#94a3b8' : COLORS.primary, opacity: 0.8 }}>
            A curated look into my best work across different disciplines.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {filterButton('All Projects', 'all')}
            {filterButton('UX/Design', 'design')}
            {filterButton('Development', 'development')}
            {filterButton('Data/Strategy', 'data')}
          </div>
        </div>

        {/* === PROJECT GRID === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-32">
          {filteredProjects.map((project, index) => (
            <motion.a 
              key={project.id} 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              href={`/project/${project.id}`} 
              className="group relative p-[2px] rounded-3xl overflow-hidden block"
            >
              {/* --- CONTINUOUS SPINNING BORDER (Night Ops Only) --- */}
              {isNightOps && (
                <motion.div
                  className="absolute inset-0 z-0"
                  style={{
                    background: `conic-gradient(from 0deg, transparent 60%, ${COLORS.accent} 100%)`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              )}

              {/* CARD BODY */}
              <div 
                className="relative z-10 h-full rounded-[calc(1.5rem-1px)] overflow-hidden transition-all duration-500 backdrop-blur-xl"
                style={{ 
                  backgroundColor: isNightOps ? 'rgba(0, 8, 20, 0.9)' : 'white',
                  borderTop: isNightOps ? 'none' : `6px solid ${COLORS.primary}`,
                  boxShadow: isNightOps ? 'none' : '0 10px 30px rgba(0,0,0,0.05)'
                }}
              >
                {/* Image Placeholder */}
                <div 
                  className="h-48 flex items-center justify-center relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700"
                  style={{ backgroundColor: COLORS.primary }}
                >
                  <span className="text-white text-xs font-black uppercase tracking-widest z-10">Project #{project.id} Visual</span>
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-[#FFD700] transition-colors" style={{ color: isNightOps ? '#fff' : COLORS.primary }}>
                    {project.title}
                  </h3>
                  <p className="text-sm mb-6" style={{ color: isNightOps ? '#64748b' : COLORS.primary, opacity: 0.7 }}>
                    <span className="font-bold uppercase text-[10px] tracking-widest mr-2" style={{ color: COLORS.accent }}>Focus</span>
                    {project.skills.join(' | ')}
                  </p>
                  
                  {/* GLOWING CTA LINK */}
                  <motion.div 
                    animate={isNightOps ? { textShadow: [`0 0 0px ${COLORS.accent}`, `0 0 10px ${COLORS.accent}`, `0 0 0px ${COLORS.accent}`] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="font-black text-xs uppercase tracking-widest flex items-center" 
                    style={{ color: COLORS.accent }}
                  >
                    View Case Study <span className="ml-2 group-hover:translate-x-2 transition-transform">&rarr;</span>
                  </motion.div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <p className="text-xl" style={{ color: isNightOps ? '#fff' : COLORS.primary, opacity: 0.7 }}>
              No projects found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};






// // src/pages/ProjectPortfolioPage.tsx (or components/ProjectPortfolio.tsx)

// import React, { useState } from 'react';

// const COLORS = {
//   primary: '#001F5C',
//   accent: '#FFD700',
//   background: '#F0F8FF',
// };

// // Define Project Data
// const PROJECTS = [
//   { id: 1, title: 'E-Commerce Redesign', skills: ['UX Design', 'React/TS', 'Data'], category: 'design' },
//   { id: 2, title: 'Serverless API Backend', skills: ['React/TS', 'Development'], category: 'development' },
//   { id: 3, title: 'Mobile App Wireframes', skills: ['UX Design', 'Design'], category: 'design' },
//   { id: 4, title: 'Q3 Analytics Dashboard', skills: ['Data', 'Development'], category: 'data' },
//   { id: 5, title: 'Brand Identity Guide', skills: ['Design'], category: 'design' },
// ];

// export const ProjectPortfolioPage: React.FC = () => {
//   const [filter, setFilter] = useState<'all' | 'design' | 'development' | 'data'>('all');

//   const filteredProjects = PROJECTS.filter(p => filter === 'all' || p.category === filter);

//   const filterButton = (label: string, value: 'all' | 'design' | 'development' | 'data') => (
//     <button
//       onClick={() => setFilter(value)}
//       className="px-6 py-2 rounded-full text-sm font-semibold transition duration-200"
//       style={{
//         backgroundColor: filter === value ? COLORS.accent : 'transparent',
//         color: filter === value ? COLORS.primary : COLORS.primary,
//         border: `2px solid ${filter === value ? COLORS.accent : COLORS.primary}`,
//         boxShadow: filter === value ? '0 4px 8px rgba(255, 215, 0, 0.4)' : 'none',
//       }}
//     >
//       {label}
//     </button>
//   );

//   return (
//     <div className="min-h-screen pt-16" id="portfolio" style={{ backgroundColor: COLORS.background }}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* === Header & Filter === */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: COLORS.primary }}>
//             Case Studies & Projects
//           </h1>
//           <p className="text-xl mb-8" style={{ color: COLORS.primary, opacity: 0.7 }}>
//             A curated look into my best work across different disciplines.
//           </p>
          
//           {/* Filter Bar (Like HubSpot's resource library filters) */}
//           <div className="flex flex-wrap justify-center gap-4">
//             {filterButton('All Projects', 'all')}
//             {filterButton('UX/Design', 'design')}
//             {filterButton('Development', 'development')}
//             {filterButton('Data/Strategy', 'data')}
//           </div>
//         </div>

//         {/* === Project Grid === */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
//           {filteredProjects.map((project) => (
//             <a 
//               key={project.id} 
//               href={`/project/${project.id}`} 
//               className="group block rounded-xl overflow-hidden shadow-lg transition duration-300 transform hover:scale-[1.03]"
//               style={{ borderTop: `6px solid ${COLORS.primary}`, backgroundColor: 'white' }}
//             >
//               {/* Project Image Placeholder */}
//               <div 
//                 className="h-48 bg-gray-200 flex items-center justify-center"
//                 style={{ backgroundColor: COLORS.primary, opacity: 0.8 }}
//               >
//                 <span className="text-white text-xl font-bold">Project #{project.id} Visual</span>
//               </div>
              
//               <div className="p-6">
//                 <h3 className="text-xl font-bold mb-2 transition duration-200 group-hover:text-amber-600" style={{ color: COLORS.primary }}>
//                   {project.title}
//                 </h3>
//                 <p className="text-sm mb-4" style={{ color: COLORS.primary, opacity: 0.7 }}>
//                   **Focus:** {project.skills.join(' | ')}
//                 </p>
//                 <span className="font-semibold text-sm" style={{ color: COLORS.accent }}>
//                   View Case Study &rarr;
//                 </span>
//               </div>
//             </a>
//           ))}
//         </div>
        
//         {filteredProjects.length === 0 && (
//             <p className="text-center text-xl py-10" style={{ color: COLORS.primary, opacity: 0.7 }}>
//                 No projects found in this category.
//             </p>
//         )}
//       </div>
//     </div>
//   );
// };