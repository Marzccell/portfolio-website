import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = ['About', 'Projects', 'Stack', 'Journey', 'Contact'];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update);
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4">
      <motion.nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-3 backdrop-blur-xl transition ${
          scrolled ? 'border-white/14 bg-ink/72 shadow-glow' : 'border-white/10 bg-white/5'
        }`}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <a className="flex items-center gap-3 font-display text-sm font-bold tracking-[0.28em] text-white" href="#home">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-cyanGlow text-ink shadow-glow">A</span>
          NOVA
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a className="rounded-full px-4 py-2 text-sm text-white/72 transition hover:bg-white/10 hover:text-white" href={`#${item.toLowerCase()}`} key={item}>
              {item}
            </a>
          ))}
        </div>
        <button className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white md:hidden" type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </motion.nav>
      {open && (
        <div className="mx-auto mt-3 grid max-w-6xl gap-2 rounded-lg border border-white/10 bg-ink/92 p-3 backdrop-blur-xl md:hidden">
          {navItems.map((item) => (
            <a className="rounded-lg px-4 py-3 text-white/80 hover:bg-white/10" href={`#${item.toLowerCase()}`} key={item} onClick={() => setOpen(false)}>
              {item}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
