// src/pages/PricingPage.tsx

import React from 'react';

// --- Color Palette ---
const COLORS = {
  primary: '#001F5C',      // Deep Blue
  accent: '#FFD700',       // Gold
  background: '#F0F8FF',   // Sparkling White
};

const PRICING_TIERS = [
  {
    name: 'Starter',
    price: '$50',
    frequency: 'per month',
    features: ['All Free Tools', 'Simple Automation', '2,000 Contacts'],
    isPopular: false,
  },
  {
    name: 'Professional',
    price: '$800',
    frequency: 'per month',
    features: ['Everything in Starter', 'Advanced Customization', '3rd-Party Integrations', '24/7 Support'],
    isPopular: true,
  },
  {
    name: 'Enterprise',
    price: '$3,200',
    frequency: 'per month',
    features: ['Everything in Professional', 'High-Volume Scaling', 'Dedicated Account Manager', 'Security Audits'],
    isPopular: false,
  },
];

export const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.background }}>
      <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* === Page Header === */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3" style={{ color: COLORS.primary }}>
            Find the Perfect Plan for Your Growth
          </h1>
          <p className="text-xl" style={{ color: COLORS.primary, opacity: 0.7 }}>
            Simple, transparent pricing that scales with your business.
          </p>
        </div>

        {/* === Pricing Grid === */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PRICING_TIERS.map((tier) => (
            <div 
              key={tier.name}
              className="p-8 rounded-2xl flex flex-col shadow-2xl transition duration-300"
              style={{ 
                backgroundColor: 'white', 
                border: tier.isPopular ? `3px solid ${COLORS.accent}` : '1px solid #ccc',
                transform: tier.isPopular ? 'scale(1.05)' : 'none',
              }}
            >
              {tier.isPopular && (
                <div 
                  className="mb-4 self-start px-4 py-1 rounded-full text-xs font-bold" 
                  style={{ backgroundColor: COLORS.accent, color: COLORS.primary }}
                >
                  Most Popular
                </div>
              )}
              
              <h2 className="text-3xl font-bold mb-3" style={{ color: COLORS.primary }}>
                {tier.name}
              </h2>

              <p className="text-4xl font-extrabold mb-1" style={{ color: COLORS.primary }}>
                {tier.price}
              </p>
              <p className="text-sm mb-6" style={{ color: COLORS.primary, opacity: 0.7 }}>
                {tier.frequency}
              </p>

              <a 
                href={`/checkout/${tier.name.toLowerCase()}`}
                className="w-full text-center px-6 py-3 rounded-lg font-bold transition duration-300 mb-8"
                style={{ 
                  backgroundColor: tier.isPopular ? COLORS.accent : COLORS.primary, 
                  color: tier.isPopular ? COLORS.primary : COLORS.background 
                }}
              >
                Start Free Trial
              </a>
              
              <ul className="space-y-3 grow">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-base" style={{ color: COLORS.primary, opacity: 0.9 }}>
                    <span className="mr-2" style={{ color: COLORS.accent }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};