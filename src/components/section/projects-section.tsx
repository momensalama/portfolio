"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import SimpleMarquee from "@/components/fancy/simple-marquee";
import VerticalCutReveal from "@/components/fancy/vertical-cut-reveal";
import UnderlineToBackground from "@/components/fancy/underline-to-background";
import { BorderBeam } from "@/components/magicui/border-beam";
import BlurFade from "@/components/magicui/blur-fade";

const TECH_LOGOS = [
  "React.js", "Next.js", "TypeScript", "Tailwind CSS",
  "Node.js", "Docker", "PostgreSQL", "Supabase", "Prisma", "OpenAI API",
];

export default function ProjectsSection() {
  return (
    <div className="flex min-h-0 flex-col gap-y-10">
      {/* Header */}
      <div className="flex flex-col gap-y-3 items-center justify-center text-center">
        <div className="flex items-center w-full gap-3">
          <div className="flex-1 h-px bg-border" />
          <div className="border bg-primary rounded-xl px-4 py-1">
            <span className="text-background text-sm font-medium">My Projects</span>
          </div>
          <div className="flex-1 h-px bg-border" />
        </div>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl overflow-hidden">
          <VerticalCutReveal staggerDuration={0.025} staggerFrom="center">
            Check out my latest work
          </VerticalCutReveal>
        </h2>
        <p className="text-muted-foreground md:text-lg/relaxed text-balance max-w-lg">
          I&apos;ve worked on a variety of projects, from simple websites to complex web
          applications. Here are a few of my favorites.
        </p>
      </div>

      {/* Tech marquee strip */}
      <SimpleMarquee className="py-2" innerClassName="gap-8" duration={22} repeat={4}>
        {TECH_LOGOS.map((tech) => (
          <span
            key={tech}
            className="text-sm font-medium text-muted-foreground/70 whitespace-nowrap select-none"
          >
            {tech}
          </span>
        ))}
      </SimpleMarquee>

      {/* Project cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {DATA.projects.map((project, id) => (
          <BlurFade key={project.title} delay={0.04 * 12 + id * 0.08} inView>
            <ProjectCard project={project} />
          </BlurFade>
        ))}
      </div>
    </div>
  );
}

type Project = (typeof DATA.projects)[number];

function ProjectCard({ project }: { project: Project }) {
  const videoSrc = project.video as string;
  const imageSrc = project.image as string;
  return (
    <div className="relative group flex flex-col h-full border border-border rounded-2xl overflow-hidden bg-background hover:shadow-xl transition-shadow duration-500">
      <BorderBeam size={180} duration={18} colorFrom="#818cf8" colorTo="#a78bfa" />

      {/* Media */}
      <Link href={project.href} target="_blank" rel="noopener noreferrer" className="block shrink-0">
        {videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-48 object-cover"
          />
        ) : imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt={project.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-muted/60" />
        )}
      </Link>

      {/* Links overlay */}
      {project.links && project.links.length > 0 && (
        <div className="absolute top-3 right-3 flex gap-2">
          {project.links.map((l, i) => (
            <Link
              key={i}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <Badge className="flex items-center gap-1.5 text-xs bg-black/80 text-white hover:bg-black backdrop-blur-sm">
                {l.icon}
                {l.type}
              </Badge>
            </Link>
          ))}
        </div>
      )}

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <UnderlineToBackground
            label={project.title}
            targetTextColor="#fff"
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-foreground"
          />
          <Link
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed flex-1">
          {project.description}
        </p>

        {project.technologies && (
          <div className="flex flex-wrap gap-1 mt-auto">
            {project.technologies.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-[11px] font-medium h-6 px-2"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
