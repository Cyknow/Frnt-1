// import React from 'react';
// import { useTheme } from './ThemeMode';

// // const themes = {
// //   blue: '#001F5C',  
// //   gold: '#FFD700',
// //   white: '#F0F8FF',
// // }

// export const ThemeSwitcher: React.FC = () => {
//   const { theme, setLightMode, setDarkMode, setSystemMode } = useTheme();

//   return (
//     // <div style={{ background: themes.gold, height: '1.7rem', paddingBottom:'0px' }}>
//     <div className="theme-switcher">
//       <h3>Current Theme: {theme}</h3>
//       <div className="button-group">
//         <button 
//           onClick={setLightMode}
//           disabled={theme === 'light'}
//         >
//           Explicit Light
//         </button>
//         <button 
//           onClick={setDarkMode}
//           disabled={theme === 'dark'}
//         >
//           Explicit Dark
//         </button>
//         <button 
//           onClick={setSystemMode}
//           disabled={theme === 'system'}
//         >
//           Respect System
//         </button>
//       </div>
//     </div>
//     // </div>
//   );
// };