"use client";

import React, { useState, useEffect, use } from 'react';
import dynamic from 'next/dynamic';

export default function PreviewOnlyPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = use(params);
  const [registryData, setRegistryData] = useState<any | null>(null);

  useEffect(() => {
    fetch(`/registry/${name}.json`)
      .then(res => res.json())
      .then(data => setRegistryData(data))
      .catch(() => setRegistryData({ error: true }));
  }, [name]);

  if (!registryData) return null; // Blank while loading
  if (registryData.error) return <div className="text-red-500">Error loading component</div>;

  // Generate mock props specifically tailored to prevent crashes without causing DOM spread errors
  const getMockProps = () => {
     const cat = registryData.category || '';
     const name = registryData.name?.toLowerCase() || '';
     
     const DummyIcon = (props: any) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>;

     // Base dummy items — icon is a JSX element (ReactNode) by default
     const dummyItems = [
       { id: '1', label: 'Item 1', title: 'Item 1', name: 'Item 1', content: 'Demo Content', date: '2026', price: '$10', features: ['A', 'B'], url: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74', src: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74', alt: 'A', icon: <DummyIcon /> }, 
       { id: '2', label: 'Item 2', title: 'Item 2', name: 'Item 2', content: 'Demo Content', date: '2027', price: '$0', features: ['A'], url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba', src: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba', alt: 'B', icon: <DummyIcon /> }, 
       { id: '3', label: 'Item 3', title: 'Item 3', name: 'Item 3', content: 'Demo Content', date: '2028', price: '$5', features: ['C'], src: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba', url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba', alt: 'C', icon: <DummyIcon /> }
     ];

     let props: any = {};

     // ─── Navigation components ───
     if (['navbar', 'sidebar', 'footer', 'menubar', 'navigation-menu', 'dock-navigation', 'dock'].includes(cat)) {
       // Most navbars use {item.icon} (ReactNode), so pass JSX elements
       const navItems = dummyItems.map(i => ({
         ...i,
         icon: <DummyIcon />,
         value: i.label,
         color: '#a3e635',
         href: '#',
       }));
       
       // AtmosphericHaloNav expects simple string items
       if (name === 'atmospherichalonav') {
         props.items = ['Home', 'About', 'Contact'];
       } else if (name === 'liquidgooeynavbar') {
         // LiquidGooeyNavBar uses <item.icon /> (component reference)
         props.items = navItems.map(i => ({ ...i, icon: DummyIcon }));
       } else {
         props.items = navItems;
       }
       
       props.links = navItems;
       props.groups = [{ id: 'g1', heading: 'Demo', items: navItems }];
       props.menus = navItems;
       props.icons = navItems;
     }
     
     // ─── Accordion / Tabs / Timeline / Stepper ───
     if (['accordion', 'tabs', 'timeline', 'stepper', 'steps', 'guided-tour', 'transfer-list', 'carousel', 'list', 'toggle-group'].includes(cat)) {
       props.items = dummyItems;
       props.tabs = dummyItems;
       props.steps = dummyItems;
     }

     // ─── Input category (AnimatedTabs is in 'input' but needs tabs) ───
     if (['select', 'input', 'command-palette', 'combobox', 'auto-complete', 'autocomplete', 'tag-input', 'multi-select', 'segmented-control'].includes(cat)) {
       props.options = dummyItems;
       props.items = dummyItems;
       props.filtered = dummyItems;
       props.tags = [
         { id: '1', label: 'React' },
         { id: '2', label: 'Next.js' },
         { id: '3', label: 'Framer Motion' }
       ];
     }

     // ─── Infinite moving cards / Marquee ───
     if (['infinite-moving-cards', 'marquee'].includes(cat)) {
       // These render {item} directly as React children — must be ReactNode, not objects
       props.items = [
         <div key="1" className="p-4 bg-zinc-900 rounded-xl text-zinc-300 w-64">Card 1</div>,
         <div key="2" className="p-4 bg-zinc-900 rounded-xl text-zinc-300 w-64">Card 2</div>,
         <div key="3" className="p-4 bg-zinc-900 rounded-xl text-zinc-300 w-64">Card 3</div>,
       ];
     }

     // ─── Pricing ───
     if (['pricing', 'pricing-cards'].includes(cat)) {
       props.tiers = dummyItems;
       props.features = dummyItems;
     }

     // ─── Comparison Table ───
     if (['comparison-table'].includes(cat)) {
       props.features = dummyItems;
       props.tiers = [
         { id: 't1', name: 'Basic', price: '$0', description: 'Free forever', buttonText: 'Start Free', features: { 'Item 1': true, 'Item 2': false, 'Item 3': 'Limited' } },
         { id: 't2', name: 'Pro', price: '$29', description: 'Everything in Basic', isPopular: true, buttonText: 'Upgrade', features: { 'Item 1': true, 'Item 2': true, 'Item 3': 'Unlimited' } }
       ];
     }

     // ─── Feature / Bento / Hero Parallax ───
     if (['feature-grid', 'bento-grid', 'hero-parallax'].includes(cat) || name.includes('bento')) {
       props.features = dummyItems;
       props.items = dummyItems;
     }
     
     // ─── Masonry ───
     if (['masonry'].includes(cat)) {
       // HolographicMasonry expects items: ReactNode[]
       props.items = [
         <div key="1" className="p-6 bg-zinc-900 rounded-xl text-zinc-300 h-40">Masonry 1</div>,
         <div key="2" className="p-6 bg-zinc-900 rounded-xl text-zinc-300 h-56">Masonry 2</div>,
         <div key="3" className="p-6 bg-zinc-900 rounded-xl text-zinc-300 h-32">Masonry 3</div>,
       ];
     }

     // ─── Table / Data Grid ───
     if (['table', 'data-grid', 'data-table', 'grid'].includes(cat)) {
       props.columns = [{ key: 'id', header: 'ID', label: 'ID' }, { key: 'name', header: 'Name', label: 'Name' }];
       props.data = [{ id: '1', name: 'Demo 1' }, { id: '2', name: 'Demo 2' }];
     }

     // ─── Logo Cloud ───
     if (['logo-cloud', 'logo-carousel'].includes(cat)) {
       props.logos = dummyItems.map(i => ({ id: i.id, name: i.name, logo: i.name }));
       props.list = props.logos;
     }

     // ─── FAQ ───
     if (['faq'].includes(cat)) {
       props.items = dummyItems;
     }

     // ─── Team Section ───
     if (['team-section', 'team'].includes(cat)) {
       props.members = dummyItems.map(i => ({ id: i.id, name: i.name, role: 'Developer', avatar: i.src, bio: i.content }));
     }

     // ─── Testimonials / Marquee Testimonials ───
     if (['testimonial', 'testimonials', 'marquee-testimonials'].includes(cat)) {
       props.author = { name: 'Admin', avatar: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74', role: 'Developer' };
       props.quote = 'This is an amazing component library.';
       props.testimonials = dummyItems.map(i => ({ 
         id: i.id, 
         quote: i.content, 
         author: { name: i.name, avatar: i.src, role: 'User' } 
       }));
     }

     // ─── Text Effects / Typography / Morphing Text ───
     if (['text-effects', 'text', 'typography', 'morphing-text', 'effects'].includes(cat)) {
       props.text = 'Modern UI Vault';
       props.texts = ['Modern', 'UI', 'Vault'];
       props.words = ['Modern', 'UI', 'Vault'];
     }

     // ─── Animated List ───
      if (['animated-list'].includes(cat)) {
        props.items = dummyItems.map(i => (
          <div key={i.id} className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center gap-3 w-64 text-sm text-zinc-300">
            <DummyIcon />
            <div>
              <div className="font-semibold">{i.name}</div>
              <div className="text-xs text-zinc-500">{i.label}</div>
            </div>
          </div>
        ));
      }

     // ─── Roadmap ───
     if (['roadmap'].includes(cat)) {
       props.items = [
         { id: '1', title: 'Task 1', status: 'planned', description: 'Plan the thing' },
         { id: '2', title: 'Task 2', status: 'in-progress', description: 'Do the thing' },
         { id: '3', title: 'Task 3', status: 'completed', description: 'Done' }
       ];
     }

     // ─── Layout (ResizableIDEPanels) ───
     if (['layout'].includes(cat)) {
       // ResizableIDEPanels reads child.props.defaultSize
       const PanelMock = ({ defaultSize, children: c, ...rest }: any) => <div {...rest}>{c}</div>;
       props.children = [
         <PanelMock key="1" defaultSize={50} className="w-full h-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-zinc-500">Panel 1</PanelMock>,
         <PanelMock key="2" defaultSize={50} className="w-full h-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-zinc-500">Panel 2</PanelMock>
       ];
     }

     // ─── Share Menu ───
     if (['share-menu', 'menu'].includes(cat)) {
       props.items = dummyItems.map(i => ({
         id: i.id,
         label: i.label,
         icon: <DummyIcon />,
         color: '#8b5cf6',
         href: '#',
       }));
     }

     // ─── Mentions ───
     if (['mentions', 'mention'].includes(cat)) {
       props.users = dummyItems.map(i => ({ 
         id: i.id, 
         name: i.name, 
         handle: `@${i.name.replace(/\s+/g, '').toLowerCase()}`, 
         avatar: i.src 
       }));
     }

     // ─── Tree Map / Tree View / File Tree ───
     if (['tree-map', 'tree-view', 'file-tree'].includes(cat)) {
       props.data = dummyItems;
       if (cat === 'tree-map') {
         props.rootNode = { id: 'root', name: 'Root', children: dummyItems.map(i => ({ ...i, children: [] })) };
       }
     }

     // ─── Avatar Circles / Gallery / Icon Cloud ───
     if (['avatar-circles', 'gallery', 'icon-cloud', 'logo-cloud'].includes(cat)) {
       props.avatars = dummyItems;
       props.images = dummyItems;
       props.icons = dummyItems.map(i => <DummyIcon key={i.id} />);
       props.list = dummyItems.map(i => ({ ...i, icon: DummyIcon }));
     }

     // ─── Settings Panel ───
     if (['settings-panel'].includes(cat)) {
       props.categories = [
         { id: 'general', label: 'General', content: <div className="text-zinc-400">General settings content</div> },
         { id: 'account', label: 'Account', content: <div className="text-zinc-400">Account settings content</div> },
       ];
     }

     // ─── Descriptions ───
     if (['descriptions'].includes(cat)) {
       props.items = [
         { label: 'Name', value: 'Modern UI Vault' },
         { label: 'Version', value: '1.0.0' },
         { label: 'License', value: 'MIT' },
       ];
     }

     // ─── Slider ───
     if (['slider'].includes(cat)) {
       // ElasticSlider doesn't need items — it uses min/max/defaultValue
       props.min = 0;
       props.max = 100;
       props.defaultValue = 50;
     }

     // ─── One-off category props ───
     if (['changelog'].includes(cat)) props.items = dummyItems;
     if (['qr-code'].includes(cat)) props.data = "https://modernuivault.com";
     if (['notification-center'].includes(cat)) props.notifications = dummyItems;
     if (['user-profile'].includes(cat)) props.user = { name: 'Admin', avatar: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74', role: 'Developer' };
     if (['tweet-card'].includes(cat)) props.tweet = { author: { name: 'User', avatar: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74' }, body: 'Hello World', date: '2026' };
     
     if (['result-page'].includes(cat)) {
       props.icon = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>;
       props.status = 'success';
       props.title = 'Success';
       props.subtitle = 'Operation completed';
     }
     
     // ─── Timeline ───
     if (['timeline'].includes(cat)) {
       props.events = dummyItems.map(i => ({ id: i.id, title: i.title, description: i.content, date: i.date }));
     }
     
     // ─── Comment ───
     if (['comment', 'comments'].includes(cat)) {
       props.comment = {
         id: '1', 
         author: { name: 'User', avatar: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74' },
         content: 'Great component!', 
         date: 'Just now', 
         replies: []
       };
     }
     
     // ─── Code Comparison ───
     if (['code-comparison'].includes(cat)) {
       props.beforeCode = 'const a = 1;\nconsole.log(a);';
       props.afterCode = 'const b = 2;\nconsole.log(b);';
     }

     // ─── CTA Banner ───
     if (cat === 'cta-banner') props.primaryCta = { label: 'Click Me', onClick: () => {} };
     
     // ─── Components wrapping children ───
     if (['card', 'tilt-card', 'glass-card', 'modal', 'dialog', 'drawer', 'sheet'].includes(cat)) {
       props.children = (
         <div className="flex flex-col items-center justify-center p-8 text-zinc-500 font-mono text-xs border-2 border-dashed border-zinc-800 rounded-xl w-full h-full min-h-[100px]">
            Preview Content
         </div>
       );
     }
     
     if (['splitter'].includes(cat)) {
       props.children = [
         <div key="1" className="bg-zinc-900 w-full h-full min-h-[100px] flex items-center justify-center text-zinc-500 text-xs">Panel 1</div>,
         <div key="2" className="bg-zinc-900 w-full h-full min-h-[100px] flex items-center justify-center text-zinc-500 text-xs">Panel 2</div>
       ];
     }

     // Disable audio in preview headless environment to prevent autoplay policy errors
     props.enableAudio = false;

     return props;
  };

  const componentExportName = registryData.title.replace(/\s/g, '');
  const cat = registryData.category || '';
  
  const DynamicComponent = dynamic(
    () => import(`../../../../../../packages/react/${registryData.category}/${componentExportName}`).then(mod => mod[componentExportName] || mod.default),
    { ssr: false }
  );

  // Full-width categories should have no horizontal padding
  const isFullWidth = ['navbar', 'footer', 'hero', 'hero-parallax', 'sidebar', 'dock', 'dock-navigation', 'layout', 'menubar', 'navigation-menu'].includes(cat);

  return (
    <div 
      className="relative w-full min-h-[720px] flex items-center justify-center overflow-hidden bg-[#030303]"
    >
      {/* 1. Aurora / Volumetric Lighting Blobs */}
      <div className="absolute top-[-10%] left-1/4 w-[800px] h-[600px] bg-violet-600/10 rounded-[100%] blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-1/4 w-[600px] h-[500px] bg-cyan-600/10 rounded-[100%] blur-[100px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-fuchsia-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* 2. Premium Engineering Grid (Very subtle) */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 50% 50%, black 20%, transparent 80%)'
        }}
      />

      {/* 3. Star-like micro dots in the grid intersections */}
      <div 
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          backgroundPosition: '-0.5px -0.5px',
          maskImage: 'radial-gradient(circle at 50% 50%, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 30%, transparent 80%)'
        }}
      />

      {/* 4. Film Grain / Noise Texture (Stops banding and adds cinematic feel) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* 5. Edge Vignette for Depth */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />

      {/* Component render area with category-aware padding */}
      <div className={`relative z-10 w-full max-w-[2200px] mx-auto ${isFullWidth ? 'px-0 py-4' : 'p-8'} flex flex-col items-center justify-center`}>
        <DynamicComponent {...getMockProps()} />
      </div>
    </div>
  );
}
