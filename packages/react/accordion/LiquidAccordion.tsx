"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
  icon?: React.ReactNode;
}

export interface LiquidAccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

/* ──────────────────────────────────────────────
   Single Panel
   ────────────────────────────────────────────── */

const AccordionPanel: React.FC<{
  item: AccordionItem;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}> = ({ item, isOpen, onClick, index }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className={`liquid-accordion-panel ${isOpen ? 'open' : ''}`}
      style={{ '--panel-index': index } as React.CSSProperties}
    >
      {/* Animated liquid border */}
      <div className="liquid-border-layer" />
      
      {/* Header */}
      <button
        className="liquid-accordion-header"
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${item.id}`}
      >
        <div className="liquid-header-left">
          {item.icon && (
            <span className="liquid-icon-wrapper">{item.icon}</span>
          )}
          <span className="liquid-title">{item.title}</span>
        </div>
        <div className={`liquid-chevron ${isOpen ? 'rotated' : ''}`}>
          <ChevronDown size={20} />
        </div>
      </button>

      {/* Content */}
      <div
        id={`accordion-content-${item.id}`}
        className="liquid-accordion-body"
        style={{ height: contentHeight }}
        role="region"
      >
        <div ref={contentRef} className="liquid-body-inner">
          {item.content}
        </div>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────
   Main Accordion
   ────────────────────────────────────────────── */

export const LiquidAccordion: React.FC<LiquidAccordionProps> = ({
  items,
  allowMultiple = false,
}) => {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="liquid-accordion-container">
      {items.map((item, i) => (
        <AccordionPanel
          key={item.id}
          item={item}
          isOpen={openIds.has(item.id)}
          onClick={() => toggle(item.id)}
          index={i}
        />
      ))}
    </div>
  );
};
