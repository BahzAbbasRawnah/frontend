'use client';

import type { ReactNode, FC } from 'react';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if loading is false and there's no user.
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // While loading, or if there's no user (and redirection hasn't happened yet), show loader.
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-14rem)] bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // If user is authenticated, render the children.
  return <>{children}</>;
};

export default ProtectedRoute;
