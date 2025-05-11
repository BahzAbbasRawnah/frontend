
'use client';

import type { ReactNode, FC } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import type { User, UserMetadata, IdTokenResult } from 'firebase/auth';
import { onAuthStateChanged, signOut as firebaseSignOut, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation'; // usePathname to get current locale
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Locale } from '@/i18n-config';
import { i18n } from '@/i18n-config';


interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: (currentLang: Locale) => Promise<void>;
  signInWithGoogle: (currentLang: Locale) => Promise<void>;
  signInWithGitHub: (currentLang: Locale) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Retrieve Firebase config from environment variables
const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    };

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const getCurrentLocaleFromPathname = (): Locale => {
    const segments = pathname.split('/');
    if (segments.length > 1 && i18n.locales.includes(segments[1] as Locale)) {
      return segments[1] as Locale;
    }
    return i18n.defaultLocale;
  };

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    try {
      unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (process.env.NEXT_PUBLIC_TEST_MODE === 'true' && !currentUser) {
          console.warn("TEST MODE ACTIVE: Simulating admin user login.");
          const mockUser: User = {
            uid: 'test-admin-uid',
            email: 'admin@gmail.com',
            displayName: 'Admin (Test Mode)',
            photoURL: null,
            phoneNumber: null, // Added missing property
            emailVerified: true,
            isAnonymous: false,
            metadata: {
              creationTime: new Date().toISOString(),
              lastSignInTime: new Date().toISOString(),
            } as UserMetadata,
            providerData: [],
            providerId: 'test-mode',
            refreshToken: 'mock-refresh-token',
            tenantId: null,
            delete: async () => { console.log('Mock user delete called'); },
            getIdToken: async (_forceRefresh?: boolean) => 'mock-id-token',
            getIdTokenResult: async (_forceRefresh?: boolean) => ({
              token: 'mock-id-token',
              expirationTime: new Date(Date.now() + 3600 * 1000).toISOString(),
              authTime: new Date().toISOString(),
              issuedAtTime: new Date().toISOString(),
              signInProvider: null,
              signInSecondFactor: null,
              claims: { app_role: 'admin' }, // Example custom claim
            } as IdTokenResult),
            reload: async () => { console.log('Mock user reload called'); },
            toJSON: () => ({ uid: 'test-admin-uid', email: 'admin@gmail.com', displayName: 'Admin (Test Mode)' }),
          };
          setUser(mockUser);
        } else {
          setUser(currentUser);
        }
        setLoading(false);
      });
    } catch (error) {
      console.error('Firebase auth initialization or onAuthStateChanged error:', error);
      // If Firebase auth fails, just set loading to false and continue without auth
      // but first check if test mode should activate a mock user
      if (process.env.NEXT_PUBLIC_TEST_MODE === 'true') {
          console.warn("TEST MODE ACTIVE (Firebase init failed): Simulating admin user login.");
          const mockUser: User = { // Define mock user again for this specific catch path
            uid: 'test-admin-uid-fallback',
            email: 'admin@gmail.com',
            displayName: 'Admin (Test Mode - FB Fail)',
            photoURL: null,
            phoneNumber: null, // Added missing property
            emailVerified: true,
            isAnonymous: false,
            metadata: { creationTime: new Date().toISOString(), lastSignInTime: new Date().toISOString() } as UserMetadata,
            providerData: [],
            providerId: 'test-mode-fallback',
            refreshToken: 'mock-refresh-token-fallback',
            tenantId: null,
            delete: async () => { console.log('Mock user delete called (FB Fail)'); },
            getIdToken: async (_forceRefresh?: boolean) => 'mock-id-token-fallback',
            getIdTokenResult: async (_forceRefresh?: boolean) => ({
              token: 'mock-id-token-fallback',
              expirationTime: new Date(Date.now() + 3600 * 1000).toISOString(),
              authTime: new Date().toISOString(),
              issuedAtTime: new Date().toISOString(),
              signInProvider: null,
              signInSecondFactor: null,
              claims: { app_role: 'admin' },
            } as IdTokenResult),
            reload: async () => { console.log('Mock user reload called (FB Fail)'); },
            toJSON: () => ({ uid: 'test-admin-uid-fallback', email: 'admin@gmail.com', displayName: 'Admin (Test Mode - FB Fail)' }),
          };
          setUser(mockUser);
      } else {
        setUser(null); // Ensure user is null if not in test mode and Firebase fails
      }
      setLoading(false);
      if (firebaseConfig.apiKey === "placeholder-api-key") { // Only show toast if placeholder config is used
        toast({
          title: 'Firebase Configuration Error',
          description: 'Please set up your Firebase credentials in .env.local file to use actual authentication. Test mode can be enabled with NEXT_PUBLIC_TEST_MODE=true for design testing.',
          variant: 'destructive',
          duration: 10000
        });
      }
    }
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [toast]); // pathname removed as getCurrentLocaleFromPathname is not used in useEffect directly

  const logout = async (currentLang: Locale) => {
    if (process.env.NEXT_PUBLIC_TEST_MODE === 'true' && user?.providerId.includes('test-mode')) {
      console.warn("TEST MODE ACTIVE: Simulating logout.");
      setUser(null);
      toast({ title: 'Logged Out (Test Mode)', description: 'You have been successfully logged out.'});
      router.push(`/${currentLang}/login`);
      return;
    }
    try {
      await firebaseSignOut(auth);
      setUser(null);
      toast({ title: 'Logged Out', description: 'You have been successfully logged out.'});
      router.push(`/${currentLang}/login`);
    } catch (error) {
      console.error('Error signing out:', error);
      toast({ title: 'Logout Failed', description: (error as Error).message, variant: 'destructive' });
    }
  };

  const signInWithProvider = async (provider: GoogleAuthProvider | GithubAuthProvider, currentLang: Locale, providerName: string) => {
    if (process.env.NEXT_PUBLIC_TEST_MODE === 'true') {
       console.warn(`TEST MODE ACTIVE: Simulating ${providerName} sign-in. Actual sign-in skipped.`);
       // The useEffect with onAuthStateChanged will handle setting the mock user if no real user is found.
       // We can trigger a state change to ensure loading completes and protected routes are checked again.
       setLoading(true);
       setTimeout(() => setLoading(false), 100); // Simulate async operation
       toast({ title: `Signed in with ${providerName} (Test Mode - Skipped)` });
       // Let ProtectedRoute handle redirection based on the mock user potentially set by onAuthStateChanged
       return;
    }
    try {
      await signInWithPopup(auth, provider);
      toast({ title: `Signed in with ${providerName} successfully!` });
      // router.push(`/${currentLang}/dashboard`); // Let ProtectedRoute or page effect handle redirection
    } catch (error: any) {
      console.error(`${providerName} Sign-in error:`, error);
      if (error.code === 'auth/account-exists-with-different-credential') {
        toast({ title: 'Sign-in Failed', description: 'An account already exists with this email. Try signing in with the original method.', variant: 'destructive', duration: 7000 });
      } else {
        toast({ title: `${providerName} Sign-in Failed`, description: error.message, variant: 'destructive' });
      }
    }
  };

  const signInWithGoogle = async (currentLang: Locale) => {
    await signInWithProvider(new GoogleAuthProvider(), currentLang, 'Google');
  };

  const signInWithGitHub = async (currentLang: Locale) => {
    await signInWithProvider(new GithubAuthProvider(), currentLang, 'GitHub');
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, signInWithGoogle, signInWithGitHub }}>
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

