"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type GravityItem = {
  id: string | number;
  label: string;
  color?: string;
  icon?: React.ReactNode;
  className?: string;
};

type GravityProps = {
  items: GravityItem[];
  className?: string;
  gravity?: number;
  resistance?: number;
  attractionToCenter?: number;
};

type PhysicsBody = {
  id: string | number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  el: HTMLDivElement;
  isDragging: boolean;
  dragOffsetX: number;
  dragOffsetY: number;
};

export default function Gravity({
  items,
  className,
  gravity = 0.4,
  resistance = 0.92,
  attractionToCenter = 0.002,
}: GravityProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bodiesRef = useRef<PhysicsBody[]>([]);
  const rafRef = useRef<number>(0);
  const [ready, setReady] = useState(false);

  // Create pill elements and measure them
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";
    bodiesRef.current = [];

    const cw = container.offsetWidth;
    const ch = container.offsetHeight;

    items.forEach((item) => {
      const el = document.createElement("div");
      el.className = cn(
        "absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium",
        "border bg-background shadow-sm cursor-grab active:cursor-grabbing select-none",
        item.className || ""
      );
      el.style.cssText = `top:0;left:0;white-space:nowrap;`;
      if (item.color) el.style.borderColor = item.color;

      if (item.icon) {
        const iconWrap = document.createElement("span");
        iconWrap.className = "size-4 flex-shrink-0";
        el.appendChild(iconWrap);
      }

      const text = document.createElement("span");
      text.textContent = item.label;
      el.appendChild(text);
      container.appendChild(el);

      // Force layout to measure
      const w = el.offsetWidth || 100;
      const h = el.offsetHeight || 32;

      const body: PhysicsBody = {
        id: item.id,
        x: Math.random() * Math.max(1, cw - w),
        y: -h - Math.random() * ch * 0.5,
        vx: (Math.random() - 0.5) * 3,
        vy: Math.random() * 2,
        width: w,
        height: h,
        el,
        isDragging: false,
        dragOffsetX: 0,
        dragOffsetY: 0,
      };

      // Drag events
      const onMouseDown = (e: MouseEvent) => {
        body.isDragging = true;
        body.vx = 0;
        body.vy = 0;
        const rect = el.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        body.dragOffsetX = e.clientX - rect.left + containerRect.left;
        body.dragOffsetY = e.clientY - rect.top + containerRect.top;
        el.style.cursor = "grabbing";
      };
      const onMouseMove = (e: MouseEvent) => {
        if (!body.isDragging) return;
        const containerRect = container.getBoundingClientRect();
        body.x = e.clientX - containerRect.left - body.dragOffsetX;
        body.y = e.clientY - containerRect.top - body.dragOffsetY;
      };
      const onMouseUp = () => {
        body.isDragging = false;
        el.style.cursor = "grab";
      };

      el.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);

      bodiesRef.current.push(body);
    });

    setReady(true);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [items]);

  // Physics loop
  useEffect(() => {
    if (!ready) return;
    const container = containerRef.current;
    if (!container) return;

    const tick = () => {
      const cw = container.offsetWidth;
      const ch = container.offsetHeight;

      bodiesRef.current.forEach((body) => {
        if (body.isDragging) {
          body.el.style.transform = `translate(${body.x}px,${body.y}px)`;
          return;
        }

        // Gravity
        body.vy += gravity;

        // Gentle center attraction
        const cx = cw / 2 - body.width / 2;
        const cy = ch / 2 - body.height / 2;
        body.vx += (cx - body.x) * attractionToCenter;
        body.vy += (cy - body.y) * attractionToCenter;

        // Resistance
        body.vx *= resistance;
        body.vy *= resistance;

        body.x += body.vx;
        body.y += body.vy;

        // Floor / wall collisions
        if (body.y + body.height >= ch) {
          body.y = ch - body.height;
          body.vy *= -0.45;
          body.vx *= 0.92;
        }
        if (body.y < 0) { body.y = 0; body.vy *= -0.45; }
        if (body.x < 0) { body.x = 0; body.vx *= -0.6; }
        if (body.x + body.width > cw) { body.x = cw - body.width; body.vx *= -0.6; }

        body.el.style.transform = `translate(${body.x}px,${body.y}px)`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [ready, gravity, resistance, attractionToCenter]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-hidden rounded-xl border bg-muted/30", className)}
      style={{ minHeight: 260 }}
    />
  );
}
