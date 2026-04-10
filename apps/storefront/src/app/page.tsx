"use client";

import React, { useState, useEffect } from 'react';
import { SpotlightHero } from "@vault/effects/SpotlightHero";
import { MoveRight, Zap, Boxes, Code2, Globe, Cpu, Layout, Search } from "lucide-react";
import Link from 'next/link';

export default function LandingPage() {
  const [registry, setRegistry] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/registry/index.json')
      .then(res => res.json())
      .then(data => setRegistry(data));
  }, []);

  const filteredComponents = registry?.components.filter((c: any) => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="h-[80vh]">
        <SpotlightHero 
          title="Modern UI Vault"
          subtitle="The next generation of UI components. Enterprise-grade, multi-dialect, and unprecedented."
          spotlightColor="rgba(139, 92, 246, 0.2)"
        />
      </section>

      {/* Explorer Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
           <div className="relative w-full max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-purple-500 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search 37+ predecessors..." 
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>
           
           <div className="flex gap-4 text-sm font-medium text-zinc-400">
              <span className="flex items-center gap-2"><Boxes size={16} /> {registry?.components.length || 0} Components</span>
              <span className="flex items-center gap-2 text-zinc-600">|</span>
              <span className="flex items-center gap-2 text-purple-400"><Code2 size={16} /> TSX & JSX Ready</span>
           </div>
        </div>

        {/* Component Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {filteredComponents?.map((comp: any) => (
              <Link 
                key={comp.name} 
                href={`/vault/${comp.name}`}
                className="group relative p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800/50 hover:border-purple-500/50 transition-all overflow-hidden"
              >
                 <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                 
                 <div className="flex justify-between items-start mb-6">
                    <span className="px-3 py-1 bg-purple-500/10 text-purple-400 text-[10px] font-bold tracking-widest uppercase rounded-full">
                       {comp.category}
                    </span>
                    <MoveRight className="text-zinc-700 group-hover:text-white group-hover:translate-x-1 transition-all" size={20} />
                 </div>

                 <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{comp.title}</h3>
                 <p className="text-zinc-500 text-sm line-clamp-2 mb-8">
                    Premium and unprecedented {comp.category} built for high-performance React 19 apps.
                 </p>

                 <div className="flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    <div className="w-6 h-6 rounded bg-zinc-800 flex items-center justify-center text-[10px] font-bold">T</div>
                    <div className="w-6 h-6 rounded bg-zinc-800 flex items-center justify-center text-[10px] font-bold">J</div>
                    <div className="w-6 h-6 rounded bg-zinc-800 flex items-center justify-center text-[10px] font-bold">C</div>
                 </div>
              </Link>
           ))}
        </div>
      </section>

      {/* Stats / Proof Section */}
      <section className="py-24 border-t border-zinc-900 bg-zinc-950/20">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            <div>
               <div className="text-3xl font-black mb-2 tracking-tighter">37+</div>
               <div className="text-zinc-500 text-sm uppercase tracking-widest font-bold">Elite Blocks</div>
            </div>
            <div>
               <div className="text-3xl font-black mb-2 tracking-tighter">100%</div>
               <div className="text-zinc-500 text-sm uppercase tracking-widest font-bold">Open Source</div>
            </div>
            <div>
               <div className="text-3xl font-black mb-2 tracking-tighter">0KB</div>
               <div className="text-zinc-500 text-sm uppercase tracking-widest font-bold">Runtime Bloat</div>
            </div>
            <div>
               <div className="text-3xl font-black mb-2 tracking-tighter">2026</div>
               <div className="text-zinc-500 text-sm uppercase tracking-widest font-bold">Market Standard</div>
            </div>
         </div>
      </section>

      <footer className="py-12 border-t border-zinc-900 text-center text-zinc-500 text-xs tracking-widest uppercase font-semibold">
         © 2026 Abdul Mazid. Built for the Decentralized Web.
      </footer>
    </main>
  );
}
