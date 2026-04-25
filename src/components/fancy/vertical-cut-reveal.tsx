"use client";
import { motion, useInView, type Transition } from "motion/react";
import { forwardRef, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

type VerticalCutRevealProps = {
  children: string;
  className?: string;
  splitBy?: "words" | "characters";
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center";
  reverse?: boolean;
  transition?: Transition;
  containerClassName?: string;
};

const getStartIndex = (from: "first" | "last" | "center", length: number) => {
  if (from === "first") return 0;
  if (from === "last") return length - 1;
  return Math.floor(length / 2);
};

const VerticalCutReveal = forwardRef<HTMLSpanElement, VerticalCutRevealProps>(
  (
    {
      children,
      className,
      splitBy = "characters",
      staggerDuration = 0.025,
      staggerFrom = "first",
      reverse = false,
      transition = { type: "spring", stiffness: 190, damping: 22 },
      containerClassName,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLSpanElement>(null);
    const inView = useInView(containerRef, { once: true, margin: "-10%" });

    const items = useMemo(() => {
      if (splitBy === "words") {
        return children.split(" ").map((w, i, arr) => (i < arr.length - 1 ? w + " " : w));
      }
      return children.split("");
    }, [children, splitBy]);

    const pivot = getStartIndex(staggerFrom, items.length);

    return (
      <span ref={ref} className={cn("inline-flex flex-wrap", containerClassName)}>
        <span ref={containerRef} className={cn("inline-flex flex-wrap")}>
          {items.map((char, i) => {
            const distance = Math.abs(i - pivot);
            const delay = distance * staggerDuration;
            return (
              <span
                key={i}
                className="relative inline-block overflow-hidden whitespace-pre align-bottom leading-[1.1]"
              >
                <motion.span
                  className={cn("inline-block", className)}
                  initial={{ y: reverse ? "-100%" : "100%" }}
                  animate={inView ? { y: "0%" } : {}}
                  transition={{ ...transition, delay }}
                >
                  {char === " " ? " " : char}
                </motion.span>
              </span>
            );
          })}
        </span>
      </span>
    );
  }
);
VerticalCutReveal.displayName = "VerticalCutReveal";
export default VerticalCutReveal;
