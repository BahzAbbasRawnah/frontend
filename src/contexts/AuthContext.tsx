'use client';

import type { ReactNode, FC } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
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

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname(); //  e.g. /en/dashboard
  const { toast } = useToast();

  const getCurrentLocaleFromPathname = (): Locale => {
    const segments = pathname.split('/');
    if (segments.length > 1 && i18n.locales.includes(segments[1] as Locale)) {
      return segments[1] as Locale;
    }
    return i18n.defaultLocale;
  };
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = async (currentLang: Locale) => {
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


  if (loading && typeof window !== 'undefined' && !auth.currentUser) { 
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

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