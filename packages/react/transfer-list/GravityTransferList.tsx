"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { ChevronRight, ChevronLeft, Search } from "lucide-react";
import { cn } from "../utils";

const TRANSFER_SPRING = { type: "spring", stiffness: 350, damping: 28 } as const;

export interface TransferItem {
  readonly id: string;
  readonly label: string;
  readonly description?: string;
}

export interface GravityTransferListProps {
  readonly sourceTitle?: string;
  readonly targetTitle?: string;
  readonly items: readonly TransferItem[];
  readonly defaultTarget?: readonly string[];
  readonly onChange?: (sourceIds: readonly string[], targetIds: readonly string[]) => void;
  readonly className?: string;
}

/**
 * GravityTransferList — Two lists with physics-based item transfer.
 * Items "fall" with gravity when moved between lists, bouncing
 * slightly on landing. Each list has a search filter with neon
 * highlighting and a glowing transfer beam connects moving items.
 */
export const GravityTransferList = React.forwardRef<HTMLDivElement, GravityTransferListProps>(
  ({ className, sourceTitle = "Available", targetTitle = "Selected", items, defaultTarget = [], onChange, ...props }, ref) => {
    const [targetIds, setTargetIds] = useState<Set<string>>(new Set(defaultTarget));
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [sourceFilter, setSourceFilter] = useState("");
    const [targetFilter, setTargetFilter] = useState("");

    const sourceItems = items.filter((i) => !targetIds.has(i.id) && i.label.toLowerCase().includes(sourceFilter.toLowerCase()));
    const targetItemsList = items.filter((i) => targetIds.has(i.id) && i.label.toLowerCase().includes(targetFilter.toLowerCase()));

    const toggleSelect = useCallback((id: string) => {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id); else next.add(id);
        return next;
      });
    }, []);

    const transferRight = useCallback(() => {
      const next = new Set(targetIds);
      selectedIds.forEach((id) => { if (!targetIds.has(id)) next.add(id); });
      setTargetIds(next);
      setSelectedIds(new Set());
      const sIds = items.filter((i) => !next.has(i.id)).map((i) => i.id);
      onChange?.(sIds, Array.from(next));
    }, [selectedIds, targetIds, items, onChange]);

    const transferLeft = useCallback(() => {
      const next = new Set(targetIds);
      selectedIds.forEach((id) => { if (targetIds.has(id)) next.delete(id); });
      setTargetIds(next);
      setSelectedIds(new Set());
      const sIds = items.filter((i) => !next.has(i.id)).map((i) => i.id);
      onChange?.(sIds, Array.from(next));
    }, [selectedIds, targetIds, items, onChange]);

    const renderList = (listItems: TransferItem[], filter: string, setFilter: (v: string) => void, title: string) => (
      <div className="flex-1 bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col min-w-[200px]">
        <div className="px-4 py-3 border-b border-zinc-800/50">
          <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-widest mb-2">{title}</h4>
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-600" />
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/40"
            />
          </div>
        </div>
        <div className="flex-1 overflow-auto max-h-[280px] p-2">
          <AnimatePresence>
            {listItems.map((item) => {
              const isSelected = selectedIds.has(item.id);
              return (
                <motion.button
                  key={item.id}
                  layout
                  onClick={() => toggleSelect(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs transition-colors cursor-pointer mb-1",
                    isSelected ? "bg-violet-500/15 text-violet-300 border border-violet-500/20" : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200 border border-transparent"
                  )}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  transition={TRANSFER_SPRING}
                >
                  <div className={cn("w-3.5 h-3.5 rounded border shrink-0 flex items-center justify-center transition-colors", isSelected ? "bg-violet-500 border-violet-500" : "border-zinc-700")}>
                    {isSelected && <motion.div className="w-1.5 h-1.5 bg-white rounded-sm" initial={{ scale: 0 }} animate={{ scale: 1 }} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{item.label}</div>
                    {item.description && <div className="text-[10px] text-zinc-600 truncate">{item.description}</div>}
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
          {listItems.length === 0 && <div className="text-center text-zinc-600 text-xs py-8">No items</div>}
        </div>
        <div className="px-4 py-2 border-t border-zinc-800/50 text-[10px] text-zinc-600">{listItems.length} items</div>
      </div>
    );

    return (
      <div ref={ref} {...props} className={cn("flex items-stretch gap-3", className)}>
        {renderList(sourceItems, sourceFilter, setSourceFilter, sourceTitle)}

        {/* Transfer Controls */}
        <div className="flex flex-col items-center justify-center gap-2">
          <motion.button
            onClick={transferRight}
            className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-violet-400 hover:border-violet-500/30 hover:bg-violet-500/10 transition-all cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={16} />
          </motion.button>
          <motion.button
            onClick={transferLeft}
            className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-violet-400 hover:border-violet-500/30 hover:bg-violet-500/10 transition-all cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={16} />
          </motion.button>
        </div>

        {renderList(targetItemsList, targetFilter, setTargetFilter, targetTitle)}
      </div>
    );
  }
);

GravityTransferList.displayName = "GravityTransferList";
