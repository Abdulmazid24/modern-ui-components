"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Settings, User, CreditCard, ChevronDown } from "lucide-react";
import { cn } from "../utils";

export interface NeuralUserProfileProps {
  readonly user: {
    readonly name: string;
    readonly email: string;
    readonly avatar?: string;
    readonly plan?: string;
  };
  readonly onLogout?: () => void;
  readonly className?: string;
}

const MENU_SPRING = { type: "spring", stiffness: 350, damping: 30 } as const;

/** NeuralUserProfile — Profile dropdown with glassmorphic panel, plan badge, and animated items. */
export const NeuralUserProfile = React.forwardRef<HTMLDivElement, NeuralUserProfileProps>(
  ({ className, user, onLogout, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <div ref={containerRef} className={cn("relative inline-block", className)}>
        <button 
          ref={ref as any} {...props}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 transition-colors"
        >
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-zinc-700" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center font-bold text-sm">
              {user.name.charAt(0)}
            </div>
          )}
          <span className="text-sm font-medium text-zinc-200 hidden sm:block">{user.name}</span>
          <ChevronDown size={14} className={cn("text-zinc-500 transition-transform duration-300", isOpen && "rotate-180")} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="absolute right-0 top-full mt-2 w-64 bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800 rounded-2xl z-50 shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={MENU_SPRING}
            >
              {/* Top Accent */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
              
              {/* Header */}
              <div className="p-4 border-b border-zinc-800/50">
                <div className="flex flex-col">
                  <span className="font-semibold text-white truncate">{user.name}</span>
                  <span className="text-xs text-zinc-400 truncate">{user.email}</span>
                </div>
                {user.plan && (
                  <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20 text-xs font-semibold text-violet-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                    {user.plan}
                  </div>
                )}
              </div>

              {/* Menu */}
              <div className="p-2 flex flex-col gap-1">
                <button className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors w-full text-left group">
                  <User size={16} className="text-zinc-500 group-hover:text-violet-400 transition-colors" /> Account
                </button>
                <button className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors w-full text-left group">
                  <CreditCard size={16} className="text-zinc-500 group-hover:text-cyan-400 transition-colors" /> Billing
                </button>
                <button className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors w-full text-left group">
                  <Settings size={16} className="text-zinc-500 group-hover:text-zinc-300 transition-colors" /> Settings
                </button>
              </div>

              {/* Footer */}
              <div className="p-2 border-t border-zinc-800/50 bg-zinc-950/50">
                <button onClick={onLogout} className="flex items-center gap-3 px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors w-full text-left group">
                  <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" /> Log out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
NeuralUserProfile.displayName = "NeuralUserProfile";
