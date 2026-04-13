"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy } from "lucide-react";
import { cn } from "@/utils";

export const PhysicalCreditCard = React.forwardRef<any, any>(({ className, ...props }, ref) => {
        const [num, setNum] = useState("");
        const [name, setName] = useState("");
        const [exp, setExp] = useState("");
        const [cvc, setCvc] = useState("");
        const [focused, setFocused] = useState<string | null>(null);

        // Format Helpers
        const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        for (let i=0, len=match.length; i<len; i+=4) {
          parts.push(match.substring(i, i+4));
        }
        if (parts.length) return parts.join(' ');
        else return value;
        };

        const isFlipped = focused === "cvc";

        return (
        <div ref={ref} {...props} className={cn("w-full max-w-xl flex flex-col md:flex-row gap-10 items-center justify-center p-8 bg-zinc-950 border border-zinc-900 rounded-[2.5rem] shadow-2xl", className)}>
          
          {/* 3D Scene Container */}
          <div className="w-80 h-52 perspective-[1000px] shrink-0">
            <motion.div 
              className="relative w-full h-full transform-style-3d cursor-pointer shadow-2xl rounded-2xl"
              animate={{ rotateY: isFlipped ? 180 : 0, scale: focused ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              
              {/* Card Front */}
              <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl border border-white/20 p-6 flex flex-col justify-between overflow-hidden bg-gradient-to-tr from-zinc-900 via-zinc-800 to-zinc-900">
                 {/* Holographic reflection angle overlay */}
                 <div className="absolute top-0 right-0 w-[200%] h-full bg-gradient-to-l from-white/0 via-white/10 to-white/0 -skew-x-12 translate-x-20 pointer-events-none" />

                 {/* EMV Chip and Logo */}
                 <div className="flex justify-between items-start z-10">
                   <div className="w-12 h-9 rounded bg-gradient-to-br from-yellow-200 to-amber-500 border border-amber-600/50 flex flex-col justify-between overflow-hidden opacity-90 pb-[1px]">
                      <div className="border-b border-amber-700/30 w-full h-1/3" />
                      <div className="border-b border-amber-700/30 w-full h-1/3" />
                   </div>
                   
                   {/* Faux Mastercard logo */}
                   <div className="flex">
                      <div className="w-10 h-10 rounded-full bg-rose-500 mix-blend-screen -mr-4" />
                      <div className="w-10 h-10 rounded-full bg-amber-500 mix-blend-screen" />
                   </div>
                 </div>

                 {/* Number */}
                 <div className="z-10 mt-6">
                    <p className="font-mono text-xl tracking-[0.2em] text-white font-bold h-7 drop-shadow-md">
                       {formatCardNumber(num) || "#### #### #### ####"}
                    </p>
                 </div>

                 {/* Name & Date */}
                 <div className="flex justify-between items-end z-10 w-full">
                    <div className="flex flex-col">
                       <span className="text-[8px] text-zinc-400 uppercase tracking-widest mb-1">Cardholder</span>
                       <p className="font-mono text-xs text-white tracking-widest font-bold uppercase w-32 truncate h-4">
                         {name || "YOUR NAME"}
                       </p>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[8px] text-zinc-400 uppercase tracking-widest mb-1">Expires</span>
                       <p className="font-mono text-xs text-white tracking-widest font-bold h-4">
                         {exp || "MM/YY"}
                       </p>
                    </div>
                 </div>
              </div>

              {/* Card Back */}
              <div 
                 className="absolute inset-0 w-full h-full backface-hidden rounded-2xl border border-white/20 bg-zinc-900 overflow-hidden" 
                 style={{ transform: "rotateY(180deg)" }}
              >
                 <div className="w-full h-12 bg-black mt-6 opacity-90" />
                 
                 <div className="px-4 mt-4">
                   <div className="w-full h-10 bg-white rounded flex items-center justify-end px-3">
                     <span className="font-mono text-black font-bold tracking-widest italic">{cvc || "###"}</span>
                   </div>
                   <div className="w-full mt-4 flex gap-1 flex-col opacity-20">
                     <div className="h-1 bg-white/50 w-3/4 rounded-full" />
                     <div className="h-1 bg-white/50 w-full rounded-full" />
                     <div className="h-1 bg-white/50 w-1/2 rounded-full" />
                   </div>
                 </div>
              </div>

            </motion.div>
          </div>

          {/* Input Form */}
          <div className="flex flex-col gap-4 w-full max-w-[16rem]">
             <input 
               type="text" 
               placeholder="Card Number" 
               maxLength={16}
               onFocus={() => setFocused("num")}
               onBlur={() => setFocused(null)}
               onChange={(e) => setNum(e.target.value)}
               className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-cyan-500/50 transition-colors placeholder:text-zinc-600 font-mono"
             />
             <input 
               type="text" 
               placeholder="Cardholder Name" 
               onFocus={() => setFocused("name")}
               onBlur={() => setFocused(null)}
               onChange={(e) => setName(e.target.value)}
               className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-cyan-500/50 transition-colors placeholder:text-zinc-600 font-mono uppercase"
             />
             <div className="flex gap-4">
               <input 
                 type="text" 
                 placeholder="MM/YY" 
                 maxLength={5}
                 onFocus={() => setFocused("exp")}
                 onBlur={() => setFocused(null)}
                 onChange={(e) => setExp(e.target.value)}
                 className="w-1/2 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-cyan-500/50 transition-colors placeholder:text-zinc-600 font-mono"
               />
               <input 
                 type="text" 
                 placeholder="CVC" 
                 maxLength={3}
                 onFocus={() => setFocused("cvc")}
                 onBlur={() => setFocused(null)}
                 onChange={(e) => setCvc(e.target.value)}
                 className="w-1/2 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-cyan-500/50 transition-colors placeholder:text-zinc-600 font-mono"
               />
             </div>
          </div>
          
        </div>
        );
        });
