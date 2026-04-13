"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  maxHeight?: string;
}

/**
 * Syntax-highlighted code viewer component for the Storefront.
 * 
 * Uses CSS-based highlighting for common TSX/JSX patterns.
 * For true syntax highlighting, install 'shiki' and call highlight() server-side.
 */
export function CodeBlock({
  code,
  language = "tsx",
  showLineNumbers = true,
  maxHeight = "600px",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Basic syntax coloring via regex
  const highlightLine = (line: string): React.ReactNode[] => {
    const tokens: React.ReactNode[] = [];
    let remaining = line;
    let key = 0;

    const patterns: [RegExp, string][] = [
      // Comments
      [/^(\/\/.*)/, "text-zinc-500 italic"],
      // Strings (double/single/template)
      [/(["'`])(?:(?!\1|\\).|\\.)*\1/, "text-emerald-400"],
      // JSX tags
      [/<\/?[A-Z]\w*/, "text-cyan-400"],
      [/<\/?[a-z][\w-]*/, "text-red-400"],
      // Keywords
      [/\b(import|export|from|const|let|var|function|return|if|else|switch|case|break|default|for|while|do|try|catch|finally|throw|new|typeof|instanceof|void|delete|in|of|as|type|interface|extends|implements|class|enum|async|await|yield|static|readonly|public|private|protected|abstract|declare|module|namespace)\b/, "text-purple-400 font-medium"],
      // React/hooks
      [/\b(useState|useEffect|useRef|useCallback|useMemo|useContext|useReducer|React|motion|AnimatePresence)\b/, "text-yellow-400"],
      // Booleans/null/undefined
      [/\b(true|false|null|undefined|NaN|Infinity)\b/, "text-orange-400"],
      // Numbers
      [/\b(\d+\.?\d*)\b/, "text-amber-300"],
      // Types (PascalCase after colon)
      [/:\s*([A-Z]\w*)/, "text-cyan-300"],
    ];

    while (remaining.length > 0) {
      let earliest: { index: number; length: number; match: string; className: string } | null = null;

      for (const [pattern, className] of patterns) {
        const m = remaining.match(pattern);
        if (m && m.index !== undefined) {
          if (!earliest || m.index < earliest.index) {
            earliest = { index: m.index, length: m[0].length, match: m[0], className };
          }
        }
      }

      if (earliest) {
        // Text before the match
        if (earliest.index > 0) {
          tokens.push(
            <span key={key++} className="text-zinc-300">
              {remaining.slice(0, earliest.index)}
            </span>
          );
        }
        // The match
        tokens.push(
          <span key={key++} className={earliest.className}>
            {earliest.match}
          </span>
        );
        remaining = remaining.slice(earliest.index + earliest.length);
      } else {
        tokens.push(
          <span key={key++} className="text-zinc-300">
            {remaining}
          </span>
        );
        break;
      }
    }

    return tokens;
  };

  const lines = code.split("\n");

  return (
    <div className="relative group rounded-2xl overflow-hidden bg-[#0a0a0f] border border-zinc-800/50">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/80 border-b border-zinc-800/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
          </div>
          <span className="text-xs text-zinc-500 font-mono ml-2 uppercase tracking-wider">
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check size={14} className="text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div
        className="overflow-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent"
        style={{ maxHeight }}
      >
        <pre className="p-4 text-sm leading-relaxed font-mono">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="flex hover:bg-white/[0.02] transition-colors">
                {showLineNumbers && (
                  <span className="select-none text-zinc-600 text-right pr-4 min-w-[3rem] border-r border-zinc-800/30 mr-4">
                    {i + 1}
                  </span>
                )}
                <span className="flex-1 whitespace-pre">
                  {highlightLine(line)}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
