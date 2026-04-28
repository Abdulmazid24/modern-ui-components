"use client";
import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Briefcase, Code2, Globe } from "lucide-react";
import { cn } from "../utils";

export interface TeamMember {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly bio?: string;
  readonly image: string;
  readonly socials?: {
    readonly twitter?: string;
    readonly linkedin?: string;
    readonly github?: string;
    readonly website?: string;
  };
}

export interface KineticTeamGridProps {
  readonly members: readonly TeamMember[];
  readonly className?: string;
}

/** KineticTeamGrid — Team member display with portrait zoom, blur reveals, and floating social links. */
export const KineticTeamGrid = React.forwardRef<HTMLDivElement, KineticTeamGridProps>(
  ({ className, members, ...props }, ref) => {
    return (
      <div ref={ref} {...props} className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", className)}>
        {members.map((member, i) => (
          <motion.div 
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group relative rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 aspect-[3/4]"
          >
            {/* Background Image */}
            <img 
              src={member.image} 
              alt={member.name} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Holographic Edge Glow on Hover */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-violet-500/30 rounded-3xl transition-colors duration-500 pointer-events-none" />

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end h-full">
              <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-violet-400 font-medium text-sm mb-3">{member.role}</p>
                
                {member.bio && (
                  <p className="text-zinc-400 text-xs leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-3">
                    {member.bio}
                  </p>
                )}

                {/* Socials */}
                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  {member.socials?.twitter && (
                    <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors">
                      <MessageCircle size={14} />
                    </a>
                  )}
                  {member.socials?.linkedin && (
                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors">
                      <Briefcase size={14} />
                    </a>
                  )}
                  {member.socials?.github && (
                    <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors">
                      <Code2 size={14} />
                    </a>
                  )}
                  {member.socials?.website && (
                    <a href={member.socials.website} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors">
                      <Globe size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }
);
KineticTeamGrid.displayName = "KineticTeamGrid";
