// import React, { useState, useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';
// import { ShieldCheck, RefreshCcw, ArrowRight, Lock } from 'lucide-react';
// import theme from '../../components/themes/Theme';

// const OTPVerification = () => {
//   const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
//   const [timer, setTimer] = useState(59);
//   const inputRefs = useRef<HTMLInputElement[]>([]);

//   // Auto-focus logic for segmented inputs
//   const handleChange = (element: HTMLInputElement, index: number) => {
//     if (isNaN(Number(element.value))) return false;

//     const newOtp = [...otp];
//     newOtp[index] = element.value;
//     setOtp(newOtp);

//     // Focus next input
//     if (element.value !== "" && index < 5) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="max-w-md w-full bg-white/10 backdrop-blur-2xl border border-white/20 p-8 md:p-12 rounded-[2.5rem] shadow-2xl text-center"
//       >
//         <div className="w-20 h-20 bg-yellow-400/20 rounded-3xl flex items-center justify-center mx-auto mb-8">
//           <ShieldCheck className="text-yellow-400" size={40} />
//         </div>

//         <h1 className="text-3xl font-black text-white mb-2 italic">VERIFY ACCESS</h1>
//         <p className="text-slate-400 text-sm mb-10">
//           We’ve sent a 6-digit authorization code to your secure email.
//         </p>

//         {/* SEGMENTED INPUTS */}
//         <div className="flex justify-between gap-2 mb-8">
//           {otp.map((data, index) => (
//             <input
//               key={index}
//               type="text"
//               maxLength={1}
              
//             //   ref={(el) => (inputRefs.current[index] = el!
//               ref={(el) => {
//                 if (el) inputRefs.current[index] = el;
//               }}
//               value={data}
//               onChange={(e) => handleChange(e.target, index)}
//               onFocus={(e) => e.target.select()}
//               className="w-12 h-14 md:w-14 md:h-16 bg-black/40 border border-white/10 rounded-2xl text-center text-2xl font-bold text-yellow-400 outline-none focus:border-yellow-400 transition-all"
//             />
//           ))}
//         </div>

//         <motion.button
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//           className="w-full py-4 rounded-2xl font-black text-slate-950 flex items-center justify-center gap-2 mb-6"
//           style={{ background: theme.gold }}
//         >
//           VERIFY & CONTINUE <ArrowRight size={20} />
//         </motion.button>

//         <div className="flex items-center justify-center gap-2 text-sm">
//           {timer > 0 ? (
//             <p className="text-slate-500 font-mono">Resend code in {timer}s</p>
//           ) : (
//             <button className="text-yellow-400 font-bold flex items-center gap-2 hover:underline">
//               <RefreshCcw size={14} /> Resend OTP
//             </button>
//           )}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default OTPVerification;