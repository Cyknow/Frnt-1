import { Link, useLocation } from "react-router-dom";
import { motion } from 'framer-motion';

export function Footer() {
  const location = useLocation();

  // Reusable hover/active class
  const linkClass = (path:any) => `
    relative block w-fit transition-all duration-300 hover:text-[#FFD700]
    after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-[#FFD700] 
    after:left-0 after:-bottom-1 after:transition-all after:duration-300
    hover:after:w-full
    ${location.pathname === path ? 'text-[#FFD700] after:w-full font-bold' : 'text-white/80'}
  `;

  return (
    // remember to make the two backgroud color to blend
    <footer className="bg-[#001F5C] text-white mt-0">
      <div className="container mx-auto px-4 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <h4 className="font-semibold text-[#FFD700] text-lg">AIC Foundation</h4>
          <p className="mt-3 text-sm text-white/80 leading-relaxed">
            Empowering communities through education, grants, sustainable agriculture and humanitarian care.
          </p>
        </div>

        <div>
          <h5 className="font-semibold mb-4 text-white">Programs</h5>
          <ul className="space-y-3 text-sm">
            <li><Link to="/programs/grants" className={linkClass("/programs/grants")}>Grant & Empowerment</Link></li>
            <li><Link to="/programs/education" className={linkClass("/programs/education")}>Internships & Scholarships</Link></li>
            <li><Link to="/programs/agro" className={linkClass("/programs/agro")}>Green World & Agro</Link></li>
            <li><Link to="/programs/health" className={linkClass("/programs/health")}>Medical & Aid</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold mb-4 text-white">Organisation</h5>
          <ul className="space-y-3 text-sm">
            <li><Link to="/mission" className={linkClass("/mission")}>Mission</Link></li>
            <li><Link to="/about" className={linkClass("/about")}>Who We Are</Link></li>
            <li><Link to="/job" className={linkClass("/job")}>Careers</Link></li>
            <li><Link to="/contactp" className={linkClass("/contactp")}>Contact | Support</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold text-white">Get Involved</h5>
          <p className="mt-3 text-sm text-white/80">Support our mission or partner with us to scale impact.</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/donate"
              className="mt-4 inline-block rounded-full bg-[#FFD700] px-8 py-2.5 text-sm font-bold text-[#001F5C] shadow-lg hover:bg-white transition-colors"
            >
              Donate Now
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/60 tracking-widest">
        © {new Date().getFullYear()} AIC FOUNDATION. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}




// // Footer.jsx
// import { Link } from "react-router-dom";
// import { motion } from 'framer-motion';



// export function Footer() {

//    // Helper function to handle active styling
//   const navLinkStyling = ({ isActive }: { isActive: boolean }) => 
//     `relative transition-colors duration-300 hover:text-[#FFD700] ${
//       isActive ? 'font-bold border-b-2 border-[#FFD700] cursor-pointer' : 'text-white'
//     }`;

//   return (
//     <footer className="bg-[#001F5C] text-white mt-20">
//       <div 
//       className="container mx-auto px-4 py-16 grid md:grid-cols-4 gap-10"
//       >
//         <div>
//           <h4 className="font-semibold text-[#FFD700]">AIC Foundation</h4>
//           <p className="mt-3 text-sm text-white/80">
//             Empowering communities through education, grants, sustainable agriculture and humanitarian care.
//           </p>
//         </div>

//         <div>
//           <h5 className="font-semibold">Programs</h5>
//           <ul className="mt-3 space-y-2 text-sm">
//             <li><Link to="/programs/grants">Grant & Empowerment</Link></li>
//             <li><Link to="/programs/education">Internships & Scholarships</Link></li>
//             <li><Link to="/programs/agro">Green World & Agro</Link></li>
//             <li><Link to="/programs/health">Medical & Aid
            
//             </Link></li>
//           </ul>
//         </div>

// {/* make the below buttons to have a yellow underline hovered on or clicked on  */}
//         <div>
//           <h5 className="font-semibold">Organisation</h5>
//           <ul className="mt-3 space-y-2 text-sm">
//             <li><Link to="/mission">Mission
//             {location.pathname === '/portfolio' && (
//             <motion.div layoutId="underline" className="font-bold border-b-2 border-[#FFD700] cursor-pointer"/>
//             )}
//             </Link></li>

//             <li><Link to="/about">Who We Are</Link></li>
//             <li><Link to="/job">Careers</Link></li>
//             <li><Link to="/contactp">Contact | Support</Link></li>
//           </ul>
//         </div>

//         <div>
//           <h5 className="font-semibold">Get Involved</h5>
//           <p className="mt-3 text-sm text-white/80">Support our mission or partner with us to scale impact.</p>
//           <Link
//             to="/donate"
//             className="mt-4 inline-block rounded-full bg-[#FFD700] px-6 py-2 text-sm font-semibold text-[#001F5C]"
//           >
//             Donate Now
//           </Link>
//         </div>
//       </div>

//       <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
//         © {new Date().getFullYear()} AIC Foundation. All rights reserved.
//       </div>
//     </footer>
//   );
// }