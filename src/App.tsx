import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
// import { useAuth } from './context/AuthProvider'; // Import the hook

// Layout & UI
import MainNav from './components/layout/MainNav';
import { Footer } from './components/layout/Footer';
import theme from './components/themes/Theme';
import ScrollProgressBar from './components/layout/ScrollProgressBar';
import ScrollToTopGlobal from './components/layout/ScrollToTopGlobal';
import BackToTop from './components/layout/BackToTop';

// Charity Pages
import HomePage from './pages/charityPage/Homepage';
import About from './pages/charityPage/About';
import Features from './pages/charityPage/Feature';
import CareersPage from './pages/careerPage/Careers';
import WhatWeDo from './pages/charityPage/WhatWeDo';
import Donate from './pages/donationPage/Donate';
import PartnerForm from './pages/charityPage/PartnerPage';
import PartnerLogo from './pages/charityPage/PartnerLogo';
import WhyChooseUs from './pages/charityPage/WhyChooseUs';
import SupportPage from './pages/charityPage/Support';
import GrantApplication from './pages/charityPage/GrantApplication';
import { PortfolioPage } from './pages/PortfolioPage/Portfolio1';
// import Vasertile from './pages/charityPage/Vasertile';

// Auth & Protection
import ProtectedRoute from './pages/adminPage/ProtectedRoute';
import AuthHub from './pages/userPage/AuthHub';
import SignupPage from './pages/userPage/SignupPage';
import Unauthorized from './pages/adminPage/UnauthorizedPage';

// Dashboards
import UserDashboard from './pages/userPage/UserDashboard';
import AdminDashboard from './pages/adminPage/AdminDashboar';
import SeniorAdminPanel from './pages/seniorAdmin/SeniorAdminPanel';
import DonationManager from './pages/seniorAdmin/DonationManager';
import BlogApprovalManager from './pages/adminPage/BlogApprovalManager';
import JobApplications from './pages/adminPage/JobApplications';
import ContactMessages from './pages/adminPage/ContactMessagesSupport';
import NewsletterList from './pages/adminPage/NewsletterList';
import VerifySuccess from './pages/userPage/VerifySuccess';
import VerifyIssue from './pages/userPage/VerifyIssue';
import ProgramTemplate from './pages/charityPage/ProgramTemplate';
import { programData } from './pages/charityPage/data/programs';

