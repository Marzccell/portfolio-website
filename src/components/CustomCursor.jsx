import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 420, damping: 34 });
  const springY = useSpring(y, { stiffness: 420, damping: 34 });

  useEffect(() => {
    const move = (event) => {
      x.set(event.clientX - 16);
      y.set(event.clientY - 16);
    };
    const enter = (event) => {
      if (event.target.closest('a, button, input, textarea, [data-cursor]')) setActive(true);
    };
    const leave = (event) => {
      if (event.target.closest('a, button, input, textarea, [data-cursor]')) setActive(false);
    };
    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', enter);
    document.addEventListener('mouseout', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', enter);
      document.removeEventListener('mouseout', leave);
    };
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[95] hidden h-8 w-8 rounded-full border border-cyanGlow/70 mix-blend-screen md:block"
      style={{ x: springX, y: springY }}
      animate={{ scale: active ? 1.9 : 1, backgroundColor: active ? 'rgba(94,231,255,0.12)' : 'rgba(94,231,255,0)' }}
    />
  );
}
