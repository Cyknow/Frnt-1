const JobApplications = () => {
  const applications = [
    { id: 1, name: "Samuel Okon", role: "Field Coordinator", date: "Jan 24, 2026", status: "New" },
    { id: 2, name: "Sarah Jenkins", role: "Agro-Consultant", date: "Jan 22, 2026", status: "Reviewed" },
  ];

  return (
    <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
      <div className="p-6 border-b border-white/10 flex justify-between items-center">
        <h2 className="text-xl font-bold">Recent Applications</h2>
        <span className="text-xs text-slate-400">{applications.length} Applicants Total</span>
      </div>
      <table className="w-full text-left">
        <thead className="bg-slate-900/50 text-slate-500 text-[10px] uppercase tracking-widest">
          <tr>
            <th className="p-4">Applicant</th>
            <th className="p-4">Role</th>
            <th className="p-4">Applied Date</th>
            <th className="p-4">CV</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {applications.map((app) => (
            <tr key={app.id} className="hover:bg-white/5 transition-colors">
              <td className="p-4 font-bold">{app.name}</td>
              <td className="p-4 text-slate-300">{app.role}</td>
              <td className="p-4 text-slate-500 text-sm">{app.date}</td>
              <td className="p-4">
                <button className="text-yellow-400 hover:underline text-xs font-bold uppercase">Download PDF</button>
              </td>
              <td className="p-4">
                <select className="bg-slate-900 border border-white/10 rounded px-2 py-1 text-xs outline-none">
                  <option>Pending</option>
                  <option>Interview</option>
                  <option>Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default JobApplications;