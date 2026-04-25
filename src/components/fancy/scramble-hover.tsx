"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ScrambleHoverProps = {
  text: string;
  scrambleSpeed?: number;
  maxIterations?: number;
  characters?: string;
  className?: string;
  useOriginalCharsOnly?: boolean;
  as?: React.ElementType;
};

export default function ScrambleHover({
  text,
  scrambleSpeed = 50,
  maxIterations = 10,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  className,
  useOriginalCharsOnly = false,
  as: Tag = "span",
}: ScrambleHoverProps) {
  const [display, setDisplay] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const revealed = useRef(new Set<number>());
  const iteration = useRef(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isHovering) {
      revealed.current.clear();
      iteration.current = 0;
      const pool = useOriginalCharsOnly
        ? Array.from(new Set(text.split("").filter((c) => c !== " ")))
        : characters.split("");
      interval = setInterval(() => {
        setDisplay(
          text
            .split("")
            .map((c, i) => {
              if (c === " ") return " ";
              if (revealed.current.has(i)) return text[i];
              if (Math.random() * maxIterations < iteration.current) {
                revealed.current.add(i);
                return text[i];
              }
              return pool[Math.floor(Math.random() * pool.length)];
            })
            .join("")
        );
        iteration.current += 0.5;
        if (revealed.current.size >= text.length && interval) {
          clearInterval(interval);
        }
      }, scrambleSpeed);
    } else {
      setDisplay(text);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovering, text, scrambleSpeed, maxIterations, characters, useOriginalCharsOnly]);

  return (
    <Tag
      className={cn(className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {display}
    </Tag>
  );
}
