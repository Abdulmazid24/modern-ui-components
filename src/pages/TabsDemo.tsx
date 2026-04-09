import React from 'react';
import { AnimatedTabs } from '../components/inputs';
import { Home, Settings, User, Bell, Search, Heart } from 'lucide-react';

export const TabsDemo: React.FC = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 gap-16"
      style={{
        backgroundColor: '#0a0a0f',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      <div className="text-center z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
          Animated <span className="text-violet-400">Tabs</span>
        </h1>
        <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto">
          Three stunning tab variants with smooth sliding indicators. Click between tabs to see the animation.
        </p>
      </div>

      {/* Variant 1: Pill */}
      <div className="flex flex-col items-center gap-4 z-10">
        <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Pill Variant</span>
        <AnimatedTabs
          variant="pill"
          tabs={[
            { id: 'home', label: 'Home', icon: <Home size={16} /> },
            { id: 'search', label: 'Search', icon: <Search size={16} /> },
            { id: 'profile', label: 'Profile', icon: <User size={16} /> },
            { id: 'settings', label: 'Settings', icon: <Settings size={16} /> },
          ]}
        />
      </div>

      {/* Variant 2: Underline */}
      <div className="flex flex-col items-center gap-4 z-10">
        <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Underline Variant</span>
        <AnimatedTabs
          variant="underline"
          tabs={[
            { id: 'all', label: 'All Posts' },
            { id: 'following', label: 'Following' },
            { id: 'popular', label: 'Popular' },
            { id: 'saved', label: 'Saved' },
          ]}
        />
      </div>

      {/* Variant 3: Glow */}
      <div className="flex flex-col items-center gap-4 z-10">
        <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Glow Variant</span>
        <AnimatedTabs
          variant="glow"
          tabs={[
            { id: 'likes', label: 'Likes', icon: <Heart size={16} /> },
            { id: 'alerts', label: 'Alerts', icon: <Bell size={16} /> },
            { id: 'discover', label: 'Discover', icon: <Search size={16} /> },
          ]}
        />
      </div>
    </div>
  );
};
