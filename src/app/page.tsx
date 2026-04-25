"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";

import VariableFontCursorProximity from "@/components/fancy/variable-font-cursor-proximity";
import BreathingText from "@/components/fancy/breathing-text";
import TextHighlighter from "@/components/fancy/text-highlighter";
import VerticalCutReveal from "@/components/fancy/vertical-cut-reveal";
import ScrambleIn from "@/components/fancy/scramble-in";
import SimpleMarquee from "@/components/fancy/simple-marquee";
import Letter3DSwap from "@/components/fancy/letter-3d-swap";
import { SkillsD } from "@/components/section/skills-variants";

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main ref={containerRef} className="min-h-dvh">

      {/* ════════════════════════════════════════
          01 — HERO
      ════════════════════════════════════════ */}
      <section className="relative grid-bg min-h-[calc(100vh-48px)] border-b-2 border-foreground flex flex-col">
        {/* Section label */}
        <div className="flex items-center justify-between px-6 lg:px-12 pt-10">
          <span className="font-mono text-xs font-bold tracking-widest uppercase text-muted-foreground">
            01 / INTRO
          </span>
          <span className="font-mono text-xs text-muted-foreground tracking-widest">
            {DATA.location}
          </span>
        </div>


        {/* Main hero content */}
        <div className="flex-1 flex flex-col justify-center px-6 lg:px-12 py-12">
          <div className="flex flex-col gap-8 max-w-6xl">
            {/* Giant name */}
            <div className="flex flex-col gap-2">
              <p className="font-mono text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">
                Hi, I&apos;m
              </p>
              <h1 className="font-bold leading-[0.9] tracking-tighter"
                style={{ fontSize: "clamp(64px, 12vw, 140px)" }}>
                <VariableFontCursorProximity
                  label={DATA.name.split(" ")[0]}
                  fromFontVariationSettings="'wght' 300"
                  toFontVariationSettings="'wght' 900"
                  radius={120}
                  falloff="gaussian"
                  containerRef={containerRef}
                  className="font-variable uppercase"
                />
              </h1>
              <h1 className="font-bold leading-[0.9] tracking-tighter text-muted-foreground/30"
                style={{ fontSize: "clamp(64px, 12vw, 140px)" }}>
                <VariableFontCursorProximity
                  label={DATA.name.split(" ")[1]}
                  fromFontVariationSettings="'wght' 300"
                  toFontVariationSettings="'wght' 900"
                  radius={120}
                  falloff="gaussian"
                  containerRef={containerRef}
                  className="font-variable uppercase"
                />
              </h1>
            </div>

            {/* Bottom row: info + avatar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 border-t-2 border-foreground pt-6">
              <div className="flex flex-col gap-4 max-w-md">
                {/* Available pill */}
                <div className="inline-flex items-center gap-2 border-2 border-foreground bg-background px-3 py-1.5 w-fit">
                  <span className="relative flex size-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex rounded-full size-2 bg-accent" />
                  </span>
                  <BreathingText
                    fromFontVariationSettings="'wght' 400"
                    toFontVariationSettings="'wght' 700"
                    duration={2.4}
                    className="font-mono text-xs font-bold uppercase tracking-widest"
                  >
                    Available for work
                  </BreathingText>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed font-mono">
                  <ScrambleIn
                    text={DATA.description}
                    scrambleSpeed={25}
                    scrambledLetterCount={5}
                    autoStart
                    scrambledClassName="text-accent/60"
                  />
                </p>

                {/* Social links */}
                <div className="flex items-center gap-0">
                  {Object.values(DATA.contact.social)
                    .filter((s) => s.navbar)
                    .map((social) => (
                      <Link
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-2 border-2 border-foreground -ml-[2px] first:ml-0 hover:bg-foreground hover:text-background transition-colors"
                      >
                        {social.name}
                      </Link>
                    ))}
                </div>
              </div>

              {/* Avatar — skewed border box */}
              <div className="relative flex-shrink-0">
                <div className="border-2 border-foreground p-1 rotate-2 transition-transform hover:rotate-0 duration-300">
                  <Avatar className="size-28 sm:size-36 rounded-none">
                    <AvatarImage alt={DATA.name} src={DATA.avatarUrl} className="object-cover" />
                    <AvatarFallback className="rounded-none font-mono text-2xl font-bold">
                      {DATA.initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
                {/* Shadow box */}
                <div className="absolute inset-0 border-2 border-foreground translate-x-2 translate-y-2 -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          02 — ABOUT
      ════════════════════════════════════════ */}
      <section className="border-b-2 border-foreground">
        <div className="flex flex-col lg:flex-row">
          {/* Label column */}
          <div className="lg:w-48 flex-shrink-0 border-b-2 lg:border-b-0 lg:border-r-2 border-foreground px-6 py-8 lg:py-12">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-2">
              02
            </span>
            <h2 className="font-mono text-sm font-bold uppercase tracking-widest writing-mode-vertical lg:[writing-mode:vertical-rl] lg:rotate-180 lg:mt-4 hidden lg:block">
              About
            </h2>
            <h2 className="font-mono text-sm font-bold uppercase tracking-widest lg:hidden">
              About
            </h2>
          </div>

          {/* Content */}
          <div className="flex-1 px-6 lg:px-12 py-8 lg:py-12">
            <div className="max-w-2xl">
              <p className="text-base leading-relaxed text-foreground/80">
                {renderAbout(DATA.summary)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          03 — WORK
      ════════════════════════════════════════ */}
      <section className="border-b-2 border-foreground">
        <div className="flex flex-col lg:flex-row">
          {/* Label column */}
          <div className="lg:w-48 flex-shrink-0 border-b-2 lg:border-b-0 lg:border-r-2 border-foreground px-6 py-8 lg:py-12">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-2">
              03
            </span>
            <h2 className="font-mono text-sm font-bold uppercase tracking-widest lg:hidden">
              Experience
            </h2>
            <h2 className="font-mono text-sm font-bold uppercase tracking-widest writing-mode-vertical lg:[writing-mode:vertical-rl] lg:rotate-180 lg:mt-4 hidden lg:block">
              Experience
            </h2>
          </div>

          {/* Work rows */}
          <div className="flex-1">
            {DATA.work.map((job, i) => (
              <div
                key={job.company}
                className="border-b-2 border-foreground last:border-b-0 px-6 lg:px-12 py-8 group cursor-pointer hover:bg-foreground hover:text-background transition-colors duration-150"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] font-bold text-muted-foreground group-hover:text-background/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <Link
                        href={job.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-xl uppercase tracking-tight flex items-center gap-2 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {job.company}
                        <ArrowUpRight className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </div>
                    <div className="flex items-center gap-3 ml-7">
                      <span className="font-mono text-sm text-muted-foreground group-hover:text-background/60">
                        {job.title}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground group-hover:text-background/60">
                        · {job.location}
                      </span>
                    </div>
                    <p className="ml-7 text-sm text-muted-foreground group-hover:text-background/70 leading-relaxed max-w-xl mt-1">
                      {job.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-background/60 sm:text-right">
                    {job.start} — {job.end ?? "Present"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          04 — SKILLS (pick A, C or D)
      ════════════════════════════════════════ */}
      <section className="border-b-2 border-foreground">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-48 flex-shrink-0 border-b-2 lg:border-b-0 lg:border-r-2 border-foreground px-6 py-8 lg:py-12">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-2">04</span>
            <h2 className="font-mono text-sm font-bold uppercase tracking-widest">Skills</h2>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="p-6 lg:p-10">
              <SkillsD />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          05 — EDUCATION
      ════════════════════════════════════════ */}
      <section className="border-b-2 border-foreground">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-48 flex-shrink-0 border-b-2 lg:border-b-0 lg:border-r-2 border-foreground px-6 py-8 lg:py-12">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-2">05</span>
            <h2 className="font-mono text-sm font-bold uppercase tracking-widest">Education</h2>
          </div>
          <div className="flex-1">
            {DATA.education.map((edu) => (
              <Link
                key={edu.school}
                href={edu.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 lg:px-12 py-8 group hover:bg-foreground hover:text-background transition-colors"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-lg uppercase tracking-tight flex items-center gap-2">
                    {edu.school}
                    <ArrowUpRight className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                  <span className="font-mono text-sm text-muted-foreground group-hover:text-background/60">
                    {edu.degree}
                  </span>
                </div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-background/60">
                  {edu.start} — {edu.end}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          06 — PROJECTS
      ════════════════════════════════════════ */}
      <section className="border-b-2 border-foreground">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-48 flex-shrink-0 border-b-2 lg:border-b-0 lg:border-r-2 border-foreground px-6 py-8 lg:py-12">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-2">06</span>
            <h2 className="font-mono text-sm font-bold uppercase tracking-widest">Projects</h2>
          </div>
          <div className="flex-1">
            {DATA.projects.map((project, i) => (
              <div
                key={project.title}
                className="border-b-2 border-foreground last:border-b-0 group"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Video / image */}
                  <div className="lg:w-72 flex-shrink-0 border-b-2 lg:border-b-0 lg:border-r-2 border-foreground overflow-hidden bg-muted/30">
                    {(project.video as string) ? (
                      <video
                        src={project.video as string}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-48 lg:h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    ) : (project.image as string) ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.image as string}
                        alt={project.title}
                        className="w-full h-48 lg:h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    ) : (
                      <div className="w-full h-48 lg:h-full bg-muted/40 flex items-center justify-center">
                        <span className="font-mono text-4xl font-bold text-muted-foreground/30">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 px-6 lg:px-10 py-8 flex flex-col gap-4 justify-between">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex flex-col gap-1">
                          <span className="font-mono text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h3 className="font-bold text-2xl uppercase tracking-tight leading-tight">
                            {project.title}
                          </h3>
                        </div>
                        <Link
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border-2 border-foreground p-2 hover:bg-foreground hover:text-background transition-colors flex-shrink-0 mt-1"
                        >
                          <ArrowUpRight className="size-4" />
                        </Link>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                        {project.description}
                      </p>
                    </div>

                    {/* Tags + links */}
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-wrap gap-2">
                        {(project.technologies as readonly string[]).map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[10px] font-bold uppercase tracking-widest border border-foreground/40 px-2 py-1 text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      {project.links && project.links.length > 0 && (
                        <div className="flex gap-0">
                          {(project.links as readonly { href: string; type: string; icon: React.ReactNode }[]).map((l, li) => (
                            <Link
                              key={li}
                              href={l.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-[10px] font-bold uppercase tracking-widest border-2 border-foreground px-3 py-2 -ml-[2px] first:ml-0 flex items-center gap-1.5 hover:bg-foreground hover:text-background transition-colors"
                            >
                              {l.icon}
                              {l.type}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          07 — CONTACT
      ════════════════════════════════════════ */}
      <section className="grid-bg relative overflow-hidden">
        <div className="px-6 lg:px-12 py-20 flex flex-col gap-10">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
            07 / CONTACT
          </span>

          {/* Big CTA */}
          <div>
            <h2
              className="font-bold uppercase tracking-tighter leading-[0.85] cursor-pointer"
              style={{ fontSize: "clamp(56px, 10vw, 128px)" }}
            >
              <Letter3DSwap label="Let's" staggerDuration={0.04} staggerFrom="first" />
              <br />
              <Letter3DSwap label="Work" staggerDuration={0.04} staggerFrom="first" />
              <br />
              <span className="text-accent">
                <Letter3DSwap label="Together" staggerDuration={0.03} staggerFrom="first" />
              </span>
            </h2>
          </div>

          {/* Contact info row */}
          <div className="flex flex-col sm:flex-row items-start gap-0 border-t-2 border-foreground pt-8">
            <Link
              href={`mailto:${DATA.contact.email}`}
              className="font-mono text-sm font-bold uppercase tracking-widest border-2 border-foreground px-6 py-4 -ml-[2px] first:ml-0 flex items-center gap-2 hover:bg-foreground hover:text-background transition-colors"
            >
              Email
              <ArrowRight className="size-4" />
            </Link>
            {Object.values(DATA.contact.social)
              .filter((s) => s.navbar)
              .map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm font-bold uppercase tracking-widest border-2 border-foreground px-6 py-4 -ml-[2px] flex items-center gap-2 hover:bg-foreground hover:text-background transition-colors"
                >
                  {social.name}
                  <ArrowRight className="size-4" />
                </Link>
              ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t-2 border-foreground pt-6">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              © {new Date().getFullYear()} {DATA.name}
            </span>
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Frontend Engineer
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}

function renderAbout(text: string) {
  const highlights: { phrase: string; color: string }[] = [
    { phrase: "Saudi Arabia", color: "#fde68a" },
    { phrase: "Germany",      color: "#a5f3fc" },
    { phrase: "Next.js",      color: "#d9f99d" },
    { phrase: "TypeScript",   color: "#bfdbfe" },
    { phrase: "React.js",     color: "#fecdd3" },
  ];

  const parts: React.ReactNode[] = [];
  let rest = text;

  while (rest.length > 0) {
    let earliest: { idx: number; phrase: string; color: string } | null = null;
    for (const h of highlights) {
      const idx = rest.indexOf(h.phrase);
      if (idx !== -1 && (!earliest || idx < earliest.idx)) earliest = { idx, ...h };
    }
    if (!earliest) { parts.push(rest); break; }
    if (earliest.idx > 0) parts.push(rest.slice(0, earliest.idx));
    parts.push(
      <TextHighlighter key={earliest.phrase} highlightColor={earliest.color} triggerType="inView" delay={0.2}>
        {earliest.phrase}
      </TextHighlighter>
    );
    rest = rest.slice(earliest.idx + earliest.phrase.length);
  }
  return <>{parts}</>;
}
