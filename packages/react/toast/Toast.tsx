"use client";

import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertTriangle, Info, XCircle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  duration?: number;
}

interface ToastProps extends ToastMessage {
  onDismiss: (id: string) => void;
}

const icons = {
  success: <CheckCircle className="text-emerald-500" size={24} />,
  error: <XCircle className="text-rose-500" size={24} />,
  warning: <AlertTriangle className="text-amber-500" size={24} />,
  info: <Info className="text-blue-500" size={24} />
};

const backgrounds = {
  success: 'bg-emerald-500/10 border-emerald-500/20',
  error: 'bg-rose-500/10 border-rose-500/20',
  warning: 'bg-amber-500/10 border-amber-500/20',
  info: 'bg-blue-500/10 border-blue-500/20',
};

export const Toast: React.FC<ToastProps> = ({ id, type, title, message, duration = 5000, onDismiss }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Auto dismiss
    const timer = setTimeout(() => {
      handleClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsClosing(true);
    // Wait for slide-out animation
    setTimeout(() => onDismiss(id), 300);
  };

  return (
    <div
      className={`relative w-80 p-4 mb-3 rounded-2xl shadow-lg border backdrop-blur-xl flex items-start gap-4 transition-all duration-300 transform ${backgrounds[type]} ${
        isClosing ? 'translate-x-full opacity-0' : 'animate-slide-in-right opacity-100'
      }`}
    >
      <div className="shrink-0 mt-0.5">
        {icons[type]}
      </div>
      
      <div className="flex-1">
        <h4 className="text-slate-800 font-semibold text-sm mb-1">{title}</h4>
        <p className="text-slate-600 text-sm leading-relaxed">{message}</p>
      </div>

      <button
        onClick={handleClose}
        className="shrink-0 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-200/50"
      >
        <X size={16} />
      </button>

      {/* Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 h-1 bg-black/10 rounded-b-2xl"
        style={{
          width: '100%',
          animation: `toast-progress ${duration}ms linear forwards`
        }}
      />
    </div>
  );
};
