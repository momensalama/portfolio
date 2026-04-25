"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";

import VariableFontCursorProximity from "@/components/fancy/variable-font-cursor-proximity";
import BreathingText from "@/components/fancy/breathing-text";
import TextHighlighter from "@/components/fancy/text-highlighter";
import ScrambleIn from "@/components/fancy/scramble-in";
import SimpleMarquee from "@/components/fancy/simple-marquee";
import Letter3DSwap from "@/components/fancy/letter-3d-swap";
import { SkillsD } from "@/components/section/skills-variants";

/* ── Scroll reveal wrapper ── */
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Two-column editorial section ── */
function Section({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <section className="border-t border-foreground/8 px-6 lg:px-16 py-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* Index + label */}
        <div className="lg:w-40 shrink-0 flex lg:flex-col items-baseline gap-3 lg:gap-2 pt-0.5">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground font-bold">
            {label}
          </span>
        </div>
        {/* Content */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </section>
  );
}

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main ref={containerRef} className="min-h-dvh">

      {/* ════════════ HERO ════════════ */}
      <section className="relative grid-bg min-h-[calc(100dvh-48px)] flex flex-col justify-between border-b border-foreground/8 overflow-hidden">

        {/* Orange glow — raw brutalist meets cinematic */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-[15%] left-[-5%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] bg-accent/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-accent/5 rounded-full blur-[100px]" />
        </div>

        {/* Top strip */}
        <div className="flex items-center justify-between px-6 lg:px-16 pt-8 pb-0">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground/60"
          >
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground/60"
          >
            {DATA.location}
          </motion.span>
        </div>

        {/* Giant name + description + avatar */}
        <div className="px-6 lg:px-16 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-start justify-between gap-6"
          >
            {/* Left: name + pill + description */}
            <div className="flex flex-col gap-5">
              <h1
                className="font-bold leading-[0.87] tracking-tighter uppercase"
                style={{ fontSize: "clamp(70px, 13.5vw, 164px)" }}
              >
                <VariableFontCursorProximity
                  label={DATA.name.split(" ")[0]}
                  fromFontVariationSettings="'wght' 200"
                  toFontVariationSettings="'wght' 900"
                  radius={150}
                  falloff="gaussian"
                  containerRef={containerRef}
                  className="font-variable block"
                />
                <VariableFontCursorProximity
                  label={DATA.name.split(" ")[1]}
                  fromFontVariationSettings="'wght' 200"
                  toFontVariationSettings="'wght' 900"
                  radius={150}
                  falloff="gaussian"
                  containerRef={containerRef}
                  className="font-variable block text-foreground/18"
                />
              </h1>

              {/* Pill + description directly under name */}
              <div className="flex flex-col gap-3">
                <div className="inline-flex items-center gap-2 border border-foreground/15 px-3 py-1.5 w-fit bg-foreground/3">
                  <span className="relative flex size-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex rounded-full size-1.5 bg-accent" />
                  </span>
                  <BreathingText
                    fromFontVariationSettings="'wght' 400"
                    toFontVariationSettings="'wght' 700"
                    duration={2.4}
                    className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
                  >
                    Available for work
                  </BreathingText>
                </div>
                <p className="text-sm text-muted-foreground/75 leading-relaxed max-w-sm">
                  <ScrambleIn
                    text={DATA.description}
                    scrambleSpeed={22}
                    scrambledLetterCount={4}
                    autoStart
                    scrambledClassName="text-accent/30"
                  />
                </p>
              </div>
            </div>

            {/* Avatar — top-aligned with the name */}
            <div className="relative shrink-0 mt-2 hidden sm:block">
              <div className="absolute inset-[-12px] bg-accent/10 blur-2xl rounded-full" />
              <div className="border border-foreground/20 p-0.5 relative rotate-1 hover:rotate-0 transition-transform duration-500">
                <Avatar className="size-48 lg:size-64 rounded-none">
                  <AvatarImage alt={DATA.name} src={DATA.avatarUrl} className="object-cover" />
                  <AvatarFallback className="rounded-none font-mono font-bold text-sm bg-card">
                    {DATA.initials}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom strip — links only */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.4 }}
          className="border-t border-foreground/8 px-6 lg:px-16 py-5 flex items-center justify-end"
        >
          <div className="flex flex-wrap items-center gap-0">
            <Link
              href={`mailto:${DATA.contact.email}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-foreground/25 font-mono text-xs uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-colors duration-200"
            >
              Email
              <ArrowRight className="size-3" />
            </Link>
            {Object.values(DATA.contact.social)
              .filter((s) => s.navbar)
              .map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-2 border border-foreground/25 -ml-px font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {social.name}
                </Link>
              ))}
          </div>
        </motion.div>
      </section>

      {/* ════════════ MARQUEE ════════════ */}
      <div className="border-b border-foreground/8 py-2.5 overflow-hidden bg-card/40">
        <SimpleMarquee duration={24} innerClassName="gap-10">
          {DATA.skills.map((s) => (
            <span
              key={s.name}
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground/50 whitespace-nowrap"
            >
              {s.name}
            </span>
          ))}
        </SimpleMarquee>
      </div>

      {/* ════════════ ABOUT ════════════ */}
      <Section label="About">
        <Reveal>
          <p className="text-base lg:text-lg leading-relaxed text-foreground/85 max-w-2xl">
            {renderAbout(DATA.summary)}
          </p>
        </Reveal>
      </Section>

      {/* ════════════ EXPERIENCE ════════════ */}
      <Section label="Experience">
        <div className="flex flex-col divide-y divide-foreground/10">
          {DATA.work.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.05}>
              <Link
                href={job.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col sm:flex-row sm:items-start justify-between gap-4 py-7 pl-0 hover:pl-3 border-l-2 border-transparent hover:border-accent transition-all duration-300"
              >
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xl tracking-tight group-hover:text-accent transition-colors duration-200">
                      {job.company}
                    </span>
                    <ArrowUpRight className="size-4 text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </div>
                  <span className="font-mono text-sm text-muted-foreground/75">
                    {job.title} &mdash; {job.location}
                  </span>
                  {job.description && (
                    <p className="text-sm text-muted-foreground/65 leading-relaxed max-w-lg mt-1">
                      {job.description}
                    </p>
                  )}
                </div>
                <span className="font-mono text-xs text-muted-foreground/55 flex-shrink-0 sm:text-right">
                  {job.start} — {job.end ?? "Present"}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ════════════ SKILLS ════════════ */}
      <Section label="Skills">
        <Reveal>
          <SkillsD />
        </Reveal>
      </Section>

      {/* ════════════ PROJECTS ════════════ */}
      <section className="border-t border-foreground/8 px-6 lg:px-16 py-20">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-14">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground font-bold">
              Projects
            </span>
          </Reveal>

          <div className="flex flex-col">
            {DATA.projects.map((project, i) => {
              const videoSrc = project.video as string;
              const imageSrc = project.image as string;
              return (
                <Reveal key={project.title} delay={i * 0.05}>
                  <div className="group border-t border-foreground/10 hover:border-accent/30 transition-colors duration-300">
                    <div className="flex flex-col lg:flex-row">

                      {/* Info — left */}
                      <div className="flex-1 py-8 lg:pr-10 flex flex-col gap-5 border-l-2 border-transparent group-hover:border-accent group-hover:pl-4 transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <span className="font-mono text-xs text-muted-foreground/40 mt-2 flex-shrink-0 w-6">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div className="flex flex-col gap-2">
                            <h3 className="font-bold text-2xl lg:text-3xl tracking-tight leading-tight group-hover:text-accent transition-colors duration-300">
                              {project.title}
                            </h3>
                            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-lg">
                              {project.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pl-10">
                          {(project.technologies as readonly string[]).map((t) => (
                            <span
                              key={t}
                              className="font-mono text-xs text-muted-foreground/55 px-2 py-0.5 border border-foreground/15 bg-foreground/3"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {project.links && project.links.length > 0 && (
                          <div className="flex gap-0 pl-10">
                            {(project.links as readonly { href: string; type: string; icon: React.ReactNode }[]).map((l, li) => (
                              <Link
                                key={li}
                                href={l.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-foreground/20 -ml-px font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all duration-200"
                              >
                                {l.type}
                                <ArrowUpRight className="size-3" />
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Media — right */}
                      <div className="lg:w-[420px] flex-shrink-0 overflow-hidden bg-card/50 border-t lg:border-t-0 lg:border-l border-foreground/8 self-stretch min-h-[220px]">
                        {videoSrc ? (
                          <video
                            src={videoSrc}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover opacity-55 group-hover:opacity-100 transition-opacity duration-500"
                            style={{ minHeight: "220px" }}
                          />
                        ) : imageSrc ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={imageSrc}
                            alt={project.title}
                            className="w-full h-full object-cover opacity-65 group-hover:opacity-100 transition-opacity duration-500"
                            style={{ minHeight: "220px" }}
                          />
                        ) : (
                          <div className="w-full h-full min-h-[220px] flex items-center justify-center">
                            <span
                              className="font-mono font-black text-muted-foreground/8 select-none"
                              style={{ fontSize: "clamp(56px, 7vw, 88px)" }}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

        {/* ════════════ EDUCATION ════════════ */}
        <Section label="Education">
        <div className="flex flex-col divide-y divide-foreground/10">
          {DATA.education.map((edu, i) => (
            <Reveal key={edu.school} delay={i * 0.05}>
              <Link
                href={edu.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-7 pl-0 hover:pl-3 border-l-2 border-transparent hover:border-accent transition-all duration-300"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-xl tracking-tight flex items-center gap-2 group-hover:text-accent transition-colors duration-200">
                    {edu.school}
                    <ArrowUpRight className="size-4 text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </span>
                  <span className="font-mono text-sm text-muted-foreground/75">{edu.degree}</span>
                </div>
                <span className="font-mono text-xs text-muted-foreground/55">
                  {edu.start} — {edu.end}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ════════════ CONTACT ════════════ */}
      <section className="relative border-t border-foreground/8 px-6 lg:px-16 pt-24 pb-16 overflow-hidden">
        {/* Cinematic glow */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[40vw] max-w-[900px] bg-accent/8 rounded-full blur-[130px]" />
        </div>

        <div className="max-w-7xl mx-auto">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground/60 block mb-10">
              Contact
            </span>
          </Reveal>

          <h2
            className="font-bold tracking-tighter leading-[0.85] uppercase cursor-pointer select-none mb-14"
            style={{ fontSize: "clamp(54px, 10vw, 124px)" }}
          >
            <Letter3DSwap label="Let's" staggerDuration={0.04} staggerFrom="first" />
            <br />
            <Letter3DSwap label="Work" staggerDuration={0.04} staggerFrom="first" />
            <br />
            <span className="text-accent">
              <Letter3DSwap label="Together" staggerDuration={0.03} staggerFrom="first" />
            </span>
          </h2>

          <Reveal className="flex flex-col sm:flex-row items-start gap-0 pt-8 border-t border-foreground/8">
            <Link
              href={`mailto:${DATA.contact.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/30 font-mono text-xs uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-colors duration-200"
            >
              Send Email
              <ArrowRight className="size-3.5" />
            </Link>
            {Object.values(DATA.contact.social)
              .filter((s) => s.navbar)
              .map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/30 -ml-px font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {social.name}
                  <ArrowUpRight className="size-3" />
                </Link>
              ))}
          </Reveal>

          <div className="flex items-center justify-between mt-20 pt-6 border-t border-foreground/6">
            <span className="font-mono text-xs text-muted-foreground/50 uppercase tracking-widest">
              © {new Date().getFullYear()} {DATA.name}
            </span>
            <span className="font-mono text-xs text-muted-foreground/50 uppercase tracking-widest">
              Frontend Engineer
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}


