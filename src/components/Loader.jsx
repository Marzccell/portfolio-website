import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-ink"
      exit={{ opacity: 0, transition: { duration: 0.55, ease: 'easeInOut' } }}
    >
      <div className="relative h-28 w-28">
        <motion.div
          className="absolute inset-0 rounded-full border border-cyanGlow/40"
          animate={{ rotate: 360, scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-4 rounded-full border border-violetGlow/50"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
        />
        <div className="absolute inset-0 grid place-items-center text-sm font-semibold tracking-[0.35em] text-cyanGlow">AN</div>
      </div>
    </motion.div>
  );
}
