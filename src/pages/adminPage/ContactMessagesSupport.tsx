import { MessageCircle, User, 
  // Phone, Tag 
} from 'lucide-react';
import { motion } from 'framer-motion';

const ContactMessages = () => {
  const messages = [
    { 
      id: 1, 
      type: "Partnership", 
      sender: "EcoVanguard NGO", 
      email: "collab@ecovanguard.org",
      content: "We would like to discuss a co-funded project for sustainable irrigation in drylands...",
      date: "2 hours ago"
    },
    { 
      id: 2, 
      type: "General", 
      sender: "Victor Amos", 
      email: "victor@gmail.com",
      content: "How can I become a volunteer in the Lagos district?",
      date: "5 hours ago"
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Inbound Inquiries</h2>
      <div className="grid gap-4">
        {messages.map((msg) => (
          <motion.div 
            whileHover={{ x: 5 }}
            key={msg.id} 
            className="bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden"
          >
            {/* Partnership Badge */}
            <div className={`absolute top-0 right-0 px-4 py-1 text-[10px] font-bold uppercase ${
              msg.type === 'Partnership' ? 'bg-yellow-400 text-slate-950' : 'bg-blue-600 text-white'
            }`}>
              {msg.type}
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <div className="flex items-center gap-2 text-yellow-400">
                <User size={16} /> <span className="font-bold">{msg.sender}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <MessageCircle size={16} /> {msg.email}
              </div>
              <div className="text-slate-500 text-xs md:ml-auto">{msg.date}</div>
            </div>

            <p className="text-slate-300 bg-black/30 p-4 rounded-xl text-sm leading-relaxed italic border border-white/5">
              "{msg.content}"
            </p>

            <div className="mt-4 flex gap-3">
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-all">
                Mark as Read
              </button>
              <button className="px-4 py-2 bg-yellow-400 text-slate-950 rounded-lg text-xs font-bold hover:scale-105 transition-all">
                Reply Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default ContactMessages;