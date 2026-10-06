import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader.jsx';
import { skills, timeline } from '../data/portfolio.js';

export default function About() {
  return (
    <section id="about" className="relative z-10 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="About" title="Interfaces with atmosphere, systems with discipline." text="I blend interaction design, frontend engineering, and product thinking to build work that feels refined and works hard in production." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {skills.map(({ title, detail, icon: Icon }, index) => (
            <motion.article
              key={title}
              className="group rounded-lg border border-white/10 bg-white/[0.065] p-6 backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyanGlow/45 hover:bg-white/[0.09]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <div className="mb-7 grid h-14 w-14 place-items-center rounded-lg bg-cyanGlow/12 text-cyanGlow ring-1 ring-cyanGlow/20 transition group-hover:shadow-glow">
                <Icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{detail}</p>
            </motion.article>
          ))}
        </div>
        <div className="mt-16 rounded-lg border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl md:p-8">
          <div className="grid gap-5 md:grid-cols-4">
            {timeline.map((item, index) => (
              <motion.div key={item.year} className="relative rounded-lg border border-white/8 bg-ink/40 p-5" whileHover={{ y: -8 }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
                <p className="text-sm font-bold text-cyanGlow">{item.year}</p>
                <h3 className="mt-3 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
