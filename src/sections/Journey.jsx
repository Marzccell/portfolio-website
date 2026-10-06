import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../components/SectionHeader.jsx';
import { timeline } from '../data/portfolio.js';

gsap.registerPlugin(ScrollTrigger);

export default function Journey() {
  const rootRef = useRef(null);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.from('.journey-item', {
        opacity: 0,
        x: -36,
        stagger: 0.18,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 70%',
        },
      });
      gsap.fromTo(
        '.journey-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top',
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 72%',
            end: 'bottom 45%',
            scrub: true,
          },
        },
      );
    }, rootRef);
    return () => context.revert();
  }, []);

  return (
    <section id="journey" ref={rootRef} className="relative z-10 px-5 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeader eyebrow="Journey" title="A timeline built around shipping stronger experiences." />
        <div className="relative pl-8">
          <div className="absolute left-2 top-0 h-full w-px bg-white/12" />
          <div className="journey-line absolute left-2 top-0 h-full w-px bg-cyanGlow shadow-glow" />
          <div className="grid gap-6">
            {timeline.map((item) => (
              <article className="journey-item relative rounded-lg border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl" key={item.title}>
                <span className="absolute -left-[35px] top-7 h-4 w-4 rounded-full border-2 border-ink bg-cyanGlow shadow-glow" />
                <p className="text-sm font-bold text-cyanGlow">{item.year}</p>
                <h3 className="mt-2 text-2xl font-black text-white">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
