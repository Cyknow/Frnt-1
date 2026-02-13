import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider'; // Import the hook we updated

interface ProtectedRouteProps {
  /** * The roles permitted to view this route.
   * Note: 'isadmin' changed to 'admin' to match your AuthProvider interface 
   */
  allowedRoles: ('regularUser' | 'admin' | 'seniorAdmin')[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  // 1. LOADING STATE
  // Prevents the "Flash of Login Page" while the backend verifies the JWT
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white font-sans">
        <div className="w-12 h-12 border-4 border-yellow-400/20 border-t-yellow-400 rounded-full animate-spin mb-4" />
        <p className="text-xs font-bold tracking-widest uppercase text-slate-500">Verifying Credentials</p>
      </div>
    );
  }

  // 2. AUTHENTICATION CHECK
  // If useAuth says the user isn't logged in, bounce them to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/signinp" state={{ from: location }} replace />;
  }

  // 3. AUTHORIZATION CHECK
  // Check if the user's role (from backend) matches the required roles for this route
  const isAuthorized = allowedRoles.includes(user.role);

  if (!isAuthorized) {
    // Redirect based on their actual role if they try to access something forbidden
    // e.g., A 'regularUser' trying to access /admin/command gets sent to their dashboard
    if (user.role === 'regularUser') return <Navigate to="/userDb" replace />;
    
    // Default fallback for other unauthorized attempts
    return <Navigate to="/unauthorized" replace />;
  }

  // 4. ACCESS GRANTED
  // Renders the child components (Outlets) defined in your App.tsx
  return <Outlet />;
};

export default ProtectedRoute;









// import { Navigate, Outlet, useLocation } from 'react-router-dom';

// interface ProtectedRouteProps {
//   // We allow a list of roles, e.g., ['admin', 'seniorAdmin']
//   allowedRoles: ('regularUser' | 'isadmin' | 'seniorAdmin')[];
//   // This should come from your AuthContext or Redux state
//   userRole: 'regularUser' | 'isadmin' | 'seniorAdmin' | null;
//   // loading state prevents flickering while checking if user is logged in
//   isLoading?: boolean; 
// }

// const ProtectedRoute = ({ allowedRoles, userRole, isLoading }: ProtectedRouteProps) => {
//   const location = useLocation();
//   const token = localStorage.getItem('token');

//   // 1. While the app is checking the token/fetching user data, show nothing or a spinner
//   if (isLoading) {
//     return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>;
//   }

//   // 2. If no token exists OR user is not logged in, send to login
//   // We save the 'from' location so we can redirect them back after login
//   if (!token || !userRole) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   // 3. Check if the user's role is allowed for this specific route
//   const isAuthorized = allowedRoles.includes(userRole);

//   if (!isAuthorized) {
//     // If they are logged in but don't have the right rank, send to Unauthorized
//     return <Navigate to="/unauthorized" replace />;
//   }

//   // 4. Everything is good! Render the child routes
//   return <Outlet />;
// };

// export default ProtectedRoute;




// const jwt = require('jsonwebtoken');

// const adminAuth = (req, res, next) => {
//   const token = req.header('x-auth-token');
  
//   if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== 'admin') {
//       return res.status(403).json({ msg: "Access denied. Admins only." });
//     }
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: "Token is not valid" });
//   }
// };