"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Check, X } from "lucide-react";
import { cn } from "../utils";

interface Option {
  id: string | number;
  label: string;
  category?: string;
}

interface HolographicAutocompleteProps {
  options: Option[];
  placeholder?: string;
  onSelect?: (option: Option) => void;
  className?: string;
  maxHeight?: string;
}

/**
 * A "God-Tier" Autocomplete component inspired by HTML datalist.
 * Features:
 * - Holographic glassmorphic aesthetics.
 * - Fuzzy-like filtering logic.
 * - Keyboard navigation (Arrows, Enter, Escape).
 * - Animated dropdown expansion.
 */
export const HolographicAutocomplete = ({
  options,
  placeholder = "Search regions...",
  onSelect,
  className,
  maxHeight = "300px",
}: HolographicAutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter logic
  useEffect(() => {
    const term = inputValue.toLowerCase();
    const result = options.filter((opt) => opt.label.toLowerCase().includes(term));
    setFilteredOptions(result);
    setActiveIndex(-1);
  }, [inputValue, options]);

  const handleSelect = (option: Option) => {
    setInputValue(option.label);
    setSelectedOption(option);
    setIsOpen(false);
    onSelect?.(option);
  };

  const clearSelection = () => {
    setInputValue("");
    setSelectedOption(null);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) setIsOpen(true);
      setActiveIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < filteredOptions.length) {
        handleSelect(filteredOptions[activeIndex]);
      } else if (filteredOptions.length > 0) {
        // Default to first result if none active
        handleSelect(filteredOptions[0]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className={cn("relative w-full max-w-sm", className)}>
      {/* Input Field Area */}
      <div className="group relative">
        <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition-opacity duration-500 group-focus-within:opacity-100" />
        
        <div className="flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-950/50 px-4 py-3 shadow-2xl backdrop-blur-xl transition-all duration-300 group-focus-within:border-cyan-500/50 group-focus-within:ring-2 group-focus-within:ring-cyan-500/20">
          <Search size={18} className="text-zinc-500 transition-colors group-focus-within:text-cyan-400" />
          
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent text-sm text-white placeholder-zinc-600 outline-none"
            placeholder={placeholder}
            value={inputValue}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {inputValue && (
            <button onClick={clearSelection} className="text-zinc-500 hover:text-white transition-colors">
              <X size={16} />
            </button>
          )}
          
          <ChevronDown
            size={18}
            className={cn(
              "text-zinc-500 transition-transform duration-300",
              isOpen ? "rotate-180 text-cyan-400" : ""
            )}
          />
        </div>
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && filteredOptions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
          >
            <div style={{ maxHeight }} className="overflow-y-auto custom-scrollbar scroll-smooth">
              {filteredOptions.map((option, index) => (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={cn(
                    "relative flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition-all duration-200",
                    activeIndex === index
                      ? "bg-cyan-500/10 text-cyan-100 shadow-[inset_0_0_20px_rgba(34,211,238,0.1)]"
                      : "text-zinc-400 hover:text-zinc-200"
                  )}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{option.label}</span>
                    {option.category && (
                      <span className="text-[10px] uppercase tracking-widest opacity-40">
                        {option.category}
                      </span>
                    )}
                  </div>
                  
                  {selectedOption?.id === option.id && (
                    <Check size={14} className="text-cyan-400 animate-in zoom-in duration-300" />
                  )}

                  {/* Holographic underline on active index */}
                  {activeIndex === index && (
                    <motion.div
                      layoutId="holographic-glow"
                      className="absolute inset-0 z-[-1] rounded-xl bg-gradient-to-r from-cyan-500/5 via-cyan-500/10 to-transparent"
                    />
                  )}
                </button>
              ))}
            </div>
            
            {/* Footer / Stats */}
            <div className="mt-2 border-t border-zinc-800 pt-2 px-3 pb-1 flex justify-between items-center text-[10px] font-mono text-zinc-600 uppercase tracking-tighter">
              <span>Showing {filteredOptions.length} nodes</span>
              <span>Vault v3.0</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
