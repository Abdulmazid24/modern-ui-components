"use client";

import React from "react";
import { motion } from "framer-motion";

export interface GanttTask {
  id: string;
  name: string;
  start: number; // Day offset (0-30)
  duration: number; // Days length
  color: string;
  progress: number; // 0-100
}

export interface GanttTimelineProps {
  tasks?: GanttTask[];
  totalDays?: number;
}

export const GanttTimeline: React.FC<GanttTimelineProps> = ({
  tasks = [
    { id: "1", name: "Research Phase", start: 0, duration: 5, color: "bg-purple-500", progress: 100 },
    { id: "2", name: "Design System", start: 4, duration: 8, color: "bg-pink-500", progress: 70 },
    { id: "3", name: "Core Development", start: 10, duration: 12, color: "bg-cyan-500", progress: 40 },
    { id: "4", name: "Testing & QA", start: 20, duration: 7, color: "bg-amber-500", progress: 0 },
    { id: "5", name: "Deployment", start: 26, duration: 4, color: "bg-emerald-500", progress: 0 }
  ],
  totalDays = 30
}) => {
  return (
    <div className="w-full max-w-5xl bg-zinc-950 border border-zinc-900 rounded-3xl p-6 shadow-2xl overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-800 relative">
      
      {/* Calendar Header */}
      <div className="flex border-b border-zinc-800/50 pb-2 mb-4 relative min-w-[800px]">
        {/* Left padding for Task Names */}
        <div className="w-48 shrink-0 flex items-center">
           <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest pl-2">Timeline</span>
        </div>
        
        {/* Day Ticks */}
        <div className="flex-1 flex relative">
          {Array.from({ length: totalDays }).map((_, i) => (
             <div key={i} className="flex-1 relative flex justify-center text-[10px] text-zinc-600 font-mono">
               {i % 5 === 0 ? i : ''}
               {/* Vertical grid line */}
               <div className="absolute top-6 bottom-[-400px] w-px bg-zinc-800/30 z-0 pointer-events-none" />
             </div>
          ))}
        </div>
      </div>

      {/* Task Rows */}
      <div className="flex flex-col gap-4 relative min-w-[800px] pb-8 z-10">
        {tasks.map((task) => {
           // Calculate positioning purely via percentages based on total days
           const leftPercent = (task.start / totalDays) * 100;
           const widthPercent = (task.duration / totalDays) * 100;

           return (
             <div key={task.id} className="flex items-center group relative h-10">
                {/* Task Label */}
                <div className="w-48 shrink-0 pr-4 z-10">
                   <p className="text-sm font-medium text-zinc-300 truncate">{task.name}</p>
                </div>
                
                {/* Timeline Track */}
                <div className="flex-1 relative h-full flex items-center">
                   
                   {/* The Animated Gantt Bar */}
                   <motion.div 
                     initial={{ width: 0, opacity: 0 }}
                     whileInView={{ width: `${widthPercent}%`, opacity: 1 }}
                     viewport={{ once: true }}
                     transition={{ duration: 1, type: "spring", bounce: 0.2, delay: task.start * 0.05 }}
                     className={`absolute h-8 rounded-lg ${task.color}/20 border border-${task.color.split('-')[1]}-500/50 overflow-hidden cursor-pointer hover:brightness-125 transition-all shadow-lg`}
                     style={{ left: `${leftPercent}%` }}
                   >
                     {/* The Progress Fill inside the Bar */}
                     <motion.div 
                       className={`absolute top-0 bottom-0 left-0 ${task.color}`}
                       initial={{ width: 0 }}
                       whileInView={{ width: `${task.progress}%` }}
                       viewport={{ once: true }}
                       transition={{ duration: 1.5, delay: 0.5 + (task.start * 0.05) }}
                     />
                     
                     {/* Gloss / shine overlay */}
                     <div className="absolute inset-x-0 top-0 h-1/2 bg-white/10" />
                   </motion.div>
                </div>
             </div>
           );
        })}
      </div>
    </div>
  );
};
