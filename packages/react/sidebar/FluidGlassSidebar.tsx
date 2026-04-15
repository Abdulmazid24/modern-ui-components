import React, { forwardRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  LineChart,
  Layers,
  Wallet,
  Settings,
  User,
} from "lucide-react";

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface FluidGlassSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: SidebarItem[];
  defaultActiveId?: string;
}

export const FluidGlassSidebar = forwardRef<HTMLDivElement, FluidGlassSidebarProps>(
  ({ className, items, defaultActiveId, ...props }, ref) => {
    const defaultItems: SidebarItem[] = [
      { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
      { id: "analytics", label: "Analytics", icon: <LineChart size={20} /> },
      { id: "projects", label: "Projects", icon: <Layers size={20} /> },
      { id: "earnings", label: "Earnings", icon: <Wallet size={20} /> },
      { id: "settings", label: "Settings", icon: <Settings size={20} /> },
    ];

    const finalItems = items || defaultItems;
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [activeId, setActiveId] = useState<string>(
      defaultActiveId || finalItems[0]?.id || ""
    );

    return (
      <div
        ref={ref}
        className={cn(
          "w-72 h-[600px] max-h-[90vh] flex flex-col justify-between overflow-hidden",
          "bg-white/5 backdrop-blur-[20px] rounded-[30px] border border-white/10",
          "shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
          className
        )}
        {...props}
      >
        {/* Top/Menu Section */}
        <div className="flex-1 px-4 py-8">
          <ul
            className="flex flex-col gap-2 relative"
            onMouseLeave={() => setHoveredId(null)}
          >
            {finalItems.map((item) => {
              const isHovered = hoveredId === item.id;
              const isActive = activeId === item.id;

              return (
                <li key={item.id} className="relative z-10 block">
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveId(item.id);
                    }}
                    onMouseEnter={() => setHoveredId(item.id)}
                    className={cn(
                      "flex items-center gap-4 px-5 py-3 rounded-2xl transition-colors duration-300",
                      isActive || isHovered ? "text-white" : "text-zinc-400"
                    )}
                  >
                    <span className="relative z-20 flex items-center justify-center">
                      {item.icon}
                    </span>
                    <span className="relative z-20 font-medium tracking-wide">
                      {item.label}
                    </span>

                    {/* Fluid Hover Pill */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          layoutId="fluid-sidebar-hover"
                          className="absolute inset-0 -z-10 rounded-2xl bg-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Active Indicator Line */}
                    {isActive && (
                      <motion.div
                        layoutId="fluid-sidebar-active"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/5 bg-cyan-400 rounded-r-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Bottom User Profile Section */}
        <div className="relative mt-auto p-6 border-t border-white/5 bg-black/10">
          <div className="flex items-center gap-4 cursor-pointer group">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 shadow-lg group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300">
              <User size={24} className="text-white" />
            </div>
            <div>
              <h4 className="text-white font-bold tracking-wide">Admin Pro</h4>
              <p className="text-xs text-zinc-400">Workspace Master</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

FluidGlassSidebar.displayName = "FluidGlassSidebar";
