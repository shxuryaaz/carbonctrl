import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Quiz from '../components/Quiz';
import { aiInsightsService } from '../services/aiInsights';
import './Quizzes.scss';

interface QuizData {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: string;
  points: number;
  questions: any[];
}

const Quizzes: React.FC = () => {
  const { userProfile } = useAuth();
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [quizResults, setQuizResults] = useState<{ score: number; totalPoints: number } | null>(null);
  const [aiGeneratedQuiz, setAiGeneratedQuiz] = useState<any[]>([]);
  const [loadingAIQuiz, setLoadingAIQuiz] = useState(false);

  const generateAIContextualQuiz = async (topic: string) => {
    if (!userProfile) return;
    
    setLoadingAIQuiz(true);
    try {
      const contextualQuestions = await aiInsightsService.getContextualQuiz(topic, userProfile);
      setAiGeneratedQuiz(contextualQuestions);
      
      // Create a dynamic quiz with AI-generated questions
      const aiQuiz: QuizData = {
        id: `ai-${topic.toLowerCase().replace(/\s+/g, '-')}`,
        title: `AI ${topic} Quiz`,
        description: `Personalized ${topic} quiz based on current environmental conditions`,
        icon: '🤖',
        difficulty: 'Dynamic',
        points: contextualQuestions.length * 25,
        questions: contextualQuestions
      };
      
      return aiQuiz;
    } catch (error) {
      console.error('Error generating AI quiz:', error);
      return null;
    } finally {
      setLoadingAIQuiz(false);
    }
  };

  const quizzes: QuizData[] = [
    {
      id: 'recycling-basics',
      title: 'Recycling Basics',
      description: 'Learn the fundamentals of recycling and waste management',
      icon: '♻️',
      difficulty: 'Easy',
      points: 100,
      questions: [
        {
          id: 1,
          question: 'Which of the following items can be recycled?',
          options: ['Plastic bottles', 'Food waste', 'Broken glass', 'All of the above'],
          correctAnswer: 0,
          explanation: 'Plastic bottles are recyclable, while food waste should be composted and broken glass needs special handling.',
          points: 20
        },
        {
          id: 2,
          question: 'What is the most important step before recycling?',
          options: ['Washing items', 'Sorting by color', 'Removing labels', 'All of the above'],
          correctAnswer: 3,
          explanation: 'All these steps help ensure proper recycling and prevent contamination.',
          points: 20
        },
        {
          id: 3,
          question: 'How long does it take for a plastic bottle to decompose?',
          options: ['1 year', '10 years', '450 years', '1000 years'],
          correctAnswer: 2,
          explanation: 'Plastic bottles can take up to 450 years to decompose in the environment.',
          points: 20
        },
        {
          id: 4,
          question: 'Which material is most commonly recycled?',
          options: ['Paper', 'Plastic', 'Glass', 'Metal'],
          correctAnswer: 0,
          explanation: 'Paper is the most commonly recycled material worldwide.',
          points: 20
        },
        {
          id: 5,
          question: 'What percentage of waste can be recycled?',
          options: ['25%', '50%', '75%', '90%'],
          correctAnswer: 2,
          explanation: 'Approximately 75% of household waste can be recycled or composted.',
          points: 20
        }
      ]
    },
    {
      id: 'climate-change',
      title: 'Climate Change',
      description: 'Test your knowledge about climate change and its impacts',
      icon: '🌡️',
      difficulty: 'Medium',
      points: 150,
      questions: [
        {
          id: 1,
          question: 'What is the main cause of climate change?',
          options: ['Solar radiation', 'Greenhouse gases', 'Ocean currents', 'Volcanic activity'],
          correctAnswer: 1,
          explanation: 'Greenhouse gases trap heat in the atmosphere, causing global warming.',
          points: 30
        },
        {
          id: 2,
          question: 'Which gas is the most abundant greenhouse gas?',
          options: ['Carbon dioxide', 'Methane', 'Water vapor', 'Nitrous oxide'],
          correctAnswer: 2,
          explanation: 'Water vapor is the most abundant greenhouse gas in the atmosphere.',
          points: 30
        }
      ]
    },
    {
      id: 'renewable-energy',
      title: 'Renewable Energy',
      description: 'Learn about clean energy sources and sustainability',
      icon: '⚡',
      difficulty: 'Hard',
      points: 200,
      questions: [
        {
          id: 1,
          question: 'Which renewable energy source is most efficient?',
          options: ['Solar', 'Wind', 'Hydroelectric', 'Geothermal'],
          correctAnswer: 2,
          explanation: 'Hydroelectric power has the highest efficiency among renewable energy sources.',
          points: 40
        }
      ]
    }
  ];

  const handleQuizComplete = (score: number, totalPoints: number) => {
    setQuizResults({ score, totalPoints });
    setShowResults(true);
  };

  const handleBackToQuizzes = () => {
    setSelectedQuiz(null);
    setShowResults(false);
    setQuizResults(null);
  };

  const getSelectedQuizData = () => {
    if (selectedQuiz === 'ai-generated') {
      return (window as any).currentAIQuiz;
    }
    return quizzes.find(q => q.id === selectedQuiz);
  };

  const selectedQuizData = getSelectedQuizData();

  if (showResults && quizResults) {
    const percentage = Math.round((quizResults.score / quizResults.totalPoints) * 100);
    
    return (
      <motion.div
        className="quizzes-page"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="results-container">
          <motion.div
            className="results-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="results-header">
              <h1>🎉 Quiz Complete!</h1>
              <p>Great job on the {selectedQuizData?.title} quiz!</p>
            </div>
            
            <div className="results-stats">
              <div className="stat-item">
                <div className="stat-value">{quizResults.score}</div>
                <div className="stat-label">Points Earned</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{percentage}%</div>
                <div className="stat-label">Score</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">
                  {percentage >= 80 ? '🏆' : percentage >= 60 ? '🥈' : '🥉'}
                </div>
                <div className="stat-label">Grade</div>
              </div>
            </div>
            
            <div className="results-actions">
              <motion.button
                className="btn btn--primary btn--large"
                onClick={handleBackToQuizzes}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Take Another Quiz
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (selectedQuiz && selectedQuizData) {
    return (
      <motion.div
        className="quizzes-page"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="quiz-header">
          <motion.button
            className="back-btn"
            onClick={handleBackToQuizzes}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back to Quizzes
          </motion.button>
          <div className="quiz-info">
            <h1>🧠 {selectedQuizData.title}</h1>
            <p>{selectedQuizData.description}</p>
          </div>
        </div>
        
        <div className="quiz-content">
          <Quiz 
            questions={selectedQuizData.questions} 
            onComplete={handleQuizComplete}
          />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="quizzes-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="page-header">
        <h1>🧠 Eco Quizzes</h1>
        <p>Test your environmental knowledge and earn points!</p>
      </div>

      {/* AI Quiz Generator */}
      <motion.div
        className="ai-quiz-generator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="generator-header">
          <h2>🤖 AI-Powered Quizzes</h2>
          <p>Generate personalized quizzes based on current environmental conditions</p>
        </div>
        
        <div className="generator-actions">
          <button
            className="generate-btn"
            onClick={() => generateAIContextualQuiz('Climate Change')}
            disabled={loadingAIQuiz}
          >
            {loadingAIQuiz ? '⏳' : '🌡️'} Climate Change Quiz
          </button>
          <button
            className="generate-btn"
            onClick={() => generateAIContextualQuiz('Energy Conservation')}
            disabled={loadingAIQuiz}
          >
            {loadingAIQuiz ? '⏳' : '⚡'} Energy Conservation Quiz
          </button>
          <button
            className="generate-btn"
            onClick={() => generateAIContextualQuiz('Air Quality')}
            disabled={loadingAIQuiz}
          >
            {loadingAIQuiz ? '⏳' : '🌬️'} Air Quality Quiz
          </button>
        </div>
        
        {aiGeneratedQuiz.length > 0 && (
          <motion.div
            className="ai-quiz-result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3>🎯 AI-Generated Quiz Ready!</h3>
            <p>Your personalized quiz with {aiGeneratedQuiz.length} questions is ready to take.</p>
            <button
              className="take-ai-quiz-btn"
              onClick={() => {
                const aiQuiz = {
                  id: 'ai-generated',
                  title: 'AI Generated Quiz',
                  description: 'Personalized quiz based on current conditions',
                  icon: '🤖',
                  difficulty: 'Dynamic',
                  points: aiGeneratedQuiz.length * 25,
                  questions: aiGeneratedQuiz
                };
                setSelectedQuiz('ai-generated');
                // Store the AI quiz temporarily
                (window as any).currentAIQuiz = aiQuiz;
              }}
            >
              Take AI Quiz
            </button>
          </motion.div>
        )}
      </motion.div>
      
      <div className="quizzes-grid">
        {quizzes.map((quiz, index) => (
          <motion.div
            key={quiz.id}
            className="quiz-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedQuiz(quiz.id)}
          >
            <div className="quiz-icon">{quiz.icon}</div>
            <div className="quiz-info">
              <h3>{quiz.title}</h3>
              <p>{quiz.description}</p>
              <div className="quiz-meta">
                <span className={`difficulty ${quiz.difficulty.toLowerCase()}`}>
                  {quiz.difficulty}
                </span>
                <span className="points">+{quiz.points} pts</span>
                <span className="questions">{quiz.questions.length} questions</span>
              </div>
            </div>
            <div className="start-btn">
              <span>▶️</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Quizzes;
