import { useState, useEffect, useCallback } from 'react';
import { motion, 
  // AnimatePresence 
} from 'framer-motion';
import { 
  User, Heart, History, Settings, LogOut, 
  ExternalLink, Award, Wallet, ShieldCheck, 
  AlertCircle, ChevronRight, Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthProvider';
import axios from 'axios';

// --- TYPES ---
interface DonationRecord {
  _id: string;
  projectName: string;
  amount: number;
  date: string;
  status: 'Successful' | 'Pending' | 'Failed';
}

interface UserStats {
  totalDonated: number;
  projectsCount: number;
  impactScore: number;
  recentDonations: DonationRecord[];
}

const UserDashboard = () => {
  const { user, loading: authLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- DATA FETCHING ---
  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      // Fetches aggregated data from your MERN backend
      const response = await axios.get('/api/user/profile-stats');
      setStats(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to sync with secure server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) fetchDashboardData();
  }, [user, fetchDashboardData]);

  // --- UI GUARDS ---
  if (authLoading || loading) {
    return (
      <div className="h-screen bg-slate-950 flex flex-col items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full mb-6"
        />
        <p className="text-[10px] text-yellow-400 font-black tracking-[0.3em] uppercase animate-pulse">
          Decrypting User Profile...
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white font-sans selection:bg-yellow-400 selection:text-slate-950">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-20 md:w-72 bg-slate-900/40 border-r border-white/5 flex flex-col py-8 px-4 backdrop-blur-xl">
        <div className="flex items-center gap-4 px-4 mb-12">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative w-12 h-12 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-yellow-400 font-black text-xl italic">
              {user?.name?.[0]}
            </div>
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-black tracking-tight truncate w-40 uppercase italic">{user?.name}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <ShieldCheck size={10} className="text-yellow-400" />
              <p className="text-[9px] text-slate-500 font-bold tracking-widest uppercase">{user?.role}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1.5">
          <SidebarLink icon={<User size={18}/>} label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <SidebarLink icon={<History size={18}/>} label="Donation History" active={activeTab === 'donations'} onClick={() => setActiveTab('donations')} />
          <SidebarLink icon={<Award size={18}/>} label="Impact Rewards" active={activeTab === 'impact'} onClick={() => setActiveTab('impact')} />
          <SidebarLink icon={<Settings size={18}/>} label="Security" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>

        <button 
          onClick={logout}
          className="flex items-center gap-4 px-4 py-4 text-slate-500 hover:text-red-400 transition-all mt-auto group rounded-2xl hover:bg-red-400/5"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="hidden md:block font-black uppercase text-[10px] tracking-widest">Sign Out</span>
        </button>
      </aside>

      {/* MAIN DASHBOARD SPACE */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto overflow-x-hidden">
        
        {/* TOP HEADER */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
          <div>
            <h2 className="text-[10px] font-black text-yellow-400 uppercase tracking-[0.4em] mb-3">Vanguard Member Portal</h2>
            <h1 className="text-5xl font-black italic tracking-tighter uppercase">
              Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-slate-600">{user?.name?.split(' ')[0]}</span>
            </h1>
          </div>
          {error && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-4 rounded-2xl text-red-400 text-xs font-bold uppercase italic animate-bounce">
              <AlertCircle size={16} /> {error}
            </div>
          )}
        </header>

        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            
            {/* KPI GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <StatCard label="Life Contributions" value={`$${stats?.totalDonated.toLocaleString() || '0'}`} icon={<Wallet className="text-green-400"/>} trend="+12% this month" />
              <StatCard label="Supported Missions" value={stats?.projectsCount || '0'} icon={<Heart className="text-red-400"/>} />
              <StatCard label="Global Influence" value={`${stats?.impactScore || '0'}%`} icon={<Award className="text-yellow-400"/>} />
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
              {/* RECENT ACTIVITY TABLE */}
              <div className="lg:col-span-8 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-black italic uppercase tracking-widest">Recent Activity</h3>
                  <button onClick={() => setActiveTab('donations')} className="text-[10px] font-bold text-yellow-400 hover:underline uppercase tracking-widest flex items-center gap-1">
                    View All <ChevronRight size={12}/>
                  </button>
                </div>
                
                <div className="space-y-4">
                  {stats?.recentDonations && stats.recentDonations.length > 0 ? (
                    stats.recentDonations.map((item) => (
                      <div key={item._id} className="group flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 rounded-3xl border border-white/5 transition-all cursor-default">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-yellow-400/10 rounded-2xl text-yellow-400 group-hover:scale-110 transition-transform">
                            <Clock size={20}/>
                          </div>
                          <div>
                            <p className="text-sm font-black uppercase italic tracking-tight">{item.projectName}</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase">{new Date(item.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-white italic tracking-tighter">+${item.amount}</p>
                          <p className={`text-[9px] font-bold uppercase tracking-widest ${item.status === 'Successful' ? 'text-green-500' : 'text-orange-500'}`}>{item.status}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">No transaction data available</p>
                    </div>
                  )}
                </div>
              </div>

              {/* ACTION CALLOUT */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 rounded-[2.5rem] p-8 shadow-2xl shadow-orange-500/10 h-full flex flex-col">
                  <h3 className="text-3xl font-black text-slate-950 italic mb-4 leading-none uppercase">Urgent Mission</h3>
                  <p className="text-slate-900 text-sm font-bold leading-relaxed mb-8">
                    A community resilience project in Lagos requires immediate funding verification. Your contribution status unlocks extra impact points.
                  </p>
                  <button className="mt-auto w-full py-4 bg-slate-950 text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:scale-105 transition-all uppercase italic tracking-widest text-xs">
                    Start Mission <ExternalLink size={16}/>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </main>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const SidebarLink = ({ icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${
      active 
        ? 'bg-yellow-400 text-slate-950 font-black italic shadow-lg shadow-yellow-400/20' 
        : 'text-slate-500 hover:text-white hover:bg-white/5'
    }`}
  >
    <span className={`${active ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>{icon}</span>
    <span className="hidden md:block text-[10px] uppercase font-black tracking-widest">{label}</span>
  </button>
);

const StatCard = ({ label, value, icon, trend }: any) => (
  <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
      {icon}
    </div>
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 bg-white/5 rounded-2xl text-slate-400">{icon}</div>
      <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">{label}</p>
    </div>
    <div className="flex items-end justify-between">
      <p className="text-4xl font-black italic tracking-tighter">{value}</p>
      {trend && <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">{trend}</span>}
    </div>
  </div>
);

export default UserDashboard;















// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { 
//   User, Heart, History, Settings, LogOut, 
//   ExternalLink, Award, Wallet 
// } from 'lucide-react';
// import { useAuth } from '../../context/AuthProvider';
// // import { useAuth } from '../../context/Auth1';
// // import theme from '../../components/themes/Theme';

// const UserDashboard = () => {
//   const [activeTab, setActiveTab] = useState('overview');

//   // Mock data - in production, this comes from your useAuth() hook and API
//   const userData = {
//     name: "John Doe",
//     joined: "March 2024",
//     totalDonated: 1250,
//     projectsSupported: 4,
//     impactScore: 85
//   };

//   const { user, loading } = useAuth();

//     <div className="p-8">
//       <div className="flex items-center gap-4 mb-8">
//         <h1 className="text-3xl font-bold text-white uppercase italic">
//           Welcome, {user?.name}
//         </h1>
        
//         {/* ROLE BADGE */}
//         <span className={`px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border ${
//           user?.role === 'seniorAdmin' 
//             ? 'bg-purple-500/20 text-purple-400 border-purple-500/50' 
//             : user?.role === 'admin'
//             ? 'bg-blue-500/20 text-blue-400 border-blue-500/50'
//             : 'bg-yellow-400/20 text-yellow-400 border-yellow-400/50'
//         }`}>
//           {user?.role} Access
//         </span>
//       </div>
      
//       <p className="text-slate-400">
//         Logged in as: <span className="text-white font-mono">{user?.email}</span>
//       </p>
//     </div>
  


//   // const user = ('');

//   // 1. Prevent the "Flash" of empty content or login redirect
//   if (loading) {
//     return (
//       <div className="h-screen bg-slate-950 flex items-center justify-center">
//         <motion.div 
//           animate={{ rotate: 360 }} 
//           transition={{ repeat: Infinity, duration: 1 }}
//           className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full"
//         />
//       </div>
//     );
//   }

//   // 2. If no user after loading, ProtectedRoute will handle redirect
//   // if (!user) return null;

//   return (
//     <div className="flex min-h-screen bg-slate-950 text-white">

//       {/* SIDEBAR */}
//       <aside className="w-20 md:w-64 bg-slate-900/50 border-r border-white/5 flex flex-col py-8 px-4">
//         <div className="flex items-center gap-3 px-4 mb-10">
//           <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-slate-950 font-bold">
//             {userData.name[0]}
//           </div>
//           <div className="hidden md:block">
//             <p className="text-sm font-bold truncate">{userData.name}</p>
//             <p className="text-[10px] text-slate-500 uppercase">Regular Member</p>
//           </div>
//         </div>

//         <nav className="flex-1 space-y-2">
//           <SidebarItem 
//             icon={<User size={20}/>} label="Overview" 
//             active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} 
//           />
//           <SidebarItem 
//             icon={<History size={20}/>} label="Donations" 
//             active={activeTab === 'donations'} onClick={() => setActiveTab('donations')} 
//           />
//           <SidebarItem 
//             icon={<Award size={20}/>} label="Impact" 
//             active={activeTab === 'impact'} onClick={() => setActiveTab('impact')} 
//           />
//           <SidebarItem 
//             icon={<Settings size={20}/>} label="Settings" 
//             active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} 
//           />
//         </nav>

//         <button className="flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all mt-auto">
//           <LogOut size={20}/> <span className="hidden md:block font-bold">Logout</span>
//         </button>
//       </aside>

//       {/* MAIN CONTENT */}
//       <main className="flex-1 p-6 md:p-10 overflow-y-auto">
//         <header className="mb-10 flex justify-between items-end">
//           <div>
//             <h1 className="text-3xl font-bold">Welcome back, {userData.name.split(' ')[0]}!</h1>
//             <p className="text-slate-400">Here's the impact you've made so far.</p>
//           </div>
//           <div className="hidden md:block text-right">
//             <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Member Since</p>
//             <p className="text-yellow-400 font-bold">{userData.joined}</p>
//           </div>
//         </header>

//         {activeTab === 'overview' && (
//           <div className="space-y-8">
//             {/* STAT CARDS */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <StatCard label="Total Contributions" value={`$${userData.totalDonated}`} icon={<Wallet className="text-green-400"/>} />
//               <StatCard label="Projects Impacted" value={userData.projectsSupported} icon={<Heart className="text-red-400"/>} />
//               <StatCard label="Impact Score" value={`${userData.impactScore}%`} icon={<Award className="text-yellow-400"/>} />
//             </div>

//             {/* RECENT ACTIVITY */}
//             <div className="grid lg:grid-cols-2 gap-8">
//               <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
//                 <h3 className="text-lg font-bold mb-4">Recent Donations</h3>
//                 <div className="space-y-4">
//                   {[1, 2].map((i) => (
//                     <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
//                       <div className="flex items-center gap-3">
//                         <div className="p-2 bg-yellow-400/10 rounded-lg text-yellow-400"><Heart size={18}/></div>
//                         <div>
//                           <p className="text-sm font-bold">Clean Water Project</p>
//                           <p className="text-xs text-slate-500">2 days ago</p>
//                         </div>
//                       </div>
//                       <p className="font-bold">+$250.00</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* UPCOMING EVENTS / NEWS */}
//               <div className="bg-linear-to-br from-blue-600/20 to-purple-600/20 border border-white/10 rounded-3xl p-6 flex flex-col justify-between">
//                 <div>
//                   <h3 className="text-lg font-bold mb-2">Volunteer Opportunity</h3>
//                   <p className="text-slate-300 text-sm leading-relaxed">
//                     A new community project in Lagos is looking for technical mentors. Your skills match this role!
//                   </p>
//                 </div>
//                 <button className="mt-6 w-full py-3 bg-white text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-400 transition-all">
//                   Apply Now <ExternalLink size={16}/>
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// // HELPER COMPONENTS
// const SidebarItem = ({ icon, label, active, onClick }: any) => (
//   <button
//     onClick={onClick}
//     className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
//       active ? 'bg-yellow-400 text-slate-950 font-bold' : 'text-slate-400 hover:bg-white/5'
//     }`}
//   >
//     {icon} <span className="hidden md:block">{label}</span>
//   </button>
// );

// const StatCard = ({ label, value, icon }: any) => (
//   <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
//     <div className="flex items-center gap-3 mb-4">
//       <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
//       <p className="text-sm text-slate-400 font-medium">{label}</p>
//     </div>
//     <p className="text-3xl font-bold">{value}</p>
//   </div>
// );

// export default UserDashboard;