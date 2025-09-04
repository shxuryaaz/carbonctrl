import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import './Landing.scss';

const Landing: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const features = [
    {
      icon: '🎮',
      title: 'Interactive Learning',
      description: 'Engage with gamified environmental challenges and educational content that makes learning fun.'
    },
    {
      icon: '🏆',
      title: 'Achievement System',
      description: 'Earn EcoCoins, badges, and climb leaderboards as you complete missions and reduce your carbon footprint.'
    },
    {
      icon: '📊',
      title: 'Real-time Analytics',
      description: 'Track your environmental impact with detailed analytics and personalized insights.'
    },
    {
      icon: '🌱',
      title: 'AR Missions',
      description: 'Use augmented reality to plant virtual trees and complete real-world environmental challenges.'
    },
    {
      icon: '👥',
      title: 'Community Impact',
      description: 'Join a global community of eco-warriors working together to save our planet.'
    },
    {
      icon: '🎯',
      title: 'Goal Tracking',
      description: 'Set and achieve personal environmental goals with guided missions and progress tracking.'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '50K+', label: 'Trees Planted' },
    { number: '100K+', label: 'CO2 Reduced' },
    { number: '1M+', label: 'EcoCoins Earned' }
  ];

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-container">
          <motion.div 
            className="nav-logo"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="logo-icon">🌍</span>
            <span className="logo-text">CarbonCtrl</span>
          </motion.div>
          
          <div className="nav-actions">
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <Link to="/login" className="btn btn--outline">Sign In</Link>
            <Link to="/signup" className="btn btn--primary">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="hero-title">
              Save the Planet,{' '}
              <span className="gradient-text">One Mission at a Time</span>
            </h1>
            <p className="hero-description">
              Join the world's most engaging environmental education platform. 
              Learn, play, and make a real impact on climate change through 
              gamified experiences and real-world actions.
            </p>
            <div className="hero-actions">
              <Link to="/signup" className="btn btn--primary btn--large">
                Start Your Journey
              </Link>
              <Link to="/login" className="btn btn--outline btn--large">
                Sign In
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="hero-card">
              <div className="card-header">
                <div className="card-avatar">👤</div>
                <div className="card-info">
                  <div className="card-name">Eco Warrior</div>
                  <div className="card-level">Level 5 • 1,250 EcoCoins</div>
                </div>
              </div>
              <div className="card-stats">
                <div className="stat">
                  <span className="stat-value">15</span>
                  <span className="stat-label">Trees Planted</span>
                </div>
                <div className="stat">
                  <span className="stat-value">2.3kg</span>
                  <span className="stat-label">CO2 Reduced</span>
                </div>
                <div className="stat">
                  <span className="stat-value">8</span>
                  <span className="stat-label">Badges</span>
                </div>
              </div>
              <div className="card-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '75%' }}></div>
                </div>
                <span className="progress-text">75% to Level 6</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.label}
              className="stat-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            >
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="section-title">Why Choose CarbonCtrl?</h2>
            <p className="section-description">
              Experience the future of environmental education with cutting-edge 
              technology and proven learning methodologies.
            </p>
          </motion.div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <h2 className="cta-title">Ready to Make a Difference?</h2>
            <p className="cta-description">
              Join thousands of students, teachers, and environmental enthusiasts 
              who are already making a positive impact on our planet.
            </p>
            <div className="cta-actions">
              <Link to="/signup" className="btn btn--primary btn--large">
                Start Free Today
              </Link>
              <Link to="/login" className="btn btn--outline btn--large">
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-logo">
              <span className="logo-icon">🌍</span>
              <span className="logo-text">CarbonCtrl</span>
            </div>
            <p className="footer-description">
              Empowering the next generation to save our planet through 
              innovative education and real-world action.
            </p>
          </div>
          <div className="footer-links">
            <Link to="/login" className="footer-link">Sign In</Link>
            <Link to="/signup" className="footer-link">Sign Up</Link>
            <button className="footer-link">Privacy Policy</button>
            <button className="footer-link">Terms of Service</button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 CarbonCtrl. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
