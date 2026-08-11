import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  projectId: "resounding-clarity-nj1d7",
  appId: "1:371143298038:web:4e0f52d43b75cd8e6fd5d7",
  apiKey: "AIzaSyD3lApz9W8uqa7h6Gl56LYsCt3nGpGPqtE",
  authDomain: "resounding-clarity-nj1d7.firebaseapp.com",
  storageBucket: "resounding-clarity-nj1d7.firebasestorage.app",
  messagingSenderId: "371143298038",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, "ai-studio-afaa19d0-d6fd-427e-b619-313956435f34");
export const storage = getStorage(app);

export const googleProvider = new GoogleAuthProvider();
