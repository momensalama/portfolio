"use client";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type LetterSwapProps = {
  label: string;
  className?: string;
  reverse?: boolean;
  staggerFrom?: "first" | "last" | "center";
  staggerDuration?: number;
};

export default function LetterSwap({
  label,
  className,
  reverse = false,
  staggerFrom = "first",
  staggerDuration = 0.025,
}: LetterSwapProps) {
  const [hovered, setHovered] = useState(false);
  const chars = label.split("");
  const pivot =
    staggerFrom === "first" ? 0 : staggerFrom === "last" ? chars.length - 1 : Math.floor(chars.length / 2);

  return (
    <span
      className={cn("inline-flex overflow-hidden", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {chars.map((c, i) => {
        const delay = Math.abs(i - pivot) * staggerDuration;
        return (
          <span key={i} className="relative inline-block overflow-hidden whitespace-pre leading-[1]">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                key={hovered ? "up" : "base"}
                initial={{ y: hovered ? (reverse ? "-100%" : "100%") : "0%" }}
                animate={{ y: "0%" }}
                exit={{ y: hovered ? (reverse ? "100%" : "-100%") : "0%" }}
                transition={{ duration: 0.3, delay, ease: [0.76, 0, 0.24, 1] }}
                className="inline-block whitespace-pre"
              >
                {c === " " ? " " : c}
              </motion.span>
            </AnimatePresence>
          </span>
        );
      })}
    </span>
  );
}
