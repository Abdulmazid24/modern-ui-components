import React, { useState, useRef, useCallback } from 'react';

export interface AuroraInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  inputSize?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const AuroraInput: React.FC<AuroraInputProps> = ({
  label,
  helperText,
  error,
  inputSize = 'md',
  icon,
  className = '',
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const sizeClasses = {
    sm: 'aurora-input-sm',
    md: 'aurora-input-md',
    lg: 'aurora-input-lg',
  };

  const hasError = !!error;

  return (
    <div className="aurora-input-group">
      {label && (
        <label className="aurora-label">{label}</label>
      )}

      <div
        ref={wrapperRef}
        className={`aurora-input-wrapper ${isFocused ? 'focused' : ''} ${hasError ? 'error' : ''}`}
        onMouseMove={handleMouseMove}
        style={{
          '--mouse-x': `${mousePos.x}%`,
          '--mouse-y': `${mousePos.y}%`,
        } as React.CSSProperties}
      >
        {/* Aurora Gradient Border Layer */}
        <div className="aurora-border-layer" />

        {/* Input container */}
        <div className={`aurora-input-inner ${sizeClasses[inputSize]}`}>
          {icon && <span className="aurora-input-icon">{icon}</span>}
          <input
            className={`aurora-input-field ${className}`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...rest}
          />
        </div>
      </div>

      {(helperText || error) && (
        <p className={`aurora-helper ${hasError ? 'aurora-error-text' : ''}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

/* ──────────────────────────────────────────────
   Aurora Textarea
   ────────────────────────────────────────────── */

export interface AuroraTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const AuroraTextarea: React.FC<AuroraTextareaProps> = ({
  label,
  helperText,
  error,
  className = '',
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const hasError = !!error;

  return (
    <div className="aurora-input-group">
      {label && <label className="aurora-label">{label}</label>}

      <div
        ref={wrapperRef}
        className={`aurora-input-wrapper ${isFocused ? 'focused' : ''} ${hasError ? 'error' : ''}`}
        onMouseMove={handleMouseMove}
        style={{
          '--mouse-x': `${mousePos.x}%`,
          '--mouse-y': `${mousePos.y}%`,
        } as React.CSSProperties}
      >
        <div className="aurora-border-layer" />
        <div className="aurora-input-inner aurora-textarea-inner">
          <textarea
            className={`aurora-textarea-field ${className}`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...rest}
          />
        </div>
      </div>

      {(helperText || error) && (
        <p className={`aurora-helper ${hasError ? 'aurora-error-text' : ''}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};
