"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
export const NebuleDateRange: React.FC = () => {
  const [month, setMonth] = useState(new Date().getMonth()); const [year] = useState(new Date().getFullYear());
  const [start, setStart] = useState<number | null>(null); const [end, setEnd] = useState<number | null>(null);
  const days = new Date(year, month + 1, 0).getDate(); const firstDay = new Date(year, month, 1).getDay();
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const handleDay = (d: number) => { if (!start || (start && end)) { setStart(d); setEnd(null); } else { if (d > start) setEnd(d); else { setEnd(start); setStart(d); } } };
  const inRange = (d: number) => start !== null && end !== null && d >= start && d <= end;
  return (
    <div className="w-80 p-5 rounded-2xl bg-zinc-900 border border-white/8">
      <div className="flex items-center justify-between mb-4"><button onClick={() => setMonth(m => (m - 1 + 12) % 12)} className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-400 cursor-pointer"><ChevronLeft size={16} /></button><span className="text-sm font-bold text-white">{months[month]} {year}</span><button onClick={() => setMonth(m => (m + 1) % 12)} className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-400 cursor-pointer"><ChevronRight size={16} /></button></div>
      <div className="grid grid-cols-7 gap-1 mb-2">{["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => <div key={d} className="text-center text-xs text-zinc-600 font-medium py-1">{d}</div>)}</div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDay }, (_, i) => <div key={`e${i}`} />)}
        {Array.from({ length: days }, (_, i) => { const d = i + 1; const isStart = d === start; const isEnd = d === end; const isIn = inRange(d);
          return <motion.button key={d} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} onClick={() => handleDay(d)} className={`w-9 h-9 rounded-lg text-xs font-medium cursor-pointer transition-all ${isStart || isEnd ? "bg-violet-600 text-white" : isIn ? "bg-violet-600/20 text-violet-300" : "text-zinc-400 hover:bg-white/5"}`} style={(isStart || isEnd) ? { boxShadow: "0 0 12px rgba(124,58,237,0.4)" } : {}}>{d}</motion.button>;
        })}
      </div>
      {start && <p className="mt-3 text-xs text-zinc-500 text-center">{months[month]} {start}{end ? ` – ${months[month]} ${end}` : " — select end"}</p>}
    </div>
  );
};
