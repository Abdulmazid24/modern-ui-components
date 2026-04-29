"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Command, CornerDownLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export interface OmniAICopilotProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "bottom-right" | "bottom-left";
  title?: string;
  assistantName?: string;
}

export const OmniAICopilot = React.forwardRef<HTMLDivElement, OmniAICopilotProps>(
  ({ className, position = "bottom-right", title = "Omni Copilot", assistantName = "Nexus", ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
      { role: "ai", text: `I am ${assistantName}. How can I manipulate the DOM or bend space-time for you today?` }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
      scrollToBottom();
    }, [messages, isThinking]);

    const handleSend = () => {
      if (!inputValue.trim()) return;
      setMessages(prev => [...prev, { role: "user", text: inputValue }]);
      setInputValue("");
      setIsThinking(true);

      // Simulate AI response
      setTimeout(() => {
        setIsThinking(false);
        setMessages(prev => [...prev, { role: "ai", text: "Analyzing semantic context... The probability of success is 99.9%. Action executed." }]);
      }, 2500);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "fixed z-50 flex flex-col items-end",
          position === "bottom-right" ? "bottom-6 right-6" : "bottom-6 left-6",
          className
        )}
        {...props}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="mb-4 w-[380px] h-[500px] flex flex-col rounded-3xl overflow-hidden border border-zinc-800/50 bg-zinc-950/80 backdrop-blur-2xl shadow-[0_10px_40px_-10px_rgba(139,92,246,0.3)] origin-bottom-right"
            >
              {/* Header */}
              <div className="relative flex items-center justify-between p-4 border-b border-zinc-800/50 bg-gradient-to-r from-zinc-900/50 to-zinc-950/50">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/30 overflow-hidden">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-400 opacity-50 blur-[4px]"
                    />
                    <Sparkles className="w-4 h-4 text-violet-300 relative z-10" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{title}</h3>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider">System Online</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex max-w-[85%]",
                      msg.role === "user" ? "ml-auto justify-end" : "mr-auto justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "p-3 rounded-2xl text-sm leading-relaxed",
                        msg.role === "user"
                          ? "bg-violet-600 text-white rounded-br-sm"
                          : "bg-zinc-800/50 text-zinc-200 rounded-bl-sm border border-zinc-700/50"
                      )}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                
                {/* Generative Thinking State */}
                <AnimatePresence>
                  {isThinking && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex mr-auto max-w-[85%]"
                    >
                      <div className="p-3 rounded-2xl bg-zinc-800/30 border border-zinc-700/30 rounded-bl-sm flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="w-4 h-4 text-violet-400" />
                        </motion.div>
                        <span className="text-xs text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 font-medium animate-pulse">
                          Synthesizing logic...
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-zinc-950 border-t border-zinc-800/50">
                <div className="relative flex items-center bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden focus-within:border-violet-500/50 focus-within:ring-1 focus-within:ring-violet-500/50 transition-all">
                  <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask Omni anything..."
                    className="flex-1 bg-transparent border-none text-sm text-white px-4 py-3 focus:outline-none focus:ring-0 placeholder:text-zinc-600"
                  />
                  <div className="pr-2 flex items-center gap-1">
                    <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 text-[10px] font-mono text-zinc-400">
                      <Command className="w-3 h-3" /> <CornerDownLeft className="w-3 h-3" />
                    </kbd>
                    <button
                      onClick={handleSend}
                      disabled={!inputValue.trim() || isThinking}
                      className="p-2 text-violet-400 hover:text-violet-300 disabled:opacity-50 disabled:hover:text-violet-400 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Orb Trigger */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="relative w-14 h-14 rounded-full flex items-center justify-center focus:outline-none group shadow-[0_0_20px_rgba(139,92,246,0.3)]"
          whileTap={{ scale: 0.9 }}
        >
          {/* Animated Blob Background */}
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isOpen ? 180 : 0,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-500 overflow-hidden"
          >
             <motion.div 
                className="absolute inset-0 bg-white mix-blend-overlay"
                animate={{
                  opacity: isHovered ? [0.2, 0.5, 0.2] : 0.1,
                }}
                transition={{ duration: 2, repeat: Infinity }}
             />
          </motion.div>
          
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative z-10 text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
          </motion.div>
        </motion.button>
      </div>
    );
  }
);

OmniAICopilot.displayName = "OmniAICopilot";
