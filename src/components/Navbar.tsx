import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import './Navbar.scss';

const Navbar: React.FC = () => {
  const { user, userProfile, logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/dashboard" className="navbar-logo">
          <motion.div 
            className="logo-icon"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            🌍
          </motion.div>
          <span className="logo-text">CarbonCtrl</span>
        </Link>

        {/* Navigation Links - Only show when authenticated */}
        {user && (
          <div className="navbar-nav">
            <Link 
              to="/dashboard" 
              className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/quizzes" 
              className={`nav-link ${location.pathname === '/quizzes' ? 'active' : ''}`}
            >
              Quizzes
            </Link>
            <Link 
              to="/games" 
              className={`nav-link ${location.pathname === '/games' ? 'active' : ''}`}
            >
              Games
            </Link>
            <Link 
              to="/missions" 
              className={`nav-link ${location.pathname === '/missions' ? 'active' : ''}`}
            >
              Missions
            </Link>
            <Link 
              to="/leaderboard" 
              className={`nav-link ${location.pathname === '/leaderboard' ? 'active' : ''}`}
            >
              Leaderboard
            </Link>
            <Link 
              to="/eco-coins" 
              className={`nav-link ${location.pathname === '/eco-coins' ? 'active' : ''}`}
            >
              EcoCoins
            </Link>
          </div>
        )}

        {/* User Section */}
        <div className="navbar-user">
          {user && userProfile ? (
            <div className="user-info">
              <div className="user-avatar">
                {userProfile.photoURL ? (
                  <img src={userProfile.photoURL} alt={userProfile.displayName} />
                ) : (
                  <span>{userProfile.displayName.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <div className="user-details">
                <span className="user-name">{userProfile.displayName}</span>
                <span className="user-role">{userProfile.role}</span>
              </div>
              <motion.button
                className="logout-btn"
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="btn btn--ghost">
                Login
              </Link>
              <Link to="/signup" className="btn btn--primary">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
