import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { openaiService } from '../services/openai';
import './AIChatbot.scss';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'help';
}

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIChatbot: React.FC<AIChatbotProps> = ({ isOpen, onClose }) => {
  const { user, userProfile } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        text: `Hi ${userProfile?.displayName || 'there'}! 🌍 I'm your CarbonCtrl AI assistant. I can help you with:\n\n• Environmental questions\n• App navigation\n• Quiz explanations\n• Eco tips and facts\n• Progress insights\n\nWhat would you like to know?`,
        isUser: false,
        timestamp: new Date(),
        type: 'help'
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, userProfile?.displayName]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Determine the type of help needed based on keywords
      const lowerText = inputText.toLowerCase();
      let aiResponse: string;

      if (lowerText.includes('quiz') || lowerText.includes('question') || lowerText.includes('answer')) {
        aiResponse = await handleQuizHelp(inputText);
      } else if (lowerText.includes('navigate') || lowerText.includes('where') || lowerText.includes('how to')) {
        aiResponse = await handleNavigationHelp(inputText);
      } else if (lowerText.includes('progress') || lowerText.includes('score') || lowerText.includes('level')) {
        aiResponse = await handleProgressHelp(inputText);
      } else if (lowerText.includes('eco') || lowerText.includes('environment') || lowerText.includes('climate')) {
        aiResponse = await handleEnvironmentalQuestion(inputText);
      } else {
        aiResponse = await handleGeneralHelp(inputText);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again!',
        isUser: false,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuizHelp = async (question: string): Promise<string> => {
    const prompt = `The user is asking about quizzes in the CarbonCtrl app. Help them understand how to:
    - Take quizzes in the Quizzes section
    - Earn points and EcoCoins
    - View their quiz history
    - Get explanations for answers
    
    User question: "${question}"
    
    Provide helpful guidance about the quiz system.`;
    
    const response = await openaiService.makeRequest(prompt, 300);
    return response;
  };

  const handleNavigationHelp = async (question: string): Promise<string> => {
    const prompt = `The user needs help navigating the CarbonCtrl app. Help them find:
    - Dashboard (main overview)
    - Quizzes (learning section)
    - Games (mini-games)
    - Missions (story missions)
    - Leaderboard (rankings)
    - EcoCoins (rewards)
    - AR Missions (augmented reality)
    
    User question: "${question}"
    
    Provide clear navigation guidance.`;
    
    const response = await openaiService.makeRequest(prompt, 300);
    return response;
  };

  const handleProgressHelp = async (question: string): Promise<string> => {
    const prompt = `The user is asking about their progress in CarbonCtrl. Help them understand:
    - How to view their progress
    - What EcoCoins are and how to earn them
    - How to level up
    - How to track their environmental impact
    - How to set goals
    
    User question: "${question}"
    
    Provide helpful progress tracking guidance.`;
    
    const response = await openaiService.makeRequest(prompt, 300);
    return response;
  };

  const handleEnvironmentalQuestion = async (question: string): Promise<string> => {
    const response = await openaiService.askQuestion(question);
    return response.content;
  };

  const handleGeneralHelp = async (question: string): Promise<string> => {
    const prompt = `The user is asking for general help with the CarbonCtrl app. Help them with:
    - App features and functionality
    - How to get started
    - Tips for using the app effectively
    - Environmental education topics
    
    User question: "${question}"
    
    Provide helpful and encouraging guidance.`;
    
    const response = await openaiService.makeRequest(prompt, 300);
    return response;
  };

  const quickActions = [
    { text: "How do I take a quiz?", action: "How do I take a quiz?" },
    { text: "Where are my EcoCoins?", action: "Where can I see my EcoCoins?" },
    { text: "How to play games?", action: "How do I play the mini-games?" },
    { text: "Environmental tips", action: "Give me some environmental tips" }
  ];

  const handleQuickAction = (action: string) => {
    setInputText(action);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="ai-chatbot-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="ai-chatbot"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-title">
                <span className="ai-icon">🤖</span>
                <div>
                  <h3>CarbonCtrl AI Assistant</h3>
                  <p>Your eco-education helper</p>
                </div>
              </div>
              <button className="close-btn" onClick={onClose}>
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="chatbot-messages">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`message ${message.isUser ? 'user' : 'ai'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="message-content">
                    {message.text.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  className="message ai loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="quick-actions">
                <p>Quick help:</p>
                <div className="quick-buttons">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      className="quick-btn"
                      onClick={() => handleQuickAction(action.action)}
                    >
                      {action.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="chatbot-input">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything about CarbonCtrl or the environment..."
                disabled={isLoading}
              />
              <button
                className="send-btn"
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isLoading}
              >
                {isLoading ? '⏳' : '➤'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIChatbot;
