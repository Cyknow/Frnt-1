import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthProvider';
import { 
    ShieldCheck, ArrowRight, Globe, 
    Eye, EyeOff, X, CheckCircle2 
} from 'lucide-react';
import theme from '../../components/themes/Theme';


// IMPORT LEGAL CONTENT
import { PrivacyPolicyContent } from '../../components/constants/PrivacyPolicy';
import { TermsOfServiceContent } from '../../components/constants/TermsOfService';

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // UI State
  const [showPassword, setShowPassword] = useState(false);
  const [isRobotChecked, setIsRobotChecked] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });
  
  // Modal State
  const [legalModal, setLegalModal] = useState<{show: boolean, type: 'terms' | 'privacy'}>({
    show: false,
    type: 'terms'
  });

  const activeContent = (legalModal.type === 'terms' ? TermsOfServiceContent : PrivacyPolicyContent) || { title: '', sections: [], lastUpdated: '' };
  const inputStyles = "w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-yellow-400 transition-all placeholder:text-slate-600 text-sm";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isRobotChecked || !agreedToTerms) return;
    
    setError('');
    setLoading(true);
    
    try {
      // 1. BACKEND CALL
      const response = await axios.post('/auth/signup', formData);
      // const { token, user } = response.data;   // Destructure for clarity
      // 'token' is direct, 'user' is inside 'data'
      const token = response.data.token; 
      const user = response.data.data.user;
      // 3. STORE TOKEN LOCALLY
      // This is crucial so the Interceptor can find it on the next page load
      if (token) {
        localStorage.setItem('token', token);
      }
      
      // 2. TRIGGER SUCCESS UI
      setIsSuccess(true);
      
      // 3. ROLE-BASED NAVIGATION BRIDGE
      setTimeout(() => {
        // 4. Update Global Auth State
        login(token, user);
        // login(response.data.token, response.data.user);
        
        const role = user.role;
        if (role === 'senior-admin') {
          navigate('/admin/command');
        } else if (role === 'admin') {
          navigate('/admin/grants');
        } else {
          navigate('/userDb');
        }
      }, 3000);

    } catch (err: any) {
      setError(err.response?.data?.message || 'A secure connection error occurred. Please check your internet connection and try again.');
      
      // if (!window.navigator.onLine) {
      // setError('Network Disconnected. Please check your internet connection.');
      // } else if (!err.response) {
      //   // This happens if the server is down or the URL is wrong
      //   setError('Communication with the Vanguard server failed. The server may be offline.');
      // } else {
      //   // This is the actual message from your Backend (e.g., "Password too short")
      //   setError(err.response.data.message || 'The movement encountered an error.');
      // }
        
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans bg-slate-950">
      
      {/* VIDEO BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-40 grayscale">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-hand-shaking-hands-in-the-field-42358-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent" />
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 py-10">
        
        {/* LEFT SIDE: THE PITCH */}
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="text-white space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold uppercase tracking-widest">
            <Globe size={14} /> Global Impact Network
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight italic">
            Stop Watching. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Start Leading.
            </span>
          </h1>
          <p className="text-lg text-slate-300 max-w-lg leading-relaxed">
            History isn't made by those who stand by. Join 50,000+ visionaries funding sustainable resilience across the globe.
          </p>
        </motion.div>

        {/* RIGHT SIDE: SIGNUP CARD */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/10 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] border border-white/20 shadow-2xl w-full max-w-xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white uppercase italic">Join the Vanguard</h2>
            {error && <p className="text-red-500 text-[10px] mt-2 bg-red-500/10 p-2 rounded-lg font-bold border border-red-500/20 uppercase tracking-tighter">{error}</p>}
          </div>

          <form className="space-y-4" onSubmit={handleSignup}>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Full Name</label>
                    <input name="name" type="text" value={formData.name} onChange={handleChange} required placeholder="Jane Doe" className={inputStyles} />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Phone Number</label>
                    <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="+234..." className={inputStyles} />
                </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Email Address</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="jane@vanguard.com" className={inputStyles} />
            </div>

            <div className="space-y-1 relative">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Password</label>
              <div className="relative">
                <input name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} required placeholder="••••••••" className={`${inputStyles} pr-12`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-yellow-400 transition-colors">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-3 py-1">
                <input type="checkbox" id="terms" checked={agreedToTerms} onChange={() => setAgreedToTerms(!agreedToTerms)} className="mt-1 accent-yellow-400 w-4 h-4 cursor-pointer" />
                <label htmlFor="terms" className="text-xs text-slate-400 leading-tight">
                    I agree to the <button type="button" onClick={() => setLegalModal({show: true, type: 'terms'})} className="text-yellow-400 underline">Terms</button> and <button type="button" onClick={() => setLegalModal({show: true, type: 'privacy'})}className="text-yellow-400 underline">Privacy Policy</button>.
                </label>
            </div>

            <div className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${isRobotChecked ? 'bg-green-500/10 border-green-500/30' : 'bg-black/20 border-white/5'}`}>
                <div className="flex items-center gap-3">
                    <input type="checkbox" className="w-5 h-5 accent-green-500 cursor-pointer" onChange={(e) => setIsRobotChecked(e.target.checked)} />
                    <span className="text-sm font-medium text-slate-300 uppercase italic text-[10px] tracking-widest">Verify Humanity</span>
                </div>
                <ShieldCheck size={20} className={isRobotChecked ? 'text-green-500' : 'text-slate-600'} />
            </div>

            <motion.button 
              type="submit"
              disabled={!isRobotChecked || !agreedToTerms || loading}
              className={`w-full py-4 rounded-2xl font-black text-slate-950 flex items-center justify-center gap-2 mt-4 transition-all shadow-xl 
                ${isRobotChecked && agreedToTerms && !loading ? 'opacity-100' : 'opacity-40 cursor-not-allowed grayscale'}`}
              style={{ background: theme.gold }}
            >
              {loading ? 'ENCRYPTING...' : 'CREATE ACCOUNT'} <ArrowRight size={20} />
            </motion.button>
          </form>

          <p className="text-center mt-6 text-sm text-slate-500 uppercase font-bold tracking-tighter">
            Already a member? <a href="/signinp" className="text-yellow-400 hover:underline">Log In</a>
          </p>
        </motion.div>
      </div>

      {/* LEGAL MODAL */}
      <AnimatePresence>
        {legalModal.show && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLegalModal({ ...legalModal, show: false })} className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-slate-900 border border-white/10 p-8 rounded-[2.5rem] max-w-xl w-full shadow-2xl max-h-[85vh] overflow-hidden flex flex-col">
              <button onClick={() => setLegalModal({ ...legalModal, show: false })} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"><X size={24} /></button>
              <h3 className="text-3xl font-black text-white mb-1 italic uppercase">{activeContent.title}</h3>
              <p className="text-[10px] text-yellow-400 font-bold mb-6 tracking-widest uppercase">LAST UPDATED: {activeContent.lastUpdated}</p>
              <div className="space-y-6 text-slate-400 text-sm leading-relaxed overflow-y-auto pr-4">
                {activeContent.sections?.map((section, idx) => (
                  <div key={idx}><h4 className="text-white font-bold mb-2 uppercase italic text-xs">{section.heading}</h4><p>{section.body}</p></div>
                ))}
              </div>
              <button onClick={() => { if(legalModal.type === 'terms') setAgreedToTerms(true); setLegalModal({ ...legalModal, show: false }); }} className="w-full mt-8 py-4 bg-yellow-400 text-slate-950 font-black rounded-2xl shadow-lg">ACKNOWLEDGE</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SUCCESS OVERLAY */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[200] bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
            <div className="relative mb-8">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 bg-yellow-400/20 blur-3xl rounded-full" />
              <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} className="w-24 h-24 bg-yellow-400 rounded-3xl flex items-center justify-center relative z-10 shadow-[0_0_50px_rgba(250,204,21,0.4)]">
                <CheckCircle2 size={48} className="text-slate-950" />
              </motion.div>
            </div>
            <h2 className="text-4xl font-black text-white italic mb-4 uppercase">Identity Confirmed</h2>
            <p className="text-slate-400 max-w-xs leading-relaxed uppercase text-[10px] tracking-widest font-bold">Your profile is being encrypted. Preparing your global impact dashboard...</p>
            <div className="w-48 h-1 bg-white/10 rounded-full mt-8 overflow-hidden">
              <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 2.5, ease: "easeInOut" }} className="h-full bg-yellow-400" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SignupPage;







// import 
// // React, 
// { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// // import { useAuth } from '../../context/AuthProvider';
// import { 
//     ShieldCheck, 
//     ArrowRight, 
//     Globe, 
//     Eye, 
//     EyeOff, 
//     // Phone,
//     X,
//     CheckCircle2
// } from 'lucide-react';
// import theme from '../../components/themes/Theme';
// // IMPORT LEGAL CONTENT
// import { PrivacyPolicyContent } from '../../components/constants/PrivacyPolicy';
// import { TermsOfServiceContent } from '../../components/constants/TermsOfService';

// const SignupPage = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [isRobotChecked, setIsRobotChecked] = useState(false);
//   const [agreedToTerms, setAgreedToTerms] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
  
//   // Input styling constant to avoid repetition
//   const inputStyles = "w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-yellow-400 transition-all placeholder:text-slate-600 text-sm";

//   const containerVariants = {
//     hidden: { opacity: 0, x: -50 },
//     visible: { opacity: 1, x: 0, transition: { duration: 0.8, staggerChildren: 0.1 } }
//   };

// // Modal State
//   const [legalModal, setLegalModal] = useState<{show: boolean, type: 'terms' | 'privacy'}>({
//     show: false,
//     type: 'terms'
//   });

//   const activeContent = legalModal.type === 'terms' ? TermsOfServiceContent : PrivacyPolicyContent;

  
//   const handleSignup = () => {
//   // Simulate API call logic
//   setIsSuccess(true);
//   setTimeout(() => {
//     // Redirect to dashboard after the animation plays
//     window.location.href = "/userDb";
//   }, 3000);
// };

//   return (
//     <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans">
      
//       {/* 1. VIDEO BACKGROUND */}
//       <div className="absolute inset-0 -z-10 bg-slate-950">
//         <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-40 grayscale">
//           <source src="https://assets.mixkit.co/videos/preview/mixkit-hand-shaking-hands-in-the-field-42358-large.mp4" type="video/mp4" />
//         </video>
//         <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/70 to-transparent" />
//       </div>

//       <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 py-10">
        
//         {/* LEFT SIDE: THE MOVEMENT PITCH */}
//         <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-white space-y-8">
//           <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold uppercase tracking-widest">
//             <Globe size={14} /> Global Impact Network
//           </div>
//           <h1 className="text-5xl md:text-7xl font-black leading-tight italic">
//             Stop Watching. <br />
//             <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-600">
//               Start Leading.
//             </span>
//           </h1>
//           <p className="text-lg text-slate-300 max-w-lg leading-relaxed">
//             History isn't made by those who stand by. Join 50,000+ visionaries funding sustainable resilience across the globe.
//           </p>
//         </motion.div>

//         {/* RIGHT SIDE: THE SIGNUP BOX */}
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="bg-white/10 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] border border-white/20 shadow-2xl w-full max-w-xl mx-auto"
//         >
//           <div className="mb-6">
//             <h2 className="text-2xl font-bold text-white">Join the Vanguard</h2>
//             <p className="text-slate-400 text-sm">Secure your position in the movement.</p>
//           </div>

//           <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
//             <div className="grid md:grid-cols-2 gap-4">
//                 <div className="space-y-1">
//                     <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Full Name</label>
//                     <input type="text" placeholder="Jane Doe" className={inputStyles} />
//                 </div>
//                 <div className="space-y-1">
//                     <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Phone Number</label>
//                     <input type="tel" placeholder="+234..." className={inputStyles} />
//                 </div>
//             </div>

//             <div className="space-y-1">
//               <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Email Address</label>
//               <input type="email" placeholder="jane@example.com" className={inputStyles} />
//             </div>

//             <div className="space-y-1 relative">
//               <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Password</label>
//               <div className="relative">
//                 <input 
//                     type={showPassword ? "text" : "password"} 
//                     placeholder="••••••••" 
//                     className={`${inputStyles} pr-12`} 
//                 />
//                 <button 
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-yellow-400 transition-colors"
//                 >
//                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//             </div>

//             {/* TERMS CHECKBOX */}
//             <div className="flex items-start gap-3 py-1">
//                 <input 
//                     type="checkbox" 
//                     id="terms" 
//                     checked={agreedToTerms}
//                     onChange={() => setAgreedToTerms(!agreedToTerms)}
//                     className="mt-1 accent-yellow-400 w-4 h-4 cursor-pointer"
//                 />
//                 <label htmlFor="terms" className="text-xs text-slate-400 leading-tight">
//                     I agree to the <button type="button" onClick={() => setLegalModal({show: true, type: 'terms'})} className="text-yellow-400 underline decoration-yellow-400/30">Terms of Service</button> and <button type="button" onClick={() => setLegalModal({show: true, type: 'privacy'})}className="text-yellow-400 underline decoration-yellow-400/30">Privacy Policy</button>.
//                 </label>
//             </div>

//             {/* HUMAN VERIFICATION/BOT CHECK & SUBMIT BUTTON */}
//             <div className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${isRobotChecked ? 'bg-green-500/10 border-green-500/30' : 'bg-black/20 border-white/5'}`}>
//                 <div className="flex items-center gap-3">
//                     <input 
//                         type="checkbox" 
//                         className="w-5 h-5 accent-green-500 cursor-pointer" 
//                         onChange={(e) => setIsRobotChecked(e.target.checked)}
//                     />
//                     <span className="text-sm font-medium text-slate-300">I am a human visitor</span>
//                 </div>
//                 <ShieldCheck size={20} className={isRobotChecked ? 'text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 'text-slate-600'} />
//             </div>

