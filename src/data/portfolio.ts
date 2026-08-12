/**
 * The portfolio's editable content lives here so the story choreography can
 * remain focused on presentation. Keep these exports JSON-serializable.
 */

export type PersonalInfo = {
  name: string;
  firstName: string;
  initials: string;
  role: string;
  location: string;
  email: string;
  introduction: string;
  availability: string;
};

export type StoryPhrases = {
  opening: {
    system: string;
    greeting: string;
    statement: string;
  };
  curiosity: readonly string[];
  structure: readonly string[];
  building: readonly string[];
  growth: readonly string[];
  capability: readonly string[];
  present: readonly string[];
  future: readonly string[];
  closing: {
    prompt: string;
    invitation: string;
  };
};

export type Project = {
  id: string;
  number: string;
  name: string;
  category: string;
  summary: string;
  outcome: string;
  stack: readonly string[];
};

export type Milestone = {
  year: string;
  title: string;
  description: string;
};

export type SkillBranch = {
  id: string;
  name: string;
  description: string;
  technologies: readonly string[];
};

export type FocusItem = {
  id: string;
  label: string;
  title: string;
  description: string;
};

export type Experience = {
  period: string;
  role: string;
  organization: string;
  summary: string;
};

export type SocialLink = {
  id: 'github' | 'linkedin' | 'email' | 'resume';
  label: string;
  href: string;
  detail: string;
  external: boolean;
};

export const personalInfo: PersonalInfo = {
  name: 'Alex Morgan',
  firstName: 'Alex',
  initials: 'AM',
  role: 'Software Engineer',
  location: 'Jakarta, Indonesia',
  email: 'hello@alexmorgan.dev',
  introduction:
    'I turn curious questions into thoughtful digital products, balancing resilient engineering with precise, human interfaces.',
  availability: 'Open to thoughtful products, ambitious teams, and difficult problems.',
};

export const storyPhrases = {
  opening: {
    system: '> initializing',
    greeting: "Hi, I'm Alex Morgan.",
    statement: 'I build things with code.',
  },
  curiosity: ['It started with curiosity.', 'Curiosity became code.'],
  structure: [
    'Code is only the beginning.',
    'What matters is what you build with it.',
  ],
  building: [
    'Then code became something real.',
    'Every project asked a better question.',
  ],
  growth: [
    'What I built became part of who I became.',
    'Every project changed how I think.',
    'Every challenge added something new.',
  ],
  capability: [
    'Growth became capability.',
    'Tools change.',
    "The goal doesn't.",
    'Build things that matter.',
  ],
  present: ['Right now.', "I'm still building."],
  future: [
    "I'm just getting started.",
    'More things to build.',
    'More problems to solve.',
    'More to learn.',
  ],
  closing: {
    prompt: "> what's next?",
    invitation: "Let's build something.",
  },
} as const satisfies StoryPhrases;

export const projects = [
  {
    id: 'signal',
    number: '01',
    name: 'Signal',
    category: 'Collaborative workspace',
    summary:
      'A calm planning environment that turns scattered product decisions into one shared, live narrative.',
    outcome: 'Designed around clarity, realtime collaboration, and decisions that stay discoverable.',
    stack: ['Next.js', 'TypeScript', 'Supabase'],
  },
  {
    id: 'form',
    number: '02',
    name: 'Form',
    category: 'Generative motion lab',
    summary:
      'A browser-based playground for composing responsive motion systems without losing sight of performance.',
    outcome: 'Translated expressive animation into reusable, production-minded controls.',
    stack: ['React', 'GSAP', 'WebGL'],
  },
  {
    id: 'atlas',
    number: '03',
    name: 'Atlas',
    category: 'Intelligent research',
    summary:
      'A research companion that connects sources, surfaces context, and keeps people in control of the answer.',
    outcome: 'Made complex retrieval feel legible through transparent citations and deliberate interaction.',
    stack: ['Python', 'AI', 'PostgreSQL'],
  },
] as const satisfies readonly Project[];

export const milestones = [
  {
    year: '2022',
    title: 'The first line',
    description: 'Followed a small curiosity into programming and discovered a new way to make ideas tangible.',
  },
  {
    year: '2023',
    title: 'Systems, not screens',
    description: 'Moved beyond isolated pages to reusable components, clear architecture, and product thinking.',
  },
  {
    year: '2024',
    title: 'Shipping for people',
    description: 'Built real products, listened closely to feedback, and learned that quality lives in the details.',
  },
  {
    year: '2026',
    title: 'Building with intent',
    description: 'Bringing engineering, motion, and emerging technology together to solve more meaningful problems.',
  },
] as const satisfies readonly Milestone[];

export const skillBranches = [
  {
    id: 'frontend',
    name: 'Frontend',
    description: 'Interfaces with strong foundations, useful motion, and an instinct for the final detail.',
    technologies: ['React', 'Next.js', 'TypeScript', 'CSS'],
  },
  {
    id: 'backend',
    name: 'Backend',
    description: 'Services and data models that stay understandable as products and teams grow.',
    technologies: ['Node.js', 'Python', 'PostgreSQL', 'REST APIs'],
  },
  {
    id: 'tools',
    name: 'Tools',
    description: 'A pragmatic workflow built around fast feedback, reliable delivery, and shared ownership.',
    technologies: ['Git', 'Docker', 'Figma', 'CI / CD'],
  },
  {
    id: 'ai-learning',
    name: 'AI / Learning',
    description: 'Exploring intelligent systems with equal attention to capability, trust, and human judgment.',
    technologies: ['Machine Learning', 'RAG', 'Generative AI', 'Evaluation'],
  },
] as const satisfies readonly SkillBranch[];

export const currentFocus = [
  {
    id: 'building',
    label: 'Building',
    title: 'Tools for creative work',
    description: 'Making complex workflows feel focused, fluent, and quietly powerful.',
  },
  {
    id: 'learning',
    label: 'Learning',
    title: 'Reliable AI systems',
    description: 'Going deeper on retrieval, evaluation, and products people can understand and trust.',
  },
  {
    id: 'exploring',
    label: 'Exploring',
    title: 'Interfaces with depth',
    description: 'Using motion and spatial design to explain, not decorate, how a product works.',
  },
] as const satisfies readonly FocusItem[];

export const experiences = [
  {
    period: '2024 — Present',
    role: 'Software Engineer',
    organization: 'Independent practice',
    summary: 'Designing and building thoughtful digital products across frontend systems, APIs, and applied AI.',
  },
] as const satisfies readonly Experience[];

export const socialLinks = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/alexmorgan',
    detail: 'Code and experiments',
    external: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/alexmorgan',
    detail: 'Experience and notes',
    external: true,
  },
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:hello@alexmorgan.dev',
    detail: 'Start a conversation',
    external: false,
  },
  {
    id: 'resume',
    label: 'Resume',
    href: 'https://example.com/resume',
    detail: 'A concise overview',
    external: true,
  },
] as const satisfies readonly SocialLink[];
