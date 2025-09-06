import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getFunctions, Functions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyBvQ8K9X2Y3Z4A5B6C7D8E9F0G1H2I3J4K",
  authDomain: "carbonctrl-app.firebaseapp.com",
  projectId: "carbonctrl-app",
  storageBucket: "carbonctrl-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:android:abcdef1234567890abcdef"
};

// Initialize Firebase with error handling
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let functions: Functions;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  functions = getFunctions(app);
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
  
  // Fallback configuration for development
  const fallbackConfig = {
    apiKey: "demo-api-key",
    authDomain: "demo-project.firebaseapp.com",
    projectId: "demo-project",
    storageBucket: "demo-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:demo"
  };
  
  console.log('🔄 Using fallback Firebase configuration for development');
  app = initializeApp(fallbackConfig, 'fallback');
  auth = getAuth(app);
  db = getFirestore(app);
  functions = getFunctions(app);
}

export { auth, db, functions };
export default app;
