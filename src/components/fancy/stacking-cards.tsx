"use client";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export type StackingCardItem = {
  id: string | number;
  content: React.ReactNode;
};

type StackingCardsProps = {
  items: StackingCardItem[];
  className?: string;
  cardClassName?: string;
};

function StackingCard({
  item,
  index,
  total,
  progress,
}: {
  item: StackingCardItem;
  index: number;
  total: number;
  progress: ReturnType<typeof useSpring>;
}) {
  const start = index / total;
  const end = (index + 1) / total;

  const scale = useTransform(progress, [start, end], [1, 0.92 - (total - index - 1) * 0.03]);
  const y = useTransform(progress, [start, end], ["0%", "-4%"]);
  const opacity = useTransform(progress, [end - 0.05, end], [1, index === total - 1 ? 1 : 0.5]);
  const stackY = index * 16;

  return (
    <motion.div
      className={cn(
        "sticky top-24 w-full origin-top",
      )}
      style={{ y: stackY, scale, opacity, zIndex: index + 1 }}
    >
      {item.content}
    </motion.div>
  );
}

export default function StackingCards({ items, className, cardClassName }: StackingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={{ height: `${items.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-start pt-20 gap-4">
        {items.map((item, i) => (
          <StackingCard
            key={item.id}
            item={item}
            index={i}
            total={items.length}
            progress={smoothProgress}
          />
        ))}
      </div>
    </div>
  );
}
