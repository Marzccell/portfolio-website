import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import Loader from './components/Loader.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Projects from './sections/Projects.jsx';
import TechStack from './sections/TechStack.jsx';
import Journey from './sections/Journey.jsx';
import Contact from './sections/Contact.jsx';
import ParticleField from './components/ParticleField.jsx';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1550);
    return () => window.clearTimeout(timer);
  }, []);

  const themeLabel = useMemo(() => (isDark ? 'Switch to light mode' : 'Switch to dark mode'), [isDark]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f5f7fb] text-slate-950 antialiased dark:bg-ink dark:text-white">
      <AnimatePresence mode="wait">{isLoading && <Loader />}</AnimatePresence>
      <motion.div className="fixed left-0 top-0 z-[90] h-1 origin-left bg-cyanGlow" style={{ scaleX }} />
      <CustomCursor />
      <ParticleField />
      <Navbar />
      <button
        className="fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/10 text-white shadow-glow backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyanGlow/60 hover:bg-cyanGlow/15 dark:bg-white/10"
        type="button"
        aria-label={themeLabel}
        onClick={() => setIsDark((value) => !value)}
      >
        {isDark ? <Sun size={19} /> : <Moon size={19} />}
      </button>
      <main>
        <Hero />
        <About />
        <Projects />
        <TechStack />
        <Journey />
        <Contact />
      </main>
    </div>
  );
}
