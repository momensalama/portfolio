"use client";
import { cn } from "@/lib/utils";
import { AnchorHTMLAttributes } from "react";

type UnderlineToBackgroundProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  label: string;
  targetTextColor?: string;
};

export default function UnderlineToBackground({
  label,
  targetTextColor = "#fff",
  className,
  style,
  ...rest
}: UnderlineToBackgroundProps) {
  return (
    <a
      {...rest}
      className={cn(
        "relative inline-block cursor-pointer whitespace-nowrap",
        "bg-[linear-gradient(currentColor,currentColor),linear-gradient(currentColor,currentColor)]",
        "[background-size:100%_1px,0%_100%] [background-position:0_100%,0_0] bg-no-repeat",
        "hover:[background-size:0%_1px,100%_100%]",
        "transition-[background-size,color] duration-500 ease-[cubic-bezier(.86,0,.07,1)]",
        "hover:text-(--utb-target)",
        className
      )}
      style={{ ...(style || {}), ["--utb-target" as string]: targetTextColor } as React.CSSProperties}
    >
      {label}
    </a>
  );
}
