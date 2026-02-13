{/* <Link to="/mission" 
            className="text-[#001F5C] font-bold border-b border-gray-100 pb-2">Mission</Link>
            <Link to="/about" className="text-[#001F5C] font-bold border-b border-gray-100 pb-2">Who We Are</Link>
            <Link to="/job" className="text-[#001F5C] font-bold border-b border-gray-100 pb-2">Careers</Link>
            <Link to="/support" className="text-[#001F5C] font-bold">Contact | Support</Link> */}



{/* <div className="flex items-center gap-4">
           Search Bar 
          <div className="group relative flex items-center bg-white border border-gray-300 rounded-full px-3 py-1 transition-all duration-300 focus-within:w-48 w-10 md:w-40 overflow-hidden">
            <span className="text-sm">🔍</span>
            <input type="text" placeholder="Search..." className="ml-2 outline-none text-sm w-full bg-transparent" />
          </div>
          
          <button className="bg-[#FFD700] text-[#001F5C] px-5 py-1.5 rounded-full font-bold text-sm hover:bg-[#e6c200] hover:scale-105 transition-all shadow-sm">
            SIGN IN
          </button>

          <div className="relative cursor-pointer text-xl">
            🛒<span className="absolute -top-2 -right-2 bg-[#001F5C] text-[#FFD700] text-[10px] rounded-full px-1.5 font-bold">0</span>
          </div>
        </div> */}


{/* bg-transparent text-[#001F5C] font-semibold text-sm hover:bg-gray-100 text-[#001F5C] transition-all hover:text-blue-700 */}
            {/* <NavLink to="/about" className="text-[#001F5C] font-semibold text-sm hover:text-[#FFD700] transition-all">Who We Are ▾</NavLink>
            <NavLink to="/job" className="text-[#001F5C] font-semibold text-sm hover:text-[#FFD700] transition-all">Careers</NavLink>
            <NavLink to="/support" className="text-[#001F5C] font-semibold text-sm hover:text-[#FFD700] transition-all">Contact | Support</NavLink> */}

