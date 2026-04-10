"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { GripHorizontal, AlertCircle, Clock, CheckCircle2 } from "lucide-react";

export interface KanbanTask {
  id: string;
  title: string;
  status: "todo" | "doing" | "done";
  priority: "high" | "medium" | "low";
}

export interface MagneticKanbanProps {
  initialTasks?: KanbanTask[];
}

export const MagneticKanban: React.FC<MagneticKanbanProps> = ({
  initialTasks = [
    { id: "1", title: "Migrate database to edge", status: "todo", priority: "high" },
    { id: "2", title: "Implement Auth flow", status: "doing", priority: "medium" },
    { id: "3", title: "Write API documentation", status: "done", priority: "low" },
    { id: "4", title: "Fix memory leak in V8", status: "doing", priority: "high" },
  ]
}) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTask, setActiveTask] = useState<string | null>(null);

  // Split tasks by column
  const cols = {
    todo: tasks.filter(t => t.status === "todo"),
    doing: tasks.filter(t => t.status === "doing"),
    done: tasks.filter(t => t.status === "done"),
  };

  return (
    <div className="w-full max-w-5xl bg-zinc-950 border border-zinc-900 rounded-3xl p-8 shadow-2xl flex gap-6 overflow-x-auto">
      <KanbanColumn title="To Do" status="todo" items={cols.todo} setActiveTask={setActiveTask} activeTask={activeTask} />
      <KanbanColumn title="In Progress" status="doing" items={cols.doing} setActiveTask={setActiveTask} activeTask={activeTask} />
      <KanbanColumn title="Completed" status="done" items={cols.done} setActiveTask={setActiveTask} activeTask={activeTask} />
    </div>
  );
};

const KanbanColumn = ({ title, status, items, setActiveTask, activeTask }: { title: string, status: string, items: KanbanTask[], setActiveTask: any, activeTask: any }) => {
  return (
    <div className="flex flex-col w-72 shrink-0 bg-zinc-900/40 rounded-2xl p-4 border border-zinc-800/50">
      
      <div className="flex items-center justify-between mb-6 px-2">
        <h3 className="text-zinc-300 font-bold tracking-wide">{title}</h3>
        <span className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-zinc-400 font-bold">
          {items.length}
        </span>
      </div>

      <div className="flex flex-col gap-4 relative min-h-[150px]">
        {items.map((task) => (
          <KanbanCard 
            key={task.id} 
            task={task} 
            isActive={activeTask === task.id}
            onDragStart={() => setActiveTask(task.id)}
            onDragEnd={() => setActiveTask(null)}
          />
        ))}

        {/* Empty State / Drop Zone Indicator */}
        {items.length === 0 && (
          <div className="absolute inset-0 border-2 border-dashed border-zinc-800 rounded-xl flex items-center justify-center text-zinc-600 text-sm font-medium">
            Drop cards here
          </div>
        )}
      </div>
    </div>
  );
};

const KanbanCard = ({ task, isActive, onDragStart, onDragEnd }: { task: KanbanTask, isActive: boolean, onDragStart: any, onDragEnd: any }) => {
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case "high": return "text-rose-400 border-rose-500/20 bg-rose-500/10";
      case "medium": return "text-amber-400 border-amber-500/20 bg-amber-500/10";
      case "low": return "text-emerald-400 border-emerald-500/20 bg-emerald-500/10";
      default: return "";
    }
  };

  const statusIcons: any = {
    todo: <AlertCircle size={14} className="text-zinc-500" />,
    doing: <Clock size={14} className="text-amber-500" />,
    done: <CheckCircle2 size={14} className="text-emerald-500" />
  };

  return (
    <motion.div
      drag
      dragSnapToOrigin // For preview fidelity, snap it back if not handling complex global drops.
      dragElastic={0.2}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      // When dragging, apply 3D transform and massive shadow to simulate lifting off the board
      whileDrag={{
        scale: 1.05,
        rotateX: 10,
        rotateY: 5,
        rotateZ: -2,
        cursor: "grabbing",
        boxShadow: "20px 20px 30px rgba(0,0,0,0.8), -10px -10px 20px rgba(0,0,0,0.5)",
        zIndex: 50
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 cursor-grab shadow-lg transition-colors group ${isActive ? 'ring-2 ring-cyan-500 ring-offset-2 ring-offset-zinc-950' : 'hover:border-zinc-700'}`}
    >
       <div className="flex items-center justify-between mb-4">
         <span className={`px-2 py-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest rounded-md border ${getPriorityColor(task.priority)}`}>
           {statusIcons[task.status]}
           {task.priority}
         </span>
         
         <GripHorizontal size={16} className="text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab" />
       </div>
       
       <p className="text-zinc-200 text-sm font-medium leading-relaxed">
         {task.title}
       </p>
       
       {/* Pseudo-3D highlight edge */}
       <div className="absolute inset-x-0 top-0 h-px bg-white/10 rounded-t-xl" />
    </motion.div>
  );
};
