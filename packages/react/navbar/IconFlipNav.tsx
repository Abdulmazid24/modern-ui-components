import React, { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Home, User, Code, FileText, Mail } from "lucide-react";

export interface IconFlipItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface IconFlipNavProps extends React.HTMLAttributes<HTMLElement> {
  items?: IconFlipItem[];
}

const defaultItems: IconFlipItem[] = [
  { id: "home", label: "Home", icon: <Home size={20} /> },
  { id: "about", label: "About", icon: <User size={20} /> },
  { id: "projects", label: "Projects", icon: <Code size={20} /> },
  { id: "blog", label: "Blog", icon: <FileText size={20} /> },
  { id: "contact", label: "Contact", icon: <Mail size={20} /> },
];

export const IconFlipNav = forwardRef<HTMLElement, IconFlipNavProps>(
  ({ className, items = defaultItems, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(
          "flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-950/50 backdrop-blur-lg border border-white/10 shadow-xl",
          className
        )}
        {...props}
      >
        <ul className="flex items-center gap-1">
          {items.map((item) => (
            <FlipNavItem key={item.id} item={item} />
          ))}
        </ul>
      </nav>
    );
  }
);

IconFlipNav.displayName = "IconFlipNav";

// Internal Component for each item
function FlipNavItem({ item }: { item: IconFlipItem }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li>
      <a
        href={`#${item.id}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex items-center justify-center w-24 h-12 rounded-full overflow-hidden text-zinc-300 hover:bg-white/5 transition-colors focus:outline-none"
      >
        {/* The Text Label */}
        <motion.span
          className="absolute font-medium"
          initial={false}
          animate={{
            y: isHovered ? -40 : 0,
            opacity: isHovered ? 0 : 1,
            scale: isHovered ? 0.8 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
        >
          {item.label}
        </motion.span>

        {/* The Icon */}
        <motion.span
          className="absolute text-cyan-400"
          initial={false}
          animate={{
            y: isHovered ? 0 : 40,
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
        >
          {item.icon}
        </motion.span>

        {/* Hover subtle glow under the item to match Enterprise feel */}
        {isHovered && (
          <motion.div
            layoutId="flip-nav-glow"
            className="absolute -bottom-2 w-8 h-1 blur-[4px] bg-cyan-400/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </a>
    </li>
  );
}
