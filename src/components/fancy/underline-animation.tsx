"use client";
import { cn } from "@/lib/utils";
import { AnchorHTMLAttributes } from "react";

type UnderlineAnimationProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  label: string;
  direction?: "left" | "right";
};

export default function UnderlineAnimation({
  label,
  direction = "left",
  className,
  ...rest
}: UnderlineAnimationProps) {
  return (
    <a
      {...rest}
      className={cn(
        "relative inline-block",
        "after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:bg-current",
        "after:origin-bottom-right after:scale-x-0 after:transition-transform after:duration-500 after:ease-[cubic-bezier(.76,0,.24,1)]",
        "hover:after:origin-bottom-left hover:after:scale-x-100",
        direction === "right" && "after:origin-bottom-left hover:after:origin-bottom-right",
        className
      )}
    >
      {label}
    </a>
  );
}
