import { PortfolioHero } from './PortfolioHero'
import { ProjectPortfolioPage } from './ProjectPortfolioPage'
import { SkillsHub } from './SkillsHub'

const Portfolio = () => {
  return (
    <>
        <PortfolioHero/>
        <ProjectPortfolioPage/>
        <SkillsHub/>
    </>
  )
}

export default Portfolio;







// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// const COLORS = {
//   primary: '#001F5C',      // Deep Blue
//   accent: '#FFD700',       // Gold
//   background: '#F0F8FF',    // Sparkling White
//   space: '#000814',        // Deep Space Black
//   industrial: '#121212',   // Rugged Black
// };

// const SKILLS_LIST = [
//   "UX Design & Strategy", "Frontend Development (React/TS)", "Data Analysis",
//   "Technical Writing", "Project Management", "Branding & Visual Identity",
//   "Full Stack Engineering", "HSE Safety Leadership"
// ];

// const PROJECTS = [
//   { id: 1, title: 'E-Commerce Redesign', skills: ['UX Design', 'React/TS'], category: 'design' },
//   { id: 2, title: 'Serverless API Backend', skills: ['Node.js', 'Development'], category: 'development' },
//   { id: 3, title: 'Mobile App Wireframes', skills: ['UX Design', 'Figma'], category: 'design' },
//   { id: 4, title: 'Q3 Analytics Dashboard', skills: ['Data', 'Development'], category: 'data' },
//   { id: 5, title: 'Industrial Safety App', skills: ['HSE', 'Development'], category: 'development' },
// ];

// const EXPERIENCE = [
//   { role: "Plumber (NLNG T7 Project)", company: "Mbarie Services Limited", desc: "Full Structural Plumbing & Pipefitting Installation Engineering." },
//   { role: "Manager/Supervisor", company: "CMIL Logistics", desc: "Forklift & Logistics oversight, ensuring safety and efficiency." },
//   { role: "Biochemistry Researcher", company: "Sunchix Pharmacy Ltd", desc: "Laboratory testing, diagnosis, and biochemistry analysis." },
//   { role: "Forklift Operator & HSE", company: "Cyknow Tech. Services Nig. Ltd", desc: "Safety compliance and heavy equipment operation." },
//   { role: "ICT Personnel", company: "Crystal Lake Resort & Tours", desc: "IT Essentials and computer applications management." },
// ];

// const SKILL_BARS = {
//   software: [
//     { name: "React JS/TS", level: 95, color: '#61DAFB' },
//     { name: "Node JS", level: 88, color: '#339933' },
//     { name: "Express JS", level: 90, color: '#828282' },
//     { name: "MongoDB", level: 85, color: '#47A248' },
//   ],
//   industrial: [
//     { name: "HSE Levels 1, 2 & 3", level: 98, color: '#FF4500' },
//     { name: "Structural Plumbing", level: 92, color: '#1E90FF' },
//     { name: "Forklift & Maintenance", level: 95, color: '#FFD700' },
//     { name: "Project Management (PMP)", level: 85, color: '#32CD32' },
//   ]
// };

// const SOCIAL_LINKS = [
//   { name: 'CV/Resume', url: '#' },
//   { name: 'GitHub', url: '#' },
//   { name: 'LinkedIn', url: '#' }
// ];

// export const OmniPortfolio: React.FC = () => {
//   const [mode, setMode] = useState<'software' | 'industrial'>('software');
//   const [filter, setFilter] = useState<'all' | 'design' | 'development' | 'data'>('all');
//   const [isNightOps, setIsNightOps] = useState(false);
//   const containerRef = useRef(null);

//   const { scrollYProgress } = useScroll();
//   const morphRotate = useTransform(scrollYProgress, [0, 1], [0, 720]);

//   // Star Generation
//   const [stars] = useState(() =>
//     Array.from({ length: 60 }).map((_, i) => ({
//       id: i, size: Math.random() * 3 + 1, x: Math.random() * 100, y: Math.random() * 100,
//       moveX: (Math.random() - 0.5) * 60, moveY: (Math.random() - 0.5) * 60,
//       twinkle: Math.random() * 2 + 0.5,
//     }))
//   );

//   useEffect(() => {
//     const hour = new Date().getHours();
//     if (hour >= 18 || hour < 6) setIsNightOps(true);
//   }, []);

//   const filteredProjects = PROJECTS.filter(p => filter === 'all' || p.category === filter);

//   return (
//     <div ref={containerRef} className="relative transition-all duration-1000 overflow-x-hidden" 
//          style={{ backgroundColor: isNightOps ? (mode === 'software' ? COLORS.space : COLORS.industrial) : COLORS.background }}>
      
