import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import './Dashboard.scss';

const Dashboard: React.FC = () => {
  const { userProfile } = useAuth();

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  const renderStudentDashboard = () => (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Welcome back, {userProfile.displayName}! 🌱</h1>
          <p>Ready to continue your eco-journey?</p>
        </motion.div>
      </div>

      <div className="dashboard-grid">
        {/* Eco Score Card */}
        <motion.div
          className="dashboard-card eco-score-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="card-header">
            <h3>Eco Score</h3>
            <span className="card-icon">🌱</span>
          </div>
          <div className="eco-score-display">
            <div className="score-number">{userProfile.ecoScore}</div>
            <div className="score-level">Level {userProfile.level}</div>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(userProfile.ecoScore % 100)}%` }}
            ></div>
          </div>
        </motion.div>

        {/* Eco Coins Card */}
        <motion.div
          className="dashboard-card eco-coins-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="card-header">
            <h3>Eco Coins</h3>
            <span className="card-icon">🪙</span>
          </div>
          <div className="coins-display">
            <div className="coins-number">{userProfile.ecoCoins}</div>
            <div className="coins-label">Available</div>
          </div>
        </motion.div>

        {/* Badges Card */}
        <motion.div
          className="dashboard-card badges-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="card-header">
            <h3>Badges</h3>
            <span className="card-icon">🏅</span>
          </div>
          <div className="badges-display">
            {userProfile.badges.length > 0 ? (
              <div className="badges-grid">
                {userProfile.badges.map((badge, index) => (
                  <div key={index} className="badge-item">
                    <span className="badge-icon">🏆</span>
                    <span className="badge-name">{badge}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-badges">
                <span className="no-badges-icon">🎯</span>
                <p>Complete missions to earn badges!</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="dashboard-card quick-actions-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="card-header">
            <h3>Quick Actions</h3>
            <span className="card-icon">⚡</span>
          </div>
          <div className="quick-actions">
            <motion.button
              className="action-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="action-icon">🧠</span>
              <span>Take Quiz</span>
            </motion.button>
            <motion.button
              className="action-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="action-icon">🎮</span>
              <span>Play Game</span>
            </motion.button>
            <motion.button
              className="action-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="action-icon">📚</span>
              <span>Start Mission</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          className="dashboard-card activity-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="card-header">
            <h3>Recent Activity</h3>
            <span className="card-icon">📈</span>
          </div>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-icon">✅</span>
              <div className="activity-content">
                <div className="activity-title">Completed Eco Quiz</div>
                <div className="activity-time">2 hours ago</div>
              </div>
              <div className="activity-points">+50 points</div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">🎮</span>
              <div className="activity-content">
                <div className="activity-title">Played Recycling Game</div>
                <div className="activity-time">1 day ago</div>
              </div>
              <div className="activity-points">+30 points</div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">🏆</span>
              <div className="activity-content">
                <div className="activity-title">Earned Green Thumb Badge</div>
                <div className="activity-time">3 days ago</div>
              </div>
              <div className="activity-points">+100 points</div>
            </div>
          </div>
        </motion.div>

        {/* Leaderboard Preview */}
        <motion.div
          className="dashboard-card leaderboard-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="card-header">
            <h3>Class Leaderboard</h3>
            <span className="card-icon">🏆</span>
          </div>
          <div className="leaderboard-preview">
            <div className="leaderboard-item rank-1">
              <span className="rank">1</span>
              <span className="name">Alex Chen</span>
              <span className="score">1,250</span>
            </div>
            <div className="leaderboard-item rank-2">
              <span className="rank">2</span>
              <span className="name">Maya Patel</span>
              <span className="score">1,180</span>
            </div>
            <div className="leaderboard-item rank-3 current-user">
              <span className="rank">3</span>
              <span className="name">You</span>
              <span className="score">{userProfile.ecoScore}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderTeacherDashboard = () => (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Teacher Dashboard 👨‍🏫</h1>
          <p>Manage your students and approve eco actions</p>
        </motion.div>
      </div>

      <div className="dashboard-grid">
        {/* Pending Approvals */}
        <motion.div
          className="dashboard-card pending-approvals-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="card-header">
            <h3>Pending Approvals</h3>
            <span className="card-icon">⏳</span>
            <span className="notification-badge">5</span>
          </div>
          <div className="approvals-list">
            <div className="approval-item">
              <div className="approval-content">
                <div className="approval-title">Tree Planting - Sarah Johnson</div>
                <div className="approval-description">Planted 3 trees in local park</div>
              </div>
              <div className="approval-actions">
                <button className="btn btn--primary btn--small">Approve</button>
                <button className="btn btn--secondary btn--small">Reject</button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Class Statistics */}
        <motion.div
          className="dashboard-card class-stats-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="card-header">
            <h3>Class Statistics</h3>
            <span className="card-icon">📊</span>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">28</div>
              <div className="stat-label">Students</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">156</div>
              <div className="stat-label">Eco Actions</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">2,340</div>
              <div className="stat-label">Total Points</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Admin Dashboard 👨‍💼</h1>
          <p>Manage schools, competitions, and events</p>
        </motion.div>
      </div>

      <div className="dashboard-grid">
        {/* System Overview */}
        <motion.div
          className="dashboard-card system-overview-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="card-header">
            <h3>System Overview</h3>
            <span className="card-icon">🌐</span>
          </div>
          <div className="overview-stats">
            <div className="overview-item">
              <div className="overview-number">12</div>
              <div className="overview-label">Schools</div>
            </div>
            <div className="overview-item">
              <div className="overview-number">1,247</div>
              <div className="overview-label">Students</div>
            </div>
            <div className="overview-item">
              <div className="overview-number">89</div>
              <div className="overview-label">Teachers</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-page">
      {userProfile.role === 'student' && renderStudentDashboard()}
      {userProfile.role === 'teacher' && renderTeacherDashboard()}
      {userProfile.role === 'admin' && renderAdminDashboard()}
    </div>
  );
};

export default Dashboard;
