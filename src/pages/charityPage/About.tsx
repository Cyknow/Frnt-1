
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import theme from "../../components/themes/Theme";
import WhatWeDo from "./WhatWeDo";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function About() {
  return (
    // STEP 1: Put the animated BG on the wrapper
    <div>
      
      {/* STEP 2: Use glass-dark to ensure text visibility */}
      <motion.div
        className="bg-gray-900 glass-dark max-w-4xl mx-auto rounded-3xl p-8 md:p-12 shadow-2xl mt-2"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.03 }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-yellow-400 text-center mb-8"
        >
          Who We Are
        </motion.h2>

        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="space-y-8">
          
          <section>
            <p className="text-white /90 leading-relaxed text-lg md:text-xl text-center">
              We are a non-profit organisation committed to empowering individuals and communities 
              through targeted grants, education, sustainable farming initiatives and humanitarian aid.
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Mission */}
            <motion.div className="bg-white/10 p-6 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold text-white/80 mb-3">Our Mission</h3>
              <p className="text-white/80">
                To extend help to people in need — across gender, age, religion, nationality, ethnicity and region.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div className="bg-white/10 p-6 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold text-white/80 mb-3">Our Vision</h3>
              <p className="text-white/80">
                A world where resilient communities have the resources and skills to thrive, not just survive.
              </p>
            </motion.div>
          </div>

          {/* Core Values */}
          <section className="text-center">
            <h3 className="text-2xl font-semibold text-white mb-4">Core Values</h3>
            <ul className="flex flex-wrap justify-center gap-4 text-white/90">
              <li className="bg-white/5 px-4 py-2 rounded-full border border-white/10">Equity</li>
              <li className="bg-white/5 px-4 py-2 rounded-full border border-white/10">Transparency</li>
              <li className="bg-white/5 px-4 py-2 rounded-full border border-white/10">Partnership</li>
              <li className="bg-white/5 px-4 py-2 rounded-full border border-white/10">Sustainability</li>
            </ul>
          </section>

          {/* Call to Action */}
          <motion.div className="mt-12 text-center" variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/partnerp"
              className="inline-block px-10 py-4 rounded-full font-bold text-blue-900 transition-transform hover:scale-105"
              style={{ background: theme.gold }}
            >
              Partner With Us
            </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
      <WhatWeDo/>
    </div>
  );
}