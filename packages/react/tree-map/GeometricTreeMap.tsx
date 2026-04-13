"use client";

import React from "react";
import { motion } from "framer-motion";
import { Copy, Plus, MoreHorizontal } from "lucide-react";
import { cn } from "@/utils";

export interface TreeMapNode {
  id: string;
  name: string;
  value: number; // 1-100 percentage
  color: string;
  children?: TreeMapNode[];
    className?: string;
}

export const GeometricTreeMap = React.forwardRef<any, TreeMapNode>(({ className, ...props }, ref) => {
        // A mock representation of nested json structural size distributions.
        const rootNode: TreeMapNode = {
        id: "root", name: "System Storage", value: 100, color: "",
        children: [
          { 
            id: "sys", name: "OS Level", value: 50, color: "bg-cyan-500",
            children: [
               { id: "kern", name: "Kernel", value: 60, color: "bg-cyan-600" },
               { id: "lib", name: "Libraries", value: 40, color: "bg-cyan-700" }
            ]
          },
          { id: "apps", name: "Applications", value: 30, color: "bg-purple-500" },
          { id: "cache", name: "Cache Temp", value: 15, color: "bg-amber-500" },
          { id: "free", name: "Free Space", value: 5, color: "bg-zinc-800" }
        ]
        };

        return (
        <div ref={ref} {...props} className={cn("w-full max-w-3xl h-[400px] bg-zinc-950 border border-zinc-900 shadow-2xl rounded-[2rem] p-6 flex flex-col gap-4", className)}>
          
          <div className="flex justify-between items-center px-2">
            <h3 className="text-zinc-300 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                 <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                 <line x1="3" y1="9" x2="21" y2="9"/>
                 <line x1="9" y1="21" x2="9" y2="9"/>
               </svg>
               {rootNode.name}
            </h3>
            <div className="flex gap-2">
              <button className="text-zinc-500 hover:text-white transition-colors"><Copy size={16} /></button>
              <button className="text-zinc-500 hover:text-white transition-colors"><Plus size={16} /></button>
            </div>
          </div>
          
          {/* Container holding the map. Flex wraps structurally according to size logic.
              For a true tree map algorithm, usually it computes squarification. We simulate it 
              using CSS Flexbox flex-basis to dictate proportions natively!
          */}
          <div className="flex-1 w-full h-full rounded-2xl overflow-hidden flex flex-wrap gap-1 p-1 bg-zinc-900/50 border border-zinc-800/50">
            <AnimatePresence>
              {rootNode.children?.map((child, i) => {
                 // For layout simulation, assuming flex-basis handles horizontal spread,
                 // then flex-grow handles vertical fill.
                 return (
                   <motion.div 
                     key={child.id}
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.5, delay: i * 0.1, type: "spring" }}
                     className={`relative rounded-xl overflow-hidden flex flex-col group cursor-pointer border border-transparent hover:border-white/20 transition-all ${child.color}`}
                     style={{ 
                       flexBasic: `${child.value}%`, 
                       flexGrow: 1, 
                       minWidth: child.value > 20 ? '20%' : '10%' 
                     }}
                   >
                     
                     {/* Internal nested nodes if any */}
                     {child.children ? (
                       <div className="absolute inset-0 flex gap-0.5 p-0.5">
                         {child.children.map(subChild => (
                           <div 
                             key={subChild.id} 
                             className={`h-full ${subChild.color} rounded-lg`}
                             style={{ flexBasis: `${subChild.value}%`, flexGrow: 1 }}
                           >
                             <p className="p-2 text-[10px] font-bold text-white/50">{subChild.name}</p>
                           </div>
                         ))}
                       </div>
                     ) : (
                       /* No nested, just plain block */
                       <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
                     )}

                     {/* Top Label */}
                     <div className="absolute inset-0 p-3 pointer-events-none flex flex-col justify-between mix-blend-overlay text-white">
                        <span className="font-bold text-sm truncate">{child.name}</span>
                        <span className="font-mono text-xs">{child.value}%</span>
                     </div>
                     
                     {/* Right Click menu simulation icon */}
                     <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-black/40 p-1 rounded-md text-white transition-opacity">
                        <MoreHorizontal size={14} />
                     </div>

                   </motion.div>
                 )
              })}
            </AnimatePresence>
          </div>

        </div>
        );
        });
