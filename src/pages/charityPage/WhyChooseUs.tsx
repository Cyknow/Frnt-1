
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Globe, 
  // Users, 
  TrendingUp,
  // Heart
 } from 'lucide-react';
import theme from '../../components/themes/Theme';

const pillars = [
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Radical Transparency",
    desc: "We provide audited financial reports and live project tracking. You see exactly where every cent of your contribution goes."
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Proven Impact",
    desc: "We don't just give aid; we measure outcomes. Over 90% of our beneficiaries reach economic self-sufficiency within 24 months."
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Efficiency First",
    desc: "By leveraging local networks and MERN-stack technology, we maintain a 92% efficiency rating, minimizing administrative costs."
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Community-Led",
    desc: "Our projects are designed by the people who live in them. We empower local leaders rather than imposing external solutions."
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const WhyChooseUs = () => {
  return (
    <div className="bg-slate-950 text-white min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent -z-10" />
        
        <div className="container mx-auto px-6 text-center">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-yellow-400 font-bold tracking-widest uppercase text-sm"
          >
            Our Competitive Advantage
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mt-4 mb-6"
          >
            Why Your Trust <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-slate-400">
              Is Well Placed
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-slate-400 text-lg"
          >
            We are redefining humanitarian aid through technology, transparency, and a commitment to sustainable growth.
          </motion.p>
        </div>
      </section>

      {/* PILLARS GRID */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-yellow-400/50 transition-all duration-300 group"
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300"
                  style={{ backgroundColor: `${theme.gold}20`, color: theme.gold }}
                >
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-400 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON SECTION */}
      <section className="py-2 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="bg-slate-950 rounded-[3rem] p-8 md:p-16 border border-white/5 shadow-2xl overflow-hidden relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Changing the Aid Landscape</h2>
                <div className="space-y-6">
                  {[
                    "Direct funding with no middle-man delays.",
                    "Blockchain-verified resource allocation.",
                    "Focus on sustainable business, not just relief.",
                    "24/7 Digital impact dashboard for partners."
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="mt-1 bg-yellow-400 rounded-full p-1 text-slate-950">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <p className="text-slate-300">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Visual Element: Impact Stat Card */}
              <div className="relative h-64 md:h-80 bg-linear-to-br from-yellow-400/20 to-blue-600/20 rounded-2xl flex items-center justify-center border border-white/10 group">
                 <motion.div 
                   animate={{ scale: [1, 1.05, 1] }}
                   transition={{ duration: 4, repeat: Infinity }}
                   className="text-center p-8 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10"
                 >
                    <span className="text-yellow-400 text-5xl font-black">92%</span>
                    <p className="text-white font-bold mt-2 uppercase tracking-widest">Efficiency Rating</p>
                    <p className="text-slate-400 text-xs mt-2 italic">Standard NGO average: 75%</p>
                 </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className=" text-center">
        <div className="container mx-auto px-2">
          <h2 className="text-3xl text-yellow-400 font-bold mb-8 rounded-xl">Ready to make a real difference?</h2>
          {/* <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              className="px-10 py-4 rounded-full font-bold text-slate-900 transition-all hover:shadow-[0_0_20px_rgba(255,215,0,0.4)]"
              style={{ background: theme.gold }}
            >
              Start Donating
            </button>
            <button className="px-10 py-4 rounded-full font-bold border border-white/20 hover:bg-white/5 transition-all">
              View Our Reports
            </button>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;