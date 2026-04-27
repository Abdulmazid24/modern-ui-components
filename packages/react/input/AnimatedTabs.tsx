"use client";

import React, { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";

export interface AnimatedTabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
    className?: string;
}

export interface AnimatedTabsProps {
  tabs: AnimatedTabItem[];
  activeTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'pill' | 'underline' | 'glow';
    className?: string;
}

export const AnimatedTabs = React.forwardRef<any, AnimatedTabsProps>(({ className, tabs, activeTab: controlledActive, onChange, variant = 'pill', ...props }, ref) => {
        const [internalActive, setInternalActive] = useState(tabs[0]?.id ?? '');
        const activeId = controlledActive ?? internalActive;
        const containerRef = useRef<HTMLDivElement>(null);
        const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});

        useEffect(() => {
        if (!containerRef.current) return;
        const activeBtn = containerRef.current.querySelector(
          `[data-tab-id="${activeId}"]`
        ) as HTMLElement | null;

        if (activeBtn) {
          setIndicatorStyle({
            left: activeBtn.offsetLeft,
            top: activeBtn.offsetTop,
            width: activeBtn.offsetWidth,
            height: activeBtn.offsetHeight,
          });
        }
        }, [activeId, tabs]);

        const handleClick = (tabId: string) => {
        setInternalActive(tabId);
        onChange?.(tabId);
        };

        return (
        <div ref={ref} {...props} className={cn(className)} 
          ref={containerRef}
          className={`animated-tabs-container animated-tabs-${variant}`}
        >
          {/* Sliding indicator */}
          <div
            className={`animated-tabs-indicator animated-tabs-indicator-${variant}`}
            style={indicatorStyle}
          />

          {tabs.map((tab) => (
            <button
              key={tab.id}
              data-tab-id={tab.id}
              onClick={() => handleClick(tab.id)}
              className={`animated-tab-btn ${activeId === tab.id ? 'active' : ''}`}
            >
              {tab.icon && <span className="animated-tab-icon">{tab.icon}</span>}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        );
        });
