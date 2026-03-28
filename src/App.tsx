import { useState } from 'react';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'signup'>('login');

  return (
    <>
      {currentPage === 'login' && <Login onSwitchToSignup={() => setCurrentPage('signup')} />}
      {currentPage === 'signup' && <Signup onSwitchToLogin={() => setCurrentPage('login')} />}
    </>
  );
}

export default App;
