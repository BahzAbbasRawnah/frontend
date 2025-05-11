'use client';

import type { ReactNode, FC } from 'react';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import type { Locale } from '@/i18n-config';
import LoadingScreen from '@/components/ui/LoadingScreen';

interface ProtectedRouteProps {
  children: ReactNode;
  lang: Locale; // Add lang prop
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, lang }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/${lang}/login`); // Use lang for redirect
    }
  }, [user, loading, router, lang]);

  if (loading || !user) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;