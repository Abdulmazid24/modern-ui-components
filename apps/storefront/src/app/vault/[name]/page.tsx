"use client";

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ChevronLeft, Code2, Globe, Copy, Check, Terminal, Lock, Smartphone, Tablet, Monitor } from "lucide-react";
import dynamic from 'next/dynamic';
import { CodeBlock } from "@/components/CodeBlock";

// Registry is fetched from public/registry
export default function ComponentPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = use(params);
  const [registryData, setRegistryData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'install'>('preview');
  const [activeDialect, setActiveDialect] = useState('tsx');
  const [responsiveView, setResponsiveView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`/registry/${name}.json`)
      .then(res => res.json())
      .then(data => setRegistryData(data));
  }, [name]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!registryData) return <div className="p-20 text-center animate-pulse text-cyan-500 font-mono">Decrypting Vault Assets...</div>;

  // Use isPro flag from registry data (set by build-registry.ts from shared config)
  const isPro = registryData.isPro || false;

  // Dynamically import the component for preview
  const componentExportName = registryData.title.replace(/\s/g, '');
  const DynamicPreview = dynamic(() => import(`../../../../../../packages/react/${registryData.category}/${componentExportName}`).then(mod => mod[componentExportName]), {
     loading: () => <div className="h-64 flex items-center justify-center bg-zinc-900 rounded-3xl animate-pulse">Loading Preview...</div>,
     ssr: false
  });

   // Generate mock props based on category/title to prevent runtime crashes
   const getMockProps = () => {
      const cat = registryData.category;
      if (cat === 'select') return { options: [{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }] };
      if (cat === 'layout' || cat === 'accordion' || cat === 'tabs' || cat === 'timeline') return { items: [{ id: '1', label: 'Item 1', title: 'Item 1', content: 'Demo Content', date: '2026' }, { id: '2', label: 'Item 2', title: 'Item 2', content: 'Demo Content', date: '2027' }] };
      if (cat === 'tree-view') return { data: [{ id: '1', label: 'Folder A', isFolder: true, children: [{ id: '1-1', label: 'File.js' }] }] };
      if (cat === 'breadcrumbs') return { paths: [{ id: '1', label: 'Home' }, { id: '2', label: 'Features' }], activeId: '2' };
      if (cat === 'gallery') return { images: [{ id: '1', url: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74', alt: 'A' }, { id: '2', url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba', alt: 'B' }] };
      if (cat === 'table') return { columns: [{ key: 'id', header: 'ID' }, { key: 'name', header: 'Name' }], data: [{ id: '1', name: 'John Doe' }] };
      if (cat === 'badge') return { text: "Hologram Badge" };
      if (cat === 'alert') return { title: "System Ready", message: "All systems operational." };
      if (cat === 'multi-select' || cat === 'command-palette') return { tags: [{ id: '1', label: 'Next.js' }, { id: '2', label: 'React' }], groups: [{ heading: 'Demo', items: [{ id: '1', label: 'Item' }] }] };
      
      // Default fallback for safe generic items
      return {
         items: [
           { id: '1', label: 'Dashboard', icon: <Globe size={18} /> },
           { id: '2', label: 'Projects', icon: <Code2 size={18} /> },
           { id: '3', label: 'Settings', icon: <ChevronLeft size={18} /> }
         ],
         cards: [
           { id: '1', title: 'Demo 1', description: 'Sample card', bg: 'bg-zinc-900' },
           { id: '2', title: 'Demo 2', description: 'Sample card', bg: 'bg-zinc-800' }
         ],
         navItems: [
           { id: '1', label: 'Home' },
           { id: '2', label: 'About' }
         ],
         links: [
           { label: 'Home', href: '#' }
         ]
      };
   };

  const cliCommand = `npx modern-ui-vault add ${registryData.name.toLowerCase()}`;

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans selection:bg-cyan-500/30">
      <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 text-sm uppercase tracking-widest font-bold">
         <ChevronLeft size={16} /> Engineering Vault
      </Link>

      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-900 pb-8">
           <div>
              <div className="flex items-center gap-4 mb-2">
                 <h1 className="text-4xl md:text-5xl font-black tracking-tight">{registryData.title}</h1>
                 {isPro && (
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-full text-xs font-bold uppercase tracking-widest">
                       <Lock size={12} /> Pro
                    </div>
                 )}
              </div>
              <p className="text-zinc-400 font-mono text-sm tracking-widest uppercase mt-4">
                 <span className="text-cyan-500">Registry</span> / {registryData.category}
              </p>
           </div>

           {/* Quick Install Copy */}
           <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 p-2 rounded-xl transition-colors hover:bg-zinc-900 group">
              <Terminal size={18} className="text-zinc-500 ml-2" />
              <code className="text-zinc-300 font-mono text-sm mr-4 select-all">{cliCommand}</code>
              <button 
                onClick={() => handleCopy(cliCommand)}
                className="p-2 bg-zinc-800 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                title="Copy CLI Command"
              >
                 {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
           </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 border-b border-zinc-900 pb-4">
           {['preview', 'code', 'install'].map((tab) => (
              <button
                 key={tab}
                 onClick={() => setActiveTab(tab as any)}
                 className={`px-4 py-2 rounded-full text-sm font-bold capitalize transition-colors ${activeTab === tab ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'text-zinc-500 hover:text-white hover:bg-zinc-900'}`}
              >
                 {tab}
              </button>
           ))}
        </div>

        {/* Tab Content */}
        <div className="w-full">
           
           {activeTab === 'preview' && (
              <div>
                {/* Responsive Preview Toolbar */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
                    {[
                      { id: 'desktop' as const, icon: <Monitor size={16} />, label: 'Desktop', width: '100%' },
                      { id: 'tablet' as const, icon: <Tablet size={16} />, label: 'Tablet', width: '768px' },
                      { id: 'mobile' as const, icon: <Smartphone size={16} />, label: 'Mobile', width: '375px' },
                    ].map((device) => (
                      <button
                        key={device.id}
                        onClick={() => setResponsiveView(device.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          responsiveView === device.id
                            ? 'bg-white text-black shadow-[0_0_10px_rgba(255,255,255,0.2)]'
                            : 'text-zinc-500 hover:text-white hover:bg-zinc-800'
                        }`}
                      >
                        {device.icon}
                        <span className="hidden sm:inline">{device.label}</span>
                      </button>
                    ))}
                  </div>
                  <span className="text-xs text-zinc-600 font-mono hidden md:block">
                    {responsiveView === 'desktop' ? '100%' : responsiveView === 'tablet' ? '768px' : '375px'}
                  </span>
                </div>

                {/* Preview Container with responsive width */}
                <div className="flex justify-center w-full transition-all duration-500">
                  <div
                    className="relative group min-h-[500px] flex items-center justify-center bg-zinc-950 rounded-[2.5rem] border border-zinc-900 overflow-hidden p-6 md:p-12 shadow-2xl transition-all duration-500 ease-out"
                    style={{
                      width: responsiveView === 'desktop' ? '100%' : responsiveView === 'tablet' ? '768px' : '375px',
                      maxWidth: '100%',
                    }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.05),transparent_70%)] pointer-events-none" />
                    {/* @ts-expect-error - Dynamic preview receives arbitrary mock props depending on the component's category */}
                    <DynamicPreview {...getMockProps()} />
                  </div>
                </div>
              </div>
            )}

           {activeTab === 'code' && (
             <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] overflow-hidden flex flex-col h-[700px] relative">
                
                {/* Pro Lock Screen Interstitial */}
                {isPro && (
                   <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-20 flex items-center justify-center">
                      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl max-w-md text-center flex flex-col items-center shadow-2xl">
                         <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-6">
                            <Lock size={32} />
                         </div>
                         <h3 className="text-2xl font-bold mb-2">Pro Component</h3>
                         <p className="text-zinc-400 text-sm mb-8">This component is locked. Unlock the full potential of Modern UI Vault by purchasing an official license.</p>
                         <button className="w-full py-3 bg-amber-500 text-black font-bold uppercase tracking-widest rounded-xl hover:bg-amber-400 transition-colors">
                            Unlock Full Vault
                         </button>
                      </div>
                   </div>
                )}

                <div className="p-4 border-b border-zinc-900 flex items-center justify-between bg-zinc-900/50">
                   <div className="flex gap-2">
                      {Object.keys(registryData.dialects).map(dialect => (
                         <button
                            key={dialect}
                            onClick={() => setActiveDialect(dialect)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                               activeDialect === dialect ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'
                            }`}
                         >
                            {dialect.toUpperCase()}
                         </button>
                      ))}
                   </div>
                   <button 
                     onClick={() => handleCopy(registryData.dialects[activeDialect]?.files[0]?.content)}
                     className="flex items-center gap-2 text-xs font-bold px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-all"
                   >
                      {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      Copy Code
                   </button>
                </div>
                <div className={`flex-1 overflow-auto ${isPro ? 'blur-sm select-none' : ''}`}>
                   <CodeBlock
                     code={registryData.dialects[activeDialect]?.files[0]?.content || ''}
                     language={activeDialect}
                     showLineNumbers={true}
                     maxHeight="600px"
                   />
                </div>
             </div>
           )}

           {activeTab === 'install' && (
              <div className="max-w-3xl space-y-8">
                 <div className="bg-zinc-950 border border-zinc-900 p-8 rounded-[2rem]">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Terminal size={20} className="text-cyan-500"/> CLI Installation</h3>
                    <p className="text-zinc-400 text-sm mb-6">The fastest way to install components is via the official CLI. It automatically resolves dependencies and setups up your files.</p>
                    
                    {isPro && (
                       <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex gap-3 text-amber-500/80 text-sm">
                          <Lock size={20} className="shrink-0" />
                          <p>This is a Pro component. Make sure your CLI is authenticated by running <code className="text-amber-500 bg-amber-500/20 px-1 rounded">npx modern-ui-vault login</code> before installing.</p>
                       </div>
                    )}

                    <div className="bg-black border border-zinc-800 rounded-xl p-4 font-mono text-sm text-cyan-400">
                       {cliCommand}
                    </div>
                 </div>

                 <div className="bg-zinc-950 border border-zinc-900 p-8 rounded-[2rem]">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Code2 size={20} className="text-emerald-500"/> Dependencies</h3>
                    <ul className="list-disc list-inside text-zinc-400 text-sm space-y-2">
                       {registryData.dependencies?.map((dep: string) => (
                          <li key={dep} className="font-mono text-white/80">{dep}</li>
                       ))}
                       {(!registryData.dependencies || registryData.dependencies.length === 0) && (
                          <li className="text-zinc-500">No external dependencies required.</li>
                       )}
                    </ul>
                 </div>
              </div>
           )}

        </div>
      </div>
    </div>
  );
}
