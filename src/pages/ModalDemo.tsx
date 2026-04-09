import React, { useState } from 'react';
import { GlassModal } from '../components/modal';
import { Sparkles, Zap, Send } from 'lucide-react';

export const ModalDemo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<'confirm' | 'form' | 'alert'>('confirm');

  const openModal = (type: 'confirm' | 'form' | 'alert') => {
    setModalType(type);
    setIsOpen(true);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 gap-10 relative"
      style={{
        backgroundColor: '#0a0a0f',
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.05) 0%, transparent 70%)',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* Decorative grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="text-center z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Reality-Distortion <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Modal</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          The backdrop warps like rippling water. Floating particles assemble around the glass dialog. 
          Close it and watch everything dissolve.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 z-10">
        <button
          onClick={() => openModal('confirm')}
          className="px-8 py-3.5 rounded-2xl bg-indigo-600 text-white font-semibold shadow-indigo-600/30 shadow-lg hover:bg-indigo-500 hover:-translate-y-1 transition-all flex items-center gap-2"
        >
          <Sparkles size={18} /> Confirmation Modal
        </button>

        <button
          onClick={() => openModal('form')}
          className="px-8 py-3.5 rounded-2xl bg-violet-600 text-white font-semibold shadow-violet-600/30 shadow-lg hover:bg-violet-500 hover:-translate-y-1 transition-all flex items-center gap-2"
        >
          <Send size={18} /> Contact Form Modal
        </button>

        <button
          onClick={() => openModal('alert')}
          className="px-8 py-3.5 rounded-2xl bg-rose-600 text-white font-semibold shadow-rose-600/30 shadow-lg hover:bg-rose-500 hover:-translate-y-1 transition-all flex items-center gap-2"
        >
          <Zap size={18} /> Alert Modal
        </button>
      </div>

      {/* The Modals */}
      <GlassModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={
          modalType === 'confirm' ? 'Confirm Action' :
          modalType === 'form' ? 'Get in Touch' :
          'System Alert'
        }
        size={modalType === 'form' ? 'md' : 'sm'}
      >
        {modalType === 'confirm' && (
          <div>
            <p className="text-white/60 mb-6 leading-relaxed">
              Are you sure you want to deploy this configuration to production? 
              This action will affect <strong className="text-white">2,847 active users</strong>.
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setIsOpen(false)} 
                className="px-5 py-2.5 rounded-xl bg-white/5 text-white/70 hover:bg-white/10 font-medium transition-all text-sm border border-white/10"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsOpen(false)} 
                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-all text-sm shadow-lg shadow-indigo-600/30"
              >
                Deploy Now
              </button>
            </div>
          </div>
        )}

        {modalType === 'form' && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-white/50 text-xs font-bold uppercase tracking-wider mb-2 block">Full Name</label>
              <input className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-violet-500/50 focus:outline-none transition-colors text-sm" placeholder="John Doe" />
            </div>
            <div>
              <label className="text-white/50 text-xs font-bold uppercase tracking-wider mb-2 block">Email</label>
              <input className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-violet-500/50 focus:outline-none transition-colors text-sm" placeholder="john@example.com" />
            </div>
            <div>
              <label className="text-white/50 text-xs font-bold uppercase tracking-wider mb-2 block">Message</label>
              <textarea className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-violet-500/50 focus:outline-none transition-colors text-sm h-24 resize-none" placeholder="Your message..." />
            </div>
            <button className="w-full py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-500 transition-all text-sm mt-2 shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2">
              <Send size={16} /> Send Message
            </button>
          </div>
        )}

        {modalType === 'alert' && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto mb-4">
              <Zap size={28} className="text-rose-500" />
            </div>
            <p className="text-white/60 mb-6 leading-relaxed">
              Critical system resources are running low. Memory usage has exceeded <strong className="text-rose-400">92% threshold</strong>. 
              Immediate action is recommended.
            </p>
            <button 
              onClick={() => setIsOpen(false)} 
              className="px-6 py-2.5 rounded-xl bg-rose-600 text-white font-medium hover:bg-rose-500 transition-all text-sm shadow-lg shadow-rose-600/30"
            >
              Acknowledge
            </button>
          </div>
        )}
      </GlassModal>
    </div>
  );
};
