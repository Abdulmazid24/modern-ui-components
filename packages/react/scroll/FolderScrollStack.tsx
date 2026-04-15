"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FolderStackItem {
  id: string;
  title: string;
  description: string;
  color: string;
  number: string;
}

export interface FolderScrollStackProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: FolderStackItem[];
}

const defaultItems: FolderStackItem[] = [
  {
    id: "item-1",
    title: "Introduction",
    description: "Animations are powered by CSS, allowing precise control based on the element's visibility.",
    color: "bg-[#e91e63]", // Pink
    number: "01",
  },
  {
    id: "item-2",
    title: "Scroll Driven",
    description: "Animations are powered by animation-timeline, allowing precise control based on the element's visibility in the viewport.",
    color: "bg-[#00bfa5]", // Teal
    number: "02",
  },
  {
    id: "item-3",
    title: "3D Depth",
    description: "Combines perspective with 3D transforms to create depth perception, tilting cards backward as they ascend the scroll port.",
    color: "bg-[#cddc39]", // Yellow/Lime
    number: "03",
  },
  {
    id: "item-4",
    title: "Performance",
    description: "Hardware accelerated transitions utilizing GPU layers for perfectly smooth 60fps scrolling experiences.",
    color: "bg-[#9e9e9e]", // Grey
    number: "04",
  },
];

export const FolderScrollStack = React.forwardRef<HTMLDivElement, FolderScrollStackProps>(
  ({ className, items = defaultItems, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("w-full relative py-[10vh] px-4", className)}
        {...props}
      >
        <div className="max-w-3xl mx-auto w-full relative">
          {items.map((item, index) => {
            return (
              <StackCard
                key={item.id}
                item={item}
                index={index}
                totalItems={items.length}
              />
            );
          })}
        </div>
      </div>
    );
  }
);

FolderScrollStack.displayName = "FolderScrollStack";

function StackCard({
  item,
  index,
  totalItems,
}: {
  item: FolderStackItem;
  index: number;
  totalItems: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Track the scroll relative to this specific card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"], // 0 = card hits top, 1 = card scrolled out of view completely
  });

  // When scrolling past its sticky point, card scales down slightly and pushes back.
  // The 'transformOrigin: top' ensures the top edge forms the "folder tabs".
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const translateY = useTransform(scrollYProgress, [0, 1], [0, -40]); // Push up slightly while scaling to create 3D gap
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.8, 0]);

  // The top position gets incrementally larger so the top edges stack like folders
  const topOffset = `calc(10vh + ${index * 30}px)`;

  return (
    <div
      ref={cardRef}
      className="sticky h-max flex flex-col justify-start origin-top"
      style={{
        top: topOffset,
        marginBottom: index === totalItems - 1 ? 0 : "40vh", // Last card has no bottom margin
        zIndex: index + 10,
      }}
    >
      <motion.div
        style={{
          scale,
          y: translateY,
          opacity,
          transformOrigin: "top center",
        }}
        className={cn(
          "w-full h-[400px] rounded-t-3xl rounded-b-xl overflow-hidden shadow-2xl flex flex-col justify-between p-8 md:p-12",
          item.color
        )}
      >
        {/* Top right number */}
        <div className="flex justify-end w-full pb-4 border-b border-black/10">
          <span className="text-6xl md:text-8xl font-black text-black/20 tracking-tighter leading-none">
            {item.number}
          </span>
        </div>

        {/* Bottom Content */}
        <div className="mt-auto max-w-lg">
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
            {item.title}
          </h2>
          <p className="text-sm md:text-base font-medium text-black/70 leading-relaxed max-w-md">
            {item.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
