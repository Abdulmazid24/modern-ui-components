"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { cn } from "../utils";

export interface PlasmaNewsletterProps {
  readonly onSubscribe?: (email: string) => Promise<void>;
  readonly placeholder?: string;
  readonly buttonText?: string;
  readonly className?: string;
}

/** PlasmaNewsletter — Inline newsletter subscription input with animated plasma border and state transitions. */
export const PlasmaNewsletter = React.forwardRef<HTMLFormElement, PlasmaNewsletterProps>(
  ({ className, onSubscribe, placeholder = "Enter your email", buttonText = "Subscribe", ...props }, ref) => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email) return;
      
      setStatus("submitting");
      try {
        if (onSubscribe) {
          await onSubscribe(email);
        } else {
          await new Promise(r => setTimeout(r, 1500));
        }
        setStatus("success");
        setTimeout(() => {
          setStatus("idle");
          setEmail("");
        }, 3000);
      } catch {
        setStatus("idle");
      }
    };

    return (
      <form ref={ref} {...props} onSubmit={handleSubmit} className={cn("relative group w-full max-w-md", className)}>
        {/* Animated Plasma Border */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-violet-500 via-cyan-400 to-violet-500 rounded-2xl opacity-30 group-hover:opacity-100 blur-sm group-hover:blur transition-all duration-500 bg-[length:200%_auto] animate-gradient-x" />
        
        <div className="relative flex items-center bg-zinc-950 p-1.5 rounded-2xl">
          <div className="pl-4 pr-2 text-zinc-500 shrink-0">
            <Sparkles size={16} className={cn(status === "success" && "text-emerald-400")} />
          </div>
          
          <input 
            type="email" 
            required 
            placeholder={placeholder}
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={status !== "idle"}
            className="flex-1 min-w-0 bg-transparent text-white placeholder:text-zinc-600 text-sm focus:outline-none py-2"
          />

          <button 
            type="submit"
            disabled={status !== "idle"}
            className="relative h-10 px-6 bg-white text-black text-sm font-semibold rounded-xl overflow-hidden hover:scale-105 active:scale-95 transition-all disabled:opacity-80 disabled:hover:scale-100"
          >
            <AnimatePresence mode="wait">
              {status === "idle" && (
                <motion.span key="idle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-1.5">
                  {buttonText} <Send size={14} />
                </motion.span>
              )}
              {status === "submitting" && (
                <motion.span key="submitting" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex items-center justify-center">
                  <Loader2 size={16} className="animate-spin" />
                </motion.span>
              )}
              {status === "success" && (
                <motion.span key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex items-center justify-center text-emerald-600">
                  <CheckCircle2 size={16} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </form>
    );
  }
);
PlasmaNewsletter.displayName = "PlasmaNewsletter";
