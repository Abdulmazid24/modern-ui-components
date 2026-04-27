"use client";
import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { cn } from "../utils";

const SUGGEST_SPRING = { type: "spring", stiffness: 400, damping: 28 } as const;
const MAX_VISIBLE = 8;

export interface AutoCompleteOption { readonly value: string; readonly label: string; readonly icon?: React.ReactNode; readonly description?: string; }
export interface NeuralAutoCompleteProps {
  readonly options: readonly AutoCompleteOption[];
  readonly value?: string;
  readonly onChange?: (value: string) => void;
  readonly onSelect?: (option: AutoCompleteOption) => void;
  readonly placeholder?: string;
  readonly className?: string;
}

/** NeuralAutoComplete — Search input with intelligent suggestions panel, keyboard nav, and neural highlight matching. */
export const NeuralAutoComplete = React.forwardRef<HTMLInputElement, NeuralAutoCompleteProps>(
  ({ className, options, value = "", onChange, onSelect, placeholder = "Search...", ...props }, ref) => {
    const [query, setQuery] = useState(value);
    const [isOpen, setIsOpen] = useState(false);
    const [highlightIdx, setHighlightIdx] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const filtered = options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()) || o.value.toLowerCase().includes(query.toLowerCase())).slice(0, MAX_VISIBLE);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setQuery(val); onChange?.(val); setIsOpen(val.length > 0); setHighlightIdx(0);
    }, [onChange]);

    const handleSelect = useCallback((option: AutoCompleteOption) => {
      setQuery(option.label); onSelect?.(option); onChange?.(option.value); setIsOpen(false);
    }, [onSelect, onChange]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowDown") { e.preventDefault(); setHighlightIdx((p) => Math.min(p + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setHighlightIdx((p) => Math.max(p - 1, 0)); }
      if (e.key === "Enter" && filtered[highlightIdx]) { e.preventDefault(); handleSelect(filtered[highlightIdx]); }
      if (e.key === "Escape") setIsOpen(false);
    };

    const highlightMatch = (text: string) => {
      if (!query) return text;
      const idx = text.toLowerCase().indexOf(query.toLowerCase());
      if (idx === -1) return text;
      return <>{text.slice(0, idx)}<span className="text-violet-400 font-bold">{text.slice(idx, idx + query.length)}</span>{text.slice(idx + query.length)}</>;
    };

    return (
      <div className={cn("relative w-full", className)}>
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600" />
          <input ref={ref ?? inputRef} value={query} onChange={handleChange} onKeyDown={handleKeyDown}
            onFocus={() => query.length > 0 && setIsOpen(true)} onBlur={() => setTimeout(() => setIsOpen(false), 200)}
            placeholder={placeholder}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/40 focus:shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-all" />
        </div>

        <AnimatePresence>
          {isOpen && filtered.length > 0 && (
            <motion.div className="absolute top-full left-0 right-0 mt-2 bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800 rounded-xl overflow-hidden z-50 shadow-2xl"
              initial={{ opacity: 0, y: -8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }} transition={SUGGEST_SPRING}>
              <div className="h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
              <div className="py-1.5 max-h-[320px] overflow-auto">
                {filtered.map((option, i) => (
                  <button key={option.value} onClick={() => handleSelect(option)} onMouseEnter={() => setHighlightIdx(i)}
                    className={cn("w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors cursor-pointer",
                      i === highlightIdx ? "bg-violet-500/10 text-white" : "text-zinc-400 hover:text-zinc-200")}>
                    {option.icon && <span className="shrink-0 w-5 h-5 flex items-center justify-center text-zinc-500">{option.icon}</span>}
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold truncate">{highlightMatch(option.label)}</div>
                      {option.description && <div className="text-[10px] text-zinc-600 truncate">{option.description}</div>}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
NeuralAutoComplete.displayName = "NeuralAutoComplete";
