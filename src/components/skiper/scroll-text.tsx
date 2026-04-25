"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type ScrollTextProps = {
  text: string;
  className?: string;
  containerClassName?: string;
  style?: React.CSSProperties;
};

function ScrollChar({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const isSpace = char === " ";
  const dist = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.6], [dist * 60, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.6], [dist * 40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <motion.span
      className={cn("inline-block whitespace-pre", isSpace && "w-[0.3em]")}
      style={{ x, rotateX, opacity }}
    >
      {isSpace ? " " : char}
    </motion.span>
  );
}

export default function ScrollText({ text, className, containerClassName, style }: ScrollTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const chars = text.split("");
  const center = Math.floor(chars.length / 2);

  return (
    <div
      ref={ref}
      className={cn("overflow-hidden", containerClassName)}
      style={{ perspective: "600px" }}
    >
      <div className={cn("inline-block", className)} style={style}>
        {chars.map((c, i) => (
          <ScrollChar
            key={i}
            char={c}
            index={i}
            centerIndex={center}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}
