"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Search, Filter, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ColumnDef<T> {
  key: keyof T;
  header: string;
  width?: string;
  render?: (val: any, row: T) => React.ReactNode;
}

export interface SpatialDataGridProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  data: T[];
  columns: ColumnDef<T>[];
  onRowClick?: (row: T) => void;
}

export function SpatialDataGrid<T extends { id: string | number }>({
  data,
  columns,
  className,
  onRowClick,
  ...props
}: SpatialDataGridProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredRow, setHoveredRow] = useState<string | number | null>(null);

  // Sorting Logic
  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sortedData = [...data]
    .filter((row) =>
      Object.values(row).some(
        (val) => typeof val === "string" && val.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (!sortKey) return 0;
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (valA < valB) return sortDir === "asc" ? -1 : 1;
      if (valA > valB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <div
      className={cn(
        "w-full flex flex-col bg-zinc-950/80 backdrop-blur-2xl rounded-3xl border border-zinc-800/50 shadow-[0_0_50px_-20px_rgba(139,92,246,0.15)] overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Toolbar */}
      <div className="p-4 border-b border-zinc-800/50 flex items-center justify-between bg-zinc-900/20">
        <div className="relative flex items-center w-64">
          <Search className="absolute left-3 w-4 h-4 text-zinc-500" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search dimensional records..."
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-full pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid Container */}
      <div className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        <div className="min-w-[800px] w-full flex flex-col p-4 gap-2">
          {/* Header Row */}
          <div className="flex w-full px-4 py-3 rounded-xl bg-zinc-900/40 border border-zinc-800/30 sticky top-0 z-20 backdrop-blur-md">
            {columns.map((col) => (
              <div
                key={String(col.key)}
                style={{ width: col.width || "flex-1", flex: col.width ? "none" : 1 }}
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => handleSort(col.key)}
              >
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest group-hover:text-violet-300 transition-colors">
                  {col.header}
                </span>
                {sortKey === col.key && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    {sortDir === "asc" ? (
                      <ChevronUp className="w-3 h-3 text-violet-400" />
                    ) : (
                      <ChevronDown className="w-3 h-3 text-violet-400" />
                    )}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Body Rows */}
          <div className="flex flex-col gap-1 relative z-10">
            <AnimatePresence>
              {sortedData.map((row, idx) => (
                <motion.div
                  key={row.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25, delay: Math.min(idx * 0.05, 0.5) }}
                  onHoverStart={() => setHoveredRow(row.id)}
                  onHoverEnd={() => setHoveredRow(null)}
                  onClick={() => onRowClick?.(row)}
                  className={cn(
                    "flex w-full px-4 py-4 rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden",
                    hoveredRow === row.id
                      ? "bg-zinc-900/80 border-violet-500/30 shadow-[0_5px_20px_-5px_rgba(139,92,246,0.3)] z-10 scale-[1.01]"
                      : "bg-zinc-950/40 border-zinc-800/20 hover:bg-zinc-900/40"
                  )}
                >
                  {/* Subtle scanning highlight line on hover */}
                  {hoveredRow === row.id && (
                    <motion.div
                      layoutId="row-highlight"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-violet-500"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  {columns.map((col) => (
                    <div
                      key={String(col.key)}
                      style={{ width: col.width || "flex-1", flex: col.width ? "none" : 1 }}
                      className="flex items-center text-sm text-zinc-300"
                    >
                      {col.render ? col.render(row[col.key], row) : (row[col.key] as any)}
                    </div>
                  ))}
                  
                  {/* Row Actions */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white">
                        <MoreHorizontal className="w-4 h-4" />
                     </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {sortedData.length === 0 && (
              <div className="py-20 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full border border-zinc-800 flex items-center justify-center mb-4 bg-zinc-900/50">
                  <Search className="w-6 h-6 text-zinc-600" />
                </div>
                <p className="text-zinc-400">No dimensional records found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

SpatialDataGrid.displayName = "SpatialDataGrid";
