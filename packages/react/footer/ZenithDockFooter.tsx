"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const SITE_LINKS = [
  { group: "Product", links: ["Features", "Integrations", "Pricing", "Changelog"] },
  { group: "Company", links: ["About Us", "Careers", "Blog", "Contact"] },
  { group: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] }
];

export function ZenithDockFooter({ className }: { className?: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={cn("fixed bottom-4 left-1/2 -translate-x-1/2 z-50", className)}>
      <motion.div
        layout
        initial={{ borderRadius: 100 }}
        animate={{
          borderRadius: isExpanded ? 24 : 100,
          width: isExpanded ? 640 : "auto", // Max width when expanded
        }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        className="bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
      >
        <AnimatePresence mode="popLayout">
          {isExpanded ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="p-8 w-full max-w-[90vw] sm:max-w-[640px]"
            >
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <span className="text-xl font-semibold text-white tracking-tight">Vault.</span>
                <button 
                  onClick={() => setIsExpanded(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                {SITE_LINKS.map((section) => (
                  <div key={section.group}>
                    <h4 className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-4">
                      {section.group}
                    </h4>
                    <ul className="space-y-3">
                      {section.links.map((link) => (
                        <li key={link}>
                          <a href="#" className="text-sm text-neutral-300 hover:text-white transition-colors">
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center text-xs text-neutral-500 pt-4 border-t border-white/10">
                © {new Date().getFullYear()} Modern UI Vault. Minimal & beautiful.
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-6 py-3 flex items-center gap-4 cursor-pointer"
              onClick={() => setIsExpanded(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                <span className="text-sm font-medium text-white px-2">Site Navigation</span>
              </div>
              <div className="h-4 w-[1px] bg-white/20" />
              <div className="text-white/60 hover:text-white transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m18 15-6-6-6 6"/></svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
