import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import theme from "../../components/themes/Theme";
import Counter from "./Counter";
import CharityHero from "./CharityHero";
import PartnerForm from "./PartnerPage";
// import PartnerLogo from "../components/layout/PartnerLogo";
import WhyChooseUs from "./WhyChooseUs";
import Vasertile from "./Vasertile";

// 1. Move data constants outside the component for better performance
const programs = [
  {
    title: "Grant & Empowerment",
    desc: "Micro-grants, business coaching and mentorship for sustainable livelihoods.",
    link: "/programs/grants",
  },
  {
    title: "Internships & Scholarships",
    desc: "Education access, paid internships and vocational placements.",
    link: "/programs/scholarships",
  },
  {
    title: "Green World & Agro Farming",
    desc: "Climate-smart agriculture and food security initiatives.",
    link: "/programs/agriculture",
  },
  {
    title: "Medical & Humanitarian Aid",
    desc: "Rapid response, clinics, and long-term healthcare support.",
    link: "/programs/health",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Home() {
  return (
    <div className="bg-slate-950 text-white overflow-hidden">
      
      <CharityHero/>
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-slate-900 to-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />

        <div className="relative container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Building Resilient Communities
              <span className="block text-yellow-400">Through Action & Opportunity</span>
            </h1>
            <p className="mt-6 text-lg text-slate-300 max-w-xl">
              We combine humanitarian aid, education, empowerment, and climate-smart initiatives to create measurable, long-term impact across communities.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/donate"
                className="px-8 py-3 rounded-full font-semibold text-slate-900 transition-transform hover:scale-105"
                style={{ background: theme.gold }}
              >
                Donate Now
              </Link>
              <Link
                to="/about"
                className="px-8 py-3 rounded-full border border-white/30 hover:bg-white/10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          {/* Hero Image / Graphic */}
          <motion.div
            className="hidden md:flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="relative group">
              {/* Decorative Glow behind image */}
              <div className="absolute -inset-4 bg-yellow-400/20 rounded-full blur-3xl group-hover:bg-yellow-400/30 transition-all duration-700" />
              <Link to="/donate">
                <img 
                  src='/src/assets/download (1).jpg' 
                  alt="CHARITY" 
                  className='relative h-[400px] w-[400px] md:h-[500px] md:w-[500px] rounded-full object-cover border-4 border-white/10 shadow-2xl transition-all duration-700 group-hover:border-yellow-400/50' 
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST / STATS SECTION */}
<section className="py-20 bg-slate-900/50">
  <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
    {[
      { val: 5000, label: "Beneficiaries", suf: "+" },
      { val: 1200, label: "Grants", suf: "" },
      { val: 300, label: "Scholarships", suf: "" },
      { val: 50, label: "Health Projects", suf: "+" },
    ].map((item, i) => (
      <motion.div
        key={i}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-yellow-400/20 transition-colors"
      >
        <h3 className="text-3xl font-bold text-yellow-400">
          <Counter value={item.val} suffix={item.suf} />
        </h3>
        <p className="text-slate-400 text-sm mt-1">{item.label}</p>
      </motion.div>
    ))}
  </div>
</section>

      {/* WHAT WE DO - FIXES APPLIED HERE */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white relative inline-block group"
            >
              What We Do
              {/* Heading Underline */}
              <div className="h-[3px] w-0 group-hover:w-full bg-[#FFD700] transition-all duration-500 ease-out mx-auto mt-2" />
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((p, index) => (
              <motion.div 
                key={p.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-yellow-400/40 transition-all duration-500 relative overflow-hidden"
              >
                {/* 1. Counter using the fixed 'index' variable */}
                <div className="absolute top-6 right-8 text-6xl font-black text-white/5 group-hover:text-yellow-400/10 transition-colors duration-500 italic pointer-events-none">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-white inline-block">
                    {p.title}
                    {/* 2. Fixed Animated Underline for Titles */}
                    <div className="h-[2px] w-0 group-hover:w-full bg-[#FFD700] transition-all duration-500 ease-in-out mt-1" />
                  </h3>
                  
                  <p className="mt-4 text-slate-300 leading-relaxed">{p.desc}</p>
                  
                  <Link
                    to={p.link}
                    className="inline-flex items-center mt-6 text-yellow-400 font-semibold group/link"
                  >
                    Learn more 
                    <span className="ml-2 transition-transform group-hover/link:translate-x-2">→</span>
                  </Link>
                </div>

                {/* 3. Glow Effect */}
                <div className="absolute -inset-px bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      

      {/* FINAL CTA
      <section className="py-24 text-center bg-black relative">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl font-bold"
        >
          Help Us Create Lasting Impact
        </motion.h2>
        <p className="mt-4 text-slate-400">
          Every contribution fuels opportunity, dignity, and resilience.
        </p>
        <Link
          to="/donate"
          className="inline-block mt-8 px-10 py-4 rounded-full font-semibold text-slate-900 hover:scale-105 transition-transform"
          style={{ background: theme.gold }}
        >
          Support Our Mission
        </Link>
      </section> */}

      <WhyChooseUs/>
      <PartnerForm/>
      <Vasertile />
      {/* <PartnerLogo/> */}
    </div>
  );
}