// import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import theme from '../../components/themes/Theme';

const VerifySuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] shadow-2xl"
      >
        <div className="relative mb-8 flex justify-center">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }} 
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute w-24 h-24 bg-yellow-400/20 blur-3xl rounded-full" 
          />
          <div className="w-20 h-20 bg-yellow-400 rounded-2xl flex items-center justify-center relative z-10 shadow-lg shadow-yellow-400/20">
            <CheckCircle2 size={40} className="text-slate-950" />
          </div>
        </div>

        <h2 className="text-3xl font-black text-white italic uppercase mb-4 tracking-tight">Access Granted</h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-8 uppercase tracking-widest font-bold text-[10px]">
          Your global identity has been verified. You are now cleared to enter the Vanguard network.
        </p>

        <button 
          onClick={() => navigate('/signinp')}
          className="w-full py-4 rounded-2xl font-black text-slate-950 flex items-center justify-center gap-2 transition-all hover:opacity-90 shadow-xl"
          style={{ background: theme.gold }}
        >
          ENTER COMMAND CENTER <ArrowRight size={20} />
        </button>
      </motion.div>
    </div>
  );
};

export default VerifySuccess;