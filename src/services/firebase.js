import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyPostFlowDefaultKeyDemo2026",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "postflow-app.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "postflow-app",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "postflow-app.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1029384756",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1029384756:web:abcd1234ef5678"
};

export const isFirebaseConfigured = () => {
  return (
    import.meta.env.VITE_FIREBASE_API_KEY &&
    !import.meta.env.VITE_FIREBASE_API_KEY.includes("DefaultKeyDemo")
  );
};

let app;
let auth;
let db;
let googleProvider;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });
} catch (err) {
  console.warn("Firebase initialization in fallback mode:", err);
}

export { auth, db, googleProvider };

export const syncUserProfileToCloud = async (userId, data) => {
  if (!db || !isFirebaseConfigured()) {
    localStorage.setItem(`postflow_cloud_sync_${userId}`, JSON.stringify(data));
    return;
  }

  try {
    const userDocRef = doc(db, 'users', userId);
    await setDoc(userDocRef, {
      ...data,
      lastSyncedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error("Erro ao sincronizar com Firestore:", error);
  }
};

export const fetchUserProfileFromCloud = async (userId) => {
  if (!db || !isFirebaseConfigured()) {
    const cached = localStorage.getItem(`postflow_cloud_sync_${userId}`);
    return cached ? JSON.parse(cached) : null;
  }

  try {
    const userDocRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error("Erro ao buscar dados do Firestore:", error);
    return null;
  }
};
