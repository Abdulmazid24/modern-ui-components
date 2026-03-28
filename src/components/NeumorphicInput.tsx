import React from 'react';
import type { InputHTMLAttributes } from 'react';

interface NeumorphicInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const NeumorphicInput: React.FC<NeumorphicInputProps> = ({ icon, className = '', ...props }) => {
  return (
    <div className={`relative w-full ${className}`}>
      <input
        className="neo-input w-full px-5 py-4 focus:outline-none placeholder-gray-500 font-medium tracking-wide transition-all"
        {...props}
      />
      {icon && (
        <div className="absolute inset-y-0 right-5 flex items-center justify-center text-gray-500">
          {icon}
        </div>
      )}
    </div>
  );
};
