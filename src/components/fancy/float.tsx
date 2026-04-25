"use client";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type FloatProps = {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  amplitude?: [number, number, number];
  rotationRange?: [number, number, number];
};

export default function Float({
  children,
  className,
  speed = 0.5,
  amplitude = [10, 30, 30],
  rotationRange = [10, 15, 7.5],
}: FloatProps) {
  return (
    <motion.div
      className={cn("will-change-transform", className)}
      animate={{
        x: [-amplitude[0], amplitude[0], -amplitude[0]],
        y: [-amplitude[1], amplitude[1], -amplitude[1]],
        rotateZ: [-rotationRange[2], rotationRange[2], -rotationRange[2]],
      }}
      transition={{
        duration: 8 / speed,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
