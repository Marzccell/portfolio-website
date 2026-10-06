import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader.jsx';
import { tech } from '../data/portfolio.js';

export default function TechStack() {
  return (
    <section id="stack" className="relative z-10 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Tech Stack" title="Tools chosen for speed, craft, and maintainability." />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {tech.map(({ name, icon: Icon }, index) => (
            <motion.div
              key={name}
              className="group flex min-h-36 flex-col items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] p-6 text-center backdrop-blur-xl"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              animate={{ y: [0, index % 2 ? 9 : -9, 0] }}
              transition={{ y: { repeat: Infinity, duration: 4 + index * 0.14, ease: 'easeInOut' }, opacity: { duration: 0.5 }, delay: index * 0.05 }}
            >
              <div className="grid h-14 w-14 place-items-center rounded-lg bg-cyanGlow/12 text-cyanGlow transition group-hover:scale-110 group-hover:shadow-glow">
                <Icon size={27} />
              </div>
              <p className="mt-5 font-bold text-white">{name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