/*
import { motion, type Variants } from "framer-motion";

import { Link } from "react-router-dom";
import theme from "../components/themes/Theme";
import { useEffect, useState } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};


const navLinkStyling = ({ isActive }: { isActive: boolean }) => 
    `relative transition-colors duration-300 hover:text-[#FFD700] ${
      isActive ? 'font-bold border-b-2 border-[#FFD700] cursor-pointer' : 'text-white'
    }`;

// const [isScrolled, setIsScrolled] = useState(false);
// Handle Scroll Effect
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 40);
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);


export default function Home() {
  return (
    <>
    <div className="bg-slate-950 text-white overflow-hidden">
      {/* <div style={{ background: theme.gold, height: '1.7rem',  }}></div> */
      
      /* HERO SECTION *
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
                className="px-8 py-3 rounded-full font-semibold text-slate-900"
                style={{ background: theme.gold }}
              >
                Donate Now
              </Link>
              <Link
                to="/about"
                className="px-8 py-3 rounded-full border border-white/30 hover:bg-white/10"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >

            
            <div className="" />
          <a href="/donate">
          <img src={'/src/assets/download (1).jpg'} alt="CHARITY" 
             className= 'h-120 md:h-140 rounded-full w-300 transition-all duration-500' />
             </a>
          </motion.div>
        </div>
      </section>

      /* TRUST / STATS *
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          {["5,000+ Beneficiaries", "1,200 Grants", "300 Scholarships", "50+ Health Projects"].map(
            (item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-white/5"
              >
                <h3 className="text-2xl font-bold text-yellow-400">{item}</h3>
              </motion.div>
            )
          )}
        </div>
      </section>

      /* WHAT WE DO *
<section className="py-24 bg-gradient-to-b from-slate-900 to-black">
  <div className="container mx-auto px-6">
    <motion.h2
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold text-center text-white relative inline-block left-1/2 -translate-x-1/2 mb-4 group"
    >
      What We Do
      /* Animated underline for the Heading *
      <div className="h-[3px] w-0 group-hover:w-full bg-[#FFD700] transition-all duration-500 ease-out mx-auto mt-1" />
    </motion.h2>

    <div className="mt-16 grid md:grid-cols-2 gap-8">
      {programs.map((p, index) => (
        <motion.div 
          key={p.title}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ y: -6 }}
          className="group p-8 rounded-3xl bg-white/5 backdrop-blur border border-white/10 hover:border-yellow-400/30 transition-all duration-500 relative overflow-hidden"
        >
          /* 1. The Animated Counter *
      <div className="absolute top-6 right-8 text-5xl font-black text-white/5 group-hover:text-yellow-400/20 transition-all duration-500 italic">
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className="relative z-10">
          <h3 className="text-xl font-semibold text-white relative inline-block">
            {p.title}
            /* The Animated Underline *
            <motion.div 
              
              whileHover={{ width: "100%" }} // Simple hover
              // Or better yet, link it to the parent group hover:
              className="h-[2px] w-0 bg-[#FFD700] group-hover:w-full transition-all duration-500 ease-in-out mt-1"
            />
          </h3>
          
          <p className="mt-4 text-slate-300">{p.desc}</p>
          
          <Link
            to={p.link}
            className="inline-flex items-center mt-6 text-yellow-400 font-semibold group/link"
          >
            Learn more 
            <span className="ml-2 transition-transform group-hover/link:translate-x-2">→</span>
          </Link>
          </div>
        /* 3. Subtle Glow Effect on Hover *
      <div className="absolute -inset-px bg-gradient-to-br from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />
        </motion.div>
      ))}
    </div>
  </div>
</section>

      /* CORPORATE / PARTNERS *
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl font-bold">Partners & Corporate Engagement</h2>
            <p className="mt-4 text-slate-300">
              We work with corporates, NGOs, and institutions through CSR programs, co-funded projects, and transparent impact reporting.
            </p>
            <Link
              to="/partners"
              className="inline-block mt-6 px-6 py-3 rounded-full border border-white/30"
            >
              Partner With Us
            </Link>
          </motion.div>
          <div className="rounded-3xl h-64 bg-gradient-to-br from-blue-600/20 to-yellow-400/20" />
        </div>
      </section>

      /* CTA 
      <section className="py-24 text-center bg-black">
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
          className="inline-block mt-8 px-10 py-4 rounded-full font-semibold text-slate-900"
          style={{ background: theme.gold }}
        >
          Support Our Mission
        </Link>
      </section>
    </div>

    </>
  );
}

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
*/









/* WHAT WE DO *
      <section className="py-24 bg-gradient-to-b from-slate-900 to-black">
        <div className="container mx-auto px-6">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center underline"
          >
            What We Do
          </motion.h2>

          {/* <NavLink to="/" className={navLinkStyling}>
            CHARITY
            {location.pathname === '/' && (
            <motion.div layoutId="underline" className="font-bold border-b-2 border-[#FFD700] cursor-pointer"/>
            )}
          </NavLink> *

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {programs.map((p) => (
              <motion.div 
                key={p.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="p-8 rounded-3xl bg-white/5 backdrop-blur border border-white/10 "
              >
                <h3 className="text-xl font-semibold underline">{p.title}
                  <motion.div />
                </h3>
                <p className="mt-3 text-slate-300">{p.desc}</p>
                <Link
                  to={p.link}
                  className="inline-block mt-4 text-yellow-400 font-semibold"
                >
                  Learn more →
                </Link>
                
              </motion.div>
            ))}
          </div>

        </div>
      </section>
      */







// import React from "react";
// import { motion } from "framer-motion";
// import { ArrowRight, HeartHandshake } from "lucide-react";

// export default function HomePage() {
//   return (
//     <main className="bg-[#F0F8FF] text-slate-900">
//       {/* HERO SECTION *
//       <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#001F5C] to-[#00308F]">
//         <motion.div
//           className="absolute inset-0 opacity-20"
//           animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
//           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//           style={{
//             backgroundImage:
//               "radial-gradient(circle at 20% 20%, #FFD700 1px, transparent 1px)",
//             backgroundSize: "40px 40px",
//           }}
//         />

