"use client";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type SimpleMarqueeProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  duration?: number;
  repeat?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
};

export default function SimpleMarquee({
  children,
  className,
  innerClassName,
  duration = 30,
  repeat = 4,
  reverse = false,
  pauseOnHover = true,
}: SimpleMarqueeProps) {
  return (
    <div
      className={cn("flex overflow-hidden select-none", className)}
      style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
    >
      <motion.div
        className={cn("flex shrink-0 gap-4", innerClassName)}
        animate={{ x: reverse ? ["0%", "100%"] : ["0%", "-100%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
        {...(pauseOnHover ? { whileHover: { animationPlayState: "paused" } } : {})}
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <div key={i} className="flex shrink-0 gap-4">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
