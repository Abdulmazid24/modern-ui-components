"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Check, Settings2, Sparkles, X, Clock } from "lucide-react";
import { cn } from "../utils";

export interface NotificationItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly time: string;
  readonly isUnread?: boolean;
  readonly isPriority?: boolean; // AI grouped / context aware
  readonly icon?: React.ReactNode;
  readonly action?: { label: string; onClick: () => void };
}

export interface NeuralNotificationCenterProps {
  readonly notifications: readonly NotificationItem[];
  readonly onMarkAllRead?: () => void;
  readonly onClearAll?: () => void;
  readonly className?: string;
}

const PANEL_SPRING = { type: "spring", stiffness: 350, damping: 30 } as const;

/** NeuralNotificationCenter — Hyper-personalized notification hub with Priority tabs, unread badging, and action slots. */
export const NeuralNotificationCenter = React.forwardRef<HTMLDivElement, NeuralNotificationCenterProps>(
  ({ className, notifications, onMarkAllRead, onClearAll, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"priority" | "all">("priority");
    const containerRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter(n => n.isUnread).length;
    const priorityNotifications = notifications.filter(n => n.isPriority);
    
    const displayList = activeTab === "priority" ? priorityNotifications : notifications;

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
        {/* Trigger Button */}
        <button 
          ref={ref as any} {...props}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "relative p-2.5 rounded-full border transition-colors",
            isOpen ? "bg-violet-500/10 border-violet-500/30 text-violet-300" : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
          )}>
          <Bell size={20} className={cn(unreadCount > 0 && "animate-pulse")} />
          {unreadCount > 0 && (
            <span className="absolute 1 top-0 right-0 w-4 h-4 bg-violet-500 text-[10px] font-bold text-white flex items-center justify-center rounded-full border-2 border-zinc-950 translate-x-1/4 -translate-y-1/4">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {/* Dropdown Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="absolute right-0 top-full mt-3 w-80 sm:w-96 bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800 rounded-2xl z-50 shadow-2xl overflow-hidden flex flex-col"
              initial={{ opacity: 0, y: -10, scale: 0.95, transformOrigin: "top right" }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={PANEL_SPRING}>
              
              {/* Top Accent Line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent z-10" />

              {/* Header */}
              <div className="p-4 border-b border-zinc-800/50 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Notifications</h3>
                  <div className="flex items-center gap-2">
                    <button onClick={onMarkAllRead} className="p-1.5 text-zinc-500 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-colors" title="Mark all as read">
                      <Check size={16} />
                    </button>
                    <button className="p-1.5 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 rounded-lg transition-colors" title="Settings">
                      <Settings2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 bg-zinc-900/50 p-1 rounded-xl">
                  <button onClick={() => setActiveTab("priority")} className={cn("flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium rounded-lg transition-colors", activeTab === "priority" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300")}>
                    <Sparkles size={14} className={cn(activeTab === "priority" && "text-violet-400")} />
                    For You
                  </button>
                  <button onClick={() => setActiveTab("all")} className={cn("flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors", activeTab === "all" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300")}>
                    All Updates
                  </button>
                </div>
              </div>

              {/* List */}
              <div className="max-h-[400px] overflow-y-auto overflow-x-hidden p-2">
                <AnimatePresence initial={false}>
                  {displayList.length === 0 ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-700">
                        <Bell size={20} />
                      </div>
                      <p className="text-sm text-zinc-500">You're all caught up!</p>
                    </motion.div>
                  ) : (
                    displayList.map((item, idx) => (
                      <motion.div key={item.id}
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05, ...PANEL_SPRING }}
                        className={cn("relative p-3 rounded-xl mb-1 last:mb-0 transition-colors group flex gap-3", item.isUnread ? "bg-zinc-900/40 hover:bg-zinc-900/80" : "hover:bg-zinc-900/50")}>
                        
                        {/* Unread dot */}
                        {item.isUnread && <div className="absolute left-1 top-4 w-1.5 h-1.5 rounded-full bg-violet-500" />}

                        {/* Icon */}
                        <div className={cn("shrink-0 w-10 h-10 rounded-full flex items-center justify-center border", item.isPriority ? "bg-violet-500/10 border-violet-500/20 text-violet-400" : "bg-zinc-800 border-zinc-700 text-zinc-300")}>
                          {item.icon || <Bell size={16} />}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 pt-0.5">
                          <p className={cn("text-sm font-medium truncate", item.isUnread ? "text-white" : "text-zinc-300")}>{item.title}</p>
                          <p className="text-xs text-zinc-500 mt-0.5 line-clamp-2">{item.description}</p>
                          
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-[10px] text-zinc-600 flex items-center gap-1 font-mono uppercase tracking-wider">
                              <Clock size={10} /> {item.time}
                            </span>
                            {item.action && (
                              <button onClick={item.action.onClick} className="text-[11px] font-semibold text-violet-400 hover:text-violet-300 transition-colors">
                                {item.action.label}
                              </button>
                            )}
                          </div>
                        </div>

                        <button className="opacity-0 group-hover:opacity-100 absolute top-3 right-3 text-zinc-600 hover:text-zinc-400 transition-all">
                          <X size={14} />
                        </button>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="p-3 border-t border-zinc-800/50 bg-zinc-950/50">
                  <button onClick={onClearAll} className="w-full py-2 text-xs font-semibold text-zinc-500 hover:text-white transition-colors text-center rounded-lg hover:bg-zinc-900">
                    Clear all notifications
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
NeuralNotificationCenter.displayName = "NeuralNotificationCenter";
