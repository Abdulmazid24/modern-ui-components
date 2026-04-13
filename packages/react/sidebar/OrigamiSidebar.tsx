"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Compass, MessageSquare, Settings } from "lucide-react";
import { cn } from "@/utils";

export interface OrigamiSidebarProps {
  children?: React.ReactNode;
    className?: string;
}

export const OrigamiSidebar = React.forwardRef<any, OrigamiSidebarProps>(({ className, children, ...props }, ref) => {
        const [isOpen, setIsOpen] = useState(false);

        const menuItems = [
        { icon: <Home size={20} />, label: "Dashboard" },
        { icon: <Compass size={20} />, label: "Explore" },
        { icon: <MessageSquare size={20} />, label: "Messages" },
        { icon: <Settings size={20} />, label: "Settings" },
        ];

        // The origami fold animation variants
        // We use `rotateX` to fold them out from top to bottom
        const foldVariants = {
        hidden: { 
          rotateX: -90, 
          opacity: 0,
          y: -20,
          transformOrigin: "top"
        },
        visible: (custom: number) => ({
          rotateX: 0,
          opacity: 1,
          y: 0,
          transition: {
            delay: custom * 0.1,
            type: "spring",
            stiffness: 120,
            damping: 12,
            mass: 0.8
          }
        }),
        exit: (custom: number) => ({
          rotateX: 90,
          opacity: 0,
          y: -20,
          transition: {
            delay: (3 - custom) * 0.05,
            duration: 0.2
          }
        })
        };

        return (
        <div ref={ref} {...props} className={cn("relative min-h-[400px] w-full flex overflow-hidden border border-zinc-800 rounded-3xl bg-black", className)}>
          
          {/* Trigger Button - Floating */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="absolute top-6 left-6 z-50 p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 transition-colors shadow-xl"
          >
            <motion.div animate={{ rotate: isOpen ? 90 : 0 }}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </button>

          {/* Main Content Area */}
          <div className={`flex-1 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isOpen ? 'ml-[260px] opacity-50 scale-95' : 'ml-0'}`}>
            <div className="p-24 text-zinc-500 text-center border-2 border-dashed border-zinc-800 rounded-3xl m-6 h-[calc(100%-48px)] flex items-center justify-center">
              {children || "Main Content Area (Origami Sidebar Demo)"}
            </div>
          </div>

          {/* Sidebar Container */}
          <AnimatePresence>
            {isOpen && (
              <div className="absolute top-0 left-0 h-full w-[260px] p-6 pt-24 z-40 bg-gradient-to-r from-zinc-950 to-zinc-900/90 backdrop-blur-xl border-r border-zinc-800 shadow-2xl" style={{ perspective: "1000px" }}>
                
                <div className="flex flex-col gap-2 relative h-full">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.label}
                      custom={index}
                      variants={foldVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 transition-colors group shadow-lg"
                    >
                      <div className="text-zinc-500 group-hover:text-indigo-200 transition-colors">
                        {item.icon}
                      </div>
                      <span className="font-medium tracking-wide">
                        {item.label}
                      </span>
                    </motion.button>
                  ))}

                  {/* Decorative line mapping out the folds */}
                  <motion.div 
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    exit={{ scaleY: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute left-10 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/0 via-indigo-500/30 to-indigo-500/0 -z-10 origin-top"
                  />
                </div>
                
              </div>
            )}
          </AnimatePresence>

        </div>
        );
        });
