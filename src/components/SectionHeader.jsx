import { motion } from 'framer-motion';

export default function SectionHeader({ eyebrow, title, text }) {
  return (
    <motion.div
      className="mx-auto mb-12 max-w-3xl text-center"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65 }}
    >
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-cyanGlow">{eyebrow}</p>
      <h2 className="font-display text-3xl font-black tracking-0 text-white md:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">{text}</p>}
    </motion.div>
  );
}
