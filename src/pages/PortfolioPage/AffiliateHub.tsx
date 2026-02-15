import React, { useState, 
    // useEffect 
} from 'react';
import { motion, 
    // AnimatePresence 
} from 'framer-motion';

const COLORS = {
  primary: '#001F5C',
  accent: '#FFD700',
  space: '#000814',
  cardBg: 'rgba(255, 255, 255, 0.03)',
};

// 1. ADD YOUR LINKS HERE
const AFFILIATES = [
  {
    id: 1,
    title: "Bluehost Hosting",
    description: "Start your website with the most reliable hosting. Get a free domain for the first year.",
    category: "Development",
    link: "https://your-affiliate-link.com",
    badge: "Special Offer",
    icon: "🌐"
  },
  {
    id: 2,
    title: "TradingView",
    description: "The best charting platform for traders. Join 50M+ users and track the markets.",
    category: "Finance",
    link: "https://your-affiliate-link.com",
    badge: "Free Trial",
    icon: "📈"
  },
  {
    id: 3,
    title: "Skillshare",
    description: "Master React, UX Design, and Data Analysis with thousands of online classes.",
    category: "Learning",
    link: "https://your-affiliate-link.com",
    badge: "1 Month Free",
    icon: "🎓"
  },
  // Add more as needed
];

export const AffiliatePage: React.FC = () => {
  const [stars] = useState(() =>
    Array.from({ length: 60 }).map((_, i) => ({
      id: i, size: Math.random() * 3 + 1, x: Math.random() * 100, y: Math.random() * 100,
      moveX: (Math.random() - 0.5) * 50, moveY: (Math.random() - 0.5) * 50,
    }))
  );

  return (
    <div className="min-h-screen relative overflow-hidden py-24 px-6" style={{ backgroundColor: COLORS.space }}>
      
      {/* BACKGROUND: STAR FIELD */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {stars.map((star) => (
          <motion.div key={star.id} className="absolute rounded-full bg-white opacity-40"
            style={{ width: star.size, height: star.size, left: `${star.x}%`, top: `${star.y}%` }}
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1], x: [0, star.moveX], y: [0, star.moveY] }}
            transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* HEADER */}
        <header className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 rounded-full border border-yellow-400/30 text-yellow-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6 bg-yellow-400/5"
          >
            Verified Recommendations
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            The <span style={{ color: COLORS.accent }}>Resource</span> Launchpad
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            A curated list of tools and platforms I personally use for development, 
            industrial projects, and productivity. Some links include exclusive discounts.
          </p>
        </header>

        {/* AFFILIATE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AFFILIATES.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-3xl overflow-hidden transition-all"
              style={{ backgroundColor: COLORS.cardBg }}
            >
              {/* HOVER GLOW */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="text-4xl">{item.icon}</div>
                  <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest px-3 py-1 bg-yellow-400/10 rounded-full">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white mb-3 group-hover:text-yellow-400 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  {item.description}
                </p>

                <a 
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full py-4 rounded-xl bg-white text-blue-900 font-black uppercase tracking-tighter text-xs group-hover:bg-yellow-400 transition-colors"
                >
                  Register & Claim Offer
                  <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* DISCLAIMER FOOTER */}
        <footer className="mt-32 text-center border-t border-white/10 pt-10">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest max-w-xl mx-auto leading-loose">
            <span className="text-yellow-400/50 mr-2">Affiliate Disclosure:</span> 
            I may receive a small commission for purchases made through these links at no extra cost to you. 
            I only recommend platforms that meet my standards for excellence.
          </p>
        </footer>
      </div>
    </div>
  );
};












// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const COLORS = {
//   primary: '#001F5C',
//   accent: '#FFD700', // Gold
//   space: '#000814',
//   success: '#00C851'
// };

