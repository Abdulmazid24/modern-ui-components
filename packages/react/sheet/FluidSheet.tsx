"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/utils";

export const FluidSheet = React.forwardRef<any, any>(({ className, side = "right", ...props }, ref) => {
        const [open, setOpen] = useState(false);
        const isRight = side === "right";
        return (
        <div ref={ref} {...props} className={cn("relative min-h-[300px] flex items-center justify-center", className)}>
          <motion.button whileTap={{ scale: 0.97 }} onClick={() => setOpen(true)} className="px-5 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold cursor-pointer">Open Sheet</motion.button>
          <AnimatePresence>
            {open && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setOpen(false)} />
                <motion.div
                  initial={isRight ? { x: "100%" } : { y: "100%" }}
                  animate={isRight ? { x: 0 } : { y: 0 }}
                  exit={isRight ? { x: "100%" } : { y: "100%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className={`fixed z-50 bg-zinc-900 border-white/10 ${isRight ? "right-0 top-0 bottom-0 w-80 border-l" : "left-0 right-0 bottom-0 h-80 border-t rounded-t-3xl"}`}
                >
                  <div className="p-6"><div className="flex items-center justify-between mb-4"><h3 className="text-white font-bold">Settings</h3><button onClick={() => setOpen(false)} className="text-zinc-500 hover:text-white cursor-pointer"><X size={18} /></button></div><p className="text-sm text-zinc-400">Sheet content with spring physics and backdrop blur.</p></div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
        );
        });
