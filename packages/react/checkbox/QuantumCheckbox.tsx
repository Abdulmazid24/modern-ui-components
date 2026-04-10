"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

export interface QuantumCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
}

export const QuantumCheckbox: React.FC<QuantumCheckboxProps> = ({
  checked = false,
  onChange,
  label
}) => {
  const [internalChecked, setInternalChecked] = useState(checked);
  const isChecked = onChange ? checked : internalChecked;

  const toggle = () => {
    const newVal = !isChecked;
    setInternalChecked(newVal);
    onChange?.(newVal);
  };

  // Generate 12 random particles for the explosion
  const numParticles = 12;
  const particles = Array.from({ length: numParticles }).map((_, i) => {
    const angle = (i / numParticles) * Math.PI * 2;
    // Explode outward up to 30px
    const distance = 25 + Math.random() * 15;
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      scale: Math.random() * 0.8 + 0.2,
    };
  });

  return (
    <div className="flex items-center gap-4 cursor-pointer group" onClick={toggle}>
      <div className="relative w-8 h-8 flex items-center justify-center">
        {/* The Box itself */}
        <motion.div
          animate={{
            scale: isChecked ? 1 : 1,
            rotate: isChecked ? 180 : 0,
            borderRadius: isChecked ? "50%" : "25%",
            backgroundColor: isChecked ? "#10b981" : "transparent",
            borderColor: isChecked ? "#10b981" : "#3f3f46",
          }}
          transition={{ duration: 0.3, type: "spring" }}
          className="absolute inset-0 border-2 rounded-lg"
        />

        {/* The Checkmark */}
        <AnimatePresence>
          {isChecked && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
              className="relative z-10 text-black"
            >
              <Check size={18} strokeWidth={4} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Quantum Particles (Explosion) */}
        <AnimatePresence>
          {isChecked && (
            <div className="absolute inset-0 pointer-events-none">
              {particles.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                  animate={{ 
                    x: p.x, 
                    y: p.y, 
                    scale: p.scale, 
                    opacity: 0,
                    rotate: Math.random() * 180
                  }}
                  transition={{ 
                    duration: 0.6, 
                    ease: "easeOut" 
                  }}
                  className="absolute top-1/2 left-1/2 w-2 h-2 -ml-1 -mt-1 bg-emerald-400 rounded-sm"
                  style={{
                    boxShadow: "0 0 10px rgba(52, 211, 153, 0.8)"
                  }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {label && (
        <span className={`font-medium transition-colors ${isChecked ? 'text-zinc-200' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
          {label}
        </span>
      )}
    </div>
  );
};
