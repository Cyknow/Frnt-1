import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  // useLocation,
   useNavigate } from 'react-router-dom';

interface ProgramProps {
  title: string;
  subtitle: string;
  description: string;
  features: { h: string; p: string; link: string }[];
  stats: { label: string; value: string; baseValue?: number; suffix?: string }[];
  accentColor: string;
  isLoggedIn?: boolean; 
}

const colorMap: Record<string, string> = {
  blue: 'bg-blue-600',
  emerald: 'bg-emerald-600',
  red: 'bg-red-600',
  amber: 'bg-amber-600',
};

const textMap: Record<string, string> = {
  blue: 'text-blue-500',
  emerald: 'text-emerald-500',
  red: 'text-red-500',
  amber: 'text-amber-500',
};

const calculateGrowth = (baseValue: number) => {
  const startDate = new Date('2024-01-01');
  const today = new Date();
  const months = (today.getFullYear() - startDate.getFullYear()) * 12 + (today.getMonth() - startDate.getMonth());
  return Math.floor(baseValue * Math.pow(1.02, months)).toLocaleString();
};

const ProgramTemplate: React.FC<ProgramProps> = ({ title, subtitle, description, features, stats, accentColor, isLoggedIn = false }) => {
  const navigate = useNavigate();
  // const location = useLocation();

  // 1. AUTO-DOWNLOAD LOGIC (Handles return from login)
useEffect(() => {
  const savedIntent = sessionStorage.getItem('redirect_intent');
  
  if (isLoggedIn && savedIntent === window.location.pathname) {
    sessionStorage.removeItem('redirect_intent'); // Clear it so it doesn't loop
    window.print();
    setTimeout(() => navigate('/dashboard'), 2000);
  }
}, [isLoggedIn]);

const handlePrint = () => {
  if (!isLoggedIn) {
    // Save the intent in the browser's temporary memory
    sessionStorage.setItem('redirect_intent', window.location.pathname);
    navigate('/signup');
    return;
  }
  window.print();
};

  // const handlePrint = () => {
  //   if (!isLoggedIn) {
  //     // Redirect to signin and store where we came from + the download intent
  //     navigate('/signinp', { 
  //       state: { 
  //         from: location.pathname, 
  //         triggerDownload: true 
  //       } 
  //     });
  //     return;
  //   }
  //   window.print();
  // };

  const handleNavigation = (link: string) => {
    if (link.startsWith('http')) {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      navigate(link);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-yellow-400 selection:text-black">
      
      {/* --- WEB VIEW --- */}
      <div className="print:hidden">
        {/* Hero Section */}
        <div className="h-[70vh] relative flex items-center justify-center overflow-hidden">
          <div className={`absolute inset-0 opacity-20 blur-[120px] rounded-full ${colorMap[accentColor]}`} />
          <div className="relative z-10 text-center px-6">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none"
            >
              {title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 tracking-[0.6em] text-yellow-400 font-black uppercase text-xs md:text-sm"
            >
              {subtitle}
            </motion.p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="max-w-7xl mx-auto px-6 -mt-24 relative z-20 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl"
            >
              <h4 className={`text-4xl font-black ${textMap[accentColor]}`}>
                {stat.baseValue ? `${stat.suffix || ''}${calculateGrowth(stat.baseValue)}` : stat.value}
              </h4>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mt-2 font-bold">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-20">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
            <h2 className="text-4xl font-black uppercase italic mb-8">Our Mission</h2>
            <p className="text-slate-400 leading-relaxed text-xl mb-10">{description}</p>
            
            <div className="relative group inline-block">
              <button 
                onClick={handlePrint}
                className={`px-12 py-5 rounded-2xl font-black text-white transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-3 ${colorMap[accentColor]} ${!isLoggedIn ? 'opacity-70 grayscale' : ''}`}
              >
                {!isLoggedIn && <span>🔒</span>}
                {isLoggedIn ? 'DOWNLOAD BRIEFING PDF' : 'SIGN IN TO ACCESS PDF'}
              </button>
              
              {!isLoggedIn && (
                <p className="absolute -bottom-8 left-0 text-[10px] text-yellow-400 font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  * Restricted to Authorized Personnel Only
                </p>
              )}
            </div>
          </motion.div>

          {/* Initiatives Column */}
          <div className="space-y-8">
            <h2 className="text-2xl font-black uppercase tracking-widest text-yellow-400 mb-6 underline decoration-4 underline-offset-8">Key Initiatives</h2>
            {features.map((item, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ x: 10 }}
                onClick={() => handleNavigation(item.link)}
                className="border-l-2 border-white/10 pl-8 py-4 cursor-pointer group hover:border-yellow-400 transition-all"
              >
                <h3 className="text-white font-black uppercase text-lg mb-2 italic group-hover:text-yellow-400 flex items-center gap-3">
                  {item.h} <span className="text-xs opacity-0 group-hover:opacity-100 transition-all">→</span>
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium group-hover:text-slate-200">{item.p}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* --- PRINT-ONLY BRIEFING LAYOUT --- */}
      {isLoggedIn && (
        <div className="hidden print:block p-12 text-black bg-white min-h-screen font-serif relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none -rotate-45">
            <h1 className="text-[120px] font-black whitespace-nowrap">WCC AUTHENTIC</h1>
          </div>

          <div className="relative z-10">
            <div className="border-b-4 border-black pb-4 mb-8 flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-black uppercase tracking-tighter">Weren-Care Charity</h1>
                <p className="text-sm font-bold uppercase tracking-widest text-gray-600">Official Program Briefing</p>
              </div>
              <p className="text-xs text-gray-400">Ref: {title.substring(0,3).toUpperCase()}-2026</p>
            </div>

            <h2 className="text-3xl font-bold mb-2">{title}</h2>
            <p className="text-blue-600 font-bold uppercase tracking-widest mb-6">{subtitle}</p>

            <div className="mb-10 text-justify">
              <h3 className="text-lg font-bold uppercase border-b border-gray-200 mb-3">Executive Summary</h3>
              <p className="text-gray-700 leading-relaxed text-sm">{description}</p>
            </div>

            <div className="grid grid-cols-2 gap-12 mb-10">
              <div>
                <h3 className="text-lg font-bold uppercase border-b border-gray-200 mb-4 text-slate-900">Real-Time Metrics</h3>
                {stats.map((s, i) => (
                  <div key={i} className="mb-3">
                    <span className="text-gray-500 text-[10px] uppercase block leading-none">{s.label}</span>
                    <span className="text-xl font-bold">
                      {s.baseValue ? `${s.suffix || ''}${calculateGrowth(s.baseValue)}` : s.value}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase border-b border-gray-200 mb-4 text-slate-900">Initiative Clusters</h3>
                {features.map((f, i) => (
                  <div key={i} className="mb-4">
                    <span className="font-bold block text-sm italic underline">{f.h}</span>
                    <p className="text-[11px] text-gray-600 leading-tight mt-1">{f.p}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-32 pt-8 border-t border-gray-100 text-[9px] text-gray-400 text-center uppercase tracking-widest">
              <p>Generated: {new Date().toLocaleString()} — WCC Global Operations</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media print {
          @page { size: A4; margin: 1cm; }
          body { background: white !important; color: black !important; -webkit-print-color-adjust: exact; }
          .print\:hidden { display: none !important; }
          .print\:block { display: block !important; }
        }
      `}</style>
    </div>
  );
};

export default ProgramTemplate;









// import React, { useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useLocation, useNavigate } from 'react-router-dom';

// interface ProgramProps {
//   title: string;
//   subtitle: string;
//   description: string;
//   features: { h: string; p: string; link: string }[];
//   stats: { label: string; value: string; baseValue?: number; suffix?: string }[];
//   accentColor: string;
//   isLoggedIn?: boolean; // Added prop to check auth status
// }

// const colorMap: Record<string, string> = {
//   blue: 'bg-blue-600',
//   emerald: 'bg-emerald-600',
//   red: 'bg-red-600',
//   amber: 'bg-amber-600',
// };

// const textMap: Record<string, string> = {
//   blue: 'text-blue-500',
//   emerald: 'text-emerald-500',
//   red: 'text-red-500',
//   amber: 'text-amber-500',
// };

// const calculateGrowth = (baseValue: number) => {
//   const startDate = new Date('2024-01-01');
//   const today = new Date();
//   const months = (today.getFullYear() - startDate.getFullYear()) * 12 + (today.getMonth() - startDate.getMonth());
//   return Math.floor(baseValue * Math.pow(1.02, months)).toLocaleString();
// };

// const ProgramTemplate: React.FC<ProgramProps> = ({ title, subtitle, description, features, stats, accentColor, isLoggedIn = false }) => {
//   const navigate = useNavigate();

//   const handlePrint = () => {
//     // SECURITY CHECK: Block the print function if not logged in
//     if (!isLoggedIn) {
//       navigate('/signin', { state: { from: window.location.pathname } }); // Redirect to login
//       return;
//     }
//     window.print();
//   };

//   const handleNavigation = (link: string) => {
//     if (link.startsWith('http')) {
//       window.open(link, '_blank', 'noopener,noreferrer');
//     } else {
//       navigate(link);
//     }
//   };

//   // ... inside the component
// const location = useLocation();

//   useEffect(() => {
//   // Check if we arrived here with the intent to download
//   if (isLoggedIn && location.state?.autoDownload) {
    
//     // 1. Trigger the print dialog
//     window.print();

//     // 2. Clean up the URL state so it doesn't download again if they refresh
//     window.history.replaceState({}, document.title);

//     // 3. Optional: Redirect to dashboard after a short delay
//     const timer = setTimeout(() => {
//       navigate('/dashboard');
//     }, 3000); // 3 seconds gives them time to handle the print pop-up

//     return () => clearTimeout(timer);
//   }
// }, [isLoggedIn, location.state, navigate]);

//   return (
//     <div className="min-h-screen bg-slate-950 text-white selection:bg-yellow-400 selection:text-black">
      
//       {/* --- WEB VIEW --- */}
//       <div className="print:hidden">
//         {/* Hero Section */}
//         <div className="h-[70vh] relative flex items-center justify-center overflow-hidden">
//           <div className={`absolute inset-0 opacity-20 blur-[120px] rounded-full ${colorMap[accentColor]}`} />
//           <div className="relative z-10 text-center px-6">
//             <motion.h1 
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none"
//             >
//               {title}
//             </motion.h1>
//             <motion.p 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//               className="mt-4 tracking-[0.6em] text-yellow-400 font-black uppercase text-xs md:text-sm"
//             >
//               {subtitle}
//             </motion.p>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="max-w-7xl mx-auto px-6 -mt-24 relative z-20 grid grid-cols-2 lg:grid-cols-4 gap-6">
//           {stats.map((stat, i) => (
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.1 }}
//               key={i} 
//               className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl"
//             >
//               <h4 className={`text-4xl font-black ${textMap[accentColor]}`}>
//                 {stat.baseValue ? `${stat.suffix || ''}${calculateGrowth(stat.baseValue)}` : stat.value}
//               </h4>
//               <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mt-2 font-bold">{stat.label}</p>
//             </motion.div>
//           ))}
//         </div>

//         {/* Content Section */}
//         <div className="max-w-6xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-20">
//           <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
//             <h2 className="text-4xl font-black uppercase italic mb-8">Our Mission</h2>
//             <p className="text-slate-400 leading-relaxed text-xl mb-10">{description}</p>
            
//             {/* AUTH-GATED DOWNLOAD BUTTON */}
//             <div className="relative group inline-block">
//               <button 
//                 onClick={handlePrint}
//                 className={`px-12 py-5 rounded-2xl font-black text-white transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-3 ${colorMap[accentColor]} ${!isLoggedIn ? 'opacity-70 grayscale' : ''}`}
//               >
//                 {!isLoggedIn && <span>🔒</span>}
//                 {isLoggedIn ? 'DOWNLOAD BRIEFING PDF' : 'LOGIN TO ACCESS PDF'}
//               </button>
              
//               {!isLoggedIn && (
//                 <p className="absolute -bottom-8 left-0 text-[10px] text-yellow-400 font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
//                   * Restricted to Authorized Personnel Only
//                 </p>
//               )}
//             </div>
//           </motion.div>

//           {/* Initiatives Column */}
//           <div className="space-y-8">
//             <h2 className="text-2xl font-black uppercase tracking-widest text-yellow-400 mb-6 underline decoration-4 underline-offset-8">Key Initiatives</h2>
//             {features.map((item, idx) => (
//               <motion.div 
//                 key={idx} 
//                 whileHover={{ x: 10 }}
//                 onClick={() => handleNavigation(item.link)}
//                 className="border-l-2 border-white/10 pl-8 py-4 cursor-pointer group hover:border-yellow-400 transition-all"
//               >
//                 <h3 className="text-white font-black uppercase text-lg mb-2 italic group-hover:text-yellow-400 flex items-center gap-3">
//                   {item.h} <span className="text-xs opacity-0 group-hover:opacity-100 transition-all">→</span>
//                 </h3>
//                 <p className="text-slate-400 text-sm leading-relaxed font-medium group-hover:text-slate-200">{item.p}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* --- PRINT-ONLY BRIEFING LAYOUT --- */}
//       {/* SECURITY NOTE: We only render the print content into the DOM if the user is logged in. 
//           This prevents people from using 'Inspect Element' to bypass the login requirement.
//       */}
//       {isLoggedIn && (
//         <div className="hidden print:block p-12 text-black bg-white min-h-screen font-serif relative">
//           <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none -rotate-45">
//             <h1 className="text-[120px] font-black">WCC AUTHENTIC</h1>
//           </div>

//           <div className="relative z-10">
//             <div className="border-b-4 border-black pb-4 mb-8 flex justify-between items-end">
//               <div>
//                 <h1 className="text-4xl font-black uppercase tracking-tighter">Weren-Care Charity</h1>
//                 <p className="text-sm font-bold uppercase tracking-widest text-gray-600">Official Program Briefing</p>
//               </div>
//               <p className="text-xs text-gray-400">Ref: {title.substring(0,3).toUpperCase()}-2026</p>
//             </div>

//             <h2 className="text-3xl font-bold mb-2">{title}</h2>
//             <p className="text-blue-600 font-bold uppercase tracking-widest mb-6">{subtitle}</p>

//             <div className="mb-10 text-justify">
//               <h3 className="text-lg font-bold uppercase border-b border-gray-200 mb-3">Executive Summary</h3>
//               <p className="text-gray-700 leading-relaxed text-sm">{description}</p>
//             </div>

//             <div className="grid grid-cols-2 gap-12 mb-10">
//               <div>
//                 <h3 className="text-lg font-bold uppercase border-b border-gray-200 mb-4">Real-Time Metrics</h3>
//                 {stats.map((s, i) => (
//                   <div key={i} className="mb-3">
//                     <span className="text-gray-500 text-[10px] uppercase block leading-none">{s.label}</span>
//                     <span className="text-xl font-bold">
//                       {s.baseValue ? `${s.suffix || ''}${calculateGrowth(s.baseValue)}` : s.value}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//               <div>
//                 <h3 className="text-lg font-bold uppercase border-b border-gray-200 mb-4">Initiative Clusters</h3>
//                 {features.map((f, i) => (
//                   <div key={i} className="mb-4">
//                     <span className="font-bold block text-sm italic underline">{f.h}</span>
//                     <p className="text-[11px] text-gray-600 leading-tight mt-1">{f.p}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="mt-32 pt-8 border-t border-gray-100 text-[9px] text-gray-400 text-center uppercase tracking-widest">
//               <p>Generated: {new Date().toLocaleString()} — WCC Global Operations</p>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>{`
//         @media print {
//           @page { size: A4; margin: 1cm; }
//           body { background: white !important; color: black !important; }
//           .print\:hidden { display: none !important; }
//           .print\:block { display: block !important; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProgramTemplate;


















// import React from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';

// interface ProgramProps {
//   title: string;
//   subtitle: string;
//   description: string;
//   features: { h: string; p: string; link: string }[];
//   stats: { label: string; value: string; baseValue?: number; suffix?: string }[];
//   accentColor: string;
// }

// const colorMap: Record<string, string> = {
//   blue: 'bg-blue-600',
//   emerald: 'bg-emerald-600',
//   red: 'bg-red-600',
//   amber: 'bg-amber-600',
// };

// const textMap: Record<string, string> = {
//   blue: 'text-blue-500',
//   emerald: 'text-emerald-500',
//   red: 'text-red-500',
//   amber: 'text-amber-500',
// };

// const calculateGrowth = (baseValue: number) => {
//   const startDate = new Date('2024-01-01');
//   const today = new Date();
//   const months = (today.getFullYear() - startDate.getFullYear()) * 12 + (today.getMonth() - startDate.getMonth());
//   return Math.floor(baseValue * Math.pow(1.02, months)).toLocaleString();
// };

// const ProgramTemplate: React.FC<ProgramProps> = ({ title, subtitle, description, features, stats, accentColor }) => {
//   const navigate = useNavigate();

//   const handlePrint = () => {
//     window.print();
//   };

//   const handleNavigation = (link: string) => {
//     if (link.startsWith('http')) {
//       window.open(link, '_blank', 'noopener,noreferrer');
//     } else {
//       navigate(link);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 text-white selection:bg-yellow-400 selection:text-black">
      
//       {/* --- WEB VIEW (Hidden during print) --- */}
//       <div className="print:hidden">
//         {/* Hero Section */}
//         <div className="h-[70vh] relative flex items-center justify-center overflow-hidden">
//           <div className={`absolute inset-0 opacity-20 blur-[120px] rounded-full ${colorMap[accentColor]}`} />
//           <div className="relative z-10 text-center px-6">
//             <motion.h1 
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none"
//             >
//               {title}
//             </motion.h1>
//             <motion.p 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//               className="mt-4 tracking-[0.6em] text-yellow-400 font-black uppercase text-xs md:text-sm"
//             >
//               {subtitle}
//             </motion.p>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="max-w-7xl mx-auto px-6 -mt-24 relative z-20 grid grid-cols-2 lg:grid-cols-4 gap-6">
//           {stats.map((stat, i) => (
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.1 }}
//               key={i} 
//               className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl"
//             >
//               <h4 className={`text-4xl font-black ${textMap[accentColor]}`}>
//                 {stat.baseValue ? `${stat.suffix || ''}${calculateGrowth(stat.baseValue)}` : stat.value}
//               </h4>
//               <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mt-2 font-bold">{stat.label}</p>
//             </motion.div>
//           ))}
//         </div>

// {/* remember to program it in a way that only logged in users can access download */}
//         {/* Content Section */}
//         <div className="max-w-6xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-20">
//           {/* Mission Column */}
//           <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
//             <h2 className="text-4xl font-black uppercase italic mb-8">Our Mission</h2>
//             <p className="text-slate-400 leading-relaxed text-xl mb-10">{description}</p>
//             <button 
//               onClick={handlePrint}
//               className={`px-12 py-5 rounded-2xl font-black text-white transition-all shadow-xl hover:scale-105 active:scale-95 ${colorMap[accentColor]}`}
//             >
//               DOWNLOAD BRIEFING PDF
//             </button>
//           </motion.div>

//           {/* Initiatives Column */}
//           <div className="space-y-8">
//             <h2 className="text-2xl font-black uppercase tracking-widest text-yellow-400 mb-6 underline decoration-4 underline-offset-8">Key Initiatives</h2>
//             {features.map((item, idx) => (
//               <motion.div 
//                 key={idx} 
//                 whileHover={{ x: 10 }}
//                 onClick={() => handleNavigation(item.link)}
//                 className="border-l-2 border-white/10 pl-8 py-4 cursor-pointer group hover:border-yellow-400 transition-all"
//               >
//                 <h3 className="text-white font-black uppercase text-lg mb-2 italic group-hover:text-yellow-400 flex items-center gap-3">
//                   {item.h} <span className="text-xs opacity-0 group-hover:opacity-100 transition-all">→</span>
//                 </h3>
//                 <p className="text-slate-400 text-sm leading-relaxed font-medium group-hover:text-slate-200">{item.p}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* --- PRINT-ONLY BRIEFING LAYOUT (Hidden on web) --- */}
//       <div className="hidden print:block p-12 text-black bg-white min-h-screen font-serif relative">
//         {/* Watermark */}
//         <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none -rotate-45">
//           <h1 className="text-[120px] font-black">WCC AUTHENTIC</h1>
//         </div>

//         <div className="relative z-10">
//           <div className="border-b-4 border-black pb-4 mb-8 flex justify-between items-end">
//             <div>
//               <h1 className="text-4xl font-black uppercase tracking-tighter">Weren-Care Charity</h1>
//               <p className="text-sm font-bold uppercase tracking-widest text-gray-600">Official Program Briefing</p>
//             </div>
//             <p className="text-xs text-gray-400">Ref: {title.substring(0,3).toUpperCase()}-2026</p>
//           </div>

//           <h2 className="text-3xl font-bold mb-2">{title}</h2>
//           <p className="text-blue-600 font-bold uppercase tracking-widest mb-6">{subtitle}</p>

//           <div className="mb-10 text-justify">
//             <h3 className="text-lg font-bold uppercase border-b border-gray-200 mb-3">Executive Summary</h3>
//             <p className="text-gray-700 leading-relaxed text-sm">{description}</p>
//           </div>

//           <div className="grid grid-cols-2 gap-12 mb-10">
//             <div>
//               <h3 className="text-lg font-bold uppercase border-b border-gray-200 mb-4">Real-Time Metrics</h3>
//               {stats.map((s, i) => (
//                 <div key={i} className="mb-3">
//                   <span className="text-gray-500 text-[10px] uppercase block leading-none">{s.label}</span>
//                   <span className="text-xl font-bold">
//                     {s.baseValue ? `${s.suffix || ''}${calculateGrowth(s.baseValue)}` : s.value}
//                   </span>
//                 </div>
//               ))}
//             </div>
//             <div>
//               <h3 className="text-lg font-bold uppercase border-b border-gray-200 mb-4">Initiative Clusters</h3>
//               {features.map((f, i) => (
//                 <div key={i} className="mb-4">
//                   <span className="font-bold block text-sm italic underline">{f.h}</span>
//                   <p className="text-[11px] text-gray-600 leading-tight mt-1">{f.p}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="mt-32 pt-8 border-t border-gray-100 text-[9px] text-gray-400 text-center uppercase tracking-widest">
//             <p>Generated: {new Date().toLocaleString()} — WCC Global Operations — Confidential Documentary Briefing</p>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @media print {
//           @page { size: A4; margin: 1cm; }
//           body { background: white !important; color: black !important; }
//           .print\:hidden { display: none !important; }
//           .print\:block { display: block !important; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProgramTemplate;




















// import React from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';

// interface ProgramProps {
//   title: string;
//   subtitle: string;
//   description: string;
//   // Added 'link' to the feature interface
//   features: { h: string; p: string; link: string }[];
//   stats: { label: string; value: string; baseValue?: number; suffix?: string }[];
//   accentColor: string;
// }

// const colorMap: Record<string, string> = {
//   blue: 'bg-blue-600',
//   emerald: 'bg-emerald-600',
//   red: 'bg-red-600',
//   amber: 'bg-amber-600',
// };

// const textMap: Record<string, string> = {
//   blue: 'text-blue-500',
//   emerald: 'text-emerald-500',
//   red: 'text-red-500',
//   amber: 'text-amber-500',
// };

// // HELPER: Calculates 2% growth per month since a start date (e.g., Jan 1, 2024)
// const calculateGrowth = (baseValue: number) => {
//   const startDate = new Date('2024-01-01');
//   const today = new Date();
//   const months = (today.getFullYear() - startDate.getFullYear()) * 12 + (today.getMonth() - startDate.getMonth());
//   return Math.floor(baseValue * Math.pow(1.02, months)).toLocaleString();
// };

// const ProgramTemplate: React.FC<ProgramProps> = ({ title, subtitle, description, features, stats, accentColor }) => {
//   const navigate = useNavigate();
//   const handlePrint = () => {
//     window.print();
//   };

//   const handleNavigation = (link: string) => {
//     if (link.startsWith('http')) {
//       window.open(link, '_blank', 'noopener,noreferrer');
//     } else {
//       navigate(link);
//     }
//   };

//   return (
//     <div className="print:hidden min-h-screen bg-slate-950 text-white selection:bg-yellow-400 selection:text-black">
//       {/* Hero Section */}
//       <div className="h-[70vh] relative flex items-center justify-center overflow-hidden">
//         <div className={`absolute inset-0 opacity-20 blur-[120px] rounded-full ${colorMap[accentColor]}`} />
//         <div className="relative z-10 text-center px-6">
//           <motion.h1 
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none"
//           >
//             {title}
//           </motion.h1>
//           <motion.p 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="mt-4 tracking-[0.6em] text-yellow-400 font-black uppercase text-xs md:text-sm"
//           >
//             {subtitle}
//           </motion.p>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="max-w-7xl mx-auto px-6 -mt-24 relative z-20 grid grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, i) => (
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.1 }}
//             key={i} 
//             className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl"
//           >
//             <h4 className={`text-4xl font-black ${textMap[accentColor]}`}>
//               {/* If baseValue exists, calculate growth; else use static value */}
//               {stat.baseValue ? `${stat.suffix || ''}${calculateGrowth(stat.baseValue)}` : stat.value}
//             </h4>
//             <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mt-2 font-bold">{stat.label}</p>
//           </motion.div>
//         ))}
//       </div>

//       {/* Deep Dive Section */}
//       <div className="max-w-6xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-20">
//         <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
//           <h2 className="text-4xl font-black uppercase italic mb-8">Our Mission</h2>
//           <p className="text-slate-400 leading-relaxed text-xl mb-10">{description}</p>
//           <button 
//           onClick={handlePrint}
//           className={`px-12 py-5 rounded-2xl font-black text-white transition-all shadow-xl hover:scale-105 active:scale-95 ${colorMap[accentColor]}`}>
//              DOWNLOAD BRIEFING PDF
//           </button>
//         </motion.div>

//         {/* --- PRINT-ONLY BRIEFING LAYOUT --- */}
//       <div className="hidden print:block p-12 text-black bg-white min-h-screen font-serif">
//         <div className="border-b-4 border-black pb-4 mb-8 flex justify-between items-end">
//           <div>
//             <h1 className="text-4xl font-black uppercase tracking-tighter">WCC VANGUARD</h1>
//             <p className="text-sm font-bold uppercase tracking-widest text-gray-600">Official Program Briefing</p>
//           </div>
//           <p className="text-xs text-gray-400">Date: {new Date().toLocaleDateString()}</p>
//         </div>

//         <h2 className="text-3xl font-bold mb-2">{title}</h2>
//         <p className="text-blue-600 font-bold uppercase tracking-widest mb-6">{subtitle}</p>

//         <div className="mb-10">
//           <h3 className="text-lg font-bold uppercase border-b border-gray-200 mb-3">Executive Summary</h3>
//           <p className="text-gray-700 leading-relaxed">{description}</p>
//         </div>

//         <div className="grid grid-cols-2 gap-8 mb-10">
//           <div>
//             <h3 className="text-lg font-bold uppercase border-b border-gray-200 mb-4">Key Metrics</h3>
//             {stats.map((s, i) => (
//               <div key={i} className="mb-2">
//                 <span className="text-gray-500 text-xs uppercase block">{s.label}</span>
//                 <span className="text-xl font-bold">{s.value}</span>
//               </div>
//             ))}
//           </div>
//           <div>
//             <h3 className="text-lg font-bold uppercase border-b border-gray-200 mb-4">Strategic Initiatives</h3>
//             {features.map((f, i) => (
//               <div key={i} className="mb-4">
//                 <span className="font-bold block text-sm italic">{f.h}</span>
//                 <p className="text-xs text-gray-600 leading-tight">{f.p}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="mt-20 pt-8 border-t border-gray-100 text-[10px] text-gray-400 text-center">
//           <p>WCC Global Operations — Confidential Documentary Briefing — All Rights Reserved 2026</p>
//         </div>
//       </div>

//       {/* --- GLOBAL PRINT STYLES --- */}
//       <style>{`
//         @media print {
//           @page { margin: 0; }
//           body { background: white; }
//           .no-print { display: none; }
//         }
//       `}</style>
//     </div>

//         <div className="space-y-8">
//           <h2 className="text-2xl font-black uppercase tracking-widest text-yellow-400 mb-6 underline decoration-4 underline-offset-8">Key Initiatives</h2>
//           {features.map((item, idx) => (
//             <motion.div 
//               key={idx} 
//               whileHover={{ x: 10 }}
//               onClick={() => handleNavigation(item.link)}
//               className="border-l-2 border-white/10 pl-8 py-4 cursor-pointer group hover:border-yellow-400 transition-all"
//             >
//               <h3 className="text-white font-black uppercase text-lg mb-2 italic group-hover:text-yellow-400 flex items-center gap-3">
//                 {item.h} <span className="text-xs opacity-0 group-hover:opacity-100 transition-all">→</span>
//               </h3>
//               <p className="text-slate-400 text-sm leading-relaxed font-medium group-hover:text-slate-200">{item.p}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//   );
// };

// export default ProgramTemplate;





// import React from 'react';
// import { motion } from 'framer-motion';

// interface ProgramProps {
//   title: string;
//   subtitle: string;
//   description: string;
//   features: { h: string; p: string }[];
//   stats: { label: string; value: string }[];
//   accentColor: string;
// }

// const colorMap: Record<string, string> = {
//   blue: 'bg-blue-600',
//   emerald: 'bg-emerald-600',
//   red: 'bg-red-600',
//   amber: 'bg-amber-600',
// };

// const textMap: Record<string, string> = {
//   blue: 'text-blue-500',
//   emerald: 'text-emerald-500',
//   red: 'text-red-500',
//   amber: 'text-amber-500',
// };

// const ProgramTemplate: React.FC<ProgramProps> = ({ title, subtitle, description, features, stats, accentColor }) => {
//   return (
//     <div className="min-h-screen bg-slate-950 text-white selection:bg-yellow-400 selection:text-black">
//       {/* Hero Section */}
//       <div className="h-[70vh] relative flex items-center justify-center overflow-hidden">
//         <div className={`absolute inset-0 opacity-20 blur-[120px] rounded-full ${colorMap[accentColor]}`} />
//         <div className="relative z-10 text-center px-6">
//           <motion.h1 
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="text-6xl md:text-6xl font-black uppercase italic tracking-tighter leading-none"
//           >
//             {title}
//           </motion.h1>
//           <motion.p 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="mt-1 tracking-[0.6em] text-yellow-400 font-black uppercase text-xs md:text-sm"
//           >
//             {subtitle}
//           </motion.p>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="max-w-7xl mx-auto px-6 -mt-24 relative z-20 grid grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, i) => (
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.1 }}
//             key={i} 
//             className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl"
//           >
//             <h4 className={`text-4xl font-black ${textMap[accentColor]}`}>{stat.value}</h4>
//             <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mt-2 font-bold">{stat.label}</p>
//           </motion.div>
//         ))}
//       </div>

//       {/* Deep Dive Section */}
//       <div className="max-w-6xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-20">
//         <div>
//           <h2 className="text-4xl font-black uppercase italic mb-8">Our Mission</h2>
//           <p className="text-slate-400 leading-relaxed text-xl mb-10">{description}</p>
//           <button className={`px-12 py-5 rounded-2xl font-black text-white transition-all shadow-xl hover:scale-105 ${colorMap[accentColor]}`}>
//              DOWNLOAD BRIEFING PDF
//           </button>
//         </div>

//         <div className="space-y-8">
//           <h2 className="text-2xl font-black uppercase tracking-widest text-yellow-400 mb-6 underline decoration-4 underline-offset-8">Key Initiatives</h2>
//           {features.map((item, idx) => (
//             <div key={idx} className="border-l-2 border-white/10 pl-8 py-2">
//               <h3 className="text-white font-black uppercase text-lg mb-2 italic">{item.h}</h3>
//               <p className="text-slate-400 text-sm leading-relaxed font-medium">{item.p}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProgramTemplate;












// import React from 'react';
// import { motion } from 'framer-motion';

// interface ProgramProps {
//   title: string;
//   subtitle: string;
//   description: string;
//   stats: { label: string; value: string }[];
//   accentColor: string;
// }

// const ProgramTemplate: React.FC<ProgramProps> = ({ title, subtitle, description, stats, accentColor }) => {
//   return (
//     <div className="min-h-screen bg-slate-950 text-white">
//       {/* Page Hero */}
//       <div className="h-[60vh] relative flex items-center justify-center overflow-hidden">
//         <div className={`absolute inset-0 opacity-30 bg-${accentColor}-600 blur-3xl`} />
//         <div className="relative z-10 text-center px-4">
//           <motion.h1 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-5xl md:text-8xl font-black uppercase italic"
//           >
//             {title}
//           </motion.h1>
//           <p className="mt-4 tracking-[0.5em] text-yellow-400 font-bold uppercase">{subtitle}</p>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20 grid grid-cols-2 md:grid-cols-4 gap-4">
//         {stats.map((stat, i) => (
//           <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center">
//             <h4 className="text-3xl font-black text-blue-500">{stat.value}</h4>
//             <p className="text-xs uppercase tracking-widest text-slate-400 mt-2">{stat.label}</p>
//           </div>
//         ))}
//       </div>

//       {/* Content Section */}
//       <div className="max-w-4xl mx-auto px-6 py-24 text-center">
//         <h2 className="text-3xl font-bold mb-8">Our Impact & Mission</h2>
//         <p className="text-slate-400 leading-relaxed text-lg">
//           {description}
//         </p>
        
//         <button className={`mt-12 px-10 py-4 rounded-full font-black bg-blue-600 hover:bg-blue-500 transition-all`}>
//            GET INVOLVED
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProgramTemplate;