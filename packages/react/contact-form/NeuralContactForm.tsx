"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "../utils";

export interface NeuralContactFormProps {
  readonly onSubmit?: (data: { name: string; email: string; message: string }) => Promise<void>;
  readonly title?: string;
  readonly description?: string;
  readonly className?: string;
}

/** NeuralContactForm — Pre-built contact form with validation, submitting states, and holographic input fields. */
export const NeuralContactForm = React.forwardRef<HTMLFormElement, NeuralContactFormProps>(
  ({ className, onSubmit, title = "Get in touch", description = "We'd love to hear from you. Send us a message.", ...props }, ref) => {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.name || !formData.email || !formData.message) return;
      
      setStatus("submitting");
      try {
        if (onSubmit) {
          await onSubmit(formData);
        } else {
          // Mock delay
          await new Promise(r => setTimeout(r, 1500));
        }
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
      } catch (err) {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    };

    const inputClasses = "w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 focus:bg-zinc-900 focus:shadow-[0_0_15px_rgba(139,92,246,0.1)] transition-all";

    return (
      <form ref={ref} {...props} onSubmit={handleSubmit} className={cn("w-full max-w-md mx-auto relative p-8 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl", className)}>
        {/* Background glow */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
        
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-zinc-400 text-sm">{description}</p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="sr-only">Name</label>
            <input 
              id="name" type="text" required placeholder="Name" 
              value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
              className={inputClasses} disabled={status === "submitting" || status === "success"}
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input 
              id="email" type="email" required placeholder="Email address" 
              value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
              className={inputClasses} disabled={status === "submitting" || status === "success"}
            />
          </div>
          <div>
            <label htmlFor="message" className="sr-only">Message</label>
            <textarea 
              id="message" required rows={4} placeholder="Your message..." 
              value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
              className={cn(inputClasses, "resize-none")} disabled={status === "submitting" || status === "success"}
            />
          </div>

          <button 
            type="submit" 
            disabled={status === "submitting" || status === "success"}
            className="group relative w-full flex items-center justify-center gap-2 py-3.5 bg-white text-black font-semibold rounded-xl overflow-hidden hover:scale-[1.02] transition-transform active:scale-95 disabled:opacity-70 disabled:hover:scale-100"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity" />
            
            <AnimatePresence mode="wait">
              {status === "idle" && (
                <motion.span key="idle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2">
                  Send Message <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </motion.span>
              )}
              {status === "submitting" && (
                <motion.span key="submitting" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                  <Loader2 size={18} className="animate-spin" />
                </motion.span>
              )}
              {status === "success" && (
                <motion.span key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex items-center gap-2 text-emerald-600">
                  <CheckCircle2 size={18} /> Sent Successfully
                </motion.span>
              )}
              {status === "error" && (
                <motion.span key="error" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="text-red-600">
                  Failed to send
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </form>
    );
  }
);
NeuralContactForm.displayName = "NeuralContactForm";
