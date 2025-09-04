import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import './styles/global.scss';

// Components
import AppLayout from './components/AppLayout';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Quizzes from './pages/Quizzes';
import MiniGames from './pages/MiniGames';
import StoryMissions from './pages/StoryMissions';
import Leaderboard from './pages/Leaderboard';
import EcoCoins from './pages/EcoCoins';
import ARMissions from './pages/ARMissions';
import ProtectedRoute from './components/ProtectedRoute';

// Animation variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: 'tween' as const,
  ease: 'anticipate' as const,
  duration: 0.4,
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppLayout>
            <AnimatePresence mode="wait">
              <Routes>
                    {/* Public Routes */}
                    <Route 
                      path="/" 
                      element={
                        <motion.div
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={pageVariants}
                          transition={pageTransition}
                        >
                          <Landing />
                        </motion.div>
                      } 
                    />
                    <Route 
                      path="/login" 
                      element={
                        <motion.div
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={pageVariants}
                          transition={pageTransition}
                        >
                          <Login />
                        </motion.div>
                      } 
                    />
                    <Route 
                      path="/signup" 
                      element={
                        <motion.div
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={pageVariants}
                          transition={pageTransition}
                        >
                          <Signup />
                        </motion.div>
                      } 
                    />
                    
                    {/* Protected Routes */}
                    <Route 
                      path="/dashboard" 
                      element={
                        <ProtectedRoute>
                          <motion.div
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                          >
                            <Dashboard />
                          </motion.div>
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/quizzes" 
                      element={
                        <ProtectedRoute>
                          <motion.div
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                          >
                            <Quizzes />
                          </motion.div>
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/games" 
                      element={
                        <ProtectedRoute>
                          <motion.div
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                          >
                            <MiniGames />
                          </motion.div>
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/missions" 
                      element={
                        <ProtectedRoute>
                          <motion.div
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                          >
                            <StoryMissions />
                          </motion.div>
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/leaderboard" 
                      element={
                        <ProtectedRoute>
                          <motion.div
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                          >
                            <Leaderboard />
                          </motion.div>
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/eco-coins" 
                      element={
                        <ProtectedRoute>
                          <motion.div
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                          >
                            <EcoCoins />
                          </motion.div>
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/ar-missions" 
                      element={
                        <ProtectedRoute>
                          <motion.div
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                          >
                            <ARMissions />
                          </motion.div>
                        </ProtectedRoute>
                      } 
                    />
                    
                    {/* Catch-all route for authenticated users */}
                    <Route 
                      path="*" 
                      element={
                        <ProtectedRoute>
                          <Navigate to="/dashboard" replace />
                        </ProtectedRoute>
                      } 
                    />
                    
              </Routes>
            </AnimatePresence>
          </AppLayout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
