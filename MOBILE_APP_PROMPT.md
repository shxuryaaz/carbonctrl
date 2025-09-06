# CarbonCtrl Mobile App - Complete Development Prompt

## Project Overview
Create a comprehensive mobile environmental education app called **CarbonCtrl** that gamifies learning about climate change and environmental conservation. The app should be built using React Native with Expo, featuring a modern UI/UX design with glassmorphism effects, dark/light themes, and enterprise-grade functionality.

## Core Features to Implement

### 🎮 **Gamified Learning System**
- **Interactive Quizzes**: Multiple-choice questions about environmental topics with real-time scoring
- **Mini-Games**: 4 different Phaser.js-based games:
  - Recycling Challenge (sort waste into correct bins)
  - Tree Planting (plant trees and watch forest grow)
  - Energy Saver (turn off lights to save energy)
  - Water Conservation (fix leaks and conserve water)
- **Story Missions**: Comic-style environmental missions with branching narratives
- **AR Missions**: Augmented reality challenges for tree planting and waste segregation

### 🏆 **Rewards & Achievement System**
- **EcoCoins**: Virtual currency earned through activities
- **Badges**: Achievement system with unlockable rewards
- **Leaderboards**: Global and local rankings
- **Level System**: Progressive user advancement
- **Transaction History**: Detailed wallet with earned/spent coins

### 👥 **Role-Based Access Control**
- **Students**: Take quizzes, play games, earn rewards, view leaderboards
- **Teachers**: Approve student actions, view class statistics, manage progress
- **Admins**: Manage schools, create competitions, system analytics

