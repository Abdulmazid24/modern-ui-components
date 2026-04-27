"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Heart, Share2, MoreHorizontal } from "lucide-react";
import { cn } from "../utils";

export interface CommentData {
  readonly id: string;
  readonly author: {
    readonly name: string;
    readonly avatar?: string;
    readonly handle?: string;
  };
  readonly content: React.ReactNode;
  readonly timestamp: string;
  readonly likes?: number;
  readonly replies?: CommentData[];
}

export interface ThreadedCommentProps {
  readonly comment: CommentData;
  readonly onReply?: (id: string) => void;
  readonly onLike?: (id: string) => void;
  readonly level?: number;
  readonly className?: string;
}

/** ThreadedComment — Hierarchical comment system with connection lines and animated reply expansion. */
export const ThreadedComment = React.forwardRef<HTMLDivElement, ThreadedCommentProps>(
  ({ className, comment, onReply, onLike, level = 0, ...props }, ref) => {
    const [showReplies, setShowReplies] = useState(true);
    const hasReplies = comment.replies && comment.replies.length > 0;

    return (
      <div ref={ref} {...props} className={cn("relative group/comment", className)}>
        {/* Connection Line for nested comments */}
        {level > 0 && (
          <div className="absolute -left-6 top-0 bottom-0 w-px bg-zinc-800" />
        )}
        {level > 0 && (
          <div className="absolute -left-6 top-6 w-4 h-px bg-zinc-800" />
        )}

        <div className="flex gap-4">
          {/* Avatar */}
          <div className="shrink-0 relative z-10">
            {comment.author.avatar ? (
              <img src={comment.author.avatar} alt={comment.author.name} className="w-10 h-10 rounded-full object-cover border border-zinc-800" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center justify-center font-bold text-sm">
                {comment.author.name.charAt(0)}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0 pb-4">
            {/* Header */}
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-baseline gap-2 truncate">
                <span className="font-semibold text-zinc-200 truncate">{comment.author.name}</span>
                {comment.author.handle && <span className="text-sm text-zinc-500 truncate">@{comment.author.handle}</span>}
                <span className="text-xs text-zinc-600 shrink-0">{comment.timestamp}</span>
              </div>
              <button className="opacity-0 group-hover/comment:opacity-100 p-1 text-zinc-500 hover:text-white transition-all rounded-md hover:bg-zinc-900 shrink-0">
                <MoreHorizontal size={14} />
              </button>
            </div>

            {/* Content */}
            <div className="text-sm text-zinc-300 leading-relaxed mb-3">
              {comment.content}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button onClick={() => onLike?.(comment.id)} className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-rose-400 transition-colors group/action">
                <Heart size={14} className="group-hover/action:scale-110 transition-transform" /> {comment.likes || 0}
              </button>
              <button onClick={() => onReply?.(comment.id)} className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-violet-400 transition-colors group/action">
                <MessageSquare size={14} className="group-hover/action:scale-110 transition-transform" /> Reply
              </button>
              <button className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-cyan-400 transition-colors group/action">
                <Share2 size={14} className="group-hover/action:scale-110 transition-transform" /> Share
              </button>
            </div>

            {/* Nested Replies Toggle */}
            {hasReplies && (
              <div className="mt-3">
                <button 
                  onClick={() => setShowReplies(!showReplies)}
                  className="flex items-center gap-2 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
                >
                  <div className="w-6 h-px bg-violet-500/50" />
                  {showReplies ? "Hide replies" : `View ${comment.replies!.length} replies`}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Nested Replies Container */}
        <AnimatePresence>
          {hasReplies && showReplies && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="ml-10 overflow-hidden"
            >
              <div className="pt-2">
                {comment.replies!.map(reply => (
                  <ThreadedComment key={reply.id} comment={reply} onReply={onReply} onLike={onLike} level={level + 1} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
ThreadedComment.displayName = "ThreadedComment";