//       {/* 1. STAR FIELD (GLOBAL) */}
//       <AnimatePresence>
//         {isNightOps && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-0 pointer-events-none">
//             {stars.map((star) => (
//               <motion.div key={star.id} className="absolute rounded-full bg-white shadow-[0_0_8px_white]"
//                 style={{ width: star.size, height: star.size, left: `${star.x}%`, top: `${star.y}%` }}
//                 animate={{ opacity: [0.2, 1, 0.2], x: [0, star.moveX], y: [0, star.moveY] }}
//                 transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
//               />
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* 2. FLOATING MODE TOGGLE */}
//       <div className="fixed top-10 right-6 z-50">
//         <button onClick={() => setMode(mode === 'software' ? 'industrial' : 'software')}
//                 className="p-1 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center gap-3 pr-5 shadow-2xl transition-transform active:scale-95">
//           <motion.div animate={{ rotate: mode === 'software' ? 0 : 180 }}
//                       className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg ${mode === 'software' ? 'bg-blue-600' : 'bg-orange-600'}`}>
//             {mode === 'software' ? '💻' : '🏗️'}
//           </motion.div>
//           <div className="text-left leading-none">
//             <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Perspective</p>
//             <p className="text-xs font-black uppercase text-white">{mode === 'software' ? 'Software' : 'Industrial'}</p>
//           </div>
//         </button>
//       </div>

//       {/* 3. HERO SECTION */}
//       <section className="relative min-h-screen flex items-center justify-center text-center px-4 pt-20">
//         <div className="relative z-10 max-w-5xl mx-auto">
//           <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
//                      className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-white"
//                      style={{ color: isNightOps ? '#fff' : COLORS.primary }}>
//             I Build <span style={{ color: COLORS.accent }}>Digital Excellence</span>.
//           </motion.h1>
//           <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
//                      className="text-xl md:text-2xl mb-12 font-medium opacity-80 max-w-2xl mx-auto text-white"
//                      style={{ color: isNightOps ? '#cbd5e1' : COLORS.primary }}>
//             Multi-Skilled Creator: From **React Architecture** to **Industrial HSE Strategy**.
//           </motion.p>
//           <motion.a href="#contact" animate={{ boxShadow: [`0 0 10px ${COLORS.accent}44`, `0 0 30px ${COLORS.accent}`, `0 0 10px ${COLORS.accent}44`] }}
//                      transition={{ duration: 2, repeat: Infinity }}
//                      className="inline-block px-12 py-5 rounded-2xl text-xl font-black uppercase tracking-widest transition-transform hover:scale-105"
//                      style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}>
//             Let's Discuss
//           </motion.a>
//         </div>

