"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Hash } from "lucide-react";
import { cn } from "../utils";

export interface PlasmaTagInputProps {
  readonly tags: string[];
  readonly onChange: (tags: string[]) => void;
  readonly placeholder?: string;
  readonly maxTags?: number;
  readonly className?: string;
}

/** PlasmaTagInput — Smart tag input with animated chip creation, validation, and plasma glow focus. */
export const PlasmaTagInput = React.forwardRef<HTMLDivElement, PlasmaTagInputProps>(
  ({ className, tags, onChange, placeholder = "Add tags...", maxTags = 10, ...props }, ref) => {
    const [inputValue, setInputValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const addTag = (tag: string) => {
      const trimmed = tag.trim();
      if (trimmed && !tags.includes(trimmed) && tags.length < maxTags) {
        onChange([...tags, trimmed]);
      }
      setInputValue("");
    };

    const removeTag = (tagToRemove: string) => {
      onChange(tags.filter(tag => tag !== tagToRemove));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        addTag(inputValue);
      } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
        // Remove last tag if input is empty
        removeTag(tags[tags.length - 1]);
      }
    };

    return (
      <div 
        ref={ref} {...props} 
        onClick={() => inputRef.current?.focus()}
        className={cn(
          "relative flex flex-wrap gap-2 p-2 min-h-[52px] bg-zinc-950 border rounded-2xl cursor-text transition-all duration-300",
          isFocused ? "border-violet-500/50 shadow-[0_0_20px_rgba(139,92,246,0.15)]" : "border-zinc-800 hover:border-zinc-700",
          className
        )}
      >
        <AnimatePresence>
          {tags.map(tag => (
            <motion.span 
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex items-center gap-1.5 px-3 py-1 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium rounded-xl group"
            >
              <Hash size={12} className="text-violet-500/50" />
              {tag}
              <button 
                onClick={(e) => { e.stopPropagation(); removeTag(tag); }}
                className="w-4 h-4 rounded-full flex items-center justify-center bg-violet-500/0 hover:bg-violet-500/20 text-violet-400 transition-colors ml-1"
              >
                <X size={10} />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>

        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            if (inputValue) addTag(inputValue);
          }}
          placeholder={tags.length < maxTags ? placeholder : ""}
          disabled={tags.length >= maxTags}
          className="flex-1 min-w-[120px] bg-transparent text-white placeholder:text-zinc-600 text-sm focus:outline-none py-1 disabled:cursor-not-allowed"
        />

        {/* Counter */}
        {maxTags < Infinity && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-zinc-600 pointer-events-none">
            {tags.length}/{maxTags}
          </div>
        )}
      </div>
    );
  }
);
PlasmaTagInput.displayName = "PlasmaTagInput";
