import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

interface LeaderboardEntry {
  id: string;
  name: string;
  ecoCoins: number;
  level: number;
  rank: number;
  isCurrentUser: boolean;
}

const LeaderboardScreen: React.FC = () => {
  const { userProfile } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'weekly' | 'monthly' | 'alltime'>('weekly');

  // Mock leaderboard data
  const leaderboardData: LeaderboardEntry[] = [
    {
      id: '1',
      name: 'EcoWarrior99',
      ecoCoins: 1250,
      level: 8,
      rank: 1,
      isCurrentUser: false,
    },
    {
      id: '2',
      name: 'GreenThumb',
      ecoCoins: 1180,
      level: 7,
      rank: 2,
      isCurrentUser: false,
    },
    {
      id: '3',
      name: 'ClimateHero',
      ecoCoins: 1100,
      level: 7,
      rank: 3,
      isCurrentUser: false,
    },
    {
      id: '4',
      name: userProfile?.displayName || 'You',
      ecoCoins: userProfile?.ecoCoins || 0,
      level: userProfile?.level || 1,
      rank: 4,
      isCurrentUser: true,
    },
    {
      id: '5',
      name: 'NatureLover',
      ecoCoins: 850,
      level: 6,
      rank: 5,
      isCurrentUser: false,
    },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return { name: 'trophy', color: '#FFD700' };
      case 2:
        return { name: 'medal', color: '#C0C0C0' };
      case 3:
        return { name: 'medal', color: '#CD7F32' };
      default:
        return { name: 'person', color: '#666' };
    }
  };

  const renderLeaderboardItem = ({ item }: { item: LeaderboardEntry }) => {
    const rankIcon = getRankIcon(item.rank);
    
    return (
      <View style={[
        styles.leaderboardItem,
        item.isCurrentUser && styles.currentUserItem
      ]}>
        <View style={styles.rankContainer}>
          {item.rank <= 3 ? (
            <Ionicons name={rankIcon.name as any} size={24} color={rankIcon.color} />
          ) : (
            <Text style={styles.rankNumber}>{item.rank}</Text>
          )}
        </View>
        
        <View style={styles.userInfo}>
          <Text style={[
            styles.userName,
            item.isCurrentUser && styles.currentUserName
          ]}>
            {item.name}
          </Text>
          <Text style={styles.userLevel}>Level {item.level}</Text>
        </View>
        
        <View style={styles.scoreContainer}>
          <Ionicons name="leaf" size={16} color="#4CAF50" />
          <Text style={styles.ecoCoins}>{item.ecoCoins}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <Text style={styles.subtitle}>See how you rank against other eco-warriors!</Text>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'weekly' && styles.activeTab]}
          onPress={() => setSelectedTab('weekly')}
        >
          <Text style={[styles.tabText, selectedTab === 'weekly' && styles.activeTabText]}>
            Weekly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'monthly' && styles.activeTab]}
          onPress={() => setSelectedTab('monthly')}
        >
          <Text style={[styles.tabText, selectedTab === 'monthly' && styles.activeTabText]}>
            Monthly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'alltime' && styles.activeTab]}
          onPress={() => setSelectedTab('alltime')}
        >
          <Text style={[styles.tabText, selectedTab === 'alltime' && styles.activeTabText]}>
            All Time
          </Text>
        </TouchableOpacity>
      </View>

      {/* Top 3 Podium */}
      <View style={styles.podiumContainer}>
        <Text style={styles.podiumTitle}>Top Performers</Text>
        <View style={styles.podium}>
          {leaderboardData.slice(0, 3).map((user, index) => (
            <View key={user.id} style={styles.podiumItem}>
              <View style={[styles.podiumAvatar, { backgroundColor: getRankIcon(user.rank).color }]}>
                <Text style={styles.podiumRank}>{user.rank}</Text>
              </View>
              <Text style={styles.podiumName}>{user.name}</Text>
              <Text style={styles.podiumCoins}>{user.ecoCoins} coins</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Full Leaderboard */}
      <View style={styles.leaderboardContainer}>
        <Text style={styles.leaderboardTitle}>Full Rankings</Text>
        <FlatList
          data={leaderboardData}
          renderItem={renderLeaderboardItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    padding: 4,
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
  podiumContainer: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  podiumTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  podiumItem: {
    alignItems: 'center',
    flex: 1,
  },
  podiumAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  podiumRank: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  podiumName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  podiumCoins: {
    fontSize: 12,
    color: '#666',
  },
  leaderboardContainer: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 20,
    marginTop: 0,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  leaderboardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  currentUserItem: {
    backgroundColor: '#f0f8f0',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginVertical: 5,
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  userInfo: {
    flex: 1,
    marginLeft: 15,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  currentUserName: {
    color: '#4CAF50',
  },
  userLevel: {
    fontSize: 12,
    color: '#666',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ecoCoins: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginLeft: 4,
  },
});

export default LeaderboardScreen;
