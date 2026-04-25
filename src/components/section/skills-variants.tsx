"use client";

import { DATA } from "@/data/resume";
import SimpleMarquee from "@/components/fancy/simple-marquee";

const skills = DATA.skills.map((s) => s.name);

/* ── A: Bordered grid — equal cells, invert on hover ── */
export function SkillsA() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {skills.map((s) => (
        <div
          key={s}
          className="border-r-2 border-b-2 border-foreground px-5 py-5 font-mono text-xs font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors cursor-default flex items-center justify-center text-center min-h-[72px]"
        >
          {s}
        </div>
      ))}
      {/* fill empty cells to complete last row */}
      {Array.from({ length: (5 - (skills.length % 5)) % 5 }).map((_, i) => (
        <div key={`empty-${i}`} className="border-r-2 border-b-2 border-foreground min-h-[72px]" />
      ))}
    </div>
  );
}

/* ── C: Single huge marquee ── */
export function SkillsC() {
  return (
    <div className="py-8 overflow-hidden">
      <SimpleMarquee duration={30} repeat={4} className="items-center">
        {skills.map((s) => (
          <span
            key={s}
            className="font-bold uppercase tracking-tighter whitespace-nowrap select-none flex items-center gap-6"
            style={{ fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 1 }}
          >
            {s}
            <span className="text-accent font-black" style={{ fontSize: "0.6em" }}>✦</span>
          </span>
        ))}
      </SimpleMarquee>
    </div>
  );
}

/* ── D: Scattered rotated tags ── */
const ROTATIONS = [-6, 3, -2, 5, -4, 2, -1, 6, -3, 4, -5, 1, -2, 3, -6, 2, 4, -3, 1, -5];
const SIZES = [
  "text-[10px]", "text-[11px]", "text-xs", "text-xs", "text-[11px]",
  "text-[10px]", "text-xs", "text-[11px]", "text-[10px]", "text-xs",
  "text-xs", "text-[11px]", "text-[10px]", "text-xs", "text-[11px]",
  "text-[10px]", "text-xs", "text-[11px]", "text-[10px]", "text-xs",
];

export function SkillsD() {
  return (
    <div className="relative min-h-[280px] border-2 border-foreground overflow-hidden bg-background p-4">
      {/* grid lines inside container */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="relative flex flex-wrap gap-3 content-start">
        {skills.map((s, i) => {
          const rot = ROTATIONS[i % ROTATIONS.length];
          const size = SIZES[i % SIZES.length];
          const isBig = i % 5 === 0;
          return (
            <span
              key={s}
              className={`
                inline-block border-2 border-foreground font-mono font-bold uppercase tracking-widest
                px-3 py-2 select-none hover:bg-foreground hover:text-background transition-colors cursor-default
                ${isBig ? "border-[3px] bg-foreground text-background" : ""}
                ${size}
              `}
              style={{ transform: `rotate(${rot}deg)`, marginTop: (i * 7) % 24 }}
            >
              {s}
            </span>
          );
        })}
      </div>
    </div>
  );
}
