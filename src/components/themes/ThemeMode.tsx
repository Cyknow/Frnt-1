// // useTheme.ts

// import { useState, useEffect, useCallback } from 'react';

// // Define the three possible theme states
// type ThemeMode = 'light' | 'dark' | 'system';

// /**
//  * Custom hook to manage the dark/light theme state using localStorage
//  * and system preference.
//  */
// export const useTheme = () => {
//   // Initialize state with 'system' as a sensible default until effects run
//   const [theme, setThemeState] = useState<ThemeMode>('system');

//   // --- Core Theme Application Logic ---
//   const applyTheme = useCallback((mode: ThemeMode) => {
//     const root = document.documentElement;
    
//     // Determine the actual mode to apply: 'dark' or 'light'
//     let effectiveMode: 'dark' | 'light';

//     if (mode === 'system') {
//       // Check system preference
//       const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//       effectiveMode = systemDark ? 'dark' : 'light';
//       // Remove 'theme' from localStorage when respecting system
//       localStorage.removeItem('theme');
//     } else {
//       effectiveMode = mode;
//       // Explicitly set the mode in localStorage
//       localStorage.theme = mode;
//     }

//     // Apply or remove the 'dark' class on the root element
//     if (effectiveMode === 'dark') {
//       root.classList.add('dark');
//     } else {
//       root.classList.remove('dark');
//     }

//     setThemeState(mode); // Update React state
//   }, []);

//   // --- Initial Load Logic (Replaces the inline script) ---
//   useEffect(() => {
//     const storedTheme = localStorage.theme as ThemeMode;
//     const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

//     let initialMode: ThemeMode;

//     if (storedTheme === 'light' || storedTheme === 'dark') {
//       // 1. User has explicitly chosen a theme
//       initialMode = storedTheme;
//     } else if (systemPrefersDark) {
//       // 2. User hasn't chosen, and system prefers dark
//       initialMode = 'system';
//     } else {
//       // 3. User hasn't chosen, and system prefers light
//       initialMode = 'system';
//     }

//     applyTheme(initialMode);

//     // Set up listener for changes in system preference
//     const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
//     const handler = () => {
//       // Only re-apply if the current setting is 'system'
//       if (localStorage.theme === undefined) {
//           applyTheme('system');
//       }
//     };
//     mediaQuery.addEventListener('change', handler);

//     return () => mediaQuery.removeEventListener('change', handler);
//   }, [applyTheme]);

//   // --- Public Setter Functions ---
//   const setLightMode = useCallback(() => applyTheme('light'), [applyTheme]);
//   const setDarkMode = useCallback(() => applyTheme('dark'), [applyTheme]);
//   const setSystemMode = useCallback(() => applyTheme('system'), [applyTheme]);

//   return {
//     theme,
//     setLightMode,
//     setDarkMode,
//     setSystemMode,
//   };
// };