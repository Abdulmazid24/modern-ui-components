"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StockTickerItem {
  symbol: string;
  price: number;
  change: number;
    className?: string;
}

export interface StockTickerProps {
  items?: StockTickerItem[];
  speed?: number;
    className?: string;
}

export const StockTicker = React.forwardRef<any, StockTickerProps>(({ className, items = [
            { symbol: "BTC", price: 64230.50, change: 2.4 },
            { symbol: "ETH", price: 3450.20, change: 1.2 },
            { symbol: "SOL", price: 145.80, change: -0.5 },
            { symbol: "NVDA", price: 950.10, change: 5.8 },
            { symbol: "AAPL", price: 175.40, change: -1.2 },
            { symbol: "MSFT", price: 420.69, change: 1.1 }
          ], speed = 20, ...props }, ref) => {
        // We duplicate the array to create a seamless infinite marquee effect
        const duplicatedItems = [...items, ...items];

        return (
        <div ref={ref} {...props} className={cn("w-full max-w-4xl bg-black border-y border-zinc-900 shadow-[inset_0_0_20px_rgba(0,0,0,1)] overflow-hidden flex items-center h-16 relative", className)}>
          
          {/* Side Gradients for seamless fade */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-black to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-black to-transparent" />

          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: speed, repeat: Infinity }}
          >
            {duplicatedItems.map((item, idx) => {
              const isPositive = item.change >= 0;
              return (
                <div key={idx} className="flex items-center gap-4 px-8 border-r border-zinc-800/50">
                   <span className="text-white font-bold tracking-widest">{item.symbol}</span>
                   <span className="text-zinc-400 font-mono">${item.price.toFixed(2)}</span>
                   <span className={`flex items-center gap-1 font-bold text-sm ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                     {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                     {Math.abs(item.change)}%
                   </span>
                </div>
              );
            })}
          </motion.div>
        </div>
        );
        });
