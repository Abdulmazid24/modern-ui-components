"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "../utils";

export interface EnterpriseAppShellProps {
  readonly sidebar: React.ReactNode;
  readonly header: React.ReactNode;
  readonly children: React.ReactNode;
  readonly defaultSidebarOpen?: boolean;
  readonly className?: string;
}

/** EnterpriseAppShell — Full SaaS application layout with responsive sidebar drawer and animated content shifting. */
export const EnterpriseAppShell = React.forwardRef<HTMLDivElement, EnterpriseAppShellProps>(
  ({ className, sidebar, header, children, defaultSidebarOpen = true, ...props }, ref) => {
    const [isMobile, setIsMobile] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(defaultSidebarOpen);

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 1024); // lg breakpoint
        if (window.innerWidth < 1024) setSidebarOpen(false);
        else setSidebarOpen(true);
      };
      
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
      <div ref={ref} {...props} className={cn("relative flex h-screen w-full overflow-hidden bg-zinc-950", className)}>
        
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isMobile && sidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{ x: sidebarOpen ? 0 : "-100%", width: isMobile ? 280 : (sidebarOpen ? 280 : 0) }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={cn(
            "fixed inset-y-0 left-0 z-50 h-full bg-zinc-950 border-r border-zinc-800 flex flex-col shrink-0 overflow-hidden",
            isMobile ? "w-[280px]" : ""
          )}
        >
          <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none">
            {sidebar}
          </div>
          {isMobile && (
            <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white lg:hidden">
              <X size={20} />
            </button>
          )}
        </motion.aside>

        {/* Main Content Area */}
        <motion.div 
          layout
          className="flex-1 flex flex-col min-w-0 h-full overflow-hidden z-10"
        >
          {/* Header */}
          <header className="h-16 shrink-0 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl flex items-center px-4 sm:px-6 sticky top-0 z-20">
            {(!sidebarOpen || isMobile) && (
              <button 
                onClick={() => setSidebarOpen(true)}
                className="p-2 mr-4 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors shrink-0"
              >
                <Menu size={20} />
              </button>
            )}
            <div className="flex-1 min-w-0 flex items-center">
              {header}
            </div>
          </header>

          {/* Main scrollable content */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 relative">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
            
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>
          </main>
        </motion.div>
      </div>
    );
  }
);
EnterpriseAppShell.displayName = "EnterpriseAppShell";
