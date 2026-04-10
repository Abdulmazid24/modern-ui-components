"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */

type UploadState = 'idle' | 'uploading' | 'complete';

export interface UploadButtonProps {
  /** Label text */
  label?: string;
  /** Complete text */
  completeLabel?: string;
  /** Button width in px */
  width?: number;
  /** Button height in px */
  height?: number;
  /** Border radius in px */
  borderRadius?: number;
  /** Primary color */
  color?: string;
  /** Background color */
  bgColor?: string;
  /** Upload duration simulation in ms */
  uploadDuration?: number;
  /** Callback when upload starts */
  onUpload?: () => void;
  /** Callback when upload completes */
  onComplete?: () => void;
  /** Reset delay after complete (ms) */
  resetDelay?: number;
  /** Additional css classes */
  className?: string;
}

/* ──────────────────────────────────────────────
   SVG Icons
   ────────────────────────────────────────────── */

const CloudUploadIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
    <path d="M12 12v9" />
    <path d="m16 16-4-4-4 4" />
  </svg>
);

const CheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */

export const UploadButton: React.FC<UploadButtonProps> = ({
  label = 'UPLOAD',
  completeLabel = 'DONE',
  width = 220,
  height = 58,
  borderRadius = 50,
  color = '#ffffff',
  bgColor = '#2563eb',
  uploadDuration = 2500,
  onUpload,
  onComplete,
  resetDelay = 2000,
  className = '',
}) => {
  const [state, setState] = useState<UploadState>('idle');
  const [progress, setProgress] = useState(0);
  const animRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);

  // Animate progress from 0 → 100
  const animateProgress = useCallback(() => {
    const elapsed = performance.now() - startRef.current;
    const pct = Math.min(100, (elapsed / uploadDuration) * 100);
    setProgress(Math.round(pct));

    if (pct < 100) {
      animRef.current = requestAnimationFrame(animateProgress);
    } else {
      setState('complete');
      onComplete?.();
    }
  }, [uploadDuration, onComplete]);

  const handleClick = useCallback(() => {
    if (state !== 'idle') return;
    setState('uploading');
    setProgress(0);
    onUpload?.();
    startRef.current = performance.now();
    animRef.current = requestAnimationFrame(animateProgress);
  }, [state, onUpload, animateProgress]);

  // Reset after complete
  useEffect(() => {
    if (state === 'complete') {
      const timer = setTimeout(() => {
        setState('idle');
        setProgress(0);
      }, resetDelay);
      return () => clearTimeout(timer);
    }
  }, [state, resetDelay]);

  // Cleanup
  useEffect(() => {
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  const isUploading = state === 'uploading';
  const isComplete = state === 'complete';

  return (
    <button
      type="button"
      className={`upload-btn ${state} ${className}`}
      onClick={handleClick}
      disabled={state !== 'idle'}
      aria-label={isUploading ? `Uploading ${progress}%` : isComplete ? completeLabel : label}
      style={{
        '--upload-width': `${width}px`,
        '--upload-height': `${height}px`,
        '--upload-radius': `${borderRadius}px`,
        '--upload-color': color,
        '--upload-bg': bgColor,
        '--upload-progress': `${progress}%`,
      } as React.CSSProperties}
    >
      {/* Idle State — Icon + Label */}
      <span className={`upload-btn-content ${isUploading || isComplete ? 'hidden' : ''}`}>
        <CloudUploadIcon />
        <span>{label}</span>
      </span>

      {/* Upload Progress Bar */}
      <span className={`upload-btn-progress-track ${isUploading ? 'visible' : ''}`}>
        <span className="upload-btn-progress-fill" />
      </span>

      {/* Percentage Badge */}
      <span className={`upload-btn-badge ${isUploading ? 'visible' : ''}`}>
        {progress}%
      </span>

      {/* Complete State */}
      <span className={`upload-btn-content ${isComplete ? 'complete-visible' : 'hidden'}`}>
        <CheckIcon />
        <span>{completeLabel}</span>
      </span>
    </button>
  );
};
