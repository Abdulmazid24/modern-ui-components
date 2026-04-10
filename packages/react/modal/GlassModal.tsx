"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

export interface GlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const GlassModal: React.FC<GlassModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Small delay so the DOM is rendered before animation class triggers
      setIsVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.body.style.overflow = 'hidden';
        });
      });
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    document.body.style.overflow = '';
    setTimeout(() => {
      setIsClosing(false);
      setIsVisible(false);
      onClose();
    }, 500); // Match the CSS exit animation duration
  }, [onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isClosing) handleClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, isClosing, handleClose]);

  if (!isOpen && !isVisible) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  };

  return (
    <div className={`glass-modal-overlay ${isClosing ? 'closing' : 'opening'}`}>
      {/* Distortion Backdrop */}
      <div
        className="glass-modal-backdrop"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Animated Particles */}
      <div className="glass-modal-particles" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="glass-particle"
            style={{
              '--particle-x': `${Math.random() * 100}%`,
              '--particle-y': `${Math.random() * 100}%`,
              '--particle-delay': `${Math.random() * 2}s`,
              '--particle-duration': `${2 + Math.random() * 3}s`,
              '--particle-size': `${2 + Math.random() * 4}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Modal Card */}
      <div
        className={`glass-modal-card ${sizeClasses[size]} ${isClosing ? 'exit' : 'enter'}`}
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Modal dialog'}
      >
        {/* Animated border glow */}
        <div className="glass-modal-border-glow" />

        {/* Inner content */}
        <div className="glass-modal-inner">
          {/* Header */}
          {title && (
            <div className="glass-modal-header">
              <h2 className="glass-modal-title">{title}</h2>
              <button
                onClick={handleClose}
                className="glass-modal-close"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
          )}

          {/* Body */}
          <div className="glass-modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
