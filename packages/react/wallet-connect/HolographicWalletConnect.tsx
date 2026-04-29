"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Wallet, ShieldCheck, Zap, Globe, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WalletOption {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  color: string;
}

export interface HolographicWalletConnectProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  onConnect?: (wallet: WalletOption) => void;
}

const WALLETS: WalletOption[] = [
  { id: "metamask", name: "MetaMask", icon: Globe, description: "Connect to your MetaMask wallet", color: "from-orange-500 to-yellow-500" },
  { id: "coinbase", name: "Coinbase", icon: ShieldCheck, description: "Secure connection via Coinbase", color: "from-blue-600 to-blue-400" },
  { id: "phantom", name: "Phantom", icon: Zap, description: "Solana's premier wallet solution", color: "from-purple-600 to-indigo-600" },
  { id: "ledger", name: "Ledger", icon: Cpu, description: "Hardware-grade security link", color: "from-zinc-600 to-zinc-400" },
];

export const HolographicWalletConnect = React.forwardRef<HTMLDivElement, HolographicWalletConnectProps>(
  ({ isOpen, onClose, onConnect, className, ...props }, ref) => {
    const [connectingId, setConnectingId] = useState<string | null>(null);

    const handleConnect = (wallet: WalletOption) => {
      setConnectingId(wallet.id);
      setTimeout(() => {
        if (onConnect) onConnect(wallet);
        setConnectingId(null);
        onClose();
      }, 2500);
    };

    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              className="absolute inset-0 bg-black/40"
              onClick={onClose}
            />

            {/* Modal */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={cn(
                "relative w-full max-w-md bg-zinc-950/80 border border-zinc-800/50 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)]",
                className
              )}
              {...props}
            >
              {/* Holographic Background Effect */}
              <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 via-transparent to-cyan-500/20" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
              </div>

              <div className="relative p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                      <Wallet className="w-6 h-6 text-violet-400" />
                      Connect Wallet
                    </h2>
                    <p className="text-zinc-500 text-sm mt-1">Select your portal to the decentralized web</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 bg-zinc-900/50 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Wallet List */}
                <div className="space-y-3">
                  {WALLETS.map((wallet) => (
                    <motion.button
                      key={wallet.id}
                      onClick={() => handleConnect(wallet)}
                      disabled={!!connectingId}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "relative w-full group p-4 rounded-3xl border transition-all duration-500 flex items-center gap-4 text-left overflow-hidden",
                        connectingId === wallet.id
                          ? "bg-violet-500/20 border-violet-500/50"
                          : "bg-zinc-900/40 border-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-900/60"
                      )}
                    >
                      {/* Icon Container with Holographic Foil */}
                      <div className={cn(
                        "relative w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br shadow-inner",
                        wallet.color
                      )}>
                        <div className="absolute inset-0 opacity-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                        <wallet.icon className="w-6 h-6 text-white relative z-10" />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg">{wallet.name}</h3>
                        <p className="text-zinc-500 text-xs">{wallet.description}</p>
                      </div>

                      {/* Connecting State */}
                      <AnimatePresence>
                        {connectingId === wallet.id && (
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2"
                          >
                            <div className="w-4 h-4 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
                    </motion.button>
                  ))}
                </div>

                {/* Footer Info */}
                <div className="mt-8 pt-6 border-t border-zinc-800/50 flex items-center gap-3 justify-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <p className="text-xs text-zinc-500">Your keys never leave your device. Multi-sig verified.</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }
);

HolographicWalletConnect.displayName = "HolographicWalletConnect";
