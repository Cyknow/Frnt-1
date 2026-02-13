// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext<any>(null);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<any>(null); // Stores { id, name, role: 'user' | 'admin' | 'senior-admin' }
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('vanguard_token');
//     if (token) {
//       // Logic to verify token and fetch user profile
//       // fetch('/api/auth/me', ...).then(res => setUser(res.data))
//     }
//     setLoading(false);
//   }, []);

//   const login = (token: string, userData: any) => {
//     localStorage.setItem('vanguard_token', token);
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem('vanguard_token');
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);