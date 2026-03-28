import React from 'react';

interface NeumorphicCardProps {
  children: React.ReactNode;
  className?: string;
}

export const NeumorphicCard: React.FC<NeumorphicCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`neo-card p-10 w-full max-w-md mx-auto text-center flex flex-col items-center ${className}`}>
      {children}
    </div>
  );
};
