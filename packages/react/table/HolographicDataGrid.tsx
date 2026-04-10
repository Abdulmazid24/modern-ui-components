"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface DataColumn {
  key: string;
  header: string;
}

export interface DataRow {
  id: string;
  [key: string]: any;
}

export interface HolographicDataGridProps {
  columns: DataColumn[];
  data: DataRow[];
}

export const HolographicDataGrid: React.FC<HolographicDataGridProps> = ({
  columns,
  data,
}) => {
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto border border-cyan-900/40 rounded-3xl bg-zinc-950/80 backdrop-blur-md overflow-hidden relative shadow-[0_0_50px_rgba(6,182,212,0.05)]">
      {/* Grid Scanline Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none mix-blend-screen" />
      
      <table className="w-full text-left border-collapse relative z-10">
        <thead>
          <tr className="border-b border-cyan-900/50">
            {columns.map((col) => (
              <th 
                key={col.key} 
                className="p-4 text-xs font-bold tracking-widest text-cyan-500 uppercase"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr 
              key={row.id}
              onMouseEnter={() => setHoveredRowId(row.id)}
              onMouseLeave={() => setHoveredRowId(null)}
              className="relative group border-b border-zinc-800/50 hover:border-transparent transition-colors"
            >
              <td colSpan={columns.length} className="p-0">
                <div className="relative p-0 m-0">
                  {/* Holographic Projection on Hover */}
                  <AnimatePresence>
                    {hoveredRowId === row.id && (
                      <motion.div
                        layoutId="hologram-highlight"
                        initial={{ opacity: 0, scaleY: 0.8 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        exit={{ opacity: 0, scaleY: 0.8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="absolute inset-0 -mx-4 bg-gradient-to-r from-cyan-900/40 via-cyan-500/10 to-cyan-900/40 border-y border-cyan-400/50 pointer-events-none z-0 flex items-center shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                      >
                         <div className="absolute left-0 w-1 h-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,1)]" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Cell Data */}
                  <div className="flex w-full relative z-10">
                    {columns.map((col) => (
                      <div 
                        key={`${row.id}-${col.key}`} 
                        className={`flex-1 p-4 flex items-center transition-all duration-300 ${
                          hoveredRowId === row.id ? 'text-cyan-50 font-medium translate-x-2' : 'text-zinc-400'
                        }`}
                      >
                        {row[col.key]}
                      </div>
                    ))}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
