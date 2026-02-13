import { motion } from "framer-motion";

// 1. Properly structure your data. 
// Note: If your SVGs are in the public folder, use paths like "/logos/partner1.svg"
const partnerLogos = [
  { name: "Partner 1", logo: "https://cdn.vectorstock.com/i/1000v/71/96/charity-organization-linear-icon-vector-28807196.jpg" },
  { name: "Partner 2", logo: "/src/assets/logos/partner2.svg" },
  { name: "Partner 3", logo: "/src/assets/logos/partner3.svg" },
  { name: "Partner 4", logo: "/src/assets/logos/partner4.svg" },
  { name: "Partner 5", logo: "/src/assets/logos/partner5.svg" },
  { name: "Partner 6", logo: "/src/assets/logos/partner6.svg" },
];

const PartnerLogo = () => {
  return (
    <div className="relative flex overflow-hidden py-10 bg-slate-950">
      {/* Left and Right Gradient Fades */}
      <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-slate-950 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-slate-950 to-transparent z-10" />

      {/* The Moving Container */}
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }} 
        transition={{
          duration: 25, // Slowed down slightly for better readability of logos
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {/* Mapping twice for infinite loop */}
        {[...partnerLogos, ...partnerLogos].map((partner, i) => (
          <div
            key={i}
            className="flex items-center justify-center px-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
          >
            <img 
              src={partner.logo} 
              alt={partner.name} 
              className="h-10 md:h-14 w-auto object-contain mix-blend-screen grayscale hover:grayscale-0 transition-all duration-500" 
              // This error handling prevents broken images from showing
              onError={(e) => (e.currentTarget.style.display = 'none')} 
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default PartnerLogo;