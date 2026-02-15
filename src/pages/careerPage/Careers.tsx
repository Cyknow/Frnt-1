import 
// React, 
{ useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Vasertile from "../charityPage/Vasertile";
import bgVideo from "../../assets/VID-20251211-WA0026.mp4";

const roles = [
  { title: "Frontend Developer", desc: "React, UI/UX, performance-focused." },
  { title: "Backend Developer", desc: "Node.js, APIs, scalable systems." },
  { title: "Product Manager", desc: "Strategy, leadership, execution." },
];

export default function CareersPage() {
  const [timeTheme, setTimeTheme] = useState({
    primary: "#001F5C",
    accent: "#FFD700",
    label: "Daylight"
  });

  // Generate 40 stars once
  const [stars] = useState(() => 
    Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 3 + 2,
    }))
  );

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 6) {
      setTimeTheme({
        primary: "#0a001a", // Deep Galactic Purple
        accent: "#00f2ff",  // Cyber Cyan
        label: "Night Ops"
      });
    }
  }, []);

  const isNight = timeTheme.label === "Night Ops";

  return (
    <div className="relative min-h-screen w-full overflow-hidden transition-colors duration-1000" style={{ backgroundColor: timeTheme.primary }}>
      
      {/* 1. BACKGROUND LAYER: VIDEO */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay loop muted playsInline
          className="h-full w-full object-cover opacity-20 grayscale"
        >
          <source 
          src={bgVideo}
          // src="https://assets.mixkit.co/videos/preview/mixkit-business-people-working-in-the-office-1183-large.mp4" 
          type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
      </div>

      {/* 2. CONDITIONAL STAR LAYER (Only for Night Ops) */}
      <AnimatePresence>
        {isNight && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-1 pointer-events-none"
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
                  boxShadow: `0 0 8px ${timeTheme.accent}`,
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: star.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. CONTENT LAYER */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-block mb-6 px-4 py-1 rounded-full border text-[10px] font-black tracking-widest uppercase backdrop-blur-md" 
            style={{ color: timeTheme.accent, borderColor: `${timeTheme.accent}44` }}
          >
            {isNight ? "✨ Galactic Recruitment Active" : "☀️ Standard Operations"}
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
            JOIN THE <span style={{ color: timeTheme.accent }}>LEADING-EDGE</span>
          </h1>
        </div>

        {/* ROLES GRID */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {roles.map((role) => (
            <motion.div
              key={role.title}
              className="group relative p-[1px] rounded-[2rem] overflow-hidden"
            >
              {/* Spinning Border Light */}
              <motion.div
                className="absolute inset-0 z-0"
                style={{
                  background: `conic-gradient(from 0deg, transparent 60%, ${timeTheme.accent} 100%)`,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />

              <div className="relative z-10 bg-black/80 backdrop-blur-3xl p-8 rounded-[calc(2rem-1px)] h-full border border-white/5">
                <h3 className="text-2xl font-bold text-white mb-2">{role.title}</h3>
                <div className="w-10 h-1 mb-6 rounded-full" style={{ backgroundColor: timeTheme.accent }} />
                <p className="text-gray-400 mb-8 text-sm leading-relaxed">{role.desc}</p>
                
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: `0 0 25px ${timeTheme.accent}44` }}
                    className="w-full py-4 font-black rounded-2xl uppercase tracking-widest text-[10px] transition-all"
                    style={{ backgroundColor: timeTheme.accent, color: "#000" }}
                  >
                    Initiate Application
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* APPLICATION FORM */}
        <motion.div 
          className="max-w-2xl mx-auto bg-white/5 border border-white/10 backdrop-blur-md rounded-[3rem] p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold mb-2 text-white">Direct Application</h2>
          <p className="text-gray-400 mb-8 text-sm">Our recruitment AI is active. Please upload your credentials.</p>
          
          <form className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-white outline-none transition-all" />
            <input type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-white outline-none transition-all" />
            
            <div 
                className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-white/30 transition-colors cursor-pointer"
            >
              <span className="text-gray-500 text-xs uppercase font-bold tracking-widest">Drop Resume Here</span>
            </div>

            <button
              className="w-full py-4 text-white font-black rounded-xl uppercase tracking-widest text-sm border border-white/20 hover:bg-white hover:text-black transition-all"
            >
              Submit to Command
            </button>
          </form>
        </motion.div>

        {/* BOTTOM FORM SECTION */}
        {/* <motion.div 
          className="max-w-3xl mx-auto bg-white/5 border border-white/10 backdrop-blur-xl rounded-[3rem] p-10 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Unlisted Specializations</h2>
          <p className="text-gray-400 mb-10 text-sm">If your skill set exists outside our current sectors, transmit your data directly to our command hub.</p>
          
          <div className="flex flex-col md:flex-row gap-4">
             <button className="flex-1 py-4 border border-white/10 rounded-2xl text-white font-bold hover:bg-white hover:text-black transition-all">
               UPLOAD DATA (PDF)
             </button>
             <button className="flex-1 py-4 rounded-2xl font-bold transition-all shadow-lg" style={{ backgroundColor: timeTheme.accent, color: "#000" }}>
               SEND TRANSMISSION
             </button>
          </div>
        </motion.div> */}
      </div>

      <Vasertile />
    </div>
  );
}







// // CareersPage.jsx
// import { motion } from "framer-motion";
// import "./Carreers.css";
// import Vasertile from "../charityPage/Vasertile";

// export default function CareersPage() {
//   return (
//     <div className="careers-page">
//       <motion.div
//         className="animated-bg"
//         animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
//         transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//       />

//       <div className="content-wrapper">
//         <motion.h1
//           className="heading"
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           Build Your Career With Us
//         </motion.h1>

//         <motion.p
//           className="subtext"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//         >
//           Join a team driven by innovation, excellence, and impact.
//         </motion.p>

//         <div className="cards-grid">
//           <a href="/signup">
//           {roles.map((role, index) => (
//             <motion.div
//               key={role.title}
//               className="career-card"
//               whileHover={{ scale: 1.05 }}
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.2 }}
//             >
//               <h3>{role.title}</h3>
//               <p>{role.desc}</p>
//               <button>Apply Now</button>
//             </motion.div>
//           ))}
//           </a>
//         </div>
//       </div>
//       <Vasertile />
//     </div>
//   );
// }

// const roles = [
//   { title: "Frontend Developer", desc: "React, UI/UX, performance-focused." },
//   { title: "Backend Developer", desc: "Node.js, APIs, scalable systems." },
//   { title: "Product Manager", desc: "Strategy, leadership, execution." },
// ];




// /*import React from "react";
// import { motion } from "framer-motion";
// import theme from '../../components/themes/Theme';
// import type { CSSProperties } from "react";


// // const colors = {
// //   primary: "#001F5C", // Deep Blue
// //   accent: "#FFD700", // Gold
// //   background: "#F0F8FF", // Sparkling White
// // };

// export default function CareersPage() {
//   return (
//     <div style={styles.page}>

//       {/* Animated Background*
//       <motion.div
//         style={styles.animatedBg}
//         animate={{
//           backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
//         }}
//         transition={{
//           duration: 20,
//           repeat: Infinity,
//           ease: "linear",
//         }}
//       />

//       {/* Content *
//       <div style={{styles.contentWrapper}}>
//         <motion.h1
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           style={styles.heading}
//         >
//           Build Your Career With Us
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//           style={styles.subText}
//         >
//           Join a team driven by innovation, excellence, and impact.
//         </motion.p>

//         <div style={styles.cardsGrid}>
//           {roles.map((role, index) => (
//             <motion.div
//               key={role.title}
//               style={styles.card}
//               whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.2 }}
//             >
//               <h3 style={styles.cardTitle}>{role.title}</h3>
//               <p style={styles.cardDesc}>{role.desc}</p>
//               <button style={styles.button}>Apply Now</button>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// const roles = [
//   { title: "Frontend Developer", desc: "React, UI/UX, performance-focused." },
//   { title: "Backend Developer", desc: "Node.js, APIs, scalable systems." },
//   { title: "Product Manager", desc: "Strategy, leadership, execution." },
// ];

// const styles = {
//   page: {
//     position: "relative",
//     minHeight: "100vh",
//     overflow: "hidden",
//     background: theme.white,
//     fontFamily: "Inter, sans-serif",
//   },
//   animatedBg: {
//     position: "absolute",
//     inset: 0,
//     background: `linear-gradient(120deg, ${theme.blue}, ${theme.gold}, ${theme.white})`,
//     backgroundSize: "400% 400%",
//     zIndex: 0,
//     opacity: 0.15,
//   },
//   contentWrapper: {
//     position: "relative",
//     zIndex: 1,
//     padding: "5rem 2rem",
//     maxWidth: "1200px",
//     margin: "0 auto",
//     textAlign: "center",
//   },
//   heading: {
//     fontSize: "3rem",
//     color: theme.blue,
//     marginBottom: "1rem",
//   },
//   subText: {
//     fontSize: "1.2rem",
//     color: "#333",
//     marginBottom: "4rem",
//   },
//   cardsGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
//     gap: "2rem",
//   },
//   card: {
//     background: "#ffffff",
//     borderRadius: "1.5rem",
//     padding: "2.5rem",
//     textAlign: "left",
//     transition: "all 0.3s ease",
//   },
//   cardTitle: {
//     color: theme.blue,
//     fontSize: "1.4rem",
//     marginBottom: "0.5rem",
//   },
//   cardDesc: {
//     color: "#555",
//     marginBottom: "1.5rem",
//   },
//   button: {
//     background: theme.gold,
//     border: "none",
//     padding: "0.7rem 1.5rem",
//     borderRadius: "999px",
//     cursor: "pointer",
//     fontWeight: "600",
//     color: theme.blue,
//   },
// };
// */




// /*import React from 'react';
// import theme from '../../components/themes/Theme';

// export default function Careers(){
//   return (
//     <div className="container mx-auto py-12">
//       <h2 className="text-2xl font-bold text-blue-700">Jobs & Internships</h2>
//       <p className="mt-4 text-gray-700">We offer internship placements and permanent roles across programs, admin and field operations. Upload your CV and cover letter below.</p>
//       <form className="mt-6 space-y-4 bg-white rounded p-6 shadow">
//         <label className="block">
//           <div className="text-sm">Full name</div>
//           <input className="mt-1 w-full border rounded px-3 py-2" />
//         </label>
//         <label className="block">
//           <div className="text-sm">Email</div>
//           <input type="email" className="mt-1 w-full border rounded px-3 py-2" />
//         </label>
//         <label className="block">
//           <div className="text-sm">Position applying for</div>
//           <input className="mt-1 w-full border rounded px-3 py-2" />
//         </label>
//         <label className="block">
//           <div className="text-sm">Upload CV</div>
//           <input type="file" className="mt-1" />
//         </label>
//         <button className="px-4 py-2 rounded" style={{background: theme.gold}}> Submit Application</button>
//       </form>
//     </div>
//   )
// }
// */