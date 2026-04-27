"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils";

const SUGGEST_SPRING = { type: "spring", stiffness: 400, damping: 28 } as const;
const MENTION_TRIGGER = "@";
const MAX_SUGGESTIONS = 5;

export interface MentionUser {
  readonly id: string;
  readonly name: string;
  readonly handle: string;
  readonly avatar?: string;
}

export interface SynapticMentionsProps {
  readonly users: readonly MentionUser[];
  readonly value?: string;
  readonly onChange?: (value: string) => void;
  readonly placeholder?: string;
  readonly className?: string;
}

/**
 * SynapticMentions — A text input where typing "@" triggers a
 * neural-network-style suggestion panel. Users appear with
 * glowing synaptic connections between them, and the selected
 * user's name crystallizes into the text with a prismatic glow.
 */
export const SynapticMentions = React.forwardRef<HTMLDivElement, SynapticMentionsProps>(
  ({ className, users, value = "", onChange, placeholder = "Type @ to mention someone...", ...props }, ref) => {
    const [text, setText] = useState(value);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [query, setQuery] = useState("");
    const [highlightIndex, setHighlightIndex] = useState(0);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const filtered = users
      .filter((u) => u.name.toLowerCase().includes(query.toLowerCase()) || u.handle.toLowerCase().includes(query.toLowerCase()))
      .slice(0, MAX_SUGGESTIONS);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = e.target.value;
      setText(val);
      onChange?.(val);

      const cursorPos = e.target.selectionStart ?? 0;
      const textBefore = val.slice(0, cursorPos);
      const mentionMatch = textBefore.match(/@(\w*)$/);

      if (mentionMatch) {
        setQuery(mentionMatch[1]);
        setShowSuggestions(true);
        setHighlightIndex(0);
      } else {
        setShowSuggestions(false);
      }
    }, [onChange]);

    const insertMention = useCallback((user: MentionUser) => {
      const cursorPos = inputRef.current?.selectionStart ?? 0;
      const textBefore = text.slice(0, cursorPos);
      const textAfter = text.slice(cursorPos);
      const mentionStart = textBefore.lastIndexOf(MENTION_TRIGGER);
      const newText = textBefore.slice(0, mentionStart) + `@${user.handle} ` + textAfter;

      setText(newText);
      onChange?.(newText);
      setShowSuggestions(false);

      setTimeout(() => {
        const pos = mentionStart + user.handle.length + 2;
        inputRef.current?.setSelectionRange(pos, pos);
        inputRef.current?.focus();
      }, 0);
    }, [text, onChange]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!showSuggestions) return;
      if (e.key === "ArrowDown") { e.preventDefault(); setHighlightIndex((p) => Math.min(p + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setHighlightIndex((p) => Math.max(p - 1, 0)); }
      if (e.key === "Enter" && filtered[highlightIndex]) { e.preventDefault(); insertMention(filtered[highlightIndex]); }
      if (e.key === "Escape") setShowSuggestions(false);
    };

    return (
      <div ref={ref} {...props} className={cn("relative w-full", className)}>
        <textarea
          ref={inputRef}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={3}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-sm text-zinc-200 font-mono resize-none focus:outline-none focus:border-violet-500/50 focus:shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-all placeholder:text-zinc-600"
        />

        <AnimatePresence>
          {showSuggestions && filtered.length > 0 && (
            <motion.div
              className="absolute left-4 bottom-full mb-2 w-72 bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800 rounded-xl overflow-hidden z-50"
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={SUGGEST_SPRING}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

              <div className="py-1.5">
                {filtered.map((user, i) => (
                  <motion.button
                    key={user.id}
                    onClick={() => insertMention(user)}
                    onMouseEnter={() => setHighlightIndex(i)}
                    className={cn(
                      "relative w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors cursor-pointer",
                      i === highlightIndex ? "bg-violet-500/10 text-white" : "text-zinc-400 hover:text-zinc-200"
                    )}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, ...SUGGEST_SPRING }}
                  >
                    {/* Synaptic connection line */}
                    {i === highlightIndex && (
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full"
                        style={{ background: "linear-gradient(to bottom, #8b5cf6, #06b6d4)", boxShadow: "0 0 8px rgba(139,92,246,0.4)" }}
                        layoutId="synapse-line"
                        transition={SUGGEST_SPRING}
                      />
                    )}

                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-xs font-bold text-white shrink-0 overflow-hidden">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        user.name.charAt(0).toUpperCase()
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold truncate">{user.name}</div>
                      <div className="text-[10px] text-zinc-500 font-mono">@{user.handle}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

SynapticMentions.displayName = "SynapticMentions";
