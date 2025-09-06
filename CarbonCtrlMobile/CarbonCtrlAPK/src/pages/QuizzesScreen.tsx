import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ecoCoins: number;
  completed: boolean;
}

const QuizzesScreen: React.FC = () => {
  const { userProfile, updateUserProfile } = useAuth();
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  const quizzes: Quiz[] = [
    {
      id: '1',
      title: 'Climate Change Basics',
      description: 'Learn the fundamentals of climate change and its impact on our planet.',
      questions: 10,
      difficulty: 'Easy',
      ecoCoins: 20,
      completed: false,
    },
    {
      id: '2',
      title: 'Renewable Energy',
      description: 'Test your knowledge about solar, wind, and other renewable energy sources.',
      questions: 15,
      difficulty: 'Medium',
      ecoCoins: 30,
      completed: false,
    },
    {
      id: '3',
      title: 'Sustainable Living',
      description: 'Discover ways to live more sustainably and reduce your carbon footprint.',
      questions: 12,
      difficulty: 'Medium',
      ecoCoins: 25,
      completed: false,
    },
    {
      id: '4',
      title: 'Ocean Conservation',
      description: 'Learn about marine ecosystems and how to protect our oceans.',
      questions: 18,
      difficulty: 'Hard',
      ecoCoins: 40,
      completed: false,
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#4CAF50';
      case 'Medium': return '#FF9800';
      case 'Hard': return '#F44336';
      default: return '#666';
    }
  };

  const startQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    Alert.alert(
      'Start Quiz',
      `Are you ready to start "${quiz.title}"? You can earn ${quiz.ecoCoins} Eco Coins!`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Start', 
          onPress: () => {
            // Simulate quiz completion
            setTimeout(() => {
              Alert.alert(
                'Quiz Completed!',
                `Congratulations! You earned ${quiz.ecoCoins} Eco Coins!`,
                [{ text: 'OK' }]
              );
              
              // Update user profile
              if (userProfile) {
                updateUserProfile({
                  ecoCoins: userProfile.ecoCoins + quiz.ecoCoins,
                  totalPoints: userProfile.totalPoints + quiz.ecoCoins,
                });
              }
            }, 2000);
          }
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Eco Quizzes</Text>
          <Text style={styles.subtitle}>Test your environmental knowledge and earn Eco Coins!</Text>
        </View>

        <View style={styles.quizzesContainer}>
          {quizzes.map((quiz) => (
            <TouchableOpacity
              key={quiz.id}
              style={styles.quizCard}
              onPress={() => startQuiz(quiz)}
            >
              <View style={styles.quizHeader}>
                <View style={styles.quizIcon}>
                  <Ionicons name="help-circle" size={24} color="#4CAF50" />
                </View>
                <View style={styles.quizInfo}>
                  <Text style={styles.quizTitle}>{quiz.title}</Text>
                  <Text style={styles.quizDescription}>{quiz.description}</Text>
                </View>
              </View>

              <View style={styles.quizDetails}>
                <View style={styles.detailItem}>
                  <Ionicons name="list" size={16} color="#666" />
                  <Text style={styles.detailText}>{quiz.questions} questions</Text>
                </View>
                <View style={styles.detailItem}>
                  <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(quiz.difficulty) }]}>
                    <Text style={styles.difficultyText}>{quiz.difficulty}</Text>
                  </View>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="leaf" size={16} color="#4CAF50" />
                  <Text style={styles.detailText}>{quiz.ecoCoins} coins</Text>
                </View>
              </View>

              <View style={styles.quizFooter}>
                <TouchableOpacity style={styles.startButton}>
                  <Text style={styles.startButtonText}>Start Quiz</Text>
                  <Ionicons name="arrow-forward" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
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
  quizzesContainer: {
    padding: 20,
  },
  quizCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quizHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  quizIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f8f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  quizInfo: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  quizDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  quizDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  quizFooter: {
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});

export default QuizzesScreen;
