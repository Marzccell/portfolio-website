import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import SectionHeader from '../components/SectionHeader.jsx';
import MagneticButton from '../components/MagneticButton.jsx';
import { categories, projects } from '../data/portfolio.js';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const filteredProjects = useMemo(
    () => (activeCategory === 'All' ? projects : projects.filter((project) => project.category === activeCategory)),
    [activeCategory],
  );

  return (
    <section id="projects" className="relative z-10 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Projects" title="Selected builds with product-grade interaction." text="Each project card opens into a richer case-study preview with stack, metrics, and launch links." />
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button key={category} type="button" onClick={() => setActiveCategory(category)} className={`rounded-full border px-5 py-2 text-sm font-bold transition ${activeCategory === category ? 'border-cyanGlow bg-cyanGlow text-ink shadow-glow' : 'border-white/12 bg-white/7 text-white/74 hover:border-cyanGlow/50 hover:text-white'}`}>
              {category}
            </button>
          ))}
        </div>
        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                layout
                key={project.title}
                className="group overflow-hidden rounded-lg border border-white/10 bg-white/[0.065] backdrop-blur-xl"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <button type="button" className="block w-full text-left" onClick={() => setSelectedProject(project)}>
                  <div className="relative aspect-[1.42] overflow-hidden">
                    <img className="h-full w-full object-cover transition duration-700 group-hover:scale-110" src={project.image} alt={`${project.title} preview`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyanGlow">{project.category}</p>
                    <h3 className="mt-3 text-2xl font-black text-white">{project.title}</h3>
                    <p className="mt-3 min-h-20 text-sm leading-7 text-slate-300">{project.summary}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.slice(0, 3).map((item) => (
                        <span className="rounded-full bg-white/8 px-3 py-1 text-xs text-white/70" key={item}>{item}</span>
                      ))}
                    </div>
                  </div>
                </button>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <AnimatePresence>
        {selectedProject && (
          <motion.div className="fixed inset-0 z-[80] grid place-items-center bg-ink/82 px-4 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)}>
            <motion.div className="max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-lg border border-white/12 bg-[#08111f] p-5 shadow-glow md:p-8" initial={{ y: 30, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 30, scale: 0.96 }} onClick={(event) => event.stopPropagation()}>
              <div className="mb-5 flex justify-end">
                <button className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/16" type="button" onClick={() => setSelectedProject(null)} aria-label="Close project details"><X size={18} /></button>
              </div>
              <img className="aspect-[1.85] w-full rounded-lg object-cover" src={selectedProject.image} alt={`${selectedProject.title} large preview`} />
              <div className="mt-7 grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.32em] text-cyanGlow">{selectedProject.category}</p>
                  <h3 className="mt-3 text-3xl font-black text-white">{selectedProject.title}</h3>
                  <p className="mt-4 leading-8 text-slate-300">{selectedProject.summary}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <MagneticButton href={selectedProject.live} className="bg-cyanGlow text-ink"><ExternalLink size={17} /> Live Demo</MagneticButton>
                    <MagneticButton href={selectedProject.github} className="border border-white/12 bg-white/8 text-white"><Github size={17} /> GitHub</MagneticButton>
                  </div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
                  <p className="font-bold text-white">Impact</p>
                  <div className="mt-4 grid gap-3">
                    {selectedProject.metrics.map((metric) => <span className="rounded-lg bg-cyanGlow/10 px-4 py-3 text-sm text-cyanGlow" key={metric}>{metric}</span>)}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
