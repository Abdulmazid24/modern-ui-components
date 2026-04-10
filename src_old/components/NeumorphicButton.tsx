import React from 'react';
import type { ButtonHTMLAttributes } from 'react';

interface NeumorphicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const NeumorphicButton: React.FC<NeumorphicButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`neo-btn px-8 py-3 font-semibold tracking-wide flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
