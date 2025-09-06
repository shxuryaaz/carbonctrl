# CarbonCtrl - Complete App Recreation Prompt for Lovable

## Project Overview
Create a comprehensive React + Firebase + Phaser.js edtech platform called **CarbonCtrl** - an enterprise-grade environmental education SaaS platform with Duolingo-level polished UI/UX.

## Core Concept
CarbonCtrl is a gamified environmental education platform that combines interactive learning, real-world impact tracking, and community engagement. Think Duolingo meets environmental activism with enterprise-grade design.

## Tech Stack Requirements
- **Frontend**: React 18, TypeScript, SCSS, Framer Motion
- **Backend**: Firebase (Authentication, Firestore, Functions)
- **Games**: Phaser.js integration
- **AR**: AR.js for augmented reality missions
- **AI**: OpenAI integration for chatbot helper
- **Deployment**: Vercel (frontend), Firebase (backend)
- **Styling**: SCSS with variables, mixins, responsive design
- **Animations**: Framer Motion for page transitions and micro-interactions

## Design System
### Color Palette
```scss
// Primary Colors - Darker for better readability
--primary-emerald: #047857;
--primary-emerald-light: #059669;
--primary-emerald-dark: #065f46;
--primary-emerald-darker: #064e3b;

// Slate Colors
--slate-50: #f8fafc;
--slate-100: #f1f5f9;
--slate-200: #e2e8f0;
--slate-300: #cbd5e1;
--slate-400: #94a3b8;
--slate-500: #64748b;
--slate-600: #475569;
--slate-700: #334155;
--slate-800: #1e293b;
--slate-900: #0f172a;

// Status Colors
--success: #047857;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;
```

### Typography
- **Primary Font**: Inter
- **Secondary Font**: IBM Plex Sans
- **Weights**: 300, 400, 500, 600, 700, 800

### UI Principles
- **Glassmorphism**: Blur effects with transparency
- **Dark/Light Theme**: Complete theme switching
- **Responsive**: Mobile-first design
- **Enterprise-grade**: Professional, polished appearance
- **Animations**: Smooth Framer Motion transitions

## Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Top navigation with logo "CarbonCtrl 🌍"
│   ├── Sidebar.tsx     # Collapsible side navigation
│   ├── AppLayout.tsx   # Layout wrapper (conditional navbar/sidebar)
│   ├── ThemeToggle.tsx # Dark/light mode toggle
│   ├── ProtectedRoute.tsx # Route protection
│   ├── Quiz.tsx        # Interactive quiz component
│   └── AIChatbot.tsx   # AI helper chatbot
├── pages/              # Page components
│   ├── Landing.tsx     # Professional landing page
│   ├── Login.tsx       # Split-screen login with animations
│   ├── Signup.tsx      # Role selection (Student/Teacher/Admin)
│   ├── Dashboard.tsx   # Role-based dashboard
│   ├── Quizzes.tsx     # Interactive quizzes with leaderboard
│   ├── MiniGames.tsx   # Phaser.js embedded games
│   ├── StoryMissions.tsx # Comic-style missions
│   ├── Leaderboard.tsx # Global/class rankings
│   ├── EcoCoins.tsx    # Wallet-like UI with transaction history
│   └── ARMissions.tsx  # AR challenges (placeholder)
├── context/            # React contexts
│   ├── AuthContext.tsx # Authentication state management
│   └── ThemeContext.tsx # Theme management
├── styles/             # SCSS styles
│   ├── _variables.scss # Design tokens
│   ├── _mixins.scss    # Reusable mixins
│   └── global.scss     # Global styles
├── games/              # Phaser.js game files
│   └── RecyclingGame.ts # Recycling challenge game
├── services/           # API services
│   └── openai.ts       # OpenAI integration
└── firebase/           # Firebase configuration
    └── config.ts
