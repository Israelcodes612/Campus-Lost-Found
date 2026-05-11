import { useState, useEffect } from 'react';
import { AuthPage } from './components/AuthPage';
import { Dashboard } from './components/Dashboard';
import { suppressMetaMaskWarnings } from '../utils/suppressMetaMaskWarnings';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profile_photo?: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  // Suppress MetaMask browser extension warnings on mount
  useEffect(() => {
    suppressMetaMaskWarnings();
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <div className="size-full">
      {!user ? (
        <AuthPage onLogin={handleLogin} />
      ) : (
        <Dashboard user={user} onLogout={handleLogout} onUpdateUser={handleUpdateUser} />
      )}
    </div>
  );
}