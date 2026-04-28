"use client";

import React, { useState, useEffect } from "react";
import { m, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Terminal, 
  Sparkles, 
  Zap, 
  Search, 
  Lock, 
  Layout, 
  Layers, 
  MousePointer2, 
  Play, 
  PieChart, 
  Navigation, 
  Type, 
  Database 
} from "lucide-react";
import Link from "next/link";
import { CATEGORY_GROUPS } from "@/lib/categories";

// For miniature live previews on hover
import dynamic from 'next/dynamic';

export default function LandingPage() {
  const [stats, setStats] = useState<Record<string, number> | null>(null);
  const [hoveredGroupId, setHoveredGroupId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/registry/index.json")
      .then((res) => res.json())
      .then((data) => setStats(data.stats))
      .catch(() => {});
  }, []);

  const trendingComponents = [
    { name: "bento-grid", title: "Bento Grid v2", category: "Layout", isPro: false, color: "from-blue-500/20 to-cyan-500/20" },
    { name: "liquidaccordion", title: "Liquid Accordion", category: "Disclosure", isPro: false, color: "from-purple-500/20 to-pink-500/20" },
    { name: "dimensional-auth", title: "Dimensional Auth", category: "Forms", isPro: true, color: "from-amber-500/20 to-orange-500/20" },
    { name: "holographic-card", title: "Holographic Card", category: "Display", isPro: false, color: "from-emerald-500/20 to-teal-500/20" },
  ];

  return (
    <LazyMotion features={domAnimation}>
    <main className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      {/* ───── 1. HERO SECTION ───── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1),transparent_70%)] opacity-50" />
          <div 
            className="absolute inset-0 opacity-[0.02]" 
            style={{ 
              backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", 
              backgroundSize: "80px 80px" 
            }} 
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-white/5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-8"
          >
            <Sparkles size={12} className="text-purple-500" />
            The Enterprise UI Ecosystem
          </m.div>

          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-8"
          >
            <span className="bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent">
              Modern UI
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Vault
            </span>
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            A high-performance component architecture for React.
            <span className="text-white"> Physics-based interactions,</span> zero runtime bloat, and total code ownership.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/components"
              className="group flex items-center gap-2 px-8 py-4 bg-white text-black rounded-2xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              Explore Components
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-3 px-6 py-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl font-mono text-sm text-zinc-500 backdrop-blur-md">
              <Terminal size={16} />
              <code>npx modern-ui-vault init</code>
            </div>
          </m.div>
        </div>
      </section>

      {/* ───── 2. TRENDING NOW ───── */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black tracking-tight mb-2">Trending Now</h2>
            <p className="text-zinc-500 text-sm">Most popular components this week</p>
          </div>
          <Link href="/components" className="text-zinc-400 hover:text-white text-sm font-bold flex items-center gap-2 transition-colors">
            View all {stats?.totalComponents} components <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingComponents.map((comp, i) => (
            <m.div
              key={comp.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
              href={`/components/${comp.name}`}
              className="group relative block p-8 rounded-3xl bg-zinc-950 border border-zinc-900 hover:border-white/20 transition-all overflow-hidden h-full shadow-2xl"
            >
              {/* Bottom satisfied progress line - Restored */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-violet-600 via-purple-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                   <span className="px-3 py-1 rounded-full bg-zinc-900 text-[9px] font-black uppercase text-zinc-500 border border-white/5 tracking-widest">
                      {comp.category}
                   </span>
                   <div className="flex items-center gap-2">
                     {comp.isPro && <Lock size={12} className="text-amber-500" />}
                     <ArrowRight size={16} className="text-zinc-700 group-hover:text-white group-hover:translate-x-1 transition-all" />
                   </div>
                </div>
                <h3 className="text-xl font-bold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 group-hover:bg-clip-text transition-all duration-300">
                  {comp.title}
                </h3>
                <p className="text-zinc-500 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   Engineering component vault asset
                </p>
              </div>
            </Link>
            </m.div>
          ))}
        </div>
      </section>

      {/* ───── 3. APPLE-STYLE CATEGORY GRID ───── */}
      <section className="py-24 px-6 bg-zinc-950/30 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Browse by Ecosystem</h2>
              <p className="text-zinc-500 max-w-xl mx-auto">Discover 135 unique categories organized into 9 high-impact groups.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORY_GROUPS.map((group, i) => (
                <m.div
                  key={group.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={`/components?group=${group.id}`}
                    onMouseEnter={() => setHoveredGroupId(group.id)}
                    onMouseLeave={() => setHoveredGroupId(null)}
                    className="group relative block h-[340px] rounded-[2.5rem] bg-zinc-900/30 border border-white/5 hover:border-white/20 backdrop-blur-xl transition-all duration-500 overflow-hidden"
                  >
                    {/* Background Visual (Mini Preview Interface) */}
                    <div className="absolute inset-0 z-0">
                       <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
                       <AnimatePresence>
                          {hoveredGroupId === group.id && (
                             <m.div 
                               initial={{ opacity: 0 }}
                               animate={{ opacity: 0.3 }}
                               exit={{ opacity: 0 }}
                               className="absolute inset-0 flex items-center justify-center p-12"
                             >
                                {/* We'll use custom-built mini-interfaces as SVG/Motion placeholders for now */}
                                <GroupIconComponent id={group.id} />
                             </m.div>
                          )}
                       </AnimatePresence>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full p-10 flex flex-col justify-end">
                       <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                          <LucideIcon id={group.id} className="text-white group-hover:text-purple-400 transition-colors" />
                       </div>
                       <h3 className="text-2xl font-bold mb-2 group-hover:text-white transition-colors">{group.name}</h3>
                       <p className="text-zinc-500 text-sm mb-4 line-clamp-2">{group.description}</p>
                       <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-zinc-300 transition-colors">
                          {group.categories.length} Categories <ArrowRight size={10} />
                       </div>
                    </div>

                    {/* Glossy Reflection */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </Link>
                </m.div>
              ))}
           </div>
        </div>
      </section>

      {/* ───── 4. STATS ───── */}
      <section className="py-20 px-6">
         <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            {[
              { label: "Total Components", value: stats?.totalComponents || "200+" },
              { label: "Design Systems", value: "∞" },
              { label: "Bundle Size", value: "0KB" },
              { label: "Production Ready", value: "100%" },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                 <div className="text-2xl font-black mb-1">{stat.value}</div>
                 <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{stat.label}</div>
              </div>
            ))}
         </div>
      </section>

      {/* ───── 5. CTA ───── */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1),transparent_70%)]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
           <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8">Ready to Elevate <br />Your Interface?</h2>
           <p className="text-zinc-400 text-lg mb-12 max-w-2xl mx-auto">Join the ecosystem where design meets performance. Stop building primitives, start engineering experiences.</p>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/pricing" className="px-10 py-5 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-500 transition-all shadow-xl shadow-purple-500/20">
                 Unlock the Pro Vault
              </Link>
              <Link href="/components" className="px-10 py-5 bg-zinc-900 text-white font-bold rounded-2xl border border-zinc-800 hover:bg-zinc-800 transition-all">
                 Browse the Free Collection
              </Link>
           </div>
        </div>
      </section>
    </main>
    </LazyMotion>
  );
}

