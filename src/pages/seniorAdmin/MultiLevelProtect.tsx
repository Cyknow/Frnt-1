import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';

interface GuardProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // e.g., ['admin', 'senior-admin']
}

const MLProtect = ({ children, allowedRoles }: GuardProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Authenticating...</div>;

  // 1. Not logged in? Go to Login
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // 2. Role not sufficient? Go to Dashboard (Unauthorized)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
export default MLProtect;