// src/pages/ProjectPortfolioPage.tsx (or components/ProjectPortfolio.tsx)

import React, { useState } from 'react';

const COLORS = {
  primary: '#001F5C',
  accent: '#FFD700',
  background: '#F0F8FF',
};

// Define Project Data
const PROJECTS = [
  { id: 1, title: 'E-Commerce Redesign', skills: ['UX Design', 'React/TS', 'Data'], category: 'design' },
  { id: 2, title: 'Serverless API Backend', skills: ['React/TS', 'Development'], category: 'development' },
  { id: 3, title: 'Mobile App Wireframes', skills: ['UX Design', 'Design'], category: 'design' },
  { id: 4, title: 'Q3 Analytics Dashboard', skills: ['Data', 'Development'], category: 'data' },
  { id: 5, title: 'Brand Identity Guide', skills: ['Design'], category: 'design' },
];

export const ProjectPortfolioPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'design' | 'development' | 'data'>('all');

  const filteredProjects = PROJECTS.filter(p => filter === 'all' || p.category === filter);

  const filterButton = (label: string, value: 'all' | 'design' | 'development' | 'data') => (
    <button
      onClick={() => setFilter(value)}
      className="px-6 py-2 rounded-full text-sm font-semibold transition duration-200"
      style={{
        backgroundColor: filter === value ? COLORS.accent : 'transparent',
        color: filter === value ? COLORS.primary : COLORS.primary,
        border: `2px solid ${filter === value ? COLORS.accent : COLORS.primary}`,
        boxShadow: filter === value ? '0 4px 8px rgba(255, 215, 0, 0.4)' : 'none',
      }}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen pt-16" id="portfolio" style={{ backgroundColor: COLORS.background }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* === Header & Filter === */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4" style={{ color: COLORS.primary }}>
            Case Studies & Projects
          </h1>
          <p className="text-xl mb-8" style={{ color: COLORS.primary, opacity: 0.7 }}>
            A curated look into my best work across different disciplines.
          </p>
          
          {/* Filter Bar (Like HubSpot's resource library filters) */}
          <div className="flex flex-wrap justify-center gap-4">
            {filterButton('All Projects', 'all')}
            {filterButton('UX/Design', 'design')}
            {filterButton('Development', 'development')}
            {filterButton('Data/Strategy', 'data')}
          </div>
        </div>

        {/* === Project Grid === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
          {filteredProjects.map((project) => (
            <a 
              key={project.id} 
              href={`/project/${project.id}`} 
              className="group block rounded-xl overflow-hidden shadow-lg transition duration-300 transform hover:scale-[1.03]"
              style={{ borderTop: `6px solid ${COLORS.primary}`, backgroundColor: 'white' }}
            >
              {/* Project Image Placeholder */}
              <div 
                className="h-48 bg-gray-200 flex items-center justify-center"
                style={{ backgroundColor: COLORS.primary, opacity: 0.8 }}
              >
                <span className="text-white text-xl font-bold">Project #{project.id} Visual</span>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 transition duration-200 group-hover:text-amber-600" style={{ color: COLORS.primary }}>
                  {project.title}
                </h3>
                <p className="text-sm mb-4" style={{ color: COLORS.primary, opacity: 0.7 }}>
                  **Focus:** {project.skills.join(' | ')}
                </p>
                <span className="font-semibold text-sm" style={{ color: COLORS.accent }}>
                  View Case Study &rarr;
                </span>
              </div>
            </a>
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
            <p className="text-center text-xl py-10" style={{ color: COLORS.primary, opacity: 0.7 }}>
                No projects found in this category.
            </p>
        )}
      </div>
    </div>
  );
};