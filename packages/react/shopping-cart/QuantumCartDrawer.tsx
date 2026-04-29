"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  options?: string;
}

export interface QuantumCartDrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity?: (id: string, newQuantity: number) => void;
  onRemoveItem?: (id: string) => void;
  onCheckout?: () => void;
  currency?: string;
}

export const QuantumCartDrawer = React.forwardRef<HTMLDivElement, QuantumCartDrawerProps>(
  (
    {
      isOpen,
      onClose,
      items = [],
      onUpdateQuantity,
      onRemoveItem,
      onCheckout,
      currency = "$",
      className,
      ...props
    },
    ref
  ) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const drawerRef = useRef<HTMLDivElement>(null);

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Mouse tracking for fluid glass effect
    const handleMouseMove = (e: React.MouseEvent) => {
      if (!drawerRef.current) return;
      const rect = drawerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    // Lock body scroll when open
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
      return () => {
        document.body.style.overflow = "unset";
      };
    }, [isOpen]);

    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end" aria-modal="true" role="dialog">
            {/* Backdrop with dimensional blur */}
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-black/40"
              onClick={onClose}
            />

            {/* Drawer */}
            <motion.div
              ref={ref}
              initial={{ x: "100%", opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: "100%", opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={cn(
                "relative z-10 w-full max-w-md h-full flex flex-col overflow-hidden",
                "bg-zinc-950/80 border-l border-zinc-800/50",
                className
              )}
              {...props}
            >
              {/* Internal Glassmorphism Refraction Layer */}
              <div
                ref={drawerRef}
                onMouseMove={handleMouseMove}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.1), transparent 40%)`,
                }}
              />
              
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />

              {/* Header */}
              <div className="relative flex items-center justify-between p-6 border-b border-zinc-800/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-violet-500/10 rounded-lg border border-violet-500/20">
                    <ShoppingBag className="w-5 h-5 text-violet-400" />
                  </div>
                  <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                    Cart
                  </h2>
                  <span className="px-2 py-0.5 text-xs font-semibold bg-violet-500 text-white rounded-full">
                    {items.length}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="relative flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                <AnimatePresence initial={false}>
                  {items.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="h-full flex flex-col items-center justify-center text-center space-y-4"
                    >
                      <div className="w-24 h-24 rounded-full bg-zinc-900/50 border border-zinc-800 flex items-center justify-center">
                        <ShoppingBag className="w-10 h-10 text-zinc-600" />
                      </div>
                      <p className="text-zinc-400">Your cart is traversing the void.</p>
                    </motion.div>
                  ) : (
                    items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -50, scale: 0.9 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="group relative flex gap-4 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 hover:bg-zinc-900/60 hover:border-violet-500/30 transition-all"
                      >
                        {/* Item Image with Holographic Hover */}
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-zinc-950 flex-shrink-0">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900" />
                          )}
                          <div className="absolute inset-0 bg-violet-500/0 group-hover:bg-violet-500/10 transition-colors duration-300" />
                        </div>

                        {/* Item Details */}
                        <div className="flex flex-col flex-1 justify-between">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                                {item.name}
                              </h3>
                              {item.options && (
                                <p className="text-xs text-zinc-500 mt-1">{item.options}</p>
                              )}
                            </div>
                            <button
                              onClick={() => onRemoveItem?.(item.id)}
                              className="text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <p className="text-sm font-medium text-violet-300">
                              {currency}{(item.price * item.quantity).toFixed(2)}
                            </p>
                            
                            {/* Quantum Quantity Controls */}
                            <div className="flex items-center gap-2 p-1 rounded-lg bg-zinc-950 border border-zinc-800">
                              <button
                                onClick={() => onUpdateQuantity?.(item.id, Math.max(1, item.quantity - 1))}
                                className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-medium w-4 text-center text-zinc-200">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                                className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              {/* Footer / Checkout */}
              {items.length > 0 && (
                <div className="relative p-6 border-t border-zinc-800/50 bg-zinc-950/50 backdrop-blur-md">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-zinc-400 text-sm">Subtotal</span>
                    <span className="text-xl font-bold text-white">
                      {currency}{subtotal.toFixed(2)}
                    </span>
                  </div>
                  
                  <button
                    onClick={onCheckout}
                    className="relative w-full group overflow-hidden rounded-xl bg-white text-black font-semibold py-4 transition-transform active:scale-[0.98]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Initialize Checkout
                      <motion.span
                        className="inline-block"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        →
                      </motion.span>
                    </span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }
);

QuantumCartDrawer.displayName = "QuantumCartDrawer";
