import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useSidebar } from '../context/SidebarContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ThemeToggle from './ThemeToggle';
import FloatingChatbot from './FloatingChatbot';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const { isCollapsed } = useSidebar();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading CarbonCtrl...</p>
          </div>
        </div>
      </div>
    );
  }

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
    <div className={`app ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Navbar />
      <div className="app-content">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
      <ThemeToggle />
      <FloatingChatbot />
    </div>
  );
};

export default AppLayout;
