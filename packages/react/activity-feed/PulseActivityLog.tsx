"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertTriangle, Info, Zap } from "lucide-react";
import { cn } from "@/utils";

export interface LogEvent {
  id: string;
  type: "success" | "warning" | "info" | "critical";
  message: string;
  timestamp: string;
    className?: string;
}

export const PulseActivityLog = React.forwardRef<any, LogEvent>(({ className, initialLogs = [
            { id: "1", type: "success", message: "System boot sequence complete", timestamp: "08:00:00" },
            { id: "2", type: "info", message: "Connecting to secure mainframe API", timestamp: "08:01:12" },
            { id: "3", type: "warning", message: "Latency spike detected on node 4", timestamp: "08:05:43" }
          ], ...props }, ref) => {
        const [logs, setLogs] = useState<LogEvent[]>(initialLogs);

        // Simulate new pulses arriving
        useEffect(() => {
        const interval = setInterval(() => {
          const types: ("success"|"warning"|"info"|"critical")[] = ["success", "info", "critical", "warning"];
          const randomType = types[Math.floor(Math.random() * types.length)];
          
          const newLog: LogEvent = {
            id: Date.now().toString(),
            type: randomType,
            message: `Dynamic node event triggered via webhook listener.`,
            timestamp: new Date().toLocaleTimeString('en-US', { hour12: false })
          };
          
          setLogs(prev => [newLog, ...prev].slice(0, 5)); // Keep only 5 to avoid infinite DOM
        }, 4000);
        return () => clearInterval(interval);
        }, []);

        const getLogStyle = (type: string) => {
        switch(type) {
          case "success": return { icon: <CheckCircle size={14} />, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", glow: "shadow-[0_0_10px_rgba(16,185,129,0.3)]" };
          case "warning": return { icon: <AlertTriangle size={14} />, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", glow: "shadow-[0_0_10px_rgba(245,158,11,0.3)]" };
          case "critical": return { icon: <Zap size={14} />, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/30", glow: "shadow-[0_0_10px_rgba(244,63,94,0.3)]" };
          default: return { icon: <Info size={14} />, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30", glow: "shadow-[0_0_10px_rgba(34,211,238,0.3)]" };
        }
        };

        return (
        <div ref={ref} {...props} className={cn("w-full max-w-lg bg-zinc-950 border border-zinc-900 rounded-3xl p-8 shadow-2xl", className)}>
          <h3 className="text-zinc-300 font-bold mb-6 flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
             Real-time Activity
          </h3>

          <div className="relative pl-4">
            {/* The Continuous Glowing Track */}
            <div className="absolute top-2 bottom-0 left-[11px] w-[2px] bg-gradient-to-b from-cyan-500/50 via-purple-500/20 to-transparent" />

            <div className="flex flex-col gap-6">
              <AnimatePresence initial={false}>
                {logs.map((log) => {
                  const style = getLogStyle(log.type);
                  return (
                    <motion.div 
                      key={log.id}
                      initial={{ opacity: 0, x: -20, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: "auto" }}
                      exit={{ opacity: 0, scale: 0.9, height: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="relative flex items-start gap-4"
                    >
                      {/* Outer pulse ring for node */}
                      <div className="absolute -left-[27px] top-[14px]">
                        <motion.div 
                          className={`absolute inset-0 rounded-full ${style.bg}`}
                          initial={{ scale: 0.5, opacity: 1 }}
                          animate={{ scale: 2.5, opacity: 0 }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      </div>

                      {/* Node icon */}
                      <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 border ${style.bg} ${style.color} ${style.border} ${style.glow} bg-zinc-950`}>
                        {style.icon}
                      </div>

                      {/* Payload Box */}
                      <div className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-xl p-3 hover:bg-zinc-900 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs font-bold uppercase tracking-widest ${style.color}`}>
                            {log.type}
                          </span>
                          <span className="text-zinc-600 text-[10px] font-mono">
                            {log.timestamp}
                          </span>
                        </div>
                        <p className="text-zinc-300 text-sm">
                          {log.message}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
        );
        });
