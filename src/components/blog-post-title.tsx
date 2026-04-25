"use client";
import ScrambleHover from "@/components/fancy/scramble-hover";

export default function BlogPostTitle({ title }: { title: string }) {
  return (
    <ScrambleHover
      text={title}
      scrambleSpeed={45}
      maxIterations={8}
      useOriginalCharsOnly={false}
      className="tracking-tight text-lg font-medium"
    />
  );
}
