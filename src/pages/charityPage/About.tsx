import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
  // Generate 30 random stars with varying sizes and positions
  const stars = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1, // Sizes between 1px and 4px
    x: Math.random() * 100,      // Percentage position
    y: Math.random() * 100,
    duration: Math.random() * 3 + 2, // Twinkle speed
  }));

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative py-12 px-4 overflow-hidden">
      
      {/* THE SPACE CONTAINER */}
      <motion.div
        className="relative bg-[#000814] max-w-4xl mx-auto rounded-[3rem] p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/5 overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.01 }}
      >
        
        {/* --- MOVING SHINY STARS LAYER --- */}
        <div className="absolute inset-0 pointer-events-none">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                width: star.size,
                height: star.size,
                left: `${star.x}%`,
                top: `${star.y}%`,
                boxShadow: "0 0 10px white",
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
                y: [0, -20, 0], // Subtle upward drift
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* CONTENT (Needs high z-index to stay above stars) */}
        <div className="relative z-10">
          <motion.h2
            className="text-4xl md:text-5xl font-black text-yellow-400 text-center mb-8 tracking-tighter"
          >
            WHO WE ARE
          </motion.h2>

          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="space-y-8">
            
            <section>
              <p className="text-blue-50 leading-relaxed text-lg md:text-xl text-center font-medium">
                We are a non-profit organisation committed to empowering individuals and communities 
                through targeted grants, education, sustainable farming initiatives and humanitarian aid.
              </p>
            </section>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {/* Mission */}
              <motion.div 
                whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.08)" }}
                className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md"
              >
                <h3 className="text-xl font-black text-yellow-400/90 mb-3 tracking-tight">OUR MISSION</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  To extend help to people in need — across gender, age, religion, nationality, ethnicity and region.
                </p>
              </motion.div>

              {/* Vision */}
              <motion.div 
                whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.08)" }}
                className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md"
              >
                <h3 className="text-xl font-black text-yellow-400/90 mb-3 tracking-tight">OUR VISION</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  A world where resilient communities have the resources and skills to thrive, not just survive.
                </p>
              </motion.div>
            </div>

            {/* Core Values */}
            <section className="text-center">
              <h3 className="text-xs font-black text-white/40 uppercase tracking-[0.3em] mb-6">Fundamental Values</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {['Equity', 'Transparency', 'Partnership', 'Sustainability'].map((value) => (
                  <span key={value} className="bg-white/5 px-5 py-2 rounded-full border border-white/10 text-white text-xs font-bold hover:bg-yellow-400 hover:text-blue-900 transition-colors cursor-default">
                    {value}
                  </span>
                ))}
              </div>
            </section>

            {/* Call to Action */}
            <div className="mt-12 text-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/partnerp"
                  className="inline-block px-12 py-4 rounded-full font-black text-blue-900 bg-yellow-400 shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] uppercase tracking-widest text-sm"
                >
                  Join The Movement
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;












// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import type { Variants } from "framer-motion";
// import theme from "../../components/themes/Theme";
// import WhatWeDo from "./WhatWeDo";

// const itemVariants: Variants = {
//   hidden: { opacity: 0, y: 24 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
//   },
// };


// export default function About() {
//   return (
//     // STEP 1: Put the animated BG on the wrapper
//     <div>
      
//       {/* STEP 2: Use glass-dark to ensure text visibility */}
//       <motion.div
//         className="bg-gray-900 glass-dark max-w-4xl mx-auto rounded-3xl p-8 md:p-12 shadow-2xl mt-8 mb-3"
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         whileHover={{ scale: 1.03 }}
//       >
//         <motion.h2
//           className="text-4xl md:text-5xl font-bold text-yellow-400 text-center mb-8"
//         >
//           Who We Are
//         </motion.h2>

//         <motion.div variants={itemVariants} initial="hidden" animate="visible" className="space-y-8">
          
//           <section>
//             <p className="text-white /90 leading-relaxed text-lg md:text-xl text-center">
//               We are a non-profit organisation committed to empowering individuals and communities 
//               through targeted grants, education, sustainable farming initiatives and humanitarian aid.
//             </p>
//           </section>

//           <div className="grid md:grid-cols-2 gap-8 mt-12">
//             {/* Mission */}
//             <motion.div className="bg-white/10 p-6 rounded-2xl border border-white/10">
//               <h3 className="text-xl font-bold text-white/80 mb-3">Our Mission</h3>
//               <p className="text-white/80">
//                 To extend help to people in need — across gender, age, religion, nationality, ethnicity and region.
//               </p>
//             </motion.div>

//             {/* Vision */}
//             <motion.div className="bg-white/10 p-6 rounded-2xl border border-white/10">
//               <h3 className="text-xl font-bold text-white/80 mb-3">Our Vision</h3>
//               <p className="text-white/80">
//                 A world where resilient communities have the resources and skills to thrive, not just survive.
//               </p>
//             </motion.div>
//           </div>

//           {/* Core Values */}
//           <section className="text-center">
//             <h3 className="text-2xl font-semibold text-white mb-4">Core Values</h3>
//             <ul className="flex flex-wrap justify-center gap-4 text-white/90">
//               <li className="bg-white/5 px-4 py-2 rounded-full border border-white/10">Equity</li>
//               <li className="bg-white/5 px-4 py-2 rounded-full border border-white/10">Transparency</li>
//               <li className="bg-white/5 px-4 py-2 rounded-full border border-white/10">Partnership</li>
//               <li className="bg-white/5 px-4 py-2 rounded-full border border-white/10">Sustainability</li>
//             </ul>
//           </section>

//           {/* Call to Action */}
//           <motion.div className="mt-12 text-center" variants={itemVariants}>
//             <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
//             <Link
//               to="/partnerp"
//               className="inline-block px-10 py-4 rounded-full font-bold text-blue-900 transition-transform hover:scale-105"
//               style={{ background: theme.gold }}
//             >
//               Partner With Us
//             </Link>
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       </motion.div>
//       {/* <WhatWeDo/> */}
//     </div>
//   );
// }