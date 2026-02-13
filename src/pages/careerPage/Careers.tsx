// CareersPage.jsx
import { motion } from "framer-motion";
import "./Carreers.css";
import Vasertile from "../charityPage/Vasertile";

export default function CareersPage() {
  return (
    <div className="careers-page">
      <motion.div
        className="animated-bg"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <div className="content-wrapper">
        <motion.h1
          className="heading"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Build Your Career With Us
        </motion.h1>

        <motion.p
          className="subtext"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Join a team driven by innovation, excellence, and impact.
        </motion.p>

        <div className="cards-grid">
          <a href="/signup">
          {roles.map((role, index) => (
            <motion.div
              key={role.title}
              className="career-card"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <h3>{role.title}</h3>
              <p>{role.desc}</p>
              <button>Apply Now</button>
            </motion.div>
          ))}
          </a>
        </div>
      </div>
      <Vasertile />
    </div>
  );
}

const roles = [
  { title: "Frontend Developer", desc: "React, UI/UX, performance-focused." },
  { title: "Backend Developer", desc: "Node.js, APIs, scalable systems." },
  { title: "Product Manager", desc: "Strategy, leadership, execution." },
];




/*import React from "react";
import { motion } from "framer-motion";
import theme from '../../components/themes/Theme';
import type { CSSProperties } from "react";


// const colors = {
//   primary: "#001F5C", // Deep Blue
//   accent: "#FFD700", // Gold
//   background: "#F0F8FF", // Sparkling White
// };

export default function CareersPage() {
  return (
    <div style={styles.page}>

      {/* Animated Background*
      <motion.div
        style={styles.animatedBg}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Content *
      <div style={{styles.contentWrapper}}>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={styles.heading}
        >
          Build Your Career With Us
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={styles.subText}
        >
          Join a team driven by innovation, excellence, and impact.
        </motion.p>

        <div style={styles.cardsGrid}>
          {roles.map((role, index) => (
            <motion.div
              key={role.title}
              style={styles.card}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <h3 style={styles.cardTitle}>{role.title}</h3>
              <p style={styles.cardDesc}>{role.desc}</p>
              <button style={styles.button}>Apply Now</button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

const roles = [
  { title: "Frontend Developer", desc: "React, UI/UX, performance-focused." },
  { title: "Backend Developer", desc: "Node.js, APIs, scalable systems." },
  { title: "Product Manager", desc: "Strategy, leadership, execution." },
];

const styles = {
  page: {
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden",
    background: theme.white,
    fontFamily: "Inter, sans-serif",
  },
  animatedBg: {
    position: "absolute",
    inset: 0,
    background: `linear-gradient(120deg, ${theme.blue}, ${theme.gold}, ${theme.white})`,
    backgroundSize: "400% 400%",
    zIndex: 0,
    opacity: 0.15,
  },
  contentWrapper: {
    position: "relative",
    zIndex: 1,
    padding: "5rem 2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    textAlign: "center",
  },
  heading: {
    fontSize: "3rem",
    color: theme.blue,
    marginBottom: "1rem",
  },
  subText: {
    fontSize: "1.2rem",
    color: "#333",
    marginBottom: "4rem",
  },
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
  },
  card: {
    background: "#ffffff",
    borderRadius: "1.5rem",
    padding: "2.5rem",
    textAlign: "left",
    transition: "all 0.3s ease",
  },
  cardTitle: {
    color: theme.blue,
    fontSize: "1.4rem",
    marginBottom: "0.5rem",
  },
  cardDesc: {
    color: "#555",
    marginBottom: "1.5rem",
  },
  button: {
    background: theme.gold,
    border: "none",
    padding: "0.7rem 1.5rem",
    borderRadius: "999px",
    cursor: "pointer",
    fontWeight: "600",
    color: theme.blue,
  },
};
*/




/*import React from 'react';
import theme from '../../components/themes/Theme';

export default function Careers(){
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-2xl font-bold text-blue-700">Jobs & Internships</h2>
      <p className="mt-4 text-gray-700">We offer internship placements and permanent roles across programs, admin and field operations. Upload your CV and cover letter below.</p>
      <form className="mt-6 space-y-4 bg-white rounded p-6 shadow">
        <label className="block">
          <div className="text-sm">Full name</div>
          <input className="mt-1 w-full border rounded px-3 py-2" />
        </label>
        <label className="block">
          <div className="text-sm">Email</div>
          <input type="email" className="mt-1 w-full border rounded px-3 py-2" />
        </label>
        <label className="block">
          <div className="text-sm">Position applying for</div>
          <input className="mt-1 w-full border rounded px-3 py-2" />
        </label>
        <label className="block">
          <div className="text-sm">Upload CV</div>
          <input type="file" className="mt-1" />
        </label>
        <button className="px-4 py-2 rounded" style={{background: theme.gold}}> Submit Application</button>
      </form>
    </div>
  )
}
*/