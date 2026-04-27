"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { cn } from "../utils";

export interface ComparisonFeature {
  readonly name: string;
  readonly description?: string;
}

export interface ComparisonTier {
  readonly id: string;
  readonly name: string;
  readonly price: string;
  readonly description: string;
  readonly isPopular?: boolean;
  readonly buttonText: string;
  readonly features: Record<string, boolean | string>; // feature name -> boolean (check/cross) or string value
}

export interface CosmicComparisonTableProps {
  readonly features: readonly ComparisonFeature[];
  readonly tiers: readonly ComparisonTier[];
  readonly className?: string;
}

/** CosmicComparisonTable — Premium feature comparison matrix with highlighted popular tier, sticky headers, and hover row highlighting. */
export const CosmicComparisonTable = React.forwardRef<HTMLDivElement, CosmicComparisonTableProps>(
  ({ className, features, tiers, ...props }, ref) => {
    return (
      <div ref={ref} {...props} className={cn("w-full overflow-x-auto pb-8", className)}>
        <div className="min-w-[800px] border border-zinc-800 rounded-3xl overflow-hidden bg-zinc-950/50 backdrop-blur-xl relative">
          
          {/* Table Header / Tiers */}
          <div className="grid grid-cols-[minmax(250px,1fr)_repeat(auto-fit,minmax(200px,1fr))] border-b border-zinc-800 bg-zinc-950 sticky top-0 z-20">
            <div className="p-6 lg:p-8 flex items-end">
              <span className="text-xl font-bold text-white tracking-tight">Compare Plans</span>
            </div>
            
            {tiers.map((tier) => (
              <div key={tier.id} className={cn("relative p-6 lg:p-8 flex flex-col justify-end text-center border-l border-zinc-800/50 transition-colors", tier.isPopular ? "bg-violet-500/5" : "")}>
                {tier.isPopular && (
                  <>
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-violet-500 to-cyan-400" />
                    <span className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-[10px] uppercase font-bold tracking-widest border border-violet-500/30 whitespace-nowrap">
                      Most Popular
                    </span>
                  </>
                )}
                <h3 className={cn("text-lg font-semibold mb-1", tier.isPopular ? "text-violet-300 mt-6" : "text-zinc-200")}>{tier.name}</h3>
                <div className="text-3xl font-bold text-white mb-2">{tier.price}</div>
                <p className="text-xs text-zinc-400 mb-6 line-clamp-2">{tier.description}</p>
                <button className={cn(
                  "w-full py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95",
                  tier.isPopular ? "bg-white text-black hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]" : "bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-800"
                )}>
                  {tier.buttonText}
                </button>
              </div>
            ))}
          </div>

          {/* Table Body / Features */}
          <div className="relative z-10">
            {features.map((feature, idx) => (
              <div key={feature.name} className="group grid grid-cols-[minmax(250px,1fr)_repeat(auto-fit,minmax(200px,1fr))] border-b border-zinc-800/50 last:border-0 hover:bg-zinc-900/50 transition-colors">
                
                {/* Feature Name Column */}
                <div className="p-4 lg:px-8 flex flex-col justify-center">
                  <span className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">{feature.name}</span>
                  {feature.description && <span className="text-xs text-zinc-500 mt-0.5">{feature.description}</span>}
                </div>

                {/* Tier Values Column */}
                {tiers.map((tier) => {
                  const value = tier.features[feature.name];
                  const isChecked = value === true;
                  const isCrossed = value === false || value === undefined;
                  const isString = typeof value === "string";

                  return (
                    <div key={`${tier.id}-${feature.name}`} className={cn("p-4 flex items-center justify-center border-l border-zinc-800/50", tier.isPopular ? "bg-violet-500/5 group-hover:bg-violet-500/10 transition-colors" : "")}>
                      {isChecked && <Check size={20} className="text-emerald-400" />}
                      {isCrossed && <Minus size={20} className="text-zinc-700" />}
                      {isString && <span className={cn("text-sm font-medium text-zinc-300", tier.isPopular && "text-violet-200")}>{value}</span>}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);
CosmicComparisonTable.displayName = "CosmicComparisonTable";
