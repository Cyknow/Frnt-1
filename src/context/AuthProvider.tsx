import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// 1. Updated Interface to match your navigation roles
interface User {
  id: string;
  name: string;
  email: string;
  role: 'regularUser' | 'admin' | 'seniorAdmin';
  totalDonated?: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Base URL configuration - change this to your deployed URL later
axios.defaults.baseURL = 'https://newbkd-wcc-api.onrender.com/';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // 2. Axios Interceptor: Automatically attaches Token to every request
  useEffect(() => {
    const interceptor = axios.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    return () => axios.interceptors.request.eject(interceptor);
  }, [token]);

  // 3. Verify Session on Load
  const verifyUser = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      // Logic: Ask the backend "Who is this token owner?"
      const res = await axios.get('https://newbkd-wcc-api.onrender.com/api/auth/me');
      setUser(res.data);
    } catch (err) {
      console.error("Session expired or invalid token");
      logout(); // Clear invalid data
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  const login = (newToken: string, userData: User) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    // 2. Clear any other stored user data
  localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    // Optional: Redirect to login
    window.location.href = '/signinp';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      loading, 
      login, 
      logout,
      isAuthenticated: !!user 
    }}>
      {!loading && children} 
      {/* 4. Don't render children until loading is false to prevent "flicker" */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};








// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: 'regularUser' | 'admin' | 'seniorAdmin';
//   totalDonated?: number;
// }

// interface AuthContextType {
//   user: User | null;
//   token: string | null;
//   loading: boolean;
//   login: (token: string, userData: User) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const verifyUser = async () => {
//       if (token) {
//         try {
//           // Add token to axios headers for this request
//           const res = await axios.get('http://localhost:5000/api/auth/me', {
//             headers: { Authorization: `Bearer ${token}` }
//           });
//           setUser(res.data);
//         } catch (err) {
//           localStorage.removeItem('token');
//           setToken(null);
//           setUser(null);
//         }
//       }
//       setLoading(false);
//     };
//     verifyUser();
//   }, [token]);

//   const login = (newToken: string, userData: User) => {
//     localStorage.setItem('token', newToken);
//     setToken(newToken);
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setToken(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within AuthProvider");
//   return context;
// };




// import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
// import axios from 'axios';

// // 1. Expanded User Interface to include Phone
// interface User {
//   id: string;
//   name: string;
//   email: string;
//   phone: string; // Added to match your new Signup form
//   role: 'regularUser' | 'admin' | 'seniorAdmin';
//   totalDonated?: number;
// }

// interface AuthContextType {
//   user: User | null;
//   token: string | null;
//   loading: boolean;
//   login: (token: string, userData: User) => void;
//   logout: () => void;
//   updateUser: (data: Partial<User>) => void; // For profile updates
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Set Global Axios Defaults
// axios.defaults.baseURL = 'http://localhost:5000/api';

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
//   const [loading, setLoading] = useState(true);

//   // 2. Persistent Header Sync
//   // This ensures that even if the page refreshes, axios is ready
//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     } else {
//       delete axios.defaults.headers.common['Authorization'];
//     }
//   }, [token]);

//   useEffect(() => {
//     const verifyUser = async () => {
//       if (token) {
//         try {
//           const res = await axios.get('/auth/me'); // Using base URL
//           setUser(res.data);
//         } catch (err) {
//           console.error("Session expired or invalid");
//           handleLogout();
//         }
//       }
//       setLoading(false);
//     };
//     verifyUser();
//   }, [token]);

//   const handleLogin = (newToken: string, userData: User) => {
//     localStorage.setItem('token', newToken);
//     setToken(newToken);
//     setUser(userData);
//   };

//   const handleLogout = useCallback(() => {
//     localStorage.removeItem('token');
//     setToken(null);
//     setUser(null);
//     delete axios.defaults.headers.common['Authorization'];
//   }, []);

//   const updateUser = (data: Partial<User>) => {
//     if (user) setUser({ ...user, ...data });
//   };

//   return (
//     <AuthContext.Provider value={{ 
//       user, 
//       token, 
//       loading, 
//       login: handleLogin, 
//       logout: handleLogout,
//       updateUser 
//     }}>
//       {!loading && children} 
//       {/* 3. Prevent Flash: Only render app once auth state is confirmed */}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within AuthProvider");
//   return context;
// };