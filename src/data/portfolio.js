import {
  Code2,
  Database,
  Figma,
  Github,
  Globe2,
  Layers3,
  Linkedin,
  Mail,
  Rocket,
  ServerCog,
  Sparkles,
  TerminalSquare,
  Twitter,
  Wand2,
  Zap,
} from 'lucide-react';

export const profile = {
  name: 'Alex Nova',
  role: 'Creative Frontend Developer',
  location: 'Jakarta, Indonesia',
  intro:
    'I design and build polished digital products with kinetic interfaces, clean systems, and production-grade frontend architecture.',
  email: 'hello@alexnova.dev',
  socials: [
    { label: 'GitHub', href: 'https://github.com/', icon: Github },
    { label: 'LinkedIn', href: 'https://linkedin.com/', icon: Linkedin },
    { label: 'Twitter', href: 'https://x.com/', icon: Twitter },
    { label: 'Email', href: 'mailto:hello@alexnova.dev', icon: Mail },
  ],
};

export const skills = [
  { title: 'Interface Systems', icon: Layers3, detail: 'Design systems, reusable components, accessibility, responsive UI.' },
  { title: 'Motion Design', icon: Sparkles, detail: 'Framer Motion, GSAP timelines, scroll choreography, microinteractions.' },
  { title: 'Full Stack Flow', icon: ServerCog, detail: 'Supabase, API integration, auth-ready data models, deployment polish.' },
  { title: 'Performance', icon: Zap, detail: 'Fast loading, lean assets, intentional effects, Lighthouse-minded builds.' },
];

export const timeline = [
  { year: '2022', title: 'Started Frontend Engineering', text: 'Built landing pages, dashboards, and UI systems for early products.' },
  { year: '2023', title: 'Motion-First Product Work', text: 'Focused on animation systems and interactive storytelling for the web.' },
  { year: '2024', title: 'Full Stack Product Builds', text: 'Shipped Supabase-backed tools with polished React experiences.' },
  { year: '2026', title: 'Creative Technology Studio', text: 'Combining engineering, design craft, and immersive product interfaces.' },
];

export const categories = ['All', 'Web App', 'AI', 'Commerce'];

export const projects = [
  {
    title: 'Nebula Console',
    category: 'Web App',
    image: '/projects/nebula.svg',
    summary: 'A cinematic analytics command center for creators and SaaS teams.',
    stack: ['React', 'Framer Motion', 'Supabase', 'Tailwind'],
    metrics: ['94 Lighthouse', '28 reusable modules', 'Realtime dashboards'],
    live: 'https://example.com',
    github: 'https://github.com/',
  },
  {
    title: 'Atlas Storefront',
    category: 'Commerce',
    image: '/projects/atlas.svg',
    summary: 'A premium commerce experience with fast filtering and product storytelling.',
    stack: ['Vite', 'GSAP', 'Stripe-ready UI', 'Tailwind'],
    metrics: ['Sub-2s load', 'CMS-ready', 'Responsive catalog'],
    live: 'https://example.com',
    github: 'https://github.com/',
  },
  {
    title: 'Pulse AI Studio',
    category: 'AI',
    image: '/projects/pulse.svg',
    summary: 'An AI assistant workspace with prompt history, model routing, and rich states.',
    stack: ['React', 'Supabase Auth', 'Edge Functions', 'Motion'],
    metrics: ['Auth-ready', 'Streaming UX', 'Keyboard-first'],
    live: 'https://example.com',
    github: 'https://github.com/',
  },
];

export const tech = [
  { name: 'React', icon: Code2 },
  { name: 'Vite', icon: Rocket },
  { name: 'Tailwind', icon: Wand2 },
  { name: 'Framer', icon: Sparkles },
  { name: 'GSAP', icon: TerminalSquare },
  { name: 'Supabase', icon: Database },
  { name: 'Figma', icon: Figma },
  { name: 'Web APIs', icon: Globe2 },
];
