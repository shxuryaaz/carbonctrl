import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import './EcoCoins.scss';

interface Transaction {
  id: string;
  type: 'earned' | 'spent' | 'pending';
  amount: number;
  description: string;
  date: Date;
  status: 'completed' | 'pending' | 'rejected';
}

const EcoCoins: React.FC = () => {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'wallet' | 'transactions' | 'redeem'>('wallet');

  const mockTransactions: Transaction[] = [
    {
      id: '1',
      type: 'earned',
      amount: 50,
      description: 'Completed Recycling Quiz',
      date: new Date('2024-01-15'),
      status: 'completed'
    },
    {
      id: '2',
      type: 'earned',
      amount: 30,
      description: 'Played Recycling Game',
      date: new Date('2024-01-14'),
      status: 'completed'
    },
    {
      id: '3',
      type: 'pending',
      amount: 100,
      description: 'Planted 3 trees in local park',
      date: new Date('2024-01-13'),
      status: 'pending'
    },
    {
      id: '4',
      type: 'earned',
      amount: 25,
      description: 'Energy Conservation Mission',
      date: new Date('2024-01-12'),
      status: 'completed'
    },
    {
      id: '5',
      type: 'spent',
      amount: -20,
      description: 'Redeemed Eco-friendly Water Bottle',
      date: new Date('2024-01-10'),
      status: 'completed'
    }
  ];

  const redeemableItems = [
    {
      id: '1',
      name: 'Eco-friendly Water Bottle',
      description: 'Stainless steel, BPA-free',
      cost: 20,
      image: '💧',
      category: 'Accessories'
    },
    {
      id: '2',
      name: 'Plant Seeds Pack',
      description: 'Mixed variety of native plants',
      cost: 50,
      image: '🌱',
      category: 'Gardening'
    },
    {
      id: '3',
      name: 'Solar Phone Charger',
      description: 'Portable solar charging device',
      cost: 150,
      image: '☀️',
      category: 'Electronics'
    },
    {
      id: '4',
      name: 'Reusable Shopping Bag Set',
      description: 'Set of 5 organic cotton bags',
      cost: 30,
      image: '🛍️',
      category: 'Accessories'
    }
  ];

  const tabs = [
    { id: 'wallet', label: 'Wallet', icon: '🪙' },
    { id: 'transactions', label: 'History', icon: '📊' },
    { id: 'redeem', label: 'Redeem', icon: '🎁' }
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earned': return '➕';
      case 'spent': return '➖';
      case 'pending': return '⏳';
      default: return '💰';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'var(--primary-emerald)';
      case 'pending': return 'var(--warning)';
      case 'rejected': return 'var(--error)';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <motion.div
      className="ecocoins-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="page-header">
        <h1>🪙 Eco Coins</h1>
        <p>Your digital wallet for eco rewards!</p>
      </div>

      <div className="ecocoins-tabs">
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

      <div className="ecocoins-content">
        {activeTab === 'wallet' && (
          <motion.div
            className="wallet-tab"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="wallet-overview">
              <div className="balance-card">
                <div className="balance-header">
                  <h2>Your Eco Coins</h2>
                  <span className="coin-icon">🪙</span>
                </div>
                <div className="balance-amount">
                  {userProfile?.ecoCoins || 180}
                </div>
                <div className="balance-label">Available Balance</div>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">📈</div>
                  <div className="stat-info">
                    <div className="stat-value">+{mockTransactions.filter(t => t.type === 'earned' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0)}</div>
                    <div className="stat-label">Earned This Month</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🎯</div>
                  <div className="stat-info">
                    <div className="stat-value">{mockTransactions.filter(t => t.status === 'pending').length}</div>
                    <div className="stat-label">Pending Actions</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🏆</div>
                  <div className="stat-info">
                    <div className="stat-value">{userProfile?.badges?.length || 1}</div>
                    <div className="stat-label">Badges Earned</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="recent-activity">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                {mockTransactions.slice(0, 3).map((transaction) => (
                  <div key={transaction.id} className="activity-item">
                    <div className="activity-icon">{getTransactionIcon(transaction.type)}</div>
                    <div className="activity-info">
                      <div className="activity-description">{transaction.description}</div>
                      <div className="activity-date">{transaction.date.toLocaleDateString()}</div>
                    </div>
                    <div className={`activity-amount ${transaction.type}`}>
                      {transaction.type === 'earned' ? '+' : ''}{transaction.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'transactions' && (
          <motion.div
            className="transactions-tab"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="transactions-header">
              <h2>Transaction History</h2>
              <div className="filter-buttons">
                <button className="filter-btn active">All</button>
                <button className="filter-btn">Earned</button>
                <button className="filter-btn">Spent</button>
                <button className="filter-btn">Pending</button>
              </div>
            </div>

            <div className="transactions-list">
              {mockTransactions.map((transaction) => (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-icon">{getTransactionIcon(transaction.type)}</div>
                  <div className="transaction-info">
                    <div className="transaction-description">{transaction.description}</div>
                    <div className="transaction-date">{transaction.date.toLocaleDateString()}</div>
                    <div className="transaction-status" style={{ color: getStatusColor(transaction.status) }}>
                      {transaction.status}
                    </div>
                  </div>
                  <div className={`transaction-amount ${transaction.type}`}>
                    {transaction.type === 'earned' ? '+' : ''}{transaction.amount}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'redeem' && (
          <motion.div
            className="redeem-tab"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="redeem-header">
              <h2>Redeem Rewards</h2>
              <p>Exchange your Eco Coins for sustainable products!</p>
            </div>

            <div className="redeem-grid">
              {redeemableItems.map((item) => (
                <div key={item.id} className="redeem-item">
                  <div className="item-image">{item.image}</div>
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <div className="item-meta">
                      <span className="item-category">{item.category}</span>
                      <span className="item-cost">{item.cost} coins</span>
                    </div>
                  </div>
                  <motion.button
                    className={`redeem-btn ${item.cost > (userProfile?.ecoCoins || 0) ? 'disabled' : ''}`}
                    disabled={item.cost > (userProfile?.ecoCoins || 0)}
                    whileHover={{ scale: item.cost <= (userProfile?.ecoCoins || 0) ? 1.05 : 1 }}
                    whileTap={{ scale: item.cost <= (userProfile?.ecoCoins || 0) ? 0.95 : 1 }}
                  >
                    {item.cost > (userProfile?.ecoCoins || 0) ? 'Not Enough Coins' : 'Redeem'}
                  </motion.button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default EcoCoins;
