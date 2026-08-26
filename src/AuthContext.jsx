import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  googleProvider, 
  isFirebaseConfigured,
  syncUserProfileToCloud,
  fetchUserProfileFromCloud
} from '../services/firebase';
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const cached = localStorage.getItem('postflow_auth_user');
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth || !isFirebaseConfigured()) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const cloudData = await fetchUserProfileFromCloud(user.uid);
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email.split('@')[0],
          photoURL: user.photoURL || null,
          planType: cloudData?.planType || 'free',
          cloudSynced: true
        };
        setCurrentUser(userData);
        localStorage.setItem('postflow_auth_user', JSON.stringify(userData));
      } else {
        setCurrentUser(null);
        localStorage.removeItem('postflow_auth_user');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const loginWithGoogle = async () => {
    if (!isFirebaseConfigured()) {
      const mockUser = {
        uid: 'user_google_' + Date.now(),
        email: 'criador.postflow@gmail.com',
        displayName: 'Criador PostFlow',
        photoURL: null,
        planType: localStorage.getItem('postflow_plan_type') || 'free',
        cloudSynced: true
      };
      setCurrentUser(mockUser);
      localStorage.setItem('postflow_auth_user', JSON.stringify(mockUser));
      return mockUser;
    }

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const cloudData = await fetchUserProfileFromCloud(user.uid);
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split('@')[0],
        photoURL: user.photoURL || null,
        planType: cloudData?.planType || 'free',
        cloudSynced: true
      };
      setCurrentUser(userData);
      localStorage.setItem('postflow_auth_user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error("Erro no login com Google:", error);
      throw error;
    }
  };

  const loginWithEmail = async (email, password) => {
    if (!isFirebaseConfigured()) {
      const mockUser = {
        uid: 'user_email_' + btoa(email).substring(0, 10),
        email: email,
        displayName: email.split('@')[0],
        photoURL: null,
        planType: localStorage.getItem('postflow_plan_type') || 'free',
        cloudSynced: true
      };
      setCurrentUser(mockUser);
      localStorage.setItem('postflow_auth_user', JSON.stringify(mockUser));
      return mockUser;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      const cloudData = await fetchUserProfileFromCloud(user.uid);
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split('@')[0],
        photoURL: user.photoURL || null,
        planType: cloudData?.planType || 'free',
        cloudSynced: true
      };
      setCurrentUser(userData);
      localStorage.setItem('postflow_auth_user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error("Erro no login com email:", error);
      throw error;
    }
  };

  const signupWithEmail = async (email, password, displayName) => {
    if (!isFirebaseConfigured()) {
      const mockUser = {
        uid: 'user_email_' + btoa(email).substring(0, 10),
        email: email,
        displayName: displayName || email.split('@')[0],
        photoURL: null,
        planType: 'free',
        cloudSynced: true
      };
      setCurrentUser(mockUser);
      localStorage.setItem('postflow_auth_user', JSON.stringify(mockUser));
      return mockUser;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
      if (displayName) {
        await updateProfile(user, { displayName });
      }
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: displayName || user.email.split('@')[0],
        photoURL: null,
        planType: 'free',
        cloudSynced: true
      };
      setCurrentUser(userData);
      localStorage.setItem('postflow_auth_user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error("Erro no cadastro:", error);
      throw error;
    }
  };

  const logout = async () => {
    if (auth && isFirebaseConfigured()) {
      await signOut(auth);
    }
    setCurrentUser(null);
    localStorage.removeItem('postflow_auth_user');
  };

  const updateUserPlan = async (newPlanType) => {
    if (currentUser) {
      const updated = { ...currentUser, planType: newPlanType };
      setCurrentUser(updated);
      localStorage.setItem('postflow_auth_user', JSON.stringify(updated));
      await syncUserProfileToCloud(currentUser.uid, { planType: newPlanType });
    }
  };

  const value = {
    currentUser,
    loginWithGoogle,
    loginWithEmail,
    signupWithEmail,
    logout,
    updateUserPlan,
    isFirebaseLive: isFirebaseConfigured()
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
