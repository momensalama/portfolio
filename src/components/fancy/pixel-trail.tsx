"use client";
import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type PixelTrailProps = {
  className?: string;
  pixelSize?: number;
  fadeDelay?: number;
  trailColor?: string;
  pixelClassName?: string;
};

type Pixel = { x: number; y: number; timeout: ReturnType<typeof setTimeout> | null };

export default function PixelTrail({
  className,
  pixelSize = 24,
  fadeDelay = 500,
  trailColor = "#818cf8",
  pixelClassName,
}: PixelTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pixelMapRef = useRef<Map<string, { el: HTMLDivElement; pixel: Pixel }>>(new Map());

  const addPixel = useCallback(
    (clientX: number, clientY: number) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const col = Math.floor((clientX - rect.left) / pixelSize);
      const row = Math.floor((clientY - rect.top) / pixelSize);
      const key = `${col}-${row}`;

      const existing = pixelMapRef.current.get(key);
      if (existing) {
        if (existing.pixel.timeout) clearTimeout(existing.pixel.timeout);
        existing.el.style.opacity = "1";
        existing.pixel.timeout = setTimeout(() => {
          existing.el.style.opacity = "0";
        }, fadeDelay);
        return;
      }

      const div = document.createElement("div");
      div.style.cssText = `
        position:absolute;
        left:${col * pixelSize}px;
        top:${row * pixelSize}px;
        width:${pixelSize}px;
        height:${pixelSize}px;
        background:${trailColor};
        opacity:1;
        transition:opacity ${fadeDelay}ms ease;
        pointer-events:none;
        border-radius:2px;
      `;
      if (pixelClassName) div.className = pixelClassName;
      container.appendChild(div);

      const pixel: Pixel = { x: col, y: row, timeout: null };
      pixel.timeout = setTimeout(() => {
        div.style.opacity = "0";
        setTimeout(() => {
          div.remove();
          pixelMapRef.current.delete(key);
        }, fadeDelay);
      }, fadeDelay);

      pixelMapRef.current.set(key, { el: div, pixel });
    },
    [pixelSize, fadeDelay, trailColor, pixelClassName]
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => addPixel(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      Array.from(e.touches).forEach((t) => addPixel(t.clientX, t.clientY));
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [addPixel]);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
    />
  );
}
