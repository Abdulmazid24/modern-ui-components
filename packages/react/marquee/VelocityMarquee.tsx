"use client";
import React from "react";
import { motion } from "framer-motion";
const defaultItems = ["React", "Next.js", "Tailwind", "Framer Motion", "TypeScript", "Supabase", "Vercel", "Modern UI Vault"];
export const VelocityMarquee: React.FC<{ items?: string[]; speed?: number; direction?: "left" | "right" }> = ({ items = defaultItems, speed = 30, direction = "left" }) => {
  const content = [...items, ...items, ...items];
  return (
    <div className="w-full overflow-hidden py-4">
      <motion.div className="flex gap-8 whitespace-nowrap" animate={{ x: direction === "left" ? ["0%", "-33.33%"] : ["-33.33%", "0%"] }} transition={{ duration: speed, repeat: Infinity, ease: "linear" }}>
        {content.map((item, i) => (
          <span key={i} className="text-lg font-bold text-zinc-600 hover:text-white transition-colors cursor-default flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-violet-500/50" />{item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};
