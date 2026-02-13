// WhatWeDo.jsx
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { 
  // Link, 
  useNavigate } from "react-router-dom";
import theme from "../../components/themes/Theme";
import type { Program } from "../../components/types/Program";


const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // typed easeOut
    },
  },
};

export default function WhatWeDo() {
  const navigate = useNavigate();

  const handleRedirect = (program: Program) => {
    if (program.external) {
      window.open(program.link, "_blank", "noopener,noreferrer");
    } else {
      navigate(program.link);
    }
  };

  return (
    <motion.div
      className="container mx-auto py-16 px-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-3xl font-bold text-blue-700 text-center"
        variants={itemVariants}
      >
        What We Do
      </motion.h2>

      <motion.section
        className="mt-8 bg-white rounded-2xl p-8 shadow-lg"
        variants={itemVariants}
        >
        <motion.p
          className="text-gray-700 leading-relaxed"
          variants={itemVariants}
          >
          We design programs that tackle immediate needs and build long-term
          resilience. Rooted in community partnership, our work spans four core
          program areas.
        </motion.p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {programs.map((program) => (
            <motion.div
              key={program.title}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -6 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleRedirect(program)}
              className="p-6 rounded-xl border cursor-pointer hover:shadow-xl transition"
              >
              <h3 className="font-semibold text-lg text-blue-800">
                {program.title}
              </h3>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                {program.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* FINAL CTA */}
        <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
         whileHover={{ scale: 1.03 }}
        className="mt-4 py-20 text-center bg-gray-900 relative  p-6 rounded-full border cursor-pointer hover:shadow-xl transition-transform">
          <motion.h2
            // variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, y: -6 }}
            className="text-4xl font-bold text-white"
            >
              Help Us Create Lasting Impact
          </motion.h2>
            <p className="mt-4 text-slate-300">
              Every contribution fuels opportunity, dignity, and resilience.
            </p>

          <motion.div className="mt-10 text-center" variants={itemVariants}>
            <motion.button
            onClick={() => navigate("/donate")}
            className="inline-block px-8 py-3 rounded-full font-semibold text-blue-900"
            style={{ background: theme.gold }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            >
            Support Our Mission
            </motion.button>
          </motion.div>
                {/* <Link
                  to="/donate"
                  className="inline-block mt-8 px-10 py-4 rounded-full font-semibold text-slate-900 hover:scale-105 transition-transform"
                  style={{ background: theme.gold }}
                >
                  Support Our Mission
                </Link> */}
        </motion.div>

        {/* <motion.div className="mt-10 text-center" variants={itemVariants}>
          <motion.button
            onClick={() => navigate("/donate")}
            className="inline-block px-8 py-3 rounded-full font-semibold text-blue-900"
            style={{ background: theme.gold }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            Support Our Mission
          </motion.button>
        </motion.div> */}
      </motion.section>
    </motion.div>
  );
}

const programs: Program[] = [
  {
    title: "Grant & Empowerment",
    desc:
      "Micro-grants, business coaching and seed capital for entrepreneurs, paired with mentorship to build sustainable livelihoods.",
    link: "/signup",
    external: false,
  },
  {
    title: "Internships & Scholarships",
    desc:
      "Paid internships, vocational placements and scholarships that open pathways into education and meaningful employment.",
    link: "https://cohort.whobaogofoundation.org",
    external: true,
  },
  {
    title: "Green World & Modern Agro Farming",
    desc:
      "Climate-smart agriculture training, improved seeds and tools, and pilot projects that protect soil and water.",
    link: "/signup",
    external: false,
  },
  {
    title: "Medical Care & Humanitarian Aid",
    desc:
      "Rapid crisis response, mobile clinics, vaccination drives and partnerships to strengthen primary healthcare.",
    link: "/signup",
    external: false,
  },
];
