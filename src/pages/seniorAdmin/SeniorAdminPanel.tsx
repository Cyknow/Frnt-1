import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  // UserCheck, 
  Trash2, Activity, 
  ArrowUpCircle, ArrowDownCircle, Search, 
  // Filter 
} from 'lucide-react';
import { useAuth } from '../../context/AuthProvider';

// Mock Data for the Senior Admin
const MOCK_USERS = [
  { id: '1', name: 'John Doe', email: 'john@aic.org', role: 'user', joined: '2026-01-10' },
  { id: '2', name: 'Sarah Admin', email: 'sarah@aic.org', role: 'admin', joined: '2025-12-01' },
  { id: '3', name: 'Chief Vanguard', email: 'boss@aic.org', role: 'senior-admin', joined: '2025-11-20' },
];

const MOCK_LOGS = [
  { id: 'L1', user: 'Sarah Admin', action: 'Approved Grant #GR-8821', time: '2 mins ago', level: 'info' },
  { id: 'L2', user: 'John Doe', action: 'Updated Profile Photo', time: '45 mins ago', level: 'user' },
  { id: 'L3', user: 'System', action: 'Failed Login Attempt - IP: 192.168.1.1', time: '1 hour ago', level: 'danger' },
];

const SeniorAdminPanel = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState(MOCK_USERS);
  const [activeTab, setActiveTab] = useState('members');

  const updateRole = (id: string, newRole: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
    // In production, call: axios.patch(`/api/admin/role/${id}`, { role: newRole })
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-black italic uppercase">System Command</h1>
            <p className="text-slate-500 text-sm">Welcome, Senior Admin {currentUser?.name}</p>
          </div>
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
            <button onClick={() => setActiveTab('members')} className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'members' ? 'bg-yellow-400 text-slate-950' : 'text-slate-500'}`}>MEMBERS</button>
            <button onClick={() => setActiveTab('logs')} className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'logs' ? 'bg-yellow-400 text-slate-950' : 'text-slate-500'}`}>ACTIVITY LOGS</button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'members' ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="members">
              <div className="bg-white/5 border border-white/10 rounded-2rem overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-[10px] uppercase text-slate-400">
                    <tr>
                      <th className="p-6">Member</th>
                      <th className="p-6">Access Level</th>
                      <th className="p-6">Joined Date</th>
                      <th className="p-6 text-right">Clearance Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {users.map(u => (
                      <tr key={u.id} className="hover:bg-white/2">
                        <td className="p-6">
                          <p className="font-bold">{u.name}</p>
                          <p className="text-xs text-slate-500">{u.email}</p>
                        </td>
                        <td className="p-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                            u.role === 'senior-admin' ? 'bg-purple-500/20 text-purple-400' : 
                            u.role === 'admin' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-500/20 text-slate-400'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="p-6 text-slate-400 text-sm">{u.joined}</td>
                        <td className="p-6 text-right">
                          <div className="flex justify-end gap-2">
                            {u.role === 'user' && (
                              <button onClick={() => updateRole(u.id, 'admin')} className="p-2 hover:text-yellow-400 text-slate-500 transition-colors" title="Promote to Admin">
                                <ArrowUpCircle size={20} />
                              </button>
                            )}
                            {u.role === 'admin' && (
                              <button onClick={() => updateRole(u.id, 'user')} className="p-2 hover:text-red-400 text-slate-500 transition-colors" title="Demote to User">
                                <ArrowDownCircle size={20} />
                              </button>
                            )}
                            <button className="p-2 hover:text-red-600 text-slate-500"><Trash2 size={20} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="logs" className="space-y-4">
              {MOCK_LOGS.map(log => (
                <div key={log.id} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between group hover:border-yellow-400/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${log.level === 'danger' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}`}>
                      {log.level === 'danger' ? <ShieldAlert size={20} /> : <Activity size={20} />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white"><span className="text-yellow-400">{log.user}</span> {log.action}</p>
                      <p className="text-[10px] text-slate-500 uppercase font-medium">{log.time}</p>
                    </div>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 p-2 text-slate-500"><Search size={16} /></button>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SeniorAdminPanel;