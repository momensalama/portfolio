"use client";
import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Letter3DSwapProps = {
  label: string;
  className?: string;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center";
  reverse?: boolean;
};

export default function Letter3DSwap({
  label,
  className,
  staggerDuration = 0.04,
  staggerFrom = "first",
  reverse = false,
}: Letter3DSwapProps) {
  const [hovered, setHovered] = useState(false);
  const chars = label.split("");
  const pivot =
    staggerFrom === "first" ? 0 : staggerFrom === "last" ? chars.length - 1 : Math.floor(chars.length / 2);

  return (
    <span
      className={cn("inline-flex", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ perspective: "800px" }}
    >
      {chars.map((c, i) => {
        const delay = Math.abs(i - pivot) * staggerDuration;
        return (
          <span
            key={i}
            className="relative inline-block whitespace-pre"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* front face */}
            <motion.span
              className="inline-block whitespace-pre origin-top"
              animate={{
                rotateX: hovered ? (reverse ? 90 : -90) : 0,
                opacity: hovered ? 0 : 1,
              }}
              transition={{ duration: 0.35, delay, ease: [0.76, 0, 0.24, 1] }}
            >
              {c === " " ? " " : c}
            </motion.span>
            {/* back face */}
            <motion.span
              className="absolute inset-0 inline-flex items-center justify-center origin-bottom"
              style={{ rotateX: reverse ? -90 : 90 }}
              animate={{
                rotateX: hovered ? 0 : reverse ? -90 : 90,
                opacity: hovered ? 1 : 0,
              }}
              transition={{ duration: 0.35, delay, ease: [0.76, 0, 0.24, 1] }}
            >
              {c === " " ? " " : c}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
