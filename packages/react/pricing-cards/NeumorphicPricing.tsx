"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const NeumorphicPricing = React.forwardRef<any, any>(({ className, ...props }, ref) => {
        const [isAnnual, setIsAnnual] = useState(false);

        return (
        <div ref={ref} {...props} className={cn("w-full max-w-6xl p-12 bg-[#12141c] rounded-[3rem] shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] flex flex-col items-center gap-10", className)}>
          
          {/* Dynamic Toggle */}
          <div className="relative flex items-center p-1.5 bg-[#12141c] rounded-full shadow-[inset_4px_4px_10px_rgba(0,0,0,0.5),inset_-4px_-4px_10px_rgba(255,255,255,0.02)]">
            <div 
              className="relative z-10 w-32 py-2 text-center cursor-pointer text-sm font-bold tracking-wide transition-colors"
              onClick={() => setIsAnnual(false)}
              style={{ color: !isAnnual ? '#fff' : '#64748b' }}
            >
              Monthly
            </div>
            <div 
              className="relative z-10 w-32 py-2 text-center cursor-pointer text-sm font-bold tracking-wide transition-colors"
              onClick={() => setIsAnnual(true)}
              style={{ color: isAnnual ? '#fff' : '#64748b' }}
            >
              Annually
            </div>
            
            {/* Animated Sliding Pill */}
            <motion.div 
              className="absolute top-1.5 bottom-1.5 w-32 bg-cyan-600 rounded-full shadow-[4px_4px_10px_rgba(0,0,0,0.5),-2px_-2px_10px_rgba(34,211,238,0.2)]"
              animate={{ left: isAnnual ? "calc(100% - 8rem - 0.375rem)" : "0.375rem" }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            />
          </div>

          {/* Cards */}
          <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
             <PricingCard 
               title="Starter" 
               price={isAnnual ? 99 : 9} 
               features={["3 Projects", "Basic Analytics", "24-hour Support"]}
             />
             <PricingCard 
               title="Professional" 
               price={isAnnual ? 299 : 29} 
               features={["Unlimited Projects", "Advanced Analytics", "1-hour Support", "Custom Domain"]}
               isPopular
             />
             <PricingCard 
               title="Enterprise" 
               price={isAnnual ? 999 : 99} 
               features={["Everything in Pro", "Dedicated Account Manager", "SSO Authentication", "SLA Guarantee"]}
             />
          </div>
        </div>
        );
        });

const PricingCard = ({ title, price, features, isPopular = false }: { title: string, price: number, features: string[], isPopular?: boolean }) => {
  return (
    <div className={`relative w-80 p-8 rounded-3xl ${isPopular ? 'bg-cyan-900/10 border-2 border-cyan-500/50 scale-105 z-10' : 'bg-[#12141c] border border-white/5'} shadow-[8px_8px_20px_rgba(0,0,0,0.6),-4px_-4px_20px_rgba(255,255,255,0.02)] flex flex-col group hover:-translate-y-2 transition-transform duration-300`}>
       
       {isPopular && (
         <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-black px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]">
           Most Popular
         </div>
       )}

       <h3 className="text-zinc-400 font-bold tracking-widest uppercase mb-4">{title}</h3>
       
       <div className="flex items-end gap-1 mb-8">
         <span className="text-4xl font-black text-white">${price}</span>
         <span className="text-zinc-500 font-medium mb-1">/mo</span>
       </div>

       <ul className="flex flex-col gap-4 mb-8 flex-1">
         {features.map((ft, i) => (
           <li key={i} className="flex items-center gap-3 text-zinc-300 text-sm">
             <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${isPopular ? 'bg-cyan-500 flex items-center justify-center text-black shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'bg-white/10 text-white'}`}>
               <Check size={12} strokeWidth={3} />
             </div>
             {ft}
           </li>
         ))}
       </ul>

       <button className={`w-full py-3 rounded-xl font-bold tracking-wide transition-all ${isPopular ? 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'bg-[#1a1d27] text-white hover:bg-[#252a36] shadow-[inset_2px_2px_5px_rgba(255,255,255,0.05),inset_-2px_-2px_5px_rgba(0,0,0,0.5)]'}`}>
         Get Started
       </button>
    </div>
  );
};
