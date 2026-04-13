"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils";

const cells = [
  { title: "Components", value: "150+", span: "col-span-2 row-span-2", gradient: "from-violet-500/20 to-purple-500/10" },
  { title: "Categories", value: "130", span: "col-span-1", gradient: "from-cyan-500/20 to-blue-500/10" },
  { title: "CLI Downloads", value: "12K", span: "col-span-1", gradient: "from-pink-500/20 to-rose-500/10" },
  { title: "Stars", value: "8.2K", span: "col-span-1", gradient: "from-amber-500/20 to-yellow-500/10" },
  { title: "Contributors", value: "42", span: "col-span-1", gradient: "from-emerald-500/20 to-green-500/10" },
  { title: "Framework Support", value: "React, Vue, Svelte", span: "col-span-2", gradient: "from-indigo-500/20 to-violet-500/10" },
];
export const BentoGrid = React.forwardRef<any, any>(({ className, ...props }, ref) => {
        (
          <div className="grid grid-cols-4 gap-3 w-full max-w-2xl">
            {cells.map((cell, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} whileHover={{ scale: 1.02, borderColor: "rgba(124,58,237,0.3)" }} className={`${cell.span} p-5 rounded-2xl bg-gradient-to-br ${cell.gradient} border border-white/8 cursor-default transition-all backdrop-blur-sm`}>
                <p className="text-xs text-zinc-500 font-semibold tracking-wider uppercase mb-1">{cell.title}</p>
                <p className="text-xl font-black text-white">{cell.value}</p>
              </motion.div>
            ))}
          </div>
        )
        });
