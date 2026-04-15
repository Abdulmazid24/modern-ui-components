"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Shield, Sword, Eye, Heart, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SkillNode {
  id: string;
  name: string;
  tier: number;
  icon: JSX.Element;
  cost: number;
  unlocked: boolean;
  req: string | null;
    className?: string;
}

export const RPGSkillTree = React.forwardRef<any, SkillNode>(({ className, ...props }, ref) => {
        // Pre-configured tree state
        const [skills, setSkills] = useState<SkillNode[]>([
        { id: "base", name: "Novice Core", tier: 1, icon: <Heart size={20} />, cost: 0, unlocked: true, req: null },
        { id: "atk1", name: "Power Strike", tier: 2, icon: <Sword size={20} />, cost: 1, unlocked: false, req: "base" },
        { id: "def1", name: "Iron Skin", tier: 2, icon: <Shield size={20} />, cost: 1, unlocked: false, req: "base" },
        { id: "atk2", name: "Lightning Blade", tier: 3, icon: <Zap size={20} />, cost: 2, unlocked: false, req: "atk1" },
        { id: "mag1", name: "Arcane Vision", tier: 3, icon: <Eye size={20} />, cost: 2, unlocked: false, req: "def1" },
        { id: "ult", name: "Astral Ascension", tier: 4, icon: <Sparkles size={24} />, cost: 5, unlocked: false, req: "atk2" } // requires atk2 for layout demo
        ]);

        const [points, setPoints] = useState(5);

        const unlockSkill = (id: string) => {
        const skill = skills.find(s => s.id === id);
        if (!skill || skill.unlocked || points < skill.cost) return;

        // Check req
        if (skill.req) {
          const reqSkill = skills.find(s => s.id === skill.req);
          if (!reqSkill || !reqSkill.unlocked) return;
        }

        setPoints(p => p - skill.cost);
        setSkills(prev => prev.map(s => s.id === id ? { ...s, unlocked: true } : s));
        };

        // Fixed visual coordinate mapping for a static tree layout (simplified for demo)
        const layout: Record<string, { x: number, y: number }> = {
        "base": { x: 300, y: 50 },
        "atk1": { x: 150, y: 150 },
        "def1": { x: 450, y: 150 },
        "atk2": { x: 150, y: 280 },
        "mag1": { x: 450, y: 280 },
        "ult": { x: 300, y: 400 }
        };

        const getLinePath = (start: {x:number,y:number}, end: {x:number,y:number}) => {
         // Simple straight line with slight offset for node center (assuming 64px width node -> +32x, +32y)
         // Node centers:
         const sx = start.x + 32;
         const sy = start.y + 32;
         const ex = end.x + 32;
         const ey = end.y + 32;
         return `M ${sx} ${sy} L ${ex} ${ey}`;
        };

        return (
        <div ref={ref} {...props} className={cn("relative w-full max-w-3xl h-[500px] bg-[#0d0914] border border-[#2a1b42] rounded-3xl p-6 shadow-2xl overflow-hidden font-mono select-none", className)}>
          
          {/* HUD overlay */}
          <div className="absolute top-6 right-8 z-20 flex items-center gap-2 bg-[#2a1b42]/80 border border-[#482875] px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.3)]">
            <Sparkles size={16} className="text-fuchsia-400" />
            <span className="text-white font-bold">{points} SP Available</span>
          </div>

          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #8b5cf6 1px, transparent 0)', backgroundSize: '30px 30px' }}
          />
          
          <div className="relative w-full h-full overflow-auto">
            <div className="absolute w-[600px] h-[500px]">
              
              {/* SVG Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                 {skills.map(skill => {
                   if (!skill.req) return null;
                   const reqSkill = skills.find(s => s.id === skill.req);
                   if (!reqSkill) return null;
                   
                   const start = layout[reqSkill.id];
                   const end = layout[skill.id];
                   const isLineActive = skill.unlocked;
                   const isLineUnlockable = !skill.unlocked && reqSkill.unlocked;

                   return (
                     <motion.path 
                       key={`line-${skill.id}`}
                       d={getLinePath(start, end)}
                       fill="none"
                       strokeWidth="3"
                       stroke={isLineActive ? "#c084fc" : isLineUnlockable ? "#581c87" : "#2e1065"}
                       initial={{ pathLength: 0 }}
                       animate={{ pathLength: 1 }}
                       transition={{ duration: 1, ease: "easeInOut" }}
                       className={isLineActive ? "drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]" : ""}
                     />
                   );
                 })}
              </svg>

              {/* Nodes */}
              {skills.map((skill) => {
                 const pos = layout[skill.id];
                 const isAvailable = !skill.unlocked && (!skill.req || skills.find(s => s.id === skill.req)?.unlocked) && points >= skill.cost;
                 const isLocked = !skill.unlocked && !isAvailable;

                 return (
                   <motion.div 
                     key={skill.id}
                     className={`absolute w-16 h-16 rounded-2xl flex items-center justify-center border-2 cursor-pointer transition-all z-10 ${
                       skill.unlocked 
                         ? 'bg-[#4c1d95] border-[#c084fc] text-white shadow-[0_0_20px_rgba(192,132,252,0.6)]' 
                         : isAvailable 
                           ? 'bg-[#1e1b4b] border-[#8b5cf6] text-purple-300 hover:bg-[#2e1065] hover:scale-110 shadow-[0_0_15px_rgba(139,92,246,0.3)]' 
                           : 'bg-black border-[#2e1065] text-zinc-600 opacity-60 pointer-events-none'
                     }`}
                     style={{ left: pos.x, top: pos.y }}
                     whileTap={isAvailable ? { scale: 0.95 } : undefined}
                     onClick={() => unlockSkill(skill.id)}
                   >
                     <div className="relative">
                       {skill.icon}
                       {/* Cost indicator if available */}
                       {isAvailable && (
                         <div className="absolute -top-6 -right-6 w-5 h-5 rounded-full bg-fuchsia-600 flex items-center justify-center text-[10px] font-bold text-white border border-fuchsia-400">
                           {skill.cost}
                         </div>
                       )}
                     </div>
                     
                     {/* Name Tooltip (simple absolute placement) */}
                     <div className="absolute top-20 text-center w-24 -ml-4 pointer-events-none">
                       <p className={`text-[10px] font-bold uppercase tracking-widest ${skill.unlocked ? 'text-purple-200 drop-shadow-[0_0_2px_rgba(255,255,255,0.8)]' : isAvailable ? 'text-purple-400' : 'text-zinc-600'}`}>
                         {skill.name}
                       </p>
                     </div>
                   </motion.div>
                 );
              })}
            </div>
          </div>
        </div>
        );
        });
