import { useAuth } from '../../context/AuthProvider'; // 1. Import your hook

interface Donation {
  id: number;
  donor: string;
  amount: number;
  status: "Successful" | "Pending";
  date: string;
}

// 2. Remove userRole from Props interface
// interface DonationManagerProps {} 

const DonationManager = () => {
  // 3. Get the user role directly from Auth Context
  const { user } = useAuth();
  const userRole = user?.role;

  const donations: Donation[] = [
    { id: 1, donor: "Alice Johnson", amount: 500, status: "Successful", date: "2024-03-20" },
    { id: 2, donor: "Bob Smith", amount: 1200, status: "Pending", date: "2024-03-21" },
    { id: 3, donor: "Charlie Davis", amount: 750, status: "Successful", date: "2024-03-22" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Donation Management</h2>
      <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="p-4">Donor</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {donations.map((d) => (
              <tr key={d.id} className="hover:bg-white/5 transition-colors group">
                <td className="p-4 font-medium text-slate-200">{d.donor}</td>
                <td className="p-4 text-yellow-400 font-semibold">
                  ${d.amount.toLocaleString()}
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    d.status === 'Successful' 
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                      : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                  }`}>
                    {d.status}
                  </span>
                </td>
                <td className="p-4 text-slate-400 text-sm">{d.date}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-md text-xs hover:bg-blue-500 hover:text-white transition-all">
                      Details
                    </button>
                    
                    {/* 4. Logic now uses the context role */}
                    {userRole === 'seniorAdmin' && (
                      <button className="px-3 py-1 bg-red-500/20 text-red-400 rounded-md text-xs hover:bg-red-600 hover:text-white transition-all">
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationManager;










// interface Donation {
//   id: number;
//   donor: string;
//   amount: number;
//   status: "Successful" | "Pending";
//   date: string;
// }

// interface DonationManagerProps {
//   userRole: "regularUser" | "isadmin" | "seniorAdmin";
// }

// const DonationManager = ({ userRole }: DonationManagerProps) => {
//   // In a real app, you'd fetch this from your MERN backend
//   const donations: Donation[] = [
//     { id: 1, donor: "Alice Johnson", amount: 500, status: "Successful", date: "2024-03-20" },
//     { id: 2, donor: "Bob Smith", amount: 1200, status: "Pending", date: "2024-03-21" },
//     { id: 3, donor: "Charlie Davis", amount: 750, status: "Successful", date: "2024-03-22" },
//   ];

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold">Donation Management</h2>
//       <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
//         <table className="w-full text-left">
//           <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider">
//             <tr>
//               <th className="p-4">Donor</th>
//               <th className="p-4">Amount</th>
//               <th className="p-4">Status</th>
//               <th className="p-4">Date</th>
//               <th className="p-4">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-white/5">
//             {donations.map((d) => (
//               <tr key={d.id} className="hover:bg-white/5 transition-colors group">
//                 <td className="p-4 font-medium text-slate-200">{d.donor}</td>
//                 <td className="p-4 text-yellow-400 font-semibold">
//                   ${d.amount.toLocaleString()}
//                 </td>
//                 <td className="p-4">
//                   <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
//                     d.status === 'Successful' 
//                       ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
//                       : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
//                   }`}>
//                     {d.status}
//                   </span>
//                 </td>
//                 <td className="p-4 text-slate-400 text-sm">{d.date}</td>
//                 <td className="p-4">
//                   <div className="flex gap-2">
//                     {/* Standard Admins & Senior Admins can View */}
//                     <button className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-md text-xs hover:bg-blue-500 hover:text-white transition-all">
//                       Details
//                     </button>
                    
//                     {/* ONLY Senior Admin can see the Delete button */}
//                     {userRole === 'seniorAdmin' && (
//                       <button className="px-3 py-1 bg-red-500/20 text-red-400 rounded-md text-xs hover:bg-red-600 hover:text-white transition-all">
//                         Delete
//                       </button>
//                     )}
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DonationManager;