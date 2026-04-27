"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Edit2 } from "lucide-react";
import { cn } from "../utils";

export interface QuantumEditableTextProps {
  readonly value: string;
  readonly onSave: (value: string) => void;
  readonly placeholder?: string;
  readonly className?: string;
}

/** QuantumEditableText — Inline text editor with smooth transition, keyboard controls, and neon focus ring. */
export const QuantumEditableText = React.forwardRef<HTMLDivElement, QuantumEditableTextProps>(
  ({ className, value, onSave, placeholder = "Click to edit", ...props }, ref) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentValue, setCurrentValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      setCurrentValue(value);
    }, [value]);

    useEffect(() => {
      if (isEditing && inputRef.current) {
        inputRef.current.focus();
        // Place cursor at end
        inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
      }
    }, [isEditing]);

    const handleSave = () => {
      if (currentValue.trim() !== value) {
        onSave(currentValue.trim());
      }
      setIsEditing(false);
    };

    const handleCancel = () => {
      setCurrentValue(value);
      setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") handleSave();
      if (e.key === "Escape") handleCancel();
    };

    return (
      <div ref={ref} {...props} className={cn("relative inline-block", className)}>
        <AnimatePresence mode="wait">
          {!isEditing ? (
            <motion.div 
              key="view"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsEditing(true)}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-lg border border-transparent hover:border-zinc-800 hover:bg-zinc-900/50 cursor-text transition-colors"
            >
              <span className={cn("text-zinc-200", !value && "text-zinc-500")}>
                {value || placeholder}
              </span>
              <Edit2 size={12} className="opacity-0 group-hover:opacity-100 text-zinc-500 transition-opacity" />
            </motion.div>
          ) : (
            <motion.div 
              key="edit"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center gap-2"
            >
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={currentValue}
                  onChange={(e) => setCurrentValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-zinc-950 border border-violet-500/50 rounded-lg px-3 py-1.5 text-zinc-200 focus:outline-none shadow-[0_0_10px_rgba(139,92,246,0.2)] min-w-[200px]"
                />
                {/* Neon Bottom Ring */}
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-b-lg" />
              </div>
              <div className="flex items-center gap-1">
                <button onClick={handleSave} className="p-1.5 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded-md transition-colors" title="Save (Enter)">
                  <Check size={16} />
                </button>
                <button onClick={handleCancel} className="p-1.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-md transition-colors" title="Cancel (Esc)">
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
QuantumEditableText.displayName = "QuantumEditableText";
