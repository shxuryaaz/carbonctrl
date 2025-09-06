import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { aiInsightsService, SmartNotification } from '../services/aiInsights';
import './SmartNotifications.scss';

interface SmartNotificationsProps {
  isOpen: boolean;
  onClose: () => void;
}

const SmartNotifications: React.FC<SmartNotificationsProps> = ({ isOpen, onClose }) => {
  const { userProfile } = useAuth();
  const [notifications, setNotifications] = useState<SmartNotification[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    if (isOpen && userProfile) {
      loadNotifications();
    }
  }, [isOpen, userProfile]);

  const loadNotifications = async () => {
    if (!userProfile) return;
    
    setLoading(true);
    try {
      const smartNotifications = await aiInsightsService.generateSmartNotifications(userProfile);
      setNotifications(smartNotifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredNotifications = notifications.filter(notification => 
    selectedCategory === 'all' || notification.category === selectedCategory
  );

  const categories = ['all', 'energy', 'waste', 'transport', 'water', 'general'];
  const categoryIcons = {
    all: '🔔',
    energy: '⚡',
    waste: '♻️',
    transport: '🚗',
    water: '💧',
    general: '🌱'
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ff4757';
      case 'medium': return '#ffa502';
      case 'low': return '#2ed573';
      default: return '#2ed573';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'reminder': return '⏰';
      case 'achievement': return '🏆';
      case 'tip': return '💡';
      case 'challenge': return '🎯';
      default: return '📢';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="smart-notifications-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="smart-notifications"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="notifications-header">
              <div className="header-title">
                <span className="ai-icon">🤖</span>
                <div>
                  <h3>Smart Notifications</h3>
                  <p>AI-powered environmental insights</p>
                </div>
              </div>
              <button className="close-btn" onClick={onClose}>
                ✕
              </button>
            </div>

            {/* Category Filter */}
            <div className="category-filter">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <span className="category-icon">{categoryIcons[category as keyof typeof categoryIcons]}</span>
                  <span className="category-name">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                </button>
              ))}
            </div>

            {/* Notifications List */}
            <div className="notifications-content">
              {loading ? (
                <div className="loading-state">
                  <div className="loading-spinner">
                    <div className="spinner"></div>
                  </div>
                  <p>Generating smart notifications...</p>
                </div>
              ) : filteredNotifications.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">📭</span>
                  <p>No notifications for this category</p>
                </div>
              ) : (
                <div className="notifications-list">
                  {filteredNotifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      className="notification-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="notification-header">
                        <div className="notification-type">
                          <span className="type-icon">{getTypeIcon(notification.type)}</span>
                          <span className="type-name">{notification.type}</span>
                        </div>
                        <div 
                          className="priority-indicator"
                          style={{ backgroundColor: getPriorityColor(notification.priority) }}
                        >
                          {notification.priority}
                        </div>
                      </div>
                      
                      <div className="notification-content">
                        <p className="notification-message">{notification.message}</p>
                        <div className="notification-meta">
                          <span className="category-tag">{notification.category}</span>
                          <span className="timestamp">
                            {notification.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        </div>
                      </div>
                      
                      {notification.actionable && (
                        <div className="notification-actions">
                          <button className="action-btn primary">
                            Take Action
                          </button>
                          <button className="action-btn secondary">
                            Learn More
                          </button>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="notifications-footer">
              <button className="refresh-btn" onClick={loadNotifications} disabled={loading}>
                {loading ? '⏳' : '🔄'} Refresh
              </button>
              <p className="footer-text">
                Notifications are generated based on current environmental conditions and your profile
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SmartNotifications;
