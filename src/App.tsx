import { useState } from 'react';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { MagicNavbarDemo } from './pages/MagicNavbarDemo';
import { LoadersDemo } from './pages/LoadersDemo';
import { ShareMenuDemo } from './pages/ShareMenuDemo';

type PageType = 'login' | 'signup' | 'magic-navbar' | 'loaders' | 'share-menu';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('share-menu');

  return (
    <>
      {/* ── Floating Template Switcher ── */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex gap-1.5 bg-gray-900/80 backdrop-blur-2xl rounded-full p-1.5 border border-gray-700/40 shadow-2xl max-w-[95vw] overflow-x-auto">
        {[
          { key: 'login' as PageType, label: 'Login' },
          { key: 'signup' as PageType, label: 'Signup' },
          { key: 'magic-navbar' as PageType, label: 'Magic Nav' },
          { key: 'loaders' as PageType, label: 'Loaders' },
          { key: 'share-menu' as PageType, label: 'Share Menu' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setCurrentPage(key)}
            className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
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
    </>
  );
}

export default App;