//             <motion.button 
//               onClick={handleSignup}
//               disabled={!isRobotChecked || !agreedToTerms}
//               whileHover={isRobotChecked && agreedToTerms ? { scale: 1.02 } : {}}
//               whileTap={isRobotChecked && agreedToTerms ? { scale: 0.98 } : {}}
//               className={`w-full py-4 rounded-2xl font-black text-slate-950 flex items-center justify-center gap-2 mt-4 transition-all shadow-xl 
//                 ${isRobotChecked && agreedToTerms ? 'opacity-100 shadow-yellow-400/20' : 'opacity-40 cursor-not-allowed grayscale'}`}
//               style={{ background: theme.gold }}
//             >
//               CREATE ACCOUNT <ArrowRight size={20} />
//             </motion.button>
//           </form>

//           <p className="text-center mt-6 text-sm text-slate-500">
//             Already a member? <a href="/signinp" className="text-yellow-400 font-bold hover:underline underline-offset-4">Log In</a>
//           </p>
//         </motion.div>
//       </div>

//       {/* TERMS MODAL */}
//       <AnimatePresence>
//         {legalModal.show && (
//           <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
//             <motion.div 
//               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//               onClick={() => setLegalModal({ ...legalModal, show: false })}
//               className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
//             />
//             <motion.div 
//               initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               className="relative bg-slate-900 border border-white/10 p-8 rounded-[2.5rem] max-w-xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
//             >
//               <button onClick={() => setLegalModal({ ...legalModal, show: false })} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors">
//                 <X size={24} />
//               </button>

