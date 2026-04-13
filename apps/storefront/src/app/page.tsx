"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveRight, Zap, Boxes, Code2, Search, Lock, Sparkles, ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";

interface RegistryData {
  version: string;
  stats: {
    totalComponents: number;
    totalCategories: number;
    freeComponents: number;
    proComponents: number;
  };
  categories: string[];
  components: ComponentEntry[];
}

interface ComponentEntry {
  name: string;
  title: string;
  category: string;
  description: string;
  isPro: boolean;
}

export default function LandingPage() {
  const [registry, setRegistry] = useState<RegistryData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/registry/index.json")
      .then((res) => res.json())
      .then((data) => {
        setRegistry(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  // Filtered components with debounced search
  const filteredComponents = useMemo(() => {
    if (!registry) return [];
    let result = registry.components;

    if (selectedCategory) {
      result = result.filter((c) => c.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
      );
    }

    return result;
  }, [registry, searchQuery, selectedCategory]);

  const stats = registry?.stats;

  return (
    <main className="min-h-screen bg-black">
      {/* ───── Hero Section ───── */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(34,211,238,0.06),transparent_60%)]" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-xs font-bold uppercase tracking-widest mb-8"
          >
            <Sparkles size={14} />
            {stats ? `${stats.totalComponents} Components` : "Loading..."} · Enterprise Grade · 2026
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-[0.95]"
          >
            <span className="bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent">
              Modern UI
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Vault
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Premium animated React components with{" "}
            <span className="text-white font-semibold">physics-based interactions</span>.
            Copy, paste, customize. You own the code.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <a
              href="#explorer"
              className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl text-white font-bold text-sm uppercase tracking-widest hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] transition-all duration-300 hover:scale-105"
            >
              Browse Components
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex items-center gap-3 px-6 py-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl font-mono text-sm text-zinc-400">
              <Terminal size={16} />
              <code>npx modern-ui-vault init</code>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───── Stats Bar ───── */}
      <section className="py-12 border-y border-zinc-900 bg-zinc-950/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: stats?.totalComponents || "—", label: "Components" },
            { value: stats?.totalCategories || "—", label: "Categories" },
            { value: "0KB", label: "Runtime Bloat" },
            { value: "2026", label: "Market Standard" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl md:text-4xl font-black tracking-tighter mb-1">{stat.value}</div>
              <div className="text-zinc-500 text-xs uppercase tracking-widest font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───── Explorer Section ───── */}
      <section id="explorer" className="py-20 px-6 max-w-7xl mx-auto">
        {/* Search & Filters */}
        <div className="flex flex-col gap-6 mb-12">
          {/* Search Bar */}
          <div className="relative w-full max-w-xl group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-purple-500 transition-colors" size={20} />
            <input
              type="text"
              placeholder={`Search ${stats?.totalComponents || ""} components...`}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all text-white placeholder:text-zinc-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filter Chips */}
          {registry?.categories && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  !selectedCategory
                    ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                    : "bg-zinc-900/50 text-zinc-500 border border-zinc-800 hover:text-white hover:border-zinc-600"
                }`}
              >
                All ({stats?.totalComponents})
              </button>
              {registry.categories.slice(0, 20).map((cat) => {
                const count = registry.components.filter((c) => c.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      selectedCategory === cat
                        ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                        : "bg-zinc-900/50 text-zinc-500 border border-zinc-800 hover:text-white hover:border-zinc-600"
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Component Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredComponents.map((comp, index) => (
              <motion.div
                key={comp.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
              >
                <Link
                  href={`/vault/${comp.name}`}
                  className="group relative flex flex-col p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800/50 hover:border-purple-500/50 transition-all duration-300 overflow-hidden h-full"
                >
                  {/* Bottom progress line */}
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-purple-600 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />

                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-purple-500/10 text-purple-400 text-[10px] font-bold tracking-widest uppercase rounded-full">
                        {comp.category}
                      </span>
                      {comp.isPro && (
                        <span className="flex items-center gap-1 px-2 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-bold tracking-widest uppercase rounded-full">
                          <Lock size={10} /> Pro
                        </span>
                      )}
                    </div>
                    <MoveRight className="text-zinc-700 group-hover:text-white group-hover:translate-x-1 transition-all" size={18} />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold mb-2 group-hover:text-purple-400 transition-colors">
                    {comp.title}
                  </h3>
                  <p className="text-zinc-500 text-sm line-clamp-2 flex-1">
                    {comp.description}
                  </p>

                  {/* Dialect badges */}
                  <div className="flex gap-2 mt-6 opacity-50 group-hover:opacity-100 transition-opacity">
                    <div className="px-2 py-1 rounded bg-zinc-800 text-[10px] font-bold tracking-wider">TSX</div>
                    <div className="px-2 py-1 rounded bg-zinc-800 text-[10px] font-bold tracking-wider">JSX</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {!isLoading && filteredComponents.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-lg mb-4">No components found matching your search.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
              }}
              className="px-6 py-3 bg-zinc-800 rounded-xl text-sm font-bold text-white hover:bg-zinc-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800/50 animate-pulse">
                <div className="w-20 h-5 bg-zinc-800 rounded-full mb-4" />
                <div className="w-3/4 h-6 bg-zinc-800 rounded mb-3" />
                <div className="w-full h-4 bg-zinc-800/50 rounded mb-2" />
                <div className="w-2/3 h-4 bg-zinc-800/50 rounded" />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ───── CTA Section ───── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08),transparent_60%)]" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Ready to build something{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              extraordinary
            </span>
            ?
          </h2>
          <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
            Get started for free or unlock the full vault with a Pro license.
            Enterprise-grade quality, zero runtime bloat.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-3 px-6 py-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl font-mono text-sm text-zinc-400">
              <Terminal size={16} />
              <code>npx modern-ui-vault add liquid-chrome-button</code>
            </div>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl text-white font-bold text-sm uppercase tracking-widest hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] transition-all duration-300"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
