// src/pages/PortfolioPage.tsx (or simply Home.tsx)

import React from 'react';
import { Link } from 'react-router-dom';
// import PortfoHero from './UserHero';

// --- Color Palette (Assumed from previous steps) ---
const COLORS = {
  primary: '#001F5C',      // Deep Blue
  accent: '#FFD700',       // Gold
  background: '#F0F8FF',   // Sparkling White
};

// --- Data Structure for Portfolio Content ---
const PROFESSIONAL_HUBS = [
  {
    title: "Software & Project Management",
    skills: ["Fullstack Web Development (MERN)", "Project & Team Management", "Technical Documentation & Reporting"],
    icon: '💻',
    description: "Bridging the gap between technical execution and strategic planning, ensuring on-time, high-quality deliverables across all digital projects."
  },
  {
    title: "Engineering & Technical Operations",
    skills: ["Plumbing & Pipefitting Engineering", "Welding & Fabrication", "Forklift Operations & Logistics Supervision"],
    icon: '⚙️',
    description: "Applying certified expertise in industrial mechanical processes, safety compliance, and efficient supply chain logistics."
  },
  {
    title: "Science, Health & Safety (HSE)",
    skills: ["Biochemistry Research & Lab Testing", "HSE Personnel and Compliance", "Technical Documentation & Reporting"],
    icon: '🧪',
    description: "Focused on rigorous compliance, laboratory analysis, and maintaining the highest standards for health, safety, and environmental integrity."
  },
];

const SOCIAL_LINKS = [
  { name: 'LinkedIn', url: 'https://linkedin.com/yourprofile', icon: 'in' },
  { name: 'GitHub', url: 'https://github.com/yourprofile', icon: 'git' },
  { name: 'CV/Resume', url: '/link-to-your-cv.pdf', icon: 'doc' }, // Direct link to PDF
];


export const PortfolioPage: React.FC = () => {
  return (
    <div className="pt-8" style={{ backgroundColor: COLORS.background }}>
      
      {/* === 1. HERO SECTION (Assumed from previous step) === */}
      {/* Include your PortfolioHero or a similar component here */}
      {/* <PortfoHero/> */}
      <div className="mb-20">
          {/* <PortfolioHero /> */} 
          {/* Placeholder for the dynamic Hero component */}
      </div>


      {/* 2. CORE SKILLS/PROFESSIONS HUB (The differentiator) */}
      <section className="py-20" id="professions">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-4" style={{ color: COLORS.primary }}>
            My Professional Ecosystem
          </h2>
          <p className="text-xl text-center mb-16" style={{ color: COLORS.primary, opacity: 0.7 }}>
            A versatile expert excelling in both industrial rigor and digital innovation.
          </p>

          <Link to={'/professions'}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROFESSIONAL_HUBS.map((hub, index) => (
              <div 
                key={index} 
                className="p-6 rounded-lg shadow-xl h-full transition duration-300 hover:shadow-2xl hover:scale-[1.02]"
                style={{ backgroundColor: 'white', borderTop: `5px solid ${COLORS.accent}` }}
              >
                <div className="flex items-center mb-3">
                    <span className="text-3xl mr-3">{hub.icon}</span>
                    <h3 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
                        {hub.title}
                    </h3>
                </div>
                <p className="text-gray-600 mb-4">{hub.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {hub.skills.map(skill => (
                    <span 
                      key={skill}
                      className="px-3 py-1 text-xs font-medium rounded-full"
                      style={{ backgroundColor: COLORS.primary, color: COLORS.background, opacity: 0.9 }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          </Link>
        </div>
      </section>

      <hr className="my-10" style={{ borderColor: COLORS.primary, opacity: 0.1 }}/>


      {/* 3. EXPERIENCE & COMPANIES (HubSpot style section with badges) */}
      <section className="py-20" id="experience">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold mb-10" style={{ color: COLORS.primary }}>
            Previous Roles & Key Partnerships
          </h2>
          <div className="space-y-12">
            
            {/* Previous Job Example */}
            <div className="p-6 rounded-lg shadow-md" style={{ backgroundColor: 'white' }}>
                <h3 className="text-xl font-bold mb-2" style={{ color: COLORS.primary }}>
                    Senior MERN Developer & Project Lead
                </h3>
                <p className="text-lg font-medium mb-3" style={{ color: COLORS.accent }}>
                    Tech Solutions Inc. | 2020 – 2024
                </p>
                <p className="text-gray-600 mb-4">
                    Managed a 5-person team, delivering fullstack solutions that increased client conversion rates by 25%. Implemented Agile methodologies.
                </p>
            </div>

            {/* Partnered Companies (Badges) */}
            <div>
              <h4 className="text-2xl font-semibold mb-6" style={{ color: COLORS.primary, opacity: 0.9 }}>
                Partnered With & Certified By
              </h4>
              <div className="flex flex-wrap justify-center gap-6">
                {['AWS Cloud', 'OSHA Certified', 'CompTIA', 'Industry Leaders'].map((company, index) => (
                  <div key={index} 
                    className="px-6 py-3 rounded-full text-sm font-bold border-2"
                    style={{ borderColor: COLORS.accent, color: COLORS.primary, backgroundColor: COLORS.background }}
                  >
                    {company}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="my-10" style={{ borderColor: COLORS.primary, opacity: 0.1 }}/>


      {/* 4. CTA & DOWNLOAD LINKS SECTION (Always visible, modern portfolio necessity) */}
      <section className="py-20" id="links">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-xl shadow-2xl">
                
                <h2 className="text-3xl font-extrabold mb-6 md:mb-0" style={{ color: COLORS.primary }}>
                    Let's Connect and Build.
                </h2>
                
                <div className="flex flex-wrap justify-center gap-4">
                    {/* CV and GitHub Links */}
                    {SOCIAL_LINKS.map((link, index) => (
                        <a 
                            key={index}
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-lg text-lg font-bold shadow-md transition duration-300 transform hover:scale-[1.05]"
                            style={{ 
                                backgroundColor: link.name === 'CV/Resume' ? COLORS.primary : COLORS.accent, 
                                color: link.name === 'CV/Resume' ? COLORS.background : COLORS.primary
                            }}
                        >
                            {link.name === 'CV/Resume' ? 'Download CV' : link.name}
                        </a>
                    ))}
                </div>
            </div>
        </div>
      </section>

      <hr className="my-10" style={{ borderColor: COLORS.primary, opacity: 0.1 }}/>


      {/* 5. CONTACT FORM (Final CTA) */}
      <section className="py-20" id="contact">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 p-10 rounded-xl shadow-2xl" 
             style={{ backgroundColor: 'white' }}>
          
          <h2 className="text-3xl font-extrabold text-center mb-4" style={{ color: COLORS.primary }}>
            Direct Contact Form
          </h2>
          <p className="text-center mb-10" style={{ color: COLORS.primary, opacity: 0.7 }}>
            Ready to hire a multi-skilled professional? Send a detailed inquiry.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium" style={{ color: COLORS.primary }}>
                Full Name
              </label>
              <input type="text" id="name" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3" style={{ borderColor: COLORS.primary, borderWidth: '1px' }} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium" style={{ color: COLORS.primary }}>
                Email
              </label>
              <input type="email" id="email" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3" style={{ borderColor: COLORS.primary, borderWidth: '1px' }} />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium" style={{ color: COLORS.primary }}>
                Project Details
              </label>
              <textarea id="message" rows={4} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3" style={{ borderColor: COLORS.primary, borderWidth: '1px' }}></textarea>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-lg font-bold shadow-md transition duration-150 hover:scale-[1.01]"
              style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
            >
              Send My Message
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};