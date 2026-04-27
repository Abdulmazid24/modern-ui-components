"use client";
import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "../utils";

export interface NeonCodeHighlightProps {
  readonly code: string;
  readonly language?: string;
  readonly filename?: string;
  readonly className?: string;
}

/** NeonCodeHighlight — Premium code snippet block with copy action and neon top border. Note: Semantic syntax highlighting should be handled by a dedicated parser like PrismJS/Shiki in production. */
export const NeonCodeHighlight = React.forwardRef<HTMLDivElement, NeonCodeHighlightProps>(
  ({ className, code, language = "text", filename, ...props }, ref) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div ref={ref} {...props} className={cn("relative rounded-2xl overflow-hidden bg-[#0d0d12] border border-zinc-800 shadow-2xl my-6", className)}>
        {/* Neon Gradient Top Border */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-violet-500 via-cyan-400 to-transparent" />
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/50 border-b border-zinc-800/50">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500/50" />
              <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
            </div>
            {filename && <span className="ml-2 text-xs font-mono text-zinc-400">{filename}</span>}
            {!filename && language && <span className="ml-2 text-[10px] uppercase font-bold text-zinc-500">{language}</span>}
          </div>
          <button onClick={handleCopy} className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-md transition-colors" title="Copy code">
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </button>
        </div>

        {/* Code Content */}
        <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-zinc-300">
          <pre><code>{code}</code></pre>
        </div>
      </div>
    );
  }
);
NeonCodeHighlight.displayName = "NeonCodeHighlight";
