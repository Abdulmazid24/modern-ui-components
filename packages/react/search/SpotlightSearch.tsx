"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, X } from "lucide-react";
import { cn } from "@/utils";

const suggestions = ["Dashboard", "Settings", "Profile", "Analytics", "Components", "Documentation", "Pricing", "Support"];

export const SpotlightSearch = React.forwardRef<any, any>(({ className, ...props }, ref) => {
        const [open, setOpen] = useState(false);
        const [query, setQuery] = useState("");
        const ref = useRef<HTMLInputElement>(null);
        const filtered = suggestions.filter((s) => s.toLowerCase().includes(query.toLowerCase()));
        useEffect(() => { if (open) ref.current?.focus(); }, [open]);
        useEffect(() => { const h = (e: KeyboardEvent) => { if (e.key === "k" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setOpen(true); } if (e.key === "Escape") setOpen(false); }; window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h); }, []);
        return (
        <div ref={ref} {...props} className={cn("relative flex items-center justify-center min-h-[300px]", className)}>
          <button onClick={() => setOpen(true)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-500 text-sm cursor-pointer hover:border-white/20 transition-colors"><SearchIcon size={15} /> Search... <kbd className="ml-8 px-1.5 py-0.5 rounded bg-zinc-800 text-xs font-mono text-zinc-500 border border-white/5">⌘K</kbd></button>
          <AnimatePresence>
            {open && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setOpen(false)} />
                <motion.div initial={{ opacity: 0, scale: 0.95, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -20 }} transition={{ type: "spring", damping: 25 }} className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg rounded-2xl bg-zinc-900 border border-white/10 overflow-hidden z-50" style={{ boxShadow: "0 25px 80px rgba(0,0,0,0.6)" }}>
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5"><SearchIcon size={18} className="text-zinc-500" /><input ref={ref} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Type to search..." className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-zinc-600" />{query && <button onClick={() => setQuery("")} className="text-zinc-500 hover:text-white cursor-pointer"><X size={15} /></button>}</div>
                  <div className="max-h-64 overflow-y-auto py-2">
                    {filtered.length > 0 ? filtered.map((item, i) => (
                      <motion.button key={item} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} onClick={() => setOpen(false)} className="w-full px-4 py-2.5 text-left text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition-colors cursor-pointer">{item}</motion.button>
                    )) : <p className="px-4 py-6 text-center text-sm text-zinc-600">No results found</p>}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
        );
        });