//         <div className="relative container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
//               Empowering Communities.<br />
//               <span className="text-[#FFD700]">Building Sustainable Futures.</span>
//             </h1>
//             <p className="mt-6 text-lg text-blue-100 max-w-xl">
//               We combine humanitarian action with enterprise-driven solutions to
//               create lasting impact across Africa.
//             </p>
//             <div className="mt-8 flex gap-4">
//               <a
//                 href="/donate"
//                 className="px-8 py-3 rounded-full font-semibold bg-[#FFD700] text-[#001F5C] hover:scale-105 transition"
//               >
//                 Donate Now
//               </a>
//               <a
//                 href="/about"
//                 className="px-8 py-3 rounded-full font-semibold border border-white text-white hover:bg-white hover:text-[#001F5C] transition"
//               >
//                 Learn More
//               </a>
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1 }}
//             className="hidden md:block"
//           >
//             <img
//               src="/images/hero-impact.png"
//               alt="Community Impact"
//               className="rounded-3xl shadow-2xl"
//             />
//           </motion.div>
//         </div>
//       </section>

//       {/* PROGRAMS SECTION */}
//       <section className="py-20 container mx-auto px-6">
//         <motion.h2
//           className="text-3xl md:text-4xl font-bold text-center text-[#001F5C]"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//         >
//           Our Core Programs
//         </motion.h2>

//         <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
//           {programs.map((p) => (
//             <motion.div
//               key={p.title}
//               whileHover={{ y: -8 }}
//               className="bg-white rounded-2xl p-6 shadow-lg border hover:shadow-xl transition"
//             >
//               <div className="w-12 h-12 rounded-xl bg-[#001F5C]/10 flex items-center justify-center">
//                 <p.icon className="text-[#001F5C]" />
//               </div>
//               <h3 className="mt-4 font-semibold text-lg text-[#001F5C]">
//                 {p.title}
//               </h3>
//               <p className="mt-2 text-sm text-slate-600 leading-relaxed">
//                 {p.desc}
//               </p>
//               <a
//                 href="/what-we-do"
//                 className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#001F5C]"
//               >
//                 Learn more <ArrowRight size={16} />
//               </a>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* IMPACT SECTION */}
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
//           {stats.map((s) => (
//             <motion.div
//               key={s.label}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//             >
//               <h3 className="text-4xl font-bold text-[#001F5C]">{s.value}</h3>
//               <p className="mt-2 text-slate-600">{s.label}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* CTA SECTION */}
//       <section className="py-20 bg-[#001F5C] text-white">
//         <div className="container mx-auto px-6 text-center">
//           <HeartHandshake size={48} className="mx-auto text-[#FFD700]" />
//           <h2 className="mt-6 text-3xl md:text-4xl font-bold">
//             Partner With Us to Create Impact
//           </h2>
//           <p className="mt-4 max-w-2xl mx-auto text-blue-100">
//             Your support enables education, healthcare, sustainable livelihoods
//             and community resilience.
//           </p>
//           <a
//             href="/donate"
//             className="inline-block mt-8 px-10 py-4 rounded-full font-semibold bg-[#FFD700] text-[#001F5C] hover:scale-105 transition"
//           >
//             Support Our Mission
//           </a>
//         </div>
//       </section>
//     </main>
//   );
// }

// const programs = [
//   {
//     title: "Grant & Empowerment",
//     desc: "Micro-grants, business coaching and seed capital for entrepreneurs.",
//     icon: HeartHandshake,
//   },
//   {
//     title: "Internships & Scholarships",
//     desc: "Paid internships and scholarships opening pathways for youth.",
//     icon: ArrowRight,
//   },
//   {
//     title: "Green World & Agro Farming",
//     desc: "Climate-smart agriculture and environmental sustainability.",
//     icon: ArrowRight,
//   },
//   {
//     title: "Medical & Humanitarian Aid",
//     desc: "Rapid crisis response and primary healthcare support.",
//     icon: ArrowRight,
//   },
// ];

// const stats = [
//   { value: "5,000+", label: "Beneficiaries Reached" },
//   { value: "1,200+", label: "Grants Awarded" },
//   { value: "300+", label: "Scholarships" },
//   { value: "50+", label: "Health Projects" },
// ];
