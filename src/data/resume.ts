type Project = {
  title: string;
  href: string;
  source: string;
  description: string;
  technologies: string[];
  /** Drop a screenshot in /public/images/projects and reference it here to show a preview. */
  image?: string;
};

const projects: Project[] = [
  {
    title: "AI-Powered Journal",
    href: "https://fullstack-nextjs-journal-ai-app.vercel.app",
    source: "https://github.com/momensalama/fullstack-nextjs-journal-ai-app",
    description:
      "A journaling app that writes a short summary and sentiment read for every entry. I built the whole stack — data model, APIs, and the AI layer — and shipped it as a working product.",
    technologies: ["Next.js", "TypeScript", "OpenAI API", "Neon", "Tailwind CSS"],
  },
  {
    title: "Issue Tracker",
    href: "https://next-js-v15-fundamentals.vercel.app",
    source: "https://github.com/momensalama/Next.js-full-stack-app",
    description:
      "A Linear-inspired issue management tool: create issues, assign them, set priorities, and track progress from a single dashboard.",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
  },
  {
    title: "Reservation System",
    href: "https://fullstack-next-js-v14.vercel.app",
    source: "https://github.com/momensalama/Next.js-full-stack-hotel-system",
    description:
      "The customer-facing booking site for a small boutique hotel. Guests browse cabins, sign in, and complete a reservation on any device.",
    technologies: ["Next.js", "TypeScript", "Supabase", "Auth.js", "Tailwind CSS"],
  },
  {
    title: "Hotel Dashboard",
    href: "https://the-wild-oasis-hotel.netlify.app/dashboard",
    source: "https://github.com/momensalama/React.js-full-stack-hotel-system",
    description:
      "The staff side of the same hotel: managing cabins, bookings, and guests behind protected routes, built for daily operational use.",
    technologies: ["React", "TypeScript", "Supabase", "React Query", "Styled Components"],
  },
];

export const DATA = {
  name: "Momen Salama",
  initials: "MS",
  role: "Frontend Engineer",
  url: "https://github.com/momensalama",
  location: "Cairo, Egypt",
  locationLink: "https://www.google.com/maps/place/Cairo,+Egypt",
  available: true,
  description:
    "Frontend engineer building React and Next.js apps with TypeScript, focused on performance, clarity, and maintainable systems.",
  summary:
    "I'm a frontend engineer who enjoys turning designs into fast, reliable product UI. I've worked remotely with teams in Saudi Arabia and Germany, shipped production features, and cleaned up existing codebases along the way. Outside of work I build side projects with Next.js — sometimes with AI features, when they actually earn their place in the product.",

  avatarUrl: "/me.webp",

  contact: {
    email: "momensalamawork@gmail.com",
    tel: "+201032037280",
    social: [
      { name: "GitHub", url: "https://github.com/momensalama" },
      { name: "LinkedIn", url: "https://www.linkedin.com/in/momensalamaegypt" },
      { name: "X", url: "https://x.com/dot_momen" },
    ],
  },

  skills: [
    { group: "Languages", items: ["TypeScript", "JavaScript (ES6+)", "HTML", "CSS"] },
    { group: "Frameworks", items: ["React", "Next.js", "Vue", "Tailwind CSS", "Node.js"] },
    { group: "Practices", items: ["Performance", "Accessibility", "SEO", "PWA", "CI/CD", "Docker"] },
  ],

  work: [
    {
      company: "Hams.ai",
      href: "https://hams.ai",
      location: "Remote — Saudi Arabia",
      title: "Frontend Developer",
      start: "Jul 2025",
      end: "Nov 2025",
      highlights: [
        "Migrated 15+ React components from JavaScript to TypeScript, making refactors safer across the product.",
        "Built an embeddable widget shipped to four client websites.",
        "Kept component patterns consistent and wrote the setup notes new developers onboard with.",
      ],
    },
    {
      company: "Area99",
      href: "https://area99.com",
      location: "Remote — Germany",
      title: "Frontend Developer",
      start: "Sep 2024",
      end: "Mar 2025",
      highlights: [
        "Refactored 10+ Vue components into reusable pieces to cut duplication and speed up UI changes.",
        "Reworked validation and error states in key flows so users could understand and recover from mistakes.",
      ],
    },
  ],

  education: [
    {
      school: "Helwan University",
      href: "https://www.helwan.edu.eg",
      degree: "B.Sc. in Computer Science and Statistics",
      start: "2021",
      end: "2025",
    },
  ],

  projects,
} as const;
