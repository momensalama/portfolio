"use client";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type ParallaxFloatingProps = {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  speed?: number;
};

export default function ParallaxFloating({
  children,
  className,
  intensity = 15,
  speed = 0.1,
}: ParallaxFloatingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (window.innerWidth / 2);
      const dy = (e.clientY - cy) / (window.innerHeight / 2);
      rotateX.set(-dy * intensity);
      rotateY.set(dx * intensity);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [intensity, rotateX, rotateY]);

  return (
    <motion.div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
    >
      {children}
    </motion.div>
  );
}
