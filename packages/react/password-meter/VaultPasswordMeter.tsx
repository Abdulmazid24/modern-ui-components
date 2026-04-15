"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Lock, Unlock, ShieldAlert, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export const VaultPasswordMeter = React.forwardRef<any, any>(({ className, ...props }, ref) => {
        const [password, setPassword] = useState("");

        // Very basic entropy calculation for visual demo
        const getEntropy = (p: string) => {
        let score = 0;
        if (p.length > 4) score += 20;
        if (p.length > 8) score += 20;
        if (/[A-Z]/.test(p)) score += 20;
        if (/[0-9]/.test(p)) score += 20;
        if (/[^A-Za-z0-9]/.test(p)) score += 20;
        return score;
        };

        const entropy = getEntropy(password);

        const getMeterState = () => {
        if (password.length === 0) return { color: "bg-zinc-800", shadow: "none", text: "text-zinc-600", label: "Empty", icon: <Lock size={14} /> };
        if (entropy < 40) return { color: "bg-rose-500", shadow: "shadow-[0_0_15px_rgba(244,63,94,0.6)]", text: "text-rose-400", label: "Weak", icon: <Unlock size={14} /> };
        if (entropy < 80) return { color: "bg-amber-500", shadow: "shadow-[0_0_15px_rgba(245,158,11,0.6)]", text: "text-amber-400", label: "Moderate", icon: <ShieldAlert size={14} /> };
        return { color: "bg-emerald-500", shadow: "shadow-[0_0_15px_rgba(16,185,129,0.6)]", text: "text-emerald-400", label: "Strong", icon: <ShieldCheck size={14} /> };
        };

        const state = getMeterState();

        return (
        <div ref={ref} {...props} className={cn("w-full max-w-sm bg-zinc-950 border border-zinc-900 rounded-[2rem] p-8 shadow-2xl flex flex-col gap-6", className)}>
          
          <div className="relative">
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Passphrase..."
              className="w-full bg-zinc-900/50 border-2 border-zinc-800 focus:border-zinc-700 rounded-xl px-4 py-3 text-sm text-white outline-none font-mono transition-colors focus:shadow-inner"
            />
            <div className={`absolute right-4 top-1/2 -translate-y-1/2 ${state.text} transition-colors`}>
              {state.icon}
            </div>
          </div>

          <div className="flex flex-col gap-2 relative">
             <div className="flex items-center justify-between">
               <span className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase">Encryption Strength</span>
               <span className={`text-[10px] font-bold tracking-widest uppercase ${state.text}`}>{state.label}</span>
             </div>
             
             {/* The Meter Track */}
             <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800 relative z-10 flex border-x-0 rounded-none bg-transparent gap-1">
                {/* Split it into 4 chunks visually but animate width of a single underlying bar, OR animate chunks. Let's do a single bar with clipping/grid over it */}
                <div className="absolute inset-0 bg-zinc-900 rounded-full" />
                <motion.div 
                   className={`absolute top-0 bottom-0 left-0 rounded-full ${state.color} ${state.shadow}`}
                   animate={{ width: `${Math.max(5, entropy)}%` }} // Provide a tiny sliver just so it's visible
                   transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
                {/* Segment Dividers overlays */}
                <div className="absolute inset-0 flex justify-between pointer-events-none">
                  <div className="w-1 h-full bg-zinc-950" />
                  <div className="w-1 h-full bg-zinc-950" />
                  <div className="w-1 h-full bg-zinc-950" />
                  <div className="w-1 h-full bg-zinc-950" />
                </div>
             </div>
          </div>
          
        </div>
        );
        });
