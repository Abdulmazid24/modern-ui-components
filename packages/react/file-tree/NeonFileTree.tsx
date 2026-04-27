"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, File, Folder, FolderOpen } from "lucide-react";
import { cn } from "../utils";

const EXPAND_SPRING = { type: "spring", stiffness: 400, damping: 30 } as const;
const STAGGER_DELAY = 0.04;

export interface FileTreeNode {
  readonly id: string;
  readonly name: string;
  readonly isFolder?: boolean;
  readonly children?: readonly FileTreeNode[];
  readonly icon?: React.ReactNode;
}

export interface NeonFileTreeProps {
  data: readonly FileTreeNode[];
  onSelect?: (node: FileTreeNode) => void;
  className?: string;
}

interface TreeItemProps {
  node: FileTreeNode;
  depth: number;
  onSelect?: (node: FileTreeNode) => void;
  index: number;
}

const TreeItem = ({ node, depth, onSelect, index }: TreeItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = node.isFolder && node.children && node.children.length > 0;

  const handleToggle = useCallback(() => {
    if (hasChildren) {
      setIsOpen((prev) => !prev);
    }
    onSelect?.(node);
  }, [hasChildren, node, onSelect]);

  const FolderIcon = isOpen ? FolderOpen : Folder;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * STAGGER_DELAY, ...EXPAND_SPRING }}
    >
      <button
        onClick={handleToggle}
        className={cn(
          "w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-mono transition-all duration-200",
          "hover:bg-violet-500/10 hover:text-violet-300",
          "text-zinc-400 group cursor-pointer"
        )}
        style={{ paddingLeft: `${depth * 16 + 12}px` }}
      >
        {/* Chevron for folders */}
        {hasChildren ? (
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={EXPAND_SPRING}
            className="text-zinc-600 group-hover:text-violet-400"
          >
            <ChevronRight size={14} />
          </motion.div>
        ) : (
          <span className="w-[14px]" />
        )}

        {/* Icon */}
        {node.icon ?? (
          node.isFolder ? (
            <FolderIcon size={16} className={cn("shrink-0", isOpen ? "text-violet-400" : "text-zinc-500")} />
          ) : (
            <File size={16} className="shrink-0 text-zinc-600 group-hover:text-violet-300" />
          )
        )}

        {/* Label */}
        <span className="truncate">{node.name}</span>

        {/* Active glow dot */}
        {!node.isFolder && (
          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_6px_rgba(139,92,246,0.8)]" />
        )}
      </button>

      {/* Children */}
      <AnimatePresence>
        {isOpen && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={EXPAND_SPRING}
            className="overflow-hidden"
          >
            <div className="relative ml-[22px] border-l border-zinc-800/50" style={{ marginLeft: `${depth * 16 + 22}px` }}>
              {node.children!.map((child, idx) => (
                <TreeItem
                  key={child.id}
                  node={child}
                  depth={depth + 1}
                  onSelect={onSelect}
                  index={idx}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/**
 * NeonFileTree — A recursive, animated file explorer component with
 * neon glow accents, physics-based expand/collapse, and staggered
 * entry animations. Inspired by Magic UI's File Tree, built to
 * match our vault's premium aesthetic.
 */
export const NeonFileTree = React.forwardRef<HTMLDivElement, NeonFileTreeProps>(
  ({ className, data, onSelect, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          "w-full max-w-sm bg-zinc-950 border border-zinc-800 rounded-2xl p-3 font-mono text-sm",
          className
        )}
      >
        {data.map((node, idx) => (
          <TreeItem
            key={node.id}
            node={node}
            depth={0}
            onSelect={onSelect}
            index={idx}
          />
        ))}
      </div>
    );
  }
);

NeonFileTree.displayName = "NeonFileTree";
