
import { Icons } from "@/components/icons";
import { Docker } from "@/components/ui/svgs/docker";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { Typescript } from "@/components/ui/svgs/typescript";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Momen Salama",
  initials: "MS",
  url: "https://github.com/momensalama",
  location: "Cairo, Egypt",
  locationLink: "https://www.google.com/maps/place/Cairo,+Egypt",
  description:
  "Frontend Engineer building React.js/Next.js apps with TypeScript. Focused on performance, UX clarity, and maintainable systems.",
  summary:
    "I’m a frontend engineer who enjoys turning designs into fast, reliable product UI. I’ve worked remotely with teams in Saudi Arabia and Germany, shipped production features, and cleaned up existing codebases (including migrating components from JavaScript to TypeScript). Outside of work, I build side projects mostly with Next.js and sometimes with AI features when it actually makes sense for the product.",

  avatarUrl: "/me.webp",

  skills: [
    { name: "React.js", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "TypeScript", icon: Typescript },
    { name: "JavaScript (ES6+)", icon: "/js.svg" },
    { name: "Tailwind CSS", icon: "/tailwindcss.svg" },
    { name: "HTML", icon: "/html.svg" },
    { name: "CSS", icon: "/css.svg" },
    { name: "Vue.js", icon: "/vue.js.svg" },
    { name: "Node.js", icon: Nodejs },
    { name: "Docker", icon: Docker },
    { name: "PWA", icon: "/pwa.svg" },
    { name: "SEO" },
    { name: "CI/CD" },
  ],

  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],

  contact: {
    email: "momensalamawork@gmail.com",
    tel: "+201032037280",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/momensalama",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/momensalamaegypt",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/dot_momen",
        icon: Icons.x,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:momensalamawork@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Hams.ai",
      href: "https://hams.ai",
      badges: [],
      location: "Remote (Saudi Arabia)",
      title: "Frontend Developer",
      logoUrl: "/hams-ai.jpeg",
      start: "Jul 2025",
      end: "Nov 2025",
      description:
        "Worked on product UI using React.js. Migrated 15+ components from JavaScript to TypeScript to make the codebase safer and easier to refactor. Built an embeddable widget that was shipped to 4 client websites. Also helped the team move faster by keeping components consistent and writing clear setup/onboarding notes for new devs.",
    },
    {
      company: "Area99",
      href: "https://area99.com",
      badges: [],
      location: "Remote (Germany)",
      title: "Frontend Developer",
      logoUrl: "/area99.png",
      start: "Sep 2024",
      end: "Mar 2025",
      description:
        "Worked mainly with Vue. Refactored 10+ components into reusable pieces to cut duplication and make UI changes quicker. Improved validation and error states across a few key flows so users could understand what went wrong and recover without getting stuck.",
    },
  ],

  education: [
    {
      school: "Helwan University",
      href: "https://www.helwan.edu.eg",
      degree: "B.Sc. in Computer Science and Statistics",
      logoUrl: "/helwan.webp",
      start: "2021",
      end: "2025",
    },
  ],

  projects: [
    {
      title: "AI-Powered Journal App",
      href: "https://fullstack-nextjs-journal-ai-app.vercel.app",
      active: true,
      description:
        "A journaling app where you can write entries and get a short AI-generated summary + sentiment. I built the full stack (data model, APIs, and the AI part) and shipped it as a complete, working product.",
      technologies: ["Next.js", "TypeScript", "OpenAI API", "Neon (Postgres)", "Tailwind CSS"],
      links: [
        {
          type: "Website",
          href: "https://fullstack-nextjs-journal-ai-app.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/momensalama/fullstack-nextjs-journal-ai-app",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://ynokbgmoaebxmhukzneb.supabase.co/storage/v1/object/public/videos/ai-journal-app.mp4",
    },
    {
      title: "System Issues Management App",
      href: "https://next-js-v15-fundamentals.vercel.app",
      active: true,
      description:
        "A small issues management tool inspired by Linear. It supports creating issues, assigning them, setting priorities, and tracking progress in a simple dashboard.",
      technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
      links: [
        {
          type: "Website",
          href: "https://next-js-v15-fundamentals.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/momensalama/Next.js-full-stack-app",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://ynokbgmoaebxmhukzneb.supabase.co/storage/v1/object/public/videos/management-app.mp4",
    },
    {
      title: "Reservation System",
      href: "https://fullstack-next-js-v14.vercel.app",
      active: true,
      description:
        "Customer-facing booking website for a small boutique hotel (The Wild Oasis). Users can browse cabins, sign in, and complete reservations. The UI is clean and mobile-friendly, with Supabase as the backend.",
      technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Auth.js", "Context API"],
      links: [
        {
          type: "Website",
          href: "https://fullstack-next-js-v14.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/momensalama/Next.js-full-stack-hotel-system",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://ynokbgmoaebxmhukzneb.supabase.co/storage/v1/object/public/videos/fullstack-nextjs.mp4",
    },
    {
      title: "Hotel Management System",
      href: "https://the-wild-oasis-hotel.netlify.app/dashboard",
      active: true,
      description:
        "An internal dashboard for the same hotel project. Staff can manage cabins, bookings, and guests. It’s built for day-to-day work, with protected routes and a data-driven UI.",
      technologies: ["React", "TypeScript", "Supabase", "Styled Components", "React Query"],
      links: [
        {
          type: "Website",
          href: "https://the-wild-oasis-hotel.netlify.app/dashboard",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/momensalama/React.js-full-stack-hotel-system",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://ynokbgmoaebxmhukzneb.supabase.co/storage/v1/object/public/videos/reactjs-fullstack.mp4",
    },
  ],
} as const;

