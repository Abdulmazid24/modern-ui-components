"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, FolderOpen, FileText, ChevronRight } from "lucide-react";
import { cn } from "@/utils";

export interface TreeNode {
  id: string;
  label: string;
  isFolder?: boolean;
  children?: TreeNode[];
    className?: string;
}

export interface FractalTreeViewProps {
  data: TreeNode[];
    className?: string;
}

export const FractalTreeView = React.forwardRef<any, FractalTreeViewProps>(({ className, data, ...props }, ref) => {
        return (
        <div ref={ref} {...props} className={cn("p-4 bg-zinc-950 border border-zinc-900 rounded-3xl min-w-[300px]", className)}>
          <ul className="flex flex-col gap-1 relative">
            {data.map((node) => (
              <TreeViewNode key={node.id} node={node} level={0} />
            ))}
          </ul>
        </div>
        );
        });

const TreeViewNode = ({ node, level }: { node: TreeNode, level: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = node.isFolder && node.children && node.children.length > 0;

  return (
    <li ref={ref} {...props} className={cn("relative", className)}>
      <div 
        className={`flex items-center gap-2 py-1.5 px-2 rounded-xl cursor-pointer transition-colors ${
          isOpen ? 'text-cyan-400' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
        }`}
        style={{ paddingLeft: `${level * 20 + 8}px` }}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        {node.isFolder ? (
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            className={`w-4 h-4 flex items-center justify-center ${hasChildren ? '' : 'opacity-0'}`}
          >
            <ChevronRight size={14} />
          </motion.div>
        ) : (
          <div className="w-4" /> // spacing
        )}

        {node.isFolder ? (
          isOpen ? <FolderOpen size={16} className="text-cyan-500" /> : <Folder size={16} />
        ) : (
          <FileText size={16} className="text-zinc-500" />
        )}

        <span className="text-sm font-medium select-none">{node.label}</span>
      </div>

      <AnimatePresence>
        {isOpen && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="overflow-hidden"
          >
            <ul className="flex flex-col gap-1 relative mt-1">
              {/* Fractal circuit line connection */}
              <motion.div 
                className="absolute top-0 bottom-0 border-l border-cyan-500/30"
                style={{ left: `${level * 20 + 16}px` }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.3 }}
              />
              
              {node.children!.map((child) => (
                <TreeViewNode key={child.id} node={child} level={level + 1} />
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};
