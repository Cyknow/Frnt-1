// import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, RefreshCcw, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// import theme from '../../components/themes/Theme';
import bgVid from '../../assets/VID-20251211-WA0026.mp4';

const VerifyEmailPage = () => {
  const navigate = useNavigate();

  // Helper to open common email providers
  const openMailApp = () => {
    window.open('https://mail.google.com', '_blank');
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950 font-sans">
      
      {/* BACKGROUND VIDEO */}
      <div className="absolute inset-0 -z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30 grayscale">
          <source src={bgVid} type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-slate-950/90" />
      </div>

      <div className="container mx-auto px-6 relative z-20 flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl text-center"
        >
          {/* ICON BOX */}
          <div className="relative inline-block mb-10">
            <motion.div 
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="w-24 h-24 bg-yellow-400 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-yellow-400/20"
            >
              <Mail size={40} className="text-slate-950" />
            </motion.div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-slate-950 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>
          </div>

          {/* TEXT CONTENT */}
          <h1 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter mb-6">
            Almost  There, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Weren-Care Charity
            </span>
          </h1>
          
          <p className="text-slate-300 text-lg md:text-xl max-w-lg mx-auto leading-relaxed font-medium mb-12">
            A secured verification mail has been sent to your inbox. Please click the verification link to activate your global account.
          </p>

          {/* ACTIONS */}
          <div className="grid md:grid-cols-2 gap-4 max-w-md mx-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openMailApp}
              className="flex items-center justify-center gap-3 py-4 px-6 bg-white text-slate-950 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl"
            >
              Open Mail <ExternalLink size={16} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/signinp')}
              className="flex items-center justify-center gap-3 py-4 px-6 bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-2xl font-black uppercase text-xs tracking-widest"
            >
              <ArrowLeft size={16} /> Back to Login
            </motion.button>
          </div>

          {/* ACCOMMODATING FOOTER */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 pt-8 border-t border-white/5 space-y-4"
          >
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
              Didn't receive a verification Email?
            </p>
            <button 
              className="text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-2 mx-auto text-sm font-black uppercase tracking-tighter group"
            >
              <RefreshCcw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
              Resend Verification Link
            </button>
          </motion.div>
        </motion.div>

      </div>
      
      {/* DECORATIVE ELEMENTS */}
      <div className="absolute bottom-10 left-10 hidden lg:block opacity-20">
        <p className="text-white font-black text-9xl italic select-none">WCC</p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;