### 🎨 **Design System**
- **Theme**: Dark/Light mode with smooth transitions
- **Colors**: 
  - Primary: Emerald Green (#10b981)
  - Secondary: Slate Gray (#64748b)
  - Accent: Warning (#f59e0b), Error (#ef4444), Info (#3b82f6)
- **Typography**: Inter font family with weights 300-800
- **Effects**: Glassmorphism with blur effects and transparency
- **Animations**: Smooth transitions using Framer Motion or React Native Reanimated

## Technical Requirements

### **Tech Stack**
- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Styling**: Styled Components or NativeWind
- **State Management**: React Context API
- **Backend**: Firebase (Authentication, Firestore, Functions)
- **Games**: Phaser.js integration
- **AR**: Expo AR or AR.js
- **Navigation**: React Navigation v6
- **Animations**: React Native Reanimated 3
- **Icons**: Expo Vector Icons

### **Authentication System**
- Email/Password authentication
- Google Sign-In with popup (not redirect to avoid sessionStorage issues)
- localStorage persistence for mobile browser compatibility
- Role-based access control (Student/Teacher/Admin)
- Protected routes and navigation guards

### **Firebase Configuration**
```typescript
// Required Firebase services:
- Authentication (Email/Password + Google)
- Firestore Database
- Cloud Functions (for AI features)
- Storage (for user uploads)
```

## App Structure & Screens

### **Authentication Screens**
1. **Landing Screen**: Hero section with app features, sign in/sign up buttons
2. **Login Screen**: Email/password + Google sign-in with glassmorphism design
3. **Signup Screen**: Registration form with role selection (Student/Teacher/Admin)

### **Main App Screens**
1. **Dashboard**: Role-based dashboard with personalized content
   - Student: Progress overview, recent activities, AI insights
   - Teacher: Class statistics, pending approvals, student progress
   - Admin: System analytics, user management, content creation

2. **Quizzes Screen**: 
   - List of available quizzes with difficulty levels
   - AI-generated contextual quizzes based on current events
   - Real-time scoring and immediate feedback
   - Progress tracking and completion badges

3. **Mini Games Screen**:
   - Game selection with previews and difficulty indicators
   - Phaser.js integration for interactive gameplay
   - Score tracking and leaderboard integration
   - Achievement unlocks

4. **EcoCoins Wallet**:
   - Current balance display
   - Transaction history (earned/spent/pending)
   - Redemption options for real-world rewards
   - Pending approval system for real-world actions

5. **Leaderboard**:
   - Global and local rankings
   - Filter by time period (daily/weekly/monthly)
   - User profile cards with achievements
   - School/class competitions

6. **Profile Screen**:
   - User information and statistics
   - Achievement showcase
   - Settings (theme, notifications, privacy)
   - Progress tracking and goals

### **Additional Features**
- **Smart Notifications**: AI-powered personalized notifications
- **AR Missions**: Camera-based environmental challenges
- **Story Missions**: Interactive comic-style environmental stories
- **AI Chatbot**: Environmental Q&A assistant
- **Offline Support**: PWA capabilities for offline gameplay

## UI/UX Requirements

### **Design Principles**
- **Mobile-First**: Optimized for mobile devices with responsive design
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Smooth 60fps animations and fast loading
- **Intuitive Navigation**: Bottom tab navigation with clear visual hierarchy

### **Component Library**
Create reusable components:
- Custom buttons with loading states
- Glassmorphism cards and containers
- Animated progress bars and charts
- Interactive game controllers
- Form inputs with validation
- Modal dialogs and alerts
- Loading skeletons and spinners

### **Animation Requirements**
- Page transitions with slide/fade effects
- Micro-interactions on buttons and cards
- Progress animations for achievements
- Particle effects for celebrations
- Smooth theme switching animations

## Data Models

### **User Profile**
```typescript
interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'student' | 'teacher' | 'admin';
  schoolId?: string;
  className?: string;
  ecoScore: number;
  ecoCoins: number;
  level: number;
  badges: string[];
  achievements: Achievement[];
  createdAt: Date;
  lastLoginAt: Date;
}
```

### **Quiz Data**
```typescript
interface Quiz {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Dynamic';
  points: number;
  questions: Question[];
  timeLimit?: number;
  attempts: number;
  bestScore: number;
}
```

### **Game Data**
```typescript
interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: string;
  points: number;
  highScore: number;
  timesPlayed: number;
  unlocked: boolean;
}
```

## Implementation Guidelines

### **Phase 1: Foundation**
1. Set up React Native Expo project with TypeScript
2. Configure Firebase authentication and Firestore
3. Implement basic navigation structure
4. Create design system and component library
5. Build authentication screens with Google sign-in

### **Phase 2: Core Features**
1. Implement role-based dashboard
2. Build quiz system with AI integration
3. Create mini-games with Phaser.js
4. Develop EcoCoins wallet and transaction system
5. Add leaderboard functionality

### **Phase 3: Advanced Features**
1. Integrate AR missions
2. Build story mission system
3. Implement AI chatbot
4. Add smart notifications
5. Create admin/teacher management tools

### **Phase 4: Polish & Optimization**
1. Add comprehensive animations
2. Implement offline support
3. Optimize performance and loading times
4. Add accessibility features
5. Comprehensive testing and bug fixes

## Key Implementation Notes

### **Firebase Authentication Fix**
- Use `signInWithPopup` instead of `signInWithRedirect`
- Implement `browserLocalPersistence` to avoid sessionStorage issues
- Handle mobile browser compatibility for in-app browsers

### **Game Integration**
- Use Phaser.js for interactive mini-games
- Implement proper game state management
- Add score tracking and achievement integration
- Ensure smooth performance on mobile devices

### **AI Features**
- Integrate OpenAI API for contextual quiz generation
- Implement personalized insights and recommendations
- Add smart notification system based on user behavior
- Create environmental data analysis features

### **Performance Optimization**
- Implement lazy loading for screens and components
- Use React.memo and useMemo for expensive operations
- Optimize images and assets for mobile
- Implement proper error boundaries and loading states

## Success Criteria
- Smooth 60fps performance on mid-range devices
- Intuitive navigation with <3 taps to any feature
- Engaging gamification that increases user retention
- Comprehensive role-based functionality
- Beautiful, modern UI with glassmorphism design
- Robust offline capabilities
- Seamless Firebase integration with proper error handling

## Deliverables
1. Complete React Native Expo app with all features
2. Firebase backend configuration and security rules
3. Comprehensive documentation and setup instructions
4. APK build scripts for Android deployment
5. App store optimization materials (screenshots, descriptions)

This app should be a comprehensive, production-ready environmental education platform that combines gamification, real-world impact, and modern mobile app development best practices.
