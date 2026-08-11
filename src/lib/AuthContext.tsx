import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from './firebase';

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  photoURL: string;
  bio: string;
  status: string;
  mood: string;
  frame: string;
  entrance: string;
  isPremium: boolean;
  premiumExpiresAt: any;
  createdAt: any;
  lastSeen: any;
  isOnline: boolean;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfileData: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
  updateProfileData: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (!userDoc.exists()) {
            const isTargetUser = firebaseUser.email === '1998basm1998@gmail.com';
            const newProfile: UserProfile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: firebaseUser.displayName || 'مستخدم جديد',
              photoURL: firebaseUser.photoURL || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
              bio: 'مرحباً! أنا أستخدم التطبيق الجديد.',
              status: 'متاح',
              mood: '😊',
              frame: 'none',
              entrance: 'fade',
              isPremium: isTargetUser,
              premiumExpiresAt: isTargetUser ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) : null,
              createdAt: serverTimestamp(),
              lastSeen: serverTimestamp(),
              isOnline: true
            };
            await setDoc(userDocRef, newProfile);
            setProfile(newProfile as UserProfile);
          } else {
            const isTargetUser = firebaseUser.email === '1998basm1998@gmail.com';
            await updateDoc(userDocRef, {
              lastSeen: serverTimestamp(),
              isOnline: true,
              ...(isTargetUser ? { isPremium: true, premiumExpiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) } : {})
            });
          }

          // Listen for profile changes
          const unsubProfile = onSnapshot(userDocRef, (docSnap) => {
            if (docSnap.exists()) {
              setProfile(docSnap.data() as UserProfile);
            }
          });
          
          // Presence handling on disconnect (basic implementation)
          const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
              updateDoc(userDocRef, { isOnline: false, lastSeen: serverTimestamp() }).catch(()=>{});
            } else {
              updateDoc(userDocRef, { isOnline: true, lastSeen: serverTimestamp() }).catch(()=>{});
            }
          };
          document.addEventListener('visibilitychange', handleVisibilityChange);
          
          setLoading(false);
          return () => {
            unsubProfile();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
          };
        } catch (error) {
          console.error("Error setting up user profile:", error);
          setLoading(false);
        }
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    if (user) {
      await updateDoc(doc(db, 'users', user.uid), {
        isOnline: false,
        lastSeen: serverTimestamp()
      }).catch(()=>{});
    }
    await signOut(auth);
  };

  const updateProfileData = async (data: Partial<UserProfile>) => {
    if (!user) return;
    const userDocRef = doc(db, 'users', user.uid);
    // Remove premium overrides from being set by client directly if any
    const safeData = { ...data };
    delete safeData.isPremium;
    delete safeData.premiumExpiresAt;
    delete safeData.uid;
    delete safeData.createdAt;
    
    await updateDoc(userDocRef, safeData);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, login, logout, updateProfileData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
