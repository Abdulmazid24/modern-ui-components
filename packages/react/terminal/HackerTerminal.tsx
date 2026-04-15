"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HackerTerminalProps {
  lines?: string[];
  typingSpeed?: number;
    className?: string;
}

export const HackerTerminal = React.forwardRef<any, HackerTerminalProps>(({ className, lines = [
            "INITIALIZING VAULT PROTOCOL...",
            "Bypassing security mainframe...",
            "Access granted: Root level achieved.",
            "Loading quantum components... OK.",
            "Compiling registry index... [100%]",
            "System is online and listening on :3000",
            "Awaiting command input_"
          ], typingSpeed = 30, ...props }, ref) => {
        const [displayedLines, setDisplayedLines] = useState<string[]>([]);
        const [currentLineIndex, setCurrentLineIndex] = useState(0);
        const [currentCharIndex, setCurrentCharIndex] = useState(0);
        const containerRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
        if (currentLineIndex >= lines.length) return;

        const currentTargetLine = lines[currentLineIndex];

        const timeout = setTimeout(() => {
          if (currentCharIndex < currentTargetLine.length) {
             // Still typing the current line
             setDisplayedLines(prev => {
                const newLines = [...prev];
                if (newLines[currentLineIndex] === undefined) {
                   newLines[currentLineIndex] = "";
                }
                newLines[currentLineIndex] = currentTargetLine.substring(0, currentCharIndex + 1);
                return newLines;
             });
             setCurrentCharIndex(prev => prev + 1);
          } else {
             // Move to next line
             setCurrentLineIndex(prev => prev + 1);
             setCurrentCharIndex(0);
          }
          
          // Auto scroll to bottom
          if (containerRef.current) {
             containerRef.current.scrollTop = containerRef.current.scrollHeight;
          }
        }, typingSpeed + (Math.random() * 20)); // Random jitter for realist typing

        return () => clearTimeout(timeout);
        }, [currentLineIndex, currentCharIndex, lines, typingSpeed]);

        return (
        <div ref={ref} {...props} className={cn("relative w-full max-w-xl bg-zinc-950 border-2 border-zinc-800 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.1)] group", className)}>
          
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono font-bold tracking-widest">
               <Terminal size={14} /> BASH_V8.4
            </div>
            <div className="w-10" /> {/* Balancer */}
          </div>

          {/* Terminal Viewport */}
          <div 
            ref={containerRef}
            className="relative h-64 p-4 overflow-y-auto font-mono text-sm leading-relaxed"
          >
            {/* Phosphor Glow and CRT Scanlines Effect overlay */}
            <div className="absolute inset-0 pointer-events-none z-10 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
            
            {/* Glow behind text */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.5)] z-20" />

            <div className="relative z-30 flex flex-col gap-1">
              {displayedLines.map((line, idx) => {
                 const isLastLine = idx === lines.length - 1;
                 const isFinishedTypingThisLine = isLastLine && currentLineIndex >= lines.length;
                 
                 // Detect system lines vs input lines based on text content arbitrarily for color styling
                 let colorClass = "text-emerald-400"; // default hacker green
                 if (line.includes("ERROR") || line.includes("Bypassing")) colorClass = "text-rose-400";
                 else if (line.includes("WARNING")) colorClass = "text-amber-400";
                 else if (line.includes("...]")) colorClass = "text-cyan-400";
                 else if (line.includes("_")) colorClass = "text-zinc-400"; // Cursor line

                 return (
                   <motion.div 
                     key={idx} 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className={`${colorClass} drop-shadow-[0_0_8px_currentColor]`}
                   >
                     <span className="opacity-50 mr-2 text-zinc-600">❯</span> 
                     {line.replace("_", "")}
                     
                     {/* Blinking Cursor on the currently typing line, or last line */}
                     {(idx === currentLineIndex || isFinishedTypingThisLine) && (
                       <motion.span 
                         className="inline-block w-2.5 h-4 bg-emerald-400 ml-1 translate-y-[2px]"
                         animate={{ opacity: [1, 0, 1] }}
                         transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                       />
                     )}
                   </motion.div>
                 );
              })}
            </div>
          </div>
        </div>
        );
        });
