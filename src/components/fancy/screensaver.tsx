"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ScreensaverProps = {
  children: React.ReactNode;
  className?: string;
  speed?: number;
};

export default function Screensaver({ children, className, speed = 2 }: ScreensaverProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 60, y: 60, vx: speed, vy: speed });
  const raf = useRef<number>(0);

  useEffect(() => {
    const tick = () => {
      const container = containerRef.current;
      const item = itemRef.current;
      if (!container || !item) return;
      const cw = container.offsetWidth;
      const ch = container.offsetHeight;
      const iw = item.offsetWidth;
      const ih = item.offsetHeight;
      const p = pos.current;

      p.x += p.vx;
      p.y += p.vy;

      if (p.x <= 0) { p.x = 0; p.vx = Math.abs(p.vx); }
      if (p.y <= 0) { p.y = 0; p.vy = Math.abs(p.vy); }
      if (p.x + iw >= cw) { p.x = cw - iw; p.vx = -Math.abs(p.vx); }
      if (p.y + ih >= ch) { p.y = ch - ih; p.vy = -Math.abs(p.vy); }

      item.style.transform = `translate(${p.x}px, ${p.y}px)`;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [speed]);

  return (
    <div ref={containerRef} className={cn("relative w-full h-full overflow-hidden", className)}>
      <div ref={itemRef} className="absolute top-0 left-0 will-change-transform">
        {children}
      </div>
    </div>
  );
}
