"use client";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type TextHighlighterProps = {
  children: React.ReactNode;
  className?: string;
  highlightColor?: string;
  direction?: "ltr" | "rtl";
  triggerType?: "inView" | "hover" | "auto";
  delay?: number;
  duration?: number;
};

export default function TextHighlighter({
  children,
  className,
  highlightColor = "#facc15",
  direction = "ltr",
  triggerType = "inView",
  delay = 0,
  duration = 0.9,
}: TextHighlighterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const shouldAnimate = triggerType === "inView" ? inView : triggerType === "auto";

  return (
    <span ref={ref} className={cn("relative inline-block", className)}>
      <motion.span
        aria-hidden
        className="absolute inset-0 -z-10 rounded-[0.25em]"
        style={{
          backgroundColor: highlightColor,
          transformOrigin: direction === "ltr" ? "left center" : "right center",
        }}
        initial={{ scaleX: 0 }}
        animate={
          triggerType === "hover"
            ? undefined
            : shouldAnimate
              ? { scaleX: 1 }
              : { scaleX: 0 }
        }
        whileHover={triggerType === "hover" ? { scaleX: 1 } : undefined}
        transition={{ duration, ease: [0.76, 0, 0.24, 1], delay }}
      />
      <span className="relative text-[#0a0a0a]">{children}</span>
    </span>
  );
}
