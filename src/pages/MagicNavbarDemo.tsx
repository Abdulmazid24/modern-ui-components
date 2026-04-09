import React, { useState } from 'react';
import { MagicNavbar } from '../components/MagicNavbar';
import type { MagicNavItem } from '../components/MagicNavbar';
import { 
  MorphBlobNavbar, 
  GlowParticleNavbar, 
  OrbitalNavbar, 
  FluidArcNavbar, 
  SpectrumNavbar, 
  DynamicIslandNav,
  NebulaPortalNav,
  NeuralSynapseNav,
  CrystallinePrismNav,
  RippleTideNav,
  CosmicHorizonNav
} from '../components/navbar';
import {
  Home, User, MessageCircle, Camera, Settings,
  Search, Heart, Bell, Compass, Zap, Layers,
  Mail, Shield, Terminal, Globe, Star, Image,
  Code, Palette, Bookmark, Share2, Activity,
  Cpu, Droplets, Wind,
} from 'lucide-react';

/* ──────────────────────────────────────────────
   Magic Navbar Config (original)
   ────────────────────────────────────────────── */

const magicNavItems: MagicNavItem[] = [
  { id: 'home', icon: <Home size={24} strokeWidth={2} />, label: 'Home' },
  { id: 'profile', icon: <User size={24} strokeWidth={2} />, label: 'Profile' },
  { id: 'messages', icon: <MessageCircle size={24} strokeWidth={2} />, label: 'Messages' },
  { id: 'camera', icon: <Camera size={24} strokeWidth={2} />, label: 'Camera' },
  { id: 'settings', icon: <Settings size={24} strokeWidth={2} />, label: 'Settings' },
];

const tabContent: Record<string, { title: string; description: string; emoji: string }> = {
  home: { title: 'Home', description: 'Welcome to your dashboard.', emoji: '🏠' },
  profile: { title: 'Profile', description: 'Manage your personal info.', emoji: '👤' },
  messages: { title: 'Messages', description: 'View and reply to messages.', emoji: '💬' },
  camera: { title: 'Camera', description: 'Capture stunning moments.', emoji: '📸' },
  settings: { title: 'Settings', description: 'Customize your experience.', emoji: '⚙️' },
};

/* ──────────────────────────────────────────────
   Section Header Component
   ────────────────────────────────────────────── */

const SectionHeader: React.FC<{
  number: string;
  title: string;
  subtitle: string;
  accentColor: string;
}> = ({ number, title, subtitle, accentColor }) => (
  <div className="text-center mb-6 px-4">
    <span className="text-xs uppercase tracking-[0.2em] font-black" style={{ color: accentColor }}>
      {number} / 12
    </span>
    <h2 className="text-white text-2xl font-black mt-2 tracking-tight">{title}</h2>
    <p className="text-gray-500 text-sm max-w-lg mx-auto mt-2 leading-relaxed font-medium">{subtitle}</p>
  </div>
);

/* ──────────────────────────────────────────────
   Demo Page — All 12 Navbars in one place
   ────────────────────────────────────────────── */

