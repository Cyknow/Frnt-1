import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom'; // Added for navigation
import { 
    Lock, Mail, User, ArrowRight, Globe, 
    ShieldCheck, Eye, EyeOff, Phone, X, CheckCircle2, 
    Info
} from 'lucide-react';
import theme from '../../components/themes/Theme';
import { useAuth } from '../../context/AuthProvider'; // 1. Import Auth Context
// import axios from 'axios';

// IMPORT LEGAL CONTENT
import { PrivacyPolicyContent } from '../../components/constants/PrivacyPolicy';
import { TermsOfServiceContent } from '../../components/constants/TermsOfService';
import api from '../../axiosConfig';

const AuthHub = () => {
  const [searchParams] = useSearchParams(); // 2. Initialize it
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login } = useAuth(); // 2. Consume Login Function
  
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isRobotChecked, setIsRobotChecked] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(''); // 3. Added error state

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  
  // Legal Modal State
  const [legalModal, setLegalModal] = useState<{show: boolean, type: 'terms' | 'privacy'}>({
    show: false,
    type: 'terms'
  });

  const activeContent = legalModal.type === 'terms' ? TermsOfServiceContent : PrivacyPolicyContent;
  const inputStyles = "w-full bg-black/20 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:border-yellow-400 transition-all placeholder:text-slate-600 text-sm";

  // 4. Integrated Auth Submission
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Safety check for signup
    if (!isLogin && (!isRobotChecked || !agreedToTerms)) return;

    try {
      // 2. CHANGED: Endpoints are now relative to your baseURL in axiosConfig
      const endpoint = isLogin ? '/auth/signin' : '/auth/signup';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await api.post(endpoint, payload);

      // 3. CHANGED: Extract based on your 'createSendToken' structure
      const token = response.data.token; 
      const user = response.data.data.user;

      if (token) {
        localStorage.setItem('token', token);
      }
      // 5. Success Flow
      setIsSuccess(true);
      
      // Save token and user data to Global State
      setTimeout(() => {
        login(token, user);
        
        // 6. Role-Based Redirection
        const role = user.role;
        if (role === 'senior-admin') navigate('/admin/command');
        else if (role === 'admin') navigate('/admin/grants');
        else navigate('/userDb');
      }, 2000);

    } catch (err: any) {
      // 5. CHANGED: Better error pathing
      setError(err.response?.data?.message || 'A secure connection error occurred. Please check your internet connection and try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //to display messages based on verification status from the link
  useEffect(() => {
    // 3. Check for the status parameter on mount
    const status = searchParams.get('status');

    if (status === 'already_active') {
      setInfoMessage('Account is already active. Please sign in to proceed.');
    } else if (status === 'verified') {
        setInfoMessage('Identity confirmed. Welcome to the Vanguard.');
    }
  }, [searchParams]);


  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950 font-sans">
      
      {/* BACKGROUND VIDEO */}
      <div className="absolute inset-0 -z-10">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30 grayscale">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-close-up-of-hands-holding-a-small-plant-42354-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-transparent to-slate-950" />
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* LEFT SIDE: DYNAMIC COPY */}
        <motion.div 
          key={isLogin ? 'login-text' : 'signup-text'}
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="text-white hidden lg:block"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold uppercase mb-6 tracking-widest">
            <Globe size={14} /> {isLogin ? 'Welcome Back' : 'New Era of Impact'}
          </div>
          <h1 className="text-6xl font-black leading-tight mb-6 italic uppercase">
            {isLogin ? "YOUR IMPACT \n CONTINUES." : "THE WORLD \n IS WAITING."}
          </h1>
          <p className="text-slate-400 text-lg max-w-md leading-relaxed">
            {isLogin 
              ? "Access your dashboard to track your ongoing projects and community growth." 
              : "Join the Vanguard. Claim your seat among the global leaders driving sustainable change."}
          </p>
        </motion.div>

        {/* RIGHT SIDE: AUTH CARD */}
        <div className="w-full max-w-md mx-auto">
          <motion.div layout className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 md:p-10 rounded-[2.5rem] shadow-2xl">
            
            {/* TOGGLE SWITCH */}
            <div className="flex bg-black/40 p-1.5 rounded-2xl mb-6 border border-white/5">
              <button onClick={() => {setIsLogin(true); setError('');}} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${isLogin ? 'bg-yellow-400 text-slate-950' : 'text-slate-500'}`}>LOGIN</button>
              <button onClick={() => {setIsLogin(false); setError('');}} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${!isLogin ? 'bg-yellow-400 text-slate-950' : 'text-slate-500'}`}>SIGNUP</button>
            </div>

            {/* ERROR DISPLAY */}
            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold text-center">
                {error}
              </motion.div>
            )}
              {/* INFO MESSAGE DISPLAY */}
              {/* 4. Display the Info Message if it exists */}
            {infoMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center gap-3 text-blue-400 text-xs font-bold uppercase tracking-widest"
              >
                <Info size={18} />
                <span>{infoMessage}</span>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              <motion.form
                key={isLogin ? 'login' : 'signup'}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
                onSubmit={handleAuthSubmit}
              >
                {!isLogin && (
                  <>
                    <div className="relative">
                      <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Full Name</label>
                      <User className="absolute left-4 top-11 text-slate-500" size={18} />
                      <input name="name" type="text" value={formData.name} onChange={handleChange} required placeholder="Jane Doe" className={inputStyles} />
                    </div>
                    <div className="relative">
                      <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Phone Number</label>
                      <Phone className="absolute left-4 top-11 text-slate-500" size={18} />
                      <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="+234..." className={inputStyles} />
                    </div>
                  </>
                )}

                <div className="relative">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Email Address</label>
                  <Mail className="absolute left-4 top-11 text-slate-500" size={18} />
                  <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="jane@example.com" className={inputStyles} />
                </div>
               
                <div className="relative">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Password</label>
                  <Lock className="absolute left-4 top-11 text-slate-500" size={18} />
                  <input name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} required placeholder="••••••••" className={inputStyles} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-11 text-slate-500 hover:text-yellow-400">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {!isLogin && (
                  <div className="space-y-4 pt-2">
                    <div className="flex items-start gap-3">
                      <input type="checkbox" checked={agreedToTerms} onChange={() => setAgreedToTerms(!agreedToTerms)} className="mt-1 accent-yellow-400" />
                      <label className="text-[11px] text-slate-400 leading-tight">
                        I agree to the <button type="button" onClick={() => setLegalModal({show: true, type: 'terms'})} className="text-yellow-400 underline">Terms</button> and <button type="button" onClick={() => setLegalModal({show: true, type: 'privacy'})} className="text-yellow-400 underline">Privacy</button>.
                      </label>
                    </div>
                    <div className={`p-3 rounded-xl border flex items-center justify-between ${isRobotChecked ? 'bg-green-500/10 border-green-500/30' : 'bg-black/20 border-white/5'}`}>
                      <div className="flex items-center gap-3">
                        <input type="checkbox" onChange={(e) => setIsRobotChecked(e.target.checked)} className="accent-green-500" />
                        <span className="text-xs font-medium text-slate-300">Human Verification</span>
                      </div>
                      <ShieldCheck size={16} className={isRobotChecked ? 'text-green-500' : 'text-slate-600'} />
                    </div>
                  </div>
                )}

                <motion.button
                  disabled={!isLogin && (!isRobotChecked || !agreedToTerms)}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-2xl font-black text-slate-950 flex items-center justify-center gap-2 mt-4 transition-all ${(!isLogin && (!isRobotChecked || !agreedToTerms)) ? 'opacity-40 grayscale' : 'opacity-100 shadow-xl shadow-yellow-400/20'}`}
                  style={{ background: theme.gold }}
                >
                  {isLogin ? 'SECURE ACCESS' : 'CREATE ACCOUNT'} <ArrowRight size={20} />
                </motion.button>
              </motion.form>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* MODALS & SUCCESS OVERLAY (Kept same as original for UI consistency) */}
      {/* Legal Modal */}
      <AnimatePresence>
        {legalModal.show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setLegalModal({ show: false, type: legalModal.type })}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-[2.5rem] max-w-2xl max-h-[80vh] overflow-y-auto text-white relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLegalModal({ show: false, type: legalModal.type })}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-black mb-6 italic uppercase">
                {legalModal.type === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
              </h2>
              <div className="text-sm leading-relaxed space-y-4">
                <h3 className="text-lg font-bold">{activeContent.title}</h3>
                <p className="text-slate-400">Last updated: {activeContent.lastUpdated}</p>
                {activeContent.sections.map((section, index) => (
                  <div key={index} className="mb-4">
                    <h4 className="font-semibold text-yellow-400 mb-2">{section.heading}</h4>
                    <p>{section.body}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
          {isSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-200 bg-slate-950 flex flex-col items-center justify-center text-center">
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-24 h-24 bg-yellow-400 rounded-3xl flex items-center justify-center mb-6 shadow-2xl shadow-yellow-400/20">
              <CheckCircle2 size={48} className="text-slate-950" />
            </motion.div>
            <h2 className="text-3xl font-black text-white italic">AUTHENTICATED</h2>
            <p className="text-slate-500 mt-2">Entering the global dashboard...</p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AuthHub;