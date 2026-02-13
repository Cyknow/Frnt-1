import React from 'react';
import { motion } from 'framer-motion';

interface ProgramProps {
  title: string;
  subtitle: string;
  description: string;
  features: { h: string; p: string }[];
  stats: { label: string; value: string }[];
  accentColor: string;
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

const ProgramTemplate: React.FC<ProgramProps> = ({ title, subtitle, description, features, stats, accentColor }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-yellow-400 selection:text-black">
      {/* Hero Section */}
      <div className="h-[70vh] relative flex items-center justify-center overflow-hidden">
        <div className={`absolute inset-0 opacity-20 blur-[120px] rounded-full ${colorMap[accentColor]}`} />
        <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none"
          >
            {title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-1 tracking-[0.6em] text-yellow-400 font-black uppercase text-xs md:text-sm"
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
            <h4 className={`text-4xl font-black ${textMap[accentColor]}`}>{stat.value}</h4>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mt-2 font-bold">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Deep Dive Section */}
      <div className="max-w-6xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-20">
        <div>
          <h2 className="text-4xl font-black uppercase italic mb-8">Our Mission</h2>
          <p className="text-slate-400 leading-relaxed text-xl mb-10">{description}</p>
          <button className={`px-12 py-5 rounded-2xl font-black text-white transition-all shadow-xl hover:scale-105 ${colorMap[accentColor]}`}>
             DOWNLOAD BRIEFING PDF
          </button>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-black uppercase tracking-widest text-yellow-400 mb-6 underline decoration-4 underline-offset-8">Key Initiatives</h2>
          {features.map((item, idx) => (
            <div key={idx} className="border-l-2 border-white/10 pl-8 py-2">
              <h3 className="text-white font-black uppercase text-lg mb-2 italic">{item.h}</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">{item.p}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgramTemplate;












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