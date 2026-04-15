"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface StickyCardData {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  stats: {
    value: string | number;
    unit: string;
  }[];
}

export interface StickyScrollCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  cards?: StickyCardData[];
}

const defaultCards: StickyCardData[] = [
  {
    id: "yamaha",
    title: "Yamaha R15 V4",
    subtitle: "Aerodynamic Supersport",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop", 
    stats: [
      { value: 140, unit: "km/h" },
      { value: 45, unit: "km/l" },
      { value: 155, unit: "kg" },
    ],
  },
  {
    id: "ktm",
    title: "KTM RC 390",
    subtitle: "Track-Focused Precision",
    image: "https://images.unsplash.com/photo-1603576086749-0417387cc8b4?q=80&w=2070&auto=format&fit=crop",
    stats: [
      { value: 170, unit: "km/h" },
      { value: 30, unit: "km/l" },
      { value: 172, unit: "kg" },
    ],
  },
  {
    id: "bmw",
    title: "BMW G 310 RR",
    subtitle: "German Engineering",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop",
    stats: [
      { value: 160, unit: "km/h" },
      { value: 35, unit: "km/l" },
      { value: 174, unit: "kg" },
    ],
  },
];

export const StickyScrollCards = React.forwardRef<HTMLDivElement, StickyScrollCardsProps>(
  ({ className, cards = defaultCards, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("w-full relative py-[10vh]", className)}
        {...props}
      >
        <div className="max-w-xl mx-auto w-full relative">
          {cards.map((card, index) => {
            // Calculate dynamic top offset so they stack nicely
            const topOffset = `calc(12% + ${index * 16}px)`;
            
            return (
              <Card
                key={card.id}
                card={card}
                index={index}
                totalCards={cards.length}
                topOffset={topOffset}
              />
            );
          })}
        </div>
      </div>
    );
  }
);

StickyScrollCards.displayName = "StickyScrollCards";

/** Internal Card Component handling its own scroll-linked animation */
function Card({
  card,
  index,
  totalCards,
  topOffset,
}: {
  card: StickyCardData;
  index: number;
  totalCards: number;
  topOffset: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll progress of THIS specific card
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"], // from when it hits top, to when it leaves top
  });

  // Calculate dynamic scale and opacity.
  // As it scrolls past its sticky point, it scales down.
  // We use `index / totalCards` to ensure the final scaled size stacks nicely with others behind it.
  const targetScale = 1 - (totalCards - index) * 0.04;
  
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  // Also push it back visually using brightness/blur if desired, 
  // but a simple scale and slight dim captures the screenshot's vibe best
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  return (
    <div
      ref={containerRef}
      className="sticky h-auto flex flex-col items-center justify-start origin-top"
      style={{
        top: topOffset,
        marginBottom: index === totalCards - 1 ? "0" : "50vh", // add space to scroll through
        zIndex: index * 10,
      }}
    >
      <motion.div
        style={{ scale, opacity }}
        className={cn(
          "w-full bg-white dark:bg-zinc-900 rounded-[32px] overflow-hidden",
          "shadow-[0_30px_60px_rgba(15,23,42,0.08),0_1px_0_rgba(15,23,42,0.06)]",
          "border border-zinc-100 dark:border-zinc-800"
        )}
      >
        {/* Placeholder image representation matching the screenshot */}
        <div className="w-full h-64 sm:h-80 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center relative overflow-hidden">
          <img
            src={card.image}
            alt={card.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 to-transparent" />
        </div>

        {/* Content Area */}
        <div className="p-8">
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
            {card.title}
          </h3>
          <p className="text-sm font-medium text-zinc-500 mb-8 tracking-wide">
            {card.subtitle}
          </p>

          <div className="flex items-center justify-between gap-4">
            {card.stats.map((stat, i) => (
              <div
                key={i}
                className="flex-1 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-4 flex flex-col items-center justify-center"
              >
                <span className="text-xl font-black text-zinc-900 dark:text-zinc-100 leading-none mb-1">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold text-zinc-400">
                  {stat.unit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
