"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, Check } from "lucide-react";
import { cn } from "@/utils";

export const CrystalDialog = React.forwardRef<any, any>(({ className, open: controlledOpen, onClose, title = "Confirm Action", description = "This action cannot be undone. Are you sure?", ...props }, ref) => {
        const [internalOpen, setInternalOpen] = useState(true);
        const isOpen = controlledOpen ?? internalOpen;
        const close = () => { setInternalOpen(false); onClose?.(); };
        return (
        <div ref={ref} {...props} className={cn("relative flex items-center justify-center min-h-[300px]", className)}>
          {!isOpen && <motion.button onClick={() => setInternalOpen(true)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 font-semibold text-sm cursor-pointer">Open Dialog</motion.button>}
          <AnimatePresence>
            {isOpen && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl" onClick={close} />
                <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="relative z-10 w-full max-w-md p-6 rounded-2xl bg-zinc-900 border border-white/10" style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 30px rgba(239,68,68,0.1)" }}>
                  <button onClick={close} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors cursor-pointer"><X size={18} /></button>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-500/15 flex items-center justify-center flex-shrink-0"><AlertTriangle size={20} className="text-red-400" /></div>
                    <div><h3 className="text-white font-bold text-lg">{title}</h3><p className="text-zinc-400 text-sm mt-1">{description}</p></div>
                  </div>
                  <div className="flex justify-end gap-3 mt-6">
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={close} className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 text-sm font-medium border border-white/5 cursor-pointer">Cancel</motion.button>
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={close} className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold cursor-pointer" style={{ boxShadow: "0 0 15px rgba(239,68,68,0.3)" }}>Delete</motion.button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
        );
        });