// const OFFERS = [
//   {
//     id: 1,
//     title: "Best Hosting for React",
//     provider: "Bluehost / Vercel",
//     desc: "Start your portfolio with 60% off hosting and a free domain.",
//     category: "Tech",
//     link: "YOUR_AFFILIATE_LINK_HERE",
//     badge: "Limited Time",
//     hot: true
//   },
//   {
//     id: 2,
//     title: "Safety Gear Masterclass",
//     provider: "Industrial Safety Pro",
//     desc: "The exact HSE Level 1-3 certification I used for NLNG projects.",
//     category: "Industrial",
//     link: "YOUR_AFFILIATE_LINK_HERE",
//     badge: "Career Growth"
//   },
//   {
//     id: 3,
//     title: "Framer Motion Templates",
//     provider: "UI Store",
//     desc: "Premium UI components for high-fidelity React applications.",
//     category: "Design",
//     link: "YOUR_AFFILIATE_LINK_HERE",
//     badge: "Expert Pick"
//   },
//   // Add more as needed
// ];

// export const AffiliateHub: React.FC = () => {
//   const [filter, setFilter] = useState('All');
//   const categories = ['All', 'Tech', 'Industrial', 'Design'];

//   const filteredOffers = OFFERS.filter(o => filter === 'All' || o.category === filter);

//   return (
//     <div className="min-h-screen pt-20 pb-32 px-6" style={{ backgroundColor: COLORS.space }}>
      
//       {/* HEADER SECTION */}
//       <div className="max-w-4xl mx-auto text-center mb-16">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
//           <span className="text-yellow-400 font-black text-xs uppercase tracking-[0.5em]">The Vault</span>
//           <h1 className="text-5xl md:text-7xl font-black text-white mt-4 mb-6 tracking-tighter">
//             Recommended <span style={{ color: COLORS.accent }}>Tools</span>.
//           </h1>
//           <p className="text-slate-400 text-lg max-w-xl mx-auto">
//             A curated list of resources, software, and gear I personally use in tech and industrial operations. 
//             <span className="block mt-2 text-xs opacity-50 italic">*Some links may provide me a small commission at no cost to you.</span>
//           </p>
//         </motion.div>

//         {/* CATEGORY TABS */}
//         <div className="flex flex-wrap justify-center gap-3 mt-10">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setFilter(cat)}
//               className={`px-8 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
//                 filter === cat ? 'bg-yellow-400 text-blue-900 shadow-[0_0_20px_#FFD70066]' : 'border border-white/10 text-white'
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* OFFERS GRID */}
//       <div className="max-w-4xl mx-auto grid grid-cols-1 gap-6">
//         <AnimatePresence mode="popLayout">
//           {filteredOffers.map((offer) => (
//             <motion.a
//               key={offer.id}
//               layout
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               href={offer.link}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="group relative p-8 rounded-[2rem] bg-white/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white/10 transition-all hover:border-yellow-400/50"
//             >
//               {offer.hot && (
//                 <div className="absolute -top-3 left-8 px-4 py-1 bg-red-600 text-white text-[10px] font-black rounded-full uppercase tracking-tighter animate-pulse">
//                   🔥 Trending
//                 </div>
//               )}

//               <div className="text-center md:text-left">
//                 <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
//                   <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest">{offer.provider}</span>
//                   <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[9px] font-black uppercase">{offer.badge}</span>
//                 </div>
//                 <h3 className="text-2xl font-black text-white group-hover:text-yellow-400 transition-colors">{offer.title}</h3>
//                 <p className="text-slate-400 text-sm mt-2 max-w-md">{offer.desc}</p>
//               </div>

//               <motion.div 
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-10 py-4 rounded-xl bg-yellow-400 text-blue-900 font-black uppercase tracking-widest text-xs whitespace-nowrap shadow-xl group-hover:shadow-yellow-400/20"
//               >
//                 Get Started &rarr;
//               </motion.div>
//             </motion.a>
//           ))}
//         </AnimatePresence>
//       </div>

//       {/* CTA FOOTER */}
//       <div className="mt-32 text-center">
//         <p className="text-white/20 text-xs font-black uppercase tracking-[0.3em]">Updates weekly with new opportunities</p>
//       </div>
//     </div>
//   );
// };