import React from 'react';
import { CommandPalette } from '../components/command-palette';
import type { CommandItem } from '../components/command-palette';
import {
  Home, Settings, User, Search, FileText, Image, Code, Globe,
  Zap, Palette, Terminal, Mail, Bell, Shield, Layers, Download,
} from 'lucide-react';

export const CommandPaletteDemo: React.FC = () => {
  const items: CommandItem[] = [
    { id: '1', label: 'Go to Dashboard', description: 'Main overview page', icon: <Home size={18} />, category: 'Navigation', shortcut: '⌘D', onSelect: () => alert('Dashboard') },
    { id: '2', label: 'Profile Settings', description: 'Edit your profile info', icon: <User size={18} />, category: 'Navigation', shortcut: '⌘P', onSelect: () => alert('Profile') },
    { id: '3', label: 'Global Settings', description: 'App preferences', icon: <Settings size={18} />, category: 'Navigation', onSelect: () => alert('Settings') },
    { id: '4', label: 'Create New Document', description: 'Start a blank document', icon: <FileText size={18} />, category: 'Actions', shortcut: '⌘N', onSelect: () => alert('New Doc') },
    { id: '5', label: 'Upload Image', description: 'PNG, JPG, WebP up to 5MB', icon: <Image size={18} />, category: 'Actions', onSelect: () => alert('Upload') },
    { id: '6', label: 'Export as Code', description: 'Download component source', icon: <Code size={18} />, category: 'Actions', onSelect: () => alert('Export') },
    { id: '7', label: 'Deploy to Production', description: 'Push to live servers', icon: <Globe size={18} />, category: 'Actions', shortcut: '⌘⇧D', onSelect: () => alert('Deploy') },
    { id: '8', label: 'Performance Audit', description: 'Run Lighthouse analysis', icon: <Zap size={18} />, category: 'Tools', onSelect: () => alert('Audit') },
    { id: '9', label: 'Theme Switcher', description: 'Toggle dark/light mode', icon: <Palette size={18} />, category: 'Tools', shortcut: '⌘T', onSelect: () => alert('Theme') },
    { id: '10', label: 'Open Terminal', description: 'Integrated CLI', icon: <Terminal size={18} />, category: 'Tools', shortcut: '⌘`', onSelect: () => alert('Terminal') },
    { id: '12', label: 'Security Scan', description: 'Check for vulnerabilities', icon: <Shield size={18} />, category: 'Tools', onSelect: () => alert('Security') },
    { id: '13', label: 'Notification Center', description: 'View recent alerts', icon: <Bell size={18} />, category: 'Navigation', onSelect: () => alert('Notifications') },
    { id: '14', label: 'Compose Email', description: 'Write a new message', icon: <Mail size={18} />, category: 'Actions', onSelect: () => alert('Email') },
    { id: '15', label: 'View Layers', description: 'Component hierarchy', icon: <Layers size={18} />, category: 'Tools', onSelect: () => alert('Layers') },
    { id: '16', label: 'Download Backup', description: 'Export full project data', icon: <Download size={18} />, category: 'Actions', onSelect: () => alert('Download') },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 gap-10 relative"
      style={{
        backgroundColor: '#030712',
        backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(99, 102, 241, 0.06) 0%, transparent 60%)',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* Grid bg */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div className="text-center z-10 mb-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Command <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Palette</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Press <kbd className="px-2 py-0.5 bg-white/10 rounded text-white/80 text-sm font-mono border border-white/10 mx-1">⌘K</kbd> or click below to open. Search, navigate with keyboard, and execute instantly.
        </p>
      </div>

      <div className="z-10">
        <CommandPalette items={items} />
      </div>
    </div>
  );
};
