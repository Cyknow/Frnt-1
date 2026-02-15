import React, { useState, useEffect, useRef } from 'react';
import { motion, 
  // AnimatePresence, 
  useScroll, useTransform } from 'framer-motion';
import { Sun, Moon } from 'lucide-react'; // Ensure lucide-react is installed

const COLORS = {
  primary: '#001F5C',
  accent: '#FFD700',
  backgroundDay: '#F1F5F9', // Updated for daytime visibility
  backgroundNight: '#000814',
  space: '#000814',
  industrial: '#121212',
};

const EXPERIENCE = [
  { role: "Plumber (NLNG T7 Project)", company: "Mbarie Services Limited", desc: "Full Structural Plumbing & Pipefitting Installation Engineering." },
  { role: "Manager/Supervisor", company: "CMIL Logistics", desc: "Forklift & Logistics oversight, ensuring safety and efficiency." },
  { role: "Biochemistry Researcher", company: "Sunchix Pharmacy Ltd", desc: "Laboratory testing, diagnosis, and biochemistry analysis." },
  { role: "Forklift Operator & HSE", company: "Cyknow Tech. Services Nig. Ltd", desc: "Safety compliance and heavy equipment operation." },
  { role: "ICT Personnel", company: "Crystal Lake Resort & Tours", desc: "IT Essentials and computer applications management." },
];

const SKILL_BARS = {
  software: [
    { name: "React JS/TS", level: 95, color: '#61DAFB' },
    { name: "Node JS", level: 88, color: '#339933' },
    { name: "Express JS", level: 90, color: '#828282' },
    { name: "MongoDB", level: 85, color: '#47A248' },
  ],
  industrial: [
    { name: "HSE Levels 1, 2 & 3", level: 98, color: '#FF4500' },
    { name: "Structural Plumbing", level: 92, color: '#1E90FF' },
    { name: "Forklift & Maintenance", level: 95, color: '#FFD700' },
    { name: "Project Management (PMP)", level: 85, color: '#32CD32' },
  ]
};

const SOCIAL_LINKS = [
  { name: 'CV/Resume', url: '#' },
  { name: 'GitHub', url: '#' },
  { name: 'LinkedIn', url: '#' }
];

