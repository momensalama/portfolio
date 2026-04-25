"use client";
import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type VariableFontHoverByLetterProps = {
  label: string;
  className?: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center";
  transition?: { duration?: number; type?: "spring" | "tween"; stiffness?: number; damping?: number };
};

export default function VariableFontHoverByLetter({
  label,
  className,
  fromFontVariationSettings,
  toFontVariationSettings,
  staggerDuration = 0.03,
  staggerFrom = "first",
  transition = { duration: 0.4 },
}: VariableFontHoverByLetterProps) {
  const [hovered, setHovered] = useState(false);
  const chars = label.split("");
  const pivot =
    staggerFrom === "first" ? 0 : staggerFrom === "last" ? chars.length - 1 : Math.floor(chars.length / 2);

  return (
    <span
      className={cn("inline-block font-variable", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {chars.map((c, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre"
          animate={{
            fontVariationSettings: hovered ? toFontVariationSettings : fromFontVariationSettings,
          }}
          transition={{ ...transition, delay: Math.abs(i - pivot) * staggerDuration }}
        >
          {c === " " ? " " : c}
        </motion.span>
      ))}
    </span>
  );
}