/* ── About text with TextHighlighter keywords ── */
function renderAbout(text: string) {
  const highlights: { phrase: string; color: string }[] = [
    { phrase: "Saudi Arabia", color: "#fde68a" },
    { phrase: "Germany", color: "#a5f3fc" },
    { phrase: "Next.js", color: "#d9f99d" },
    { phrase: "TypeScript", color: "#bfdbfe" },
    { phrase: "React.js", color: "#fecdd3" },
  ];

  const parts: React.ReactNode[] = [];
  let rest = text;

  while (rest.length > 0) {
    let earliest: { idx: number; phrase: string; color: string } | null = null;
    for (const h of highlights) {
      const idx = rest.indexOf(h.phrase);
      if (idx !== -1 && (!earliest || idx < earliest.idx)) earliest = { idx, ...h };
    }
    if (!earliest) {
      parts.push(rest);
      break;
    }
    if (earliest.idx > 0) parts.push(rest.slice(0, earliest.idx));
    parts.push(
      <TextHighlighter
        key={earliest.phrase}
        highlightColor={earliest.color}
        triggerType="inView"
        delay={0.2}
      >
        {earliest.phrase}
      </TextHighlighter>
    );
    rest = rest.slice(earliest.idx + earliest.phrase.length);
  }
  return <>{parts}</>;
}
