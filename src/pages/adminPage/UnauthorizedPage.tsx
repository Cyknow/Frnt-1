import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

const Unauthorized = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    if (countdown === 0) navigate('/');
    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <ShieldAlert size={100} className="text-red-500 mb-6 mx-auto animate-pulse" />
      </motion.div>

      <h1 className="text-4xl md:text-6xl font-black text-white mb-4">403: ACCESS DENIED</h1>
      <p className="text-slate-400 text-lg max-w-md mb-8">
        You don't have the clearance level required to view this sector. 
        Don't worry, we'll get you back to safety.
      </p>

      {/* Progress Bar Animation */}
      <div className="w-64 h-2 bg-white/10 rounded-full mb-8 overflow-hidden">
        <motion.div 
          className="h-full bg-yellow-400"
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: 10, ease: "linear" }}
        />
      </div>

      <p className="text-yellow-400 font-mono mb-8">REDIRECTING IN {countdown}S...</p>

      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 px-8 py-3 bg-white text-slate-950 font-bold rounded-full hover:bg-yellow-400 transition-colors"
      >
        <ArrowLeft size={18} /> Return Home Now
      </button>
    </div>
  );
};
export default Unauthorized;