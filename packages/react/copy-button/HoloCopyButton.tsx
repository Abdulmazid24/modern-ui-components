"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const HoloCopyButton = React.forwardRef<any, any>(({ className, text = "npm install modern-ui-vault", label, ...props }, ref) => {
        const [copied, setCopied] = useState(false);
        const copy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); };
        return (
        <motion.button ref={ref} {...props} className={cn(className)}  whileTap={{ scale: 0.95 }} onClick={copy} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border text-sm font-mono cursor-pointer transition-all" style={{ borderColor: copied ? "rgba(16,185,129,0.4)" : "rgba(255,255,255,0.08)", boxShadow: copied ? "0 0 20px rgba(16,185,129,0.15)" : "none" }}>
          <span className="text-zinc-300">{label || text}</span>
          <motion.div initial={false} animate={{ rotate: copied ? 0 : 0, scale: copied ? [1.3, 1] : 1 }} transition={{ duration: 0.2 }}>
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} className="text-zinc-500" />}
          </motion.div>
        </motion.button>
        );
        });
