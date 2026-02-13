import 
// React, 
{ useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../../assets/Gemini_Generated_Image_dcfox3dcfox3dcfo.png'
import { useAuth } from '../../context/AuthProvider';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function to handle active styling
  const navLinkStyling = ({ isActive }: { isActive: boolean }) => 
    `relative transition-colors duration-300 hover:text-[#FFD700] ${
      isActive ? 'font-bold border-b-2 border-[#FFD700] cursor-pointer' : 'text-white'
    }`;

  return (
    <div className="sticky top-0 z-50 transition-all duration-500">

      {/* ensure you test run this after authenticating and testing the backend */}
      <nav>
        {/* Links everyone can see */}
      <Link to="/"></Link>

      {isAuthenticated && (
        <>
          {/* Only Regular Users see this */}
          {user?.role === 'regularUser' && <Link to="/userDb">My Impact</Link>}

          {/* Admins & Seniors see this */}
          {(user?.role === 'admin' || user?.role === 'seniorAdmin') && (
            <Link to="/admin">Admin Hub</Link>
          )}

          {/* ONLY Senior Admins see this */}
          {user?.role === 'seniorAdmin' && (
            <Link to="/seniorAdmin" className="text-purple-400">System Command</Link>
          )}

          <button onClick={logout}>Logout</button>
        </>
      )}
      </nav>


      {/* TOP BAR: Shrinks on scroll */}
      <div 
        className={`bg-[#001F5C] text-[#F0F8FF] px-[5%] flex justify-between items-center text-xs transition-all duration-300 overflow-hidden ${
          isScrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-10 py-2 opacity-100'
        }`}
      >
        <div className="flex gap-4 items-center">
            <NavLink to="/" className={navLinkStyling}>
            CHARITY
            {location.pathname === '/' && (
            <motion.div layoutId="underline" className="font-bold border-b-2 border-[#FFD700] cursor-pointer"/>
            )}
            </NavLink>
            
            <NavLink to="/portfolio" className={navLinkStyling}>
            PORTFOLIO
            {location.pathname === '/portfolio' && (
            <motion.div layoutId="underline" className="font-bold border-b-2 border-[#FFD700] cursor-pointer"/>
            )}
            </NavLink>

            <motion.button style={{backgroundColor:'blue', borderColor:'white', borderWidth:'2px', width:'5rem', borderRadius:'1rem'}}> 
            <NavLink to="/business" className={navLinkStyling}>
            BUSINESS
            {location.pathname === '/donate' && (
            <motion.div layoutId="underline" className="font-bold border-b-2 border-[#FFD700] cursor-pointer"/>
            )}
            </NavLink>
            </motion.button>

        </div>

            <div className="hidden md:flex gap-4 items-center ">
                <NavLink to="/blog" className={navLinkStyling}>
                BLOG
                {location.pathname === '/blog' && (
                <motion.div layoutId="underline" className="font-bold border-b-2 border-[#FFD700] cursor-pointer"/>
                )}
                </NavLink>

                <motion.button style={{backgroundColor:'blue', borderColor:'white', borderWidth:'2px', width:'5rem', borderRadius:'1rem'}}>
                <NavLink to="/signup" className={navLinkStyling}>
                REGISTER
                {location.pathname === '/signup' && (
                <motion.div layoutId="underline" className="font-bold border-b-2 border-[#FFD700] cursor-pointer"/>
                )}
                </NavLink>
                </motion.button>
                |
                <NavLink to="/signinp" className={navLinkStyling}>
                LOGIN
                {location.pathname === '/signinp' && (
                <motion.div layoutId="underline" className="font-bold border-b-2 border-[#FFD700] cursor-pointer"/>
                )}
                </NavLink>
            </div>
        </div>

      {/* MAIN NAV */}
      <nav className={`bg-[#F0F8FF]/95 backdrop-blur-md px-[5%] flex justify-between items-center shadow-md transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}>
        
        <div className="flex items-center gap-8">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="lg:hidden text-[#001F5C] text-2xl"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
          
{/* <Link to="/" className="flex items-center transition-transform duration-300 hover:scale-105">
  <img 
    src={''} 
    alt="Logo" 
     
    className={`h-8 md:h-10 w-auto transition-all duration-500 ${
      isScrolled ? 'logo-white' : ''
    }`} 
  />
</Link> */}

          <Link to="/" className="text-2xl font-black text-[#001F5C] tracking-tighter transition-transform duration-300 hover:scale-105">
             <img src={'/src/assets/AIC LOGO.png'} alt="AIC FOUNDATION" 
             className={`h-8 md:h-10 w-auto transition-all duration-500 rounded-xl ${
            isScrolled ? 'logo-white' : ''
            }`} />

            {/* <span className="text-[10px] align-top font-normal text-gray-500">Beta</span> */}
          </Link>

            {/* text-[#001F5C] font-semibold text-sm hover:text-[#FFD700] transition-all */}
          <div className="hidden lg:flex gap-6">
            <NavLink to="/mission" className={({ isActive }) =>
            `px-2 py-1 rounded-lg transition-all ${ isActive 
            ? "bg-blue-600 text-white shadow-md scale-105" 
            : "font-semibold text-sm text-[#001F5C] transition-all"
            }` }> Mission </NavLink>

            <NavLink to="/about" className={({ isActive }) =>
            `px-2 py-1 rounded-lg transition-all ${ isActive 
            ? "bg-blue-600 text-white shadow-md scale-105" 
            : "font-semibold text-sm text-[#001F5C] transition-all"
            }` }> Who We Are </NavLink>

            <NavLink to="/job" className={({ isActive }) =>
            `px-2 py-1 rounded-lg transition-all ${ isActive 
            ? "bg-blue-600 text-white shadow-md scale-105" 
            : "font-semibold text-sm text-[#001F5C] transition-all"
            }` }> Careers </NavLink>

            <NavLink to="/contactp" className={({ isActive }) =>
            `px-2 py-1 rounded-lg transition-all ${ isActive 
            ? "bg-blue-600 text-white shadow-md scale-105" 
            : "font-semibold text-sm text-[#001F5C] transition-all"
            }` }> Contact | Support </NavLink>

          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-[#F0F8FF] border-t border-gray-200 flex flex-col p-6 space-y-4 shadow-xl overflow-hidden"
          >
             <NavLink to="/mission" className={({ isActive }) =>
            `px-2 py-1 mr-117 rounded-lg transition-all ${ isActive 
            ? "bg-blue-600 text-white shadow-md scale-105" 
            : "text-[#001F5C] font-bold border-b border-gray-100 pb-2 transition-all"
            }` }> Mission </NavLink>

            <NavLink to="/about" className={({ isActive }) =>
            `px-2 py-1 mr-117 rounded-lg transition-all ${ isActive 
            ? "bg-blue-600 text-white shadow-md scale-105" 
            : "text-[#001F5C] font-bold border-b border-gray-100 pb-2 transition-all"
            }` }> Who We Are </NavLink>

            <NavLink to="/job" className={({ isActive }) =>
            `px-2 py-1 mr-117 rounded-lg transition-all ${ isActive 
            ? "bg-blue-600 text-white shadow-md scale-105" 
            : "text-[#001F5C] font-bold border-b border-gray-100 pb-2 transition-all"
            }` }> Careers </NavLink>

            <NavLink to="/contactp" className={({ isActive }) =>
            `px-2 py-1 mr-117 rounded-lg transition-all ${ isActive 
            ? "bg-blue-600 text-white shadow-md scale-105" 
            : "text-[#001F5C] font-bold border-b border-gray-100 pb-2 transition-all"
            }` }> Contact | Support </NavLink>
            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    
  );
};

export default Navbar;