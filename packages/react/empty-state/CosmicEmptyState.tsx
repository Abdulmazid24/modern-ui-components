"use client";
import React from "react";
import { motion } from "framer-motion";
import { Inbox } from "lucide-react";
import { cn } from "@/utils";

export const CosmicEmptyState = React.forwardRef<any, any>(({ className, title = "No data yet", desc = "Start by creating your first entry.", ...props }, ref) => {
        (
          <div className="w-full max-w-sm mx-auto flex flex-col items-center py-16 px-6 text-center">
            <motion.div initial={{ y: 10 }} animate={{ y: [10, -5, 10] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center mb-6"><Inbox size={32} className="text-violet-400" /></motion.div>
            <h3 className="text-white text-lg font-bold mb-2">{title}</h3>
            <p className="text-zinc-500 text-sm mb-6">{desc}</p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-5 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold cursor-pointer" style={{ boxShadow: "0 0 20px rgba(124,58,237,0.3)" }}>Get Started</motion.button>
          </div>
        )
        });
