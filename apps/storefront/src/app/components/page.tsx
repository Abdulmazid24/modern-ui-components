"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { m, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import { Search, Lock, MoveRight, ChevronLeft, Filter, X } from "lucide-react";
import Link from "next/link";
import { CATEGORY_GROUPS } from "@/lib/categories";

interface RegistryData {
  stats: Record<string, number>;
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

function ExplorerContent() {
  const searchParams = useSearchParams();
  const initialGroup = searchParams.get("group");

  const [registry, setRegistry] = useState<RegistryData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(initialGroup);
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

  const filteredComponents = useMemo(() => {
    if (!registry) return [];
    let result = registry.components;

    // Filter by Super Group first
    if (selectedGroupId) {
      const group = CATEGORY_GROUPS.find(g => g.id === selectedGroupId);
      if (group) {
        result = result.filter(c => group.categories.includes(c.category.toLowerCase()));
      }
    }

    // Filter by specific Category
    if (selectedCategory) {
      result = result.filter((c) => c.category === selectedCategory);
    }

    // Filter by Search
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
  }, [registry, searchQuery, selectedCategory, selectedGroupId]);

  const activeGroup = CATEGORY_GROUPS.find(g => g.id === selectedGroupId);

  return (
    <LazyMotion features={domAnimation}>
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb & Navigation */}
        <div className="mb-12">
            <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-4 text-xs font-bold uppercase tracking-widest">
               <ChevronLeft size={14} /> Back to Dashboard
            </Link>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
               <div>
                  <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
                     {activeGroup ? activeGroup.name : "All Components"}
                  </h1>
                  <p className="text-zinc-500 max-w-xl">
                     {activeGroup ? activeGroup.description : "Explore the complete library of 200+ enterprise-grade React components."}
                  </p>
               </div>
               
               {/* Search Bar */}
               <div className="relative w-full max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                  <input
                    type="text"
                    placeholder="Search components..."
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-zinc-600 outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
               </div>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
           
           {/* Left Sidebar: Super Groups */}
           <aside className="w-full lg:w-64 space-y-8">
              <div>
                 <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-4 px-2">Ecosystems</h3>
                 <div className="grid grid-cols-2 lg:grid-cols-1 gap-1">
                    <button
                      onClick={() => { setSelectedGroupId(null); setSelectedCategory(null); }}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${!selectedGroupId ? 'bg-white text-black' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
                    >
                       <Filter size={16} /> All Components
                    </button>
                    {CATEGORY_GROUPS.map(group => (
                       <button
                         key={group.id}
                         onClick={() => { setSelectedGroupId(group.id); setSelectedCategory(null); }}
                         className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all text-left ${selectedGroupId === group.id ? 'bg-purple-600 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
                       >
                          <span className="capitalize">{group.name}</span>
                       </button>
                    ))}
                 </div>
              </div>

              {/* Sub-categories (relevant to selected group) */}
              {activeGroup && (
                <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                   <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-4 px-2">Sub Categories</h3>
                   <div className="flex flex-wrap lg:flex-col gap-1">
                      {activeGroup.categories.map(cat => {
                         const count = registry?.components.filter(c => c.category === cat).length || 0;
                         if (count === 0) return null;
                         return (
                            <button
                               key={cat}
                               onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                               className={`flex items-center justify-between px-4 py-2 rounded-lg text-xs font-bold transition-all ${selectedCategory === cat ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                            >
                               <span className="capitalize">{cat}</span>
                               <span className="opacity-50">{count}</span>
                            </button>
                         );
                      })}
                   </div>
                </m.div>
              )}
           </aside>

           {/* Main Grid */}
           <div className="flex-1">
              {isLoading ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                       <div key={i} className="h-64 rounded-3xl bg-zinc-900/50 animate-pulse border border-zinc-800/50" />
                    ))}
                 </div>
              ) : (
                 <>
                    <div className="flex items-center justify-between mb-8">
                       <p className="text-zinc-500 text-sm font-bold">Showing {filteredComponents.length} components</p>
                       {(searchQuery || selectedCategory) && (
                          <button 
                            onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}
                            className="flex items-center gap-2 text-xs font-bold text-purple-400 hover:text-purple-300"
                          >
                             Clear filters <X size={14} />
                          </button>
                       )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                       <AnimatePresence mode="popLayout">
                          {filteredComponents.map((comp, i) => (
                             <m.div
                               key={comp.name}
                               layout
                               initial={{ opacity: 0, y: 20 }}
                               animate={{ opacity: 1, y: 0 }}
                               exit={{ opacity: 0, scale: 0.95 }}
                               transition={{ duration: 0.3, delay: Math.min(i * 0.02, 0.2) }}
                             >
                                <Link
                                  href={`/components/${comp.name}`}
                                  className="group relative block p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 hover:border-white/20 transition-all h-full overflow-hidden shadow-2xl"
                                >
                                   {/* Bottom signature progress line */}
                                   <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-violet-600 via-purple-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />

                                   <div className="flex justify-between items-start mb-6">
                                      <span className="px-3 py-1 rounded-full bg-zinc-900 text-[10px] font-black uppercase text-zinc-500 border border-white/5 tracking-widest">
                                         {comp.category}
                                      </span>
                                      <div className="flex items-center gap-2">
                                        {comp.isPro && <Lock size={12} className="text-amber-500" />}
                                        <MoveRight className="text-zinc-700 group-hover:text-white group-hover:translate-x-1 transition-all" size={18} />
                                      </div>
                                   </div>
                                   <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 group-hover:bg-clip-text transition-all duration-300">
                                      {comp.title}
                                   </h3>
                                   <p className="text-zinc-500 text-sm line-clamp-2 mb-6 group-hover:text-zinc-400 transition-colors">{comp.description}</p>
                                   <div className="flex items-center justify-between mt-auto">
                                      <div className="flex gap-1 opacity-30 group-hover:opacity-100 transition-opacity">
                                         <div className="w-2 h-2 rounded-full bg-blue-500" />
                                         <div className="w-2 h-2 rounded-full bg-purple-500" />
                                         <div className="w-2 h-2 rounded-full bg-cyan-500" />
                                      </div>
                                   </div>
                                </Link>
                             </m.div>
                          ))}
                       </AnimatePresence>
                    </div>

                    {!isLoading && filteredComponents.length === 0 && (
                       <div className="text-center py-40 border border-dashed border-zinc-800 rounded-[3rem]">
                          <Search size={40} className="mx-auto text-zinc-700 mb-6" />
                          <h3 className="text-xl font-bold mb-2">No components found</h3>
                          <p className="text-zinc-500 max-w-xs mx-auto text-sm">We couldn&apos;t find anything matching your search criteria. Try common keywords like &apos;button&apos; or &apos;card&apos;.</p>
                       </div>
                    )}
                 </>
              )}
           </div>

        </div>
      </div>
    </div>
    </LazyMotion>
  );
}

export default function ExplorerPage() {
  return (
    <Suspense fallback={<div className="p-40 text-center animate-pulse text-zinc-500 font-mono">Initializing Explorer...</div>}>
       <ExplorerContent />
    </Suspense>
  );
}