//         {/* TOP SKILLS MARQUEE */}
//         <div className="absolute bottom-0 w-full overflow-hidden py-6 bg-black/40 backdrop-blur-md border-t border-white/10">
//           <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="flex whitespace-nowrap">
//             {[...SKILLS_LIST, ...SKILLS_LIST].map((skill, i) => (
//               <span key={i} className="px-12 text-sm font-black uppercase tracking-widest text-white">
//                 <span className="text-yellow-400 mr-4">//</span> {skill}
//               </span>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* 4. PROFICIENCY MATRIX */}
//       <section className="py-32 max-w-4xl mx-auto px-6 relative z-10">
//         <h2 className="text-4xl font-black text-center mb-16 uppercase text-white" style={{ color: isNightOps ? '#fff' : COLORS.primary }}>
//           Proficiency <span style={{ color: COLORS.accent }}>Matrix</span>
//         </h2>
//         <div className="space-y-10">
//           {(mode === 'software' ? SKILL_BARS.software : SKILL_BARS.industrial).map((skill) => (
//             <div key={skill.name} className="group">
//               <div className="flex justify-between mb-3 text-white">
//                 <span className="text-sm font-black uppercase tracking-widest">{skill.name}</span>
//                 <span className="text-sm font-black text-yellow-400">{skill.level}%</span>
//               </div>
//               <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10 p-[2px]">
//                 <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} transition={{ duration: 1.5 }}
//                             className="h-full relative rounded-full" style={{ backgroundColor: skill.color }}>
//                   <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 2, repeat: Infinity }}
//                               className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
//                 </motion.div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* 5. CAREER TRAJECTORY (NO YEARS) */}
//       <section className="py-32 bg-black/20 overflow-hidden relative z-10">
//         <h2 className="text-center text-white/30 text-xs font-black uppercase tracking-[0.5em] mb-12">Professional Journey</h2>
//         <div className="flex">
//           <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="flex gap-8 px-4">
//             {[...EXPERIENCE, ...EXPERIENCE].map((exp, i) => (
//               <div key={i} className="min-w-[380px] p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-2xl">
//                 <h3 className="text-xl font-black text-white leading-tight">{exp.role}</h3>
//                 <p className="text-yellow-400 font-bold text-xs uppercase mt-3 tracking-widest">{exp.company}</p>
//                 <div className="w-10 h-1 bg-yellow-400/20 my-6" />
//                 <p className="text-slate-400 text-sm leading-relaxed whitespace-normal">{exp.desc}</p>
//               </div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* 6. PROJECT PORTFOLIO GRID */}
//       <section className="py-32 max-w-7xl mx-auto px-6 relative z-10" id="portfolio">
//         <div className="text-center mb-20">
//           <h2 className="text-5xl font-black text-white mb-6" style={{ color: isNightOps ? '#fff' : COLORS.primary }}>
//             Selected <span style={{ color: COLORS.accent }}>Projects</span>
//           </h2>
//           <div className="flex flex-wrap justify-center gap-4 mt-8">
//             {['all', 'design', 'development', 'data'].map((cat) => (
//               <button key={cat} onClick={() => setFilter(cat as any)}
//                 className={`px-8 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-yellow-400 text-blue-900 shadow-lg' : 'border border-white/20 text-white hover:bg-white/5'}`}>
//                 {cat}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {filteredProjects.map((project, idx) => (
//             <motion.div key={project.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}
//                         className="group relative bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-yellow-400/50 transition-colors">
//               <div className="h-48 bg-blue-900/50 flex items-center justify-center">
//                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Project Data Visual</span>
//               </div>
//               <div className="p-8">
//                 <h3 className="text-xl font-black text-white mb-2">{project.title}</h3>
//                 <p className="text-xs text-yellow-400 font-bold uppercase tracking-widest mb-6">{project.skills.join(' • ')}</p>
//                 <a href="#" className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-yellow-400 transition-colors">View Case Study &rarr;</a>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* 7. CONNECT & SPARKLE CV */}
//       <section className="py-32 px-6 relative z-10">
//         <div className="max-w-6xl mx-auto p-16 rounded-[4rem] bg-white/5 border border-white/10 backdrop-blur-3xl flex flex-col md:flex-row justify-between items-center gap-12">
//           <h2 className="text-4xl font-black text-white max-w-md leading-tight text-center md:text-left">
//             Partner with a <span className="text-yellow-400">Multidisciplinary</span> Expert.
//           </h2>
//           <div className="flex flex-wrap justify-center gap-4">
//             {SOCIAL_LINKS.map((link) => (
//               <motion.a key={link.name} href={link.url} whileHover={{ scale: 1.05 }}
//                          className="relative group px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest overflow-hidden transition-all"
//                          style={{ backgroundColor: link.name === 'CV/Resume' ? '#fff' : COLORS.accent, color: COLORS.primary }}>
//                 <span className="relative z-10">{link.name === 'CV/Resume' ? 'Download CV' : link.name}</span>
                
//                 {link.name === 'CV/Resume' && (
//                   <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
//                     {[...Array(12)].map((_, i) => (
//                       <motion.div key={i} className="absolute w-1 h-1 bg-yellow-500 rounded-full"
//                                   animate={{ y: [0, -50], x: [0, (Math.random()-0.5)*100], opacity: [0, 1, 0] }}
//                                   transition={{ duration: 1, repeat: Infinity, delay: Math.random() }}
//                                   style={{ top: '50%', left: '50%' }} />
//                     ))}
//                   </div>
//                 )}
//               </motion.a>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* 8. CONTACT FORM */}
//       <section className="py-32 pb-64 px-6 relative z-10" id="contact">
//         <div className="max-w-3xl mx-auto p-12 rounded-[3rem] border border-white/10 bg-black/40 backdrop-blur-3xl">
//           <h2 className="text-3xl font-black text-center text-white mb-12 uppercase tracking-widest">Send Transmission</h2>
//           <form className="space-y-8">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <input type="text" placeholder="Name" className="w-full bg-transparent border-b border-white/20 p-4 text-white font-bold outline-none focus:border-yellow-400 transition-all" />
//               <input type="email" placeholder="Email" className="w-full bg-transparent border-b border-white/20 p-4 text-white font-bold outline-none focus:border-yellow-400 transition-all" />
//             </div>
//             <textarea rows={4} placeholder="Project Vision" className="w-full bg-transparent border border-white/20 rounded-2xl p-6 text-white font-bold outline-none focus:border-yellow-400 transition-all" />
//             <motion.button whileTap={{ scale: 0.98 }} className="w-full py-6 rounded-2xl bg-yellow-400 text-blue-900 font-black uppercase tracking-widest shadow-2xl">
//               Transmit Message
//             </motion.button>
//           </form>
//         </div>
//       </section>
//     </div>
//   );
// };







