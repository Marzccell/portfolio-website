 "use client";

import { useScroll, useSpring } from "framer-motion";
import { motion } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 130, damping: 30, mass: 0.25 });

  return (
    <div className="scroll-progress" aria-hidden>
      <motion.span style={{ scaleY }} />
      <small>01 / 08</small>
    </div>
  );
}
