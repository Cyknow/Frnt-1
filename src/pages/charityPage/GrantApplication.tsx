import 
// React, 
{ useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
//   User, Briefcase, GraduationCap, 
//   FileText, Send, 
  ChevronRight, ChevronLeft,
  CheckCircle, CloudUpload
} from 'lucide-react';
// import theme from '../../components/themes/Theme';
import { useAuth } from '../../context/AuthProvider';

const GrantApplication = () => {
const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const inputStyles = "w-full bg-slate-900/50 border border-white/10 rounded-xl px-5 py-3 text-white outline-none focus:border-yellow-400 transition-all text-sm";

  return (
    
    <div className="min-h-screen bg-slate-950 py-20 px-6">
      <div className="max-w-3xl mx-auto">

        {/* WELCOME HEADER */}
        <div className="mb-8 text-center">
          <h4 className="text-yellow-400 font-bold text-xs uppercase tracking-widest">Logged in as {user?.name}</h4>
          <p className="text-slate-500 text-[10px] uppercase">Vanguard ID: {user?.id?.slice(-8)}</p>
        </div>
        
        {/* PROGRESS HEADER */}
        {!isSubmitted && (
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= num ? 'bg-yellow-400 text-slate-950' : 'bg-slate-800 text-slate-500'}`}>
                    {step > num ? <CheckCircle size={20} /> : num}
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-widest ${step >= num ? 'text-white' : 'text-slate-600'}`}>
                    {num === 1 ? 'Identity' : num === 2 ? 'Proposal' : 'Docs'}
                  </span>
                  {num < 3 && <div className="w-12 h-px bg-slate-800 mx-2" />}
                </div>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl"
            >
              {/* STEP 1: PERSONAL & CONTACT */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="mb-8">
                    <h2 className="text-3xl font-black text-white italic">PERSONAL DETAILS</h2>
                    <p className="text-slate-400 text-sm">Tell us who is leading this change.</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Current Occupation</label>
                      <input type="text" placeholder="e.g. Student, Farmer" className={inputStyles} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Country of Residence</label>
                      <input type="text" placeholder="Nigeria" className={inputStyles} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Brief Bio</label>
                    <textarea rows={4} placeholder="Describe your background..." className={inputStyles}></textarea>
                  </div>
                </div>
              )}

              {/* STEP 2: PROJECT / NEED */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="mb-8">
                    <h2 className="text-3xl font-black text-white italic">THE PROPOSAL</h2>
                    <p className="text-slate-400 text-sm">How will this grant scale your impact?</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Grant Type</label>
                    <select className={inputStyles}>
                      <option>Agricultural Sustainability</option>
                      <option>Educational Scholarship</option>
                      <option>Medical Aid</option>
                      <option>Small Business Grant</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Project Goal</label>
                    <textarea rows={5} placeholder="What problem are you solving?" className={inputStyles}></textarea>
                  </div>
                </div>
              )}

              {/* STEP 3: DOCUMENT UPLOAD */}
              {step === 3 && (
                <div className="space-y-6 text-center">
                  <div className="mb-8">
                    <h2 className="text-3xl font-black text-white italic">VERIFICATION</h2>
                    <p className="text-slate-400 text-sm">Upload supporting ID or Proposal PDFs.</p>
                  </div>
                  <div className="border-2 border-dashed border-white/10 rounded-3xl p-12 hover:border-yellow-400/50 transition-colors group cursor-pointer">
                    <CloudUpload size={48} className="mx-auto text-slate-500 group-hover:text-yellow-400 transition-colors mb-4" />
                    <p className="text-white font-bold">Click to upload files</p>
                    <p className="text-slate-500 text-xs mt-2">PDF, PNG, JPG (Max 10MB)</p>
                  </div>
                </div>
              )}

              {/* NAVIGATION BUTTONS */}
              <div className="flex justify-between mt-12">
                {step > 1 ? (
                  <button onClick={prevStep} className="flex items-center gap-2 text-slate-400 font-bold hover:text-white transition-colors">
                    <ChevronLeft size={20} /> BACK
                  </button>
                ) : <div />}
                
                <button 
                  onClick={step === 3 ? () => setIsSubmitted(true) : nextStep}
                  className="px-10 py-4 bg-yellow-400 text-slate-950 font-black rounded-2xl flex items-center gap-2 hover:bg-white transition-all shadow-xl shadow-yellow-400/10"
                >
                  {step === 3 ? 'SUBMIT APPLICATION' : 'CONTINUE'} <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center bg-white/5 border border-white/10 p-16 rounded-[3rem]"
            >
              <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} />
              </div>
              <h2 className="text-4xl font-black text-white italic mb-4 uppercase">Application Received</h2>
              <p className="text-slate-400 max-w-sm mx-auto leading-relaxed">
                Your proposal has been securely transmitted to the AIC Board. You will receive a tracking ID via email shortly.
              </p>
              <button 
                onClick={() => window.location.href = "/dashboard"}
                className="mt-10 px-8 py-4 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/5 transition-all"
              >
                RETURN TO DASHBOARD
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GrantApplication;