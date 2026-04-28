"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Repeat2, Share, BadgeCheck } from "lucide-react";
import { cn } from "../utils";

const CARD_SPRING = { type: "spring", stiffness: 300, damping: 22 } as const;

export interface TweetData {
  readonly author: {
    readonly name: string;
    readonly handle: string;
    readonly avatar: string;
    readonly verified?: boolean;
  };
  readonly content: string;
  readonly timestamp: string;
  readonly likes?: number;
  readonly replies?: number;
  readonly retweets?: number;
}

export interface NeonTweetCardProps {
  tweet: TweetData;
  className?: string;
}

const formatCount = (n: number | undefined): string => {
  if (!n) return "0";
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
};

/**
 * NeonTweetCard — A premium, embeddable tweet/social card with
 * neon accents and hover interactions. Inspired by Magic UI's
 * Tweet Card component, enhanced with our vault's glow aesthetic.
 */
export const NeonTweetCard = React.forwardRef<HTMLDivElement, NeonTweetCardProps>(
  ({ className, tweet, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        {...props}
        className={cn(
          "relative max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl p-5 group cursor-pointer overflow-hidden",
          className
        )}
        whileHover={{ y: -4, borderColor: "rgba(139, 92, 246, 0.3)" }}
        transition={CARD_SPRING}
      >
        {/* Hover glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Author */}
        <div className="relative flex items-center gap-3 mb-4">
          <img
            src={tweet.author.avatar}
            alt={tweet.author.name}
            className="w-10 h-10 rounded-full object-cover border border-zinc-800"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-bold text-white text-sm truncate">
                {tweet.author.name}
              </span>
              {tweet.author.verified && (
                <BadgeCheck size={16} className="text-violet-400 shrink-0" />
              )}
            </div>
            <span className="text-zinc-500 text-xs font-mono">
              @{tweet.author.handle}
            </span>
          </div>
          {/* X/MessageCircle logo placeholder */}
          <div className="text-zinc-600 text-lg font-black">𝕏</div>
        </div>

        {/* Content */}
        <p className="relative text-zinc-300 text-sm leading-relaxed mb-4 whitespace-pre-wrap">
          {tweet.content}
        </p>

        {/* Timestamp */}
        <div className="text-zinc-600 text-xs font-mono mb-4 border-b border-zinc-800/50 pb-4">
          {tweet.timestamp}
        </div>

        {/* Engagement metrics */}
        <div className="relative flex items-center gap-6 text-zinc-500 text-xs">
          <button className="flex items-center gap-1.5 hover:text-violet-400 transition-colors group/btn">
            <MessageCircle size={16} className="group-hover/btn:scale-110 transition-transform" />
            {formatCount(tweet.replies)}
          </button>
          <button className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors group/btn">
            <Repeat2 size={16} className="group-hover/btn:scale-110 transition-transform" />
            {formatCount(tweet.retweets)}
          </button>
          <button className="flex items-center gap-1.5 hover:text-red-400 transition-colors group/btn">
            <Heart size={16} className="group-hover/btn:scale-110 transition-transform" />
            {formatCount(tweet.likes)}
          </button>
          <button className="ml-auto hover:text-cyan-400 transition-colors">
            <Share size={16} />
          </button>
        </div>
      </motion.div>
    );
  }
);

NeonTweetCard.displayName = "NeonTweetCard";
