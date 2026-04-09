import React, { useState } from 'react';
import { MagicNavbar } from '../components/MagicNavbar';
import type { MagicNavItem } from '../components/MagicNavbar';
import { MorphBlobNavbar } from '../components/navbar';
import { GlowParticleNavbar } from '../components/navbar';
import { OrbitalNavbar } from '../components/navbar';
import { FluidArcNavbar } from '../components/navbar';
import { SpectrumNavbar } from '../components/navbar';
import { DynamicIslandNav } from '../components/navbar';
import {
  Home, User, MessageCircle, Camera, Settings,
  Search, Heart, Bell, Compass, Zap, Layers,
  Mail, Shield, Terminal, Globe, Star, Image,
  Code, Palette, Bookmark,
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
  <div className="text-center mb-6">
    <span className="text-xs uppercase tracking-widest font-bold" style={{ color: accentColor }}>
      {number}
    </span>
    <h2 className="text-white text-xl font-bold mt-1">{title}</h2>
    <p className="text-gray-500 text-sm max-w-md mx-auto mt-1">{subtitle}</p>
  </div>
);

/* ──────────────────────────────────────────────
   Demo Page — All 7 Navbars in one place
   ────────────────────────────────────────────── */

export const MagicNavbarDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const content = tabContent[activeTab];

  return (
    <div
      className="min-h-screen flex flex-col items-center px-6 py-24 gap-20"
      style={{
        backgroundColor: '#030712',
        backgroundImage:
          'radial-gradient(circle at 30% 20%, rgba(139, 92, 246, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(236, 72, 153, 0.04) 0%, transparent 50%)',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* Page Title */}
      <div className="text-center z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Navigation{' '}
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            Vault
          </span>
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          7 unprecedented navigation patterns — each with unique physics, animations, and effects.
          Click, hover, and interact with every one.
        </p>
      </div>

      {/* ─── 01. Magic Curved Navbar (Original) ─── */}
      <div className="flex flex-col items-center gap-6 z-10 w-full max-w-lg">
        <SectionHeader
          number="01"
          title="Magic Curved Navigation"
          subtitle="A curved SVG indicator rises behind the active icon with elastic spring physics."
          accentColor="#8b5cf6"
        />
        <div className="magic-demo-phone">
          <div className="flex justify-between items-center px-7 pt-5 pb-2">
            <span className="text-white/40 text-xs font-semibold tracking-wide">9:41</span>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-2.5 rounded-sm border border-white/30 relative">
                <div className="absolute inset-0.5 bg-green-400/70 rounded-[1px]" />
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center px-8 py-10">
            <div className="text-7xl mb-6" key={activeTab} style={{ animation: 'fadeSlideUp 0.5s ease-out' }}>
              {content.emoji}
            </div>
            <h2 className="text-2xl font-bold text-white mb-3 tracking-tight" key={`t-${activeTab}`} style={{ animation: 'fadeSlideUp 0.4s ease-out 0.05s both' }}>
              {content.title}
            </h2>
            <p className="text-gray-400/80 text-center text-sm max-w-[260px]" key={`d-${activeTab}`} style={{ animation: 'fadeSlideUp 0.4s ease-out 0.1s both' }}>
              {content.description}
            </p>
          </div>
          <div className="px-4 pb-8 pt-10">
            <MagicNavbar
              items={magicNavItems}
              activeId={activeTab}
              onChange={setActiveTab}
              style={{
                '--magic-nav-bg': '#ffffff',
                '--magic-nav-page-bg': '#0f0a1e',
                '--magic-nav-active': '#8b5cf6',
                '--magic-nav-icon-color': '#9ca3af',
              } as React.CSSProperties}
            />
          </div>
        </div>
      </div>

      {/* ─── 02. Morphing Blob Navbar ─── */}
      <div className="flex flex-col items-center gap-6 z-10 w-full">
        <SectionHeader
          number="02"
          title="Morphing Blob Navigation"
          subtitle="A liquid blob stretches and morphs as it slides between items with spring physics."
          accentColor="#a78bfa"
        />
        <MorphBlobNavbar
          items={[
            { id: 'home', label: 'Home', icon: <Home size={20} /> },
            { id: 'explore', label: 'Explore', icon: <Compass size={20} /> },
            { id: 'favorites', label: 'Favorites', icon: <Heart size={20} /> },
            { id: 'profile', label: 'Profile', icon: <User size={20} /> },
            { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
          ]}
        />
      </div>

      {/* ─── 03. Glow Particle Trail ─── */}
      <div className="flex flex-col items-center gap-6 z-10 w-full">
        <SectionHeader
          number="03"
          title="Glowing Particle Trail"
          subtitle="Hover to spawn glowing particles that trail your cursor. A neon line marks the active tab."
          accentColor="#e879f9"
        />
        <GlowParticleNavbar
          items={[
            { id: 'dashboard', label: 'Dashboard', icon: <Layers size={18} /> },
            { id: 'analytics', label: 'Analytics', icon: <Zap size={18} /> },
            { id: 'messages', label: 'Messages', icon: <Mail size={18} /> },
            { id: 'security', label: 'Security', icon: <Shield size={18} /> },
            { id: 'code', label: 'Terminal', icon: <Terminal size={18} /> },
          ]}
        />
      </div>

      {/* ─── 04. Orbital Dock ─── */}
      <div className="flex flex-col items-center gap-6 z-10 w-full">
        <SectionHeader
          number="04"
          title="Orbital Dock"
          subtitle="Items orbit a central hub. Click center to collapse/expand. Active item connects to the core."
          accentColor="#22d3ee"
        />
        <div className="relative" style={{ width: 340, height: 340 }}>
          <OrbitalNavbar
            items={[
              { id: 'home', label: 'Home', icon: <Home size={20} />, color: '#8b5cf6' },
              { id: 'search', label: 'Search', icon: <Search size={20} />, color: '#ec4899' },
              { id: 'gallery', label: 'Gallery', icon: <Image size={20} />, color: '#f59e0b' },
              { id: 'star', label: 'Starred', icon: <Star size={20} />, color: '#22d3ee' },
              { id: 'globe', label: 'Global', icon: <Globe size={20} />, color: '#10b981' },
              { id: 'bell', label: 'Alerts', icon: <Bell size={20} />, color: '#f43f5e' },
            ]}
          />
        </div>
      </div>

      {/* ─── 05. Fluid Arc Navbar ─── */}
      <div className="flex flex-col items-center gap-6 z-10 w-full max-w-md">
        <SectionHeader
          number="05"
          title="Fluid Arc Navigation"
          subtitle="Active icon rises on a morphing SVG arc bridge with a glowing halo ring."
          accentColor="#f59e0b"
        />
        <div className="w-full">
          <FluidArcNavbar
            items={[
              { id: 'home', label: 'Home', icon: <Home size={22} /> },
              { id: 'search', label: 'Search', icon: <Search size={22} /> },
              { id: 'bookmark', label: 'Saved', icon: <Bookmark size={22} /> },
              { id: 'palette', label: 'Theme', icon: <Palette size={22} /> },
              { id: 'user', label: 'Profile', icon: <User size={22} /> },
            ]}
          />
        </div>
      </div>

      {/* ─── 06. Spectrum Navbar ─── */}
      <div className="flex flex-col items-center gap-6 z-10 w-full">
        <SectionHeader
          number="06"
          title="Spectrum Navigation"
          subtitle="Each tab owns a spectrum color. The bar's ambient glow shifts to match the active item."
          accentColor="#10b981"
        />
        <SpectrumNavbar
          items={[
            { id: 'dashboard', label: 'Board', icon: <Layers size={18} />, color: '270' },
            { id: 'design', label: 'Design', icon: <Palette size={18} />, color: '330' },
            { id: 'code', label: 'Code', icon: <Code size={18} />, color: '200' },
            { id: 'deploy', label: 'Deploy', icon: <Globe size={18} />, color: '150' },
            { id: 'monitor', label: 'Monitor', icon: <Zap size={18} />, color: '40' },
          ]}
        />
      </div>

      {/* ─── 07. Dynamic Island Nav ─── */}
      <div className="flex flex-col items-center gap-6 z-10 w-full pb-10">
        <SectionHeader
          number="07"
          title="Dynamic Island Navigation"
          subtitle="Apple Dynamic Island-inspired. A floating pill morphs to reveal active item info."
          accentColor="#f43f5e"
        />
        <DynamicIslandNav
          items={[
            { id: 'home', label: 'Home', icon: <Home size={20} /> },
            { id: 'explore', label: 'Explore', icon: <Compass size={20} /> },
            { id: 'alerts', label: 'Alerts', icon: <Bell size={20} /> },
            { id: 'saved', label: 'Saved', icon: <Bookmark size={20} /> },
            { id: 'profile', label: 'Profile', icon: <User size={20} /> },
          ]}
        />
      </div>
    </div>
  );
};
