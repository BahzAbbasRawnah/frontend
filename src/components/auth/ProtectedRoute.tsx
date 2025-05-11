'use client';

import type { ReactNode, FC } from 'react';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import type { Locale } from '@/i18n-config';

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
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-14rem)] bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;