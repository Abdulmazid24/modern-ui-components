"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchResult {
  id: string;
  title: string;
  category: string;
  x: number;
  y: number;
}

export const SemanticSearchConstellation = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isFocused, setIsFocused] = useState(false);

    // Simulated semantic result generation
    useEffect(() => {
      if (query.length > 2) {
        const mockResults: SearchResult[] = [
          { id: "1", title: "Neural Architecture", category: "Core", x: -150, y: -100 },
          { id: "2", title: "Quantum State", category: "Physics", x: 150, y: -80 },
          { id: "3", title: "Bionic Feedback", category: "Bio", x: -100, y: 120 },
          { id: "4", title: "Spatial Warp", category: "Utility", x: 120, y: 100 },
          { id: "5", title: "Synapse Link", category: "Core", x: 0, y: -180 },
        ];
        setResults(mockResults);
      } else {
        setResults([]);
      }
    }, [query]);

    return (
      <div 
        ref={ref}
        className={cn("relative w-full max-w-4xl mx-auto h-[500px] flex flex-col items-center justify-center", className)}
        {...props}
      >
        {/* Search Input Field */}
        <div className="relative z-20 w-full max-w-md">
          <motion.div
            animate={{ 
              scale: isFocused ? 1.05 : 1,
              boxShadow: isFocused ? "0 0 40px rgba(139,92,246,0.3)" : "0 0 0px rgba(0,0,0,0)"
            }}
            className="relative flex items-center bg-zinc-950/80 border border-zinc-800 rounded-full overflow-hidden backdrop-blur-xl"
          >
            <Search className="absolute left-4 w-5 h-5 text-zinc-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search across dimensions..."
              className="w-full bg-transparent border-none text-white pl-12 pr-12 py-4 focus:outline-none focus:ring-0 text-lg placeholder:text-zinc-600"
            />
            <AnimatePresence>
              {query && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  onClick={() => setQuery("")}
                  className="absolute right-4 p-1 rounded-full bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Constellation Results Area */}
        <div className="absolute inset-0 pointer-events-none">
          <AnimatePresence>
            {results.map((res, i) => (
              <motion.div
                key={res.id}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  x: res.x, 
                  y: res.y 
                }}
                exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 15,
                  delay: i * 0.1 
                }}
                className="absolute left-1/2 top-1/2 pointer-events-auto"
              >
                <motion.div
                  whileHover={{ scale: 1.1, zIndex: 10 }}
                  className="group relative flex flex-col items-center cursor-pointer"
                >
                  {/* Result Orb */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.4)] border border-white/20">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Label Card (Visible on Hover) */}
                  <div className="absolute top-14 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 w-48 text-center">
                    <div className="p-3 rounded-2xl bg-zinc-900/90 border border-white/10 backdrop-blur-md shadow-2xl">
                      <p className="text-[10px] text-violet-400 font-bold uppercase tracking-widest mb-1">{res.category}</p>
                      <h4 className="text-sm font-bold text-white flex items-center justify-center gap-1">
                        {res.title} <ArrowUpRight className="w-3 h-3" />
                      </h4>
                    </div>
                  </div>

                  {/* Connection Line to Center */}
                  <svg className="absolute top-1/2 left-1/2 w-[200px] h-[200px] -z-10 opacity-20 pointer-events-none transform -translate-x-1/2 -translate-y-1/2">
                    <line 
                      x1="100" y1="100" 
                      x2={100 - res.x / 2} y2={100 - res.y / 2} 
                      stroke="white" 
                      strokeWidth="1" 
                      strokeDasharray="4 4"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
           <div className="w-96 h-96 bg-violet-500/10 rounded-full blur-[100px]" />
        </div>
      </div>
    );
  }
);

SemanticSearchConstellation.displayName = "SemanticSearchConstellation";
