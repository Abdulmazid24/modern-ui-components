"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Zap } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(139,92,246,0.12),transparent_60%)] animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(34,211,238,0.08),transparent_60%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-lg"
      >
        {/* Glitch-style 404 */}
        <div className="relative mb-8">
          <h1 className="text-[12rem] font-black leading-none tracking-tighter bg-gradient-to-b from-white via-zinc-400 to-zinc-700 bg-clip-text text-transparent select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-purple-500/10 blur-3xl" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4 tracking-tight">
          This page doesn&apos;t exist
        </h2>
        <p className="text-zinc-500 mb-10 leading-relaxed">
          The component or page you&apos;re looking for might have been moved or doesn&apos;t exist yet.
          Try browsing the component library or searching for what you need.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold text-sm hover:scale-105 transition-all"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <Link
            href="/components"
            className="flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-xl font-bold text-sm border border-zinc-800 hover:border-zinc-700 transition-all"
          >
            <Search size={16} />
            Browse Components
          </Link>
        </div>

        {/* Brand signature */}
        <div className="mt-16 flex items-center justify-center gap-2 text-zinc-700">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
            <Zap size={12} className="text-white" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest">Modern UI Vault</span>
        </div>
      </motion.div>
    </main>
  );
}
