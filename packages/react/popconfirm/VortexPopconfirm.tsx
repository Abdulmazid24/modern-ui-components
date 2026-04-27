"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { cn } from "../utils";

const POP_SPRING = { type: "spring", stiffness: 400, damping: 25 } as const;

export interface VortexPopconfirmProps { readonly children: React.ReactNode; readonly title: string; readonly description?: string; readonly onConfirm: () => void; readonly onCancel?: () => void; readonly confirmLabel?: string; readonly cancelLabel?: string; readonly className?: string; }

/** VortexPopconfirm — A small confirmation popover with a vortex swirl opening animation. */
export const VortexPopconfirm = React.forwardRef<HTMLDivElement, VortexPopconfirmProps>(
  ({ className, children, title, description, onConfirm, onCancel, confirmLabel = "Yes", cancelLabel = "No", ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);

    return (
      <div ref={ref} {...props} className={cn("relative inline-block", className)}>
        <div ref={triggerRef} onClick={() => setIsOpen(true)} className="cursor-pointer">{children}</div>
        <AnimatePresence>
          {isOpen && (
            <motion.div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800 rounded-2xl p-4 z-50 shadow-2xl"
              initial={{ opacity: 0, scale: 0.8, rotate: -3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 0.8, rotate: 3 }} transition={POP_SPRING}>
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent rounded-t-2xl" />
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0"><AlertCircle size={16} className="text-amber-400" /></div>
                <div><h4 className="text-xs font-bold text-white mb-1">{title}</h4>{description && <p className="text-[10px] text-zinc-400">{description}</p>}</div>
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={() => { onCancel?.(); setIsOpen(false); }} className="px-3 py-1 rounded-lg text-[10px] font-semibold text-zinc-400 border border-zinc-800 hover:bg-zinc-800 transition-colors cursor-pointer">{cancelLabel}</button>
                <button onClick={() => { onConfirm(); setIsOpen(false); }} className="px-3 py-1 rounded-lg text-[10px] font-semibold text-white bg-amber-600 hover:bg-amber-500 transition-colors cursor-pointer">{confirmLabel}</button>
              </div>
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-950 border-b border-r border-zinc-800 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
VortexPopconfirm.displayName = "VortexPopconfirm";