```

## Key Features to Implement

### 1. Landing Page
- **Hero Section**: "Join the mission to save our planet through gamified learning"
- **Features Grid**: 6 feature cards with icons and descriptions
- **CTA Section**: "Ready to Make a Difference?" with signup/login buttons
- **Professional Design**: Enterprise-grade appearance, no green backgrounds in CTA
- **Animations**: Framer Motion page transitions

### 2. Authentication System
- **Login Page**: Split-screen design with animated earth icon and form
- **Signup Page**: Role selection (Student/Teacher/Admin) with modern card UI
- **Firebase Integration**: Email/password and Google authentication
- **Mock Fallback**: Demo mode when Firebase keys are invalid

### 3. Dashboard (Role-based)
- **Student View**: Eco Score, Eco Coins, Badges, Recent Activity
- **Teacher View**: Class statistics, student progress, approval system
- **Admin View**: System analytics, user management, content creation
- **Welcome Message**: "Welcome back, [Name]!" with eco-journey prompt

### 4. Gamified Learning
- **Quizzes**: Timed quizzes with instant feedback and leaderboards
- **Mini Games**: Phaser.js embedded games (Recycling Challenge)
- **Story Missions**: Comic-style missions with progress tracking
- **Rewards**: EcoCoins, badges, achievement system

### 5. Navigation System
- **Navbar**: Fixed top navigation with logo, nav links, user profile
- **Sidebar**: Collapsible side navigation for authenticated users
- **AppLayout**: Conditional rendering (no navbar/sidebar on public pages)
- **Responsive**: Mobile-optimized navigation

### 6. AI Integration
- **Chatbot Helper**: OpenAI-powered assistant for environmental education
- **Smart Features**: Quiz generation, content recommendations
- **Context-aware**: Understands user progress and provides relevant help

### 7. Theme System
- **Dark/Light Mode**: Complete theme switching
- **Glassmorphism**: Blur effects and transparency
- **Consistent Colors**: Darker emerald green for better readability
- **Smooth Transitions**: Theme switching animations

## Specific UI Requirements

### Navbar Design
- **Height**: 70px
- **Logo**: Green gradient icon with "CarbonCtrl" text
- **Navigation**: Dashboard, Quizzes, Games, Missions, Leaderboard, EcoCoins
- **User Section**: Profile photo, name, role, logout button
- **Alignment**: Perfect vertical alignment of all elements
- **Responsive**: Mobile-friendly with proper breakpoints

### Form Design
- **Login/Signup**: Left-aligned forms with proper spacing
- **Input Fields**: Modern styling with focus states
- **Buttons**: Primary and outline variants
- **Validation**: Real-time form validation
- **Animations**: Smooth transitions and micro-interactions

### Card Components
- **Glassmorphism**: Blur effects with transparency
- **Hover Effects**: Subtle animations on hover
- **Consistent Spacing**: Proper padding and margins
- **Responsive**: Mobile-optimized layouts

## Firebase Configuration
```typescript
// Environment variables needed
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_OPENAI_API_KEY=your_openai_key
```

## User Roles & Permissions

### Student
- Take quizzes and play games
- Complete story missions
- Earn EcoCoins and badges
- View leaderboards
- Access AI chatbot helper

### Teacher
- Approve student eco actions
- View class statistics
- Manage student progress
- Create assignments
- Access teacher dashboard

### Admin
- Manage schools and users
- Create competitions
- System-wide analytics
- Content management
- Full platform access

## Game Integration
- **Phaser.js**: Embedded mini-games
- **Recycling Challenge**: Drag-and-drop waste sorting game
- **Physics**: Realistic game physics
- **Scoring**: Points and achievement system
- **Responsive**: Mobile-friendly game controls

## Deployment Requirements
- **Frontend**: Vercel deployment
- **Backend**: Firebase hosting
- **Environment**: Production-ready configuration
- **PWA**: Progressive Web App capabilities
- **Performance**: Optimized bundle sizes

## Quality Standards
- **Enterprise-grade**: Professional, polished appearance
- **Accessibility**: WCAG compliant
- **Performance**: Fast loading times
- **Responsive**: Works on all devices
- **TypeScript**: Full type safety
- **Error Handling**: Graceful error states
- **Loading States**: Proper loading indicators

## Success Criteria
1. **Visual Fidelity**: Matches the described design exactly
2. **Functionality**: All features work as specified
3. **Performance**: Fast, smooth user experience
4. **Responsiveness**: Works perfectly on mobile and desktop
5. **Code Quality**: Clean, maintainable TypeScript code
6. **Firebase Integration**: Proper authentication and data handling
7. **Theme System**: Seamless dark/light mode switching
8. **Animations**: Smooth Framer Motion transitions throughout

## Additional Notes
- Use the exact color palette provided
- Implement proper error handling and loading states
- Ensure all forms are properly validated
- Make sure the navbar alignment is perfect
- Remove any unwanted green backgrounds from landing page
- Implement proper responsive breakpoints
- Use SCSS variables and mixins for consistency
- Add proper TypeScript types throughout
- Implement proper Firebase security rules
- Add proper SEO meta tags
- Ensure accessibility compliance

This should be a production-ready, enterprise-grade application that looks and feels like it was built by a professional product team, not a hackathon prototype.
