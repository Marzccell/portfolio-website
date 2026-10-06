import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download, MousePointer2 } from 'lucide-react';
import MagneticButton from '../components/MagneticButton.jsx';
import { profile } from '../data/portfolio.js';

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 160]);
  const opacity = useTransform(scrollY, [0, 520], [1, 0.25]);

  return (
    <section id="home" className="relative z-10 flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-28">
      <motion.div className="absolute inset-0 bg-radial-grid" style={{ y, opacity }} />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:76px_76px] [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div initial={{ opacity: 0, y: 38 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.45 }}>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-cyanGlow backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-cyanGlow shadow-glow" />
            Available for ambitious frontend work
          </div>
          <h1 className="max-w-4xl font-display text-5xl font-black leading-[0.96] text-white md:text-7xl lg:text-8xl">
            {profile.name}
            <span className="block bg-gradient-to-r from-cyanGlow via-white to-violetGlow bg-clip-text text-transparent">
              {profile.role}
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">{profile.intro}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <MagneticButton href="#projects" className="bg-cyanGlow text-ink shadow-glow hover:bg-white">
              Explore Work <ArrowRight size={18} />
            </MagneticButton>
            <MagneticButton href="/resume.pdf" className="border border-white/15 bg-white/8 text-white backdrop-blur-xl hover:border-cyanGlow/60 hover:bg-white/14">
              Resume <Download size={18} />
            </MagneticButton>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {profile.socials.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/8 text-white/76 transition hover:-translate-y-1 hover:border-cyanGlow/70 hover:text-cyanGlow" aria-label={label}>
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="relative mx-auto aspect-square w-full max-w-[460px]"
          initial={{ opacity: 0, scale: 0.86, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, delay: 1.65, ease: 'easeOut' }}
        >
          <div className="absolute inset-0 rounded-full bg-cyanGlow/18 blur-3xl" />
          <motion.div className="absolute inset-10 rounded-lg border border-cyanGlow/35 bg-white/8 shadow-glow backdrop-blur-xl" animate={{ y: [0, -18, 0], rotate: [0, 2, 0] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }} />
          <motion.div className="absolute inset-20 rounded-lg border border-violetGlow/35 bg-ink/76 p-7 shadow-violet" animate={{ y: [0, 16, 0], rotate: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}>
            <div className="mb-6 flex gap-2"><span className="h-3 w-3 rounded-full bg-red-400" /><span className="h-3 w-3 rounded-full bg-solar" /><span className="h-3 w-3 rounded-full bg-cyanGlow" /></div>
            <pre className="overflow-hidden text-sm leading-7 text-cyanGlow">
              <code>{`const craft = {
  motion: 'precise',
  ui: 'immersive',
  stack: 'React',
  status: 'shipping'
}`}</code>
            </pre>
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.32em] text-white/42 md:flex">
        <MousePointer2 size={14} /> Scroll
      </div>
    </section>
  );
}