//               <h3 className="text-3xl font-black text-white mb-1 italic uppercase">{activeContent.title}</h3>
//               <p className="text-[10px] text-yellow-400 font-bold mb-6 tracking-widest uppercase">Last Updated: {activeContent.lastUpdated}</p>
              
//               <div className="space-y-6 text-slate-400 text-sm leading-relaxed overflow-y-auto pr-4 custom-scrollbar">
//                 {activeContent.sections.map((section, idx) => (
//                   <div key={idx}>
//                     <h4 className="text-white font-bold mb-2">{section.heading}</h4>
//                     <p>{section.body}</p>
//                   </div>
//                 ))}
//               </div>

//               <button 
//                 onClick={() => { if(legalModal.type === 'terms') setAgreedToTerms(true); setLegalModal({ ...legalModal, show: false }); }}
//                 className="w-full mt-8 py-4 bg-yellow-400 text-slate-950 font-black rounded-2xl hover:bg-white transition-all shadow-lg"
//               >
//                 {legalModal.type === 'terms' ? 'I AGREE TO TERMS' : 'CLOSE POLICY'}
//               </button>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//           <AnimatePresence>
//       {isSuccess && (
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="fixed inset-0 z-200 bg-slate-950 flex flex-col items-center justify-center p-6 text-center"
//         >
//           {/* Animated Rings */}
//           <div className="relative mb-8">
//             <motion.div 
//               initial={{ scale: 0 }}
//               animate={{ scale: [1, 1.2, 1] }}
//               transition={{ repeat: Infinity, duration: 2 }}
//               className="absolute inset-0 bg-yellow-400/20 blur-3xl rounded-full"
//             />
//             <motion.div 
//               initial={{ scale: 0, rotate: -180 }}
//               animate={{ scale: 1, rotate: 0 }}
//               transition={{ type: "spring", damping: 10 }}
//               className="w-24 h-24 bg-yellow-400 rounded-3xl flex items-center justify-center relative z-10 shadow-[0_0_50px_rgba(250,204,21,0.4)]"
//             >
//               <CheckCircle2 size={48} className="text-slate-950" />
//             </motion.div>
//           </div>

