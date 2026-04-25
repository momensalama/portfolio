"use client";

import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type AnimationVariant = "circle" | "rectangle" | "circle-blur";
export type AnimationStart =
  | "top-left" | "top-right" | "bottom-left" | "bottom-right"
  | "center" | "top-center" | "bottom-center"
  | "bottom-up" | "top-down" | "left-right" | "right-left";

const getClipPath = (start: AnimationStart) => {
  switch (start) {
    case "bottom-up":   return { from: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" };
    case "top-down":    return { from: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" };
    case "left-right":  return { from: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" };
    case "right-left":  return { from: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)", to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" };
    default:            return { from: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" };
  }
};

const getCirclePos = (start: AnimationStart) => {
  switch (start) {
    case "top-left":     return "0% 0%";
    case "top-right":    return "100% 0%";
    case "bottom-left":  return "0% 100%";
    case "bottom-right": return "100% 100%";
    case "top-center":   return "50% 0%";
    case "bottom-center":return "50% 100%";
    default:             return "50% 50%";
  }
};

export const createAnimation = (variant: AnimationVariant, start: AnimationStart) => {
  const styleId = "skiper-theme-transition";

  if (variant === "rectangle") {
    const cp = getClipPath(start);
    return `
      ::view-transition-group(root) { animation-duration: 0.6s; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
      ::view-transition-new(root) { animation-name: skiper-rect; }
      ::view-transition-old(root), .dark::view-transition-old(root) { animation: none; z-index: -1; }
      .dark::view-transition-new(root) { animation-name: skiper-rect; }
      @keyframes skiper-rect { from { clip-path: ${cp.from}; } to { clip-path: ${cp.to}; } }
    `;
  }

  const pos = start === "center" ? "50% 50%" : getCirclePos(start);
  return `
    ::view-transition-group(root) { animation-duration: 0.7s; animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1); }
    ::view-transition-new(root) { animation-name: skiper-circle; }
    ::view-transition-old(root), .dark::view-transition-old(root) { animation: none; z-index: -1; }
    .dark::view-transition-new(root) { animation-name: skiper-circle; }
    @keyframes skiper-circle { from { clip-path: circle(0% at ${pos}); } to { clip-path: circle(150% at ${pos}); } }
  `;
};

export function useThemeToggle({
  variant = "rectangle",
  start = "bottom-up",
}: { variant?: AnimationVariant; start?: AnimationStart } = {}) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(resolvedTheme === "dark");
  }, [resolvedTheme]);

  const applyAndTransition = useCallback(
    (nextTheme: "light" | "dark") => {
      let el = document.getElementById("skiper-theme-transition") as HTMLStyleElement | null;
      if (!el) {
        el = document.createElement("style");
        el.id = "skiper-theme-transition";
        document.head.appendChild(el);
      }
      el.textContent = createAnimation(variant, start);

      const apply = () => { setTheme(nextTheme); setIsDark(nextTheme === "dark"); };
      if (!document.startViewTransition) { apply(); return; }
      document.startViewTransition(apply);
    },
    [variant, start, setTheme]
  );

  const toggleTheme = useCallback(() => {
    applyAndTransition(theme === "dark" ? "light" : "dark");
  }, [theme, applyAndTransition]);

  return { isDark, toggleTheme };
}

export function ThemeToggleButton({
  className,
  variant = "rectangle",
  start = "bottom-up",
}: {
  className?: string;
  variant?: AnimationVariant;
  start?: AnimationStart;
}) {
  const { isDark, toggleTheme } = useThemeToggle({ variant, start });

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={cn(
        "size-7 cursor-pointer rounded-full bg-foreground p-0 transition-all duration-300 active:scale-95 flex-shrink-0",
        className
      )}
    >
      <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full">
        <motion.g animate={{ rotate: isDark ? -180 : 0 }} transition={{ ease: "easeInOut", duration: 0.5 }}>
          <path d="M120 67.5C149.25 67.5 172.5 90.75 172.5 120C172.5 149.25 149.25 172.5 120 172.5" fill="var(--background)" />
          <path d="M120 67.5C90.75 67.5 67.5 90.75 67.5 120C67.5 149.25 90.75 172.5 120 172.5" fill="var(--foreground)" />
        </motion.g>
        <motion.path
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          d="M120 3.75C55.5 3.75 3.75 55.5 3.75 120C3.75 184.5 55.5 236.25 120 236.25C184.5 236.25 236.25 184.5 236.25 120C236.25 55.5 184.5 3.75 120 3.75ZM120 214.5V172.5C90.75 172.5 67.5 149.25 67.5 120C67.5 90.75 90.75 67.5 120 67.5V25.5C172.5 25.5 214.5 67.5 214.5 120C214.5 172.5 172.5 214.5 120 214.5Z"
          fill="var(--background)"
        />
      </svg>
    </button>
  );
}
