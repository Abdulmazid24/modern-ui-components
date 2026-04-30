"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from "lucide-react";
import { cn } from "../utils";

export interface HolographicMessageProps {
  readonly id: string;
  readonly type?: "info" | "success" | "warning" | "error";
  readonly content: React.ReactNode;
  readonly duration?: number; // 0 for persistent
  readonly onClose: (id: string) => void;
  readonly className?: string;
}

const TYPE_CONFIG = {
  info: { icon: Info, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  success: { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  warning: { icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  error: { icon: XCircle, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" },
} as const;

/** HolographicMessage — Floating global message bar with auto-dismiss and neon glass styling. Designed to be rendered in a fixed portal at the top of the screen. */
export const HolographicMessage = React.forwardRef<HTMLDivElement, HolographicMessageProps>(
  ({ className, id, type = "info", content, duration = 3000, onClose, ...props }, ref) => {
    const config = TYPE_CONFIG[type];
    const Icon = config.icon;

    useEffect(() => {
      if (duration <= 0) return;
      const timer = setTimeout(() => onClose?.(id), duration);
      return () => clearTimeout(timer);
    }, [id, duration, onClose]);

    return (
      <motion.div ref={ref} {...props}
        layout
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={cn(
          "pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-xl border shadow-2xl max-w-md w-full mx-auto",
          config.bg, config.border, className
        )}>
        <Icon size={18} className={cn("shrink-0", config.color)} />
        <div className="flex-1 text-sm text-zinc-200">{content}</div>
        <button onClick={() => onClose?.(id)} className="shrink-0 p-1 rounded-md hover:bg-white/10 text-zinc-500 hover:text-zinc-300 transition-colors">
          <X size={14} />
        </button>
      </motion.div>
    );
  }
);
HolographicMessage.displayName = "HolographicMessage";

export interface MessageProviderProps {
  readonly children: React.ReactNode;
}

// Simple context-less manager for demo purposes. In real app, use Zustand/Context.
let messageIdCounter = 0;
export const messageAPI = {
  // Overridden by provider
  show: (content: React.ReactNode, type?: "info" | "success" | "warning" | "error", duration?: number) => {},
};

export const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Array<Omit<HolographicMessageProps, "onClose">>>([]);

  const addMessage = (content: React.ReactNode, type: "info" | "success" | "warning" | "error" = "info", duration = 3000) => {
    const id = `msg_${messageIdCounter++}`;
    setMessages(prev => [...prev, { id, content, type, duration }]);
  };

  const removeMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  useEffect(() => {
    messageAPI.show = addMessage;
  }, []);

  return (
    <>
      {children}
      <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none p-4 flex flex-col gap-2 items-center">
        <AnimatePresence mode="popLayout">
          {messages.map(msg => (
            <HolographicMessage key={msg.id} {...msg} onClose={removeMessage} />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};
