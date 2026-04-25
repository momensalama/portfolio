"use client";
import { motion, useAnimationFrame } from "motion/react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Styles = { [key: string]: { from: number; to: number } };

type TextCursorProximityProps = {
  label: string;
  className?: string;
  styles: Styles;
  radius?: number;
  falloff?: "linear" | "exponential" | "gaussian";
  containerRef: React.RefObject<HTMLElement | null>;
};

const TextCursorProximity = forwardRef<HTMLSpanElement, TextCursorProximityProps>(
  ({ label, className, styles, radius = 100, falloff = "linear", containerRef }, ref) => {
    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const mouse = useRef({ x: -9999, y: -9999 });
    const [values, setValues] = useState<Record<string, number>[]>(
      () => label.split("").map(() => {
        const o: Record<string, number> = {};
        Object.entries(styles).forEach(([k, v]) => (o[k] = v.from));
        return o;
      })
    );

    useEffect(() => {
      const onMove = (e: MouseEvent) => {
        mouse.current = { x: e.clientX, y: e.clientY };
      };
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }, []);

    useAnimationFrame(() => {
      const container = containerRef.current;
      if (!container) return;
      const next = label.split("").map((_, i) => {
        const el = letterRefs.current[i];
        const o: Record<string, number> = {};
        if (!el) {
          Object.entries(styles).forEach(([k, v]) => (o[k] = v.from));
          return o;
        }
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = mouse.current.x - cx;
        const dy = mouse.current.y - cy;
        const d = Math.sqrt(dx * dx + dy * dy);
        let t = Math.max(0, 1 - d / radius);
        if (falloff === "exponential") t *= t;
        else if (falloff === "gaussian") t = Math.exp(-Math.pow(d / (radius / 2), 2));
        Object.entries(styles).forEach(([k, v]) => {
          o[k] = v.from + (v.to - v.from) * t;
        });
        return o;
      });
      setValues(next);
    });

    return (
      <span ref={ref} className={cn("inline-block", className)}>
        {label.split("").map((c, i) => {
          const v = values[i];
          const style: React.CSSProperties = {};
          Object.entries(v).forEach(([k, num]) => {
            if (k === "scale") style.transform = `scale(${num})`;
            else if (k === "rotate") style.transform = (style.transform || "") + ` rotate(${num}deg)`;
            else if (k === "weight") style.fontWeight = num;
            else (style as unknown as Record<string, string | number>)[k] = num as number;
          });
          return (
            <motion.span
              key={i}
              ref={(el) => {
                letterRefs.current[i] = el;
              }}
              style={style}
              className="inline-block whitespace-pre origin-center"
            >
              {c === " " ? " " : c}
            </motion.span>
          );
        })}
      </span>
    );
  }
);
TextCursorProximity.displayName = "TextCursorProximity";
export default TextCursorProximity;
