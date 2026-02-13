import 
// React,
{ useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, 
    // MessageCircle, 
    ChevronDown, Send, CheckCircle } from 'lucide-react';
import theme from '../../components/themes/Theme';
import Vasertile from './Vasertile';

const faqs = [
  { q: "How do I track my donation's impact?", a: "Once your donation is processed, you will receive a unique tracking ID to view real-time updates on the specific project you supported in your dashboard." },
  { q: "Is my donation tax-deductible?", a: "Yes, we are a registered non-profit. A tax-deductible receipt will be sent to your email immediately after every transaction." },
  { q: "Can I volunteer remotely?", a: "Absolutely! We have several digital initiatives including mentorship, social media advocacy, and technical support roles." },
];

const SupportPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      
      {/* HERO SECTION */}
      <section className="py-20 bg-linear-to-b from-blue-900/10 to-slate-950">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            How Can We <span className="text-yellow-400">Help?</span>
          </motion.h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Whether you have a question about our projects, need help with a donation, or want to explore partnership opportunities, our team is here for you.
          </p>
        </div>
      </section>

      <section className="py-12 container mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* 1. CONTACT INFO CARDS */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-8">Get in Touch</h2>
            {[
              { icon: <Mail />, title: "Email Us", detail: "support@charity.org", sub: "Response within 24hrs" },
              { icon: <Phone />, title: "Call Us", detail: "+234 (0) 800-SMILE", sub: "Mon-Fri, 9am - 5pm" },
              { icon: <MapPin />, title: "Visit Us", detail: "123 Impact Plaza, Lagos", sub: "Headquarters" }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-yellow-400/30 transition-all">
                <div className="text-yellow-400">{item.icon}</div>
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-slate-300">{item.detail}</p>
                  <p className="text-xs text-slate-500 mt-1">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 2. SUPPORT FORM */}
          <div className="lg:col-span-2 bg-white/5 p-8 rounded-3xl border border-white/10">
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

            <form className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Full Name</label>
                <input type="text" 
                placeholder="Okorie Adannaya Vivian" 
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 focus:border-yellow-400 outline-none transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-slate-400">Email Address</label>
                <input type="email" 
                placeholder="jane@example.com" 
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 focus:border-yellow-400 outline-none transition-all" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm text-slate-400">Subject</label>
                <select className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 focus:border-yellow-400 outline-none transition-all appearance-none">
                  <option>General Inquiry</option>
                  <option>Donation Issue</option>
                  <option>Volunteer Application</option>
                  <option>Partnership Proposal</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm text-slate-400">Message</label>
                <textarea
                placeholder="Kindly type in your message here...."
                rows={4} className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 focus:border-yellow-400 outline-none transition-all" />
              </div>

              {/* work on the submission too, if possible just use the gmail type of submission */}
              <button 
                type="submit" 
                className="md:col-span-2 py-4 rounded-xl font-bold text-slate-900 flex justify-center items-center gap-2 hover:scale-[1.01] transition-transform"
                style={{ background: theme.gold }}
              >
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 3. FAQ SECTION */}
      <section className="py-24 bg-slate-900/30">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-white/10 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex justify-between items-center p-6 text-left bg-white/5 hover:bg-white/10 transition-all"
                >
                  <span className="font-semibold">{faq.q}</span>
                  <ChevronDown className={`transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div 
                      initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="p-6 text-slate-400 border-t border-white/5 bg-slate-900/50">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. NEWSLETTER REQUEST SECTION */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="bg-linear-to-r from-yellow-400 to-yellow-600 rounded-[3rem] p-8 md:p-16 text-slate-950 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <h2 className="text-3xl font-black mb-4 italic">STAY UPDATED</h2>
              <p className="font-medium">Get monthly impact reports, community stories, and urgent calls to action delivered to your inbox.</p>
            </div>
            
            <div className="w-full max-w-md">
              {!subscribed ? (
                <div className="flex bg-white/20 p-1 rounded-full border border-black/10 backdrop-blur-sm">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="bg-transparent px-6 py-3 w-full outline-none placeholder:text-slate-800 font-semibold"
                  />
                  <button 
                    onClick={() => setSubscribed(true)}
                    className="bg-slate-950 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-all"
                  >
                    Join
                  </button>
                </div>
              ) : (
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex items-center gap-3 font-bold text-xl">
                  <CheckCircle size={32} /> You're on the list!
                </motion.div>
              )}
              <p className="text-xs mt-4 font-semibold opacity-70 italic text-center md:text-left">
                * We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Vasertile />
    </div>
  );
};

export default SupportPage;