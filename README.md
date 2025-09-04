# CarbonCtrl 🌍

A comprehensive React + Firebase + Phaser.js edtech platform for environmental education with enterprise-grade UI/UX.

## Features

- **🎮 Gamified Learning**: Interactive quizzes, mini-games, and story missions
- **🏆 Rewards System**: EcoCoins, badges, and leaderboards
- **👥 Role-based Access**: Students, Teachers, and Admins
- **🌙 Dark/Light Theme**: Enterprise-grade theming with glassmorphism
- **📱 PWA Support**: Offline capabilities and mobile optimization
- **🌐 Multilingual**: English, Hindi, and more
- **📱 AR Missions**: Augmented reality for tree planting and waste segregation

## Tech Stack

- **Frontend**: React 18, TypeScript, SCSS, Framer Motion
- **Backend**: Firebase (Auth, Firestore, Functions)
- **Games**: Phaser.js
- **AR**: AR.js
- **Deployment**: Vercel (Frontend), Firebase (Backend)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Top navigation
│   ├── Sidebar.tsx     # Side navigation
│   ├── ThemeToggle.tsx # Dark/light mode toggle
│   └── ProtectedRoute.tsx
├── pages/              # Page components
│   ├── Login.tsx       # Authentication
│   ├── Signup.tsx      # User registration
│   ├── Dashboard.tsx   # Role-based dashboard
│   ├── Quizzes.tsx     # Interactive quizzes
│   ├── MiniGames.tsx   # Phaser.js games
│   ├── StoryMissions.tsx # Comic-style missions
│   ├── Leaderboard.tsx # Rankings
│   ├── EcoCoins.tsx    # Wallet UI
│   └── ARMissions.tsx  # AR challenges
├── context/            # React contexts
│   ├── AuthContext.tsx # Authentication state
│   └── ThemeContext.tsx # Theme management
├── styles/             # SCSS styles
│   ├── _variables.scss # Design tokens
│   ├── _mixins.scss    # Reusable mixins
│   └── global.scss     # Global styles
├── games/              # Phaser.js game files
├── utils/              # Utility functions
└── firebase/           # Firebase configuration
    └── config.ts
```

## Setup Instructions

### 1. Clone and Install

```bash
git clone <repository-url>
cd carbonctrl
npm install
```

### 2. Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication (Email/Password and Google)
3. Create a Firestore database
4. Copy the `.env.example` file to `.env` and fill in your Firebase project details:

```bash
cp .env.example .env
```

Then edit `.env` with your actual Firebase config:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 3. Run Development Server

```bash
npm start
```

The app will be available at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

## Design System

### Color Palette
- **Primary**: Emerald Green (#10b981)
- **Secondary**: Slate Gray (#64748b)
- **Accent**: Warning (#f59e0b), Error (#ef4444), Info (#3b82f6)

### Typography
- **Primary Font**: Inter
- **Secondary Font**: IBM Plex Sans
- **Weights**: 300, 400, 500, 600, 700, 800

### Components
- **Glassmorphism**: Blur effects with transparency
- **Animations**: Framer Motion for smooth transitions
- **Responsive**: Mobile-first design with breakpoints

## User Roles

### Student
- Take quizzes and play games
- Complete story missions
- Earn EcoCoins and badges
- View leaderboards

### Teacher
- Approve student eco actions
- View class statistics
- Manage student progress
- Create assignments

### Admin
- Manage schools and users
- Create competitions
- System-wide analytics
- Content management

## Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Firebase)
1. Deploy Firestore security rules
2. Deploy Firebase Functions
3. Configure hosting if needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support, email support@carbonctrl.com or create an issue on GitHub.