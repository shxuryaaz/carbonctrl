import React from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ThemeToggle from './ThemeToggle';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user } = useAuth();

  // For public pages (no user), don't show sidebar/navbar
  if (!user) {
    return (
      <div className="app">
        {children}
      </div>
    );
  }

  // For authenticated pages, show full layout
  return (
    <div className="app">
      <Navbar />
      <div className="app-content">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
      <ThemeToggle />
    </div>
  );
};

export default AppLayout;
