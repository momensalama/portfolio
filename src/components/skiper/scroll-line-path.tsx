"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type ScrollLinePathProps = {
  className?: string;
};

export default function ScrollLinePath({ className }: ScrollLinePathProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <div ref={ref} className={cn("pointer-events-none", className)}>
      <svg
        width="100"
        height="420"
        viewBox="0 0 100 420"
        fill="none"
        overflow="visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M50 0 C80 60, 20 100, 50 160 C80 220, 20 260, 50 320 C80 380, 20 400, 50 420"
          stroke="#ff3b00"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          style={{ pathLength }}
        />
      </svg>
    </div>
  );
}
