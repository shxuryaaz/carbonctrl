import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

export type UserRole = 'student' | 'teacher' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  schoolId?: string;
  className?: string;
  ecoScore: number;
  ecoCoins: number;
  level: number;
  badges: string[];
  createdAt: Date;
  lastLoginAt: Date;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string, role: UserRole) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from Firestore
  const fetchUserProfile = async (user: User): Promise<UserProfile | null> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        return {
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          lastLoginAt: data.lastLoginAt?.toDate() || new Date(),
        } as UserProfile;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // Return a mock profile for development when Firebase fails
      return {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || 'Demo User',
        photoURL: user.photoURL || undefined,
        role: 'student',
        ecoScore: 100,
        ecoCoins: 50,
        level: 1,
        badges: ['first-login'],
        createdAt: new Date(),
        lastLoginAt: new Date(),
      };
    }
  };

  // Create user profile in Firestore
  const createUserProfile = async (user: User, role: UserRole, displayName?: string): Promise<UserProfile> => {
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email || '',
      displayName: displayName || user.displayName || 'Anonymous',
      photoURL: user.photoURL || undefined,
      role,
      ecoScore: 0,
      ecoCoins: 0,
      level: 1,
      badges: [],
      createdAt: new Date(),
      lastLoginAt: new Date(),
    };

    await setDoc(doc(db, 'users', user.uid), {
      ...userProfile,
      createdAt: userProfile.createdAt,
      lastLoginAt: userProfile.lastLoginAt,
    });

    return userProfile;
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update last login time
      await setDoc(doc(db, 'users', user.uid), {
        lastLoginAt: new Date(),
      }, { merge: true });
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, displayName: string, role: UserRole): Promise<void> => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update display name
      await updateProfile(user, { displayName });

      // Create user profile
      await createUserProfile(user, role, displayName);
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Google
  const signInWithGoogle = async (): Promise<void> => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user profile exists
      let profile = await fetchUserProfile(user);
      
      if (!profile) {
        // Create new profile with student role by default
        profile = await createUserProfile(user, 'student');
      } else {
        // Update last login time
        await setDoc(doc(db, 'users', user.uid), {
          lastLoginAt: new Date(),
        }, { merge: true });
      }
    } catch (error: any) {
      console.error('Google sign in error:', error);
      
      // For development, create a mock user when Firebase fails
      if (error.code === 'auth/invalid-api-key' || error.message?.includes('invalid-api-key')) {
        console.log('🔄 Using mock authentication for development');
        const mockUser = {
          uid: 'demo-user-123',
          email: 'demo@example.com',
          displayName: 'Demo User',
          photoURL: null,
        } as User;
        
        const mockProfile = {
          uid: mockUser.uid,
          email: mockUser.email || '',
          displayName: mockUser.displayName || 'Demo User',
          photoURL: mockUser.photoURL || undefined,
          role: 'student' as UserRole,
          ecoScore: 100,
          ecoCoins: 50,
          level: 1,
          badges: ['first-login'],
          createdAt: new Date(),
          lastLoginAt: new Date(),
        };
        
        setUser(mockUser);
        setUserProfile(mockProfile);
        return;
      }
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      await signOut(auth);
      setUserProfile(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async (updates: Partial<UserProfile>): Promise<void> => {
    if (!user) throw new Error('No user logged in');

    try {
      await setDoc(doc(db, 'users', user.uid), updates, { merge: true });
      
      // Update local state
      setUserProfile(prev => prev ? { ...prev, ...updates } : null);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        const profile = await fetchUserProfile(user);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    logout,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
