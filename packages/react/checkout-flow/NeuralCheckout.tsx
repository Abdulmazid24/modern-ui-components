"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Truck, CheckCircle2, ChevronRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NeuralCheckoutProps extends React.HTMLAttributes<HTMLDivElement> {
  onComplete?: (data: any) => void;
  amount?: number;
  currency?: string;
}

const STEPS = [
  { id: 1, title: "Shipping", icon: Truck },
  { id: 2, title: "Payment", icon: CreditCard },
  { id: 3, title: "Confirm", icon: CheckCircle2 },
];

export const NeuralCheckout = React.forwardRef<HTMLDivElement, NeuralCheckoutProps>(
  ({ className, onComplete, amount = 299.99, currency = "$", ...props }, ref) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
      name: "",
      address: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    });
    
    // 3D Card state
    const [isCardFlipped, setIsCardFlipped] = useState(false);
    const [cardMousePos, setCardMousePos] = useState({ x: 0, y: 0 });
    const cardRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const nextStep = () => {
      if (currentStep < 3) setCurrentStep(currentStep + 1);
      if (currentStep === 2 && onComplete) onComplete(formData);
    };

    // Card Tilt Effect
    const handleCardMouseMove = (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 10;
      const y = -(e.clientY - rect.top - rect.height / 2) / 10;
      setCardMousePos({ x, y });
    };

    const handleCardMouseLeave = () => {
      setCardMousePos({ x: 0, y: 0 });
    };

    return (
      <div ref={ref} className={cn("w-full max-w-4xl mx-auto p-6", className)} {...props}>
        {/* Stepper Header */}
        <div className="relative flex items-center justify-between mb-12">
          {/* Background Neural Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-zinc-800 -translate-y-1/2 z-0 rounded-full overflow-hidden">
             <motion.div 
               className="h-full bg-gradient-to-r from-violet-500 to-cyan-400"
               initial={{ width: "0%" }}
               animate={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
               transition={{ type: "spring", stiffness: 50, damping: 20 }}
             />
          </div>

          {STEPS.map((step, idx) => {
            const isActive = currentStep === step.id;
            const isPast = currentStep > step.id;
            const Icon = step.icon;

            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                <motion.div
                  animate={{
                    backgroundColor: isActive || isPast ? "#18181b" : "#09090b",
                    borderColor: isActive ? "#8b5cf6" : isPast ? "#10b981" : "#27272a",
                    color: isActive ? "#a78bfa" : isPast ? "#34d399" : "#71717a",
                    scale: isActive ? 1.1 : 1,
                  }}
                  className="w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-colors duration-500 shadow-[0_0_15px_rgba(0,0,0,0.5)] bg-zinc-950"
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <span className={cn(
                  "text-xs font-bold uppercase tracking-wider transition-colors",
                  isActive ? "text-violet-400" : isPast ? "text-emerald-400" : "text-zinc-500"
                )}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800/50 bg-zinc-950/50 backdrop-blur-xl shadow-2xl min-h-[400px]">
          {/* Subtle noise texture */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay" />
          
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "anticipate" }}
                className="p-8 md:p-12"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Shipping Destination</h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Full Name</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Hyper-Routing Address</label>
                    <input
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors"
                      placeholder="123 Nebula Sector, Alpha Centauri"
                    />
                  </div>
                  <button
                    onClick={nextStep}
                    className="mt-8 w-full flex items-center justify-center gap-2 bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors"
                  >
                    Proceed to Payment <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "anticipate" }}
                className="p-8 md:p-12 flex flex-col md:flex-row gap-12"
              >
                {/* 3D Card Visualizer */}
                <div className="w-full md:w-1/2 perspective-[1000px] flex items-center justify-center">
                  <motion.div
                    ref={cardRef}
                    onMouseMove={handleCardMouseMove}
                    onMouseLeave={handleCardMouseLeave}
                    animate={{
                      rotateX: isCardFlipped ? 0 : cardMousePos.y,
                      rotateY: isCardFlipped ? 180 : cardMousePos.x,
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="w-[320px] h-[200px] relative preserve-3d cursor-pointer"
                  >
                    {/* Front of Card */}
                    <div className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-rose-600 p-6 flex flex-col justify-between shadow-2xl border border-white/10 overflow-hidden">
                       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
                       <div className="flex justify-between items-center relative z-10">
                          <svg className="w-10 h-10 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4Z" /></svg>
                          <Lock className="w-5 h-5 text-white/50" />
                       </div>
                       <div className="relative z-10">
                          <p className="text-white/80 text-xs uppercase tracking-widest mb-1">Card Number</p>
                          <p className="text-white font-mono text-xl tracking-[0.2em] shadow-sm">
                            {formData.cardNumber || "•••• •••• •••• ••••"}
                          </p>
                       </div>
                       <div className="flex justify-between relative z-10">
                          <div>
                            <p className="text-white/50 text-[10px] uppercase tracking-wider">Cardholder</p>
                            <p className="text-white text-sm font-medium tracking-wide">{formData.name || "YOUR NAME"}</p>
                          </div>
                          <div>
                            <p className="text-white/50 text-[10px] uppercase tracking-wider">Expires</p>
                            <p className="text-white text-sm font-medium tracking-wide">{formData.expiry || "MM/YY"}</p>
                          </div>
                       </div>
                    </div>

                    {/* Back of Card */}
                    <div 
                      className="absolute inset-0 backface-hidden rounded-2xl bg-zinc-800 p-6 shadow-2xl border border-zinc-700 overflow-hidden flex flex-col justify-center"
                      style={{ transform: "rotateY(180deg)" }}
                    >
                      <div className="absolute top-6 left-0 w-full h-12 bg-black" />
                      <div className="relative z-10 mt-4 flex items-center justify-end bg-white h-10 px-4 rounded">
                        <span className="font-mono text-black text-lg italic">{formData.cvv || "•••"}</span>
                      </div>
                      <p className="text-zinc-500 text-[10px] mt-4 text-center">Authorized Signature Not Required</p>
                    </div>
                  </motion.div>
                </div>

                {/* Form Input */}
                <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6">
                   <h2 className="text-2xl font-bold text-white mb-2">Secure Payment</h2>
                   <div className="space-y-4">
                     <input
                       name="cardNumber"
                       value={formData.cardNumber}
                       onChange={handleInputChange}
                       onFocus={() => setIsCardFlipped(false)}
                       maxLength={19}
                       className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white font-mono focus:outline-none focus:border-violet-500 transition-colors"
                       placeholder="Card Number"
                     />
                     <div className="flex gap-4">
                        <input
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          onFocus={() => setIsCardFlipped(false)}
                          maxLength={5}
                          className="w-1/2 bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white font-mono focus:outline-none focus:border-violet-500 transition-colors"
                          placeholder="MM/YY"
                        />
                        <input
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          onFocus={() => setIsCardFlipped(true)}
                          onBlur={() => setIsCardFlipped(false)}
                          maxLength={3}
                          type="password"
                          className="w-1/2 bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white font-mono focus:outline-none focus:border-violet-500 transition-colors"
                          placeholder="CVV"
                        />
                     </div>
                     <button
                        onClick={nextStep}
                        className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                      >
                        <Lock className="w-4 h-4" /> Pay {currency}{amount}
                      </button>
                   </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="p-12 flex flex-col items-center justify-center text-center min-h-[400px]"
              >
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                  </motion.div>
                  {/* Confetti particles */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-emerald-400"
                      initial={{ x: 0, y: 0, opacity: 1 }}
                      animate={{
                        x: Math.cos(i * 60 * (Math.PI / 180)) * 100,
                        y: Math.sin(i * 60 * (Math.PI / 180)) * 100,
                        opacity: 0
                      }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                    />
                  ))}
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-2">Payment Successful</h2>
                <p className="text-zinc-400 max-w-md">
                  Your quantum transaction has been verified. The items will be materialized at your location shortly.
                </p>
                
                <div className="mt-8 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 w-full max-w-sm flex justify-between items-center">
                   <span className="text-sm text-zinc-500">Order ID</span>
                   <span className="text-sm font-mono text-zinc-300">#NRL-8492-XYZ</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }
);

NeuralCheckout.displayName = "NeuralCheckout";
