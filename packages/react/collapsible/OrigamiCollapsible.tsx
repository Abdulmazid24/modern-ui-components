"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [{ title: "What is Modern UI Vault?", content: "A next-generation, enterprise-grade component library with 150+ animated React primitives." }, { title: "How do I install it?", content: "Run npx modern-ui-vault add [component] to install any component directly into your project." }, { title: "Is it free?", content: "50+ components are free. Pro components require a license key starting at $19/month." }];
export const OrigamiCollapsible = React.forwardRef<any, any>(({ className, items = sections, ...props }, ref) => {
        const [openId, setOpenId] = useState<number | null>(0);
        return (
        <div ref={ref} {...props} className={cn("w-full max-w-lg space-y-2", className)}>
          {items.map((item, i) => {
            const isOpen = openId === i;
            return (
              <div key={i} className="rounded-xl border border-white/8 overflow-hidden bg-zinc-900/50">
                <button onClick={() => setOpenId(isOpen ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer">
                  <span className="text-sm font-semibold text-white">{item.title}</span>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown size={16} className="text-zinc-500" /></motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}><div className="px-5 pb-4 text-sm text-zinc-400">{item.content}</div></motion.div>}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        );
        });
