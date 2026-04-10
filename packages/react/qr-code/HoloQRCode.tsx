"use client";
import React from "react";
export const HoloQRCode: React.FC<{ data?: string; size?: number }> = ({ data = "https://modern-ui-vault.dev", size = 180 }) => {
  // Simple deterministic QR-like pattern from string hash
  const hash = (s: string) => { let h = 0; for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0; return Math.abs(h); };
  const grid = 21; const h = hash(data);
  const cells: boolean[][] = Array.from({ length: grid }, (_, r) => Array.from({ length: grid }, (_, c) => {
    // Finder patterns (3 corners)
    const inFinder = (r < 7 && c < 7) || (r < 7 && c >= grid - 7) || (r >= grid - 7 && c < 7);
    if (inFinder) { const fr = r < 7 ? r : r - (grid - 7); const fc = c < 7 ? c : c - (grid - 7); return (fr === 0 || fr === 6 || fc === 0 || fc === 6 || (fr >= 2 && fr <= 4 && fc >= 2 && fc <= 4)); }
    return ((h * (r + 1) * (c + 1) + r * 7 + c * 13) % 3) < 2;
  }));
  const cellSize = size / grid;
  return (
    <div className="inline-flex flex-col items-center gap-3 p-5 rounded-2xl bg-zinc-900 border border-white/10">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {cells.map((row, r) => row.map((on, c) => on ? (
          <rect key={`${r}-${c}`} x={c * cellSize} y={r * cellSize} width={cellSize} height={cellSize} rx={1} fill="url(#qr-grad)" />
        ) : null))}
        <defs><linearGradient id="qr-grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#7c3aed" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient></defs>
      </svg>
      <p className="text-[10px] text-zinc-600 font-mono truncate max-w-[180px]">{data}</p>
    </div>
  );
};
