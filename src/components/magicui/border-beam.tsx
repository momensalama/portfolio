"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

type BorderBeamProps = {
  className?: string;
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
};

export function BorderBeam({
  className,
  size = 200,
  duration = 15,
  colorFrom = "#6366f1",
  colorTo = "#a78bfa",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden">
      <motion.div
        className={cn(
          "absolute aspect-square",
          className
        )}
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round 1rem)`,
          background: `conic-gradient(from 0deg, transparent, ${colorFrom}, ${colorTo}, transparent)`,
          filter: "blur(8px)",
          opacity: 0.6,
        }}
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          delay,
        }}
      />
    </div>
  );
}