function LucideIcon({ id, className }: { id: string; className?: string }) {
  switch(id) {
    case "actions": return <Zap className={className} />;
    case "inputs": return <Type className={className} />;
    case "navigation": return <Navigation className={className} />;
    case "feedback": return <Sparkles className={className} />;
    case "data": return <Database className={className} />;
    case "visualization": return <PieChart className={className} />;
    case "visual-effects": return <Layers className={className} />;
    case "overlays": return <Layout className={className} />;
    case "media": return <Play className={className} />;
    default: return <Zap className={className} />;
  }
}

// A helper for the "Hybrid Approach" - Render specific SVG/Motion abstractions per group
function GroupIconComponent({ id }: { id: string }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { scale: 0, opacity: 0 },
    show: { scale: 1, opacity: 1 }
  };

  if (id === "actions") {
    return (
      <m.div variants={container} initial="hidden" animate="show" className="flex gap-4">
        {[1, 2, 3].map(i => (
          <m.div key={i} variants={item} className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/40" />
        ))}
      </m.div>
    );
  }

  if (id === "visualization") {
    return (
      <div className="flex items-end gap-2 h-20">
        {[10, 40, 20, 60, 30].map((h, i) => (
          <m.div 
            key={i} 
            initial={{ height: 0 }} 
            animate={{ height: `${h}%` }} 
            className="w-4 bg-cyan-500/20 border border-cyan-500/40 rounded-t" 
          />
        ))}
      </div>
    );
  }

  // Default placeholder for other groups
  return <LucideIcon id={id} className="w-32 h-32 opacity-10 stroke-[0.5]" />;
}
