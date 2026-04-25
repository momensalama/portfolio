"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type AnimatedGradientSVGProps = {
  className?: string;
  colors?: string[];
  speed?: number;
};

export default function AnimatedGradientSVG({
  className,
  colors = ["#a78bfa", "#818cf8", "#38bdf8", "#34d399", "#fb923c"],
  speed = 0.6,
}: AnimatedGradientSVGProps) {
  const ref = useRef<SVGSVGElement>(null);
  const t = useRef(0);

  useEffect(() => {
    let raf: number;
    const circles = ref.current?.querySelectorAll("circle");
    if (!circles) return;

    const positions = Array.from(circles).map((_, i) => ({
      x: 30 + (i * 15) % 60,
      y: 20 + (i * 20) % 60,
      vx: (Math.random() - 0.5) * 0.12 * speed,
      vy: (Math.random() - 0.5) * 0.12 * speed,
    }));

    const tick = () => {
      t.current += 1;
      Array.from(circles).forEach((c, i) => {
        const p = positions[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 100) p.vx *= -1;
        if (p.y < 0 || p.y > 100) p.vy *= -1;
        c.setAttribute("cx", `${p.x}%`);
        c.setAttribute("cy", `${p.y}%`);
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  return (
    <svg
      ref={ref}
      className={cn("absolute inset-0 w-full h-full", className)}
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "blur(80px)", opacity: 0.55 }}
    >
      <defs>
        {colors.map((c, i) => (
          <radialGradient key={i} id={`g${i}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={c} stopOpacity="0.9" />
            <stop offset="100%" stopColor={c} stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>
      {colors.map((_, i) => (
        <circle
          key={i}
          r="30%"
          fill={`url(#g${i})`}
          cx={`${20 + i * 15}%`}
          cy={`${20 + i * 13}%`}
        />
      ))}
    </svg>
  );
}
