import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SidebarProvider } from './context/SidebarContext';
import { motion, AnimatePresence } from 'framer-motion';
import './styles/global.scss';

// Components
import AppLayout from './components/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';

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

// Wrapper component for animated pages
const AnimatedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

// Public route wrapper that redirects authenticated users
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading CarbonCtrl...</p>
        </div>
      </div>
    );
  }
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <AnimatedPage>{children}</AnimatedPage>;
};

// Protected route wrapper with animation
const ProtectedRouteWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute>
    <AnimatedPage>{children}</AnimatedPage>
  </ProtectedRoute>
);

// Main App Router Component
const AppRouter: React.FC = () => {
  return (
    <Router>
      <AppLayout>
        <AnimatePresence mode="wait">
          <Routes>
            {/* Public Routes - Redirect to dashboard if authenticated */}
            <Route 
              path="/" 
              element={
                <PublicRoute>
                  <Landing />
                </PublicRoute>
              } 
            />
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              } 
            />
            
            {/* Protected Routes - Redirect to login if not authenticated */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRouteWrapper>
                  <Dashboard />
                </ProtectedRouteWrapper>
              } 
            />
            <Route 
              path="/quizzes" 
              element={
                <ProtectedRouteWrapper>
                  <Quizzes />
                </ProtectedRouteWrapper>
              } 
            />
            <Route 
              path="/games" 
              element={
                <ProtectedRouteWrapper>
                  <MiniGames />
                </ProtectedRouteWrapper>
              } 
            />
            <Route 
              path="/missions" 
              element={
                <ProtectedRouteWrapper>
                  <StoryMissions />
                </ProtectedRouteWrapper>
              } 
            />
            <Route 
              path="/leaderboard" 
              element={
                <ProtectedRouteWrapper>
                  <Leaderboard />
                </ProtectedRouteWrapper>
              } 
            />
            <Route 
              path="/eco-coins" 
              element={
                <ProtectedRouteWrapper>
                  <EcoCoins />
                </ProtectedRouteWrapper>
              } 
            />
            <Route 
              path="/ar-missions" 
              element={
                <ProtectedRouteWrapper>
                  <ARMissions />
                </ProtectedRouteWrapper>
              } 
            />
            
            {/* Catch-all route */}
            <Route 
              path="*" 
              element={<Navigate to="/" replace />} 
            />
          </Routes>
        </AnimatePresence>
      </AppLayout>
    </Router>
    
  );
};
// Add this at the top

// Inside <Routes>



// Main App Component
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SidebarProvider>
          <AppRouter />
        </SidebarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
