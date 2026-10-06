export const profile = {
  name: "Marcell Matthew Loemanto",
  firstName: "Marcell",
  role: "Informatics Student",
  university: "Petra Christian University",
  semester: "Semester 3",
  email: "c14250089@john.petra.ac.id",
  github: "https://github.com/Marzccell",
  linkedin: "https://www.linkedin.com/in/marcell-matthew-288517328/",
};

export const selectedProjects = [
  {
    id: "studyflow",
    number: "01",
    title: "Study Flow",
    category: "A little more order. A lot more focus.",
    type: "Web application",
    description:
      "A student dashboard that brings assignments, deadlines, and study sessions into one place. Built to make the next thing to do easier to see.",
    features: [
      "Assignment management",
      "Study session planning",
      "Progress overview",
    ],
    stack: ["React", "Supabase", "Tailwind CSS"],
    repo: "https://github.com/Marzccell/student_management_system",
    live: "https://student-management-system-tawny-seven.vercel.app/login",
    liveLabel: "Explore the app",
  },
  {
    id: "archive",
    number: "02",
    title: "The Last Archive",
    category: "Every clue is part of a bigger story.",
    type: "Unity game · Solo project",
    description:
      "An investigation game set inside a museum. Explore rooms, examine evidence, and connect clues on a detective board. A game I developed independently in Unity.",
    features: ["Room exploration", "Evidence interactions", "Detective board"],
    stack: ["Unity", "C#", "WebGL"],
    repo: "https://github.com/Marzccell/The-Last-Archieve",
    live: "https://play.unity.com/api/v1/games/game/811c3f7b-2232-4c1e-9334-ce4e919b6dc7/build/latest/frame",
    liveLabel: "Play the game",
  },
  {
    id: "marflix",
    number: "03",
    title: "Marflix",
    category: "From “what should I watch?” to discovery.",
    type: "Movie discovery application",
    description:
      "A movie finder with popular titles, search, ratings, and trending results. TMDB supplies the movie data; Appwrite tracks searches to surface what people look for.",
    features: [
      "Debounced search",
      "Movie information",
      "Search-based trending",
    ],
    stack: ["React", "TMDB API", "Appwrite"],
    repo: "https://github.com/Marzccell/TV-Show-finder",
    live: null,
    liveLabel: null,
  },
] as const;

export const tools = [
  "JavaScript",
  "React",
  "HTML & CSS",
  "Python",
  "Java",
  "Unity",
  "C#",
  "Supabase",
  "Appwrite",
  "Git",
];

export const experience = [
  {
    year: "2025 — Now",
    title: "Learning the foundations.",
    role: "Informatics · Petra Christian University",
    detail:
      "Studying Informatics, currently in my third semester. Bringing what I learn into web applications and interactive games.",
  },
  {
    year: "2026",
    title: "Building alongside a team.",
    role: "IT Division Member · PCE",
    detail: "Part of the PCE IT division, contributing together with a team.",
  },
  {
    year: "2026",
    title: "Exploring interactive experiences.",
    role: "Game Division Member · IRGL",
    detail:
      "Part of the IRGL game division. Continuing to explore game development alongside my independent Unity work.",
  },
];
