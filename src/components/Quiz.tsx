import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Quiz.scss';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

interface QuizProps {
  questions: Question[];
  onComplete: (score: number, totalPoints: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isAnswered, setIsAnswered] = useState(false);

  const question = questions[currentQuestion];

  const handleAnswer = useCallback((answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    if (answerIndex === question.correctAnswer) {
      setScore(score + question.points);
    }
    
    setShowResult(true);
  }, [isAnswered, question.correctAnswer, question.points, score]);

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleAnswer(-1); // Time's up
    }
  }, [timeLeft, isAnswered, handleAnswer]);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsAnswered(false);
      setTimeLeft(30);
    } else {
      onComplete(score, questions.reduce((total, q) => total + q.points, 0));
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="quiz-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="progress-text">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        
        <div className="quiz-timer">
          <div className={`timer-circle ${timeLeft <= 10 ? 'warning' : ''}`}>
            <span className="timer-text">{timeLeft}</span>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          className="quiz-question"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="question-text">{question.question}</h2>
          
          <div className="options-container">
            {question.options.map((option, index) => {
              let optionClass = 'option';
              
              if (showResult) {
                if (index === question.correctAnswer) {
                  optionClass += ' correct';
                } else if (index === selectedAnswer && index !== question.correctAnswer) {
                  optionClass += ' incorrect';
                }
              } else if (selectedAnswer === index) {
                optionClass += ' selected';
              }
              
              return (
                <motion.button
                  key={index}
                  className={optionClass}
                  onClick={() => handleAnswer(index)}
                  disabled={isAnswered}
                  whileHover={{ scale: isAnswered ? 1 : 1.02 }}
                  whileTap={{ scale: isAnswered ? 1 : 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="option-text">{option}</span>
                  {showResult && index === question.correctAnswer && (
                    <span className="correct-icon">✓</span>
                  )}
                  {showResult && index === selectedAnswer && index !== question.correctAnswer && (
                    <span className="incorrect-icon">✗</span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {showResult && (
            <motion.div
              className="explanation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h4>Explanation:</h4>
              <p>{question.explanation}</p>
              <div className="points-earned">
                {selectedAnswer === question.correctAnswer ? (
                  <span className="points-positive">+{question.points} points!</span>
                ) : (
                  <span className="points-negative">0 points</span>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {showResult && (
        <motion.div
          className="quiz-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <motion.button
            className="btn btn--primary btn--large"
            onClick={handleNext}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default Quiz;
