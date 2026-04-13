"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Search, ArrowUp, ArrowDown, CornerDownLeft, X } from 'lucide-react';
import { cn } from "@/utils";

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  category?: string;
  shortcut?: string;
  onSelect: () => void;
    className?: string;
}

export interface CommandPaletteProps {
  items: CommandItem[];
  placeholder?: string;
  hotkey?: string;
    className?: string;
}

export const CommandPalette = React.forwardRef<any, CommandPaletteProps>(({ className, items, placeholder = 'Type a command or search...', hotkey = 'k', ...props }, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const [query, setQuery] = useState('');
        const [activeIndex, setActiveIndex] = useState(0);
        const inputRef = useRef<HTMLInputElement>(null);
        const listRef = useRef<HTMLDivElement>(null);

        // Fuzzy matching
        const filtered = useMemo(() => {
        if (!query.trim()) return items;
        const lower = query.toLowerCase();
        return items.filter(
          (item) =>
            item.label.toLowerCase().includes(lower) ||
            item.description?.toLowerCase().includes(lower) ||
            item.category?.toLowerCase().includes(lower)
        );
        }, [items, query]);

        // Group by category
        const grouped = useMemo(() => {
        const map = new Map<string, CommandItem[]>();
        filtered.forEach((item) => {
          const cat = item.category || 'Actions';
          if (!map.has(cat)) map.set(cat, []);
          map.get(cat)!.push(item);
        });
        return map;
        }, [filtered]);

        // Flat list for keyboard navigation
        const flatList = useMemo(() => {
        const arr: CommandItem[] = [];
        grouped.forEach((items) => arr.push(...items));
        return arr;
        }, [grouped]);

        // Open/close with hotkey
        useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
          if ((e.metaKey || e.ctrlKey) && e.key === hotkey) {
            e.preventDefault();
            setIsOpen((prev) => !prev);
          }
          if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
        }, [hotkey]);

        // Focus input when opened
        useEffect(() => {
        if (isOpen) {
          setQuery('');
          setActiveIndex(0);
          setTimeout(() => inputRef.current?.focus(), 50);
        }
        }, [isOpen]);

        // Keyboard navigation inside palette
        const handleInputKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex((prev) => Math.min(prev + 1, flatList.length - 1));
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex((prev) => Math.max(prev - 1, 0));
          } else if (e.key === 'Enter' && flatList[activeIndex]) {
            flatList[activeIndex].onSelect();
            setIsOpen(false);
          }
        },
        [flatList, activeIndex]
        );

        // Scroll active item into view
        useEffect(() => {
        if (!listRef.current) return;
        const activeEl = listRef.current.querySelector('[data-active="true"]');
        activeEl?.scrollIntoView({ block: 'nearest' });
        }, [activeIndex]);

        // Highlight matching text
        const highlight = (text: string) => {
        if (!query.trim()) return text;
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        const parts = text.split(regex);
        return parts.map((part, i) =>
          regex.test(part) ? (
            <mark key={i} className="cmd-highlight">{part}</mark>
          ) : (
            part
          )
        );
        };

        if (!isOpen) {
        return (
          <button
            onClick={() => setIsOpen(true)}
            className="cmd-trigger"
          >
            <Search size={16} />
            <span>Search commands...</span>
            <kbd className="cmd-kbd">⌘K</kbd>
          </button>
        );
        }

        return (
        <div ref={ref} {...props} className={cn("cmd-overlay", className)} onClick={() => setIsOpen(false)}>
          <div
            className="cmd-palette"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="cmd-input-wrapper">
              <Search size={20} className="cmd-search-icon" />
              <input
                ref={inputRef}
                className="cmd-input"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder={placeholder}
                autoComplete="off"
                spellCheck={false}
              />
              <button className="cmd-close-btn" onClick={() => setIsOpen(false)}>
                <X size={16} />
              </button>
            </div>

            {/* Results */}
            <div ref={listRef} className="cmd-results">
              {flatList.length === 0 && (
                <div className="cmd-empty">
                  No results for "<span className="text-white">{query}</span>"
                </div>
              )}

              {Array.from(grouped.entries()).map(([category, categoryItems]) => (
                <div key={category}>
                  <div className="cmd-category">{category}</div>
                  {categoryItems.map((item) => {
                    const flatIndex = flatList.indexOf(item);
                    const isActive = flatIndex === activeIndex;
                    return (
                      <button
                        key={item.id}
                        data-active={isActive}
                        className={`cmd-item ${isActive ? 'active' : ''}`}
                        onClick={() => {
                          item.onSelect();
                          setIsOpen(false);
                        }}
                        onMouseEnter={() => setActiveIndex(flatIndex)}
                      >
                        <div className="cmd-item-left">
                          {item.icon && <span className="cmd-item-icon">{item.icon}</span>}
                          <div>
                            <div className="cmd-item-label">{highlight(item.label)}</div>
                            {item.description && (
                              <div className="cmd-item-desc">{highlight(item.description)}</div>
                            )}
                          </div>
                        </div>
                        {item.shortcut && <kbd className="cmd-item-shortcut">{item.shortcut}</kbd>}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="cmd-footer">
              <span className="cmd-footer-hint"><ArrowUp size={12} /><ArrowDown size={12} /> Navigate</span>
              <span className="cmd-footer-hint"><CornerDownLeft size={12} /> Select</span>
              <span className="cmd-footer-hint"><kbd className="cmd-footer-kbd">Esc</kbd> Close</span>
            </div>
          </div>
        </div>
        );
        });
