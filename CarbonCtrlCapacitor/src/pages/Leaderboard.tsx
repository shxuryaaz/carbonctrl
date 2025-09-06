import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import './Leaderboard.scss';

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar?: string;
  ecoScore: number;
  ecoCoins: number;
  level: number;
  badges: string[];
  rank: number;
  change: 'up' | 'down' | 'same';
}

const Leaderboard: React.FC = () => {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'global' | 'class' | 'weekly'>('global');

  const mockLeaderboardData: LeaderboardEntry[] = [
    {
      id: '1',
      name: 'Alex Chen',
      ecoScore: 1250,
      ecoCoins: 340,
      level: 8,
      badges: ['🌱', '♻️', '🌳'],
      rank: 1,
      change: 'up'
    },
    {
      id: '2',
      name: 'Maya Patel',
      ecoScore: 1180,
      ecoCoins: 290,
      level: 7,
      badges: ['🌱', '♻️'],
      rank: 2,
      change: 'down'
    },
    {
      id: '3',
      name: userProfile?.displayName || 'You',
      ecoScore: userProfile?.ecoScore || 950,
      ecoCoins: userProfile?.ecoCoins || 180,
      level: userProfile?.level || 6,
      badges: userProfile?.badges || ['🌱'],
      rank: 3,
      change: 'up'
    },
    {
      id: '4',
      name: 'Jordan Kim',
      ecoScore: 890,
      ecoCoins: 150,
      level: 5,
      badges: ['🌱'],
      rank: 4,
      change: 'same'
    },
    {
      id: '5',
      name: 'Sam Wilson',
      ecoScore: 750,
      ecoCoins: 120,
      level: 5,
      badges: ['🌱'],
      rank: 5,
      change: 'down'
    }
  ];

  const tabs = [
    { id: 'global', label: 'Global', icon: '🌍' },
    { id: 'class', label: 'Class', icon: '👥' },
    { id: 'weekly', label: 'Weekly', icon: '📅' }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getChangeIcon = (change: string) => {
    switch (change) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'same': return '➡️';
      default: return '';
    }
  };

  return (
    <motion.div
      className="leaderboard-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="page-header">
        <h1>🏆 Leaderboard</h1>
        <p>See how you rank against other eco-warriors!</p>
      </div>

      <div className="leaderboard-tabs">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id as any)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </motion.button>
        ))}
      </div>

      <div className="leaderboard-content">
        <motion.div
          className="leaderboard-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="leaderboard-header">
            <h2>{tabs.find(t => t.id === activeTab)?.label} Rankings</h2>
            <div className="leaderboard-stats">
              <div className="stat">
                <span className="stat-number">{mockLeaderboardData.length}</span>
                <span className="stat-label">Players</span>
              </div>
              <div className="stat">
                <span className="stat-number">{Math.max(...mockLeaderboardData.map(p => p.ecoScore))}</span>
                <span className="stat-label">Top Score</span>
              </div>
            </div>
          </div>

          <div className="leaderboard-list">
            {mockLeaderboardData.map((player, index) => (
              <motion.div
                key={player.id}
                className={`leaderboard-item ${player.name === userProfile?.displayName ? 'current-user' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="rank-section">
                  <div className="rank-icon">{getRankIcon(player.rank)}</div>
                  <div className="rank-change">
                    <span className={`change-icon ${player.change}`}>
                      {getChangeIcon(player.change)}
                    </span>
                  </div>
                </div>

                <div className="player-info">
                  <div className="player-avatar">
                    {player.avatar ? (
                      <img src={player.avatar} alt={player.name} />
                    ) : (
                      <span>{player.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <div className="player-details">
                    <h3 className="player-name">{player.name}</h3>
                    <div className="player-badges">
                      {player.badges.map((badge, badgeIndex) => (
                        <span key={badgeIndex} className="badge">{badge}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="player-stats">
                  <div className="stat-item">
                    <span className="stat-value">{player.ecoScore}</span>
                    <span className="stat-label">Score</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{player.ecoCoins}</span>
                    <span className="stat-label">Coins</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">Lv.{player.level}</span>
                    <span className="stat-label">Level</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="achievements-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3>🏅 Recent Achievements</h3>
          <div className="achievements-list">
            <div className="achievement-item">
              <span className="achievement-icon">🌱</span>
              <div className="achievement-info">
                <div className="achievement-title">Green Thumb</div>
                <div className="achievement-description">Planted 10 trees</div>
              </div>
              <div className="achievement-points">+100 pts</div>
            </div>
            <div className="achievement-item">
              <span className="achievement-icon">♻️</span>
              <div className="achievement-info">
                <div className="achievement-title">Recycling Master</div>
                <div className="achievement-description">Recycled 50 items</div>
              </div>
              <div className="achievement-points">+75 pts</div>
            </div>
            <div className="achievement-item">
              <span className="achievement-icon">💡</span>
              <div className="achievement-info">
                <div className="achievement-title">Energy Saver</div>
                <div className="achievement-description">Saved 100 kWh</div>
              </div>
              <div className="achievement-points">+50 pts</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Leaderboard;