export const MagicNavbarDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const content = tabContent[activeTab];

  return (
    <div
      className="min-h-screen flex flex-col items-center px-6 py-32 gap-32"
      style={{
        backgroundColor: '#020617',
        backgroundImage:
          'radial-gradient(circle at 0% 0%, rgba(30, 64, 175, 0.1) 0%, transparent 40%), radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.08) 0%, transparent 40%)',
        fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
      }}
    >
      {/* Page Title */}
      <div className="text-center z-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Activity size={14} /> Ultimate Collection
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
          Navigation <br />
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Vault Pro
          </span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto font-medium">
          12 world-class navigation systems. From liquid physics to holographic prisms — 
          experience the future of interaction.
        </p>
      </div>

      {/* ─── 01. Magic Curved Navbar (Original) ─── */}
      <div className="flex flex-col items-center gap-8 z-10 w-full max-w-lg">
        <SectionHeader
          number="01"
          title="Magic Curved"
          subtitle="The classic. A rising SVG arc with elastic spring physics that follows the active icon."
          accentColor="#6366f1"
        />
        <div className="magic-demo-phone ring-1 ring-white/10 shadow-3xl">
          <div className="flex justify-between items-center px-7 pt-5 pb-2">
            <span className="text-white/40 text-xs font-bold tracking-wide">9:41</span>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-2.5 rounded-[2px] border border-white/20 relative">
                <div className="absolute inset-0.5 bg-indigo-400/80 rounded-[1px]" />
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center px-8 py-10">
            <div className="text-8xl mb-6 drop-shadow-2xl" key={activeTab} style={{ animation: 'fadeSlideUp 0.6s cubic-bezier(0.23, 1, 0.32, 1)' }}>
              {content.emoji}
            </div>
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight" key={`t-${activeTab}`} style={{ animation: 'fadeSlideUp 0.5s ease-out 0.1s both' }}>
              {content.title}
            </h2>
            <p className="text-gray-400/70 text-center text-base" key={`d-${activeTab}`} style={{ animation: 'fadeSlideUp 0.5s ease-out 0.2s both' }}>
              {content.description}
            </p>
          </div>
          <div className="px-5 pb-10 pt-10">
            <MagicNavbar
              items={magicNavItems}
              activeId={activeTab}
              onChange={setActiveTab}
              style={{
                '--magic-nav-bg': '#ffffff',
                '--magic-nav-page-bg': '#0f172a',
                '--magic-nav-active': '#6366f1',
                '--magic-nav-icon-color': '#94a3b8',
              } as React.CSSProperties}
            />
          </div>
        </div>
      </div>

      {/* ─── 02. Morphing Blob Navbar ─── */}
      <div className="flex flex-col items-center gap-8 z-10 w-full">
        <SectionHeader
          number="02"
          title="Morphing Blob"
          subtitle="Liquid-glass indicator that stretches and morphs as it glides between labels."
          accentColor="#a78bfa"
        />
        <MorphBlobNavbar
          items={[
            { id: 'home', label: 'Home', icon: <Home size={20} /> },
            { id: 'explore', label: 'Explore', icon: <Compass size={20} /> },
            { id: 'favs', label: 'Likes', icon: <Heart size={20} /> },
            { id: 'user', label: 'User', icon: <User size={20} /> },
            { id: 'config', label: 'Config', icon: <Settings size={20} /> },
          ]}
        />
      </div>

      {/* ─── 03. Glow Particle Trail ─── */}
      <div className="flex flex-col items-center gap-8 z-10 w-full">
        <SectionHeader
          number="03"
          title="Glow Particles"
          subtitle="Dynamic particle emitter that spawns light trails on hover. Precision neon indicator."
          accentColor="#e879f9"
        />
        <GlowParticleNavbar
          items={[
            { id: 'dash', label: 'Dash', icon: <Layers size={18} /> },
            { id: 'stat', label: 'Stats', icon: <Zap size={18} /> },
            { id: 'mail', label: 'Inbox', icon: <Mail size={18} /> },
            { id: 'lock', label: 'Safe', icon: <Shield size={18} /> },
            { id: 'term', label: 'Shell', icon: <Terminal size={18} /> },
          ]}
        />
      </div>

      {/* ─── 04. Orbital Dock ─── */}
      <div className="flex flex-col items-center gap-8 z-10 w-full">
        <SectionHeader
          number="04"
          title="Orbital Core"
          subtitle="Planetary layout with a central hub. Items connect via glowing filaments."
          accentColor="#22d3ee"
        />
        <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px]">
          <OrbitalNavbar
            items={[
              { id: '1', label: 'Home', icon: <Home size={20} />, color: '#6366f1' },
              { id: '2', label: 'Find', icon: <Search size={20} />, color: '#ec4899' },
              { id: '3', label: 'Pics', icon: <Image size={20} />, color: '#f59e0b' },
              { id: '4', label: 'Fav', icon: <Star size={20} />, color: '#06b6d4' },
              { id: '5', label: 'Global', icon: <Globe size={20} />, color: '#10b981' },
              { id: '6', label: 'Alert', icon: <Bell size={20} />, color: '#f43f5e' },
            ]}
          />
        </div>
      </div>

      {/* ─── 05. Nebula Portal ─── */}
      <div className="flex flex-col items-center gap-8 z-10 w-full">
        <SectionHeader
          number="05"
          title="Nebula Portal"
          subtitle="Experience deep space. Interactive parallax nebula that reacts to your cursor."
          accentColor="#8b5cf6"
        />
        <NebulaPortalNav
          items={[
            { id: 'n1', label: 'Galaxy', icon: <Globe size={20} /> },
            { id: 'n2', label: 'Stars', icon: <Star size={20} /> },
            { id: 'n3', label: 'Nova', icon: <Zap size={20} /> },
            { id: 'n4', label: 'Comet', icon: <Compass size={20} /> },
          ]}
        />
      </div>

      {/* ─── 06. Neural Synapse ─── */}
      <div className="flex flex-col items-center gap-8 z-10 w-full max-w-xl">
        <SectionHeader
          number="06"
          title="Neural Synapse"
          subtitle="Organic node network. Selecting a node fires an electrical pulse across the filaments."
          accentColor="#c084fc"
        />
        <NeuralSynapseNav
          items={[
            { id: 's1', label: 'Brain', icon: <Cpu size={18} /> },
            { id: 's2', label: 'Pulse', icon: <Activity size={18} /> },
            { id: 's3', label: 'Nodes', icon: <Layers size={18} /> },
            { id: 's4', label: 'Think', icon: <Terminal size={18} /> },
          ]}
        />
      </div>

      {/* ─── 07. Crystalline Prism ─── */}
      <div className="flex flex-col items-center gap-8 z-10 w-full">
        <SectionHeader
          number="07"
          title="Crystalline Prism"
          subtitle="Hyper-realistic glass refraction. Watch light split into a spectrum as you navigate."
          accentColor="#fdf4ff"
        />
        <CrystallinePrismNav
          items={[
            { id: 'p1', label: 'Glass', icon: <Layers size={18} /> },
            { id: 'p2', label: 'Light', icon: <Zap size={18} /> },
            { id: 'p3', label: 'Refract', icon: <Share2 size={18} /> },
            { id: 'p4', label: 'Spectrum', icon: <Palette size={18} /> },
          ]}
        />
      </div>

      {/* ─── 08. Ripple Tide ─── */}
      <div className="flex flex-col items-center gap-8 z-10 w-full">
        <SectionHeader
          number="08"
          title="Ripple Tide"
          subtitle="A fluid surface interaction. Navigation creates waves that displace the entire bar."
          accentColor="#22d3ee"
        />
        <RippleTideNav
          items={[
            { id: 'r1', label: 'Water', icon: <Droplets size={20} /> },
            { id: 'r2', label: 'Wave', icon: <Activity size={20} /> },
            { id: 'r3', label: 'Flow', icon: <Compass size={20} /> },
            { id: 'r4', label: 'Ocean', icon: <Globe size={20} /> },
          ]}
        />
      </div>

      {/* ─── 09. Cosmic Horizon ─── */}
      <div className="flex flex-col items-center gap-8 z-10 w-full">
        <SectionHeader
          number="09"
          title="Cosmic Horizon"
          subtitle="Celestial arc navigation. Active icons trigger a 'sunrise' illumination effect."
          accentColor="#fbbf24"
        />
        <CosmicHorizonNav
          items={[
            { id: 'h1', label: 'Zenith', icon: <Star size={20} /> },
            { id: 'h2', label: 'Solar', icon: <Zap size={20} /> },
            { id: 'h3', label: 'Orbit', icon: <Globe size={20} /> },
            { id: 'h4', label: 'Path', icon: <Compass size={20} /> },
            { id: 'h5', label: 'Atmosphere', icon: <Wind size={20} /> },
          ]}
        />
      </div>

      {/* ─── 10. Fluid Arc ─── */}
      <div className="flex flex-col items-center gap-8 z-10 w-full max-w-md">
        <SectionHeader
          number="10"
          title="Fluid Arc Bridge"
          subtitle="Dynamic SVG bridge that rises beneath the active icon with a glowing halo."
          accentColor="#f59e0b"
        />
        <div className="w-full">
          <FluidArcNavbar
            items={[
              { id: 'f1', label: 'Home', icon: <Home size={22} /> },
              { id: 'f2', label: 'Find', icon: <Search size={22} /> },
              { id: 'f3', label: 'Saved', icon: <Bookmark size={22} /> },
              { id: 'f4', label: 'Design', icon: <Palette size={22} /> },
              { id: 'f5', label: 'User', icon: <User size={22} /> },
            ]}
          />
        </div>
      </div>

      {/* ─── 11. Spectrum ─── */}
      <div className="flex flex-col items-center gap-8 z-10 w-full">
        <SectionHeader
          number="11"
          title="Spectrum Ambient"
          subtitle="Ambient color casting. The entire bar's atmosphere shifts to match the active tab."
          accentColor="#10b981"
        />
        <SpectrumNavbar
          items={[
            { id: 's1', label: 'Dash', icon: <Layers size={18} />, color: '260' },
            { id: 's2', label: 'Style', icon: <Palette size={18} />, color: '320' },
            { id: 's3', label: 'Script', icon: <Code size={18} />, color: '200' },
            { id: 's4', label: 'Cloud', icon: <Globe size={18} />, color: '160' },
            { id: 's5', label: 'Launch', icon: <Zap size={18} />, color: '35' },
          ]}
        />
      </div>

      {/* ─── 12. Dynamic Island ─── */}
      <div className="flex flex-col items-center gap-8 z-10 w-full pb-20">
        <SectionHeader
          number="12"
          title="Dynamic Island"
          subtitle="Apple-inspired morphing pill. Encapsulates active state in a fluid floating bubble."
          accentColor="#f43f5e"
        />
        <DynamicIslandNav
          items={[
            { id: 'd1', label: 'Home', icon: <Home size={20} /> },
            { id: 'd2', label: 'Browse', icon: <Compass size={20} /> },
            { id: 'd3', label: 'News', icon: <Bell size={20} /> },
            { id: 'd4', label: 'Files', icon: <Bookmark size={20} /> },
            { id: 'd5', label: 'Account', icon: <User size={20} /> },
          ]}
        />
      </div>
    </div>
  );
};
