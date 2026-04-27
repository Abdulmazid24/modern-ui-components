"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Check } from "lucide-react";
import { cn } from "../utils";

export interface CascaderOption {
  readonly value: string;
  readonly label: string;
  readonly children?: CascaderOption[];
  readonly disabled?: boolean;
}

export interface DimensionalCascaderProps {
  readonly options: readonly CascaderOption[];
  readonly value?: string[];
  readonly onChange?: (value: string[], selectedOptions: CascaderOption[]) => void;
  readonly placeholder?: string;
  readonly disabled?: boolean;
  readonly className?: string;
}

const MENU_SPRING = { type: "spring", stiffness: 350, damping: 30 } as const;

/** DimensionalCascader — Multi-level sliding dropdown with 3D depth and neon selection paths. */
export const DimensionalCascader = React.forwardRef<HTMLDivElement, DimensionalCascaderProps>(
  ({ className, options, value = [], onChange, placeholder = "Please select", disabled = false, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activePath, setActivePath] = useState<string[]>(value);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleOptionClick = (option: CascaderOption, level: number) => {
      if (option.disabled) return;
      
      const newPath = activePath.slice(0, level);
      newPath.push(option.value);
      setActivePath(newPath);

      if (!option.children || option.children.length === 0) {
        // Leaf node reached
        const selectedOpts: CascaderOption[] = [];
        let currOpts = options as CascaderOption[];
        for (const val of newPath) {
          const opt = currOpts.find(o => o.value === val);
          if (opt) {
            selectedOpts.push(opt);
            currOpts = opt.children || [];
          }
        }
        onChange?.(newPath, selectedOpts);
        setIsOpen(false);
      }
    };

    // Build columns based on activePath
    const columns: CascaderOption[][] = [options as CascaderOption[]];
    let currentOptions = options as CascaderOption[];
    
    for (let i = 0; i < activePath.length; i++) {
      const selectedOpt = currentOptions.find(o => o.value === activePath[i]);
      if (selectedOpt && selectedOpt.children && selectedOpt.children.length > 0) {
        columns.push(selectedOpt.children);
        currentOptions = selectedOpt.children;
      } else {
        break;
      }
    }

    // Determine display text
    const getDisplayText = () => {
      if (!value || value.length === 0) return null;
      const labels: string[] = [];
      let curr = options as CascaderOption[];
      for (const val of value) {
        const opt = curr.find(o => o.value === val);
        if (opt) {
          labels.push(opt.label);
          curr = opt.children || [];
        }
      }
      return labels.join(" / ");
    };

    const displayValue = getDisplayText();

    return (
      <div ref={containerRef} className={cn("relative inline-block w-full", className)}>
        <button 
          ref={ref as any}
          {...props}
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            "w-full flex items-center justify-between px-4 py-2.5 bg-zinc-950 border rounded-2xl transition-all text-left",
            disabled ? "opacity-50 cursor-not-allowed border-zinc-800" : "border-zinc-800 hover:border-violet-500/30",
            isOpen && "border-violet-500/50 shadow-[0_0_20px_rgba(139,92,246,0.15)]"
          )}>
          <span className="text-sm truncate">
            {displayValue ? <span className="text-zinc-200">{displayValue}</span> : <span className="text-zinc-500">{placeholder}</span>}
          </span>
          <ChevronRight size={16} className={cn("transition-transform duration-300 text-zinc-500 shrink-0", isOpen && "rotate-90 text-violet-400")} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="absolute top-full left-0 mt-2 bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800 rounded-2xl z-50 shadow-2xl overflow-hidden flex"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={MENU_SPRING}>
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent z-10" />
              
              {columns.map((colOpts, level) => (
                <div key={level} className="w-48 h-64 overflow-y-auto border-r border-zinc-800/50 last:border-r-0 py-2">
                  {colOpts.map(option => {
                    const isActive = activePath[level] === option.value;
                    const hasChildren = option.children && option.children.length > 0;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        disabled={option.disabled}
                        onClick={() => handleOptionClick(option, level)}
                        className={cn(
                          "w-full flex items-center justify-between px-4 py-2 text-sm transition-colors text-left group",
                          option.disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
                          isActive ? "bg-violet-500/10 text-violet-300" : "text-zinc-400 hover:bg-zinc-900/80 hover:text-zinc-200"
                        )}>
                        <span className="truncate pr-2">{option.label}</span>
                        {hasChildren && <ChevronRight size={14} className={cn(isActive ? "text-violet-400" : "text-zinc-600 group-hover:text-zinc-400")} />}
                        {!hasChildren && isActive && <Check size={14} className="text-violet-400" />}
                      </button>
                    );
                  })}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
DimensionalCascader.displayName = "DimensionalCascader";
