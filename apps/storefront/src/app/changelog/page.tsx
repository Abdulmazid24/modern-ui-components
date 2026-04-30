"use client";

import React from "react";
import { motion } from "framer-motion";
import { GitCommit, Sparkles, Zap, Bug, Wrench } from "lucide-react";
import Link from "next/link";

interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  type: "major" | "minor" | "patch";
  changes: { icon: React.ReactNode; text: string }[];
}

const CHANGELOG_DATA: ChangelogEntry[] = [
  {
    version: "1.0.0",
    date: "April 2026",
    title: "Initial Public Release",
    type: "major",
    changes: [
      { icon: <Sparkles size={14} className="text-purple-400" />, text: "370+ enterprise-grade animated React components" },
      { icon: <Sparkles size={14} className="text-purple-400" />, text: "14 ecosystem categories with 240+ sub-categories" },
      { icon: <Zap size={14} className="text-cyan-400" />, text: "CLI tool for instant component installation" },
      { icon: <Zap size={14} className="text-cyan-400" />, text: "TSX and JSX dialect support with automatic type stripping" },
      { icon: <Zap size={14} className="text-cyan-400" />, text: "Physics-based animations with Framer Motion 12 springs" },
      { icon: <Zap size={14} className="text-cyan-400" />, text: "Pro license gating with LemonSqueezy integration" },
      { icon: <Wrench size={14} className="text-amber-400" />, text: "Storefront with live preview, code viewer, and install tabs" },
      { icon: <Wrench size={14} className="text-amber-400" />, text: "4-tier pricing: Free, Pro ($79), Team ($199), Enterprise ($499)" },
    ],
  },
  {
    version: "0.9.0",
    date: "March 2026",
    title: "Beta Release",
    type: "minor",
    changes: [
      { icon: <Sparkles size={14} className="text-purple-400" />, text: "200+ components across 9 ecosystem groups" },
      { icon: <Zap size={14} className="text-cyan-400" />, text: "Registry build pipeline with AST-based dependency detection" },
      { icon: <Bug size={14} className="text-red-400" />, text: "Fixed SSR hydration mismatches in animated components" },
      { icon: <Wrench size={14} className="text-amber-400" />, text: "Responsive preview toolbar (Desktop/Tablet/Mobile)" },
    ],
  },
  {
    version: "0.5.0",
    date: "February 2026",
    title: "Alpha Preview",
    type: "minor",
    changes: [
      { icon: <Sparkles size={14} className="text-purple-400" />, text: "Initial component library with 80+ components" },
      { icon: <Zap size={14} className="text-cyan-400" />, text: "Next.js 16 storefront with dark-mode design" },
      { icon: <Wrench size={14} className="text-amber-400" />, text: "Registry JSON build system" },
    ],
  },
];

const TYPE_COLORS: Record<string, string> = {
  major: "from-violet-600 to-purple-600",
  minor: "from-cyan-600 to-blue-600",
  patch: "from-emerald-600 to-teal-600",
};

export default function ChangelogPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-purple-400 text-sm font-bold uppercase tracking-widest mb-4">
            <GitCommit size={16} />
            Changelog
          </div>
          <h1 className="text-5xl font-black tracking-tight mb-4">What&apos;s New</h1>
          <p className="text-xl text-zinc-400 leading-relaxed">
            All notable changes to Modern UI Vault are documented here.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-zinc-800" />

          <div className="space-y-16">
            {CHANGELOG_DATA.map((entry, index) => (
              <motion.div
                key={entry.version}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-14"
              >
                {/* Timeline dot */}
                <div className={`absolute left-0 top-1 w-10 h-10 rounded-xl bg-gradient-to-br ${TYPE_COLORS[entry.type]} flex items-center justify-center shadow-lg`}>
                  <GitCommit size={18} className="text-white" />
                </div>

                {/* Version header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-black">v{entry.version}</span>
                  <span className="px-3 py-1 rounded-full bg-zinc-900 text-xs font-bold uppercase tracking-widest text-zinc-500 border border-zinc-800">
                    {entry.date}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-zinc-300 mb-4">{entry.title}</h3>

                {/* Changes list */}
                <ul className="space-y-3">
                  {entry.changes.map((change, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
                      <span className="mt-0.5 shrink-0">{change.icon}</span>
                      {change.text}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-20 p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800/50 text-center">
          <h3 className="text-xl font-bold mb-2">Want to stay updated?</h3>
          <p className="text-zinc-500 text-sm mb-6">Follow us on GitHub to get notified about new releases.</p>
          <a
            href="https://github.com/Abdulmazid24/modern-ui-components"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold text-sm hover:scale-105 transition-all"
          >
            Star on GitHub
          </a>
        </div>
      </div>
    </main>
  );
}
