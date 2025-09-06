import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  ecoCoins: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const MiniGamesScreen: React.FC = () => {
  const { userProfile, updateUserProfile } = useAuth();

  const games: Game[] = [
    {
      id: '1',
      title: 'Energy Saver',
      description: 'Turn off lights and appliances to save energy!',
      icon: 'flash',
      color: '#FFC107',
      ecoCoins: 15,
      difficulty: 'Easy',
    },
    {
      id: '2',
      title: 'Recycling Game',
      description: 'Sort waste into the correct recycling bins.',
      icon: 'recycle',
      color: '#4CAF50',
      ecoCoins: 20,
      difficulty: 'Easy',
    },
    {
      id: '3',
      title: 'Tree Planting',
      description: 'Plant trees and watch your forest grow!',
      icon: 'leaf',
      color: '#8BC34A',
      ecoCoins: 25,
      difficulty: 'Medium',
    },
    {
      id: '4',
      title: 'Water Conservation',
      description: 'Save water by fixing leaks and using it wisely.',
      icon: 'water',
      color: '#2196F3',
      ecoCoins: 30,
      difficulty: 'Medium',
    },
  ];

  const startGame = (game: Game) => {
    Alert.alert(
      'Start Game',
      `Ready to play "${game.title}"? You can earn ${game.ecoCoins} Eco Coins!`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Play', 
          onPress: () => {
            // Simulate game completion
            setTimeout(() => {
              Alert.alert(
                'Game Completed!',
                `Great job! You earned ${game.ecoCoins} Eco Coins!`,
                [{ text: 'OK' }]
              );
              
              // Update user profile
              if (userProfile) {
                updateUserProfile({
                  ecoCoins: userProfile.ecoCoins + game.ecoCoins,
                  totalPoints: userProfile.totalPoints + game.ecoCoins,
                });
              }
            }, 3000);
          }
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Mini Games</Text>
          <Text style={styles.subtitle}>Play fun games and learn about environmental conservation!</Text>
        </View>

        <View style={styles.gamesContainer}>
          {games.map((game) => (
            <TouchableOpacity
              key={game.id}
              style={styles.gameCard}
              onPress={() => startGame(game)}
            >
              <View style={[styles.gameIcon, { backgroundColor: game.color }]}>
                <Ionicons name={game.icon as any} size={32} color="#fff" />
              </View>
              
              <View style={styles.gameInfo}>
                <Text style={styles.gameTitle}>{game.title}</Text>
                <Text style={styles.gameDescription}>{game.description}</Text>
                
                <View style={styles.gameDetails}>
                  <View style={styles.detailItem}>
                    <Ionicons name="leaf" size={16} color="#4CAF50" />
                    <Text style={styles.detailText}>{game.ecoCoins} coins</Text>
                  </View>
                  <View style={styles.difficultyBadge}>
                    <Text style={styles.difficultyText}>{game.difficulty}</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.playButton}>
                <Ionicons name="play" size={20} color="#fff" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Game Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Game Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Ionicons name="trophy" size={24} color="#FF9800" />
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Games Played</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="star" size={24} color="#FFC107" />
              <Text style={styles.statValue}>8</Text>
              <Text style={styles.statLabel}>High Scores</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="leaf" size={24} color="#4CAF50" />
              <Text style={styles.statValue}>240</Text>
              <Text style={styles.statLabel}>Coins Earned</Text>
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
  gamesContainer: {
    padding: 20,
  },
  gameCard: {
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
  gameIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  gameInfo: {
    flex: 1,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  gameDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  gameDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  difficultyBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '600',
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
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
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default MiniGamesScreen;
