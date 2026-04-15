"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bold, Italic, Underline, Link, Code, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FloatingEditorToolbarProps {
  content?: string;
    className?: string;
}

export const FloatingEditorToolbar = React.forwardRef<any, FloatingEditorToolbarProps>(({ className, content = `Select any part of this text to trigger the floating toolbar. It detects selection coordinates and spawns magnetically above your highlight. It uses dynamic morphing, similar to Notion, to display different tools.`, ...props }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const [selectionBox, setSelectionBox] = useState<{ x: number, y: number, width: number } | null>(null);

        // Hook into native selection API to track active text highlights
        useEffect(() => {
        const handleSelection = () => {
          const selection = window.getSelection();
          if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
            setSelectionBox(null);
            return;
          }

          // Check if selection is within our container
          if (containerRef.current && containerRef.current.contains(selection.anchorNode)) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();

            // Calculate relative to the container
            setSelectionBox({
              x: rect.left - containerRect.left,
              y: rect.top - containerRect.top,
              width: rect.width
            });
          } else {
            setSelectionBox(null);
          }
        };

        document.addEventListener("selectionchange", handleSelection);
        return () => document.removeEventListener("selectionchange", handleSelection);
        }, []);

        return (
        <div ref={ref} {...props} className={cn(className)}  ref={containerRef} className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-900 rounded-3xl p-8 min-h-[200px]">
          
          <p className="text-zinc-300 text-lg leading-relaxed selection:bg-purple-500/30 selection:text-white">
            {content}
          </p>

          {/* Floating Toolbar Portalled/Absolute relative to selection */}
          <AnimatePresence>
            {selectionBox && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="absolute z-50 flex items-center bg-zinc-900 border border-zinc-700 shadow-[0_10px_40px_rgba(0,0,0,0.8)] rounded-xl py-1 px-1 overflow-hidden"
                style={{
                  // Position exactly above the selection
                  top: `${selectionBox.y - 50}px`, // 50px above
                  left: `${selectionBox.x + (selectionBox.width / 2)}px`,
                  x: "-50%", // Center it horizontally
                }}
              >
                {/* The Text Type Dropdown Area */}
                <button className="flex items-center gap-1 hover:bg-zinc-800 px-3 py-1.5 rounded-lg text-sm text-zinc-300 font-medium transition-colors">
                  Text <ChevronDown size={14} />
                </button>
                
                <div className="w-px h-6 bg-zinc-800 mx-1" /> {/* Divider */}

                {/* Quick Actions */}
                <div className="flex gap-1">
                  <ToolbarBtn icon={<Bold size={16} />} title="Bold" />
                  <ToolbarBtn icon={<Italic size={16} />} title="Italic" />
                  <ToolbarBtn icon={<Underline size={16} />} title="Underline" />
                  <ToolbarBtn icon={<Link size={16} />} title="Link" />
                  <ToolbarBtn icon={<Code size={16} />} title="Inline Code" />
                </div>

                {/* Downward pointing arrow */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-zinc-900 border-r border-b border-zinc-700 pointer-events-none" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        );
        });

const ToolbarBtn = ({ icon, title }: { icon: React.ReactNode, title: string }) => (
  <button 
    title={title}
    className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors focus:outline-none"
  >
    {icon}
  </button>
);
