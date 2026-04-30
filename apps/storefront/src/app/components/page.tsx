"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { m, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import { Search, Lock, MoveRight, ChevronLeft, ChevronRight, Filter, X, ArrowDownAZ } from "lucide-react";
import Link from "next/link";
import { CATEGORY_GROUPS, getGroupColor } from "@/lib/categories";

function ThumbnailWithFallback({ comp }: { comp: ComponentEntry }) {
  const [imgError, setImgError] = useState(false);
  const colorClass = getGroupColor(comp.category);

  return (
    <div className={`relative h-[130px] overflow-hidden ${imgError ? `bg-gradient-to-br ${colorClass}` : 'bg-zinc-900'}`}>
      {!imgError && (
        <img 
          src={`/previews/${comp.name}.webp`} 
          alt={comp.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          onError={() => setImgError(true)}
        />
      )}
      
      {/* Show abstract patterns ONLY if image failed (fallback mode) */}
      {imgError && (
        <>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-white/30 group-hover:scale-150 transition-transform duration-700" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-white/20 group-hover:scale-125 transition-transform duration-500 delay-100" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 group-hover:scale-110 transition-transform duration-300 delay-200" />
          </div>
          <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.5\'/%3E%3C/svg%3E")' }} />
        </>
      )}

      {/* Always show gradient fade at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-zinc-950 to-transparent z-10" />
      
      {/* Pro badge overlay */}
      {comp.isPro && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full border border-amber-500/30">
          <Lock size={10} className="text-amber-400" />
          <span className="text-[9px] font-black uppercase tracking-widest text-amber-400">Pro</span>
        </div>
      )}
    </div>
  );
}

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
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<"a-z" | "z-a" | "free-first" | "pro-first">("a-z");
  const ITEMS_PER_PAGE = 24;

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

    // Sort
    result = [...result].sort((a, b) => {
      switch (sortOption) {
        case "a-z": return a.title.localeCompare(b.title);
        case "z-a": return b.title.localeCompare(a.title);
        case "free-first": return (a.isPro === b.isPro) ? 0 : a.isPro ? 1 : -1;
        case "pro-first": return (a.isPro === b.isPro) ? 0 : a.isPro ? -1 : 1;
        default: return 0;
      }
    });

    return result;
  }, [registry, searchQuery, selectedCategory, selectedGroupId, sortOption]);

  const activeGroup = CATEGORY_GROUPS.find(g => g.id === selectedGroupId);

  // Reset to page 1 when filters change
  useEffect(() => { setCurrentPage(1); }, [searchQuery, selectedCategory, selectedGroupId, sortOption]);

  // Reset page when filters change
  const totalPages = Math.ceil(filteredComponents.length / ITEMS_PER_PAGE);
  const paginatedComponents = filteredComponents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
           
               {/* Sidebar: Nested Ecosystem Accordion */}
               <aside className="w-full lg:w-64 shrink-0">
                  <div className="sticky top-32 space-y-2">
                     <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-4 px-2">Ecosystems</h3>
                     
                     <div className="flex flex-col gap-1">
                        <button
                          onClick={() => { setSelectedGroupId(null); setSelectedCategory(null); }}
                          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${!selectedGroupId ? 'bg-white text-black shadow-lg shadow-white/10' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'}`}
                        >
                           <Filter size={16} /> All Components
                        </button>
                        
                        <div className="my-2 border-t border-zinc-900/50" />

                        {CATEGORY_GROUPS.map(group => {
                           const isActiveGroup = selectedGroupId === group.id;
                           return (
                             <div key={group.id} className="flex flex-col">
                                <button
                                  onClick={() => { setSelectedGroupId(isActiveGroup ? null : group.id); setSelectedCategory(null); }}
                                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all text-left ${isActiveGroup ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'}`}
                                >
                                   <span className="capitalize">{group.name}</span>
                                </button>
                                
                                {/* Nested Sub-categories (Accordion) */}
                                <AnimatePresence initial={false}>
                                   {isActiveGroup && (
                                     <m.div
                                       initial={{ height: 0, opacity: 0 }}
                                       animate={{ height: "auto", opacity: 1 }}
                                       exit={{ height: 0, opacity: 0 }}
                                       transition={{ duration: 0.2, ease: "easeInOut" }}
                                       className="overflow-hidden"
                                     >
                                        <div className="flex flex-col gap-0.5 pl-4 pr-2 py-2 mt-1 border-l border-zinc-800/50 ml-6">
                                           {group.categories.map(cat => {
                                              const count = registry?.components.filter(c => c.category === cat).length || 0;
                                              if (count === 0) return null;
                                              const isCatSelected = selectedCategory === cat;
                                              return (
                                                 <button
                                                    key={cat}
                                                    onClick={() => setSelectedCategory(isCatSelected ? null : cat)}
                                                    className={`group/cat flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${isCatSelected ? 'bg-purple-500/10 text-purple-400' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'}`}
                                                 >
                                                    <span className="capitalize">{cat}</span>
                                                    <span className={`text-[10px] ${isCatSelected ? 'text-purple-400/80' : 'text-zinc-600 group-hover/cat:text-zinc-500'}`}>{count}</span>
                                                 </button>
                                              );
                                           })}
                                        </div>
                                     </m.div>
                                   )}
                                </AnimatePresence>
                             </div>
                           );
                        })}
                     </div>
                  </div>
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
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                       <p className="text-zinc-500 text-sm font-bold">
                         Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredComponents.length)} of {filteredComponents.length} components
                       </p>
                       <div className="flex items-center gap-4">
                         <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5">
                           <ArrowDownAZ size={14} className="text-zinc-500" />
                           <select 
                             value={sortOption}
                             onChange={(e) => setSortOption(e.target.value as any)}
                             className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer"
                           >
                             <option value="a-z" className="bg-zinc-900">A to Z</option>
                             <option value="z-a" className="bg-zinc-900">Z to A</option>
                             <option value="free-first" className="bg-zinc-900">Free First</option>
                             <option value="pro-first" className="bg-zinc-900">Pro First</option>
                           </select>
                         </div>
                         {(searchQuery || selectedCategory) && (
                            <button 
                              onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}
                              className="flex items-center gap-2 text-xs font-bold text-purple-400 hover:text-purple-300"
                            >
                               Clear filters <X size={14} />
                            </button>
                         )}
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                       <AnimatePresence mode="popLayout">
                          {paginatedComponents.map((comp, i) => (
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
                                  className="group relative block rounded-[2rem] bg-zinc-950 border border-zinc-900 hover:border-white/20 transition-all h-full overflow-hidden shadow-2xl"
                                >
                                   {/* Smart Visual Thumbnail (Image or Gradient Fallback) */}
                                   <ThumbnailWithFallback comp={comp} />

                                   {/* Card Content */}
                                   <div className="p-6 pt-4">
                                     {/* Bottom signature progress line */}
                                     <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-violet-600 via-purple-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />

                                     <div className="flex justify-between items-start mb-3">
                                        <span className="px-3 py-1 rounded-full bg-zinc-900 text-[10px] font-black uppercase text-zinc-500 border border-white/5 tracking-widest">
                                           {comp.category}
                                        </span>
                                        <MoveRight className="text-zinc-700 group-hover:text-white group-hover:translate-x-1 transition-all" size={16} />
                                     </div>
                                     <h3 className="text-lg font-bold mb-1.5 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 group-hover:bg-clip-text transition-all duration-300">
                                        {comp.title}
                                     </h3>
                                     <p className="text-zinc-500 text-xs line-clamp-2 group-hover:text-zinc-400 transition-colors">{comp.description}</p>
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

                     {/* Pagination Controls */}
                     {totalPages > 1 && (
                       <div className="flex items-center justify-center gap-2 mt-12">
                         <button
                           onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                           disabled={currentPage === 1}
                           className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                         >
                           <ChevronLeft size={16} />
                         </button>
                         {Array.from({ length: totalPages }, (_, i) => i + 1)
                           .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
                           .map((page, idx, arr) => (
                             <React.Fragment key={page}>
                               {idx > 0 && arr[idx - 1] !== page - 1 && (
                                 <span className="text-zinc-600 text-sm px-1">&hellip;</span>
                               )}
                               <button
                                 onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                 className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                                   page === currentPage
                                     ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                                     : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                                 }`}
                               >
                                 {page}
                               </button>
                             </React.Fragment>
                           ))}
                         <button
                           onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                           disabled={currentPage === totalPages}
                           className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                         >
                           <ChevronRight size={16} />
                         </button>
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
