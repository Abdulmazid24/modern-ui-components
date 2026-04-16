"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, FileText, Languages, Zap, X } from "lucide-react";
import { cn } from "../utils";
import { useSpatialAudio } from "../hooks";

interface AITool {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: (text: string) => void;
}

interface ContextualAIToolbarProps {
  customTools?: AITool[];
  enableAudio?: boolean;
  className?: string;
}

/**
 * A floating AI toolbar that appears when text is selected.
 * Focuses on high-end AI-Native productivity patterns.
 */
export const ContextualAIToolbar = ({
  customTools = [],
  enableAudio = false,
  className,
}: ContextualAIToolbarProps) => {
  const [selection, setSelection] = useState<{ text: string; x: number; y: number } | null>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  const { play: playPop } = useSpatialAudio({ 
    enabled: enableAudio, 
    url: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3" 
  });

  const defaultTools: AITool[] = [
    { id: "summarize", label: "Summarize", icon: <FileText size={14} />, action: (t) => console.log("AI Summarize:", t) },
    { id: "translate", label: "Translate", icon: <Languages size={14} />, action: (t) => console.log("AI Translate:", t) },
    { id: "fix", label: "Fix Grammar", icon: <Zap size={14} />, action: (t) => console.log("AI Fix:", t) },
  ];

  const tools = customTools.length > 0 ? customTools : defaultTools;

  useEffect(() => {
    const handleSelection = () => {
      const sel = window.getSelection();
      if (sel && sel.toString().trim().length > 0) {
        const range = sel.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        if (rect.width > 0) {
          setSelection({
            text: sel.toString(),
            x: rect.left + rect.width / 2,
            y: rect.top - 50, // 50px offset above selection
          });
          playPop();
        }
      } else {
        setSelection(null);
      }
    };

    document.addEventListener("mouseup", handleSelection);
    return () => document.removeEventListener("mouseup", handleSelection);
  }, [playPop]);

  return (
    <AnimatePresence>
      {selection && (
        <motion.div
          ref={toolbarRef}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          style={{ 
            left: selection.x, 
            top: selection.y,
            position: "fixed",
            translateX: "-50%",
            zIndex: 1000 
          }}
          className={cn(
            "flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl backdrop-blur-xl",
            className
          )}
        >
          {/* Logo/Icon */}
          <div className="px-3 py-2 text-purple-500 border-r border-zinc-800">
             <Sparkles size={16} className="animate-pulse" />
          </div>

          {/* Tools */}
          <div className="flex items-center">
             {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => tool.action(selection.text)}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-xl transition-all group"
                >
                   <span className="text-zinc-500 group-hover:text-purple-400">{tool.icon}</span>
                   {tool.label}
                </button>
             ))}
          </div>

          {/* Close */}
          <button 
             onClick={() => setSelection(null)}
             className="px-2 py-2 text-zinc-600 hover:text-zinc-300 transition-colors"
          >
             <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
