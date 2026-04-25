"use client";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type ScrambleInHandle = {
  start: () => void;
  reset: () => void;
};

type ScrambleInProps = {
  text: string;
  scrambleSpeed?: number;
  scrambledLetterCount?: number;
  characters?: string;
  className?: string;
  scrambledClassName?: string;
  autoStart?: boolean;
  onComplete?: () => void;
};

const ScrambleIn = forwardRef<ScrambleInHandle, ScrambleInProps>(
  (
    {
      text,
      scrambleSpeed = 45,
      scrambledLetterCount = 8,
      characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!<>-_\\/[]{}—=+*^?#",
      className,
      scrambledClassName,
      autoStart = true,
      onComplete,
    },
    ref
  ) => {
    const [displayText, setDisplayText] = useState("");
    const [isAnimating, setIsAnimating] = useState(false);
    const [visibleLetterCount, setVisibleLetterCount] = useState(0);
    const [scrambleOffset, setScrambleOffset] = useState(0);
    const onCompleteRef = useRef(onComplete);
    onCompleteRef.current = onComplete;

    const start = () => {
      setVisibleLetterCount(0);
      setScrambleOffset(0);
      setIsAnimating(true);
    };
    const reset = () => {
      setIsAnimating(false);
      setVisibleLetterCount(0);
      setScrambleOffset(0);
      setDisplayText("");
    };

    useImperativeHandle(ref, () => ({ start, reset }));

    useEffect(() => {
      if (autoStart) start();
    }, [autoStart]);

    useEffect(() => {
      let interval: ReturnType<typeof setInterval> | null = null;
      if (isAnimating) {
        interval = setInterval(() => {
          if (visibleLetterCount < text.length) {
            setVisibleLetterCount((v) => v + 1);
            setScrambleOffset((o) => o + 1);
          } else if (scrambleOffset < scrambledLetterCount) {
            setScrambleOffset((o) => o + 1);
          } else {
            setIsAnimating(false);
            onCompleteRef.current?.();
          }
        }, scrambleSpeed);
      }
      return () => {
        if (interval) clearInterval(interval);
      };
    }, [isAnimating, visibleLetterCount, scrambleOffset, text, scrambleSpeed, scrambledLetterCount]);

    useEffect(() => {
      const revealed = text.slice(0, visibleLetterCount);
      const scrambleLen = Math.min(scrambledLetterCount, text.length - visibleLetterCount);
      let scrambled = "";
      for (let i = 0; i < scrambleLen; i++) {
        scrambled += characters[Math.floor(Math.random() * characters.length)];
      }
      setDisplayText(revealed + scrambled);
    }, [visibleLetterCount, scrambleOffset, text, scrambledLetterCount, characters]);

    const revealed = displayText.slice(0, visibleLetterCount);
    const scrambled = displayText.slice(visibleLetterCount);

    return (
      <span className={cn(className)}>
        <span>{revealed}</span>
        <span className={cn(scrambledClassName)}>{scrambled}</span>
      </span>
    );
  }
);
ScrambleIn.displayName = "ScrambleIn";
export default ScrambleIn;
