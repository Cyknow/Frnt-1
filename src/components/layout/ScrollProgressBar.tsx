import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressBar() {
  // 1. Track the scroll progress (value between 0 and 1)
  const { scrollYProgress } = useScroll();

  // 2. Create a "spring" effect so the bar doesn't jump, it glides
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* 3. The Actual Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#FFD700] origin-left z-100"
        style={{ scaleX }}
      />
    </>
  );
}