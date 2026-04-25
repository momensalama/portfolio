"use client";
import { cn } from "@/lib/utils";

type ProgressiveBlurProps = {
  className?: string;
  position?: "top" | "bottom";
  blurLayers?: number;
  blurStart?: number;
  blurEnd?: number;
  height?: string;
};

export default function ProgressiveBlur({
  className,
  position = "top",
  blurLayers = 8,
  blurStart = 0.5,
  blurEnd = 8,
  height = "100px",
}: ProgressiveBlurProps) {
  return (
    <div
      className={cn("pointer-events-none absolute left-0 right-0 z-10", className)}
      style={{
        [position]: 0,
        height,
      }}
    >
      {Array.from({ length: blurLayers }).map((_, i) => {
        const t = i / (blurLayers - 1);
        const blur = blurStart + (blurEnd - blurStart) * (t * t);
        const isTop = position === "top";
        const opacity = isTop ? 1 - t : t;
        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: `linear-gradient(to ${isTop ? "bottom" : "top"}, rgba(0,0,0,${opacity}) 0%, transparent 100%)`,
              WebkitMaskImage: `linear-gradient(to ${isTop ? "bottom" : "top"}, rgba(0,0,0,${opacity}) 0%, transparent 100%)`,
            }}
          />
        );
      })}
    </div>
  );
}
