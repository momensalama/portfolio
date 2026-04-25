"use client";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type BreathingTextProps = {
  children: string;
  className?: string;
  staggerDuration?: number;
  fromFontVariationSettings?: string;
  toFontVariationSettings?: string;
  duration?: number;
};

export default function BreathingText({
  children,
  className,
  staggerDuration = 0.06,
  fromFontVariationSettings = "'wght' 100, 'slnt' 0",
  toFontVariationSettings = "'wght' 800, 'slnt' -10",
  duration = 1.8,
}: BreathingTextProps) {
  const chars = children.split("");
  return (
    <span className={cn("inline-block font-variable", className)}>
      {chars.map((c, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre"
          initial={{ fontVariationSettings: fromFontVariationSettings }}
          animate={{
            fontVariationSettings: [
              fromFontVariationSettings,
              toFontVariationSettings,
              fromFontVariationSettings,
            ],
          }}
          transition={{
            duration,
            ease: "easeInOut",
            repeat: Infinity,
            delay: i * staggerDuration,
          }}
        >
          {c === " " ? " " : c}
        </motion.span>
      ))}
    </span>
  );
}