//           <motion.h2 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="text-4xl font-black text-white italic mb-4"
//           >
//             WELCOME TO NEW WORLD FULL OF POSITIVE OPPORTUNITIES
//           </motion.h2>

//           <motion.p 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//             className="text-slate-400 max-w-xs leading-relaxed"
//           >
//             Your profile is being encrypted. Preparing your global impact dashboard...
//           </motion.p>

//           {/* Subtle Loading Progress Bar */}
//           <div className="w-48 h-1 bg-white/10 rounded-full mt-8 overflow-hidden">
//             <motion.div 
//               initial={{ x: "-100%" }}
//               animate={{ x: "0%" }}
//               transition={{ duration: 2.5, ease: "easeInOut" }}
//               className="h-full bg-yellow-400"
//             />
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//     </div>
//   );
// };

// export default SignupPage;





// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useAuth } from '../../context/AuthProvider'; // Using the context we built
// import { 
//     ShieldCheck, 
//     ArrowRight, 
//     Play, 
//     Globe } from 'lucide-react';
// import theme from '../../components/themes/Theme';

// const SignupPage = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//   const { login } = useAuth();

//   const containerVariants = {
//     hidden: { opacity: 0, x: -50 },
//     visible: { opacity: 1, x: 0, transition: { duration: 0.8, staggerChildren: 0.1 } }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 }
//   };

