"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, CornerDownLeft, Eye } from "lucide-react";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

interface SearchResult {
  id: string;
  title: string;
  category: string;
  description: string;
  icon?: React.ReactNode;
}

interface SpatialSpotlightSearchProps {
  items: SearchResult[];
  onSelect?: (item: SearchResult) => void;
  enableAudio?: boolean;
}

/**
 * A futuristic command palette with 3D depth and integrated previews.
 */
export const SpatialSpotlightSearch = ({
  items,
  onSelect,
  enableAudio = false,
}: SpatialSpotlightSearchProps) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const { play: playSelect } = useSpatialAudio({ 
    enabled: enableAudio, 
    url: "https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3" 
  });

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const selectedItem = filteredItems[selectedIndex];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-20">
            {/* Backdrop */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsOpen(false)}
               className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            />

            {/* Spatial Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotateX: 20 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.95, rotateX: 10 }}
              className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] [transform-style:preserve-3d]"
            >
              <div className="flex h-[500px]">
                {/* Search Area */}
                <div className="flex-1 flex flex-col border-r border-zinc-900 bg-zinc-950/50">
                  <div className="p-6 flex items-center gap-4 border-b border-zinc-900">
                    <Search className="text-zinc-500" size={20} />
                    <input 
                      autoFocus
                      placeholder="Search Anything... (Commands, Components, Files)"
                      className="bg-transparent text-lg text-white outline-none w-full placeholder:text-zinc-700"
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setSelectedIndex(0);
                      }}
                    />
                    <kbd className="hidden sm:flex h-5 items-center gap-1 rounded border border-zinc-800 bg-zinc-900 px-1.5 font-mono text-[10px] font-medium text-zinc-500 opacity-100">
                      <span className="text-xs">ESC</span>
                    </kbd>
                  </div>

                  <div className="flex-1 overflow-y-auto p-2">
                    {filteredItems.map((item, i) => (
                      <div
                        key={item.id}
                        onMouseEnter={() => setSelectedIndex(i)}
                        onClick={() => onSelect?.(item)}
                        className={cn(
                          "group flex items-center gap-4 p-4 rounded-3xl transition-all cursor-pointer",
                          selectedIndex === i ? "bg-zinc-900 text-white" : "text-zinc-500 hover:text-zinc-300"
                        )}
                      >
                         <div className={cn(
                            "w-10 h-10 rounded-2xl flex items-center justify-center border transition-colors",
                            selectedIndex === i ? "bg-purple-500/20 border-purple-500/50" : "bg-zinc-950 border-zinc-900"
                         )}>
                            {item.icon || <Command size={18} />}
                         </div>
                         <div className="flex-1">
                            <div className="text-sm font-bold">{item.title}</div>
                            <div className="text-[10px] uppercase tracking-widest opacity-60">{item.category}</div>
                         </div>
                         {selectedIndex === i && (
                            <CornerDownLeft size={14} className="opacity-40" />
                         )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Spatial Preview Area */}
                <div className="w-80 bg-zinc-900/30 p-8 flex flex-col items-center justify-center text-center">
                   <AnimatePresence mode="wait">
                      {selectedItem ? (
                        <motion.div
                          key={selectedItem.id}
                          initial={{ opacity: 0, x: 20, rotateY: -10 }}
                          animate={{ opacity: 1, x: 0, rotateY: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                           <div className="w-24 h-24 bg-zinc-800 border border-zinc-700 rounded-3xl mx-auto flex items-center justify-center text-purple-400 shadow-2xl">
                              <Eye size={40} />
                           </div>
                           <div>
                              <h3 className="text-xl font-black text-white">{selectedItem.title}</h3>
                              <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                                {selectedItem.description}
                              </p>
                           </div>
                        </motion.div>
                      ) : (
                        <div className="text-zinc-700 font-black uppercase tracking-[0.3em] text-[10px]">
                           Spatial Preview
                        </div>
                      )}
                   </AnimatePresence>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="p-4 bg-zinc-950/80 border-t border-zinc-900 flex justify-between items-center px-8">
                 <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                       <kbd className="p-1 rounded bg-zinc-900 border border-zinc-800 min-w-[20px] text-center">↑↓</kbd>
                       Navigate
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                       <kbd className="p-1 rounded bg-zinc-900 border border-zinc-800 min-w-[20px] text-center">↵</kbd>
                       Select
                    </div>
                 </div>
                 <div className="text-[10px] font-black italic text-zinc-800">VAULT v3.0</div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
