"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, MessageSquare, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [{icon:<MessageSquare size={18}/>,label:"Chat",color:"#3b82f6"},{icon:<Phone size={18}/>,label:"Call",color:"#10b981"},{icon:<Mail size={18}/>,label:"Email",color:"#f59e0b"}];
export const MorphFAB = React.forwardRef<any, any>(({ className, ...props }, ref) => {
        const [open, setOpen] = useState(false);
        return (
        <div ref={ref} {...props} className={cn("relative flex items-end justify-end min-h-[250px] w-full", className)}>
          <div className="relative">
            <AnimatePresence>{open && actions.map((a, i) => (
              <motion.button key={a.label} initial={{ opacity: 0, y: 20, scale: 0.5 }} animate={{ opacity: 1, y: -(i + 1) * 56, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.5 }} transition={{ delay: i * 0.05 }} className="absolute bottom-0 right-0 w-12 h-12 rounded-full flex items-center justify-center text-white cursor-pointer" style={{ background: a.color, boxShadow: `0 0 15px ${a.color}40` }}>
                {a.icon}
              </motion.button>
            ))}</AnimatePresence>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setOpen(!open)} animate={{ rotate: open ? 45 : 0 }} className="relative w-14 h-14 rounded-full bg-gradient-to-br from-violet-600 to-pink-500 text-white flex items-center justify-center cursor-pointer z-10" style={{ boxShadow: "0 0 25px rgba(124,58,237,0.4)" }}>
              <Plus size={24} />
            </motion.button>
          </div>
        </div>
        );
        });