//   return (
//     <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      
//       {/* 1. VIDEO BACKGROUND */}
//       <div className="absolute inset-0 -z-10 bg-slate-950">
//         <video 
//           autoPlay loop muted playsInline 
//           className="w-full h-full object-cover opacity-40 grayscale"
//         >
//           {/* Replace with your video URL - Example: High quality drone footage of nature or community */}
//           <source src="https://assets.mixkit.co/videos/preview/mixkit-hand-shaking-hands-in-the-field-42358-large.mp4" type="video/mp4" />
//         </video>
//         {/* Dark overlay for readability */}
//         <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/70 to-transparent" />
//       </div>

//       <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
//         {/* LEFT SIDE: THE MOVEMENT PITCH */}
//         <motion.div 
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="text-white space-y-8"
//         >
//           <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold uppercase tracking-widest">
//             <Globe size={14} /> Global Impact Network
//           </motion.div>
          
//           <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black leading-tight">
//             Stop Watching. <br />
//             <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-600">
//               Start Leading.
//             </span>
//           </motion.h1>

//           <motion.p variants={itemVariants} className="text-lg text-slate-300 max-w-lg leading-relaxed">
//             History isn't made by those who stand by. It’s made by the 1% who decide to act. Join 50,000+ visionaries funding sustainable resilience across the globe.
//           </motion.p>

