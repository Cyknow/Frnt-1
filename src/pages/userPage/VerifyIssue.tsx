import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, RefreshCw, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VerifyIssue = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-red-500/5 backdrop-blur-xl border border-red-500/20 p-10 rounded-[3rem]"
      >
        <div className="w-20 h-20 bg-red-500/20 border border-red-500/30 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <XCircle size={40} className="text-red-500" />
        </div>

        <h2 className="text-3xl font-black text-white italic uppercase mb-4">Link Compromised</h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-8 uppercase tracking-widest font-bold text-[10px]">
          You wasted time! The verification window has closed or the security token is invalid. Request a new link to proceed.
        </p>

        <div className="space-y-3">
          <button 
            onClick={() => navigate('/signup')}
            className="w-full py-4 rounded-2xl font-black bg-white text-slate-950 flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"
          >
            <RefreshCw size={18} /> RESEND LINK
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="w-full py-4 rounded-2xl font-bold text-white border border-white/10 hover:bg-white/5 transition-all text-xs"
          >
            RETURN TO BASE
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyIssue;