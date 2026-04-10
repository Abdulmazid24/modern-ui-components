"use client";

import React, { useState } from "react";
import { Reorder, useDragControls } from "framer-motion";
import { GripVertical } from "lucide-react";

export interface SortableItem {
  id: string;
  content: string;
}

export interface ElasticSortableListProps {
  initialItems?: SortableItem[];
}

export const ElasticSortableList: React.FC<ElasticSortableListProps> = ({
  initialItems = [
    { id: "1", content: "Optimize Webpack bundle" },
    { id: "2", content: "Fix memory leak in V8" },
    { id: "3", content: "Deploy to edge network" },
    { id: "4", content: "Write integration tests" }
  ]
}) => {
  const [items, setItems] = useState(initialItems);

  return (
    <div className="w-full max-w-md p-6 bg-zinc-950 border border-zinc-900 rounded-3xl shadow-xl">
      <h3 className="text-zinc-400 font-medium mb-4 text-sm tracking-widest uppercase mb-6">Task Priority Queue</h3>
      
      <Reorder.Group 
        axis="y" 
        values={items} 
        onReorder={setItems} 
        className="flex flex-col gap-3"
      >
        {items.map((item) => (
          <SortableListItem key={item.id} item={item} />
        ))}
      </Reorder.Group>
    </div>
  );
};

const SortableListItem = ({ item }: { item: SortableItem }) => {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={item}
      id={item.id}
      dragListener={false}
      dragControls={dragControls}
      // This spring provides the "elastic" visual feedback when moving boxes out of the way
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      whileDrag={{ 
        scale: 1.05, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)",
        zIndex: 50,
        backgroundColor: "rgba(39, 39, 42, 0.95)"
      }}
      className="relative flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl cursor-grab active:cursor-grabbing backdrop-blur-sm"
    >
      <span className="text-white font-medium select-none pointer-events-none">{item.content}</span>
      
      {/* Drag Handle */}
      <div 
        className="p-1 rounded-md hover:bg-zinc-800 text-zinc-500 hover:text-white cursor-grab active:cursor-grabbing transition-colors touch-none"
        onPointerDown={(e) => dragControls.start(e)}
      >
        <GripVertical size={20} />
      </div>
    </Reorder.Item>
  );
};
