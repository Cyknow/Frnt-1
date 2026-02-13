// src/components/SkillsHub.tsx

import React from 'react';

const COLORS = {
  primary: '#001F5C',
  accent: '#FFD700',
};

const SKILL_HUBS = [
  { 
    title: "Development Hub", 
    description: "Expertise in building scalable, component-driven web applications and clean APIs.",
    skills: ["React/TypeScript", "Next.js/Node.js", "Tailwind CSS", "API Design"],
    color: '#00BFFF', // Sky Blue for Tech
    icon: '💻'
  },
  { 
    title: "Design & UX Hub", 
    description: "Translating complex problems into intuitive, user-centric experiences and polished UIs.",
    skills: ["Figma Prototyping", "User Research", "Wireframing", "A/B Testing"],
    color: '#FF7F50', // Coral for Design
    icon: '🎨'
  },
  { 
    title: "Strategy & Data Hub", 
    description: "Driving decisions with data—from market analysis to conversion optimization and reporting.",
    skills: ["Google Analytics", "SQL/Database", "SEO/SEM Strategy", "KPI Tracking"],
    color: '#32CD32', // Lime Green for Strategy
    icon: '📈'
  },
];

export const SkillsHub: React.FC = () => {
  return (
    <section className="py-20 md:py-28" id="skills">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-3" style={{ color: COLORS.primary }}>
            My Multidisciplinary Hubs
          </h2>
          <p className="text-lg" style={{ color: COLORS.primary, opacity: 0.7 }}>
            Showcasing a unique blend of technical, creative, and analytical expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {SKILL_HUBS.map((hub, index) => (
            <div 
              key={index} 
              className="p-8 rounded-xl border-t-8 h-full flex flex-col transition duration-300 hover:shadow-2xl hover:scale-[1.01]"
              style={{ 
                borderColor: hub.color, 
                backgroundColor: 'white', 
                boxShadow: `0 8px 20px rgba(0, 31, 92, 0.1)` 
              }}
            >
              <div className="flex items-center mb-4">
                  <span className="text-4xl mr-3">{hub.icon}</span>
                  <h3 className="text-2xl font-bold" style={{ color: COLORS.primary }}>
                      {hub.title}
                  </h3>
              </div>
              
              <p className="text-gray-600 mb-6 grow">
                {hub.description}
              </p>
              
              <div className="mt-auto">
                <h4 className="font-semibold mb-2" style={{ color: COLORS.primary }}>Core Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {hub.skills.map(skill => (
                    <span 
                      key={skill}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: hub.color, color: 'white' }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};