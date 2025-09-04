import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import './Sidebar.scss';

interface SidebarItem {
  path: string;
  label: string;
  icon: string;
  roles?: string[];
}

const sidebarItems: SidebarItem[] = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: '📊',
  },
  {
    path: '/quizzes',
    label: 'Quizzes',
    icon: '🧠',
  },
  {
    path: '/games',
    label: 'Mini Games',
    icon: '🎮',
  },
  {
    path: '/missions',
    label: 'Story Missions',
    icon: '📚',
  },
  {
    path: '/leaderboard',
    label: 'Leaderboard',
    icon: '🏆',
  },
  {
    path: '/eco-coins',
    label: 'Eco Coins',
    icon: '🪙',
  },
  {
    path: '/ar-missions',
    label: 'AR Missions',
    icon: '📱',
  },
];

const Sidebar: React.FC = () => {
  const { user, userProfile } = useAuth();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Don't show sidebar on auth pages
  if (!user || location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  const filteredItems = sidebarItems.filter(item => {
    if (!item.roles) return true;
    return userProfile && item.roles.includes(userProfile.role);
  });

  return (
    <motion.aside 
      className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="sidebar-header">
        <motion.button
          className="collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isCollapsed ? '→' : '←'}
        </motion.button>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {filteredItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  <motion.span 
                    className="nav-icon"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.icon}
                  </motion.span>
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span 
                        className="nav-label"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  
                  {isActive && (
                    <motion.div
                      className="active-indicator"
                      layoutId="activeIndicator"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">
            {userProfile?.photoURL ? (
              <img src={userProfile.photoURL} alt={userProfile.displayName} />
            ) : (
              <span>{userProfile?.displayName?.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <AnimatePresence>
            {!isCollapsed && userProfile && (
              <motion.div 
                className="user-info"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <span className="user-name">{userProfile.displayName}</span>
                <span className="user-role">{userProfile.role}</span>
                <div className="user-stats">
                  <span className="eco-score">🌱 {userProfile.ecoScore}</span>
                  <span className="eco-coins">🪙 {userProfile.ecoCoins}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
