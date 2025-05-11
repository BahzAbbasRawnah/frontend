'use client';

import SignupForm from '@/components/auth/SignupForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, Loader2 } from 'lucide-react';
import GoogleIcon from '@/components/icons/GoogleIcon';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/getDictionary';
import type { Dictionary } from '@/lib/getDictionary';

export default function SignupPage({ params: { lang } }: { params: { lang: Locale } }) {
  const { user, loading: authLoading, signInWithGoogle, signInWithGitHub } = useAuth();
  const router = useRouter();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGitHubLoading, setIsGitHubLoading] = useState(false);
  const [dictionary, setDictionary] = useState<Dictionary | null>(null);

  useEffect(() => {
    async function fetchDictionary() {
      const dict = await getDictionary(lang);
      setDictionary(dict);
    }
    fetchDictionary();
  }, [lang]);

  useEffect(() => {
    if (!authLoading && user) {
      router.push(`/${lang}/dashboard`);
    }
  }, [user, authLoading, router, lang]);

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    await signInWithGoogle(lang);
    setIsGoogleLoading(false);
  };

  const handleGitHubSignIn = async () => {
    setIsGitHubLoading(true);
    await signInWithGitHub(lang);
    setIsGitHubLoading(false);
  };
  
  if (authLoading || !dictionary) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-14rem)] bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const localizedPath = (path: string) => `/${lang}${path}`;

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-14rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
         <Card className="shadow-xl rounded-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold tracking-tight text-primary">{dictionary.signupCreateAccount}</CardTitle>
            <CardDescription className="mt-2 text-foreground/80">
              {dictionary.signupPrompt}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 sm:p-8">
            <SignupForm lang={lang} dictionary={dictionary} />

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    {dictionary.signupOrWith}
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Button variant="outline" onClick={handleGoogleSignIn} disabled={isGoogleLoading || isGitHubLoading || authLoading} className="w-full">
                  {isGoogleLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <GoogleIcon className="mr-2 h-5 w-5" />
                  )}
                  {dictionary.loginGoogle}
                </Button>
                <Button variant="outline" onClick={handleGitHubSignIn} disabled={isGitHubLoading || isGoogleLoading || authLoading} className="w-full">
                  {isGitHubLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Github className="mr-2 h-5 w-5" />
                  )}
                  {dictionary.loginGitHub}
                </Button>
              </div>
            </div>

             <p className="mt-8 text-center text-sm text-muted-foreground">
              {dictionary.signupHaveAccount}{' '}
              <Link href={localizedPath('/login')} className="font-medium text-accent hover:text-accent/90">
                {dictionary.signupSignInHere}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}