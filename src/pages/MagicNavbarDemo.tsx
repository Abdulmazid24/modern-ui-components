import React, { useState } from 'react';
import { MagicNavbar } from '../components/MagicNavbar';
import type { MagicNavItem } from '../components/MagicNavbar';
import { Home, User, MessageCircle, Camera, Settings } from 'lucide-react';

/* ──────────────────────────────────────────────
   Navigation Items Configuration
   ────────────────────────────────────────────── */

const navItems: MagicNavItem[] = [
  { id: 'home', icon: <Home size={24} strokeWidth={2} />, label: 'Home' },
  { id: 'profile', icon: <User size={24} strokeWidth={2} />, label: 'Profile' },
  { id: 'messages', icon: <MessageCircle size={24} strokeWidth={2} />, label: 'Messages' },
  { id: 'camera', icon: <Camera size={24} strokeWidth={2} />, label: 'Camera' },
  { id: 'settings', icon: <Settings size={24} strokeWidth={2} />, label: 'Settings' },
];

/* ──────────────────────────────────────────────
   Tab Content Data
   ────────────────────────────────────────────── */

const tabContent: Record<string, { title: string; description: string; emoji: string }> = {
  home: {
    title: 'Home',
    description: 'Welcome to your dashboard. View recent activity, updates, and personalized content all in one place.',
    emoji: '🏠',
  },
  profile: {
    title: 'Profile',
    description: 'Manage your personal information, avatar, and account preferences with ease.',
    emoji: '👤',
  },
  messages: {
    title: 'Messages',
    description: 'Stay connected with your conversations. View and reply to new messages instantly.',
    emoji: '💬',
  },
  camera: {
    title: 'Camera',
    description: 'Capture stunning moments and share them with the world in high quality.',
    emoji: '📸',
  },
  settings: {
    title: 'Settings',
    description: 'Customize your app experience — themes, notifications, privacy, and more.',
    emoji: '⚙️',
  },
};

/* ──────────────────────────────────────────────
   Demo Page Component
   ────────────────────────────────────────────── */

export const MagicNavbarDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const content = tabContent[activeTab];

  return (
    <div className="magic-demo-page">
      {/* Hero Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            Magic
          </span>{' '}
          Navigation Menu
        </h1>
        <p className="text-gray-400 text-base md:text-lg max-w-md mx-auto leading-relaxed">
          A smooth, animated bottom navigation with a magic curved indicator effect
        </p>
      </div>

      {/* Phone-Style Demo Container */}
      <div className="magic-demo-phone">
        {/* Fake Status Bar */}
        <div className="flex justify-between items-center px-7 pt-5 pb-2">
          <span className="text-white/40 text-xs font-semibold tracking-wide">9:41</span>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-2.5 rounded-sm border border-white/30 relative">
              <div className="absolute inset-0.5 bg-green-400/70 rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-10">
          <div
            className="text-7xl mb-6 transition-all duration-500 ease-out"
            key={activeTab}
            style={{ animation: 'fadeSlideUp 0.5s ease-out' }}
          >
            {content.emoji}
          </div>
          <h2
            className="text-2xl font-bold text-white mb-3 tracking-tight transition-all duration-300"
            key={`title-${activeTab}`}
            style={{ animation: 'fadeSlideUp 0.4s ease-out 0.05s both' }}
          >
            {content.title}
          </h2>
          <p
            className="text-gray-400/80 text-center text-sm leading-relaxed max-w-[260px]"
            key={`desc-${activeTab}`}
            style={{ animation: 'fadeSlideUp 0.4s ease-out 0.1s both' }}
          >
            {content.description}
          </p>
        </div>

        {/* Navbar Section — extra padding for indicator overflow */}
        <div className="px-4 pb-8 pt-10">
          <MagicNavbar
            items={navItems}
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

      {/* Subtitle */}
      <p className="text-gray-500/60 text-xs mt-8 tracking-widest uppercase">
        Click any icon to see the magic ✨
      </p>
    </div>
  );
};
