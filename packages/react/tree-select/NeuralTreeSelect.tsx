"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Check, ChevronDown } from "lucide-react";
import { cn } from "../utils";

export interface TreeSelectNode {
  readonly value: string;
  readonly label: string;
  readonly children?: TreeSelectNode[];
  readonly disabled?: boolean;
}

export interface NeuralTreeSelectProps {
  readonly treeData: readonly TreeSelectNode[];
  readonly value?: string;
  readonly onChange?: (value: string, node: TreeSelectNode) => void;
  readonly placeholder?: string;
  readonly disabled?: boolean;
  readonly className?: string;
}

const MENU_SPRING = { type: "spring", stiffness: 400, damping: 30 } as const;

const TreeNode = ({ node, level = 0, selectedValue, onSelect, expanded, setExpanded }: { node: TreeSelectNode, level?: number, selectedValue?: string, onSelect: (n: TreeSelectNode) => void, expanded: Set<string>, setExpanded: React.Dispatch<React.SetStateAction<Set<string>>> }) => {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expanded.has(node.value);
  const isSelected = selectedValue === node.value;

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = new Set(expanded);
    if (isExpanded) next.delete(node.value);
    else next.add(node.value);
    setExpanded(next);
  };

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (node.disabled) return;
    onSelect(node);
  };

  return (
    <div>
      <div 
        onClick={handleSelect}
        className={cn(
          "flex items-center py-1.5 px-2 rounded-lg cursor-pointer transition-colors group relative",
          node.disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-zinc-900",
          isSelected && "bg-violet-500/10"
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        {/* Indent lines for tree structure */}
        {level > 0 && (
          <div className="absolute left-[8px] top-0 bottom-0 w-px bg-zinc-800" style={{ left: `${(level - 1) * 16 + 16}px` }} />
        )}
        
        <div className="flex items-center w-full">
          <div 
            className={cn("w-5 h-5 flex items-center justify-center shrink-0 mr-1", hasChildren ? "cursor-pointer text-zinc-500 hover:text-zinc-300" : "opacity-0")}
            onClick={hasChildren ? toggleExpand : undefined}
          >
            {hasChildren && <ChevronRight size={14} className={cn("transition-transform", isExpanded && "rotate-90")} />}
          </div>
          
          <span className={cn("text-sm truncate flex-1", isSelected ? "text-violet-300 font-medium" : "text-zinc-300 group-hover:text-white")}>
            {node.label}
          </span>
          
          {isSelected && <Check size={14} className="text-violet-400 shrink-0 ml-2" />}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {node.children!.map(child => (
              <TreeNode key={child.value} node={child} level={level + 1} selectedValue={selectedValue} onSelect={onSelect} expanded={expanded} setExpanded={setExpanded} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/** NeuralTreeSelect — Dropdown with interactive tree structure and animated node expansion. */
export const NeuralTreeSelect = React.forwardRef<HTMLDivElement, NeuralTreeSelectProps>(
  ({ className, treeData, value, onChange, placeholder = "Select...", disabled = false, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [expanded, setExpanded] = useState<Set<string>>(new Set());
    const containerRef = useRef<HTMLDivElement>(null);

    // Find selected node to display label
    let selectedLabel = "";
    const findLabel = (nodes: readonly TreeSelectNode[]) => {
      for (const node of nodes) {
        if (node.value === value) { selectedLabel = node.label; return true; }
        if (node.children && findLabel(node.children)) return true;
      }
      return false;
    };
    if (value) findLabel(treeData);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (node: TreeSelectNode) => {
      onChange?.(node.value, node);
      setIsOpen(false);
    };

    return (
      <div ref={containerRef} className={cn("relative w-full", className)}>
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
            {value && selectedLabel ? <span className="text-zinc-200">{selectedLabel}</span> : <span className="text-zinc-500">{placeholder}</span>}
          </span>
          <ChevronDown size={16} className={cn("transition-transform duration-300 text-zinc-500 shrink-0", isOpen && "rotate-180 text-violet-400")} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="absolute top-full left-0 right-0 mt-2 p-2 bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800 rounded-2xl z-50 shadow-2xl max-h-[300px] overflow-auto"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={MENU_SPRING}>
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent z-10" />
              
              {treeData.length === 0 ? (
                <div className="py-4 text-center text-zinc-500 text-sm">No data</div>
              ) : (
                treeData.map(node => (
                  <TreeNode key={node.value} node={node} selectedValue={value} onSelect={handleSelect} expanded={expanded} setExpanded={setExpanded} />
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
NeuralTreeSelect.displayName = "NeuralTreeSelect";
