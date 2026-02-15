import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { Heart, ChevronDown, LogOut } from 'lucide-react'; 
import logo from '../../assets/Gemini_Generated_Image_dcfox3dcfox3dcfo.png';
import { useAuth } from '../../context/AuthProvider';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isActionOpen, setIsActionOpen] = useState(false);
  
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  // --- MOUSE TRACKING FOR TOOLTIPS ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 150 };
  const tooltipX = useSpring(mouseX, springConfig);
  const tooltipY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Tooltip follows cursor with a slight offset
    mouseX.set(e.clientX - 60); 
    mouseY.set(e.clientY + 20);
  };

  // Define the allowed keys strictly
type NavPath = 'mission' | 'job' | 'contactp';

const labels: Record<NavPath, string> = {
  mission: 'Mission',
  // about: 'Who We Are',
  job: 'Careers', 
  contactp: 'Contact | Support'
};

const tooltips: Record<NavPath, string> = {
  mission: 'Our purpose and goal',
  // about: 'Learn about the team',
  job: 'Join the Vanguard',
  contactp: 'Get in touch with us'
};

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkStyling = ({ isActive }: { isActive: boolean }) => 
    `relative transition-all duration-300 hover:text-[#FFD700] flex flex-col items-center ${
      isActive ? 'text-[#FFD700] font-bold' : 'text-white'
    }`;

  return (
    <div className="sticky top-0 z-50 transition-all duration-500">
      
      {/* --- TOP BAR --- */}
      <div className={`bg-[#001F5C] text-[#F0F8FF] px-[5%] flex justify-between items-center text-[10px] md:text-xs transition-all duration-500 overflow-visible relative ${
          isScrolled ? 'max-h-0 py-0 opacity-0 pointer-events-none' : 'max-h-12 py-2 opacity-100'
        }`}>
        
        <div className="flex gap-4 items-center">
          <NavLink to="/" className={navLinkStyling}>
            CHARITY
            {location.pathname === '/' && <motion.div layoutId="navline" className="h-0.5 w-full bg-[#FFD700] mt-0.5" />}
          </NavLink>

          <NavLink to="/portfolio" className={navLinkStyling}>
            PORTFOLIO
            {location.pathname === '/portfolio' && <motion.div layoutId="navline" className="h-0.5 w-full bg-[#FFD700] mt-0.5" />}
          </NavLink>
          
          <NavLink to="/cpa" className={navLinkStyling}>
          <motion.button whileHover={{ scale: 1.05 }} className=" bg-blue-900/50 border border-white/20 px-3 py-1 rounded-full hover:border-white transition-all">
            BUSINESS
          </motion.button>
          </NavLink>
        </div>

        {/* RIGHT SIDE: Action Hub */}
        <div className="relative">
          <motion.button
            onClick={() => setIsActionOpen(!isActionOpen)}
            animate={{ 
              boxShadow: isActionOpen ? "0px 0px 0px transparent" : ["0px 0px 8px #FFD700", "0px 0px 18px #FFD700", "0px 0px 8px #FFD700"] 
            }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="flex items-center gap-2 bg-[#FFD700] text-[#001F5C] font-black px-4 py-1.5 rounded-full z-[70] relative active:scale-95"
          >
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <Heart size={14} fill="currentColor" />
            </motion.div>
            <span className="tracking-tighter">
              {isAuthenticated ? `COMMAND: ${user?.role?.toUpperCase()}` : "JOIN THE MISSION"}
            </span>
            <ChevronDown size={14} className={`transition-transform ${isActionOpen ? 'rotate-180' : ''}`} />
          </motion.button>

          <AnimatePresence>
            {isActionOpen && (
              <>
                <div className="fixed inset-0 z-[60]" onClick={() => setIsActionOpen(false)} />
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 10 }} exit={{ opacity: 0, y: -10 }} className="absolute right-0 top-full w-56 bg-[#001F5C] border border-white/10 rounded-2xl shadow-2xl z-[70] backdrop-blur-xl p-2">
                  {isAuthenticated ? (
                    <div className="flex flex-col text-sm">
                      <div className="px-4 py-2 text-[9px] text-white/40 uppercase tracking-widest border-b border-white/5 mb-1">Authenticated Access</div>
                      {user?.role === 'regularUser' && <Link to="/userDb" className="px-4 py-2 hover:bg-white/10 rounded-lg text-white">My Impact</Link>}
                      {(user?.role === 'admin' || user?.role === 'seniorAdmin') && <Link to="/admin" className="px-4 py-2 hover:bg-white/10 rounded-lg text-white">Admin Hub</Link>}
                      {user?.role === 'seniorAdmin' && <Link to="/seniorAdmin" className="px-4 py-2 text-purple-400 hover:bg-purple-400/10 rounded-lg">System Command</Link>}
                      <button onClick={logout} className="flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg mt-2"><LogOut size={14} /> LOGOUT</button>
                    </div>
                  ) : (
                    <div className="flex flex-col text-sm">
                      <Link to="/blog" onClick={() => setIsActionOpen(false)} className="px-4 py-2 text-white hover:bg-white/10 rounded-lg font-bold">BLOG</Link>
                      <Link to="/signup" onClick={() => setIsActionOpen(false)} className="px-4 py-2 bg-[#FFD700] text-[#001F5C] rounded-lg font-black my-1 text-center">REGISTER</Link>
                      <Link to="/signinp" onClick={() => setIsActionOpen(false)} className="px-4 py-2 text-white hover:bg-white/10 rounded-lg font-bold">LOGIN</Link>
                    </div>
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* --- MAIN NAV --- */}
      <nav className={`bg-[#F0F8FF]/95 backdrop-blur-md px-[5%] flex justify-between items-center shadow-md transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="flex items-center gap-8">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-[#001F5C] text-2xl">
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
          
          <Link to="/" className="transition-transform duration-300 hover:scale-105">
             <img src={logo} alt="Logo" className="h-8 md:h-10 w-auto rounded-xl" />
          </Link>
          
          <div className="hidden lg:flex gap-2">
            {(['mission', 'job', 'contactp'] as NavPath[]).map((path) => (
              <div key={path} className="group" onMouseMove={handleMouseMove}>
                <NavLink to={`/${path}`} className={({ isActive }) => `px-4 py-2 rounded-lg transition-all text-sm font-bold ${isActive ? "bg-[#001F5C] text-white shadow-lg" : "text-[#001F5C] hover:bg-blue-50"}`}>
                  {labels[path]}
                </NavLink>

                {/* SMART TOOLTIP */}
                <motion.div style={{ position: 'fixed', left: tooltipX, top: tooltipY, pointerEvents: 'none' }} className="hidden group-hover:block z-[100]">
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#001F5C] text-white text-[10px] py-1.5 px-3 rounded-md shadow-2xl border border-white/20 backdrop-blur-md">
                    {tooltips[path]}
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </nav>
      
      {/* --- MOBILE DRAWER --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" />
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed left-0 right-0 top-16 lg:hidden bg-[#F0F8FF] border-t border-gray-200 flex flex-col p-6 space-y-3 shadow-2xl z-50">
              {['mission', 'job', 'contactp'].map((path) => (
                <NavLink key={path} to={`/${path}`} onClick={() => setIsMobileMenuOpen(false)} className="text-[#001F5C] font-bold border-b border-gray-100 pb-2 capitalize">
                  {path === 'job' ? 'Careers' : path.replace('contactp', 'Support')}
                </NavLink>
              ))}
              <button onClick={() => setIsMobileMenuOpen(false)} className="mt-4 text-[10px] text-gray-400 uppercase font-black tracking-widest">Close Menu ✕</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;







// import { useState, useEffect } from 'react';
// import { Link, NavLink, useLocation } from 'react-router-dom';
// import { motion, AnimatePresence, useSpring } from 'framer-motion';
// import { Heart, ChevronDown, LogOut } from 'lucide-react'; // Added icons
// import logo from '../../assets/Gemini_Generated_Image_dcfox3dcfox3dcfo.png';
// import { useAuth } from '../../context/AuthProvider';

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isActionOpen, setIsActionOpen] = useState(false);
  
//   const { user, isAuthenticated, logout } = useAuth();
//   const location = useLocation();

//   const NavigationLinks = () => {
//   // 1. Mouse Tracking setup
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);

//   // Smooth out the movement with springs
//   const springConfig = { damping: 20, stiffness: 150 };
//   const tooltipX = useSpring(mouseX, springConfig);
//   const tooltipY = useSpring(mouseY, springConfig);

//   const handleMouseMove = (e) => {
//     // Offset the tooltip so it doesn't sit directly under the cursor
//     mouseX.set(e.clientX - 60); 
//     mouseY.set(e.clientY + 20);
//   };

//   const labels = {
//     mission: 'Mission',
//     about: 'Who We Are',
//     job: 'Careers', // Updated label
//     contactp: 'Contact | Support'
//   };

//   const tooltips = {
//     mission: 'Our purpose and goal',
//     about: 'Learn about the team',
//     job: 'Join the Vanguard',
//     contactp: 'Get in touch with us'
//   };

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 40);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Standard styling for Top Bar links
//   const navLinkStyling = ({ isActive }: { isActive: boolean }) => 
//     `relative transition-all duration-300 hover:text-[#FFD700] flex flex-col items-center ${
//       isActive ? 'text-[#FFD700] font-bold' : 'text-white'
//     }`;

//   return (
//     <div className="sticky top-0 z-50 transition-all duration-500">
      
//       {/* --- TOP BAR: Shrinks on scroll --- */}
//       <div 
//         className={`bg-[#001F5C] text-[#F0F8FF] px-[5%] flex justify-between items-center text-[10px] md:text-xs transition-all duration-500 overflow-visible relative ${
//           isScrolled ? 'max-h-0 py-0 opacity-0 pointer-events-none' : 'max-h-12 py-2 opacity-100'
//         }`}
//       >
//         {/* LEFT SIDE: Public Portals */}
//         <div className="flex gap-4 items-center">
//           <NavLink to="/" className={navLinkStyling}>
//             CHARITY
//             {location.pathname === '/' && <motion.div layoutId="navline" className="h-0.5 w-full bg-[#FFD700] mt-0.5" />}
//           </NavLink>

//           <motion.button 
//           className='hidden md:block'
//           >
//           <NavLink to="/portfolio" className={navLinkStyling} >
//             PORTFOLIO
//             {location.pathname === '/portfolio' && <motion.div layoutId="navline" className="h-0.5 w-full bg-[#FFD700] mt-0.5" />}
//           </NavLink>
//           </motion.button>

//           <motion.button 
//             whileHover={{ scale: 1.05 }}
//             className="bg-blue-900/50 border border-white/20 px-3 py-1 rounded-full hover:border-white transition-all"
//           >
//             <NavLink to="/business" className="text-white">BUSINESS</NavLink>
//           </motion.button>
//         </div>

//         {/* RIGHT SIDE: Glowing CTA / User Hub */}
//         <div className="relative">
//           <motion.button
//             onClick={() => setIsActionOpen(!isActionOpen)}
//             animate={{ 
//               boxShadow: isActionOpen 
//                 ? "0px 0px 0px rgba(255, 215, 0, 0)" 
//                 : ["0px 0px 8px #FFD700", "0px 0px 18px #FFD700", "0px 0px 8px #FFD700"] 
//             }}
//             transition={{ repeat: Infinity, duration: 2.5 }}
//             className="flex items-center gap-2 bg-[#FFD700] text-[#001F5C] font-black px-4 py-1.5 rounded-full shadow-lg z-[70] relative active:scale-95"
//           >
//             <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
//               <Heart size={14} fill="currentColor" />
//             </motion.div>
//             <span className="tracking-tighter">
//               {isAuthenticated ? `COMMAND: ${user?.role?.toUpperCase()}` : "JOIN THE MISSION"}
//             </span>
//             <ChevronDown size={14} className={`transition-transform ${isActionOpen ? 'rotate-180' : ''}`} />
//           </motion.button>

//           {/* DROPDOWN MENU */}
//           <AnimatePresence>
//             {isActionOpen && (
//               <>
//                 <div className="fixed inset-0 z-[60]" onClick={() => setIsActionOpen(false)} />
//                 <motion.div
//                   initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                   animate={{ opacity: 1, y: 10, scale: 1 }}
//                   exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                   className="absolute right-0 top-full w-56 bg-[#001F5C] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-[70] backdrop-blur-xl"
//                 >
//                   <div className="flex flex-col p-2 text-sm">
//                     {/* AUTHENTICATED LINKS */}
//                     {isAuthenticated ? (
//                       <>
//                         <div className="px-4 py-2 text-[9px] text-white/40 uppercase tracking-widest border-b border-white/5 mb-1">Authenticated Access</div>
//                         {user?.role === 'regularUser' && <Link to="/userDb" className="px-4 py-2 hover:bg-white/10 rounded-lg">My Impact</Link>}
//                         {(user?.role === 'admin' || user?.role === 'seniorAdmin') && <Link to="/admin" className="px-4 py-2 hover:bg-white/10 rounded-lg">Admin Hub</Link>}
//                         {user?.role === 'seniorAdmin' && <Link to="/seniorAdmin" className="px-4 py-2 text-purple-400 hover:bg-purple-400/10 rounded-lg">System Command</Link>}
//                         <button onClick={logout} className="flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg mt-2 transition-all">
//                           <LogOut size={14} /> LOGOUT
//                         </button>
//                       </>
//                     ) : (
//                       /* GUEST LINKS */
//                       <>
//                         <Link to="/blog" onClick={() => setIsActionOpen(false)} className="px-4 py-2 text-white hover:bg-white/10 rounded-lg font-bold">BLOG</Link>
//                         <Link to="/signup" onClick={() => setIsActionOpen(false)} className="px-4 py-2 bg-[#FFD700] text-[#001F5C] rounded-lg font-black my-1 text-center">REGISTER</Link>
//                         <Link to="/signinp" onClick={() => setIsActionOpen(false)} className="px-4 py-2 text-white hover:bg-white/10 rounded-lg font-bold">LOGIN</Link>
//                       </>
//                     )}
//                   </div>
//                 </motion.div>
//               </>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>

//       {/* --- MAIN NAV: Sticky lower bar --- */}
//       <nav className={`bg-[#F0F8FF]/95 backdrop-blur-md px-[5%] flex justify-between items-center shadow-md transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
//         <div className="flex items-center gap-8">
//           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-[#001F5C] text-2xl">
//             {isMobileMenuOpen ? '✕' : '☰'}
//           </button>
          
//           <Link to="/" className="transition-transform duration-300 hover:scale-105">
//              <img src={logo} alt="Logo" className="h-8 md:h-10 w-auto rounded-xl" />
//           </Link>
          
//           <div className="hidden lg:flex gap-2">
//       {['mission', 'about', 'job', 'contactp'].map((path) => (
//         <div 
//           key={path} 
//           className="group"
//           onMouseMove={handleMouseMove} // Track mouse inside the hover area
//         >
//           <NavLink 
//             to={`/${path}`} 
//             className={({ isActive }) => `
//               px-4 py-2 rounded-lg transition-all text-sm font-bold
//               ${isActive ? "bg-[#001F5C] text-white shadow-lg" : "text-[#001F5C] hover:bg-blue-50"}
//             `}
//           >
//             {labels[path]}
//           </NavLink>

//           {/* SMART TOOLTIP: Follows the cursor */}
//           <motion.div 
//             style={{ 
//               position: 'fixed', // Fixed ensures it stays relative to the screen
//               left: tooltipX, 
//               top: tooltipY,
//               pointerEvents: 'none' // Ensures the tooltip doesn't block the cursor
//             }}
//             className="hidden group-hover:block z-[100]"
//           >
//             <motion.div 
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="bg-[#001F5C] text-white text-[10px] py-1.5 px-3 rounded-md shadow-2xl whitespace-nowrap border border-white/20 backdrop-blur-md"
//             >
//               {tooltips[path]}
//             </motion.div>
//           </motion.div>
//         </div>
//       ))}
//     </div>
//   );
//           {/* <div className="hidden lg:flex gap-2">
//             {['mission', 'about', 'job', 'contactp'].map((path) => (
//               <NavLink 
//                 key={path} 
//                 to={`/${path}`} 
//                 className={({ isActive }) => `
//                   px-4 py-2 rounded-lg transition-all text-sm font-bold
//                   ${isActive ? "bg-[#001F5C] text-white shadow-lg" : "text-[#001F5C] hover:bg-blue-50"}
//                 `}
//               >
//                 {path === 'contactp' ? 'Contact | Support' : path.charAt(0).toUpperCase() + path.slice(1).replace('about', 'Who We Are')}
//               </NavLink>
//             ))}
//           </div> */}
//         </div>
//       </nav>
      
//       {/* MOBILE DRAWER */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <>
//             {/* 1. THE BACKDROP: This handles clicking outside */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsMobileMenuOpen(false)}
//               className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
//             />

//             {/* 2. THE DRAWER: Increased z-index to stay above backdrop */}
//             <motion.div 
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="fixed left-0 right-0 top-[navbar-height] lg:hidden bg-[#F0F8FF] border-t border-gray-200 flex flex-col p-6 space-y-3 shadow-2xl z-50"
//             >
//               {['mission', 'about', 'job', 'contactp'].map((path) => (
//                 <NavLink 
//                   key={path} 
//                   to={`/${path}`} 
//                   onClick={() => setIsMobileMenuOpen(false)} // Closes on link click
//                   className="text-[#001F5C] font-bold border-b border-gray-100 pb-2 capitalize active:text-yellow-500"
//                 >
//                   {path.replace('contactp', 'Support')}
//                 </NavLink>
//               ))}
              
//               {/* Optional: Add a close button at the bottom for better accessibility */}
//               <button 
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="mt-4 text-[10px] text-gray-400 uppercase font-black tracking-widest"
//               >
//                 Close Menu ✕
//               </button>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* MOBILE DRAWER */}
//       {/* <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div 
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="lg:hidden bg-[#F0F8FF] border-t border-gray-200 flex flex-col p-6 space-y-3 shadow-xl"
//           >
//             {['mission', 'about', 'job', 'contactp'].map((path) => (
//               <NavLink key={path} to={`/${path}`} onClick={() => setIsMobileMenuOpen(false)} className="text-[#001F5C] font-bold border-b border-gray-100 pb-2 capitalize">
//                 {path.replace('contactp', 'Support')}
//               </NavLink>
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence> */}
//     </div>
//   );
// };

// export default Navbar;







// import 
// // React, 
// { useState, useEffect } from 'react';
// import { Link, NavLink, useLocation } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import logo from '../../assets/Gemini_Generated_Image_dcfox3dcfox3dcfo.png'
// import { useAuth } from '../../context/AuthProvider';

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const { user, isAuthenticated, logout } = useAuth();
//   // ... inside your component
//   const [isActionOpen, setIsActionOpen] = useState(false);
//   const location = useLocation();
  
//   // Handle Scroll Effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 40);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Helper function to handle active styling
//   const navLinkStyling = ({ isActive }: { isActive: boolean }) => 
//     `relative transition-colors duration-300 hover:text-[#FFD700] ${
//       isActive ? 'font-bold border-b-2 border-[#FFD700] cursor-pointer' : 'text-white'
//     }`;

//   return (
//     <div className="sticky top-0 z-50 transition-all duration-500 ">

//       {/* ensure you test run this after authenticating and testing the backend */}
//       <nav>
//         {/* Links everyone can see */}
//       <Link to="/"></Link>

//       {isAuthenticated && (
//         <>
//           {/* Only Regular Users see this */}
//           {user?.role === 'regularUser' && <Link to="/userDb">My Impact</Link>}

//           {/* Admins & Seniors see this */}
//           {(user?.role === 'admin' || user?.role === 'seniorAdmin') && (
//             <Link to="/admin">Admin Hub</Link>
//           )}

//           {/* ONLY Senior Admins see this */}
//           {user?.role === 'seniorAdmin' && (
//             <Link to="/seniorAdmin" className="text-purple-400">System Command</Link>
//           )}

//           <button onClick={logout}>Logout</button>
//         </>
//       )}
//       </nav>


//       {/* TOP BAR: Shrinks on scroll */}
//       <div 
//         className={`bg-[#001F5C] text-[#F0F8FF] px-[5%] flex justify-between items-center text-xs transition-all duration-300 overflow-hidden ${
//           isScrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-10 py-2 opacity-100'
//         }`}
//       >

//         {/* LEFT SIDE: Navigation */}
//     <div className="flex gap-4 items-center">
//       <NavLink to="/" className={navLinkStyling}>CHARITY</NavLink>
//       <NavLink to="/portfolio" className={navLinkStyling}>PORTFOLIO</NavLink>
      
//       <motion.button 
//         whileHover={{ scale: 1.05 }}
//         className="bg-blue-900 border-2 border-white/30 px-4 py-1 rounded-full hover:border-white transition-all"
//       >
//         <NavLink to="/business" className={navLinkStyling}>BUSINESS</NavLink>
//       </motion.button>
//     </div>



//         {/* <div className="flex gap-4 items-center">
//             <NavLink to="/" className={navLinkStyling}>
//             CHARITY
//             {location.pathname === '/' && (
//             <motion.div layoutId="underline" className="font-bold border-b-2 border-[#FFD700] cursor-pointer"/>
//             )}
//             </NavLink>
            
//             <NavLink to="/portfolio" className={navLinkStyling}>
//             PORTFOLIO
//             {location.pathname === '/portfolio' && (
//             <motion.div layoutId="underline" className="font-bold border-b-2 border-[#FFD700] cursor-pointer"/>
//             )}
//             </NavLink>

//             <motion.button style={{backgroundColor:'var(--color-blue-900)', borderColor:'white', borderWidth:'2px', minWidth:'5rem', padding: '0.3rem 0', borderRadius:'1rem'}}> 
//             <NavLink to="/business" className={navLinkStyling}>
//             BUSINESS
//             {location.pathname === '/donate' && (
//             <motion.div layoutId="underline" className="font-bold border-b-2 border-[#FFD700] cursor-pointer"/>
//             )}
//             </NavLink>
//             </motion.button>

//         </div> */}

//         {/* RIGHT SIDE: Glowing CTA Dropdown */}
//     <div className="relative">
//       <motion.button
//         onClick={() => setIsActionOpen(!isActionOpen)}
//         animate={{ 
//           boxShadow: isActionOpen ? "0px 0px 0px rgba(255, 215, 0, 0)" : ["0px 0px 5px #FFD700", "0px 0px 15px #FFD700", "0px 0px 5px #FFD700"] 
//         }}
//         transition={{ repeat: Infinity, duration: 2 }}
//         className="flex items-center gap-2 bg-[#FFD700] text-[#001F5C] font-black px-4 py-1.5 rounded-full shadow-lg z-[60] relative transition-transform active:scale-95"
//       >
//         JOIN THE MISSION
//         <motion.span animate={{ rotate: isActionOpen ? 180 : 0 }}>▼</motion.span>
//       </motion.button>

//       {/* DROPDOWN MENU */}
//       <AnimatePresence>
//         {isActionOpen && (
//           <>
//             {/* Backdrop to close when clicking outside */}
//             <div className="fixed inset-0 z-[55]" onClick={() => setIsActionOpen(false)} />
            
//             <motion.div
//               initial={{ opacity: 0, y: -10, scale: 0.95 }}
//               animate={{ opacity: 1, y: 5, scale: 1 }}
//               exit={{ opacity: 0, y: -10, scale: 0.95 }}
//               className="absolute right-0 top-full w-48 bg-[#001F5C] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[60] backdrop-blur-xl"
//             >
//               <div className="flex flex-col p-2">
//                 {[
//                   { to: "/blog", label: "READ OUR BLOG" },
//                   { to: "/signup", label: "CREATE ACCOUNT", highlight: true },
//                   { to: "/signinp", label: "MEMBER LOGIN" }
//                 ].map((item) => (
//                   <NavLink
//                     key={item.to}
//                     to={item.to}
//                     onClick={() => setIsActionOpen(false)}
//                     className={({ isActive }) => `
//                       px-4 py-3 rounded-xl transition-all font-bold tracking-tighter
//                       ${item.highlight ? 'bg-yellow-400 text-[#001F5C] my-1' : 'text-white hover:bg-white/10'}
//                       ${isActive && !item.highlight ? 'text-yellow-400' : ''}
//                     `}
//                   >
//                     {item.label}
//                   </NavLink>
//                 ))}
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   </div>

//             {/* <div className="flex flex-col md:flex-row gap-5 items-center ">
//                 <NavLink to="/blog" className={navLinkStyling}>
//                 BLOG
//                 {location.pathname === '/blog' && (
//                 <motion.div layoutId="underline" className="font-bold border-b-2 border-[#FFD700] cursor-pointer"/>
//                 )}
//                 </NavLink>

//                 <motion.button className='flex items-center justify-center'
//                 style={{backgroundColor: 'var(--color-blue-900)', borderColor:'white', borderWidth:'2px', minWidth:'5rem', padding: '0.3rem 0', borderRadius:'1rem'}}
//                 >
//                 <NavLink to="/signup" className={navLinkStyling}>
//                 REGISTER
//                 {location.pathname === '/signup' && (
//                 <motion.div layoutId="underline" className="font-bold border-b-2 border-[#FFD700] cursor-pointer"/>
//                 )}
//                 </NavLink>
//                 </motion.button>

//                 <span className="hidden md:block text-white/30">|</span>
                
//                 <NavLink to="/signinp" className={navLinkStyling}>
//                 LOGIN
//                 {location.pathname === '/signinp' && (
//                 <motion.div layoutId="underline" className="font-bold border-b-2 border-[#FFD700] cursor-pointer"/>
//                 )}
//                 </NavLink>
//             </div> */}
  

//       {/* MAIN NAV */}
//       <nav className={`bg-[#F0F8FF]/95 backdrop-blur-md px-[5%] flex justify-between items-center shadow-md transition-all duration-300 ${
//         isScrolled ? 'py-2' : 'py-4'
//       }`}>
        
//         <div className="flex items-center gap-8">
//           <button 
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
//             className="lg:hidden text-[#001F5C] text-2xl"
//           >
//             {isMobileMenuOpen ? '✕' : '☰'}
//           </button>
          
// {/* <Link to="/" className="flex items-center transition-transform duration-300 hover:scale-105">
//   <img 
//     src={''} 
//     alt="Logo" 
     
//     className={`h-8 md:h-10 w-auto transition-all duration-500 ${
//       isScrolled ? 'logo-white' : ''
//     }`} 
//   />
// </Link> */}

//           <Link to="/" className="text-2xl font-black text-[#001F5C] tracking-tighter transition-transform duration-300 hover:scale-105">
//              <img src={logo} alt="AIC FOUNDATION" 
//              className={`h-8 md:h-10 w-auto transition-all duration-500 rounded-xl ${
//             isScrolled ? 'logo-white' : ''
//             }`} />

//             {/* <span className="text-[10px] align-top font-normal text-gray-500">Beta</span> */}
//           </Link>

//             {/* text-[#001F5C] font-semibold text-sm hover:text-[#FFD700] transition-all */}
//           <div className="hidden lg:flex gap-6">
//             <NavLink to="/mission" className={({ isActive }) =>
//             `px-4 py-3 rounded-lg transition-all ${ isActive 
//             ? "bg-blue-900 text-white shadow-md scale-105" 
//             : "font-semibold text-sm text-[#001F5C] transition-all"
//             }` }> Mission </NavLink>

//             <NavLink to="/about" className={({ isActive }) =>
//             `px-4 py-3 rounded-lg transition-all ${ isActive 
//             ? "bg-blue-900 text-white shadow-md scale-105" 
//             : "font-semibold text-sm text-[#001F5C] transition-all"
//             }` }> Who We Are </NavLink>

//             <NavLink to="/job" className={({ isActive }) =>
//             `px-4 py-3 rounded-lg transition-all ${ isActive 
//             ? "bg-blue-900 text-white shadow-md scale-105" 
//             : "font-semibold text-sm text-[#001F5C] transition-all"
//             }` }> Careers </NavLink>

//             <NavLink to="/contactp" className={({ isActive }) =>
//             `px-4 py-3 rounded-lg transition-all ${ isActive 
//             ? "bg-blue-900 text-white shadow-md scale-105" 
//             : "font-semibold text-sm text-[#001F5C] transition-all"
//             }` }> Contact | Support </NavLink>

//           </div>
//         </div>
//       </nav>

//       {/* MOBILE DRAWER */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div 
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: 'auto', opacity: 1 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             whileHover={{ scale: 1.03 }}
//             exit={{ height: 0, opacity: 0 }}
//             className="lg:hidden bg-[#F0F8FF] border-t border-gray-200 flex flex-col p-6 space-y-4 shadow-xl overflow-hidden"
//           >
//              <NavLink to="/mission" className={({ isActive }) =>
//             `px-2 py-1 mr-full rounded-lg transition-all ${ isActive 
//             ? "bg-blue-900 text-white shadow-md scale-105" 
//             : "text-[#001F5C] font-bold border-b border-gray-100 pb-2 transition-all"
//             }` }> Mission </NavLink>

//             <NavLink to="/about" className={({ isActive }) =>
//             `px-2 py-1 mr-full rounded-lg transition-all ${ isActive 
//             ? "bg-blue-900 text-white shadow-md scale-105" 
//             : "text-[#001F5C] font-bold border-b border-gray-100 pb-2 transition-all"
//             }` }> Who We Are </NavLink>

//             <NavLink to="/job" className={({ isActive }) =>
//             `px-2 py-1 mr-full rounded-lg transition-all ${ isActive 
//             ? "bg-blue-900 text-white shadow-md scale-105" 
//             : "text-[#001F5C] font-bold border-b border-gray-100 pb-2 transition-all"
//             }` }> Careers </NavLink>

//             <NavLink to="/contactp" className={({ isActive }) =>
//             `px-2 py-1 mr-full rounded-lg transition-all ${ isActive 
//             ? "bg-blue-900 text-white shadow-md scale-105" 
//             : "text-[#001F5C] font-bold border-b border-gray-100 pb-2 transition-all"
//             }` }> Contact | Support </NavLink>
            
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
    
//   );
// };

// export default Navbar;