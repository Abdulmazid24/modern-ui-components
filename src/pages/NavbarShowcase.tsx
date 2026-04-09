import React from 'react';
import { MorphBlobNavbar } from '../components/navbar';
import { GlowParticleNavbar } from '../components/navbar';
import { OrbitalNavbar } from '../components/navbar';
import {
  Home, Search, User, Settings, Bell, Heart,
  Zap, Layers, Mail, Globe, Compass, Star,
  Shield, Code, Image, Terminal,
} from 'lucide-react';

export const NavbarShowcase: React.FC = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center px-6 py-24 gap-20"
      style={{
        backgroundColor: '#030712',
        backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(139, 92, 246, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(236, 72, 153, 0.04) 0%, transparent 50%)',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* Title */}
      <div className="text-center z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Navigation <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">Showcase</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Three unprecedented navigation patterns. Morph Blob, Glowing Particles, and Orbital Dock — each with physics, animations, and effects never seen before.
        </p>
      </div>

      {/* ── 1. Morph Blob Navbar ── */}
      <div className="flex flex-col items-center gap-6 z-10 w-full">
        <div className="text-center">
          <span className="text-xs text-violet-400 uppercase tracking-widest font-bold">01</span>
          <h2 className="text-white text-xl font-bold mt-1">Morphing Blob Navigation</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto mt-1">
            A liquid blob stretches and morphs as it slides between items with spring physics.
          </p>
        </div>
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

      {/* ── 2. Glow Particle Navbar ── */}
      <div className="flex flex-col items-center gap-6 z-10 w-full">
        <div className="text-center">
          <span className="text-xs text-fuchsia-400 uppercase tracking-widest font-bold">02</span>
          <h2 className="text-white text-xl font-bold mt-1">Glowing Particle Trail</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto mt-1">
            Hover to spawn glowing particles that trail your cursor. A neon line marks the active tab.
          </p>
        </div>
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

      {/* ── 3. Orbital Navigation ── */}
      <div className="flex flex-col items-center gap-6 z-10 w-full">
        <div className="text-center">
          <span className="text-xs text-cyan-400 uppercase tracking-widest font-bold">03</span>
          <h2 className="text-white text-xl font-bold mt-1">Orbital Dock</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto mt-1">
            Items orbit a central hub. Click center to collapse/expand. Active item connects to the core.
          </p>
        </div>
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
    </div>
  );
};
