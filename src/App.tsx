import { useState } from 'react';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { MagicNavbarDemo } from './pages/MagicNavbarDemo';
import { LoadersDemo } from './pages/LoadersDemo';
import { ShareMenuDemo } from './pages/ShareMenuDemo';
import { TeamCarouselDemo } from './pages/TeamCarouselDemo';
import { AnimatedCarouselDemo } from './pages/AnimatedCarouselDemo';
import { ButtonsDemo } from './pages/ButtonsDemo';
import { MagneticDemo } from './pages/MagneticDemo';
import { GlassPricingDemo } from './pages/GlassPricingDemo';
import { SpotlightDemo } from './pages/SpotlightDemo';
import { StatsDemo } from './pages/StatsDemo';
import { DockDemo } from './pages/DockDemo';
import { ScrambleDemo } from './pages/ScrambleDemo';
import { SwipeDemo } from './pages/SwipeDemo';
import { ToastDemo } from './pages/ToastDemo';
import { CardsDemo } from './pages/CardsDemo';
import { TabsDemo } from './pages/TabsDemo';
import { AccordionDemo } from './pages/AccordionDemo';
import { ModalDemo } from './pages/ModalDemo';
import { AuroraInputDemo } from './pages/AuroraInputDemo';

type PageType = 'login' | 'signup' | 'magic-navbar' | 'loaders' | 'share-menu' | 'team-carousel' | '3d-carousel' | 'buttons' | 'magnetic' | 'pricing' | 'spotlight' | 'stats' | 'dock' | 'scramble' | 'swipe' | 'toast' | 'cards' | 'tabs' | 'accordion' | 'modal' | 'aurora';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('accordion');

  return (
    <>
      {/* ── Floating Template Switcher ── */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex gap-1 bg-gray-900/80 backdrop-blur-2xl rounded-full p-1.5 border border-gray-700/40 shadow-2xl max-w-[95vw] overflow-x-auto">
        {[
          { key: 'login' as PageType, label: 'Login' },
          { key: 'signup' as PageType, label: 'Signup' },
          { key: 'magic-navbar' as PageType, label: 'Nav' },
          { key: 'loaders' as PageType, label: 'Loaders' },
          { key: 'share-menu' as PageType, label: 'Share' },
          { key: 'team-carousel' as PageType, label: 'Team' },
          { key: '3d-carousel' as PageType, label: '3D' },
          { key: 'buttons' as PageType, label: 'Upload' },
          { key: 'magnetic' as PageType, label: 'Magnet' },
          { key: 'pricing' as PageType, label: 'Price' },
          { key: 'spotlight' as PageType, label: 'Spot' },
          { key: 'stats' as PageType, label: 'Stats' },
          { key: 'dock' as PageType, label: 'Dock' },
          { key: 'scramble' as PageType, label: 'Decode' },
          { key: 'swipe' as PageType, label: 'Swipe' },
          { key: 'toast' as PageType, label: 'Toast' },
          { key: 'cards' as PageType, label: 'Cards' },
          { key: 'tabs' as PageType, label: 'Tabs' },
          { key: 'accordion' as PageType, label: 'FAQ' },
          { key: 'modal' as PageType, label: 'Modal' },
          { key: 'aurora' as PageType, label: 'Aurora' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setCurrentPage(key)}
            className={`px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
              currentPage === key
                ? 'bg-white text-gray-900 shadow-lg shadow-white/10'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Page Content ── */}
      {currentPage === 'login' && <Login onSwitchToSignup={() => setCurrentPage('signup')} />}
      {currentPage === 'signup' && <Signup onSwitchToLogin={() => setCurrentPage('login')} />}
      {currentPage === 'magic-navbar' && <MagicNavbarDemo />}
      {currentPage === 'loaders' && <LoadersDemo />}
      {currentPage === 'share-menu' && <ShareMenuDemo />}
      {currentPage === 'team-carousel' && <TeamCarouselDemo />}
      {currentPage === '3d-carousel' && <AnimatedCarouselDemo />}
      {currentPage === 'buttons' && <ButtonsDemo />}
      {currentPage === 'magnetic' && <MagneticDemo />}
      {currentPage === 'pricing' && <GlassPricingDemo />}
      {currentPage === 'spotlight' && <SpotlightDemo />}
      {currentPage === 'stats' && <StatsDemo />}
      {currentPage === 'dock' && <DockDemo />}
      {currentPage === 'scramble' && <ScrambleDemo />}
      {currentPage === 'swipe' && <SwipeDemo />}
      {currentPage === 'toast' && <ToastDemo />}
      {currentPage === 'cards' && <CardsDemo />}
      {currentPage === 'tabs' && <TabsDemo />}
      {currentPage === 'accordion' && <AccordionDemo />}
      {currentPage === 'modal' && <ModalDemo />}
      {currentPage === 'aurora' && <AuroraInputDemo />}
    </>
  );
}

export default App;
