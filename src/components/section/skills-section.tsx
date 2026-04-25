"use client";
import { useEffect, useRef, useState } from "react";
import { DATA } from "@/data/resume";
import Gravity, { type GravityItem } from "@/components/fancy/gravity";

export default function SkillsSection() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const items: GravityItem[] = DATA.skills.map((s, i) => ({
    id: i,
    label: s.name,
  }));

  if (reducedMotion) {
    return (
      <div className="flex flex-wrap gap-2">
        {DATA.skills.map((s) => (
          <span
            key={s.name}
            className="px-3 py-1.5 rounded-full border bg-background text-sm font-medium"
          >
            {s.name}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      <p className="text-xs text-muted-foreground mb-3">— drag them around</p>
      <Gravity items={items} className="min-h-[260px]" gravity={0.35} resistance={0.91} />
    </div>
  );
}
