"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/utils";

export const RocketScrollTop = React.forwardRef<any, any>(({ className, ...props }, ref) => {
        const [visible, setVisible] = useState(false);
        useEffect(() => { const h = () => setVisible(window.scrollY > 300); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
        return (
        <AnimatePresence>
          {visible && (
            <motion.button initial={{ opacity: 0, y: 20, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.8 }} whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(124,58,237,0.5)" }} whileTap={{ scale: 0.9 }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-purple-700 text-white flex items-center justify-center cursor-pointer z-50" style={{ boxShadow: "0 0 20px rgba(124,58,237,0.3)" }}>
              <ArrowUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>
        );
        });