export const SkillsHub: React.FC = () => {
  const [mode, setMode] = useState<'software' | 'industrial'>('software');
  const containerRef = useRef(null);

  // === SHARED NIGHT OPS STATE (Synced via LocalStorage) ===
  const [isNightOps, setIsNightOps] = useState(() => {
    const saved = localStorage.getItem('nightOps');
    if (saved !== null) return JSON.parse(saved);
    const hour = new Date().getHours();
    return hour >= 18 || hour < 6;
  });

  useEffect(() => {
    localStorage.setItem('nightOps', JSON.stringify(isNightOps));
  }, [isNightOps]);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const morphRotate = useTransform(scrollYProgress, [0, 1], [0, 720]);

  return (
    <div ref={containerRef} className="relative transition-all duration-1000 overflow-hidden mt-[-20rem]" 
         style={{ backgroundColor: isNightOps ? (mode === 'software' ? COLORS.space : COLORS.industrial) : COLORS.backgroundDay }}>
      
      {/* === GLOBAL NIGHT OPS TOGGLE === */}
      <button
        onClick={() => setIsNightOps(!isNightOps)}
        className="fixed top-8 right-8 z-[100] p-4 rounded-full backdrop-blur-md border transition-all duration-500 shadow-xl"
        style={{ 
          backgroundColor: isNightOps ? 'rgba(255,255,255,0.1)' : 'rgba(0,31,92,0.1)',
          borderColor: isNightOps ? COLORS.accent : COLORS.primary,
          color: isNightOps ? COLORS.accent : COLORS.primary
        }}
      >
        {isNightOps ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      {/* 1. THE MODE TOGGLE (Software vs Industrial) */}
      <div className="fixed top-28 right-8 z-50">
        <button 
          onClick={() => setMode(mode === 'software' ? 'industrial' : 'software')}
          className="p-1 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center gap-3 pr-5 shadow-2xl"
          style={{ borderColor: isNightOps ? 'rgba(255,255,255,0.2)' : COLORS.primary }}
        >
          <motion.div 
            animate={{ rotate: mode === 'software' ? 0 : 180 }}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg ${mode === 'software' ? 'bg-blue-600' : 'bg-orange-600'}`}>
            {mode === 'software' ? '💻' : '🏗️'}
          </motion.div>
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: isNightOps ? 'rgba(255,255,255,0.5)' : COLORS.primary }}>Current View</p>
            <p className="text-xs font-black uppercase" style={{ color: isNightOps ? 'white' : COLORS.primary }}>{mode === 'software' ? 'Software' : 'Industrial'}</p>
          </div>
        </button>
      </div>

      {/* 2. BIOCHEMISTRY TO CODE MORPH LINE */}
      <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-gradient-to-b from-green-500 via-yellow-400 to-blue-500 opacity-20" />
      <motion.div 
        style={{ rotate: morphRotate, top: '20%' }}
        className="sticky left-1/2 -translate-x-1/2 z-0 opacity-10 text-[200px] pointer-events-none"
      >
        {mode === 'software' ? '⚛️' : '🛠️'}
      </motion.div>

      <div className="relative z-10 mb-[-8rem]">
        {/* 3. PROFICIENCY MATRIX */}
        <section className="py-24 max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4 uppercase tracking-tighter" style={{ color: isNightOps ? '#fff' : COLORS.primary }}>
              Proficiency <span style={{ color: COLORS.accent }}>Matrix</span>
            </h2>
            <p className="text-sm font-bold opacity-80 uppercase tracking-[0.4em]" style={{ color: isNightOps ? '#94a3b8' : '#334155' }}>
               {mode === 'software' ? 'Full Stack Development' : 'HSE & Industrial Operations'}
            </p>
          </div>

          <div className="space-y-10">
            {(mode === 'software' ? SKILL_BARS.software : SKILL_BARS.industrial).map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-black uppercase tracking-widest" style={{ color: isNightOps ? 'white' : COLORS.primary }}>{skill.name}</span>
                  <span className="text-sm font-black" style={{ color: COLORS.accent }}>{skill.level}%</span>
                </div>
                <div className="h-3 bg-black/10 rounded-full overflow-hidden border border-black/5 dark:border-white/10 dark:bg-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full relative"
                    style={{ backgroundColor: skill.color }}
                  >
                    <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. CAREER TRAJECTORY SLIDER */}
        <section className="py-24 bg-black/20 overflow-hidden border-y border-white/5">
          <div className="flex">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="flex gap-8 whitespace-nowrap"
            >
              {[...EXPERIENCE, ...EXPERIENCE].map((exp, i) => (
                <div key={i} className="min-w-[350px] p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
                  <h3 className="text-xl font-black text-white whitespace-normal">{exp.role}</h3>
                  <p className="text-yellow-400 font-bold text-xs uppercase mt-2 tracking-widest">{exp.company}</p>
                  <p className="text-slate-300 text-sm mt-6 whitespace-normal leading-relaxed">{exp.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 5. CERTIFICATION BADGES */}
        <section className="py-24 text-center">
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] mb-12" style={{ color: isNightOps ? 'rgba(255,255,255,0.4)' : COLORS.primary }}>Global Certifications</h2>
          <div className="flex flex-wrap justify-center gap-8 px-6">
            {['PMP', 'AWS', 'OSHA', 'HSE 1-3', 'APM', 'HRM'].map((cert) => (
              <motion.div key={cert} whileHover={{ scale: 1.1, y: -5 }}
                className="w-24 h-24 rounded-full border border-yellow-400/30 bg-yellow-400/5 flex items-center justify-center text-xs font-black text-yellow-500 shadow-xl">
                {cert}
              </motion.div>
            ))}
          </div>
        </section>

        {/* 6. CTA & DOWNLOADS */}
        <section className="py-20" id="links">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center p-12 rounded-[3rem] border border-white/10 backdrop-blur-3xl bg-black/40 shadow-2xl">
              <h2 className="text-4xl font-black text-white mb-8 md:mb-0 tracking-tighter">Ready to <span className="text-yellow-400">Launch?</span></h2>
              <div className="flex flex-wrap justify-center gap-4">
                {SOCIAL_LINKS.map((link, index) => (
                  <motion.a 
                    key={index} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="relative group px-10 py-4 rounded-xl text-xs font-black uppercase tracking-widest overflow-hidden transition-all shadow-lg"
                    style={{ 
                      backgroundColor: link.name === 'CV/Resume' ? '#fff' : COLORS.accent, 
                      color: COLORS.primary 
                    }}
                  >
                    <span className="relative z-10">{link.name === 'CV/Resume' ? 'Download CV' : link.name}</span>
                    {link.name === 'CV/Resume' && (
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        {[...Array(8)].map((_, i) => (
                          <motion.div key={i} className="absolute w-1 h-1 bg-yellow-500 rounded-full"
                            animate={{ y: [0, -40], x: [0, (Math.random()-0.5)*60], opacity: [0, 1, 0] }}
                            transition={{ duration: 1, repeat: Infinity, delay: Math.random() }}
                            style={{ top: '50%', left: '50%' }}
                          />
                        ))}
                      </div>
                    )}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. CONTACT FORM */}
        <section className="py-24 pb-48" id="contact">
          <div className="max-w-3xl mx-auto px-6 p-12 rounded-[3.5rem] border border-white/10 bg-black/20 backdrop-blur-3xl shadow-2xl">
            <h2 className="text-3xl font-black text-center text-white mb-12 uppercase tracking-widest italic">Send Transmission</h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
              <input type="text" placeholder="Full Name" className="w-full bg-transparent border-b border-white/20 p-4 outline-none text-white font-bold focus:border-yellow-400 transition-all placeholder:text-white/30" />
              <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-white/20 p-4 outline-none text-white font-bold focus:border-yellow-400 transition-all placeholder:text-white/30" />
              <textarea rows={4} placeholder="Inquiry Details" className="w-full bg-transparent border border-white/20 rounded-2xl p-6 outline-none text-white font-bold focus:border-yellow-400 transition-all placeholder:text-white/30" />
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }} 
                className="w-full py-6 rounded-2xl bg-yellow-400 text-blue-900 font-black uppercase tracking-widest shadow-xl"
              >
                Transmit Message
              </motion.button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};









// import React, { useState, useEffect, useRef } from 'react';
// import { motion, 
//   AnimatePresence, 
//   useScroll, useTransform } from 'framer-motion';

// const COLORS = {
//   primary: '#001F5C',
//   accent: '#FFD700',
//   background: '#F0F8FF',
//   space: '#000814',
//   industrial: '#121212',
// };

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

// export const SkillsHub: React.FC = () => {
//   const [mode, setMode] = useState<'software' | 'industrial'>('software');
//   const [isNightOps, setIsNightOps] = useState(false);
//   const containerRef = useRef(null);

//   const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
//   const morphRotate = useTransform(scrollYProgress, [0, 1], [0, 720]);

//   useEffect(() => {
//     const hour = new Date().getHours();
//     if (hour >= 18 || hour < 6) setIsNightOps(true);
//   }, []);

//   return (
//     <div ref={containerRef} className="relative transition-all duration-1000 overflow-hidden mt-[-20rem] " 
//          style={{ backgroundColor: isNightOps ? (mode === 'software' ? COLORS.space : COLORS.industrial) : COLORS.background }}>
      
//       {/* 1. THE MODE TOGGLE */}
//       <div className="fixed top-28 right-6 z-50">
//         <button 
//           onClick={() => setMode(mode === 'software' ? 'industrial' : 'software')}
//           className="p-1 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center gap-3 pr-5 shadow-2xl"
//         >
//           <motion.div 
//             animate={{ rotate: mode === 'software' ? 0 : 180 }}
//             className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg ${mode === 'software' ? 'bg-blue-600' : 'bg-orange-600'}`}>
//             {mode === 'software' ? '💻' : '🏗️'}
//           </motion.div>
//           <div className="text-left">
//             <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Current View</p>
//             <p className="text-xs font-black uppercase text-white">{mode === 'software' ? 'Software' : 'Industrial'}</p>
//           </div>
//         </button>
//       </div>

//       {/* 2. BIOCHEMISTRY TO CODE MORPH LINE */}
//       <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-gradient-to-b from-green-500 via-yellow-400 to-blue-500 opacity-20" />
//       <motion.div 
//         style={{ rotate: morphRotate, top: '20%' }}
//         className="sticky left-1/2 -translate-x-1/2 z-0 opacity-10 text-[200px] pointer-events-none"
//       >
//         {mode === 'software' ? '⚛️' : '🛠️'}
//       </motion.div>

//       <div className="relative z-10 mb-[-8rem]">
//         {/* 3. PROFICIENCY MATRIX */}
//         <section className="py-24 max-w-4xl mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-black mb-4 uppercase" style={{ color: isNightOps ? '#fff' : COLORS.primary }}>
//               Proficiency <span style={{ color: COLORS.accent }}>Matrix</span>
//             </h2>
//             <p className="text-xs font-bold opacity-60 uppercase tracking-[0.4em]" style={{ color: isNightOps ? '#94a3b8' : COLORS.primary }}>
//                {mode === 'software' ? 'Full Stack Development' : 'HSE & Industrial Operations'}
//             </p>
//           </div>

//           <div className="space-y-8">
//             {(mode === 'software' ? SKILL_BARS.software : SKILL_BARS.industrial).map((skill) => (
//               <div key={skill.name}>
//                 <div className="flex justify-between mb-2">
//                   <span className="text-sm font-black uppercase text-white tracking-widest">{skill.name}</span>
//                   <span className="text-sm font-black" style={{ color: COLORS.accent }}>{skill.level}%</span>
//                 </div>
//                 <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
//                   <motion.div 
//                     initial={{ width: 0 }}
//                     whileInView={{ width: `${skill.level}%` }}
//                     transition={{ duration: 1.5 }}
//                     className="h-full relative"
//                     style={{ backgroundColor: skill.color }}
//                   >
//                     <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 2, repeat: Infinity }}
//                                 className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
//                   </motion.div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* 4. CAREER TRAJECTORY SLIDER */}
//         <section className="py-24 bg-black/30 overflow-hidden border-y border-white/5">
//           <div className="flex">
//             <motion.div 
//               animate={{ x: ["0%", "-50%"] }}
//               transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
//               className="flex gap-8 whitespace-nowrap"
//             >
//               {[...EXPERIENCE, ...EXPERIENCE].map((exp, i) => (
//                 <div key={i} className="min-w-[350px] p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl">
//                   <h3 className="text-xl font-black text-white whitespace-normal">{exp.role}</h3>
//                   <p className="text-yellow-400 font-bold text-xs uppercase mt-2 tracking-widest">{exp.company}</p>
//                   <p className="text-slate-400 text-sm mt-6 whitespace-normal leading-relaxed">{exp.desc}</p>
//                 </div>
//               ))}
//             </motion.div>
//           </div>
//         </section>

//         {/* 5. CERTIFICATION BADGES */}
//         <section className="py-24 text-center">
//           <h2 className="text-white/40 text-[10px] font-black uppercase tracking-[0.5em] mb-12">Global Certifications</h2>
//           <div className="flex flex-wrap justify-center gap-8">
//             {['PMP', 'AWS', 'OSHA', 'HSE 1-3', 'APM', 'HRM'].map((cert) => (
//               <motion.div key={cert} whileHover={{ scale: 1.1, y: -5 }}
//                 className="w-24 h-24 rounded-full border border-yellow-400/20 bg-yellow-400/5 flex items-center justify-center text-[10px] font-black text-yellow-400 shadow-[0_0_20px_rgba(255,215,0,0.05)]">
//                 {cert}
//               </motion.div>
//             ))}
//           </div>
//         </section>

//         {/* 6. CTA & DOWNLOADS */}
//         <section className="py-20" id="links">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex flex-col md:flex-row justify-between items-center p-12 rounded-[2rem] border border-white/10 backdrop-blur-3xl bg-black/40">
//               <h2 className="text-3xl font-black text-white mb-8 md:mb-0">Ready to <span className="text-yellow-400">Launch?</span></h2>
//               <div className="flex flex-wrap gap-4">
//                 {SOCIAL_LINKS.map((link, index) => (
//                   <motion.a 
//                     key={index} 
//                     href={link.url} 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     whileHover={{ scale: 1.05 }}
//                     className="relative group px-10 py-4 rounded-xl text-xs font-black uppercase tracking-widest overflow-hidden transition-all"
//                     style={{ 
//                       backgroundColor: link.name === 'CV/Resume' ? '#fff' : COLORS.accent, 
//                       color: COLORS.primary 
//                     }}
//                   >
//                     <span className="relative z-10">{link.name === 'CV/Resume' ? 'Download CV' : link.name}</span>
                    
//                     {link.name === 'CV/Resume' && (
//                       <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
//                         {[...Array(8)].map((_, i) => (
//                           <motion.div key={i} className="absolute w-1 h-1 bg-yellow-500 rounded-full"
//                             animate={{ y: [0, -40], x: [0, (Math.random()-0.5)*60], opacity: [0, 1, 0] }}
//                             transition={{ duration: 1, repeat: Infinity, delay: Math.random() }}
//                             style={{ top: '50%', left: '50%' }}
//                           />
//                         ))}
//                       </div>
//                     )}
//                   </motion.a>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>
 
//         {/* 7. CONTACT FORM */}
//         <AnimatePresence>
//         <motion.section className="py-24 pb-48" id="contact">
//           <div className="max-w-3xl mx-auto px-6 p-12 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-3xl">
//             <h2 className="text-3xl font-black text-center text-white mb-12 uppercase tracking-widest">Send Transmission</h2>
//             <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
//               <input type="text" placeholder="Full Name" className="w-full bg-transparent border-b border-white/20 p-4 outline-none text-white font-bold focus:border-yellow-400 transition-all" />
//               <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-white/20 p-4 outline-none text-white font-bold focus:border-yellow-400 transition-all" />
//               <textarea rows={4} placeholder="Inquiry Details" className="w-full bg-transparent border border-white/20 rounded-2xl p-4 outline-none text-white font-bold focus:border-yellow-400 transition-all" />
//               <motion.button whileTap={{ scale: 0.98 }} className="w-full py-5 rounded-2xl bg-yellow-400 text-blue-900 font-black uppercase tracking-widest">
//                 Transmit Message
//               </motion.button>
//             </form>
//           </div>
//         </motion.section>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };








// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// const COLORS = {
//   primary: '#001F5C',
//   accent: '#FFD700',
//   background: '#F0F8FF',
//   space: '#000814',
//   industrial: '#1a1a1a', // Rugged theme
// };

// const EXPERIENCE = [
//   { role: "MERN Developer & Project Lead", company: "Tech Solutions Inc.", desc: "Fullstack engineering & Agile leadership." },
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
//     { name: "HSE (Levels 1, 2, 3)", level: 98, color: '#FF4500' },
//     { name: "Plumbing Engineering", level: 92, color: '#1E90FF' },
//     { name: "Logistics Supervision", level: 95, color: '#FFD700' },
//     { name: "Project Mgt (PMP)", level: 85, color: '#32CD32' },
//   ]
// };

// export const SkillsHub: React.FC = () => {
//   const [mode, setMode] = useState<'software' | 'industrial'>('software');
//   const [isNightOps, setIsNightOps] = useState(false);
//   const containerRef = useRef(null);
  
//   const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
//   const morphRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

//   const [stars] = useState(() =>
//     Array.from({ length: 60 }).map((_, i) => ({
//       id: i, size: Math.random() * 3 + 1, x: Math.random() * 100, y: Math.random() * 100,
//       moveX: (Math.random() - 0.5) * 40, moveY: (Math.random() - 0.5) * 40,
//       twinkle: Math.random() * 2 + 0.5, drift: Math.random() * 20 + 20,
//     }))
//   );

//   useEffect(() => {
//     const hour = new Date().getHours();
//     if (hour >= 18 || hour < 6) setIsNightOps(true);
//   }, []);

//   return (
//     <div ref={containerRef} className="relative transition-all duration-1000 overflow-hidden" 
//          style={{ backgroundColor: isNightOps ? (mode === 'software' ? COLORS.space : COLORS.industrial) : COLORS.background }}>
      
//       {/* 1. THE MODE TOGGLE (Floating UI) */}
//       <div className="fixed top-28 right-6 z-50">
//         <button 
//           onClick={() => setMode(mode === 'software' ? 'industrial' : 'software')}
//           className="p-1 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center gap-3 pr-5 shadow-2xl transition-transform active:scale-95"
//         >
//           <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-500 shadow-lg ${mode === 'software' ? 'bg-blue-600 rotate-0' : 'bg-orange-600 rotate-[360deg]'}`}>
//             {mode === 'software' ? '💻' : '⚙️'}
//           </div>
//           <div className="text-left leading-none">
//             <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Active View</p>
//             <p className="text-xs font-black uppercase tracking-tight text-white">{mode === 'software' ? 'Software Mode' : 'Industrial Mode'}</p>
//           </div>
//         </button>
//       </div>

//       {/* STAR LAYER */}
//       <AnimatePresence>
//         {isNightOps && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-0 pointer-events-none">
//             {stars.map((star) => (
//               <motion.div key={star.id} className="absolute rounded-full bg-white shadow-[0_0_10px_white]"
//                 style={{ width: star.size, height: star.size, left: `${star.x}%`, top: `${star.y}%` }}
//                 animate={{ opacity: [0.1, 0.8, 0.1], x: [0, star.moveX], y: [0, star.moveY] }}
//                 transition={{ duration: star.drift, repeat: Infinity, ease: "linear" }}
//               />
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="relative z-10">
        
//         {/* 2. PROGRESS BARS SECTION */}
//         <section className="py-24 max-w-4xl mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter" style={{ color: isNightOps ? '#fff' : COLORS.primary }}>
//                Proficiency <span style={{ color: COLORS.accent }}>Matrix</span>
//             </h2>
//             <p className="text-sm font-bold opacity-60 uppercase tracking-[0.3em]" style={{ color: isNightOps ? '#94a3b8' : COLORS.primary }}>
//                {mode === 'software' ? 'MERN Stack & Tech Stack' : 'Safety & Engineering Standards'}
//             </p>
//           </div>

//           <div className="grid gap-8">
//             {(mode === 'software' ? SKILL_BARS.software : SKILL_BARS.industrial).map((skill) => (
//               <div key={skill.name} className="group">
//                 <div className="flex justify-between mb-2">
//                   <span className="text-sm font-black uppercase tracking-widest" style={{ color: isNightOps ? '#fff' : COLORS.primary }}>{skill.name}</span>
//                   <span className="text-sm font-black" style={{ color: COLORS.accent }}>{skill.level}%</span>
//                 </div>
//                 <div className="h-3 bg-black/20 rounded-full overflow-hidden backdrop-blur-md border border-white/5">
//                   <motion.div 
//                     initial={{ width: 0 }}
//                     whileInView={{ width: `${skill.level}%` }}
//                     transition={{ duration: 1.5, ease: "easeOut" }}
//                     className="h-full relative shadow-[0_0_20px_rgba(255,215,0,0.3)]"
//                     style={{ backgroundColor: isNightOps ? skill.color : COLORS.primary }}
//                   >
//                     <motion.div 
//                       animate={{ x: ['0%', '100%'], opacity: [0, 0.5, 0] }}
//                       transition={{ duration: 2, repeat: Infinity }}
//                       className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
//                     />
//                   </motion.div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* 3. PROFESSIONAL JOURNEY SLIDER (No Years) */}
//         <section className="py-24 bg-black/20 border-y border-white/5 overflow-hidden">
//           <div className="flex">
//             <motion.div 
//               animate={{ x: ["0%", "-50%"] }}
//               transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
//               className="flex gap-8 whitespace-nowrap"
//             >
//               {[...EXPERIENCE, ...EXPERIENCE].map((exp, i) => (
//                 <div key={i} className="min-w-[350px] p-10 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl">
//                   <h3 className="text-xl font-black text-white whitespace-normal">{exp.role}</h3>
//                   <p className="text-yellow-400 font-bold text-xs uppercase tracking-widest mt-2">{exp.company}</p>
//                   <p className="text-slate-400 text-sm mt-6 whitespace-normal leading-relaxed">{exp.desc}</p>
//                 </div>
//               ))}
//             </motion.div>
//           </div>
//         </section>

//         {/* 4. CERTIFICATION BADGES (Glowing Style) */}
//         <section className="py-24 max-w-7xl mx-auto px-4 text-center">
//           <h2 className="text-2xl font-black mb-16 uppercase tracking-[0.4em]" style={{ color: isNightOps ? '#fff' : COLORS.primary }}>Validated Expertise</h2>
//           <div className="flex flex-wrap justify-center gap-10">
//             {['PMP', 'AWS', 'OSHA', 'HSE 1-3', 'APM', 'HRM'].map((cert) => (
//               <motion.div 
//                 key={cert}
//                 whileHover={{ scale: 1.1, rotate: 5 }}
//                 className="w-28 h-28 rounded-2xl border border-white/10 flex items-center justify-center p-4 backdrop-blur-md relative group"
//                 style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
//               >
//                 <div className="absolute inset-0 bg-yellow-400/5 rounded-2xl blur-xl group-hover:bg-yellow-400/20 transition-all" />
//                 <span className="text-xs font-black text-white text-center leading-tight z-10">{cert}</span>
//                 <motion.div 
//                   animate={{ opacity: [0.2, 0.5, 0.2] }} 
//                   transition={{ duration: 3, repeat: Infinity }}
//                   className="absolute inset-0 border border-yellow-400/30 rounded-2xl" 
//                 />
//               </motion.div>
//             ))}
//           </div>
//         </section>

//         {/* 5. DOWNLOAD CV WITH GOLDEN SPARKLE */}
//         <section className="py-20 flex flex-col items-center">
//           <motion.a
//             href="#" 
//             whileHover={{ scale: 1.05 }}
//             className="relative group px-12 py-5 rounded-2xl bg-yellow-400 text-blue-900 font-black uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(255,215,0,0.3)] overflow-hidden"
//           >
//             <span className="relative z-10">Download CV</span>
            
//             {/* GOLDEN SPARKLES */}
//             <AnimatePresence>
//                <motion.div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
//                 {[...Array(12)].map((_, i) => (
//                   <motion.div
//                     key={i}
//                     animate={{ 
//                       y: [0, -40, -20],
//                       x: [0, (Math.random() - 0.5) * 80],
//                       scale: [0, 1.5, 0],
//                       rotate: [0, 180]
//                     }}
//                     transition={{ duration: 0.8, repeat: Infinity, delay: Math.random() }}
//                     className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white rounded-full"
//                   />
//                 ))}
//               </motion.div>
//             </AnimatePresence>
//           </motion.a>
//         </section>

//         {/* 6. CONTACT FORM */}
//         <section className="py-20 pb-40" id="contact">
//           <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 p-12 rounded-[3rem] border backdrop-blur-3xl transition-all" 
//                style={{ backgroundColor: isNightOps ? 'rgba(255,255,255,0.02)' : 'white', borderColor: isNightOps ? 'rgba(255,255,255,0.1)' : 'transparent' }}>
//             <h2 className="text-4xl font-black text-center mb-4" style={{ color: isNightOps ? '#fff' : COLORS.primary }}>Transmission <span style={{ color: COLORS.accent }}>Hub</span></h2>
//             <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
//                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                   <input type="text" placeholder="Full Name" className="w-full bg-transparent border-b-2 p-4 outline-none font-bold text-white transition-all focus:border-yellow-400 border-white/10" />
//                   <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b-2 p-4 outline-none font-bold text-white transition-all focus:border-yellow-400 border-white/10" />
//                </div>
//                <textarea rows={4} placeholder="Project Details" className="w-full bg-transparent border-2 rounded-2xl p-4 outline-none font-bold text-white transition-all focus:border-yellow-400 border-white/10" />
//                <motion.button type="submit" className="w-full py-5 rounded-2xl bg-yellow-400 text-blue-900 text-sm font-black uppercase tracking-[0.3em]">
//                  Send Transmission
//                </motion.button>
//             </form>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };















// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const COLORS = {
//   primary: '#001F5C',
//   accent: '#FFD700',
//   background: '#F0F8FF',
//   space: '#000814',
// };

// const SKILL_HUBS = [
//   { 
//     title: "Development Hub", 
//     description: "Expertise in building scalable, component-driven web applications and clean APIs.",
//     skills: ["React/TypeScript", "Next.js/Node.js", "Tailwind CSS", "API Design"],
//     color: '#00BFFF', 
//     icon: '💻'
//   },
//   { 
//     title: "Design & UX Hub", 
//     description: "Translating complex problems into intuitive, user-centric experiences and polished UIs.",
//     skills: ["Figma Prototyping", "User Research", "Wireframing", "A/B Testing"],
//     color: '#FF7F50', 
//     icon: '🎨'
//   },
//   { 
//     title: "Strategy & Data Hub", 
//     description: "Driving decisions with data—from market analysis to conversion optimization and reporting.",
//     skills: ["Google Analytics", "SQL/Database", "SEO/SEM Strategy", "KPI Tracking"],
//     color: '#32CD32', 
//     icon: '📈'
//   },
// ];

// const SOCIAL_LINKS = [
//     { name: 'CV/Resume', url: '#' },
//     { name: 'GitHub', url: '#' },
//     { name: 'LinkedIn', url: '#' }
// ];

// export const SkillsHub: React.FC = () => {
//   const [isNightOps, setIsNightOps] = useState(false);

//   // 1. STAR GENERATION
//   const [stars] = useState(() =>
//     Array.from({ length: 60 }).map((_, i) => ({
//       id: i,
//       size: Math.random() * 4 + 1,
//       x: Math.random() * 100,
//       y: Math.random() * 100,
//       moveX: (Math.random() - 0.5) * 50,
//       moveY: (Math.random() - 0.5) * 50,
//       twinkleSpeed: Math.random() * 1.5 + 0.5,
//       driftDuration: Math.random() * 25 + 20,
//     }))
//   );

//   useEffect(() => {
//     const hour = new Date().getHours();
//     if (hour >= 18 || hour < 6) setIsNightOps(true);
//   }, []);

//   return (
//     <div className="relative transition-colors duration-1000 overflow-hidden" 
//          style={{ backgroundColor: isNightOps ? COLORS.space : COLORS.background }}>
      
//       {/* STAR LAYER */}
//       <AnimatePresence>
//         {isNightOps && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-0 pointer-events-none">
//             {stars.map((star) => (
//               <motion.div
//                 key={star.id}
//                 className="absolute rounded-full bg-white"
//                 style={{
//                   width: star.size, height: star.size, left: `${star.x}%`, top: `${star.y}%`,
//                   boxShadow: `0 0 ${star.size * 2}px white, 0 0 ${star.size * 4}px ${COLORS.accent}33`,
//                 }}
//                 animate={{ opacity: [0.1, 1, 0.1], x: [0, star.moveX], y: [0, star.moveY] }}
//                 transition={{
//                   x: { duration: star.driftDuration, repeat: Infinity, ease: "linear" },
//                   y: { duration: star.driftDuration, repeat: Infinity, ease: "linear" },
//                   opacity: { duration: star.twinkleSpeed, repeat: Infinity, ease: "easeInOut" },
//                 }}
//               />
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="relative z-10">
//         {/* 2. SKILLS HUB SECTION */}
//         <section className="py-20 md:py-28" id="skills">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="text-center mb-16">
//               <h2 className="text-4xl sm:text-5xl font-black mb-3" style={{ color: isNightOps ? '#fff' : COLORS.primary }}>
//                 My Multidisciplinary <span style={{ color: COLORS.accent }}>Hubs</span>
//               </h2>
//               <p className="text-lg" style={{ color: isNightOps ? '#94a3b8' : COLORS.primary, opacity: 0.7 }}>
//                 Showcasing a unique blend of technical, creative, and analytical expertise.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//               {SKILL_HUBS.map((hub, index) => (
//                 <motion.div 
//                   key={index} 
//                   whileHover={{ y: -10 }}
//                   className="p-8 rounded-2xl border-t-8 h-full flex flex-col backdrop-blur-xl transition-all duration-500"
//                   style={{ 
//                     borderColor: hub.color, 
//                     backgroundColor: isNightOps ? 'rgba(255, 255, 255, 0.03)' : 'white', 
//                     boxShadow: isNightOps ? `0 0 20px ${hub.color}22` : `0 8px 20px rgba(0, 31, 92, 0.1)`,
//                     borderLeft: isNightOps ? '1px solid rgba(255,255,255,0.05)' : 'none'
//                   }}
//                 >
//                   <div className="flex items-center mb-6">
//                       <span className="text-5xl mr-4 drop-shadow-lg">{hub.icon}</span>
//                       <h3 className="text-2xl font-black" style={{ color: isNightOps ? '#fff' : COLORS.primary }}>
//                           {hub.title}
//                       </h3>
//                   </div>
//                   <p className="mb-8 grow leading-relaxed" style={{ color: isNightOps ? '#cbd5e1' : '#4b5563' }}>
//                     {hub.description}
//                   </p>
//                   <div className="mt-auto">
//                     <h4 className="font-bold mb-4 uppercase text-xs tracking-widest" style={{ color: isNightOps ? COLORS.accent : COLORS.primary }}>Core Skills</h4>
//                     <div className="flex flex-wrap gap-2">
//                       {hub.skills.map(skill => (
//                         <span key={skill} className="px-3 py-1 rounded-lg text-xs font-black uppercase tracking-tighter transition-all"
//                           style={{ backgroundColor: isNightOps ? `${hub.color}22` : hub.color, color: isNightOps ? hub.color : 'white', border: isNightOps ? `1px solid ${hub.color}` : 'none' }}>
//                           {skill}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* 3. EXPERIENCE SECTION */}
//         <section className="py-20" id="experience">
//           <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//             <h2 className="text-4xl font-black mb-16" style={{ color: isNightOps ? '#fff' : COLORS.primary }}>
//               Career <span style={{ color: COLORS.accent }}>Trajectory</span>
//             </h2>
//             <div className="space-y-12 relative">
//               <div className="p-10 rounded-3xl backdrop-blur-2xl border transition-all duration-500" 
//                    style={{ backgroundColor: isNightOps ? 'rgba(255,255,255,0.02)' : 'white', borderColor: isNightOps ? 'rgba(255,255,255,0.1)' : 'transparent' }}>
//                   <h3 className="text-2xl font-black mb-2" style={{ color: isNightOps ? '#fff' : COLORS.primary }}>Senior MERN Developer & Project Lead</h3>
//                   <p className="text-xl font-bold mb-6" style={{ color: COLORS.accent }}>Tech Solutions Inc. | 2020 – 2024</p>
//                   <p className="leading-relaxed max-w-2xl mx-auto" style={{ color: isNightOps ? '#94a3b8' : '#4b5563' }}>
//                       Managed a 5-person team, delivering fullstack solutions that increased client conversion rates by 25%. Implemented Agile methodologies.
//                   </p>
//               </div>

//               <div>
//                 <h4 className="text-xs font-black mb-10 uppercase tracking-[0.4em]" style={{ color: isNightOps ? '#fff' : COLORS.primary }}>Industry Certifications</h4>
//                 <div className="flex flex-wrap justify-center gap-4">
//                   {['AWS Cloud', 'OSHA Certified', 'CompTIA', 'Industry Leaders'].map((company, index) => (
//                     <div key={index} className="px-8 py-4 rounded-xl text-xs font-black border-2 transition-all uppercase tracking-widest"
//                       style={{ borderColor: COLORS.accent, color: isNightOps ? COLORS.accent : COLORS.primary, backgroundColor: isNightOps ? 'transparent' : COLORS.background }}>
//                       {company}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* 4. CTA & DOWNLOADS */}
//         <section className="py-20" id="links">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="flex flex-col md:flex-row justify-between items-center p-12 rounded-[2rem] border backdrop-blur-3xl transition-all duration-500"
//                    style={{ backgroundColor: isNightOps ? 'rgba(0,0,0,0.4)' : 'white', borderColor: isNightOps ? COLORS.accent : 'transparent' }}>
//                   <h2 className="text-4xl font-black mb-8 md:mb-0 max-w-md text-left leading-tight" style={{ color: isNightOps ? '#fff' : COLORS.primary }}>
//                       Let's Connect, Partner and <span style={{ color: COLORS.accent }}>Build</span>.
//                   </h2>
//                   <div className="flex flex-wrap justify-center gap-4">
//                       {SOCIAL_LINKS.map((link, index) => (
//                           <motion.a key={index} href={link.url} whileHover={{ scale: 1.05 }}
//                               animate={link.name !== 'CV/Resume' ? { boxShadow: [`0 0 0px ${COLORS.accent}00`, `0 0 20px ${COLORS.accent}44`, `0 0 0px ${COLORS.accent}00`] } : {}}
//                               transition={{ duration: 2, repeat: Infinity }}
//                               className="px-10 py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all"
//                               style={{ backgroundColor: link.name === 'CV/Resume' ? (isNightOps ? '#fff' : COLORS.primary) : COLORS.accent, 
//                                        color: link.name === 'CV/Resume' ? COLORS.primary : COLORS.primary }}>
//                               {link.name === 'CV/Resume' ? 'Download CV' : link.name}
//                           </motion.a>
//                       ))}
//                   </div>
//               </div>
//           </div>
//         </section>

//         {/* 5. CONTACT FORM */}
//         <section className="py-20 pb-40" id="contact">
//           <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 p-12 rounded-[3rem] border backdrop-blur-3xl transition-all" 
//                style={{ backgroundColor: isNightOps ? 'rgba(255,255,255,0.02)' : 'white', borderColor: isNightOps ? 'rgba(255,255,255,0.1)' : 'transparent' }}>
//             <h2 className="text-4xl font-black text-center mb-4" style={{ color: isNightOps ? '#fff' : COLORS.primary }}>Transmission <span style={{ color: COLORS.accent }}>Hub</span></h2>
//             <p className="text-center mb-12 uppercase text-[10px] font-bold tracking-[0.3em]" style={{ color: isNightOps ? '#64748b' : COLORS.primary }}>Inquire via secure channel</p>
//             <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
//               {['Full Name', 'Email'].map((label) => (
//                 <div key={label}>
//                   <input type={label === 'Email' ? 'email' : 'text'} placeholder={label} required 
//                          className="w-full bg-transparent border-b-2 p-4 outline-none transition-all font-bold"
//                          style={{ borderColor: isNightOps ? 'rgba(255,255,255,0.1)' : COLORS.primary, color: isNightOps ? '#fff' : COLORS.primary }} />
//                 </div>
//               ))}
//               <div>
//                 <textarea rows={4} placeholder="Project Details" required 
//                           className="w-full bg-transparent border-2 rounded-2xl p-4 outline-none transition-all font-bold"
//                           style={{ borderColor: isNightOps ? 'rgba(255,255,255,0.1)' : COLORS.primary, color: isNightOps ? '#fff' : COLORS.primary }}></textarea>
//               </div>
//               <motion.button type="submit" whileHover={{ scale: 1.02 }} 
//                 className="w-full py-5 rounded-2xl text-sm font-black uppercase tracking-[0.3em] shadow-2xl"
//                 style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}>
//                 Send Transmission
//               </motion.button>
//             </form>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };














// // src/components/SkillsHub.tsx

// import React from 'react';

// const COLORS = {
//   primary: '#001F5C',
//   accent: '#FFD700',
// };

// const SKILL_HUBS = [
//   { 
//     title: "Development Hub", 
//     description: "Expertise in building scalable, component-driven web applications and clean APIs.",
//     skills: ["React/TypeScript", "Next.js/Node.js", "Tailwind CSS", "API Design"],
//     color: '#00BFFF', // Sky Blue for Tech
//     icon: '💻'
//   },
//   { 
//     title: "Design & UX Hub", 
//     description: "Translating complex problems into intuitive, user-centric experiences and polished UIs.",
//     skills: ["Figma Prototyping", "User Research", "Wireframing", "A/B Testing"],
//     color: '#FF7F50', // Coral for Design
//     icon: '🎨'
//   },
//   { 
//     title: "Strategy & Data Hub", 
//     description: "Driving decisions with data—from market analysis to conversion optimization and reporting.",
//     skills: ["Google Analytics", "SQL/Database", "SEO/SEM Strategy", "KPI Tracking"],
//     color: '#32CD32', // Lime Green for Strategy
//     icon: '📈'
//   },
// ];

// export const SkillsHub: React.FC = () => {
//   return (
//     <section className="py-20 md:py-28" id="skills">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl sm:text-5xl font-extrabold mb-3" style={{ color: COLORS.primary }}>
//             My Multidisciplinary Hubs
//           </h2>
//           <p className="text-lg" style={{ color: COLORS.primary, opacity: 0.7 }}>
//             Showcasing a unique blend of technical, creative, and analytical expertise.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//           {SKILL_HUBS.map((hub, index) => (
//             <div 
//               key={index} 
//               className="p-8 rounded-xl border-t-8 h-full flex flex-col transition duration-300 hover:shadow-2xl hover:scale-[1.01]"
//               style={{ 
//                 borderColor: hub.color, 
//                 backgroundColor: 'white', 
//                 boxShadow: `0 8px 20px rgba(0, 31, 92, 0.1)` 
//               }}
//             >
//               <div className="flex items-center mb-4">
//                   <span className="text-4xl mr-3">{hub.icon}</span>
//                   <h3 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
//                       {hub.title}
//                   </h3>
//               </div>
              
//               <p className="text-gray-600 mb-6 grow">
//                 {hub.description}
//               </p>
              
//               <div className="mt-auto">
//                 <h4 className="font-semibold mb-2" style={{ color: COLORS.primary }}>Core Skills:</h4>
//                 <div className="flex flex-wrap gap-2">
//                   {hub.skills.map(skill => (
//                     <span 
//                       key={skill}
//                       className="px-3 py-1 rounded-full text-xs font-medium"
//                       style={{ backgroundColor: hub.color, color: 'white' }}
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };