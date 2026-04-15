"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Check, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export const QuantumLoadingButton = React.forwardRef<any, any>(({ className, label = "Submit", onClick, ...props }, ref) => {
        const [state, setState] = useState<"idle"|"loading"|"done">("idle");
        const handle = () => { setState("loading"); onClick?.(); setTimeout(() => { setState("done"); setTimeout(() => setState("idle"), 1500); }, 2000); };
        return (
        <motion.button ref={ref} {...props} className={cn(className)}  whileHover={state==="idle"?{scale:1.03}:{}} whileTap={state==="idle"?{scale:0.97}:{}} onClick={state==="idle"?handle:undefined} disabled={state!=="idle"}
          className="relative px-8 py-3 rounded-xl text-sm font-bold cursor-pointer overflow-hidden min-w-[140px] flex items-center justify-center gap-2 text-white transition-colors"
          animate={{ background: state==="done" ? "linear-gradient(135deg,#059669,#10b981)" : "linear-gradient(135deg,#7c3aed,#6d28d9)", boxShadow: state==="done" ? "0 0 25px rgba(16,185,129,0.4)" : "0 0 20px rgba(124,58,237,0.3)" }}>
          {state==="idle" && <><Send size={14}/>{label}</>}
          {state==="loading" && <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><Loader2 size={18}/></motion.div>}
          {state==="done" && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}><Check size={18}/></motion.div>}
        </motion.button>
        );
        });
