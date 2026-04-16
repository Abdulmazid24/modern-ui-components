"use client";

import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Droplets } from 'lucide-react';
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
  icon?: React.ReactNode;
}

export interface LiquidAccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
  liquidColor?: string;
}

const AccordionPanel: React.FC<{
  item: AccordionItem;
  isOpen: boolean;
  onClick: () => void;
  liquidColor: string;
  filterId: string;
}> = ({ item, isOpen, onClick, liquidColor, filterId }) => {
  return (
    <div className="relative mb-6">
      {/* The Gooey Trigger Container */}
      <div 
        style={{ filter: `url(#${filterId})` }}
        className="relative"
      >
        <motion.button
          onClick={onClick}
          className={cn(
            "relative w-full flex items-center justify-between p-6 z-20 transition-all duration-500",
            "bg-zinc-900 text-white outline-none",
            isOpen ? "rounded-[3rem]" : "rounded-[2rem]"
          )}
          animate={{
            backgroundColor: isOpen ? liquidColor : "rgb(24, 24, 27)",
          }}
        >
          <div className="flex items-center gap-4">
            <div className={cn(
                "p-2 rounded-full transition-colors duration-500",
                isOpen ? "bg-white/20 text-white" : "bg-zinc-800 text-zinc-400"
            )}>
              {item.icon || <Droplets size={18} />}
            </div>
            <span className={cn(
                "text-lg font-bold tracking-tight transition-colors duration-500",
                isOpen ? "text-white" : "text-zinc-400"
            )}>
              {item.title}
            </span>
          </div>
          
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            className={cn(
                "p-2 rounded-full",
                isOpen ? "bg-white/10" : "bg-zinc-800"
            )}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.button>

        {/* The Animated "Liquid" expansion that merges with the button */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -20 }}
              className="absolute inset-0 z-10 bg-zinc-900 rounded-[3rem]"
              style={{ backgroundColor: liquidColor }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Content Area (Not affected by Gooey filter for text clarity) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 pt-6 text-zinc-400 lg:text-lg leading-relaxed bg-zinc-900/30 rounded-b-[2rem] mt-[-2rem] border-x border-b border-zinc-800/50">
              {item.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const LiquidAccordion = React.forwardRef<HTMLDivElement, LiquidAccordionProps>(
  ({ items, allowMultiple = false, className, liquidColor = "#ec4899" }, ref) => {
    const [openIds, setOpenIds] = useState<Set<string>>(new Set());
    const filterId = useId().replace(/:/g, "");

    const toggle = (id: string) => {
      setOpenIds((prev) => {
        const next = new Set(allowMultiple ? prev : []);
        if (prev.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    };

    return (
      <div ref={ref} className={cn("w-full max-w-2xl mx-auto", className)}>
        {/* SVG Gooey Filter Definition */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <filter id={filterId}>
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix 
                in="blur" 
                mode="matrix" 
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" 
                result="goo" 
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>

        {items.map((item, i) => (
          <AccordionPanel
            key={item.id}
            item={item}
            isOpen={openIds.has(item.id)}
            onClick={() => toggle(item.id)}
            liquidColor={liquidColor}
            filterId={filterId}
            index={i}
          />
        ))}
      </div>
    );
  }
);

LiquidAccordion.displayName = "LiquidAccordion"; 
