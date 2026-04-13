"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Check, ChevronDown } from "lucide-react";
import { cn } from "@/utils";

const items = ["React", "Next.js", "Vue", "Svelte", "Angular", "Solid", "Qwik", "Astro"];
export const FuzzyComboBox = React.forwardRef<any, any>(({ className, ...props }, ref) => {
        const [open, setOpen] = useState(false); const [query, setQuery] = useState(""); const [selected, setSelected] = useState("");
        const ref = useRef<HTMLDivElement>(null);
        const filtered = items.filter((i) => i.toLowerCase().includes(query.toLowerCase()));
        useEffect(() => { const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }; document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h); }, []);
        return (
        <div ref={ref} {...props} className={cn(className)}  ref={ref} className="relative w-full max-w-xs">
          <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-sm text-left cursor-pointer"><span className={selected ? "text-white" : "text-zinc-500"}>{selected || "Select framework..."}</span><ChevronDown size={14} className="text-zinc-500" /></button>
          <AnimatePresence>{open && (
            <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="absolute top-full mt-2 w-full rounded-xl bg-zinc-900 border border-white/10 overflow-hidden z-50" style={{ boxShadow: "0 15px 40px rgba(0,0,0,0.5)" }}>
              <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5"><Search size={14} className="text-zinc-500" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-zinc-600" autoFocus /></div>
              <div className="max-h-48 overflow-y-auto py-1">{filtered.length ? filtered.map((item) => (
                <button key={item} onClick={() => { setSelected(item); setOpen(false); setQuery(""); }} className="w-full flex items-center justify-between px-3 py-2 text-sm text-zinc-300 hover:bg-white/5 cursor-pointer"><span>{item}</span>{selected === item && <Check size={14} className="text-violet-400" />}</button>
              )) : <p className="px-3 py-4 text-sm text-zinc-600 text-center">No results</p>}</div>
            </motion.div>
          )}</AnimatePresence>
        </div>
        );
        });
