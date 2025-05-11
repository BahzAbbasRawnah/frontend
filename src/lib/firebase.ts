import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore'; // Uncomment if you need Firestore
// import { getStorage } from 'firebase/storage'; // Uncomment if you need Firebase Storage

// Check if Firebase environment variables are set
const hasFirebaseConfig =
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

// Use a placeholder config if environment variables are not set
const firebaseConfig = hasFirebaseConfig
  ? {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // Optional
    }
  : {
      // This is a placeholder config that will cause Firebase to throw an error
      // which we'll catch in the AuthContext
      apiKey: "placeholder-api-key",
      authDomain: "placeholder-project-id.firebaseapp.com",
      projectId: "placeholder-project-id",
    };

// Create dummy objects for server-side rendering
const dummyApp = {} as any;
const dummyAuth = {
  currentUser: null,
  onAuthStateChanged: () => () => {},
} as any;

// Initialize Firebase only on the client side
let app = dummyApp;
let auth = dummyAuth;

// Only initialize Firebase on the client side to avoid hydration mismatches
if (typeof window !== 'undefined') {
  try {
    // Initialize Firebase
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    // const db = getFirestore(app); // Initialize Firestore if needed
    // const storage = getStorage(app); // Initialize Storage if needed
  } catch (error) {
    console.error("Firebase initialization error:", error);
    // Keep using the dummy objects if initialization fails
    app = dummyApp;
    auth = dummyAuth;
  }
}

export { app, auth /*, db, storage */ };
