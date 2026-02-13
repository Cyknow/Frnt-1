import { Trash2, Check, X } from 'lucide-react';

const BlogApprovalManager = () => {
  const blogs = [
    { id: 101, author: "John Doe", title: "Global Climate Action", daysOld: 15, status: "Pending" },
    { id: 102, author: "Jane Poe", title: "New Agro Initiatives", daysOld: 3, status: "Pending" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Blog Submissions</h2>
      <div className="grid gap-4">
        {blogs.map(blog => (
          <div key={blog.id} className="p-6 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">{blog.title}</h3>
                {blog.daysOld > 14 && (
                  <span className="flex items-center gap-1 text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full uppercase">
                    <Trash2 size={10}/> Auto-Delete Scheduled
                  </span>
                )}
              </div>
              <p className="text-slate-400 text-sm">By {blog.author} • {blog.daysOld} days ago</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500 hover:text-white transition-all">
                <Check size={20}/>
              </button>
              <button className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                <X size={20}/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BlogApprovalManager;