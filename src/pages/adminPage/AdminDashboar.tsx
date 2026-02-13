import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, MessageSquare, Briefcase, HeartHandshake, 
  FileEdit, Mail, LogOut, ShieldAlert
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthProvider';

// Component Imports
import DonationManager from '../seniorAdmin/DonationManager';
import BlogApprovalManager from './BlogApprovalManager';
import NewsletterList from './NewsletterList';
import JobApplications from './JobApplications';
import ContactMessages from './ContactMessagesSupport';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [adminStats, setAdminStats] = useState({ pendingBlogs: 0, newMessages: 0, activeJobs: 0 });

  useEffect(() => {
    const getAdminBriefing = async () => {
      try {
        const res = await axios.get('/api/admin/briefing');
        setAdminStats(res.data);
      } catch (err) {
        console.error("Critical: Admin stats sync failed");
      }
    };
    getAdminBriefing();
  }, []);

  const menuItems = [
    { id: 'overview', label: 'Command Center', icon: <LayoutDashboard size={18}/> },
    { id: 'donations', label: 'Donations', icon: <HeartHandshake size={18}/> },
    { id: 'blogs', label: 'Blog Feed', icon: <FileEdit size={18}/>, badge: adminStats.pendingBlogs },
    { id: 'jobs', label: 'Careers', icon: <Briefcase size={18}/> },
    { id: 'messages', label: 'Intel/Inquiry', icon: <MessageSquare size={18}/>, badge: adminStats.newMessages },
    { id: 'newsletter', label: 'Subscribers', icon: <Mail size={18}/> },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-white font-sans selection:bg-yellow-400 selection:text-slate-950">
      {/* ADMIN SIDEBAR */}
      <aside className="w-64 bg-slate-900 border-r border-white/5 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-10">
          <ShieldAlert className="text-yellow-400" size={24} />
          <div className="text-xl font-black text-white italic tracking-tighter">VANGUARD<span className="text-yellow-400">OS</span></div>
        </div>

        <nav className="space-y-1 flex-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                activeTab === item.id 
                  ? 'bg-yellow-400 text-slate-950 font-black italic shadow-lg shadow-yellow-400/10' 
                  : 'hover:bg-white/5 text-slate-500 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-4">
                {item.icon} <span className="text-xs uppercase tracking-widest">{item.label}</span>
              </div>
              {(item.badge ?? 0) > 0 && (
                <span className="w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <button onClick={logout} className="mt-auto flex items-center gap-4 px-4 py-4 text-slate-500 hover:text-red-400 transition-colors uppercase text-[10px] font-black tracking-[0.2em]">
          <LogOut size={16}/> Sign Out
        </button>
      </aside>

      {/* ADMIN WORKSPACE */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-start mb-12">
          <div>
            <h2 className="text-[10px] font-black text-yellow-400 uppercase tracking-[0.3em] mb-2">Authenticated System Access</h2>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">
              Admin: <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">{user?.name}</span>
            </h1>
          </div>
          
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-right">
              <p className="text-[9px] text-slate-500 uppercase font-black">Clearance Level</p>
              <p className="text-sm font-black text-white italic uppercase tracking-widest">{user?.role}</p>
            </div>
          </div>
        </header>

        {/* TAB RENDERING */}
        <div className="min-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
               <QuickStats label="Global Donations" val="$245.9k" />
               <QuickStats label="Avg Contribution" val="$1.2k" />
               <QuickStats label="Success Rate" val="94%" />
               <QuickStats label="System Uptime" val="99.9%" />
            </div>
          )}
          {activeTab === 'donations' && <DonationManager />}
          {activeTab === 'blogs' && <BlogApprovalManager />}
          {activeTab === 'newsletter' && <NewsletterList />}
          {activeTab === 'job' && <JobApplications />}
          {activeTab === 'messages' && <ContactMessages />}
        </div>
      </main>
    </div>
  );
};

const QuickStats = ({ label, val }: any) => (
  <div className="p-6 bg-white/5 border border-white/5 rounded-3xl hover:border-yellow-400/30 transition-colors">
    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">{label}</p>
    <p className="text-2xl font-black italic">{val}</p>
  </div>
);

export default AdminDashboard;








// import 
// // React, 
// { useState } from 'react';
// import { 
//   LayoutDashboard, MessageSquare, Briefcase, HeartHandshake, 
//   FileEdit, Mail, 
// //   Trash2, Check, X, Clock 
// } from 'lucide-react';
// import DonationManager from '../seniorAdmin/DonationManager';
// import BlogApprovalManager from './BlogApprovalManager';
// import NewsletterList from './NewsletterList';
// import JobApplications from './JobApplications';
// import ContactMessages from './ContactMessagesSupport';
// import { useAuth } from '../../context/AuthProvider';

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState('overview');

//   const menuItems = [
//     { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20}/> },
//     { id: 'donations', label: 'Donations', icon: <HeartHandshake size={20}/> },
//     { id: 'blogs', label: 'Blog Approvals', icon: <FileEdit size={20}/> },
//     { id: 'jobs', label: 'Job Applications', icon: <Briefcase size={20}/> },
//     { id: 'messages', label: 'Contact Messages', icon: <MessageSquare size={20}/> },
//     { id: 'newsletter', label: 'Subscribers', icon: <Mail size={20}/> },
//   ];

//   const { user,
//     // loading 
//   } = useAuth();

//   return (
//     <div className="flex min-h-screen bg-slate-950 text-white">

//       <div className="p-8">
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



//       {/* SIDEBAR */}
//       <aside className="w-64 bg-slate-900 border-r border-white/5 p-6 space-y-8">
//         <div className="text-2xl font-black text-yellow-400 italic">ADMIN PANEL</div>
//         <nav className="space-y-2">
//           {menuItems.map((item) => (
//             <button
//               key={item.id}
//               onClick={() => setActiveTab(item.id)}
//               className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
//                 activeTab === item.id ? 'bg-yellow-400 text-slate-950 font-bold' : 'hover:bg-white/5 text-slate-400'
//               }`}
//             >
//               {item.icon} {item.label}
//             </button>
//           ))}
//         </nav>
//       </aside>

//       {/* MAIN CONTENT AREA */}
//       <main className="flex-1 p-8 overflow-y-auto">
//         {activeTab === 'donations' && <DonationManager />}
//         {activeTab === 'blogs' && <BlogApprovalManager />}
//         {activeTab === 'newsletter' && <NewsletterList />}
//         {activeTab === 'job' && <JobApplications />}
//         {activeTab === 'messages' && <ContactMessages />}
//         {/* Other components go here... */}
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;