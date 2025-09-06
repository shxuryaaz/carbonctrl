import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  icon: string;
  color: string;
  available: boolean;
}

const EcoCoinsScreen: React.FC = () => {
  const { userProfile, updateUserProfile } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<'rewards' | 'history'>('rewards');

  const rewards: Reward[] = [
    {
      id: '1',
      title: 'Plant a Tree',
      description: 'Contribute to reforestation efforts',
      cost: 100,
      icon: 'leaf',
      color: '#4CAF50',
      available: true,
    },
    {
      id: '2',
      title: 'Ocean Cleanup',
      description: 'Support ocean conservation projects',
      cost: 150,
      icon: 'water',
      color: '#2196F3',
      available: true,
    },
    {
      id: '3',
      title: 'Solar Panel',
      description: 'Help install solar panels in communities',
      cost: 200,
      icon: 'sunny',
      color: '#FFC107',
      available: true,
    },
    {
      id: '4',
      title: 'Wildlife Protection',
      description: 'Support endangered species conservation',
      cost: 300,
      icon: 'paw',
      color: '#FF5722',
      available: (userProfile?.ecoCoins || 0) >= 300,
    },
  ];

  const transactionHistory = [
    { id: '1', type: 'earned', amount: 20, description: 'Completed Climate Quiz', date: '2 hours ago' },
    { id: '2', type: 'earned', amount: 15, description: 'Energy Saver Game', date: '1 day ago' },
    { id: '3', type: 'spent', amount: -100, description: 'Planted a Tree', date: '3 days ago' },
    { id: '4', type: 'earned', amount: 25, description: 'Recycling Game', date: '5 days ago' },
  ];

  const purchaseReward = (reward: Reward) => {
    if (!userProfile) return;
    
    if (userProfile.ecoCoins < reward.cost) {
      Alert.alert('Insufficient Coins', `You need ${reward.cost} Eco Coins to purchase this reward.`);
      return;
    }

    Alert.alert(
      'Purchase Reward',
      `Are you sure you want to spend ${reward.cost} Eco Coins on "${reward.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Purchase',
          onPress: () => {
            updateUserProfile({
              ecoCoins: userProfile.ecoCoins - reward.cost,
            });
            Alert.alert('Success!', `You've successfully purchased "${reward.title}"!`);
          },
        },
      ]
    );
  };

  const renderReward = (reward: Reward) => (
    <TouchableOpacity
      key={reward.id}
      style={[
        styles.rewardCard,
        !reward.available && styles.rewardCardDisabled
      ]}
      onPress={() => reward.available && purchaseReward(reward)}
      disabled={!reward.available}
    >
      <View style={[styles.rewardIcon, { backgroundColor: reward.color }]}>
        <Ionicons name={reward.icon as any} size={28} color="#fff" />
      </View>
      
      <View style={styles.rewardInfo}>
        <Text style={styles.rewardTitle}>{reward.title}</Text>
        <Text style={styles.rewardDescription}>{reward.description}</Text>
        <View style={styles.rewardCost}>
          <Ionicons name="leaf" size={16} color="#4CAF50" />
          <Text style={styles.costText}>{reward.cost} Eco Coins</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.purchaseButton,
          !reward.available && styles.purchaseButtonDisabled
        ]}
        disabled={!reward.available}
      >
        <Text style={[
          styles.purchaseButtonText,
          !reward.available && styles.purchaseButtonTextDisabled
        ]}>
          {reward.available ? 'Purchase' : 'Locked'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderTransaction = (transaction: any) => (
    <View key={transaction.id} style={styles.transactionItem}>
      <View style={styles.transactionIcon}>
        <Ionicons
          name={transaction.type === 'earned' ? 'add-circle' : 'remove-circle'}
          size={24}
          color={transaction.type === 'earned' ? '#4CAF50' : '#F44336'}
        />
      </View>
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionDescription}>{transaction.description}</Text>
        <Text style={styles.transactionDate}>{transaction.date}</Text>
      </View>
      <Text style={[
        styles.transactionAmount,
        { color: transaction.type === 'earned' ? '#4CAF50' : '#F44336' }
      ]}>
        {transaction.type === 'earned' ? '+' : ''}{transaction.amount}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header with Balance */}
        <LinearGradient
          colors={['#4CAF50', '#2E7D32']}
          style={styles.header}
        >
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Your Eco Coins</Text>
            <Text style={styles.balanceAmount}>{userProfile?.ecoCoins || 0}</Text>
            <Text style={styles.balanceSubtext}>Keep earning to unlock more rewards!</Text>
          </View>
        </LinearGradient>

        {/* Category Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedCategory === 'rewards' && styles.activeTab]}
            onPress={() => setSelectedCategory('rewards')}
          >
            <Text style={[styles.tabText, selectedCategory === 'rewards' && styles.activeTabText]}>
              Rewards
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedCategory === 'history' && styles.activeTab]}
            onPress={() => setSelectedCategory('history')}
          >
            <Text style={[styles.tabText, selectedCategory === 'history' && styles.activeTabText]}>
              History
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        {selectedCategory === 'rewards' ? (
          <View style={styles.rewardsContainer}>
            <Text style={styles.sectionTitle}>Available Rewards</Text>
            {rewards.map(renderReward)}
          </View>
        ) : (
          <View style={styles.historyContainer}>
            <Text style={styles.sectionTitle}>Transaction History</Text>
            {transactionHistory.map(renderTransaction)}
          </View>
        )}

        {/* How to Earn */}
        <View style={styles.earnSection}>
          <Text style={styles.sectionTitle}>How to Earn Eco Coins</Text>
          <View style={styles.earnMethods}>
            <View style={styles.earnMethod}>
              <Ionicons name="help-circle" size={24} color="#4CAF50" />
              <Text style={styles.earnMethodText}>Complete Quizzes</Text>
              <Text style={styles.earnMethodSubtext}>+10-40 coins</Text>
            </View>
            <View style={styles.earnMethod}>
              <Ionicons name="game-controller" size={24} color="#FF5722" />
              <Text style={styles.earnMethodText}>Play Mini Games</Text>
              <Text style={styles.earnMethodSubtext}>+15-30 coins</Text>
            </View>
            <View style={styles.earnMethod}>
              <Ionicons name="trophy" size={24} color="#FF9800" />
              <Text style={styles.earnMethodText}>Daily Challenges</Text>
              <Text style={styles.earnMethodSubtext}>+20-50 coins</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 30,
    alignItems: 'center',
  },
  balanceContainer: {
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  balanceSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#4CAF50',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
  },
  rewardsContainer: {
    padding: 20,
  },
  historyContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  rewardCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rewardCardDisabled: {
    opacity: 0.6,
  },
  rewardIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  rewardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  rewardCost: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  costText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
    marginLeft: 4,
  },
  purchaseButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  purchaseButtonDisabled: {
    backgroundColor: '#ccc',
  },
  purchaseButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  purchaseButtonTextDisabled: {
    color: '#999',
  },
  transactionItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionIcon: {
    marginRight: 15,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  earnSection: {
    padding: 20,
  },
  earnMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  earnMethod: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: (width - 60) / 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  earnMethodText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  earnMethodSubtext: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
});

export default EcoCoinsScreen;
