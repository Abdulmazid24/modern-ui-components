import React, { useState } from 'react';
import { SwipeableCard } from '../components/cards';

const MOCK_PROFILES = [
  {
    id: 1,
    title: 'Neon Skater',
    subtitle: 'Cyberpunk District',
    image: 'https://images.unsplash.com/photo-1514860010078-4364ad4ca8e1?q=80&w=1471&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Midnight DJ',
    subtitle: 'Underground Tech',
    image: 'https://images.unsplash.com/photo-1543791187-586b86ce0550?q=80&w=1587&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Neon Racer',
    subtitle: 'Tokyo Grid',
    image: 'https://images.unsplash.com/photo-1555580053-5d51921f00af?q=80&w=1374&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'Pixel Artist',
    subtitle: 'Digital Canvas',
    image: 'https://images.unsplash.com/photo-1533038590840-1cbea6d5b00e?q=80&w=1470&auto=format&fit=crop'
  }
];

export const SwipeDemo: React.FC = () => {
  const [cards, setCards] = useState(MOCK_PROFILES);
  const [swipeHistory, setSwipeHistory] = useState<{id: string | number, direction: string}[]>([]);

  const handleSwipe = (id: string | number, direction: 'left' | 'right') => {
    // Record to history
    setSwipeHistory(prev => [{id, direction}, ...prev].slice(0, 5));
    
    // Remove the card from the active deck
    setCards(prev => prev.filter(card => card.id !== id));
  };

  const handleReset = () => {
    setCards(MOCK_PROFILES);
    setSwipeHistory([]);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center py-16 px-4 font-sans relative overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full opacity-5" style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="z-10 text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
          Swipe Cards
        </h1>
        <p className="text-slate-400">Drag to right (Like) or left (Nope)</p>
      </div>

      {/* Main Deck Container */}
      <div className="relative w-full max-w-[340px] h-[520px] z-10 mb-12 flex justify-center items-center">
        
        {/* Out of cards state */}
        {cards.length === 0 && (
          <div className="flex flex-col items-center justify-center text-slate-400">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4 shadow-xl">
              <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg font-medium mb-6">No more profiles.</p>
            <button 
              onClick={handleReset}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-medium transition-colors"
            >
              Reset Deck
            </button>
          </div>
        )}

        {/* The Cards mapping */}
        {cards.map((card, index) => {
          // Render the topmost element last in the DOM so it overlaps
          // Calculate zIndex relative to remaining cards (top card has highest z-index)
          const isTop = index === 0;
          return (
            <SwipeableCard
              key={card.id}
              id={card.id}
              title={card.title}
              subtitle={card.subtitle}
              image={card.image}
              onSwipe={handleSwipe}
              zIndex={cards.length - index} // 4, 3, 2, 1...
            />
          );
        })}
      </div>

      {/* Action Logs */}
      {swipeHistory.length > 0 && (
        <div className="z-10 w-full max-w-[340px] bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-xl p-4 shadow-2xl">
          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3">Recent Activity</h3>
          <ul className="flex flex-col gap-2">
            {swipeHistory.map((log, i) => (
              <li key={i} className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Profile {log.id}</span>
                <span className={`font-bold px-2 py-0.5 rounded ${
                  log.direction === 'right' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                }`}>
                  {log.direction.toUpperCase()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};
