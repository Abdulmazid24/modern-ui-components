"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { cn } from "@/utils";

const sampleCode = `import { motion } from "framer-motion";\n\nexport const FadeIn = ({ children }) => (\n  <motion.div\n    initial={{ opacity: 0, y: 20 }}\n    animate={{ opacity: 1, y: 0 }}\n    transition={{ duration: 0.5 }}\n  >\n    {children}\n  </motion.div>\n);`;
const keywords = ["import","export","const","from","return"];
const highlight = (code: string) => code.split("\n").map((line, i) => {
  let hl = line.replace(/(".*?"|'.*?'|`.*?`)/g, '<span style="color:#a5d6ff">$1</span>').replace(/\/\/.*/g, '<span style="color:#6e7681">$&</span>');
  keywords.forEach(k => { hl = hl.replace(new RegExp(`\\b${k}\\b`, "g"), `<span style="color:#ff7b72">${k}</span>`); });
  hl = hl.replace(/\b(motion|children|opacity|initial|animate|transition|duration)\b/g, '<span style="color:#d2a8ff">$1</span>');
  return hl;
});
export const MatrixCodeBlock = React.forwardRef<any, any>(({ className, code = sampleCode, lang = "tsx", ...props }, ref) => {
        const [copied, setCopied] = useState(false);
        const copy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
        const lines = highlight(code);
        return (
        <div ref={ref} {...props} className={cn("w-full max-w-xl rounded-xl overflow-hidden bg-[#0d1117] border border-white/8", className)}>
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
            <div className="flex items-center gap-2"><div className="flex gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500/70"/><span className="w-3 h-3 rounded-full bg-yellow-500/70"/><span className="w-3 h-3 rounded-full bg-green-500/70"/></div><span className="text-xs text-zinc-600 ml-2 font-mono">{lang}</span></div>
            <motion.button whileTap={{ scale: 0.9 }} onClick={copy} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs text-zinc-500 hover:text-white hover:bg-white/5 cursor-pointer transition-colors">{copied ? <><Check size={12} className="text-emerald-400"/>Copied!</> : <><Copy size={12}/>Copy</>}</motion.button>
          </div>
          <div className="p-4 overflow-x-auto"><pre className="text-sm leading-relaxed font-mono">{lines.map((line, i) => <div key={i} className="flex"><span className="w-8 text-right text-zinc-700 select-none mr-4 text-xs leading-relaxed">{i+1}</span><span dangerouslySetInnerHTML={{ __html: line }} className="text-[#e6edf3]" /></div>)}</pre></div>
        </div>
        );
        });
