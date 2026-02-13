import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import type { Variants } from "framer-motion";
import FeatureCard from "./FeatureCard";
import commercials from '../../assets/VID-20251211-WA0026.mp4';
import mockup from '../../assets/Cyknow_MockUp.png';
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

interface Feature {
  title: string;
  desc: string;
  link: string;
  external: boolean;
}

export default function Features() {
  const navigate = useNavigate();

  const handleRedirect = (feature: Feature) => {
    if (feature.external) {
      window.open(feature.link, "_blank", "noopener,noreferrer");
    } else {
      navigate(feature.link);
    }
  };

  return (
    <motion.section>
      <motion.div
      className="container mx-auto py-16 px-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      >
      <motion.h2
        className="text-3xl font-bold text-blue-700 text-center"
        variants={cardVariants}
      >
        Features
      </motion.h2>

      <motion.div
        className="grid md:grid-cols-2 gap-6 mt-10"
        variants={containerVariants}
      >
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            variants={cardVariants}
            whileHover={{ scale: 1.05, y: -6 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleRedirect(feature)}
            className="cursor-pointer"
          >
            <FeatureCard
              title={feature.title}
              desc={feature.desc}
              href={feature.link}
            />
          </motion.div>
        ))}
      </motion.div>
      </motion.div>

      {/* CORPORATE / PARTNERS */}
      <motion.div className="py-24 bg-slate-900">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
          variants={fadeUp}
          initial="hidden" 
          whileInView="visible"
          whileHover={{ scale: 1.05 }}
          viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-yellow-400">Partners & Corporate Engagement</h2>
            <p className="mt-4 text-slate-300">
              We work with corporates, NGOs, and institutions through CSR programs, co-funded projects, and transparent impact reporting.
            </p>
            <Link
              to="/partnerp"
              className="inline-block mt-6 px-8 py-3 rounded-full border border-white/30 hover:bg-yellow-400 text-yellow-400 hover:text-slate-900 transition-all"
            >
              Partner With Us
            </Link>
          </motion.div>

          <div className="rounded-3xl h-70 bg-linear-to-br from-blue-600/20 to-yellow-400/20 border border-white/5">
          <video
          className="w-full h-70 roundded-full"
          // md:w-3/4 lg:w-1/2
          controls
          autoPlay
          muted
          loop
          poster={mockup}
          >
            <source src={commercials} type="video/mp4"/>
          </video>
          </div>

        </div>
      </motion.div>
    </motion.section>
  );
}

const features = [
  {
    title: "Grant & Empowerment",
    desc: "Small grants and business support that let people start sustainable incomes.",
    link: "/signup",
    external: false,
  },
  {
    title: "Internships & Scholarships",
    desc: "Hands-on training, mentorship and scholarships for talented youth.",
    link: "https://cohort.whobaogofoundation.org",
    external: true,
  },
  {
    title: "Green World & Modern Agro Farming",
    desc: "Climate-smart farming, training and tools to boost food security.",
    link: "/signup",
    external: false,
  },
  {
    title: "Medical Care & Humanitarian Aid",
    desc: "Rapid relief, clinics and long-term health programs for vulnerable communities.",
    link: "/signup",
    external: false,
  },
];












/*
import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import FeatureCard from "../../components/types/FeatureCard";
import { Link } from "react-router-dom";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Features() {
  return (
    <motion.div
      className="container mx-auto py-16 px-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-3xl font-bold text-blue-700 text-center"
        variants={cardVariants}
      >
        Features
      </motion.h2>

      <motion.div
        className="grid md:grid-cols-2 gap-6 mt-10"
        variants={containerVariants}
      >
        {features.map((feature) => (
          <motion.a
            key={feature.title}
            href={feature.link}
            variants={cardVariants}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <FeatureCard title={feature.title} desc={feature.desc} href="/blog"/>
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
}

const features = [
  {
    title: "Grant & Empowerment",
    desc: "Small grants and business support that let people start sustainable incomes.",
    link: "/signup",
  },
  {
    title: "Internships & Scholarships",
    desc: "Hands-on training, mentorship and scholarships for talented youth.",
    link: "http://cohort.whobaogofoundation.org",
  },
  {
    title: "Green World & Modern Agro Farming",
    desc: "Climate-smart farming, training and tools to boost food security.",
    link: "/signup",
  },
  {
    title: "Medical Care & Humanitarian Aid",
    desc: "Rapid relief, clinics and long-term health programs for vulnerable communities.",
    link: "/signup",
  },
];





/*import React from 'react'
import FeatureCard from '../../components/types/FeatureCard'

export default function Features(){
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-2xl font-bold text-blue-700">Features</h2>
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <a href="http://">
        <FeatureCard title="Grant & Empowerment" desc="Small grants and business support that let people start sustainable incomes." />
        </a>
        <a href="http://cohort.whobaogofoundation.org">
        <FeatureCard title="Internships & Scholarships" desc="Hands-on training, mentorship and scholarships for talented youth." />
        </a>
        <a href="http://">
        <FeatureCard title="Green World & Modern Agro Farming" desc="Climate-smart farming, training and tools to boost food security." />
        </a>
        <a href="http://">
        <FeatureCard title="Medical Care & Humanitarian Aid" desc="Rapid relief, clinics and long-term health programs for vulnerable communities." />
        </a>
      </div>
    </div>
  )
}*/