//           <motion.div variants={itemVariants} className="flex gap-8 items-center">
//             <div className="text-center">
//               <p className="text-3xl font-bold">120+</p>
//               <p className="text-xs text-slate-500 uppercase">Communities</p>
//             </div>
//             <div className="w-px h-10 bg-white/10" />
//             <div className="text-center">
//               <p className="text-3xl font-bold">92%</p>
//               <p className="text-xs text-slate-500 uppercase">Efficiency</p>
//             </div>
//           </motion.div>
//         </motion.div>

//         {/* RIGHT SIDE: THE SIGNUP BOX */}
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white/10 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white/20 shadow-2xl"
//         >
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold text-white">Create Your Profile</h2>
//             <p className="text-slate-400 text-sm">Takes less than 60 seconds.</p>
//           </div>

//           <form className="space-y-5">
//             <div className="space-y-1">
//               <label className="text-xs font-bold text-slate-400 uppercase ml-1">Full Name</label>
//               <input 
//                 type="text" 
//                 placeholder="Jane Doe"
//                 className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-yellow-400 transition-all placeholder:text-slate-600"
//               />
//             </div>

//             <div className="space-y-1">
//               <label className="text-xs font-bold text-slate-400 uppercase ml-1">Email Address</label>
//               <input 
//                 type="email" 
//                 placeholder="jane@example.com"
//                 className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-yellow-400 transition-all placeholder:text-slate-600"
//               />
//             </div>

//             <div className="space-y-1">
//               <label className="text-xs font-bold text-slate-400 uppercase ml-1">Password</label>
//               <input 
//                 type="password" 
//                 placeholder="••••••••"
//                 className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-yellow-400 transition-all placeholder:text-slate-600"
//               />
//             </div>

//           {/* dont forget to add aggreement to terms and condition, the eye icon for viewing password before submission */}
//                  {/* and input for phone number on signup, then a verify youre not a robot verification before granting access to login */}
//             <motion.button 
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="w-full py-4 rounded-2xl font-black text-slate-950 flex items-center justify-center gap-2 mt-4 transition-all shadow-xl shadow-yellow-400/10"
//               style={{ background: theme.gold }}
//             >
//               JOIN THE MOVEMENT <ArrowRight size={20} />
//             </motion.button>
//           </form>

//           <p className="text-center mt-8 text-sm text-slate-500">
//             Already a member? <a href="/signinp" className="text-yellow-400 font-bold hover:underline">Log In</a>
//           </p>
//         </motion.div>

//       </div>

//       {/* AMBIENT DECORATION */}
//       <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-yellow-400/10 blur-[120px] rounded-full" />
//       <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
//     </div>
//   );
// };

// export default SignupPage;