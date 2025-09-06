import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { openaiService } from '../services/openai';
import './FloatingChatbot.scss';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'help';
}

const FloatingChatbot: React.FC = () => {
  const { user, userProfile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome message when first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        text: `Hi ${userProfile?.displayName || 'there'}! 🌍 I'm your Environmental Guide. I can help you with:\n\n• Climate change questions\n• Environmental science topics\n• Sustainability tips\n• Eco-friendly practices\n• Carbon footprint insights\n• Environmental news & facts\n\nWhat environmental topic interests you today?`,
        isUser: false,
        timestamp: new Date(),
        type: 'help'
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, userProfile?.displayName, messages.length]);

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
      const aiResponse = await handleEnvironmentalQuestion(inputText);
      
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

  const handleEnvironmentalQuestion = async (question: string): Promise<string> => {
    // Enhanced environmental knowledge base with specialized prompts
    const lowerQuestion = question.toLowerCase();
    
    let specializedPrompt = '';
    
    if (lowerQuestion.includes('climate change') || lowerQuestion.includes('global warming')) {
      specializedPrompt = `As an expert climate scientist, explain climate change in simple terms. Include:
      - What causes climate change (greenhouse gases, human activities)
      - Current impacts (rising temperatures, extreme weather, sea level rise)
      - What we can do to help (renewable energy, reducing emissions, sustainable living)
      - Hope and solutions (clean technology, policy changes, individual actions)
      
      User question: "${question}"
      
      Keep it educational but hopeful, and include one practical action they can take today.`;
    } else if (lowerQuestion.includes('renewable energy') || lowerQuestion.includes('solar') || lowerQuestion.includes('wind')) {
      specializedPrompt = `As a renewable energy expert, explain renewable energy sources. Include:
      - Types of renewable energy (solar, wind, hydro, geothermal)
      - Benefits (clean, sustainable, cost-effective)
      - How individuals can use renewable energy
      - Future of clean energy
      
      User question: "${question}"
      
      Make it practical and inspiring, showing how renewable energy is accessible to everyone.`;
    } else if (lowerQuestion.includes('waste') || lowerQuestion.includes('recycling') || lowerQuestion.includes('plastic')) {
      specializedPrompt = `As a waste management expert, provide guidance on waste reduction. Include:
      - The 3 R's (Reduce, Reuse, Recycle) and beyond
      - Plastic pollution facts and solutions
      - Composting and organic waste
      - Zero waste lifestyle tips
      
      User question: "${question}"
      
      Focus on practical, actionable steps they can implement immediately.`;
    } else if (lowerQuestion.includes('carbon footprint') || lowerQuestion.includes('emissions')) {
      specializedPrompt = `As a carbon footprint specialist, explain carbon footprints and reduction strategies. Include:
      - What a carbon footprint is and how it's calculated
      - Major sources of personal carbon emissions
      - Practical ways to reduce carbon footprint
      - The impact of individual actions
      
      User question: "${question}"
      
      Provide specific, measurable actions they can take to reduce their impact.`;
    } else if (lowerQuestion.includes('biodiversity') || lowerQuestion.includes('ecosystem') || lowerQuestion.includes('wildlife')) {
      specializedPrompt = `As a biodiversity conservation expert, explain the importance of biodiversity. Include:
      - What biodiversity is and why it matters
      - Threats to biodiversity (habitat loss, climate change, pollution)
      - How individuals can help protect biodiversity
      - Success stories in conservation
      
      User question: "${question}"
      
      Connect their daily actions to global biodiversity protection.`;
    } else if (lowerQuestion.includes('ocean') || lowerQuestion.includes('marine') || lowerQuestion.includes('sea')) {
      specializedPrompt = `As a marine conservation expert, discuss ocean health and protection. Include:
      - Current threats to ocean health (plastic pollution, overfishing, acidification)
      - The importance of healthy oceans for climate regulation
      - How individuals can help protect oceans
      - Ocean conservation success stories
      
      User question: "${question}"
      
      Emphasize the connection between land-based actions and ocean health.`;
    } else {
      // General environmental education prompt
      specializedPrompt = `You are an expert environmental educator and sustainability consultant. The user is asking about environmental topics. Provide helpful, accurate, and engaging information about:

      ${question}

      Please respond in a conversational, educational tone. Include:
      - Clear explanations of environmental concepts
      - Practical tips for sustainable living
      - Current environmental facts and statistics
      - Actionable advice for reducing environmental impact
      - Encouragement and positive reinforcement

      Keep responses informative but not overwhelming, and always end with a question or suggestion to keep the conversation engaging.`;
    }

    const response = await openaiService.makeRequest(specializedPrompt, 500);
    return response;
  };

  const environmentalTopics = [
    { text: "Climate Change", action: "Tell me about climate change and its effects" },
    { text: "Renewable Energy", action: "Explain renewable energy sources and their benefits" },
    { text: "Waste Reduction", action: "How can I reduce my waste and live more sustainably?" },
    { text: "Carbon Footprint", action: "What is a carbon footprint and how can I reduce mine?" },
    { text: "Biodiversity", action: "Why is biodiversity important for the environment?" },
    { text: "Ocean Conservation", action: "What are the main threats to ocean health?" },
    { text: "Sustainable Living", action: "What are practical ways to live more sustainably?" },
    { text: "Green Technology", action: "How can technology help solve environmental problems?" },
    { text: "Environmental Justice", action: "What is environmental justice and why does it matter?" },
    { text: "Eco-Friendly Products", action: "How do I choose environmentally friendly products?" },
    { text: "Water Conservation", action: "What are effective ways to conserve water?" },
    { text: "Air Quality", action: "How does air pollution affect health and the environment?" }
  ];

  const handleQuickAction = (action: string) => {
    setInputText(action);
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  // Don't render if user is not authenticated
  if (!user) {
    return null;
  }

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        className="floating-chat-button"
        onClick={toggleChatbot}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <span className="chat-icon">🌍</span>
        <span className="chat-label">Eco Guide</span>
      </motion.button>

      {/* Chatbot Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="floating-chatbot-panel"
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-title">
                <span className="ai-icon">🌍</span>
                <div>
                  <h3>Environmental Guide</h3>
                  <p>Your personal eco-education assistant</p>
                </div>
              </div>
              <button className="close-btn" onClick={toggleChatbot}>
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

            {/* Quick Topics */}
            {messages.length === 1 && (
              <div className="quick-topics">
                <p>Popular topics:</p>
                <div className="topic-buttons">
                  {environmentalTopics.map((topic, index) => (
                    <button
                      key={index}
                      className="topic-btn"
                      onClick={() => handleQuickAction(topic.action)}
                    >
                      {topic.text}
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
                placeholder="Ask about environmental topics..."
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
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChatbot;
