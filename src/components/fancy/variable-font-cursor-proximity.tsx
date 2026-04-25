"use client";
import { motion, useAnimationFrame, useMotionValue } from "motion/react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type VariableFontCursorProximityProps = {
  label: string;
  className?: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  radius?: number;
  falloff?: "linear" | "exponential" | "gaussian";
  containerRef: React.RefObject<HTMLElement | null>;
};

const parseVariation = (s: string) => {
  const re = /'(\w+)'\s+(-?[\d.]+)/g;
  const out: Record<string, number> = {};
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) out[m[1]] = parseFloat(m[2]);
  return out;
};
const stringify = (o: Record<string, number>) =>
  Object.entries(o)
    .map(([k, v]) => `'${k}' ${v}`)
    .join(", ");

const VariableFontCursorProximity = forwardRef<HTMLSpanElement, VariableFontCursorProximityProps>(
  (
    { label, className, fromFontVariationSettings, toFontVariationSettings, radius = 50, falloff = "linear", containerRef },
    ref
  ) => {
    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const [settingsList, setSettingsList] = useState<string[]>(
      () => label.split("").map(() => fromFontVariationSettings)
    );
    const mouse = useRef({ x: -9999, y: -9999 });
    const from = parseVariation(fromFontVariationSettings);
    const to = parseVariation(toFontVariationSettings);

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
        if (!el) return fromFontVariationSettings;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = mouse.current.x - cx;
        const dy = mouse.current.y - cy;
        const d = Math.sqrt(dx * dx + dy * dy);
        let t = Math.max(0, 1 - d / radius);
        if (falloff === "exponential") t = t * t;
        else if (falloff === "gaussian") t = Math.exp(-Math.pow(d / (radius / 2), 2));
        const merged: Record<string, number> = {};
        for (const k of Object.keys(from)) {
          const f = from[k];
          const toV = to[k] ?? f;
          merged[k] = f + (toV - f) * t;
        }
        return stringify(merged);
      });
      setSettingsList(next);
    });

    return (
      <span ref={ref} className={cn("inline-block font-variable", className)}>
        {label.split("").map((c, i) => (
          <motion.span
            key={i}
            ref={(el) => {
              letterRefs.current[i] = el;
            }}
            style={{ fontVariationSettings: settingsList[i] }}
            className="inline-block whitespace-pre"
          >
            {c === " " ? " " : c}
          </motion.span>
        ))}
      </span>
    );
  }
);
VariableFontCursorProximity.displayName = "VariableFontCursorProximity";
export default VariableFontCursorProximity;
