"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Send, StopCircle } from "lucide-react";
import { cn } from "@/utils";

export interface ChatMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
    className?: string;
}

export const AICommsTerminal = React.forwardRef<any, ChatMessage>(({ className, initialMessages = [
            { id: "1", sender: "ai", text: "System initialized. How can I assist with the architecture today?" }
          ], ...props }, ref) => {
        const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
        const [inputVal, setInputVal] = useState("");
        const [isTyping, setIsTyping] = useState(false);
        const endRef = useRef<HTMLDivElement>(null);

        // Auto scroll
        useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
        }, [messages, isTyping]);

        const handleSend = () => {
        if (!inputVal.trim()) return;
        const userMsg: ChatMessage = { id: Date.now().toString(), sender: "user", text: inputVal };
        setMessages(prev => [...prev, userMsg]);
        setInputVal("");

        // Simulate AI thinking and replying
        setIsTyping(true);
        setTimeout(() => {
           const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), sender: "ai", text: "Processing your request. Querying data lakes and building parameters. Standby." };
           setMessages(prev => [...prev, aiMsg]);
           setIsTyping(false);
        }, 2000);
        };

        return (
        <div ref={ref} {...props} className={cn("w-full max-w-md h-[500px] bg-zinc-950 border border-zinc-900 rounded-3xl flex flex-col shadow-2xl overflow-hidden font-sans", className)}>
          
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-zinc-900 bg-zinc-900/50">
            <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">NEXUS AI</h3>
              <div className="flex items-center gap-1.5 opacity-80">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-emerald-500 text-[10px] font-bold tracking-widest uppercase">Online</span>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800">
            <AnimatePresence initial={false}>
              {messages.map((msg) => {
                const isAI = msg.sender === "ai";
                return (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    layout
                    className={`flex gap-3 max-w-[85%] ${isAI ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                  >
                    {/* Avatar */}
                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isAI ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'}`}>
                      {isAI ? <Bot size={14} /> : <User size={14} />}
                    </div>

                    {/* Bubble */}
                    <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${isAI ? 'bg-zinc-900 text-zinc-300 rounded-tl-sm' : 'bg-purple-600 text-white rounded-tr-sm shadow-[0_0_15px_rgba(147,51,234,0.3)]'}`}>
                      {msg.text}
                    </div>
                  </motion.div>
                );
              })}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex gap-3 max-w-[85%] mr-auto"
                >
                  <div className="shrink-0 w-8 h-8 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
                    <Bot size={14} />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-zinc-900 rounded-tl-sm flex items-center gap-1.5">
                     <motion.div className="w-1.5 h-1.5 bg-zinc-500 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                     <motion.div className="w-1.5 h-1.5 bg-zinc-500 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                     <motion.div className="w-1.5 h-1.5 bg-zinc-500 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={endRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-zinc-900/40 border-t border-zinc-900">
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-cyan-500/50 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors"
              />
              <button 
                onClick={isTyping ? undefined : handleSend}
                className={`absolute right-1.5 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${inputVal.trim() && !isTyping ? 'bg-cyan-500 text-black hover:bg-cyan-400' : 'bg-zinc-800 text-zinc-500'}`}
              >
                {isTyping ? <StopCircle size={16} /> : <Send size={16} className={inputVal.trim() ? "ml-0.5" : ""} />}
              </button>
            </div>
          </div>
        </div>
        );
        });