export default function App() {
  // We no longer need local state here. 
  // ProtectedRoute handles the user logic internally via context.

  return (
    <div className='app'>
      <ScrollProgressBar />
      <MainNav />
      <div style={{ background: theme.gold, height: '1.7rem' }}></div>
      <ScrollToTopGlobal />

      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/what-we-do" element={<WhatWeDo />} />
        <Route path="/mission" element={<Features />} />
        <Route path="/job" element={<CareersPage />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/partnerp" element={<PartnerForm />} />
        <Route path="/partnerlogo" element={<PartnerLogo />} />
        <Route path="/whychooseusp" element={<WhyChooseUs />} />
        <Route path="/contactp" element={<SupportPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        <Route path="/grants" element={<ProgramTemplate {...programData.grants} />} />
        <Route path="/greenhouse" element={<ProgramTemplate {...programData.greenhouse} />} />
        <Route path="/humanitarian" element={<ProgramTemplate {...programData.humanitarian} />} />
        <Route path="/scholarships" element={<ProgramTemplate {...programData.scholarships} />} />

        {/* --- AUTHENTICATION --- */}
        <Route path="/signinp" element={<AuthHub />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-success" element={<VerifySuccess />} />
        <Route path="/verify-issue" element={<VerifyIssue />} />

        {/* --- 🔒 PROTECTED: REGULAR USER --- */}
        <Route element={<ProtectedRoute allowedRoles={['regularUser', 'admin', 'seniorAdmin']} />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/grant-application" element={<GrantApplication />} />
        </Route>

        {/* --- 🔒 PROTECTED: ADMINS & SENIOR ADMINS --- */}
        <Route element={<ProtectedRoute allowedRoles={['admin', 'seniorAdmin']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/blog" element={<BlogApprovalManager />} />
          <Route path="/admin/job" element={<JobApplications />} />
          <Route path="/admin/contact" element={<ContactMessages />} />
          <Route path="/admin/nll" element={<NewsletterList />} />
        </Route>

        {/* --- 🔒 PROTECTED: SENIOR ADMIN ONLY --- */}
        <Route element={<ProtectedRoute allowedRoles={['seniorAdmin']} />}>
          <Route path="/seniorAdmin" element={<SeniorAdminPanel />} />
          <Route path="/admin/donations" element={<DonationManager />} />
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* <Vasertile /> */}
      <BackToTop />
      <Footer />
    </div>
  );
}








// import { Routes, Route } from 'react-router-dom';
// import HomePage from './pages/charityPage/Homepage';
// // import Navbar from './components/layout/Navbar';
// import { Footer } from './components/layout/Footer';
// import MainNav from './components/layout/MainNav';
// import theme from './components/themes/Theme';
// import ScrollProgressBar from './components/layout/ScrollProgressBar';
// // import ScrollToTop from './components/layout/ScrollToTop';
// import About from './pages/charityPage/About';
// import Features from './pages/charityPage/Feature';
// import CareersPage from './pages/careerPage/Careers';
// import WhatWeDo from './pages/charityPage/WhatWeDo';
// import Donate from './pages/donationPage/Donate';
// import { PortfolioPage } from './pages/PortfolioPage/Portfolio1';
// import CharityHero from './pages/charityPage/CharityHero';
// import Vasertile from './pages/charityPage/Vasertile';
// import PartnerForm from './pages/charityPage/PartnerPage';
// import PartnerLogo from './pages/charityPage/PartnerLogo';
// import WhyChooseUs from './pages/charityPage/WhyChooseUs';
// import SupportPage from './pages/charityPage/Support';
// import { useState } from 'react';
// import ProtectedRoute from './pages/adminPage/ProtectedRoute';
// import AdminDashboard from './pages/adminPage/AdminDashboar';
// import DonationManager from './pages/seniorAdmin/DonationManager';
// import Unauthorized from './pages/adminPage/UnauthorizedPage';
// import BlogApprovalManager from './pages/adminPage/BlogApprovalManager';
// import JobApplications from './pages/adminPage/JobApplications';
// import ContactMessages from './pages/adminPage/ContactMessagesSupport';
// import NewsletterList from './pages/adminPage/NewsletterList';
// import AuthHub from './pages/userPage/AuthHub';
// import SignupPage from './pages/userPage/SignupPage';
// import ScrollToTopGlobal from './components/layout/ScrollToTopGlobal';
// import BackToTop from './components/layout/BackToTop';
// import GrantApplication from './pages/charityPage/GrantApplication';
// import UserDashboard from './pages/userPage/UserDashboard';
// import SeniorAdminPanel from './pages/seniorAdmin/SeniorAdminPanel';
// import MLProtect from './pages/seniorAdmin/MultiLevelProtect';


// export default function App() {
 
//   const [user] = useState({ loggedIn: true, role: 'isadmin' as 'regularUser' | 'isadmin' | 'seniorAdmin' | null });  // Explicitly type role to match ProtectedRoute's expected union

//   return (
//     <>
//     <ScrollProgressBar/>
//     <MainNav/>
//     <div style={{ background: theme.gold, height: '1.7rem', paddingBottom:'0px' }}></div>
//     <ScrollToTopGlobal/>
//     {/* <ScrollToTop/> */}

//         <Routes>
//           {/* charity routes */}
//             <Route path="/" element={<HomePage />} />
//             <Route path="/" element={<CharityHero />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/what-we-do" element={<WhatWeDo />} />
//             <Route path="/mission" element={<Features />} />
//             <Route path="/job" element={<CareersPage />} />
//             <Route path="/donate" element={<Donate />} />
//             <Route path="/partnerp" element={<PartnerForm />} />
//             <Route path="/partnerlogo" element={<PartnerLogo />} />
//             <Route path="/whychooseusp" element={<WhyChooseUs />} />
//             <Route path="/contactp" element={<SupportPage />} />
//             <Route path="/unauthorized" element={<Unauthorized />} />
            
//             {/* ensure you correct this for seniorAdmin protect routes */}
//             {/* 🔒 PROTECTED SENIOR-ADMIN ROUTES */}
//             <Route element={<ProtectedRoute allowedRoles={['seniorAdmin']} userRole={user.role} />}>
//               <Route path="/seniorAdmin" element={<SeniorAdminPanel />} />
//               {/* <Route path="/admin" element={<MLProtect />} /> */}
//               {/* <Route path="/admin" element={<AdminDashboard />} /> */}
//               <Route path="/admin/donations" element={<DonationManager userRole={'seniorAdmin'} />} />
                        
//             </Route>

//           {/* 🔒 PROTECTED ADMIN ROUTES */}
//             <Route element={<ProtectedRoute allowedRoles={['isadmin', 'seniorAdmin']} userRole={user.role} />}>
//               <Route path="/admin" element={<AdminDashboard />} />
//               <Route path="/admin/donations" element={<DonationManager userRole={'seniorAdmin'} />} />
//               <Route path="/admin/blog" element={<BlogApprovalManager />} />
//               <Route path="/admin/job" element={<JobApplications />} />
//               <Route path="/admin/contact" element={<ContactMessages />} />
//               <Route path="/admin/nll" element={<NewsletterList />} /> 
                        
//             </Route>
            
//             {/* Protected: User Only */}
//             <Route element={<ProtectedRoute allowedRoles={['isadmin']} userRole={user.role} />}>
//               <Route path="/dashboard" element={<UserDashboard />} />
//               <Route path="/grant-application" element={<GrantApplication />} />           
//             </Route>

//             {/* authentication routes */}
//             <Route path="/signinp" element={<AuthHub/>} />
//             <Route path="/signup" element={<SignupPage />} />
//             {/* <Route path="/registerp" element={<SignupWithVerification />} /> */}

//           {/* Portfolio Routes */}
//             <Route path="/portfolio" element={< PortfolioPage/>} />

//             {/* 404 Page */}
//             {/* <Route path="*" element={<Unauthorized />} /> */}
//         </Routes>

//         <Vasertile/>
//         <BackToTop/>       
//       <Footer />
//     </>
//   );
// }







