import { Mail } from 'lucide-react';  // Add this import (adjust if using a different icon library like Heroicons)

const NewsletterList = () => {  // Add 'const' for proper function declaration
  const subscribers = ["user1@gmail.com", "user2@yahoo.com", "user3@outlook.com"];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Newsletter Subscribers</h2>
        <button className="px-4 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-all">
          Export CSV
        </button>
      </div>
      <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
        {subscribers.map((email, idx) => (
          <div key={idx} className="py-3 px-4 border-b border-white/5 last:border-0 flex items-center gap-3">
            <Mail size={16} className="text-yellow-400"/>
            {email}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsletterList;